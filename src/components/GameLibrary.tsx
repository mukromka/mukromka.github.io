"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Gamepad2, Globe, Play, type LucideIcon } from "lucide-react";
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

const KINDS: { id: Kind; label: string; icon: LucideIcon; items: GameItem[] }[] = [
  { id: "games", label: "Games", icon: Gamepad2, items: gamesData },
  { id: "websites", label: "Websites", icon: Globe, items: websitesData },
  { id: "webtoon", label: "Webtoon", icon: BookOpen, items: webtoonsData },
];

const ease = [0.16, 1, 0.3, 1] as const;

// Columns match the grid's breakpoints (sm 2, lg 3, xl 4) so a page is always two full rows.
function usePageSize() {
  const [size, setSize] = useState(8);
  useEffect(() => {
    const queries = ["(min-width: 1280px)", "(min-width: 1024px)", "(min-width: 640px)"].map((q) =>
      window.matchMedia(q)
    );
    const update = () => {
      const cols = queries[0].matches ? 4 : queries[1].matches ? 3 : queries[2].matches ? 2 : 1;
      setSize(cols === 1 ? 4 : cols * 2);
    };
    update();
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);
  return size;
}

export function GameLibrary() {
  const [kind, setKind] = useState<Kind>("games");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<GameItem | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const grid = useRef<HTMLUListElement>(null);
  const pageSize = usePageSize();
  const [page, setPage] = useState(0);

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

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const shown = items.slice(current * pageSize, (current + 1) * pageSize);

  useEffect(() => setPage(0), [kind, filter]);

  const goTo = (next: number) => {
    setPage(next);
    sound.playBlip(next > current ? 640 : 520);
    const top = grid.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollBy({ top: top - 120, behavior: "smooth" });
  };

  const select = (id: Kind) => {
    setKind(id);
    sound.playBlip(id === "games" ? 520 : id === "websites" ? 600 : 680);
  };

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  return (
    <section id="games" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Project library
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-dim">
                Games I&apos;ve shipped, websites I&apos;ve designed and built end to end, and webtoons I&apos;ve
                written and coloured.
              </p>
            </div>
            <LayoutGroup id="kind-segment">
              <div
                role="tablist"
                aria-label="Project type"
                className="grid shrink-0 grid-cols-3 rounded-full bg-panel p-1 ring-1 ring-line/70 md:flex"
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  const i = KINDS.findIndex((k) => k.id === kind);
                  const next = KINDS[(i + (e.key === "ArrowRight" ? 1 : KINDS.length - 1)) % KINDS.length];
                  select(next.id);
                  document.getElementById(`library-tab-${next.id}`)?.focus();
                }}
              >
                {KINDS.map(({ id, label, icon: Icon, items: list }) => {
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
                      onClick={() => select(id)}
                      className={cn(
                        "relative flex h-10 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors sm:gap-2 sm:px-5",
                        active ? "text-cursor-ink" : "text-dim hover:text-ink"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="kind-segment-pill"
                          className="absolute inset-0 rounded-full bg-cursor"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      )}
                      <Icon className="relative hidden h-4 w-4 sm:block" aria-hidden />
                      <span className="relative">{label}</span>
                      <span className={cn("relative tabular", active ? "text-cursor-ink/70" : "text-dim/70")}>
                        {list.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {kind === "games" && (
            <LayoutGroup id="library-filters">
              <div role="radiogroup" aria-label="Filter games" className="mt-8 flex flex-wrap gap-1.5">
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
          ref={grid}
          layout
          id="library-panel"
          role="tabpanel"
          aria-labelledby={`library-tab-${kind}`}
          className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((game) => (
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

        {pageCount > 1 && (
          <nav aria-label="Library pages" className="mt-12 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-dim tabular">
              {current * pageSize + 1}–{Math.min((current + 1) * pageSize, items.length)} of {items.length}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                aria-label="Previous page"
                className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-cursor hover:text-cursor disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === current ? "page" : undefined}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full text-sm font-semibold tabular transition-colors",
                    i === current ? "bg-cursor text-cursor-ink" : "text-dim hover:text-ink"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === pageCount - 1}
                aria-label="Next page"
                className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-cursor hover:text-cursor disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </nav>
        )}
      </div>

      <GameDialog game={open} onClose={close} />
    </section>
  );
}
