# Evropské alternativy amerických ETF: konverzní landing page

Řešení zadání B (Clientelo, Junior AI Developer). Landing page pro českého drobného investora, který přijde z reklamy na mobilu: srovnání 4 amerických ETF z NYSE Arca s jejich UCITS alternativami na stejný index, výpočet rozdílu ročního poplatku a celý přehled zdarma za e-mail.

- **Stránka:** https://clientelo-zadani-b.vercel.app
- **Reklamy:** [`ads/ad-a.md`](ads/ad-a.md), [`ads/ad-b.md`](ads/ad-b.md)
- **Data a důkazy:** [`data/etf.json`](data/etf.json), [`data/overeni.md`](data/overeni.md), [`data/dukazy/`](data/dukazy/)
- **Práce s AI:** [`ai-log/`](ai-log/)

> Stav: rozpracováno (10. 10. 2026). Části označené **[doplnit]** se dopisují do odevzdání.

## Klíčové zjištění, na kterém stránka stojí

Většina amerických ETF nemá KID (dokument podle nařízení PRIIPs, bez kterého je broker v EU drobnému investorovi obvykle nenabídne). U všech 4 vybraných ETF (DIA, IVV, VOO, VT) jsme ho k 9. 10. 2026 na stránkách správců nenašli. Stránka proto neříká "kup VOO", ale ukazuje, jakou UCITS alternativu na stejný index s českým KID a registrací v ČR (seznam ČNB, 10. 10. 2026) porovnat, a otevřeně, že je dražší.

## Rozhodnutí tam, kde zadání nebylo jednoznačné

- **"ETF obchodované na NYSE":** všechny 4 fondy jsou kótované na NYSE Arca (burza skupiny NYSE). Ověřeno na nyse.com, důkazy v `data/dukazy/`.
- **Proč i UCITS alternativy:** český drobný investor americká ETF u evropského brokera obvykle nekoupí (chybí KID). Srovnání jen amerických fondů by mu slibovalo něco, co nekoupí; stránka proto ke každému ukazuje alternativu na stejný index, kterou koupit jde.
- **Proč 4 fondy:** raději méně a každý údaj ověřený ze zdroje (náklady, KID, registrace v ČR) než dlouhý seznam. IVV a VOO sledují stejný index; jsou tam oba, protože jsou to dva nejznámější tickery, které lidé hledají.
- **Proč jedna stránka pro obě reklamy:** obě reklamy slibují totéž (srovnání a alternativy); reklamu rozliší `utm_content`. Nadpis podle reklamy je hypotéza k A/B testu.
- **Export konverzací:** `/export` nebyl v desktopové aplikaci k dispozici a surový záznam obsahuje osobní údaje, proto je v `ai-log` redigovaný převod záznamu (metodika v [`ai-log/README.md`](ai-log/README.md)).

## Cílová skupina a nabídka za kontakt

**Kdo:** člověk, který slyšel "kup VOO / S&P 500" (YouTube, podcast, kamarád), hledá to u svého brokera a má na stránku pár sekund na mobilu. Věk a zdroje jsou hypotéza, podstatná je situace.

**Co dostane za e-mail:** hned po odeslání (bez čekání na e-mail) se otevře celý přehled na vlastní adrese, která platí 24 hodin (dá se zkopírovat, obnovit i uložit):
- ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera,
- odkazy na české KID s datem dokumentu a informaci o registraci v ČR,
- kontrolní seznam "jak si ETF ověřit u svého brokera" (bez názvů brokerů),
- KID, PRIIPs a UCITS vysvětlené lidsky,
- tlačítko "Uložit jako PDF" (ve vestavěném prohlížeči Facebooku a Instagramu stránka poradí otevřít ji v prohlížeči).

Veřejně (bez e-mailu) jsou náklady, zdroj u každého čísla (stránka správce u US fondu, datum českého KID u alternativy) a výpočet. ISIN, odkazy na KID a kontrolní seznam jsou za e-mailem a do prohlížeče se pošlou až po ověření tokenu.

**Kdy se ptáme:** až po ukázce hodnoty. Tabulka s náklady a kalkulačka jsou veřejné, formulář je až na třetí obrazovce. Formulář má jedno povinné pole (e-mail) a nepovinný, nezaškrtnutý souhlas s novinkami.

## Pořadí sekcí a proč

Každá sekce je aspoň na výšku obrazovky mobilu (na 375×812 se vejde celá).

1. **Úvod:** nadpis "Evropské alternativy amerických ETF" navazuje na slib obou reklam; jedno tlačítko na srovnání. Návštěvník z reklamy během pár sekund pozná, že je na správném místě. Hned tu je "Marketingové sdělení, ne investiční doporučení" a riziko ztráty.
2. **Tabulka + kalkulačka:** hodnota před formulářem. Jeden řádek = jeden pár (americké ETF, UCITS alternativa, náklady obou). Klik rozbalí detail se zdrojem a zároveň přepne fond v kalkulačce, takže jedna akce = dvě odpovědi. Kalkulačka je předvyplněná (VOO, 100 000 Kč), výsledek je vidět bez interakce. Rozbalený řádek i výsledek kalkulačky končí výzvou "Získat ISIN a český KID zdarma", takže každý interaktivní prvek vede ke kontaktu.
3. **Proč evropská alternativa + formulář:** tři krátké důvody (KID, srovnatelnost, registrace v ČR) pro ty, kdo váhají, hned nad formulářem. Po odeslání se otevře přehled.
4. **Patička:** plná upozornění, zdroje, zásady zpracování.

Proč tabulka a ne karty: první verze měla karty a stránka byla na mobilu dlouhá; tabulka ukáže všechny 4 páry naráz a detaily jen na požádání.

## Očekávaná konverze **[doplnit / zpřesnit]**

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

