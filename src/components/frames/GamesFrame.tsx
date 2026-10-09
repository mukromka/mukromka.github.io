"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Diamond, Play } from "lucide-react";
import { gamesData } from "@/data/games";
import type { GameItem } from "@/types";
import { cn } from "@/lib/utils";
import { Frame, Pin } from "@/components/workspace/primitives";
import { GameDialog } from "./GameDialog";

type Filter = "all" | "web" | "gamedev" | "uiux" | "art";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Playable" },
  { id: "gamedev", label: "Game dev" },
  { id: "uiux", label: "UI/UX" },
  { id: "art", label: "2D art" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function GamesFrame() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<GameItem | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const games = useMemo(() => gamesData.filter((g) => g.categories.includes(filter)), [filter]);
  const count = (f: Filter) => gamesData.filter((g) => g.categories.includes(f)).length;

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  return (
    <Frame id="games" name="Games library / ◆ GameCard set" heading="Games library">
      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              data-layer="H2 / Section"
              className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-[-0.02em]"
            >
              Games library
            </h2>
            <p data-layer="Body" className="mt-3 text-[16px] leading-relaxed text-ink-mute">
              {gamesData.length} games I&apos;ve shipped or jammed on, and what I did on each. {count("web")} of them
              are WebGL builds you can play right here.
            </p>
          </div>

          {/* Variant property, styled like a component property control */}
          <div className="w-full sm:w-auto">
            <p id="variant-label" className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-comp">
              <Diamond className="h-3 w-3 fill-current" aria-hidden />
              Show variant
            </p>
            <LayoutGroup id="games-filter">
              <div
                role="radiogroup"
                aria-labelledby="variant-label"
                className="flex flex-wrap gap-1 rounded-lg bg-ink/5 p-1"
              >
                {FILTERS.map((f) => {
                  const active = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setFilter(f.id)}
                      className={cn(
                        "relative inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-colors",
                        active ? "text-ink" : "text-ink-mute hover:text-ink",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="variant-pill"
                          className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-black/5"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      )}
                      <span className="relative">{f.label}</span>
                      <span className="relative font-mono text-[11px] text-ink-faint tabular">{count(f.id)}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
        </div>

        <motion.ul
          layout
          className="relative mt-8 grid grid-cols-1 gap-x-4 gap-y-7 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {games.map((g) => (
              <motion.li
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, ease }}
              >
                <button
                  type="button"
                  aria-haspopup="dialog"
                  data-layer={`◆ GameCard / ${g.title}`}
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setOpen(g);
                  }}
                  className="group relative block w-full text-left"
                >
                  <span className="pointer-events-none absolute -top-5 left-0 flex items-center gap-1 text-[11px] font-medium text-comp opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Diamond className="h-2.5 w-2.5 fill-current" aria-hidden />
                    GameCard / {g.isPlayableWeb ? "Playable" : "Store"}
                  </span>
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-ink/5 outline outline-1 outline-transparent transition-[outline-color] group-hover:outline-comp">
                    <img
                      src={g.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {g.isPlayableWeb && (
                      <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11.5px] font-semibold text-emerald-700 shadow-sm">
                        <Play className="h-3 w-3 fill-current" aria-hidden />
                        Play here
                      </span>
                    )}
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-display text-xl font-bold leading-tight">{g.title}</span>
                    <span className="shrink-0 text-[12px] text-ink-faint">{g.platform}</span>
                  </span>
                  <span className="mt-0.5 block text-[14px] text-ink-mute">{g.role}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Pin n={3} className="right-4 top-4" align="right">
          The cards are one component with a Playable and a Store variant. Playable ones open the real WebGL build in a
          dialog.
        </Pin>
      </div>
      <GameDialog game={open} onClose={close} />
    </Frame>
  );
}
