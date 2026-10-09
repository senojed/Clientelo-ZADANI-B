# Plán: zadání B, landing page s porovnáním ETF

Tento soubor je pracovní plán řešení zadání B (Clientelo, druhé kolo). Slouží jako jediný zdroj pravdy pro postup a ke kontrole Claude + Codex. Termín odevzdání: pátek 16. 10. 2026. Stav: koncept z 9. 10. 2026, čeká na revizi.

## 1. Cíl a hodnocení

Stránka pro českého drobného investora z mobilní reklamy. Hodnotí se hlavně: "mohli bychom na ni zítra spustit reklamu?" a postup práce s AI. Proto platí: **co nemá zdroj s datem, na stránce není.**

## 2. Rozhodnutí a jejich důvody (půjdou do README)

| Rozhodnutí | Proč |
|---|---|
| Zadání B (ne A) | Clientelo je lead-gen firma, výsledek se ověří otevřením odkazu na mobilu. A je záložní plán (rozhodovací brána v bodě 4). |
| Srovnáváme americké ETF z NYSE **a** u každého ukazujeme dostupnost a evropskou (UCITS) alternativu | Zadání říká ETF z NYSE. Většina z nich nemá KID podle PRIIPs, takže je EU retail běžně nekoupí. Stránka musí obojí říct pravdivě. NYSE ETF zůstanou podstatnou částí, UCITS je doplněk. |
| Žádná tvrzení o konkrétních brokerech, dokud nejsou ověřená u zdroje | Neověřený údaj shodí důvěryhodnost celé stránky. |
| Nadpis bez absolutního tvrzení | "Nekoupíš" závisí na brokerovi a typu klienta. Nadpis: "Porovnej americké ETF. Zjisti náklady i dostupnost pro českého investora." (pracovně) |
| Registrace jen e-mailem a souhlasem | Co nejméně polí, požadavek zadání. |

## 3. Nabídka za kontakt (lead magnet)

Konkrétně: **PDF přehled 5 amerických ETF**: sledovaný index, roční náklady (TER), zaměření, zda má KID pro EU retail, evropská alternativa (UCITS) a její náklady, zdroj a datum u každého údaje. Před odesláním návštěvník vidí **dva kompletní řádky** jako důkaz hodnoty a popis, co v přehledu navíc je. O kontakt se žádá po ukázce hodnoty (náhled a interakce), ne dřív.

## 4. Data (první úkol, rozhoduje o všem)

- Vybrat 5 amerických ETF (široce známé, např. na S&P 500, celý trh, Nasdaq-100, dividendy, svět) a u každého najít UCITS alternativu.
- Údaje: název, ticker, ISIN, burza, index, TER, KID ano/ne pro EU retail, zdroj (URL), datum ověření. Zdroje: stránky správců fondů (factsheet, KID), ne agregátory, pokud to licence nedovolí. Licenci justETF a podobných ověřit, než z nich cokoli převezmu.
- Výstup: `data/etf.json` + `data/zdroje.md`, každý řádek ověřený ručně.
- **Rozhodovací brána (neděle 11. 10. večer):** pokud nejde najít ověřitelné údaje pro aspoň 5 dvojic, přepnout na zadání A.

## 5. Stránka

Pořadí sekcí (zdůvodnit v README): 1 úvod s e-mailem, 2 náhled srovnání (2 plné řádky), 3 jednoduchá interakce (výběr dvou fondů, rozdíl ročních nákladů z uvedeného TER; počítá jen TER a říká to), 4 krátké vysvětlení dostupnosti, 5 formulář s popisem, co přijde, 6 patička s upozorněním.
- Technika: Next.js + TypeScript, nasazeno na Vercel (zdarma) hned první den. Alternativa při zaseknutí: statické HTML.
- Mobile first, rychlost (PageSpeed), bez těžkých knihoven.
- Texty a vizuál: podle Janova návrhu, doladit po odsouhlasení obsahu přehledu (ETF vybraná a data hotová).

## 6. Formulář a doručení

- Pole: e-mail, souhlas se zasláním a zpracováním. Nic dalšího. Krátké upozornění na zpracování e-mailu (GDPR) zůstává i v demu.
- **Hosting: Vercel (zdarma, veřejně).** Domácí hosting zamítnut: výpadky a otevírání domácí sítě by ohrozily hodnocení. Důvod půjde do README.
- **Přehled (PDF/úplné srovnání) je za e-mailem:** soubor neleží ve veřejné složce. Serverová funkce ho vydá až po odeslání platného e-mailu (jednorázový odkaz). Je to jen měkká brána, e-mail se neověřuje, pro demo stačí. Samotná landing page je veřejná.
- Po odeslání: děkovná stránka s okamžitým stažením přehledu. E-mailovou sekvenci (potvrzení, připomenutí) popsat v README, skutečné odesílání jen pokud zbude čas.
- Úložiště leadů: serverová funkce na Vercelu, konkrétní úložiště ověřit podle toho, co je zdarma. Bez placeného API. Jde jen o testovací e-maily.

