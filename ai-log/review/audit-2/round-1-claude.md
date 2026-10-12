# Audit 2, kolo 1 (Claude, nezávislý recenzent)

Stav posuzován 12. 10. 2026 (commit 192d7f6 = origin/main, živá stránka https://clientelo-zadani-b.vercel.app, jen GET požadavky). Formulář jsem neodesílal.

## Verdikt

Zítra spustit reklamu technicky lze skoro, ale ne beze změny: data, texty na stránce, obě reklamy i PDF odpovídají `data/etf.json` a důkazům (čísla 0,03/0,07, 0,06/0,07, 0,16/0,33 a ISIN jsem ověřil proti českým KID v `data/dukazy/` i proti živým KID u správců, třída rizika 4 ze 7 a doba držení 5 let sedí), žádné tajemství ani osobní údaj neuniklo (repo, historie 51 commitů ani `ai-log/`) a ISIN ani odkazy na KID nejsou v JavaScriptu veřejné stránky. Zbývá jeden MAJOR přímo v bodě konverze: e-mailové pole má na mobilu 14 px, takže iPhone při klepnutí přiblíží stránku a formulář se rozhodí. K tomu patří několik MINOR nálezů (hlavně PDF se dvěma prázdnými stránkami "6 / 5" a "7 / 5", README tvrdí víc, než ukládá repo, a drobnosti v reklamě B a v zásadách). Přijatá a zdokumentovaná rizika z auditu 1 (bez odesílání e-mailu, bez pixelu/CAPI, Vercel Hobby, právní kontrola, zástupný kontakt v zásadách, LCP kolem 2,5 s, bez data v reklamě A) znovu nehlásím. Poznámka k ostrému provozu: patička i zásady stále říkají "ukázka pro výběrové řízení" a že se data po skončení řízení smažou; to patří do stejného balíčku "před ostrou kampaní", jen ať se to nezapomene.

## Nálezy

1. **Závažnost:** MAJOR
   **Kde:** `web/components/LeadForm.tsx` (pole e-mail, třída `text-sm`), `web/components/Kalkulacka.tsx` (výběr fondu, `text-xs`); na živé stránce změřeno: e-mail 14 px, select 12 px; `web/app/globals.css` velikost polí nepřebíjí.
   **Problém:** Safari na iPhonu při zaostření pole s písmem menším než 16 px stránku přiblíží a po opuštění pole ji nevrací. Právě v okamžiku konverze (klepnutí do e-mailu) se tak na iOS posune a přiblíží celý formulář (karta má navíc `-mx-3`), uživatel musí stránku ručně oddálit. U reklamního provozu z Meta na mobilu je iOS velký podíl. Android to nedělá, proto si toho při testu na jednom telefonu snadno nevšimneš. (Chování WebKitu je známé; na zařízení iOS jsem netestoval, v emulaci prohlížeče se zoom nedá ověřit.)
   **Návrh:** pro `input[type=email]` a `select` nastavit na mobilu `font-size: 16px` (např. `text-base`, nebo v CSS `@media (max-width: 767px) { input, select { font-size: 16px } }`), výšku 44 px zachovat. Nepoužívat `maximum-scale=1` (zakazuje přiblížení a zhoršuje přístupnost). Před spuštěním zkusit na skutečném iPhonu.

2. **Závažnost:** MINOR
   **Kde:** `web/private/prehled-etf.pdf` (soubor, který návštěvník dostane po odeslání).
   **Problém:** PDF má 7 stránek, ale zápatí říká "x / 5". Stránky 6 a 7 jsou prázdné (v obsahu stránky jen pozadí a text "6 / 5", respektive "7 / 5"; ověřeno čtením obsahu stránek i vykreslením). Vypadá to jako přetečení textu v InDesignu. Je to to první, co lead po odeslání otevře.
   **Návrh:** smazat dvě prázdné stránky v InDesignu, znovu exportovat do `web/private/prehled-etf.pdf`, zkontrolovat číslování (5 stran) a znovu nasadit.

3. **Závažnost:** MINOR
   **Kde:** úvod stránky (`web/components/Landing.tsx`, "Americká ETF jako VOO většinou nemají KID, bez kterého je broker v EU drobnému investorovi obvykle nenabídne"), stejná věta v PDF.
   **Problém:** obecné tvrzení o "většině" amerických ETF stojí na čtyřech ověřených fondech a na článku justETF z roku 2018 (`data/dukazy/2026-10-09-priips-obecne.md`). Ten soubor sám říká: "Formulace na stránce musí zůstat opatrná: KID jsme k datu ověření nenašli", a vlastní checklist zakazuje "v EU nekoupíš". Věta je to nejdůležitější na první obrazovce, takže je to nejcitlivější místo pro zavádějící tvrzení.
   **Návrh:** přeformulovat na to, co je doloženo: "U VOO, IVV, DIA ani VT jsme na stránce správce KID pro EU nenašli. Bez KID je broker v EU drobnému investorovi obvykle nenabídne." (Druhá věta je obecný popis PRIIPs, ne tvrzení o počtu fondů.) Totéž v PDF.

4. **Závažnost:** MINOR
   **Kde:** `data/dukazy/2026-10-10-cnb-registr-ucits.md` a snímky `2026-10-10-cnb-jerrs-hledani-*.jpg`; použito jako opora vět "Smí se nabízet v ČR" a "je v seznamu ČNB fondů nabízených v ČR" (stránka, PDF, `etf.json`).
   **Problém:** snímky ukazují výsledek "Přímé vyhledání subjektu" (JERRS) s názvem fondu a zemí IE. Z nich nelze poznat, o jaký seznam/registr jde (nadpis seznamu na snímku není) a výsledky jsou na úrovni podfondu, ne třídy akcií (to doplňuje český KID). Věta "Smí se nabízet" je navíc právní závěr, který evidence přímo neříká.
   **Návrh:** přidat do důkazů snímek detailu subjektu (druh seznamu / oprávnění nabízet v ČR) nebo odkaz na konkrétní seznam ČNB; na stránce raději "je v seznamu ČNB" než "smí se nabízet"; věc je v seznamu pro právníka, ale tvrzení teď jde veřejně do reklamy.

5. **Závažnost:** MINOR
   **Kde:** `ads/ad-b-1080x1350.png` a `ads/ad-b-1080x1920.png`; `ads/ad-b.md`.
   **Problém:** (a) čitelné jsou jen dva řádky (VOO 0,03/0,07 a VT 0,06/0,07), tedy ty s nejmenším rozdílem; řádky DIA (0,16/0,33) a IVV jsou rozmazané. Není to nepravda, ale reklama, která slibuje "4 ETF", ukazuje jen nejpříznivější dva a neříká, že alternativa je dražší (reklama A to ukazuje otevřeně, stránka také). (b) Za nadpisem je rozmazaný, ale místy čitelný text z tabulky ("...Klikni na řádek...", "zdroj"), který vizuál zašumí. (c) "zdroj u každého řádku" platí jen napůl: u US fondu je veřejný odkaz, u alternativy je odkaz na KID až za e-mailem (rozhodnutí Jana v auditu 1, ale text reklamy to nezmiňuje).
   **Návrh:** buď odkrýt řádek DIA, nebo do hlavního textu dopsat "alternativy bývají dražší"; rozmazat i horní okraj tabulky pod nadpisem; "zdroj u každého řádku" změnit na "zdroje na stránce".

6. **Závažnost:** MINOR
   **Kde:** první obrazovka (`Landing.tsx`) vs. `ads/ad-a.md`.
   **Problém:** reklama A slibuje "Znáš VOO nebo IVV? Porovnej náklady" a ukazuje 0,03 % vs 0,07 %. První obrazovka má nadpis "Evropské alternativy amerických ETF" a čísla nákladů žádná; porovnání je až za tlačítkem "Zobrazit srovnání". Návaznost je jen v podtextu ("jako VOO", "náklady obou"). Zadání chce, aby první obrazovka "okamžitě komunikovala, co návštěvník získá". README to sám uvádí jako hypotézu 2, ale pro reklamu A je to slabé místo hned první den.
   **Návrh:** nejlevnější úprava: pro `utm_content=ad_a` zobrazit v úvodu řádek "VOO 0,03 % / Vanguard S&P 500 UCITS 0,07 %" (data jsou k dispozici, odpovídá obrázku reklamy) nebo aspoň nadpis "Znáš VOO? Tady je jeho evropská alternativa a náklady obou".

7. **Závažnost:** MINOR
   **Kde:** `README.md`, sekce "Mobil a výkon"; `docs/lighthouse/`.
   **Problém:** README uvádí "tři měření, výkon 94 až 96, LCP 2,4 až 2,7 s". V repu je z 12. 10. jediný report (`2026-10-12-mobil.report.json`: výkon 94, LCP 2,7 s, TBT 60 ms, CLS 0, speed index 4,2 s). Hodnoty 96 a 2,4 s nejsou doložené. Starší reporty jsou z jiné verze (jeden z localhostu, LCP 3,0 s).
   **Návrh:** buď uložit zbylá dvě měření, nebo v README napsat jen to, co report ukazuje (94, LCP 2,7 s, tedy mírně nad cílem 2,5 s).

8. **Závažnost:** MINOR
   **Kde:** `README.md`, "Pořadí sekcí a proč" ("na 375×812 se vejde celá").
   **Problém:** v emulaci 375×812 má sekce srovnání 841 px a sekce s formulářem 813 px (celá stránka 2855 px). Tvrzení neplatí a v prohlížeči s lištou (menší `svh`) platí ještě méně. Obsah ale zůstává použitelný, jde jen o nepřesný popis.
   **Návrh:** formulovat jako "zhruba na výšku obrazovky".

9. **Závažnost:** MINOR
   **Kde:** `web/components/Srovnani.tsx`, `Landing.tsx`.
   **Problém:** klíčová čísla a zdrojové údaje jsou drobná: hlavička tabulky 10 px ("Roční náklady USA / EU"), čísla nákladů v řádcích 11 px, řádek "Údaje ověřeny" 11 px, právní věta v úvodu 12 px. Na telefonu s reklamního provozu je to hranice čitelnosti pro hlavní důkaz hodnoty.
   **Návrh:** minimálně hlavičku a čísla nákladů na 12 až 13 px (tabulka to snese, třetí sloupec je 84 px, případně zkrátit hlavičku).

10. **Závažnost:** MINOR
    **Kde:** `web/lib/ratelimit.ts` (`LIMITY = { lead: 5, events: 300 }` na hodinu a IP).
    **Problém:** u mobilního provozu v ČR sdílí jednu veřejnou IPv4 často mnoho lidí (operátorské NAT, firemní a veřejná Wi-Fi). Při 300 událostech za hodinu (jedna návštěva jich pošle kolem 10 až 15) se po cca 20 až 30 návštěvách z jedné IP události tiše zahazují (HTTP 429, klient to neřeší) a trychtýř se zkreslí; při 5 odesláních formuláře za hodinu z jedné IP člověk uvidí "Příliš mnoho pokusů" a lead se ztratí. Při malém demu nevadí, při kampani ano.
    **Návrh:** limit událostí počítat na relaci (session_id) a IP zvlášť a zvednout (např. 2000/h), limit leadů zvednout na 20 až 30/h; do README přidat jednu větu o tomto omezení.

11. **Závažnost:** MINOR
    **Kde:** `web/app/api/lead/route.ts`, `web/db/schema.sql`, `web/db/funnel.sql`.
    **Problém:** e-mail nemá unikátní omezení ani normalizované porovnání. Stejný člověk, který po 24 h znovu zadá e-mail, vytvoří nový lead a novou konverzi `lead_created` (různý idempotency_key). Trychtýř je počítá po relacích, takže "leady" a "konverze" jsou počty odeslání, ne unikátních kontaktů; počet leadů by byl nadhodnocený a cena za lead podhodnocená. Žádná adresa není ověřená (přijatý a zdokumentovaný soft gate), takže dohromady jde o lead quality.
    **Návrh:** do `funnel.sql` přidat sloupec `count(distinct lower(email))`, popřípadě `unique (lower(email))` s aktualizací místo vložení; v README zmínit, že "lead" = odeslání.

12. **Závažnost:** MINOR
    **Kde:** HTTP hlavičky živé stránky (jen `Strict-Transport-Security`; žádné `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`).
    **Problém:** stránku s formulářem jde vložit do cizího rámu (clickjacking), nic neomezuje načítání skriptů; token přehledu leží v URL, odkazy ven mají `noreferrer`, ale chybí obecná `Referrer-Policy`. Pro demo malé, pro kampaň s formulářem standard.
    **Návrh:** v `next.config.ts` přidat `headers()`: `frame-ancestors 'none'` (CSP), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, základní CSP bez cizích zdrojů (stránka žádné cizí zdroje nepoužívá).

13. **Závažnost:** MINOR
    **Kde:** `web/app/zasady/page.tsx` ("Databáze Neon (region EU, Frankfurt)"), `compliance/checklist.md` (seznam pro právníka zmiňuje jen předání do USA přes Vercel).
    **Problém:** Neon je také zpracovatel (provozovaný americkou firmou), ale zásady ho uvádějí jen regionem a bez zmínky o možném předání mimo EU; pro Vercel je mechanismus (DPF) uveden, pro Neon ne. Ověření DPF certifikace Vercelu jsem neprováděl.
    **Návrh:** doplnit Neon jako zpracovatele a jeho mechanismus předání (nebo uvést, že data zůstávají v EU regionu a na jakém základě), přidat do seznamu pro právníka.

14. **Závažnost:** MINOR
    **Kde:** README ("ISIN, odkazy na KID a kontrolní seznam jsou za e-mailem", "PDF stahuje jen s platným odkazem") vs. veřejné repo: `data/etf.json` (ISIN a KID odkazy), `web/private/prehled-etf.pdf`, `design/texty/pdf-prehled-text.pdf`, `data/dukazy/` (3 MB HTML kopie stránky iShares IVV, kopie KID a ESMA).
    **Problém:** po zveřejnění repa je obsah "za e-mailem" i hotové PDF volně ke stažení z GitHubu, takže hradlo je jen ukázka mechanismu. To je nevyhnutelný důsledek zadání (veřejné repo i živá stránka), ale README to netvrdí. Navíc repo redistribuuje cizí materiály (kopie produktové stránky BlackRock, KID, text směrnice); jde o veřejné dokumenty použité jako důkaz, ale 2,9 MB HTML kopie obchodní stránky je zbytečná.
    **Návrh:** jedna věta do README ("v demu je obsah přehledu i v repu, hradlo je ukázka; v ostrém provozu by PDF a data byly v soukromém úložišti"); zvážit nahrazení HTML kopie IVV snímkem nebo výňatkem.

15. **Závažnost:** MINOR
    **Kde:** repo hygiene: `web/next.config.ts` (`allowedDevOrigins: ["[redacted IP]"]`, adresa z osobní sítě), `design/texty/pdf-prehled-text.html` a `texty-komplet.html` (absolutní cesty `file:///C:/Users/Honza/Nextcloud/...`), `design/texty/pdf-prehled-text.md` a starší `pdf-prehled-text.pdf` (věta "dostane e-mailem po odeslání formuláře", PDF se přitom neposílá a je jiné než `web/private`), `web/README.md` (odkazuje na neexistující `app/api/prehled/route.ts` a lokální příkaz `--env-file=../../.env`), `web/public/{file,globe,next,vercel,window}.svg` (nepoužité šablonové soubory), README sekce "Jak jsem pracoval s AI" (odrážky "Nástroje" a "Postup" opakují text výše, včetně věty o ruční kontrole a "double check jako při lezení").
    **Problém:** drobné zbytky a rozpory, které při veřejném zveřejnění vypadají jako nepořádek; žádný není nebezpečný.
    **Návrh:** odstranit/opravit uvedené (IP z configu zrušit nebo přesunout do `.env.local`, cesty v HTML nahradit relativními, `design/texty/*.pdf` a zastaralé věty smazat nebo označit, `web/README.md` opravit na `app/prehled/*`, README sloučit odrážky).

16. **Závažnost:** MINOR
    **Kde:** `README.md` ("u designového chatu seznam věcí, které se bez souhlasu nesmí měnit"), `design/ZADANI-DESIGN.md`, `ai-log/README.md`.
    **Problém:** README zmiňuje designový chat s AI, ale v `ai-log/` jeho záznam není a `ai-log/README.md` o něm nic neříká (zdroje jsou jen hlavní session, subagenti, Codex jako vložený text a review). Hodnotitel hledá, "jak autor pracoval s AI", a tohle je mezera.
    **Návrh:** buď záznam přidat (redigovaný), nebo do `ai-log/README.md` napsat, že design vznikl mimo Claude Code (Affinity/InDesign, Jan) a že `design/ZADANI-DESIGN.md` je jediný dochovaný vstup.

## Co jsem ověřil a bez nálezu

- Čísla v obrazech reklam (4 PNG) i v textech `ads/*.md` odpovídají `data/etf.json`; upozornění na riziko je v každém obrázku, bezpečné zóny 9:16 (250/350 px) jsou dodrženy.
- PDF: všechna čísla, ISIN, data českých KID (3. 9., 24. 3., 20. 8. 2026), rozdíly v Kč (170/40/40/10 Kč při 100 000 Kč) a "třída 4 ze 7, 5 let" sedí s `data/dukazy/*cs/cz.pdf`; živé KID u správců mají stejná data a náklady (kontrola 12. 10.).
- Meta: seznam zemí s ověřením inzerenta finančních služeb na živé stránce Mety odpovídá `compliance/checklist.md` (ČR v něm není); MAR čl. 3 odst. 1 bod 35 je správně.
- Zabezpečení: token HMAC s `timingSafeEqual`, 401 bez tokenu na `/prehled/pdf` i `/api/uklid`, parametrizované SQL, kontrola původu, ISIN a odkazy na KID nejsou v HTML ani v 9 načtených JS souborech veřejné stránky, `/prehled` má `noindex`, odkazy ven mají `noreferrer`.
- Tajemství a osobní údaje: v gitu není `.env*` (jen `.env.example`), v historii nic podobného, v `ai-log/` (včetně cíleného skenu `hlavni-session.md`) žádný klíč, heslo, připojovací řetězec, e-mail ani absolutní osobní cesta; jména třetích osob jsou redigována. Commit autor je GitHub noreply adresa.
- Repo je zatím soukromé (anonymní přístup vrací 404), `main` = `origin/main`, 51 commitů za 4 dny s věcnými zprávami; všechny odkazy v README na soubory v repu existují, všechny zdrojové odkazy v `etf.json` vracejí 200 (Pixabay odkazy vracejí 403 robotům, neověřeno).

VERDIKT: NOT READY
