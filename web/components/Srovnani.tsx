// Tabulka srovnání: každý pár (americké ETF + UCITS alternativa) na jednom řádku, jen názvy a roční náklady.
// Klik na řádek ho rozbalí s dalšími údaji a zdrojem a zároveň vybere fond v kalkulačce. Otevřený je vždy nejvýš jeden řádek.
// Rozbalený řádek je jedna plocha přes celou šířku (řádek + detail, bez linek) a končí výzvou k přehledu pro daný fond
// (každý interaktivní prvek vede ke kontaktu).
"use client";

import { etf, pct, datum, zamereni, tvrdaMezera } from "@/lib/etf";
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
    <div className="flex flex-col gap-2.5">
      <div>
        <h2 className="text-[27.5px] font-medium leading-[34px] tracking-[-0.55px] max-[374px]:text-2xl min-[375px]:whitespace-nowrap">
          Srovnání 4 amerických ETF
        </h2>
        <p className="mt-2 text-[13px] leading-[18px] text-muted">
          Evropská alternativa je dražší. Za to má český KID a&nbsp;je v&nbsp;seznamu ČNB fondů nabízených v&nbsp;ČR. Klikni na řádek pro
          podrobnosti a&nbsp;zdroj.
        </p>
      </div>
      <div className="text-sm">
        <div className="grid grid-cols-[45px_1fr_84px] items-end gap-3 border-b border-[#344553] pb-1.5 text-[10px] font-semibold leading-[14px] text-subtle">
          <span>Fond USA</span>
          <span>Alternativa v EU</span>
          <span className="text-right">Roční náklady USA / EU</span>
        </div>
        {etf.pary.map((p, i) => {
          const open = otevreny === p.us.ticker;
          const predchoziOtevreny = i > 0 && otevreny === etf.pary[i - 1].us.ticker;
          // Linka je vždy pod řádkem; kolem rozbaleného bloku se vynechá, ať je plocha bez okrajů.
          const linka = open || predchoziOtevreny ? "border-transparent" : "border-line";
          return (
            <div
              key={p.us.ticker}
              className={`${open ? "-mx-4 bg-surface px-4" : ""} ${i === etf.pary.length - 1 && !open ? "border-b border-line" : ""}`}
            >
              {i > 0 && <div className={`h-px ${linka === "border-line" ? "bg-line" : "bg-transparent"}`} />}
              <button
                type="button"
                aria-expanded={open}
                onClick={() => klik(p.us.ticker)}
                className="grid min-h-11 w-full grid-cols-[45px_1fr_84px] items-center gap-3 text-left"
              >
                <span className="font-mono text-[17px] font-medium leading-[22px]">{p.us.ticker}</span>
                <span className="text-xs font-medium leading-4">{p.ucits.kratky_nazev}</span>
                <span className="flex justify-end gap-1 font-mono text-[11px] leading-[14px]">
                  <span className="w-10 whitespace-nowrap text-right">{pct(p.us.naklady_pct)}</span>
                  <span className="w-10 whitespace-nowrap text-right font-medium text-accent">
                    {pct(p.ucits.naklady_pct)}
                  </span>
                </span>
              </button>
              {open && (
                <div className="pb-4 pt-1 text-xs leading-[17px]">
                  <dl className="flex flex-col gap-2.5">
                    <div>
                      <dt className="text-[11px] font-semibold text-subtle">Zaměření</dt>
                      <dd className="text-muted">{zamereni[p.us.ticker]}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold text-subtle">{p.us.ticker}</dt>
                      <dd className="text-muted">
                        kótováno na {p.us.burza}; KID pro EU retail jsme na stránce správce nenašli k&nbsp;{datum(p.us.kid_overeno)};{" "}
                        <a
                          href={p.us.zdroj}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track("source_click", { ticker: p.us.ticker })}
                          className="font-medium text-accent underline"
                        >
                          zdroj: stránka správce
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold text-subtle">Alternativa</dt>
                      <dd className="text-muted">
                        {p.ucits.nazev}
                        {p.ucits.index_poznamka ? `; ${tvrdaMezera(p.ucits.index_poznamka)}` : ""}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold text-subtle">Zdroj</dt>
                      <dd className="text-muted">
                        český KID ze dne {datum(p.ucits.kid_datum)} (odkaz je v&nbsp;přehledu), seznam ČNB k&nbsp;10.&nbsp;10.&nbsp;2026;
                        replikace {p.ucits.replikace}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href="#formular"
                    onClick={() => track("cta_click", { cta: "radek_prehled", ticker: p.us.ticker })}
                    className="mt-3 flex h-11 items-center justify-center rounded-[5px] bg-accent text-[13px] font-semibold text-accent-foreground"
                  >
                    Získat ISIN a&nbsp;český KID zdarma
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs leading-4 text-muted">
        Roční náklady na správu a&nbsp;provoz fondu: USA podle správce, EU podle českého KID (bez transakčních nákladů fondu).
        Seřazeno abecedně podle tickeru.
      </p>
    </div>
  );
}
