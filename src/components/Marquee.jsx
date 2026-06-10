"use client";

const ITEMS = [
  "Next.js",
  "React",
  "WordPress",
  "UI / UX Design",
  "Full-Stack",
  "AI Integration",
  "SEO",
  "Performance",
  "APIs & Auth",
  "Chatbots",
  "Web Apps",
  "Maintenance",
];

function Row({ "aria-hidden": ariaHidden }) {
  return (
    <div
      className="flex shrink-0 items-center gap-5 px-3 sm:gap-8 sm:px-5 md:gap-10"
      aria-hidden={ariaHidden}
    >
      {ITEMS.map((t) => (
        <span
          key={t}
          className="flex items-center gap-5 sm:gap-8 md:gap-10 whitespace-nowrap"
        >
          <span className="font-display text-sm font-medium text-graphite/70 sm:text-base md:text-lg lg:text-xl">
            {t}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-amber sm:h-1.5 sm:w-1.5" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-mist/70 bg-cream/50 py-3 sm:py-4 md:py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bone to-transparent sm:w-14 md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bone to-transparent sm:w-14 md:w-24" />

      {/* Animated track — hidden when user prefers reduced motion */}
      <div
        className="flex w-max animate-marquee-sm motion-reduce:hidden sm:animate-marquee lg:animate-marquee-lg"
        aria-label="Technologies and services"
      >
        <Row />
        <Row aria-hidden />
      </div>

      {/* Static wrap fallback for reduced motion */}
      <div className="hidden motion-reduce:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 sm:gap-x-8 md:gap-x-10">
        {ITEMS.map((t) => (
          <span key={t} className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-display text-sm font-medium text-graphite/70 sm:text-base">
              {t}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-amber" />
          </span>
        ))}
      </div>
    </div>
  );
}
