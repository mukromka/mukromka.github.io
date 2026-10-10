"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";

const ease = [0.16, 1, 0.3, 1] as const;

export function LevelSelect() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const project = featuredProjects[index];
  const count = featuredProjects.length;

  const go = (next: number, focus = false) => {
    const wrapped = (next + count) % count;
    if (wrapped === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(wrapped);
    sound.playBlip(460 + wrapped * 50);
    if (focus) tabRefs.current[wrapped]?.focus();
  };

  const onTabKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1, true);
    else if (e.key === "ArrowLeft") go(index - 1, true);
    else if (e.key === "Home") go(0, true);
    else if (e.key === "End") go(count - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <section id="work" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Ambient wash from the selected project's art */}
      <AnimatePresence initial={false}>
        <motion.img
          key={project.image}
          src={project.image}
          alt=""
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full scale-125 object-cover blur-3xl saturate-150"
        />
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/60 to-night" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Featured work
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-dim">
              Four projects, from mobile game UI to a webtoon with 13.4M reads, and exactly what I did on each.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-2 text-sm font-medium text-dim tabular" aria-live="polite">
              {index + 1} of {count}
            </span>
            <StepButton label="Previous project" onClick={() => go(index - 1)}>
              <ArrowLeft className="h-4 w-4" />
            </StepButton>
            <StepButton label="Next project" onClick={() => go(index + 1)}>
              <ArrowRight className="h-4 w-4" />
            </StepButton>
          </div>
        </div>

        {/* Level tiles */}
        <div
          role="tablist"
          aria-label="Featured projects"
          onKeyDown={onTabKey}
          className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {featuredProjects.map((p, i) => {
            const active = i === index;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`level-tab-${p.id}`}
                aria-selected={active}
                aria-controls="level-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => go(i)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-media px-3 py-2.5 text-left transition-colors sm:p-2 sm:pr-3",
                  active ? "bg-panel" : "hover:bg-panel/60"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="level-cursor"
                    aria-hidden
                    className="absolute inset-0 rounded-media shadow-cursor"
                    transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  />
                )}
                <img
                  src={p.image}
                  alt=""
                  className={cn(
                    "hidden h-14 w-20 shrink-0 rounded-[9px] object-cover transition-[filter,opacity] duration-300 sm:block",
                    active ? "" : "opacity-70 grayscale-[40%] group-hover:opacity-100 group-hover:grayscale-0"
                  )}
                />
                <span className="min-w-0">
                  <span className={cn("block font-display leading-snug sm:truncate text-sm font-semibold sm:text-[15px]", active ? "text-ink" : "text-ink/80")}>
                    {p.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-dim sm:truncate sm:text-[13px]">{p.role}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div
          id="level-panel"
          role="tabpanel"
          aria-labelledby={`level-tab-${project.id}`}
          className="mt-8 grid items-start gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="relative aspect-[1400/955] overflow-hidden rounded-media bg-panel shadow-lift lg:col-span-7">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={project.id}
                src={project.image}
                alt={`${project.title} — ${project.subtitle}`}
                custom={direction}
                variants={{
                  enter: (d: number) =>
                    reduce
                      ? { opacity: 0 }
                      : { clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.06 },
                  center: { clipPath: "inset(0 0% 0 0%)", scale: 1, opacity: 1 },
                  exit: (d: number) =>
                    reduce ? { opacity: 0 } : { opacity: 0.4, x: d > 0 ? "-6%" : "6%", scale: 0.98 },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease, delay: 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="lg:col-span-5"
            >
              <h3 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{project.title}</h3>
              <p className="mt-2 text-lg text-dim">{project.subtitle}</p>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-5">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[13px] text-dim">{m.label}</dt>
                    <dd className="mt-1 font-display text-xl font-semibold tabular sm:text-2xl">{m.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 leading-relaxed text-ink/90">{project.description}</p>

              <ul className="mt-5 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed text-dim">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-cursor" />
                    {h}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-dim">My role</dt>
                  <dd className="mt-0.5 font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-dim">When</dt>
                  <dd className="mt-0.5 font-medium">{project.timeline}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="sr-only">Tools and disciplines</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[13px] text-dim">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPowerUp()}
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-control bg-cursor px-5 font-semibold text-cursor-ink transition-[filter,transform] hover:brightness-105 active:translate-y-px"
              >
                {project.playable ? <Play className="h-4 w-4 fill-current" /> : null}
                {project.linkText}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function StepButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-control border border-line text-ink transition-colors hover:border-cursor hover:text-cursor"
    >
      {children}
    </button>
  );
}
