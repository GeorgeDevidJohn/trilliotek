"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardPosition = "front" | "middle" | "back";

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  listLabel: string;
  items: string[];
  image: string;
  icon: LucideIcon;
  accent: string;
}

interface ServiceCardProps extends ServiceCardData {
  handleShuffle: () => void;
  position: CardPosition;
}

export function ServiceCard({
  handleShuffle,
  title,
  description,
  listLabel,
  items,
  image,
  icon: Icon,
  accent,
  position,
}: ServiceCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = "clientX" in e ? e.clientX : 0;
      }}
      onDragEnd={(e) => {
        const clientX = "clientX" in e ? e.clientX : 0;
        if (dragRef.current - clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={cn(
        "absolute left-0 top-0 grid h-[420px] w-[320px] select-none place-content-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md sm:h-[450px] sm:w-[350px]",
        isFront && "cursor-grab active:cursor-grabbing"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br blur-[60px]",
          accent
        )}
      />

      <div className="relative mx-auto h-28 w-full overflow-hidden rounded-xl border border-white/10">
        <img
          src={image}
          alt=""
          className="pointer-events-none h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cobalt/90 text-cream shadow-lg">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-xl font-bold leading-tight text-white">
        {title}
      </h3>
      <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
        {description}
      </p>

      <div className="relative mt-4 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-cobalt">
          {listLabel}
        </p>
        <ul className="mt-2 space-y-1.5">
          {items.slice(0, 4).map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs text-white/70"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-cyan" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {isFront && (
        <p className="relative mt-3 text-center text-[11px] text-white/35">
          Swipe or use the buttons below →
        </p>
      )}
    </motion.div>
  );
}

export interface ShuffleServiceCardsHandle {
  next: () => void;
  prev: () => void;
}

interface ShuffleServiceCardsProps {
  services: ServiceCardData[];
  onActiveChange?: (service: ServiceCardData) => void;
}

export const ShuffleServiceCards = React.forwardRef<
  ShuffleServiceCardsHandle,
  ShuffleServiceCardsProps
>(function ShuffleServiceCards({ services, onActiveChange }, ref) {
  const [queue, setQueue] = React.useState(() => services.map((_, i) => i));
  const [positions, setPositions] = React.useState<CardPosition[]>([
    "front",
    "middle",
    "back",
  ]);

  const frontSlot = positions.indexOf("front");
  const activeService = services[queue[frontSlot]];

  React.useEffect(() => {
    onActiveChange?.(activeService);
  }, [activeService, onActiveChange]);

  const handleShuffleNext = React.useCallback(() => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
    setQueue((prev) => {
      const next = [...prev];
      next.push(next.shift()!);
      return next;
    });
  }, []);

  const handleShufflePrev = React.useCallback(() => {
    setPositions((prev) => {
      const next = [...prev];
      next.push(next.shift()!);
      return next;
    });
    setQueue((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
  }, []);

  React.useImperativeHandle(ref, () => ({
    next: handleShuffleNext,
    prev: handleShufflePrev,
  }));

  const visibleCount = Math.min(3, services.length);

  return (
    <div className="relative mx-auto h-[420px] w-[320px] sm:h-[450px] sm:w-[350px]">
      {Array.from({ length: visibleCount }, (_, slot) => {
        const service = services[queue[slot]];
        return (
          <ServiceCard
            key={slot}
            {...service}
            handleShuffle={handleShuffleNext}
            position={positions[slot]}
          />
        );
      })}
    </div>
  );
});
