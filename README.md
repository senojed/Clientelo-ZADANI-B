# Evropské alternativy amerických ETF: konverzní landing page

Řešení zadání B (Clientelo, Junior AI Developer). Landing page pro českého drobného investora, který přijde z reklamy na mobilu: srovnání 4 amerických ETF z NYSE Arca s jejich UCITS alternativami na stejný index, výpočet rozdílu ročního poplatku a celý přehled zdarma za e-mail. Vznikla jako ukázka a není spuštěná kampaň.

## V kostce

- **Mohli bychom zítra spustit reklamu?** Technicky ano: stránka je nasazená, formulář ukládá kontakty, celá cesta se měří a podle pravidel Meta k 10. 10. 2026 reklamy nevyžadují certifikaci inzerenta. **Firemní kampaň bych bez tří kroků nespouštěl:** právní kontrola textů, zásad a měření (účel a právní základ ukládání e-mailů, pravidla ePrivacy), doplnění kontaktu správce údajů (u dema je zástupný text) a hosting, který dovoluje komerční provoz (Vercel Hobby ne). Podrobně v části Co chybí.
- **Stránka:** https://clientelo-zadani-b.vercel.app
- **Reklamy** (texty a obrázky): [`ads/ad-a.md`](ads/ad-a.md), [`ads/ad-b.md`](ads/ad-b.md)
- **Data a důkazy:** [`data/etf.json`](data/etf.json), [`data/overeni.md`](data/overeni.md), [`data/dukazy/`](data/dukazy/)
- **Práce s AI:** [`ai-log/`](ai-log/), shrnutí v části Jak jsem pracoval s AI
- **Stav k 12. 10. 2026:** stránka, reklamy a PDF přehledu jsou hotové, proběhly dva nezávislé audity celku. Repozitář je zatím soukromý; zveřejním ho po závěrečné kontrole redakce `ai-log`, před odevzdáním (čtvrtek 15. 10. 2026).

## Klíčové zjištění, na kterém stránka stojí

Americká ETF obvykle nemají KID pro evropské drobné investory (obecný zdroj: justETF, 2018; KID je dokument podle nařízení PRIIPs, bez kterého broker v EU drobnému investorovi fond obvykle nenabídne). U všech 4 vybraných ETF (DIA, IVV, VOO, VT) jsme ho k 9. 10. 2026 na stránkách správců nenašli. Stránka proto neříká "kup VOO", ale ukazuje UCITS alternativu na stejný index s českým KID a registrací v ČR (seznam ČNB, 10. 10. 2026) a otevřeně říká, že je dražší.

## Rozhodnutí tam, kde zadání nebylo jednoznačné

- **"ETF obchodované na NYSE":** všechny 4 fondy jsou kótované na NYSE Arca (burza skupiny NYSE). Ověřeno na nyse.com, důkazy v `data/dukazy/`.
- **Proč i UCITS alternativy:** drobný investor v EU americká ETF bez KID obvykle nekoupí. Srovnání jen amerických fondů by tedy slibovalo něco, co nejspíš nedostane. Ke každému fondu proto ukazuji UCITS alternativu s českým KID a registrací v ČR. Dostupnost u konkrétního brokera jsem neověřoval.
- **Proč 4 fondy:** raději méně a každý údaj ověřený ze zdroje (náklady, KID, registrace v ČR) než dlouhý seznam. IVV a VOO sledují stejný index; zařadil jsem oba, abych pokryl návštěvníky, kteří hledají konkrétně jeden z nich.
- **Proč jedna stránka pro obě reklamy:** obě reklamy slibují totéž (srovnání a alternativy); reklamu rozliší `utm_content`. Nadpis podle reklamy je hypotéza k A/B testu.
- **Export konverzací:** `/export` nebyl v desktopové aplikaci k dispozici a surový záznam obsahuje osobní údaje, proto je v `ai-log` redigovaný převod záznamu (metodika v [`ai-log/README.md`](ai-log/README.md)).

## Cílová skupina a nabídka za kontakt

