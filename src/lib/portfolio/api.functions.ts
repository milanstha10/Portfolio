import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { messageSchema } from "./schema";

export const fetchPortfolio = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getPublicContent } = await import("./data.server");
    const { isMongoConfigured } = await import("../mongo/mongo.server");
    if (!isMongoConfigured())
      return { configured: false as const, content: null, error: null };
    try {
      return {
        configured: true as const,
        content: await getPublicContent(),
        error: null,
      };
    } catch (error) {
      console.error("[api] fetchPortfolio", error);
      return {
        configured: true as const,
        content: null,
        error: "Could not reach the database.",
      };
    }
  },
);

export const fetchProject = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(120) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { getProjectBySlug } = await import("./data.server");
    const { getCurrentAdmin } = await import("../auth/auth.server");
    const admin = await getCurrentAdmin();
    const project = await getProjectBySlug(data.slug, Boolean(admin));
    return { project };
  });

export const submitMessage = createServerFn({ method: "POST" })
  .validator((input: unknown) => messageSchema.parse(input))
  .handler(async ({ data }) => {
    const { createMessage } = await import("./data.server");
    await createMessage(data);
    return { ok: true };
  });

/* -------------------------------- auth -------------------------------- */

export const authStatus = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getCurrentAdmin, adminCount } = await import("../auth/auth.server");
    const { isMongoConfigured } = await import("../mongo/mongo.server");
    if (!isMongoConfigured())
      return { configured: false, admin: null, needsSetup: false };
    const admin = await getCurrentAdmin();
    let needsSetup = false;
    try {
      needsSetup = (await adminCount()) === 0;
    } catch {
      needsSetup = false;
    }
    return { configured: true, admin, needsSetup };
  },
);

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(200),
});

export const login = createServerFn({ method: "POST" })
  .validator((input: unknown) => credentials.parse(input))
  .handler(async ({ data }) => {
    const { signIn } = await import("../auth/auth.server");
    const ok = await signIn(data.email, data.password);
    if (!ok) throw new Error("Invalid email or password.");
    return { ok: true };
  });

export const setupAdmin = createServerFn({ method: "POST" })
  .validator((input: unknown) => credentials.parse(input))
  .handler(async ({ data }) => {
    const { createFirstAdmin } = await import("../auth/auth.server");
    const created = await createFirstAdmin(data.email, data.password);
    if (!created) throw new Error("An admin account already exists.");
    return { ok: true };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const { signOut } = await import("../auth/auth.server");
  await signOut();
  return { ok: true };
});

/* ------------------------------- admin CRUD ------------------------------ */

export const listRecords = createServerFn({ method: "POST" })
  .validator((input: { key: string }) =>
    z.object({ key: z.string().min(1).max(40) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { adminList } = await import("./data.server");
    return { records: await adminList(data.key) };
  });

export const createRecord = createServerFn({ method: "POST" })
  .validator((input: { key: string; values: unknown }) =>
    z
      .object({ key: z.string().min(1).max(40), values: z.unknown() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { adminCreate } = await import("./data.server");
    return { id: await adminCreate(data.key, data.values) };
  });

export const updateRecord = createServerFn({ method: "POST" })
  .validator((input: { key: string; id: string; values: unknown }) =>
    z
      .object({
        key: z.string().min(1).max(40),
        id: z.string().min(1).max(60),
        values: z.unknown(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { adminUpdate } = await import("./data.server");
    await adminUpdate(data.key, data.id, data.values);
    return { ok: true };
  });

export const deleteRecord = createServerFn({ method: "POST" })
  .validator((input: { key: string; id: string }) =>
    z
      .object({ key: z.string().min(1).max(40), id: z.string().min(1).max(60) })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { adminDelete } = await import("./data.server");
    await adminDelete(data.key, data.id);
    return { ok: true };
  });

export const fetchSingleton = createServerFn({ method: "POST" })
  .validator((input: { key: "profile" | "siteSettings" }) =>
    z.object({ key: z.enum(["profile", "siteSettings"]) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { getSingleton } = await import("./data.server");
    const { requireAdmin } = await import("../auth/auth.server");
    await requireAdmin();
    return { record: await getSingleton(data.key) };
  });

export const saveSingletonRecord = createServerFn({ method: "POST" })
  .validator((input: { key: "profile" | "siteSettings"; values: unknown }) =>
    z
      .object({ key: z.enum(["profile", "siteSettings"]), values: z.unknown() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { saveSingleton } = await import("./data.server");
    await saveSingleton(data.key, data.values);
    return { ok: true };
  });

export const dashboardStats = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getDashboardStats } = await import("./data.server");
    return await getDashboardStats();
  },
);

export const runSeed = createServerFn({ method: "POST" }).handler(async () => {
  const { requireAdmin } = await import("../auth/auth.server");
  await requireAdmin();
  const { seedDemoData } = await import("./seed.server");
  return { inserted: await seedDemoData() };
});
