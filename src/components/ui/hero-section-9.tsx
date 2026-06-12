"use client";

import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  className?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  image: string;
  imageAlt?: string;
  className?: string;
  id?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroSection = ({
  title,
  subtitle,
  actions,
  stats,
  image,
  imageAlt = "TrillioTek team collaborating in the studio",
  className,
  id,
}: HeroSectionProps) => {
  return (
    <section
      id={id}
      className={cn("relative w-full overflow-hidden bg-bone py-24 sm:py-32", className)}
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-cobalt/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-cyan/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt"
            variants={itemVariants}
          >
            About us
          </motion.span>
          <motion.h2
            className="font-display mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-graphite sm:text-lg"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
            variants={itemVariants}
          >
            {actions.map((action) => (
              <Button
                key={action.text}
                asChild
                variant={action.variant}
                size="lg"
                className={action.className}
              >
                <a href={action.href}>{action.text}</a>
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
            variants={itemVariants}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cobalt/10 text-cobalt">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-ink">
                    {stat.value}
                  </p>
                  <p className="text-sm text-graphite">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative aspect-square w-full sm:aspect-[4/5] lg:aspect-[5/6]">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-20 blur-3xl" />

            {/* Offset accent frame */}
            <motion.div
              className="pointer-events-none absolute -right-3 top-8 hidden h-[88%] w-[88%] rounded-[2rem] border border-cobalt/20 bg-cobalt/5 sm:block lg:-right-5 lg:top-10"
              variants={imageVariants}
              style={{ rotate: "4deg" }}
            />

            {/* Main image card */}
            <motion.div
              className="group relative h-full w-full overflow-hidden rounded-[2rem] border border-mist/80 bg-cream p-2 shadow-[0_32px_80px_-32px_rgba(10,10,10,0.28)] sm:rounded-[2.25rem] sm:p-2.5"
              variants={imageVariants}
              whileHover={{ rotate: 0, scale: 1.01 }}
              style={{ rotate: "-2deg" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]">
                <img
                  src={image}
                  alt={imageAlt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Floating chips */}
            <motion.div
              className="absolute -left-2 top-6 rounded-full border border-mist bg-cream/90 px-4 py-2 text-xs font-semibold text-ink shadow-lg backdrop-blur-sm sm:-left-4 sm:top-8"
              variants={floatingVariants}
              animate="animate"
            >
              <span className="text-brand-gradient">Est. 2024</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 right-4 flex items-center gap-2 rounded-2xl border border-mist bg-cream/95 px-4 py-3 shadow-[0_16px_40px_-20px_rgba(10,10,10,0.25)] backdrop-blur-sm sm:-bottom-4 sm:right-6"
              variants={floatingVariants}
              animate="animate"
              style={{ transitionDelay: "0.4s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cobalt/10 text-cobalt">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.8 5.7 21l2.3-7-6-4.6h7.6L12 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-ink">20+ clients</p>
                <p className="text-[11px] text-graphite">Across Globe</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-8 top-0 h-14 w-14 rounded-full bg-cobalt/15 sm:h-16 sm:w-16"
              variants={floatingVariants}
              animate="animate"
              style={{ transitionDelay: "0.8s" }}
            />
            <motion.div
              className="absolute bottom-1/3 left-0 h-5 w-5 rounded-full bg-cyan/30"
              variants={floatingVariants}
              animate="animate"
              style={{ transitionDelay: "1.2s" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