**Kdo:** člověk, který slyšel "kup VOO / S&P 500" (YouTube, podcast, kamarád), hledá to u svého brokera a má na stránku pár sekund na mobilu. Věk a zdroje jsou hypotéza, podstatná je situace.

**Co dostane za e-mail:** hned po odeslání (bez čekání na e-mail) se otevře celý přehled na vlastní adrese. Odkaz lze zkopírovat a během 24 hodin znovu otevřít, přehled přežije obnovení stránky. V přehledu je:
- ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera,
- odkazy na české KID s datem dokumentu a informace o registraci v ČR,
- kontrolní seznam "jak si ETF ověřit u svého brokera" (bez názvů brokerů),
- KID, PRIIPs a UCITS vysvětlené lidsky,
- hotové PDF přehledu ke stažení (tlačítko "Stáhnout PDF"; stahuje se jen s platným odkazem; ve vestavěném prohlížeči Facebooku a Instagramu stránka poradí otevřít ji v prohlížeči).

Veřejně (bez e-mailu) jsou náklady, zdroj u každého čísla (stránka správce u US fondu, datum českého KID u alternativy) a výpočet. ISIN, odkazy na KID a kontrolní seznam jsou za e-mailem a do prohlížeče se pošlou až po ověření tokenu.

**Kdy se ptáme:** až po ukázce hodnoty. Tabulka s náklady a kalkulačka jsou veřejné, formulář je až na třetí obrazovce. Formulář má jedno povinné pole (e-mail) a nepovinný, nezaškrtnutý souhlas s novinkami.

## Pořadí sekcí a proč

Každá ze tří sekcí má aspoň výšku obrazovky mobilu a na 375×812 zabírá zhruba jednu obrazovku (srovnání a formulář o desítky pixelů víc).

1. **Úvod:** nadpis "Evropské alternativy amerických ETF" navazuje na slib obou reklam; jedno tlačítko na srovnání. Návštěvník z reklamy během pár sekund pozná, že je na správném místě. Hned tu je "Marketingové sdělení, ne investiční doporučení" a riziko ztráty. Na pozadí je dekorativní video, obsah na něm nezávisí: nejdřív se ukáže poster, video se stahuje až po načtení stránky a při omezeném pohybu v systému nebo úspoře dat se nepřehrává.
2. **Tabulka + kalkulačka:** hodnota před formulářem. Jeden řádek = jeden pár (americké ETF, UCITS alternativa, náklady obou). Klik rozbalí detail se zdrojem a zároveň přepne fond v kalkulačce, takže jedna akce = dvě odpovědi. Kalkulačka je předvyplněná (VOO, 100 000 Kč), výsledek je vidět bez interakce. Rozbalený řádek i výsledek kalkulačky končí výzvou "Získat ISIN a český KID zdarma", takže každý interaktivní prvek vede ke kontaktu.
3. **Proč evropská alternativa + formulář:** tři krátké důvody (KID, srovnatelnost, registrace v ČR) pro ty, kdo váhají, hned nad formulářem. Po odeslání se otevře přehled.
4. **Patička:** plná upozornění, zdroje, zásady zpracování.

Proč tabulka a ne karty: první verze měla karty a stránka byla na mobilu dlouhá; tabulka ukáže všechny 4 páry naráz a detaily jen na požádání.

## Očekávaná konverze

Vlastní odhad z předpokladů, ne měření ani benchmark (veřejné srovnatelné číslo pro tento typ stránky jsem nedohledal). Odhad je rozložený na dva kroky, které se na stránce opravdu měří: podíl návštěv, které dojedou k formuláři (`section_view` formuláře), a podíl těch, kdo formulář odešlou.

| Scénář | Dojede k formuláři | Z nich odešle | Návštěva → lead | Podíl leadů se souhlasem s novinkami | Návštěva → lead se souhlasem |
|---|---|---|---|---|---|
| Nízký | 25 % | 8 % | 2 % | 20 % | 0,4 % |
| Střední | 35 % | 14 % | 5 % | 30 % | 1,5 % |
| Vysoký | 45 % | 20 % | 9 % | 33 % | 3 % |