## 7. Měření celé cesty

Události: zobrazení stránky (s UTM), dojetí na sekce, použití interakce, kliknutí na tlačítko, začátek formuláře, odeslání, otevření PDF. **Rozhodnuto: cookie lišta se nedělá.** Je to demo bez reálné kampaně. Měří se anonymně vlastní serverovou funkcí (bez cookies a bez identifikace člověka), žádná Google Analytics ani reklamní pixely. V README poznámka: při ostrém nasazení by byla nutná cookie lišta a souhlas před měřením a marketingovými pixely, právní stav neověřen.

## 8. Reklamy a README

- Dvě verze reklamy (různý hák): A "Chceš americké ETF? Zjisti, jestli ho koupíš." B "5 ETF a kolik tě opravdu stojí." Každá napojená na UTM a první obrazovku.
- README: postup práce s AI (pokyny, kontrola, kde se AI mýlila), zdůvodnění pořadí sekcí, očekávaná konverze **s odůvodněním ze zdroje nebo označením jako odhad**, tři hypotézy A/B testu seřazené podle očekávaného dopadu, co chybí.

## 9. Compliance (kontrolní seznam "zítra reklama")

Označení jako informační/marketingové sdělení, žádné sliby výnosů ani prognózy, žádné "kup toto", viditelné upozornění na riziko, výkonnost neuvádět (nebo s upozorněním), žádný konkrétní broker, zásady ochrany osobních údajů, souhlas u formuláře, data uložená rozumně (EU). V README otevřeně: právní rámec ověřen jen obecně, před reálnou kampaní nutná kontrola.

## 10. Otevřené otázky

1. Vyřešeno: Vercel, přehled za e-mailem, bez odesílání e-mailů (viz bod 6). Zbývá vybrat konkrétní úložiště leadů.
2. Vyřešeno: bez cookie lišty, jen poznámka v README (viz bod 7).
3. Které přesně ETF a které UCITS dvojice (rozhodne ověření dat).
4. Platí pro reklamu na investice ještě něco konkrétního (ČNB, ZPKT)? Ověřit v e-Sbírce.

## 11. Harmonogram (dnes pátek 9. 10.)

Cíl odevzdat ve **čtvrtek 15. 10.**, pátek 16. 10. je rezerva. Kód se nepíše, dokud nejsou ověřená data.

| Den | Práce |
|---|---|
| Pá 9. 10. | Plán, revize Claude + Codex, založení repozitářů (soukromé) a `ai-log`, výběr ETF |
| So 10. 10. | Ověření dat (zdroje, ISIN, TER, KID), přípravy B (texty, reklamy, kostra README). Žádný kód. |
| Ne 11. 10. | Data hotová, **brána A/B**. Když zbývá čas, přípravy A (viz bod 14). |
| Po 12. 10. | Kostra Next.js, nasazení na Vercel, úvod a náhled |
| Út 13. 10. | Interakce, formulář, přehled za e-mailem, měření, texty, compliance |
| St 14. 10. | README, testy na mobilu, PageSpeed, kontrola |
| Čt 15. 10. | Finální kontrola, přepnutí repa na veřejné, odevzdání (e-mail, odkaz na repo, URL) |
| Pá 16. 10. | Rezerva |

## 12. Práce s AI a odevzdávané soubory

- `ai-log/`: export konverzací (`/export` z Claude Code, u Codexu odpovídající export) **od prvního dne, ne zpětně**. Do něj patří i dnešní rozhodovací konverzace (rada, ověření PRIIPs).
- Průběžné commity s popisem, co udělala AI a co ověřil Jan.
- Zapisovat chyby AI hned, jak se stanou (půjdou do README).

## 13. Hotovo, když

Stránka běží na Vercelu, formulář opravdu doručí lead, události se měří, každý údaj má zdroj a datum, kontrolní seznam compliance je odškrtnutý, README obsahuje všechny požadované části, repo má historii commitů a `ai-log`. Co chybí, je v README uvedeno.

## 14. Záložní plán A (jen přípravy, bez kódu)

Dělá se až po přípravách B a jen pokud zbude čas. Cíl: kdyby se B opustilo, nezačínat od nuly. Obsah: pravidla, kdo do databáze patří a kdo ne, způsob ověření pravosti, seznam veřejných zdrojů pro pilotní vzorek (např. VC v ČR), schéma záznamu (sektor, typická investice, výše, kapitál, zdroj, datum), postup měření přesnosti. Žádný sběr dat ani kód, dokud se nepřepne.

## 15. Repozitáře

Soukromé repozitáře na GitHubu (`senojed`): `Clientelo-ZADANI-B` a `Clientelo-ZADANI-A`. Do odevzdání se vybrané repo přepne na veřejné, druhé zůstane soukromé nebo se smaže.
