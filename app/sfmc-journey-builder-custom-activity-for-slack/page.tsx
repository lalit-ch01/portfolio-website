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

const URL = "https://lalitchaudhari.dev/sfmc-journey-builder-custom-activity-for-slack";
const TITLE = "SFMC Journey Builder Custom Activity for Slack — Integration Guide";
const DESCRIPTION =
  "Build a Slack custom activity for Salesforce Marketing Cloud Journey Builder using Incoming Webhooks. Webhook setup, Block Kit templating, retries, and production failure handling.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "SFMC Slack integration",
    "Journey Builder Slack custom activity",
    "Salesforce Marketing Cloud Slack webhook",
    "Slack incoming webhook SFMC",
    "Journey Builder Slack notifications",
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "why-slack", label: "Why a Slack custom activity" },
  { id: "create-webhook", label: "1. Create the Slack webhook" },
  { id: "backend", label: "2. Build the Node.js backend" },
  { id: "execute", label: "3. Handle the execute endpoint" },
  { id: "send-message", label: "4. Send a Slack message" },
  { id: "handle-failures", label: "5. Handle failures" },
  { id: "block-kit", label: "Block Kit templating" },
  { id: "related", label: "Related guides" },
  { id: "faq", label: "FAQ" },
];

const FAQS = [
  {
    q: "Can I use Slack's Web API instead of an Incoming Webhook?",
    a: "Yes — chat.postMessage gives you more control (threading, dynamic channels, scheduled sends) but requires a bot token with the right scopes. Incoming Webhooks are simpler when each Journey Builder step posts to a fixed channel.",
  },
  {
    q: "How do I keep Slack webhook URLs out of the activity config?",
    a: "Store webhook URLs in your backend's secret store keyed by an opaque alias (e.g. \"sales-alerts\"). The activity config saves only the alias; the backend resolves it to the actual URL at runtime so marketers never see the secret.",
  },
  {
    q: "What happens if Slack returns rate-limit errors?",
    a: "Slack returns 429 with a Retry-After header. Catch this, return a non-2xx from /execute (or queue the message), and let Journey Builder's retry policy back off. Don't fail the contact — log it and surface the error to ops.",
  },
  {
    q: "Can I send Slack messages with rich formatting from a Journey Builder custom activity?",
    a: "Yes — Slack's Block Kit lets you compose structured layouts. Render the Block Kit JSON inside /execute using the contact's merge fields and POST it to the webhook URL.",
  },
];

