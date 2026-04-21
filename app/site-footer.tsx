import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t hairline">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-7 w-7 place-items-center rounded-md text-[11px] font-semibold text-background"
              style={{ background: "var(--gradient-brand)" }}
            >
              LC
            </span>
            <span className="text-sm font-semibold tracking-tight">Lalit Chaudhari</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
            Independent engineer building AI-powered systems and full-stack SaaS for teams that
            care about clarity, scale, and craft.
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="num-mark mb-4">Sitemap</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="text-foreground/80 hover:text-foreground">Home</Link></li>
            <li><Link href="/work" className="text-foreground/80 hover:text-foreground">Work</Link></li>
            <li><Link href="/services" className="text-foreground/80 hover:text-foreground">Services</Link></li>
            <li><Link href="/about" className="text-foreground/80 hover:text-foreground">About</Link></li>
            <li><Link href="/contact" className="text-foreground/80 hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="num-mark mb-4">Connect</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="mailto:hello@lalitchaudhari.dev" className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground">
                <Mail className="h-3.5 w-3.5" /> hello@lalitchaudhari.dev
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground">
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground">
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Lalit Chaudhari. All rights reserved.</p>
          <p className="font-mono">Built with intention — not templates.</p>
        </div>
      </div>
    </footer>
  );
}
