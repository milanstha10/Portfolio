/** Browser-safe helpers/types for portfolio content coming from MongoDB. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Rec = Record<string, any>;

export interface PortfolioData {
  profile: Rec | null;
  settings: Rec | null;
  projects: Rec[];
  skills: Rec[];
  education: Rec[];
  experience: Rec[];
  certifications: Rec[];
  achievements: Rec[];
  services: Rec[];
  socialLinks: Rec[];
}

export const EMPTY_PORTFOLIO: PortfolioData = {
  profile: null,
  settings: null,
  projects: [],
  skills: [],
  education: [],
  experience: [],
  certifications: [],
  achievements: [],
  services: [],
  socialLinks: [],
};

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function text(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function idOf(record: Rec): string {
  const raw = record["_id"];
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object" && "$oid" in raw)
    return String((raw as { $oid: string }).$oid);
  return String(raw ?? "");
}

export function list(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}