export default function SfmcSlackCustomActivityPage() {
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
            keywords: ["SFMC", "Slack", "Journey Builder", "Custom Activity", "Webhook"],
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://lalitchaudhari.dev/" },
            { name: "Tutorial", url: "https://lalitchaudhari.dev/sfmc-custom-activity-tutorial" },
            { name: "Slack Integration", url: URL },
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
              { name: "Slack Integration" },
            ]}
          />
          <span className="eyebrow mt-6">Integration · Slack + SFMC</span>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            SFMC Journey Builder Custom Activity for <span style={{ color: "var(--brand)" }}>Slack</span> Integration.
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
            Push real-time Slack notifications from inside Salesforce Marketing Cloud journeys — without
            a middleware tool. Webhook setup, Block Kit templating, retry behavior, and the production
            patterns that keep alerts reliable when traffic spikes.
          </p>
          <ArticleMeta readTime="10 min" updated="May 2026" category="Slack · SFMC" />
        </div>
      </header>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <Toc items={TOC} />
          </aside>

          <article className="md:col-span-9 space-y-16">
            <section id="introduction" className="scroll-mt-24">
              <span className="eyebrow">01 — Introduction</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What you'll build.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A Journey Builder custom activity that, every time a contact reaches it, posts a
                templated Slack message to a configured channel. Marketers configure the channel, the
                template, and the merge fields directly inside Journey Builder — no engineering ticket
                per campaign.
              </p>
              <div className="mt-6">
                <FlowDiagram
                  steps={[
                    { title: "Contact reaches step" },
                    { title: "/execute called", sub: "JWT POST" },
                    { title: "Render template", sub: "Merge fields → Block Kit" },
                    { title: "POST to Slack webhook" },
                    { title: "Channel receives alert" },
                  ]}
                />
              </div>
              <div className="mt-8">
                <Screenshot
                  src="/images/Slack-Message-Activity.webp"
                  alt="Salesforce Marketing Cloud Journey Builder canvas with the Activities palette open under Messages, showing Email, In-App Message, Inbox, Push Notification, Slack Message, SMS, and WhatsApp — the Slack Message custom activity sitting alongside native messaging steps."
                  caption="The end state — the Slack Message custom activity registered in the Journey Builder palette under Messages, ready for marketers to drag onto any journey canvas."
                  badge="Activities · Messages"
                  width={1280}
                  height={564}
                />
              </div>
            </section>

            <section id="why-slack" className="scroll-mt-24">
              <span className="eyebrow">02 — Why</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Why a Slack custom activity beats middleware.
              </h2>
              <ul className="mt-6 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  "No paid hop — the message goes Marketing Cloud → your service → Slack",
                  "Sub-2-second alerts, vs. middleware schedulers that poll on a delay",
                  "Marketers configure each step inline, not in a separate tool",
                  "The activity is reusable across every journey in the BU",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 border-t hairline pt-3">
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
                  src="/images/cart-journey.png"
                  alt="Journey Builder canvas with an Activity Summary drawer open on the left — Activity Name, Description, Message Definition, and Message Configuration fields visible — running alongside an Abandoned Cart journey on the right with Decision Split and downstream steps."
                  caption="Activity configuration happens inline — marketers fill the drawer without leaving the Journey Builder canvas. The same pattern hosts your Slack activity's channel + template fields."
                  badge="Activity config"
                  width={1426}
                  height={745}
                />
              </div>
            </section>

            <section id="create-webhook" className="scroll-mt-24">
              <span className="eyebrow">Step 01</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Create the Slack Incoming Webhook.
              </h2>
              <ol className="mt-5 space-y-3 text-sm text-foreground/85">
                {[
                  "Go to api.slack.com/apps → Create New App → From scratch",
                  "Pick a workspace, name the app (e.g. \"SFMC Notifier\")",
                  "Enable Incoming Webhooks under Features",
                  "Add a New Webhook to Workspace, select the destination channel",
                  "Copy the webhook URL — store it in your secret manager",
                ].map((b, i) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="num-mark min-w-[2ch]">{String(i + 1).padStart(2, "0")}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ol>
              <Callout label="Security · don't expose the webhook" tone="warn">
                A Slack webhook URL is effectively a secret that can post to your channel. Never store
                it in the activity's <code className="font-mono">inArguments</code> directly — anyone
                with read access to the journey would see it. Use an alias resolved server-side.
              </Callout>
            </section>

            <section id="backend" className="scroll-mt-24">
              <span className="eyebrow">Step 02</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Build the Node.js backend.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Use the same Express scaffold as any custom activity — four endpoints, JWT verification
                on <code className="font-mono">/execute</code>. The Slack-specific work happens inside
                the execute handler.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                See the&nbsp;
                <Link href="/creating-sfmc-journey-builder-custom-activity" className="link-underline">
                  creation walkthrough
                </Link>&nbsp;for the base server setup.
              </p>
            </section>

            <section id="execute" className="scroll-mt-24">
              <span className="eyebrow">Step 03</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Handle the execute endpoint.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The <code className="font-mono">/execute</code> handler verifies the JWT, resolves the
                webhook alias to a real URL, renders the message, and posts to Slack.
              </p>
              <div className="mt-5">
                <CodeBlock filename="execute-slack.js" language="node">
                  <Tk>import</Tk> jwt <Tk>from</Tk> <St>"jsonwebtoken"</St>;{"\n"}
                  <Tk>import</Tk> {"{ resolveWebhook }"} <Tk>from</Tk> <St>"./secrets.js"</St>;{"\n"}
                  <Tk>import</Tk> {"{ renderBlocks }"} <Tk>from</Tk> <St>"./templates.js"</St>;{"\n\n"}
                  <Tk>export async function</Tk> <Fn>executeHandler</Fn>(req, res) {"{"}{"\n"}
                  {"  "}<Tk>const</Tk> body = jwt.<Fn>verify</Fn>(req.body, process.env.SFMC_JWT_SECRET);{"\n"}
                  {"  "}<Tk>const</Tk> {"{ channelAlias, template, ...contact }"} = body.inArguments[<St>0</St>];{"\n\n"}
                  {"  "}<Tk>const</Tk> webhookUrl = <Tk>await</Tk> <Fn>resolveWebhook</Fn>(channelAlias);{"\n"}
                  {"  "}<Tk>const</Tk> blocks = <Fn>renderBlocks</Fn>(template, contact);{"\n\n"}
                  {"  "}<Tk>const</Tk> resp = <Tk>await</Tk> <Fn>fetch</Fn>(webhookUrl, {"{"}{"\n"}
                  {"    "}method: <St>"POST"</St>,{"\n"}
                  {"    "}headers: {"{ "}<St>"Content-Type"</St>: <St>"application/json"</St>{" }"},{"\n"}
                  {"    "}body: JSON.<Fn>stringify</Fn>({"{ blocks }"}),{"\n"}
                  {"  "}{"}"});{"\n\n"}
                  {"  "}<Tk>if</Tk> (!resp.ok) <Tk>return</Tk> res.<Fn>status</Fn>(<St>502</St>).<Fn>json</Fn>({"{ status: "}<St>"slack_failed"</St>{" }"});{"\n"}
                  {"  "}<Tk>return</Tk> res.<Fn>json</Fn>({"{ status: "}<St>"executed"</St>{" }"});{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
            </section>

            <section id="send-message" className="scroll-mt-24">
              <span className="eyebrow">Step 04</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Send a Slack message.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The Slack webhook accepts either a plain <code className="font-mono">text</code> field
                or a structured <code className="font-mono">blocks</code> array (Block Kit). For real
                product alerts, blocks beat plain text every time.
              </p>
              <div className="mt-5">
                <CodeBlock filename="slack payload" language="json">
                  {"{"}{"\n"}
                  {"  "}<St>"blocks"</St>: [{"\n"}
                  {"    "}{"{"} <St>"type"</St>: <St>"header"</St>, <St>"text"</St>: {"{ "}<St>"type"</St>: <St>"plain_text"</St>, <St>"text"</St>: <St>"New high-value lead"</St>{" }"} {"}"},{"\n"}
                  {"    "}{"{"} <St>"type"</St>: <St>"section"</St>, <St>"fields"</St>: [{"\n"}
                  {"      "}{"{ "}<St>"type"</St>: <St>"mrkdwn"</St>, <St>"text"</St>: <St>{`"*Name:*\\nJane Doe"`}</St>{" }"},{"\n"}
                  {"      "}{"{ "}<St>"type"</St>: <St>"mrkdwn"</St>, <St>"text"</St>: <St>{`"*Score:*\\n92"`}</St>{" }"}{"\n"}
                  {"    "}]{" }"}{"\n"}
                  {"  "}]{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
            </section>

            <section id="handle-failures" className="scroll-mt-24">
              <span className="eyebrow">Step 05</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Handle failures gracefully.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Slack can rate-limit. Channels can be archived. Webhooks can be revoked. Your handler
                needs a clear policy for each — and it should never silently drop a contact.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {FAILURES.map((f) => (
                  <div key={f.t} className="rounded-xl border hairline bg-[var(--surface-elevated)] p-5">
                    <span className="num-mark">{f.t}</span>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{f.d}</p>
                  </div>
                ))}
              </div>
              <Callout label="Pattern · Dead-letter queue" tone="info">
                For high-volume journeys, push the Slack send onto a queue from <code className="font-mono">/execute</code> and
                return 200 immediately. The queue worker handles retries and surfaces hard failures
                into a dead-letter store ops can review — the journey never stalls.
              </Callout>
            </section>

            <section id="block-kit" className="scroll-mt-24">
              <span className="eyebrow">Templating</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Block Kit templating with merge fields.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The marketer-facing template should be safe but expressive. A simple
                <code className="font-mono"> {"{{firstName}}"}</code>-style replacement on top of a
                stored Block Kit JSON gets you most of the way without exposing arbitrary code.
              </p>
              <div className="mt-5">
                <CodeBlock filename="templates.js" language="node">
                  <Cm>{"// Replace {{token}} placeholders with values from contact"}</Cm>{"\n"}
                  <Tk>export function</Tk> <Fn>renderBlocks</Fn>(templateJson, contact) {"{"}{"\n"}
                  {"  "}<Tk>const</Tk> rendered = templateJson.<Fn>replace</Fn>(/\{"{"}\{"{"}\s*(\w+)\s*\{"}"}\{"}"}/g, (_, key) ={">"}{"\n"}
                  {"    "}contact[key] ?? <St>""</St>{"\n"}
                  {"  "});{"\n"}
                  {"  "}<Tk>return</Tk> JSON.<Fn>parse</Fn>(rendered);{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
            </section>

            <section id="related" className="scroll-mt-24">
              <span className="eyebrow">Related</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Pair this with the system context.
              </h2>
              <div className="mt-8">
                <RelatedCards
                  items={[
                    {
                      href: "/sfmc-custom-activity-tutorial",
                      eyebrow: "Pillar",
                      title: "SFMC Custom Activity Tutorial",
                      desc: "End-to-end build with code, lifecycle, JWT, and Slack integration.",
                    },
                    {
                      href: "/creating-sfmc-journey-builder-custom-activity",
                      eyebrow: "Walkthrough",
                      title: "Creating a Custom Activity",
                      desc: "Step-by-step from Installed Package creation to deployment.",
                    },
                    {
                      href: "/sfmc-journey-builder-custom-activity",
                      eyebrow: "Concepts",
                      title: "Architecture & Flow",
                      desc: "How custom activities work — lifecycle, runtime data flow, retries.",
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
            <h2 className="text-2xl font-semibold tracking-tight">Need a Slack-SFMC integration shipped?</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              I've built and shipped this exact integration for production marketing teams. If you'd
              rather not build it from scratch, let's talk.
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

const FAILURES = [
  {
    t: "Slack rate-limited (429)",
    d: "Respect the Retry-After header. Either return non-2xx so JB retries, or queue the message and return 200.",
  },
  {
    t: "Channel archived / deleted",
    d: "Slack returns channel_not_found. Log the failure, alert ops, and skip the contact rather than retrying forever.",
  },
  {
    t: "Webhook revoked",
    d: "Slack returns 410 Gone or 404. The webhook URL is dead — surface this clearly so marketers reissue it.",
  },
  {
    t: "Network timeout",
    d: "Wrap the fetch with a 1.5s timeout. On timeout, queue and return 200 — never block Journey Builder waiting.",
  },
];
