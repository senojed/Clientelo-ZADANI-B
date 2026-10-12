# Claude Code: výběr zadání (9. 10. 2026, první část)

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků (odpovědi subagentů celé), obsah zapisovaných souborů na 600 znaků;
příkazy a prompty jsou celé; interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

## Uživatel (2026-10-09 11:01 UTC)

Jsem ve vyberovem rizeni na Junior AI developer a dostal jsem dve zadani a mam si vybrat porad:

<pasted_content id="1e9a">
Dobrý deň, pán Reich,

ďakujem za Vašu prihlášku na pozíciu Junior AI Developer. Rád Vám oznamujem, že postupujete do ďalšieho kola výberového konania. Jeho súčasťou je praktická úloha, ktorá nám ukáže, ako pristupujete k problému a ako pracujete s AI. Pripravil som dve zadania, vyberte si jedno z nich.

Pracovať môžete v Claude Code alebo v podobnom nástroji. Ak nestihnete všetko, uprednostnite podstatné časti a uveďte, čo v riešení chýba. V README prosím popíšte, ako ste s AI pracovali (aké pokyny dostali agenti, ako ste kontrolovali ich výstup a kde sa pomýlili). Ak Vám v zadaní niečo nebude jasné, rozhodnite podľa seba a v README zdôvodnite, prečo ste sa tak rozhodli. S otázkami sa na mňa môžete kedykoľvek obrátiť aj odpoveďou na tento e-mail.


ZADANIE A: Spoľahlivá databáza investorov

Úloha sa týka databázy investorov do firiem: VC fondov, private equity, family office, angel investorov a veľkých súkromných investorov. Kľúčová je spoľahlivosť dát: každý záznam musí byť skutočný investor, nie náhodná firma. Pri každom investorovi musí byť uvedené, v akom sektore pôsobí, do čoho bežne investuje a v akej výške, aký má celkový investičný kapitál a odkiaľ tieto informácie pochádzajú.

Začnite plánom. Z neho musí byť jasné, kto v databáze bude a kto nie, teda podľa akých pravidiel subjekt zaradíte alebo vyradíte. Popíšte tiež, ako overíte pravosť a správne zaradenie záznamov. Odhadnite, aký okruh investorov je možné z verejných zdrojov získať, približne koľko ich bude a aká bude spoľahlivosť dát. Uveďte, z čoho odhad vychádza.

Plán následne overte na menšej vzorke, napríklad na VC fondoch v jednej krajine. Pri každom zázname uveďte zdroj a dátum, ktoré dokladajú, že subjekt skutočne investuje. Na ručne overenej vzorke zmerajte presnosť. Na záver odhadnite náklady na rozšírenie na celý svet.

Používajte výhradne verejne dostupné dáta.


ZADANIE B: Konverzná landing page

Cieľom je landing page s porovnaním ETF obchodovaných na NYSE pre českého drobného investora, ktorý prichádza z reklamy na mobile a stránke venuje len niekoľko sekúnd. Stránka má fungovať ako lead magnet: ponúknuť návštevníkovi hodnotu a výmenou za ňu získať jeho kontakt. Pekný dizajn nestačí, stránka musí byť optimalizovaná na prínos kontaktov. Zároveň nesmie pôsobiť ako základný výstup od Claude. Dizajn aj texty majú byť premyslené pre túto cieľovú skupinu. Pri hodnotení sa budem riadiť hlavne otázkou, či by sme na ňu mohli zajtra spustiť reklamu.

Určte cieľovú skupinu, čo návštevník dostane výmenou za kontakt a v ktorom momente oň požiadate. Hodnota by mala byť zrejmá ešte pred vyplnením formulára. Navrhnite aj dve verzie reklamy. Prvá obrazovka stránky by mala nadväzovať na prísľub reklamy a okamžite komunikovať, čo návštevník získa.

Výber interaktívnych prvkov, napríklad porovnania fondov, kalkulačky poplatkov alebo skladania portfólia, nechávam na Vás. Každý z nich by mal viesť ku kontaktu. Formulár by mal mať čo najmenej polí. Premyslite aj to, čo návštevník dostane po jeho odoslaní.

Použite skutočné dáta s uvedením zdroja a merajte celú cestu od príchodu po odoslanie formulára. V README zdôvodnite poradie sekcií, uveďte očakávanú konverziu a tri hypotézy na A/B test zoradené podľa očakávaného dopadu. Stránku nasaďte na bezplatný hosting, napríklad Vercel.


