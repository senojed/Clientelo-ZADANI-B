# Positioning, tón a texty (koncept v2 po kontrolách)

> **Zastaralé v detailech (12. 10. 2026):** platná jsou finální znění v kódu (`web/components`) a v `ads/`. Hlavně: stránka je jedna (nadpis "Evropské alternativy amerických ETF"), ne dvě varianty A a B; přehled se otevře hned a PDF se stahuje; formulář je "Celý přehled zdarma za e-mail". Soubor je ponechán jako záznam úvah.

Pracovní podklad pro stránku a reklamy. Čísla jsou z `data/etf.json` (ověřeno 9. 10. 2026). Nic tu není investiční doporučení.

Verze 2 (9. 10. večer) zapracovává nezávislý audit (subagent) a připomínky Codexu: "UCITS alternativa" místo "evropská verze", srovnání amerických ETF mezi sebou jako hlavní tabulka, jasnější nabídka za e-mail, přesnější pojmenování nákladů, sliby jen v rozsahu ověřených dat.

## Pro koho

Člověk, který slyšel (YouTube, podcast, kamarád) "kup VOO / S&P 500" a hledá to u svého brokera. Na mobilu, má pár sekund, nechce číst regulaci. Chce rychle vědět, co daný fond je, kolik stojí a co ověřit.

Věk 25 až 40 let a zdroje (YouTube, Reddit) jsou **hypotéza**, ne doložená data; podstatná je popsaná situace.

## Positioning jednou větou

Srovnání 4 známých amerických ETF z NYSE Arca a jejich UCITS alternativ na stejný index: zaměření, roční náklady a co si ověřit u brokera, se zdrojem a datem u každého údaje.

## Fakta, na kterých stránka stojí (všechna doložená)

- Hlavní srovnání: 4 americká ETF mezi sebou. DIA (Dow Jones, 30 firem), IVV a VOO (S&P 500, 500 firem), VT (celý svět). Roční náklady fondu: DIA 0,16 %, IVV 0,03 %, VOO 0,03 %, VT 0,06 %.
- U všech 4 jsme k 9. 10. 2026 na stránce správce nenašli KID pro EU retail. To neznamená, že je nekoupí žádný broker.
- Ke všem 4 existuje UCITS alternativa na stejný index s KID: S&P 500 a celý svět se stejným indexem; u Dow Jones sleduje UCITS variantu indexu s reinvesticí dividend (DIA sleduje cenový index).
- Roční náklady UCITS alternativ: S&P 500 0,07 %, celý svět 0,07 %, Dow Jones 0,33 %. Všechny 4 alternativy jsou v seznamu ČNB fondů nabízených v ČR a mají český KID (ověřeno 10. 10. 2026).
- Pojmenování nákladů: u amerických fondů "expense ratio" podle správce, u UCITS "průběžné náklady" podle KID. Na stránce jednotně "roční náklady fondu", v metodice vysvětleno.
- Model: 100 000 Kč, roční rozdíl nákladů fondu: S&P 500 cca 40 Kč, Dow Jones cca 170 Kč (vzorec částka × rozdíl ročních nákladů; nejde o celkové náklady investora: bez kurzů, spreadů, daní a poplatků brokera).

## Co zatím ověřené není (nesmí být na stránce, dokud se neověří)

- US ISIN u IVV, VOO a VT (máme jen CUSIP).
- Tickery, burzy a měny UCITS alternativ na evropských burzách (pro PDF).

## Tón

Tykání, krátké věty, věcně, bez slibů výnosů a bez "nejlepší". Zkratky (KID, UCITS) vysvětlit jednou větou až pod první obrazovkou. Důvěru staví data se zdrojem a datem, ne superlativy.

## První obrazovka (varianty, navázané na reklamy)

- **Nadpis A (k reklamě A, `v=a`):** Znáš VOO nebo IVV? Porovnej náklady a najdi evropskou alternativu.
- **Nadpis B (k reklamě B, `v=b`):** 4 americká ETF a jejich evropské alternativy na jednom místě
- **Podnadpis:** Srovnali jsme 4 známá americká ETF a jejich UCITS alternativy na stejný index. Část srovnání hned, celý přehled s kontrolním seznamem zdarma v PDF.
- **Hlavní tlačítko:** Zobrazit srovnání (otevře veřejný náhled)
- **Vedlejší odkaz:** Co obsahuje PDF
- **Drobný text:** Informační přehled, ne investiční doporučení. Údaje ověřeny 9. 10. 2026.

## Veřejná část (před formulářem)

Tabulka 4 amerických ETF mezi sebou (ticker, zaměření, roční náklady), řazeno abecedně. Počet firem jen tam, kde je doložený (DJIA 30, S&P 500 500 největších firem podle KID); u VT neověřeno. U každého řádku vedle: "UCITS alternativa: ano, na stejný index" a její roční náklady. Pod tím výpočet rozdílu ročních nákladů s předvyplněnou částkou.

## Lead magnet (PDF)

**Název:** Americká ETF a jejich UCITS alternativy: přehled 4 fondů a co ověřit u brokera

Obsah (co na stránce není):
1. úplná tabulka s ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera, zdrojem a datem u každého údaje,
2. vysvětlení, proč u Dow Jones nevybíráme fondy, které v ČR registrované nejsou (příklad fyzické a syntetické replikace),
3. kontrolní seznam krok za krokem "jak si ETF ověřit u svého brokera" (ISIN, KID, burza, měna, typ klienta), bez názvů brokerů,
4. KID, PRIIPs a UCITS vysvětlené lidsky,
5. u každé UCITS alternativy odkaz na český KID a informace, že je v seznamu ČNB fondů nabízených v ČR,
6. k ověření a doplnění: burzy, tickery a měny UCITS alternativ.

## Formulář

- **Nadpis:** Celý přehled v PDF zdarma
- **Pole:** tvuj@email.cz
- **Tlačítko:** Získat PDF zdarma
- **Pod tlačítkem:** PDF otevřeme hned po odeslání.
- **Drobně (informace o zpracování):** Odesláním potvrzuješ, že ses seznámil/a se zásadami zpracování. E-mail uložíme jako kontakt k tomuto přehledu.
- **Nepovinné políčko (nezaškrtnuté):** Chci občas dostat novinky o ETF

## Upozornění v patičce (pracovně)

Informační a marketingové sdělení. Nejde o investiční doporučení ani nabídku. Investice do ETF nesou riziko ztráty, minulá výkonnost není zárukou budoucích výnosů. "KID nenalezen" znamená, že jsme ho k datu ověření nenašli na stránce správce; neznamená, že fond nekoupí žádný broker. Údaje ověřeny 9. 10. 2026, zdroje u každého údaje.
