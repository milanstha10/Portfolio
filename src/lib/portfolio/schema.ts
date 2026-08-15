/**
 * Single source of truth for the portfolio content model.
 *
 * Each entry describes one MongoDB collection: its Zod validation schema
 * (used on BOTH the client form and the server API) and the field metadata the
 * admin dashboard uses to render tables and forms.
 */
import { z } from "zod";

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "url"
  | "date"
  | "select"
  | "switch"
  | "tags";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  help?: string;
  /** show this column in the admin data table */
  column?: boolean;
}

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\/.+/i.test(v), {
    message: "Must be a valid http(s) URL",
  })
  .optional()
  .or(z.literal(""));

const tags = z.array(z.string().trim().min(1).max(40)).max(30).default([]);

export const PROJECT_CATEGORIES = [
  "Web Development",
  "Full Stack",
  "Java",
  "Python",
  "Database",
  "Academic",
  "Personal",
] as const;

export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Programming",
  "Tools",
  "Other",
] as const;

export const SKILL_LEVELS = [
  "Learning",
  "Familiar",
  "Comfortable",
  "Confident",
] as const;

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/, "Lowercase letters, numbers and dashes only")
    .max(120)
    .optional()
    .or(z.literal("")),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description is required")
    .max(300),
  description: z.string().trim().max(6000).optional().or(z.literal("")),
  problem: z.string().trim().max(2000).optional().or(z.literal("")),
  solution: z.string().trim().max(2000).optional().or(z.literal("")),
  features: tags,
  role: z.string().trim().max(200).optional().or(z.literal("")),
  challenges: z.string().trim().max(2000).optional().or(z.literal("")),
  learned: z.string().trim().max(2000).optional().or(z.literal("")),
  technologies: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one technology"),
  category: z.enum(PROJECT_CATEGORIES),
  image: optionalUrl,
  gallery: tags,
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
  completionDate: z.string().trim().max(30).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(999).default(0),
  demo: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(60),
  category: z.enum(SKILL_CATEGORIES),
  icon: z.string().trim().max(40).optional().or(z.literal("")),
  level: z.enum(SKILL_LEVELS).default("Learning"),
  percentage: z.coerce.number().int().min(0).max(100).optional(),
  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const educationSchema = z.object({
  institution: z.string().trim().min(2, "Institution is required").max(140),
  degree: z.string().trim().min(2, "Degree is required").max(140),
  field: z.string().trim().max(140).optional().or(z.literal("")),
  university: z.string().trim().max(140).optional().or(z.literal("")),
  startYear: z.string().trim().min(4, "Start year is required").max(20),
  endYear: z.string().trim().max(20).optional().or(z.literal("")),
  current: z.boolean().default(false),
  grade: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  description: z.string().trim().max(1200).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const experienceSchema = z.object({
  position: z.string().trim().min(2, "Position is required").max(140),
  organization: z.string().trim().min(2, "Organization is required").max(140),
  type: z
    .enum([
      "Internship",
      "Freelance",
      "Academic Project",
      "Volunteer",
      "Leadership",
      "Part-time",
    ])
    .default("Academic Project"),
  startDate: z.string().trim().min(4, "Start date is required").max(30),
  endDate: z.string().trim().max(30).optional().or(z.literal("")),
  current: z.boolean().default(false),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  technologies: tags,
  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const certificationSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(160),
  organization: z
    .string()
    .trim()
    .min(2, "Issuing organization is required")
    .max(140),
  issueDate: z.string().trim().max(30).optional().or(z.literal("")),
  expiryDate: z.string().trim().max(30).optional().or(z.literal("")),
  credentialId: z.string().trim().max(120).optional().or(z.literal("")),
  credentialUrl: optionalUrl,
  image: optionalUrl,
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const achievementSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(160),
  organization: z.string().trim().max(140).optional().or(z.literal("")),
  date: z.string().trim().max(30).optional().or(z.literal("")),
  category: z
    .enum([
      "Hackathon",
      "Competition",
      "Academic",
      "Award",
      "Workshop",
      "Event",
      "Leadership",
      "Publication",
    ])
    .default("Academic"),
  description: z.string().trim().max(1200).optional().or(z.literal("")),
  image: optionalUrl,
  url: optionalUrl,
  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),
  description: z.string().trim().min(10, "Description is required").max(600),
  icon: z.string().trim().max(40).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const socialLinkSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(60),
  url: z.string().trim().url("Must be a valid URL"),
  icon: z.string().trim().max(40).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  title: z.string().trim().max(160).optional().or(z.literal("")),
  badge: z.string().trim().max(160).optional().or(z.literal("")),
  shortBio: z.string().trim().max(400).optional().or(z.literal("")),
  longBio: z.string().trim().max(4000).optional().or(z.literal("")),
  photo: optionalUrl,
  email: z.string().trim().email("Valid email required").or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  github: optionalUrl,
  linkedin: optionalUrl,
  website: optionalUrl,
  availability: z.string().trim().max(160).optional().or(z.literal("")),
  learning: tags,
  statsYears: z.string().trim().max(20).optional().or(z.literal("")),
  statsTech: z.string().trim().max(20).optional().or(z.literal("")),
  statsProjects: z.string().trim().max(20).optional().or(z.literal("")),
  experienceNote: z.string().trim().max(400).optional().or(z.literal("")),
});

export const settingsSchema = z.object({
  siteTitle: z.string().trim().max(120).optional().or(z.literal("")),
  tagline: z.string().trim().max(200).optional().or(z.literal("")),
  heroHeading: z.string().trim().max(200).optional().or(z.literal("")),
  heroDescription: z.string().trim().max(800).optional().or(z.literal("")),
  contactEmail: z
    .string()
    .trim()
    .email("Valid email required")
    .or(z.literal("")),
  footerText: z.string().trim().max(300).optional().or(z.literal("")),
  resumeUrl: optionalUrl,
  seoTitle: z.string().trim().max(120).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),
});