Meta bez pixelu nebo Conversions API konverze nevidí, takže kampaň by šla optimalizovat jen na zobrazení stránky. **[Otevřené: rozhoduje Jan]**

Omezení: relace žije jen v paměti stránky, po obnovení stránky vznikne nová (jedna návštěva se může rozpadnout na dvě, konverzi to mírně podhodnotí); skutečné stažení PDF změřit nejde (jen klik); události z prohlížeče lze podvrhnout (kontrola původu chrání jen proti cizím webům).

## Reklamy

Dvě verze pro Meta (Facebook, Instagram), mobil. Obě vedou na stejnou stránku a slibují jen to, co stránka ukáže. Podle pravidel Meta k 10. 10. 2026 jsou bez certifikace inzerenta spustitelné; Google Ads by vyžadoval ověření finančního inzerenta. Podrobně v [`compliance/checklist.md`](compliance/checklist.md). **[doplnit vizuály]**

## Compliance

Kontrolní seznam (zakázaná a povolená tvrzení, povinné prvky, pravidla platforem) je v [`compliance/checklist.md`](compliance/checklist.md). Právní rámec je ověřen jen obecně, řešení neprošlo právní kontrolou; před reálnou kampaní je nutná. Cookie lišta není potřeba: stránka nepoužívá cookies ani nic neukládá do prohlížeče. Při ostrém nasazení s pixely nebo analytikou by byla nutná.

## Mobil a výkon

Lighthouse na mobilu (produkční URL, 10. 10. 2026): výkon 96, přístupnost 99 (opraveno na 100 **[ověřit]**), best practices 100, SEO 100; LCP 2,3 s, CLS 0. Report: [`docs/lighthouse/`](docs/lighthouse/). Ruční průchod na reálném telefonu: **[doplnit]**.

## Jak jsem pracoval s AI

**[doplnit podrobněji]**

- **Nástroje:** Claude Code (plánování, ověřování dat, kód, nasazení), Codex (druhý názor, revize plánu a textů), LLM council (5 poradců a 5 recenzentů jako subagenti), nezávislý audit (subagent bez kontextu konverzace, jen zadání a repozitář).
- **Postup:** plán → 18 kol revize Claude a Codex do shody → ověření dat ze zdrojů s uložením důkazů → stránka → nezávislé kontroly. Každý údaj ručně zkontroloval Jan a pak ještě nezávislá druhá session Claude Code ("double check jako při lezení").
- **Kde se AI mýlila:** 10+ zaznamenaných případů v [`ai-log/chyby-ai.md`](ai-log/chyby-ai.md). Nejdůležitější: první doporučení přehlédlo, že americká ETF nemají KID; pravidlo výběru UCITS vybralo syntetický fond a pak fond neregistrovaný v ČR; datum KID z anglické verze místo české; texty slibovaly víc, než data kryla. Většinu chyb zachytila nezávislá druhá kontrola, ne první session.
- **Čas:** [`ai-log/casovy-log.md`](ai-log/casovy-log.md).
- **Záznamy konverzací:** redigované exporty v [`ai-log/`](ai-log/), metodika redakce v [`ai-log/README.md`](ai-log/README.md).

## Co chybí

- PDF z designového nástroje (teď tisk stránky do PDF z prohlížeče).
- **Odeslání odkazu na přehled e-mailem (upozornění pro kontrolu).** Teď se přehled otevře hned a e-mail se jen uloží. Audit (Codex) správně upozornil, že bez odeslání není doložené, proč e-mail ukládat (GDPR, minimalizace údajů). Pro ostrý provoz doporučuji posílat odkaz e-mailem: účel uložení je pak jasný a půjde sledovat nedoručitelné adresy (úplné ověření schránky by vyžadovalo potvrzovací klik). Vyžaduje vlastní doménu a službu na odesílání e-mailů; v demu vědomě není.
- Měření pro Meta (pixel nebo Conversions API), viz Měření.
- Potvrzení souhlasu s novinkami e-mailem (double opt-in) před prvním newsletterem.
- Hosting pro ostrou kampaň: Vercel Hobby je podle podmínek Vercelu jen pro nekomerční použití; demo běží na něm, firemní kampaň by potřebovala Vercel Pro nebo hosting zadavatele.
- Právní kontrola textů a zásad; kontakt správce údajů v zásadách (u dema zástupný text, před kampaní nutný).
- Ověření dostupnosti fondů u konkrétních brokerů.

## Technické řešení a spuštění

Next.js 16 (App Router, TypeScript, Tailwind), Vercel (Hobby, funkce v regionu `fra1`), databáze Neon Postgres (Frankfurt).

- Přehled za e-mailem: stránka `/prehled?t=<token>`; server ověří podepsaný token (HMAC, platnost 24 h, bez e-mailu uvnitř) a teprve pak pošle plná data. Stránka sama dostává jen veřejnou podmnožinu dat (`web/data/etf-verejne.json`, vyrábí ji `scripts/sync-data.mjs`), ISIN ani odkazy na KID v jejím JavaScriptu nejsou.
- Formulář: kontrola původu, honeypot, klíč idempotence, limit 5 odeslání za hodinu z jedné IP (ukládá se jen otisk IP na den).

```bash
cd web
npm install
npm run dev
```

Proměnné prostředí: `DATABASE_URL`, `DOWNLOAD_TOKEN_SECRET`, `CRON_SECRET` (viz `web/.env.example`; `CRON_SECRET` musí být i ve Vercelu, jinak denní úklid `/api/uklid` vrací 401). Ověření úklidu: `curl -H "Authorization: Bearer <CRON_SECRET>" <URL>/api/uklid` vrátí počet smazaných otisků. Tabulky: `node --env-file=<cesta k .env> scripts/migrate.mjs`.
