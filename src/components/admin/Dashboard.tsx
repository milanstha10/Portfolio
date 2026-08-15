import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";

import { dashboardStats } from "@/lib/portfolio/api.functions";

export function Dashboard() {
  const getStats = useServerFn(dashboardStats);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => getStats(),
  });

  const cards = [
    ["projects", "Projects"],
    ["skills", "Skills"],
    ["education", "Education"],
    ["experience", "Experience"],
    ["certifications", "Certifications"],
    ["achievements", "Achievements"],
    ["services", "Services"],
    ["socialLinks", "Social links"],
    ["messages", "Messages"],
  ] as const;

  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="Overview of your portfolio content stored in MongoDB."
      />

      {isLoading ? (
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading statistics...
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map(([key, label]) => (
              <div
                key={key}
                className="surface-card rounded-xl border border-border p-5"
              >
                <p className="text-sm text-muted-foreground">{label}</p>

                <p className="mt-2 text-3xl font-semibold">
                  {data?.[key] ?? 0}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-green-500/5 p-5">
              <p className="text-sm text-muted-foreground">
                Published projects
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {data?.["publishedProjects"] ?? 0}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-orange-500/5 p-5">
              <p className="text-sm text-muted-foreground">Unread messages</p>

              <p className="mt-2 text-2xl font-semibold">
                {data?.["unreadMessages"] ?? 0}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
