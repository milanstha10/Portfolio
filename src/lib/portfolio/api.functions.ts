import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { messageSchema } from "./schema";

type ClientValue =
  | string
  | number
  | boolean
  | null
  | ClientValue[]
  | { [key: string]: ClientValue };

function toClientValue(value: unknown): ClientValue {
  if (value === null) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(toClientValue);
  }

  if (typeof value === "object") {
    const result: Record<string, ClientValue> = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      result[key] = toClientValue(nestedValue);
    }

    return result;
  }

  return null;
}

function toClientDocument(value: unknown): Record<string, ClientValue> {
  const result = toClientValue(value);

  if (result !== null && typeof result === "object" && !Array.isArray(result)) {
    return result;
  }

  return {};
}

const adminRecordKeySchema = z.enum([
  "projects",
  "skills",
  "education",
  "experience",
  "certifications",
  "achievements",
  "services",
  "socialLinks",
  "messages",
]);

const collectionKeySchema = z.enum([
  "projects",
  "skills",
  "education",
  "experience",
  "certifications",
  "achievements",
  "services",
  "socialLinks",
]);

const singletonKeySchema = z.enum(["profile", "siteSettings"]);

export const fetchPortfolio = createServerFn({
  method: "GET",
}).handler(async () => {
  const { getPublicContent } = await import("./data.server");
  const { isMongoConfigured } = await import("../mongo/mongo.server");

  if (!isMongoConfigured()) {
    return {
      configured: false,
      content: null,
      error: null,
    };
  }

  try {
    const content = await getPublicContent();

    return {
      configured: true,
      content: toClientDocument(content),
      error: null,
    };
  } catch (error) {
    console.error("[api] fetchPortfolio", error);

    return {
      configured: true,
      content: null,
      error: "Could not reach the database.",
    };
  }
});

export const fetchProject = createServerFn({
  method: "GET",
})
  .validator((input: unknown) =>
    z
      .object({
        slug: z.string().trim().min(1).max(120),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { getProjectBySlug } = await import("./data.server");
    const { getCurrentAdmin } = await import("../auth/auth.server");

    const admin = await getCurrentAdmin();
    const project = await getProjectBySlug(data.slug, Boolean(admin));

    return {
      project: project ? toClientDocument(project) : null,
    };
  });

export const submitMessage = createServerFn({
  method: "POST",
})
  .validator((input: unknown) => messageSchema.parse(input))
  .handler(async ({ data }) => {
    const { createMessage } = await import("./data.server");

    await createMessage(data);

    return {
      ok: true,
    };
  });

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(200),
});

export const authStatus = createServerFn({
  method: "GET",
}).handler(async () => {
  const { getCurrentAdmin, adminCount } = await import("../auth/auth.server");
  const { isMongoConfigured } = await import("../mongo/mongo.server");

  if (!isMongoConfigured()) {
    return {
      configured: false,
      admin: null,
      needsSetup: false,
    };
  }

  const admin = await getCurrentAdmin();

  let needsSetup = false;

  try {
    needsSetup = (await adminCount()) === 0;
  } catch {
    needsSetup = false;
  }

  return {
    configured: true,
    admin,
    needsSetup,
  };
});

export const login = createServerFn({
  method: "POST",
})
  .validator((input: unknown) => credentials.parse(input))
  .handler(async ({ data }) => {
    const { signIn } = await import("../auth/auth.server");

    const ok = await signIn(data.email, data.password);

    if (!ok) {
      throw new Error("Invalid email or password.");
    }

    return {
      ok: true,
    };
  });

export const setupAdmin = createServerFn({
  method: "POST",
})
  .validator((input: unknown) => credentials.parse(input))
  .handler(async ({ data }) => {
    const { createFirstAdmin } = await import("../auth/auth.server");

    const created = await createFirstAdmin(data.email, data.password);

    if (!created) {
      throw new Error("An admin account already exists.");
    }

    return {
      ok: true,
    };
  });

export const logout = createServerFn({
  method: "POST",
}).handler(async () => {
  const { signOut } = await import("../auth/auth.server");

  await signOut();

  return {
    ok: true,
  };
});

export const listRecords = createServerFn({
  method: "POST",
})
  .validator((input: unknown) =>
    z
      .object({
        key: adminRecordKeySchema,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { adminList } = await import("./data.server");

    const records = await adminList(data.key);

    return {
      records: records.map(toClientDocument),
    };
  });

export const createRecord = createServerFn({
  method: "POST",
})
  .validator((input: unknown) =>
    z
      .object({
        key: collectionKeySchema,
        values: z.unknown(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { adminCreate } = await import("./data.server");

    return {
      id: await adminCreate(data.key, data.values),
    };
  });

export const updateRecord = createServerFn({
  method: "POST",
})
  .validator((input: unknown) =>
    z
      .object({
        key: adminRecordKeySchema,
        id: z.string().min(1).max(60),
        values: z.unknown(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { adminUpdate } = await import("./data.server");

    await adminUpdate(data.key, data.id, data.values);

    return {
      ok: true,
    };
  });

export const deleteRecord = createServerFn({
  method: "POST",
})
  .validator((input: unknown) =>
    z
      .object({
        key: adminRecordKeySchema,
        id: z.string().min(1).max(60),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { adminDelete } = await import("./data.server");

    await adminDelete(data.key, data.id);

    return {
      ok: true,
    };
  });

export const fetchSingleton = createServerFn({
  method: "POST",
})
  .validator((input: unknown) =>
    z
      .object({
        key: singletonKeySchema,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { getSingleton } = await import("./data.server");
    const { requireAdmin } = await import("../auth/auth.server");

    await requireAdmin();

    const record = await getSingleton(data.key);

    return {
      record: record ? toClientDocument(record) : null,
    };
  });

export const saveSingletonRecord = createServerFn({
  method: "POST",
})
  .validator((input: unknown) =>
    z
      .object({
        key: singletonKeySchema,
        values: z.unknown(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { saveSingleton } = await import("./data.server");

    await saveSingleton(data.key, data.values);

    return {
      ok: true,
    };
  });

export const dashboardStats = createServerFn({
  method: "GET",
}).handler(async () => {
  const { getDashboardStats } = await import("./data.server");

  return await getDashboardStats();
});

export const runSeed = createServerFn({
  method: "POST",
}).handler(async () => {
  const { requireAdmin } = await import("../auth/auth.server");

  await requireAdmin();

  const { seedDemoData } = await import("./seed.server");

  return {
    inserted: await seedDemoData(),
  };
});
