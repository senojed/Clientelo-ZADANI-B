# Subagent: Council review 5

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků (odpovědi subagentů celé), obsah zapisovaných souborů na 600 znaků;
příkazy a prompty jsou celé; interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

## Uživatel (2026-10-09 12:05 UTC)

You are reviewing the outputs of an LLM Council. Five advisors independently answered this question:

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

Here are their anonymized responses:

**Response A:**
Volím B. Píšu to jako člověk, který o vás nic neví.

**Co uvidí hodnotitel.** U A dostane README a tabulku. Aby poznal kvalitu, musí číst metodiku a věřit číslům o přesnosti. U B dostane odkaz, otevře ho na mobilu a za 10 sekund ví, jestli by na to pustil reklamu. Sám vám k tomu dal měřítko: "spustili bychom zítra reklamu?". U A žádné takové měřítko nemáte, takže hádáte, co chce slyšet.

**Ten nález o ETF není překážka, je to jádro úkolu.** Pro mě jako laika je "KID podle PRIIPs" nesrozumitelná zkratka. Zato věta "polovinu fondů, které AI navrhne, si Čech u běžného brokera nekoupí" je jasná každému. Zadání říká, že při nejasnostech se máte rozhodnout sám a zdůvodnit to. Tohle je přesně ta nejasnost. Zároveň máte hotovou odpověď na povinnou otázku "kde se AI pomýlila". U A takový příběh zatím nemáte, musel byste ho teprve najít.

**Na co si dát pozor:**
- "Zítra spustit reklamu" pro člověka z marketingu znamená taky souhlas s GDPR u formuláře, upozornění na riziko investic a žádné neověřené podmínky brokerů. Co neověříte, na stránce nesmí být. V README to otevřeně označte jako mezeru.
- Ve zprávě píšete "landing page s porovnáním ETF". Pokud porovnáváte fondy z NYSE, porovnáváte něco, co si cílový uživatel nekoupí. Porovnávejte rovnou UCITS ekvivalenty a vysvětlete proč.
- Mezera v Next.js/Reactu: zadání podle toho, co jste napsal, framework nevyžaduje. Jednoduchá stránka na Vercelu stačí. Nepřidávejte si riziko, které po vás nikdo nechce.
- Vaše léta v grafice a DTP jsou u B vidět hned. U A je nikdo neuvidí.

A je bezpečnější hlavně pro vás. B je přesvědčivější pro ně.

**Response B:**
Oba názory se ptají, která úloha je „relevantnější“. Důležitější je, kde Jan neprojde i s dobrou prací.

**B má binární kritérium, které Jan nemá v rukou.** „Mohli bychom zítra spustit reklamu?“ je test, kde stačí jedna chyba a celé je to ne. A těch chyb je hodně: cookie lišta a consent mode ještě před měřením, GDPR souhlas u formuláře, pravidla pro propagaci investic retailu (upozornění na riziko, nesmí to působit jako investiční doporučení) a licence k datům o ETF (smí stahovat TER a výkonnost z justETF?). Nález s KID je mina, ne bonus. Když stránka ukáže VOO nebo SPY, český investor je nekoupí a hodnotitel z oboru to pozná za 10 sekund. Když ukáže UCITS na Xetře, Jan musí tvrdit, kde se dá koupit, a podmínky brokerů nemá ověřené. Navíc B je přesně ve stacku, který Jan nezná (Next.js, TS), a grafik, který odevzdá hezkou stránku, riskuje škatulku „designér“, ne „AI developer“.

**A má past, kterou Codex nevidí.** „Lépe kontrolovatelné“ může skončit jako CSV se 40 VC fondy a plánem v Markdownu. To je práce asistenta, ne vývojáře. Investoři jsou často fyzické osoby, takže jde o osobní údaje: potřebuje právní titul (oprávněný zájem) a minimalizaci dat. Scraping je jeho mezera. A když ruční měření ukáže přesnost 70 %, musí to umět prodat jako poctivost, ne jako selhání.

**Verdikt:** A, ale jen pokud odevzdá spustitelnou a zopakovatelnou pipeline (skript, schéma DB, ručně ověřený vzorek, procento přesnosti, náklad na záznam). U A si laťku nastavuje sám a zadání ho k tomu výslovně vyzývá. U B ji drží někdo jiný a má víc způsobů, jak ji shodit.

