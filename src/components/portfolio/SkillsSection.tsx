import { ArrowUpRight } from "lucide-react";

import { EmptyState, Section } from "@/components/portfolio/section";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import {
  text,
  type PortfolioData,
  type Rec,
} from "@/lib/portfolio/portfolio.content";
import { SKILL_CATEGORIES } from "@/lib/portfolio/portfolio.schema";

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "MonitorSmartphone",
  Backend: "Server",
  Database: "Database",
  Programming: "Braces",
  Tools: "Wrench",
  Other: "Sparkles",
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "text-primary",
  Backend: "text-secondary",
  Database: "text-accent",
  Programming: "text-primary",
  Tools: "text-secondary",
  Other: "text-accent",
};

export function Skills({ data }: { data: PortfolioData }) {
  const grouped = SKILL_CATEGORIES.map((category) => ({
    category,
    skills: data.skills.filter(
      (skill) => text(skill["category"]).trim() === category,
    ),
  })).filter((group) => group.skills.length > 0);

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technologies I work with"
      description="A growing toolkit built through projects, coursework, experimentation, and continuous learning."
    >
      {grouped.length === 0 ? (
        <EmptyState
          message="No skills have been added yet."
          hint="Add them from the admin dashboard."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {grouped.map((group, index) => {
            const categoryIcon = CATEGORY_ICONS[group.category] ?? "Sparkles";
            const categoryColor =
              CATEGORY_COLORS[group.category] ?? "text-primary";

            return (
              <Reveal
                key={group.category}
                className="surface-card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                delay={index * 70}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full bg-primary/5 blur-3xl transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-surface-light/70"
                      aria-hidden="true"
                    >
                      <Icon
                        name={categoryIcon}
                        className={`size-4 ${categoryColor}`}
                      />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold tracking-tight">
                        {group.category}
                      </h3>

                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {group.skills.length}{" "}
                        {group.skills.length === 1
                          ? "technology"
                          : "technologies"}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </div>

                <ul
                  className="relative mt-6 grid gap-2"
                  aria-label={`${group.category} skills`}
                >
                  {group.skills.map((skill, skillIndex) => (
                    <SkillRow
                      key={getSkillKey(skill, skillIndex)}
                      skill={skill}
                    />
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}

function SkillRow({ skill }: { skill: Rec }) {
  const rawPercentage = skill["percentage"];

  const percentage =
    typeof rawPercentage === "number" && Number.isFinite(rawPercentage)
      ? Math.min(100, Math.max(0, rawPercentage))
      : null;

  const name = text(skill["name"]).trim();
  const level = text(skill["level"]).trim();
  const icon = text(skill["icon"]).trim();

  if (!name) {
    return null;
  }

  return (
    <li className="group/skill rounded-xl border border-border/60 bg-surface-light/30 p-3 transition-all duration-200 hover:border-border hover:bg-surface-light/70 motion-reduce:transition-none">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          {icon ? (
            <span
              className="grid size-7 shrink-0 place-items-center rounded-lg border border-border/60 bg-surface"
              aria-hidden="true"
            >
              <Icon
                name={icon}
                className="size-3.5 text-muted-foreground transition-colors group-hover/skill:text-foreground motion-reduce:transition-none"
              />
            </span>
          ) : null}

          <span className="truncate text-sm font-medium text-foreground">
            {name}
          </span>
        </span>

        {level ? (
          <span className="shrink-0 rounded-md border border-border/60 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {level}
          </span>
        ) : null}
      </div>

      {percentage !== null ? (
        <div className="mt-3">
          <div
            className="h-1 overflow-hidden rounded-full bg-surface"
            role="progressbar"
            aria-label={`${name} proficiency`}
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-secondary transition-[width] duration-700 ease-out motion-reduce:transition-none"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mt-1.5 flex justify-end">
            <span
              className="font-mono text-[9px] text-muted-foreground/70"
              aria-hidden="true"
            >
              {percentage}%
            </span>
          </div>
        </div>
      ) : null}
    </li>
  );
}

function getSkillKey(skill: Rec, index: number) {
  const id = skill["_id"];

  if (id !== undefined && id !== null) {
    return String(id);
  }

  const name = text(skill["name"]).trim();

  return name ? `${name}-${index}` : `skill-${index}`;
}
