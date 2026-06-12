"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

const TIERS = [
  {
    id: 1,
    name: "Starter",
    price: 150,
    description: "Launch fast with a polished static site built to capture leads.",
    features: [
      "5-page SEO-friendly static website",
      "Social media connect",
      "Basic contact form for lead generation",
    ],
  },
  {
    id: 2,
    name: "Growth",
    price: 300,
    description: "Everything in Starter, plus dynamic content and an admin panel.",
    features: [
      "Everything in Tier 1",
      "Dynamic website",
      "Admin panel",
    ],
  },
  {
    id: 3,
    name: "Scale",
    price: 2000,
    description: "Full-stack growth package with AI and mobile, bundled for value.",
    features: [
      "Everything in Tier 2",
      "Advanced dynamic suite",
      "AI integration + AI call handling",
      "Mobile app development",
    ],
  },
];

function formatCad(amount) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState(1);

  return (
    <section id="pricing" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-cobalt/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
            Pricing
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Transparent plans,{" "}
            <span className="text-brand-gradient">built to scale.</span>
          </h2>
          <p className="mt-4 text-lg text-cream/60">
            Pick the plan that fits your stage — upgrade as you grow.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <StaggerItem key={tier.id}>
                <button
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`group relative w-full overflow-hidden rounded-3xl border p-6 text-left backdrop-blur-md transition-all duration-300 sm:p-8 ${
                    isSelected
                      ? "border-cobalt/50 bg-white/10 shadow-[0_24px_60px_-24px_rgba(138,43,226,0.45)] ring-1 ring-cobalt/30"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cobalt/15 blur-[50px] transition-opacity group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-cream/50">
                        Tier {tier.id}
                      </span>
                      {isSelected && (
                        <span className="rounded-full bg-cobalt/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cobalt">
                          Selected
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold">{tier.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/55">
                      {tier.description}
                    </p>
                    <p className="mt-5 font-display text-4xl font-extrabold tracking-tight">
                      {formatCad(tier.price)}
                      <span className="ml-1 text-sm font-medium text-cream/40">CAD</span>
                    </p>

                    <ul className="mt-6 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-cream/70">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