export const messageSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(3, "Subject is required").max(140),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export interface Meta {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Project = z.infer<typeof projectSchema> & Meta;
export type Skill = z.infer<typeof skillSchema> & Meta;
export type Education = z.infer<typeof educationSchema> & Meta;
export type Experience = z.infer<typeof experienceSchema> & Meta;
export type Certification = z.infer<typeof certificationSchema> & Meta;
export type Achievement = z.infer<typeof achievementSchema> & Meta;
export type Service = z.infer<typeof serviceSchema> & Meta;
export type SocialLink = z.infer<typeof socialLinkSchema> & Meta;
export type Profile = z.infer<typeof profileSchema> & Partial<Meta>;
export type Settings = z.infer<typeof settingsSchema> & Partial<Meta>;
export type Message = z.infer<typeof messageSchema> &
  Meta & { status: "unread" | "read" };

export interface CollectionConfig {
  key: string;
  collection: string;
  label: string;
  singular: string;
  icon: string;
  schema: z.ZodTypeAny;
  fields: FieldDef[];
  sort: Record<string, 1 | -1>;
  searchFields: string[];
}

/**
 * Do not type this as Record<string, CollectionConfig>.
 *
 * Keeping the literal object type allows keyof typeof COLLECTIONS to be the
 * exact set of valid collection keys instead of generic string.
 */
export const COLLECTIONS = {
  projects: {
    key: "projects",
    collection: "projects",
    label: "Projects",
    singular: "Project",
    icon: "FolderKanban",
    schema: projectSchema,
    sort: { order: 1, createdAt: -1 },
    searchFields: ["title", "shortDescription"],
    fields: [
      { name: "title", label: "Title", type: "text", column: true },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        help: "Optional. Auto-generated from the title.",
      },
      {
        name: "shortDescription",
        label: "Short description",
        type: "textarea",
      },
      { name: "description", label: "Full description", type: "textarea" },
      { name: "problem", label: "Problem", type: "textarea" },
      { name: "solution", label: "Solution", type: "textarea" },
      { name: "features", label: "Key features", type: "tags" },
      { name: "role", label: "My role", type: "text" },
      { name: "challenges", label: "Challenges", type: "textarea" },
      { name: "learned", label: "What I learned", type: "textarea" },
      { name: "technologies", label: "Technologies", type: "tags" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [...PROJECT_CATEGORIES],
        column: true,
      },
      { name: "image", label: "Cover image URL", type: "url" },
      { name: "gallery", label: "Gallery image URLs", type: "tags" },
      { name: "githubUrl", label: "GitHub URL", type: "url" },
      { name: "liveUrl", label: "Live demo URL", type: "url" },
      {
        name: "completionDate",
        label: "Completion date",
        type: "text",
        placeholder: "2026-05",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["draft", "published"],
        column: true,
      },
      { name: "featured", label: "Featured", type: "switch", column: true },
      { name: "demo", label: "Demo/sample content", type: "switch" },
      { name: "order", label: "Display order", type: "number" },
    ],
  },

  skills: {
    key: "skills",
    collection: "skills",
    label: "Skills",
    singular: "Skill",
    icon: "Sparkles",
    schema: skillSchema,
    sort: { order: 1, name: 1 },
    searchFields: ["name"],
    fields: [
      { name: "name", label: "Name", type: "text", column: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [...SKILL_CATEGORIES],
        column: true,
      },
      {
        name: "level",
        label: "Proficiency",
        type: "select",
        options: [...SKILL_LEVELS],
        column: true,
      },
      {
        name: "percentage",
        label: "Percentage (optional)",
        type: "number",
        help: "Leave empty to hide the bar.",
      },
      {
        name: "icon",
        label: "Lucide icon name",
        type: "text",
        placeholder: "Code",
      },
      { name: "order", label: "Display order", type: "number" },
    ],
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
      { name: "degree", label: "Degree", type: "text", column: true },
      { name: "institution", label: "Institution", type: "text", column: true },
      { name: "university", label: "University", type: "text" },
      { name: "field", label: "Field of study", type: "text" },
      { name: "startYear", label: "Start year", type: "text", column: true },
      { name: "endYear", label: "End year", type: "text" },
      { name: "current", label: "Currently studying", type: "switch" },
      { name: "grade", label: "Grade / GPA", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "order", label: "Display order", type: "number" },
    ],
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
      { name: "position", label: "Position", type: "text", column: true },
      {
        name: "organization",
        label: "Organization",
        type: "text",
        column: true,
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
          "Part-time",
        ],
        column: true,
      },
      {
        name: "startDate",
        label: "Start date",
        type: "text",
        placeholder: "2025-06",
      },
      { name: "endDate", label: "End date", type: "text" },
      { name: "current", label: "Current", type: "switch" },
      { name: "location", label: "Location", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "technologies", label: "Technologies", type: "tags" },
      { name: "order", label: "Display order", type: "number" },
    ],
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
      { name: "name", label: "Certificate name", type: "text", column: true },
      {
        name: "organization",
        label: "Issuing organization",
        type: "text",
        column: true,
      },
      { name: "issueDate", label: "Issue date", type: "text", column: true },
      { name: "expiryDate", label: "Expiry date", type: "text" },
      { name: "credentialId", label: "Credential ID", type: "text" },
      { name: "credentialUrl", label: "Credential URL", type: "url" },
      { name: "image", label: "Certificate image URL", type: "url" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "order", label: "Display order", type: "number" },
    ],
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
      { name: "title", label: "Title", type: "text", column: true },
      {
        name: "organization",
        label: "Organization",
        type: "text",
        column: true,
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
          "Publication",
        ],
        column: true,
      },
      { name: "date", label: "Date", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "Reference URL", type: "url" },
      { name: "order", label: "Display order", type: "number" },
    ],
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
      { name: "title", label: "Title", type: "text", column: true },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "icon",
        label: "Lucide icon name",
        type: "text",
        placeholder: "Code2",
      },
      { name: "order", label: "Display order", type: "number" },
    ],
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
      { name: "label", label: "Label", type: "text", column: true },
      { name: "url", label: "URL", type: "url", column: true },
      {
        name: "icon",
        label: "Lucide icon name",
        type: "text",
        placeholder: "Github",
      },
      { name: "order", label: "Display order", type: "number" },
    ],
  },
} satisfies Record<string, CollectionConfig>;

