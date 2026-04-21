import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Lalit Chaudhari",
  description:
    "AI System Development, RAG / LLM integration, full-stack SaaS engineering, and Salesforce Marketing Cloud implementation.",
  openGraph: {
    title: "Services — Lalit Chaudhari",
    description: "Engagements built around outcomes — AI systems, SaaS, and SFMC.",
  },
};

const SERVICES = [
  {
    num: "01",
    title: "AI System Development",
    who: "Founders and product teams shipping their first serious AI feature.",
    solve:
      "I take a vague AI ambition (\"we should add an assistant\") and turn it into a system that actually survives real users — with evals, guardrails, and a clear path from prompt to production.",
    how: [
      "Workshop scope, success metrics, and failure tolerance",
      "Prototype → eval harness → hardened production build",
      "Hand-off includes runbooks, eval suite, and observability",
    ],
  },
  {
    num: "02",
    title: "RAG / LLM Integration",
    who: "Teams with an existing product who want grounded retrieval done right.",
    solve:
      "Drop-in retrieval and reasoning that respects your data model, your latency budget, and your team's ability to maintain it after I leave.",
    how: [
      "Audit existing data, embeddings, and retrieval quality",
      "Design hybrid retrieval + reranking + grounded generation",
      "Ship with monitoring, citation enforcement, and refusal logic",
    ],
  },
  {
    num: "03",
    title: "Full Stack SaaS Development",
    who: "Solo founders or seed-stage teams who need a v1 they don't have to throw away.",
    solve:
      "End-to-end product engineering — from data model to deployed app — built on React + Django with the boring parts (auth, jobs, payments) handled correctly.",
    how: [
      "Discovery sprint to nail down the smallest shippable v1",
      "Engineering with weekly demos, not month-long silences",
      "Deploy + monitoring + handoff documentation",
    ],
  },
  {
    num: "04",
    title: "SFMC Implementation",
    who: "Marketing teams who've outgrown what the standard activity catalogue allows.",
    solve:
      "Custom Journey Builder activities, AMPscript / SSJS systems, and integrations that let your marketers ship campaigns without engineering tickets.",
    how: [
      "Map current journey gaps and integration debt",
      "Build custom activities and reusable AMPscript components",
      "Document for the marketing team, not just developers",
    ],
  },
];

const PROCESS = [
  { n: "01", t: "Discovery", d: "30-min call to understand the problem, then a written brief — so we both agree before any code." },
  { n: "02", t: "Scope & shape", d: "I propose the smallest meaningful scope, with clear non-goals. No padded estimates." },
  { n: "03", t: "Build in the open", d: "Weekly demos, async updates, and a shared backlog you can edit." },
  { n: "04", t: "Ship & hand off", d: "Production deploy, runbooks, and handoff docs your team can actually use." },
];

export default function ServicesPage() {
  return (
    <>
      <header className="border-b hairline" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-page py-20 md:py-28">
          <span className="eyebrow">Services</span>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Engagements built around outcomes — not hours.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            I work with founders and small teams who need an engineer who can hold the full picture
            — from system design to the last line of production code.
          </p>
        </div>
      </header>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-px overflow-hidden rounded-2xl border hairline bg-[var(--hairline)] md:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.num} className="bg-[var(--surface-elevated)] p-8 md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <span className="num-mark">{s.num}</span>
                <span className="font-mono text-[11px]" style={{ color: "var(--brand)" }}>Engagement</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{s.title}</h2>

              <div className="mt-6 space-y-5">
                <Field k="Who it's for" v={s.who} />
                <Field k="What I solve" v={s.solve} />
                <div>
                  <span className="num-mark">How I work</span>
                  <ul className="mt-3 space-y-2">
                    {s.how.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y hairline bg-[var(--surface-subtle)]">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow">Process</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                A small, predictable process that respects everyone's time.
              </h2>
            </div>
            <ol className="md:col-span-8">
              {PROCESS.map((p, i) => (
                <li
                  key={p.n}
                  className={`grid gap-4 py-7 md:grid-cols-[auto_1fr] md:gap-10 ${
                    i !== PROCESS.length - 1 ? "border-b hairline" : ""
                  }`}
                >
                  <span className="num-mark">{p.n}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{p.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="panel flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Have a project in mind?</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Tell me what you're working on. If it's a fit, I'll send a written scope within 48 hours.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <span className="num-mark">{k}</span>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{v}</p>
    </div>
  );
}
