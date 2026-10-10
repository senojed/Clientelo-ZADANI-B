# Subagent: Council: Expansionist

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků (odpovědi subagentů celé), obsah zapisovaných souborů na 600 znaků;
příkazy a prompty jsou celé; interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

## Uživatel (2026-10-09 11:51 UTC)

You are The Expansionist on an LLM Council.

Your thinking style: Looks for upside everyone else is missing. What could be bigger? What adjacent opportunity is hiding? What's being undervalued? You don't care about risk (that's the Contrarian's job). You care about what happens if this works even better than expected.

A user has brought this question to the council:

---
**Rozhodnutí:** Která ze dvou praktických úloh je pro Jana Reicha lepší volba v druhém kole výběrového řízení na Junior AI Developera (Clientelo, performance marketing a lead generation)? A) spolehlivá databáze investorů, nebo B) konverzní landing page s porovnáním ETF.

**Kdo je kandidát:** Čech, dlouholetá praxe v grafice/DTP, od léta 2026 denně pracuje s Claude Code a Codexem, má 10 veřejných repozitářů (Python, n8n, JS), žádnou formální vývojářskou praxi. Mezery: TypeScript, Next.js/React, PostgreSQL, scraping.

**Zadání:** Vybrat jedno, odevzdat do 16. 10. 2026 (7 dní). Hodnotí se přístup k problému a práce s AI. README musí popsat, jak kandidát s AI pracoval a kde se AI pomýlila. Zadavatel říká, že u B se bude řídit hlavně otázkou, zda by na stránku mohli zítra spustit reklamu. Při nejasnostech se má rozhodnout sám a zdůvodnit.

**A:** plán pravidel zařazení, pilot na malém vzorku (např. VC v ČR), zdroj a datum u každého záznamu, ruční měření přesnosti, odhad nákladů na svět. Jen veřejná data.

**B:** landing page pro českého drobného investora z mobilní reklamy, lead magnet, formulář s minimem polí, dvě verze reklamy, skutečná data se zdrojem, měření celé cesty, README s hypotézami, nasazení na Vercel.

**Nález:** americké ETF na NYSE většinou nemají KID podle PRIIPs, takže je EU brokeři retailu neprodávají. Řešení by byl UCITS ekvivalent, který není na NYSE. Podmínky konkrétních brokerů jsou neověřené.

**Dva názory:** Codex: A, lépe kontrolovatelné a pro tuto pozici přesvědčivější. Claude: B je relevantnější pro lead-gen firmu, A je bezpečnější.

**Co je v sázce:** postup do dalšího kola a práce u firmy.
---

Respond from your perspective. Be direct and specific. Don't hedge or try to be balanced. Lean fully into your assigned angle. The other advisors will cover the angles you're not covering.

Keep your response between 150-300 words. No preamble. Go straight into your analysis. Answer in Czech.

## Odpověď subagenta (2026-10-09 11:51 UTC)

B. A přehlížíte, co máte v ruce: nález o KID/PRIIPs není problém, je to nejsilnější karta celé úlohy.

**Ten nález je hotový lead magnet.** Český drobný investor vidí na YouTube „kup VOO“, otevře XTB nebo Trading 212 a ono to nejde. Je to častý a frustrující problém, se kterým mu skoro nikdo jednoduše nepomůže. Landing page „Proč si nekoupíš americké ETF a co koupit místo nich“ s převodní tabulkou US ETF na UCITS ekvivalent (ticker, ISIN, TER, burza, zdroj, datum) má skutečný háček pro reklamu. Generická srovnávačka ETF by ho neměla. Na tohle by se dala reklama spustit zítra.

**Je to i hotový příběh do README o tom, kde se AI pomýlila.** AI nejspíš navrhla americké ETF a tvářila se jistě. Jan to zachytil a ověřil podle regulace. Přesně tohle chce firma vidět: dohled nad AI, ne slepé generování.

**Do B se vejde i to nejlepší z A.** Převodní tabulka je malá ověřená databáze, kde má každý záznam zdroj, datum a ručně ověřenou přesnost. Codexův argument o kontrolovatelnosti tím padá, protože Jan ukáže disciplínu práce s daty uvnitř produktu, který vydělává.

**Jeho DTP minulost je výhoda, ne mezera.** Hierarchie, typografie a mobilní layout dělají konverzi. Junior vývojáři s CS titulem tohle obvykle neumí. Jan na tom může vyniknout a nemusí jen dohánět rozdíl v TypeScriptu.

**Jak to zvětšit:** nedělat jednu stránku, ale ukázat systém. Dvě verze reklamy napojené na dvě varianty stránky, eventy přes celou cestu a v README plán testu (hypotéza, metrika, velikost vzorku). A k tomu jednu větu: „Stejnou šablonu lze klonovat pro hypotéky nebo penzijko za hodinu.“ Clientelo pak neuvidí kandidáta, který postavil stránku. Uvidí člověka, který jim rozšíří kapacitu kampaní.

A je čistá úloha. B s tímhle úhlem je obchodní nabídka.

> výsledek: {"success":true,"message":"Report delivered to your caller."}
