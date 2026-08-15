import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { Database, Github, Server, Code2 } from "lucide-react";

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

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40"
    >
      <div
        className="grid-backdrop pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-152 -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-light/60 px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground sm:text-xs">
            <span className="size-1.5 rounded-full bg-success" aria-hidden />
            {badge}
          </span>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">{heading}</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          {text(profile["longBio"]) ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {text(profile["longBio"]).split("\n\n")[0]}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              View My Projects
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-light"
              >
                <FileText className="size-4" aria-hidden />
                Download Resume
              </a>
            ) : null}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-light"
            >
              <Mail className="size-4" aria-hidden />
              Contact Me
            </a>
          </div>

          {learning.length ? (
            <ul
              className="mt-10 flex flex-wrap gap-2"
              aria-label="Technologies I work with"
            >
              {learning.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="surface-card relative aspect-square overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt={`Portrait of ${name}`}
                loading="eager"
                className="size-full object-cover"
                width={480}
                height={480}
              />
            ) : (
              <div className="grid size-full place-items-center bg-surface-light">
                <div className="text-center">
                  <div className="mx-auto grid size-20 place-items-center rounded-2xl border border-border bg-surface font-display text-2xl">
                    {name.replace(/[[\]]/g, "").slice(0, 1) || "?"}
                  </div>
                  <p className="mt-4 px-6 text-xs text-muted-foreground">
                    Add your profile photo URL from the admin dashboard.
                  </p>
                </div>
              </div>
            )}
          </div>

          <FloatingIcon className="-left-4 top-8" delay={0}>
            <Code2 className="size-4 text-primary" aria-hidden />
          </FloatingIcon>
          <FloatingIcon className="-right-3 top-1/3" delay={1200}>
            <Server className="size-4 text-secondary" aria-hidden />
          </FloatingIcon>
          <FloatingIcon className="-left-3 bottom-10" delay={2400}>
            <Database className="size-4 text-accent" aria-hidden />
          </FloatingIcon>
          <FloatingIcon className="-right-4 bottom-1/4" delay={600}>
            <Github className="size-4 text-muted-foreground" aria-hidden />
          </FloatingIcon>
        </div>
      </div>

      <div className="container-page mt-16 flex justify-center">
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="inline-flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Scroll
          <ArrowDown className="size-4 animate-bounce" aria-hidden />
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
      className={`glass-panel absolute grid size-10 animate-float place-items-center rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}
