# Evropské alternativy amerických ETF: konverzní landing page

Řešení zadání B (Clientelo, Junior AI Developer). Landing page pro českého drobného investora, který přijde z reklamy na mobilu: srovnání 4 amerických ETF z NYSE Arca s jejich UCITS alternativami na stejný index, výpočet rozdílu ročního poplatku a celý přehled zdarma za e-mail.

- **Stránka:** https://clientelo-zadani-b.vercel.app
- **Reklamy:** [`ads/ad-a.md`](ads/ad-a.md), [`ads/ad-b.md`](ads/ad-b.md)
- **Data a důkazy:** [`data/etf.json`](data/etf.json), [`data/overeni.md`](data/overeni.md), [`data/dukazy/`](data/dukazy/)
- **Práce s AI:** [`ai-log/`](ai-log/)

> Stav k 12. 10. 2026: stránka, reklamy a PDF přehledu jsou hotové, probíhají poslední kontroly před odevzdáním.

## Klíčové zjištění, na kterém stránka stojí

Americká ETF obvykle nemají KID pro evropské drobné investory (obecný zdroj: justETF, 2018; dokument podle nařízení PRIIPs, bez kterého je broker v EU drobnému investorovi obvykle nenabídne). U všech 4 vybraných ETF (DIA, IVV, VOO, VT) jsme ho k 9. 10. 2026 na stránkách správců nenašli. Stránka proto neříká "kup VOO", ale ukazuje, jakou UCITS alternativu na stejný index s českým KID a registrací v ČR (seznam ČNB, 10. 10. 2026) porovnat, a otevřeně, že je dražší.

## Rozhodnutí tam, kde zadání nebylo jednoznačné

- **"ETF obchodované na NYSE":** všechny 4 fondy jsou kótované na NYSE Arca (burza skupiny NYSE). Ověřeno na nyse.com, důkazy v `data/dukazy/`.
- **Proč i UCITS alternativy:** český drobný investor americká ETF u evropského brokera obvykle nekoupí (chybí KID). Srovnání jen amerických fondů by mu slibovalo něco, co nekoupí; stránka proto ke každému ukazuje alternativu na stejný index, kterou koupit jde.
- **Proč 4 fondy:** raději méně a každý údaj ověřený ze zdroje (náklady, KID, registrace v ČR) než dlouhý seznam. IVV a VOO sledují stejný index; jsou tam oba, protože jsou to dva nejznámější tickery, které lidé hledají.
- **Proč jedna stránka pro obě reklamy:** obě reklamy slibují totéž (srovnání a alternativy); reklamu rozliší `utm_content`. Nadpis podle reklamy je hypotéza k A/B testu.
- **Export konverzací:** `/export` nebyl v desktopové aplikaci k dispozici a surový záznam obsahuje osobní údaje, proto je v `ai-log` redigovaný převod záznamu (metodika v [`ai-log/README.md`](ai-log/README.md)).

## Cílová skupina a nabídka za kontakt

**Kdo:** člověk, který slyšel "kup VOO / S&P 500" (YouTube, podcast, kamarád), hledá to u svého brokera a má na stránku pár sekund na mobilu. Věk a zdroje jsou hypotéza, podstatná je situace.

**Co dostane za e-mail:** hned po odeslání (bez čekání na e-mail) se otevře celý přehled na vlastní adrese, která platí 24 hodin (dá se zkopírovat a obnovit):
- ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera,
- odkazy na české KID s datem dokumentu a informaci o registraci v ČR,
- kontrolní seznam "jak si ETF ověřit u svého brokera" (bez názvů brokerů),
- KID, PRIIPs a UCITS vysvětlené lidsky,
- hotové PDF přehledu ke stažení (tlačítko "Stáhnout PDF"; PDF vyšlo z designového nástroje, stahuje se jen s platným odkazem; ve vestavěném prohlížeči Facebooku a Instagramu stránka poradí otevřít ji v prohlížeči).

Veřejně (bez e-mailu) jsou náklady, zdroj u každého čísla (stránka správce u US fondu, datum českého KID u alternativy) a výpočet. ISIN, odkazy na KID a kontrolní seznam jsou za e-mailem a do prohlížeče se pošlou až po ověření tokenu.

**Kdy se ptáme:** až po ukázce hodnoty. Tabulka s náklady a kalkulačka jsou veřejné, formulář je až na třetí obrazovce. Formulář má jedno povinné pole (e-mail) a nepovinný, nezaškrtnutý souhlas s novinkami.

