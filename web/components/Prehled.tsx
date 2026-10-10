// Plný přehled po odeslání e-mailu (stránka /prehled). Data dostane od serveru až po ověření tokenu.
// Návštěvník si může zkopírovat odkaz (platí 24 h) nebo stránku uložit jako PDF tiskem prohlížeče.
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { EtfData } from "@/lib/etf-plna";
import { datum, pct, zamereni } from "@/lib/etf";
import { track } from "@/lib/track";

// Vestavěný prohlížeč Facebooku a Instagramu tisk do PDF obvykle neumí.
function jeVestavenyProhlizec(): boolean {
  return /FBAN|FBAV|FB_IAB|Instagram/i.test(navigator.userAgent);
}

export default function Prehled({ data }: { data: EtfData }) {
  const [zkopirovano, setZkopirovano] = useState<string | null>(null);
  // Na serveru prohlížeč neznáme (false), v prohlížeči se zjistí z user agentu.
  const vestaveny = useSyncExternalStore(
    () => () => {},
    jeVestavenyProhlizec,
    () => false,
  );

  useEffect(() => {
    track("overview_shown");
  }, []);

  async function kopiruj(text: string, co: string) {
    try {
      await navigator.clipboard.writeText(text);
      setZkopirovano(co);
    } catch {
      setZkopirovano(null);
    }
  }

  return (
    <article className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-medium">Hotovo. Tady je celý přehled.</h1>
        <p className="mt-2 text-sm text-muted">Odkaz na tuto stránku platí 24 hodin.</p>
        <div className="no-print mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              track("link_copied");
              kopiruj(window.location.href, "odkaz");
            }}
            className="rounded-box border border-accent px-4 min-h-11 text-accent"
          >
            {zkopirovano === "odkaz" ? "Odkaz zkopírován" : "Zkopírovat odkaz"}
          </button>
          <button
            type="button"
            onClick={() => {
              track("pdf_download_clicked");
              window.print();
            }}
            className="rounded-box border border-accent px-4 min-h-11 text-accent"
          >
            Uložit jako PDF
          </button>
        </div>
        {vestaveny && (
          <p className="no-print mt-2 text-sm text-muted">
            Jsi ve Facebooku nebo Instagramu: pro uložení PDF otevři stránku v prohlížeči (menu ⋯, Otevřít v prohlížeči).
          </p>
        )}
      </div>

      {data.pary.map((p) => (
        <section key={p.us.ticker} className="rounded-box border border-line p-4">
          <h2 className="text-xl font-medium">
            {p.us.ticker}: {zamereni[p.us.ticker]}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {p.us.nazev} · {p.us.burza} · roční náklady {pct(p.us.naklady_pct)} · KID pro EU retail jsme na stránce správce
            nenašli k {datum(p.us.kid_overeno)} ·{" "}
            <a href={p.us.zdroj} className="underline" target="_blank" rel="noopener noreferrer">
              zdroj
            </a>
          </p>
          <div className="mt-3 rounded-box bg-surface p-3">
            <p className="font-medium">{p.ucits.nazev}</p>
            <p className="mt-1 flex flex-wrap items-center gap-2">
              ISIN <span className="font-mono">{p.ucits.isin}</span>
              <button
                type="button"
                onClick={() => kopiruj(p.ucits.isin, p.ucits.isin)}
                className="no-print rounded border border-line px-3 min-h-11 text-sm"
              >
                {zkopirovano === p.ucits.isin ? "Zkopírováno" : "Kopírovat"}
              </button>
            </p>
            <p className="mt-1 text-sm">
              Index: {p.ucits.index}
              {"index_poznamka" in p.ucits && p.ucits.index_poznamka ? ` (${p.ucits.index_poznamka})` : ""} · replikace:{" "}
              {p.ucits.replikace} · roční náklady {pct(p.ucits.naklady_pct)} (správa a provoz podle KID, bez transakčních
              nákladů)
            </p>
            <p className="mt-1 text-sm">
              <a href={p.ucits.kid_url} className="underline" target="_blank" rel="noopener noreferrer">
                Český KID ze dne {datum(p.ucits.kid_datum)}
              </a>{" "}
              · v seznamu ČNB fondů nabízených v ČR (ověřeno 10. 10. 2026)
            </p>
          </div>
        </section>
      ))}

      <section>
        <h2 className="text-xl font-medium">Kontrolní seznam: jak si ETF ověřit u brokera</h2>
        <ol className="mt-3 list-decimal pl-5 flex flex-col gap-2">
          <li>Vyhledej fond u svého brokera podle ISIN (ne jen podle zkratky, ta se na různých burzách liší).</li>
          <li>Ověř, že broker k fondu nabízí KID a že ISIN v KID odpovídá.</li>
          <li>Zkontroluj burzu a měnu, ve které fond u brokera koupíš (stejný fond bývá na více burzách a v různých měnách).</li>
          <li>Podívej se na poplatky brokera a směnu měny, ty v ročních nákladech fondu nejsou.</li>
          <li>Když broker fond nenabízí, ověř si, zda nejde o omezení pro tvůj typ klienta.</li>
          <li>Před nákupem si přečti KID: ukazatel rizika, scénáře a doporučenou dobu držení.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-medium">Pojmy lidsky</h2>
        <ul className="mt-3 flex flex-col gap-2">
          <li>
            <span className="font-medium">KID</span>: krátký povinný dokument o riziku, nákladech a scénářích. Bez něj se fond
            drobným investorům v EU obvykle nenabízí.
          </li>
          <li>
            <span className="font-medium">PRIIPs</span>: evropské nařízení, které KID vyžaduje.
          </li>
          <li>
            <span className="font-medium">UCITS</span>: evropská pravidla pro fondy. UCITS ETF mají KID a mohou být registrované
            k nabízení v ČR.
          </li>
          <li>
            <span className="font-medium">Fyzická a syntetická replikace</span>: fyzický fond drží akcie z indexu, syntetický
            sleduje index přes smlouvy (swapy). Všechny 4 alternativy v přehledu jsou fyzické.
          </li>
          <li>
            <span className="font-medium">Měnové riziko</span>: fondy jsou vedené v USD, výsledek v korunách ovlivní i kurz.
          </li>
        </ul>
      </section>

      <p className="text-sm text-muted">
        Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty. Údaje ověřeny 9. a 10. 10. 2026,
        náklady US ETF podle správců, náklady UCITS podle českých KID.
      </p>
    </article>
  );
}
