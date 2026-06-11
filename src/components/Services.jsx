"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const GLASS_STYLES = `
.liquid-glass {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.18) 45%,
    rgba(248, 247, 252, 0.35) 100%
  );
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.85),
    inset 0 -1px 2px rgba(138, 43, 226, 0.04),
    0 20px 50px -24px rgba(10, 10, 10, 0.18);
}

.liquid-glass-nav {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(255, 255, 255, 0.12) 100%
  );
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 8px 24px -16px rgba(10, 10, 10, 0.12);
}

.liquid-glass-nav-active {
  background: linear-gradient(
    145deg,
    rgba(138, 43, 226, 0.14) 0%,
    rgba(255, 255, 255, 0.35) 100%
  );
  border-color: rgba(138, 43, 226, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 12px 32px -16px rgba(138, 43, 226, 0.25);
}

.liquid-glass-shine {
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.45) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: liquid-shine 6s ease-in-out infinite;
}

@keyframes liquid-shine {
  0%, 100% { background-position: 200% 0; }
  50% { background-position: -200% 0; }
}
`;

const SERVICES = [
  {
    id: "website",
    emoji: "🌐",
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
    accent: "from-cobalt/20 to-cyan/10",
  },
  {
    id: "webapps",
    emoji: "⚙️",
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
    accent: "from-electric/20 to-cobalt/10",
  },
  {
    id: "ai",
    emoji: "🤖",
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
    accent: "from-amber/15 to-cobalt/10",
  },
  {
    id: "mobile",
    emoji: "📱",
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
    accent: "from-cyan/15 to-cobalt/10",
  },
  {
    id: "branding",
    emoji: "🎨",
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
    accent: "from-amber/15 to-cyan/10",
  },
  {
    id: "growth",
    emoji: "🚀",
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
    accent: "from-cobalt/20 to-amber/10",
  },
];

const ease = [0.22, 1, 0.36, 1];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

function ServiceDetail({ service }) {
  const Icon = service.icon;

  return (
    <>
      <div className="flex items-start gap-4">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-2xl`}
        >
          {service.emoji}
        </span>
        <div>
          <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-graphite">
            {service.description}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-wider text-cobalt">
          {service.listLabel}
        </p>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {service.items.map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              className="liquid-glass-nav flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-ink"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-cream">
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-sm text-graphite">
          <span className="font-semibold text-ink">
            {service.items.length} services
          </span>{" "}
          in this category ·{" "}
          <a href="#contact" className="text-cobalt underline-grow">
            Request a quote
          </a>
        </p>
      </div>
    </>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const isScrollingRef = useRef(false);

  const setSectionRef = useCallback((el, index) => {
    sectionRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const observers = sectionRefs.current.map((el, index) => {
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (isScrollingRef.current) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            setActiveIndex(index);
          }
        },
        { rootMargin: "-15% 0px -40% 0px", threshold: [0.35, 0.55] }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && sectionRefs.current[index]) {
          observer.unobserve(sectionRefs.current[index]);
        }
      });
    };
  }, []);

  const scrollToService = (index) => {
    const el = sectionRefs.current[index];
    if (!el) {
      setActiveIndex(index);
      return;
    }

    isScrollingRef.current = true;
    setActiveIndex(index);
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  };

  const active = SERVICES[activeIndex];

  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <style dangerouslySetInnerHTML={{ __html: GLASS_STYLES }} />

      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cobalt/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
            What we do
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Everything you need to build,{" "}
            <span className="text-brand-gradient">ship and grow</span> online.
          </h2>
          <p className="mt-4 text-lg text-graphite">
            Scroll or select a service — each capability updates dynamically as
            you explore.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12">
          <nav className="hidden lg:block">
            <div className="liquid-glass sticky top-28 rounded-3xl p-3">
              <ul className="space-y-1.5">
                {SERVICES.map((service, index) => {
                  const Icon = service.icon;
                  const isActive = activeIndex === index;
                  return (
                    <li key={service.id}>
                      <button
                        type="button"
                        onClick={() => scrollToService(index)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 ${
                          isActive
                            ? "liquid-glass-nav-active text-ink"
                            : "text-graphite hover:bg-white/30 hover:text-ink"
                        }`}
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${service.accent} text-lg`}
                        >
                          <Icon className="h-4 w-4 text-cobalt" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-tight">
                            {service.title}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-graphite/70">
                            {service.items.length} capabilities
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div>
            <motion.div
              layout
              className="liquid-glass relative hidden overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:sticky lg:top-28 lg:block"
            >
              <div className="liquid-glass-shine pointer-events-none absolute inset-0 opacity-40" />
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${active.accent} blur-[60px]`}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative"
                >
                  <ServiceDetail service={active} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="space-y-6 lg:hidden">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  ref={(el) => setSectionRef(el, index)}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease, delay: index * 0.05 }}
                  className="liquid-glass relative scroll-mt-28 overflow-hidden rounded-[2rem] p-6"
                >
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${service.accent} blur-[50px]`}
                  />
                  <div className="relative">
                    <ServiceDetail service={service} />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
