// Kořenový layout: jazyk stránky (cs), předčítání písem a metadata.
// Písma jsou naše ořezané soubory v public/fonts (definice v globals.css), žádný externí CDN.
import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";

export const metadata: Metadata = {
  title: "Americké ETF a UCITS alternativy",
  description: "Srovnání amerických ETF z NYSE Arca a jejich UCITS alternativ. Informační přehled, ne investiční doporučení.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Předčítá se jen písmo Inter a Lora (text a nadpisy, česká diakritika je v "latin-ext"); mono písmo se načte až při použití.
  for (const soubor of ["inter-latin", "inter-latin-ext", "lora-latin", "lora-latin-ext"]) {
    preload(`/fonts/${soubor}.woff2`, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
  return (
    <html lang="cs" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
