//#region node_modules/.nitro/vite/services/ssr/assets/mongo.server-DPVfWbT8.js
var MongoConfigError = class extends Error {
	constructor(missing) {
		super(`MongoDB is not configured. Missing environment variable(s): ${missing.join(", ")}. Add them in project settings, then reload.`);
		this.name = "MongoConfigError";
	}
};
var MongoRequestError = class extends Error {
	status;
	constructor(status, message) {
		super(`MongoDB request failed (${status}): ${message}`);
		this.status = status;
		this.name = "MongoRequestError";
	}
};
function config() {
	const cfg = {
		url: process.env["MONGODB_DATA_API_URL"] ?? "",
		apiKey: process.env["MONGODB_DATA_API_KEY"] ?? "",
		database: process.env["MONGODB_DB"] ?? "",
		dataSource: process.env["MONGODB_DATA_SOURCE"] ?? ""
	};
	const missing = Object.entries(cfg).filter(([, v]) => !v).map(([k]) => ({
		url: "MONGODB_DATA_API_URL",
		apiKey: "MONGODB_DATA_API_KEY",
		database: "MONGODB_DB",
		dataSource: "MONGODB_DATA_SOURCE"
	})[k]);
	if (missing.length) throw new MongoConfigError(missing);
	return cfg;
}
function isMongoConfigured() {
	try {
		config();
		return true;
	} catch {
		return false;
	}
}
async function action(name, payload) {
	const cfg = config();
	const res = await fetch(`${cfg.url.replace(/\/$/, "")}/action/${name}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Request-Headers": "*",
			apiKey: cfg.apiKey
		},
		body: JSON.stringify({
			dataSource: cfg.dataSource,
			database: cfg.database,
			...payload
		})
	});
	if (!res.ok) {
		const text = await res.text();
		console.error("[mongo]", name, res.status, text.slice(0, 500));
		throw new MongoRequestError(res.status, res.status === 401 ? "unauthorized" : "request rejected");
	}
	return await res.json();
}
/** Build an `_id` filter that works for both ObjectId and string ids. */
function byId(id) {
	return /^[a-f\d]{24}$/i.test(id) ? { _id: { $oid: id } } : { _id: id };
}
var db = {
	async find(collection, filter = {}, opts = {}) {
		return (await action("find", {
			collection,
			filter,
			...opts
		})).documents ?? [];
	},
	async findOne(collection, filter, projection) {
		return (await action("findOne", {
			collection,
			filter,
			projection
		})).document ?? null;
	},
	async count(collection, filter = {}) {
		return (await action("aggregate", {
			collection,
			pipeline: [{ $match: filter }, { $count: "n" }]
		})).documents?.[0]?.n ?? 0;
	},
	async insertOne(collection, document) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return (await action("insertOne", {
			collection,
			document: {
				...document,
				createdAt: now,
				updatedAt: now
			}
		})).insertedId;
	},
	async updateOne(collection, filter, set) {
		return (await action("updateOne", {
			collection,
			filter,
			update: { $set: {
				...set,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			} },
			upsert: false
		})).modifiedCount ?? 0;
	},
	async upsertOne(collection, filter, set) {
		await action("updateOne", {
			collection,
			filter,
			update: {
				$set: {
					...set,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				},
				$setOnInsert: { createdAt: (/* @__PURE__ */ new Date()).toISOString() }
			},
			upsert: true
		});
	},
	async deleteOne(collection, filter) {
		return (await action("deleteOne", {
			collection,
			filter
		})).deletedCount ?? 0;
	},
	async deleteMany(collection, filter = {}) {
		return (await action("deleteMany", {
			collection,
			filter
		})).deletedCount ?? 0;
	},
	async insertMany(collection, documents) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return (await action("insertMany", {
			collection,
			documents: documents.map((d) => ({
				...d,
				createdAt: now,
				updatedAt: now
			}))
		})).insertedIds?.length ?? 0;
	}
};
//#endregion
export { byId, db, isMongoConfigured };
