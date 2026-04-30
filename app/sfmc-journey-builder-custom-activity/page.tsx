import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  ArticleMeta,
  Breadcrumb,
  Callout,
  CodeBlock,
  Cm,
  FaqList,
  FlowDiagram,
  Fn,
  JsonLd,
  RelatedCards,
  Screenshot,
  St,
  Tk,
  Toc,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "../_seo/seo-blocks";

const URL = "https://lalitchaudhari.dev/sfmc-journey-builder-custom-activity";
const TITLE = "SFMC Journey Builder Custom Activity — Architecture & Flow Explained";
const DESCRIPTION =
  "How a Salesforce Marketing Cloud Journey Builder custom activity actually works — lifecycle endpoints, runtime data flow, journey triggers, API communication, and webhook execution explained.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "SFMC Journey Builder custom activity",
    "Journey Builder custom activity architecture",
    "custom activity lifecycle",
    "SFMC custom activity flow",
    "Marketing Cloud custom activity",
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "lifecycle", label: "Lifecycle endpoints" },
  { id: "data-flow", label: "Data flow" },
  { id: "journey-triggers", label: "Journey triggers" },
  { id: "api-communication", label: "API communication" },
  { id: "webhook-execution", label: "Webhook execution" },
  { id: "failure-modes", label: "Failure modes" },
  { id: "related", label: "Related guides" },
  { id: "faq", label: "FAQ" },
];

const FAQS = [
  {
    q: "What is a Journey Builder custom activity in Salesforce Marketing Cloud?",
    a: "An externally-hosted REST service that registers itself with Marketing Cloud through an Installed Package and surfaces as a drag-and-drop step in the Journey Builder canvas. It exposes four lifecycle endpoints (save, validate, publish, execute) that JB calls during configuration and runtime.",
  },
  {
    q: "Where does Journey Builder send the contact data at runtime?",
    a: "JB POSTs to your activity's /execute URL with a JWT-signed body containing the inArguments declared in your config.json — typically the contact key plus any merge fields you bind from a Data Extension.",
  },
  {
    q: "How do retries work for an SFMC custom activity?",
    a: "Journey Builder retries /execute when it returns a non-2xx response or times out. The retry policy follows the package configuration; design your handler to be idempotent on the activityInstanceId.",
  },
  {
    q: "Can a custom activity write data back to a Data Extension?",
    a: "Yes — through outArguments returned from /execute, or by calling SFMC's REST API with an OAuth client credentials token. Writing to a DE is the typical pattern for capturing scoring or status updates.",
  },
];

