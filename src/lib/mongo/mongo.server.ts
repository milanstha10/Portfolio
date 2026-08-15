export type Doc = Record<string, unknown>;

export class MongoConfigError extends Error {
  constructor(missing: string[]) {
    super(
      `MongoDB is not configured. Missing environment variable(s): ${missing.join(", ")}. ` +
        `Add them in project settings, then reload.`,
    );
    this.name = "MongoConfigError";
  }
}

export class MongoRequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(`MongoDB request failed (${status}): ${message}`);
    this.name = "MongoRequestError";
  }
}

function config() {
  // Read env inside the function: the runtime injects it per request.
  const cfg = {
    url: process.env["MONGODB_DATA_API_URL"] ?? "",
    apiKey: process.env["MONGODB_DATA_API_KEY"] ?? "",
    database: process.env["MONGODB_DB"] ?? "",
    dataSource: process.env["MONGODB_DATA_SOURCE"] ?? "",
  };
  const missing = Object.entries(cfg)
    .filter(([, v]) => !v)
    .map(
      ([k]) =>
        ({
          url: "MONGODB_DATA_API_URL",
          apiKey: "MONGODB_DATA_API_KEY",
          database: "MONGODB_DB",
          dataSource: "MONGODB_DATA_SOURCE",
        })[k] as string,
    );
  if (missing.length) throw new MongoConfigError(missing);
  return cfg;
}

export function isMongoConfigured(): boolean {
  try {
    config();
    return true;
  } catch {
    return false;
  }
}

async function action<T>(name: string, payload: Doc): Promise<T> {
  const cfg = config();
  const res = await fetch(`${cfg.url.replace(/\/$/, "")}/action/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      apiKey: cfg.apiKey,
    },
    body: JSON.stringify({
      dataSource: cfg.dataSource,
      database: cfg.database,
      ...payload,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    // Never leak the API key or full backend error to the client.
    console.error("[mongo]", name, res.status, text.slice(0, 500));
    throw new MongoRequestError(
      res.status,
      res.status === 401 ? "unauthorized" : "request rejected",
    );
  }
  return (await res.json()) as T;
}

/** Build an `_id` filter that works for both ObjectId and string ids. */
export function byId(id: string): Doc {
  return /^[a-f\d]{24}$/i.test(id) ? { _id: { $oid: id } } : { _id: id };
}

export const db = {
  async find<T = Doc>(
    collection: string,
    filter: Doc = {},
    opts: { sort?: Doc; limit?: number; skip?: number; projection?: Doc } = {},
  ): Promise<T[]> {
    const r = await action<{ documents: T[] }>("find", {
      collection,
      filter,
      ...opts,
    });
    return r.documents ?? [];
  },

  async findOne<T = Doc>(
    collection: string,
    filter: Doc,
    projection?: Doc,
  ): Promise<T | null> {
    const r = await action<{ document: T | null }>("findOne", {
      collection,
      filter,
      projection,
    });
    return r.document ?? null;
  },

  async count(collection: string, filter: Doc = {}): Promise<number> {
    const r = await action<{ documents: Array<{ n?: number }> }>("aggregate", {
      collection,
      pipeline: [{ $match: filter }, { $count: "n" }],
    });
    return r.documents?.[0]?.n ?? 0;
  },

  async insertOne(collection: string, document: Doc): Promise<string> {
    const now = new Date().toISOString();
    const r = await action<{ insertedId: string }>("insertOne", {
      collection,
      document: { ...document, createdAt: now, updatedAt: now },
    });
    return r.insertedId;
  },

  async updateOne(collection: string, filter: Doc, set: Doc): Promise<number> {
    const r = await action<{ modifiedCount: number }>("updateOne", {
      collection,
      filter,
      update: { $set: { ...set, updatedAt: new Date().toISOString() } },
      upsert: false,
    });
    return r.modifiedCount ?? 0;
  },

  async upsertOne(collection: string, filter: Doc, set: Doc): Promise<void> {
    await action("updateOne", {
      collection,
      filter,
      update: {
        $set: { ...set, updatedAt: new Date().toISOString() },
        $setOnInsert: { createdAt: new Date().toISOString() },
      },
      upsert: true,
    });
  },

  async deleteOne(collection: string, filter: Doc): Promise<number> {
    const r = await action<{ deletedCount: number }>("deleteOne", {
      collection,
      filter,
    });
    return r.deletedCount ?? 0;
  },

  async deleteMany(collection: string, filter: Doc = {}): Promise<number> {
    const r = await action<{ deletedCount: number }>("deleteMany", {
      collection,
      filter,
    });
    return r.deletedCount ?? 0;
  },

  async insertMany(collection: string, documents: Doc[]): Promise<number> {
    const now = new Date().toISOString();
    const r = await action<{ insertedIds: string[] }>("insertMany", {
      collection,
      documents: documents.map((d) => ({
        ...d,
        createdAt: now,
        updatedAt: now,
      })),
    });
    return r.insertedIds?.length ?? 0;
  },
};