Logika: studený provoz ze sociální sítě na mobilu (nízký záměr) a nedůvěra k "zdarma" u finančního tématu čísla snižují; jedno pole, hodnota ukázaná před formulářem a přehled hned po odeslání je zvyšují. Souhlas s novinkami je nepovinný a nezaškrtnutý, proto ho čekám jen u pětiny až třetiny leadů. Nejvíc výsledek ovlivní kvalita provozu (cílení, kreativa), ne stránka. Předpoklady se ověří prvními daty z trychtýře (`web/db/funnel.sql`).

## Tři hypotézy pro A/B test (seřazené podle očekávaného dopadu)

1. **První řádky tabulky už na první obrazovce** (krátký úvod) místo úvodu přes celou obrazovku zvýší podíl návštěv, které se dostanou ke srovnání, a tím i konverzi. Proč: návštěvník z reklamy má pár sekund a čísla jsou hlavní důkaz hodnoty. Metrika: návštěva → zobrazení srovnání, návštěva → lead. Riziko: bez kontextu nadpisu nemusí tabulce rozumět.
2. **Nadpis úvodu přizpůsobený reklamě** (podle `utm_content`; u reklamy A otázka "Znáš VOO?", u B "4 ETF na jednom místě") sníží okamžité odchody oproti jednomu společnému nadpisu. Metrika: návštěva → zobrazení srovnání, návštěva → lead.
3. **Pojmenování nabídky:** "Kontrolní seznam: jak si ETF ověřit u brokera" místo "Celý přehled zdarma". Proč: konkrétní užitek místo obecného "přehledu". Metrika: zobrazení sekce s formulářem → lead.

Při malém provozu by test trval dlouho; u dema je to návrh, ne spuštěný test.

## Měření celé cesty

Vlastní měření bez cookies a bez analytiky třetích stran. Prohlížeč posílá události na `/api/events` (seznam povolených názvů, kontrola původu a délek), odeslání formuláře zapisuje server (`lead_created` je konverze, klíč idempotence brání dvojímu započtení).

Události: `page_view` (s UTM a variantou reklamy), `section_view` (srovnání, sekce s formulářem), `row_expand`, `interaction_used`, `source_click`, `cta_click` (s místem a fondem), `form_start`, `form_submit_attempt`, `lead_created` (server, v jedné transakci s uložením leadu, nejvýš jednou na lead), `overview_shown`, `link_copied`, `pdf_download_clicked`. UTM se zachytí jednou při příchodu, takže atribuce přežije přechod na zásady nebo přehled. Událost se k leadu připíše, jen když lead patří ke stejné relaci.

Reklamu A a B rozliší `utm_content=ad_a` / `ad_b` (uloží se jako varianta). Trychtýř podle varianty včetně obou konverzí: [`web/db/funnel.sql`](web/db/funnel.sql). **Konverze v SQL** je podíl relací se zaznamenaným `page_view`, ve kterých vznikl aspoň jeden `lead_created`; "lead" je jedno odeslání formuláře, takže stejný e-mail se může započítat víckrát (počet unikátních adres je dotaz na konci souboru).

**Meta a konverze (vědomě nedořešeno):** Meta bez pixelu nebo Conversions API nevidí, kdo z reklamy odeslal formulář, takže kampaň jde optimalizovat jen na kliknutí nebo zobrazení stránky, ne na leady. Pro ostrou kampaň doporučuji Conversions API ze serveru po právní kontrole; do té doby cíl "zobrazení vstupní stránky". Demo ukládá `fbclid` spolu s UTM (jen u nás, Metě se nic neposílá). Porovnání pixelu a Conversions API je v [`compliance/checklist.md`](compliance/checklist.md).

Omezení: relace žije jen v paměti stránky, po obnovení stránky vznikne nová (jedna návštěva se může rozpadnout na dvě a konverzi to mírně podhodnotí); skutečné stažení PDF změřit nejde (jen klik); události z prohlížeče lze podvrhnout (kontrola původu chrání jen proti cizím webům).

