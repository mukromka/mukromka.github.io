"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Frame, LayoutPanelTop, X } from "lucide-react";
import { LAYERS, scrollToLayer, type LayerNode } from "@/lib/site";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

function Tree({ onPick }: { onPick?: () => void }) {
  const { active } = useWorkspace();

  const Row = ({ node, depth }: { node: LayerNode; depth: number }) => {
    const isActive = active === node.id;
    const Icon = node.kind === "section" ? LayoutPanelTop : Frame;
    return (
      <li>
        <a
          href={`#${node.id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToLayer(node.id);
            onPick?.();
          }}
          aria-current={isActive ? "location" : undefined}
          style={{ paddingLeft: 12 + depth * 16 }}
          className={cn(
            "flex h-8 items-center gap-2 pr-3 text-[13px] transition-colors",
            isActive ? "bg-select/90 text-white" : "text-chrome-text hover:bg-chrome-raised",
          )}
        >
          <Icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-white" : "text-chrome-dim")} />
          <span className="truncate">{node.label}</span>
        </a>
        {node.children && (
          <ul>
            {node.children.map((c) => (
              <Row key={c.id} node={c} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="py-1">
      {LAYERS.map((n) => (
        <Row key={n.id} node={n} depth={0} />
      ))}
    </ul>
  );
}

function PanelBody({ onPick }: { onPick?: () => void }) {
  return (
    <>
      <div className="flex h-10 items-center gap-4 border-b border-chrome-line px-3 text-[13px]">
        <span className="font-semibold text-chrome-text">Layers</span>
        <span className="text-chrome-dim">Page 1</span>
      </div>
      <nav aria-label="Frames on this page" className="chrome-scroll flex-1 overflow-y-auto">
        <Tree onPick={onPick} />
      </nav>
      <div className="space-y-3 border-t border-chrome-line p-3 text-[12px] leading-relaxed text-chrome-dim">
        <p className="flex items-center gap-2 text-chrome-text">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          Open to UI/UX and game dev roles
        </p>
        <p>
          Press <kbd className="rounded bg-chrome-raised px-1 font-mono text-[10px] text-chrome-text">A</kbd> to toggle
          design notes. Hover anything to inspect it.
        </p>
      </div>
    </>
  );
}

export function LayersPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <aside className="fixed bottom-0 left-0 top-12 z-30 hidden w-60 flex-col border-r border-black/40 bg-chrome lg:flex">
        <PanelBody />
      </aside>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Layers"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%", transition: { duration: 0.18 } }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 top-0 flex w-72 max-w-[85vw] flex-col bg-chrome"
            >
              <div className="flex h-12 items-center justify-end border-b border-chrome-line px-2">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close layers"
                  autoFocus
                  className="grid h-9 w-9 place-items-center rounded-md text-chrome-dim hover:bg-chrome-raised hover:text-chrome-text"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <PanelBody onPick={onClose} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
