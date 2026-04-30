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

const URL = "https://lalitchaudhari.dev/creating-sfmc-journey-builder-custom-activity";
const TITLE = "Creating an SFMC Journey Builder Custom Activity (Complete Guide)";
const DESCRIPTION =
  "Step-by-step guide to creating a custom activity in Salesforce Marketing Cloud Journey Builder — Installed Package setup, lifecycle endpoints, Node.js backend, and deployment.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "creating SFMC custom activity",
    "create Journey Builder custom activity",
    "SFMC installed package",
    "SFMC custom activity Node.js",
    "Journey Builder activity setup",
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "create-package", label: "1. Create Installed Package" },
  { id: "add-component", label: "2. Add Journey Builder Activity" },
  { id: "endpoints", label: "3. Configure endpoints" },
  { id: "backend", label: "4. Build Node.js backend" },
  { id: "deploy-test", label: "5. Deploy and test" },
  { id: "next-steps", label: "Next steps" },
  { id: "faq", label: "FAQ" },
];

const FAQS = [
  {
    q: "Do I need a developer license to create an SFMC custom activity?",
    a: "No — any Marketing Cloud edition that includes Journey Builder lets you register Installed Packages. You'll need a user with Administrator scope to create and edit packages.",
  },
  {
    q: "Can I host the custom activity backend on the same domain as my customer.html UI?",
    a: "Yes, and it's the recommended setup. Hosting the activity UI and the lifecycle endpoints on the same origin avoids cross-origin headaches inside the Journey Builder iframe.",
  },
  {
    q: "How long does Journey Builder take to recognize a newly published activity?",
    a: "Once you save the Journey Builder Activity component in your Installed Package, it appears in the canvas palette immediately. A hard refresh of the Journey Builder UI is sometimes needed.",
  },
];

