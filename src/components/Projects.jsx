"use client";

import Reveal from "./Reveal";
import { FocusRail } from "@/components/ui/focus-rail";

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

const RAIL_ITEMS = PROJECTS.map((p, index) => ({
  id: index + 1,
  title: p.name,
  description: p.desc,
  imageSrc: p.img,
  href: p.url,
  meta: `${String(index + 1).padStart(2, "0")} · ${p.tagline}`,
  tags: p.tags,
}));

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
            A look at sites and apps we&apos;ve designed and built — each one live
            and in the wild.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <FocusRail items={RAIL_ITEMS} loop autoPlay={false} />
        </Reveal>
      </div>
    </section>
  );
}
