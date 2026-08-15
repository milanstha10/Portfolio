import { Compass, GraduationCap, Target } from "lucide-react";

import { Section } from "@/components/portfolio/section";
import { Reveal } from "@/components/ui/reveal";
import { list, text, type PortfolioData } from "@/lib/portfolio/content";

export function About({ data }: { data: PortfolioData }) {
  const profile = data.profile ?? {};
  const learning = list(profile["learning"]);
  const paragraphs = text(profile["longBio"]).split("\n\n").filter(Boolean);
  const stats = [
    { value: text(profile["statsYears"]), label: "Years learning" },
    { value: text(profile["statsTech"]), label: "Technologies" },
    { value: text(profile["statsProjects"]), label: "Projects" },
    { value: "∞", label: "Curiosity" },
  ].filter((stat) => stat.value);

  return (
    <Section
      id="about"
      eyebrow="About"
      title="A student developer, learning by building"
      description={text(profile["shortBio"]) || undefined}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="surface-card p-6 sm:p-8">
          {paragraphs.length ? (
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Add your bio from the admin dashboard — it is stored in MongoDB,
              not in the source code.
            </p>
          )}

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <Fact
              icon={
                <GraduationCap className="size-4 text-primary" aria-hidden />
              }
              label="Academic status"
            >
              {text(profile["title"], "BIT student")}
            </Fact>
            <Fact
              icon={<Compass className="size-4 text-secondary" aria-hidden />}
              label="Availability"
            >
              {text(profile["availability"], "Open to learning opportunities")}
            </Fact>
            <Fact
              icon={<Target className="size-4 text-accent" aria-hidden />}
              label="Based in"
            >
              {text(profile["location"], "—")}
            </Fact>
          </dl>
        </Reveal>

        <div className="grid gap-6">
          <Reveal className="surface-card p-6" delay={80}>
            <h3 className="font-display text-base font-semibold">
              Currently learning
            </h3>
            {learning.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {learning.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-surface-light/60 px-2.5 py-1.5 text-xs text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Nothing added yet.
              </p>
            )}
          </Reveal>

          {stats.length ? (
            <Reveal
              className="surface-card grid grid-cols-2 gap-4 p-6"
              delay={140}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
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
    <div className="rounded-xl border border-border bg-surface-light/40 p-4">
      <dt className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
        {icon}
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{children}</dd>
    </div>
  );
}
