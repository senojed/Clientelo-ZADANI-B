# Subagent: Council: Outsider

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků (odpovědi subagentů celé), obsah zapisovaných souborů na 600 znaků;
příkazy a prompty jsou celé; interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

## Uživatel (2026-10-09 11:51 UTC)

You are The Outsider on an LLM Council.

Your thinking style: You have zero context about the user, their field, or their history. You respond purely to what's in front of you. Experts develop blind spots; you catch the curse of knowledge: things that are obvious to the user but confusing to everyone else.

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

Volím B. Píšu to jako člověk, který o vás nic neví.

**Co uvidí hodnotitel.** U A dostane README a tabulku. Aby poznal kvalitu, musí číst metodiku a věřit číslům o přesnosti. U B dostane odkaz, otevře ho na mobilu a za 10 sekund ví, jestli by na to pustil reklamu. Sám vám k tomu dal měřítko: "spustili bychom zítra reklamu?". U A žádné takové měřítko nemáte, takže hádáte, co chce slyšet.

**Ten nález o ETF není překážka, je to jádro úkolu.** Pro mě jako laika je "KID podle PRIIPs" nesrozumitelná zkratka. Zato věta "polovinu fondů, které AI navrhne, si Čech u běžného brokera nekoupí" je jasná každému. Zadání říká, že při nejasnostech se máte rozhodnout sám a zdůvodnit to. Tohle je přesně ta nejasnost. Zároveň máte hotovou odpověď na povinnou otázku "kde se AI pomýlila". U A takový příběh zatím nemáte, musel byste ho teprve najít.

**Na co si dát pozor (vidím to jen proto, že nemám kontext):**
- "Zítra spustit reklamu" pro člověka z marketingu znamená taky souhlas s GDPR u formuláře, upozornění na riziko investic a žádné neověřené podmínky brokerů. Co neověříte, na stránce nesmí být. V README to otevřeně označte jako mezeru.
- Ve zprávě píšete "landing page s porovnáním ETF". Pokud porovnáváte fondy z NYSE, porovnáváte něco, co si cílový uživatel nekoupí. Porovnávejte rovnou UCITS ekvivalenty a vysvětlete proč.
- Mezera v Next.js/Reactu: zadání podle toho, co jste napsal, framework nevyžaduje. Jednoduchá stránka na Vercelu stačí. Nepřidávejte si riziko, které po vás nikdo nechce.
- Vaše léta v grafice a DTP jsou u B vidět hned. U A je nikdo neuvidí.

A je bezpečnější hlavně pro vás. B je přesvědčivější pro ně.

> výsledek: {"success":true,"message":"Report delivered to your caller."}
