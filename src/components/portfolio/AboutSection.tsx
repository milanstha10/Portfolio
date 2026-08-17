import { ArrowUpRight, Compass, GraduationCap, Target } from "lucide-react";

import { Section } from "@/components/portfolio/section";
import { Reveal } from "@/components/ui/reveal";
import {
  list,
  text,
  type PortfolioData,
} from "@/lib/portfolio/portfolio.content";

export function About({ data }: { data: PortfolioData }) {
  const profile = data.profile ?? {};
  const learning = list(profile["learning"]).filter(Boolean);
  const paragraphs = text(profile["longBio"])
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const stats = [
    {
      value: text(profile["statsYears"]),
      label: "Years learning",
    },
    {
      value: text(profile["statsTech"]),
      label: "Technologies",
    },
    {
      value: text(profile["statsProjects"]),
      label: "Projects",
    },
    {
      value: "∞",
      label: "Curiosity",
    },
  ].filter((stat) => stat.value);

  return (
    <Section
      id="about"
      eyebrow="About"
      title="A student developer, learning by building"
      description={
        text(profile["shortBio"]) ||
        "I believe the best way to learn technology is to build real things, solve meaningful problems, and keep improving along the way."
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <Reveal className="surface-card relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  My journey
                </p>

                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  Learning through experience
                </h3>
              </div>

              <span
                className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-surface-light/60"
                aria-hidden="true"
              >
                <Compass className="size-4 text-primary" />
              </span>
            </div>

            {paragraphs.length > 0 ? (
              <div className="mt-7 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="mt-7 text-sm leading-7 text-muted-foreground">
                Add your bio from the admin dashboard — it is stored in MongoDB,
                not in the source code.
              </p>
            )}

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <Fact
                icon={
                  <GraduationCap
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                }
                label="Academic status"
              >
                {text(profile["title"], "BIT student")}
              </Fact>

              <Fact
                icon={
                  <Compass
                    className="size-4 text-secondary"
                    aria-hidden="true"
                  />
                }
                label="Availability"
              >
                {text(
                  profile["availability"],
                  "Open to learning opportunities",
                )}
              </Fact>

              <Fact
                icon={
                  <Target className="size-4 text-accent" aria-hidden="true" />
                }
                label="Based in"
              >
                {text(profile["location"], "—")}
              </Fact>
            </dl>
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal
            className="surface-card relative overflow-hidden p-6 sm:p-7"
            delay={80}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                  Skill development
                </p>

                <h3 className="mt-2 font-display text-base font-semibold">
                  Currently learning
                </h3>
              </div>

              <span
                className="grid size-9 place-items-center rounded-lg border border-border/70 bg-surface-light/50"
                aria-hidden="true"
              >
                <ArrowUpRight
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </span>
            </div>

            {learning.length > 0 ? (
              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label="Technologies currently learning"
              >
                {learning.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border/70 bg-surface-light/50 px-3 py-2 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-surface-light hover:text-foreground motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Nothing added yet.
              </p>
            )}
          </Reveal>

          {stats.length > 0 ? (
            <Reveal
              className="surface-card overflow-hidden p-6 sm:p-7"
              delay={140}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  At a glance
                </p>

                <h3 className="mt-2 font-display text-base font-semibold">
                  A few numbers
                </h3>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface p-5 transition-colors duration-200 hover:bg-surface-light"
                  >
                    <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {stat.value}
                    </p>

                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function Fact({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group rounded-xl border border-border/70 bg-surface-light/40 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-surface-light/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <dt className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {icon}
        {label}
      </dt>

      <dd className="mt-2 text-sm font-medium leading-5 text-foreground">
        {children}
      </dd>
    </div>
  );
}
