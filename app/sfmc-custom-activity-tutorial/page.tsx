import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Cloud, GitBranch, Server, ShieldCheck, Slack, Webhook } from "lucide-react";

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

const URL = "https://lalitchaudhari.dev/sfmc-custom-activity-tutorial";
const TITLE = "SFMC Custom Activity Tutorial — Build a Journey Builder Custom Activity with Node.js";
const DESCRIPTION =
  "End-to-end tutorial for building a Salesforce Marketing Cloud Journey Builder custom activity using Node.js, Express, lifecycle endpoints (save / validate / publish / execute), JWT authentication, and Slack webhook integration.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "SFMC custom activity",
    "SFMC Journey Builder custom activity",
    "Salesforce Marketing Cloud custom activity",
    "Journey Builder custom activity tutorial",
    "Journey Builder Slack integration",
    "SFMC Node.js custom activity",
    "lifecycle endpoints SFMC",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "what-is-custom-activity", label: "What is a custom activity" },
  { id: "use-case", label: "Use case · Slack alerts" },
  { id: "architecture", label: "Architecture overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "lifecycle-endpoints", label: "Lifecycle endpoints" },
  { id: "webhook-flow", label: "Webhook flow" },
  { id: "jwt", label: "JWT authentication" },
  { id: "data-extensions", label: "Data Extensions" },
  { id: "slack-integration", label: "Slack integration" },
  { id: "hosting", label: "Hosting & deployment" },
  { id: "deeper-reading", label: "Deeper reading" },
  { id: "faq", label: "FAQ" },
];

