import { Section, EmptyState } from "@/components/portfolio/section";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { text, type PortfolioData, type Rec } from "@/lib/portfolio/content";
import { SKILL_CATEGORIES } from "@/lib/portfolio/schema";

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "MonitorSmartphone",
  Backend: "Server",
  Database: "Database",
  Programming: "Braces",
  Tools: "Wrench",
  Other: "Sparkles",
};

export function Skills({ data }: { data: PortfolioData }) {
  const grouped = SKILL_CATEGORIES.map((category) => ({
    category,
    skills: data.skills.filter((skill) => skill["category"] === category),
  })).filter((group) => group.skills.length);

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technologies I work with"
      description="Grouped by area, with an honest indication of how comfortable I currently am with each one."
    >
      {grouped.length === 0 ? (
        <EmptyState
          message="No skills have been added yet."
          hint="Add them from the admin dashboard."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {grouped.map((group, index) => (
            <Reveal
              key={group.category}
              className="surface-card p-6"
              delay={index * 60}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-border bg-surface-light">
                  <Icon
                    name={CATEGORY_ICONS[group.category]}
                    className="size-4 text-primary"
                  />
                </span>
                <h3 className="font-display text-base font-semibold">
                  {group.category}
                </h3>
              </div>
              <ul className="mt-5 space-y-4">
                {group.skills.map((skill) => (
                  <SkillRow key={String(skill["_id"])} skill={skill} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

function SkillRow({ skill }: { skill: Rec }) {
  const percentage =
    typeof skill["percentage"] === "number" ? skill["percentage"] : null;
  return (
    <li>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          {text(skill["icon"]) ? (
            <Icon
              name={text(skill["icon"])}
              className="size-3.5 text-muted-foreground"
            />
          ) : null}
          {text(skill["name"])}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {text(skill["level"])}
        </span>
      </div>
      {percentage !== null ? (
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-light"
          role="progressbar"
          aria-label={`${text(skill["name"])} proficiency`}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      ) : null}
    </li>
  );
}
