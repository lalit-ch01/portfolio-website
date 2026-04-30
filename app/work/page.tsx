import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Selected Work — Lalit Chaudhari",
  description:
    "Deep case studies on AI systems, SaaS products, and full-stack engineering — RAG, ProjTrack Desk, BrainBench, ThreadTalk.",
  openGraph: {
    title: "Selected Work — Lalit Chaudhari",
    description: "Case studies on AI systems and SaaS products built end-to-end.",
  },
};

type Study = {
  num: string;
  category: string;
  year: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  architecture: string[];
  stack: string[];
  outcome: { k: string; v: string }[];
  deepDive?: { href: string; label: string };
};

const STUDIES: Study[] = [
  {
    num: "01",
    category: "AI System · RAG",
    year: "2025",
    title: "Retrieval system for academic institutions.",
    summary:
      "A grounded, citation-aware question answering layer over institutional knowledge — syllabi, policies, archived research.",
    problem:
      "Off-the-shelf chatbots either hallucinated citations or dropped context across multi-step queries. Faculty needed answers they could trust enough to publish in a course handbook.",
    approach:
      "Hybrid retrieval (BM25 + dense embeddings), cross-encoder reranking, then a constrained generator that refuses to answer when grounded confidence drops below threshold. State managed through a LangGraph state machine with checkpointing for replay.",
    architecture: [
      "Ingestion → chunking with semantic boundaries → embeddings (OpenAI text-embed-3) → pgvector",
      "Hybrid retriever combines lexical and dense recall, top-k = 20",
      "Cross-encoder rerank narrows to top-8 with calibrated scores",
      "Generator runs through LangGraph with deterministic refusal node",
      "Postgres-backed checkpointer for conversation state and audit",
    ],
    stack: ["Python", "LangChain", "LangGraph", "pgvector", "FastAPI", "OpenAI"],
    outcome: [
      { k: "Citation accuracy", v: "94%" },
      { k: "p95 latency", v: "1.8s" },
      { k: "Sources indexed", v: "12k+" },
    ],
  },
  {
    num: "02",
    category: "Product · AI-powered",
    year: "2024",
    title: "ProjTrack Desk — student project workflows, centralized.",
    summary:
      "A workspace that turned scattered project tracking — spreadsheets, email, WhatsApp — into a single source of truth for an entire department.",
    problem:
      "Faculty couldn't answer 'how is each team doing?' without manual chasing. Students didn't know what 'on track' looked like. Reviewers received PDFs with no context.",
    approach:
      "Built a structured workspace around project lifecycle (proposal → milestones → review). Layered AI-assisted progress summaries that read commit history and standup notes to produce honest weekly updates faculty actually read.",
    architecture: [
      "Django REST backend with role-based permissions (student / mentor / reviewer)",
      "React frontend with optimistic UI for status updates",
      "Background jobs summarize weekly activity per team",
      "Notification system routes only the changes that matter",
    ],
    stack: ["React", "Django", "PostgreSQL", "Celery", "OpenAI"],
    outcome: [
      { k: "Active project teams", v: "40+" },
      { k: "Faculty time saved / week", v: "~6 hrs" },
      { k: "Adoption", v: "Department-wide" },
    ],
  },
  {
    num: "03",
    category: "SaaS Product",
    year: "2024",
    title: "BrainBench — adaptive aptitude learning.",
    summary:
      "An aptitude prep platform built around mastery — not question count. Tracks per-skill scoring on a topic graph and serves the next test you actually need.",
    problem:
      "Existing aptitude tools optimize for grinding. Students hit plateaus they can't see, so they drill the same topic instead of the next one.",
    approach:
      "Modeled topics as a directed graph with prerequisites. Per-skill scores update with every attempt; the engine selects the next test set from the frontier of weakest skills with at-risk dependencies.",
    architecture: [
      "Topic graph with weighted edges for prerequisite strength",
      "Per-skill score model updated via Bayesian smoothing",
      "Test composer pulls from question bank balanced by skill targets",
      "React frontend with progress visualisations students actually understand",
    ],
    stack: ["React", "Django", "PostgreSQL", "REST"],
    outcome: [
      { k: "Question bank", v: "1,500+" },
      { k: "Test types", v: "12" },
      { k: "Status", v: "In production" },
    ],
  },
  {
    num: "04",
    category: "Marketing Cloud · Integration",
    year: "2024",
    title: "SFMC Journey Builder → Slack custom activity.",
    summary:
      "A custom Journey Builder activity that pushes contact-level events from Salesforce Marketing Cloud directly into Slack channels in real time — installed as a first-class drag-and-drop step inside Journey Builder.",
    problem:
      "Marketing ops needed Slack alerts when contacts hit specific points in a journey (form submits, churn risk, high-value triggers). The default SFMC stack has no native Slack step, and exporting to a middleware tool added latency and a paid hop the team didn't want.",
    approach:
      "Built a self-hosted Node.js custom activity exposing the four Journey Builder lifecycle endpoints (save, validate, publish, execute), registered it in SFMC Installed Packages with the right scopes, and wired execute() to fan contact data out through Slack Incoming Webhooks with channel + message templating configured per journey step.",
    architecture: [
      "Node.js / Express API hosting the custom activity UI (config.json + HTML config screen) and the four lifecycle endpoints",
      "Lifecycle endpoints implemented: /save, /validate, /publish, /execute — /execute receives the contact payload from Journey Builder at runtime",
      "Activity registered in SFMC Setup → Installed Packages with a Journey Builder Activity component pointing at the hosted endpoint URLs",
      "JWT verification on incoming requests using the package's signing secret to confirm calls actually originate from SFMC",
      "Per-step config (Slack webhook URL, channel, message template with merge fields) persisted in the activity's inArguments and replayed on every contact",
      "Slack delivery via Incoming Webhooks with templated blocks; failures surfaced back to Journey Builder via non-200 responses for retry",
    ],
    stack: ["SFMC", "Journey Builder", "Node.js", "Express", "Slack Webhooks", "JWT"],
    outcome: [
      { k: "Lifecycle endpoints", v: "4 / 4" },
      { k: "Alert latency", v: "<2s" },
      { k: "Status", v: "In production" },
    ],
    deepDive: {
      href: "/sfmc-custom-activity-tutorial",
      label: "Read the full SFMC custom activity tutorial",
    },
  },
];

