"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Globe,
  Palette,
  Rocket,
  Settings,
  Smartphone,
} from "lucide-react";
import Reveal from "./Reveal";
import { ShuffleServiceCards } from "@/components/ui/testimonial-cards";

const ease = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    id: "website",
    icon: Globe,
    title: "Website Development",
    listLabel: "Services include",
    description:
      "We create modern, responsive, and SEO-friendly websites tailored to your business needs.",
    items: [
      "Static business websites",
      "Dynamic web applications",
      "Custom landing pages",
      "Responsive mobile-friendly design",
      "Search Engine Optimization (SEO)",
      "Social media integration",
      "Lead generation contact forms",
    ],
    accent: "from-cobalt/30 to-cyan/10",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "webapps",
    icon: Settings,
    title: "Custom Web Applications",
    listLabel: "Features",
    description:
      "Build scalable digital solutions with powerful backend functionality.",
    items: [
      "Admin dashboards",
      "User management systems",
      "Database integration",
      "Content management systems",
      "Custom business workflows",
      "Secure authentication and access control",
    ],
    accent: "from-electric/30 to-cobalt/10",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Solutions & Automation",
    listLabel: "Our AI services include",
    description:
      "Leverage artificial intelligence to streamline your business operations.",
    items: [
      "AI chatbot integration",
      "AI-powered customer support",
      "AI call handling and voice assistants",
      "Workflow automation",
      "Smart data processing",
      "Business process optimization",
    ],
    accent: "from-amber/20 to-cobalt/10",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    listLabel: "We develop",
    description: "Turn your ideas into high-performance mobile applications.",
    items: [
      "Android applications",
      "iOS applications",
      "Cross-platform apps",
      "Business and service apps",
      "Customer engagement platforms",
    ],
    accent: "from-cyan/20 to-cobalt/10",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "branding",
    icon: Palette,
    title: "Branding & Creative Design",
    listLabel: "Services include",
    description: "Create a strong and memorable brand identity.",
    items: [
      "Logo design",
      "Brand identity creation",
      "Visual branding assets",
      "Marketing graphics",
      "Social media branding",
    ],
    accent: "from-amber/20 to-cyan/10",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "growth",
    icon: Rocket,
    title: "Digital Growth Solutions",
    listLabel: "We provide",
    description: "Help your business attract and convert more customers.",
    items: [
      "Lead generation systems",
      "Website optimization",
      "Business automation",
      "Digital strategy consulting",
      "Online presence enhancement",
    ],
    accent: "from-cobalt/30 to-amber/10",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
  },
];

export default function Services() {
  const [active, setActive] = useState(SERVICES[0]);
  const ActiveIcon = active.icon;

  const handleActiveChange = useCallback((service) => {
    setActive(service);
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cobalt/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — copy + active service detail */}
          <div className="w-full lg:w-1/2">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                What we do
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                Everything you need to build,{" "}
                <span className="text-brand-gradient">ship and grow</span>{" "}
                online.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/60">
                Swipe through our core capabilities — each card reveals a
                service built to scale your business.
              </p>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${active.accent}`}
                  >
                    <ActiveIcon className="h-5 w-5 text-cobalt" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-white/60">
                      {active.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-cobalt">
                    {active.listLabel}
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {active.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-white/75"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-electric"
                  >
                    Request a quote
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <span className="text-sm text-white/40">
                    {active.items.length} capabilities in this category
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 hidden flex-wrap gap-2 lg:flex">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isActive = active.id === service.id;
                return (
                  <span
                    key={service.id}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "border-cobalt/50 bg-cobalt/15 text-white"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {service.title.split(" ")[0]}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right — shuffle cards */}
          <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
            <div className="relative -ml-[60px] sm:-ml-[100px] lg:-ml-[80px]">
              <ShuffleServiceCards
                services={SERVICES}
                onActiveChange={handleActiveChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
