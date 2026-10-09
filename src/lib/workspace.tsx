"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ALL_LAYER_IDS } from "./site";

export type Inspected = {
  layer: string;
  width: number;
  height: number;
  font?: { family: string; weight: string; size: string; lineHeight: string };
  color?: string;
  fill?: string;
} | null;

type Workspace = {
  annotations: boolean;
  setAnnotations: (v: boolean) => void;
  inspected: Inspected;
  setInspected: (v: Inspected) => void;
  active: string;
};

const Ctx = createContext<Workspace | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [annotations, setAnnotations] = useState(true);
  const [inspected, setInspected] = useState<Inspected>(null);
  const [active, setActive] = useState("cover");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest("input, textarea, [contenteditable]")) return;
      if (e.key.toLowerCase() === "a") setAnnotations((v) => !v);
    };
    window.addEventListener("keydown", onKey);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ALL_LAYER_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      io.disconnect();
    };
  }, []);

  return (
    <Ctx.Provider value={{ annotations, setAnnotations, inspected, setInspected, active }}>{children}</Ctx.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWorkspace outside WorkspaceProvider");
  return ctx;
}

/** Converts rgb()/rgba() from getComputedStyle into #RRGGBB. */
export function toHex(rgb: string) {
  const m = rgb.match(/\d+(\.\d+)?/g);
  if (!m || (m.length === 4 && Number(m[3]) === 0)) return undefined;
  return (
    "#" +
    m
      .slice(0, 3)
      .map((n) => Math.round(Number(n)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}
