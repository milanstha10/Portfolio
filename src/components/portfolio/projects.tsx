import { Link } from "@tanstack/react-router";
import { ExternalLink, Github, ImageOff, Star } from "lucide-react";
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
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(data.projects.map((p) => text(p["category"])).filter(Boolean)),
      ),
    ],
    [data.projects],
  );
  const [active, setActive] = useState("All");
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const visible = data.projects.filter(
    (project) =>
      (active === "All" || project["category"] === active) &&
      (!onlyFeatured || project["featured"] === true),
  );

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I have built"
      description="Every project below is loaded from MongoDB through the site's API — nothing here is hardcoded."
    >
      {data.projects.length ? (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                active === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-surface-light hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOnlyFeatured((v) => !v)}
            aria-pressed={onlyFeatured}
            className={`ml-auto inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              onlyFeatured
                ? "border-accent text-accent"
                : "border-border text-muted-foreground hover:bg-surface-light hover:text-foreground"
            }`}
          >
            <Star className="size-3.5" aria-hidden />
            Featured only
          </button>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <EmptyState
          message="No projects have been added yet."
          hint="Sign in to the admin dashboard and add your first project."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard
              key={idOf(project)}
              project={project}
              delay={index * 60}
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
  const title = text(project["title"]);
  const image = text(project["image"]);
  const slug = text(project["slug"]);
  const technologies = list(project["technologies"]).slice(0, 5);

  return (
    <Reveal
      as="article"
      delay={delay}
      className="surface-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-light">
        {image ? (
          <img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <ImageOff className="size-6" aria-hidden />
          </div>
        )}
        {project["featured"] ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
            <Star className="size-3" aria-hidden /> Featured
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] tracking-wide text-accent uppercase">
          {text(project["category"])}
        </p>
        <h3 className="mt-2 font-display text-lg leading-snug font-semibold">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {text(project["shortDescription"])}
        </p>

        {technologies.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
          {slug ? (
            <Link
              to="/projects/$slug"
              params={{ slug }}
              className="rounded-lg bg-surface-light px-3 py-1.5 text-xs font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View details
            </Link>
          ) : null}
          {text(project["githubUrl"]) ? (
            <a
              href={text(project["githubUrl"])}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-3.5" aria-hidden /> Code
            </a>
          ) : null}
          {text(project["liveUrl"]) ? (
            <a
              href={text(project["liveUrl"])}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="size-3.5" aria-hidden /> Live
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
