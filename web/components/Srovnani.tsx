// Tabulka srovnání: každý pár (americké ETF + UCITS alternativa) na jednom řádku, jen názvy a roční náklady.
// Klik na řádek ho rozbalí s dalšími údaji a zdrojem a zároveň vybere fond v kalkulačce. Otevřený je vždy nejvýš jeden řádek.
// Rozbalený řádek končí výzvou k přehledu pro daný fond (každý interaktivní prvek vede ke kontaktu).
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
        podrobnosti a zdroj.
      </p>
      <div className="mt-4 rounded-box border border-line text-sm">
        <div className="grid grid-cols-[3rem_1fr_3.5rem_3.5rem] gap-2 border-b border-line px-3 py-2 text-xs text-muted">
          <span>Fond USA</span>
          <span>Alternativa v EU</span>
          <span className="col-span-2 text-right">Roční náklady USA / EU</span>
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
                <div className="bg-surface px-3 pb-3 text-xs">
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                    <dt className="text-muted">Zaměření</dt>
                    <dd>{zamereni[p.us.ticker]}</dd>
                    <dt className="text-muted">{p.us.ticker}</dt>
                    <dd>
                      kótováno na {p.us.burza}; KID pro EU retail jsme na stránce správce nenašli k{" "}
                      {datum(p.us.kid_overeno)};{" "}
                      <a
                        href={p.us.zdroj}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("source_click", { ticker: p.us.ticker })}
                        className="underline"
                      >
                        zdroj: stránka správce
                      </a>
                    </dd>
                    <dt className="text-muted">Alternativa</dt>
                    <dd>
                      {p.ucits.nazev}
                      {p.ucits.index_poznamka ? `; ${p.ucits.index_poznamka}` : ""}
                    </dd>
                    <dt className="text-muted">Zdroj</dt>
                    <dd>
                      český KID ze dne {datum(p.ucits.kid_datum)} (odkaz je v přehledu), seznam ČNB k 10. 10. 2026;
                      replikace {p.ucits.replikace}
                    </dd>
                  </dl>
                  <a
                    href="#formular"
                    onClick={() => track("cta_click", { cta: "radek_prehled", ticker: p.us.ticker })}
                    className="mt-3 block rounded-box bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground"
                  >
                    Získat ISIN a český KID zdarma
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-muted">
        Roční náklady na správu a provoz fondu: USA podle správce, EU podle českého KID (bez transakčních nákladů fondu).
        Seřazeno abecedně podle tickeru.
      </p>
    </div>
  );
}
