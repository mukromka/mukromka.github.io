export type ProjectCategory = 'uiux' | 'gamedev' | 'art' | 'story';

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  type: string;
  timeline: string;
  metrics: { label: string; value: string; icon?: string }[];
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  link: string;
  linkText: string;
  accentColor: string; // Tailwind accent class or hex
  playable?: boolean;
}

export interface GameItem {
  id: string;
  title: string;
  role: string;
  categories: ('all' | 'gamedev' | 'uiux' | 'art' | 'web')[];
  image: string;
  href: string;
  description: string;
  platform: string;
  isPlayableWeb?: boolean;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  skills: string[];
  accentColor: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: { name: string; level?: string; icon?: string }[];
}
