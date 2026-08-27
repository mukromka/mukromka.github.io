import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mukrom Karunia Azza | Game Developer & UI/UX Designer",
  description:
    "Portfolio of Mukrom Karunia Azza — Unity Game Developer and UI/UX Designer building playful, high-impact mobile and web games.",
  keywords: [
    "Mukrom Karunia Azza",
    "Azza",
    "Game Developer",
    "Unity Developer",
    "UI/UX Designer",
    "2D Artist",
    "Mie Ayam Simulator",
    "Bos Gabut",
    "Game Portal",
    "Moon Flower Webtoon",
    "Indonesia Game Developer",
  ],
  authors: [{ name: "Mukrom Karunia Azza" }],
  creator: "Mukrom Karunia Azza",
  metadataBase: new URL("https://mukromka.github.io"),
  openGraph: {
    title: "Mukrom Karunia Azza | Game Developer & UI/UX Designer",
    description:
      "Crafting joyful games and user interfaces. 15+ titles shipped, 80K+ downloads on Google Play, 13.4M reads on LINE Webtoon.",
    url: "https://mukromka.github.io",
    siteName: "Mukrom Karunia Azza Portfolio",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 1115,
        alt: "Mukrom Karunia Azza Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukrom Karunia Azza | Game Developer & UI/UX Designer",
    description: "Crafting joyful games and user interfaces. 15+ titles shipped.",
    images: ["/hero.webp"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='18' fill='%23ff5733'/%3E%3Ctext x='11' y='44' font-family='Arial' font-size='27' font-weight='700' fill='%23ffffff'%3EMK%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fredoka.variable} ${plusJakarta.variable}`}>
      <body className="font-sans min-h-screen selection:bg-brand-500 selection:text-white">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
