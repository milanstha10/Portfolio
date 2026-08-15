import { a as slugify, i as messageSchema, n as SINGLETONS, t as COLLECTIONS } from "./schema-DqBBgFmX.mjs";
import { byId, db } from "./mongo.server-DPVfWbT8.mjs";
import { requireAdmin } from "./auth.server-CXTtnr4X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data.server-CUycy1WB.js
/**
* Data services (server-only): the layer between the API (server functions)
* and MongoDB. Controllers/services in a classic Express app map 1:1 to this.
*/
/** Public read: only published projects, and never any private collection. */
async function getPublicContent() {
	const [profile, settings, projects, skills, education, experience, certifications, achievements, services, socialLinks] = await Promise.all([
		db.findOne("profile", { key: "main" }),
		db.findOne("siteSettings", { key: "main" }),
		db.find("projects", { status: "published" }, {
			sort: {
				order: 1,
				createdAt: -1
			},
			limit: 60
		}),
		db.find("skills", {}, {
			sort: { order: 1 },
			limit: 100
		}),
		db.find("education", {}, {
			sort: { order: 1 },
			limit: 30
		}),
		db.find("experience", {}, {
			sort: { order: 1 },
			limit: 30
		}),
		db.find("certifications", {}, {
			sort: { order: 1 },
			limit: 50
		}),
		db.find("achievements", {}, {
			sort: { order: 1 },
			limit: 50
		}),
		db.find("services", {}, {
			sort: { order: 1 },
			limit: 20
		}),
		db.find("socialLinks", {}, {
			sort: { order: 1 },
			limit: 20
		})
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
		socialLinks
	};
}
async function getProjectBySlug(slug, allowDraft) {
	const filter = allowDraft ? { slug } : {
		slug,
		status: "published"
	};
	return db.findOne("projects", filter);
}
/** Public write: contact messages, with a light abuse guard. */
async function createMessage(input) {
	const data = messageSchema.parse(input);
	const since = (/* @__PURE__ */ new Date(Date.now() - 6e5)).toISOString();
	if (await db.count("messages", {
		email: data.email.toLowerCase(),
		createdAt: { $gt: since }
	}) >= 3) throw new Error("Too many messages sent recently. Please try again later.");
	if (await db.findOne("messages", {
		email: data.email.toLowerCase(),
		subject: data.subject,
		message: data.message,
		createdAt: { $gt: since }
	})) return;
	await db.insertOne("messages", {
		name: data.name,
		email: data.email.toLowerCase(),
		subject: data.subject,
		message: data.message,
		status: "unread"
	});
}
function configFor(key) {
	const config = COLLECTIONS[key];
	if (!config) throw new Error("Unknown collection");
	return config;
}
async function adminList(key) {
	await requireAdmin();
	if (key === "messages") return db.find("messages", {}, {
		sort: { createdAt: -1 },
		limit: 300
	});
	const config = configFor(key);
	return db.find(config.collection, {}, {
		sort: config.sort,
		limit: 300
	});
}
async function adminCreate(key, values) {
	await requireAdmin();
	const config = configFor(key);
	const data = config.schema.parse(values);
	if (key === "projects") data["slug"] = await uniqueSlug(String(data["slug"] || data["title"]));
	return db.insertOne(config.collection, data);
}
async function adminUpdate(key, id, values) {
	await requireAdmin();
	if (key === "messages") {
		const status = values.status;
		if (status !== "read" && status !== "unread") throw new Error("Invalid status");
		await db.updateOne("messages", byId(id), { status });
		return;
	}
	const config = configFor(key);
	const data = config.schema.parse(values);
	if (key === "projects") data["slug"] = await uniqueSlug(String(data["slug"] || data["title"]), id);
	await db.updateOne(config.collection, byId(id), data);
}
async function adminDelete(key, id) {
	await requireAdmin();
	const collection = key === "messages" ? "messages" : configFor(key).collection;
	await db.deleteOne(collection, byId(id));
}
async function uniqueSlug(base, ignoreId) {
	const root = slugify(base) || "project";
	let candidate = root;
	for (let i = 2; i < 50; i++) {
		const existing = await db.findOne("projects", { slug: candidate });
		if (!existing || ignoreId && String(existing._id) === ignoreId) return candidate;
		candidate = `${root}-${i}`;
	}
	return `${root}-${Date.now()}`;
}
async function getSingleton(key) {
	return db.findOne(SINGLETONS[key].collection, { key: "main" });
}
async function saveSingleton(key, values) {
	await requireAdmin();
	const data = SINGLETONS[key].schema.parse(values);
	await db.upsertOne(SINGLETONS[key].collection, { key: "main" }, {
		key: "main",
		...data
	});
}
async function getDashboardStats() {
	await requireAdmin();
	const keys = [
		"projects",
		"skills",
		"education",
		"experience",
		"certifications",
		"achievements",
		"services",
		"messages"
	];
	const counts = await Promise.all(keys.map((k) => db.count(k)));
	const stats = {
		unreadMessages: await db.count("messages", { status: "unread" }),
		publishedProjects: await db.count("projects", { status: "published" })
	};
	keys.forEach((k, i) => {
		stats[k] = counts[i] ?? 0;
	});
	return stats;
}
//#endregion
export { adminCreate, adminDelete, adminList, adminUpdate, createMessage, getDashboardStats, getProjectBySlug, getPublicContent, getSingleton, saveSingleton };
