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

## Dvojice 2: VOO ↔ Vanguard S&P 500 UCITS ETF (USD) Accumulating

**Čeká na kontrolu Janem.**

| Údaj | Hodnota | Zdroj | Datum ověření |
|---|---|---|---|
| VOO burza | NYSE Arca (nyse.com i správce: "listed for trading on NYSE Arca") | `dukazy/2026-10-09-nyse-kotovani.md`, `dukazy/2026-10-09-voo-vanguard-produktova-stranka.md` | 9. 10. 2026 |
| VOO název | Vanguard S&P 500 ETF | https://investor.vanguard.com/investment-products/etfs/profile/voo | 9. 10. 2026 |
| VOO index | S&P 500 Index | tamtéž | 9. 10. 2026 |
| VOO náklady | expense ratio 0,03 % (as of 04/28/2026) | tamtéž | 9. 10. 2026 |
| VOO CUSIP | 922908363 | tamtéž | 9. 10. 2026 |
| VOO KID pro EU retail | **KID pro EU retail nenalezen k 9. 10. 2026.** Na produktové stránce správce je v sekci "Fund literature" jen prospekt a zprávy, žádný KID/KIID/PRIIPs. Rozsah: jen stránka správce. | `dukazy/2026-10-09-voo-vanguard-produktova-stranka.md` | 9. 10. 2026 |
| UCITS název | Vanguard S&P 500 UCITS ETF, (USD) Accumulating Shares | EU PRIIPs KID `dukazy/2026-10-09-vuaa-eu-priips-kid-en.pdf` | 9. 10. 2026 |
| UCITS ISIN | IE00BFMXXD54 | tamtéž | 9. 10. 2026 |
| UCITS index | Standard and Poor's 500 Index (stejný index, krok 1; stejný správce Vanguard, krok 2) | tamtéž | 9. 10. 2026 |
| UCITS náklady | 0,07 % ročně (Management fees and other administrative or operating costs) | tamtéž | 9. 10. 2026 |
| UCITS KID pro EU retail | ano, PRIIPs KID ze dne 29. 9. 2026; "registered for sale in other EEA Member States" | https://fund-docs.vanguard.com/ie00bfmxxd54_priipskid_en.pdf | 9. 10. 2026 |

## Dvojice 3: DIA ↔ iShares Dow Jones Industrial Average UCITS ETF (DE)

**Čeká na kontrolu Janem.** Otevřená otázka výběru UCITS, viz poznámka pod tabulkou.

| Údaj | Hodnota | Zdroj | Datum ověření |
|---|---|---|---|
| DIA burza | NYSE Arca (nyse.com; správce: "Primary exchange NYSE ARCA") | `dukazy/2026-10-09-nyse-kotovani.md`, `dukazy/2026-10-09-dia-ssga-produktova-stranka.html` | 9. 10. 2026 |
| DIA název | State Street SPDR Dow Jones Industrial Average ETF Trust | https://www.ssga.com/us/en/intermediary/etfs/state-street-spdr-dow-jones-industrial-average-etf-trust-dia | 9. 10. 2026 |
| DIA index | Dow Jones Industrial Average | tamtéž | 9. 10. 2026 |
| DIA náklady | Gross Expense Ratio 0,16 % (net ratio stránka neuvádí) | tamtéž | 9. 10. 2026 |
| DIA ISIN | US78467X1090 (CUSIP 78467X109) | tamtéž | 9. 10. 2026 |
| DIA KID pro EU retail | **KID pro EU retail nenalezen k 9. 10. 2026.** Stránka správce nabízí prospekt, factsheet, výroční zprávy a daňové podklady, žádný KID/KIID/PRIIPs; uložená kopie stránky neobsahuje "PRIIP" ani "KIID". Rozsah: jen stránka správce. | `dukazy/2026-10-09-dia-ssga-produktova-stranka.html` | 9. 10. 2026 |
| UCITS název | iShares Dow Jones Industrial Average UCITS ETF (DE), ETF podle německého práva (OGAW) | EU PRIIPs KID `dukazy/2026-10-09-exi3-eu-priips-kid-de.pdf` | 9. 10. 2026 |
| UCITS ISIN | DE0006289390 | tamtéž | 9. 10. 2026 |
| UCITS index | Dow Jones Industrial Average (Netto-Gesamtrendite-Index), stejný index (krok 1), jiný správce (BlackRock) | tamtéž | 9. 10. 2026 |
| UCITS náklady | 0,51 % ročně (Verwaltungsgebühren und sonstige Verwaltungs- oder Betriebskosten) | tamtéž, KID vytvořen 1. 5. 2026 | 9. 10. 2026 |
| UCITS KID pro EU retail | ano, PRIIPs KID (Basisinformationsblatt) z 1. 5. 2026, cílová skupina "Kleinanleger" | https://www.ishares.com/gls-download/literature/kiid/eu-priips-ishares-dow-jones-industrial-average-ucits-etf-de-de0006289390-de.pdf | 9. 10. 2026 |

**Otevřená otázka (k rozhodnutí Jana):** na stejný index existuje i Amundi Dow Jones Industrial Average UCITS ETF Dist (FR0007056841), stránka Amundi uvádí ongoing charges 0,50 % (ověřeno jen z výsledku vyhledávání, ne z KID). Algoritmus v PLAN.md (stejný index, pak stejný správce, pak nejbližší index) nemá pravidlo pro více fondů na stejný index od jiných správců. Návrh pravidla: nižší průběžné náklady podle KID, při shodě větší fond. Pak by vyšel Amundi a bylo by potřeba ověřit jeho KID.

Pozn. k nákladům: UCITS na DJIA stojí kolem 0,5 % ročně, DIA 0,16 %. Rozdíl je výrazně větší než u S&P 500 (0,03 % vs. 0,07 %), to je pro stránku zajímavý fakt.

## Ostatní kandidáti: stav

- Kótování na NYSE Arca ověřeno u VOO, IVV, VTI, DIA, SCHD, VYM, VT, VNQ. SPY neověřeno (stránka se nenačetla).
- VOO: expense ratio 0,03 % viditelné na investor.vanguard.com (čteno ze snímku obrazovky, datum u poplatku nečitelné), **neuzavřeno**.
- VTI: název na NYSE zmiňuje index Morningstar, ověřit index v dokumentech správce.
