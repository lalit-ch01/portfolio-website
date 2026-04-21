"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="panel space-y-5 p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Jane Doe" required />
        <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
      </div>
      <Field label="Company / context" name="company" placeholder="Acme Inc — hiring for AI engineer" />

      <div>
        <label className="num-mark">What can I help with?</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Full-time role", "Freelance project", "AI system advice", "Just a conversation"].map((c) => (
            <label key={c} className="cursor-pointer">
              <input type="checkbox" name="topic" value={c} className="peer sr-only" />
              <span className="rounded-full border hairline bg-[var(--surface-elevated)] px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-secondary peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="num-mark">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me what you're working on, the rough scope, and what success looks like."
          className="mt-3 w-full resize-none rounded-lg border hairline bg-[var(--surface-elevated)] px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-[0_0_0_4px_var(--brand-soft)]"
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">
          By sending this you agree I can reply to the email above. No newsletters, ever.
        </p>
        <button type="submit" className="btn-primary">
          {submitted ? "Message sent ✓" : "Send message"}
          {!submitted && <Send className="h-4 w-4" />}
        </button>
      </div>

      {submitted && (
        <div className="rounded-lg border hairline bg-[var(--brand-soft)] px-4 py-3 text-sm text-foreground">
          Thanks — I've got it. You'll hear back within 48 hours.
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="num-mark">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-3 w-full rounded-lg border hairline bg-[var(--surface-elevated)] px-4 py-2.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-[0_0_0_4px_var(--brand-soft)]"
      />
    </div>
  );
}
