import {
  MongoClient,
  type Collection,
  type Db,
  ObjectId,
  type Document,
  type Sort,
} from "mongodb";

export type Doc = Record<string, unknown>;

export class MongoConfigError extends Error {
  constructor() {
    super(
      "MongoDB is not configured. Add MONGODB_URI and MONGODB_DB to your server environment.",
    );
    this.name = "MongoConfigError";
  }
}

let client: MongoClient | null = null;
let database: Db | null = null;
let connectionPromise: Promise<MongoClient> | null = null;

function getConfig(): {
  uri: string;
  databaseName: string;
} {
  const uri = process.env["MONGODB_URI"];
  const databaseName = process.env["MONGODB_DB"];

  if (!uri || !databaseName) {
    throw new MongoConfigError();
  }

  return {
    uri,
    databaseName,
  };
}

async function getClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  if (!connectionPromise) {
    const { uri } = getConfig();

    const nextClient = new MongoClient(uri);

    connectionPromise = nextClient.connect().then((connected) => {
      client = connected;
      return connected;
    });
  }

  return connectionPromise;
}

async function getDb(): Promise<Db> {
  if (database) {
    return database;
  }

  const { databaseName } = getConfig();
  const connectedClient = await getClient();

  database = connectedClient.db(databaseName);

  return database;
}

async function collection(name: string): Promise<Collection<Document>> {
  const db = await getDb();
  return db.collection<Document>(name);
}

function serializeValue(value: unknown): unknown {
  if (value instanceof ObjectId) {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      result[key] = serializeValue(nestedValue);
    }

    return result;
  }

  return value;
}

function serializeDocument<T>(document: T): T {
  return serializeValue(document) as T;
}

export function byId(id: string): Doc {
  if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
    return {
      _id: new ObjectId(id),
    };
  }

  return {
    _id: id,
  };
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env["MONGODB_URI"] && process.env["MONGODB_DB"]);
}

export const db = {
  async find<T = Doc>(
    name: string,
    filter: Doc = {},
    opts: {
      sort?: Sort;
      limit?: number;
      skip?: number;
      projection?: Doc;
    } = {},
  ): Promise<T[]> {
    const col = await collection(name);

    let cursor = col.find(filter);

    if (opts.sort) {
      cursor = cursor.sort(opts.sort);
    }

    if (typeof opts.skip === "number") {
      cursor = cursor.skip(opts.skip);
    }

    if (typeof opts.limit === "number") {
      cursor = cursor.limit(opts.limit);
    }

    if (opts.projection) {
      cursor = cursor.project(opts.projection);
    }

    const documents = await cursor.toArray();

    return documents.map((document) => serializeDocument(document)) as T[];
  },

  async findOne<T = Doc>(
    name: string,
    filter: Doc,
    projection?: Doc,
  ): Promise<T | null> {
    const col = await collection(name);

    const document = await col.findOne(
      filter,
      projection
        ? {
            projection,
          }
        : undefined,
    );

    if (!document) {
      return null;
    }

    return serializeDocument(document) as T;
  },

  async count(name: string, filter: Doc = {}): Promise<number> {
    const col = await collection(name);

    return col.countDocuments(filter);
  },

  async insertOne(name: string, document: Doc): Promise<string> {
    const col = await collection(name);

    const now = new Date().toISOString();

    const result = await col.insertOne({
      ...document,
      createdAt: now,
      updatedAt: now,
    });

    return result.insertedId.toString();
  },

  async insertMany(name: string, documents: Doc[]): Promise<number> {
    if (documents.length === 0) {
      return 0;
    }

    const col = await collection(name);

    const now = new Date().toISOString();

    const result = await col.insertMany(
      documents.map((document) => ({
        ...document,
        createdAt: now,
        updatedAt: now,
      })),
    );

    return result.insertedCount;
  },

  async updateOne(name: string, filter: Doc, set: Doc): Promise<number> {
    const col = await collection(name);

    const result = await col.updateOne(filter, {
      $set: {
        ...set,
        updatedAt: new Date().toISOString(),
      },
    });

    return result.modifiedCount;
  },

  async upsertOne(name: string, filter: Doc, set: Doc): Promise<void> {
    const col = await collection(name);

    const now = new Date().toISOString();

    await col.updateOne(
      filter,
      {
        $set: {
          ...set,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      {
        upsert: true,
      },
    );
  },

  async deleteOne(name: string, filter: Doc): Promise<number> {
    const col = await collection(name);

    const result = await col.deleteOne(filter);

    return result.deletedCount;
  },

  async deleteMany(name: string, filter: Doc = {}): Promise<number> {
    const col = await collection(name);

    const result = await col.deleteMany(filter);

    return result.deletedCount;
  },
};
