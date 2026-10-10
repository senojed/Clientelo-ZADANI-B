Audit vychází z GitHub commitu `6e623c0`. Lokální čtení, testy a živou stránku blokovaly chyby nástrojů, aktuální nasazení tedy nepotvrzuji. Data jsem porovnal s JSONem a dostupnými textovými důkazy; PDF a snímky jsem znovu neotevřel. Soubory jsem neměnil. Čísla # odkazují na diskusní log.

1. **Závažnost:** MINOR, nový nález  
   **Kde:** README, „Co chybí“  
   **Problém:** Samotné odeslání odkazu e-mailem neověří, že adresa existuje. Úspěšné odeslání ještě neznamená doručení ani kontrolu adresy uživatelem.  
   **Návrh:** Napsat „umožní sledovat nedoručitelné adresy“. Ověření přístupu ke schránce vyžaduje potvrzovací klik.

2. **Závažnost:** INFO  
   **Kde:** zásady a README, #1, kolo 2 bod 1, kolo 3 body 1 a 2  
   **Problém:** **FIXED v přijatém rozsahu.** Zásady rozlišují účely a právní základy, uvádějí námitku, stížnost, pseudonymní měření a předání do USA. Nedoložené smluvní doložky odstraněny; certifikaci DPF potvrzuje [Vercel](https://vercel.com/security). Riziko ukládání e-mailu bez doručení přehledu je výslovně zdokumentované podle rozhodnutí Jana.  
   **Návrh:** Bez další opravy pro toto kolo.

3. **Závažnost:** INFO  
   **Kde:** `/api/uklid`, `web/.env.example`, README, kolo 2 bod 4 a kolo 3 bod 4  
   **Problém:** **FIXED.** Denní úklid, ochrana pomocí `CRON_SECRET`, konfigurace cronu i návod k ověření jsou přítomné.  
   **Návrh:** Bez další opravy.

4. **Závažnost:** INFO  
   **Kde:** `web/vercel.json`, #2  
   **Problém:** **FIXED v konfiguraci.** Funkce mají region `fra1`; uložený log dokládá dřívější produkční hlavičku `fra1::fra1`.  
   **Návrh:** Bez opravy kódu; aktuální produkční region jsem znovu neověřil.

5. **Závažnost:** INFO  
   **Kde:** veřejná data, `/prehled`, #3 a #4, kolo 2 bod 3  
   **Problém:** **FIXED.** Veřejný klient nedostává ISIN ani odkazy na KID. Server ověřuje token, přehled má vlastní adresu, kopírování odkazu a opakování načtení bez nového formuláře.  
   **Návrh:** Bez další opravy.

6. **Závažnost:** INFO  
   **Kde:** srovnání, kalkulačka a formulář, #5 a #17  
   **Problém:** **FIXED.** Obě interakce vedou ke kontaktu. E-mail má automatické vyplnění a vlastní chybovou hlášku, hlavička tabulky vysvětluje nákladové sloupce.  
   **Návrh:** Bez další opravy.

7. **Závažnost:** INFO  
   **Kde:** reklamy a úvod, #6 až #8 a #10  
   **Problém:** **FIXED.** Riziko je v hlavních reklamních textech i zadání vizuálů, stav reklam je sjednocený. Podmínka e-mailu je uvedená, dostupnost fondů formulovaná opatrně a argument depozitářem odstraněný.  
   **Návrh:** Bez další opravy těchto nálezů.

8. **Závažnost:** INFO  
   **Kde:** úvod, kalkulačka, patička a přehled, #9 a #11, kolo 2 bod 6  
   **Problém:** **FIXED.** Měnové riziko a výzva přečíst KID jsou doplněné. Výpočet výslovně zahrnuje pouze správu a provoz a vylučuje transakční náklady.  
   **Návrh:** Bez další opravy.

9. **Závažnost:** INFO  
   **Kde:** API leadů a událostí, #12 a #13  
   **Problém:** **FIXED.** Lead a konverze vznikají atomicky, unikátní index brání duplicitě a opakování doplní případnou chybějící konverzi. Událost dostane vazbu na lead pouze při shodě relace.  
   **Návrh:** Bez další opravy.

10. **Závažnost:** INFO  
    **Kde:** měření a `funnel.sql`, #14 až #16  
    **Problém:** **FIXED.** Čitatel a jmenovatel používají stejnou kohortu, existuje metrika souhlasu a záložní `fetch`. UTM se zachytí jednou, zásady se otevírají zvlášť a událost se jmenuje `overview_shown`.  
    **Návrh:** Bez další opravy.

11. **Závažnost:** INFO  
    **Kde:** `ratelimit.ts`, oba zapisovací endpointy, přijatý rate limit a kolo 2 bod 2  
    **Problém:** **FIXED.** Limity jsou 5 nových pokusů pro formulář a 300 událostí za hodinu. Kontrola a čerpání limitu jsou v transakci pod zámkem; postupné opakování existujícího klíče limit nečerpá.  
    **Návrh:** Bez další opravy v přijatém rozsahu.

12. **Závažnost:** INFO  
    **Kde:** data, texty a checklist, #18 až #20 a #25  
    **Problém:** **FIXED.** Datum reklamy, řazení, popis S&P 500, poznámka Net TR a veřejné zdroje odpovídají přijatému rozsahu. Procenta a data KID souhlasí s JSONem a textovými důkazy. Při 100 000 Kč vycházejí rozdíly 170, 40, 40 a 10 Kč.  
    **Návrh:** Bez další opravy; nový rozpor jsem nenašel.

13. **Závažnost:** INFO  
    **Kde:** patička, README a checklist, #21, #22 a #24  
    **Problém:** **FIXED v přijatém rozsahu.** Provozovatel a prohlášení o provizích jsou uvedení, právní otázky zůstávají výslovně ke kontrole. README vysvětluje rozhodnutí k zadání, náhradní export a hosting ostré kampaně.  
    **Návrh:** Bez další opravy.

14. **Závažnost:** INFO  
    **Kde:** exportér a uložené exporty, #23 a kolo 2 bod 5  
    **Problém:** **FIXED.** Exportér zkracuje vstupy pouze u zápisu souborů. V hlavním exportu ani exportech subagentů jsem nenašel zkrácené příkazy; omezení exportu jsou popsaná.  
    **Návrh:** Bez další opravy.

VERDIKT: CONSENSUS