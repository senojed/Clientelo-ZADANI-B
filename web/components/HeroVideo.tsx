// Dekorativní video na pozadí úvodu. Čte se jen jako ozdoba (aria-hidden), obsah stránky na něm nezávisí.
// Nejdřív se zobrazí poster (obrázek, ten je LCP), video se začne stahovat až po načtení stránky,
// aby nezpomalilo první obrazovku. Při omezeném pohybu v systému, při úspoře dat nebo když prohlížeč
// přehrání zakáže, zůstane jen poster. Přechod do pozadí dělá CSS (gradient), není zapečený ve videu.
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  // Adresa videa se nastaví až po načtení stránky; do té doby <video> nic nestahuje.
  const [zdroj, setZdroj] = useState<string | undefined>(undefined);
  // Poster je vidět vždy; video se do něj prolne, až opravdu hraje.
  const [hraje, setHraje] = useState(false);

  useEffect(() => {
    const sdilnaSit = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const bezPohybu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (bezPohybu || sdilnaSit?.saveData) return;

    const nastav = () => setZdroj("/hero-background.mp4");
    if (document.readyState === "complete") {
      nastav();
      return;
    }
    window.addEventListener("load", nastav, { once: true });
    return () => window.removeEventListener("load", nastav);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[324px] overflow-hidden">
      <Image
        src="/hero-poster.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        unoptimized
        sizes="100vw"
        className="object-cover opacity-85"
      />
      {/* autoPlay + muted + playsInline: prohlížeč přehraje sám; když to zakáže, onPlaying nepřijde a zůstane poster. */}
      <video
        src={zdroj}
        autoPlay
        muted
        loop
        playsInline
        preload={zdroj ? "auto" : "none"}
        onPlaying={() => setHraje(true)}
        onPause={() => setHraje(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hraje ? "opacity-85" : "opacity-0"
        }`}
      />
      {/* Přechod do pozadí stránky, aby dole nebyla vidět hrana videa. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,23,37,.15) 0%, rgba(8,23,37,.1) 40%, rgba(8,23,37,.65) 72%, #081725 100%)",
        }}
      />
    </div>
  );
}
