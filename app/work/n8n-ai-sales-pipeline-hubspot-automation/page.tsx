import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Database,
  Filter,
  Gauge,
  LineChart,
  Mail,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import {
  ArticleMeta,
  Breadcrumb,
  Callout,
  FaqList,
  FlowDiagram,
  JsonLd,
  RelatedCards,
  Screenshot,
  Toc,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "../../_seo/seo-blocks";

const URL = "https://lalitchaudhari.dev/work/n8n-ai-sales-pipeline-hubspot-automation";
const TITLE =
  "n8n + HubSpot AI Sales Pipeline Automation — Case Study";
const DESCRIPTION =
  "Production-grade n8n workflow for AI-powered sales pipeline automation — webhook lead capture, AI enrichment, HubSpot CRM sync, and personalized outreach. End-to-end marketing and sales automation built with n8n.";

const KEYWORDS = [
  "n8n automation",
  "n8n sales automation",
  "n8n marketing automation",
  "n8n hubspot integration",
  "n8n hubspot automation",
  "ai sales pipeline automation",
  "n8n ai workflow",
  "automated lead enrichment n8n",
  "n8n webhook automation",
  "n8n personalized email outreach",
  "hubspot crm automation",
  "n8n workflow for sales teams",
  "n8n marketing workflow",
  "n8n openai integration",
  "n8n lead scoring",
  "n8n drip campaign automation",
  "n8n hubspot ai",
  "n8n agency automation",
  "no-code sales automation",
  "n8n vs zapier",
  "n8n vs make.com",
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "article",
    siteName: "Lalit Chaudhari",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "the-problem", label: "The problem" },
  { id: "what-we-built", label: "What we built" },
  { id: "stack", label: "Stack & integrations" },
  { id: "architecture", label: "Workflow architecture" },
  { id: "lead-capture", label: "Lead capture" },
  { id: "ai-enrichment", label: "AI enrichment & scoring" },
  { id: "hubspot-sync", label: "HubSpot CRM sync" },
  { id: "ai-outreach", label: "AI personalized outreach" },
  { id: "follow-ups", label: "Follow-ups & tracking" },
  { id: "outcomes", label: "Outcomes" },
  { id: "who-its-for", label: "Who it's for" },
  { id: "n8n-vs-others", label: "n8n vs Zapier / Make" },
  { id: "faq", label: "FAQ" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is n8n and why use it for sales pipeline automation?",
    a: "n8n is an open-source workflow automation platform that lets you connect APIs, databases, and AI models into a single visual workflow. For sales pipeline automation, n8n gives you Zapier-style ease with full control: you can self-host, run unlimited operations, branch logic freely, and call any HTTP endpoint — which makes it ideal for AI-driven lead workflows that wouldn't fit inside a closed automation tool.",
  },
  {
    q: "How does the n8n + HubSpot integration work in this build?",
    a: "Every qualified lead is pushed into HubSpot CRM through the native HubSpot node in n8n. Contact records, deal stages, lifecycle properties, and activity logs are created and updated automatically — no manual data entry. The workflow uses HubSpot's REST API under the hood, so all CRM operations (create contact, associate company, update deal stage, log activity) happen inside the same n8n run.",
  },
  {
    q: "How does AI enrichment work inside an n8n workflow?",
    a: "When a new lead lands in the webhook, n8n calls enrichment APIs to pull firmographic and contact data, then passes the combined payload to an LLM (OpenAI) that scores intent, business relevance, and engagement potential. The LLM returns a structured JSON with a score and a short reasoning — those fields flow into HubSpot as custom properties so the sales team sees the AI's judgement next to the contact record.",
  },
  {
    q: "Can n8n generate personalized outreach emails using AI?",
    a: "Yes — that's a core part of this workflow. After enrichment, n8n sends the lead profile (company, role, public signals) to an LLM with a prompt that produces a personalized first-touch email. The output is templated, validated, and triggered through the email node (HubSpot sequences or a transactional provider). Drip campaigns are stage-aware: messages adapt based on lead behavior tracked back in HubSpot.",
  },
  {
    q: "Is this n8n automation production-ready?",
    a: "Yes. Every step has retry handling, structured logging, and input validation. The workflow is modular — sub-workflows are versioned, deployments use environment variables, and failures surface to a monitoring channel. It's designed for real production load, not demos.",
  },
  {
    q: "How is n8n different from Zapier or Make.com for sales automation?",
    a: "Zapier is great for simple linear triggers but pricing scales fast with operations and it's hard to branch logic. Make.com is more flexible but still closed and metered. n8n is open-source, self-hostable, and unlimited — so high-volume sales pipelines, AI calls, and custom code nodes don't blow up your bill. For AI-heavy workflows that loop, branch, and call multiple LLMs per lead, n8n is the more economical and flexible choice.",
  },
  {
    q: "Does this n8n workflow work with CRMs other than HubSpot?",
    a: "Yes. The same architecture works for Salesforce, Pipedrive, Zoho, Attio, or a custom REST CRM — only the CRM-sync sub-workflow changes. The lead capture, AI enrichment, scoring, and outreach steps stay the same. n8n has native nodes for most major CRMs and supports custom HTTP for anything else.",
  },
  {
    q: "How long does it take to build an n8n AI sales pipeline like this?",
    a: "A working v1 — webhook ingestion, enrichment, HubSpot sync, and AI outreach — takes about two to three weeks for a senior automation engineer. Hardening for production (retries, logging, validation, monitoring) is another one to two weeks. The exact timeline depends on the enrichment APIs, CRM data model, and how much personalization the outreach layer needs.",
  },
  {
    q: "Can the workflow handle high lead volume?",
    a: "Yes. n8n workflows can be configured to queue executions, run in parallel, and scale horizontally through queue mode. For high-traffic lead capture, the webhook trigger writes to a queue and downstream nodes process asynchronously — so a sudden spike of inbound leads doesn't bottleneck the system.",
  },
  {
    q: "What kind of teams should use an n8n AI sales pipeline?",
    a: "B2B SaaS companies, agencies, lead-gen businesses, and any team where inbound leads need fast triage and personalized first-touch. If your sales team spends time copy-pasting between forms, enrichment tools, the CRM, and an email tool — this workflow replaces all of that with a single automated pipeline.",
  },
  {
    q: "Can I self-host n8n for this workflow?",
    a: "Yes — and that's how this build is deployed. Self-hosting n8n (Docker on a small VPS or a managed n8n Cloud instance) keeps lead data inside your infrastructure, removes per-execution pricing, and gives full control over credentials and logs. The workflow described here runs comfortably on a single n8n node for typical lead volumes.",
  },
  {
    q: "Does this workflow log activity back to HubSpot?",
    a: "Yes. Every meaningful event — lead captured, enrichment complete, email sent, reply detected — is written back to HubSpot as an activity on the contact's timeline. The sales team sees the full automated history alongside any human notes, so when a high-intent lead is handed off, context is already there.",
  },
];

