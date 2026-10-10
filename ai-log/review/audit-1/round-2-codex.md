Audit vychází z GitHub commitu `30e7b30`, JSONu, uložených českých KID a důkazů ČNB. Lokální testy a živé nasazení nebyly dostupnými nástroji ověřitelné. To není důkaz nefunkčnosti webu. Čísla **#** níže odkazují na přijaté nálezy v diskusním logu. Soubory jsem neměnil.

1. **Závažnost:** MAJOR  
   **Kde:** `web/app/zasady/page.tsx`, #1  
   **Problém:** **PARTIAL.** Práva, účely a pseudonymita jsou doplněné. U předání do USA ale chybí konkrétní mechanismus ochrany údajů. Také není doloženo, proč je uchování e-mailu nezbytné pro přehled, který se na něj neposílá. Samotné uvedení článku 6 tento problém neřeší. [GDPR, čl. 13](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng), [výklad EDPB k nezbytnosti](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines-art_6-1-b-adopted_after_public_consultation_en.pdf).  
   **Návrh:** Doplnit skutečně použitý mechanismus předání a odděleně zdůvodnit právní základ uchování kontaktu. Praktická možnost je doručovat odkaz e-mailem.

2. **Závažnost:** MAJOR  
   **Kde:** `web/app/api/events/route.ts`, `web/lib/ratelimit.ts`, přijatý rate limit  
   **Problém:** **PARTIAL.** `/api/events` stále dovoluje neomezené zápisy. Limit formuláře navíc provádí kontrolu počtu a vložení odděleně. Souběžné požadavky mohou všechny přečíst počet pod limitem a projít. To plyne z kódu; provozní útok jsem neprováděl.  
   **Návrh:** Omezit také události a kontrolu s čerpáním limitu provádět atomicky.

3. **Závažnost:** MINOR  
   **Kde:** `web/app/prehled/page.tsx`, `web/app/api/lead/route.ts`, #4  
   **Problém:** **PARTIAL.** Vlastní adresa a kopírování odkazu jsou opravené. Chybí slíbené tlačítko pro opakované načtení při serverové chybě. Nový limit také započítává opakování stejného idempotentního požadavku ještě před dohledáním leadu, takže po pěti pokusech může zablokovat obnovu úspěšného odeslání.  
   **Návrh:** Přidat obnovu přehledu se zachováním tokenu a bezpečné opakování existujícího požadavku nezapočítávat jako nový lead.

4. **Závažnost:** MINOR  
   **Kde:** `web/lib/ratelimit.ts`, zásady, nový problém  
   **Problém:** Otisky IP se mažou pouze při dalším platném odeslání formuláře. Pokud další nepřijde, zůstanou uložené déle než slíbený „nejvýš jeden den“.  
   **Návrh:** Zavést pravidelné mazání nebo pravdivě popsat skutečnou dobu uchování.

5. **Závažnost:** MINOR  
   **Kde:** `ai-log/claude-code/hlavni-session.md`, `scripts/ai-log-export.py`, #23  
   **Problém:** **PARTIAL.** Exportér už příkazy nezkracuje, ale uložený hlavní export stále obsahuje zkrácené příkazy Bash a PowerShell, včetně zadání nezávislého review. Dokumentace přitom tvrdí, že jsou celé.  
   **Návrh:** Znovu vygenerovat odevzdávané exporty opraveným skriptem.

6. **Závažnost:** MINOR  
   **Kde:** `Landing.tsx`, `Kalkulacka.tsx`, #9  
   **Problém:** **PARTIAL.** Měnové riziko je v kalkulačce, patičce a přehledu. V úvodu stále chybí. Výzva přečíst KID a prospekt je v patičce, ale není v úvodu ani u kalkulačky, jak stanovila přijatá oprava.  
   **Návrh:** Doplnit krátké upozornění na požadovaná místa.

7. **Závažnost:** INFO  
   **Kde:** `web/vercel.json`, #2  
   **Problém:** **FIXED v konfiguraci.** Nastavení `regions: ["fra1"]` odpovídá [dokumentaci Vercelu](https://vercel.com/docs/functions/configuring-functions/region). Skutečný region produkčních funkcí jsem nemohl potvrdit.  
   **Návrh:** Doložit region odpovědí dynamické funkce nebo záznamem nasazení.

8. **Závažnost:** INFO  
   **Kde:** `etf.ts`, `etf-plna.ts`, `sync-data.mjs`, `/prehled`, #3  
   **Problém:** **FIXED v kódu.** Veřejný JSON neobsahuje ISIN ani odkazy na KID. Plná data předává server až po ověření tokenu; klientský import jejich typu se za běhu nepoužívá.  
   **Návrh:** Bez další opravy tohoto nálezu.

9. **Závažnost:** INFO  
   **Kde:** API leadů a událostí, `funnel.sql`, `track.ts`, #12–16  
   **Problém:** **FIXED.** Lead a konverze mají společný atomický zápis, opakování doplní chybějící konverzi. Kontroluje se příslušnost leadu k relaci. Trychtýř používá společnou kohortu a počítá souhlasy. UTM zůstávají zachované, beacon má záložní odeslání a událost se jmenuje `overview_shown`.  
   **Návrh:** Bez další opravy těchto nálezů.

10. **Závažnost:** INFO  
    **Kde:** `Srovnani.tsx`, `Kalkulacka.tsx`, `LeadForm.tsx`, README, #5 a #17  
    **Problém:** **FIXED.** Oba interaktivní prvky vedou k formuláři a měří místo i ticker. A/B hypotéza byla nahrazena. E-mail má automatické vyplnění, vlastní chybovou hlášku a hlavička vysvětluje nákladové sloupce.  
    **Návrh:** Bez další opravy těchto nálezů.

11. **Závažnost:** INFO  
    **Kde:** reklamy, `Landing.tsx`, `etf.ts`, detail DIA, #6–8, #10, #19–20  
    **Problém:** **FIXED.** Riziko je v hlavních reklamních textech a zadání kreativy. Podmínka e-mailu je uvedena, formulace KID jsou sjednocené a zavádějící argument depozitářem odstraněný. S&P 500 používá „velkých firem“. Detail DIA uvádí variantu Net TR podle dat.  
    **Návrh:** Bez další opravy těchto nálezů.

12. **Závažnost:** INFO  
    **Kde:** srovnání, kalkulačka, přehled, data a důkazy, #11 a #25  
    **Problém:** **FIXED v přijatém rozsahu.** Náklady jsou vymezené jako správa a provoz, transakční náklady jsou výslovně vyloučené. ISIN, data českých KID a uvedená procenta odpovídají uloženým dokumentům. Veřejné zdroje odpovídají rozhodnutí vlastníka produktu.  
    **Návrh:** Bez další opravy těchto nálezů.

13. **Závažnost:** INFO  
    **Kde:** checklist, patička, README, #18, #21–22 a #24  
    **Problém:** **FIXED v textech.** Řazení i datum reklamy B jsou opravené. Provozovatel a prohlášení o provizích jsou uvedení, MAR je na seznamu právní kontroly. README vysvětluje nejasnosti zadání, náhradní export i omezení Hobby pro komerční provoz podle [podmínek Vercelu](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage).  
    **Návrh:** Bez další opravy těchto nálezů; region nasazení zůstává neověřený podle bodu 7.

VERDIKT: CONTINUE