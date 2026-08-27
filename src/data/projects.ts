import { FeaturedProject } from "@/types";

export const featuredProjects: FeaturedProject[] = [
  {
    id: "bos-gabut",
    title: "Bos Gabut",
    subtitle: "Mobile Quiz & Reward Platform",
    role: "UI/UX Designer",
    type: "Work • Group Project",
    timeline: "2023 - 2024",
    metrics: [
      { label: "New Users", value: "+10K", icon: "Users" },
      { label: "Mini-games", value: "8+", icon: "Gamepad2" },
      { label: "Revamp", value: "Full UI", icon: "Sparkles" },
    ],
    description:
      "A mobile quiz platform with daily challenges. I led the complete UI/UX redesign across events and core game flows.",
    highlights: [
      "Overhauled event systems and onboarding, driving +10K new sign-ups.",
      "Redesigned responsive landing pages and integrated SEO blog.",
    ],
    tags: ["UI/UX", "Figma", "Design System", "Gamification"],
    image: "/bos gabut portfolio pdf.webp",
    link: "https://ngegabut.com/",
    linkText: "Visit Platform",
    accentColor: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-500",
  },
  {
    id: "mie-ayam",
    title: "Mie Ayam Simulator",
    subtitle: "Indonesian Street-Food Casual Game",
    role: "2D Artist & UI/UX",
    type: "Work • Group Project",
    timeline: "2023",
    metrics: [
      { label: "Downloads", value: "80K+", icon: "Download" },
      { label: "Rating", value: "4.5★", icon: "Star" },
      { label: "2D Assets", value: "100+", icon: "Palette" },
    ],
    description:
      "A casual simulation game about running a food stall. I designed the one-handed HUD and illustrated characters, food, and environments.",
    highlights: [
      "Designed one-handed mobile HUD and store interface.",
      "Illustrated 100+ 2D character sprites, food variants, and street backgrounds.",
    ],
    tags: ["2D Art", "UI/UX", "Character Art", "Unity 2D"],
    image: "/mie ayam portfolio pdf.webp",
    link: "https://play.google.com/store/apps/details?id=com.EverStudio.MieAyamSimulator",
    linkText: "Google Play",
    accentColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500",
  },
  {
    id: "game-portal",
    title: "Game Portal Web",
    subtitle: "Online Browser Game Platform",
    role: "Game Developer",
    type: "Active Project",
    timeline: "2024 - Present",
    metrics: [
      { label: "Titles", value: "5+ Games", icon: "Gamepad2" },
      { label: "Progress", value: "Realtime", icon: "Zap" },
      { label: "Database", value: "Cloud Sync", icon: "Database" },
    ],
    description:
      "A web portal for instant browser gaming. I develop custom web games and connect them to central databases for real-time progress tracking.",
    highlights: [
      "Built custom web games from concept to code execution.",
      "Connected game clients to central database for realtime leaderboards.",
    ],
    tags: ["Unity WebGL", "C#", "Database API", "Web Portal"],
    image: "/game portal portfolio pdf.webp",
    link: "https://gamification.kreatifmaju.com",
    linkText: "Launch Portal",
    accentColor: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-500",
    playable: true,
  },
  {
    id: "moon-flower",
    title: "Moon Flower",
    subtitle: "Serialized Drama on LINE Webtoon",
    role: "Story Writer & Colourist",
    type: "Published IP • NeedWang",
    timeline: "2020 - 2022",
    metrics: [
      { label: "Reads", value: "13.4M+", icon: "Eye" },
      { label: "Favorites", value: "270K+", icon: "Heart" },
      { label: "Rating", value: "9.76/10", icon: "Star" },
    ],
    description:
      "A serialized drama comic published on LINE Webtoon Indonesia. I co-developed story arcs, wrote scripts, and handled base colouring across 60 episodes.",
    highlights: [
      "13.4M+ total reads with 270K+ favorites and a 9.76/10 rating.",
      "Delivered 60 weekly episodes across a 2-year production schedule.",
    ],
    tags: ["Story Scripting", "Base Colouring", "LINE Webtoon"],
    image: "/webtoon portfolio pdf.webp",
    link: "https://www.webtoons.com/id/drama/moon-flower/list?title_no=2261",
    linkText: "Webtoon",
    accentColor: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-500",
  },
];