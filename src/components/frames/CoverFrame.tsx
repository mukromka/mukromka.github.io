"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { scrollToLayer } from "@/lib/site";
import { useWorkspace } from "@/lib/workspace";
import { Cursor, Frame, Gap, Pin, Tag } from "@/components/workspace/primitives";

const ease = [0.16, 1, 0.3, 1] as const;
const HEADLINE = "I design game UI, then build the game behind it.".split(" ");

const PROOF = [
  { value: "10K+", label: "users in 2 months", source: "Bos Gabut 2.0" },
  { value: "80K+", label: "downloads", source: "Mie Ayam Simulator" },
  { value: "15+", label: "games shipped", source: "Mobile and web" },
  { value: "13.4M", label: "reads", source: "Moon Flower webtoon" },
];

const words: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.55 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function CoverFrame() {
  const { annotations } = useWorkspace();

  return (
    <Frame id="cover" name="Cover / 1440" heading="Cover" bodyClassName="overflow-hidden">
      <div className="relative grid gap-10 px-5 pb-8 pt-10 sm:px-10 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:px-14">
        <div className="relative lg:col-span-7">
          <motion.p
            data-layer="Greeting"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.35 }}
            className="font-display text-xl font-bold text-azza-deep sm:text-2xl"
          >
            Hello! I&apos;m Azza.
          </motion.p>

          <div className="relative mt-2">
            {/* Intro selection box drawn around the headline */}
            {
              <motion.span
                aria-hidden
                initial={{ opacity: 0, clipPath: "inset(0 100% 100% 0)" }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  clipPath: ["inset(0 100% 100% 0)", "inset(0 0% 0% 0)", "inset(0 0% 0% 0)", "inset(0 0% 0% 0)"],
                }}
                transition={{ duration: 2.2, times: [0, 0.25, 0.8, 1], delay: 0.4, ease: "easeOut" }}
                className="pointer-events-none absolute -inset-2 border border-select motion-reduce:hidden"
              >
                {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((p) => (
                  <span key={p} className={`absolute h-2 w-2 border border-select bg-white ${p}`} />
                ))}
              </motion.span>
            }
            <motion.h1
              data-layer="H1 / Headline"
              variants={words}
              initial="hidden"
              animate="show"
              className="font-display text-[clamp(2.4rem,4.3vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-ink"
            >
              {HEADLINE.map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.22em] inline-block">
                  {w}
                </motion.span>
              ))}
            </motion.h1>
            <Tag className="-top-7 right-0" tone="redline" delay={0.2}>
              H1 · Baloo 2 · 800
            </Tag>
          </div>

          <Gap className="h-6 sm:h-8" />

          <p data-layer="Intro" className="max-w-[34rem] text-[17px] leading-[1.6] text-ink-mute">
            <span className="font-semibold text-ink">Mukrom Karunia Azza</span>, UI/UX designer and Unity game developer
            from Indonesia. 3+ years in games, 15+ mobile and web titles shipped, from Figma frames to the build in the
            store.
          </p>

          <Gap className="h-8" />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              data-layer="Button / Primary"
              onClick={() => scrollToLayer("work")}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-azza px-5 font-semibold text-white shadow-[0_4px_0_#B9521F] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#B9521F] active:translate-y-1 active:shadow-[0_0_0_#B9521F]"
            >
              See the work
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              data-layer="Button / Secondary"
              onClick={() => scrollToLayer("games")}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-ink/5 px-5 font-semibold text-ink ring-1 ring-inset ring-ink/10 transition-colors hover:bg-ink/10"
            >
              <Play className="h-4 w-4 fill-current" />
              Play 4 games here
            </button>
          </div>

          <Pin n={1} className="-left-3 top-8 sm:-left-7">
            This whole site is laid out like one of my design files. Press <b>A</b> to hide these notes, or hover
            anything to inspect it in the right panel.
          </Pin>
        </div>

        {/* Photo, selected like a layer */}
        <div className="relative mx-auto w-full max-w-[400px] self-end lg:col-span-5 lg:-mb-8 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.1 }}
            className="relative"
          >
            <div aria-hidden className="absolute inset-x-[6%] bottom-0 top-[22%] rounded-[28px] bg-azza" />
            <div
              aria-hidden
              className="absolute inset-x-[6%] bottom-0 top-[22%] rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]"
            />
            <img
              src="/hero.webp"
              alt="Portrait of Mukrom Karunia Azza"
              data-layer="Image / Portrait"
              className="relative mx-auto w-[88%] [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
            />
            {annotations && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-[6%] bottom-0 top-[4%] border border-select"
              >
                {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((p) => (
                  <span key={p} className={`absolute h-2 w-2 border border-select bg-white ${p}`} />
                ))}
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-select px-1.5 py-0.5 font-mono text-[10.5px] text-white">
                  Portrait.webp · 1200 × 1115
                </span>
              </span>
            )}
            <Tag className="left-0 top-[18%]" delay={1.5}>
              ◆ Figma
            </Tag>
            <Tag className="right-0 top-[34%]" delay={1.65}>
              ◆ Unity / C#
            </Tag>
            <Tag className="left-[2%] top-[60%]" delay={1.8}>
              ◆ Clip Studio Paint
            </Tag>
          </motion.div>
        </div>

        {/* Azza's cursor assembling the cover on load */}
        {
          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-30 hidden sm:block motion-reduce:!hidden"
            initial={{ left: "104%", top: "12%", opacity: 0 }}
            animate={{
              left: ["104%", "8%", "50%", "74%", "33%"],
              top: ["12%", "22%", "50%", "38%", "86%"],
              opacity: [0, 1, 1, 1, 1],
            }}
            transition={{ duration: 3.4, times: [0, 0.2, 0.45, 0.65, 1], ease: "easeInOut", delay: 0.2 }}
          >
            <Cursor name="Azza" color="#E8743B" />
          </motion.div>
        }
      </div>

      <dl className="grid grid-cols-2 border-t border-ink/10 sm:grid-cols-4">
        {PROOF.map((p, i) => (
          <div
            key={p.source}
            data-layer={`Stat / ${p.source}`}
            className={`flex flex-col-reverse gap-1.5 px-5 py-5 sm:px-6 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""} border-ink/10`}
          >
            <dt className="text-[13px] text-ink-mute">
              {p.label}
              <span className="block text-ink-faint">{p.source}</span>
            </dt>
            <dd className="font-display text-3xl font-extrabold leading-none text-ink tabular">{p.value}</dd>
          </div>
        ))}
      </dl>
    </Frame>
  );
}
