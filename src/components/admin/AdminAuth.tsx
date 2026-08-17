import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { authStatus, login, setupAdmin } from "@/lib/portfolio/portfolio.api";

export function LoginScreen({ needsSetup }: { needsSetup: boolean }) {
  const queryClient = useQueryClient();

  return <ActualLoginForm needsSetup={needsSetup} queryClient={queryClient} />;
}

function ActualLoginForm({
  needsSetup,
  queryClient,
}: {
  needsSetup: boolean;
  queryClient: ReturnType<typeof useQueryClient>;
}) {
  const navigate = useNavigate();

  const getAuthStatus = useServerFn(authStatus);
  const loginFn = useServerFn(login);
  const setupAdminFn = useServerFn(setupAdmin);

  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();

    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setPending(true);

    try {
      if (needsSetup) {
        await setupAdminFn({
          data: {
            email,
            password,
          },
        });

        toast.success("Admin account created successfully");
      } else {
        await loginFn({
          data: {
            email,
            password,
          },
        });

        toast.success("Signed in successfully");
      }

      const status = await getAuthStatus();

      await queryClient.invalidateQueries({
        queryKey: ["auth-status"],
      });

      if (!status.admin) {
        throw new Error(
          "Authentication succeeded, but the admin session was not created. Please check your session configuration.",
        );
      }

      await navigate({
        to: "/admin",
        replace: true,
      });
    } catch (error) {
      console.error("[admin] authentication error", error);

      toast.error(needsSetup ? "Could not create admin" : "Sign-in failed", {
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="surface-card w-full max-w-sm p-7">
        <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-light">
          <ShieldCheck className="size-5 text-primary" />
        </span>

        <h1 className="mt-5 font-display text-xl font-semibold">
          {needsSetup ? "Create admin account" : "Admin sign in"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {needsSetup
            ? "MongoDB is connected. Create your first administrator."
            : "Enter your administrator credentials."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Email
            </span>

            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={pending}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
            />
          </label>

          <label className="block text-sm">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Password
            </span>

            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete={needsSetup ? "new-password" : "current-password"}
              disabled={pending}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {pending && <Loader2 className="size-4 animate-spin" />}

            {pending
              ? "Please wait..."
              : needsSetup
                ? "Create admin account"
                : "Sign in"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
