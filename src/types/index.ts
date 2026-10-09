export interface CaseFrame {
  name: string;
  image: string;
  caption: string;
  /** Narrow phone screenshot vs. wide landscape shot. */
  shape: "phone" | "wide" | "square";
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  type: string;
  timeline: string;
  metrics: { label: string; value: string }[];
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  link: string;
  linkText: string;
  /** Section colour on the canvas, taken from the project's own art. */
  tint: string;
  /** Supporting frames shown as a prototype flow next to the overview. */
  flow: CaseFrame[];
  /** Sticky note pinned on the section. */
  note: string;
  playable?: boolean;
}

export interface GameItem {
  id: string;
  title: string;
  role: string;
  categories: ("all" | "gamedev" | "uiux" | "art" | "web")[];
  image: string;
  href: string;
  description: string;
  platform: string;
  isPlayableWeb?: boolean;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  /** Decimal years, e.g. 2023.92 for December 2023. `null` end means ongoing. */
  start: number;
  end: number | null;
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  achievements: string[];
  skills: string[];
  color: string;
}
