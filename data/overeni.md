# Průběžné ověřování dat (pracovní záznam)

Záznam toho, co je ověřené ze zdroje, s datem. Sem se zapisuje průběžně, do `data/etf.json` jde až kompletně ověřená dvojice po kontrole Janem. Stav k 9. 10. 2026.

## Dvojice 1: IVV ↔ iShares Core S&P 500 UCITS ETF (USD Acc)

**Zkontroloval Jan 9. 10. 2026: OK** (včetně metody důkazu "KID pro EU retail nenalezen").

| Údaj | Hodnota | Zdroj | Datum ověření |
|---|---|---|---|
| IVV burza | NYSE Arca | nyse.com/quote/ARCX:IVV (`dukazy/2026-10-09-nyse-kotovani.md`) | 9. 10. 2026 |
| IVV název | iShares Core S&P 500 ETF | ishares.com/us/products/239726/ishares-core-sp-500-etf | 9. 10. 2026 |
| IVV index | S&P 500 Index | tamtéž | 9. 10. 2026 |
| IVV náklady | expense ratio 0,03 % ("Fees as stated in the prospectus", bez data u poplatku) | tamtéž | 9. 10. 2026 |
| IVV CUSIP | 464287200 | tamtéž | 9. 10. 2026 |
| IVV ISIN | **neověřeno** (stránka ISIN neuvádí) | | |
| IVV KID pro EU retail | **KID pro EU retail nenalezen k 9. 10. 2026.** Metoda: oficiální produktová stránka správce (sekce dokumentů) nabízí jen prospekt, finanční dokumenty a data, žádný KID/KIID/PRIIPs. Uložená kopie stránky obsahuje v datech stránky položku `"fundHeader.keyDocuments.EUPRIIP":""` (prázdná), zmínky "PRIIP" jinde jsou jen obecné texty šablony webu. Rozsah: jen tato stránka správce, ne distributoři. | https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf, kopie `dukazy/2026-10-09-ivv-us-produktova-stranka.html` | 9. 10. 2026 |
| UCITS název | iShares Core S&P 500 UCITS ETF, USD Accu | EU PRIIPs KID (`dukazy/2026-10-09-cspx-eu-priips-kid-de.pdf`) | 9. 10. 2026 |
| UCITS ISIN | IE00B5BMR087 | tamtéž | 9. 10. 2026 |
| UCITS index | S&P 500 Index (stejný index jako IVV, krok 1 algoritmu, stejný správce BlackRock) | tamtéž | 9. 10. 2026 |
| UCITS náklady | 0,07 % ročně (Verwaltungsgebühren und sonstige Verwaltungs- oder Betriebskosten) | tamtéž, KID vytvořen 3. 9. 2026 | 9. 10. 2026 |
| UCITS KID pro EU retail | ano, PRIIPs KID (Basisinformationsblatt), vytvořen 3. 9. 2026 | https://www.ishares.com/gls-download/literature/kiid/eu-priips-ishares-core-sp-500-ucits-etf-usd-acc-ie00b5bmr087-de.pdf | 9. 10. 2026 |
| UCITS doplňkově | UK KIID (k 9. 2. 2026, OCF 0,07 %), factsheet | `dukazy/2026-10-09-cspx-kid.pdf`, `dukazy/2026-10-09-cspx-factsheet.pdf` | 9. 10. 2026 |

## Ostatní kandidáti: stav

- Kótování na NYSE Arca ověřeno u VOO, IVV, VTI, DIA, SCHD, VYM, VT, VNQ. SPY neověřeno (stránka se nenačetla).
- VOO: expense ratio 0,03 % viditelné na investor.vanguard.com (čteno ze snímku obrazovky, datum u poplatku nečitelné), **neuzavřeno**.
- VTI: název na NYSE zmiňuje index Morningstar, ověřit index v dokumentech správce.
