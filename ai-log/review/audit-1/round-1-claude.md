# Nezávislý audit, kolo 1 (Claude)

Stav k 10. 10. 2026, repozitář na commitu 336ab6b, živá stránka https://clientelo-zadani-b.vercel.app (jen GET).

## Verdikt

Zítra reklamu spustit nelze. Stránka technicky běží, data v `data/etf.json` sedí s českými KID i s uloženými stránkami správců a formulář je minimální. Spuštění ale blokují tři věci. Reklamy jsou podle vlastních souborů pořád "koncept", nemají upozornění na riziko a jediné upozornění dávají do pole "Popis", které se na mobilu často nezobrazí. Informace o zpracování osobních údajů jsou neúplné a zavádějící: chybí právní titul a právo stížnosti, a API, které přijímá e-mail, běží v USA (`iad1`), i když zásady mluví o "region EU, Frankfurt". Veřejný repozitář na GitHubu vrací 404. Konverzi navíc zjevně brzdí: první obrazovka nevysvětluje, proč by návštěvník alternativu potřeboval, interaktivní prvky nemají vlastní výzvu ke kontaktu a obsah za e-mailem je celý veřejně v JavaScriptu stránky. Po odeslání si návštěvník neodnese nic trvalého.

## Nálezy

1. **Závažnost:** BLOCKER
   **Kde:** `ads/ad-a.md` ř. 3 a 8, `ads/ad-b.md` ř. 3 a 8, README ř. 72
   **Problém:** Oba soubory reklam samy uvádějí "Stav: koncept k Janově kontrole. Stav spustitelnosti ... se doplní", README ř. 72 ale tvrdí, že reklamy jsou "bez certifikace inzerenta spustitelné". Žádná reklama neobsahuje upozornění na riziko ztráty, i když jmenuje konkrétní fondy a náklady (vlastní checklist podle ESMA přitom žádá rizika "stejně viditelně"). Jediné upozornění, "Marketingové sdělení, ne investiční doporučení", je v poli "Popis" (link description). Na Instagramu se toto pole nezobrazuje a na Facebooku ho mobil často zkrátí (domněnka, ověř v náhledu Ads Manageru). Vizuály chybí (známá věc, nehodnotím).
   **Návrh:** Dej "Marketingové sdělení. Investice nesou riziko ztráty." do hlavního textu a čitelně i do vizuálu, ne do Popisu. Sjednoť stav: buď "spustitelné po dodání vizuálů" v souborech reklam, nebo oprav README. Ověř náhled ve všech umístěních (Feed, Stories, Reels).

2. **Závažnost:** BLOCKER
   **Kde:** `web/app/zasady/page.tsx` ř. 13 až 36, živé odpovědi API
   **Problém:** Zásady neuvádějí právní titul zpracování e-mailu (čl. 13 odst. 1 písm. c GDPR), právo podat stížnost u ÚOOÚ, právo vznést námitku ani předání do třetí země. Ř. 30 píše "Hosting Vercel a databáze Neon (region EU, Frankfurt)", ale funkce běží v USA: živé `/api/prehled` vrací `X-Vercel-Id: fra1::iad1::...` a dokumentace Vercelu uvádí `iad1` (Washington) jako výchozí region nových projektů. `/api/lead` tedy e-mail zpracuje v USA a až potom ho pošle do Frankfurtu. Účel "abychom ti zpřístupnili přehled" e-mail nepotřebuje, protože přehled se ukáže hned a nic se neposílá. Sběr e-mailu bez potřebného účelu je problém minimalizace údajů (čl. 5 odst. 1 písm. c). Kontakt správce je známá zástupná věc, nehodnotím.
   **Návrh:** Nastav region funkcí na `fra1` (Hobby povoluje jeden region, v nastavení projektu nebo `vercel.json`). Doplň právní titul (plnění na žádost subjektu u přehledu, souhlas u novinek), dobu uložení, právo stížnosti u ÚOOÚ a zmínku o Vercel Inc. (USA). Dej e-mailu skutečný účel: pošli na něj odkaz na přehled (viz nález 9).

3. **Závažnost:** BLOCKER (pro odevzdání)
   **Kde:** `git remote -v` = https://github.com/senojed/Clientelo-ZADANI-B
   **Problém:** Zadání chce "odkaz na verejný repozitár na GitHube". Anonymní GET na github.com i na api.github.com vrací 404, repo je tedy soukromé nebo neexistuje (lokální `main` sleduje `origin/main`).
   **Návrh:** Před odesláním repo zveřejni a ověř odkaz v anonymním okně. Předtím ještě jednou projdi redakci `ai-log/`.

