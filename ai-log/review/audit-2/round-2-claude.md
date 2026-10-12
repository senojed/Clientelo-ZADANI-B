# Audit 2, kolo 2: nezávislý Claude auditor

Stav: commit 4f626b9 (main), živá stránka https://clientelo-zadani-b.vercel.app ověřena 12. 10. 2026 (jen GET). Nic jsem neměnil kromě tohoto souboru.

## 1. Kontrola oprav z kola 1

| Nález | Stav | Jak ověřeno / co chybí |
|---|---|---|
| Cl1 písmo polí 16 px na mobilu | FIXED | Živé CSS obsahuje `@media (max-width:767px){input[type=email],input[type=text],select{font-size:16px!important}}`. Jiná textová pole (bez typu, textarea) na stránce nejsou. |
| Cx1 cookie lišta / ePrivacy | FIXED | README, `compliance/checklist.md` (nový nezaškrtnutý bod pro právní kontrolu) i živé `/zasady` ("cookies ani úložiště prohlížeče, identifikátor jen v paměti"). V `web/` není `localStorage`, `sessionStorage` ani `document.cookie`, tvrzení sedí. |
| Cx3, Cl16 export ai-logu | PARTIAL | 7 sezení a 13 subagentů je v repu. Chybí: viz body 2 a 3 níže (duplicitní obsah, zastaralý odkaz v README ai-logu). Export končí 12. 10. 05:32 UTC, commit 4f626b9 a závěr auditu 2 v něm nejsou; README to přiznává ("finální export se obnovuje těsně před zveřejněním"), jen to nezapomenout. |
| Cl13 Neon, Inc., USA | FIXED | Živé `/zasady`. |
| Cl7 Lighthouse doložen | FIXED (drobnost) | `docs/lighthouse/2026-10-12-mobil.report.json`, `-mereni-2.json`, `-mereni-3.json`: výkon 94/96/96, LCP 2,7/2,4/2,5 s, CLS 0, přístupnost/BP/SEO 100. TBT je 60/30/40 ms, README píše jen "TBT 60 ms" (viz bod 5). |
| Cl8 "zhruba jedna obrazovka" | FIXED | README. |
| Cl10, Cx7 limity a reset o půlnoci | FIXED | `web/lib/ratelimit.ts` (20 / 1000, den v otisku), README popisuje. |
| Cl11 lead = odeslání | FIXED | README + poznámka v `web/db/funnel.sql`. |
| Cl12 bezpečnostní hlavičky | FIXED | Živě: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Content-Security-Policy: frame-ancestors 'none'` (+ HSTS od Vercelu). |
| Cl15, Cl14, Cx5 úklid repa | PARTIAL | `allowedDevOrigins`, `design/texty`, šablonová SVG, `web/README.md` OK. Po nahrazení kopie IVV ale `data/overeni.md` cituje důkaz, který v repu už není (bod 4). |
| Cx6 tělo `null` / pole | FIXED | Kontrola v obou routách před destrukturováním. Živě netestováno (zákaz POST). |
| Cx4 poměr viditelnosti | FIXED | `threshold: 0.3` + kontrola poměru (drobná poznámka v bodě 6). |
| Cx9 PLAN.md | FIXED | Odchylka doplněna v "Aktuální stav". |
| Cl4 "Je v seznamu ČNB" | FIXED | Živě. |
| Cl14 brána za e-mailem je ukázka | FIXED | README, Technické řešení. |
| Rozhodnutí 1: PDF 5 stran | FIXED | `web/private/prehled-etf.pdf`: 5 neprázdných stran, patičky 1/5 až 5/5, data sedí s webem. Živě `/prehled/pdf` bez tokenu vrací 401 (správně); shodu nasazeného PDF s repem bez tokenu ověřit nejde. |
| Rozhodnutí 3: věta o KID v úvodu | FIXED | Živě "U VOO, IVV, DIA ani VT jsme KID na stránce správce nenašli. ..."; doloženo v `data/overeni.md` u všech čtyř fondů. PDF str. 1 má dál starou větu "většinou nemají KID", hned ale následuje konkrétní věta o čtyřech fondech, takže to není nepravda. |

## 2. Odmítnuté a rozhodnuté body

Žádný z nich nepovažuji za blokující. Rozhodnutí o "Roční náklady" v reklamách je v README skutečně zdokumentované. Cx8 (bezpečná zóna 9:16) jsem znovu neměřil, proti zdůvodnění nemám námitku. Historie gitu s cestou: přijaté riziko.

## 3. Nálezy (nové nebo zbylé)

1. **Závažnost:** MINOR
   **Kde:** `ai-log/claude-code/02-rada-a-plan.md:4199`, `03-revize-planu.md:4199`, `04-hlavni-sezeni.md:4199` (`[redacted počítač]`); `06-pokracovani-12-10.md:5624` (testovací řetězec `[redacted IP]` obsahuje Tailscale IP [redacted IP]); `ai-log/review/audit-2/round-1-claude.md:82` (IP doslovně).
   **Problém:** Redakce propustila název počítače a privátní IP. IP je z rozsahu 100.64.0.0/10 (z internetu nedostupná) a je i v historii gitu, takže riziko je nízké, ale README ai-logu tvrdí "adresy z privátních sítí a VPN nahrazeny". Regex IP selže, když adrese předchází číslice a tečka (záporný lookbehind).
   **Návrh:** Přidat do `REDAKCE` pravidlo pro `DESKTOP-[A-Z0-9]+` a IP bez lookbehindu (nebo prostě doslovně `100\.108\.50\.6`), přegenerovat export; v `round-1-claude.md` IP nahradit `[redacted IP]`.

2. **Závažnost:** MINOR
   **Kde:** `ai-log/claude-code/02`, `03`, `04`, `05`, `06`
   **Problém:** Soubory se z velké části překrývají: 02 je skoro celé obsažené v 03 a 03 v 04 (rozdíl v překryvu 48 a 8 řádků), 05 v 06 (20 řádků). Všechny tři začínají stejnou zprávou z 9. 10. 11:01 UTC. README ai-logu je ale popisuje jako samostatná sezení s jiným obsahem (04 "data, stránka a audit 1"). Hodnotitel tak čte zhruba 1,2 MB dvakrát nebo třikrát a nepozná, kde nové sezení začíná.
   **Návrh:** Buď exportovat jen novou část (od prvního nového záznamu), nebo v README ai-logu napsat, že pokračující sezení obsahuje i předchozí historii a od kterého času je nové.

3. **Závažnost:** MINOR
   **Kde:** `ai-log/README.md:8`, tabulka
   **Problém:** Odkaz na `hlavni-session.md`, který už neexistuje (teď `04-hlavni-sezeni.md` atd.). Tabulka nezmiňuje složky `review/audit-1/` a `review/audit-2/`.
   **Návrh:** Opravit název souboru a doplnit dva řádky pro audity.

4. **Závažnost:** MINOR
   **Kde:** `data/overeni.md:17` vs `data/dukazy/2026-10-09-ivv-us-produktova-stranka.md`
   **Problém:** Řádek IVV dál uvádí jako důkaz "uložená kopie stránky obsahuje `fundHeader.keyDocuments.EUPRIIP":""`" a "zmínky PRIIP jinde jsou jen obecné texty šablony". Kopie byla smazána a nový výňatek tento údaj neobsahuje; naopak píše "v textu stránky se tato slova nevyskytují", což si s "zmínky PRIIP jinde" protiřečí.
   **Návrh:** Do výňatku doslovně přidat položku `EUPRIIP":""` (a případně odkaz na commit, kde je původní kopie v historii), větu o výskytu slova PRIIP sjednotit.

