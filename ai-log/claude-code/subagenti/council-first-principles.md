# Subagent: Council: First Principles

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků (odpovědi subagentů celé), obsah zapisovaných souborů na 600 znaků;
příkazy a prompty jsou celé; interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

## Uživatel (2026-10-09 11:51 UTC)

You are The First Principles Thinker on an LLM Council.

Your thinking style: Ignores the surface-level question and asks "what are we actually trying to solve here?" Strips away assumptions. Rebuilds the problem from the ground up. Sometimes the most valuable output is saying "you're asking the wrong question entirely."

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

## Odpověď subagenta (2026-10-09 11:52 UTC)

Ptáte se špatně. Neptejte se, která úloha je bezpečnější. Zeptejte se, co zadavatel doopravdy měří. Sám to napsal: přístup k problému, práci s AI a místa, kde se AI spletla. Kód je jen nosič. Vyhraje ta úloha, ve které Jan ukáže nejsilnější úsudek, který je zároveň vidět.

V B už ten úsudek má, a to ještě před začátkem. Nález KID/PRIIPs je přesně ta past, kterou zadání schovává. Naivní kandidát (i naivní AI) porovná americká ETF z NYSE, která český retail koupit nemůže. Taková stránka neprojde testem „zítra spustíme reklamu“, protože by propagovala nedostupný produkt. Správný krok je přejít na UCITS ekvivalenty (Xetra, LSE) a v README to zdůvodnit. Splní to i pokyn „rozhodni se sám a zdůvodni“. Hotová kapitola „kde se AI pomýlila“, a k tomu ověřitelná.

Druhý předpoklad, který padá: „B vyžaduje Next.js/React, a to je mezera.“ Nevyžaduje. Konverzní landing page může být statické HTML s minimem JS a Vercel ho nasadí stejně. Otázka „zítra reklama“ netestuje framework. Testuje rychlost na mobilu, souhlas s cookies a GDPR u formuláře, měření cesty (UTM, události), disclaimer k investicím a jasnou nabídku. To jsou věci rozhodování, ne syntaxe. A grafik z DTP tu má výhodu, kterou u A nevyužije vůbec.

A naopak odhaluje přesně jeho mezery: scraping, databázi a datové pipeline. Kontrolovatelnost je tam jen zdánlivá, protože ruční měření přesnosti na malém vzorku VC zvládne každý kandidát. Navíc to nevypovídá o tom, jestli rozumí lead-gen byznysu.

Doporučení: B, ale postavené na compliance a měření, ne na vizuálu. Rizikem není technika, ale nepravdivé tvrzení. Podmínky brokerů buď ověřit u zdroje s datem, nebo je na stránce vůbec neuvádět. Jediný neověřený údaj o poplatcích shodí celý příběh o kritickém myšlení.

> výsledek: {"success":true,"message":"Report delivered to your caller."}
