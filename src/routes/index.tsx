import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/portfolio/AboutSection";
import { Contact } from "@/components/portfolio/ContactSection";
import { Hero } from "@/components/portfolio/HeroSection";
import { Navbar } from "@/components/portfolio/Navbar";
import { Projects } from "@/components/portfolio/ProjectsSection";
import {
  AchievementsSection,
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  ResumeSection,
  ServicesSection,
} from "@/components/portfolio/EducationSection";
import { Skills } from "@/components/portfolio/SkillsSection";
import { fetchPortfolio } from "@/lib/portfolio/portfolio.api";
import {
  EMPTY_PORTFOLIO,
  idOf,
  text,
  type PortfolioData,
} from "@/lib/portfolio/portfolio.content";

export const Route = createFileRoute("/")({
  loader: async (): Promise<PortfolioData> => {
    try {
      const result = await fetchPortfolio();
      return (result.content as PortfolioData | null) ?? EMPTY_PORTFOLIO;
    } catch {
      return EMPTY_PORTFOLIO;
    }
  },
  head: () => ({
    meta: [
      { title: "Portfolio — BIT Student & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of a Bachelor of Information Technology student: projects, skills, education, certifications and contact details.",
      },
      {
        property: "og:title",
        content: "Portfolio — BIT Student & Full-Stack Developer",
      },
      {
        property: "og:description",
        content:
          "Projects, skills, education and certifications of a BIT student developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const data = Route.useLoaderData();

  return (
    <>
      <Navbar data={data} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Skills data={data} />
        <Projects data={data} />
        <EducationSection data={data} />
        <ExperienceSection data={data} />
        <CertificationsSection data={data} />
        <AchievementsSection data={data} />
        <ServicesSection data={data} />
        <ResumeSection data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </>
  );
}

function Footer({ data }: { data: PortfolioData }) {
  const name = text(data.profile?.["name"], "[YOUR NAME]");

  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-3">
          {data.socialLinks.map((link) => (
            <a
              key={idOf(link)}
              href={text(link["url"])}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {text(link["label"])}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
