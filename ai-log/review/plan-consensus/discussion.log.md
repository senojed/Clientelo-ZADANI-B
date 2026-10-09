# plan-consensus log

- Plán: `PLAN.md` v kořeni repozitáře [redacted: absolutní lokální cesta]
- Start: 2026-10-09 15:02
- max_rounds: 15 (po vyčerpání se ptát uživatele na další kola)
- Hash plánu na startu: 4B47B8E70C2C98A787CE7BDA227468DFE8950FC67E33B8871CC4E49D40402352

## Kolo 1 (2026-10-09 15:06)
- Soubory: round-1-codex.md, round-1-claude.md
- Codex: CHANGES_NEEDED (4 BLOCKING, 10 IMPORTANT, 4 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno v plánu: minimum 3 dvojice a předběžná brána v sobotu, bezstavová PDF brána (podepsaný krátkodobý odkaz), úložiště leadů rozhodnout do soboty večer, honeypot, ID relace v sessionStorage a lead_id, metoda pro tvrzení o KID (nenalezen k datu), moment žádosti o e-mail po ukázce hodnoty, konkrétní obsah PDF, pole reklam, metriky Lighthouse, redakce ai-log, bezpečné repo od začátku, terminologie nákladů.
- Nepřijato: kostra s mock daty před bránou (Jan výslovně rozhodl nekódovat před daty; kostra začíná hned po splnění brány); vypuštění příprav zadání A (Jan rozhodl, jen když zbude čas); formulace o právní kontrole zmírněna, ale přiznání mezery zůstává.
- Hash plánu po kole: 32E43CEF3375DD9B8510F9A112CA44D25898FF2806CF7061C2CCD9F8F7FBB2FD

## Kolo 2 (2026-10-09 15:08)
- Soubory: round-2-codex.md, round-2-claude.md
- Codex: CHANGES_NEEDED (3 BLOCKING, 9 IMPORTANT, 3 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: úložiště leadů = Neon (Postgres z Vercel Marketplace), záloha Formspree/Tally, limity ověřit při zakládání, test doručení; cookies jako demo režim bez třetích stran s informací o měření; compliance ověření v sobotu/neděli; NYSE vykládáno jako NYSE a NYSE Arca s ověřením burzy u každého ETF; seznam tickerů a vypočítaný příklad viditelné před formulářem; výchozí scénář interakce; harmonogram bez duplicit (neděle bootstrap, pondělí UI); platnost odkazu 24 h; rate limit jen s Upstash; pravidla redakce ai-log a žádné absolutní cesty v repu; ověřit /export; Neon před Supabase kvůli pozastavení databáze; poznámka o nekomerčním Vercel Hobby.
- Nepřijato: číselný benchmark konverze 2 až 6 % bez zdroje (přijata logika a interval, číslo jen se zdrojem); mock data před bránou (rozhodnutí Jana, přijata jen kompenzace).
- Hash plánu po kole: 565FEBE7CAF9CE940D78FBD77F64452760621177D807291950B65715AD4149F4

## Kolo 3 (2026-10-09 15:10)
- Soubory: round-3-codex.md, round-3-claude.md
- Codex: CHANGES_NEEDED (2 BLOCKING, 10 IMPORTANT, 3 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: minimální privacy specifikace a datový model (leads, events); identifikátor relace jen v paměti stránky místo sessionStorage; výroba PDF (InDesign, záloha HTML tisk, deadline úterý, záloha stránka za e-mailem); shortlist 8 až 10 tickerů s vyřazovacími pravidly; ověření burzy z oficiální listing stránky; vedlejší CTA v úvodu; výsledek kalkulačky 'modelový rozdíl ročního poplatku fondu'; upravené háky reklam; kontrola pravidel reklamních platforem; omezení podepsaného tokenu; degradace při záloze; nedělní napojení formuláře; průběžná redakce ai-log; konzistence '3 až 5 ETF'.
- Nepřijato: jen jedno repo (repozitáře už existují); dominantní formulář nad foldem (odporuje požadavku, aby byla hodnota zřejmá před formulářem).
- Hash plánu po kole: 28245A72976F7B8AE4C2C7D86891AE21F2FA63C60E2A4CE6ABDD50DB9F7779A3

## Kolo 4 (2026-10-09 15:11)
- Soubory: round-4-codex.md, round-4-claude.md
- Codex: CHANGES_NEEDED (2 BLOCKING, 8 IMPORTANT, 3 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: záloha smí degradovat jen lead a PDF bránu, měření událostí zůstává; metriky pdf_requested a pdf_download_clicked; oddělené účely a právní základy; akceptační kritérium EU region nebo popsané riziko a DPA/SCC; metodika a zdroje u tvrzení o KID; nedělní svislý průchod; háky reklam navázané na obsah přehledu; výstup z kontroly platformních pravidel; redakce ai-log zachová prompty a chyby AI; cesty ads/ad-a.md a ads/ad-b.md; kontrola plovoucího tlačítka na malém displeji; nová sekce 16 priority MUSÍ/MĚLO BY/MŮŽE.
- Nepřijato: odeslání odkazu e-mailem jako priorita (Jan rozhodl o jednoduchém řešení; měkká brána přiznána v README).
- Hash plánu po kole: ABE9E5DF6CB4ECF73C8AECC96150796A6A8560FB7C2A8DE90689D1066A274BE0

## Kolo 5 (2026-10-09 15:13)
- Soubory: round-5-codex.md, round-5-claude.md
- Codex: CHANGES_NEEDED (2 BLOCKING, 6 IMPORTANT, 3 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: go/no-go pro Meta a Google, při certifikaci reklamy jako koncept; definovaný payload události a životní cyklus session_id a lead_id; Neon jako uzavřené rozhodnutí; kontrolní seznam při přechodu na zálohu; riziko kvality leadů s doporučením double opt-in; ověření KID podle ISIN; konkrétní obsah přehledu v textu reklam; kontrola reklamních platforem v MUSÍ; odhad konverze s předpoklady a citlivostí; náhradní formát exportu.
- Nepřijato: technický spike v sobotu (rozhodnutí Jana, v plánu jako otevřená otázka); druhé CTA v úvodu je textový odkaz, ponecháno.
- Pokyn pro další kola: plán je už rozsáhlý, přijímat jen to, co mění rozhodnutí, ne další pojistky.
- Hash plánu po kole: 130F8D1F11619B92B706C6BE536474B128033CED2D7249687B8E8B9BD0A3DA87

## Kolo 6 (2026-10-09 15:14)
- Soubory: round-6-codex.md, round-6-claude.md
- Codex: CHANGES_NEEDED (1 BLOCKING, 7 IMPORTANT, 3 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: jeden tok po odeslání (server vrátí lead_id a podepsaný token, děkovná část na stejné stránce); texty formuláře podle reality (Zobrazit celý přehled, souhlas se zpracováním e-mailu pro zpřístupnění přehledu, nic se neslibuje zasílat); právní základ přeformulován na zpřístupnění přehledu na žádost návštěvníka; měření pojmenováno pseudonymní a po odeslání navázané na lead; redakční pravidla (žádné řazení, skóre ani hodnocení vhodnosti); interpretace 'KID nenalezen'; mobilní kontrola a Lighthouse do MUSÍ; reklama A zkrácena; minimální formát exportu.
- Nepřijato: povinný technický spike v sobotu (rozhodnutí Jana, v plánu zůstává jako otevřená otázka v bodě 11).
- Hash plánu po kole: A01A0F6611FCEF714322FA4CBFEE7CCC9D5AF827B576642F494245395B6080DA

## Kolo 7 (2026-10-09 15:16)
- Soubory: round-7-codex.md, round-7-claude.md
- Codex: CHANGES_NEEDED (1 BLOCKING, 5 IMPORTANT, 2 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: odstraněn checkbox souhlasu, místo něj informace o zpracování u tlačítka (právní kvalifikace neověřena); 'bez reklamních a analytických třetích stran, technicky Vercel a Neon'; statický příklad při škrtání interakce; README rozliší 'technicky připraveno k reklamě' a 'platformně nebo právně spustitelné jen po kontrole'; redakce ai-log zachová strukturu příkazů, relativní cesty a čas; sjednocen Lighthouse mobile na produkční URL.
- Nepřijato: záloha jako degradované B místo A (plán B už degraduje na minimum 3 dvojice, A se zvažuje jen když nejdou ověřit ani 3; Jan rozhodl o A jako záložním plánu).
- Hash plánu po kole: 17186A7F6A1392D763FC276F0B49BA930E9017FB009C4BEC3BB0F11547D2C80F

## Kolo 8 (2026-10-09 15:17)
- Soubory: round-8-codex.md, round-8-claude.md
- Codex: CHANGES_NEEDED (3 BLOCKING, 6 IMPORTANT, 2 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: účel zpracování sjednocen na zpřístupnění přehledu po odeslání e-mailu; akceptační stav reklamy (spustitelné aspoň na jedné platformě po splnění požadavků, jinak to README přizná); minimální interakce = předvyplněný výpočet; omezení událostí (jednou za relaci, throttle); zpevněný token (HMAC, silný klíč, kontrola podpisu a expirace); KID ověřovat na oficiální dokumentové stránce konkrétního ISIN; očekávaná konverze vždy jako konkrétní číselný interval označený jako odhad; krátký hlavní nadpis; formát exportu.
- Nepřijato (potřetí): záloha má být degradované B místo A (plán B už degraduje na minimum 3 dvojice; A jako záloha je rozhodnutí Jana); technický spike v sobotu povinný (rozhodnutí Jana, otevřená otázka v bodě 11). Obě věci čekají na Jana.
- Hash plánu po kole: BD8E2B03EC29F71E9DB9E951051C1A25157C997B7FA539A87A2B39543BD342E0

## Kolo 9 (2026-10-09 15:18)
- Soubory: round-9-codex.md, round-9-claude.md
- Codex: CHANGES_NEEDED (2 BLOCKING, 7 IMPORTANT, 3 NITS). Claude: CHANGES_NEEDED.
- Přijato a opraveno: hlavní slib bez tvrzení o dostupnosti u brokerů (náklady, KID a UCITS alternativa); do soboty vybrat jednu konkrétní reklamní cestu; technické logy hostingu v privacy specifikaci; výběr ETF podle srovnatelnosti dvojice; konverze jako hypotéza k ověření testem; v README popsat nezveřejněné části ai-log; limit 2 hodiny na vzhled PDF.
- Nepřijato: povinný technický spike (počtvrté, rozhodnutí Jana); záloha jako degradované B místo A (rozhodnutí Jana).
- Stav: kola se opakují hlavně na dvou rozhodnutích Jana. Smyčka se pozastavuje a ptá se Jana.
- Hash plánu po kole: 96D4400D9905331B02F196327C14901D19BB60CBF01A2EB94446685D566B362A

## Rozhodnutí Jana po kole 9 (2026-10-09 15:42)
- Záloha: méně než 3 ověřené dvojice nedává smysl, údaje musí mít ověřený zdroj; zadání A zůstává poslední zálohou. TOTO UŽ NENÍ OTEVŘENÉ, nevytýkat.
- Technický spike bez doménových dat (prázdný layout, formulář, zápis do databáze, koncový bod událostí, nasazení) je POVOLEN a smí začít hned. TOTO UŽ NENÍ OTEVŘENÉ, nevytýkat.
- Plán upraven (bod 4, bod 11). Hash plánu: BAF5A0EDBA779FCF7F13BD213AAFF70839E8017CBF5AB39A2893EED60E39AF93

## Kolo 10 (2026-10-09 15:43)
- Soubory: round-10-codex.md, round-10-claude.md
- Codex: CHANGES_NEEDED (3 BLOCKING, 8 IMPORTANT, 3 NITS). Claude: CONSENSUS (po opravách).
- Přijato a opraveno vše: sobota = technický základ, neděle = data a texty; /api/events vždy i při záloze; při neprůchodnosti reklam změna positioningu nebo kanálu; 'svět' jen jako nejbližší alternativa; neutrální řazení abecedně podle tickeru; pdf_version v tokenu; text formuláře 'E-mail uložíme jako kontakt a hned ti zobrazíme celý přehled.'; omezení měření kvantifikováno; cílení 18+; compliance/checklist.md; v pátek jen návrh kandidátů; ai-log rozdělen na claude-code/, codex/, review/; drobnosti.
- Nepřijato: nic.
- Hash plánu po kole: 544BC1EAAC234E1E2B048F11304A75A13465BFF8A7D36CE313A807B670332D2A

## Kolo 11 (2026-10-09 15:45)
- Soubory: round-11-codex.md, round-11-claude.md
- Codex: CHANGES_NEEDED (2 BLOCKING, 9 IMPORTANT, 3 NITS). Claude: CONSENSUS (po opravách).
- Přijato a opraveno: pracovní právní základ (čl. 6 odst. 1 písm. b a f GDPR), znění informace a zásad v sobotu před implementací; záložní reklamní kanály k ověření (Seznam Sklik, LinkedIn); NYSE Arca vysvětlit v README; známost tickeru jako druhé kritérium; metriky kvality leadů; token bez cesty k souboru, allowlist; pdf_download_clicked přes sendBeacon; konkrétní cílení ČR, čeština, 18+; sobota odlehčena, texty a reklamy v neděli; minimální rytmus commitů; podnadpis bez 'co koupit'.
- Už vyřešeno dříve: e-mail box hned po interakci; Lighthouse skóre není MUSÍ.
- Nepřijato: vedlejší odkaz v úvodu přesměrovat na náhled (Codex ho v kole 3 sám navrhl; hlavní tlačítko už vede na náhled).
- Hash plánu po kole: 0594C4733A1F7FC7F7BCC98F456344368A426308CD6F975EEF12AB801DEA122A

## Kolo 12 (2026-10-09 15:46)
- Soubory: round-12-codex.md, round-12-claude.md
- Codex: CHANGES_NEEDED (1 BLOCKING, 6 IMPORTANT, 3 NITS). Claude: CONSENSUS (po opravách).
- Přijato a opraveno: nepovinné nezaškrtnuté marketingové políčko (samostatný souhlas), povinný jen e-mail; PDF v private/ přibalené do serverové funkce, záloha Vercel Blob, test na produkci; přesnější věta o cookies; algoritmus výběru UCITS (stejný index, stejný správce, nejbližší index); sobotní minimum; reklamy v MUSÍ se stavem; ostřejší varianta nadpisu.
- Už vyřešeno dříve: minimální reklamní kanál (kola 10 a 11), PDF začíná tabulkou, formát Codex logu (kolo 8).
- Hash plánu po kole: 7C89EBC89A2EBADA7D4E693DEBAFD545CFEEAFD3925B02F0F4ED8AA7B128B3BA

## Kolo 13 (2026-10-09 15:47)
- Soubory: round-13-codex.md, round-13-claude.md
- Codex: CHANGES_NEEDED (0 BLOCKING, 5 IMPORTANT, 3 NITS). Claude: CONSENSUS.
- Přijato a opraveno vše: marketingové políčko oddělené, verzované, bez dopadu při neudělení; události vždy do Neonu, jinak měření nesplněno; PDF endpoint v Node.js runtime, jinak Vercel Blob; sloupce us_priips_kid_status a ucits_kid_status; sobotní minimum = technický průchod + 1 ověřená dvojice; odkaz v úvodu 'Co obsahuje celý přehled'; přesné číslo ETF v reklamách; 'interní compliance checklist vyplněný včetně známých rizik'.
- Hash plánu po kole: D4E91A535EC70C1E296AAC441E3CBE870D37F6DDF39F59B3346A8DB7EA268BB5

## Kolo 14 (2026-10-09 15:48)
- Soubory: round-14-codex.md, round-14-claude.md
- Codex: CHANGES_NEEDED (0 BLOCKING, 4 IMPORTANT, 3 NITS). Claude: CONSENSUS.
- Přijato a opraveno: lead_id jako veřejné UUID, interní ID se neposílá, události ověřené proti session_id; hodnota leadu bez souhlasu jen pro vyhodnocení zájmu; kontrola platforem se zdrojem pravidel, datem a stavem 'bez certifikace lze / nelze'; Lighthouse report v README s rozlišením měřeno/splněno.
- Nits už vyřešené dříve (ostřejší nadpis bod 2, upozornění u 'svět' bod 4, formát exportu bod 12) - NEOPAKOVAT.
- Hash plánu po kole: 31108157CC844A2F823AD9A9ABCECF4DA0232CC115AFABCC54BE4B7543387B1E

## Kolo 15 (2026-10-09 15:49)
- Soubory: round-15-codex.md, round-15-claude.md
- Codex: CHANGES_NEEDED (0 BLOCKING, 5 IMPORTANT, 3 NITS). Claude: CONSENSUS.
- Přijato a opraveno vše: pole souhlasu v datovém modelu, validace /api/events, důkazy k 'KID nenalezen' v data/dukazy/, compliance zúženo na praktický checklist, Lighthouse report povinný a skóre cíl, ostřejší varianta nadpisu, výčet údajů PDF, poznámka o druhém repu.
- KONEC: MAX_ROUNDS (viz final-verdict.md). Hash plánu: 1D92672A5A8C7BE84905E042D92ED6989B9B6D833B47DC9CBD7C4611126E9531

## Pokračování: kola 16 až 20 (2026-10-09 16:05)
- Jan přidal 5 kol. Codex CLI aktualizováno na 0.162.0, od teď výchozí model gpt-6.1-sol.
- Rozhodnutí Jana: přípravy A smí zahrnovat i kostru kódu (bez sběru dat, limit 3 hodiny, B má přednost). NEVYTÝKAT jako otevřené.
- Marketingové políčko zůstává nezaškrtnuté (předem zaškrtnutý souhlas není platný souhlas podle GDPR); čeká na potvrzení Jana.

## Kolo 16 (2026-10-09 16:06)
- Soubory: round-16-codex.md, round-16-claude.md
- Codex: CHANGES_NEEDED (0 BLOCKING, 2 IMPORTANT). Claude: CONSENSUS.
- Přijato a opraveno: vzorec kalkulačky (částka × rozdíl TER, bez doby investování, předpoklady na stránce); form_submit_attempt vs lead_created (serverová konverze) a klíč idempotence.

## Kolo 17 (2026-10-09 16:07)
- Soubory: round-17-codex.md, round-17-claude.md
- Codex: CHANGES_NEEDED (0 BLOCKING, 1 IMPORTANT). Claude: CONSENSUS.
- Přijato a opraveno: podíl leadů se souhlasem, dvě konverze v README, A/B test políčka hodnocen podle leadů se souhlasem.

## Kolo 18 (2026-10-09 16:08)
- Soubory: round-18-codex.md, round-18-claude.md
- Codex: CONSENSUS. Claude: CONSENSUS.
- KONEC: CONSENSUS (viz final-verdict.md).
