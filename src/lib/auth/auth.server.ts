import { useSession } from "@tanstack/react-start/server";
import {
  getResponseHeader,
  setResponseHeader,
} from "@tanstack/react-start/server";

import { db } from "../database/mongo.server";

const ITERATIONS = 100_000;
const SESSION_NAME = "portfolio_admin";

export interface SessionData {
  userId?: string;
  email?: string;
  role?: "admin";
}

function encode(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function decode(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}

async function pbkdf2(password: string, salt: Uint8Array): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as unknown as BufferSource,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return encode(new Uint8Array(bits));
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt);

  return `pbkdf2$${ITERATIONS}$${encode(salt)}$${hash}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [scheme, , salt, hash] = stored.split("$");

  if (scheme !== "pbkdf2" || !salt || !hash) {
    return false;
  }

  const computed = await pbkdf2(password, decode(salt));

  if (computed.length !== hash.length) {
    return false;
  }

  let diff = 0;

  for (let i = 0; i < hash.length; i++) {
    diff |= computed.charCodeAt(i) ^ hash.charCodeAt(i);
  }

  return diff === 0;
}

function sessionConfig() {
  const password = process.env["SESSION_SECRET"];

  if (!password || password.length < 32) {
    throw new Error(
      "SESSION_SECRET is missing or too short (needs 32+ characters).",
    );
  }

  return {
    password,
    name: SESSION_NAME,

    maxAge: 60 * 60 * 8,

    cookie: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: true,
      path: "/",
    },
  };
}

export async function getSessionManager() {
  // TanStack Start's useSession is a server API.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSession<SessionData>(sessionConfig());
}

function preserveSessionCookie(): void {
  const setCookie = getResponseHeader("Set-Cookie");

  if (setCookie) {
    setResponseHeader("Set-Cookie", setCookie);
  }
}

export async function getCurrentAdmin(): Promise<{
  email: string;
} | null> {
  try {
    const session = await getSessionManager();

    if (session.data.role !== "admin" || !session.data.email) {
      return null;
    }

    return {
      email: session.data.email,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<{
  email: string;
}> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Unauthorized: admin sign-in required.");
  }

  return admin;
}

export async function signIn(
  email: string,
  password: string,
): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await db.findOne<{
    _id: string;
    email: string;
    passwordHash: string;
  }>("users", {
    email: normalizedEmail,
  });

  const stored = user?.passwordHash ?? "pbkdf2$1$AAAA$AAAA";

  const ok = await verifyPassword(password, stored);

  if (!ok || !user) {
    return false;
  }

  const session = await getSessionManager();

  await session.update({
    userId: String(user._id),
    email: user.email,
    role: "admin",
  });

  preserveSessionCookie();

  return true;
}

export async function signOut(): Promise<void> {
  const session = await getSessionManager();

  await session.clear();

  preserveSessionCookie();
}

export async function adminCount(): Promise<number> {
  return db.count("users");
}

export async function createFirstAdmin(
  email: string,
  password: string,
): Promise<boolean> {
  if ((await adminCount()) > 0) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const id = await db.insertOne("users", {
    email: normalizedEmail,
    passwordHash: await hashPassword(password),
    role: "admin",
  });

  const session = await getSessionManager();

  await session.update({
    userId: id,
    email: normalizedEmail,
    role: "admin",
  });

  preserveSessionCookie();

  return true;
}
