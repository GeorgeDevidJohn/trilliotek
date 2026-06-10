"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonails";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    name: "Bivin Peter",
    username: "Natures Trim",
    body: "Great work, fully satisfied.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    country: "ON, Canada",
  },
  {
    name: "Biffin",
    username: "St. Thomas Malankara",
    body: "Quick response, best designs!",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    country: "ON, Canada",
  },
  {
    name: "Fr. Ebin",
    username: "Health Dialogue",
    body: "Professional service and best quality output.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    country: "KL, India",
  },
  {
    name: "Johny Thekkineth",
    username: "Trillium Foundation",
    body: "Quality leads, impressive website.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    country: "KL, India",
  },
  {
    name: "Tess Maria",
    username: "Tiny Hub",
    body: "Timely delivery, friendly service.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    country: "USA",
  },
  {
    name: "Joseph Devid",
    username: "HMC",
    body: "Very customizable and smooth.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    country: "KA, India",
  },
  {
    name: "Richu Thankachan",
    username: "Portfolio",
    body: "Highly customisable and attractive.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    country: "ON, Canada",
  },
  {
    name: "Athul T",
    username: "5J Constructions",
    body: "Best product display feature.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    country: "ON, Canada",
  },
];

function TestimonialCard({ img, name, username, body, country }) {
  return (
    <Card className="w-64 shrink-0 border-mist/80 bg-cream/90 shadow-[0_8px_30px_rgba(10,10,10,0.06)] backdrop-blur-sm">
      <CardContent>
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="flex items-center gap-1 text-sm font-medium text-ink">
              {name}
              <span className="text-xs text-graphite">· {country}</span>
            </figcaption>
            <p className="text-xs font-medium text-graphite/80">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm leading-relaxed text-graphite">
          &ldquo;{body}&rdquo;
        </blockquote>
      </CardContent>
    </Card>
  );
}

function MarqueeColumn({ reverse = false }) {
  return (
    <Marquee
      vertical
      pauseOnHover
      reverse={reverse}
      repeat={3}
      className="h-full [--duration:45s]"
      ariaLabel="Client testimonials"
    >
      {TESTIMONIALS.map((review) => (
        <TestimonialCard key={`${review.username}-${reverse}`} {...review} />
      ))}
    </Marquee>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-cream/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cobalt/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Trusted by clients{" "}
            <span className="text-brand-gradient">across borders.</span>
          </h2>
          <p className="mt-4 text-lg text-graphite">
            Real feedback from businesses we&apos;ve helped grow online in India,
            Canada, and beyond.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="relative mx-auto flex h-[28rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-3xl border border-mist bg-bone/80 [perspective:300px] sm:h-[32rem]">
            <div
              className="flex flex-row items-center gap-4"
              style={{
                transform:
                  "translateX(-80px) translateY(0px) translateZ(-80px) rotateX(18deg) rotateY(-8deg) rotateZ(16deg)",
              }}
            >
              <MarqueeColumn />
              <MarqueeColumn reverse />
              <MarqueeColumn />
              <MarqueeColumn reverse />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-bone" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bone" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-bone" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-bone" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
