import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "./_components/effects/SmoothScroll";
import { BladeCursor } from "./_components/effects/BladeCursor";
import { IntroLoader } from "./_components/effects/IntroLoader";
import { SlashFX } from "./_components/effects/SlashFX";
import { AmbientKoto } from "./_components/effects/AmbientKoto";
import { ChapterCards } from "./_components/effects/ChapterCards";
import { NavRail } from "./_components/NavRail";
import { TopBar } from "./_components/TopBar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hagane (鋼) — Web carved with samurai precision",
    template: "%s · Hagane 鋼",
  },
  description:
    "A small studio that forges hand-crafted, themed landing pages. We don't build sites. We forge them.",
  metadataBase: new URL("https://hagane.shypot.com"),
  openGraph: {
    title: "Hagane — Web carved with samurai precision",
    description:
      "A small studio that forges hand-crafted, themed landing pages.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${notoSerifJP.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen text-washi antialiased">
        <SmoothScroll />
        <BladeCursor />
        <SlashFX />
        <AmbientKoto />
        <ChapterCards />
        <IntroLoader />
        <TopBar />
        <NavRail />
        {children}
      </body>
    </html>
  );
}
