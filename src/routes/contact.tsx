import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lalit Chaudhari" },
      {
        name: "description",
        content:
          "Let's build something impactful. Reach out about a role, a project, or an idea — I respond within 48 hours.",
      },
      { property: "og:title", content: "Contact — Lalit Chaudhari" },
      {
        property: "og:description",
        content: "Get in touch — full-time roles, freelance engagements, or just a conversation.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <header className="border-b hairline" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-page py-20 md:py-28">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Let's build something impactful.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            Tell me about the role, the project, or the idea. I read every message and respond
            within 48 hours.
          </p>
        </div>
      </header>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Contact info */}
          <aside className="md:col-span-5">
            <div className="space-y-8 md:sticky md:top-24">
              <ContactRow
                icon={Mail}
                label="Email"
                value="hello@lalitchaudhari.dev"
                href="mailto:hello@lalitchaudhari.dev"
              />
              <ContactRow
                icon={Linkedin}
                label="LinkedIn"
                value="/in/lalitchaudhari"
                href="https://www.linkedin.com"
              />
              <ContactRow
                icon={Github}
                label="GitHub"
                value="@lalitchaudhari"
                href="https://github.com"
              />

              <div className="panel p-6">
                <div className="num-mark">Response time</div>
                <p className="mt-2 text-sm text-foreground/90">
                  Within 48 hours, Mon–Fri. If it's urgent, mention it in the subject line.
                </p>
                <div className="num-mark mt-5">Time zone</div>
                <p className="mt-2 text-sm text-foreground/90">IST (UTC+5:30) · flexible for calls</p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="panel space-y-5 p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" placeholder="Jane Doe" required />
                <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
              </div>
              <Field label="Company / context" name="company" placeholder="Acme Inc — hiring for AI engineer" />

              <div>
                <label className="num-mark">What can I help with?</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Full-time role", "Freelance project", "AI system advice", "Just a conversation"].map((c) => (
                    <label key={c} className="cursor-pointer">
                      <input type="checkbox" name="topic" value={c} className="peer sr-only" />
                      <span className="rounded-full border hairline bg-[var(--surface-elevated)] px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-secondary peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                        {c}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="num-mark">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me what you're working on, the rough scope, and what success looks like."
                  className="mt-3 w-full resize-none rounded-lg border hairline bg-[var(--surface-elevated)] px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-[0_0_0_4px_var(--brand-soft)]"
                />
              </div>

              <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <p className="text-xs text-muted-foreground">
                  By sending this you agree I can reply to the email above. No newsletters, ever.
                </p>
                <button type="submit" className="btn-primary">
                  {submitted ? "Message sent ✓" : "Send message"}
                  {!submitted && <Send className="h-4 w-4" />}
                </button>
              </div>

              {submitted && (
                <div className="rounded-lg border hairline bg-[var(--brand-soft)] px-4 py-3 text-sm text-foreground">
                  Thanks — I've got it. You'll hear back within 48 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-2xl border hairline bg-[var(--surface-subtle)] p-8 text-center md:p-12">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Prefer a 20-minute intro call?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Mention it in your message and I'll send a calendar link with the next available slots.
          </p>
          <a
            href="mailto:hello@lalitchaudhari.dev?subject=Intro%20call"
            className="btn-ghost mt-6"
          >
            Email me directly <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group block border-b hairline pb-6">
      <div className="num-mark">{label}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border hairline bg-[var(--surface-elevated)]">
            <Icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
          </span>
          <span className="text-base font-medium tracking-tight">{value}</span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="num-mark">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-3 w-full rounded-lg border hairline bg-[var(--surface-elevated)] px-4 py-2.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-[0_0_0_4px_var(--brand-soft)]"
      />
    </div>
  );
}