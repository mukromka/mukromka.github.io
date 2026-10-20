"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { BookOpen, Gamepad2, Globe, Play, type LucideIcon } from "lucide-react";
import { gamesData } from "@/data/games";
import { webtoonsData } from "@/data/webtoons";
import { websitesData } from "@/data/websites";
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

type Kind = "games" | "websites" | "webtoon";

const KINDS: { id: Kind; label: string; icon: LucideIcon; items: GameItem[]; blurb: string }[] = [
  { id: "games", label: "Games", icon: Gamepad2, items: gamesData, blurb: "Mobile, PC and browser" },
  { id: "websites", label: "Websites", icon: Globe, items: websitesData, blurb: "Web apps and sites" },
  { id: "webtoon", label: "Webtoon", icon: BookOpen, items: webtoonsData, blurb: "Story and base colour" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function GameLibrary() {
  const [kind, setKind] = useState<Kind>("games");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<GameItem | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () =>
      kind === "games"
        ? gamesData.filter((g) => g.categories.includes(filter))
        : KINDS.find((k) => k.id === kind)!.items,
    [kind, filter]
  );
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
              Project library
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-dim">
              {kind === "games" ? (
                <>
                  Everything I&apos;ve shipped or jammed on, with what I did on each. The {counts.web} browser builds
                  open and play right here.
                </>
              ) : kind === "websites" ? (
                "Platforms and sites I've designed and built, from the first screen to the database behind it."
              ) : (
                "Comics on LINE Webtoon where I worked with the webtoonist on story, scripts, and base colours."
              )}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Project type"
            className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:max-w-3xl"
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const i = KINDS.findIndex((k) => k.id === kind);
              const next = KINDS[(i + (e.key === "ArrowRight" ? 1 : KINDS.length - 1)) % KINDS.length];
              setKind(next.id);
              document.getElementById(`library-tab-${next.id}`)?.focus();
            }}
          >
            {KINDS.map(({ id, label, icon: Icon, items: list, blurb }) => {
              const active = kind === id;
              return (
                <button
                  key={id}
                  id={`library-tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="library-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    setKind(id);
                    sound.playBlip(id === "games" ? 520 : id === "websites" ? 600 : 680);
                  }}
                  className={cn(
                    "flex flex-col items-start gap-3 rounded-media p-3.5 text-left ring-1 transition-[background-color,box-shadow,color] sm:flex-row sm:items-center sm:p-4",
                    active
                      ? "bg-raised shadow-cursor ring-transparent"
                      : "bg-panel/60 ring-line/70 hover:bg-panel hover:ring-line"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-control transition-colors",
                      active ? "bg-cursor text-cursor-ink" : "bg-raised text-dim"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-base font-semibold tracking-tight sm:text-lg">{label}</span>
                      <span className={cn("tabular text-sm", active ? "text-cursor" : "text-dim/80")}>
                        {list.length}
                      </span>
                    </span>
                    <span className="mt-0.5 hidden text-sm text-dim sm:block">{blurb}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {kind === "games" && (
            <LayoutGroup id="library-filters">
              <div role="radiogroup" aria-label="Filter games" className="mt-6 flex flex-wrap gap-1.5">
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
          )}
        </div>

        <motion.ul
          layout
          id="library-panel"
          role="tabpanel"
          aria-labelledby={`library-tab-${kind}`}
          className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((game) => (
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
