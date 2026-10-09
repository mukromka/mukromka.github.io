import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Game Development",
    icon: "Gamepad2",
    color: "from-brand-500/20 to-orange-500/20",
    skills: [
      { name: "Unity (2D & 3D)" },
      { name: "C# Programming" },
      { name: "Unity WebGL" },
      { name: "Game Mechanics & Physics" },
    ],
  },
  {
    title: "UI/UX Design",
    icon: "Layout",
    color: "from-emerald-500/20 to-teal-500/20",
    skills: [
      { name: "Figma" },
      { name: "Design Systems" },
      { name: "Mobile Game HUD" },
      { name: "Wireframing & Prototype" },
    ],
  },
  {
    title: "2D Art & Narrative",
    icon: "Palette",
    color: "from-purple-500/20 to-pink-500/20",
    skills: [
      { name: "2D Game Assets" },
      { name: "Character & Food Art" },
      { name: "Visual Storytelling" },
      { name: "Base Colouring" },
    ],
  },
];

export const techBadges = [
  { name: "Unity", icon: "https://cdn.simpleicons.org/unity/18181b" },
  { name: "C#", icon: "https://cdn.simpleicons.org/dotnet/18181b" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/18181b" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/18181b" },
];