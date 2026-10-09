import type { Metadata, Viewport } from "next";
import { Unbounded, Onest } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sans = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = "Mukrom Karunia Azza — Game Developer & UI/UX Designer";
const description =
  "Unity game developer and UI/UX designer from Indonesia. 15+ shipped mobile and web games, 80K+ downloads on Google Play, 13.4M reads on LINE Webtoon.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Mukrom Karunia Azza",
    "Azza",
    "Game Developer",
    "Unity Developer",
    "UI/UX Designer",
    "Game UI",
    "2D Artist",
    "Mie Ayam Simulator",
    "Bos Gabut",
    "Moon Flower Webtoon",
    "Indonesia Game Developer",
  ],
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
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero.webp"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%230F1631'/%3E%3Cpath d='M20 18l26 14-26 14z' fill='%23FFC93C'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1631",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-night font-sans text-ink">{children}</body>
    </html>
  );
}
