"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { WorkspaceProvider } from "@/lib/workspace";
import { Toolbar } from "@/components/workspace/Toolbar";
import { LayersPanel } from "@/components/workspace/LayersPanel";
import { Inspector } from "@/components/workspace/Inspector";
import { Canvas } from "@/components/workspace/Canvas";
import { CoverFrame } from "@/components/frames/CoverFrame";
import { WorkSection } from "@/components/frames/WorkSection";
import { GamesFrame } from "@/components/frames/GamesFrame";
import { CareerFrame } from "@/components/frames/CareerFrame";
import { AboutFrame } from "@/components/frames/AboutFrame";
import { HandoffFrame } from "@/components/frames/HandoffFrame";

export default function Home() {
  const [layersOpen, setLayersOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <WorkspaceProvider>
        <a
          href="#work"
          className="sr-only z-[70] rounded-md bg-select px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-14"
        >
          Skip to work
        </a>
        <Toolbar onOpenLayers={() => setLayersOpen(true)} />
        <LayersPanel open={layersOpen} onClose={() => setLayersOpen(false)} />
        <Inspector />
        <Canvas>
          <div className="mx-auto max-w-[1080px] space-y-24 px-3 pb-24 pt-8 sm:space-y-32 sm:px-8 sm:pt-12">
            <CoverFrame />
            <WorkSection />
            <GamesFrame />
            <CareerFrame />
            <AboutFrame />
            <HandoffFrame />
            <footer className="flex flex-wrap items-center justify-between gap-3 text-[12px] text-ink-mute">
              <p>© {new Date().getFullYear()} Mukrom Karunia Azza. Designed as a design file, built with Next.js.</p>
              <a href="#cover" className="font-medium hover:text-ink">
                Back to the cover
              </a>
            </footer>
          </div>
        </Canvas>
      </WorkspaceProvider>
    </MotionConfig>
  );
}
