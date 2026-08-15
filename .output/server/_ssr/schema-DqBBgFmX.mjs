import { a as literalType, i as enumType, n as booleanType, o as objectType, r as coerce, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-DqBBgFmX.js
/**
* Single source of truth for the portfolio content model.
*
* Each entry describes one MongoDB collection: its Zod validation schema
* (used on BOTH the client form and the server API) and the field metadata the
* admin dashboard uses to render tables and forms.
*/
var optionalUrl = stringType().trim().max(500).refine((v) => v === "" || /^https?:\/\/.+/i.test(v), { message: "Must be a valid http(s) URL" }).optional().or(literalType(""));
var tags = arrayType(stringType().trim().min(1).max(40)).max(30).default([]);
var PROJECT_CATEGORIES = [
	"Web Development",
	"Full Stack",
	"Java",
	"Python",
	"Database",
	"Academic",
	"Personal"
];
var SKILL_CATEGORIES = [
	"Frontend",
	"Backend",
	"Database",
	"Programming",
	"Tools",
	"Other"
];
var SKILL_LEVELS = [
	"Learning",
	"Familiar",
	"Comfortable",
	"Confident"
];
var projectSchema = objectType({
	title: stringType().trim().min(2, "Title is required").max(120),
	slug: stringType().trim().regex(/^[a-z0-9-]*$/, "Lowercase letters, numbers and dashes only").max(120).optional().or(literalType("")),
	shortDescription: stringType().trim().min(10, "Short description is required").max(300),
	description: stringType().trim().max(6e3).optional().or(literalType("")),
	problem: stringType().trim().max(2e3).optional().or(literalType("")),
	solution: stringType().trim().max(2e3).optional().or(literalType("")),
	features: tags,
	role: stringType().trim().max(200).optional().or(literalType("")),
	challenges: stringType().trim().max(2e3).optional().or(literalType("")),
	learned: stringType().trim().max(2e3).optional().or(literalType("")),
	technologies: arrayType(stringType().trim().min(1)).min(1, "Add at least one technology"),
	category: enumType(PROJECT_CATEGORIES),
	image: optionalUrl,
	gallery: tags,
	githubUrl: optionalUrl,
	liveUrl: optionalUrl,
	featured: booleanType().default(false),
	status: enumType(["draft", "published"]).default("draft"),
	completionDate: stringType().trim().max(30).optional().or(literalType("")),
	order: coerce.number().int().min(0).max(999).default(0),
	demo: booleanType().default(false)
});
var skillSchema = objectType({
	name: stringType().trim().min(1, "Name is required").max(60),
	category: enumType(SKILL_CATEGORIES),
	icon: stringType().trim().max(40).optional().or(literalType("")),
	level: enumType(SKILL_LEVELS).default("Learning"),
	percentage: coerce.number().int().min(0).max(100).optional(),
	order: coerce.number().int().min(0).max(999).default(0)
});
var educationSchema = objectType({
	institution: stringType().trim().min(2, "Institution is required").max(140),
	degree: stringType().trim().min(2, "Degree is required").max(140),
	field: stringType().trim().max(140).optional().or(literalType("")),
	university: stringType().trim().max(140).optional().or(literalType("")),
	startYear: stringType().trim().min(4, "Start year is required").max(20),
	endYear: stringType().trim().max(20).optional().or(literalType("")),
	current: booleanType().default(false),
	grade: stringType().trim().max(40).optional().or(literalType("")),
	location: stringType().trim().max(120).optional().or(literalType("")),
	description: stringType().trim().max(1200).optional().or(literalType("")),
	order: coerce.number().int().min(0).max(999).default(0)
});
var experienceSchema = objectType({
	position: stringType().trim().min(2, "Position is required").max(140),
	organization: stringType().trim().min(2, "Organization is required").max(140),
	type: enumType([
		"Internship",
		"Freelance",
		"Academic Project",
		"Volunteer",
		"Leadership",
		"Part-time"
	]).default("Academic Project"),
	startDate: stringType().trim().min(4, "Start date is required").max(30),
	endDate: stringType().trim().max(30).optional().or(literalType("")),
	current: booleanType().default(false),
	location: stringType().trim().max(120).optional().or(literalType("")),
	description: stringType().trim().max(2e3).optional().or(literalType("")),
	technologies: tags,
	order: coerce.number().int().min(0).max(999).default(0)
});
var certificationSchema = objectType({
	name: stringType().trim().min(2, "Name is required").max(160),
	organization: stringType().trim().min(2, "Issuing organization is required").max(140),
	issueDate: stringType().trim().max(30).optional().or(literalType("")),
	expiryDate: stringType().trim().max(30).optional().or(literalType("")),
	credentialId: stringType().trim().max(120).optional().or(literalType("")),
	credentialUrl: optionalUrl,
	image: optionalUrl,
	description: stringType().trim().max(1e3).optional().or(literalType("")),
	order: coerce.number().int().min(0).max(999).default(0)
});
var achievementSchema = objectType({
	title: stringType().trim().min(2, "Title is required").max(160),
	organization: stringType().trim().max(140).optional().or(literalType("")),
	date: stringType().trim().max(30).optional().or(literalType("")),
	category: enumType([
		"Hackathon",
		"Competition",
		"Academic",
		"Award",
		"Workshop",
		"Event",
		"Leadership",
		"Publication"
	]).default("Academic"),
	description: stringType().trim().max(1200).optional().or(literalType("")),
	image: optionalUrl,
	url: optionalUrl,
	order: coerce.number().int().min(0).max(999).default(0)
});
var serviceSchema = objectType({
	title: stringType().trim().min(2, "Title is required").max(120),
	description: stringType().trim().min(10, "Description is required").max(600),
	icon: stringType().trim().max(40).optional().or(literalType("")),
	order: coerce.number().int().min(0).max(999).default(0)
});
var socialLinkSchema = objectType({
	label: stringType().trim().min(1, "Label is required").max(60),
	url: stringType().trim().url("Must be a valid URL"),
	icon: stringType().trim().max(40).optional().or(literalType("")),
	order: coerce.number().int().min(0).max(999).default(0)
});
var profileSchema = objectType({
	name: stringType().trim().min(2, "Name is required").max(120),
	title: stringType().trim().max(160).optional().or(literalType("")),
	badge: stringType().trim().max(160).optional().or(literalType("")),
	shortBio: stringType().trim().max(400).optional().or(literalType("")),
	longBio: stringType().trim().max(4e3).optional().or(literalType("")),
	photo: optionalUrl,
	email: stringType().trim().email("Valid email required").or(literalType("")),
	phone: stringType().trim().max(40).optional().or(literalType("")),
	location: stringType().trim().max(120).optional().or(literalType("")),
	github: optionalUrl,
	linkedin: optionalUrl,
	website: optionalUrl,
	availability: stringType().trim().max(160).optional().or(literalType("")),
	learning: tags,
	statsYears: stringType().trim().max(20).optional().or(literalType("")),
	statsTech: stringType().trim().max(20).optional().or(literalType("")),
	statsProjects: stringType().trim().max(20).optional().or(literalType("")),
	experienceNote: stringType().trim().max(400).optional().or(literalType(""))
});
var settingsSchema = objectType({
	siteTitle: stringType().trim().max(120).optional().or(literalType("")),
	tagline: stringType().trim().max(200).optional().or(literalType("")),
	heroHeading: stringType().trim().max(200).optional().or(literalType("")),
	heroDescription: stringType().trim().max(800).optional().or(literalType("")),
	contactEmail: stringType().trim().email("Valid email required").or(literalType("")),
	footerText: stringType().trim().max(300).optional().or(literalType("")),
	resumeUrl: optionalUrl,
	seoTitle: stringType().trim().max(120).optional().or(literalType("")),
	seoDescription: stringType().trim().max(300).optional().or(literalType(""))
});
var messageSchema = objectType({
	name: stringType().trim().min(2, "Name is required").max(80),
	email: stringType().trim().email("Enter a valid email").max(160),
	subject: stringType().trim().min(3, "Subject is required").max(140),
	message: stringType().trim().min(10, "Message must be at least 10 characters").max(2e3)
});
var COLLECTIONS = {
	projects: {
		key: "projects",
		collection: "projects",
		label: "Projects",
		singular: "Project",
		icon: "FolderKanban",
		schema: projectSchema,
		sort: {
			order: 1,
			createdAt: -1
		},
		searchFields: ["title", "shortDescription"],
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
				column: true
			},
			{
				name: "slug",
				label: "Slug",
				type: "text",
				help: "Optional. Auto-generated from the title."
			},
			{
				name: "shortDescription",
				label: "Short description",
				type: "textarea"
			},
			{
				name: "description",
				label: "Full description",
				type: "textarea"
			},
			{
				name: "problem",
				label: "Problem",
				type: "textarea"
			},
			{
				name: "solution",
				label: "Solution",
				type: "textarea"
			},
			{
				name: "features",
				label: "Key features",
				type: "tags"
			},
			{
				name: "role",
				label: "My role",
				type: "text"
			},
			{
				name: "challenges",
				label: "Challenges",
				type: "textarea"
			},
			{
				name: "learned",
				label: "What I learned",
				type: "textarea"
			},
			{
				name: "technologies",
				label: "Technologies",
				type: "tags"
			},
			{
				name: "category",
				label: "Category",
				type: "select",
				options: [...PROJECT_CATEGORIES],
				column: true
			},
			{
				name: "image",
				label: "Cover image URL",
				type: "url"
			},
			{
				name: "gallery",
				label: "Gallery image URLs",
				type: "tags"
			},
			{
				name: "githubUrl",
				label: "GitHub URL",
				type: "url"
			},
			{
				name: "liveUrl",
				label: "Live demo URL",
				type: "url"
			},
			{
				name: "completionDate",
				label: "Completion date",
				type: "text",
				placeholder: "2026-05"
			},
			{
				name: "status",
				label: "Status",
				type: "select",
				options: ["draft", "published"],
				column: true
			},
			{
				name: "featured",
				label: "Featured",
				type: "switch",
				column: true
			},
			{
				name: "demo",
				label: "Demo/sample content",
				type: "switch"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	},
	skills: {
		key: "skills",
		collection: "skills",
		label: "Skills",
		singular: "Skill",
		icon: "Sparkles",
		schema: skillSchema,
		sort: {
			order: 1,
			name: 1
		},
		searchFields: ["name"],
		fields: [
			{
				name: "name",
				label: "Name",
				type: "text",
				column: true
			},
			{
				name: "category",
				label: "Category",
				type: "select",
				options: [...SKILL_CATEGORIES],
				column: true
			},
			{
				name: "level",
				label: "Proficiency",
				type: "select",
				options: [...SKILL_LEVELS],
				column: true
			},
			{
				name: "percentage",
				label: "Percentage (optional)",
				type: "number",
				help: "Leave empty to hide the bar."
			},
			{
				name: "icon",
				label: "Lucide icon name",
				type: "text",
				placeholder: "Code"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	},
	education: {
		key: "education",
		collection: "education",
		label: "Education",
		singular: "Education record",
		icon: "GraduationCap",
		schema: educationSchema,
		sort: { order: 1 },
		searchFields: ["institution", "degree"],
		fields: [
			{
				name: "degree",
				label: "Degree",
				type: "text",
				column: true
			},
			{
				name: "institution",
				label: "Institution",
				type: "text",
				column: true
			},
			{
				name: "university",
				label: "University",
				type: "text"
			},
			{
				name: "field",
				label: "Field of study",
				type: "text"
			},
			{
				name: "startYear",
				label: "Start year",
				type: "text",
				column: true
			},
			{
				name: "endYear",
				label: "End year",
				type: "text"
			},
			{
				name: "current",
				label: "Currently studying",
				type: "switch"
			},
			{
				name: "grade",
				label: "Grade / GPA",
				type: "text"
			},
			{
				name: "location",
				label: "Location",
				type: "text"
			},
			{
				name: "description",
				label: "Description",
				type: "textarea"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	},
	experience: {
		key: "experience",
		collection: "experience",
		label: "Experience",
		singular: "Experience record",
		icon: "Briefcase",
		schema: experienceSchema,
		sort: { order: 1 },
		searchFields: ["position", "organization"],
		fields: [
			{
				name: "position",
				label: "Position",
				type: "text",
				column: true
			},
			{
				name: "organization",
				label: "Organization",
				type: "text",
				column: true
			},
			{
				name: "type",
				label: "Type",
				type: "select",
				options: [
					"Internship",
					"Freelance",
					"Academic Project",
					"Volunteer",
					"Leadership",
					"Part-time"
				],
				column: true
			},
			{
				name: "startDate",
				label: "Start date",
				type: "text",
				placeholder: "2025-06"
			},
			{
				name: "endDate",
				label: "End date",
				type: "text"
			},
			{
				name: "current",
				label: "Current",
				type: "switch"
			},
			{
				name: "location",
				label: "Location",
				type: "text"
			},
			{
				name: "description",
				label: "Description",
				type: "textarea"
			},
			{
				name: "technologies",
				label: "Technologies",
				type: "tags"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	},
	certifications: {
		key: "certifications",
		collection: "certifications",
		label: "Certifications",
		singular: "Certification",
		icon: "BadgeCheck",
		schema: certificationSchema,
		sort: { order: 1 },
		searchFields: ["name", "organization"],
		fields: [
			{
				name: "name",
				label: "Certificate name",
				type: "text",
				column: true
			},
			{
				name: "organization",
				label: "Issuing organization",
				type: "text",
				column: true
			},
			{
				name: "issueDate",
				label: "Issue date",
				type: "text",
				column: true
			},
			{
				name: "expiryDate",
				label: "Expiry date",
				type: "text"
			},
			{
				name: "credentialId",
				label: "Credential ID",
				type: "text"
			},
			{
				name: "credentialUrl",
				label: "Credential URL",
				type: "url"
			},
			{
				name: "image",
				label: "Certificate image URL",
				type: "url"
			},
			{
				name: "description",
				label: "Description",
				type: "textarea"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	},
	achievements: {
		key: "achievements",
		collection: "achievements",
		label: "Achievements",
		singular: "Achievement",
		icon: "Trophy",
		schema: achievementSchema,
		sort: { order: 1 },
		searchFields: ["title", "organization"],
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
				column: true
			},
			{
				name: "organization",
				label: "Organization",
				type: "text",
				column: true
			},
			{
				name: "category",
				label: "Category",
				type: "select",
				options: [
					"Hackathon",
					"Competition",
					"Academic",
					"Award",
					"Workshop",
					"Event",
					"Leadership",
					"Publication"
				],
				column: true
			},
			{
				name: "date",
				label: "Date",
				type: "text"
			},
			{
				name: "description",
				label: "Description",
				type: "textarea"
			},
			{
				name: "image",
				label: "Image URL",
				type: "url"
			},
			{
				name: "url",
				label: "Reference URL",
				type: "url"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	},
	services: {
		key: "services",
		collection: "services",
		label: "Services",
		singular: "Service",
		icon: "Layers",
		schema: serviceSchema,
		sort: { order: 1 },
		searchFields: ["title"],
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
				column: true
			},
			{
				name: "description",
				label: "Description",
				type: "textarea"
			},
			{
				name: "icon",
				label: "Lucide icon name",
				type: "text",
				placeholder: "Code2"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	},
	socialLinks: {
		key: "socialLinks",
		collection: "socialLinks",
		label: "Social Links",
		singular: "Social link",
		icon: "Link2",
		schema: socialLinkSchema,
		sort: { order: 1 },
		searchFields: ["label"],
		fields: [
			{
				name: "label",
				label: "Label",
				type: "text",
				column: true
			},
			{
				name: "url",
				label: "URL",
				type: "url",
				column: true
			},
			{
				name: "icon",
				label: "Lucide icon name",
				type: "text",
				placeholder: "Github"
			},
			{
				name: "order",
				label: "Display order",
				type: "number"
			}
		]
	}
};
var SINGLETONS = {
	profile: {
		collection: "profile",
		schema: profileSchema
	},
	siteSettings: {
		collection: "siteSettings",
		schema: settingsSchema
	}
};
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}
//#endregion
export { slugify as a, messageSchema as i, SINGLETONS as n, SKILL_CATEGORIES as r, COLLECTIONS as t };
