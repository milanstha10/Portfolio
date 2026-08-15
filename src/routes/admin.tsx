import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2, LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  authStatus,
  login,
  logout,
  runSeed,
  setupAdmin,
} from "@/lib/portfolio/api.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Portfolio content manager" },
      {
        name: "description",
        content: "Secure admin area for managing portfolio content.",
      },
      { property: "og:title", content: "Admin — Portfolio content manager" },
      {
        property: "og:description",
        content: "Secure admin area for managing portfolio content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const queryClient = useQueryClient();
  const status = useServerFn(authStatus);
  const doLogin = useServerFn(login);
  const doSetup = useServerFn(setupAdmin);
  const doLogout = useServerFn(logout);
  const doSeed = useServerFn(runSeed);
  const [pending, setPending] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["auth-status"],
    queryFn: () => status(),
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Record<string, string>;
    setPending(true);
    try {
      if (data && !data.configured) {
        await doSetup({
          data: {
            email: values["email"] ?? "",
            password: values["password"] ?? "",
          },
        });
        toast.success("Admin account created");
      } else {
        await doLogin({
          data: {
            email: values["email"] ?? "",
            password: values["password"] ?? "",
          },
        });
        toast.success("Signed in");
      }
      await queryClient.invalidateQueries({ queryKey: ["auth-status"] });
    } catch {
      toast.error("Sign-in failed", {
        description: "Check your credentials and try again.",
      });
    } finally {
      setPending(false);
    }
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <Loader2
          className="size-5 animate-spin text-muted-foreground"
          aria-hidden
        />
      </main>
    );
  }

  if (!data?.admin) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <div className="surface-card w-full max-w-sm p-7">
          <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-light">
            <ShieldCheck className="size-5 text-primary" aria-hidden />
          </span>
          <h1 className="mt-5 font-display text-xl font-semibold">
            {data?.configured ? "Admin sign in" : "Create admin account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {data?.configured
              ? "Enter your credentials to manage portfolio content."
              : "No admin exists yet. Set your credentials to secure the dashboard."}
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block text-sm">
              <span className="text-xs tracking-wide text-muted-foreground uppercase">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="text-xs tracking-wide text-muted-foreground uppercase">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              {pending
                ? "Please wait..."
                : data?.configured
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-10 pb-20">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold">
              Content dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as {data.admin?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                setPending(true);
                try {
                  await doSeed();
                  toast.success("Demo content loaded");
                } catch {
                  toast.error("Could not load demo content");
                } finally {
                  setPending(false);
                }
              }}
              disabled={pending}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-light disabled:opacity-60"
            >
              Load demo content
            </button>
            <button
              type="button"
              onClick={async () => {
                await doLogout();
                queryClient.clear();
                await queryClient.invalidateQueries({
                  queryKey: ["auth-status"],
                });
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-light"
            >
              <LogOut className="size-4" aria-hidden /> Sign out
            </button>
          </div>
        </div>

        <p className="surface-card mt-8 p-6 text-sm text-muted-foreground">
          Full CRUD editors for projects, skills, education, experience,
          certifications, achievements, services, social links and messages are
          next — the secure API behind them is already live.
        </p>
      </div>
    </main>
  );
}