export const SINGLETONS = {
  profile: { collection: "profile", schema: profileSchema },
  siteSettings: { collection: "siteSettings", schema: settingsSchema },
} as const;

export const PROFILE_FIELDS: FieldDef[] = [
  { name: "name", label: "Full name", type: "text" },
  { name: "title", label: "Professional title", type: "text" },
  { name: "badge", label: "Hero badge", type: "text" },
  { name: "shortBio", label: "Short bio", type: "textarea" },
  { name: "longBio", label: "Long bio", type: "textarea" },
  { name: "photo", label: "Profile photo URL", type: "url" },
  { name: "email", label: "Email", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "github", label: "GitHub URL", type: "url" },
  { name: "linkedin", label: "LinkedIn URL", type: "url" },
  { name: "website", label: "Website URL", type: "url" },
  { name: "availability", label: "Availability", type: "text" },
  { name: "learning", label: "Currently learning", type: "tags" },
  { name: "statsYears", label: "Stat: years learning", type: "text" },
  { name: "statsTech", label: "Stat: technologies", type: "text" },
  { name: "statsProjects", label: "Stat: projects", type: "text" },
  {
    name: "experienceNote",
    label: "Experience section note",
    type: "textarea",
  },
];

export const SETTINGS_FIELDS: FieldDef[] = [
  { name: "siteTitle", label: "Website title", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "heroHeading", label: "Hero heading", type: "text" },
  { name: "heroDescription", label: "Hero description", type: "textarea" },
  { name: "contactEmail", label: "Contact email", type: "text" },
  { name: "footerText", label: "Footer text", type: "text" },
  {
    name: "resumeUrl",
    label: "Resume file URL",
    type: "url",
    help: "Upload the PDF to storage and paste its URL.",
  },
  { name: "seoTitle", label: "SEO title", type: "text" },
  { name: "seoDescription", label: "SEO description", type: "textarea" },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
