"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { GameArchive } from "@/components/GameArchive";
import { SkillMatrix } from "@/components/SkillMatrix";
import { AboutMe } from "@/components/AboutMe";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { PlayfulEasterEgg } from "@/components/PlayfulEasterEgg";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-stone-50/40 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProofStrip />
        <FeaturedWork />
        <ExperienceTimeline />
        <GameArchive />
        <SkillMatrix />
        <AboutMe />
        <ContactCTA />
      </main>
      <Footer />
      <PlayfulEasterEgg />
    </div>
  );
}