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
  images: string[];
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
  images,
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
          className="relative mx-auto h-[400px] w-full max-w-lg sm:h-[500px] lg:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-cobalt/15"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-cyan/20"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "0.5s" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-amber/20"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "1s" }}
          />

          <motion.div
            className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl border border-mist bg-cream p-2 shadow-[0_24px_50px_-20px_rgba(10,10,10,0.15)] sm:h-64 sm:w-64"
            style={{ transformOrigin: "bottom center" }}
            variants={imageVariants}
          >
            <img
              src={images[0]}
              alt="Team collaboration"
              className="h-full w-full rounded-xl object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/3 h-40 w-40 rounded-2xl border border-mist bg-cream p-2 shadow-[0_24px_50px_-20px_rgba(10,10,10,0.15)] sm:h-56 sm:w-56"
            style={{ transformOrigin: "left center" }}
            variants={imageVariants}
          >
            <img
              src={images[1]}
              alt="Web development workspace"
              className="h-full w-full rounded-xl object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl border border-mist bg-cream p-2 shadow-[0_24px_50px_-20px_rgba(10,10,10,0.15)] sm:h-48 sm:w-48"
            style={{ transformOrigin: "top right" }}
            variants={imageVariants}
          >
            <img
              src={images[2]}
              alt="Digital business growth"
              className="h-full w-full rounded-xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