export default function N8nAiSalesPipelinePage() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            url: URL,
            title: TITLE,
            description: DESCRIPTION,
            datePublished: "2026-04-10",
            dateModified: "2026-05-28",
            keywords: KEYWORDS,
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://lalitchaudhari.dev/" },
            { name: "Work", url: "https://lalitchaudhari.dev/work" },
            { name: "n8n AI Sales Pipeline + HubSpot Automation", url: URL },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      {/* ============================ HERO ============================ */}
      <header
        className="relative overflow-hidden border-b hairline"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="container-page relative py-20 md:py-28">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Work", href: "/work" },
              { name: "n8n AI Sales Pipeline + HubSpot Automation" },
            ]}
          />
          <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="eyebrow">Case Study · Automation</span>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                <span style={{ color: "var(--brand)" }}>n8n</span> AI Sales Pipeline Automation with{" "}
                <span style={{ color: "var(--brand)" }}>HubSpot</span> Integration
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
                A production-grade workflow built in n8n that turns inbound leads into enriched,
                qualified, personally-emailed prospects — and keeps the whole funnel visible inside
                HubSpot. Lead capture, AI enrichment, CRM sync, and personalized outreach in a single
                automation.
              </p>
              <ArticleMeta
                readTime="12 min"
                updated="May 2026"
                category="n8n · HubSpot · OpenAI"
              />
            </div>
            <div className="md:col-span-4">
              <div className="panel p-6">
                <div className="num-mark">Built with</div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <LogoChip Logo={N8nLogo} label="n8n" />
                  <LogoChip Logo={HubSpotLogo} label="HubSpot" />
                  <LogoChip Logo={OpenAILogo} label="OpenAI" />
                  <LogoChip Logo={IntegrationLogo} label="REST APIs" />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/contact" className="btn-primary">
                    Get a similar build <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/work" className="btn-ghost">
                    All case studies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================ TRUST STRIP ============================ */}
      <section className="border-b hairline bg-[var(--surface-subtle)]">
        <div className="container-page py-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <span className="num-mark shrink-0">Integrated stack</span>
            <div className="grid w-full grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 md:w-auto md:gap-x-12">
              <LogoLockup Logo={N8nLogo} label="n8n workflow engine" />
              <LogoLockup Logo={HubSpotLogo} label="HubSpot CRM" />
              <LogoLockup Logo={EmailAutomationLogo} label="Email automation" />
              <LogoLockup Logo={IntegrationLogo} label="API integrations" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ BODY ============================ */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <Toc items={TOC} />
          </aside>

          <article className="md:col-span-9 space-y-20">
            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-24">
              <span className="eyebrow">01 — Overview</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                One n8n workflow. End-to-end sales pipeline automation.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                This build turns the marketing-to-sales handoff into a single automated pipeline
                running on <strong>n8n</strong>. Inbound leads hit a webhook, get enriched and scored
                by AI, sync into <strong>HubSpot CRM</strong>, and receive a personalized first-touch
                email — all without a human in the loop until the lead is qualified enough to talk
                to.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                It's the kind of <strong>n8n marketing automation</strong> that replaces three or
                four tools (a form handler, an enrichment service, a CRM importer, and a sequencer)
                with one workflow you can read top-to-bottom on a single canvas.
              </p>

              <div className="mt-8">
                <Screenshot
                  src="/images/n8n-ai-sales-pipeline-workflow.webp"
                  alt="Full n8n workflow canvas for an AI-powered sales pipeline automation — showing the webhook trigger node receiving lead form submissions, branching into AI enrichment with OpenAI, lead scoring, HubSpot CRM contact creation, deal stage assignment, AI personalized email generation, drip campaign trigger, and follow-up notification nodes connected with success and error paths."
                  caption="The complete n8n workflow on a single canvas — webhook ingestion, AI enrichment, HubSpot CRM sync, AI-generated outreach, and follow-up tracking."
                  badge="n8n canvas"
                  width={1920}
                  height={1080}
                  priority
                />
              </div>
            </section>

            {/* PROBLEM */}
            <section id="the-problem" className="scroll-mt-24">
              <span className="eyebrow">02 — The problem</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Sales teams were losing high-intent leads to slow, manual triage.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Before the automation, the funnel looked like every other mid-market B2B funnel:
                a contact form on the marketing site, a notification email to a shared inbox, a
                rep eventually opening the lead, switching tabs to enrich the company, copy-pasting
                into HubSpot, then drafting a generic outreach email a day later.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {PROBLEM_CARDS.map((p) => (
                  <div key={p.t} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border hairline">
                      <p.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight">{p.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* WHAT WE BUILT */}
            <section id="what-we-built" className="scroll-mt-24">
              <span className="eyebrow">03 — What we built</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                A single n8n workflow that replaces the entire manual handoff.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The new pipeline runs entirely inside n8n. Every step that used to live in a
                different tool — form receiver, enrichment, scoring, CRM, email — is now a node
                on the same canvas. The whole funnel is visible, debuggable, and version-controlled
                in one place.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {FEATURES.map((f) => (
                  <div key={f.t} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg border hairline">
                        <f.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                      </span>
                      <h3 className="text-base font-semibold tracking-tight">{f.t}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* STACK */}
            <section id="stack" className="scroll-mt-24">
              <span className="eyebrow">04 — Stack & integrations</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Every tool, with the role it plays.
              </h2>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-[var(--hairline)] sm:grid-cols-2">
                {STACK_ROWS.map((s) => (
                  <div key={s.name} className="bg-[var(--surface-elevated)] p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border hairline bg-[var(--surface-subtle)]">
                        <s.Logo className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight">{s.name}</h3>
                        <span className="num-mark">{s.role}</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-24">
              <span className="eyebrow">05 — Workflow architecture</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                How the n8n workflow is shaped.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The workflow is modular. Each major responsibility — capture, enrich, qualify, sync,
                outreach, follow-up — is its own sub-workflow, so they can be tested, deployed, and
                scaled independently. The main canvas just orchestrates them.
              </p>

              <div className="mt-8">
                <FlowDiagram
                  steps={[
                    { title: "Webhook trigger", sub: "Lead submits form" },
                    { title: "AI enrichment", sub: "Company + contact" },
                    { title: "Lead scoring", sub: "LLM intent score" },
                    { title: "HubSpot sync", sub: "Contact + deal stage" },
                    { title: "AI outreach", sub: "Personalized email" },
                    { title: "Follow-ups", sub: "Drip + sales alert" },
                  ]}
                />
              </div>

              <ul className="mt-10 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  ["n8n webhook node", "Validates inbound lead payload"],
                  ["Enrichment APIs", "Pulls firmographic + contact data"],
                  ["OpenAI node", "Scores intent and writes outreach"],
                  ["HubSpot CRM node", "Creates contact, deal, activity"],
                  ["Email send", "Transactional or HubSpot sequence"],
                  ["Slack / Teams alert", "Routes high-priority leads"],
                ].map(([k, v]) => (
                  <li
                    key={k as string}
                    className="flex items-start gap-3 border-t hairline pt-4"
                  >
                    <span className="num-mark min-w-[150px]">{k}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* LEAD CAPTURE */}
            <section id="lead-capture" className="scroll-mt-24">
              <span className="eyebrow">06 — Lead capture</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Webhook-first lead intake, fully validated.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The pipeline starts with an n8n webhook. Any inbound channel — the marketing site
                contact form, a landing page, a partner integration, a Calendly hook — POSTs the
                lead payload to the webhook URL. n8n validates the payload immediately and rejects
                bot submissions before anything else runs.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  "Schema validation on incoming lead data",
                  "Honeypot + IP rate limit at the edge",
                  "Source attribution captured per webhook",
                  "Raw payload archived for replay & audit",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1 w-1 rounded-full"
                      style={{ background: "var(--brand)" }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* AI ENRICHMENT */}
            <section id="ai-enrichment" className="scroll-mt-24">
              <span className="eyebrow">07 — AI enrichment & scoring</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                AI fills in everything the form didn't ask for.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Most leads submit only a name, email, and a one-line message. That's nowhere near
                enough for a personalized first-touch. The enrichment stage pulls company
                firmographics, the contact's role, recent public signals, and tech stack — then an
                LLM reads the combined profile and outputs a structured score for intent, business
                relevance, and engagement potential.
              </p>

              <div className="mt-8">
                <Screenshot
                  src="/images/n8n-lead-enrichment-ai-scoring.webp"
                  alt="n8n workflow detail view showing the AI enrichment branch — HTTP request nodes pulling company data from external enrichment APIs, an OpenAI node receiving the combined contact and company profile, and an output node writing a structured JSON with lead score, intent reasoning, business fit, and engagement potential fields ready to be passed into the HubSpot CRM sync step."
                  caption="The enrichment branch — external APIs feed an OpenAI node that returns a structured score, reasoning, and fit signals for each lead."
                  badge="enrichment branch"
                  width={1600}
                  height={900}
                />
              </div>

              <Callout label="Why structured output matters" tone="info">
                The LLM is prompted to return a JSON schema (not free text), so the score, reasoning,
                and fit signals can flow into HubSpot as typed custom properties. Sales reps see a
                number and a one-line "why" — not a paragraph they have to read.
              </Callout>
            </section>

            {/* HUBSPOT SYNC */}
            <section id="hubspot-sync" className="scroll-mt-24">
              <span className="eyebrow">08 — HubSpot CRM sync</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Every qualified lead lands in HubSpot, complete.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Once a lead is enriched and scored, the n8n HubSpot node creates or updates the
                contact, associates it with a company record, sets the lifecycle stage, creates a
                deal at the right pipeline stage, and writes the AI's reasoning to a custom
                property. Sales doesn't see a half-empty record — they see a contact that already
                has the context they'd otherwise have to dig up.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  "Contact create or update by email key",
                  "Company association via domain match",
                  "Deal created at the correct pipeline stage",
                  "Custom properties: AI score, intent, fit",
                  "Owner assigned by territory or round-robin",
                  "Activity log: a timestamped automation trail",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1 w-1 rounded-full"
                      style={{ background: "var(--brand)" }}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Screenshot
                  src="/images/n8n-hubspot-integration-dashboard.webp"
                  alt="HubSpot CRM contact dashboard showing a lead automatically created by the n8n AI sales pipeline workflow — contact properties populated with first name, last name, company, job title, AI lead score, AI fit reasoning, lifecycle stage set to marketing qualified lead, deal at qualified-to-buy stage in the sales pipeline, and an activity timeline listing the automated enrichment and outreach events with timestamps."
                  caption="Inside HubSpot — a fully populated contact created by the n8n workflow, with AI score, fit reasoning, lifecycle stage, deal, and an automation timeline ready for the rep."
                  badge="HubSpot CRM"
                  width={1600}
                  height={900}
                />
              </div>
            </section>

            {/* AI OUTREACH */}
            <section id="ai-outreach" className="scroll-mt-24">
              <span className="eyebrow">09 — AI personalized outreach</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Every first-touch email is written for the specific lead.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Generic outreach is what loses the deal. After enrichment, n8n hands the lead
                profile to an LLM with a constrained prompt that produces a personalized first
                email — referencing the lead's role, the company's recent signals, and the specific
                pain the product addresses. The email is validated (length, tone, safe-content
                guardrails) and sent through the right channel: HubSpot sequences for warmer leads,
                transactional send for cold ones.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  "Per-lead personalization, not mail-merge",
                  "Prompt template versioned in git",
                  "Tone + length guardrails on every send",
                  "A/B variants tested by lead segment",
                  "Stage-aware drip: triggers adapt to behavior",
                  "Unsubscribe + deliverability respected",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1 w-1 rounded-full"
                      style={{ background: "var(--brand)" }}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Screenshot
                  src="/images/n8n-ai-personalized-email-outreach.webp"
                  alt="Side-by-side preview of two AI-generated personalized outreach emails produced by the n8n workflow — one written for a marketing director at a SaaS company referencing their recent product launch and team growth, another for a sales operations manager at an enterprise referencing their existing HubSpot setup and known automation gaps, both showing how the LLM tailors subject line, opener, value statement, and call to action to each lead's profile."
                  caption="Two outreach emails generated by the same workflow — each tailored to the lead's role, company signals, and likely pain points."
                  badge="AI outreach preview"
                  width={1600}
                  height={900}
                />
              </div>
            </section>

            {/* FOLLOW-UPS */}
            <section id="follow-ups" className="scroll-mt-24">
              <span className="eyebrow">10 — Follow-ups & tracking</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                The workflow keeps working after the first email.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Follow-ups, engagement tracking, and high-priority alerts are part of the same
                workflow. If the lead opens but doesn't reply, n8n waits and queues the next
                stage-appropriate message. If a high-score lead replies, the sales team gets a
                Slack ping with the contact link and the AI's reasoning — so the rep walks into the
                conversation already briefed.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {FOLLOWUP_CARDS.map((c) => (
                  <div key={c.t} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border hairline">
                      <c.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight">{c.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* OUTCOMES */}
            <section id="outcomes" className="scroll-mt-24">
              <span className="eyebrow">11 — Outcomes</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What changed once the n8n pipeline went live.
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-[var(--hairline)] md:grid-cols-4">
                {OUTCOMES.map((o) => (
                  <div key={o.k} className="bg-[var(--surface-elevated)] p-6">
                    <div className="text-2xl font-semibold tracking-tight md:text-3xl">{o.v}</div>
                    <div className="num-mark mt-1">{o.k}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                More importantly, every lead now lands in HubSpot with the same level of completeness.
                The sales team stopped doing data-entry work and started doing sales work.
              </p>
            </section>

            {/* WHO IT'S FOR */}
            <section id="who-its-for" className="scroll-mt-24">
              <span className="eyebrow">12 — Who it's for</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Teams this n8n automation fits.
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {AUDIENCE.map((a) => (
                  <div key={a.t} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-6">
                    <h3 className="text-base font-semibold tracking-tight">{a.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* N8N VS OTHERS */}
            <section id="n8n-vs-others" className="scroll-mt-24">
              <span className="eyebrow">13 — n8n vs Zapier / Make</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Why n8n is the right choice for AI sales pipelines.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Zapier and Make.com both solve simple, linear automation well. But once your
                workflow has branching logic, multiple LLM calls per lead, custom code, and a need
                for unlimited operations, the economics flip hard against them.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border hairline">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--surface-subtle)] text-left">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Criteria</th>
                      <th className="px-5 py-3 font-semibold" style={{ color: "var(--brand)" }}>
                        n8n
                      </th>
                      <th className="px-5 py-3 font-semibold">Zapier</th>
                      <th className="px-5 py-3 font-semibold">Make.com</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y hairline">
                    {COMPARISON.map((row) => (
                      <tr key={row.k} className="bg-[var(--surface-elevated)]">
                        <td className="px-5 py-3 font-medium">{row.k}</td>
                        <td className="px-5 py-3 text-foreground/85">{row.n8n}</td>
                        <td className="px-5 py-3 text-muted-foreground">{row.zap}</td>
                        <td className="px-5 py-3 text-muted-foreground">{row.make}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <span className="eyebrow">14 — FAQ</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                n8n + HubSpot AI sales automation — frequently asked questions.
              </h2>
              <div className="mt-8">
                <FaqList faqs={FAQS} />
              </div>
            </section>

            {/* RELATED */}
            <section className="scroll-mt-24">
              <span className="eyebrow">More work</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Other automation case studies.
              </h2>
              <div className="mt-8">
                <RelatedCards
                  items={[
                    {
                      href: "/sfmc-custom-activity-tutorial",
                      eyebrow: "Marketing Cloud",
                      title: "SFMC Journey Builder Custom Activity — Slack",
                      desc: "End-to-end tutorial for a Salesforce Marketing Cloud custom activity using Node.js and Slack webhooks.",
                    },
                    {
                      href: "/work",
                      eyebrow: "Portfolio",
                      title: "All selected work",
                      desc: "RAG systems, AI-powered SaaS, SFMC integrations, and more automation case studies.",
                    },
                    {
                      href: "/services",
                      eyebrow: "Engagement",
                      title: "Build your own n8n automation",
                      desc: "End-to-end design and implementation of n8n sales, marketing, and ops workflows — production-ready.",
                    },
                  ]}
                />
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="container-page pb-24">
        <div
          className="relative overflow-hidden rounded-3xl border hairline px-6 py-14 md:px-14 md:py-20"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elevated)" }}
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="eyebrow">Build yours</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Want an n8n AI sales pipeline like this for your team?
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                I design and ship production n8n workflows — HubSpot, Salesforce, Pipedrive, AI
                enrichment, personalized outreach. End-to-end, including handoff docs and
                monitoring.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link href="/contact" className="btn-primary">
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ================================================================== */
/*                              DATA                                  */
/* ================================================================== */

const PROBLEM_CARDS = [
  {
    icon: Gauge,
    t: "Slow first response",
    d: "High-intent leads waited hours — sometimes a full day — before a rep even saw them. By then the moment had passed.",
  },
  {
    icon: Database,
    t: "CRM half-empty",
    d: "Contacts landed in HubSpot with just a name and email. Reps had to enrich manually before any outreach could feel relevant.",
  },
  {
    icon: Mail,
    t: "Generic outreach",
    d: "Once a rep finally wrote the first email, it was a template — and templates don't convert against modern buyers.",
  },
];

const FEATURES = [
  {
    icon: Workflow,
    t: "Webhook-first lead capture",
    d: "Inbound forms, landing pages, or partner integrations POST to a single n8n webhook. Validated, deduplicated, archived.",
  },
  {
    icon: Sparkles,
    t: "AI enrichment & scoring",
    d: "External APIs + an LLM combine to deliver a structured intent score, fit signal, and short reasoning for every lead.",
  },
  {
    icon: Database,
    t: "HubSpot CRM sync",
    d: "Contact, company, deal, lifecycle stage, and AI properties are created or updated automatically inside HubSpot.",
  },
  {
    icon: Bot,
    t: "AI personalized outreach",
    d: "LLM-generated first email per lead — referencing the company's signals, the contact's role, and the right pain point.",
  },
  {
    icon: LineChart,
    t: "Stage-aware drip campaigns",
    d: "Follow-ups adapt to engagement: open, click, reply. No more one-size-fits-all sequences.",
  },
  {
    icon: ShieldCheck,
    t: "Production-grade ops",
    d: "Retries, structured logging, validation at every node, and a monitoring channel for failures.",
  },
];

const STACK_ROWS = [
  {
    name: "n8n",
    role: "Workflow engine",
    Logo: N8nLogo,
    d: "Self-hosted n8n runs the orchestration layer — webhook trigger, branching, retries, sub-workflows, and credentials.",
  },
  {
    name: "HubSpot",
    role: "CRM of record",
    Logo: HubSpotLogo,
    d: "All qualified leads land in HubSpot with full context: AI score, fit signal, lifecycle stage, deal, and timeline activity.",
  },
  {
    name: "OpenAI",
    role: "Enrichment + outreach",
    Logo: OpenAILogo,
    d: "LLM calls handle structured scoring and personalized first-touch generation — prompts versioned in git.",
  },
  {
    name: "Email + Webhooks",
    role: "Delivery + signals",
    Logo: EmailAutomationLogo,
    d: "HubSpot sequences for warm leads, transactional sends for cold. Inbound replies and opens loop back as webhooks.",
  },
];

const FOLLOWUP_CARDS = [
  {
    icon: Filter,
    t: "Engagement-driven drips",
    d: "Email opens, clicks, and replies dynamically choose the next message in the sequence.",
  },
  {
    icon: ShieldCheck,
    t: "High-priority alerts",
    d: "Top-scored leads ping the sales team directly in Slack with a link to the HubSpot record.",
  },
  {
    icon: CheckCircle2,
    t: "Status sync to HubSpot",
    d: "Every meaningful event lands on the contact timeline — so the rep walks in with full context.",
  },
];

const OUTCOMES = [
  { k: "Lead response", v: "Near-instant" },
  { k: "Manual data entry", v: "Eliminated" },
  { k: "Outreach personalization", v: "Per-lead" },
  { k: "Pipeline visibility", v: "Real-time" },
];

const AUDIENCE = [
  {
    t: "B2B SaaS sales teams",
    d: "Inbound demo requests, free-trial signups, contact-sales forms — anywhere a fast, personalized first-touch wins the deal.",
  },
  {
    t: "Marketing agencies",
    d: "Run the same n8n workflow per client. Each gets enrichment, scoring, CRM sync, and AI outreach as a productized service.",
  },
  {
    t: "Lead-gen businesses",
    d: "Scale outbound enrichment and personalization without scaling headcount. n8n handles the volume.",
  },
  {
    t: "Founder-led GTM",
    d: "Early-stage teams without a sales ops hire — n8n + HubSpot replaces the role until you actually need a human in it.",
  },
];

const COMPARISON = [
  {
    k: "Pricing model",
    n8n: "Self-host free / fair-code · unlimited ops",
    zap: "Per-task pricing scales steeply",
    make: "Per-operation pricing",
  },
  {
    k: "Branching & loops",
    n8n: "Native, no extra cost",
    zap: "Limited, paid tier",
    make: "Supported, costs ops",
  },
  {
    k: "AI / LLM calls",
    n8n: "First-class OpenAI node, cheap loops",
    zap: "Supported, expensive at scale",
    make: "Supported, metered",
  },
  {
    k: "Self-hosting",
    n8n: "Yes — your infra, your data",
    zap: "No",
    make: "No",
  },
  {
    k: "Custom code",
    n8n: "Function node, JS / Python",
    zap: "Limited",
    make: "Limited",
  },
  {
    k: "Best for",
    n8n: "AI-heavy, branching, high-volume",
    zap: "Simple linear automations",
    make: "Mid-complexity workflows",
  },
];

/* ================================================================== */
/*                       INLINE SVG LOGOS                             */
/* ================================================================== */

function N8nLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="n8n workflow automation logo"
    >
      <circle cx="10" cy="32" r="6" fill="#EA4B71" />
      <circle cx="32" cy="16" r="5" fill="#EA4B71" />
      <circle cx="32" cy="48" r="5" fill="#EA4B71" />
      <circle cx="54" cy="32" r="6" fill="#EA4B71" />
      <path
        d="M16 32 L27 16 M16 32 L27 48 M37 16 L48 32 M37 48 L48 32"
        stroke="#EA4B71"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HubSpotLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="HubSpot CRM logo"
    >
      <circle cx="32" cy="32" r="6" fill="#FF7A56" />
      <circle cx="32" cy="10" r="4" fill="#FF7A56" />
      <circle cx="54" cy="32" r="4" fill="#FF7A56" />
      <circle cx="32" cy="54" r="4" fill="#FF7A56" />
      <circle cx="48" cy="48" r="4" fill="#FF7A56" />
      <path
        d="M32 14 L32 26 M38 32 L50 32 M32 38 L32 50 M36.5 36.5 L45 45"
        stroke="#FF7A56"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OpenAILogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="OpenAI logo"
    >
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M32 14 L46 22 L46 42 L32 50 L18 42 L18 22 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}

function EmailAutomationLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Email automation logo"
    >
      <rect
        x="10"
        y="20"
        width="38"
        height="26"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M12 22 L29 35 L46 22"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="52" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M52 11 L52 17 M49 14 L55 14" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function IntegrationLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="API integration logo"
    >
      <rect
        x="8"
        y="22"
        width="20"
        height="20"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <rect
        x="36"
        y="22"
        width="20"
        height="20"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M28 32 L36 32"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="30" cy="32" r="2.2" fill="currentColor" />
      <circle cx="34" cy="32" r="2.2" fill="currentColor" />
    </svg>
  );
}

/* ================================================================== */
/*                          LOGO UI HELPERS                           */
/* ================================================================== */

function LogoChip({
  Logo,
  label,
}: {
  Logo: (props: { className?: string }) => ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border hairline bg-[var(--surface-elevated)] px-3 py-2">
      <Logo className="h-5 w-5" />
      <span className="text-xs font-medium tracking-tight text-foreground/85">{label}</span>
    </div>
  );
}

function LogoLockup({
  Logo,
  label,
}: {
  Logo: (props: { className?: string }) => ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo className="h-6 w-6" />
      <span className="text-sm font-medium tracking-tight text-foreground/80">{label}</span>
    </div>
  );
}
