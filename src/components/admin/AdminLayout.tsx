import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { sections, type SectionKey } from "./types";

type AdminLayoutProps = {
  section: SectionKey;
  email: string;
  onSectionChange: (section: SectionKey) => void;
  onLogout: () => void;
  children: ReactNode;
};

export function AdminLayout({
  section,
  email,
  onSectionChange,
  onLogout,
  children,
}: AdminLayoutProps) {
  const [mobileMenu, setMobileMenu] = useState(false);

  function selectSection(value: SectionKey) {
    onSectionChange(value);
    setMobileMenu(false);
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-surface-light/30 lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-border p-5">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <ArrowLeft className="size-4" />
                Back to portfolio
              </Link>

              <div className="mt-6">
                <h1 className="font-display text-lg font-semibold">
                  Admin panel
                </h1>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {email}
                </p>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
              <SidebarItems section={section} onSelect={onSectionChange} />
            </nav>

            <div className="border-t border-border p-3">
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-light hover:text-foreground"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenu((current) => !current)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
            >
              <LayoutDashboard className="size-4" />
              Menu
              <ChevronDown className="size-4" />
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-border p-2"
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
            </button>

            {mobileMenu && (
              <div className="absolute left-4 right-4 top-14 rounded-xl border border-border bg-background p-2 shadow-xl">
                <SidebarItems section={section} onSelect={selectSection} />
              </div>
            )}
          </header>

          <div className="container-page py-8 lg:py-10">{children}</div>
        </div>
      </div>
    </main>
  );
}

function SidebarItems({
  section,
  onSelect,
}: {
  section: SectionKey;
  onSelect: (section: SectionKey) => void;
}) {
  return (
    <div className="space-y-1">
      {sections.map((item) => {
        const Icon: LucideIcon = item.icon;
        const active = section === item.key;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-surface-light hover:text-foreground"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
