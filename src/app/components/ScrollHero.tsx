"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";

const TOTAL_FRAMES = 241;

const getFramePath = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `/sequence/ezgif-frame-${padded}.jpg`;
};

function getPhaseStyle(
  progress: number,
  phaseStart: number,
  phaseEnd: number
): { opacity: number; y: number } {
  const fadeDuration = 0.05;
  const holdStart = phaseStart + fadeDuration;
  const fadeOutStart = phaseEnd - fadeDuration;

  if (progress < phaseStart) return { opacity: 0, y: 30 };
  if (progress < holdStart) {
    const t = (progress - phaseStart) / fadeDuration;
    return { opacity: t, y: 30 * (1 - t) };
  }
  if (progress < fadeOutStart) return { opacity: 1, y: 0 };
  if (progress < phaseEnd) {
    const t = (progress - fadeOutStart) / fadeDuration;
    return { opacity: 1 - t, y: -30 * t };
  }
  return { opacity: 0, y: -30 };
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  if (!imgW || !imgH || !width || !height) return;

  // object-fit: cover — scale to fill, center-crop on both axes
  const scale = Math.max(width / imgW, height / imgH);
  const drawWidth = imgW * scale;
  const drawHeight = imgH * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const isLoadedRef = useRef(false);
  const rafRef = useRef(0);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const progress = useScrollProgress(sectionRef);
  const phase1 = getPhaseStyle(progress, 0.75, 1);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img?.complete || img.naturalWidth === 0) return;

    // Use CSS pixel dimensions — ctx is scaled by DPR in resizeCanvas
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;

    ctx.clearRect(0, 0, width, height);
    drawCover(ctx, img, width, height);
  }, []);

  const scheduleDraw = useCallback(() => {
    if (!isLoadedRef.current) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const newFrame = frameRef.current;
      if (newFrame !== lastDrawnFrameRef.current) {
        lastDrawnFrameRef.current = newFrame;
        drawFrame(newFrame);
      }
    });
  }, [drawFrame]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    lastDrawnFrameRef.current = -1;
    scheduleDraw();
  }, [scheduleDraw]);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const onFirstLoad = () => {
      if (!cancelled && canvasRef.current) {
        lastDrawnFrameRef.current = -1;
        drawFrame(0);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i + 1);
      images[i] = img;

      const handleLoad = () => {
        if (cancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === 1) onFirstLoad();
        if (loaded === TOTAL_FRAMES) {
          isLoadedRef.current = true;
          setIsLoaded(true);
          lastDrawnFrameRef.current = -1;
          scheduleDraw();
        }
      };

      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
        img.onerror = handleLoad;
      }
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [drawFrame, scheduleDraw]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el || !isLoadedRef.current) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollable = el.offsetHeight - window.innerHeight;

      if (scrollable <= 0) return;

      const raw = (window.scrollY - sectionTop) / scrollable;
      const clamped = Math.min(1, Math.max(0, raw));
      frameRef.current = Math.round(clamped * (TOTAL_FRAMES - 1));
      scheduleDraw();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleDraw]);

  const loadProgress = loadedCount / TOTAL_FRAMES;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative"
      style={{ height: "500vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />

        <div className="overlay absolute inset-0 z-[1] bg-black/30" />

        <div className="text-layers pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            className="pointer-events-auto flex max-w-4xl flex-col items-center"
            animate={{ opacity: phase1.opacity, y: phase1.y }}
            transition={{ duration: 0, ease: "linear" }}
          >
           

            <h1 className="max-w-4xl font-display text-4xl font-black text-white md:text-5xl">
              Ready to build something that works as hard as you do?
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Let&apos;s design, engineer, and launch your next-generation
              website — together.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream shadow-[0_8px_30px_rgba(10,10,10,0.3)] transition-all duration-300 hover:bg-cobalt hover:shadow-[0_8px_30px_rgba(138,43,226,0.35)]"
              >
                Start a project
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                View our work
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {!isLoaded && (
          <div className="absolute inset-x-0 bottom-0 z-[3] px-6 pb-8">
            <div className="mx-auto max-w-md">
              <div className="mb-2 flex justify-between text-xs font-medium text-white/60">
                <span>Loading sequence</span>
                <span>{Math.round(loadProgress * 100)}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-cobalt transition-[width] duration-150 ease-out"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-cream via-cream/60 to-transparent"
          aria-hidden
        />
      </div>
    </section>
  );
}
