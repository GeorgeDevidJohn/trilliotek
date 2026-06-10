"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;

  --background: #f0eef5;
  --foreground: #0a0a0a;
  --primary: #8a2be2;
  --secondary: #00ffff;
  --muted-foreground: #3d3a4a;
  --destructive: #ff00ff;
  --border: rgba(10, 10, 10, 0.1);

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-highlight: color-mix(in oklch, white 80%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--primary) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--primary) 25%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--primary) 12%, transparent);
  --pill-highlight-hover: color-mix(in oklch, white 90%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.35; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.55; }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 40%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 60%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 48px 48px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--primary) 8%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--primary) 8%, transparent) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 12%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 8%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--primary) 12%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 8%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export function CinematicHero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: 60, scale: 0.85, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      );

      gsap.fromTo(
        [headingRef.current, subheadingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          delay: 0.25,
          ease: "power3.out",
        }
      );

      gsap.to(giantTextRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section
        id="top"
        ref={wrapperRef}
        className="cinematic-footer-wrapper relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-bone text-ink"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/hero-background.png"
            alt=""
            fill
            priority
            className="object-cover object-[center_right] sm:object-right"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bone/95 via-bone/75 to-bone/30 sm:from-bone/90 sm:via-bone/60 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bone/80 via-transparent to-bone/40" />
        </div>

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
        >
          TRILLIOTEK
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pt-28 sm:pt-32">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-mist bg-cream/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-graphite backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt" />
            </span>
            Available for new projects · India &amp; Canada
          </p>

          <h1
            ref={headingRef}
            className="font-display mb-6 text-center text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Modern web solutions{" "}
            <span className="text-brand-gradient">built to scale</span> your
            business.
          </h1>

          <p
            ref={subheadingRef}
            className="mb-12 max-w-2xl text-center text-sm leading-relaxed text-graphite sm:text-base md:text-lg"
          >
            TrillioTek partners with growing businesses to design and engineer
            fast, secure, and AI-ready websites and web applications that drive
            results.
          </p>

          <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap justify-center gap-4">
              <MagneticButton
                as="a"
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-cream shadow-[0_8px_30px_rgba(10,10,10,0.12)] transition-all duration-300 hover:bg-cobalt md:px-10 md:py-5 md:text-base"
              >
                Start a project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#work"
                className="footer-glass-pill group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-ink md:px-10 md:py-5 md:text-base"
              >
                View our work
                <ArrowRight className="h-5 w-5 text-graphite transition-colors group-hover:text-ink" />
              </MagneticButton>
            </div>

            <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
              <MagneticButton
                as="a"
                href="#services"
                className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-graphite hover:text-ink md:text-sm"
              >
                Services
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#process"
                className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-graphite hover:text-ink md:text-sm"
              >
                Process
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#contact"
                className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-graphite hover:text-ink md:text-sm"
              >
                Contact
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 border-t border-mist px-6 py-8 md:flex-row md:px-12">
          <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-graphite/70 md:order-1 md:text-xs">
            © {new Date().getFullYear()} TrillioTek. All rights reserved.
          </div>

          <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full px-6 py-3 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-graphite/70 md:text-xs">
              Crafted with
            </span>
            <span className="animate-footer-heartbeat text-sm text-cobalt md:text-base">
              ❤
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-graphite/70 md:text-xs">
              by
            </span>
            <span className="ml-1 text-xs font-black tracking-normal text-ink md:text-sm">
              TrillioTek
            </span>
          </div>

          <MagneticButton
            as="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-graphite hover:text-ink"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
          </MagneticButton>
        </div>
      </section>
    </>
  );
}

/** @deprecated Use CinematicHero — kept for shadcn component compatibility */
export const CinematicFooter = CinematicHero;
