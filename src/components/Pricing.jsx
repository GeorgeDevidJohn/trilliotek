"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
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

const TIER1_ADDON = {
  id: "logo",
  label: "Logo Design & Branding",
  price: 20,
};

const TIER3_MODULES = [
  { id: "dynamic", label: "Advanced dynamic suite", price: 300 },
  { id: "ai", label: "AI integration + AI call handling", price: 1000 },
  { id: "mobile", label: "Mobile app development", price: 700 },
];

const TIER2_BASE = 300;
const TIER3_BUNDLE_PRICE = 2000;

function formatCad(amount) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function calculateTotal(selectedTier, tier1Addon, tier3Modules) {
  if (selectedTier === 1) {
    return TIERS[0].price + (tier1Addon ? TIER1_ADDON.price : 0);
  }

  if (selectedTier === 2) {
    return TIERS[1].price;
  }

  const moduleTotal = TIER3_MODULES.reduce(
    (sum, mod) => sum + (tier3Modules[mod.id] ? mod.price : 0),
    0
  );
  const allSelected = TIER3_MODULES.every((mod) => tier3Modules[mod.id]);

  if (allSelected) {
    return TIER3_BUNDLE_PRICE;
  }

  return TIER2_BASE + moduleTotal;
}

function buildSummary(selectedTier, tier1Addon, tier3Modules) {
  const lines = [];

  if (selectedTier === 1) {
    lines.push({ label: "Tier 1 — Starter", price: TIERS[0].price });
    if (tier1Addon) {
      lines.push({ label: TIER1_ADDON.label, price: TIER1_ADDON.price });
    }
    return lines;
  }

  if (selectedTier === 2) {
    lines.push({ label: "Tier 2 — Growth", price: TIERS[1].price });
    return lines;
  }

  lines.push({ label: "Tier 2 foundation", price: TIER2_BASE });
  TIER3_MODULES.forEach((mod) => {
    if (tier3Modules[mod.id]) {
      lines.push({ label: mod.label, price: mod.price });
    }
  });

  const allSelected = TIER3_MODULES.every((mod) => tier3Modules[mod.id]);
  if (allSelected) {
    const listed = lines.reduce((sum, line) => sum + line.price, 0);
    lines.push({ label: "Bundle savings", price: listed - TIER3_BUNDLE_PRICE, isDiscount: true });
  }

  return lines;
}

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState(1);
  const [tier1Addon, setTier1Addon] = useState(false);
  const [tier3Modules, setTier3Modules] = useState({
    dynamic: true,
    ai: true,
    mobile: true,
  });

  const total = useMemo(
    () => calculateTotal(selectedTier, tier1Addon, tier3Modules),
    [selectedTier, tier1Addon, tier3Modules]
  );

  const summary = useMemo(
    () => buildSummary(selectedTier, tier1Addon, tier3Modules),
    [selectedTier, tier1Addon, tier3Modules]
  );

  const toggleTier3Module = (id) => {
    setTier3Modules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTierSelect = (tierId) => {
    setSelectedTier(tierId);
    if (tierId === 3) {
      setTier3Modules({ dynamic: true, ai: true, mobile: true });
    }
  };

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
            Pick a tier and customize add-ons — your estimate updates instantly.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <StaggerItem key={tier.id}>
                <button
                  type="button"
                  onClick={() => handleTierSelect(tier.id)}
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

        <Reveal delay={0.1} className="mt-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cream/50">
              Customize your plan
            </h3>

            {selectedTier === 1 && (
              <label className="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-cobalt/30 hover:bg-white/[0.07]">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={tier1Addon}
                    onChange={(e) => setTier1Addon(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/10 accent-cobalt"
                  />
                  <span className="text-sm font-medium text-cream">{TIER1_ADDON.label}</span>
                </div>
                <span className="text-sm font-semibold text-cobalt">
                  +{formatCad(TIER1_ADDON.price)}
                </span>
              </label>
            )}

            {selectedTier === 2 && (
              <p className="mt-5 text-sm leading-relaxed text-cream/60">
                Tier 2 includes everything in Starter plus a dynamic website and admin panel.
                No add-ons required — flat {formatCad(TIERS[1].price)}.
              </p>
            )}

            {selectedTier === 3 && (
              <div className="mt-5 space-y-3">
                <p className="text-sm text-cream/60">
                  Toggle modules to build your package. Full bundle unlocks the{" "}
                  {formatCad(TIER3_BUNDLE_PRICE)} rate.
                </p>
                {TIER3_MODULES.map((mod) => (
                  <label
                    key={mod.id}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-cobalt/30 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={tier3Modules[mod.id]}
                        onChange={() => toggleTier3Module(mod.id)}
                        className="h-4 w-4 rounded border-white/20 bg-white/10 accent-cobalt"
                      />
                      <span className="text-sm font-medium text-cream">{mod.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-cobalt">
                      +{formatCad(mod.price)}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cobalt/20 blur-[70px]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-cream/50">
                  Your estimate
                </p>
                <p className="mt-2 font-display text-5xl font-extrabold tracking-tight">
                  {formatCad(total)}
                  <span className="ml-2 text-base font-medium text-cream/40">CAD</span>
                </p>

                <ul className="mt-4 space-y-1.5">
                  {summary.map((line) => (
                    <li
                      key={line.label}
                      className="flex items-center justify-between gap-4 text-sm text-cream/60"
                    >
                      <span>{line.label}</span>
                      <span className={line.isDiscount ? "text-cyan" : "text-cream/80"}>
                        {line.isDiscount ? `−${formatCad(line.price)}` : formatCad(line.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric via-cobalt to-cyan px-8 py-4 text-sm font-semibold text-cream shadow-[0_12px_40px_-12px_rgba(138,43,226,0.55)] transition-all duration-300 hover:brightness-110"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
