import { i as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-Bp3OZmAf.mjs";
import { c as unknownType, i as enumType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { i as messageSchema } from "./schema-DqBBgFmX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api.functions-CzPWY4Yc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var fetchPortfolio = createServerFn({ method: "GET" }).handler(createSsrRpc("dc6332888682175eea79f5d817a71d11a9de03b80ce5b8de03ecb0978ffd3c1d"));
var fetchProject = createServerFn({ method: "GET" }).validator((input) => objectType({ slug: stringType().min(1).max(120) }).parse(input)).handler(createSsrRpc("aea4b7c4f90b9e6bb68a2e0847e157e77dc02cf26afd5457b2a67df553575bde"));
var submitMessage = createServerFn({ method: "POST" }).validator((input) => messageSchema.parse(input)).handler(createSsrRpc("fe36f6a344f090147f636167c6476fc06d32699c7a5e7761eb0c657d63cecc30"));
var authStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("1812b6aa604483141ae5fc6b0c372a095d45e70610d7d80ffe43b564f0a611b3"));
var credentials = objectType({
	email: stringType().trim().email("Enter a valid email").max(160),
	password: stringType().min(8, "Password must be at least 8 characters").max(200)
});
var login = createServerFn({ method: "POST" }).validator((input) => credentials.parse(input)).handler(createSsrRpc("8c5ac6ac2a732ce8b55245c9c4459cdb06c75a3125e75743cc9cf988bf4dbe79"));
var setupAdmin = createServerFn({ method: "POST" }).validator((input) => credentials.parse(input)).handler(createSsrRpc("9a060dde03f27ee7140c03319c8bf9741541292e2d83198c458008460710eb00"));
var logout = createServerFn({ method: "POST" }).handler(createSsrRpc("5b5f4880e1d234567b93275f9564078c96709c8ad44f15eb4e3bbefe90360bf6"));
createServerFn({ method: "POST" }).validator((input) => objectType({ key: stringType().min(1).max(40) }).parse(input)).handler(createSsrRpc("1508170827db9cbedbe85c1d087a00a5bcf460a7bda833afd8e2fb206a7f20c0"));
createServerFn({ method: "POST" }).validator((input) => objectType({
	key: stringType().min(1).max(40),
	values: unknownType()
}).parse(input)).handler(createSsrRpc("3210aa5f5cf2d6f5330128e5b2b62f10a184dd853fa80c5ba847cce5effaf110"));
createServerFn({ method: "POST" }).validator((input) => objectType({
	key: stringType().min(1).max(40),
	id: stringType().min(1).max(60),
	values: unknownType()
}).parse(input)).handler(createSsrRpc("781c7d28e248b9982954d7170a59eb42db1b02410e6827ef0bd0dea9b14dd644"));
createServerFn({ method: "POST" }).validator((input) => objectType({
	key: stringType().min(1).max(40),
	id: stringType().min(1).max(60)
}).parse(input)).handler(createSsrRpc("4d30b7ca04beb5d742c2f89dfa51c8aa20d120945dd5ad54cdc87bad9b0534b8"));
createServerFn({ method: "POST" }).validator((input) => objectType({ key: enumType(["profile", "siteSettings"]) }).parse(input)).handler(createSsrRpc("5564a1b20e9f6a7909e4cf26ea636118f8d0073700dcb44f20d6584455349725"));
createServerFn({ method: "POST" }).validator((input) => objectType({
	key: enumType(["profile", "siteSettings"]),
	values: unknownType()
}).parse(input)).handler(createSsrRpc("894f7311f75c781e546efea95a3ac457b335ef3949cc1844b89110d154897f62"));
createServerFn({ method: "GET" }).handler(createSsrRpc("6ff7f8d91edb694547b4b6e2145e8c698a3e06c88db83b7fa0f5f51b0fa523c7"));
var runSeed = createServerFn({ method: "POST" }).handler(createSsrRpc("f47e655c43a19b491fc0ea06fa846203d81dbfb3e010eaeabe92a1e5901c7adf"));
//#endregion
export { logout as a, submitMessage as c, login as i, fetchPortfolio as n, runSeed as o, fetchProject as r, setupAdmin as s, authStatus as t };