Riešenie prosím zašlite do 16. 10. 2026 ako odpoveď na tento e-mail. Priložte odkaz na verejný repozitár na GitHube a pri zadaní B aj URL stránky. V repozitári by mal byť výsledok (pri zadaní A plán, dáta zo vzorky so zdrojom pri každom údaji a výsledok merania presnosti, pri zadaní B obe verzie reklamy), kód s priebežnou históriou commitov a v priečinku ai-log export konverzácií s Claude Code (príkaz /export).
</pasted_content id="1e9a">

**Nástroj PowerShell:** [redacted přístup k osobní wiki nebo paměti]

> výsledek: [redacted obsah osobní wiki nebo paměti]

**Nástroj PowerShell:** [redacted přístup k osobní wiki nebo paměti]

> výsledek: [redacted obsah osobní wiki nebo paměti]

## Claude (2026-10-09 11:02 UTC)

[13:01, 9.10.] Doporučení: **Zadání B** (landing page). Důvody jsou níž. Zadání A je ale podle mě lepší, pokud chcete ukázat rozsah práce, a to je zásadní kompromis.

**Co wiki obsahuje:** přihláška na Clientelo je rozpracovaná (`prihlaska clientelo`). Inzerát je od performance marketingové firmy: lead generation, landing pages, weby, scraping a AI knowledge base. Mezery podle wiki: TypeScript, Next.js/React, PostgreSQL, scraping. Máte rádi plán před kódem a revizi druhým agentem (plan-consensus). Pravidlo "žádné placené API, jen CLI" platí i tady. Do toho zapadá poučení z MyMiniFactory: nejdřív ověřit klíčový předpoklad a teprve potom stavět.

**Proč B:**
- Firma dělá lead generation a reklamy. Landing page je přesně jejich denní chleba. Hodnotitel se ptá "mohli bychom zítra pustit reklamu?", takže ocení konkrétní, hmatatelný výsledek.
- Zahrnuje to dvě vaše mezery: Next.js/TypeScript (Vercel) a měření celé cesty. Můžete ukázat, že se to učíte.
- Cíl je jasný a ověřitelný: nasazená URL, dvě reklamy, měření, README s hypotézami. Dá se to stihnout a dotáhnout.
- Hrozí jediná věc: "nesmí pôsobiť ako základný výstup od Claude". Dá se to pokrýt tím, že texty a pořadí sekcí postavíte na rozhodnutích, která zdůvodníte v README.

**Proč A je rizikovější:**
- Je to hlavně práce s daty a metodikou. Spolehlivost "skutečný investor" ruční ověření na vzorku je pracná a těžko se dělá bez placených zdrojů. "Výhradně veřejná data" znamená spoustu ručního scrapingu a ověřování.
- Měření přesnosti a odhad nákladů na celý svět jsou analytické úkoly. Termín 16. 10. je za týden a kus času vám sežere samotné ověřování.
- Je lepší, pokud chcete ukázat scraping a práci s daty. Je ale víc nejisté, co z toho vznikne.

**Za A by mluvilo:** kdybyste chtěl zaplnit mezeru scraping/databáze. Z hlediska přihlášky ale Clientelo víc oceňuje to, co dodáte jako hotový výrobek.

**Dvě věci k ověření před startem:**
1. Mám mít pro B "skutečná data o ETF" z veřejného zdroje (např. justETF, stránky správců fondů)? Kvůli licenci dat si zdroj vyberte opatrně.
2. Termín je 16. 10., zbývá 7 dní. Pokud B vezmete, začal bych plánem a brainstormem (jak vám vyhovuje), a teprve potom kódem.

Chcete B? Pak spustím brainstorm: cílová skupina, nabídka za kontakt, okamžik žádosti o kontakt.

Na konci rozhovoru nabídnu uložit do wiki (rozpracované zadání + rozhodnutí).

## Uživatel (2026-10-09 11:06 UTC)

odpoved Codexu:

<pasted_content id="1e9a">
**Doporučuji zadání A.** Pro pozici Junior AI Developer lépe ukáže práci s daty, ověřování výstupů AI a schopnost měřit kvalitu. Do 16. října máš týden; menší, dobře ověřený výsledek je podle mě silnější než rozsáhlé řešení s nedotaženými částmi.

Wiki se mi kvůli chybě nástrojů nepodařilo přečíst. Doporučení proto vychází ze zadání, nikoli z tvých předchozích projektů.