## Pořadí sekcí a proč

Každá ze tří sekcí má aspoň výšku obrazovky mobilu a na 375×812 zabírá zhruba jednu obrazovku (srovnání a formulář o desítky pixelů víc).

1. **Úvod:** nadpis "Evropské alternativy amerických ETF" navazuje na slib obou reklam; jedno tlačítko na srovnání. Návštěvník z reklamy během pár sekund pozná, že je na správném místě. Hned tu je "Marketingové sdělení, ne investiční doporučení" a riziko ztráty. Na pozadí je dekorativní video; obsah na něm nezávisí. Nejdřív se ukáže poster a video se stahuje až po načtení stránky, při omezeném pohybu v systému nebo úspoře dat se nepřehrává vůbec.
2. **Tabulka + kalkulačka:** hodnota před formulářem. Jeden řádek = jeden pár (americké ETF, UCITS alternativa, náklady obou). Klik rozbalí detail se zdrojem a zároveň přepne fond v kalkulačce, takže jedna akce = dvě odpovědi. Kalkulačka je předvyplněná (VOO, 100 000 Kč), výsledek je vidět bez interakce. Rozbalený řádek i výsledek kalkulačky končí výzvou "Získat ISIN a český KID zdarma", takže každý interaktivní prvek vede ke kontaktu.
3. **Proč evropská alternativa + formulář:** tři krátké důvody (KID, srovnatelnost, registrace v ČR) pro ty, kdo váhají, hned nad formulářem. Po odeslání se otevře přehled.
4. **Patička:** plná upozornění, zdroje, zásady zpracování.

Proč tabulka a ne karty: první verze měla karty a stránka byla na mobilu dlouhá; tabulka ukáže všechny 4 páry naráz a detaily jen na požádání.

## Očekávaná konverze

Vlastní odhad, ne benchmark (veřejné srovnatelné číslo pro tento typ stránky jsme nedohledali). Je to hypotéza k ověření měřením.

| Scénář | Návštěva → lead | Návštěva → lead se souhlasem s novinkami |
|---|---|---|
| Nízký | 2 % | 0,4 % |
| Střední | 5 % | 1,5 % |
| Vysoký | 9 % | 3 % |

Logika: studený provoz ze sociální sítě na mobilu (nízký záměr) snižuje; jedno pole, hodnota ukázaná před formulářem a přehled hned po odeslání zvyšují; finanční téma a nedůvěra k "zdarma" snižují; souhlas s novinkami je nepovinný a nezaškrtnutý, proto ho čekám jen u 20 až 35 % leadů. Nejvíc výsledek ovlivní kvalita provozu (cílení, kreativa), ne stránka.

## Tři hypotézy pro A/B test (seřazené podle očekávaného dopadu)

1. **První řádky tabulky už na první obrazovce** (krátký úvod) místo úvodu přes celou obrazovku zvýší podíl návštěv, které se dostanou ke srovnání, a tím i konverzi. Proč: návštěvník z reklamy má pár sekund a čísla jsou hlavní důkaz hodnoty. Metrika: návštěva → zobrazení srovnání, návštěva → lead. Riziko: bez kontextu nadpisu nemusí tabulce rozumět.
2. **Nadpis úvodu přizpůsobený reklamě** (podle `utm_content`; u reklamy A otázka "Znáš VOO?", u B "4 ETF na jednom místě") sníží okamžité odchody oproti jednomu společnému nadpisu. Metrika: návštěva → zobrazení srovnání, návštěva → lead.
3. **Pojmenování nabídky:** "Kontrolní seznam: jak si ETF ověřit u brokera" místo "Celý přehled zdarma". Proč: konkrétní užitek místo obecného "přehledu". Metrika: zobrazení formuláře → lead.

Při malém provozu by test trval dlouho; u dema je to návrh, ne spuštěný test.

## Měření celé cesty

Vlastní měření bez cookies a bez analytiky třetích stran. Prohlížeč posílá události na `/api/events` (allowlist názvů, kontrola původu a délek), odeslání formuláře zapisuje server (`lead_created` je konverze, idempotentní klíč brání dvojímu započtení).

