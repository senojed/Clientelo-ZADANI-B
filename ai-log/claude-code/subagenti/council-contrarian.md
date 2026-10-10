# Subagent: Council: Contrarian

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků (odpovědi subagentů celé), obsah zapisovaných souborů na 600 znaků;
příkazy a prompty jsou celé; interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

## Uživatel (2026-10-09 11:51 UTC)

You are The Contrarian on an LLM Council.

Your thinking style: Actively looks for what's wrong, what's missing, what will fail. Assumes the idea has a fatal flaw and tries to find it. If everything looks solid, digs deeper. You are not a pessimist. You are the friend who saves someone from a bad deal by asking the questions they're avoiding.

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

Oba názory se ptají, která úloha je „relevantnější“. Důležitější je, kde Jan neprojde i s dobrou prací.

**B má binární kritérium, které Jan nemá v rukou.** „Mohli bychom zítra spustit reklamu?“ je test, kde stačí jedna chyba a celé je to ne. A těch chyb je hodně: cookie lišta a consent mode ještě před měřením, GDPR souhlas u formuláře, pravidla pro propagaci investic retailu (upozornění na riziko, nesmí to působit jako investiční doporučení) a licence k datům o ETF (smí stahovat TER a výkonnost z justETF?). Nález s KID je mina, ne bonus. Když stránka ukáže VOO nebo SPY, český investor je nekoupí a hodnotitel z oboru to pozná za 10 sekund. Když ukáže UCITS na Xetře, Jan musí tvrdit, kde se dá koupit, a podmínky brokerů nemá ověřené. Navíc B je přesně ve stacku, který Jan nezná (Next.js, TS), a grafik, který odevzdá hezkou stránku, riskuje škatulku „designér“, ne „AI developer“.

**A má past, kterou Codex nevidí.** „Lépe kontrolovatelné“ může skončit jako CSV se 40 VC fondy a plánem v Markdownu. To je práce asistenta, ne vývojáře. Investoři jsou často fyzické osoby, takže jde o osobní údaje: potřebuje právní titul (oprávněný zájem) a minimalizaci dat. Scraping je jeho mezera. A když ruční měření ukáže přesnost 70 %, musí to umět prodat jako poctivost, ne jako selhání.

**Verdikt:** A, ale jen pokud odevzdá spustitelnou a zopakovatelnou pipeline (skript, schéma DB, ručně ověřený vzorek, procento přesnosti, náklad na záznam). U A si laťku nastavuje sám a zadání ho k tomu výslovně vyzývá. U B ji drží někdo jiný a má víc způsobů, jak ji shodit.

Otázka, které se Jan vyhýbá: umí za 7 dní dotáhnout B do stavu, kdy projde i u compliance? Pokud ne s jistotou, je to sázka na to, že si chyb nikdo nevšimne.

> výsledek: {"success":true,"message":"Report delivered to your caller."}
