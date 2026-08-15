/**
 * Data services (server-only): the layer between the API (server functions)
 * and MongoDB. Controllers/services in a classic Express app map 1:1 to this.
 */
import { requireAdmin } from "../auth/auth.server";
import { byId, db, type Doc } from "../mongo/mongo.server";
import { COLLECTIONS, SINGLETONS, messageSchema, slugify } from "./schema";

export interface PortfolioContent {
  profile: Doc | null;
  settings: Doc | null;
  projects: Doc[];
  skills: Doc[];
  education: Doc[];
  experience: Doc[];
  certifications: Doc[];
  achievements: Doc[];
  services: Doc[];
  socialLinks: Doc[];
}

type CollectionKey = keyof typeof COLLECTIONS;
type AdminKey = CollectionKey | "messages";

/** Public read: only published projects, and never any private collection. */
export async function getPublicContent(): Promise<PortfolioContent> {
  const [
    profile,
    settings,
    projects,
    skills,
    education,
    experience,
    certifications,
    achievements,
    services,
    socialLinks,
  ] = await Promise.all([
    db.findOne("profile", { key: "main" }),
    db.findOne("siteSettings", { key: "main" }),
    db.find(
      "projects",
      { status: "published" },
      { sort: { order: 1, createdAt: -1 }, limit: 60 },
    ),
    db.find("skills", {}, { sort: { order: 1 }, limit: 100 }),
    db.find("education", {}, { sort: { order: 1 }, limit: 30 }),
    db.find("experience", {}, { sort: { order: 1 }, limit: 30 }),
    db.find("certifications", {}, { sort: { order: 1 }, limit: 50 }),
    db.find("achievements", {}, { sort: { order: 1 }, limit: 50 }),
    db.find("services", {}, { sort: { order: 1 }, limit: 20 }),
    db.find("socialLinks", {}, { sort: { order: 1 }, limit: 20 }),
  ]);

  return {
    profile,
    settings,
    projects,
    skills,
    education,
    experience,
    certifications,
    achievements,
    services,
    socialLinks,
  };
}

export async function getProjectBySlug(
  slug: string,
  allowDraft: boolean,
): Promise<Doc | null> {
  const filter: Doc = allowDraft ? { slug } : { slug, status: "published" };

  return db.findOne("projects", filter);
}

/** Public write: contact messages, with a light abuse guard. */
export async function createMessage(input: unknown): Promise<void> {
  const data = messageSchema.parse(input);

  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const recent = await db.count("messages", {
    email: data.email.toLowerCase(),
    createdAt: { $gt: since },
  });

  if (recent >= 3) {
    throw new Error("Too many messages sent recently. Please try again later.");
  }

  const duplicate = await db.findOne("messages", {
    email: data.email.toLowerCase(),
    subject: data.subject,
    message: data.message,
    createdAt: { $gt: since },
  });

  if (duplicate) return; // ignore accidental double submit

  await db.insertOne("messages", {
    name: data.name,
    email: data.email.toLowerCase(),
    subject: data.subject,
    message: data.message,
    status: "unread",
  });
}

/**
 * Return configuration for a valid COLLECTIONS key.
 *
 * "messages" is intentionally not included because messages
 * are handled separately in the admin functions.
 */
function configFor(key: CollectionKey) {
  return COLLECTIONS[key];
}

/* -------------------------- admin (protected) -------------------------- */

export async function adminList(key: AdminKey): Promise<Doc[]> {
  await requireAdmin();

  if (key === "messages") {
    return db.find(
      "messages",
      {},
      {
        sort: { createdAt: -1 },
        limit: 300,
      },
    );
  }

  const config = configFor(key);

  return db.find(
    config.collection,
    {},
    {
      sort: config.sort,
      limit: 300,
    },
  );
}

export async function adminCreate(
  key: CollectionKey,
  values: unknown,
): Promise<string> {
  await requireAdmin();

  const config = configFor(key);
  const data = config.schema.parse(values) as Doc;

  if (key === "projects") {
    data["slug"] = await uniqueSlug(String(data["slug"] || data["title"]));
  }

  return db.insertOne(config.collection, data);
}

export async function adminUpdate(
  key: AdminKey,
  id: string,
  values: unknown,
): Promise<void> {
  await requireAdmin();

  if (key === "messages") {
    const status = (values as { status?: string }).status;

    if (status !== "read" && status !== "unread") {
      throw new Error("Invalid status");
    }

    await db.updateOne("messages", byId(id), { status });
    return;
  }

  const config = configFor(key);
  const data = config.schema.parse(values) as Doc;

  if (key === "projects") {
    data["slug"] = await uniqueSlug(String(data["slug"] || data["title"]), id);
  }

  await db.updateOne(config.collection, byId(id), data);
}

export async function adminDelete(key: AdminKey, id: string): Promise<void> {
  await requireAdmin();

  const collection =
    key === "messages" ? "messages" : configFor(key).collection;

  await db.deleteOne(collection, byId(id));
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const root = slugify(base) || "project";
  let candidate = root;

  for (let i = 2; i < 50; i++) {
    const existing = await db.findOne<{ _id: string }>("projects", {
      slug: candidate,
    });

    if (!existing || (ignoreId && String(existing._id) === ignoreId)) {
      return candidate;
    }

    candidate = `${root}-${i}`;
  }

  return `${root}-${Date.now()}`;
}

export async function getSingleton(
  key: "profile" | "siteSettings",
): Promise<Doc | null> {
  return db.findOne(SINGLETONS[key].collection, { key: "main" });
}

export async function saveSingleton(
  key: "profile" | "siteSettings",
  values: unknown,
): Promise<void> {
  await requireAdmin();

  const data = SINGLETONS[key].schema.parse(values) as Doc;

  await db.upsertOne(
    SINGLETONS[key].collection,
    { key: "main" },
    {
      key: "main",
      ...data,
    },
  );
}

export async function getDashboardStats() {
  await requireAdmin();

  const keys = [
    "projects",
    "skills",
    "education",
    "experience",
    "certifications",
    "achievements",
    "services",
    "messages",
  ] as const;

  const counts = await Promise.all(keys.map((k) => db.count(k)));

  const unread = await db.count("messages", {
    status: "unread",
  });

  const published = await db.count("projects", {
    status: "published",
  });

  const stats: Record<string, number> = {
    unreadMessages: unread,
    publishedProjects: published,
  };

  keys.forEach((k, i) => {
    stats[k] = counts[i] ?? 0;
  });

  return stats;
}
