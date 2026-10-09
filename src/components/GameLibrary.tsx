"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Play } from "lucide-react";
import { gamesData } from "@/data/games";
import type { GameItem } from "@/types";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { GameDialog } from "./GameDialog";

type Filter = "all" | "gamedev" | "uiux" | "art" | "web";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Plays in browser" },
  { id: "gamedev", label: "Game dev" },
  { id: "uiux", label: "UI/UX" },
  { id: "art", label: "2D art" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function GameLibrary() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<GameItem | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const games = useMemo(() => gamesData.filter((g) => g.categories.includes(filter)), [filter]);
  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.id, gamesData.filter((g) => g.categories.includes(f.id)).length])),
    []
  );

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  return (
    <section id="games" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div>
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Game library
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-dim">
              Everything I&apos;ve shipped or jammed on, with what I did on each. The {counts.web} browser builds open
              and play right here.
            </p>
          </div>

          <LayoutGroup id="library-filters">
            <div
              role="radiogroup"
              aria-label="Filter games"
              className="mt-8 flex flex-wrap gap-1.5"
            >
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setFilter(f.id);
                      sound.playBlip(560);
                    }}
                    className={cn(
                      "relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
                      active ? "text-cursor-ink" : "text-dim hover:text-ink"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-cursor"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                    {!active && <span className="absolute inset-0 rounded-full border border-line" aria-hidden />}
                    <span className="relative">{f.label}</span>
                    <span className={cn("relative tabular", active ? "text-cursor-ink/70" : "text-dim/80")}>
                      {counts[f.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul layout className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {games.map((game) => (
              <motion.li
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ duration: 0.45, ease }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setOpen(game);
                    sound.playPop();
                  }}
                  aria-haspopup="dialog"
                  className="group block w-full rounded-media text-left focus-visible:outline-offset-4"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-media bg-panel ring-1 ring-line/60 transition-shadow duration-300 group-hover:shadow-cursor">
                    <img
                      src={game.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    {game.isPlayableWeb && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-night/85 px-2.5 py-1 text-xs font-semibold text-go">
                        <Play className="h-3 w-3 fill-current" aria-hidden />
                        Plays in browser
                      </span>
                    )}
                  </span>
                  <span className="mt-4 flex items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-semibold tracking-tight">{game.title}</span>
                      <span className="mt-1 block text-sm text-dim">{game.role}</span>
                    </span>
                    <span className="shrink-0 pt-1 text-xs font-medium text-dim">{game.platform}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <GameDialog game={open} onClose={close} />
    </section>
  );
}