Události: `page_view` (s UTM a variantou reklamy), `section_view` (srovnání, formulář), `row_expand`, `interaction_used`, `source_click`, `cta_click` (s místem a fondem), `form_start`, `form_submit_attempt`, `lead_created` (server, v jedné transakci s uložením leadu, nejvýš jednou na lead), `overview_shown`, `link_copied`, `pdf_download_clicked`. UTM se zachytí jednou při příchodu, takže atribuce přežije přechod na zásady nebo přehled. Událost se k leadu připíše, jen když lead patří ke stejné relaci.

Reklamu A a B rozliší `utm_content=ad_a` / `ad_b` (uloží se jako varianta). Trychtýř podle varianty včetně obou konverzí (lead, lead se souhlasem): [`web/db/funnel.sql`](web/db/funnel.sql).

**Meta a konverze (vědomě nedořešeno v demu):** Meta bez pixelu nebo Conversions API nevidí, kdo z reklamy odeslal formulář, takže kampaň jde optimalizovat jen na kliknutí nebo zobrazení stránky, ne na leady. Možnosti:
- *Meta Pixel* (kód Mety v prohlížeči, cookies): vyžaduje cookie lištu se souhlasem předem, část návštěv nezměří (odmítnutí, blokátory, Safari).
- *Conversions API* (server po uložení leadu pošle Metě konverzi): bez cookies a kódu Mety na stránce, ale předává Metě osobní údaje (hash e-mailu, `fbclid`), takže potřebuje právní základ, úpravu zásad a přístupový token.

Pro ostrou kampaň doporučuji Conversions API ze serveru po právní kontrole. Demo už ukládá `fbclid` spolu s UTM (jen u nás, Metě se nic neposílá), takže leady půjde se kliky spárovat i zpětně. Do spuštění CAPI je rozumný cíl kampaně "zobrazení vstupní stránky".

Omezení: relace žije jen v paměti stránky, po obnovení stránky vznikne nová (jedna návštěva se může rozpadnout na dvě, konverzi to mírně podhodnotí); skutečné stažení PDF změřit nejde (jen klik); události z prohlížeče lze podvrhnout (kontrola původu chrání jen proti cizím webům).

## Reklamy

Dvě verze pro Meta (Facebook, Instagram), mobil. Obě vedou na stejnou stránku a slibují jen to, co stránka ukáže. Podle pravidel Meta k 10. 10. 2026 jsou bez certifikace inzerenta spustitelné; Google Ads by vyžadoval ověření finančního inzerenta. Podrobně v [`compliance/checklist.md`](compliance/checklist.md). Reklamy nebyly spuštěny, jsou připravené.

| | Reklama A | Reklama B |
|---|---|---|
| Hák | "Znáš VOO nebo IVV? Porovnej náklady" | "4 americká ETF a jejich evropské alternativy" |
| Vizuál | dvě karty vedle sebe, VOO a jeho UCITS alternativa, náklady 0,03 % a 0,07 %, popisek "stejný index" | výřez tabulky ze stránky (VOO a VT), zbytek rozmazaný, datum ověření |
| Obrázky | [`ads/ad-a-1080x1350.png`](ads/ad-a-1080x1350.png), [`ads/ad-a-1080x1920.png`](ads/ad-a-1080x1920.png) | [`ads/ad-b-1080x1350.png`](ads/ad-b-1080x1350.png), [`ads/ad-b-1080x1920.png`](ads/ad-b-1080x1920.png) |
| Texty, cílení, UTM | [`ads/ad-a.md`](ads/ad-a.md) | [`ads/ad-b.md`](ads/ad-b.md) |

Upozornění "Marketingové sdělení. Investice nesou riziko ztráty." je přímo v každém obrázku, protože pole Popis se ve všech umístěních nezobrazuje. Obrázky nemají falešné tlačítko (klikací je tlačítko Mety). U reklamy A je datum ověření jen na stránce, ne v obrázku (vědomé rozhodnutí). Obrázky reklam používají krátké "Roční náklady"; stránka a PDF upřesňují "na správu a provoz, bez transakčních nákladů fondu" (u VT je v KID navíc 0,02 %), což je vědomé zjednodušení v reklamě.

## Compliance

