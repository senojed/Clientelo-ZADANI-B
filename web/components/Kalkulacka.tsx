// Výpočet modelového rozdílu ročního poplatku fondu: částka × (náklady UCITS − náklady US ETF).
// Pod výsledkem je výzva k přehledu pro vybraný fond (interakce vede ke kontaktu).
// Fond vybírá rodič (klik na řádek tabulky nebo výběr tady), aby tabulka a kalkulačka ukazovaly totéž.
// Nejde o celkové náklady investora (bez kurzů, spreadů, daní, brokera).
"use client";

import { useRef, useState } from "react";
import { etf, kc, pct, rocniPoplatek } from "@/lib/etf";
import { track } from "@/lib/track";

type Props = {
  ticker: string;
  onTicker: (ticker: string) => void;
};

const MIN = 10000;
const MAX = 1000000;

export default function Kalkulacka({ ticker, onTicker }: Props) {
  const [castka, setCastka] = useState(100000);
  const pouzito = useRef(false);
  const par = etf.pary.find((p) => p.us.ticker === ticker) ?? etf.pary[0];

  const us = rocniPoplatek(castka, par.us.naklady_pct);
  const ucits = rocniPoplatek(castka, par.ucits.naklady_pct);
  // Kolik procent dráhy posuvníku je zlatých (CSS proměnná --pct v globals.css).
  const vyplneni = ((castka - MIN) / (MAX - MIN)) * 100;

  // Událost "interaction_used" jen jednou za relaci, ať neplní databázi při každém posunu.
  function zaznamenej() {
    if (!pouzito.current) {
      pouzito.current = true;
      track("interaction_used", { ticker });
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-[22px] leading-[26px] tracking-[-0.9px]">Rozdíl ročního poplatku fondu</h2>

      {/* Výběr fondu: obyčejný <select> (funguje na všech telefonech), tečka a šipka jsou jen vzhled. */}
      <div className="relative">
        <select
          aria-label="Fond"
          value={par.us.ticker}
          onChange={(e) => {
            onTicker(e.target.value);
            zaznamenej();
          }}
          className="h-11 w-full appearance-none rounded-box border border-track bg-surface pl-8 pr-9 text-xs font-semibold text-foreground"
        >
          {etf.pary.map((p) => (
            <option key={p.us.ticker} value={p.us.ticker}>
              {p.us.ticker} a {p.ucits.kratky_nazev}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-accent">
          ●
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-subtle"
        >
          <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <label className="block">
        <span className="flex items-center justify-between">
          <span className="text-xs text-muted">Investovaná částka:</span>
          <span className="font-mono text-[17px] font-medium leading-[22px] text-accent">{kc(castka)}</span>
        </span>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={10000}
          value={castka}
          onChange={(e) => {
            setCastka(Number(e.target.value));
            zaznamenej();
          }}
          style={{ "--pct": `${vyplneni}%` } as React.CSSProperties}
          className="posuvnik"
        />
      </label>

      <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-line pt-2 text-xs leading-4">
        <dt className="text-muted">
          {par.us.ticker} ({pct(par.us.naklady_pct)})
        </dt>
        <dd className="text-right font-mono">{kc(us)} ročně</dd>
        <dt className="text-muted">
          {par.ucits.kratky_nazev} ({pct(par.ucits.naklady_pct)})
        </dt>
        <dd className="text-right font-mono">{kc(ucits)} ročně</dd>
      </dl>

      <div className="flex h-10 items-center justify-between rounded-box bg-result px-3 text-[13px] font-medium text-accent">
        <span>Rozdíl</span>
        <span className="font-mono text-[19px] leading-[25px]">
          {kc(ucits - us)} <small className="font-sans text-xs">ročně</small>
        </span>
      </div>

      <p className="text-pretty text-xs leading-4 text-muted">
        Modelový výpočet jen z&nbsp;ročních nákladů fondu na správu a&nbsp;provoz.
        <br />
        Bez transakčních nákladů fondu, kurzů, spreadů, daní a&nbsp;poplatků brokera.
        <br />
        Fondy jsou v&nbsp;USD, výsledek v&nbsp;korunách ovlivní i&nbsp;kurz. Před investicí si přečti KID.
      </p>
      <a
        href="#formular"
        onClick={() => track("cta_click", { cta: "kalkulacka_prehled", ticker: par.us.ticker })}
        className="flex h-11 items-center justify-center rounded-[5px] bg-accent text-[13px] font-semibold text-accent-foreground"
      >
        Získat ISIN a&nbsp;český KID zdarma
      </a>
    </div>
  );
}
