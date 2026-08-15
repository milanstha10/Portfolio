import { FileText, Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { NAV_LINKS, text, type PortfolioData } from "@/lib/portfolio/content";

export function Navbar({ data }: { data: PortfolioData }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuId = useId();

  const profile = data.profile ?? {};
  const resumeUrl = text(data.settings?.["resumeUrl"]);
  const name = text(profile["name"], "Portfolio");
  const githubUrl = text(profile["github"]);
  const linkedinUrl = text(profile["linkedin"]);

  const initials =
    name
      .replace(/[[\]]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "•";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/85 py-2.5 shadow-soft backdrop-blur-2xl"
          : "border-b border-transparent bg-background/50 py-4 backdrop-blur-md"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="container-page flex min-h-10 items-center justify-between gap-4"
      >
        <a
          href="#home"
          onClick={closeMenu}
          aria-label={`Go to ${name} homepage`}
          className="group flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md"
          >
            {initials}
          </span>

          <span className="hidden max-w-44 truncate font-display text-sm font-semibold tracking-tight sm:inline">
            {name}
          </span>
        </a>

        <ul className="hidden items-center rounded-xl border border-border/60 bg-surface/40 p-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative block rounded-lg px-3.5 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-surface-light font-medium text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-surface-light/70 hover:text-foreground"
                  }`}
                >
                  {link.label}

                  <span
                    aria-hidden
                    className={`absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-200 ${
                      isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex"
            >
              <FileText className="size-4" aria-hidden />
              <span>Resume</span>
            </a>
          ) : null}

          <IconLink href={githubUrl} label="GitHub">
            <Github className="size-4" aria-hidden />
          </IconLink>

          <IconLink href={linkedinUrl} label="LinkedIn">
            <Linkedin className="size-4" aria-hidden />
          </IconLink>

          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 bg-surface/50 text-muted-foreground transition-all duration-200 hover:border-border hover:bg-surface-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
          >
            <span className="sr-only">
              {open ? "Close navigation menu" : "Open navigation menu"}
            </span>

            {open ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Menu className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <div
        id={menuId}
        aria-hidden={!open}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-border/70 bg-background/95 backdrop-blur-2xl">
            <div className="container-page py-4">
              <ul className="grid gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={closeMenu}
                        tabIndex={open ? 0 : -1}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          isActive
                            ? "bg-surface-light text-foreground"
                            : "text-muted-foreground hover:bg-surface-light hover:text-foreground"
                        }`}
                      >
                        <span>{link.label}</span>

                        <span
                          aria-hidden
                          className={`text-xs transition-transform duration-200 ${
                            isActive
                              ? "translate-x-0 text-primary"
                              : "text-muted-foreground/40"
                          }`}
                        >
                          →
                        </span>
                      </a>
                    </li>
                  );
                })}

                {resumeUrl ? (
                  <li className="mt-2 border-t border-border pt-3">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={closeMenu}
                      tabIndex={open ? 0 : -1}
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3.5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <FileText className="size-4" aria-hidden />
                      Resume
                    </a>
                  </li>
                ) : null}
              </ul>

              {githubUrl || linkedinUrl ? (
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                  <span className="mr-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                    Connect
                  </span>

                  <MobileIconLink
                    href={githubUrl}
                    label="GitHub"
                    onClick={closeMenu}
                    disabled={!open}
                  >
                    <Github className="size-4" aria-hidden />
                  </MobileIconLink>

                  <MobileIconLink
                    href={linkedinUrl}
                    label="LinkedIn"
                    onClick={closeMenu}
                    disabled={!open}
                  >
                    <Linkedin className="size-4" aria-hidden />
                  </MobileIconLink>
                </div>
              ) : null}
            </div>
          </div>
        </div>
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
      className="hidden size-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-all duration-200 hover:border-border/70 hover:bg-surface-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex"
    >
      {children}
    </a>
  );
}

function MobileIconLink({
  href,
  label,
  children,
  onClick,
  disabled,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-all duration-200 hover:border-border hover:bg-surface-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}