Kontrolní seznam (zakázaná a povolená tvrzení, povinné prvky, pravidla platforem) je v [`compliance/checklist.md`](compliance/checklist.md). Právní rámec je ověřen jen obecně, řešení neprošlo právní kontrolou; před reálnou kampaní je nutná. Stránka nepoužívá cookies ani úložiště prohlížeče; měření si drží identifikátor návštěvy jen v paměti stránky a čte parametry odkazu z reklamy (UTM, `fbclid`). **Zda pro takové vlastní měření stačí oprávněný zájem a lišta není potřeba, nebylo právně posouzeno** (pravidla ePrivacy se mohou vztahovat i na paměť stránky a identifikátory v adrese); je to bod pro právní kontrolu před ostrou kampaní. Pixely a analytika třetích stran by lištu se souhlasem předem vyžadovaly určitě. Neon (databáze) je provozovaný americkou společností, i to patří do právní kontroly.

## Mobil a výkon

Lighthouse na mobilu (produkční URL, 12. 10. 2026, tři měření): výkon 94 až 96, přístupnost 100, best practices 100, SEO 100, LCP 2,4 až 2,7 s (cíl pod 2,5 s je hraniční, hlavním prvkem je poster videa), CLS 0, TBT 30 až 60 ms. První měření je celý report, další dvě jsou uložená jako JSON: [`docs/lighthouse/`](docs/lighthouse/). Ruční průchod na reálném telefonu: Jan ho udělal 11. 10. 2026 a nenašel problém.

## Jak jsem pracoval s AI

**Role:** Jan zadával směr a rozhodoval (výběr zadání, fondů, kompromisy), ručně ověřoval každý údaj ve zdrojích, opsal CAPTCHA v registru ČNB (Claude CAPTCHA řešit nesmí) a sám navrhl design stránky, reklamy a PDF přehledu. Claude Code hledal a ověřoval data, psal kód a texty, dělal rešerši pravidel a kontroloval výstupy ostatních.

**Pokyny agentům:** plán psaný jako ověřitelné cíle, pravidlo "co nemá zdroj s datem, na stránce není", pravidlo "nevymýšlet příčiny, doložit je daty", u designového chatu seznam věcí, které se bez souhlasu nesmí měnit (texty, upozornění, měření). Subagenti pro audit dostali jen zadání a repozitář, ne naši konverzaci.

**Jak jsem výstup kontroloval:**
- Každý údaj o fondu ručně (Jan) a pak nezávislou druhou session Claude Code ("double check jako při lezení").
- 18 kol revize plánu Claude a Codex do shody; Codex jako druhý názor na texty a na pravidla.
- Nezávislý audit celku proti zadání: Codex a Claude subagent bez kontextu, 4 kola ping-pongu do shody (`ai-log/review/audit-1/`).
- Po každé větší úpravě build, lint a test v prohlížeči; produkční testy s úklidem testovacích dat.

- **Nástroje:** Claude Code (plánování, ověřování dat, kód, nasazení), Codex (druhý názor, revize plánu a textů), LLM council (5 poradců a 5 recenzentů jako subagenti), nezávislý audit (subagent bez kontextu konverzace, jen zadání a repozitář).
- **Postup:** plán → 18 kol revize Claude a Codex do shody → ověření dat ze zdrojů s uložením důkazů → stránka → nezávislé kontroly. Každý údaj ručně zkontroloval Jan a pak ještě nezávislá druhá session Claude Code ("double check jako při lezení").
- **Kde se AI mýlila:** 23 zaznamenaných případů v [`ai-log/chyby-ai.md`](ai-log/chyby-ai.md). Nejdůležitější: první doporučení přehlédlo, že americká ETF nemají KID; pravidlo výběru UCITS vybralo syntetický fond a pak fond neregistrovaný v ČR; datum KID z anglické verze místo české; texty slibovaly víc, než data kryla. Další: data "za e-mailem" byla ve veřejném JavaScriptu stránky, serverové funkce běžely v USA proti textu zásad, vlastní compliance checklist odškrtával neověřené věci, nepřesné časy místo času z příkazové řádky. Většinu chyb zachytila nezávislá druhá kontrola, ne první session.
- **Čas:** [`ai-log/casovy-log.md`](ai-log/casovy-log.md).
- **Záznamy konverzací:** redigované exporty v [`ai-log/`](ai-log/), metodika redakce v [`ai-log/README.md`](ai-log/README.md).

## Co chybí