## Reklamy

Dvě verze pro Meta (Facebook, Instagram), mobil. Obě vedou na stejnou stránku a slibují jen to, co stránka ukáže. Texty a obrázky jsou připravené; podle pravidel Meta k 10. 10. 2026 nevyžadují certifikaci inzerenta (Google Ads by ověření finančního inzerenta vyžadoval). Náhled umístění v Ads Manageru a schválení reklam Metou zatím ověřené nejsou a reklamy nebyly spuštěny. Podrobně v [`compliance/checklist.md`](compliance/checklist.md).

| | Reklama A | Reklama B |
|---|---|---|
| Hák | "Znáš VOO nebo IVV? Porovnej náklady" | "4 americká ETF a jejich evropské alternativy" |
| Vizuál | dvě karty vedle sebe, VOO a jeho UCITS alternativa, náklady 0,03 % a 0,07 %, popisek "stejný index" | výřez tabulky ze stránky (VOO a VT), zbytek rozmazaný, datum ověření |
| Obrázky | [`ads/ad-a-1080x1350.png`](ads/ad-a-1080x1350.png), [`ads/ad-a-1080x1920.png`](ads/ad-a-1080x1920.png) | [`ads/ad-b-1080x1350.png`](ads/ad-b-1080x1350.png), [`ads/ad-b-1080x1920.png`](ads/ad-b-1080x1920.png) |
| Texty, cílení, UTM | [`ads/ad-a.md`](ads/ad-a.md) | [`ads/ad-b.md`](ads/ad-b.md) |

Upozornění "Marketingové sdělení. Investice nesou riziko ztráty." je přímo v každém obrázku, protože pole Popis se ve všech umístěních nezobrazuje. Obrázky nemají falešné tlačítko (klikací je tlačítko Mety). Dvě vědomá zjednodušení: u reklamy A je datum ověření jen na stránce, ne v obrázku; obrázky používají krátké "Roční náklady", kdežto stránka a PDF upřesňují "na správu a provoz, bez transakčních nákladů fondu" (u VT je v KID navíc 0,02 %).

## Compliance

Kontrolní seznam (zakázaná a povolená tvrzení, povinné prvky, pravidla platforem) je v [`compliance/checklist.md`](compliance/checklist.md). Právní rámec je ověřen jen obecně, řešení neprošlo právní kontrolou; před reálnou kampaní je nutná.

Stránka nepoužívá cookies ani úložiště prohlížeče; měření si drží identifikátor návštěvy jen v paměti stránky a čte parametry odkazu z reklamy (UTM, `fbclid`). **Zda pro takové vlastní měření stačí oprávněný zájem a lišta není potřeba, nebylo právně posouzeno** (pravidla ePrivacy se mohou vztahovat i na paměť stránky a identifikátory v adrese). Pixely a analytika třetích stran by souhlas předem vyžadovaly určitě. Neon (databáze) je provozovaný americkou společností; i to patří do právní kontroly.

## Mobil a výkon

Lighthouse na mobilu (produkční URL, 12. 10. 2026, tři měření): výkon 94 až 96, přístupnost 100, doporučené postupy 100, SEO 100, LCP 2,4 až 2,7 s (cíl pod 2,5 s je hraniční, hlavním prvkem je poster videa), CLS 0, TBT 30 až 60 ms. První měření je celý report, další dvě jsou uložená jako JSON: [`docs/lighthouse/`](docs/lighthouse/). Ruční průchod na reálném telefonu jsem udělal 11. 10. 2026 a problém jsem nenašel.

## Jak jsem pracoval s AI

**Rozdělení práce:** já jsem zadával směr a rozhodoval (výběr zadání, fondů, kompromisy), ručně ověřoval každý údaj ve zdrojích, zadal CAPTCHA v registru ČNB a sám jsem navrhl design stránky, reklamy a PDF přehledu. Claude Code hledal a ověřoval data, psal kód a texty a dělal rešerši pravidel. Codex byl druhý názor na plán, texty a audity.

