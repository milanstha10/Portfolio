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
  column?: boolean;
}

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === "" || /^https?:\/\/[^\s]+$/i.test(value), {
    message: "Must be a valid http(s) URL",
  })
  .optional()
  .or(z.literal(""));

const requiredUrl = z.string().trim().max(500).url("Must be a valid URL");

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

const dateText = (max = 30) =>
  z
    .string()
    .trim()
    .max(max)
    .regex(/^$|^\d{4}(-\d{2})?(-\d{2})?$/, "Use YYYY, YYYY-MM, or YYYY-MM-DD")
    .optional()
    .or(z.literal(""));

const tags = z.array(z.string().trim().min(1).max(40)).max(30).default([]);

const urlTags = z
  .array(z.string().trim().max(500).url("Each item must be a valid URL"))
  .max(20)
  .default([]);

const technologies = z
  .array(z.string().trim().min(1).max(60))
  .min(1, "Add at least one technology")
  .max(30);

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

export const EXPERIENCE_TYPES = [
  "Internship",
  "Freelance",
  "Academic Project",
  "Volunteer",
  "Leadership",
  "Part-time",
] as const;

export const ACHIEVEMENT_CATEGORIES = [
  "Hackathon",
  "Competition",
  "Academic",
  "Award",
  "Workshop",
  "Event",
  "Leadership",
  "Publication",
] as const;

export const PROJECT_STATUSES = ["draft", "published"] as const;

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

  description: optionalText(6000),
  problem: optionalText(2000),
  solution: optionalText(2000),

  features: tags,

  role: optionalText(200),
  challenges: optionalText(2000),
  learned: optionalText(2000),

  technologies,

  category: z.enum(PROJECT_CATEGORIES),

  image: optionalUrl,

  gallery: urlTags,

  githubUrl: optionalUrl,

  liveUrl: optionalUrl,

  featured: z.boolean().default(false),

  status: z.enum(PROJECT_STATUSES).default("draft"),

  completionDate: dateText(),

  order: z.coerce.number().int().min(0).max(999).default(0),

  demo: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(60),

  category: z.enum(SKILL_CATEGORIES),

  icon: optionalText(40),

  level: z.enum(SKILL_LEVELS).default("Learning"),

  percentage: z.coerce.number().int().min(0).max(100).optional(),

  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const educationSchema = z.object({
  institution: z.string().trim().min(2, "Institution is required").max(140),

  degree: z.string().trim().min(2, "Degree is required").max(140),

  field: optionalText(140),

  university: optionalText(140),

  startYear: z.string().trim().min(4, "Start year is required").max(20),

  endYear: optionalText(20),

  current: z.boolean().default(false),

  grade: optionalText(40),

  location: optionalText(120),

  description: optionalText(1200),

  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const experienceSchema = z.object({
  position: z.string().trim().min(2, "Position is required").max(140),

  organization: z.string().trim().min(2, "Organization is required").max(140),

  type: z.enum(EXPERIENCE_TYPES).default("Academic Project"),

  startDate: z.string().trim().min(4, "Start date is required").max(30),

  endDate: optionalText(30),

  current: z.boolean().default(false),

  location: optionalText(120),

  description: optionalText(2000),

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

  issueDate: dateText(),

  expiryDate: dateText(),

  credentialId: optionalText(120),

  credentialUrl: optionalUrl,

  image: optionalUrl,

  description: optionalText(1000),

  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const achievementSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(160),

  organization: optionalText(140),

  date: dateText(),

  category: z.enum(ACHIEVEMENT_CATEGORIES).default("Academic"),

  description: optionalText(1200),

  image: optionalUrl,

  url: optionalUrl,

  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),

  description: z.string().trim().min(10, "Description is required").max(600),

  icon: optionalText(40),

  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const socialLinkSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(60),

  url: requiredUrl,

  icon: optionalText(40),

  order: z.coerce.number().int().min(0).max(999).default(0),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),

  title: optionalText(160),

  badge: optionalText(160),

  shortBio: optionalText(400),

  longBio: optionalText(4000),

  photo: optionalUrl,

  email: z
    .string()
    .trim()
    .max(160)
    .email("Valid email required")
    .or(z.literal("")),

  phone: optionalText(40),

  location: optionalText(120),

  github: optionalUrl,

  linkedin: optionalUrl,

  website: optionalUrl,

  availability: optionalText(160),

  learning: tags,

  statsYears: optionalText(20),

  statsTech: optionalText(20),

  statsProjects: optionalText(20),

  experienceNote: optionalText(400),
});

