"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
  tags?: string[];
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  ctaLabel?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 450,
  damping: 18,
  mass: 1,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
  ctaLabel = "Visit live site",
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        if (delta > 0) handleNext();
        else handlePrev();
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) handleNext();
    else if (swipe > swipeConfidenceThreshold) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];
  const isExternal = activeItem.href?.startsWith("http");

  return (
    <div
      className={cn(
        "group relative flex h-[520px] w-full flex-col overflow-hidden rounded-3xl border border-mist bg-bone text-ink outline-none select-none sm:h-[600px]",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bone via-bone/60 to-bone/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        <motion.div
          className="relative mx-auto flex h-[280px] w-full max-w-6xl cursor-grab items-center justify-center active:cursor-grabbing sm:h-[360px] [perspective:1200px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);
            const xOffset = offset * 280;
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;
            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.65;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute  rounded-2xl border border-mist bg-cream shadow-2xl transition-shadow duration-300 sm:w-[360px] md:w-[650px]",
                  isCenter ? "z-20 shadow-[0_24px_50px_-20px_rgba(138,43,226,0.25)]" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale,
                  rotateY,
                  opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={(val) => {
                  if (val === "scale") return TAP_SPRING;
                  return BASE_SPRING;
                }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="pointer-events-none h-full w-full rounded-2xl object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent" />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="pointer-events-auto mx-auto mt-8 flex w-full max-w-4xl flex-col items-center justify-between gap-6 sm:mt-12 md:flex-row">
          <div className="flex h-auto min-h-[8rem] flex-1 flex-col items-center justify-center text-center md:items-start md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                    {activeItem.meta}
                  </span>
                )}
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                  {activeItem.title}
                </h3>
                {activeItem.description && (
                  <p className="max-w-md text-sm leading-relaxed text-graphite sm:text-[15px]">
                    {activeItem.description}
                  </p>
                )}
                {activeItem.tags && activeItem.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 pt-2 md:justify-start">
                    {activeItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-mist bg-cream/80 px-3 py-1 text-xs font-medium text-graphite"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-mist bg-cream/80 p-1 shadow-sm backdrop-blur-md">
              <button
                type="button"
                onClick={handlePrev}
                className="rounded-full p-3 text-graphite transition hover:bg-mist/60 hover:text-ink active:scale-95"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[40px] text-center text-xs font-mono text-graphite/70">
                {activeIndex + 1} / {count}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full p-3 text-graphite transition hover:bg-mist/60 hover:text-ink active:scale-95"
                aria-label="Next project"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href &&
              (isExternal ? (
                <a
                  href={activeItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-all hover:bg-cobalt active:scale-95"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <a
                  href={activeItem.href}
                  className="group flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-all hover:bg-cobalt active:scale-95"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
