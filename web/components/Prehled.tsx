// Plný přehled po odeslání e-mailu (stránka /prehled). Data dostane od serveru až po ověření tokenu.
// Návštěvník si může zkopírovat odkaz (platí 24 h) nebo stáhnout hotové PDF přehledu (/prehled/pdf, vydá se s tokenem z adresy).
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { EtfData } from "@/lib/etf-plna";
import { datum, pct, tvrdaMezera, zamereni } from "@/lib/etf";
import { track } from "@/lib/track";

// Vestavěný prohlížeč Facebooku a Instagramu stahování souborů obvykle neumí.
function jeVestavenyProhlizec(): boolean {
  return /FBAN|FBAV|FB_IAB|Instagram/i.test(navigator.userAgent);
}

export default function Prehled({ data }: { data: EtfData }) {
  const [zkopirovano, setZkopirovano] = useState<string | null>(null);
  // Token z adresy přehledu: stejný odkaz ověří i stažení PDF.
  const token = useSearchParams().get("t") ?? "";
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
          <a
            href={`/prehled/pdf?t=${encodeURIComponent(token)}`}
            download
            onClick={() => track("pdf_download_clicked")}
            className="flex items-center rounded-box border border-accent px-4 min-h-11 text-accent"
          >
            Stáhnout PDF
          </a>
        </div>
        {vestaveny && (
          <p className="no-print mt-2 text-sm text-muted">
            Jsi ve Facebooku nebo Instagramu: pokud se PDF nestáhne, otevři stránku v&nbsp;prohlížeči (menu ⋯, Otevřít v&nbsp;prohlížeči).
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
            nenašli k&nbsp;{datum(p.us.kid_overeno)} ·{" "}
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
              {"index_poznamka" in p.ucits && p.ucits.index_poznamka ? ` (${tvrdaMezera(p.ucits.index_poznamka)})` : ""} · replikace:{" "}
              {p.ucits.replikace} · roční náklady {pct(p.ucits.naklady_pct)} (správa a&nbsp;provoz podle KID, bez transakčních
              nákladů)
            </p>
            <p className="mt-1 text-sm">
              <a href={p.ucits.kid_url} className="underline" target="_blank" rel="noopener noreferrer">
                Český KID ze dne {datum(p.ucits.kid_datum)}
              </a>{" "}
              · v&nbsp;seznamu ČNB fondů nabízených v&nbsp;ČR (ověřeno 10.&nbsp;10.&nbsp;2026)
            </p>
          </div>
        </section>
      ))}

      <section>
        <h2 className="text-xl font-medium">Kontrolní seznam: jak si ETF ověřit u&nbsp;brokera</h2>
        <ol className="mt-3 list-decimal pl-5 flex flex-col gap-2">
          <li>Vyhledej fond u&nbsp;svého brokera podle ISIN (ne jen podle zkratky, ta se na různých burzách liší).</li>
          <li>Ověř, že broker k&nbsp;fondu nabízí KID a&nbsp;že ISIN v&nbsp;KID odpovídá.</li>
          <li>Zkontroluj burzu a&nbsp;měnu, ve které fond u&nbsp;brokera koupíš (stejný fond bývá na více burzách a&nbsp;v&nbsp;různých měnách).</li>
          <li>Podívej se na poplatky brokera a&nbsp;směnu měny, ty v&nbsp;ročních nákladech fondu nejsou.</li>
          <li>Když broker fond nenabízí, ověř si, zda nejde o&nbsp;omezení pro tvůj typ klienta.</li>
          <li>Před nákupem si přečti KID: ukazatel rizika, scénáře a&nbsp;doporučenou dobu držení.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-medium">Pojmy lidsky</h2>
        <ul className="mt-3 flex flex-col gap-2">
          <li>
            <span className="font-medium">KID</span>: krátký povinný dokument o&nbsp;riziku, nákladech a&nbsp;scénářích. Bez něj se fond
            drobným investorům v&nbsp;EU obvykle nenabízí.
          </li>
          <li>
            <span className="font-medium">PRIIPs</span>: evropské nařízení, které KID vyžaduje.
          </li>
          <li>
            <span className="font-medium">UCITS</span>: evropská pravidla pro fondy. UCITS ETF mají KID a&nbsp;mohou být registrované
            k&nbsp;nabízení v&nbsp;ČR.
          </li>
          <li>
            <span className="font-medium">Fyzická a&nbsp;syntetická replikace</span>: fyzický fond drží akcie z&nbsp;indexu, syntetický
            sleduje index přes smlouvy (swapy). Všechny 4 alternativy v&nbsp;přehledu jsou fyzické.
          </li>
          <li>
            <span className="font-medium">Měnové riziko</span>: fondy jsou vedené v&nbsp;USD, výsledek v&nbsp;korunách ovlivní i&nbsp;kurz.
          </li>
        </ul>
      </section>

      <p className="text-sm text-muted">
        Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty. Údaje ověřeny 9. a&nbsp;10.&nbsp;10.&nbsp;2026,
        náklady US ETF podle správců, náklady UCITS podle českých KID.
      </p>
    </article>
  );
}
