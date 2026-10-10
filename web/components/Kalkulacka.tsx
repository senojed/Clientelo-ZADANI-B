// Výpočet modelového rozdílu ročního poplatku fondu: částka × (náklady UCITS − náklady US ETF).
// Výsledek je vidět hned s předvyplněnou částkou; nejde o celkové náklady investora (bez kurzů, spreadů, daní, brokera).
"use client";

import { useRef, useState } from "react";
import { etf, kc, pct, rocniPoplatek } from "@/lib/etf";
import { track } from "@/lib/track";

export default function Kalkulacka() {
  const [ticker, setTicker] = useState("VOO");
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
    <div>
      <h2 className="text-2xl font-semibold">Kolik je rozdíl v ročním poplatku fondu</h2>
      <div className="mt-4 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-muted">Fond</span>
          <select
            value={ticker}
            onChange={(e) => {
              setTicker(e.target.value);
              zaznamenej();
            }}
            className="rounded-box border border-line bg-background px-3 py-2"
          >
            {etf.pary.map((p) => (
              <option key={p.us.ticker} value={p.us.ticker}>
                {p.us.ticker} a jeho UCITS alternativa
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-muted">Investovaná částka: {kc(castka)}</span>
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
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 rounded-box bg-surface p-4">
        <dt className="text-muted">{par.us.ticker} ({pct(par.us.naklady_pct)})</dt>
        <dd className="text-right">{kc(us)} ročně</dd>
        <dt className="text-muted">UCITS alternativa ({pct(par.ucits.naklady_pct)})</dt>
        <dd className="text-right">{kc(ucits)} ročně</dd>
        <dt className="font-medium">Modelový rozdíl ročního poplatku fondu</dt>
        <dd className="text-right font-medium">{kc(ucits - us)} ročně</dd>
      </dl>
      <p className="mt-2 text-sm text-muted">
        Jen roční poplatek fondu z uvedené částky. Bez kurzů, spreadů, daní a poplatků brokera, nejde o celkové náklady.
      </p>
      <a
        href="#formular"
        onClick={() => track("cta_click", { cta: "vypocet_prehled" })}
        className="mt-4 block rounded-box border border-accent px-5 py-3 text-center font-medium text-accent"
      >
        Získat celý přehled zdarma
      </a>
    </div>
  );
}