export default function WorkPage() {
  return (
    <>
      <header className="border-b hairline" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-page py-20 md:py-28">
          <span className="eyebrow">Work</span>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Systems I've shipped — explained the way I'd explain them in an interview.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            Each case study covers the problem, the approach, the architecture, and the outcome.
            No screenshots without context.
          </p>
        </div>
      </header>

      <section className="container-page py-20 md:py-28">
        <div className="space-y-24 md:space-y-32">
          {STUDIES.map((s) => (
            <CaseStudyDeep key={s.num} study={s} />
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="panel flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Want the architecture diagrams?</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Happy to walk through any of these systems in detail — including trade-offs, failure
              modes, and what I'd do differently next time.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function CaseStudyDeep({ study }: { study: Study }) {
  return (
    <article className="grid gap-10 md:grid-cols-12">
      <aside className="md:col-span-4">
        <div className="md:sticky md:top-24">
          <div className="flex items-center gap-3">
            <span className="num-mark">{study.num}</span>
            <span className="pill">{study.category}</span>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {study.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {study.stack.map((t) => (
              <span key={t} className="rounded-md border hairline bg-[var(--surface-elevated)] px-2 py-1 font-mono text-[11px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
          <div className="num-mark mt-6">Shipped · {study.year}</div>
        </div>
      </aside>

      <div className="md:col-span-8">
        <div className="space-y-8">
          <Block label="Problem" body={study.problem} />
          <Block label="Approach" body={study.approach} />
          <div>
            <span className="num-mark">Architecture</span>
            <ul className="mt-3 space-y-2.5 border-l hairline pl-5">
              {study.architecture.map((a, i) => (
                <li key={i} className="text-sm leading-relaxed text-foreground/85">
                  <span className="mr-2 font-mono text-[11px]" style={{ color: "var(--brand)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="num-mark">Outcome</span>
            <div className="mt-3 grid grid-cols-3 divide-x hairline rounded-xl border hairline bg-[var(--surface-elevated)] p-2">
              {study.outcome.map((o) => (
                <div key={o.k} className="px-4 py-3">
                  <div className="text-xl font-semibold tracking-tight md:text-2xl">{o.v}</div>
                  <div className="num-mark mt-1">{o.k}</div>
                </div>
              ))}
            </div>
          </div>
          {study.deepDive && (
            <div className="rounded-xl border hairline bg-[var(--surface-subtle)] p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="num-mark">Deep dive</span>
                  <p className="mt-1 text-sm text-foreground/85">{study.deepDive.label}</p>
                </div>
                <Link
                  href={study.deepDive.href}
                  className="link-underline inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  See more <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <span className="num-mark">{label}</span>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">{body}</p>
    </div>
  );
}
