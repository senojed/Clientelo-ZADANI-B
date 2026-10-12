Ověřeno proti `main`, commit `e56dff1`: kód, datové podklady, auditní záznamy a tři reporty Lighthouse. Všechny relativní odkazy v README existují. Živou stránku jsem neověřil, přístup prohlížeče byl zamítnut kvůli odmítnutému oprávnění. Aktuální podmínky Meta se nepodařilo nezávisle načíst.

## BLOCKING

- **Úvod, „Stav k 12. 10. 2026“:** „probíhají poslední kontroly“ neodpovídá zásadním nedodělkům popsaným níže. Hodnotitel nedostane přímou odpověď na hlavní otázku zadání. Hned nahoře nahradit například: **„Demo je funkční, placenou firemní kampaň bych na něm zatím nespustil. Před spuštěním zbývá doplnit kontakt správce údajů, vyřešit účel a právní základ ukládání e-mailů i měření a zajistit hosting pro komerční provoz. Podrobnosti jsou v části Co chybí.“** Nejde o nový požadavek implementace, ale o přesné shrnutí již přiznaných omezení.

## IMPORTANT

- **Rozhodnutí, „Proč i UCITS alternativy“:** „alternativu … kterou koupit jde“ není doloženo. Český KID a registrace v ČR nedokládají nabídku konkrétního brokera; README zároveň přiznává, že dostupnost nebyla ověřena. Nahradit: **„Ke každému ukazuje UCITS alternativu s českým KID a registrací v ČR. Dostupnost u konkrétního brokera jsme neověřili.“**

- **Úvodní odkazy + „Co chybí“:** GitHub API aktuálně vrací `private: true`. Publikace byla v auditu odložena na 15. 10., což před termínem odevzdání není samo o sobě problém. README ale tento stav neuvádí mezi zbývajícími kroky. Doplnit: **„Repozitář je zatím soukromý; zveřejnění plánuji po závěrečné kontrole redakce ai-log, před odevzdáním.“** Po zveřejnění větu odstranit a odkazy ověřit bez přihlášení.

- **Celková struktura + „Jak jsem pracoval s AI“:** README má přibližně **2 610 slov**, což neodpovídá tříminutovému čtení. AI sekce opakuje ruční kontrolu, druhé sezení, 18 kol revize i nezávislý audit v blocích „Jak jsem výstup kontroloval“, „Nástroje“ a „Postup“. Sloučit je do jednoho přehledu. Podrobný rozbor Pixel/CAPI a licence videa přesunout do odkazovaných dokumentů. Nahoře ponechat stav kampaně, nabídku, konverzní odhad a stručné rozdělení práce člověka a AI.

- **AI, „Většinu chyb zachytila nezávislá druhá kontrola“:** zaznamenané případy toto zobecnění přesvědčivě nepodporují. Záznam uvádí také chyby zachycené Janem, samotným Claudem, ověřením zdrojů a lintem. Nahradit doložitelným závěrem: **„Nezávislé kontroly zachytily zásadní chyby v datech, textech a ochraně přehledu, které první sezení přehlédlo.“** [Záznam chyb](https://github.com/senojed/Clientelo-ZADANI-B/blob/main/ai-log/chyby-ai.md).

- **A/B hypotéza 3 + „Měření celé cesty“:** README stále používá „zobrazení formuláře“, ale událost sleduje viditelnost **celé sekce s vysvětlením a formulářem**. SQL už toto rozlišení opravilo; README zůstalo nepřesné. Použít **„zobrazení sekce s formulářem → lead“** a doplnit definici konverze: **„Konverze v SQL je podíl relací se zaznamenaným `page_view`, ve kterých vznikl alespoň jeden `lead_created`.“** Rozlišit tuto metriku od počtu uložených odeslání. [Výpočet trychtýře](https://github.com/senojed/Clientelo-ZADANI-B/blob/main/web/db/funnel.sql).

- **Technické řešení, návod ke spuštění:** hlavní blok vede přímo k `npm run dev`; konfigurace databáze a migrace jsou až za ním a není řečeno, odkud aplikace načte místní proměnné. Uspořádat návod: **instalace závislostí → vytvoření `web/.env.local` podle vzoru → doplnění vlastní databáze a tajných hodnot → `node --env-file=.env.local scripts/migrate.mjs` → `npm run dev`**. `CRON_SECRET` označit jako konfiguraci nasazeného úklidu.

## NITS

- **Rozhodnutí, „dva nejznámější tickery, které lidé hledají“:** superlativ ani vyhledávanost nejsou doložené. Nahradit vlastním záměrem: **„Zařadil jsem oba, abych pokryl návštěvníky hledající konkrétně IVV i VOO.“**

- **Reklamy, „jsou … spustitelné“:** chybí podmínka z obou reklamních souborů, totiž kontrola vizuálů v Ads Manageru. Přesněji: **„Texty a obrázky jsou připravené; náhled umístění a schválení reklam Metou zatím nejsou ověřené.“** Absence požadavku finanční certifikace sama nedokládá schválení reklamy.

- **Nabídka, „adrese … která … se dá … obnovit“:** lze to číst jako prodloužení platnosti odkazu. Nahradit: **„Odkaz lze zkopírovat a během 24 hodin znovu otevřít; přehled přežije obnovení stránky.“**

- **AI a tón:** odstranit opakované „double check jako při lezení“; použít **„nezávislá kontrola v druhém sezení“**. „Allowlist“ změnit na „seznam povolených událostí“, „session“ na „sezení“ a „best practices“ na „doporučené postupy“. U CAPTCHA stačí **„CAPTCHA zadal Jan“**, bez obecného tvrzení o tom, co Claude nesmí.

## VERDICT
CHANGES_NEEDED