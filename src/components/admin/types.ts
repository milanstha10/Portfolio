import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Link2,
  Mail,
  Settings,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";

import { COLLECTIONS } from "@/lib/portfolio/schema";

export type SectionKey =
  "dashboard" | "profile" | "settings" | "messages" | keyof typeof COLLECTIONS;

export type CollectionKey = keyof typeof COLLECTIONS;

export const isCollectionKey = (value: SectionKey): value is CollectionKey => {
  return value in COLLECTIONS;
};

/**
 * Lucide icons used by the admin navigation.
 *
 * Keeping this as a real component map avoids using:
 *
 *   "LayoutDashboard" as never
 *
 * which was only bypassing TypeScript.
 */
export const ADMIN_ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  User,
  Settings,
  FolderKanban,
  Sparkles,
  GraduationCap,
  Briefcase,
  BadgeCheck,
  Trophy,
  Layers,
  Link2,
  Mail,
  ShieldCheck,
  Award,
};

export function getAdminIcon(name: string): LucideIcon {
  return ADMIN_ICONS[name] ?? ShieldCheck;
}

export const sections: {
  key: SectionKey;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "profile",
    label: "Profile",
    icon: User,
  },
  {
    key: "settings",
    label: "Site settings",
    icon: Settings,
  },
  {
    key: "projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    key: "skills",
    label: "Skills",
    icon: Sparkles,
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    key: "experience",
    label: "Experience",
    icon: Briefcase,
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: BadgeCheck,
  },
  {
    key: "achievements",
    label: "Achievements",
    icon: Trophy,
  },
  {
    key: "services",
    label: "Services",
    icon: Layers,
  },
  {
    key: "socialLinks",
    label: "Social links",
    icon: Link2,
  },
  {
    key: "messages",
    label: "Messages",
    icon: Mail,
  },
];
