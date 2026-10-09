"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { scrollToSection } from "@/lib/site";
import { gamesData } from "@/data/games";

const MENU = [
  { label: "Play the games", hint: "14 titles, 4 run right in your browser", target: "games" },
  { label: "Featured work", hint: "Bos Gabut, Mie Ayam Simulator, Game Portal, Moon Flower", target: "work" },
  { label: "Career", hint: "Four studios since 2020", target: "career" },
  { label: "About me", hint: "Skills, education and how I work", target: "about" },
  { label: "Get in touch", hint: "Email, WhatsApp or LinkedIn", target: "contact" },
];

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

const ease = [0.16, 1, 0.3, 1] as const;

const boot: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

const line: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

export function TitleScreen() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const mosaicX = useTransform(sx, (v) => v * -24);
  const mosaicY = useTransform(sy, (v) => v * -16);
  const photoX = useTransform(sx, (v) => v * 10);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const choose = (index: number) => {
    if (index === selected) return;
    setSelected(index);
    sound.playBlip(380 + index * 60);
  };

  const confirm = (index: number) => {
    sound.playPowerUp();
    scrollToSection(MENU[index].target);
  };

  const onMenuKey = (e: KeyboardEvent<HTMLUListElement>) => {
    const last = MENU.length - 1;
    let next = selected;
    if (e.key === "ArrowDown") next = selected === last ? 0 : selected + 1;
    else if (e.key === "ArrowUp") next = selected === 0 ? last : selected - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    choose(next);
    itemRefs.current[next]?.focus();
  };

  const playable = gamesData.filter((g) => g.isPlayableWeb).length;

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className={cn("relative isolate flex min-h-[100svh] items-center overflow-hidden", paused && "is-paused")}
    >
      {/* Drifting mosaic of shipped game art */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{ x: mosaicX, y: mosaicY }}
        className="pointer-events-none absolute inset-[-12%] -z-20"
      >
        <div className="flex h-full -rotate-[9deg] scale-110 gap-4 opacity-[0.42]">
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
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_20%_45%,rgba(15,22,49,0.93)_35%,rgba(15,22,49,0.72)_70%,rgba(15,22,49,0.55)_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-night to-transparent" />

      {/* Player photo */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease, delay: 0.5 }}
        style={{ x: photoX }}
        className="pointer-events-none absolute bottom-0 right-[-4%] -z-10 hidden w-[min(48vw,700px)] lg:block xl:right-[2%]"
      >
        <img
          src="/hero.webp"
          alt=""
          className="w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
        />
      </motion.div>

      <motion.div
        variants={boot}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pb-24"
      >
        <div className="max-w-[44rem]">
          <motion.p variants={rise} className="mb-6 flex items-center gap-2.5 text-sm font-medium text-dim">
            <span className="relative flex h-2.5 w-2.5">
              <span className="motion-loop absolute inline-flex h-full w-full animate-ping rounded-full bg-go opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-go" />
            </span>
            Open to game dev and UI/UX projects
          </motion.p>

          <h1 className="font-display text-[clamp(2.5rem,7.4vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={line} className="block">
                Mukrom Karunia
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={line} className="block">
                Azza
              </motion.span>
            </span>
          </h1>

          <motion.p variants={rise} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-dim sm:text-xl">
            Game developer and UI/UX designer from Indonesia. I build Unity games for mobile and web, and design
            the screens players tap through. 15+ titles shipped.
          </motion.p>

          <motion.nav variants={rise} aria-label="Start menu" className="mt-10">
            <ul role="menu" aria-orientation="vertical" onKeyDown={onMenuKey} className="flex max-w-md flex-col gap-1">
              {MENU.map((item, i) => {
                const isSel = selected === i;
                return (
                  <li key={item.target} role="none">
                    <button
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      type="button"
                      role="menuitem"
                      tabIndex={isSel ? 0 : -1}
                      onMouseEnter={() => choose(i)}
                      onFocus={() => choose(i)}
                      onClick={() => confirm(i)}
                      aria-describedby={`menu-hint-${i}`}
                      className="group relative flex w-full items-center gap-3 rounded-control px-4 py-3 text-left outline-offset-2"
                    >
                      {isSel && (
                        <motion.span
                          layoutId="title-cursor"
                          className="absolute inset-0 rounded-control bg-cursor"
                          transition={{ type: "spring", stiffness: 520, damping: 38 }}
                        />
                      )}
                      <Play
                        aria-hidden
                        className={cn(
                          "relative h-4 w-4 shrink-0 transition-[opacity,transform] duration-200",
                          isSel ? "translate-x-0 fill-cursor-ink text-cursor-ink opacity-100" : "-translate-x-1 opacity-0"
                        )}
                      />
                      <span className="relative flex min-w-0 flex-1 items-baseline justify-between gap-4">
                        <span
                          className={cn(
                            "font-display text-lg font-semibold tracking-tight transition-colors duration-150 sm:text-xl",
                            isSel ? "text-cursor-ink" : "text-ink"
                          )}
                        >
                          {item.label}
                        </span>
                        {item.target === "games" && (
                          <span
                            className={cn(
                              "shrink-0 text-sm font-medium tabular transition-colors",
                              isSel ? "text-cursor-ink/75" : "text-go"
                            )}
                          >
                            {playable} playable
                          </span>
                        )}
                      </span>
                      <span id={`menu-hint-${i}`} className="sr-only">
                        {item.hint}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex min-h-[1.5rem] max-w-md items-center justify-between gap-4 px-4 text-sm text-dim">
              <motion.span
                key={selected}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden
              >
                {MENU[selected].hint}
              </motion.span>
              <span className="hidden shrink-0 items-center gap-1.5 md:flex" aria-hidden>
                <Key>↑</Key>
                <Key>↓</Key>
                <Key wide>Enter</Key>
              </span>
            </div>
          </motion.nav>
        </div>
      </motion.div>
    </section>
  );
}

function Key({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={cn(
        "inline-grid h-6 place-items-center rounded-md border border-line border-b-[3px] bg-panel font-sans text-[11px] font-semibold text-ink",
        wide ? "px-2" : "w-6"
      )}
    >
      {children}
    </kbd>
  );
}
