"use client";

import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const TOKENS = [
  { name: "Azza / orange", hex: "#E8743B" },
  { name: "Ink", hex: "#16161B" },
  { name: "Selection", hex: "#2F6BFF" },
  { name: "Redline", hex: "#EC2F68" },
  { name: "Component", hex: "#8B5CF6" },
  { name: "Canvas", hex: "#E6E6EB" },
];

const TEXT_STYLES = [
  { name: "Display", spec: "Baloo 2, 800", sample: "Aa", cls: "font-display font-extrabold" },
  { name: "Body", spec: "Inter, 400, 16/26", sample: "Aa", cls: "font-sans" },
  { name: "Measure", spec: "JetBrains Mono, 11", sample: "24", cls: "font-mono" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-chrome-line px-4 py-4">
      <h3 className="mb-3 text-[12px] font-semibold text-chrome-text">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div
      className={cn("flex h-8 items-center gap-2 rounded-md bg-chrome-raised px-2 text-[12px]", wide && "col-span-2")}
    >
      <span className="w-4 shrink-0 text-chrome-dim">{label}</span>
      <span className="truncate font-mono text-chrome-text">{value}</span>
    </div>
  );
}

function Swatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[12px]">
      <span className="h-4 w-4 shrink-0 rounded-[3px] ring-1 ring-white/15" style={{ background: hex }} />
      <span className="flex-1 truncate text-chrome-text">{name}</span>
      <span className="font-mono text-chrome-dim">{hex}</span>
    </div>
  );
}

export function Inspector() {
  const { inspected } = useWorkspace();

  return (
    <aside
      aria-label="Inspector"
      className="chrome-scroll fixed bottom-0 right-0 top-12 z-30 hidden w-[272px] overflow-y-auto border-l border-black/40 bg-chrome text-chrome-text xl:block"
    >
      <div className="flex h-10 items-center gap-4 border-b border-chrome-line px-4 text-[13px]">
        <span className="font-semibold">Inspect</span>
        <span className="text-chrome-dim">{inspected ? "Selection" : "File styles"}</span>
      </div>

      {inspected ? (
        <div aria-live="polite">
          <Section title={inspected.layer}>
            <div className="grid grid-cols-2 gap-2">
              <Field label="W" value={String(inspected.width)} />
              <Field label="H" value={String(inspected.height)} />
            </div>
          </Section>
          {inspected.font && (
            <Section title="Typography">
              <div className="grid grid-cols-2 gap-2">
                <Field label="" value={inspected.font.family} wide />
                <Field label="" value={inspected.font.weight} />
                <Field label="" value={`${inspected.font.size} / ${inspected.font.lineHeight}`} />
              </div>
            </Section>
          )}
          {(inspected.color || inspected.fill) && (
            <Section title="Colours">
              <div className="space-y-2.5">
                {inspected.color && <Swatch hex={inspected.color} name="Text" />}
                {inspected.fill && <Swatch hex={inspected.fill} name="Fill" />}
              </div>
            </Section>
          )}
          <p className="px-4 py-4 text-[12px] leading-relaxed text-chrome-dim">
            Values are read live from the page, the same way a developer would inspect a handoff.
          </p>
        </div>
      ) : (
        <>
          <p className="border-b border-chrome-line px-4 py-4 text-[12px] leading-relaxed text-chrome-dim">
            Hover any layer on the canvas to inspect its size, type and colour. This file is built from the styles
            below.
          </p>
          <Section title="Colour styles">
            <div className="space-y-2.5">
              {TOKENS.map((t) => (
                <Swatch key={t.hex} {...t} />
              ))}
            </div>
          </Section>
          <Section title="Text styles">
            <ul className="space-y-3">
              {TEXT_STYLES.map((s) => (
                <li key={s.name} className="flex items-center gap-3">
                  <span
                    className={cn("grid h-9 w-9 place-items-center rounded-md bg-chrome-raised text-[15px]", s.cls)}
                  >
                    {s.sample}
                  </span>
                  <span className="text-[12px]">
                    <span className="block text-chrome-text">{s.name}</span>
                    <span className="block text-chrome-dim">{s.spec}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Grid">
            <p className="text-[12px] text-chrome-dim">8 pt spacing, 12-column frames, 24 px canvas dots.</p>
          </Section>
        </>
      )}
    </aside>
  );
}
