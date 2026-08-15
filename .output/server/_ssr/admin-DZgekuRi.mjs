import { i as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { a as logout, i as login, o as runSeed, s as setupAdmin, t as authStatus } from "./api.functions-CzPWY4Yc.mjs";
import { D as ArrowLeft, m as LoaderCircle, o as ShieldCheck, p as LogOut } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DZgekuRi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const queryClient = useQueryClient();
	const status = useServerFn(authStatus);
	const doLogin = useServerFn(login);
	const doSetup = useServerFn(setupAdmin);
	const doLogout = useServerFn(logout);
	const doSeed = useServerFn(runSeed);
	const [pending, setPending] = (0, import_react.useState)(false);
	const { data, isLoading } = useQuery({
		queryKey: ["auth-status"],
		queryFn: () => status()
	});
	async function onSubmit(event) {
		event.preventDefault();
		const values = Object.fromEntries(new FormData(event.currentTarget).entries());
		setPending(true);
		try {
			if (data && !data.configured) {
				await doSetup({ data: {
					email: values["email"] ?? "",
					password: values["password"] ?? ""
				} });
				toast.success("Admin account created");
			} else {
				await doLogin({ data: {
					email: values["email"] ?? "",
					password: values["password"] ?? ""
				} });
				toast.success("Signed in");
			}
			await queryClient.invalidateQueries({ queryKey: ["auth-status"] });
		} catch {
			toast.error("Sign-in failed", { description: "Check your credentials and try again." });
		} finally {
			setPending(false);
		}
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-5 animate-spin text-muted-foreground",
			"aria-hidden": true
		})
	});
	if (!data?.admin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card w-full max-w-sm p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 place-items-center rounded-xl border border-border bg-surface-light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						className: "size-5 text-primary",
						"aria-hidden": true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-xl font-semibold",
					children: data?.configured ? "Admin sign in" : "Create admin account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: data?.configured ? "Enter your credentials to manage portfolio content." : "No admin exists yet. Set your credentials to secure the dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-4",
					onSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-wide text-muted-foreground uppercase",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "email",
								type: "email",
								required: true,
								className: "mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-wide text-muted-foreground uppercase",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "password",
								type: "password",
								required: true,
								minLength: 8,
								className: "mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending,
							className: "w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60",
							children: pending ? "Please wait..." : data?.configured ? "Sign in" : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "size-3.5",
						"aria-hidden": true
					}), " Back to portfolio"]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen pt-10 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Content dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: ["Signed in as ", data.admin?.email]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: async () => {
							setPending(true);
							try {
								await doSeed();
								toast.success("Demo content loaded");
							} catch {
								toast.error("Could not load demo content");
							} finally {
								setPending(false);
							}
						},
						disabled: pending,
						className: "rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-light disabled:opacity-60",
						children: "Load demo content"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: async () => {
							await doLogout();
							queryClient.clear();
							await queryClient.invalidateQueries({ queryKey: ["auth-status"] });
						},
						className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
							className: "size-4",
							"aria-hidden": true
						}), " Sign out"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "surface-card mt-8 p-6 text-sm text-muted-foreground",
				children: "Full CRUD editors for projects, skills, education, experience, certifications, achievements, services, social links and messages are next — the secure API behind them is already live."
			})]
		})
	});
}
//#endregion
export { AdminPage as component };
