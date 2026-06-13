"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layout,
  PhoneCall,
  Smartphone,
} from "lucide-react";
import Reveal from "./Reveal";
import { ShuffleServiceCards } from "@/components/ui/testimonial-cards";

const ease = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    id: "static-website",
    icon: Layout,
    title: "Static Website with Logo Design",
    listLabel: "What's included",
    description:
      "Launch a polished online presence fast with a custom-designed static site and a memorable brand mark.",
    items: [
      "Custom logo design",
      "Responsive static pages",
      "Brand-aligned visual identity",
      "SEO-ready structure",
      "Contact & inquiry forms",
      "Fast, secure hosting setup",
    ],
    accent: "from-cobalt/30 to-cyan/10",
    image: "/services/static-website.png",
  },
  {
    id: "dynamic-website",
    icon: Globe,
    title: "Dynamic Website",
    listLabel: "Capabilities",
    description:
      "Interactive websites with dynamic content, CMS integration, and scalable architecture built to grow with you.",
    items: [
      "Content management systems",
      "Database-driven pages",
      "User authentication",
      "Admin dashboards",
      "API integrations",
      "Performance optimization",
    ],
    accent: "from-electric/30 to-cobalt/10",
    image: "/services/dynamic-website.png",
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    title: "Mobile App Development",
    listLabel: "Platforms",
    description:
      "Native-quality mobile experiences for iOS and Android — designed, built, and shipped to the App Store and Google Play.",
    items: [
      "iOS application development",
      "Android application development",
      "Cross-platform options",
      "Push notifications",
      "In-app payments & auth",
      "App Store deployment",
    ],
    accent: "from-cyan/20 to-cobalt/10",
    image: "/services/mobile-app.png",
  },
  {
    id: "ai-webapp",
    icon: Bot,
    title: "Web Application with AI Integration",
    listLabel: "AI features",
    description:
      "Custom web applications supercharged with AI — chatbots, smart search, automation, and intelligent workflows.",
    items: [
      "AI chatbot integration",
      "LLM-powered features",
      "Smart data processing",
      "Workflow automation",
      "Custom AI dashboards",
      "Secure API architecture",
    ],
    accent: "from-amber/20 to-cobalt/10",
    image: "/services/ai-integration.png",
  },
  {
    id: "ai-calling",
    icon: PhoneCall,
    title: "AI Calling Automation",
    listLabel: "Lead generation",
    description:
      "Automated AI voice agents that qualify leads, book appointments, and follow up — so your pipeline never sleeps.",
    items: [
      "AI outbound calling",
      "Inbound call handling",
      "Lead qualification scripts",
      "CRM integration",
      "Appointment scheduling",
      "Call analytics & reporting",
    ],
    accent: "from-cobalt/30 to-amber/10",
    image: "/services/ai-calling.png",
  },
];

export default function Services() {
  const cardsRef = useRef(null);
  const [active, setActive] = useState(SERVICES[0]);
  const ActiveIcon = active.icon;

  const handleActiveChange = useCallback((service) => {
    setActive(service);
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ink py-[60px] text-cream"
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
                Everything to build,{" "}
                <span className="text-brand-gradient">ship and grow</span>{" "}
                online.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/60">
                Swipe through our core capabilities.
              </p>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="mt-10 hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8 lg:block"
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — shuffle cards */}
          <div className="flex w-full flex-col items-center gap-6 text-left lg:w-1/2">
            <div className="relative -ml-[60px] sm:-ml-[100px] lg:-ml-[80px]">
              <ShuffleServiceCards
                ref={cardsRef}
                services={SERVICES}
                onActiveChange={handleActiveChange}
              />
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => cardsRef.current?.prev()}
                aria-label="Previous service"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-cobalt/40 hover:bg-cobalt/15 hover:text-white sm:px-5"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <span className="min-w-12 text-center text-xs font-medium tabular-nums text-white/40">
                {SERVICES.findIndex((s) => s.id === active.id) + 1} /{" "}
                {SERVICES.length}
              </span>

              <button
                type="button"
                onClick={() => cardsRef.current?.next()}
                aria-label="Next service"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-cobalt/40 hover:bg-cobalt/15 hover:text-white sm:px-5"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
