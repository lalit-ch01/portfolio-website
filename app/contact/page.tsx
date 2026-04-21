import type { Metadata } from "next";
import type { ElementType } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Lalit Chaudhari",
  description:
    "Let's build something impactful. Reach out about a role, a project, or an idea — I respond within 48 hours.",
  openGraph: {
    title: "Contact — Lalit Chaudhari",
    description: "Get in touch — full-time roles, freelance engagements, or just a conversation.",
  },
};

export default function ContactPage() {
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

          <div className="md:col-span-7">
            <ContactForm />
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
  icon: ElementType;
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
