import { useServerFn } from "@tanstack/react-start";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
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
      for (const issue of parsed.error.issues)
        next[String(issue.path[0])] = issue.message;
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

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      description="Messages are stored securely in the database and only visible from the admin dashboard."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="surface-card space-y-5 p-6">
          <div>
            <h3 className="font-display text-base font-semibold">
              Get in touch
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Open to internships, collaborations, and interesting student
              projects.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {text(profile["email"]) ? (
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" aria-hidden />
                <a
                  href={`mailto:${text(profile["email"])}`}
                  className="hover:text-primary"
                >
                  {text(profile["email"])}
                </a>
              </li>
            ) : null}
            {text(profile["location"]) ? (
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="size-4 text-secondary" aria-hidden />
                {text(profile["location"])}
              </li>
            ) : null}
          </ul>
          {data.socialLinks.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {data.socialLinks.map((link) => (
                <a
                  key={idOf(link)}
                  href={text(link["url"])}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={text(link["platform"])}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon
                    name={text(link["icon"], "Link")}
                    className="size-3.5"
                  />
                  {text(link["platform"])}
                </a>
              ))}
            </div>
          ) : null}
        </Reveal>

        <Reveal
          as="form"
          delay={80}
          className="surface-card space-y-4 p-6"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" error={errors["name"]} />
            <Field
              name="email"
              label="Email"
              type="email"
              error={errors["email"]}
            />
          </div>
          <Field name="subject" label="Subject" error={errors["subject"]} />
          <Field
            name="message"
            label="Message"
            textarea
            error={errors["message"]}
          />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Send className="size-4" aria-hidden />
            )}
            {pending ? "Sending..." : "Send message"}
          </button>
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
  error,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string | undefined;
}) {
  const shared =
    "mt-1.5 w-full rounded-lg border border-border bg-surface-light/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
  return (
    <label className="block text-sm">
      <span className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          className={shared}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={shared}
          aria-invalid={Boolean(error)}
        />
      )}
      {error ? (
        <span className="mt-1 block text-xs text-destructive">{error}</span>
      ) : null}
    </label>
  );
}