- Hotové PDF se jen stahuje z webu, neposílá se e-mailem (viz další bod). Při změně dat se musí PDF vyrobit znovu ručně.
- LCP na mobilu je kolem hranice cíle (2,4 až 2,7 s); video a poster jsou nejdražší prvek úvodu.
- **Odeslání odkazu na přehled e-mailem (upozornění pro kontrolu).** Teď se přehled otevře hned a e-mail se jen uloží. Audit (Codex) správně upozornil, že bez odeslání není doložené, proč e-mail ukládat (GDPR, minimalizace údajů). Pro ostrý provoz doporučuji posílat odkaz e-mailem: účel uložení je pak jasný a půjde sledovat nedoručitelné adresy (úplné ověření schránky by vyžadovalo potvrzovací klik). Vyžaduje vlastní doménu a službu na odesílání e-mailů; v demu vědomě není.
- Měření pro Meta (pixel nebo Conversions API), viz Měření.
- Potvrzení souhlasu s novinkami e-mailem (double opt-in) před prvním newsletterem.
- Hosting pro ostrou kampaň: Vercel Hobby je podle podmínek Vercelu jen pro nekomerční použití; demo běží na něm, firemní kampaň by potřebovala Vercel Pro nebo hosting zadavatele.
- Právní kontrola textů a zásad; kontakt správce údajů v zásadách (u dema zástupný text, před kampaní nutný).
- Ověření dostupnosti fondů u konkrétních brokerů.

## Zdroje obrazu a fontů

- Písma: Lora, Inter a IBM Plex Mono (licence SIL Open Font License, Google Fonts), ořezané soubory ve `web/public/fonts`, bez externích požadavků.
- Video na pozadí úvodu: "The Increase and Decrease of Stock Market Values", autor Natures_Embrace, Pixabay (https://pixabay.com/videos/market-values-stock-exchange-204306/; stránka videa uvádí "Free for use under the Pixabay Content License", ověřeno 12. 10. 2026). Podle shrnutí licence (https://pixabay.com/service/license-summary/; právně závazné je jen plné znění) je použití zdarma, bez povinnosti uvést autora (poděkování se vítá) a s právem úprav. Zakázané je prodávat nebo šířit obsah samostatně, tedy bez tvůrčí úpravy a v podstatě v původní podobě, a použít ho zavádějícím způsobem. Video v repu je upravené (oříznuté, zpomalené na polovinu, interpolované na 30 fps, bez zvuku) a je jen pozadím stránky; nepoužívá se klamavě.
- Logo, pixelová grafika, ikony, obrázky reklam a PDF přehledu: vlastní tvorba Jana (Affinity, InDesign).

## Technické řešení a spuštění

Next.js 16 (App Router, TypeScript, Tailwind), Vercel (Hobby, funkce v regionu `fra1`), databáze Neon Postgres (Frankfurt).

- Přehled za e-mailem: stránka `/prehled?t=<token>`; server ověří podepsaný token (HMAC, platnost 24 h, bez e-mailu uvnitř) a teprve pak pošle plná data. Stránka sama dostává jen veřejnou podmnožinu dat (`web/data/etf-verejne.json`, vyrábí ji `scripts/sync-data.mjs`), ISIN ani odkazy na KID v jejím JavaScriptu nejsou.
- Poznámka: po zveřejnění repa jsou data i PDF přehledu viděná v repu (`data/etf.json`, `web/private/prehled-etf.pdf`), takže brána "za e-mailem" je u dema ukázka mechanismu, ne skutečné zamčení obsahu.
- PDF přehledu: `/prehled/pdf?t=<token>` vydá soubor z `web/private` jen s platným tokenem (jinak 401).
- Formulář: kontrola původu, honeypot, klíč idempotence, limit 20 odeslání a 1000 měřicích událostí za hodinu z jedné IP (vyšší kvůli mobilním sítím se sdílenou IP; ukládá se jen otisk IP s datem, o půlnoci UTC se limit vynuluje). "Lead" v měření znamená jedno odeslání formuláře; stejný e-mail může vzniknout znovu, unikátní adresy spočítá dotaz v `web/db/funnel.sql`.

```bash
cd web
npm install
npm run dev
```

Proměnné prostředí: `DATABASE_URL`, `DOWNLOAD_TOKEN_SECRET`, `CRON_SECRET` (viz `web/.env.example`; `CRON_SECRET` musí být i ve Vercelu, jinak denní úklid `/api/uklid` vrací 401). Ověření úklidu: `curl -H "Authorization: Bearer <CRON_SECRET>" <URL>/api/uklid` vrátí počet smazaných otisků. Tabulky: `node --env-file=<cesta k .env> scripts/migrate.mjs`.
