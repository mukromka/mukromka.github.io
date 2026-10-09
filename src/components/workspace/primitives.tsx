"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Frame as FrameIcon } from "lucide-react";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const box = e.borderBoxSize?.[0];
      setSize({
        w: Math.round(box ? box.inlineSize : e.contentRect.width),
        h: Math.round(box ? box.blockSize : e.contentRect.height),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

/** A frame on the canvas: name label above, live size readout, white artboard. */
export function Frame({
  id,
  name,
  children,
  className,
  bodyClassName,
  heading,
}: {
  id?: string;
  name: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Visible heading for assistive tech when the frame has no h2 inside. */
  heading?: string;
}) {
  const { annotations } = useWorkspace();
  const [ref, size] = useSize<HTMLDivElement>();
  return (
    <section id={id} aria-label={heading} className={cn("scroll-mt-16", className)}>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-[12px] text-ink-mute">
        <span className="flex min-w-0 items-center gap-1.5">
          <FrameIcon className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{name}</span>
        </span>
        <span
          aria-hidden
          className={cn(
            "shrink-0 whitespace-nowrap font-mono text-[11px] tabular text-ink-faint transition-opacity",
            annotations ? "opacity-100" : "opacity-0",
          )}
        >
          {size.w} × {size.h}
        </span>
      </div>
      <div
        ref={ref}
        data-layer={name}
        className={cn(
          "relative bg-white shadow-frame outline outline-1 outline-transparent transition-[outline-color] duration-150 hover:outline-select/60",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Vertical spacer that shows its own measured height as a redline when notes are on. */
export function Gap({ className }: { className: string }) {
  const { annotations } = useWorkspace();
  const [ref, size] = useSize<HTMLDivElement>();
  return (
    <div ref={ref} aria-hidden className={cn("relative", className)}>
      <AnimatePresence>
        {annotations && size.h > 0 && (
          <motion.span
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-y-0 left-0 flex w-px origin-top items-center bg-redline"
          >
            <span className="absolute -left-[3px] top-0 h-px w-[7px] bg-redline" />
            <span className="absolute -left-[3px] bottom-0 h-px w-[7px] bg-redline" />
            <span className="absolute left-1.5 rounded-sm bg-redline px-1 font-mono text-[10px] leading-4 text-white tabular">
              {size.h}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Spec tag pinned to an element, like a dev-mode annotation. */
export function Tag({
  children,
  className,
  tone = "comp",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  tone?: "comp" | "redline" | "select";
  delay?: number;
}) {
  const { annotations } = useWorkspace();
  const bg = { comp: "bg-comp", redline: "bg-redline", select: "bg-select" }[tone];
  return (
    <AnimatePresence>
      {annotations && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { delay, duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className={cn(
            "pointer-events-none absolute z-10 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-white shadow-float",
            bg,
            className,
          )}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/** A comment pin. Opens a comment card; only visible with notes on. */
export function Pin({
  n,
  children,
  className,
  align = "left",
}: {
  n: number;
  children: ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  const { annotations } = useWorkspace();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!annotations) setOpen(false);
  }, [annotations]);

  return (
    <AnimatePresence>
      {annotations && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className={cn("absolute z-20 hidden sm:block", className)}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={`Design note ${n}`}
            className="grid h-7 w-7 place-items-center rounded-full rounded-bl-none bg-azza font-mono text-[11px] font-semibold text-white shadow-float ring-2 ring-white transition-transform hover:scale-110"
          >
            {n}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                role="note"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "absolute top-9 w-64 rounded-lg bg-white p-3 text-left text-[13px] leading-relaxed text-ink shadow-float ring-1 ring-black/5",
                  align === "left" ? "left-0" : "right-0",
                )}
              >
                <span className="mb-1.5 flex items-center gap-2 text-[12px] text-ink-mute">
                  <img src="/hero.webp" alt="" className="h-5 w-5 rounded-full bg-azza object-cover object-[50%_18%]" />
                  <span className="font-semibold text-ink">Azza</span>
                  design note
                </span>
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Sticky note left on the canvas. Always visible: it carries real content. */
export function Sticky({
  children,
  className,
  rotate = -1.5,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      data-layer="Sticky note"
      style={{ rotate: `${rotate}deg` }}
      className={cn("bg-[#FFE27A] p-4 text-[14px] leading-snug text-[#3A2E00] shadow-frame", className)}
    >
      {children}
    </div>
  );
}

/** Multiplayer-style cursor with a name tag. */
export function Cursor({ name, color, className }: { name: string; color: string; className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none flex items-start", className)}>
      <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow">
        <path d="M1 1l15 8.2-6.6 1.5L6.3 17z" fill={color} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span
        className="ml-0.5 mt-3.5 whitespace-nowrap rounded-full rounded-tl-sm px-2 py-0.5 text-[11.5px] font-semibold text-white shadow-float"
        style={{ background: color }}
      >
        {name}
      </span>
    </span>
  );
}

/** Prototype connection: a curved noodle with an arrowhead, purely decorative. */
export function Noodle({ className, vertical }: { className?: string; vertical?: boolean }) {
  const { annotations } = useWorkspace();
  return (
    <svg
      aria-hidden
      viewBox={vertical ? "0 0 24 48" : "0 0 48 24"}
      className={cn(
        "shrink-0 overflow-visible transition-opacity",
        annotations ? "opacity-100" : "opacity-30",
        className,
      )}
    >
      {vertical ? (
        <>
          <circle cx="12" cy="3" r="3" fill="#2F6BFF" />
          <path d="M12 6 C 12 20, 12 28, 12 40" stroke="#2F6BFF" strokeWidth="2" fill="none" />
          <path d="M7 37 L12 45 L17 37" stroke="#2F6BFF" strokeWidth="2" fill="none" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <circle cx="3" cy="12" r="3" fill="#2F6BFF" />
          <path d="M6 12 C 20 12, 28 12, 40 12" stroke="#2F6BFF" strokeWidth="2" fill="none" />
          <path d="M37 7 L45 12 L37 17" stroke="#2F6BFF" strokeWidth="2" fill="none" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
