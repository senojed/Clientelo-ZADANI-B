# Evropské alternativy amerických ETF: konverzní landing page

Řešení zadání B (Clientelo, Junior AI Developer). Landing page pro českého drobného investora, který přijde z reklamy na mobilu: srovnání 4 amerických ETF z NYSE Arca s jejich UCITS alternativami na stejný index, výpočet rozdílu ročního poplatku a celý přehled zdarma za e-mail.

- **Stránka:** https://clientelo-zadani-b.vercel.app
- **Reklamy:** [`ads/ad-a.md`](ads/ad-a.md), [`ads/ad-b.md`](ads/ad-b.md)
- **Data a důkazy:** [`data/etf.json`](data/etf.json), [`data/overeni.md`](data/overeni.md), [`data/dukazy/`](data/dukazy/)
- **Práce s AI:** [`ai-log/`](ai-log/)

> Stav: rozpracováno (10. 10. 2026). Části označené **[doplnit]** se dopisují do odevzdání.

## Klíčové zjištění, na kterém stránka stojí

Většina amerických ETF nemá KID (dokument podle nařízení PRIIPs, bez kterého je broker v EU drobnému investorovi obvykle nenabídne). U všech 4 vybraných ETF (DIA, IVV, VOO, VT) jsme ho k 9. 10. 2026 na stránkách správců nenašli. Stránka proto neříká "kup VOO", ale ukazuje, jakou UCITS alternativu na stejný index s českým KID a registrací v ČR (seznam ČNB, 10. 10. 2026) porovnat, a otevřeně, že je dražší.

## Cílová skupina a nabídka za kontakt

**Kdo:** člověk, který slyšel "kup VOO / S&P 500" (YouTube, podcast, kamarád), hledá to u svého brokera a má na stránku pár sekund na mobilu. Věk a zdroje jsou hypotéza, podstatná je situace.

**Co dostane za e-mail:** hned po odeslání (bez čekání na e-mail) celý přehled:
- ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera,
- odkazy na české KID s datem dokumentu a informaci o registraci v ČR,
- kontrolní seznam "jak si ETF ověřit u svého brokera" (bez názvů brokerů),
- KID, PRIIPs a UCITS vysvětlené lidsky,
- tlačítko "Uložit jako PDF".

**Kdy se ptáme:** až po ukázce hodnoty. Tabulka s náklady a kalkulačka jsou veřejné, formulář je až na třetí obrazovce. Formulář má jedno povinné pole (e-mail) a nepovinný, nezaškrtnutý souhlas s novinkami.

## Pořadí sekcí a proč

Každá sekce je aspoň na výšku obrazovky mobilu (na 375×812 se vejde celá).

1. **Úvod:** nadpis "Evropské alternativy amerických ETF" navazuje na slib obou reklam; jedno tlačítko na srovnání. Návštěvník z reklamy během pár sekund pozná, že je na správném místě. Hned tu je "Marketingové sdělení, ne investiční doporučení" a riziko ztráty.
2. **Tabulka + kalkulačka:** hodnota před formulářem. Jeden řádek = jeden pár (americké ETF, UCITS alternativa, náklady obou). Klik rozbalí detail a zároveň přepne fond v kalkulačce, takže jedna akce = dvě odpovědi. Kalkulačka je předvyplněná (VOO, 100 000 Kč), výsledek je vidět bez interakce.
3. **Proč evropská alternativa + formulář:** tři krátké důvody (KID, srovnatelnost, UCITS a depozitář) pro ty, kdo váhají, hned nad formulářem. Po odeslání se na stejném místě ukáže přehled, žádná nová stránka.
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

1. **Výzva k přehledu přímo v rozbaleném řádku tabulky** ("Pošli mi ISIN a KID k tomuto fondu") zvýší konverzi oproti formuláři jen na třetí obrazovce. Proč: ptáme se v okamžiku největšího zájmu, u konkrétního fondu. Metrika: návštěva → lead. Riziko: dřívější výzva může působit dotěrně.
2. **Nadpis úvodu přizpůsobený reklamě** (podle `utm_content`; u reklamy A otázka "Znáš VOO?", u B "4 ETF na jednom místě") sníží okamžité odchody oproti jednomu společnému nadpisu. Metrika: návštěva → zobrazení srovnání, návštěva → lead.
3. **Pojmenování nabídky:** "Kontrolní seznam: jak si ETF ověřit u brokera" místo "Celý přehled zdarma". Proč: konkrétní užitek místo obecného "přehledu". Metrika: zobrazení formuláře → lead.

Při malém provozu by test trval dlouho; u dema je to návrh, ne spuštěný test.

## Měření celé cesty

Vlastní měření bez cookies a bez analytiky třetích stran. Prohlížeč posílá události na `/api/events` (allowlist názvů, kontrola původu a délek), odeslání formuláře zapisuje server (`lead_created` je konverze, idempotentní klíč brání dvojímu započtení).

Události: `page_view` (s UTM a variantou reklamy), `section_view` (srovnání, formulář), `row_expand`, `interaction_used`, `cta_click`, `form_start`, `form_submit_attempt`, `lead_created`, `pdf_requested`, `pdf_download_clicked`.

Reklamu A a B rozliší `utm_content=ad_a` / `ad_b` (uloží se jako varianta). Trychtýř podle varianty: [`web/db/funnel.sql`](web/db/funnel.sql).

Omezení: relace žije jen v paměti stránky, po obnovení stránky vznikne nová; skutečné stažení PDF změřit nejde (jen klik).

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
- Skutečné odesílání e-mailů (přehled se ukáže hned, e-mail se jen uloží).
- Rate limit na API (je kontrola původu, honeypot a idempotence).
- Právní kontrola textů a zásad.
- Ověření dostupnosti fondů u konkrétních brokerů.

## Technické řešení a spuštění

Next.js 16 (App Router, TypeScript, Tailwind), Vercel (Hobby), databáze Neon Postgres (Frankfurt). Přehled za e-mailem chrání podepsaný token platný 24 h (HMAC, bez e-mailu uvnitř).

```bash
cd web
npm install
npm run dev
```

Proměnné prostředí: `DATABASE_URL`, `DOWNLOAD_TOKEN_SECRET` (viz `.env.example`). Tabulky: `node --env-file=<cesta k .env> scripts/migrate.mjs`.
