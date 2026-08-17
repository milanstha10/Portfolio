import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { authStatus, logout } from "@/lib/portfolio/portfolio.api";

import {
  PROFILE_FIELDS,
  SETTINGS_FIELDS,
} from "@/lib/portfolio/portfolio.schema";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { LoginScreen } from "@/components/admin/AdminAuth";
import { Dashboard } from "@/components/admin/AdminDashboard";
import {
  CollectionEditor,
  SingletonEditor,
} from "@/components/admin/AdminEditors";
import { Messages } from "@/components/admin/AdminMessages";
import { isCollectionKey, type SectionKey } from "@/components/admin/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      {
        title: "Admin — Portfolio content manager",
      },
      {
        name: "description",
        content: "Secure admin area for managing portfolio content.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),

  component: AdminPage,
});

function AdminPage() {
  const queryClient = useQueryClient();

  const getAuthStatus = useServerFn(authStatus);
  const doLogout = useServerFn(logout);

  const [section, setSection] = useState<SectionKey>("dashboard");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["auth-status"],
    queryFn: () => getAuthStatus(),
  });

  async function handleLogout() {
    try {
      await doLogout();

      queryClient.clear();

      await refetch();

      toast.success("Signed out");
    } catch (error) {
      console.error("[admin] logout error", error);

      toast.error("Could not sign out", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  }

  if (isLoading) {
    return <AdminLoading />;
  }

  if (isError || !data) {
    return <AdminError onRetry={() => refetch()} />;
  }

  if (!data.configured) {
    return <MongoSetupMessage />;
  }

  if (!data.admin) {
    return <LoginScreen needsSetup={data.needsSetup} />;
  }

  return (
    <AdminLayout
      section={section}
      email={String(data.admin.email ?? "")}
      onSectionChange={setSection}
      onLogout={handleLogout}
    >
      <AdminContent section={section} />
    </AdminLayout>
  );
}

function AdminContent({ section }: { section: SectionKey }) {
  switch (section) {
    case "dashboard":
      return <Dashboard />;

    case "profile":
      return (
        <SingletonEditor
          title="Profile"
          description="Manage your personal information, bio, contact details and profile links."
          apiKey="profile"
          fields={PROFILE_FIELDS}
        />
      );

    case "settings":
      return (
        <SingletonEditor
          title="Site settings"
          description="Manage your website title, hero content, SEO and resume."
          apiKey="siteSettings"
          fields={SETTINGS_FIELDS}
        />
      );

    case "messages":
      return <Messages />;

    default:
      if (isCollectionKey(section)) {
        return <CollectionEditor collectionKey={section} />;
      }

      return null;
  }
}

function AdminLoading() {
  return (
    <main
      className="grid min-h-screen place-items-center"
      aria-label="Loading admin panel"
    >
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </main>
  );
}

function AdminError({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="surface-card w-full max-w-md p-7">
        <h1 className="text-xl font-semibold">
          Could not connect to the server
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Check your MongoDB environment variables and restart the development
          server.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

function MongoSetupMessage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="surface-card w-full max-w-md p-7">
        <ShieldCheck className="size-8 text-primary" />

        <h1 className="mt-5 text-xl font-semibold">
          MongoDB is not configured
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Add these values to your server environment:
        </p>

        <div className="mt-5 rounded-lg border border-border bg-surface-light p-4 font-mono text-xs leading-6">
          <div>MONGODB_URI=...</div>
          <div>MONGODB_DB=...</div>
          <div>SESSION_SECRET=...</div>
        </div>
      </div>
    </main>
  );
}
