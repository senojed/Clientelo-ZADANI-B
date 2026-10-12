// Celá landing page (tmavý design). Tři obrazovky + patička:
// 1) úvod s videem, 2) tabulka srovnání + kalkulačka, 3) proč evropská alternativa + formulář, 4) patička s upozorněními.
// Každá sekce má barevné pozadí přes celou šířku a obsah v úzkém sloupci; první tři jsou aspoň na výšku obrazovky
// (min-h-[100svh]), delší obsah je smí natáhnout. V pravém dolním rohu sekcí je dekorativní pixelový motiv.
// Po odeslání formuláře přejde návštěvník na /prehled s podepsaným odkazem (stejná relace, měření navazuje).
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { etf, datum } from "@/lib/etf";
import { track } from "@/lib/track";
import HeroVideo from "@/components/HeroVideo";
import Srovnani from "@/components/Srovnani";
import Kalkulacka from "@/components/Kalkulacka";
import LeadForm from "@/components/LeadForm";

// Sloupec s obsahem uvnitř sekce: úzký, vystředěný, s pixelovým rohem. Pozadí sekce je mimo něj (přes celou šířku).
const SLOUPEC = "pixel-roh mx-auto flex w-full max-w-md flex-col";
// Výška první tří obrazovek: aspoň celé okno.
const OBRAZOVKA = "min-h-[100svh]";

// Zlaté tlačítko hlavní akce v úvodu (ostatní tlačítka jsou v komponentách).
const TLACITKO =
  "flex h-[52px] items-center justify-center rounded-[5px] bg-accent text-sm font-semibold text-accent-foreground";