4. **Závažnost:** MAJOR
   **Kde:** `web/components/Landing.tsx` ř. 108; srovnej `Prehled.tsx` ř. 104, patičku `Landing.tsx` (text "neznamená, že fond nekoupí žádný broker"), README ř. 14, `compliance/checklist.md` ř. 26
   **Problém:** Stránka tvrdí natvrdo "Broker v EU smí drobnému investorovi prodat fond jen s tímto dokumentem", a to hned vedle "U těchto 4 amerických ETF jsme KID pro EU nenašli". Dohromady to čtenáři říká "v EU nekoupíš", což vlastní checklist (ř. 26) zakazuje. README i přehled přitom píšou opatrně "obvykle" a patička stejné stránky to vyvrací. Stránka si tak sama protiřečí. Výjimky (profesionální klient, prodej už držené pozice) text úplně ignoruje.
   **Návrh:** Sjednoť formulaci na "Bez KID ho broker drobnému investorovi v EU obvykle nenabídne. U těchto 4 ETF jsme KID k 9. 10. 2026 na stránce správce nenašli."

5. **Závažnost:** MAJOR
   **Kde:** úvod a patička `Landing.tsx` ř. 59 až 86 a 128 až 139, `Kalkulacka.tsx`, `Prehled.tsx`
   **Problém:** Pro českého investora chybí hlavní riziko kromě poklesu trhu, totiž měnové. Všechny 4 alternativy jsou třídy v USD a české KID výslovně píšou "Vezměte v úvahu měnové riziko" (např. `2026-10-10-vuaa-eu-priips-kid-cz.pdf`). Na stránce o tom není ani slovo, kalkulačka počítá v Kč a o kurzu mlčí. Chybí také výzva "před investicí si přečti KID a prospekt" a ukazatel rizika (podle českých KID je u S&P 500 třída 4 ze 7). Stránka ukazuje náklady, ale rizika jen jednou obecnou větou, takže riziko není vyvážené s přínosem, jak žádá vlastní checklist ř. 19.
   **Návrh:** K úvodnímu upozornění přidej "Fondy jsou v USD, výnos v Kč ovlivní kurz." Do rozbaleného řádku přidej "riziko 4 ze 7 podle KID" a do patičky "Před investicí si přečti KID a prospekt fondu".

6. **Závažnost:** MAJOR
   **Kde:** `web/components/Srovnani.tsx` ř. 51 až 66, `Kalkulacka.tsx` ř. 75 až 81, README ř. 54
   **Problém:** Zadání: "Každý z nich by mal viesť ku kontaktu." Rozbalený řádek tabulky ani výsledek kalkulačky nemá vlastní výzvu ke kontaktu. Obě sekce sdílí jediné obecné tlačítko "Získat celý přehled zdarma" pod kalkulačkou. README to v A/B hypotéze č. 1 dokonce přiznává ("Výzva k přehledu přímo v rozbaleném řádku ... oproti formuláři jen na třetí obrazovce"). To, co zadání vyžaduje, je tedy odsunuté do testu.
   **Návrh:** Do každého rozbaleného řádku dej tlačítko "Pošli mi ISIN a český KID k [fond]" a pod výsledek kalkulačky přidej výzvu navázanou na vybraný fond. Obě vedou na formulář a měří se přes `cta_click` s `ticker`. A/B hypotézu č. 1 nahraď jinou.

7. **Závažnost:** MAJOR
   **Kde:** `Landing.tsx` ř. 16 (`min-h-[100svh] ... justify-center`) a ř. 59 až 86, živá stránka
   **Problém:** Návštěvník má "pár sekund" a první obrazovka mu nedá důvod pokračovat. Nadpis "Evropské alternativy amerických ETF" a podnadpis s "UCITS fondů" předpokládají, že ví, proč alternativu potřebuje. Vysvětlení (KID, broker) je až ve třetí sekci. Hero má navíc výšku celé obrazovky a obsah je svisle uprostřed, takže tabulka, slibovaná slovy "Náklady hned", na první obrazovce vůbec není. Reklama A slibuje "Znáš VOO nebo IVV? Porovnej náklady", ale první řádek tabulky je DIA, nejhorší pár (0,16 % proti 0,33 %).
   **Návrh:** Do podnadpisu dej problém lidsky, např. "VOO u brokera v EU často nenajdeš, protože nemá KID. Tady je fond na stejný index, který koupit jde." (formulaci uprav podle nálezu 4). Zruš `min-h-[100svh]` u úvodu a ukaž hned pod nadpisem aspoň 2 řádky tabulky (VOO, IVV). Řazení podle reklamy nebo VOO jako první, s poznámkou o řazení.

