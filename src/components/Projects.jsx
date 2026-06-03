"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const PROJECTS = [
  {
    name: "Nature's Trim",
    tagline: "Lawn care & landscaping",
    desc: "A vibrant, conversion-focused site for a lawn-care company — bold promo offers, instant quote capture and a friendly, trustworthy feel.",
    tags: ["Web Design", "Lead Generation", "Local Business"],
    url: "https://naturestrim.ca",
    img: "/projects/naturestrim.jpg",
    year: "2025",
  },
  {
    name: "St. Thomas Malankara Catholic Church",
    tagline: "Community & faith",
    desc: "A warm, dignified website for a parish community — events, news, gallery and member registration, all easy to manage.",
    tags: ["Community", "Events", "CMS"],
    url: "https://stthomaslondon.ca",
    img: "/projects/stthomas.jpg",
    year: "2025",
  },
  {
    name: "The TiNY HUB",
    tagline: "Café & community space",
    desc: "An editorial, magazine-style site for a cozy breakfast & brunch spot — rich typography, menu, hours and one-tap directions.",
    tags: ["Hospitality", "Editorial", "Next.js"],
    url: "https://thetinyhub.vercel.app",
    img: "/projects/tinyhub.jpg",
    year: "2025",
  },
  {
    name: "Health Dialogue Kozhikode",
    tagline: "Mental health clinic",
    desc: "A calm, reassuring presence for a mental-health practice — clear services, expert profiles, online booking and WhatsApp contact.",
    tags: ["Healthcare", "Booking", "Branding"],
    url: "https://healthdialogue.org",
    img: "/projects/healthdialogue.jpg",
    year: "2025",
  },
  {
    name: "ChromaCut AI",
    tagline: "In-browser video tool",
    desc: "A privacy-first web app that strips a video's background in one click — FFmpeg running locally via WebAssembly, nothing ever uploaded.",
    tags: ["AI", "Web App", "WebAssembly"],
    url: "https://video-background-rem.vercel.app",
    img: "/projects/chromacut.jpg",
    year: "2025",
  },
];

function ProjectCard({ p, index }) {
  const flip = index % 2 === 1;
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* Image */}
      <motion.a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: flip ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative block ${flip ? "lg:order-2" : ""}`}
      >
        <div className="relative overflow-hidden rounded-3xl border border-mist bg-cream shadow-[0_30px_60px_-30px_rgba(22,21,15,0.3)] transition-transform duration-500 group-hover:-translate-y-1.5">
          <div className="flex items-center gap-1.5 border-b border-mist bg-bone px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd25e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-cobalt" />
            <span className="ml-3 truncate rounded-md bg-mist/60 px-3 py-1 text-[11px] font-medium text-graphite">
              {p.url.replace("https://", "")}
            </span>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={p.img}
              alt={`${p.name} website screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </motion.a>

      {/* Text */}
      <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-cobalt/40" />
          <span className="text-graphite/70">{p.tagline}</span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {p.name}
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-graphite">
          {p.desc}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-mist bg-cream px-3 py-1 text-xs font-medium text-graphite">
              {t}
            </span>
          ))}
        </div>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink"
        >
          <span className="underline-grow">Visit live site</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </Reveal>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative bg-cream/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
            Selected work
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Real projects.{" "}
            <span className="text-graphite">Real results.</span>
          </h2>
          <p className="mt-4 text-lg text-graphite">
            A look at sites and apps we've designed and built — each one live and
            in the wild.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
