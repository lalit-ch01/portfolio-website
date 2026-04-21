import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Brain, Code2, Layers, Sparkles, Workflow, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lalit Chaudhari — Building AI systems and scalable web products" },
      {
        name: "description",
        content:
          "AI Engineer specializing in RAG pipelines, LLM workflows, and full-stack SaaS development. Currently building real-world systems used in academic and product environments.",
      },
      { property: "og:title", content: "Lalit Chaudhari — AI Engineer & Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Building AI-powered systems and scalable web products. RAG, LLM orchestration, and SaaS engineering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Credibility />
      <Capabilities />
      <SelectedWork />
      <HowIThink />
      <ServicesPreview />
      <CurrentFocus />
      <ContactCTA />
    </>
  );
}

/* ---------------- 1. HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="container-page relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="fade-in mx-auto max-w-3xl text-center">
          <span className="pill">
            <span className="pill-dot" />
            Available for select engagements — Q2 2026
          </span>

          <h1 className="mt-7 text-balance text-[2.4rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-[4rem]">
            Building <span style={{ color: "var(--brand)" }}>AI-powered systems</span> and scalable web products.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            AI Engineer specializing in RAG pipelines, LLM workflows, and full-stack SaaS development.
            Currently building real-world systems used in academic and product environments.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/work" className="btn-primary">
              View Work <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get in Touch
            </Link>
          </div>
        </div>

        {/* terminal-ish system preview */}
        <div className="fade-in mx-auto mt-16 max-w-4xl panel overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <div className="flex items-center justify-between border-b hairline px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.78 0.15 25)" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.85 0.14 85)" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.78 0.16 145)" }} />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">rag-pipeline / orchestrator.py</span>
            <span className="font-mono text-[11px] text-muted-foreground">main</span>
          </div>
          <pre className="overflow-x-auto p-5 text-[12.5px] leading-relaxed">
