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
  images: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
  ],
};

export default function About() {
  return (
    <HeroSection
      id="about"
      title={ABOUT_DATA.title}
      subtitle={ABOUT_DATA.subtitle}
      actions={ABOUT_DATA.actions}
      stats={ABOUT_DATA.stats}
      images={ABOUT_DATA.images}
    />
  );
}
