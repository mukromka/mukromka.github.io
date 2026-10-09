export type Variant = "uiux" | "gamedev" | "art";

export const roleVariants: {
  id: Variant;
  label: string;
  color: string;
  headline: string;
  body: string;
  does: string[];
  tools: string[];
  proof: string;
}[] = [
  {
    id: "uiux",
    label: "UI/UX designer",
    color: "#2F6BFF",
    headline: "Designs for the player's first session.",
    body: "I redesign game flows around what a new player sees first: onboarding, home, events and store, then the landing page and store listing that bring them in.",
    does: ["FTUE and onboarding", "Mobile game HUD", "Design systems", "Wireframes and prototypes"],
    tools: ["Figma", "Photoshop", "Illustrator"],
    proof: "Bos Gabut 2.0: 10K+ users in two months",
  },
  {
    id: "gamedev",
    label: "Game developer",
    color: "#10B981",
    headline: "Ships the build, not just the mockup.",
    body: "I build in Unity and C#: level databases, UI animation, AdMob ads, Android and WebGL exports, and game clients that sync progress to a server.",
    does: ["Unity 2D and 3D", "C# with SOLID", "WebGL builds", "Physics and mechanics"],
    tools: ["Unity", "C#", "GitHub"],
    proof: "Google Play x Unity Certified Developer, 2024",
  },
  {
    id: "art",
    label: "2D artist & writer",
    color: "#E8743B",
    headline: "Draws the world and writes its story.",
    body: "Characters, food and street backgrounds for Mie Ayam Simulator; scripts, storyboards and base colour for a webtoon read 13.4 million times.",
    does: ["2D game assets", "Character art", "Storyboards", "Base colouring"],
    tools: ["Clip Studio Paint", "CorelDraw"],
    proof: "Top 5 Favorite, LINE Creativate 2018",
  },
];

export const awards = [
  { title: "Best Booth", event: "KMIPN, Kompetisi Mahasiswa Informatika Politeknik Nasional", year: "2021" },
  {
    title: "3rd place, mobile game",
    event: "International Multimedia Engineering Technology Competition",
    year: "2020",
  },
  { title: "Top 5 Favorite", event: "LINE Creativate", year: "2018" },
];

export const certifications = [
  { title: "Certified Unity Developer", by: "Google Play x Unity", year: "2024" },
  { title: "Store Listing", by: "Google Play Academy", year: "2023" },
  { title: "Game Incubation Bootcamp", by: "FGA", year: "2023" },
  { title: "2D Game Artist", by: "VSGA", year: "2022" },
  { title: "Animation & Game Bootcamp", by: "VSGA", year: "2022" },
];
