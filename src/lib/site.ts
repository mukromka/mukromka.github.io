export const CV_URL = "/CV%20Mukrom%20Karunia%20Azza_2026.pdf";
export const EMAIL = "mukrom.karunia24@gmail.com";
export const WHATSAPP_URL =
  "https://wa.me/6282135782644?text=Hi%20Azza%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mukrom-karunia-azza/";

export type LayerNode = { id: string; label: string; kind: "frame" | "section"; children?: LayerNode[] };

export const LAYERS: LayerNode[] = [
  { id: "cover", label: "Cover", kind: "frame" },
  {
    id: "work",
    label: "Work",
    kind: "section",
    children: [
      { id: "work-bos-gabut", label: "Bos Gabut", kind: "frame" },
      { id: "work-mie-ayam", label: "Mie Ayam Simulator", kind: "frame" },
      { id: "work-game-portal", label: "Game Portal Web", kind: "frame" },
      { id: "work-moon-flower", label: "Moon Flower", kind: "frame" },
    ],
  },
  { id: "games", label: "Games library", kind: "frame" },
  { id: "career", label: "Career timeline", kind: "frame" },
  { id: "about", label: "About / Azza", kind: "frame" },
  { id: "contact", label: "Handoff", kind: "frame" },
];

export const ALL_LAYER_IDS = LAYERS.flatMap((l) => [l.id, ...(l.children?.map((c) => c.id) ?? [])]);

export function scrollToLayer(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
