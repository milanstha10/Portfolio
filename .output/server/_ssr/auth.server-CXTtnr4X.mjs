import { o as useSession$1 } from "./server-Bp3OZmAf.mjs";
import { db } from "./mongo.server-DPVfWbT8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.server-CXTtnr4X.js
/**
* Admin authentication (server-only).
*
* - Passwords are hashed with PBKDF2-SHA256 (Web Crypto), never stored plain.
* - The session is an encrypted, signed, HttpOnly cookie sealed with SESSION_SECRET.
* - `requireAdmin()` is the authorization guard used by every admin server function.
*/
var ITERATIONS = 1e5;
var SESSION_NAME = "portfolio_admin";
function encode(bytes) {
	return btoa(String.fromCharCode(...bytes));
}
function decode(value) {
	return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}
async function pbkdf2(password, salt) {
	const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
	const bits = await crypto.subtle.deriveBits({
		name: "PBKDF2",
		salt,
		iterations: ITERATIONS,
		hash: "SHA-256"
	}, key, 256);
	return encode(new Uint8Array(bits));
}
async function hashPassword(password) {
	const salt = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	const hash = await pbkdf2(password, salt);
	return `pbkdf2$${ITERATIONS}$${encode(salt)}$${hash}`;
}
async function verifyPassword(password, stored) {
	const [scheme, , salt, hash] = stored.split("$");
	if (scheme !== "pbkdf2" || !salt || !hash) return false;
	const computed = await pbkdf2(password, decode(salt));
	if (computed.length !== hash.length) return false;
	let diff = 0;
	for (let i = 0; i < hash.length; i++) diff |= computed.charCodeAt(i) ^ hash.charCodeAt(i);
	return diff === 0;
}
function sessionConfig() {
	const password = process.env["SESSION_SECRET"];
	if (!password || password.length < 32) throw new Error("SESSION_SECRET is missing or too short (needs 32+ characters).");
	return {
		password,
		name: SESSION_NAME,
		maxAge: 28800,
		cookie: {
			httpOnly: true,
			sameSite: "lax",
			secure: true,
			path: "/"
		}
	};
}
async function getSessionManager() {
	return useSession$1(sessionConfig());
}
async function getCurrentAdmin() {
	try {
		const session = await getSessionManager();
		if (session.data.role !== "admin" || !session.data.email) return null;
		return { email: session.data.email };
	} catch {
		return null;
	}
}
async function requireAdmin() {
	const admin = await getCurrentAdmin();
	if (!admin) throw new Error("Unauthorized: admin sign-in required.");
	return admin;
}
async function signIn(email, password) {
	const user = await db.findOne("users", { email: email.toLowerCase() });
	if (!await verifyPassword(password, user?.passwordHash ?? "pbkdf2$1$AAAA$AAAA") || !user) return false;
	await (await getSessionManager()).update({
		userId: String(user._id),
		email: user.email,
		role: "admin"
	});
	return true;
}
async function signOut() {
	await (await getSessionManager()).clear();
}
async function adminCount() {
	return db.count("users");
}
async function createFirstAdmin(email, password) {
	if (await adminCount() > 0) return false;
	const id = await db.insertOne("users", {
		email: email.toLowerCase(),
		passwordHash: await hashPassword(password),
		role: "admin"
	});
	await (await getSessionManager()).update({
		userId: id,
		email: email.toLowerCase(),
		role: "admin"
	});
	return true;
}
//#endregion
export { adminCount, createFirstAdmin, getCurrentAdmin, requireAdmin, signIn, signOut };
