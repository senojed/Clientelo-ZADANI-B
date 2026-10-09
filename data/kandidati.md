# Kandidáti ETF (návrh k ověření)

Pracovní shortlist pro sobotní ověření dat (PLAN.md, bod 4). **Nic z tohoto souboru není ověřené.** Tickery a názvy indexů jsou návrh z obecné znalosti (Claude, 9. 10. 2026), ne údaje se zdrojem. Do stránky ani PDF se nic z toho nedostane, dokud řádek neprojde ověřením (burza z oficiální listing stránky, náklady a KID ze stránky správce, URL, datum, důkaz v `data/dukazy/`).

Vyřazovací pravidla: není kótován na NYSE/NYSE Arca; nejde dohledat UCITS alternativu (stejný index, jinak nejbližší); nejde ověřit náklady nebo KID ze zdroje s datem.

| # | US ETF (ticker) | Sledovaný index (předpoklad) | Kategorie | UCITS alternativa (směr hledání) | Poznámka |
|---|---|---|---|---|---|
| 1 | SPY | S&P 500 | velké US firmy | UCITS ETF na S&P 500 | nejznámější ETF, ověřit burzu |
| 2 | VOO | S&P 500 | velké US firmy | UCITS ETF na S&P 500 (pokud možno stejný správce) | časté v českém obsahu o investování |
| 3 | IVV | S&P 500 | velké US firmy | UCITS ETF na S&P 500 (pokud možno stejný správce) | třetí S&P 500, v přehledu stačí 1 až 2 z řádků 1 až 3 |
| 4 | VTI | celý americký trh | celý trh USA | UCITS ETF na celý americký trh | stejný index nemusí existovat, pak nejbližší |
| 5 | DIA | Dow Jones Industrial Average | 30 velkých US firem | UCITS ETF na DJIA | ověřit, zda UCITS varianta existuje |
| 6 | SCHD | dividendový index US firem | dividendy | UCITS dividendové ETF na US trh | stejný index nemusí existovat |
| 7 | VYM | index US firem s vysokou dividendou | dividendy | UCITS ETF s vysokou dividendou | stejný index nemusí existovat |
| 8 | VT | celosvětový index | svět | celosvětové UCITS ETF | jen jako nejbližší alternativa s upozorněním |
| 9 | VNQ | US nemovitostní fondy (REIT) | nemovitosti | UCITS ETF na US nemovitosti | stejný index nemusí existovat |

Vynecháno záměrně: QQQ (Invesco QQQ Trust, index Nasdaq-100). Ověřeno 9. 10. 2026: podle prospektu fondu u SEC jsou akcie kótované na The Nasdaq Stock Market, ne na NYSE/NYSE Arca. Zdroj: https://www.sec.gov/Archives/edgar/data/1067839/000110465925123273/tm2529177d1_485bpos.htm

Cíl: z přeživších vybrat 3 až 5 dvojic, přednost má stejný index, mezi srovnatelnými známost tickeru. Řazení na stránce abecedně podle tickeru.