| Kritérium | A: databáze investorů | B: landing page |
|---|---|---|
| Hlavní dovednost | Datový proces, zdroje, vyhodnocení AI | Produkt, design, texty, konverze |
| Co dobře předvedeš | Kontrolu halucinací a měřitelnou kvalitu | Funkční a přesvědčivý web |
| Největší obtíž | Neúplná a nejednoznačná data | Současně zvládnout marketing, finance a technické provedení |
| Riziko | Zaměnění kapitálu fondu, AUM a velikosti investice | Pěkná stránka, která nezískává kontakty |
| Kdy bych ho vybral | Chceš ukázat systematické technické uvažování | Máš již silné zkušenosti s frontendem a marketingem |

**B má navíc podstatný problém v zadání:** český drobný investor nemusí mít možnost běžně koupit porovnávané americké ETF. Pro retailovou distribuci v EU je relevantní dokument KID podle PRIIPs; dostupnost konkrétního ETF je nutné ověřit. Landing page tak může propagovat produkt, který návštěvník u svého brokera nekoupí. To není detail, pokud má být připravená na reklamu. [Evropská komise — PRIIPs](https://finance.ec.europa.eu/consumer-finance-and-payments/retail-financial-services/key-information-documents-packaged-retail-and-insurance-based-investment-products-priips_en)

**A bych zpracoval takto:**

- **Pilot:** VC investoři v jedné zemi, například Česku. Pracovní cíl 20–30 kandidátů; to je návrh rozsahu, nikoli ověřený počet existujících investorů.
- **Pravidla:** jasně rozlišit investiční společnost a její fondy. Definovat, jaký důkaz stačí pro zařazení a jak řešit historicky aktivní subjekty.
- **Kód:** získání obsahu veřejných zdrojů → strukturovaná extrakce AI → validace → ruční kontrola → export CSV/JSON.
- **Každý údaj:** zdroj, datum ověření a podpůrný úryvek. Chybějící kapitál označit jako nezveřejněný; nedopočítávat ho bez podkladu.
- **Měření:** ručně ověřit i vyřazené kandidáty. Odděleně měřit správnost zařazení a správnost jednotlivých údajů. Uvést také podíl vyplněných polí — vysoká přesnost při téměř prázdných záznamech nestačí.
- **Náklady:** globální rozšíření odhadnout ze skutečně naměřeného času a nákladů pilotu, včetně ruční kontroly a aktualizací.

**Nejdůležitější pro obhajobu:** ukaž konkrétní chyby AI a jak je proces zachytil. Například záměnu poradenské firmy za investora nebo velikosti jednoho fondu za celkový kapitál správce.

B bych zvolil pouze tehdy, pokud je frontend a konverzní marketing tvoje nejsilnější oblast. Jinak je A lépe kontrolovatelné a pro tuto pozici přesvědčivější.

U obou variant dělej průběžné commity a ukládej konverzace od začátku. Při použití Codexu místo Claude zdokumentuj odpovídající export; zpětně vytvořený „AI log“ by nebyl věrohodný.
</pasted_content id="1e9a">

**Nástroj PowerShell:**
```
{"command": "Get-Date -Format \"HH:mm\"", "description": "Get current time"}
```

> výsledek: 13:06

## Claude (2026-10-09 11:06 UTC)

[13:06] Codex má dva dobré body a dva slabší. Rozhodnutí tím zůstává těsné.

**Kde má Codex pravdu:**
- **PRIIPs/KID u B:** tohle jsem v první odpovědi vynechal. Americké ETF obvykle nemají KID, takže je většina brokerů pro EU retail blokuje. Stránka, která českému drobnému investorovi doporučí ETF, jež si nekoupí, by nebyla připravená na reklamu. Podrobnosti je ještě potřeba ověřit (viz níže). Dá se to ale obrátit ve prospěch B: ukázat jen to, co se dá koupit, nebo vysvětlit, proč ne a co koupit místo toho. Kdo to zvládne zachytit a zdůvodnit v README, vypadá dobře.
- **Řízené riziko u A:** malý ověřený pilot (VC v Česku, 20 až 30 subjektů) je dobře ohraničený. Měřit zvlášť zařazení a správnost jednotlivých údajů je správný nápad. Zdůraznit konkrétní chyby AI a jak se zachytily je pro README přesně to, co zadavatel chce.

**Kde je slabší:**
- **Nečetl wiki.** Doporučení stojí jen na zadání, ne na vás. Nezná váš profil ani to, že Clientelo je lead-gen firma, kde landing page a reklama jsou denní práce. Nevidí ani, že vaše mezery jsou webový stack, ne datová práce.
- **"B potřebuje silný frontend a marketing":** u Clientela se bude číst opačně. Právě B zadavatel dokáže posoudit za minutu (otevře URL na mobilu).
- **Nepodložené číslo:** "20 až 30 kandidátů" je odhad, Codex to sám přiznává.

**Moje slabé místo u A:** napsal jsem "těžko bez placených zdrojů". Pro pilot v jedné zemi to neplatí, veřejné zdroje (weby fondů, CVCA, obchodní rejstřík, tiskové zprávy) stačí. Beru zpět.

**Co platí pro obě varianty a Codex to správně zmínil:** `ai-log` chce export z Claude Code (`/export`). Dělat práci v Claude Code od začátku, ne v Codexu. Můžete použít Codex jako revizi plánu (plan-consensus), ale export musí být z Claude Code.

**Verdikt:** pořád B, ale s podmínkou. Nejdřív jedním ověřením zjistit, které ETF z NYSE pro Čecha opravdu koupit jdou (broker, KID, UCITS alternativa). Pokud to dopadne tak, že skoro nic, přepnu na A, protože B by pak stálo na neobhajitelném základě. Výsledek zkoušky by tak ukázal ten samý princip jako váš příběh s MyMiniFactory: nejdřív ověřit klíčový předpoklad.

Mám to ověřit teď? Hledal bych: (1) které velké brokery dostupné v ČR blokují US ETF, (2) co z NYSE Arca jde koupit s KID. Zabere to pár minut a rozhodne to za vás.

## Uživatel (2026-10-09 11:23 UTC)

1 - ano, ověř to
2 - codex uz se dostal do wiki a pise:

<pasted_content id="1e9a">
Wiki už jsem přečetl. Selhával Windows sandbox při spouštění nástrojů, nikoli přístupová práva k wiki. Čtení mimo sandbox funguje; samotný sandbox tím opravený není.
Podle [přihlášky Clientelo]([redacted cesta] clientelo.md):

* Firma se zaměřuje na performance marketing a lead generation.
* Pozice zahrnuje landing pages, weby, CRM, reporting, scraping a AI knowledge base.
* Máš zkušenosti s grafikou a DTP; TypeScript, React/Next.js a PostgreSQL jsou uvedené jako mezery.

To posiluje doporučení B: využiješ grafické zkušenosti a ukážeš práci relevantní pro firmu. Podle [profilu]([redacted cesta] reich.md) také respektuji plán před kódem a preferenci CLI před placenými API.
Wiki je v jednom bodě zastaralá: přihlášku stále označuje jako neodeslanou. Tvůj e-mail už dokládá postup do dalšího kola. Zatím jsem nic neměnil.
</pasted_content id="1e9a">

**Nástroj ToolSearch:**
```
{"query": "select:WebSearch,WebFetch", "max_results": 2}
```

> výsledek: 

**Nástroj PowerShell:**
```
{"command": "Get-Date -Format \"HH:mm\"", "description": "Get current time"}
```

> výsledek: 13:23

**Nástroj WebSearch:**
```
{"query": "US-listed ETFs EU retail investors PRIIPs KID blocked brokers XTB Trading 212 Interactive Brokers Degiro", "mode": "standard"}
```

**Nástroj WebSearch:**
```
{"query": "americké ETF pro české investory KID PRIIPs broker nelze koupit XTB Trading 212 Interactive Brokers", "mode": "standard"}
```

> výsledek: Web search results for query: "US-listed ETFs EU retail investors PRIIPs KID blocked brokers XTB Trading 212 Interactive Brokers Degiro"
> 
> Links: [{"title":"US-domiciled ETFs: why they are no longer available from many online brokers","url":"https://www.justetf.com/fr-be/news/etf/us-domiciled-etfs.html"},{"title":"US-domiciled ETFs: why they are no longer available from many online brokers","url":" … [zkráceno, 5862 znaků]

> výsledek: Web search results for query: "americké ETF pro české investory KID PRIIPs broker nelze koupit XTB Trading 212 Interactive Brokers"
> 
> Links: [{"title":"US-domiciled ETFs: why they are no longer available from many online brokers","url":"https://www.justetf.com/en/news/etf/us-domiciled-etfs.html"},{"title":"US-domiciled ETFs: why they are no longer available from many online brokers","url":"https:// … [zkráceno, 5423 znaků]

## Claude (2026-10-09 11:23 UTC)

[13:23] PRIIPs problém je potvrzený. Podle zdrojů nejde o drobnost.

**Co je ověřené** (zdroje níže):
- Americké ETF (VOO, SPY, VTI) většinou nemají KID podle PRIIPs. EU-regulovaní brokeři je proto retailovým klientům neprodávají. Držet nebo prodat už vlastněné jde, dokupovat ne.
- Běžná cesta je evropský UCITS ekvivalent stejného indexu. Ten ale není obchodovaný na NYSE.
- Obejít to jde přes profesionálního klienta (MiFID) nebo CFD u Interactive Brokers.

**Co ověřené není:**
- Aktuální pravidla konkrétních brokerů (XTB, Trading 212, Degiro, IBKR). Zdroje jsou převážně srovnávací blogy a fóra, ne stránky brokerů. U XTB jsem nenašel nic.
- Které konkrétní NYSE ETF mají KID. Teoreticky by mohly být výjimky, ale žádnou jsem nenašel.

**Co to znamená pro B:**
Zadání doslova říká "ETF obchodované na NYSE pro českého drobného investora". Takový investor je většinou koupit nemůže. Reklama, která slibuje porovnání ETF, jež si návštěvník nekoupí, by byla zavádějící. Vidím tři cesty:
1. **Přeformulovat hodnotu stránky:** "Chceš VOO nebo SPY? U českých brokerů ho nekoupíš. Tady je UCITS ekvivalent a kolik tě stojí poplatky." NYSE ETF zůstane jako reference pro porovnání (vlastní data, zdroj), UCITS ukáže, co lze koupit. Je to silný hák pro mobilní reklamu a odpovídá zadání dost věrně.
2. **Zeptat se zadavatele e-mailem**, jak to zadání myslel. Zadání to výslovně dovoluje. Ukáže vám to jako někoho, kdo problém zachytil, ne jen splnil. Odpověď ale nemusí přijít včas.
3. **Přejít na A.** Bezpečnější, ale ztrácíte výhodu, že B je přímo práce Clientela.

**Můj návrh:** zůstat u B s cestou 1 a zároveň poslat otázku e-mailem (cesta 2). Do README zapsat, že problém jste našel a jak jste ho vyřešil. Kdyby zadavatel trval na čistě NYSE ETF, jen na to odpovídáte v textu a stránku dokážete přepnout.

Sám vidím jedno riziko: konkrétní UCITS tickery a poplatky musím u každého zvlášť doložit zdrojem (justETF, KID správce). To je práce navíc, ale proveditelná.

**K Codexovi:** wiki je v jednom bodě opravdu zastaralá. Přihláška postoupila (e-mail od Clientela). Až se rozhodnete, přepnu `prihlaska clientelo` na `hotovo` a založím stránku rozpracovaného zadání podle SCHEMA.md.

Chcete cestu 1+2? Pak sepíšu e-mail s dotazem (nic neodesílám) a spustím brainstorm.

Sources:
- [justETF: US-domiciled ETFs no longer available from many brokers](https://www.justetf.com/en/news/etf/us-domiciled-etfs.html)
- [Interactive Brokers: PRIIPs Overview](https://ibkb.interactivebrokers.com/de/node/3324)
- [Finhacker: Jak obejít znemožnění obchodování amerických ETFek](https://www.finhacker.cz/jak-obejit-znemozneni-obchodovani-americkych-etfek-1-cast)
- [Finex.cz: Jak se k fondům dostane český investor](https://finex.cz/ve-fondech-za-biliony-dolaru-uz-investuje-cely-svet-jak-se-k-nim-muze-dostat-i-cesky-investor/)
- [ETFstream: European investors set to be impacted by KID requirements](https://www.etfstream.com/articles/etf-insight-european-investors-set-to-be-impacted-by-kid-requirements)

## Uživatel (2026-10-09 11:28 UTC)

1. dej mi odpoved na email - ne s otazkou - jen potvrzeni doruceni a podekovani 
2. otazku posilat nebudem, v zadani je explicitne ze se nemame ptat ale rozhodnout se sami a ppak rict proc jsme se tak rozhodli - nebo se pletu?
3. wiki samo uprav
4. nemusis mi vykat - tykej mi - je mi to prijemnejsi - klidne si to  uloz na vsechny session a do budoucna

## Uživatel (2026-10-09 11:28 UTC)

[Request interrupted by user]
