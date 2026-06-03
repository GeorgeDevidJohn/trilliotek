"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* mesh blobs */}
      <div className="mesh-blob h-[420px] w-[420px] -left-24 top-10 bg-[#9db0ff] animate-floaty" />
      <div className="mesh-blob h-[360px] w-[360px] right-[-60px] top-40 bg-[#ffd0a8] opacity-50 animate-floaty" style={{ animationDelay: "2s" }} />
      <div className="mesh-blob h-[300px] w-[300px] left-1/3 bottom-0 bg-[#c9c0ff] opacity-40 animate-floaty" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-mist bg-cream/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-graphite backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt" />
            </span>
            Available for new projects — India &amp; Canada
          </motion.div>

          <motion.h1 variants={item} className="font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]">
            We build
            <br />
            <span className="text-cobalt">high-performance</span>
            <br />
            <span className="relative inline-block">
              websites
              <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 300 14" fill="none" preserveAspectRatio="none">
                <path d="M2 9C60 3 150 3 298 7" stroke="#FF6A2B" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{" "}
            <span className="text-graphite">that scale.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-graphite">
            TrillioTek is a web solutions company crafting fast, secure and
            <span className="font-semibold text-ink"> AI-friendly</span> websites &amp; web
            apps — engineered to help your business scale, convert and feel
            effortless to use.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-cobalt"
            >
              Start a project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream/60 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-ink/40"
            >
              View our work
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
            {[
              ["5+", "Sites shipped"],
              ["100%", "Responsive & fast"],
              ["2", "Continents served"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-bold text-ink">{n}</div>
                <div className="text-sm text-graphite">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: floating browser mock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="animate-floaty rounded-4xl border border-mist bg-cream p-3 shadow-[0_40px_80px_-20px_rgba(22,21,15,0.25)]">
            <div className="mb-3 flex items-center gap-1.5 px-2 pt-1">
              <span className="h-3 w-3 rounded-full bg-amber" />
              <span className="h-3 w-3 rounded-full bg-[#ffd25e]" />
              <span className="h-3 w-3 rounded-full bg-cobalt" />
              <span className="ml-3 h-5 flex-1 rounded-md bg-bone" />
            </div>
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#10131f] to-[#1d2440] p-5 font-mono text-[13px] leading-relaxed">
              <pre className="text-[#cdd6ff]">
<span className="text-[#7c89ff]">export default function</span> <span className="text-[#ffb27a]">Site</span>() {"{"}
{"\n"}  <span className="text-[#7c89ff]">return</span> (
{"\n"}    &lt;<span className="text-[#7ad0a8]">Experience</span>
{"\n"}      <span className="text-[#ffb27a]">fast</span>={"{"}<span className="text-[#7ad0a8]">true</span>{"}"}
{"\n"}      <span className="text-[#ffb27a]">aiReady</span>={"{"}<span className="text-[#7ad0a8]">true</span>{"}"}
{"\n"}      <span className="text-[#ffb27a]">scale</span>=<span className="text-[#ffd25e]">"∞"</span> /&gt;
{"\n"}  );
{"\n"}{"}"}
              </pre>
            </div>
          </div>

          {/* floating chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -left-4 top-1/3 rounded-2xl border border-mist bg-cream px-4 py-3 shadow-xl"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-graphite">Lighthouse</div>
            <div className="font-display text-2xl font-bold text-cobalt">99</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute -right-3 bottom-8 flex items-center gap-2 rounded-2xl border border-mist bg-cream px-4 py-3 shadow-xl"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/15 text-amber">⚡</span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-graphite">Load</div>
              <div className="font-display text-sm font-bold text-ink">0.4s</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
