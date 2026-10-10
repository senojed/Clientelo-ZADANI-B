// Tabulka srovnání: každý pár (americké ETF + UCITS alternativa) na jednom řádku, jen názvy a roční náklady.
// Klik na řádek ho rozbalí s dalšími údaji a zároveň vybere fond v kalkulačce. Otevřený je vždy nejvýš jeden řádek.
"use client";

import { etf, pct, datum, zamereni } from "@/lib/etf";
import { track } from "@/lib/track";

type Props = {
  otevreny: string | null;
  onVyber: (ticker: string | null) => void;
};

export default function Srovnani({ otevreny, onVyber }: Props) {
  function klik(ticker: string) {
    const zavrit = otevreny === ticker;
    onVyber(zavrit ? null : ticker);
    if (!zavrit) track("row_expand", { ticker });
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Srovnání 4 amerických ETF</h2>
      <p className="mt-2 text-sm text-muted">
        Evropská alternativa je dražší. Za to má český KID a je v seznamu ČNB fondů nabízených v ČR. Klikni na řádek pro
        podrobnosti.
      </p>
      <div className="mt-4 rounded-box border border-line text-sm">
        <div className="grid grid-cols-[3rem_1fr_3.5rem_3.5rem] gap-2 border-b border-line px-3 py-2 text-xs text-muted">
          <span>USA</span>
          <span>Alternativa v EU</span>
          <span className="text-right">USA</span>
          <span className="text-right">EU</span>
        </div>
        {etf.pary.map((p) => {
          const open = otevreny === p.us.ticker;
          return (
            <div key={p.us.ticker} className="border-b border-line last:border-b-0">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => klik(p.us.ticker)}
                className={`grid w-full grid-cols-[3rem_1fr_3.5rem_3.5rem] items-center gap-2 px-3 py-3 text-left ${
                  open ? "bg-surface" : ""
                }`}
              >
                <span className="font-semibold">{p.us.ticker}</span>
                <span>{p.ucits.kratky_nazev}</span>
                <span className="text-right">{pct(p.us.naklady_pct)}</span>
                <span className="text-right font-medium">{pct(p.ucits.naklady_pct)}</span>
              </button>
              {open && (
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 bg-surface px-3 pb-3 text-xs">
                  <dt className="text-muted">Zaměření</dt>
                  <dd>{zamereni[p.us.ticker]}</dd>
                  <dt className="text-muted">{p.us.ticker}</dt>
                  <dd>
                    kótováno na {p.us.burza}, KID pro EU retail nenalezen k {datum(p.us.kid_overeno)}
                  </dd>
                  <dt className="text-muted">Alternativa</dt>
                  <dd>{p.ucits.nazev}</dd>
                  <dt className="text-muted">Dokumenty</dt>
                  <dd>
                    český KID ze dne {datum(p.ucits.kid_datum)}, v seznamu ČNB, replikace {p.ucits.replikace}
                  </dd>
                </dl>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-muted">
        Roční náklady: USA podle správce, EU podle českého KID.
      </p>
    </div>
  );
}
