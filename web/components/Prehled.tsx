// Plný přehled po odeslání e-mailu: data si stáhne z /api/prehled s podepsaným tokenem.
// "Uložit jako PDF" použije tisk prohlížeče (dočasná záloha, dokud nebude hotové navržené PDF).
"use client";

import { useEffect, useState } from "react";
import type { EtfData } from "@/lib/etf";
import { datum, pct, zamereni } from "@/lib/etf";
import { track } from "@/lib/track";

export default function Prehled({ token }: { token: string }) {
  const [data, setData] = useState<EtfData | null>(null);
  const [chyba, setChyba] = useState(false);
  const [zkopirovano, setZkopirovano] = useState<string | null>(null);

  useEffect(() => {
    track("pdf_requested");
    fetch(`/api/prehled?t=${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setData)
      .catch(() => setChyba(true));
  }, [token]);

  if (chyba) return <p>Přehled se nepodařilo načíst. Obnov prosím stránku a odešli formulář znovu.</p>;
  if (!data) return <p>Načítám přehled...</p>;

  async function kopiruj(isin: string) {
    try {
      await navigator.clipboard.writeText(isin);
      setZkopirovano(isin);
    } catch {
      setZkopirovano(null);
    }
  }

  return (
    <article className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold">Hotovo. Tady je celý přehled.</h2>
        <button
          type="button"
          onClick={() => {
            track("pdf_download_clicked");
            window.print();
          }}
          className="no-print mt-3 rounded-box border border-accent px-4 py-2 text-accent"
        >
          Uložit jako PDF
        </button>
      </div>

      {data.pary.map((p) => (
        <section key={p.us.ticker} className="rounded-box border border-line p-4">
          <h3 className="text-xl font-semibold">
            {p.us.ticker}: {zamereni[p.us.ticker]}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {p.us.nazev} · {p.us.burza} · roční náklady {pct(p.us.naklady_pct)} · KID pro EU retail nenalezen k{" "}
            {datum(p.us.kid_overeno)} ·{" "}
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
                onClick={() => kopiruj(p.ucits.isin)}
                className="no-print rounded border border-line px-2 py-0.5 text-sm"
              >
                {zkopirovano === p.ucits.isin ? "Zkopírováno" : "Kopírovat"}
              </button>
            </p>
            <p className="mt-1 text-sm">
              Index: {p.ucits.index} · replikace: {p.ucits.replikace} · roční náklady {pct(p.ucits.naklady_pct)}
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
        <h3 className="text-xl font-semibold">Kontrolní seznam: jak si ETF ověřit u brokera</h3>
        <ol className="mt-3 list-decimal pl-5 flex flex-col gap-2">
          <li>Vyhledej fond u svého brokera podle ISIN (ne jen podle zkratky, ta se na různých burzách liší).</li>
          <li>Ověř, že broker k fondu nabízí KID a že ISIN v KID odpovídá.</li>
          <li>Zkontroluj burzu a měnu, ve které fond u brokera koupíš (stejný fond bývá na více burzách a v různých měnách).</li>
          <li>Podívej se na poplatky brokera a směnu měny, ty v ročních nákladech fondu nejsou.</li>
          <li>Když broker fond nenabízí, ověř si, zda nejde o omezení pro tvůj typ klienta.</li>
        </ol>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Pojmy lidsky</h3>
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
        </ul>
      </section>

      <p className="text-sm text-muted">
        Informační přehled, ne investiční doporučení. Údaje ověřeny 9. a 10. 10. 2026, náklady US ETF podle správců, náklady
        UCITS podle českých KID.
      </p>
    </article>
  );
}
