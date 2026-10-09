"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, BadgeCheck, Check, ChevronRight, Diamond, FileText } from "lucide-react";
import { awards, certifications, roleVariants, type Variant } from "@/data/skills";
import { CV_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Frame, Pin, Tag } from "@/components/workspace/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutFrame() {
  const [variant, setVariant] = useState<Variant>("uiux");
  const radios = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const v = roleVariants.find((r) => r.id === variant)!;

  const onKey = (e: KeyboardEvent) => {
    const i = roleVariants.findIndex((r) => r.id === variant);
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % roleVariants.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + roleVariants.length) % roleVariants.length;
    else return;
    e.preventDefault();
    setVariant(roleVariants[n].id);
    radios.current[n]?.focus();
  };

  return (
    <Frame id="about" name="About / ◆ Azza" heading="About me">
      <div className="relative p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              data-layer="H2 / Section"
              className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-[-0.02em]"
            >
              About me
            </h2>
            <p data-layer="Body / Bio" className="mt-4 max-w-[60ch] text-[17px] leading-[1.65] text-ink/85">
              I&apos;m a game artist who also builds games in Unity. I care about stylized visuals and clean, obvious
              UI, mostly for casual arcade and mini-games. Outside work I&apos;m part of the Surabaya game dev community
              and have helped organize Global Game Jam Surabaya since 2023.
            </p>
          </div>
          <p className="text-[15px] leading-relaxed text-ink-mute lg:col-span-5 lg:self-end">
            I&apos;m one person with three variants. Switch the <span className="font-semibold text-comp">Role</span>{" "}
            property to see each side of how I work.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          {/* Component set: dashed purple, like a real component set */}
          <div className="lg:col-span-7">
            <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-comp">
              <Diamond className="h-3 w-3 fill-current" aria-hidden />
              Azza, Role={v.label}
            </p>
            <div className="canvas-dots relative rounded-xl border border-dashed border-comp/70 p-3 sm:p-6">
              <motion.article
                layout={!reduce}
                data-layer={`◆ Azza / Role=${v.label}`}
                aria-live="polite"
                className="relative overflow-hidden rounded-2xl bg-white shadow-frame"
              >
                <motion.div
                  className="relative flex h-36 items-end justify-between overflow-hidden px-5 sm:h-40 sm:px-6"
                  animate={{ backgroundColor: v.color }}
                  transition={{ duration: 0.45, ease }}
                >
                  <div className="relative z-10 pb-4 text-white">
                    <p className="font-display text-2xl font-extrabold leading-none sm:text-[1.75rem]">
                      Mukrom Karunia Azza
                    </p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={v.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-[14px] font-medium text-white/90"
                      >
                        {v.label}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <img
                    src="/hero.webp"
                    alt=""
                    className="relative z-0 -mb-1 h-[118%] w-auto self-end object-contain object-bottom"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.3),transparent_50%)]"
                  />
                </motion.div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    className="p-5 sm:p-6"
                  >
                    <h3
                      data-layer="H3 / Variant headline"
                      className="font-display text-[1.7rem] font-extrabold leading-tight"
                    >
                      {v.headline}
                    </h3>
                    <p data-layer="Body" className="mt-2 leading-relaxed text-ink/80">
                      {v.body}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {v.does.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-[14px]">
                          <span
                            className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                            style={{ background: `${v.color}1F`, color: v.color }}
                          >
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
                      {v.tools.map((t) => (
                        <span key={t} className="rounded-md bg-ink/5 px-2 py-1 text-[13px] font-medium">
                          {t}
                        </span>
                      ))}
                      <span
                        className="ml-auto flex items-center gap-1.5 text-[13px] font-medium"
                        style={{ color: v.color }}
                      >
                        <BadgeCheck className="h-4 w-4" aria-hidden />
                        {v.proof}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.article>
              <Tag className="-bottom-3 right-4" tone="comp">
                Instance · auto layout · 24 padding
              </Tag>
            </div>
          </div>

          {/* Properties panel */}
          <div className="lg:col-span-5">
            <div data-layer="Properties panel" className="rounded-xl bg-[#F6F6F8] p-4 ring-1 ring-ink/10 sm:p-5">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold">
                <Diamond className="h-3.5 w-3.5 fill-comp text-comp" aria-hidden />
                Azza
                <span className="font-normal text-ink-faint">Main component</span>
              </p>

              <p id="role-prop" className="mt-5 text-[12px] font-medium text-ink-mute">
                Role
              </p>
              <div role="radiogroup" aria-labelledby="role-prop" onKeyDown={onKey} className="mt-2 space-y-1.5">
                {roleVariants.map((r, i) => {
                  const on = r.id === variant;
                  return (
                    <button
                      key={r.id}
                      ref={(el) => {
                        radios.current[i] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setVariant(r.id)}
                      className={cn(
                        "flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[14px] transition-colors",
                        on
                          ? "bg-white font-semibold shadow-sm ring-1 ring-black/5"
                          : "text-ink-mute hover:bg-white/60 hover:text-ink",
                      )}
                    >
                      <span
                        aria-hidden
                        className="grid h-4 w-4 place-items-center rounded-full border-2 transition-colors"
                        style={{ borderColor: on ? r.color : "#A6A6B0" }}
                      >
                        {on && <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.color }} />}
                      </span>
                      {r.label}
                      <span aria-hidden className="ml-auto h-3 w-3 rounded-sm" style={{ background: r.color }} />
                    </button>
                  );
                })}
              </div>

              <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-[14px]">
                {[
                  ["Experience", "3+ years in games"],
                  ["Based in", "Indonesia"],
                  ["Education", "PENS, Game Technology, 2023"],
                ].map(([k, val]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-2">
                    <dt className="text-ink-mute">{k}</dt>
                    <dd className="font-medium">{val}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <dt className="text-ink-mute">Status</dt>
                  <dd className="flex items-center gap-2 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    Open to work
                  </dd>
                </div>
              </dl>
            </div>

            {/* Vision, as a resolved comment thread */}
            <figure
              data-layer="Comment / Vision"
              className="mt-5 rounded-xl bg-white p-4 shadow-frame ring-1 ring-black/5"
            >
              <figcaption className="flex items-center gap-2 text-[13px]">
                <img src="/hero.webp" alt="" className="h-6 w-6 rounded-full bg-azza object-cover object-[50%_18%]" />
                <span className="font-semibold">Azza</span>
                <span className="text-ink-faint">pinned a comment</span>
              </figcaption>
              <blockquote className="mt-2.5 font-display text-[1.2rem] font-bold leading-snug">
                My vision is to create games that are meaningful and beneficial for as many people as possible:
                educating, inspiring and bringing joy beyond entertainment.
              </blockquote>
            </figure>
          </div>
        </div>

        {/* Collapsed group: a glimpse, not a section */}
        <details className="group mt-8 rounded-xl ring-1 ring-ink/10 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-3 text-[14px] font-medium hover:bg-ink/[0.03]">
            <ChevronRight className="h-4 w-4 text-ink-mute transition-transform group-open:rotate-90" aria-hidden />
            Awards and certifications
            <span className="font-normal text-ink-faint">
              {awards.length} awards, {certifications.length} certifications
            </span>
          </summary>
          <div className="grid gap-6 px-4 pb-5 pt-2 sm:grid-cols-2 sm:pl-10">
            <ul className="space-y-2.5">
              {awards.map((a) => (
                <li key={a.title} className="flex gap-2.5 text-[14px]">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-azza" aria-hidden />
                  <span>
                    <span className="font-semibold">{a.title}</span>
                    <span className="text-ink-mute">
                      , {a.event}, {a.year}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {certifications.map((c) => (
                <li key={c.title} className="flex gap-2.5 text-[14px]">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-select" aria-hidden />
                  <span>
                    <span className="font-semibold">{c.title}</span>
                    <span className="text-ink-mute">
                      , {c.by}, {c.year}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <a
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold ring-1 ring-ink/15 hover:bg-ink/5"
        >
          <FileText className="h-4 w-4" />
          Full CV (PDF)
        </a>

        <Pin n={5} className="right-4 top-4" align="right">
          Built like a real component: one main component, three Role variants. Switching the property swaps the
          instance, its colour and its content.
        </Pin>
      </div>
    </Frame>
  );
}
