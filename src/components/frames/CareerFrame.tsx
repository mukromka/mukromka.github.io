"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiencesData } from "@/data/experiences";
import { cn } from "@/lib/utils";
import { Frame, Pin } from "@/components/workspace/primitives";

const MIN = 2019.5;
const NOW = 2026.8;
const MAX = 2027;
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
const pct = (y: number) => ((y - MIN) / (MAX - MIN)) * 100;
const ease = [0.16, 1, 0.3, 1] as const;

export function CareerFrame() {
  const [selected, setSelected] = useState(experiencesData[0].id);

  return (
    <Frame id="career" name="Career / Timeline" heading="Career timeline">
      <div className="relative p-5 sm:p-8">
        <h2
          data-layer="H2 / Section"
          className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-[-0.02em]"
        >
          Career timeline
        </h2>
        <p data-layer="Body" className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-mute">
          Six years from webtoon scripts to shipping game UI. Select a bar to read what I did there.
        </p>

        <div className="relative mt-10">
          {/* Year axis */}
          <div aria-hidden className="relative ml-0 h-6 border-b border-ink/10 text-[11px] text-ink-faint">
            {YEARS.map((y) => (
              <span key={y} className="absolute -translate-x-1/2 font-mono tabular" style={{ left: `${pct(y)}%` }}>
                <span className={cn(y % 2 && "hidden sm:inline")}>{y}</span>
              </span>
            ))}
          </div>

          <div className="relative">
            {/* Grid lines and today marker */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {YEARS.map((y) => (
                <span key={y} className="absolute inset-y-0 w-px bg-ink/[0.06]" style={{ left: `${pct(y)}%` }} />
              ))}
              <span className="absolute inset-y-0 w-px bg-redline" style={{ left: `${pct(NOW)}%` }}>
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded bg-redline px-1 font-mono text-[10px] text-white">
                  now
                </span>
              </span>
            </div>

            <ul className="relative">
              {experiencesData.map((job) => {
                const isSel = selected === job.id;
                const start = pct(job.start);
                const width = pct(job.end ?? NOW) - start;
                return (
                  <li key={job.id} className="border-b border-ink/[0.06] last:border-b-0">
                    <button
                      type="button"
                      aria-expanded={isSel}
                      aria-controls={`job-${job.id}`}
                      onClick={() => setSelected(job.id)}
                      data-layer={`Bar / ${job.company}`}
                      className="group relative block w-full py-3 text-left"
                    >
                      <span className="flex flex-wrap items-baseline gap-x-2 text-[14px]">
                        <span className={cn("font-semibold", isSel ? "text-ink" : "text-ink/80")}>{job.role}</span>
                        <span className="text-ink-mute">{job.company}</span>
                      </span>
                      <span className="relative mt-2 block h-3">
                        <motion.span
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{ duration: 0.8, ease }}
                          className={cn(
                            "absolute inset-y-0 origin-left rounded-full transition-[box-shadow]",
                            isSel
                              ? "ring-2 ring-select ring-offset-2"
                              : "group-hover:ring-2 group-hover:ring-select/40 group-hover:ring-offset-2",
                          )}
                          style={{
                            left: `${start}%`,
                            width: `max(${width}%, 10px)`,
                            background:
                              job.type === "Education"
                                ? `repeating-linear-gradient(135deg, ${job.color}, ${job.color} 4px, ${job.color}88 4px, ${job.color}88 8px)`
                                : job.color,
                          }}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isSel && (
                        <motion.div
                          id={`job-${job.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <div className="relative z-10 grid gap-4 bg-white pb-5 pt-1 sm:grid-cols-[10rem_1fr]">
                            <p className="text-[13px] text-ink-mute">
                              <span className="block font-mono text-ink tabular">{job.period}</span>
                              {job.type}
                            </p>
                            <div>
                              <p className="leading-relaxed">{job.description}</p>
                              {job.achievements.length > 0 && (
                                <ul className="mt-3 space-y-1.5 text-[14px] text-ink/80">
                                  {job.achievements.map((a) => (
                                    <li key={a} className="flex gap-2.5">
                                      <span
                                        aria-hidden
                                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{ background: job.color }}
                                      />
                                      {a}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <p className="mt-3 text-[13px] text-ink-faint">{job.skills.join(", ")}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <Pin n={4} className="right-4 top-4" align="right">
          One bar per role. The overlaps are real: I studied, assisted in the game lab and co-wrote a webtoon at the
          same time.
        </Pin>
      </div>
    </Frame>
  );
}
