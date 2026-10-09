"use client";

import { MotionConfig } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { TitleScreen } from "@/components/TitleScreen";
import { LevelSelect } from "@/components/LevelSelect";
import { GameLibrary } from "@/components/GameLibrary";
import { CareerLog } from "@/components/CareerLog";
import { AboutSheet } from "@/components/AboutSheet";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only z-50 rounded-control bg-cursor px-4 py-2 font-semibold text-cursor-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <TitleScreen />
        <LevelSelect />
        <GameLibrary />
        <CareerLog />
        <AboutSheet />
        <Contact />
      </main>
    </MotionConfig>
  );
}
