"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { scrollToSection } from "@/lib/site";

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

const PROOF = [
  { value: "80K+", label: "Mie Ayam Simulator downloads" },
  { value: "10K+", label: "Bos Gabut users in 2 months" },
  { value: "13.4M", label: "Moon Flower webtoon reads" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const boot: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function TitleScreen() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  // Pause the drifting background once the hero is offscreen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className={cn("relative isolate flex min-h-[100svh] items-center overflow-hidden", paused && "is-paused")}
    >
      {/* Drifting mosaic of shipped game art */}
      <div aria-hidden className="pointer-events-none absolute inset-[-12%] -z-20">
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
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-media object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(75%_70%_at_50%_50%,rgba(15,22,49,0.95)_40%,rgba(15,22,49,0.78)_75%,rgba(15,22,49,0.6)_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-night to-transparent" />

      <motion.div
        variants={boot}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-16 pt-24 text-center sm:px-6"
      >
        <motion.h1
          variants={rise}
          className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]"
        >
          <span className="block">Hi, I&apos;m Azza.</span>
          <span className="block">I design games</span>
          <span className="block">for mobile.</span>
        </motion.h1>

        <motion.p variants={rise} className="mt-6 max-w-[38rem] text-lg leading-relaxed text-dim sm:text-xl">
          Unity developer and UI/UX designer from Indonesia. I design the screens players tap through, then build the
          game behind them, across 15+ mobile and web titles.
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playPowerUp();
              scrollToSection("work");
            }}
            className="inline-flex h-12 items-center gap-2 rounded-control bg-cursor px-6 font-semibold text-cursor-ink transition-[filter,transform] hover:brightness-105 active:translate-y-px"
          >
            View work
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              scrollToSection("contact");
            }}
            className="inline-flex h-12 items-center rounded-control border border-line bg-night/60 px-6 font-semibold transition-colors hover:border-cursor hover:text-cursor"
          >
            Get in touch
          </button>
        </motion.div>

        <motion.dl
          variants={rise}
          className="mt-14 grid w-full max-w-2xl grid-cols-3 divide-x divide-line border-t border-line pt-6"
        >
          {PROOF.map((p) => (
            <div key={p.label} className="flex flex-col-reverse justify-end gap-1 px-2">
              <dt className="text-[13px] leading-snug text-dim sm:text-sm">{p.label}</dt>
              <dd className="font-display text-xl font-bold tabular sm:text-2xl">{p.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
