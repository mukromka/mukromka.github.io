"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiencesData } from "@/data/experiences";

export function CareerLog() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="career" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Career
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-dim">
              From colouring webtoon panels to shipping Unity games: every role added a layer to how I build for
              players.
            </p>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-8">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-cursor"
          />
          {experiencesData.map((job, i) => (
            <li key={job.id} className="relative pb-14 pl-10 last:pb-0 sm:pl-12">
              <motion.span
                aria-hidden
                initial={{ backgroundColor: "#0F1631", borderColor: "#2C3A78" }}
                whileInView={{ backgroundColor: "#FFC93C", borderColor: "#FFC93C" }}
                viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-dim">
                <span className="tabular font-medium text-ink/90">{job.period}</span>
                <span>{job.type}</span>
                {i === 0 && <span className="rounded-full bg-go/15 px-2 py-0.5 text-xs font-semibold text-go">Now</span>}
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
              <p className="mt-1 text-dim">{job.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink/90">{job.description}</p>
              <ul className="mt-4 max-w-2xl space-y-2">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-3 leading-relaxed text-dim">
                    <span aria-hidden className="mt-[0.65em] h-1 w-3 shrink-0 rounded-full bg-line" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-dim">
                <span className="sr-only">Skills: </span>
                {job.skills.join(", ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