export const settingsSchema = z.object({
  siteTitle: optionalText(120),

  tagline: optionalText(200),

  heroHeading: optionalText(200),

  heroDescription: optionalText(800),

  contactEmail: z
    .string()
    .trim()
    .max(160)
    .email("Valid email required")
    .or(z.literal("")),

  footerText: optionalText(300),

  resumeUrl: optionalUrl,

  seoTitle: optionalText(120),

  seoDescription: optionalText(300),
});

export const messageSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),

  email: z.string().trim().max(160).email("Enter a valid email"),

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
  Meta & {
    status: "unread" | "read";
  };

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
      {
        name: "title",
        label: "Title",
        type: "text",
        column: true,
      },
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
      {
        name: "description",
        label: "Full description",
        type: "textarea",
      },
      {
        name: "problem",
        label: "Problem",
        type: "textarea",
      },
      {
        name: "solution",
        label: "Solution",
        type: "textarea",
      },
      {
        name: "features",
        label: "Key features",
        type: "tags",
      },
      {
        name: "role",
        label: "My role",
        type: "text",
      },
      {
        name: "challenges",
        label: "Challenges",
        type: "textarea",
      },
      {
        name: "learned",
        label: "What I learned",
        type: "textarea",
      },
      {
        name: "technologies",
        label: "Technologies",
        type: "tags",
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [...PROJECT_CATEGORIES],
        column: true,
      },
      {
        name: "image",
        label: "Cover image URL",
        type: "url",
      },
      {
        name: "gallery",
        label: "Gallery image URLs",
        type: "tags",
        help: "Add direct image URLs.",
      },
      {
        name: "githubUrl",
        label: "GitHub URL",
        type: "url",
      },
      {
        name: "liveUrl",
        label: "Live demo URL",
        type: "url",
      },
      {
        name: "completionDate",
        label: "Completion date",
        type: "date",
        placeholder: "2026-05",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [...PROJECT_STATUSES],
        column: true,
      },
      {
        name: "featured",
        label: "Featured",
        type: "switch",
        column: true,
      },
      {
        name: "demo",
        label: "Demo/sample content",
        type: "switch",
      },
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
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
      {
        name: "name",
        label: "Name",
        type: "text",
        column: true,
      },
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
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
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
      {
        name: "degree",
        label: "Degree",
        type: "text",
        column: true,
      },
      {
        name: "institution",
        label: "Institution",
        type: "text",
        column: true,
      },
      {
        name: "university",
        label: "University",
        type: "text",
      },
      {
        name: "field",
        label: "Field of study",
        type: "text",
      },
      {
        name: "startYear",
        label: "Start year",
        type: "text",
        column: true,
      },
      {
        name: "endYear",
        label: "End year",
        type: "text",
      },
      {
        name: "current",
        label: "Currently studying",
        type: "switch",
      },
      {
        name: "grade",
        label: "Grade / GPA",
        type: "text",
      },
      {
        name: "location",
        label: "Location",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
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
      {
        name: "position",
        label: "Position",
        type: "text",
        column: true,
      },
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
        options: [...EXPERIENCE_TYPES],
        column: true,
      },
      {
        name: "startDate",
        label: "Start date",
        type: "date",
        placeholder: "2025-06",
      },
      {
        name: "endDate",
        label: "End date",
        type: "date",
        placeholder: "2026-06",
      },
      {
        name: "current",
        label: "Current",
        type: "switch",
      },
      {
        name: "location",
        label: "Location",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "technologies",
        label: "Technologies",
        type: "tags",
      },
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
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
      {
        name: "name",
        label: "Certificate name",
        type: "text",
        column: true,
      },
      {
        name: "organization",
        label: "Issuing organization",
        type: "text",
        column: true,
      },
      {
        name: "issueDate",
        label: "Issue date",
        type: "date",
        column: true,
      },
      {
        name: "expiryDate",
        label: "Expiry date",
        type: "date",
      },
      {
        name: "credentialId",
        label: "Credential ID",
        type: "text",
      },
      {
        name: "credentialUrl",
        label: "Credential URL",
        type: "url",
      },
      {
        name: "image",
        label: "Certificate image URL",
        type: "url",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
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
      {
        name: "title",
        label: "Title",
        type: "text",
        column: true,
      },
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
        options: [...ACHIEVEMENT_CATEGORIES],
        column: true,
      },
      {
        name: "date",
        label: "Date",
        type: "date",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "image",
        label: "Image URL",
        type: "url",
      },
      {
        name: "url",
        label: "Reference URL",
        type: "url",
      },
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
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
      {
        name: "title",
        label: "Title",
        type: "text",
        column: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "icon",
        label: "Lucide icon name",
        type: "text",
        placeholder: "Code2",
      },
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
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
      {
        name: "label",
        label: "Label",
        type: "text",
        column: true,
      },
      {
        name: "url",
        label: "URL",
        type: "url",
        column: true,
      },
      {
        name: "icon",
        label: "Lucide icon name",
        type: "text",
        placeholder: "Github",
      },
      {
        name: "order",
        label: "Display order",
        type: "number",
      },
    ],
  },
} satisfies Record<string, CollectionConfig>;

