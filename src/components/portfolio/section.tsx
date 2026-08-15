import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string | undefined;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative scroll-mt-28 border-t border-border/40 py-20 sm:py-24 lg:py-28 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/50 to-transparent"
        aria-hidden
      />

      <div className="container-page">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-primary/70" aria-hidden />

            <p className="section-eyebrow">{eyebrow}</p>
          </div>

          <h2
            id={`${id}-heading`}
            className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </h2>

          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-10 sm:mt-12 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}

export function EmptyState({
  message,
  hint,
}: {
  message: string;
  hint?: string;
}) {
  return (
    <div className="surface-card relative flex min-h-48 flex-col items-center justify-center overflow-hidden px-6 py-14 text-center">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 size-40 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <div className="mx-auto grid size-10 place-items-center rounded-xl border border-border/70 bg-surface-light">
          <span className="size-2 rounded-full bg-primary" aria-hidden />
        </div>

        <p className="mt-4 text-sm font-semibold text-foreground">{message}</p>

        {hint ? (
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
