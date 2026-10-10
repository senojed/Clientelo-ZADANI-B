# Audit 1: záznam diskuse (ping-pong)

Kolo 1 (10. 10. 2026): dva nezávislí auditoři. Codex (`round-1-codex.md`, 15 nálezů, kvůli chybě sandboxu četl repo přes GitHub na commitu 336ab6b) a Claude subagent bez kontextu konverzace (`round-1-claude.md`, 20 nálezů, četl lokální repo a živou stránku přes GET). Oba: "zítra spustit nelze".

Třídění: Claude (hlavní session), rozhodnutí o produktu Jan. Označení: Cx = Codex, Cl = Claude auditor.

## Přijato, opraví se

| # | Nález | Zdroj | Oprava |
|---|---|---|---|
| 1 | Zásady: chybí právní titul, právo stížnosti u ÚOOÚ, námitka, předání do USA (Vercel Inc.), "anonymní" místo "pseudonymní" | Cx1, Cl2 | Přepsat zásady po účelech (přehled, kontakt, měření, novinky) |
| 2 | Funkce běží v USA (`iad1`), zásady tvrdí EU | Cl2 | Region funkcí `fra1`, ověřit hlavičkou `X-Vercel-Id` |
| 3 | Celá data (ISIN, odkazy na KID) jsou ve veřejném JavaScriptu, token nic nechrání | Cx3, Cl8 | Veřejná podmnožina dat pro stránku, plná data jen v API |
| 4 | Po odeslání nic trvalého, obnovení stránky přehled ztratí, chyba radí odeslat znovu (druhý lead) | Cx10, Cl9 | Přehled na vlastní adrese `/prehled?t=...`, "Zkusit znovu" s tokenem, odkaz ke zkopírování |
| 5 | Interaktivní prvky nemají vlastní výzvu ke kontaktu (zadání: "každý by mal viesť ku kontaktu") | Cl6 | Tlačítko v rozbaleném řádku a pod výsledkem kalkulačky; A/B hypotéza 1 nahrazena |
| 6 | Reklamy bez upozornění na riziko, upozornění jen v poli Popis; stav reklam v souborech vs README nesedí | Cx11, Cl1 | Riziko do hlavního textu a vizuálu, sjednotit stav |
| 7 | "Zdarma" bez zmínky, že za e-mail | Cx9 | Reklamy a úvod: "srovnání hned, celý přehled zdarma za e-mail" |
| 8 | Věta "broker smí prodat jen s KID" + "KID jsme nenašli" = "v EU nekoupíš", stránka si protiřečí | Cl4 | Sjednotit na "obvykle nenabídne" |
| 9 | Chybí měnové riziko (fondy v USD) a výzva přečíst KID | Cl5 | Doplnit do úvodu, patičky a kalkulačky |
| 10 | Bod o depozitáři naznačuje, že US fondy ochranu nemají | Cl18 | Bod vypustit nebo neutrálně přeformulovat |
| 11 | "Roční náklady" bez transakčních nákladů (u alternativ DIA a VT jsou v KID navíc) | Cx2 | Pojmenovat přesně: správní a provozní náklady, transakční nejsou zahrnuty |
| 12 | Uložení leadu a `lead_created` nejsou atomické | Cx4 | Transakce, při opakování doplnit chybějící konverzi |
| 13 | `/api/events` přijme libovolné `lead_id` | Cx5, Cl15 | Ověřit, že lead patří k relaci, jinak `lead_id` zahodit |
| 14 | Trychtýř: různé kohorty v čitateli a jmenovateli, chybí metrika se souhlasem; `sendBeacon` bez záložního odeslání | Cx7 | Opravit SQL, doplnit souhlas, záložní `fetch` |
| 15 | UTM se čtou z aktuální URL, po návratu ze zásad se atribuce ztratí | Cl14 | UTM zachytit jednou při načtení; zásady v novém panelu |
| 16 | `pdf_requested` se posílá při zobrazení přehledu | Cl15 | Přejmenovat na `overview_shown` |
| 17 | Formulář: chybí `autocomplete="email"`, obecná chybová hláška; hlavička tabulky "USA / EU" nejasná | Cl16 | Doplnit, rozlišit chybu e-mailu, přejmenovat hlavičku |
| 18 | Checklist odškrtává neplatné věci (řazení "uvedeno u tabulky", region); reklama B "ověřeno 9. 10." | Cl17 | Opravit |
| 19 | "500 největších firem" je nepřesné | Cx12 | "500 velkých amerických firem" |
| 20 | DIA: UCITS sleduje variantu indexu (Net TR), "stejný index" bez výhrady | Cx13 | Uvést variantu v detailu řádku |
| 21 | Chybí identifikace provozovatele a střet zájmů; otázka investičního doporučení podle MAR | Cl12 | Patička "kdo za stránkou stojí, žádné provize"; MAR do seznamu pro právní kontrolu |
| 22 | README: chybí rozhodnutí u nejasností zadání (NYSE Arca, alternativy, 4 fondy), odchylka od `/export` | Cl19 | Doplnit sekci |
| 23 | Export ai-log zkracuje i vstupy nástrojů (příkazy) | Cx14 | Příkazy celé, zkracovat jen obsah zapisovaných souborů a výsledky; popsat |
| 24 | Vercel Hobby jen pro nekomerční použití | Cx15, Cl20 | README: demo na Hobby, ostrá kampaň na Pro nebo hostingu zadavatele |
| 25 | Zdroj u čísel ve veřejné části chybí | Cx8, Cl11 | Odkaz na stránku správce u každého řádku (rozsah podle rozhodnutí Jana o lead magnetu) |

## Odloženo nebo odmítnuto (s důvodem)

| Nález | Zdroj | Rozhodnutí |
|---|---|---|
| Repo není veřejné | Cl3 | Plánováno na čtvrtek 15. 10. po kontrole `ai-log` (PLAN.md). Ne nyní. |
| Rate limit | Cx6, Cl13 | **Přijato (Jan):** jednoduchý limit v databázi podle hashe IP. |
| Meta Pixel / Conversions API, `fbclid` | Cl10 | **Otevřené (Jan řeší samostatně).** |
| Úvod: tabulka už na první obrazovce místo celoobrazovkového úvodu | Cl7 | **Rozhodne Jan při designu.** Teď jen text podnadpisu (proč alternativa). |
| Lead magnet je slabý (ISIN dohledatelný) | Cl8 | **Rozhodnutí Jana:** veřejně zdroj u čísel (stránka správce u US, datum českého KID u UCITS), za e-mailem ISIN ke zkopírování, odkazy na české KID a kontrolní seznam. Tato data už nebudou v JavaScriptu stránky. |
| Double opt-in u novinek | Cl13 | Odloženo: novinky se v demu neposílají; README "před prvním newsletterem potvrzovací e-mail". |