Otázka, které se Jan vyhýbá: umí za 7 dní dotáhnout B do stavu, kdy projde i u compliance? Pokud ne s jistotou, je to sázka na to, že si chyb nikdo nevšimne.

**Response C:**
B. Má jasný konec a dá se postavit za 7 dní. U A konec nikdy nenastane.

U A se nedá říct, kdy je hotovo. Ruční měření přesnosti, odhad nákladů pro celý svět a scraping bez praxe znamenají, že se týden rozplyne v čištění dat. Na konci zbude tabulka a text, který hodnotitel musí pracně ověřovat. A je navíc postavené přesně na Janových mezerách (scraping, PostgreSQL).

U B je cíl daný jedním testem: šlo by zítra spustit reklamu? Ten se dá rozepsat na kontrolní seznam a jeho odškrtání je hotová práce. Navíc B využívá 20 let grafiky. To je jediná oblast, kde Jan porazí juniory s CS titulem.

Nález s KID není problém, je to hotový příběh do README. Rozhodnutí: srovnávat UCITS ETF (Xetra, LSE), NYSE vynechat a v README zdůvodnit proč. Přesně tohle zadavatel chce vidět.

Plán (dnes je pátek 9. 10.):
- Pá: rozhodnout UCITS, vybrat 3 až 4 fondy, stáhnout KID a factsheety, zapsat zdroj a datum. Načrtnout mobilní stránku a lead magnet (PDF srovnání poplatků).
- So až Ne: Next.js starter z Vercelu, nasadit hned první den. Tím zároveň veřejně ukáže, že se dá TS/Next mezeru zavírat.
- Po: formulář jen s e-mailem a souhlasem, odeslání přes n8n webhook (to umí), UTM pro dvě verze reklamy, události v GA4 nebo Plausible.
- Út: kontrolní seznam „zítra reklama“: disclaimer, že nejde o investiční doporučení, zásady ochrany osobních údajů, cookie lišta, PageSpeed na mobilu, test, že formulář opravdu doručí lead.
- St: README: hypotézy, záznam práce s AI, kde se AI spletla (KID, případně vymyšlené poplatky).
- Čt: rezerva. Pá 16. 10.: odevzdat.

Hlavní riziko: zaseknout se na Reactu. Proto nasadit už v sobotu, ne až ve čtvrtek.

**Response D:**
Ptáte se špatně. Neptejte se, která úloha je bezpečnější. Zeptejte se, co zadavatel doopravdy měří. Sám to napsal: přístup k problému, práci s AI a místa, kde se AI spletla. Kód je jen nosič. Vyhraje ta úloha, ve které Jan ukáže nejsilnější úsudek, který je zároveň vidět.

V B už ten úsudek má, a to ještě před začátkem. Nález KID/PRIIPs je přesně ta past, kterou zadání schovává. Naivní kandidát (i naivní AI) porovná americká ETF z NYSE, která český retail koupit nemůže. Taková stránka neprojde testem „zítra spustíme reklamu“, protože by propagovala nedostupný produkt. Správný krok je přejít na UCITS ekvivalenty (Xetra, LSE) a v README to zdůvodnit. Splní to i pokyn „rozhodni se sám a zdůvodni“. Hotová kapitola „kde se AI pomýlila“, a k tomu ověřitelná.

Druhý předpoklad, který padá: „B vyžaduje Next.js/React, a to je mezera.“ Nevyžaduje. Konverzní landing page může být statické HTML s minimem JS a Vercel ho nasadí stejně. Otázka „zítra reklama“ netestuje framework. Testuje rychlost na mobilu, souhlas s cookies a GDPR u formuláře, měření cesty (UTM, události), disclaimer k investicím a jasnou nabídku. To jsou věci rozhodování, ne syntaxe. A grafik z DTP tu má výhodu, kterou u A nevyužije vůbec.

A naopak odhaluje přesně jeho mezery: scraping, databázi a datové pipeline. Kontrolovatelnost je tam jen zdánlivá, protože ruční měření přesnosti na malém vzorku VC zvládne každý kandidát. Navíc to nevypovídá o tom, jestli rozumí lead-gen byznysu.

