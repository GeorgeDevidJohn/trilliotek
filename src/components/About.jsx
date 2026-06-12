"use client";

import HeroSection from "@/components/ui/hero-section-9";
import { Globe, Rocket, TrendingUp } from "lucide-react";

const ABOUT_DATA = {
  title: (
    <>
      Giving every business a{" "}
      <span className="text-brand-gradient">digital face</span> that drives
      growth.
    </>
  ),
  subtitle:
    "TrillioTek was founded in 2024 and rebranded in 2026 as we expanded our vision. Today we serve 20+ clients around the globe — helping businesses build a strong online presence and generate quality leads. We're a growing team on a mission to make professional web solutions accessible, scalable, and results-driven.",
  actions: [
    {
      text: "Start a project",
      href: "#contact",
      variant: "default",
    },
    {
      text: "View our work",
      href: "#work",
      variant: "outline",
    },
  ],
  stats: [
    {
      value: "20+",
      label: "Clients worldwide",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      value: "2024",
      label: "Founded · Rebranded 2026",
      icon: <Rocket className="h-5 w-5" />,
    },
    {
      value: "Growing",
      label: "Team & vision",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ],
  image: "/about-team.png",
  imageAlt: "TrillioTek team collaborating on web solutions",
};

export default function About() {
  return (
    <HeroSection
      id="about"
      title={ABOUT_DATA.title}
      subtitle={ABOUT_DATA.subtitle}
      actions={ABOUT_DATA.actions}
      stats={ABOUT_DATA.stats}
      image={ABOUT_DATA.image}
      imageAlt={ABOUT_DATA.imageAlt}
    />
  );
}