8. **Závažnost:** MAJOR
   **Kde:** `web/lib/etf.ts` ř. 3 (import celého JSON do klientských komponent), README ř. 102, živé JS soubory
   **Problém:** Obsah "za e-mailem" je veřejný. Ve staženém JS bundlu živé stránky jsou všechny 4 ISIN (IE00B5BMR087, IE00BFMXXD54, IE000VAHT5T0, IE00B53L4350), odkazy na KID (`fund-docs.vanguard.com/..._priipskid_cz.pdf`) a pole `kid_url`. Token v `/api/prehled` tak nic nechrání a tvrzení README "Přehled za e-mailem chrání podepsaný token" neodpovídá skutečnosti. Bez bundlu je přehled stejně slabá odměna: plný název fondu je veřejně v rozbaleném řádku a ISIN z něj najde vyhledávač za pár sekund. Token navíc není svázaný s leadem a `/api/lead` ho vydá komukoli, kdo pošle libovolný e-mail.
   **Návrh:** Klientovi předávej jen veřejnou podmnožinu (tickery, krátké názvy, náklady, data KID), třeba jako `etf-public.json` vygenerovaný v `sync-data.mjs`, a plný JSON importuj jen v API route. Hodnotu za e-mail posil něčím, co z veřejné části nejde odvodit snadno, např. kontrolní seznam s konkrétními kroky nebo rozdíl kurzových nákladů.

9. **Závažnost:** MAJOR
   **Kde:** `Landing.tsx` (token jen v `useState`), `Prehled.tsx` ř. 43 (`window.print()`)
   **Problém:** Po odeslání si návštěvník neodnese nic trvalého. Token platí 24 h, ale existuje jen v paměti komponenty a v URL není, takže obnovením stránky nebo zavřením in-app prohlížeče přehled zmizí. Text chyby pak radí "odešli formulář znovu", což vytvoří druhý lead. Provoz z Meta reklam se otevírá v in-app prohlížeči Facebooku a Instagramu, kde `window.print()` obvykle nic neudělá (domněnka, ověř na Androidu i iOS). Tlačítko "Uložit jako PDF" tak pro většinu provozu nejspíš nefunguje. Plán "PDF = tisk" tedy pro reklamní provoz neobstojí. E-mailing je známá věc, ale tohle jde opravit i bez něj.
   **Návrh:** Po odeslání přesměruj na `/prehled?t=<token>` (stránka, kterou jde uložit, sdílet a znovu otevřít) a ukaž "Zkopírovat odkaz". U tlačítka PDF detekuj in-app prohlížeč a nabídni "otevřít v prohlížeči".

10. **Závažnost:** MAJOR
    **Kde:** `web/lib/track.ts`, README "Měření celé cesty", `compliance/checklist.md` ř. 13
    **Problém:** Bez Meta Pixelu nebo Conversions API Meta konverzi (`lead_created`) nevidí. Kampaň pak jde optimalizovat jen na kliky nebo zobrazení stránky, což při studeném publiku vede na nekvalitní provoz, a README samo píše, že "nejvíc výsledek ovlivní kvalita provozu". Vlastní trychtýř je správný pro analýzu, ale k nákupu reklamy nestačí. `fbclid` se neukládá, takže leady nejde ani dodatečně spárovat s kliky.
    **Návrh:** Ukládej `fbclid` spolu s UTM. Pro start zvol cíl "zobrazení vstupní stránky" a popiš to v README. Pro optimalizaci na leady přidej Conversions API ze `/api/lead` (s právním posouzením předávání údajů Meta) nebo Pixel s lištou souhlasu.

11. **Závažnost:** MAJOR
    **Kde:** `Landing.tsx` ř. 133, `Srovnani.tsx` ř. 71 až 73, `ads/ad-b.md` ř. 10
    **Problém:** Zadání chce "skutočné dáta s uvedením zdroja". Ve veřejné části stránky (tedy u každého čísla, které reklama ukáže) není žádný odkaz na zdroj, jen obecná věta v patičce "Zdroje: stránky správců fondů, NYSE, seznam ČNB ..." bez odkazů. Odkaz na stránku správce a na KID je až za e-mailem. Reklama B přitom do vizuálu slibuje "zdroj u každého údaje".
    **Návrh:** Do rozbaleného řádku přidej odkazy "zdroj (správce)" a "KID (správce)" s datem, nebo aspoň odkaz na stránku správce. Pokud mají KID odkazy zůstat za e-mailem, uber z reklamy B slib "zdroj u každého údaje".

