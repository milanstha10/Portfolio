import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowLeft, b as ExternalLink, v as Github } from "../_libs/lucide-react.mjs";
import { n as Route, o as list, s as text } from "./router-DP-nixOy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._slug-Da9xbmOr.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectDetail() {
	const project = Route.useLoaderData();
	const technologies = list(project["technologies"]);
	const features = list(project["features"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "pt-24 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "container-page max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "size-4",
						"aria-hidden": true
					}), " Back to portfolio"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-mono text-[11px] tracking-wide text-accent uppercase",
					children: text(project["category"])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-semibold sm:text-4xl",
					children: text(project["title"])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base text-muted-foreground",
					children: text(project["shortDescription"])
				}),
				text(project["image"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: text(project["image"]),
					alt: `${text(project["title"])} screenshot`,
					className: "surface-card mt-8 w-full object-cover",
					loading: "lazy"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base",
					children: [[
						"description",
						"problem",
						"solution",
						"challenges",
						"learnings"
					].map((key) => text(project[key]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold text-foreground capitalize",
						children: key
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-line",
						children: text(project[key])
					})] }, key) : null), features.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold text-foreground",
						children: "Key features"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 list-disc space-y-1 pl-5",
						children: features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: feature }, feature))
					})] }) : null]
				}),
				technologies.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 flex flex-wrap gap-2",
					children: technologies.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground",
						children: tech
					}, tech))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [text(project["githubUrl"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: text(project["githubUrl"]),
						target: "_blank",
						rel: "noreferrer noopener",
						className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {
							className: "size-4",
							"aria-hidden": true
						}), " Source code"]
					}) : null, text(project["liveUrl"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: text(project["liveUrl"]),
						target: "_blank",
						rel: "noreferrer noopener",
						className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							className: "size-4",
							"aria-hidden": true
						}), " Live demo"]
					}) : null]
				})
			]
		})
	});
}
//#endregion
export { ProjectDetail as component };
