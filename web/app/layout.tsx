// Kořenový layout: jazyk stránky (cs), písma a metadata.
// Písma se stahují při buildu a servírují z našeho serveru (next/font), žádný externí CDN.
import type { Metadata } from "next";
import { Inter, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// latin-ext kvůli české diakritice (č, ř, ž...).
// Lora: nadpisy, Inter: běžný text a ovládání, IBM Plex Mono: čísla a tickery.
// Lora a Inter jsou proměnná písma (jeden soubor pro všechna řezy), takže se stahuje míň dat.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

// Plex Mono (čísla) se nepředčítá (preload: false): předčítání všech tří písem zpomalovalo obrázek v úvodu (ten je LCP).
// Zkoušeno: bez předčítání Lory a Interu byl první vykreslený text pozdě (FCP 2,6 s), proto se předčítají.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Americké ETF a UCITS alternativy",
  description: "Srovnání amerických ETF z NYSE Arca a jejich UCITS alternativ. Informační přehled, ne investiční doporučení.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${lora.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