export default function SfmcJourneyBuilderCustomActivityPage() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            url: URL,
            title: TITLE,
            description: DESCRIPTION,
            datePublished: "2025-09-12",
            dateModified: "2026-05-01",
            keywords: ["SFMC", "Journey Builder", "Custom Activity", "Architecture", "Lifecycle"],
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://lalitchaudhari.dev/" },
            { name: "Tutorial", url: "https://lalitchaudhari.dev/sfmc-custom-activity-tutorial" },
            { name: "Architecture & Flow", url: URL },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <header
        className="relative overflow-hidden border-b hairline"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="container-page relative py-20 md:py-28">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Tutorial", href: "/sfmc-custom-activity-tutorial" },
              { name: "Architecture & Flow" },
            ]}
          />
          <span className="eyebrow mt-6">Concepts · Architecture</span>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            How an SFMC Journey Builder <span style={{ color: "var(--brand)" }}>Custom Activity</span> actually works.
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
            Past the marketing copy, an SFMC custom activity is a small REST service with very specific
            contracts. This article unpacks the lifecycle, the data flow, and the failure modes — so the
            implementation choices you make later are informed, not guessed.
          </p>
          <ArticleMeta readTime="11 min" updated="May 2026" category="SFMC · Concepts" />
        </div>
      </header>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <Toc items={TOC} />
          </aside>

          <article className="md:col-span-9 space-y-16">
            <section id="overview" className="scroll-mt-24">
              <span className="eyebrow">01 — Overview</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                The system in one paragraph.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A custom activity lives in two places at once: a small Express-style REST service you
                host, and a registration record inside Marketing Cloud that points at it. Marketing
                Cloud calls your service three times during configuration (save, validate, publish) and
                once per contact at runtime (execute). Everything flows from there.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                For the step-by-step build instructions, see the&nbsp;
                <Link href="/sfmc-custom-activity-tutorial" className="link-underline">
                  full tutorial
                </Link>. This page is the <em>why</em>, not the <em>how</em>.
              </p>
            </section>

            <section id="lifecycle" className="scroll-mt-24">
              <span className="eyebrow">02 — Lifecycle</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Lifecycle endpoints, in detail.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The four endpoints map cleanly to the lifecycle of a Journey Builder configuration:
                edit → validate → publish → run. Each has a single responsibility.
              </p>
              <div className="mt-8 grid gap-3">
                {LIFECYCLE.map((l) => (
                  <div
                    key={l.path}
                    className="grid gap-3 rounded-xl border hairline bg-[var(--surface-elevated)] p-5 md:grid-cols-[180px_1fr]"
                  >
                    <div>
                      <div className="font-mono text-sm font-semibold" style={{ color: "var(--brand)" }}>
                        {l.path}
                      </div>
                      <div className="num-mark mt-1">{l.when}</div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/85">{l.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="data-flow" className="scroll-mt-24">
              <span className="eyebrow">03 — Data flow</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Where the contact data comes from.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The shape of the runtime payload is determined by the <code className="font-mono">inArguments</code> you
                declare in <code className="font-mono">config.json</code>. SFMC interpolates merge
                fields against the Data Extension feeding the journey and posts the resolved object to
                your <code className="font-mono">/execute</code> endpoint as a JWT.
              </p>
              <div className="mt-6">
                <CodeBlock filename="execute payload (decoded)" language="json">
                  {"{"}{"\n"}
                  {"  "}<St>"inArguments"</St>: [{"{"}{"\n"}
                  {"    "}<St>"contactKey"</St>:    <St>"abc-123"</St>,{"\n"}
                  {"    "}<St>"email"</St>:         <St>"jane@example.com"</St>,{"\n"}
                  {"    "}<St>"firstName"</St>:     <St>"Jane"</St>,{"\n"}
                  {"    "}<St>"webhookUrl"</St>:    <St>"https://hooks.slack.com/services/..."</St>,{"\n"}
                  {"    "}<St>"channel"</St>:       <St>"#sales-alerts"</St>,{"\n"}
                  {"    "}<St>"messageTemplate"</St>: <St>{`"New lead: {{firstName}} ({{email}})"`}</St>{"\n"}
                  {"  "}{"}"}],{"\n"}
                  {"  "}<St>"activityInstanceId"</St>: <St>"a8d1..."</St>,{"\n"}
                  {"  "}<St>"keyValue"</St>:           <St>"abc-123"</St>{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
              <Callout label="Note · Why JWT?" tone="info">
                The JWT envelope is what makes the runtime call trustworthy. Without it, anyone who
                guessed your <code className="font-mono">/execute</code> URL could trigger your
                side-effect. Verifying the signature against the Installed Package's secret confirms
                the call originated from your tenant.
              </Callout>
            </section>

            <section id="journey-triggers" className="scroll-mt-24">
              <span className="eyebrow">04 — Triggers</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What triggers the activity at runtime.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A custom activity is a <em>step</em>, not an entry source. It only runs when an existing
                contact, already inside a journey, advances to the canvas position your activity occupies.
                The journey itself can be entered through any of Marketing Cloud's standard sources.
              </p>
              <div className="mt-6">
                <FlowDiagram
                  steps={[
                    { title: "Entry source fires", sub: "DE / API event / contact event" },
                    { title: "Contact enters journey", sub: "Journey Builder runtime" },
                    { title: "Reaches custom activity", sub: "Step on canvas" },
                    { title: "/execute called", sub: "JWT POST per contact" },
                  ]}
                />
              </div>
              <div className="mt-8">
                <Screenshot
                  src="/images/jounery-builder-canvas.webp"
                  alt="Journey Builder canvas — Scott's Welcome Journey with a Data Extension entry source feeding into Welcome Email, Engagement Split, multiple Wait steps, Decision Split, SMS, and Push Notification — illustrating the canvas position a custom activity step occupies."
                  caption="A real Welcome Journey on the Journey Builder canvas. The custom activity runs only when a contact already inside this flow advances to the step you've placed on the canvas."
                  badge="Journey Builder"
                  width={1600}
                  height={737}
                />
              </div>
            </section>

            <section id="api-communication" className="scroll-mt-24">
              <span className="eyebrow">05 — API communication</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Two-way API communication.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The runtime call is the most important channel: SFMC → your service. But your service
                can also call back into SFMC's REST API for richer integrations — looking up Data
                Extension rows, updating contact attributes, or kicking off downstream sends.
              </p>
              <div className="mt-5">
                <CodeBlock filename="upsert-row.js" language="node">
                  <Cm>{"// Upsert a row into a Data Extension after the side-effect succeeds"}</Cm>{"\n"}
                  <Tk>const</Tk> token = <Tk>await</Tk> <Fn>getOAuthToken</Fn>(); <Cm>{"// client_credentials grant"}</Cm>{"\n\n"}
                  <Tk>await</Tk> <Fn>fetch</Fn>(<St>{`\`\${SFMC_REST_HOST}/data/v1/async/dataextensions/key:Slack_Notifications/rows\``}</St>, {"{"}{"\n"}
                  {"  "}method: <St>"POST"</St>,{"\n"}
                  {"  "}headers: {"{"}{"\n"}
                  {"    "}<St>"Authorization"</St>: <St>{`\`Bearer \${token}\``}</St>,{"\n"}
                  {"    "}<St>"Content-Type"</St>:  <St>"application/json"</St>,{"\n"}
                  {"  "}{"}"},{"\n"}
                  {"  "}body: JSON.<Fn>stringify</Fn>({"{ items: ["}{"{"} contactKey, channel, sentAt: <Tk>new</Tk> <Fn>Date</Fn>().<Fn>toISOString</Fn>() {"} ] })"},{"\n"}
                  {"}"});
                </CodeBlock>
              </div>
            </section>

            <section id="webhook-execution" className="scroll-mt-24">
              <span className="eyebrow">06 — Webhook execution</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Webhook execution at runtime.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The most common pattern: <code className="font-mono">/execute</code> receives the
                payload, transforms it, and fans it out to a third-party webhook (Slack, Teams,
                PagerDuty, an internal API). The transform is where most of the actual product value
                lives — channel routing, message templating, suppression rules.
              </p>
              <Callout label="Latency budget" tone="info">
                Aim for under 1.5 seconds total round-trip on <code className="font-mono">/execute</code>.
                Journey Builder considers slow responses a failure signal and may skip or retry.
              </Callout>
            </section>

            <section id="failure-modes" className="scroll-mt-24">
              <span className="eyebrow">07 — Failure modes</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What goes wrong, and how to defend against it.
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-foreground/85">
                {FAILURES.map((f) => (
                  <li
                    key={f.t}
                    className="grid gap-3 rounded-xl border hairline bg-[var(--surface-elevated)] p-5 md:grid-cols-[200px_1fr]"
                  >
                    <span className="num-mark">{f.t}</span>
                    <span className="leading-relaxed">{f.d}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="related" className="scroll-mt-24">
              <span className="eyebrow">Related</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Continue with implementation.
              </h2>
              <div className="mt-8">
                <RelatedCards
                  items={[
                    {
                      href: "/sfmc-custom-activity-tutorial",
                      eyebrow: "Pillar",
                      title: "Full Custom Activity Tutorial",
                      desc: "End-to-end build with code, JWT, Data Extensions, hosting, and Slack.",
                    },
                    {
                      href: "/creating-sfmc-journey-builder-custom-activity",
                      eyebrow: "Walkthrough",
                      title: "Creating a Custom Activity",
                      desc: "Step-by-step: Installed Package, lifecycle endpoints, deployment.",
                    },
                    {
                      href: "/sfmc-journey-builder-custom-activity-for-slack",
                      eyebrow: "Integration",
                      title: "Custom Activity for Slack",
                      desc: "Slack webhook integration, templating, and error handling.",
                    },
                  ]}
                />
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Frequently asked questions.
              </h2>
              <div className="mt-8">
                <FaqList faqs={FAQS} />
              </div>
            </section>
          </article>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="panel flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Architecture review for your team?</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              I review existing SFMC custom activities for production-readiness — JWT, retries,
              idempotency, latency. Send me what you've got.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Schedule a review <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

const LIFECYCLE = [
  {
    path: "POST /save",
    when: "On config save",
    d: "Persist the marketer's chosen configuration. Often a no-op since SFMC stores inArguments — but a good place to denormalize for analytics.",
  },
  {
    path: "POST /validate",
    when: "On publish attempt",
    d: "Last guardrail before the journey goes live. Reject configurations missing required fields, malformed templates, or unreachable webhook URLs.",
  },
  {
    path: "POST /publish",
    when: "On journey activation",
    d: "Fired once. Use it to provision per-journey resources — register a webhook subscription, create a downstream record, warm a cache.",
  },
  {
    path: "POST /execute",
    when: "Per contact, runtime",
    d: "JWT-signed payload with inArguments + contact context. Do the actual work here. Idempotency is your responsibility, not Journey Builder's.",
  },
];

const FAILURES = [
  {
    t: "Duplicate executions",
    d: "Retries can replay the same contact. Key side effects on activityInstanceId + contactKey to make them safe to re-run.",
  },
  {
    t: "Slow downstream API",
    d: "If your downstream call takes 5+ seconds, JB sees the activity as stuck. Push slow work to a queue and return 200 immediately.",
  },
  {
    t: "Expired or rotated JWT secret",
    d: "When you rotate the Installed Package secret, every in-flight contact starts failing JWT verification. Roll secrets during a maintenance window.",
  },
  {
    t: "Misshaped inArguments",
    d: "Marketers can edit configurations and break templates. Validate early in /validate and return clear errors so they fix it before publishing.",
  },
];