12. **Závažnost:** MAJOR
    **Kde:** celá stránka, patička `Landing.tsx`
    **Problém:** Stránka neříká, kdo ji provozuje, proč ji dělá a zda má na doporučených fondech zájem (provize, affiliate). Jméno je jen v zásadách. Finanční publikum je nedůvěřivé, takže to snižuje konverzi. Stránka navíc k jmenovitým fondům říká "porovnej tenhle místo tamtoho" a dává důvody "Proč evropská alternativa". Právně to může být investiční doporučení podle MAR (čl. 3 odst. 1 bod 35), s povinností zveřejnit střet zájmů, a samotné prohlášení "ne investiční doporučení" na tom nic nemění (domněnka, potřebuje právníka). Identifikaci provozovatele webu může vyžadovat i zákon č. 480/2004 Sb. (domněnka).
    **Návrh:** Do patičky přidej "Kdo za stránkou stojí" (subjekt, IČO, kontakt) a větu o střetu zájmů ("nedostáváme provize od správců uvedených fondů", pokud to platí). Otázku MAR dej na seznam pro právní kontrolu v README.

13. **Závažnost:** MINOR
    **Kde:** `web/app/api/lead/route.ts`, `web/app/api/events/route.ts`, `web/lib/validate.ts` ř. 64 až 74 (`isSameOrigin`)
    **Problém:** Kontrola `Origin` brání jen CSRF z prohlížeče, `curl -H "Origin: ..."` ji obejde. Kdokoli tak může bez limitu zakládat leady s cizími e-maily, včetně `marketing_consent: true`, a posílat podvržené `page_view` s `variant: "a"`, čímž zkreslí A/B srovnání reklam. Souhlas s novinkami nemá double opt-in, takže pozdější newsletter může odejít na cizí adresy. Rate limit je v README jako chybějící, souhlas ne.
    **Návrh:** Přidej jednoduchý rate limit podle IP (např. tabulka v Neonu nebo Vercel Firewall) a u souhlasu potvrzovací e-mail před prvním newsletterem. Události s nepřirozenou frekvencí na `session_id` z trychtýře vyřaď.

14. **Závažnost:** MINOR
    **Kde:** `web/lib/track.ts` ř. 19, `web/app/zasady/page.tsx` ř. 39, `LeadForm.tsx` ř. 92
    **Problém:** Je to chyba v měření. `getAttribution()` čte UTM z aktuální URL při každé události. Když návštěvník klikne u formuláře na "zásadami zpracování" a vrátí se odkazem "Zpět na srovnání" (`href="/"`, klientská navigace, `sessionId` zůstává), URL už UTM nemá. `form_start` i `lead_created` se pak uloží s `variant = null` a lead se v `funnel.sql` připíše skupině "-" místo reklamy. Zrovna nejopatrnější návštěvníci, kteří čtou zásady, tak ztratí atribuci. Navíc se ztratí rozepsaný e-mail.
    **Návrh:** UTM a variantu zachyť jednou při prvním načtení do proměnné modulu (jako `sessionId`). Zásady otevírej v novém panelu (`target="_blank"`) nebo v rozbalovacím bloku.

15. **Závažnost:** MINOR
    **Kde:** `Prehled.tsx` ř. 16, `web/db/funnel.sql`, PLAN.md ř. 63
    **Problém:** `pdf_requested` se odešle při každém zobrazení přehledu, ne při žádosti o PDF. V README je ale uvedená jako samostatný krok cesty a duplikuje `lead_created`. PLAN slibuje throttle událostí a kontrolu `lead_id` proti `session_id`, kód ani jedno nedělá (`/api/events` přijme libovolné UUID jako `lead_id`). Trychtýř nefiltruje boty a nové načtení stránky rozdělí jednu návštěvu na dvě relace. README to zmiňuje, ale chybí odhad dopadu na konverzní poměr.
    **Návrh:** Přejmenuj událost na `overview_shown`. Buď doplň slíbené kontroly, nebo je vyškrtni z PLAN. Do `funnel.sql` přidej filtr relací bez `section_view` (boti a okamžité odchody) jako druhý řádek "kvalitní návštěvy".