5. **Závažnost:** MINOR
   **Kde:** `README.md`, sekce Mobil a výkon
   **Problém:** "TBT 60 ms", uložená měření dávají 60, 30 a 40 ms. Ostatní hodnoty sedí.
   **Návrh:** "TBT 30 až 60 ms".

6. **Závažnost:** MINOR (domněnka, neověřeno v prohlížeči)
   **Kde:** `web/components/Landing.tsx:35`
   **Problém:** Při `threshold: 0.3` je druhá podmínka `intersectionRatio >= 0.3` nadbytečná. Některé prohlížeče při překročení prahu hlásí poměr těsně pod ním (zaokrouhlení subpixelů, např. 0,2999); pak se `section_view` nezapíše a další callback přijde až při opuštění sekce. Riziko ztráty části událostí v trychtýři.
   **Návrh:** Nechat jen `e.isIntersecting` (práh už zajistí 30 %) nebo porovnávat s malou rezervou (`>= 0.29`).

7. **Závažnost:** MINOR
   **Kde:** `web/scripts/sync-data.mjs:2`
   **Problém:** Komentář odkazuje na neexistující `api/prehled` (stejný zbytek jako u opraveného `web/README.md`).
   **Návrh:** Přepsat na `app/prehled`.

Zkontrolováno bez nálezu: e-maily (žádné nezredigované), připojovací řetězce (jen text "začíná `postgresql://`"), klíče a tokeny (`npg_`, `sk-`, `ghp_`, `AKIA`, Bearer: nic), absolutní osobní cesty v exportech (nic), jména třetích osob (34 nahrazení, žádný nezredigovaný tvar nenalezen). V `07-designovy-chat.md` jsou dva odkazy na přehled s tokenem z lokálního vývoje (localhost:3020), oba prošlé (platnost 24 h, 10. 10.), riziko žádné. Relativní odkazy v README, `ai-log/README.md`, checklistu a `data/overeni.md` vedou na existující soubory.

VERDIKT: READY
