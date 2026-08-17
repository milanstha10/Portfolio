import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  ImageOff,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, Section } from "@/components/portfolio/section";
import { Reveal } from "@/components/ui/reveal";
import {
  idOf,
  list,
  text,
  type PortfolioData,
  type Rec,
} from "@/lib/portfolio/content";

export function Projects({ data }: { data: PortfolioData }) {
  const categories = useMemo(() => {
    const projectCategories = data.projects
      .map((project) => text(project["category"]).trim())
      .filter(Boolean);

    return ["All", ...Array.from(new Set(projectCategories))];
  }, [data.projects]);

  const [active, setActive] = useState("All");
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const visible = useMemo(
    () =>
      data.projects.filter((project) => {
        const category = text(project["category"]).trim();

        const matchesCategory = active === "All" || category === active;

        const matchesFeatured = !onlyFeatured || project["featured"] === true;

        return matchesCategory && matchesFeatured;
      }),
    [data.projects, active, onlyFeatured],
  );

  const hasProjects = data.projects.length > 0;
  const hasFilters = active !== "All" || onlyFeatured;

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I have built"
      description="A selection of projects where I turn ideas into practical, useful digital experiences."
    >
      {hasProjects ? (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => {
              const isActive = active === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={isActive}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border/70 bg-surface/40 text-muted-foreground hover:-translate-y-0.5 hover:border-border hover:bg-surface-light hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOnlyFeatured((value) => !value)}
            aria-pressed={onlyFeatured}
            className={`inline-flex w-fit items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
              onlyFeatured
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-border/70 bg-surface/40 text-muted-foreground hover:-translate-y-0.5 hover:border-border hover:bg-surface-light hover:text-foreground"
            }`}
          >
            <Star
              className={`size-3.5 ${onlyFeatured ? "fill-current" : ""}`}
              aria-hidden="true"
            />
            Featured only
          </button>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <EmptyState
          message={
            hasProjects
              ? "No projects match these filters."
              : "No projects available yet."
          }
          hint={
            hasProjects && hasFilters
              ? "Try another category or turn off the featured filter."
              : "Projects will appear here once they are added from the admin dashboard."
          }
        />
      ) : (
        <div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          aria-live="polite"
          aria-label={`${visible.length} project${
            visible.length === 1 ? "" : "s"
          }`}
        >
          {visible.map((project, index) => (
            <ProjectCard
              key={idOf(project)}
              project={project}
              delay={index * 70}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

export function ProjectCard({
  project,
  delay = 0,
}: {
  project: Rec;
  delay?: number;
}) {
  const title = text(project["title"], "Untitled project");
  const image = text(project["image"]).trim();
  const slug = text(project["slug"]).trim();
  const category = text(project["category"]).trim();
  const description = text(project["shortDescription"]).trim();
  const githubUrl = text(project["githubUrl"]).trim();
  const liveUrl = text(project["liveUrl"]).trim();

  const technologies = Array.from(
    new Set(list(project["technologies"]).filter(Boolean)),
  ).slice(0, 6);

  const featured = project["featured"] === true;

  return (
    <Reveal
      as="article"
      delay={delay}
      className={`surface-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        featured
          ? "border-primary/30 hover:border-primary/60"
          : "hover:border-border"
      }`}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-surface-light">
        {image ? (
          <img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            className="relative grid size-full place-items-center bg-linear-to-br from-surface-light to-surface"
            aria-label={`${title} has no preview image`}
          >
            <ImageOff
              className="size-7 text-muted-foreground/40"
              aria-hidden="true"
            />
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/5 opacity-60"
          aria-hidden="true"
        />

        {featured ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-background/75 px-2.5 py-1.5 text-[10px] font-semibold text-foreground shadow-lg backdrop-blur-md">
            <Star
              className="size-3 fill-primary text-primary"
              aria-hidden="true"
            />
            Featured
          </span>
        ) : null}

        {category ? (
          <span className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-background/75 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/85 shadow-lg backdrop-blur-md">
            {category}
          </span>
        ) : null}

        {slug ? (
          <Link
            to="/projects/$slug"
            params={{ slug }}
            aria-label={`View ${title} project details`}
            className="absolute right-4 top-4 grid size-9 translate-y-1 place-items-center rounded-lg border border-white/10 bg-background/75 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:translate-y-0"
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
            {title}
          </h3>

          {description ? (
            <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {technologies.length > 0 ? (
          <ul
            className="mt-5 flex flex-wrap gap-1.5"
            aria-label={`${title} technologies`}
          >
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border/70 bg-surface-light/40 px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors duration-200 group-hover:border-border group-hover:text-foreground motion-reduce:transition-none"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {slug ? (
            <Link
              to="/projects/$slug"
              params={{ slug }}
              className="group/button inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              View details
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          ) : null}

          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source code on GitHub`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-border hover:bg-surface-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <Github className="size-3.5" aria-hidden="true" />
              Code
            </a>
          ) : null}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live website`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-border hover:bg-surface-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              Live
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