export default function SfmcCustomActivityTutorialPage() {
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
            keywords: [
              "SFMC",
              "Journey Builder",
              "Custom Activity",
              "Node.js",
              "Slack",
              "Webhooks",
              "JWT",
            ],
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://lalitchaudhari.dev/" },
            { name: "Work", url: "https://lalitchaudhari.dev/work" },
            { name: "SFMC Custom Activity Tutorial", url: URL },
          ]),
          faqJsonLd(FAQS_RAW),
        ]}
      />

      {/* ---------------- HERO ---------------- */}
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
              { name: "SFMC Custom Activity Tutorial" },
            ]}
          />
          <span className="eyebrow mt-6">Tutorial · Salesforce Marketing Cloud</span>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            SFMC Journey Builder Custom Activity Tutorial — <span style={{ color: "var(--brand)" }}>Step-by-step</span> with Node.js
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
            A complete, production-shaped guide to building a Salesforce Marketing Cloud (SFMC) Journey
            Builder custom activity from scratch — lifecycle endpoints, JWT validation, Data Extensions,
            and a real Slack integration. No dropped context.
          </p>
          <ArticleMeta readTime="14 min" updated="May 2026" category="SFMC · Node.js · Slack" />
        </div>
      </header>

      {/* ---------------- BODY ---------------- */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <Toc items={TOC} />
          </aside>

          <article className="md:col-span-9 space-y-16">
            {/* INTRO */}
            <section id="introduction" className="scroll-mt-24">
              <span className="eyebrow">01 — Introduction</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What you'll build, and why it works in production.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                This guide explains how to build a Salesforce Marketing Cloud Journey Builder custom
                activity from scratch using Node.js, Express, and webhooks. By the end you'll have a
                deployable activity that registers as a first-class drag-and-drop step inside Journey
                Builder and reacts to every contact that flows through it.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                The reference implementation throughout this article is a Slack notifier — when a
                contact reaches your custom activity in a journey, the system formats a templated
                message and posts it to a configured Slack channel in under two seconds.
              </p>
            </section>

            {/* WHAT IS */}
            <section id="what-is-custom-activity" className="scroll-mt-24">
              <span className="eyebrow">02 — Concept</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What is an SFMC Journey Builder custom activity?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A Journey Builder custom activity is an externally-hosted component that registers
                itself with Salesforce Marketing Cloud and exposes a set of HTTPS endpoints. Once
                installed, it appears in the Journey Builder palette and can be dragged onto any
                journey canvas — exactly like the native activities Salesforce ships.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">It enables you to:</p>
              <ul className="mt-3 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  "Send real-time contact data to external APIs",
                  "Trigger Slack, Teams, or PagerDuty alerts at journey checkpoints",
                  "Call internal services without going through middleware",
                  "Extend Journey Builder beyond the native activity catalogue",
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

            {/* USE CASE */}
            <section id="use-case" className="scroll-mt-24">
              <span className="eyebrow">03 — Use case</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                A real Slack notifier built as a custom activity.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The reference scenario: a marketing ops team needs Slack alerts when a contact crosses
                specific points in a journey — form submission, churn-risk score jumps, high-value
                trigger events. The default SFMC stack has no native Slack step, and routing through
                a paid middleware tool added latency the team didn't want.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {USE_CASES.map((u) => (
                  <div key={u.t} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border hairline">
                      <u.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight">{u.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-24">
              <span className="eyebrow">04 — Architecture</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Architecture overview.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The system has two halves: an externally hosted Node.js service that owns the activity's
                config UI and lifecycle endpoints, and the SFMC side where the activity is registered
                as an Installed Package and surfaces inside Journey Builder.
              </p>

              <div className="mt-8">
                <FlowDiagram
                  steps={[
                    { title: "Journey Builder", sub: "Drag activity onto canvas" },
                    { title: "/save · /validate · /publish", sub: "Config lifecycle" },
                    { title: "/execute (per contact)", sub: "JWT-signed POST" },
                    { title: "Slack webhook", sub: "Templated message" },
                  ]}
                />
              </div>

              <ul className="mt-8 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  ["Node.js + Express", "REST backend hosting endpoints + UI"],
                  ["JWT validation", "Confirms requests originate from SFMC"],
                  ["SFMC Installed Package", "Registers the activity in your BU"],
                  ["Journey Builder triggers", "Calls /execute per contact"],
                  ["Data Extensions", "Hold contact + activity context"],
                  ["Slack Incoming Webhooks", "Real-time delivery"],
                ].map(([k, v]) => (
                  <li key={k as string} className="flex items-start gap-3 border-t hairline pt-4">
                    <span className="num-mark min-w-[140px]">{k}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="scroll-mt-24">
              <span className="eyebrow">05 — How it works</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                The full lifecycle, in six honest steps.
              </h2>
              <ol className="mt-6 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s.t} className="grid gap-4 border-b hairline pb-4 md:grid-cols-[auto_1fr]">
                    <div className="flex items-center gap-3 md:flex-col md:items-start">
                      <span
                        className="grid h-8 w-8 place-items-center rounded-md font-mono text-[11px]"
                        style={{ background: "var(--brand-soft)", color: "var(--ink-strong)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="num-mark">{s.tag}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{s.t}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <Screenshot
                  src="/images/jounery-builder-canvas.webp"
                  alt="Salesforce Marketing Cloud Journey Builder canvas showing a Welcome Journey with Data Extension entry source, Email activities, Wait steps, Decision Split, SMS, and Push Notification — illustrating where a custom activity slots in alongside native steps."
                  caption="Journey Builder canvas — the custom activity sits in the same palette as native Email, SMS, Wait, and Decision Split steps. Marketers drag it onto the canvas like any other activity."
                  badge="Journey Builder"
                  width={1600}
                  height={737}
                />
              </div>
            </section>

            {/* LIFECYCLE ENDPOINTS */}
            <section id="lifecycle-endpoints" className="scroll-mt-24">
              <span className="eyebrow">06 — Endpoints</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Lifecycle endpoints, explained line by line.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Journey Builder talks to your activity through four endpoints. Three are configuration
                endpoints called by the canvas UI; one — <code className="font-mono text-[12.5px]">/execute</code> —
                is the runtime endpoint called for every contact that reaches the activity.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {ENDPOINTS.map((e) => (
                  <div key={e.path} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold" style={{ color: "var(--brand)" }}>
                        {e.path}
                      </span>
                      <span className="num-mark">{e.when}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-10 text-xl font-semibold tracking-tight">Reference implementation</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A minimal Express server that wires all four endpoints. Persistence and logging are
                trimmed for clarity — replace the in-memory store with your database in production.
              </p>

              <div className="mt-5">
                <CodeBlock filename="server.js" language="node">
                  <Cm>{"// Express server hosting the four lifecycle endpoints"}</Cm>{"\n"}
                  <Tk>import</Tk> express <Tk>from</Tk> <St>"express"</St>;{"\n"}
                  <Tk>import</Tk> jwt <Tk>from</Tk> <St>"jsonwebtoken"</St>;{"\n\n"}
                  <Tk>const</Tk> app = <Fn>express</Fn>();{"\n"}
                  app.<Fn>use</Fn>(express.<Fn>json</Fn>());{"\n"}
                  app.<Fn>use</Fn>(express.<Fn>text</Fn>({"{ type: "}<St>"application/jwt"</St>{" }"}));{"\n\n"}
                  <Cm>{"// /save — persist activity config from the JB canvas"}</Cm>{"\n"}
                  app.<Fn>post</Fn>(<St>"/save"</St>, (req, res) ={">"} res.<Fn>json</Fn>({"{ status: "}<St>"saved"</St>{" }"}));{"\n\n"}
                  <Cm>{"// /validate — sanity-check config before publish"}</Cm>{"\n"}
                  app.<Fn>post</Fn>(<St>"/validate"</St>, (req, res) ={">"} {"{"}{"\n"}
                  {"  "}<Tk>const</Tk> {"{ webhookUrl, channel }"} = req.body.inArguments?.[<St>0</St>] ?? {"{}"};{"\n"}
                  {"  "}<Tk>if</Tk> (!webhookUrl || !channel) <Tk>return</Tk> res.<Fn>status</Fn>(<St>400</St>).<Fn>json</Fn>({"{ status: "}<St>"invalid"</St>{" }"});{"\n"}
                  {"  "}<Tk>return</Tk> res.<Fn>json</Fn>({"{ status: "}<St>"ok"</St>{" }"});{"\n"}
                  {"}"});{"\n\n"}
                  <Cm>{"// /publish — fired once when the journey is activated"}</Cm>{"\n"}
                  app.<Fn>post</Fn>(<St>"/publish"</St>, (_, res) ={">"} res.<Fn>json</Fn>({"{ status: "}<St>"published"</St>{" }"}));{"\n\n"}
                  <Cm>{"// /execute — fires per contact, JWT-signed payload"}</Cm>{"\n"}
                  app.<Fn>post</Fn>(<St>"/execute"</St>, verifyJwt, <Tk>async</Tk> (req, res) ={">"} {"{"}{"\n"}
                  {"  "}<Tk>const</Tk> {"{ inArguments }"} = req.body;{"\n"}
                  {"  "}<Tk>const</Tk> {"{ webhookUrl, channel, message, contact }"} = inArguments[<St>0</St>];{"\n\n"}
                  {"  "}<Tk>await</Tk> <Fn>fetch</Fn>(webhookUrl, {"{"}{"\n"}
                  {"    "}method: <St>"POST"</St>,{"\n"}
                  {"    "}headers: {"{ "}<St>"Content-Type"</St>: <St>"application/json"</St>{" }"},{"\n"}
                  {"    "}body: JSON.<Fn>stringify</Fn>({"{ channel, text: "}<Fn>render</Fn>(message, contact){" }"}),{"\n"}
                  {"  "}{"}"});{"\n\n"}
                  {"  "}<Tk>return</Tk> res.<Fn>json</Fn>({"{ status: "}<St>"executed"</St>{" }"});{"\n"}
                  {"}"});{"\n\n"}
                  app.<Fn>listen</Fn>(<St>3000</St>);
                </CodeBlock>
              </div>

              <Callout label="Tip · Idempotency" tone="info">
                Journey Builder may retry <code className="font-mono">/execute</code> on a non-2xx response.
                Make the handler idempotent by keying side effects on the contact's <code className="font-mono">activityInstanceId</code>
                so retries don't double-post Slack messages.
              </Callout>
            </section>

            {/* WEBHOOK FLOW */}
            <section id="webhook-flow" className="scroll-mt-24">
              <span className="eyebrow">07 — Webhook flow</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What happens when a contact hits the activity.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                At runtime, SFMC POSTs a JWT to your <code className="font-mono">/execute</code> endpoint
                containing the contact payload and the configuration the marketer chose for this step.
                Your handler verifies the JWT, formats the Slack payload, and posts it.
              </p>
              <div className="mt-8">
                <FlowDiagram
                  steps={[
                    { title: "Contact reaches step", sub: "Journey Builder runtime" },
                    { title: "POST /execute", sub: "JWT body, contact + config" },
                    { title: "Verify + render", sub: "JWT signature, merge fields" },
                    { title: "POST to Slack", sub: "Incoming webhook URL" },
                    { title: "200 OK", sub: "Contact moves to next step" },
                  ]}
                />
              </div>
            </section>

            {/* JWT */}
            <section id="jwt" className="scroll-mt-24">
              <span className="eyebrow">08 — Security</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                JWT authentication — confirm the call is really from SFMC.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Marketing Cloud signs every <code className="font-mono">/execute</code> payload with the
                JWT signing secret from your Installed Package. Your service must verify that signature
                before doing anything with the body.
              </p>
              <div className="mt-5">
                <CodeBlock filename="middleware/verify-jwt.js" language="node">
                  <Tk>import</Tk> jwt <Tk>from</Tk> <St>"jsonwebtoken"</St>;{"\n\n"}
                  <Tk>export function</Tk> <Fn>verifyJwt</Fn>(req, res, next) {"{"}{"\n"}
                  {"  "}<Tk>const</Tk> token = <Tk>typeof</Tk> req.body === <St>"string"</St> ? req.body : <St>""</St>;{"\n"}
                  {"  "}<Tk>try</Tk> {"{"}{"\n"}
                  {"    "}req.body = jwt.<Fn>verify</Fn>(token, process.env.SFMC_JWT_SECRET, {"{"}{"\n"}
                  {"      "}algorithms: [<St>"HS256"</St>],{"\n"}
                  {"    "}{"}"});{"\n"}
                  {"    "}<Fn>next</Fn>();{"\n"}
                  {"  "}{"}"} <Tk>catch</Tk> (err) {"{"}{"\n"}
                  {"    "}res.<Fn>status</Fn>(<St>401</St>).<Fn>json</Fn>({"{ error: "}<St>"invalid_jwt"</St>{" }"});{"\n"}
                  {"  "}{"}"}{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
              <Callout label="Required · Installed Package secret" tone="warn">
                The signing secret lives under <em>Setup → Installed Packages → your package → JWT Signing Secret</em>.
                Rotate it periodically and store it in a secret manager — never check it into the repo.
              </Callout>
            </section>

            {/* DATA EXTENSIONS */}
            <section id="data-extensions" className="scroll-mt-24">
              <span className="eyebrow">09 — Data Extensions</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Data Extensions and merge fields.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Data Extensions are how Marketing Cloud carries contact context through a journey. The
                fields you bind in <code className="font-mono">inArguments</code> show up on the
                <code className="font-mono"> /execute</code> body — letting your activity personalize
                each Slack message at runtime.
              </p>
              <div className="mt-5">
                <CodeBlock filename="config.json" language="json">
                  {"{"}{"\n"}
                  {"  "}<St>"workflowApiVersion"</St>: <St>"1.1"</St>,{"\n"}
                  {"  "}<St>"metaData"</St>: {"{ "}<St>"icon"</St>: <St>"images/slack.png"</St>, <St>"category"</St>: <St>"messaging"</St>{" }"},{"\n"}
                  {"  "}<St>"type"</St>: <St>"REST"</St>,{"\n"}
                  {"  "}<St>"lang"</St>: {"{ "}<St>"en-US"</St>: {"{ "}<St>"name"</St>: <St>"Slack Notifier"</St>{" }"} {"}"},{"\n"}
                  {"  "}<St>"arguments"</St>: {"{"}{"\n"}
                  {"    "}<St>"execute"</St>: {"{"}{"\n"}
                  {"      "}<St>"inArguments"</St>: [{"{"}{"\n"}
                  {"        "}<St>"contactKey"</St>: <St>{`"{{Contact.Key}}"`}</St>,{"\n"}
                  {"        "}<St>"email"</St>:      <St>{`"{{Contact.Attribute.DE.Email}}"`}</St>,{"\n"}
                  {"        "}<St>"firstName"</St>:  <St>{`"{{Contact.Attribute.DE.FirstName}}"`}</St>{"\n"}
                  {"      "}{"}"}],{"\n"}
                  {"      "}<St>"url"</St>:    <St>"https://your-host.com/execute"</St>,{"\n"}
                  {"      "}<St>"verb"</St>:   <St>"POST"</St>,{"\n"}
                  {"      "}<St>"useJwt"</St>: <Tk>true</Tk>{"\n"}
                  {"    "}{"}"}{"\n"}
                  {"  "}{"}"},{"\n"}
                  {"  "}<St>"configurationArguments"</St>: {"{"}{"\n"}
                  {"    "}<St>"save"</St>:     {"{ "}<St>"url"</St>: <St>"https://your-host.com/save"</St>{" }"},{"\n"}
                  {"    "}<St>"validate"</St>: {"{ "}<St>"url"</St>: <St>"https://your-host.com/validate"</St>{" }"},{"\n"}
                  {"    "}<St>"publish"</St>:  {"{ "}<St>"url"</St>: <St>"https://your-host.com/publish"</St>{" }"}{"\n"}
                  {"  "}{"}"}{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
            </section>

            {/* SLACK INTEGRATION */}
            <section id="slack-integration" className="scroll-mt-24">
              <span className="eyebrow">10 — Slack</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Slack integration with Incoming Webhooks.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Slack Incoming Webhooks are the lightest possible path from your custom activity to a
                channel. You generate a URL once, store it on the activity config (or a secret store
                keyed by config), and POST a JSON payload at runtime.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  "Dynamic message templating with merge fields",
                  "Channel-based routing per journey step",
                  "Real-time delivery (sub-2s round trip)",
                  "Retries surfaced via non-200 from /execute",
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
                  src="/images/Slack-Message-Activity.webp"
                  alt="Journey Builder canvas with the Activities palette expanded under Messages, showing Email, In-App Message, Inbox, Push Notification, Slack Message, and SMS — the Slack Message custom activity registered alongside native messaging steps."
                  caption="The Slack Message custom activity registered in the palette under Messages — once installed, it's drag-and-drop alongside Email, SMS, and Push."
                  badge="Activities · Messages"
                  width={1280}
                  height={564}
                />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                For the deeper Slack-side walkthrough — webhook setup, block kit templating, error
                handling — see the dedicated guide:&nbsp;
                <Link href="/sfmc-journey-builder-custom-activity-for-slack" className="link-underline">
                  SFMC Journey Builder Custom Activity for Slack →
                </Link>
              </p>
            </section>

            {/* HOSTING */}
            <section id="hosting" className="scroll-mt-24">
              <span className="eyebrow">11 — Hosting</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Hosting & deployment.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The custom activity service must be reachable from Marketing Cloud over public HTTPS
                with a valid certificate. Anything that gives you a stable HTTPS endpoint works.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {HOSTING.map((h) => (
                  <div key={h.t} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border hairline">
                      <h.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight">{h.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Screenshot
                  src="/images/installed-packages.png"
                  alt="SFMC Setup → Installed Packages → CPM Integration. Shows Package Details, Components section, JWT Signing Secret, and API Integration block with Client Id, Client Secret, Authentication Base URI, REST and SOAP base URIs."
                  caption="Installed Packages → your package → Components & JWT Signing Secret. The signing secret is what your /execute handler verifies on every runtime call."
                  badge="Setup · Installed Packages"
                  width={3444}
                  height={1716}
                />
                <Screenshot
                  src="/images/cart-journey.png"
                  alt="Journey Builder canvas with an activity configuration drawer open on the left showing Activity Summary, Activity Name, Description, Message Definition, and Message Configuration fields — alongside an Abandoned Cart journey on the right."
                  caption="Per-step configuration drawer rendered from your hosted config.html — marketers fill it inside Journey Builder without leaving the canvas."
                  badge="Activity config"
                  width={1426}
                  height={745}
                />
              </div>
            </section>

            {/* DEEPER READING */}
            <section id="deeper-reading" className="scroll-mt-24">
              <span className="eyebrow">12 — Deeper reading</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Three companion articles.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                This pillar covers the system end-to-end. The deep dives below zoom into each layer.
              </p>
              <div className="mt-8">
                <RelatedCards
                  items={[
                    {
                      href: "/creating-sfmc-journey-builder-custom-activity",
                      eyebrow: "Step-by-step",
                      title: "Creating SFMC Journey Builder Custom Activity",
                      desc: "From Installed Package creation to a deployed Node.js backend — the complete creation walkthrough.",
                    },
                    {
                      href: "/sfmc-journey-builder-custom-activity",
                      eyebrow: "Concepts",
                      title: "SFMC Journey Builder Custom Activity Explained",
                      desc: "Architecture, flow, and lifecycle — how custom activities actually work under the hood.",
                    },
                    {
                      href: "/sfmc-journey-builder-custom-activity-for-slack",
                      eyebrow: "Integration",
                      title: "Custom Activity for Slack Integration",
                      desc: "Webhook setup, message templating, retry behavior — Slack-specific implementation guide.",
                    },
                  ]}
                />
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <span className="eyebrow">13 — FAQ</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Frequently asked questions.
              </h2>
              <div className="mt-8">
                <FaqList faqs={FAQS_RAW} />
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div
          className="relative overflow-hidden rounded-3xl border hairline px-6 py-14 md:px-14 md:py-20"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elevated)" }}
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="eyebrow">Get help</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Building a custom activity for your stack?
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                I've built custom Journey Builder activities for Slack, internal scoring services, and
                webhook fan-outs. Happy to walk through your setup or take it on end-to-end.
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

/* ---------------- DATA ---------------- */

const USE_CASES = [
  {
    icon: Slack,
    t: "Lead enters journey",
    d: "Sales channel gets a Slack ping with the contact's email, source, and lead score.",
  },
  {
    icon: ShieldCheck,
    t: "Churn risk detected",
    d: "Customer success channel is alerted with the at-risk contact and recent activity summary.",
  },
  {
    icon: Webhook,
    t: "High-value trigger",
    d: "Account team channel gets context-rich Slack message with deal size and next best action.",
  },
];

const STEPS = [
  {
    tag: "Build",
    t: "Build a custom activity backend in Node.js",
    d: "Stand up an Express server with /save, /validate, /publish, and /execute. Add JWT verification middleware on /execute.",
  },
  {
    tag: "Define",
    t: "Define lifecycle endpoints in config.json",
    d: "Point each endpoint to its hosted URL. Set inArguments to the contact attributes you need at runtime.",
  },
  {
    tag: "Register",
    t: "Register the package in Marketing Cloud",
    d: "Setup → Installed Packages → New → Add Component → Journey Builder Activity. Paste your hosted endpoint base URL.",
  },
  {
    tag: "Drag",
    t: "Drag the activity into a Journey Builder canvas",
    d: "Once published, your activity shows up alongside native steps. Drop it where you want the side-effect.",
  },
  {
    tag: "Configure",
    t: "Configure inputs per step",
    d: "Marketers set the Slack channel, message template, and any merge fields directly inside the activity config UI.",
  },
  {
    tag: "Run",
    t: "Activate and run contacts through the journey",
    d: "Each contact that reaches the activity hits /execute. Your handler renders the Slack payload and posts to the webhook.",
  },
];

const ENDPOINTS = [
  {
    path: "POST /save",
    when: "On config save",
    d: "Stores the marketer's configuration (Slack URL, channel, message template) on the activity instance.",
  },
  {
    path: "POST /validate",
    when: "Before publish",
    d: "Last chance to reject misconfigured steps — return non-2xx and Journey Builder blocks the publish.",
  },
  {
    path: "POST /publish",
    when: "On journey activation",
    d: "Fires once when the journey goes live. Use it for one-time setup like provisioning resources per journey.",
  },
  {
    path: "POST /execute",
    when: "Per contact",
    d: "Runtime endpoint. Receives a JWT-signed body containing inArguments (config + contact data). Do the work here.",
  },
];

const HOSTING = [
  { icon: Cloud, t: "Vercel / Netlify Functions", d: "Serverless route per endpoint. Cheap, fast cold-start, free TLS." },
  { icon: Server, t: "AWS Lambda + API Gateway", d: "Closer to enterprise networks. Pair with Secrets Manager for the JWT secret." },
  { icon: GitBranch, t: "Render / Fly.io / Railway", d: "Long-running Node containers if you prefer a single Express process." },
];

const FAQS_RAW = [
  {
    q: "What languages can I build an SFMC custom activity in?",
    a: "Anything that can serve HTTPS endpoints — Node.js, Python, .NET, Go, Java. Node.js is the most common because the Journey Builder UI is JavaScript and most reference samples are Express.",
  },
  {
    q: "Do I need a Salesforce Marketing Cloud Installed Package to build a custom activity?",
    a: "Yes. The Installed Package is what registers your activity inside SFMC and provides the JWT signing secret used to verify execute calls. Create it under Setup → Installed Packages.",
  },
  {
    q: "What is the difference between a Journey Builder custom activity and an API event?",
    a: "An API event is a journey entry source — it lets external systems push contacts into a journey. A custom activity is a step inside an existing journey that calls out to an external system as contacts pass through.",
  },
  {
    q: "Why does Journey Builder retry my custom activity?",
    a: "If /execute returns a non-2xx response or times out, Journey Builder will retry per the package's retry policy. Make your handler idempotent (key on activityInstanceId) to avoid double-processing.",
  },
  {
    q: "Can the custom activity push data back to Salesforce Marketing Cloud?",
    a: "Yes — through outArguments in the execute response and via SFMC's REST API. Common patterns include writing scoring fields to a Data Extension or updating contact attributes after the side-effect runs.",
  },
];

