import { GameItem } from "@/types";

export const websitesData: GameItem[] = [
  {
    id: "yakin-lulus",
    title: "Yakin Lulus",
    role: "Designer & Full-stack Developer",
    categories: ["all"],
    image: "/web-yakin-lulus.webp",
    href: "https://yakinlulus.id/",
    description:
      "Online tryout platform for school and CPNS exams: timed tests that autosave, automatic scoring, answer reviews, and an admin panel for managing packages and questions.",
    platform: "yakinlulus.id",
    linkLabel: "Visit yakinlulus.id",
    tags: ["Laravel", "Inertia React", "PostgreSQL"],
  },
  {
    id: "kaorustore-ai",
    title: "Kaorustore AI",
    role: "Designer & Full-stack Developer",
    categories: ["all"],
    image: "/web-kaorustore-ai.webp",
    href: "https://ai.kaorustore.web.id/",
    description:
      "My own AI API business: one OpenAI-compatible key for GLM, DeepSeek, Qwen, Kimi, and MiniMax, sold as pay-once token credit, with a self-serve usage page and an admin panel for keys, quotas, and monitoring.",
    platform: "kaorustore.web.id",
    linkLabel: "Visit Kaorustore AI",
    tags: ["Node.js", "React admin", "SQLite"],
  },
  {
    id: "kcp-jatirejo",
    title: "KCP Jatirejo",
    role: "Designer & Full-stack Developer",
    categories: ["all"],
    image: "/web-kcp-jatirejo.webp",
    href: "https://kcpjatirejo.vercel.app/",
    description:
      "Mobile-first service portal for a local post office: vehicle tax payments, stamp duty purchases, QRIS and bank transfer, transaction history, and an admin panel.",
    platform: "Vercel",
    linkLabel: "Open the portal",
    tags: ["Mobile web", "Express API", "Admin panel"],
  },
  {
    id: "bos-gabut-web",
    title: "Bos Gabut",
    role: "Designer & Full-stack Developer",
    categories: ["all"],
    image: "/web-bos-gabut.webp",
    href: "https://ngegabut.com/",
    description:
      "Landing page and blog for the Bos Gabut quiz app, designed and built to be responsive and ready for SEO.",
    platform: "ngegabut.com",
    linkLabel: "Visit ngegabut.com",
    tags: ["UI/UX", "Landing page", "SEO blog"],
  },
];
