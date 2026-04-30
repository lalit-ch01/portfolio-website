import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

/* ----------------------- JSON-LD ----------------------- */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function articleJsonLd(opts: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    keywords: opts.keywords.join(", "),
    author: {
      "@type": "Person",
      name: "Lalit Chaudhari",
      url: "https://lalitchaudhari.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Lalit Chaudhari",
      url: "https://lalitchaudhari.dev",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ----------------------- Breadcrumb UI ----------------------- */
export function Breadcrumb({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground/85" : ""}>{item.name}</span>
            )}
            {!isLast && <ChevronRight className="h-3 w-3 opacity-60" />}
          </span>
        );
      })}
    </nav>
  );
}

/* ----------------------- Article meta strip ----------------------- */
export function ArticleMeta({
  readTime,
  updated,
  category,
}: {
  readTime: string;
  updated: string;
  category: string;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px]">
      <span className="pill">
        <span className="pill-dot" />
        {category}
      </span>
      <span className="num-mark">Read time · {readTime}</span>
      <span className="num-mark">Updated · {updated}</span>
      <span className="num-mark">By Lalit Chaudhari</span>
    </div>
  );
}

/* ----------------------- TOC ----------------------- */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="md:sticky md:top-24">
      <span className="num-mark">On this page</span>
      <ul className="mt-3 space-y-1.5 border-l hairline pl-4">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ----------------------- Code block ----------------------- */
export function CodeBlock({
  filename,
  language,
  children,
}: {
  filename?: string;
  language?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="panel overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between border-b hairline px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "oklch(0.78 0.15 25)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "oklch(0.85 0.14 85)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "oklch(0.78 0.16 145)" }}
            />
          </div>
          {filename && (
            <span className="font-mono text-[11px] text-muted-foreground">
              {filename}
            </span>
          )}
          {language && (
            <span className="font-mono text-[11px] text-muted-foreground">
              {language}
            </span>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-5 text-[12.5px] leading-relaxed">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}

/* Token coloring helpers — keep semantic, terse */
export function Tk({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--brand)" }}>{children}</span>;
}
export function Cm({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--muted-foreground)" }}>{children}</span>;
}
export function St({ children }: { children: ReactNode }) {
  return <span style={{ color: "oklch(0.55 0.16 30)" }}>{children}</span>;
}
export function Fn({ children }: { children: ReactNode }) {
  return <span style={{ color: "oklch(0.55 0.18 280)" }}>{children}</span>;
}

/* ----------------------- Callout ----------------------- */
export function Callout({
  label,
  tone = "info",
  children,
}: {
  label: string;
  tone?: "info" | "warn" | "success";
  children: ReactNode;
}) {
  const dot =
    tone === "warn"
      ? "oklch(0.78 0.15 60)"
      : tone === "success"
        ? "oklch(0.7 0.17 145)"
        : "var(--brand)";
  return (
    <div className="rounded-xl border hairline bg-[var(--surface-subtle)] p-5">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            background: dot,
            boxShadow: `0 0 0 4px color-mix(in oklab, ${dot} 18%, transparent)`,
          }}
        />
        <span className="num-mark">{label}</span>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}

/* ----------------------- Diagram step ----------------------- */
export function FlowDiagram({
  steps,
}: {
  steps: { title: string; sub?: string }[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] md:gap-2">
      {steps.map((s, i) => (
        <div key={s.title} className="flex items-stretch md:flex-col">
          <div className="flex-1 rounded-xl border hairline bg-[var(--surface-elevated)] p-4">
            <div className="num-mark">Step {String(i + 1).padStart(2, "0")}</div>
            <div className="mt-1.5 text-sm font-semibold tracking-tight">{s.title}</div>
            {s.sub && (
              <div className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                {s.sub}
              </div>
            )}
          </div>
          {i !== steps.length - 1 && (
            <div className="grid place-items-center px-2 md:px-0 md:py-2">
              <ChevronRight
                className="h-4 w-4 md:rotate-90"
                style={{ color: "var(--brand)" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ----------------------- Image placeholder ----------------------- */
export function ImagePlaceholder({
  label,
  caption,
  ratio = "16/9",
}: {
  label: string;
  caption: string;
  ratio?: string;
}) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-xl border hairline bg-[var(--surface-subtle)]"
        style={{ aspectRatio: ratio }}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="relative grid h-full place-items-center p-6 text-center">
          <div>
            <span className="num-mark">Image · placeholder</span>
            <div className="mt-2 text-sm font-semibold tracking-tight">{label}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-[12px] text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/* ----------------------- Screenshot (real image) ----------------------- */
export function Screenshot({
  src,
  alt,
  caption,
  width,
  height,
  badge,
  priority,
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  width: number;
  height: number;
  badge?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-xl border hairline bg-[var(--surface-subtle)]"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div className="flex items-center justify-between border-b hairline bg-[var(--surface-elevated)] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.78 0.15 25)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.85 0.14 85)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.78 0.16 145)" }} />
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            {badge ?? "marketingcloud.com"}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">screenshot</span>
        </div>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-2.5 text-[12px] leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/* ----------------------- FAQ ----------------------- */
export function FaqList({ faqs }: { faqs: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y hairline border-y hairline">
      {faqs.map((f, i) => (
        <details key={i} className="group py-5">
          <summary className="flex cursor-pointer items-start justify-between gap-6 text-base font-medium tracking-tight text-foreground list-none">
            <span>{f.q}</span>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-90" style={{ color: "var(--brand)" }} />
          </summary>
          <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ----------------------- Related / cross-link card row ----------------------- */
export function RelatedCards({
  items,
}: {
  items: { href: string; eyebrow: string; title: string; desc: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border hairline bg-[var(--hairline)] md:grid-cols-3">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="group bg-[var(--surface-elevated)] p-6 transition-colors hover:bg-[var(--surface-subtle)]"
        >
          <span className="num-mark">{it.eyebrow}</span>
          <h3 className="mt-2 text-base font-semibold tracking-tight">{it.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
          <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px]" style={{ color: "var(--brand)" }}>
            Read article <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