**Pokyny agentům** (konkrétně v repu):
- plán psaný jako ověřitelné cíle s prioritami [`PLAN.md`](PLAN.md); pravidla "co nemá zdroj s datem, na stránce není" a "nevymýšlet příčiny, doložit je daty";
- zadání pro designové sezení se seznamem věcí, které se bez mého souhlasu nesmí měnit (texty, upozornění, měření): [`design/ZADANI-DESIGN.md`](design/ZADANI-DESIGN.md);
- auditoři (Claude subagent a Codex) dostali jen text zadání a repozitář, ne naši konverzaci. Záznamy Claude auditorů včetně jejich pokynů jsou v [`ai-log/claude-code/subagenti/`](ai-log/claude-code/subagenti/); výstupy obou auditorů (včetně Codexu), nálezy a rozhodnutí jsou v [`ai-log/review/audit-1/`](ai-log/review/audit-1/) a [`audit-2/`](ai-log/review/audit-2/).

**Jak jsem výstup kontroloval:**
- každý údaj o fondu ručně a pak nezávislou kontrolou v druhém sezení;
- 18 kol revize plánu Claude a Codex do shody ([`ai-log/review/plan-consensus/`](ai-log/review/plan-consensus/));
- dva nezávislé audity celku proti zadání, Codex a Claude subagent bez kontextu: audit 1 ve 4 kolech a audit 2 ve 2 kolech do shody ([`ai-log/review/`](ai-log/review/)), včetně záznamu každého nálezu a rozhodnutí;
- po větších úpravách build, lint a test v prohlížeči; testy na produkci s úklidem testovacích dat.

**Kde se AI mýlila:** 23 zaznamenaných případů v [`ai-log/chyby-ai.md`](ai-log/chyby-ai.md). Nejdůležitější: první doporučení přehlédlo, že americká ETF nemají KID; pravidlo výběru UCITS vybralo nejdřív syntetický fond a pak fond neregistrovaný v ČR; datum KID bylo z anglické verze místo české; texty slibovaly víc, než data kryla; data "za e-mailem" byla ve veřejném JavaScriptu stránky; serverové funkce běžely v USA proti textu zásad; vlastní compliance checklist odškrtával neověřené věci. Nezávislé kontroly zachytily zásadní chyby v datech, textech a ochraně přehledu, které první sezení přehlédlo.

**Čas** a **záznamy konverzací:** [`ai-log/casovy-log.md`](ai-log/casovy-log.md), redigované exporty v [`ai-log/`](ai-log/) (metodika redakce v [`ai-log/README.md`](ai-log/README.md)).

## Co chybí

**Před ostrou kampaní:**
- právní kontrola textů, zásad a měření (účel a právní základ ukládání e-mailů, ePrivacy pro měření, Neon jako americký zpracovatel, otázka investičního doporučení);
- kontakt správce údajů v zásadách (u dema zástupný text);
- hosting pro komerční provoz: Vercel Hobby je podle podmínek Vercelu jen pro nekomerční použití, firemní kampaň by potřebovala Vercel Pro nebo hosting zadavatele;
- **odeslání odkazu na přehled e-mailem:** teď se přehled otevře hned a e-mail se jen uloží. Audit správně upozornil, že bez odeslání není doložené, proč e-mail ukládat (GDPR, minimalizace údajů). Odeslání odkazu e-mailem by účel ukládání doložilo a umožnilo sledovat nedoručitelné adresy; vyžaduje vlastní doménu a službu na odesílání e-mailů, v demu vědomě není;
- potvrzení souhlasu s novinkami e-mailem (double opt-in) před prvním newsletterem;
- měření pro Meta (Conversions API), viz Měření;
- ověření dostupnosti fondů u konkrétních brokerů;
- ověřit soulad ořezaných písem s licencí (viz Zdroje obrazu a fontů).

**Omezení dema:**
- hotové PDF se jen stahuje z webu a při změně dat se musí vyrobit znovu ručně;
- LCP na mobilu je kolem hranice cíle (2,4 až 2,7 s), video a poster jsou nejdražší prvek úvodu.

