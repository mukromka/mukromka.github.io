"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MOSAIC = [
  "/game 22.webp",
  "/archive-mbg.webp",
  "/game 18.webp",
  "/game 24.webp",
  "/archive-spike-the-beach.webp",
  "/game 17.webp",
  "/mie ayam simulator card.webp",
  "/game 15.webp",
  "/archive-bola-gila.webp",
  "/game 5.webp",
  "/archive-portal.webp",
  "/game 2.webp",
  "/game 23.webp",
  "/game 1.webp",
];

// Six tiles per column (offset so neighbours differ); each column is rendered twice for a seamless loop.
const COLUMNS = [0, 1, 2, 3, 4].map((c) =>
  Array.from({ length: 6 }, (_, i) => MOSAIC[(c * 3 + i * 5) % MOSAIC.length])
);

/** Drifting mosaic of shipped game art, used behind the hero and the contact section. */
export function GameMosaic({ fade, eager = false }: { fade: "top" | "bottom"; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Pause the drift whenever the mosaic is offscreen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", paused && "is-paused")}>
      <div className="absolute inset-[-12%]">
        <div className="flex h-full -rotate-[9deg] scale-110 gap-4 opacity-[0.38]">
          {COLUMNS.map((col, c) => (
            <div key={c} className="relative h-full flex-1 overflow-visible">
              <div
                className={cn(
                  "motion-loop flex flex-col gap-4",
                  c % 2 ? "animate-drift-slow" : "animate-drift",
                  c % 2 && "[animation-direction:reverse]"
                )}
              >
                {[...col, ...col].map((src, i) => (
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt=""
                    loading={eager && i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-media object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(75%_70%_at_50%_50%,rgba(15,22,49,0.95)_40%,rgba(15,22,49,0.78)_75%,rgba(15,22,49,0.6)_100%)]" />
      <div
        className={cn(
          "absolute inset-x-0 h-40 from-night to-transparent",
          fade === "bottom" ? "bottom-0 bg-gradient-to-t" : "top-0 bg-gradient-to-b"
        )}
      />
    </div>
  );
}
