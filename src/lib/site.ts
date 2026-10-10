export const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "games", label: "Games" },
  { id: "career", label: "Career" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const CV_URL = "/CV%20Mukrom%20Karunia%20Azza_2026.pdf";
export const EMAIL = "mukrom.karunia24@gmail.com";
export const WHATSAPP_URL =
  "https://wa.me/6282135782644?text=Hi%20Azza%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mukrom-karunia-azza/";

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
