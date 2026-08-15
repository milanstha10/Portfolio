import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-Bp3OZmAf.mjs";
import { c as unknownType, i as enumType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { i as messageSchema } from "./schema-DqBBgFmX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api.functions-CjiKlBvG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* REST-style API layer.
*
* Each `createServerFn` is one endpoint. Public endpoints expose only visitor
* content; every admin endpoint calls `requireAdmin()` inside its service, so
* the API is protected independently of the UI route guards.
*/
var fetchPortfolio_createServerFn_handler = createServerRpc({
	id: "dc6332888682175eea79f5d817a71d11a9de03b80ce5b8de03ecb0978ffd3c1d",
	name: "fetchPortfolio",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => fetchPortfolio.__executeServer(opts));
var fetchPortfolio = createServerFn({ method: "GET" }).handler(fetchPortfolio_createServerFn_handler, async () => {
	const { getPublicContent } = await import("./data.server-CUycy1WB.mjs");
	const { isMongoConfigured } = await import("./mongo.server-DPVfWbT8.mjs");
	if (!isMongoConfigured()) return {
		configured: false,
		content: null,
		error: null
	};
	try {
		return {
			configured: true,
			content: await getPublicContent(),
			error: null
		};
	} catch (error) {
		console.error("[api] fetchPortfolio", error);
		return {
			configured: true,
			content: null,
			error: "Could not reach the database."
		};
	}
});
var fetchProject_createServerFn_handler = createServerRpc({
	id: "aea4b7c4f90b9e6bb68a2e0847e157e77dc02cf26afd5457b2a67df553575bde",
	name: "fetchProject",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => fetchProject.__executeServer(opts));
var fetchProject = createServerFn({ method: "GET" }).validator((input) => objectType({ slug: stringType().min(1).max(120) }).parse(input)).handler(fetchProject_createServerFn_handler, async ({ data }) => {
	const { getProjectBySlug } = await import("./data.server-CUycy1WB.mjs");
	const { getCurrentAdmin } = await import("./auth.server-CXTtnr4X.mjs");
	const admin = await getCurrentAdmin();
	return { project: await getProjectBySlug(data.slug, Boolean(admin)) };
});
var submitMessage_createServerFn_handler = createServerRpc({
	id: "fe36f6a344f090147f636167c6476fc06d32699c7a5e7761eb0c657d63cecc30",
	name: "submitMessage",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => submitMessage.__executeServer(opts));
var submitMessage = createServerFn({ method: "POST" }).validator((input) => messageSchema.parse(input)).handler(submitMessage_createServerFn_handler, async ({ data }) => {
	const { createMessage } = await import("./data.server-CUycy1WB.mjs");
	await createMessage(data);
	return { ok: true };
});
var authStatus_createServerFn_handler = createServerRpc({
	id: "1812b6aa604483141ae5fc6b0c372a095d45e70610d7d80ffe43b564f0a611b3",
	name: "authStatus",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => authStatus.__executeServer(opts));
var authStatus = createServerFn({ method: "GET" }).handler(authStatus_createServerFn_handler, async () => {
	const { getCurrentAdmin, adminCount } = await import("./auth.server-CXTtnr4X.mjs");
	const { isMongoConfigured } = await import("./mongo.server-DPVfWbT8.mjs");
	if (!isMongoConfigured()) return {
		configured: false,
		admin: null,
		needsSetup: false
	};
	const admin = await getCurrentAdmin();
	let needsSetup = false;
	try {
		needsSetup = await adminCount() === 0;
	} catch {
		needsSetup = false;
	}
	return {
		configured: true,
		admin,
		needsSetup
	};
});
var credentials = objectType({
	email: stringType().trim().email("Enter a valid email").max(160),
	password: stringType().min(8, "Password must be at least 8 characters").max(200)
});
var login_createServerFn_handler = createServerRpc({
	id: "8c5ac6ac2a732ce8b55245c9c4459cdb06c75a3125e75743cc9cf988bf4dbe79",
	name: "login",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => login.__executeServer(opts));
var login = createServerFn({ method: "POST" }).validator((input) => credentials.parse(input)).handler(login_createServerFn_handler, async ({ data }) => {
	const { signIn } = await import("./auth.server-CXTtnr4X.mjs");
	if (!await signIn(data.email, data.password)) throw new Error("Invalid email or password.");
	return { ok: true };
});
var setupAdmin_createServerFn_handler = createServerRpc({
	id: "9a060dde03f27ee7140c03319c8bf9741541292e2d83198c458008460710eb00",
	name: "setupAdmin",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => setupAdmin.__executeServer(opts));
var setupAdmin = createServerFn({ method: "POST" }).validator((input) => credentials.parse(input)).handler(setupAdmin_createServerFn_handler, async ({ data }) => {
	const { createFirstAdmin } = await import("./auth.server-CXTtnr4X.mjs");
	if (!await createFirstAdmin(data.email, data.password)) throw new Error("An admin account already exists.");
	return { ok: true };
});
var logout_createServerFn_handler = createServerRpc({
	id: "5b5f4880e1d234567b93275f9564078c96709c8ad44f15eb4e3bbefe90360bf6",
	name: "logout",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => logout.__executeServer(opts));
var logout = createServerFn({ method: "POST" }).handler(logout_createServerFn_handler, async () => {
	const { signOut } = await import("./auth.server-CXTtnr4X.mjs");
	await signOut();
	return { ok: true };
});
var listRecords_createServerFn_handler = createServerRpc({
	id: "1508170827db9cbedbe85c1d087a00a5bcf460a7bda833afd8e2fb206a7f20c0",
	name: "listRecords",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => listRecords.__executeServer(opts));
var listRecords = createServerFn({ method: "POST" }).validator((input) => objectType({ key: stringType().min(1).max(40) }).parse(input)).handler(listRecords_createServerFn_handler, async ({ data }) => {
	const { adminList } = await import("./data.server-CUycy1WB.mjs");
	return { records: await adminList(data.key) };
});
var createRecord_createServerFn_handler = createServerRpc({
	id: "3210aa5f5cf2d6f5330128e5b2b62f10a184dd853fa80c5ba847cce5effaf110",
	name: "createRecord",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => createRecord.__executeServer(opts));
var createRecord = createServerFn({ method: "POST" }).validator((input) => objectType({
	key: stringType().min(1).max(40),
	values: unknownType()
}).parse(input)).handler(createRecord_createServerFn_handler, async ({ data }) => {
	const { adminCreate } = await import("./data.server-CUycy1WB.mjs");
	return { id: await adminCreate(data.key, data.values) };
});
var updateRecord_createServerFn_handler = createServerRpc({
	id: "781c7d28e248b9982954d7170a59eb42db1b02410e6827ef0bd0dea9b14dd644",
	name: "updateRecord",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => updateRecord.__executeServer(opts));
var updateRecord = createServerFn({ method: "POST" }).validator((input) => objectType({
	key: stringType().min(1).max(40),
	id: stringType().min(1).max(60),
	values: unknownType()
}).parse(input)).handler(updateRecord_createServerFn_handler, async ({ data }) => {
	const { adminUpdate } = await import("./data.server-CUycy1WB.mjs");
	await adminUpdate(data.key, data.id, data.values);
	return { ok: true };
});
var deleteRecord_createServerFn_handler = createServerRpc({
	id: "4d30b7ca04beb5d742c2f89dfa51c8aa20d120945dd5ad54cdc87bad9b0534b8",
	name: "deleteRecord",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => deleteRecord.__executeServer(opts));
var deleteRecord = createServerFn({ method: "POST" }).validator((input) => objectType({
	key: stringType().min(1).max(40),
	id: stringType().min(1).max(60)
}).parse(input)).handler(deleteRecord_createServerFn_handler, async ({ data }) => {
	const { adminDelete } = await import("./data.server-CUycy1WB.mjs");
	await adminDelete(data.key, data.id);
	return { ok: true };
});
var fetchSingleton_createServerFn_handler = createServerRpc({
	id: "5564a1b20e9f6a7909e4cf26ea636118f8d0073700dcb44f20d6584455349725",
	name: "fetchSingleton",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => fetchSingleton.__executeServer(opts));
var fetchSingleton = createServerFn({ method: "POST" }).validator((input) => objectType({ key: enumType(["profile", "siteSettings"]) }).parse(input)).handler(fetchSingleton_createServerFn_handler, async ({ data }) => {
	const { getSingleton } = await import("./data.server-CUycy1WB.mjs");
	const { requireAdmin } = await import("./auth.server-CXTtnr4X.mjs");
	await requireAdmin();
	return { record: await getSingleton(data.key) };
});
var saveSingletonRecord_createServerFn_handler = createServerRpc({
	id: "894f7311f75c781e546efea95a3ac457b335ef3949cc1844b89110d154897f62",
	name: "saveSingletonRecord",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => saveSingletonRecord.__executeServer(opts));
var saveSingletonRecord = createServerFn({ method: "POST" }).validator((input) => objectType({
	key: enumType(["profile", "siteSettings"]),
	values: unknownType()
}).parse(input)).handler(saveSingletonRecord_createServerFn_handler, async ({ data }) => {
	const { saveSingleton } = await import("./data.server-CUycy1WB.mjs");
	await saveSingleton(data.key, data.values);
	return { ok: true };
});
var dashboardStats_createServerFn_handler = createServerRpc({
	id: "6ff7f8d91edb694547b4b6e2145e8c698a3e06c88db83b7fa0f5f51b0fa523c7",
	name: "dashboardStats",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => dashboardStats.__executeServer(opts));
var dashboardStats = createServerFn({ method: "GET" }).handler(dashboardStats_createServerFn_handler, async () => {
	const { getDashboardStats } = await import("./data.server-CUycy1WB.mjs");
	return await getDashboardStats();
});
var runSeed_createServerFn_handler = createServerRpc({
	id: "f47e655c43a19b491fc0ea06fa846203d81dbfb3e010eaeabe92a1e5901c7adf",
	name: "runSeed",
	filename: "src/lib/portfolio/api.functions.ts"
}, (opts) => runSeed.__executeServer(opts));
var runSeed = createServerFn({ method: "POST" }).handler(runSeed_createServerFn_handler, async () => {
	const { requireAdmin } = await import("./auth.server-CXTtnr4X.mjs");
	await requireAdmin();
	const { seedDemoData } = await import("./seed.server-CUUTB2VA.mjs");
	return { inserted: await seedDemoData() };
});
//#endregion
export { authStatus_createServerFn_handler, createRecord_createServerFn_handler, dashboardStats_createServerFn_handler, deleteRecord_createServerFn_handler, fetchPortfolio_createServerFn_handler, fetchProject_createServerFn_handler, fetchSingleton_createServerFn_handler, listRecords_createServerFn_handler, login_createServerFn_handler, logout_createServerFn_handler, runSeed_createServerFn_handler, saveSingletonRecord_createServerFn_handler, setupAdmin_createServerFn_handler, submitMessage_createServerFn_handler, updateRecord_createServerFn_handler };
