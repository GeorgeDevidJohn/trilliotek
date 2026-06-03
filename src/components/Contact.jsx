"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const EMAIL = "georgedevid97@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry from ${form.name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal direction="scale">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-mist bg-cream/80 p-8 shadow-[0_40px_80px_-40px_rgba(22,21,15,0.3)] sm:p-12 lg:p-16">
          <div className="mesh-blob h-72 w-72 -right-16 -top-16 bg-[#9db0ff] opacity-40" />
          <div className="mesh-blob h-60 w-60 -left-16 bottom-0 bg-[#ffd0a8] opacity-40" />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
            {/* Left: pitch + details */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                Let's talk
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Have a project in mind?
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite">
                Tell us what you're building. We'll get back to you with ideas, a
                clear plan and a free quote.
              </p>

              <div className="mt-10 space-y-5">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-cream transition-colors group-hover:bg-cobalt">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-graphite/70">Email</span>
                    <span className="font-medium text-ink underline-grow">{EMAIL}</span>
                  </span>
                </a>

                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-mist bg-bone text-ink">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-graphite/70">Based in</span>
                    <span className="font-medium text-ink">India &amp; Canada</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-graphite">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-mist bg-cream px-4 py-3.5 text-ink outline-none transition-all placeholder:text-graphite/50 focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-graphite">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-mist bg-cream px-4 py-3.5 text-ink outline-none transition-all placeholder:text-graphite/50 focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-graphite">Project details</label>
                <textarea
                  required
                  value={form.message}
                  onChange={update("message")}
                  rows={4}
                  placeholder="Tell us about your project…"
                  className="w-full resize-none rounded-2xl border border-mist bg-cream px-4 py-3.5 text-ink outline-none transition-all placeholder:text-graphite/50 focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
                />
              </div>
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-cream transition-all duration-300 hover:bg-cobalt"
              >
                Send enquiry
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
