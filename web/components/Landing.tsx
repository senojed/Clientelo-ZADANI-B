// Celá landing page (neutrální vzhled). Pořadí sekcí: úvod -> srovnání -> výpočet poplatku -> vysvětlení -> formulář -> patička.
// Po odeslání formuláře se na stejném místě zobrazí plný přehled (stejná relace, měření navazuje).
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { etf, pct, datum, zamereni } from "@/lib/etf";
import { setVariant, track } from "@/lib/track";
import Kalkulacka from "@/components/Kalkulacka";
import LeadForm from "@/components/LeadForm";
import Prehled from "@/components/Prehled";

const NADPISY: Record<string, string> = {
  a: "Znáš VOO nebo IVV? Porovnej náklady a najdi evropskou alternativu.",
  b: "4 americká ETF a jejich evropské alternativy na jednom místě",
};

// Zapíše událost "section_view" jednou za relaci, když je sekce aspoň z poloviny vidět.
function useSectionView(name: string) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track("section_view", { section: name });
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [name]);
  return ref;
}

export default function Landing({ variant }: { variant: "a" | "b" }) {
  const [token, setToken] = useState<string | null>(null);
  const refSrovnani = useSectionView("srovnani");
  const refVypocet = useSectionView("vypocet");
  const refVysvetleni = useSectionView("vysvetleni");
  const refFormular = useSectionView("formular");

  useEffect(() => {
    setVariant(variant);
    track("page_view");
  }, [variant]);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24">
      {/* 1. Úvod: navazuje na slib reklamy, hodnota hned, bez formuláře */}
      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold leading-tight">{NADPISY[variant]}</h1>
        <p className="mt-4 text-lg text-muted">
          Srovnali jsme 4 známá americká ETF a jejich UCITS alternativy na stejný index. Část srovnání hned, celý přehled
          s kontrolním seznamem zdarma.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#srovnani"
            onClick={() => track("cta_click", { cta: "hero_srovnani" })}
            className="rounded-box bg-accent px-5 py-3 text-center font-medium text-accent-foreground"
          >
            Zobrazit srovnání
          </a>
          <a
            href="#formular"
            onClick={() => track("cta_click", { cta: "hero_co_obsahuje" })}
            className="text-center text-accent underline"
          >
            Co obsahuje přehled
          </a>
        </div>
        <p className="mt-4 text-sm text-muted">
          Informační přehled, ne investiční doporučení. Údaje ověřeny {datum(etf.overeno)} a 10. 10. 2026.
        </p>
      </header>

      {/* 2. Srovnání amerických ETF mezi sebou + UCITS alternativa vedle (bez ISIN a odkazů, ty jsou v přehledu) */}
      <section id="srovnani" ref={refSrovnani} className="scroll-mt-4 py-8">
        <h2 className="text-2xl font-semibold">Srovnání 4 amerických ETF</h2>
        <p className="mt-2 text-muted">Seřazeno abecedně. Roční náklady fondu podle správce, u UCITS podle českého KID.</p>
        <ul className="mt-6 flex flex-col gap-4">
          {etf.pary.map((p) => (
            <li key={p.us.ticker} className="rounded-box border border-line p-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xl font-semibold">{p.us.ticker}</span>
                <span className="text-sm text-muted">kótováno na {p.us.burza}</span>
              </div>
              <p className="mt-1">{zamereni[p.us.ticker]}</p>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <dt className="text-muted">Roční náklady fondu</dt>
                <dd className="font-medium">{pct(p.us.naklady_pct)}</dd>
                <dt className="text-muted">KID pro EU retail</dt>
                <dd>nenalezen k {datum(p.us.kid_overeno)}</dd>
              </dl>
              <div className="mt-3 rounded-box bg-surface p-3 text-sm">
                <p className="font-medium">UCITS alternativa na stejný index</p>
                <p className="mt-1">{p.ucits.nazev}</p>
                <p className="mt-1">
                  Roční náklady <span className="font-medium">{pct(p.ucits.naklady_pct)}</span> · český KID · v seznamu ČNB
                  fondů nabízených v ČR
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Interakce: výpočet ročního rozdílu poplatku, vede na formulář */}
      <section id="vypocet" ref={refVypocet} className="scroll-mt-4 py-8">
        <Kalkulacka />
      </section>

      {/* 4. Krátké vysvětlení pro nedůvěřivé */}
      <section id="vysvetleni" ref={refVysvetleni} className="py-8">
        <h2 className="text-2xl font-semibold">Proč evropská alternativa</h2>
        <ul className="mt-4 flex flex-col gap-3">
          <li>
            <span className="font-medium">KID</span> (sdělení klíčových informací) je povinný dokument. Bez něj broker v EU
            fond drobnému investorovi obvykle nenabídne.
          </li>
          <li>
            <span className="font-medium">UCITS</span> jsou evropská pravidla pro fondy. UCITS ETF mají KID a mohou být
            registrované k nabízení v ČR.
          </li>
          <li>
            U všech 4 amerických ETF jsme KID pro EU retail na stránkách správců k {datum(etf.overeno)} nenašli. Neznamená
            to, že je nekoupí žádný broker; znamená to, že se vyplatí znát evropskou alternativu.
          </li>
        </ul>
      </section>

      {/* 5. Formulář, po odeslání přehled na stejném místě */}
      <section id="formular" ref={refFormular} className="scroll-mt-4 py-8">
        {token ? <Prehled token={token} /> : <LeadForm onDone={setToken} />}
      </section>

      {/* 6. Patička s upozorněními */}
      <footer className="mt-8 border-t border-line pt-6 text-sm text-muted">
        <p>
          Informační a marketingové sdělení. Nejde o investiční doporučení ani nabídku. Investice do ETF nesou riziko
          ztráty, minulá výkonnost není zárukou budoucích výnosů. &quot;KID nenalezen&quot; znamená, že jsme ho k datu
          ověření nenašli na stránce správce; neznamená, že fond nekoupí žádný broker.
        </p>
        <p className="mt-3">
          Zdroje: stránky správců fondů, NYSE, seznam ČNB, české KID. Údaje ověřeny 9. a 10. 10. 2026.{" "}
          <Link href="/zasady" className="underline">
            Zásady zpracování osobních údajů
          </Link>
        </p>
      </footer>
    </div>
  );
}
