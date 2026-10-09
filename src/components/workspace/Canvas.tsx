"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { toHex, useWorkspace } from "@/lib/workspace";

/** The scrolling canvas. Hovering a [data-layer] element feeds the inspector. */
export function Canvas({ children }: { children: ReactNode }) {
  const { setInspected } = useWorkspace();
  const reduce = useReducedMotion();
  const raf = useRef(0);
  const last = useRef<Element | null>(null);
  const [visitor, setVisitor] = useState<{ x: number; y: number } | null>(null);

  const inspect = (target: EventTarget | null) => {
    const el = (target as HTMLElement | null)?.closest?.("[data-layer]");
    if (!el || el === last.current) return;
    last.current = el;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const textEl = el.matches("h1,h2,h3,h4,p,a,button,li,span,blockquote,dd,dt");
    setInspected({
      layer: el.getAttribute("data-layer") || "Layer",
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      font: textEl
        ? {
            family: cs.fontFamily
              .split(",")[0]
              .replace(/["']/g, "")
              .replace(/^__|_[a-f0-9]+$/g, "")
              .replace(/_Fallback.*/, "")
              .replace(/_/g, " ")
              .trim(),
            weight: cs.fontWeight,
            size: `${Math.round(parseFloat(cs.fontSize))}`,
            lineHeight: cs.lineHeight === "normal" ? "auto" : `${Math.round(parseFloat(cs.lineHeight))}`,
          }
        : undefined,
      color: textEl ? toHex(cs.color) : undefined,
      fill: toHex(cs.backgroundColor),
    });
  };

  return (
    <main
      id="canvas"
      className="canvas-dots relative min-h-screen pt-12 lg:pl-60 xl:pr-[272px]"
      onMouseOver={(e) => {
        cancelAnimationFrame(raf.current);
        const t = e.target;
        raf.current = requestAnimationFrame(() => inspect(t));
      }}
      onMouseLeave={() => {
        last.current = null;
        setInspected(null);
        setVisitor(null);
      }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        setVisitor({ x: e.clientX, y: e.clientY });
      }}
    >
      {children}
      {visitor && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-[35] hidden md:block"
          style={{ transform: `translate(${visitor.x + 14}px, ${visitor.y + 16}px)` }}
        >
          <span className="rounded-full rounded-tl-sm bg-select px-2 py-0.5 text-[11px] font-semibold text-white shadow-float">
            You
          </span>
        </div>
      )}
    </main>
  );
}
