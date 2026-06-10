"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const STATS = [
  { value: "5+", label: "Projects delivered" },
  { value: "99", label: "Performance score" },
  { value: "2", label: "Countries served" },
];

const CAPABILITIES = [
  { title: "Web Development", desc: "Fast, scalable sites" },
  { title: "UI / UX Design", desc: "Clear, conversion-focused" },
  { title: "AI Integration", desc: "Smart, future-ready" },
];

const STACK = ["Next.js", "React", "WordPress", "Node.js"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28"
    >
      {/* Background */}
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cobalt/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-cyan/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-full max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-mist to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div
              variants={item}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-mist bg-cream/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-graphite backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt" />
              </span>
              Available for new projects · India &amp; Canada
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              Modern web solutions{" "}
              <span className="text-brand-gradient">built to scale</span> your
              business.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-base leading-relaxed text-graphite sm:text-lg"
            >
              TrillioTek partners with growing businesses to design and
              engineer fast, secure, and AI-ready websites and web applications
              that drive results.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream shadow-[0_8px_30px_rgba(10,10,10,0.12)] transition-all duration-300 hover:bg-cobalt hover:shadow-[0_8px_30px_rgba(138,43,226,0.25)]"
              >
                Start a project
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
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
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/70 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-cobalt/30 hover:bg-cream"
              >
                View our work
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap gap-2"
            >
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-mist bg-cream/60 px-3 py-1 text-xs font-medium text-graphite"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="relative rounded-3xl border border-mist bg-cream/60 p-1.5 shadow-[0_32px_64px_-24px_rgba(10,10,10,0.18)] backdrop-blur-sm">
              <div className="overflow-hidden rounded-[1.35rem] bg-ink">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cobalt/80" />
                  <div className="ml-3 h-6 flex-1 rounded-md bg-white/5" />
                </div>

                {/* Dashboard preview */}
                <div className="space-y-4 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
                        Project overview
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
                        trilliotek.com
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                      Live
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      ["99", "Performance"],
                      ["0.4s", "Load time"],
                      ["100%", "Uptime"],
                    ].map(([val, label]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/8 bg-white/5 px-3 py-3 sm:px-4"
                      >
                        <div className="font-display text-lg font-bold text-white sm:text-xl">
                          {val}
                        </div>
                        <div className="mt-0.5 text-[10px] text-white/45 sm:text-[11px]">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/8 bg-white/5 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-white/60">
                        Core capabilities
                      </span>
                      <span className="h-1.5 w-16 rounded-full bg-brand-gradient" />
                    </div>
                    <div className="space-y-2.5">
                      {CAPABILITIES.map((cap) => (
                        <div
                          key={cap.title}
                          className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5"
                        >
                          <div>
                            <p className="text-xs font-semibold text-white/90">
                              {cap.title}
                            </p>
                            <p className="text-[10px] text-white/40">
                              {cap.desc}
                            </p>
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-cobalt"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent glow behind panel */}
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-brand-gradient opacity-15 blur-2xl" />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-mist bg-mist sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-cream/80 px-6 py-6 text-center backdrop-blur-sm sm:py-7"
            >
              <div className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-graphite">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
