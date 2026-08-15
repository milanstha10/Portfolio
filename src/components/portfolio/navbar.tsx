import { Link } from "@tanstack/react-router";
import { FileText, Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme";
import { NAV_LINKS, text, type PortfolioData } from "@/lib/portfolio/content";

export function Navbar({ data }: { data: PortfolioData }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const profile = data.profile ?? {};
  const resumeUrl = text(data.settings?.["resumeUrl"]);
  const name = text(profile["name"], "Portfolio");
  const initials = name
    .replace(/[[\]]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-panel border-b py-2 shadow-soft"
          : "border-b border-transparent py-3"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-page flex items-center justify-between gap-4"
      >
        <a
          href="#home"
          className="flex items-center gap-2 rounded-lg font-display text-sm font-semibold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary font-mono text-xs text-primary-foreground">
            {initials || "•"}
          </span>
          <span className="hidden sm:inline">{name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <FileText className="size-4" aria-hidden />
              Resume
            </a>
          ) : null}
          <IconLink href={text(profile["github"])} label="GitHub">
            <Github className="size-4" aria-hidden />
          </IconLink>
          <IconLink href={text(profile["linkedin"])} label="LinkedIn">
            <Linkedin className="size-4" aria-hidden />
          </IconLink>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            {open ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Menu className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`glass-panel overflow-hidden border-t transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page grid gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/admin"
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="hidden size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground sm:inline-flex"
    >
      {children}
    </a>
  );
}
