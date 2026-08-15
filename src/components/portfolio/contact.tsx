import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Loader2, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Section } from "@/components/portfolio/section";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { idOf, text, type PortfolioData } from "@/lib/portfolio/content";
import { submitMessage } from "@/lib/portfolio/api.functions";
import { messageSchema } from "@/lib/portfolio/schema";

export function Contact({ data }: { data: PortfolioData }) {
  const send = useServerFn(submitMessage);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const profile = data.profile ?? {};

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const parsed = messageSchema.safeParse(values);

    if (!parsed.success) {
      const next: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);

        if (!next[key]) {
          next[key] = issue.message;
        }
      }

      setErrors(next);
      return;
    }

    setErrors({});
    setPending(true);

    try {
      await send({ data: parsed.data });

      toast.success("Message sent", {
        description: "Thanks for reaching out — I'll reply soon.",
      });

      form.reset();
    } catch {
      toast.error("Could not send your message", {
        description: "Please try again in a moment.",
      });
    } finally {
      setPending(false);
    }
  }

  const email = text(profile["email"]);
  const location = text(profile["location"]);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      description="Have an idea, opportunity, or project in mind? Send me a message and I'll get back to you."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <Reveal className="surface-card relative overflow-hidden p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-primary/5 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  Get in touch
                </p>

                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  Let's connect
                </h3>
              </div>

              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-surface-light/60">
                <Mail className="size-4 text-primary" aria-hidden />
              </span>
            </div>

            <p className="relative mt-6 text-sm leading-7 text-muted-foreground">
              I'm open to internships, collaborations, freelance opportunities,
              and interesting student projects. If you have something worth
              discussing, I'd love to hear from you.
            </p>

            <ul className="relative mt-7 space-y-3">
              {email ? (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface-light/30 p-3.5 transition-all duration-200 hover:border-border hover:bg-surface-light"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border/70 bg-surface">
                      <Mail className="size-4 text-primary" aria-hidden />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                        Email
                      </span>

                      <span className="mt-0.5 block truncate text-sm font-medium text-foreground">
                        {email}
                      </span>
                    </span>

                    <ArrowUpRight
                      className="size-4 text-muted-foreground/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      aria-hidden
                    />
                  </a>
                </li>
              ) : null}

              {location ? (
                <li>
                  <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-light/30 p-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border/70 bg-surface">
                      <MapPin className="size-4 text-secondary" aria-hidden />
                    </span>

                    <span>
                      <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                        Location
                      </span>

                      <span className="mt-0.5 block text-sm font-medium text-foreground">
                        {location}
                      </span>
                    </span>
                  </div>
                </li>
              ) : null}
            </ul>

            {data.socialLinks.length ? (
              <div className="relative mt-7 border-t border-border/70 pt-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Find me online
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {data.socialLinks.map((link) => {
                    const platform = text(link["platform"]);
                    const url = text(link["url"]);

                    if (!url) return null;

                    return (
                      <a
                        key={idOf(link)}
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={platform}
                        className="group inline-flex items-center gap-2 rounded-lg border border-border/70 bg-surface-light/30 px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-surface-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <Icon
                          name={text(link["icon"], "Link")}
                          className="size-3.5"
                        />

                        {platform}

                        <ArrowUpRight
                          className="size-3 text-muted-foreground/40 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal
          as="form"
          delay={80}
          className="surface-card relative overflow-hidden p-6 sm:p-8"
          onSubmit={onSubmit}
          noValidate
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-secondary/5 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <div className="mb-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                Send a message
              </p>

              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                Tell me about your idea
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Fill out the form below and your message will be securely
                delivered to my inbox.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                name="name"
                label="Name"
                placeholder="Your name"
                error={errors["name"]}
                disabled={pending}
              />

              <Field
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors["email"]}
                disabled={pending}
              />
            </div>

            <div className="mt-5">
              <Field
                name="subject"
                label="Subject"
                placeholder="What would you like to discuss?"
                error={errors["subject"]}
                disabled={pending}
              />
            </div>

            <div className="mt-5">
              <Field
                name="message"
                label="Message"
                placeholder="Tell me a little about your project, opportunity, or idea..."
                textarea
                error={errors["message"]}
                disabled={pending}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] leading-5 text-muted-foreground">
                Your message is handled securely through the portfolio backend.
              </p>

              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:opacity-95 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {pending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}

                {pending ? "Sending..." : "Send message"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  placeholder,
  error,
  disabled,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  error?: string | undefined;
  disabled?: boolean;
}) {
  const id = `contact-${name}`;

  const shared =
    "mt-1.5 w-full rounded-xl border bg-surface-light/40 px-3.5 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:bg-surface-light focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60";

  const borderClass = error
    ? "border-destructive/70 focus:border-destructive focus:ring-destructive/10"
    : "border-border/70 focus:border-primary focus:ring-primary/10";

  return (
    <label htmlFor={id} className="block text-sm">
      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          placeholder={placeholder}
          disabled={disabled}
          className={`${shared} ${borderClass} resize-y`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${shared} ${borderClass}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      {error ? (
        <span
          id={`${id}-error`}
          className="mt-1.5 block text-xs text-destructive"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}
