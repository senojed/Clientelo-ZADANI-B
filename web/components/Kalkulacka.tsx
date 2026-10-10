// Výpočet modelového rozdílu ročního poplatku fondu: částka × (náklady UCITS − náklady US ETF).
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

export default function Kalkulacka({ ticker, onTicker }: Props) {
  const [castka, setCastka] = useState(100000);
  const pouzito = useRef(false);
  const par = etf.pary.find((p) => p.us.ticker === ticker) ?? etf.pary[0];

  const us = rocniPoplatek(castka, par.us.naklady_pct);
  const ucits = rocniPoplatek(castka, par.ucits.naklady_pct);

  // Událost "interaction_used" jen jednou za relaci, ať neplní databázi při každém posunu.
  function zaznamenej() {
    if (!pouzito.current) {
      pouzito.current = true;
      track("interaction_used", { ticker });
    }
  }

  return (
    <div className="rounded-box bg-surface p-4">
      <h2 className="text-lg font-semibold">Rozdíl ročního poplatku fondu</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm">
        <select
          aria-label="Fond"
          value={par.us.ticker}
          onChange={(e) => {
            onTicker(e.target.value);
            zaznamenej();
          }}
          className="rounded-box border border-line bg-background px-3 py-2"
        >
          {etf.pary.map((p) => (
            <option key={p.us.ticker} value={p.us.ticker}>
              {p.us.ticker} a {p.ucits.kratky_nazev}
            </option>
          ))}
        </select>
        <label className="flex flex-col gap-1">
          <span className="text-muted">Investovaná částka: {kc(castka)}</span>
          <input
            type="range"
            min={10000}
            max={1000000}
            step={10000}
            value={castka}
            onChange={(e) => {
              setCastka(Number(e.target.value));
              zaznamenej();
            }}
          />
        </label>
      </div>
      <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
        <dt className="text-muted">
          {par.us.ticker} ({pct(par.us.naklady_pct)})
        </dt>
        <dd className="text-right">{kc(us)} ročně</dd>
        <dt className="text-muted">
          {par.ucits.kratky_nazev} ({pct(par.ucits.naklady_pct)})
        </dt>
        <dd className="text-right">{kc(ucits)} ročně</dd>
        <dt className="font-medium">Rozdíl</dt>
        <dd className="text-right font-medium">{kc(ucits - us)} ročně</dd>
      </dl>
      <p className="mt-2 text-xs text-muted">
        Modelový výpočet jen z ročního poplatku fondu. Bez kurzů, spreadů, daní a poplatků brokera.
      </p>
    </div>
  );
}
