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

## Kolo 2 (Codex, `round-2-codex.md`): VERDIKT CONTINUE

Ověřeno jako opravené: #2 (v konfiguraci), #3, #5, #6 až #8, #10 až #22, #24, #25. Region ověřen i na produkci: odpověď funkce má hlavičku `X-Vercel-Id: fra1::fra1::...` (10. 10. 2026).

| Nález kola 2 | Rozhodnutí | Oprava |
|---|---|---|
| 1 MAJOR: zásady bez mechanismu předání do USA; nezdůvodněná nezbytnost e-mailu pro přehled | Přijato | Mechanismus: standardní smluvní doložky (rozhodnutí 2021/914) v DPA Vercelu, Vercel certifikován v EU-US DPF (zdroj: vercel.com/legal/dpa, changelog Vercelu). Právní základ uložení e-mailu změněn na oprávněný zájem s právem námitky (přehled je za e-mail, záznam komu byl poskytnut); posouzení právníkem zůstává v seznamu. |
| 2 MAJOR: `/api/events` bez limitu; kontrola limitu a zápis nejsou atomické | Přijato | Limit i pro události (300 za hodinu z IP); kontrola a zápis v jedné transakci se zámkem `pg_advisory_xact_lock`. Test: 8 souběžných odeslání, prošlo přesně 5. |
| 3 MINOR: chybí "zkusit znovu" u přehledu; limit počítá i opakování stejného pokusu | Přijato | `app/prehled/error.tsx` s tlačítkem "Zkusit načíst znovu"; opakování existujícího klíče idempotence se do limitu nepočítá (test: po vyčerpání limitu vrátí 200). |
| 4 MINOR: otisky IP se mažou jen při dalším odeslání | Přijato | Denní Vercel Cron `/api/uklid` (chráněno `CRON_SECRET`). |
| 5 MINOR: uložený export ai-log má pořád zkrácené příkazy | Přijato | Export znovu vygenerován opraveným skriptem. |
| 6 MINOR: měnové riziko a "přečti KID" chybí v úvodu a u kalkulačky | Přijato | Doplněno. |

## Kolo 3 (Codex, `round-3-codex.md`): VERDIKT CONTINUE

| Nález kola 3 | Rozhodnutí | Oprava |
|---|---|---|
| 1 MAJOR: nezbytnost uložení e-mailu není doložená (přehled se na e-mail neposílá) | **Rozhodnutí Jana: souhlas s nálezem, v demu se nestaví.** Doporučené řešení (posílat odkaz e-mailem) je v README jako upozornění pro kontrolu a krok před ostrým provozem. | README, Co chybí |
| 2 MAJOR: standardní smluvní doložky z DPA nemusí platit pro účet Hobby | Přijato | Zásady uvádějí jen doložený mechanismus: certifikace Vercelu v EU-US Data Privacy Framework (rozhodnutí o odpovídající ochraně). |
| 3 MINOR: souběžná opakování nového stejného klíče idempotence mohou čerpat víc míst v limitu | Odmítnuto | Nejhorší dopad: jeden člověk při dvojkliku spotřebuje 2 z 5 pokusů za hodinu; lead vznikne jen jeden. Oprava (druhá kontrola pod zámkem) přidá složitost bez užitku pro demo. |
| 4 MINOR: `CRON_SECRET` chybí v návodu a `.env.example` | Přijato | Doplněno do `web/.env.example` a README včetně ověření úklidu. |

## Kolo 4 (Codex, `round-4-codex.md`): VERDIKT CONSENSUS

Všechny přijaté nálezy ověřeny jako opravené. Jediný nový drobný nález (odeslání e-mailu samo neověří adresu) opraven v README. Audit 1 uzavřen ve 4. kole z 5.
