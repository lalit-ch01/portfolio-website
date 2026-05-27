"use client";

import { useState, type ElementType, type FormEvent } from "react";
import {
  Building2,
  CheckCircle2,
  Mail,
  MessageSquare,
  RotateCcw,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "cd06b9dc-8e04-4f38-9fdb-7f83b50c221e";
const MESSAGE_MAX = 1000;

type Status = "idle" | "submitting" | "success" | "error";

const TOPICS = ["Full-time role", "Freelance project", "AI system advice", "Just a conversation"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const topics = formData.getAll("topic").join(", ");
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New message from lalitchaudhari.dev",
      from_name: formData.get("name"),
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      topics: topics || "—",
      message: formData.get("message"),
      botcheck: formData.get("botcheck"),
    };

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
        setMessageLength(0);
      } else {
        setStatus("error");
        setErrorMessage(result.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  function handleReset() {
    setStatus("idle");
    setErrorMessage(null);
    setMessageLength(0);
  }

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="panel space-y-6 p-6 md:p-8"
    >
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field step="01" icon={User} label="Your name" name="name" placeholder="Jane Doe" required />
        <Field
          step="02"
          icon={Mail}
          label="Email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          required
        />
      </div>

      <Field
        step="03"
        icon={Building2}
        label="Company / context"
        name="company"
        placeholder="Acme Inc — hiring for AI engineer"
      />

      <div>
        <StepLabel step="04" label="What can I help with?" />
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((c) => (
            <label key={c} className="cursor-pointer">
              <input type="checkbox" name="topic" value={c} className="peer sr-only" />
              <span className="inline-flex items-center rounded-full border hairline bg-[var(--surface-elevated)] px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-secondary peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <StepLabel step="05" label="Message" htmlFor="message" required />
          <span className="text-[10px] font-mono tabular-nums text-muted-foreground">
            {messageLength}/{MESSAGE_MAX}
          </span>
        </div>
        <div className="relative mt-3">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={MESSAGE_MAX}
            onChange={(e) => setMessageLength(e.target.value.length)}
            placeholder="Tell me what you're working on, the rough scope, and what success looks like."
            className="w-full resize-none rounded-lg border hairline bg-[var(--surface-elevated)] py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-[0_0_0_4px_var(--brand-soft)]"
          />
        </div>
      </div>

      <div className="-mx-6 md:-mx-8 border-t hairline" />

      <div className="flex items-center justify-between gap-3 -mt-1">
        <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} aria-hidden />
        <div className="flex items-center gap-3">
          <button
            type="reset"
            disabled={isSubmitting}
            className="btn-ghost shrink-0 gap-1.5 px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="btn-primary shrink-0 gap-1.5 px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSuccess ? "Message sent" : isSubmitting ? "Sending…" : "Send message"}
            {isSuccess ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              !isSubmitting && <Send className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {isSuccess && (
        <div className="flex items-start gap-3 rounded-lg border hairline bg-[var(--brand-soft)] px-4 py-3 text-sm text-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} />
          <p>Thanks — I've got it. You'll hear back within 48 hours.</p>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
          {errorMessage ?? "Something went wrong. Please try again."}
        </div>
      )}
    </form>
  );
}

function StepLabel({
  step,
  label,
  htmlFor,
  required,
}: {
  step: string;
  label: string;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="num-mark tabular-nums text-foreground/50">{step}</span>
      <span className="h-px w-3 bg-[var(--hairline)]" aria-hidden />
      <label htmlFor={htmlFor} className="num-mark">
        {label}
        {required && (
          <span
            className="ml-1 inline-block h-1 w-1 translate-y-[-2px] rounded-full align-middle"
            style={{ background: "var(--brand)" }}
            aria-hidden
          />
        )}
      </label>
    </div>
  );
}

function Field({
  step,
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  step: string;
  icon: ElementType;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <StepLabel step={step} label={label} htmlFor={name} required={required} />
      <div className="relative mt-3">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg border hairline bg-[var(--surface-elevated)] py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-[0_0_0_4px_var(--brand-soft)]"
        />
      </div>
    </div>
  );
}
