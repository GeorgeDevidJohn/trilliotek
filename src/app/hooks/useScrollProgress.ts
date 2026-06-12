"use client";

import { useEffect, useState, type RefObject } from "react";

export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = el.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollable = sectionHeight - windowHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const raw = (window.scrollY - sectionTop) / scrollable;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}
