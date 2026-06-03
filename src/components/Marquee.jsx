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

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-xl font-medium text-graphite/70">{t}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative border-y border-mist/70 bg-cream/50 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bone to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bone to-transparent" />
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
