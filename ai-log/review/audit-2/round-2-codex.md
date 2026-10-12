Kontroloval jsem GitHub `main` na commitu `d229d6d8`, včetně dodatečných oprav během auditu. Nenašel jsem zbývající BLOCKER ani MAJOR.

| Položky diskuse | Výsledek ověření |
|---|---|
| Cl1, mobilní pole | FIXED: CSS nastavuje 16 px, výška zůstává 44 px. |
| Cx1, Cl13, měření a Neon | FIXED: právní nejistota je výslovně zdokumentovaná, Neon uveden jako americká společnost. |
| Cx3, Cl16, exporty | FIXED: sedm hlavních sezení včetně designového chatu; nyní čtrnáct subagentů. |
| Cl7, Cl8, výkon a výška sekcí | FIXED: měření dokládají uvedené hodnoty, formulace výšky je opravená. |
| Cl10, Cx7, Cl11, limity a definice leadu | FIXED: limity 20/1000, reset UTC i opakované e-maily dokumentované; dotaz na unikátní adresy existuje. |
| Cl12, Cx6, hlavičky a JSON | FIXED v kódu: tři hlavičky jsou nakonfigurované; `null`, pole i primitivní hodnoty se odmítají před zpracováním. |
| Cl15, Cl14, Cx5, úklid a veřejný obsah | FIXED v aktuálním stromu: odstraněné soubory chybí, vývojový origin je z proměnné, výňatek IVV existuje, veřejnost přehledu je dokumentovaná. |
| Cx9, Cl4, plán a ČNB | FIXED: odchylky doplněné, právní závěr nahrazený popisem seznamu. |
| PDF, rozhodnutí Jana č. 1 | FIXED: pět neprázdných stran, číslování 1/5 až 5/5. |

Zůstávají tyto drobnosti:

1. **Závažnost:** MINOR  
   **Kde:** `web/components/Landing.tsx`, `web/db/funnel.sql`, Cx4.  
   **Problém:** PARTIAL. Kontrola poměru viditelnosti je opravená, aktuálně používá toleranci 0,29. „Zobrazení formuláře“ však stále sleduje celou sekci začínající vysvětlením. Událost může vzniknout, když samotný formulář ještě není vidět.  
   **Návrh:** Sledovat přímo formulář, případně metriku pojmenovat jako zobrazení sekce s formulářem.

2. **Závažnost:** MINOR  
   **Kde:** `web/private/prehled-etf.pdf`, první strana; `README.md`, úvod; Cl3 a diskusní log.  
   **Problém:** PARTIAL. Úvod webu má konkrétní opravenou větu. PDF a README stále obsahují obecné tvrzení „většinou nemají KID“. Zápis „Totéž je v PDF“ proto nepopisuje shodu textů přesně.  
   **Návrh:** Sjednotit formulaci, nebo výslovně zapsat, že původní věta v PDF zůstává vědomým rozhodnutím.

3. **Závažnost:** MINOR  
   **Kde:** `web/app/api/lead/route.ts`, komentář před kontrolou limitu.  
   **Problém:** NEW. Komentář po opravě stále uvádí nejvýš pět odeslání za hodinu, skutečný limit je dvacet.  
   **Návrh:** Aktualizovat komentář.

V nových exportech jsem neodhalil skutečné přihlašovací údaje, e-maily, privátní IP ani identifikátor osobního počítače. Kontrolované relativní odkazy v dokumentaci nejsou rozbité. Přijatá a zdokumentovaná produktová rizika znovu neotevírám.

Místní terminál nefungoval. Automatická bezpečnostní kontrola odmítla přístup prohlížeče k živému webu s důvodem „uživatel odmítl oprávnění“. Verdikt proto vychází z repozitáře; aktuální nasazení a živý průchod nepotvrzuji.

VERDIKT: READY