// Zapíše událost "section_view" jednou za relaci, když je sekce aspoň ze třetiny vidět.
function useSectionView(name: string) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.3)) {
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
    <main>
      {/* 1. Úvod: navazuje na slib reklamy, hodnota hned, bez formuláře */}
      <header className="relative overflow-hidden bg-background">
        <HeroVideo />
        <div className={`${SLOUPEC} ${OBRAZOVKA} px-6 pb-3 pt-6`}>
          <div className="relative flex h-5 items-center gap-[9px] font-serif text-[17px] font-medium leading-5">
            <Image src="/logo-symbol.svg" alt="" width={22} height={20} />
            <span>ETF přehled</span>
          </div>
          {/* Volné místo nad nadpisem: video je v něm vidět; na vyšších displejích se zvětší. */}
          <div className="min-h-[230px] flex-1" />
          <h1 className="relative text-[43px] font-medium leading-[49px] tracking-[-0.55px] max-[359px]:text-[36px] max-[359px]:leading-[42px]">
            Evropské
            <br />
            alternativy
            <br />
            amerických ETF
          </h1>
          <p className="relative mt-6 text-pretty text-sm leading-[21px] text-muted">
            U&nbsp;VOO, IVV, DIA ani VT jsme KID na stránce správce nenašli. Bez KID broker v&nbsp;EU fond drobnému investorovi obvykle nenabídne.
            <br />
            Tady je alternativa na stejný index a&nbsp;náklady obou.
          </p>
          <p className="relative mt-6 font-serif text-[18.8px] leading-[26px] min-[375px]:whitespace-nowrap max-[374px]:text-base">
            Celý přehled s&nbsp;ISIN zdarma za <span className="whitespace-nowrap">e-mail</span>.
          </p>
          <a
            href="#srovnani"
            onClick={() => track("cta_click", { cta: "hero_srovnani" })}
            className={`relative mt-6 ${TLACITKO}`}
          >
            Zobrazit srovnání
          </a>
          <a
            href="#formular"
            onClick={() => track("cta_click", { cta: "hero_co_obsahuje" })}
            className="relative mt-1 flex min-h-11 items-center justify-center text-[13px] text-accent underline"
          >
            Co obsahuje přehled
          </a>
          <div className="relative mt-2 text-muted">
            <div className="h-px bg-line" />
            <p className="mt-3 text-xs leading-[17px]">
              Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty, fondy jsou v&nbsp;USD (výsledek v&nbsp;korunách ovlivní kurz).
              <br />
              Před investicí si přečti KID.
            </p>
            <p className="mt-3 text-[11px] font-medium leading-[13px] text-subtle">
              Údaje ověřeny {datum(etf.overeno)} a&nbsp;10.&nbsp;10.&nbsp;2026.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Tabulka srovnání + kalkulačka; klik na řádek vybere fond i v kalkulačce */}
      <section
        id="srovnani"
        ref={refSrovnani}
        className="border-t border-section-line bg-comparison"
      >
        <div className={`${SLOUPEC} ${OBRAZOVKA} gap-2.5 px-4 pb-4 pt-4`}>
          <Srovnani otevreny={otevreny} onVyber={vyberRadek} />
          <Kalkulacka ticker={ticker} onTicker={setTicker} />
        </div>
      </section>

      {/* 3. Krátké vysvětlení pro nedůvěřivé + formulář; po odeslání přechod na /prehled */}
      <section
        id="formular"
        ref={refFormular}
        className="border-t border-section-line bg-background"
      >
        <div className={`${SLOUPEC} ${OBRAZOVKA} justify-between gap-6 px-6 pb-3 pt-6`}>
          <div>
            <h2 className="text-[29px] leading-[35px] tracking-[-0.65px] max-[374px]:text-2xl min-[375px]:whitespace-nowrap">
              Proč evropská alternativa
            </h2>
            <ul className="mt-3 flex flex-col gap-2.5 text-xs leading-[17px] text-muted">
              <li className="flex items-start gap-2.5">
                <Image src="/icon-kid.svg" alt="" width={18} height={18} className="shrink-0" />
                <p>
                  <strong className="font-semibold text-foreground">Má KID.</strong> Bez něj broker v&nbsp;EU fond drobnému
                  investorovi obvykle nenabídne. U&nbsp;těchto 4 amerických ETF jsme KID k&nbsp;{datum(etf.overeno)} na stránce
                  správce nenašli.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <Image src="/icon-compare.svg" alt="" width={18} height={18} className="shrink-0" />
                <p>
                  <strong className="font-semibold text-foreground">Dá se srovnat.</strong> Každý KID má stejnou osnovu:
                  riziko 1 až 7, náklady, scénáře výnosu.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <Image src="/icon-shield.svg" alt="" width={18} height={18} className="shrink-0" />
                <p>
                  <strong className="font-semibold text-foreground">Je v&nbsp;seznamu ČNB.</strong> Všechny 4 alternativy
                  jsou v&nbsp;seznamu ČNB fondů nabízených v&nbsp;ČR (k&nbsp;10.&nbsp;10.&nbsp;2026).
                </p>
              </li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* 4. Patička s upozorněními */}
      <footer className="border-t border-line bg-legal">
        <div className={`${SLOUPEC} px-6 py-6 text-[13px] leading-[17px] text-muted`}>
          <p>
            Marketingové sdělení. Nejde o&nbsp;investiční doporučení ani nabídku. Investice do ETF nesou riziko ztráty, minulá
            výkonnost není zárukou budoucích výnosů. Fondy jsou vedené v&nbsp;USD, výsledek v&nbsp;korunách ovlivní i&nbsp;kurz. Před
            investicí si přečti KID a&nbsp;prospekt fondu. &quot;KID nenalezen&quot; znamená, že jsme ho k&nbsp;datu ověření nenašli
            na stránce správce; neznamená, že fond nekoupí žádný broker.
          </p>
          <p className="mt-2">
            Kdo za stránkou stojí: Jan Reich, ukázka pro výběrové řízení. Nedostáváme provize od správců uvedených fondů
            ani od brokerů.
          </p>
          <p className="mt-2">
            Zdroje: stránky správců fondů (odkaz u&nbsp;každého řádku tabulky), NYSE, seznam ČNB, české KID. Údaje ověřeny 9. a&nbsp;10.&nbsp;10.&nbsp;2026.
          </p>
          <Link
            href="/zasady"
            className="relative mt-1 inline-flex min-h-11 items-center self-start text-xs text-accent underline"
          >
            Zásady zpracování osobních údajů
          </Link>
        </div>
      </footer>
    </main>
  );
}
