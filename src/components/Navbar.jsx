"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      let heroActive = true;

      if (hero) {
        const heroEnd =
          hero.offsetTop + hero.offsetHeight - window.innerHeight;
        heroActive = window.scrollY <= Math.max(0, heroEnd);
      }

      setInHero(heroActive);
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const lightNav = inHero;

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled && !lightNav
            ? "mt-3 rounded-2xl border border-mist/70 bg-cream/80 py-3 shadow-[0_8px_30px_rgba(22,21,15,0.06)] backdrop-blur-xl"
            : "mt-0 border border-transparent py-5"
        }`}
        style={{ width: "min(100% - 1.5rem, 80rem)" }}
      >
        <Logo src={lightNav ? "/logo-white.png" : "/logo.png"} />

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`underline-grow text-sm font-medium transition-colors ${
                  lightNav
                    ? "text-white hover:text-white/80"
                    : "text-graphite hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-cobalt"
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border md:hidden ${
            lightNav ? "border-white/30" : "border-mist"
          }`}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 transition-all ${lightNav ? "bg-white" : "bg-ink"} ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 transition-all ${lightNav ? "bg-white" : "bg-ink"} ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 transition-all ${lightNav ? "bg-white" : "bg-ink"} ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-mist bg-cream/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-graphite transition-colors hover:bg-bone hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream"
            >
              Start a project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