export default function CreatingSfmcCustomActivityPage() {
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
            keywords: ["SFMC", "Journey Builder", "Custom Activity", "Installed Package", "Node.js"],
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://lalitchaudhari.dev/" },
            { name: "Tutorial", url: "https://lalitchaudhari.dev/sfmc-custom-activity-tutorial" },
            { name: "Creating SFMC Custom Activity", url: URL },
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
              { name: "Creating a Custom Activity" },
            ]}
          />
          <span className="eyebrow mt-6">Guide · Creation Walkthrough</span>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Creating an SFMC Journey Builder <span style={{ color: "var(--brand)" }}>Custom Activity</span> (Complete Guide)
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
            From an empty Marketing Cloud account to a deployed custom activity that registers inside
            Journey Builder — five clean steps, with the SFMC-side configuration screens, the backend
            scaffold, and the deployment checklist.
          </p>
          <ArticleMeta readTime="9 min" updated="May 2026" category="SFMC · Setup" />
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
                What you'll have at the end.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A custom activity registered in Marketing Cloud, published into Journey Builder, with
                a Node.js service hosting the four lifecycle endpoints. After this guide your activity
                will show up in the canvas palette and respond to test contacts you push through it.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                For the system-level architecture, see the&nbsp;
                <Link href="/sfmc-custom-activity-tutorial" className="link-underline">
                  full SFMC Custom Activity Tutorial
                </Link>. This guide is the creation procedure.
              </p>
            </section>

            <section id="prerequisites" className="scroll-mt-24">
              <span className="eyebrow">02 — Prerequisites</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What you need before starting.
              </h2>
              <ul className="mt-5 grid gap-2 text-sm text-foreground/85 md:grid-cols-2">
                {[
                  "A Marketing Cloud account with Administrator access",
                  "Journey Builder enabled in your Business Unit",
                  "A public HTTPS endpoint (or a tunnel like ngrok for dev)",
                  "Node.js 18+ and a package manager (npm / pnpm / bun)",
                  "Basic familiarity with Express and JSON",
                  "An idea of what your activity should do at runtime",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 border-t hairline pt-3">
                    <span className="mt-2 h-1 w-1 rounded-full" style={{ background: "var(--brand)" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            <section id="create-package" className="scroll-mt-24">
              <span className="eyebrow">Step 01</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Create the Installed Package.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The Installed Package is the SFMC-side container for your activity. It owns the JWT
                signing secret you'll use to verify runtime calls.
              </p>
              <ol className="mt-6 space-y-3 text-sm text-foreground/85">
                {[
                  "Open Setup → Platform Tools → Apps → Installed Packages",
                  "Click New, give it a clear name (e.g. \"Slack Notifier\")",
                  "Save — this generates the JWT signing secret",
                  "Copy the JWT secret into your backend's environment variables as SFMC_JWT_SECRET",
                ].map((b, i) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="num-mark min-w-[2ch]">{String(i + 1).padStart(2, "0")}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <Screenshot
                  src="/images/installed-packages.png"
                  alt="SFMC Setup → Installed Packages — package details with Summary (Name, Description, Type Custom, Status In Development, Source Account, Package Id, JWT Signing Secret) and Components section listing API Integration with Client Id, Client Secret, Authentication Base URI, REST and SOAP base URIs, and Scope permissions."
                  caption="The Installed Package screen — copy the JWT Signing Secret into your backend's SFMC_JWT_SECRET environment variable."
                  badge="Setup · Installed Packages"
                  width={3444}
                  height={1716}
                />
              </div>
            </section>

            <section id="add-component" className="scroll-mt-24">
              <span className="eyebrow">Step 02</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Add the Journey Builder Activity component.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Inside your Installed Package, click <strong>Add Component → Journey Builder Activity</strong>.
                Point the endpoint base URL at where your Node.js service will be hosted.
              </p>
              <Callout label="Heads up · Public HTTPS only" tone="warn">
                Journey Builder will not call non-HTTPS endpoints. For local development, use a tool
                like ngrok or cloudflared to expose your local Express server with a real cert.
              </Callout>
            </section>

            <section id="endpoints" className="scroll-mt-24">
              <span className="eyebrow">Step 03</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Configure the lifecycle endpoints.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                The activity's <code className="font-mono">config.json</code> is the contract between
                Marketing Cloud and your service. It declares the URLs, the runtime arguments, and the
                JWT signing requirement.
              </p>
              <div className="mt-5">
                <CodeBlock filename="config.json" language="json">
                  {"{"}{"\n"}
                  {"  "}<St>"workflowApiVersion"</St>: <St>"1.1"</St>,{"\n"}
                  {"  "}<St>"metaData"</St>: {"{ "}<St>"icon"</St>: <St>"images/slack.png"</St>, <St>"category"</St>: <St>"messaging"</St>{" }"},{"\n"}
                  {"  "}<St>"type"</St>: <St>"REST"</St>,{"\n"}
                  {"  "}<St>"arguments"</St>: {"{ "}<St>"execute"</St>: {"{"}{"\n"}
                  {"    "}<St>"url"</St>: <St>"https://your-host.com/execute"</St>,{"\n"}
                  {"    "}<St>"verb"</St>: <St>"POST"</St>,{"\n"}
                  {"    "}<St>"useJwt"</St>: <Tk>true</Tk>{"\n"}
                  {"  "}{"} }"},{"\n"}
                  {"  "}<St>"configurationArguments"</St>: {"{"}{"\n"}
                  {"    "}<St>"save"</St>:     {"{ "}<St>"url"</St>: <St>"https://your-host.com/save"</St>{" }"},{"\n"}
                  {"    "}<St>"validate"</St>: {"{ "}<St>"url"</St>: <St>"https://your-host.com/validate"</St>{" }"},{"\n"}
                  {"    "}<St>"publish"</St>:  {"{ "}<St>"url"</St>: <St>"https://your-host.com/publish"</St>{" }"}{"\n"}
                  {"  "}{"}"}{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
            </section>

            <section id="backend" className="scroll-mt-24">
              <span className="eyebrow">Step 04</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Build the Node.js backend.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A minimal Express scaffold with all four endpoints wired. Drop this file in, install
                <code className="font-mono"> express</code> and <code className="font-mono">jsonwebtoken</code>,
                and you're ready to register the activity.
              </p>
              <div className="mt-5">
                <CodeBlock filename="server.js" language="node">
                  <Tk>import</Tk> express <Tk>from</Tk> <St>"express"</St>;{"\n"}
                  <Tk>import</Tk> jwt <Tk>from</Tk> <St>"jsonwebtoken"</St>;{"\n\n"}
                  <Tk>const</Tk> app = <Fn>express</Fn>();{"\n"}
                  app.<Fn>use</Fn>(express.<Fn>json</Fn>());{"\n"}
                  app.<Fn>use</Fn>(express.<Fn>text</Fn>({"{ type: "}<St>"application/jwt"</St>{" }"}));{"\n\n"}
                  <Cm>{"// Configuration endpoints — open during canvas editing"}</Cm>{"\n"}
                  app.<Fn>post</Fn>(<St>"/save"</St>,     (req, res) ={">"} res.<Fn>json</Fn>({"{ status: "}<St>"saved"</St>{" }"}));{"\n"}
                  app.<Fn>post</Fn>(<St>"/validate"</St>, (req, res) ={">"} res.<Fn>json</Fn>({"{ status: "}<St>"ok"</St>{" }"}));{"\n"}
                  app.<Fn>post</Fn>(<St>"/publish"</St>,  (req, res) ={">"} res.<Fn>json</Fn>({"{ status: "}<St>"published"</St>{" }"}));{"\n\n"}
                  <Cm>{"// Runtime endpoint — JWT-signed"}</Cm>{"\n"}
                  app.<Fn>post</Fn>(<St>"/execute"</St>, (req, res) ={">"} {"{"}{"\n"}
                  {"  "}<Tk>const</Tk> body = jwt.<Fn>verify</Fn>(req.body, process.env.SFMC_JWT_SECRET);{"\n"}
                  {"  "}<Cm>{"// body.inArguments[0] holds your config + contact data"}</Cm>{"\n"}
                  {"  "}<Fn>doSideEffect</Fn>(body.inArguments[<St>0</St>]);{"\n"}
                  {"  "}res.<Fn>json</Fn>({"{ status: "}<St>"executed"</St>{" }"});{"\n"}
                  {"}"});{"\n\n"}
                  app.<Fn>listen</Fn>(<St>3000</St>);
                </CodeBlock>
              </div>
              <Callout label="Tip · Logging" tone="info">
                Log every <code className="font-mono">/execute</code> call with the
                <code className="font-mono"> activityInstanceId</code>, the contact key, and a hash of
                the inArguments. Journey Builder retries are loud, but you'll wish you had structured
                logs the first time something silently fails.
              </Callout>
            </section>

            <section id="deploy-test" className="scroll-mt-24">
              <span className="eyebrow">Step 05</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Deploy and test the journey end-to-end.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                Deploy the Node.js service. Then go back into Journey Builder, build a small test
                journey with one entry source (a Data Extension with two test contacts) and your new
                activity, and run it.
              </p>
              <ol className="mt-6 space-y-3 text-sm text-foreground/85">
                {[
                  "Deploy the backend to Vercel / Render / your platform of choice",
                  "Confirm /save, /validate, /publish, /execute respond 200 to a curl test",
                  "Refresh Journey Builder — your activity now appears in the palette",
                  "Build a small journey with two test contacts and activate it",
                  "Watch your service logs and confirm /execute fires per contact",
                ].map((b, i) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="num-mark min-w-[2ch]">{String(i + 1).padStart(2, "0")}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <Screenshot
                  src="/images/Slack-Message-Activity.webp"
                  alt="Empty Journey Builder canvas after publishing the package — Activities palette shows Email, In-App Message, Inbox, Push Notification, Slack Message, SMS, WhatsApp under Messages, with the new Slack Message custom activity ready to drag onto the canvas."
                  caption="After deploying and republishing the Installed Package, the new activity appears in the Journey Builder palette under Messages — ready to drag onto an empty canvas."
                  badge="Journey Builder"
                  width={1280}
                  height={564}
                />
              </div>
            </section>

            <section id="next-steps" className="scroll-mt-24">
              <span className="eyebrow">Next steps</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Where to go from here.
              </h2>
              <div className="mt-8">
                <RelatedCards
                  items={[
                    {
                      href: "/sfmc-custom-activity-tutorial",
                      eyebrow: "Pillar",
                      title: "Full SFMC Custom Activity Tutorial",
                      desc: "End-to-end system view — architecture, JWT, Data Extensions, Slack integration.",
                    },
                    {
                      href: "/sfmc-journey-builder-custom-activity",
                      eyebrow: "Concepts",
                      title: "How custom activities actually work",
                      desc: "Architecture deep dive — lifecycle, runtime flow, retry behavior.",
                    },
                    {
                      href: "/sfmc-journey-builder-custom-activity-for-slack",
                      eyebrow: "Integration",
                      title: "Custom activity for Slack",
                      desc: "Slack-specific build — webhook setup, templating, error handling.",
                    },
                  ]}
                />
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Quick answers.
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
            <h2 className="text-2xl font-semibold tracking-tight">Stuck on Installed Package setup?</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              I've shipped custom activities into production for marketing teams — happy to take a look
              at your Marketing Cloud setup or build it for you.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Get help <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
