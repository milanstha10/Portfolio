import { Award, Calendar, ExternalLink, FileText, MapPin } from "lucide-react";

import { EmptyState, Section } from "@/components/portfolio/section";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import {
  idOf,
  list,
  text,
  type PortfolioData,
  type Rec,
} from "@/lib/portfolio/content";

function TimelineItem({ record, isLast }: { record: Rec; isLast: boolean }) {
  const title = text(record["degree"]) || text(record["position"]);
  const org = text(record["institution"]) || text(record["organization"]);
  const start = text(record["startYear"]) || text(record["startDate"]);
  const end = record["current"]
    ? "Present"
    : text(record["endYear"]) || text(record["endDate"]) || "—";
  const tech = list(record["technologies"]);

  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        className="absolute left-1.75 top-2.5 z-10 size-3 rounded-full border-2 border-primary bg-background shadow-[0_0_0_4px_hsl(var(--background))]"
        aria-hidden
      />

      {!isLast ? (
        <span
          className="absolute left-3 top-5 -bottom-5 w-px bg-linear-to-b from-primary/50 via-border to-border/30"
          aria-hidden
        />
      ) : null}

      <div className="surface-card group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
              {title}
            </h3>

            {org ? (
              <p className="mt-1 text-sm font-medium text-secondary">{org}</p>
            ) : null}

            {text(record["university"]) ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {text(record["university"])}
              </p>
            ) : null}
          </div>

          {(start || end) && (
            <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface-light/50 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground">
              <Calendar className="size-3" aria-hidden />
              {start} — {end}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {text(record["location"]) ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3 text-secondary" aria-hidden />
              {text(record["location"])}
            </span>
          ) : null}

          {text(record["grade"]) ? (
            <span>Grade: {text(record["grade"])}</span>
          ) : null}

          {text(record["type"]) ? <span>{text(record["type"])}</span> : null}
        </div>

        {text(record["description"]) ? (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
            {text(record["description"])}
          </p>
        ) : null}

        {tech.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tech.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface-light/40 px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors group-hover:border-border/80"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export function EducationSection({ data }: { data: PortfolioData }) {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic background"
      description="My academic journey and the foundation behind my technical skills."
    >
      {data.education.length === 0 ? (
        <EmptyState message="No education records have been added yet." />
      ) : (
        <Reveal as="ol" className="space-y-5">
          {data.education.map((record, index) => (
            <TimelineItem
              key={idOf(record)}
              record={record}
              isLast={index === data.education.length - 1}
            />
          ))}
        </Reveal>
      )}
    </Section>
  );
}

export function ExperienceSection({ data }: { data: PortfolioData }) {
  const note = text(data.profile?.["experienceNote"]);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have applied what I learn"
      description="Practical experience gained through internships, projects, collaborations, and continuous development."
    >
      {data.experience.length === 0 ? (
        <EmptyState
          message={
            note ||
            "Currently building experience through academic projects, personal projects, and continuous learning."
          }
        />
      ) : (
        <Reveal as="ol" className="space-y-5">
          {data.experience.map((record, index) => (
            <TimelineItem
              key={idOf(record)}
              record={record}
              isLast={index === data.experience.length - 1}
            />
          ))}
        </Reveal>
      )}
    </Section>
  );
}

export function CertificationsSection({ data }: { data: PortfolioData }) {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Courses and credentials"
      description="Certifications and learning milestones that complement my academic and project experience."
    >
      {data.certifications.length === 0 ? (
        <EmptyState message="No certifications have been added yet." />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.certifications.map((item, index) => (
            <Reveal
              key={idOf(item)}
              className="surface-card group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-6"
              delay={index * 60}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface-light transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Award className="size-5 text-accent" aria-hidden />
                </span>

                {text(item["issueDate"]) ? (
                  <span className="rounded-md border border-border bg-surface-light/40 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    {text(item["issueDate"])}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-5 font-display text-base font-semibold leading-snug text-foreground">
                {text(item["name"])}
              </h3>

              {text(item["organization"]) ? (
                <p className="mt-1.5 text-sm font-medium text-secondary">
                  {text(item["organization"])}
                </p>
              ) : null}

              {text(item["description"]) ? (
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {text(item["description"])}
                </p>
              ) : (
                <div className="flex-1" />
              )}

              {text(item["credentialUrl"]) ? (
                <a
                  href={text(item["credentialUrl"])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-surface-light hover:text-foreground"
                >
                  View credential
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              ) : null}
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

export function AchievementsSection({ data }: { data: PortfolioData }) {
  if (data.achievements.length === 0) return null;

  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Milestones and participation"
      description="Highlights, events, competitions, and other accomplishments along the way."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {data.achievements.map((item, index) => (
          <Reveal
            key={idOf(item)}
            className="surface-card group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-6"
            delay={index * 60}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-medium tracking-wider text-accent uppercase">
                {text(item["category"], "Achievement")}
              </p>

              {text(item["date"]) ? (
                <span className="font-mono text-[10px] text-muted-foreground">
                  {text(item["date"])}
                </span>
              ) : null}
            </div>

            <h3 className="mt-3 font-display text-base font-semibold leading-snug">
              {text(item["title"])}
            </h3>

            {text(item["organization"]) ? (
              <p className="mt-1.5 text-sm text-secondary">
                {text(item["organization"])}
              </p>
            ) : null}

            {text(item["description"]) ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {text(item["description"])}
              </p>
            ) : null}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ServicesSection({ data }: { data: PortfolioData }) {
  if (data.services.length === 0) return null;

  return (
    <Section
      id="services"
      eyebrow="What I can do"
      title="Capabilities I am building"
      description="Areas where I can contribute as a student developer while continuing to strengthen my skills."
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {data.services.map((item, index) => (
          <Reveal
            key={idOf(item)}
            className="surface-card group p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-6"
            delay={index * 60}
          >
            <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-light transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
              <Icon
                name={text(item["icon"], "Sparkles")}
                className="size-4 text-primary"
              />
            </span>

            <h3 className="mt-5 font-display text-base font-semibold">
              {text(item["title"])}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {text(item["description"])}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ResumeSection({ data }: { data: PortfolioData }) {
  const url = text(data.settings?.["resumeUrl"]);

  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="My resume"
      description="A concise overview of my education, technical skills, projects, and experience."
    >
      <Reveal className="surface-card group relative overflow-hidden p-6 sm:p-8">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-primary/5 blur-3xl transition-opacity duration-500 group-hover:bg-primary/10"
          aria-hidden
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-light">
              <FileText className="size-5 text-primary" aria-hidden />
            </span>

            <div>
              <p className="font-display text-base font-semibold sm:text-lg">
                {url ? "Resume available" : "Resume not uploaded yet"}
              </p>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">
                {url
                  ? "Download or preview the latest version of my resume."
                  : "The active resume file is managed from the admin dashboard."}
              </p>
            </div>
          </div>

          {url ? (
            <div className="flex shrink-0 flex-wrap gap-2">
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md"
              >
                Download resume
              </a>

              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:border-border/80 hover:bg-surface-light"
              >
                Preview
              </a>
            </div>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