16. **Závažnost:** MINOR
    **Kde:** `LeadForm.tsx` ř. 61 a 96, `web/lib/validate.ts` ř. 21, `Srovnani.tsx` ř. 29 až 32
    **Problém:** E-mailové pole nemá `autoComplete="email"` ani `name`, takže automatické vyplnění na mobilu je méně spolehlivé. Prohlížeč přijme `jan@seznam` (bez domény nejvyššího řádu), server ho regexem odmítne a uživatel dostane obecné "Nepodařilo se odeslat. Zkus to prosím znovu.", takže zkouší znovu totéž. Hlavička tabulky "USA | Alternativa v EU | USA | EU" dvakrát opakuje "USA" a neříká, že sloupce jsou roční náklady. To je vidět až v poznámce pod tabulkou.
    **Návrh:** Doplň `autoComplete="email"`, `name="email"` a `inputMode="email"`. Při 400 `invalid_input` zobraz "Zkontroluj e-mail". Hlavičku změň na "USA | Alternativa | Roční náklady USA | EU".

17. **Závažnost:** MINOR
    **Kde:** `compliance/checklist.md` ř. 40 a 45, `ads/ad-b.md` ř. 7 a 10
    **Problém:** Checklist odškrtává věci, které neplatí. "[x] řazení tabulky abecedně (neutrální), uvedeno u tabulky": u tabulky žádná zmínka o řazení není (`Srovnani.tsx` ř. 22 až 26). "[x] region úložiště ... uvedeno v zásadách": zásady uvádějí EU, ale funkce běží v `iad1` (nález 2). Reklama B píše "ověřeno 9. 10. 2026", registrace v ČR a české KID jsou ale ověřené 10. 10. (`data/overeni.md`).
    **Návrh:** Oprav checklist podle skutečnosti. Do tabulky přidej "Řazeno abecedně podle tickeru", nebo změň řazení a odškrtnutí zruš. V reklamě B uveď "ověřeno 9. a 10. 10. 2026".

18. **Závažnost:** MINOR
    **Kde:** `Landing.tsx` ř. 115 až 117
    **Problém:** "Je to fond UCITS. ... majetek fondu opatruje depozitář na oddělených účtech fondu" v kontextu "proč evropská alternativa" naznačuje, že americká ETF tuhle ochranu nemají. Americké fondy podle Investment Company Act mají také custodiana nebo trustee s oddělenými aktivy (DIA je UIT s trusteem). Data v repu nic takového nesrovnávají, takže tvrzení jde nad rámec důkazů.
    **Návrh:** Bod přeformuluj neutrálně ("UCITS je evropský rámec, který dohlíží ČNB a irská centrální banka") nebo ho vypusť, KID je silnější argument.

19. **Závažnost:** MINOR
    **Kde:** README (chybí sekce o nejasnostech zadání), `ai-log/README.md`, `scripts/ai-log-export.py` ř. 12 až 13
    **Problém:** Zadání žádá v README zdůvodnit vlastní rozhodnutí tam, kde zadání nebylo jasné. README nevysvětluje, proč "ETF obchodované na NYSE" znamená NYSE Arca. Neříká ani, proč se ze "srovnání NYSE ETF" stalo srovnání s UCITS alternativami a proč stačí 4 ETF, z nichž dvě (IVV, VOO) mají stejný index i stejné náklady. Zadání chce v `ai-log` "export konverzácií ... (príkaz /export)", repo ale obsahuje vlastní převod JSONL, kde jsou výsledky nástrojů zkrácené na 400 znaků. README hlavního repa tuto odchylku nezdůvodňuje (je jen v `ai-log/README.md`).
    **Návrh:** Do README přidej krátkou sekci "Rozhodnutí tam, kde zadání nebylo jednoznačné" (NYSE Arca, přerámování na alternativy, počet fondů). U ai-log jednou větou vysvětli, proč ne `/export` (redakce osobních údajů), nebo přilož i redigované výstupy `/export`.

20. **Závažnost:** MINOR
    **Kde:** README ř. 102 ("Vercel (Hobby)")
    **Problém:** Pro odevzdání je bezplatný hosting v pořádku, ostrá placená kampaň pro firmu ale na Hobby být nesmí. Dokumentace Vercelu (Fair Use Guidelines) píše, že Hobby je "restricted to non-commercial personal use only".
    **Návrh:** Do README "Co chybí / před spuštěním" doplň přechod na Vercel Pro nebo hosting zadavatele.
