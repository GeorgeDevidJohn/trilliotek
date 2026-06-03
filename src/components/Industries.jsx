"use client";

import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

const INDUSTRIES = [
  {
    name: "Healthcare",
    desc: "Clinics, practitioners and wellness brands — calm, trustworthy sites with booking and patient flows.",
    icon: "M12 4v16M4 12h16",
    glow: "#3A4FF8",
  },
  {
    name: "Real Estate",
    desc: "Listings, agencies and developers — fast, searchable sites that showcase properties beautifully.",
    icon: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z",
    glow: "#FF6A2B",
  },
  {
    name: "Beauty",
    desc: "Salons, spas and beauty brands — elegant, visual-first experiences that convert browsers to bookings.",
    icon: "M12 3l2 5 5 1-3.5 3.5L17 18l-5-3-5 3 1.5-5.5L5 9l5-1z",
    glow: "#9db0ff",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
          Industries we focus on
        </span>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Deep expertise where{" "}
          <span className="text-graphite">it matters.</span>
        </h2>
      </Reveal>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {INDUSTRIES.map((ind) => (
          <StaggerItem
            key={ind.name}
            className="group relative overflow-hidden rounded-3xl border border-mist bg-cream/70 p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(22,21,15,0.25)]"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: ind.glow }}
            />
            <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-mist bg-bone text-ink">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={ind.icon} />
              </svg>
            </span>
            <h3 className="font-display text-2xl font-bold text-ink">{ind.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-graphite">{ind.desc}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
