import type { LucideIcon } from "lucide-react";

import { COLLECTIONS } from "@/lib/portfolio/schema";

export type SectionKey =
  "dashboard" | "profile" | "settings" | "messages" | keyof typeof COLLECTIONS;

export type CollectionKey = keyof typeof COLLECTIONS;

export const isCollectionKey = (value: SectionKey): value is CollectionKey => {
  return value in COLLECTIONS;
};

export const sections: {
  key: SectionKey;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard" as never,
  },
  {
    key: "profile",
    label: "Profile",
    icon: "User" as never,
  },
  {
    key: "settings",
    label: "Site settings",
    icon: "Settings" as never,
  },
  {
    key: "projects",
    label: "Projects",
    icon: "FolderKanban" as never,
  },
  {
    key: "skills",
    label: "Skills",
    icon: "ShieldCheck" as never,
  },
  {
    key: "education",
    label: "Education",
    icon: "GraduationCap" as never,
  },
  {
    key: "experience",
    label: "Experience",
    icon: "User" as never,
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: "ShieldCheck" as never,
  },
  {
    key: "achievements",
    label: "Achievements",
    icon: "ShieldCheck" as never,
  },
  {
    key: "services",
    label: "Services",
    icon: "Settings" as never,
  },
  {
    key: "socialLinks",
    label: "Social links",
    icon: "Link2" as never,
  },
  {
    key: "messages",
    label: "Messages",
    icon: "Mail" as never,
  },
];
