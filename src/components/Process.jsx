"use client";

import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "We learn your business, goals and audience — then map the fastest path to a site that performs.",
  },
  {
    n: "02",
    title: "Design",
    desc: "We craft a distinctive, on-brand interface focused on clarity, usability and conversion.",
  },
  {
    n: "03",
    title: "Build",
    desc: "We engineer it with modern, AI-friendly tech — fast, secure, responsive and accessible.",
  },
  {
    n: "04",
    title: "Launch & grow",
    desc: "We ship, monitor and keep improving — with ongoing support, optimization and new features.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cobalt/30 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
            How we work
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            A clear, collaborative process.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <StaggerItem
              key={s.n}
              className="group bg-ink p-8 transition-colors duration-300 hover:bg-graphite/40"
            >
              <div className="font-display text-5xl font-extrabold text-white/15 transition-colors duration-300 group-hover:text-cobalt">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
