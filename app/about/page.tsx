import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Lalit Chaudhari",
  description:
    "MCA-trained engineer who moved into AI and full-stack product work. Industry exposure at CloudCove.ai. Building real systems used by real people.",
  openGraph: {
    title: "About — Lalit Chaudhari",
    description: "From MCA to AI engineering — the path, the work, and what comes next.",
  },
};

const TIMELINE = [
  {
    year: "2022",
    title: "Started MCA",
    body: "Began a Master's in Computer Applications with a clear bias toward systems thinking — databases, distributed work, and the engineering side of CS rather than the theory.",
  },
  {
    year: "2023",
    title: "First serious products",
    body: "Built BrainBench and ThreadTalk — the first projects that taught me what 'shipping' actually means: edge cases, deployment, real users, real bugs.",
  },
  {
    year: "2024",
    title: "Industry exposure — CloudCove.ai",
    body: "Worked alongside engineers shipping production AI infrastructure. Learned what 'good' looks like at scale: evals, observability, and the discipline of saying no to scope.",
  },
  {
    year: "2025",
    title: "AI engineering, full-time focus",
    body: "RAG systems for academic institutions, ProjTrack Desk in production, and a growing freelance practice for teams who need an engineer who can hold the full picture.",
  },
];

const STACK = [
  { group: "AI", items: ["LangChain", "LangGraph", "CrewAI", "OpenAI", "pgvector", "Embeddings"] },
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { group: "Backend", items: ["Django", "FastAPI", "PostgreSQL", "Celery", "REST"] },
  { group: "Marketing Cloud", items: ["SFMC", "Journey Builder", "AMPscript", "SSJS"] },
  { group: "Infra", items: ["Vercel", "Docker", "GitHub Actions", "Linux"] },
];

export default function AboutPage() {
  return (
    <>
      <header className="border-b hairline" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="eyebrow">About</span>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                I build systems that survive contact with real users.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
                I'm Lalit — an engineer working at the intersection of AI, full-stack development,
                and marketing automation. I prefer shipping over speculating, and I treat every
                project as something a future engineer will inherit.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="panel p-6">
                <div className="num-mark">Currently</div>
                <p className="mt-2 text-sm text-foreground/90">
                  AI Engineer · SFMC Developer · Full Stack Builder
                </p>
                <div className="mt-5 num-mark">Based in</div>
                <p className="mt-2 text-sm text-foreground/90">India · Working remotely worldwide</p>
                <div className="mt-5 num-mark">Open to</div>
                <p className="mt-2 text-sm text-foreground/90">
                  Full-time roles · Select freelance engagements
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Story</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              How I got here.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-base leading-relaxed text-foreground/90">
            <p>
              I started in a fairly traditional path — an MCA, the usual coursework, the usual
              expectation that "developer" meant "writes Java for someone else's enterprise app."
              That stopped fitting almost immediately.
            </p>
            <p>
              The pivot happened in two places at once: building real products for myself
              (BrainBench, ThreadTalk, ProjTrack Desk) and getting hands-on with AI infrastructure
              at <span className="font-medium">CloudCove.ai</span>. The combination was the lesson
              — products teach you what users actually need; industry teaches you what production
              actually demands.
            </p>
            <p>
              Today I split my time between AI engineering work — RAG, LLM orchestration, agent
              systems — and the full-stack product work that surrounds it. I take fewer projects
              than I could, on purpose, because I want every one to ship something I'd be willing
              to put my name on.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[var(--surface-subtle)]">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow">Timeline</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                The path, in four chapters.
              </h2>
            </div>
            <ol className="md:col-span-8">
              {TIMELINE.map((t, i) => (
                <li
                  key={t.year}
                  className={`grid gap-6 py-7 md:grid-cols-[120px_1fr] ${
                    i !== TIMELINE.length - 1 ? "border-b hairline" : ""
                  }`}
                >
                  <div className="font-mono text-sm" style={{ color: "var(--brand)" }}>
                    {t.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Stack</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              The tools I reach for.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Not exhaustive. These are the tools I've shipped production work with and would use
              again tomorrow.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            {STACK.map((s) => (
              <div key={s.group} className="grid gap-3 border-b hairline pb-6 md:grid-cols-[140px_1fr]">
                <div className="num-mark">{s.group}</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <span key={i} className="rounded-md border hairline bg-[var(--surface-elevated)] px-2.5 py-1 font-mono text-[12px] text-foreground/85">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-page py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow mx-auto">Vision</span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              "AI should disappear into the product. The user should just feel it works."
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              I'm betting the next decade of great software won't look like chatbots bolted onto
              dashboards. It'll look like products that quietly understand context, make fewer
              demands of their users, and earn trust through reliability — not novelty.
            </p>
            <Link href="/contact" className="btn-primary mt-9">
              Let's build something <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
