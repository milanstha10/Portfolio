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
    <li className="relative pl-10">
      <span
        className="absolute top-1.5 left-2.75 size-3 rounded-full border-2 border-primary bg-background"
        aria-hidden
      />
      {!isLast ? (
        <span
          className="absolute top-5 bottom-0 left-4 w-px bg-border"
          aria-hidden
        />
      ) : null}
      <div className="surface-card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-base font-semibold">{title}</h3>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <Calendar className="size-3" aria-hidden />
            {start} — {end}
          </span>
        </div>
        <p className="mt-1 text-sm text-secondary">{org}</p>
        {text(record["university"]) ? (
          <p className="text-xs text-muted-foreground">
            {text(record["university"])}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {text(record["location"]) ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" aria-hidden />
              {text(record["location"])}
            </span>
          ) : null}
          {text(record["grade"]) ? (
            <span>Grade: {text(record["grade"])}</span>
          ) : null}
          {text(record["type"]) ? <span>{text(record["type"])}</span> : null}
        </div>
        {text(record["description"]) ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {text(record["description"])}
          </p>
        ) : null}
        {tech.length ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {tech.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
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
    <Section id="education" eyebrow="Education" title="Academic background">
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
    >
      {data.certifications.length === 0 ? (
        <EmptyState message="No certifications have been added yet." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.certifications.map((item, index) => (
            <Reveal
              key={idOf(item)}
              className="surface-card flex flex-col p-5"
              delay={index * 60}
            >
              <Award className="size-5 text-accent" aria-hidden />
              <h3 className="mt-3 font-display text-base font-semibold">
                {text(item["name"])}
              </h3>
              <p className="mt-1 text-sm text-secondary">
                {text(item["organization"])}
              </p>
              {text(item["issueDate"]) ? (
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  Issued {text(item["issueDate"])}
                </p>
              ) : null}
              {text(item["description"]) ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  {text(item["description"])}
                </p>
              ) : null}
              {text(item["credentialUrl"]) ? (
                <a
                  href={text(item["credentialUrl"])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-surface-light"
                >
                  View credential{" "}
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
    >
      <div className="grid gap-6 md:grid-cols-2">
        {data.achievements.map((item, index) => (
          <Reveal
            key={idOf(item)}
            className="surface-card p-5"
            delay={index * 60}
          >
            <p className="font-mono text-[11px] tracking-wide text-accent uppercase">
              {text(item["category"])}
            </p>
            <h3 className="mt-2 font-display text-base font-semibold">
              {text(item["title"])}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {text(item["organization"])}
              {text(item["date"]) ? ` · ${text(item["date"])}` : ""}
            </p>
            {text(item["description"]) ? (
              <p className="mt-3 text-sm text-muted-foreground">
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
      description="Areas I can already contribute to as a student developer, and keep improving in."
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data.services.map((item, index) => (
          <Reveal
            key={idOf(item)}
            className="surface-card p-5"
            delay={index * 60}
          >
            <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-light">
              <Icon
                name={text(item["icon"], "Sparkles")}
                className="size-4 text-primary"
              />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold">
              {text(item["title"])}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
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
    <Section id="resume" eyebrow="Resume" title="My resume">
      <Reveal className="surface-card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-light">
            <FileText className="size-5 text-primary" aria-hidden />
          </span>
          <div>
            <p className="font-display text-base font-semibold">
              {url ? "Resume available" : "Resume not uploaded yet"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {url
                ? "Download or preview the latest version of my resume."
                : "The active resume file is managed from the admin dashboard."}
            </p>
          </div>
        </div>
        {url ? (
          <div className="flex flex-wrap gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Download resume
            </a>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-light"
            >
              Preview
            </a>
          </div>
        ) : null}
      </Reveal>
    </Section>
  );
}
