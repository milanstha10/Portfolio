import { i as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { i as messageSchema, r as SKILL_CATEGORIES } from "./schema-DqBBgFmX.mjs";
import { c as submitMessage } from "./api.functions-CzPWY4Yc.mjs";
import { C as CodeXml, E as ArrowUpRight, O as ArrowDown, S as Compass, T as Award, _ as GraduationCap, a as Star, b as ExternalLink, c as Send, d as MapPin, f as Mail, g as ImageOff, h as Linkedin, i as Sun, l as Moon, m as LoaderCircle, n as X, r as Target, s as Server, t as lucide_react_exports, u as Menu, v as Github, w as Calendar, x as Database, y as FileText } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as idOf, i as NAV_LINKS, o as list, r as Route$2, s as text } from "./router-DP-nixOy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DYiO5xYQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, as: Tag = "div", delay = 0, className = "", ...rest }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -40px 0px"
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		style: { transitionDelay: `${delay}ms` },
		className: `transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`,
		...rest,
		children
	});
}
function Section({ id, eyebrow, title, description, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		"aria-labelledby": `${id}-heading`,
		className: `scroll-mt-24 py-20 sm:py-24 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: `${id}-heading`,
						className: "mt-3 text-3xl font-semibold sm:text-4xl",
						children: title
					}),
					description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: description
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children
			})]
		})
	});
}
function EmptyState({ message, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card flex flex-col items-center justify-center gap-2 px-6 py-14 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-foreground",
			children: message
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md text-sm text-muted-foreground",
			children: hint
		}) : null]
	});
}
function About({ data }) {
	const profile = data.profile ?? {};
	const learning = list(profile["learning"]);
	const paragraphs = text(profile["longBio"]).split("\n\n").filter(Boolean);
	const stats = [
		{
			value: text(profile["statsYears"]),
			label: "Years learning"
		},
		{
			value: text(profile["statsTech"]),
			label: "Technologies"
		},
		{
			value: text(profile["statsProjects"]),
			label: "Projects"
		},
		{
			value: "∞",
			label: "Curiosity"
		}
	].filter((stat) => stat.value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "about",
		eyebrow: "About",
		title: "A student developer, learning by building",
		description: text(profile["shortBio"]) || void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "surface-card p-6 sm:p-8",
				children: [paragraphs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base",
					children: paragraphs.map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, index))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Add your bio from the admin dashboard — it is stored in MongoDB, not in the source code."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
								className: "size-4 text-primary",
								"aria-hidden": true
							}),
							label: "Academic status",
							children: text(profile["title"], "BIT student")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
								className: "size-4 text-secondary",
								"aria-hidden": true
							}),
							label: "Availability",
							children: text(profile["availability"], "Open to learning opportunities")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
								className: "size-4 text-accent",
								"aria-hidden": true
							}),
							label: "Based in",
							children: text(profile["location"], "—")
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "surface-card p-6",
					delay: 80,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: "Currently learning"
					}), learning.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-wrap gap-2",
						children: learning.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-lg border border-border bg-surface-light/60 px-2.5 py-1.5 text-xs text-foreground",
							children: item
						}, item))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Nothing added yet."
					})]
				}), stats.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "surface-card grid grid-cols-2 gap-4 p-6",
					delay: 140,
					children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold text-foreground",
						children: stat.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: stat.label
					})] }, stat.label))
				}) : null]
			})]
		})
	});
}
function Fact({ icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-light/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
			className: "flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-2 text-sm font-medium text-foreground",
			children
		})]
	});
}
/** Renders a Lucide icon by name (icon names are stored in MongoDB). */
function Icon({ name, fallback = "Sparkles", ...props }) {
	const map = lucide_react_exports;
	const Component = name && map[name] || map[fallback] || map["Sparkles"];
	if (!Component) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		"aria-hidden": true,
		...props
	});
}
function Contact({ data }) {
	const send = useServerFn(submitMessage);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const profile = data.profile ?? {};
	async function onSubmit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const values = Object.fromEntries(new FormData(form).entries());
		const parsed = messageSchema.safeParse(values);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
			setErrors(next);
			return;
		}
		setErrors({});
		setPending(true);
		try {
			await send({ data: parsed.data });
			toast.success("Message sent", { description: "Thanks for reaching out — I'll reply soon." });
			form.reset();
		} catch {
			toast.error("Could not send your message", { description: "Please try again in a moment." });
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "contact",
		eyebrow: "Contact",
		title: "Let's talk",
		description: "Messages are stored securely in the database and only visible from the admin dashboard.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "surface-card space-y-5 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: "Get in touch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Open to internships, collaborations, and interesting student projects."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm",
						children: [text(profile["email"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
								className: "size-4 text-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${text(profile["email"])}`,
								className: "hover:text-primary",
								children: text(profile["email"])
							})]
						}) : null, text(profile["location"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "size-4 text-secondary",
								"aria-hidden": true
							}), text(profile["location"])]
						}) : null]
					}),
					data.socialLinks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 pt-2",
						children: data.socialLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: text(link["url"]),
							target: "_blank",
							rel: "noreferrer noopener",
							"aria-label": text(link["platform"]),
							className: "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: text(link["icon"], "Link"),
								className: "size-3.5"
							}), text(link["platform"])]
						}, idOf(link)))
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				as: "form",
				delay: 80,
				className: "surface-card space-y-4 p-6",
				onSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "name",
							label: "Name",
							error: errors["name"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "email",
							label: "Email",
							type: "email",
							error: errors["email"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "subject",
						label: "Subject",
						error: errors["subject"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "message",
						label: "Message",
						textarea: true,
						error: errors["message"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: pending,
						className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
						children: [pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "size-4 animate-spin",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
							className: "size-4",
							"aria-hidden": true
						}), pending ? "Sending..." : "Send message"]
					})
				]
			})]
		})
	});
}
function Field({ name, label, type = "text", textarea, error }) {
	const shared = "mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs tracking-wide text-muted-foreground uppercase",
				children: label
			}),
			textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: name,
				name,
				rows: 5,
				className: shared,
				"aria-invalid": Boolean(error)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: name,
				name,
				type,
				className: shared,
				"aria-invalid": Boolean(error)
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-destructive",
				children: error
			}) : null
		]
	});
}
function Hero({ data }) {
	const profile = data.profile ?? {};
	const settings = data.settings ?? {};
	const name = text(profile["name"], "[YOUR NAME]");
	const heading = text(settings["heroHeading"], `Hi, I'm ${name}`);
	const description = text(settings["heroDescription"], "I build thoughtful digital experiences and practical software solutions.");
	const badge = text(profile["badge"], "BIT Student • Full-Stack Developer • Problem Solver");
	const resumeUrl = text(settings["resumeUrl"]);
	const photo = text(profile["photo"]);
	const learning = list(profile["learning"]).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		"aria-labelledby": "hero-heading",
		className: "relative overflow-hidden pt-32 pb-20 sm:pt-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid-backdrop pointer-events-none absolute inset-0 -z-10",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -top-40 left-1/2 -z-10 size-[38rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]",
				style: { background: "radial-gradient(circle, var(--color-primary), transparent 65%)" },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface-light/60 px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground sm:text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-1.5 rounded-full bg-success",
								"aria-hidden": true
							}), badge]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							id: "hero-heading",
							className: "mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: heading
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl",
							children: description
						}),
						text(profile["longBio"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground",
							children: text(profile["longBio"]).split("\n\n")[0]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#projects",
									className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5",
									children: ["View My Projects", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
										className: "size-4",
										"aria-hidden": true
									})]
								}),
								resumeUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: resumeUrl,
									target: "_blank",
									rel: "noreferrer noopener",
									className: "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-light",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										className: "size-4",
										"aria-hidden": true
									}), "Download Resume"]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#contact",
									className: "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-light",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										className: "size-4",
										"aria-hidden": true
									}), "Contact Me"]
								})
							]
						}),
						learning.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-10 flex flex-wrap gap-2",
							"aria-label": "Technologies I work with",
							children: learning.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground",
								children: item
							}, item))
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "surface-card relative aspect-square overflow-hidden",
							children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: photo,
								alt: `Portrait of ${name}`,
								loading: "eager",
								className: "size-full object-cover",
								width: 480,
								height: 480
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-full place-items-center bg-surface-light",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid size-20 place-items-center rounded-2xl border border-border bg-surface font-display text-2xl",
										children: name.replace(/[[\]]/g, "").slice(0, 1) || "?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 px-6 text-xs text-muted-foreground",
										children: "Add your profile photo URL from the admin dashboard."
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
							className: "-left-4 top-8",
							delay: 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {
								className: "size-4 text-primary",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
							className: "-right-3 top-1/3",
							delay: 1200,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {
								className: "size-4 text-secondary",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
							className: "-left-3 bottom-10",
							delay: 2400,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
								className: "size-4 text-accent",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
							className: "-right-4 bottom-1/4",
							delay: 600,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {
								className: "size-4 text-muted-foreground",
								"aria-hidden": true
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page mt-16 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#about",
					"aria-label": "Scroll to about section",
					className: "inline-flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground",
					children: ["Scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
						className: "size-4 animate-bounce",
						"aria-hidden": true
					})]
				})
			})
		]
	});
}
function FloatingIcon({ children, className, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		style: { animationDelay: `${delay}ms` },
		className: `glass-panel absolute grid size-10 animate-float place-items-center rounded-xl ${className}`,
		children
	});
}
var ThemeContext = (0, import_react.createContext)({
	theme: "dark",
	toggle: () => {}
});
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
function ThemeToggle({ className = "" }) {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
		className: `inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground ${className}`,
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
			className: "size-4",
			"aria-hidden": true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
			className: "size-4",
			"aria-hidden": true
		})
	});
}
function Navbar({ data }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const profile = data.profile ?? {};
	const resumeUrl = text(data.settings?.["resumeUrl"]);
	const name = text(profile["name"], "Portfolio");
	const initials = name.replace(/[[\]]/g, "").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass-panel border-b py-2 shadow-soft" : "border-b border-transparent py-3"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": "Primary",
			className: "container-page flex items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#home",
					className: "flex items-center gap-2 rounded-lg font-display text-sm font-semibold tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-primary font-mono text-xs text-primary-foreground",
						children: initials || "•"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${link.id}`,
						className: "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground",
						children: link.label
					}) }, link.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						resumeUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: resumeUrl,
							target: "_blank",
							rel: "noreferrer noopener",
							className: "hidden items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								className: "size-4",
								"aria-hidden": true
							}), "Resume"]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, {
							href: text(profile["github"]),
							label: "GitHub",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {
								className: "size-4",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, {
							href: text(profile["linkedin"]),
							label: "LinkedIn",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
								className: "size-4",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": open ? "Close menu" : "Open menu",
							"aria-expanded": open,
							onClick: () => setOpen((v) => !v),
							className: "inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "size-4",
								"aria-hidden": true
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
								className: "size-4",
								"aria-hidden": true
							})
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `glass-panel overflow-hidden border-t transition-[max-height,opacity] duration-300 lg:hidden ${open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "container-page grid gap-1 py-4",
				children: [NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${link.id}`,
					onClick: () => setOpen(false),
					className: "block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground",
					children: link.label
				}) }, link.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					className: "block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground",
					children: "Admin"
				}) })]
			})
		})]
	});
}
function IconLink({ href, label, children }) {
	if (!href) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer noopener",
		"aria-label": label,
		className: "hidden size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground sm:inline-flex",
		children
	});
}
function Projects({ data }) {
	const categories = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(data.projects.map((p) => text(p["category"])).filter(Boolean)))], [data.projects]);
	const [active, setActive] = (0, import_react.useState)("All");
	const [onlyFeatured, setOnlyFeatured] = (0, import_react.useState)(false);
	const visible = data.projects.filter((project) => (active === "All" || project["category"] === active) && (!onlyFeatured || project["featured"] === true));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "projects",
		eyebrow: "Projects",
		title: "Things I have built",
		description: "Every project below is loaded from MongoDB through the site's API — nothing here is hardcoded.",
		children: [data.projects.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex flex-wrap items-center gap-2",
			children: [categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setActive(category),
				"aria-pressed": active === category,
				className: `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${active === category ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-surface-light hover:text-foreground"}`,
				children: category
			}, category)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOnlyFeatured((v) => !v),
				"aria-pressed": onlyFeatured,
				className: `ml-auto inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${onlyFeatured ? "border-accent text-accent" : "border-border text-muted-foreground hover:bg-surface-light hover:text-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
					className: "size-3.5",
					"aria-hidden": true
				}), "Featured only"]
			})]
		}) : null, visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			message: "No projects have been added yet.",
			hint: "Sign in to the admin dashboard and add your first project."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
			children: visible.map((project, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
				project,
				delay: index * 60
			}, idOf(project)))
		})]
	});
}
function ProjectCard({ project, delay = 0 }) {
	const title = text(project["title"]);
	const image = text(project["image"]);
	const slug = text(project["slug"]);
	const technologies = list(project["technologies"]).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
		as: "article",
		delay,
		className: "surface-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-16/9 overflow-hidden bg-surface-light",
			children: [image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: `${title} preview`,
				loading: "lazy",
				className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-full place-items-center text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
					className: "size-6",
					"aria-hidden": true
				})
			}), project["featured"] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
					className: "size-3",
					"aria-hidden": true
				}), " Featured"]
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-wide text-accent uppercase",
					children: text(project["category"])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-display text-lg leading-snug font-semibold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
					children: text(project["shortDescription"])
				}),
				technologies.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-wrap gap-1.5",
					children: technologies.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground",
						children: tech
					}, tech))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-2 pt-1",
					children: [
						slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/projects/$slug",
							params: { slug },
							className: "rounded-lg bg-surface-light px-3 py-1.5 text-xs font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
							children: "View details"
						}) : null,
						text(project["githubUrl"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: text(project["githubUrl"]),
							target: "_blank",
							rel: "noreferrer noopener",
							className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {
								className: "size-3.5",
								"aria-hidden": true
							}), " Code"]
						}) : null,
						text(project["liveUrl"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: text(project["liveUrl"]),
							target: "_blank",
							rel: "noreferrer noopener",
							className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								className: "size-3.5",
								"aria-hidden": true
							}), " Live"]
						}) : null
					]
				})
			]
		})]
	});
}
function TimelineItem({ record, isLast }) {
	const title = text(record["degree"]) || text(record["position"]);
	const org = text(record["institution"]) || text(record["organization"]);
	const start = text(record["startYear"]) || text(record["startDate"]);
	const end = record["current"] ? "Present" : text(record["endYear"]) || text(record["endDate"]) || "—";
	const tech = list(record["technologies"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "relative pl-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-1.5 left-[11px] size-3 rounded-full border-2 border-primary bg-background",
				"aria-hidden": true
			}),
			!isLast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-5 bottom-0 left-4 w-px bg-border",
				"aria-hidden": true
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
									className: "size-3",
									"aria-hidden": true
								}),
								start,
								" — ",
								end
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-secondary",
						children: org
					}),
					text(record["university"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: text(record["university"])
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground",
						children: [
							text(record["location"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "size-3",
									"aria-hidden": true
								}), text(record["location"])]
							}) : null,
							text(record["grade"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Grade: ", text(record["grade"])] }) : null,
							text(record["type"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text(record["type"]) }) : null
						]
					}),
					text(record["description"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: text(record["description"])
					}) : null,
					tech.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-1.5",
						children: tech.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground",
							children: item
						}, item))
					}) : null
				]
			})
		]
	});
}
function EducationSection({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "education",
		eyebrow: "Education",
		title: "Academic background",
		children: data.education.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { message: "No education records have been added yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			as: "ol",
			className: "space-y-5",
			children: data.education.map((record, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
				record,
				isLast: index === data.education.length - 1
			}, idOf(record)))
		})
	});
}
function ExperienceSection({ data }) {
	const note = text(data.profile?.["experienceNote"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "experience",
		eyebrow: "Experience",
		title: "Where I have applied what I learn",
		children: data.experience.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { message: note || "Currently building experience through academic projects, personal projects, and continuous learning." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			as: "ol",
			className: "space-y-5",
			children: data.experience.map((record, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
				record,
				isLast: index === data.experience.length - 1
			}, idOf(record)))
		})
	});
}
function CertificationsSection({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "certifications",
		eyebrow: "Certifications",
		title: "Courses and credentials",
		children: data.certifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { message: "No certifications have been added yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
			children: data.certifications.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "surface-card flex flex-col p-5",
				delay: index * 60,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
						className: "size-5 text-accent",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-display text-base font-semibold",
						children: text(item["name"])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-secondary",
						children: text(item["organization"])
					}),
					text(item["issueDate"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-[11px] text-muted-foreground",
						children: ["Issued ", text(item["issueDate"])]
					}) : null,
					text(item["description"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: text(item["description"])
					}) : null,
					text(item["credentialUrl"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: text(item["credentialUrl"]),
						target: "_blank",
						rel: "noreferrer noopener",
						className: "mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-surface-light",
						children: ["View credential ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							className: "size-3.5",
							"aria-hidden": true
						})]
					}) : null
				]
			}, idOf(item)))
		})
	});
}
function AchievementsSection({ data }) {
	if (data.achievements.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "achievements",
		eyebrow: "Achievements",
		title: "Milestones and participation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: data.achievements.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "surface-card p-5",
				delay: index * 60,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-wide text-accent uppercase",
						children: text(item["category"])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-base font-semibold",
						children: text(item["title"])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [text(item["organization"]), text(item["date"]) ? ` · ${text(item["date"])}` : ""]
					}),
					text(item["description"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: text(item["description"])
					}) : null
				]
			}, idOf(item)))
		})
	});
}
function ServicesSection({ data }) {
	if (data.services.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "services",
		eyebrow: "What I can do",
		title: "Capabilities I am building",
		description: "Areas I can already contribute to as a student developer, and keep improving in.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-4",
			children: data.services.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "surface-card p-5",
				delay: index * 60,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 place-items-center rounded-xl border border-border bg-surface-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: text(item["icon"], "Sparkles"),
							className: "size-4 text-primary"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-base font-semibold",
						children: text(item["title"])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: text(item["description"])
					})
				]
			}, idOf(item)))
		})
	});
}
function ResumeSection({ data }) {
	const url = text(data.settings?.["resumeUrl"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "resume",
		eyebrow: "Resume",
		title: "My resume",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "surface-card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-11 place-items-center rounded-xl border border-border bg-surface-light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						className: "size-5 text-primary",
						"aria-hidden": true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-base font-semibold",
					children: url ? "Resume available" : "Resume not uploaded yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: url ? "Download or preview the latest version of my resume." : "The active resume file is managed from the admin dashboard."
				})] })]
			}), url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: url,
					target: "_blank",
					rel: "noreferrer noopener",
					className: "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
					children: "Download resume"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: url,
					target: "_blank",
					rel: "noreferrer noopener",
					className: "rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-light",
					children: "Preview"
				})]
			}) : null]
		})
	});
}
var CATEGORY_ICONS = {
	Frontend: "MonitorSmartphone",
	Backend: "Server",
	Database: "Database",
	Programming: "Braces",
	Tools: "Wrench",
	Other: "Sparkles"
};
function Skills({ data }) {
	const grouped = SKILL_CATEGORIES.map((category) => ({
		category,
		skills: data.skills.filter((skill) => skill["category"] === category)
	})).filter((group) => group.skills.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "skills",
		eyebrow: "Skills",
		title: "Technologies I work with",
		description: "Grouped by area, with an honest indication of how comfortable I currently am with each one.",
		children: grouped.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			message: "No skills have been added yet.",
			hint: "Add them from the admin dashboard."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
			children: grouped.map((group, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "surface-card p-6",
				delay: index * 60,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg border border-border bg-surface-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: CATEGORY_ICONS[group.category],
							className: "size-4 text-primary"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: group.category
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-4",
					children: group.skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillRow, { skill }, String(skill["_id"])))
				})]
			}, group.category))
		})
	});
}
function SkillRow({ skill }) {
	const percentage = typeof skill["percentage"] === "number" ? skill["percentage"] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 text-sm font-medium text-foreground",
			children: [text(skill["icon"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: text(skill["icon"]),
				className: "size-3.5 text-muted-foreground"
			}) : null, text(skill["name"])]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[11px] text-muted-foreground",
			children: text(skill["level"])
		})]
	}), percentage !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 h-1.5 overflow-hidden rounded-full bg-surface-light",
		role: "progressbar",
		"aria-label": `${text(skill["name"])} proficiency`,
		"aria-valuenow": percentage,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-primary transition-[width] duration-700",
			style: { width: `${percentage}%` }
		})
	}) : null] });
}
function Index() {
	const data = Route$2.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { data }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationSection, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceSection, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationsSection, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AchievementsSection, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesSection, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeSection, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, { data })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { data })
	] });
}
function Footer({ data }) {
	const name = text(data.profile?.["name"], "[YOUR NAME]");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex flex-col items-center justify-between gap-4 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					name,
					". Built with React, Tailwind CSS and MongoDB."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: data.socialLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: text(link["url"]),
					target: "_blank",
					rel: "noreferrer noopener",
					className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
					children: text(link["platform"])
				}, idOf(link)))
			})]
		})
	});
}
//#endregion
export { Index as component };
