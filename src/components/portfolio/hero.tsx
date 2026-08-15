import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  FileText,
  Github,
  Mail,
  Server,
} from "lucide-react";

import { list, text, type PortfolioData } from "@/lib/portfolio/content";

export function Hero({ data }: { data: PortfolioData }) {
  const profile = data.profile ?? {};
  const settings = data.settings ?? {};

  const name = text(profile["name"], "[YOUR NAME]");
  const heading = text(settings["heroHeading"], `Hi, I'm ${name}`);
  const description = text(
    settings["heroDescription"],
    "I build thoughtful digital experiences and practical software solutions.",
  );
  const badge = text(
    profile["badge"],
    "BIT Student • Full-Stack Developer • Problem Solver",
  );
  const resumeUrl = text(settings["resumeUrl"]);
  const photo = text(profile["photo"]);
  const learning = list(profile["learning"]).slice(0, 6);
  const longBio = text(profile["longBio"]);

  const cleanName = name.replace(/[[\]]/g, "");
  const firstLetter = cleanName.slice(0, 1).toUpperCase() || "?";

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
    >
      <div
        className="grid-backdrop pointer-events-none absolute inset-0 -z-20"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 size-152 -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 68%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute right-0 top-1/3 -z-10 size-72 translate-x-1/2 rounded-full opacity-10 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3 py-1.5 shadow-sm backdrop-blur-sm">
            <span
              className="size-1.5 shrink-0 rounded-full bg-success shadow-[0_0_10px_var(--color-success)]"
              aria-hidden
            />
            <span className="truncate font-mono text-[10px] tracking-wide text-muted-foreground sm:text-xs">
              {badge}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">{heading}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            {description}
          </p>

          {longBio ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground/80 sm:text-base">
              {longBio.split("\n\n")[0]}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View My Projects
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>

            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/50 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <FileText
                  className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                  aria-hidden
                />
                Download Resume
              </a>
            ) : null}

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Mail
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden
              />
              Contact Me
            </a>
          </div>

          {learning.length ? (
            <div className="mt-10">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
                Currently working with
              </p>

              <ul
                className="flex flex-wrap gap-2"
                aria-label="Technologies I work with"
              >
                {learning.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border/70 bg-surface/40 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:bg-surface-light hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-4xlacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-primary), transparent 68%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto aspect-4/5 w-full max-w-105 overflow-visible">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-4xl border border-border/40 bg-surface/30" />

            <div className="surface-card relative size-full overflow-hidden rounded-4xl border border-border/80 bg-surface/70 shadow-2xl shadow-black/10 backdrop-blur-sm">
              <div
                className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-background/30 via-transparent to-white/5"
                aria-hidden
              />

              {photo ? (
                <img
                  src={photo}
                  alt={`Portrait of ${cleanName}`}
                  loading="eager"
                  fetchPriority="high"
                  width={640}
                  height={800}
                  className="size-full object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
                />
              ) : (
                <div className="grid size-full place-items-center bg-linear-to-br from-surface-light to-surface">
                  <div className="text-center">
                    <div className="mx-auto grid size-24 place-items-center rounded-3xl border border-border/80 bg-background/60 font-display text-3xl font-semibold shadow-xl">
                      {firstLetter}
                    </div>

                    <p className="mt-5 max-w-55 px-4 text-xs leading-relaxed text-muted-foreground">
                      Add your profile photo URL from the admin dashboard.
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/10 bg-background/65 p-4 shadow-xl backdrop-blur-xl">
                <p className="font-display text-sm font-semibold text-foreground">
                  {cleanName}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Full-Stack Developer
                </p>
              </div>
            </div>

            <FloatingIcon className="-left-5 top-12" delay={0}>
              <Code2 className="size-4 text-primary" aria-hidden />
            </FloatingIcon>

            <FloatingIcon className="-right-4 top-[28%]" delay={1000}>
              <Server className="size-4 text-secondary" aria-hidden />
            </FloatingIcon>

            <FloatingIcon className="-left-4 bottom-[18%]" delay={1800}>
              <Database className="size-4 text-accent" aria-hidden />
            </FloatingIcon>

            <FloatingIcon className="-right-5 bottom-12" delay={700}>
              <Github className="size-4 text-muted-foreground" aria-hidden />
            </FloatingIcon>
          </div>
        </div>
      </div>

      <div className="container-page mt-14 flex justify-center sm:mt-16 lg:mt-20">
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="group inline-flex flex-col items-center gap-2 rounded-full px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Scroll
          </span>

          <span className="grid size-8 place-items-center rounded-full border border-border/70 bg-surface/40 transition-all duration-200 group-hover:border-border group-hover:bg-surface-light">
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}

function FloatingIcon({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <div
      aria-hidden
      style={{ animationDelay: `${delay}ms` }}
      className={`glass-panel absolute z-20 grid size-10 animate-float place-items-center rounded-xl border border-border/70 shadow-lg backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