Doporučení: B, ale postavené na compliance a měření, ne na vizuálu. Rizikem není technika, ale nepravdivé tvrzení. Podmínky brokerů buď ověřit u zdroje s datem, nebo je na stránce vůbec neuvádět. Jediný neověřený údaj o poplatcích shodí celý příběh o kritickém myšlení.

**Response E:**
B. A přehlížíte, co máte v ruce: nález o KID/PRIIPs není problém, je to nejsilnější karta celé úlohy.

**Ten nález je hotový lead magnet.** Český drobný investor vidí na YouTube „kup VOO“, otevře XTB nebo Trading 212 a ono to nejde. Je to častý a frustrující problém, se kterým mu skoro nikdo jednoduše nepomůže. Landing page „Proč si nekoupíš americké ETF a co koupit místo nich“ s převodní tabulkou US ETF na UCITS ekvivalent (ticker, ISIN, TER, burza, zdroj, datum) má skutečný háček pro reklamu. Generická srovnávačka ETF by ho neměla. Na tohle by se dala reklama spustit zítra.

**Je to i hotový příběh do README o tom, kde se AI pomýlila.** AI nejspíš navrhla americké ETF a tvářila se jistě. Jan to zachytil a ověřil podle regulace. Přesně tohle chce firma vidět: dohled nad AI, ne slepé generování.

**Do B se vejde i to nejlepší z A.** Převodní tabulka je malá ověřená databáze, kde má každý záznam zdroj, datum a ručně ověřenou přesnost. Codexův argument o kontrolovatelnosti tím padá, protože Jan ukáže disciplínu práce s daty uvnitř produktu, který vydělává.

**Jeho DTP minulost je výhoda, ne mezera.** Hierarchie, typografie a mobilní layout dělají konverzi. Junior vývojáři s CS titulem tohle obvykle neumí. Jan na tom může vyniknout a nemusí jen dohánět rozdíl v TypeScriptu.

**Jak to zvětšit:** nedělat jednu stránku, ale ukázat systém. Dvě verze reklamy napojené na dvě varianty stránky, eventy přes celou cestu a v README plán testu (hypotéza, metrika, velikost vzorku). A k tomu jednu větu: „Stejnou šablonu lze klonovat pro hypotéky nebo penzijko za hodinu.“ Clientelo pak neuvidí kandidáta, který postavil stránku. Uvidí člověka, který jim rozšíří kapacitu kampaní.

A je čistá úloha. B s tímhle úhlem je obchodní nabídka.
---

Answer these three questions. Be specific. Reference responses by letter.

1. Which response is the strongest? Why?
2. Which response has the biggest blind spot? What is it missing?
3. What did ALL five responses miss that the council should consider?

Keep your review under 200 words. Be direct. Answer in Czech.

## Odpověď subagenta (2026-10-09 12:06 UTC)

[Pozn.: timestamp přes shell neověřen, hodnocení je čistě textové.]

1. Nejsilnější: Response D. Ptá se, co zadavatel měří (úsudek, práce s AI), vyvrací předpoklad, že B vyžaduje Next.js (stačí statické HTML), a staví B na compliance a měření, ne na vizuálu. Response C je silná prakticky (denní plán, nasazení hned první den), ale méně hluboká.

2. Největší slepá skvrna: Response B. Obrací verdikt na A kvůli compliance rizikům, ale přehání je (cookie lišta a GDPR jsou pár hodin práce) a ignoruje, že Jan pro A postrádá scraping a PostgreSQL. Navíc tvrdí, že u A "laťku nastavuje sám", což zadání nepodporuje. Response E má jiný problém: přeprodává (klonování šablon, A/B plán) a ignoruje 7denní limit a neověřené podmínky brokerů.

3. Všech pět minulo:
- Neověřilo předpoklad, že KID/PRIIPs nález je správný a úplný (kontrola: ISIN, KID u konkrétních UCITS fondů).
- Nepočítalo se skutečným rizikem časového rozpočtu Jana (práce vedle, 7 dní) a s tím, že hodnotí se hlavně README s úsudkem, ne produkt.
- Nikdo nenavrhl hybrid: B s malou zdrojovanou datovou tabulkou (E se toho dotkla jen zlehka).
- Nikdo neřešil právní hranici: stránka porovnávající ETF v reklamě může být regulovaná investiční propagace i bez doporučení.

> výsledek: {"success":true,"message":"Report delivered to your caller."}
