"use client";

import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

const SERVICES = [
  {
    title: "Website Development",
    desc: "Custom-built websites tailored to your business goals — fast, secure and built to last.",
    tags: ["Static Sites", "Dynamic Sites", "WordPress", "Custom Code"],
    span: "lg:col-span-3",
    accent: "cobalt",
    icon: (
      <path d="M3 5h18v14H3zM3 9h18M7 13h6M7 16h4" strokeWidth="1.6" />
    ),
  },
  {
    title: "Design & Experience",
    desc: "Digital experiences that turn visitors into customers.",
    tags: ["UI / UX Design", "Front-End Dev"],
    span: "lg:col-span-3",
    accent: "amber",
    icon: (
      <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" strokeWidth="1.6" />
    ),
  },
  {
    title: "Full-Stack Solutions",
    desc: "Complete, end-to-end web application development.",
    tags: ["Backend & APIs", "Auth", "Full-Stack"],
    span: "lg:col-span-2",
    accent: "cobalt",
    icon: (
      <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" strokeWidth="1.6" />
    ),
  },
  {
    title: "Optimization & Support",
    desc: "Keeping your site secure, updated and performing at its best.",
    tags: ["Maintenance", "Redesign", "Monitoring"],
    span: "lg:col-span-2",
    accent: "graphite",
    icon: (
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 01-.1 1.2l2 1.6-2 3.4-2.4-1a7 7 0 01-2 1.2l-.4 2.6h-4l-.4-2.6a7 7 0 01-2-1.2l-2.4 1-2-3.4 2-1.6A7 7 0 015 12c0-.4 0-.8.1-1.2l-2-1.6 2-3.4 2.4 1a7 7 0 012-1.2L11.8 3h4l.4 2.6a7 7 0 012 1.2l2.4-1 2 3.4-2 1.6c.1.4.1.8.1 1.2z" strokeWidth="1.4" />
    ),
  },
  {
    title: "AI Integration",
    desc: "Make your website intelligent — chatbots, automation & AI search.",
    tags: ["Chatbots", "Automation", "AI Search", "Lead Capture"],
    span: "lg:col-span-2",
    accent: "amber",
    badge: "Featured",
    icon: (
      <path d="M12 3a4 4 0 014 4v1a4 4 0 010 8v1a4 4 0 01-8 0v-1a4 4 0 010-8V7a4 4 0 014-4zM12 11v0M9 9h.01M15 9h.01" strokeWidth="1.6" />
    ),
  },
];

const accentMap = {
  cobalt: "text-cobalt bg-cobalt/10",
  amber: "text-amber bg-amber/10",
  graphite: "text-graphite bg-graphite/10",
};

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
          What we do
        </span>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Everything you need to build,{" "}
          <span className="text-graphite">ship and grow</span> online.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {SERVICES.map((s) => (
          <StaggerItem
            key={s.title}
            className={`group relative overflow-hidden rounded-3xl border border-mist bg-cream/70 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_50px_-24px_rgba(22,21,15,0.25)] ${s.span}`}
          >
            {s.badge && (
              <span className="absolute right-5 top-5 rounded-full bg-amber px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
                {s.badge}
              </span>
            )}
            <span className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accentMap[s.accent]}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                {s.icon}
              </svg>
            </span>
            <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-graphite">{s.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full border border-mist bg-bone px-3 py-1 text-xs font-medium text-graphite">
                  {t}
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-cobalt/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
