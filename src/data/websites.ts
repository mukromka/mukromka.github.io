import { GameItem } from "@/types";

export const websitesData: GameItem[] = [
  {
    id: "yakin-lulus",
    title: "Yakin Lulus",
    role: "Designer & Developer",
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
    id: "kcp-jatirejo",
    title: "KCP Jatirejo",
    role: "Designer & Developer",
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
    role: "UI/UX Designer",
    categories: ["all"],
    image: "/web-bos-gabut.webp",
    href: "https://bosgabut.com/",
    description: "Landing page and blog for the Bos Gabut quiz app, redesigned to be responsive and set up for SEO.",
    platform: "bosgabut.com",
    linkLabel: "Visit bosgabut.com",
    tags: ["UI/UX", "Landing page", "SEO blog"],
  },
];