## Zdroje obrazu a fontů

- Písma: Lora, Inter a IBM Plex Mono (SIL Open Font License, Google Fonts), ořezané podmnožiny ve `web/public/fonts`, bez externích požadavků. Copyright a úplné znění licence jsou v [`web/public/fonts/LICENSES.md`](web/public/fonts/LICENSES.md). Lora a IBM Plex mají "Reserved Font Name", takže před ostrým nasazením je potřeba ověřit, že ořezání na podmnožinu licenci neporušuje (jinak použít neupravené soubory přes `next/font/google`).
- Video na pozadí úvodu: "The Increase and Decrease of Stock Market Values", autor Natures_Embrace, Pixabay (https://pixabay.com/videos/market-values-stock-exchange-204306/). Stránka videa uvádí "Free for use under the Pixabay Content License" (ověřeno 12. 10. 2026); [licence](https://pixabay.com/service/license-summary/) umožňuje bezplatné použití a úpravy bez povinného uvedení autora, za podmínek Pixabay Content License (právně závazné je jen plné znění). Video v repu je upravené (oříznuté, zpomalené na polovinu, interpolované na 30 fps, bez zvuku) a je jen pozadím stránky.
- Logo, pixelová grafika, ikony, obrázky reklam a PDF přehledu: moje vlastní tvorba (Affinity, InDesign).

## Technické řešení a spuštění

Next.js 16 (App Router, TypeScript, Tailwind), Vercel (Hobby, funkce v regionu `fra1`), databáze Neon Postgres (Frankfurt).

- **Přehled za e-mailem:** stránka `/prehled?t=<token>`; server ověří podepsaný token (HMAC, platnost 24 h, bez e-mailu uvnitř) a teprve pak pošle plná data. Stránka sama dostává jen veřejnou podmnožinu dat (`web/data/etf-verejne.json`, vyrábí ji `web/scripts/sync-data.mjs`), ISIN ani odkazy na KID v jejím JavaScriptu nejsou. PDF přehledu vydá `/prehled/pdf?t=<token>` ze složky `web/private` jen s platným tokenem (jinak 401). Po zveřejnění repa jsou data i PDF v repu vidět, takže brána "za e-mailem" je u dema ukázka mechanismu, ne skutečné zamčení obsahu.
- **Formulář:** kontrola původu, honeypot, klíč idempotence, limit 20 odeslání a 1000 měřicích událostí za hodinu z jedné IP (vyšší kvůli mobilním sítím se sdílenou IP; ukládá se jen otisk IP s datem, o půlnoci UTC se limit vynuluje).

**Spuštění:**

```bash
cd web
npm install
cp .env.example .env.local   # doplň vlastní DATABASE_URL (Neon Postgres), DOWNLOAD_TOKEN_SECRET (náhodný řetězec aspoň 32 znaků) a CRON_SECRET
node --env-file=.env.local scripts/migrate.mjs   # vytvoří tabulky
npm run dev
```

`CRON_SECRET` zabezpečuje denní úklid otisků IP (`/api/uklid`) na nasazeném Vercelu; musí být nastavený i tam, jinak úklid vrací 401. Ověření úklidu: `curl -H "Authorization: Bearer <CRON_SECRET>" <URL>/api/uklid` vrátí počet smazaných otisků.

## Struktura repozitáře

| Složka | Obsah |
|---|---|
| `web/` | aplikace (stránka, API, přehled, PDF ke stažení, SQL) |
| `data/` | ověřená data o fondech, log ověřování, důkazy |
| `ads/` | texty a obrázky dvou reklam |
| `compliance/` | kontrolní seznam, pravidla platforem |
| `docs/lighthouse/` | reporty výkonu na mobilu |
| `ai-log/` | redigované záznamy práce s AI, audity, chyby AI, časový log |
| `design/` | zadání pro designové sezení a textové podklady |
| `PLAN.md` | plán řešení (zmrazený 9. 10., odchylky na jeho začátku) |
