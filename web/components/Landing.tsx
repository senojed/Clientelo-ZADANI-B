// Celá landing page (neutrální vzhled). Tři obrazovky + patička:
// 1) úvod, 2) tabulka srovnání + kalkulačka, 3) proč evropská alternativa + formulář.
// Každá sekce je aspoň na výšku obrazovky (min-h-[100svh]), delší obsah ji smí natáhnout.
// Po odeslání formuláře přejde návštěvník na /prehled s podepsaným odkazem (stejná relace, měření navazuje).
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { etf, datum } from "@/lib/etf";
import { track } from "@/lib/track";
import Srovnani from "@/components/Srovnani";
import Kalkulacka from "@/components/Kalkulacka";
import LeadForm from "@/components/LeadForm";

const OBRAZOVKA = "flex min-h-[100svh] flex-col justify-center py-6";

// Zapíše událost "section_view" jednou za relaci, když je sekce aspoň ze třetiny vidět.
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
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [name]);
  return ref;
}

export default function Landing() {
  // otevreny = rozbalený řádek tabulky (nebo žádný); ticker = fond v kalkulačce (zůstane i po sbalení řádku).
  const [otevreny, setOtevreny] = useState<string | null>(null);
  const [ticker, setTicker] = useState("VOO");
  const refSrovnani = useSectionView("srovnani");
  const refFormular = useSectionView("formular");

  useEffect(() => {
    track("page_view");
  }, []);

  function vyberRadek(t: string | null) {
    setOtevreny(t);
    if (t) setTicker(t);
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4">
      {/* 1. Úvod: navazuje na slib reklamy, hodnota hned, bez formuláře */}
      <header className={OBRAZOVKA}>
        <p className="text-sm font-medium uppercase tracking-wide text-accent">Srovnání</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight">Evropské alternativy amerických ETF</h1>
        <p className="mt-4 text-lg text-muted">
          Americká ETF jako VOO většinou nemají KID, bez kterého je broker v EU drobnému investorovi obvykle nenabídne.
          Tady je alternativa na stejný index a náklady obou. Celý přehled s ISIN zdarma za e-mail.
        </p>
        <div className="mt-8 flex flex-col gap-3">
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
        <p className="mt-6 text-sm text-muted">
          Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty, fondy jsou v USD (výsledek v
          korunách ovlivní kurz). Před investicí si přečti KID. Údaje ověřeny{" "}
          {datum(etf.overeno)} a 10. 10. 2026.
        </p>
      </header>

      {/* 2. Tabulka srovnání + kalkulačka; klik na řádek vybere fond i v kalkulačce */}
      <section id="srovnani" ref={refSrovnani} className={`${OBRAZOVKA} gap-4`}>
        <Srovnani otevreny={otevreny} onVyber={vyberRadek} />
        <Kalkulacka ticker={ticker} onTicker={setTicker} />
      </section>

      {/* 3. Krátké vysvětlení pro nedůvěřivé + formulář; po odeslání přechod na /prehled */}
      <section id="formular" ref={refFormular} className={`${OBRAZOVKA} gap-6`}>
        <div>
            <h2 className="text-2xl font-semibold">Proč evropská alternativa</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <span className="font-medium">Má KID.</span> Bez něj broker v EU fond drobnému investorovi obvykle
                nenabídne. U těchto 4 amerických ETF jsme KID k {datum(etf.overeno)} na stránce správce nenašli.
              </li>
              <li>
                <span className="font-medium">Dá se srovnat.</span> Každý KID má stejnou osnovu: riziko 1 až 7, náklady,
                scénáře výnosu.
              </li>
              <li>
                <span className="font-medium">Smí se nabízet v ČR.</span> Všechny 4 alternativy jsou v seznamu ČNB fondů
                nabízených v ČR (k 10. 10. 2026).
              </li>
            </ul>
          </div>
        <LeadForm />
      </section>

      {/* Patička s upozorněními */}
      <footer className="border-t border-line py-6 text-sm text-muted">
        <p>
          Marketingové sdělení. Nejde o investiční doporučení ani nabídku. Investice do ETF nesou riziko ztráty, minulá
          výkonnost není zárukou budoucích výnosů. Fondy jsou vedené v USD, výsledek v korunách ovlivní i kurz. Před
          investicí si přečti KID a prospekt fondu. &quot;KID nenalezen&quot; znamená, že jsme ho k datu ověření nenašli na
          stránce správce; neznamená, že fond nekoupí žádný broker.
        </p>
        <p className="mt-3">
          Kdo za stránkou stojí: Jan Reich, ukázka pro výběrové řízení. Nedostáváme provize od správců uvedených fondů ani
          od brokerů.
        </p>
        <p className="mt-3">
          Zdroje: stránky správců fondů (odkaz u každého řádku tabulky), NYSE, seznam ČNB, české KID. Údaje ověřeny 9. a
          10. 10. 2026.{" "}
          <Link href="/zasady" className="underline">
            Zásady zpracování osobních údajů
          </Link>
        </p>
      </footer>
    </main>
  );
}
