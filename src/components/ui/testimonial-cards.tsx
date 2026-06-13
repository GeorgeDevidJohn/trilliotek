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
        "absolute left-0 top-0 grid h-[460px] w-[340px] select-none place-content-start overflow-hidden rounded-2xl border border-white/10 p-7 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.8)] sm:h-[500px] sm:w-[380px]",
        isFront && "cursor-grab active:cursor-grabbing"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40" />
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br blur-[60px]",
          accent
        )}
      />

      <div className="relative flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-cream shadow-lg backdrop-blur-sm">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-[1.65rem]">
          {title}
        </h3>
      </div>

      <p className="relative mt-4 line-clamp-3 text-base leading-relaxed text-white/85 sm:text-lg">
        {description}
      </p>

      <div className="relative mt-5 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-cyan sm:text-sm">
          {listLabel}
        </p>
        <ul className="mt-3 space-y-2">
          {items.slice(0, 4).map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-white/90 sm:text-base"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {isFront && (
        <p className="relative mt-4 text-center text-xs text-white/50 sm:text-sm">
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
    <div className="relative mx-auto h-[460px] w-[340px] sm:h-[500px] sm:w-[380px]">
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