export type CollectionKey = keyof typeof COLLECTIONS;

export const SINGLETONS = {
  profile: {
    collection: "profile",
    schema: profileSchema,
  },
  siteSettings: {
    collection: "siteSettings",
    schema: settingsSchema,
  },
} as const;

export type SingletonKey = keyof typeof SINGLETONS;

export const PROFILE_FIELDS: FieldDef[] = [
  {
    name: "name",
    label: "Full name",
    type: "text",
  },
  {
    name: "title",
    label: "Professional title",
    type: "text",
  },
  {
    name: "badge",
    label: "Hero badge",
    type: "text",
  },
  {
    name: "shortBio",
    label: "Short bio",
    type: "textarea",
  },
  {
    name: "longBio",
    label: "Long bio",
    type: "textarea",
  },
  {
    name: "photo",
    label: "Profile photo URL",
    type: "url",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
  },
  {
    name: "github",
    label: "GitHub URL",
    type: "url",
  },
  {
    name: "linkedin",
    label: "LinkedIn URL",
    type: "url",
  },
  {
    name: "website",
    label: "Website URL",
    type: "url",
  },
  {
    name: "availability",
    label: "Availability",
    type: "text",
  },
  {
    name: "learning",
    label: "Currently learning",
    type: "tags",
  },
  {
    name: "statsYears",
    label: "Stat: years learning",
    type: "text",
  },
  {
    name: "statsTech",
    label: "Stat: technologies",
    type: "text",
  },
  {
    name: "statsProjects",
    label: "Stat: projects",
    type: "text",
  },
  {
    name: "experienceNote",
    label: "Experience section note",
    type: "textarea",
  },
];

export const SETTINGS_FIELDS: FieldDef[] = [
  {
    name: "siteTitle",
    label: "Website title",
    type: "text",
  },
  {
    name: "tagline",
    label: "Tagline",
    type: "text",
  },
  {
    name: "heroHeading",
    label: "Hero heading",
    type: "text",
  },
  {
    name: "heroDescription",
    label: "Hero description",
    type: "textarea",
  },
  {
    name: "contactEmail",
    label: "Contact email",
    type: "text",
  },
  {
    name: "footerText",
    label: "Footer text",
    type: "text",
  },
  {
    name: "resumeUrl",
    label: "Resume file URL",
    type: "url",
    help: "Upload the PDF to storage and paste its URL.",
  },
  {
    name: "seoTitle",
    label: "SEO title",
    type: "text",
  },
  {
    name: "seoDescription",
    label: "SEO description",
    type: "textarea",
  },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-+|-+$/g, "");
}
