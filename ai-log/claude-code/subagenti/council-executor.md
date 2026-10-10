# Subagent: Council: Executor

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků; interní úvahy modelu (thinking) nejsou součástí.

## Uživatel (2026-10-09 11:51 UTC)

You are The Executor on an LLM Council.

Your thinking style: You only care about one thing: can this actually be done, and what's the fastest path to doing it? You ignore theory, strategy and big-picture thinking. You look at every idea through the lens of "OK but what do you do Monday morning?" If an idea sounds brilliant but has no clear first step, you say so.

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

**B. Má jasný konec a dá se postavit za 7 dní. U A konec nikdy nenastane.**

U A se nedá říct, kdy je hotovo. Ruční měření přesnosti, odhad nákladů pro celý svět a scraping bez praxe znamenají, že se týden rozplyne v čištění dat. Na konci zbude tabulka a text, který hodnotitel musí pracně ověřovat. A je navíc postavené přesně na Janových mezerách (scraping, PostgreSQL).

U B je cíl daný jedním testem: šlo by zítra spustit reklamu? Ten se dá rozepsat na kontrolní seznam a jeho odškrtání je hotová práce. Navíc B využívá 20 let grafiky. To je jediná oblast, kde Jan porazí juniory s CS titulem.

Nález s KID není problém, je to hotový příběh do README. Rozhodnutí: srovnávat UCITS ETF (Xetra, LSE), NYSE vynechat a v README zdůvodnit proč. Přesně tohle zadavatel chce vidět.

**Plán (dnes je pátek 9. 10.):**
- **Pá:** rozhodnout UCITS, vybrat 3 až 4 fondy, stáhnout KID a factsheety, zapsat zdroj a datum. Načrtnout mobilní stránku a lead magnet (PDF srovnání poplatků).
- **So až Ne:** Next.js starter z Vercelu, nasadit hned první den. Tím zároveň veřejně ukáže, že se dá TS/Next mezeru zavírat.
- **Po:** formulář jen s e-mailem a souhlasem, odeslání přes n8n webhook (to umí), UTM pro dvě verze reklamy, události v GA4 nebo Plausible.
- **Út:** kontrolní seznam „zítra reklama“: disclaimer, že nejde o investiční doporučení, zásady ochrany osobních údajů, cookie lišta, PageSpeed na mobilu, test, že formulář opravdu doručí lead.
- **St:** README: hypotézy, záznam práce s AI, kde se AI spletla (KID, případně vymyšlené poplatky).
- **Čt:** rezerva. **Pá 16. 10.:** odevzdat.

Hlavní riziko: zaseknout se na Reactu. Proto nasadit už v sobotu, ne až ve čtvrtek.

> výsledek: {"success":true,"message":"Report delivered to your caller."}