<code className="font-mono">
<span style={{ color: "var(--muted-foreground)" }}># context-aware retrieval over institutional knowledge</span>{"\n"}
<span style={{ color: "var(--brand)" }}>from</span> langgraph.graph <span style={{ color: "var(--brand)" }}>import</span> StateGraph{"\n"}
<span style={{ color: "var(--brand)" }}>from</span> rag.retriever <span style={{ color: "var(--brand)" }}>import</span> HybridRetriever{"\n\n"}
graph = StateGraph(RAGState){"\n"}
graph.add_node(<span style={{ color: "oklch(0.55 0.16 30)" }}>"retrieve"</span>, HybridRetriever(top_k=<span style={{ color: "oklch(0.55 0.16 30)" }}>8</span>)){"\n"}
graph.add_node(<span style={{ color: "oklch(0.55 0.16 30)" }}>"rerank"</span>, CrossEncoderReranker()){"\n"}
graph.add_node(<span style={{ color: "oklch(0.55 0.16 30)" }}>"answer"</span>, GroundedAnswerer(model=<span style={{ color: "oklch(0.55 0.16 30)" }}>"gpt-4o"</span>)){"\n\n"}
<span style={{ color: "var(--muted-foreground)" }}># deterministic fallbacks → no hallucinated citations</span>{"\n"}
app = graph.compile(checkpointer=PostgresSaver()){"\n"}
</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 2. CREDIBILITY ---------------- */
function Credibility() {
  const items = [
    { k: "Industry experience", v: "CloudCove.ai" },
    { k: "AI systems shipped", v: "RAG · LangGraph · CrewAI" },
    { k: "SaaS products built", v: "BrainBench · ProjTrack" },
    { k: "Stack depth", v: "React · Django · SFMC" },
  ];
  return (
    <section className="border-y hairline bg-[var(--surface-subtle)]">
      <div className="container-page py-10">
        <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
          {items.map((i) => (
            <div key={i.k} className="flex flex-col gap-1 px-4 md:border-l hairline">
              <span className="num-mark">{i.k}</span>
              <span className="text-sm font-medium tracking-tight text-foreground">{i.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3. WHAT I DO ---------------- */
function Capabilities() {
  const groups = [
    {
      icon: Brain,
      title: "AI Systems Engineering",
      lead: "I design retrieval and reasoning systems that survive production — not demos.",
      bullets: [
        "RAG pipelines for academic & enterprise knowledge",
        "LLM orchestration with LangChain, LangGraph, CrewAI",
        "Context-aware agents with grounded citations",
      ],
    },
    {
      icon: Code2,
      title: "Full Stack Development",
      lead: "End-to-end SaaS — from data model to deployed product.",
      bullets: [
        "React / Next.js frontends with strong UX",
        "Django backend systems & REST APIs",
        "API-first, type-safe architectures",
      ],
    },
    {
      icon: Workflow,
      title: "Marketing Automation",
      lead: "Salesforce Marketing Cloud — beyond the standard activity catalogue.",
      bullets: [
        "Custom Journey Builder activities",
        "AMPscript & SSJS campaign systems",
        "Data extension architecture & integrations",
      ],
    },
  ];
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="eyebrow">02 — What I do</span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Three disciplines, one engineering mindset.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            I work where AI, product engineering, and marketing systems overlap — building tools that
            move real metrics, not slide decks.
          </p>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y hairline border-y hairline">
            {groups.map((g, idx) => (
              <article key={g.title} className="grid gap-4 py-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10">
                <div className="flex items-center gap-3">
                  <span className="num-mark">0{idx + 1}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-lg border hairline bg-[var(--surface-elevated)]">
                    <g.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{g.lead}</p>
                  <ul className="mt-4 grid gap-1.5 text-sm text-foreground/85 md:grid-cols-2">
                    {g.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 rounded-full" style={{ background: "var(--brand)" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. SELECTED WORK ---------------- */
function SelectedWork() {
  return (
    <section className="border-y hairline bg-[var(--surface-subtle)]">
      <div className="container-page py-24 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">03 — Selected work</span>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              A few systems I've built, told as stories — not screenshots.
            </h2>
          </div>
          <Link to="/work" className="hidden link-underline text-sm md:inline-flex">
            All case studies →
          </Link>
        </div>

        <div className="mt-14 space-y-16">
          <CaseStudy
            tag="AI System · RAG"
            year="2025"
            title="A retrieval system that respects what an institution actually knows."
            problem="Academic teams needed answers grounded in their own documents — syllabi, policies, archived research — without the hallucinations that off-the-shelf chatbots ship with."
            approach="Hybrid retriever (BM25 + dense embeddings) → cross-encoder rerank → grounded generation with citation enforcement. Deterministic fallback when confidence drops below threshold."
            stack={["LangChain", "LangGraph", "pgvector", "OpenAI", "FastAPI"]}
            metrics={[
              { k: "Citation accuracy", v: "94%" },
              { k: "Answer latency p95", v: "1.8s" },
              { k: "Sources indexed", v: "12k+" },
            ]}
          />
          <CaseStudy
            tag="Product · AI-powered"
            year="2024"
            title="ProjTrack Desk — turning student project chaos into a single source of truth."
            problem="College project tracking was scattered across spreadsheets, email threads, and WhatsApp groups. Faculty couldn't see status; students couldn't see expectations."
            approach="Centralized workspace with AI-assisted progress summaries, milestone detection, and structured handoffs between students, mentors, and reviewers."
            stack={["React", "Django", "PostgreSQL", "OpenAI"]}
            metrics={[
              { k: "Active project teams", v: "40+" },
              { k: "Time saved / week", v: "~6 hrs" },
              { k: "Adoption", v: "Department-wide" },
            ]}
          />
          <CaseStudy
            tag="SaaS Product"
            year="2024"
            title="BrainBench — structured aptitude learning that actually adapts."
            problem="Aptitude prep tools optimize for question count, not mastery. Students grind without ever seeing where they're plateauing."
            approach="Topic graph + per-skill scoring, adaptive test sets, and a clean React + Django stack designed to scale beyond a single college."
            stack={["React", "Django", "REST", "PostgreSQL"]}
            metrics={[
              { k: "Question bank", v: "1,500+" },
              { k: "Test types", v: "12" },
              { k: "In production", v: "Yes" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function CaseStudy(props: {
  tag: string;
  year: string;
  title: string;
  problem: string;
  approach: string;
  stack: string[];
  metrics: { k: string; v: string }[];
}) {
  return (
    <article className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-4">
        <div className="flex items-center gap-3">
          <span className="pill">{props.tag}</span>
          <span className="num-mark">{props.year}</span>
        </div>
        <h3 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">
          {props.title}
        </h3>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {props.stack.map((s) => (
            <span key={s} className="rounded-md border hairline bg-[var(--surface-elevated)] px-2 py-1 font-mono text-[11px] text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="md:col-span-8">
        <div className="panel p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <span className="num-mark">Problem</span>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{props.problem}</p>
            </div>
            <div>
              <span className="num-mark">Approach</span>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{props.approach}</p>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-3 divide-x hairline border-t hairline pt-5">
            {props.metrics.map((m) => (
              <div key={m.k} className="px-3 first:pl-0">
                <div className="text-lg font-semibold tracking-tight md:text-xl">{m.v}</div>
                <div className="num-mark mt-0.5">{m.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- 5. HOW I THINK ---------------- */
function HowIThink() {
  const principles = [
    {
      n: "I",
      t: "Build systems, not features.",
      d: "Features are deliverables. Systems compound. Every component I ship should be reusable across two more contexts before it's done.",
    },
    {
      n: "II",
      t: "Clarity beats cleverness.",
      d: "Code that another engineer can pick up at 2 a.m. always wins over a clever one-liner that requires me to explain it.",
    },
    {
      n: "III",
      t: "Practical over hyped.",
      d: "I use AI where it materially changes the outcome — not because the README mentions agents.",
    },
  ];
  return (
    <section className="container-page py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow mx-auto">04 — How I think</span>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Three principles I refuse to compromise on.
        </h2>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border hairline bg-[var(--hairline)] md:grid-cols-3">
        {principles.map((p) => (
          <div key={p.n} className="bg-[var(--surface-elevated)] p-8 transition-colors hover:bg-[var(--surface-subtle)]">
            <div className="font-mono text-xs tracking-widest" style={{ color: "var(--brand)" }}>
              {p.n}
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 6. SERVICES PREVIEW ---------------- */
function ServicesPreview() {
  const services = [
    { icon: Sparkles, t: "AI System Development", d: "End-to-end design of LLM-powered features that ship to production users." },
    { icon: Layers, t: "RAG / LLM Integration", d: "Drop reliable retrieval and reasoning into existing products without rewriting them." },
    { icon: Code2, t: "Full Stack SaaS", d: "React + Django product engineering — from idea to deployed v1." },
    { icon: Workflow, t: "SFMC Implementation", d: "Custom Journey Builder activities, AMPscript systems, and integrations." },
  ];
  return (
    <section className="border-y hairline bg-[var(--surface-subtle)]">
      <div className="container-page py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">05 — Services</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Engagements built around outcomes — not hours.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              I work with founders and teams who need an engineer who can hold the full picture —
              from system design to the last line of production code.
            </p>
            <Link to="/services" className="link-underline mt-6 inline-flex text-sm">
              See how I work →
            </Link>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-2xl border hairline bg-[var(--hairline)] sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.t} className="bg-[var(--surface-elevated)] p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border hairline">
                    <s.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7. CURRENT FOCUS ---------------- */
function CurrentFocus() {
  const items = [
    { k: "Now", v: "Shipping BrainBench v1.2 with adaptive test sets." },
    { k: "Building", v: "AI-powered project workflows for ProjTrack Desk." },
    { k: "Exploring", v: "LLM orchestration patterns with LangGraph + state machines." },
  ];
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="eyebrow">06 — Current focus</span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            What I'm working on this quarter.
          </h2>
        </div>
        <div className="md:col-span-8">
          <div className="space-y-5">
            {items.map((i) => (
              <div key={i.k} className="flex items-start gap-5 border-b hairline pb-5">
                <Zap className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} />
                <div>
                  <div className="num-mark">{i.k}</div>
                  <p className="mt-1 text-base text-foreground/90">{i.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 8. CONTACT CTA ---------------- */
function ContactCTA() {
  return (
    <section className="container-page pb-24 md:pb-32">
      <div
        className="relative overflow-hidden rounded-3xl border hairline px-6 py-16 text-center md:px-16 md:py-24"
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elevated)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="relative">
          <span className="eyebrow mx-auto">07 — Let's talk</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Let's build something impactful.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground">
            Whether you're hiring, exploring an AI product idea, or need a builder who can take it
            from zero to deployed — I'd like to hear about it.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/work" className="btn-ghost">
              See the work first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
