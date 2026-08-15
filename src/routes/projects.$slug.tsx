import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { fetchProject } from "@/lib/portfolio/api.functions";
import { list, text, type Rec } from "@/lib/portfolio/content";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const result = (await fetchProject({
      data: { slug: params.slug },
    })) as {
      project?: Rec | null;
    };

    if (!result.project) {
      throw notFound();
    }

    return result.project;
  },

  head: ({ loaderData }) => {
    const title = text(loaderData?.["title"], "Project");
    const description = text(
      loaderData?.["shortDescription"],
      "Project details.",
    );

    return {
      meta: [
        { title: `${title} — Project case study` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — Project case study` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },

  component: ProjectDetail,
});

function ProjectDetail() {
  const project = Route.useLoaderData();

  const technologies = list(project["technologies"]);
  const features = list(project["features"]);

  return (
    <main className="pt-24 pb-20">
      <article className="container-page max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back to portfolio
        </Link>

        <p className="mt-8 font-mono text-[11px] tracking-wide text-accent uppercase">
          {text(project["category"])}
        </p>

        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          {text(project["title"])}
        </h1>

        <p className="mt-4 text-base text-muted-foreground">
          {text(project["shortDescription"])}
        </p>

        {text(project["image"]) ? (
          <img
            src={text(project["image"])}
            alt={`${text(project["title"])} screenshot`}
            className="surface-card mt-8 w-full object-cover"
            loading="lazy"
          />
        ) : null}

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {(
            [
              "description",
              "problem",
              "solution",
              "challenges",
              "learnings",
            ] as const
          ).map((key) =>
            text(project[key]) ? (
              <section key={key}>
                <h2 className="font-display text-lg font-semibold text-foreground capitalize">
                  {key}
                </h2>

                <p className="mt-2 whitespace-pre-line">{text(project[key])}</p>
              </section>
            ) : null,
          )}

          {features.length ? (
            <section>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Key features
              </h2>

              <ul className="mt-2 list-disc space-y-1 pl-5">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {technologies.length ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {text(project["githubUrl"]) ? (
            <a
              href={text(project["githubUrl"])}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-light"
            >
              <Github className="size-4" aria-hidden />
              Source code
            </a>
          ) : null}

          {text(project["liveUrl"]) ? (
            <a
              href={text(project["liveUrl"])}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <ExternalLink className="size-4" aria-hidden />
              Live demo
            </a>
          ) : null}
        </div>
      </article>
    </main>
  );
}
