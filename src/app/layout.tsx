import type { Metadata, Viewport } from "next";
import { Baloo_2, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"], display: "swap" });

const title = "Mukrom Karunia Azza — UI/UX Designer & Game Developer";
const description =
  "Azza designs game UI and builds the game behind it in Unity. Bos Gabut 2.0 (10K+ users in two months), Mie Ayam Simulator (80K+ downloads), 15+ mobile and web games.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Mukrom Karunia Azza", "Azza", "UI/UX Designer", "Game UI", "Game Developer", "Unity", "Indonesia"],
  authors: [{ name: "Mukrom Karunia Azza" }],
  creator: "Mukrom Karunia Azza",
  metadataBase: new URL("https://mukromka.github.io"),
  openGraph: {
    title,
    description,
    url: "https://mukromka.github.io",
    siteName: "Mukrom Karunia Azza",
    images: [{ url: "/hero.webp", width: 1200, height: 1115, alt: "Mukrom Karunia Azza" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: ["/hero.webp"] },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23E8743B'/%3E%3Cpath d='M18 14l30 16-13 3-6 13z' fill='%23fff'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = { themeColor: "#2C2C31" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
