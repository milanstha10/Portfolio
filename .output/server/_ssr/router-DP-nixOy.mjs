import { i as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, n as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { M as notFound, _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as __exportAll } from "./server-Bp3OZmAf.mjs";
import { n as fetchPortfolio, r as fetchProject } from "./api.functions-CzPWY4Yc.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-B7jWrlDu.js
var EMPTY_PORTFOLIO = {
	profile: null,
	settings: null,
	projects: [],
	skills: [],
	education: [],
	experience: [],
	certifications: [],
	achievements: [],
	services: [],
	socialLinks: []
};
var NAV_LINKS = [
	{
		id: "home",
		label: "Home"
	},
	{
		id: "about",
		label: "About"
	},
	{
		id: "skills",
		label: "Skills"
	},
	{
		id: "projects",
		label: "Projects"
	},
	{
		id: "education",
		label: "Education"
	},
	{
		id: "experience",
		label: "Experience"
	},
	{
		id: "certifications",
		label: "Certifications"
	},
	{
		id: "contact",
		label: "Contact"
	}
];
function text(value, fallback = "") {
	return typeof value === "string" && value.trim() ? value : fallback;
}
function idOf(record) {
	const raw = record["_id"];
	if (typeof raw === "string") return raw;
	if (raw && typeof raw === "object" && "$oid" in raw) return String(raw.$oid);
	return String(raw ?? "");
}
function list(value) {
	return Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DP-nixOy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D9EvEu0Y.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error("[app] Route error:", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Milan's Portfolio" },
			{
				name: "description",
				content: "Personal portfolio and projects."
			},
			{
				property: "og:title",
				content: "Milan's Portfolio"
			},
			{
				property: "og:description",
				content: "Personal portfolio and projects."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$2 = () => import("./routes-DYiO5xYQ.mjs");
var Route$2 = createFileRoute("/")({
	loader: async () => {
		try {
			return (await fetchPortfolio()).content ?? EMPTY_PORTFOLIO;
		} catch {
			return EMPTY_PORTFOLIO;
		}
	},
	head: () => ({ meta: [
		{ title: "Portfolio — BIT Student & Full-Stack Developer" },
		{
			name: "description",
			content: "Portfolio of a Bachelor of Information Technology student: projects, skills, education, certifications and contact details."
		},
		{
			property: "og:title",
			content: "Portfolio — BIT Student & Full-Stack Developer"
		},
		{
			property: "og:description",
			content: "Projects, skills, education and certifications of a BIT student developer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin-DZgekuRi.mjs");
var Route$1 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Admin — Portfolio content manager" },
		{
			name: "description",
			content: "Secure admin area for managing portfolio content."
		},
		{
			property: "og:title",
			content: "Admin — Portfolio content manager"
		},
		{
			property: "og:description",
			content: "Secure admin area for managing portfolio content."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./projects._slug-Da9xbmOr.mjs");
var Route = createFileRoute("/projects/$slug")({
	loader: async ({ params }) => {
		const result = await fetchProject({ data: { slug: params.slug } });
		if (!result.project) throw notFound();
		return result.project;
	},
	head: ({ loaderData }) => {
		const title = text(loaderData?.["title"], "Project");
		const description = text(loaderData?.["shortDescription"], "Project details.");
		return { meta: [
			{ title: `${title} — Project case study` },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: `${title} — Project case study`
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AdminRoute: Route$1.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$3
	}),
	ProjectsSlugRoute: Route.update({
		id: "/projects/$slug",
		path: "/projects/$slug",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { idOf as a, NAV_LINKS as i, Route as n, list as o, Route$2 as r, text as s, router_exports as t };
