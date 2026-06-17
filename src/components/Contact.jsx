"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail, Sparkles, X } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

function InstagramIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const EMAIL = "connect@trilliotek.com";
const INSTAGRAM_HANDLE = "trillio.tek";
const INSTAGRAM_URL = "https://instagram.com/trillio.tek";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    external: false,
  },
  {
    label: "Instagram",
    value: `@${INSTAGRAM_HANDLE}`,
    href: INSTAGRAM_URL,
    icon: InstagramIcon,
    external: true,
  },
];

const inputClass =
  "w-full rounded-2xl border border-mist bg-cream px-4 py-4 text-ink outline-none transition-all placeholder:text-graphite/50 focus:border-cobalt focus:ring-4 focus:ring-cobalt/10 disabled:cursor-not-allowed disabled:opacity-60";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setForm({ name: "", email: "", phone: "", message: "" });
      setShowSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  const isLoading = status === "loading";

  return (
    <>
      <section id="contact" className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-cobalt/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-mist bg-cream/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-graphite backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-cobalt" />
                  Let&apos;s talk
                </span>
                <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                  Have a project in mind?{" "}
                  <span className="text-brand-gradient">Let&apos;s build it.</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-graphite sm:text-lg">
                  Tell us what you&apos;re building. We&apos;ll get back with ideas, a
                  clear plan, and a free quote — usually within 24 hours.
                </p>
              </Reveal>

              <StaggerGroup className="mt-10 space-y-4">
                {CONTACT_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <StaggerItem key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 rounded-2xl border border-mist bg-cream/80 p-4 shadow-[0_8px_30px_-20px_rgba(10,10,10,0.12)] backdrop-blur-sm transition-all duration-300 hover:border-cobalt/30 hover:bg-cream"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-cream transition-all duration-300 group-hover:scale-105 group-hover:bg-cobalt">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold uppercase tracking-wider text-graphite/70">
                            {link.label}
                          </span>
                          <span className="font-medium text-ink underline-grow">
                            {link.value}
                          </span>
                        </span>
                        <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-graphite/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cobalt" />
                      </a>
                    </StaggerItem>
                  );
                })}
              </StaggerGroup>

              <Reveal delay={0.15} className="mt-10 hidden sm:block">
                <div className="flex flex-wrap gap-3">
                  {["Free quote", "24h response", "No commitment"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-mist bg-cream/80 px-4 py-1.5 text-xs font-medium text-graphite"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-cobalt/25 via-transparent to-cyan/20 opacity-70 blur-sm" />
                <form
                  onSubmit={submit}
                  className="relative overflow-hidden rounded-[2rem] border border-mist bg-cream/90 p-6 shadow-[0_32px_80px_-32px_rgba(10,10,10,0.18)] backdrop-blur-md sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cobalt/10 blur-[80px]" />

                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[2rem] bg-cream/80 backdrop-blur-sm"
                      >
                        <Loader2 className="h-10 w-10 animate-spin text-cobalt" />
                        <p className="mt-4 text-sm font-medium text-graphite">Sending your enquiry…</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative space-y-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className={`mb-2 block text-xs font-semibold uppercase tracking-wider transition-colors ${
                          focused === "name" ? "text-cobalt" : "text-graphite"
                        }`}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        required
                        disabled={isLoading}
                        value={form.name}
                        onChange={update("name")}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className={`mb-2 block text-xs font-semibold uppercase tracking-wider transition-colors ${
                          focused === "email" ? "text-cobalt" : "text-graphite"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        required
                        disabled={isLoading}
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className={`mb-2 block text-xs font-semibold uppercase tracking-wider transition-colors ${
                          focused === "phone" ? "text-cobalt" : "text-graphite"
                        }`}
                      >
                        Phone number
                      </label>
                      <input
                        id="contact-phone"
                        disabled={isLoading}
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        placeholder="+44 7700 900000"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className={`mb-2 block text-xs font-semibold uppercase tracking-wider transition-colors ${
                          focused === "message" ? "text-cobalt" : "text-graphite"
                        }`}
                      >
                        Project details
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        disabled={isLoading}
                        value={form.message}
                        onChange={update("message")}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        rows={5}
                        placeholder="Tell us about your project, timeline, and goals…"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {error && (
                      <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-electric via-cobalt to-cyan px-6 py-4 text-sm font-semibold text-cream shadow-[0_12px_40px_-12px_rgba(138,43,226,0.55)] transition-all duration-300 hover:shadow-[0_16px_48px_-12px_rgba(138,43,226,0.7)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="relative z-10 h-4 w-4 animate-spin" />
                          <span className="relative z-10">Sending…</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Send enquiry</span>
                          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-graphite/60">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
          >
            <button
              type="button"
              aria-label="Close success message"
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-md rounded-[2rem] border border-mist bg-cream p-8 text-center shadow-[0_32px_80px_-32px_rgba(10,10,10,0.35)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-title"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowSuccess(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-graphite/60 transition-colors hover:bg-mist hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric via-cobalt to-cyan text-cream shadow-[0_12px_40px_-12px_rgba(138,43,226,0.55)]">
                <CheckCircle2 className="h-8 w-8" />
              </span>

              <h3
                id="contact-success-title"
                className="mt-6 font-display text-2xl font-extrabold tracking-tight text-ink"
              >
                Thank you!
              </h3>
              <p className="mt-3 text-base leading-relaxed text-graphite">
                We will contact you shortly.
              </p>

              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="mt-8 w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cobalt"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
