Audit vychází z GitHub commitu `0cb76c2`. Lokální čtení a živou stránku blokovaly chyby nástrojů, proto nepotvrzuji aktuální nasazení ani vlastní běh testů. PDF a snímky důkazů jsem znovu neotevřel; proti kolu 2 jsou beze změny. Soubory jsem neměnil. Čísla # odkazují na diskusní log.

1. **Závažnost:** MAJOR  
   **Kde:** `web/app/zasady/page.tsx`, #1, kolo 2 bod 1  
   **Problém:** **PARTIAL.** Změna právního základu na oprávněný zájem neřeší nezbytnost ukládání e-mailu. Zájem o přehled lze měřit pseudonymně; odpovědi a vyřízení práv nevyžadují předem ukládat adresy všech návštěvníků. Posouzení nezbytnosti a poměření zájmů není doložené. [EDPB](https://www.edpb.europa.eu/system/files/2024-10/edpb_summary_202401_legitimateinterest_en.pdf).  
   **Návrh:** Doložit konkrétní účel vyžadující e-mail a příslušné posouzení. Praktická varianta je skutečně doručovat odkaz e-mailem a odpovídajícím způsobem vymezit uchování.

2. **Závažnost:** MAJOR  
   **Kde:** zásady, README, #1, nový rozpor  
   **Problém:** **PARTIAL.** Certifikace Vercelu v DPF je doložená. Tvrzení o smluvních doložkách ale stojí na DPA, které výslovně vymezuje zpracování pro zákazníky Pro a Enterprise; demo podle README používá Hobby. Obecné podmínky DPA začleňují odkazem, ale tento rozpor není vysvětlený. Netvrdím, že smlouva určitě chybí; její použitelnost pro tento účet není doložená. [DPA](https://vercel.com/legal/dpa), [podmínky, bod 10.1](https://vercel.com/legal/terms).  
   **Návrh:** Doložit použitelnou zpracovatelskou smlouvu a skutečný mechanismus předání. Zásady přizpůsobit doloženému stavu.

3. **Závažnost:** MINOR  
   **Kde:** `web/app/api/lead/route.ts`, #4, kolo 2 bod 3  
   **Problém:** **PARTIAL.** Postupné opakování existujícího klíče limit nečerpá. Souběžná opakování nového stejného klíče ale mohou všechna projít úvodním hledáním a spotřebovat více míst v limitu, přestože vznikne jediný lead.  
   **Návrh:** Pod stejným zámkem znovu ověřit klíč idempotence a limit čerpat pouze pro nový pokus.

4. **Závažnost:** MINOR  
   **Kde:** `web/.env.example`, README, `/api/uklid`  
   **Problém:** **FIXED v kódu** pro kolo 2 bod 4. Cron i ochrana tajemstvím jsou doplněné; log dokládá nastavení produkční proměnné. Nově ale `CRON_SECRET` chybí v návodu a vzoru prostředí. Nasazení podle README bude úklid odmítat stavem 401.  
   **Návrh:** Doplnit proměnnou a postup ověření úklidu.

5. **Závažnost:** INFO  
   **Kde:** `web/vercel.json`, #2  
   **Problém:** **FIXED.** Konfigurace používá `fra1`; diskusní log dokládá produkční hlavičku. V tomto kole jsem produkční region znovu nepotvrdil.  
   **Návrh:** Bez další opravy.

6. **Závažnost:** INFO  
   **Kde:** veřejná data, serverový přehled, #3 a #4  
   **Problém:** **FIXED.** Veřejný klient nedostává ISIN ani odkazy na KID. Přehled má vlastní adresu, kopírování odkazu a novou chybovou obrazovku s opakováním. Výhrada k souběžné idempotenci je v bodě 3.  
   **Návrh:** Zachovat současné oddělení dat.

7. **Závažnost:** INFO  
   **Kde:** srovnání, kalkulačka, formulář, #5 a #17  
   **Problém:** **FIXED.** Oba interaktivní prvky vedou k formuláři. E-mail má automatické vyplnění a vlastní chybu; hlavička vysvětluje nákladové sloupce.  
   **Návrh:** Bez další opravy.

8. **Závažnost:** INFO  
   **Kde:** reklamy a úvod, #6 až #8 a #10  
   **Problém:** **FIXED.** Riziko je v hlavních reklamních textech a zadání vizuálů. Podmínka e-mailu je uvedená, stav textů sjednocený, formulace dostupnosti zmírněná a argument depozitářem odstraněný.  
   **Návrh:** Bez další opravy těchto nálezů.

9. **Závažnost:** INFO  
   **Kde:** úvod, kalkulačka, patička, #9 a #11, kolo 2 bod 6  
   **Problém:** **FIXED.** Měnové riziko a výzva přečíst KID jsou na požadovaných místech. Výpočet výslovně omezuje náklady na správu a provoz a vylučuje transakční náklady.  
   **Návrh:** Bez další opravy.

10. **Závažnost:** INFO  
    **Kde:** API, měření, trychtýř, #12 až #16 a přijatý rate limit  
    **Problém:** **FIXED.** Lead a konverze se zapisují atomicky, příslušnost leadu se kontroluje, kohorty i souhlasy jsou sjednocené. UTM zůstávají zachované, beacon má zálohu a událost je `overview_shown`. Oba endpointy mají limit s atomickým čerpáním pod zámkem.  
    **Návrh:** Bez další opravy kromě bodu 3.

11. **Závažnost:** INFO  
    **Kde:** data, veřejné texty, checklist, #18 až #20 a #25  
    **Problém:** **FIXED v přijatém rozsahu.** Datum reklamy, řazení, popis S&P 500, poznámka Net TR a veřejné zdroje jsou doplněné. Textová procenta odpovídají JSONu a textovým důkazům; nové rozpory v opravených textech jsem nenašel.  
    **Návrh:** Bez další opravy.

12. **Závažnost:** INFO  
    **Kde:** patička a README, #21, #22 a #24  
    **Problém:** **FIXED v přijatém rozsahu.** Provozovatel a prohlášení o provizích jsou uvedení, MAR zůstává k právní kontrole. README vysvětluje rozhodnutí k zadání, náhradní export a hosting ostré kampaně. Nová smluvní výhrada je v bodě 2.  
    **Návrh:** Bez další opravy původních nálezů.

13. **Závažnost:** INFO  
    **Kde:** exportér a uložené exporty, #23, kolo 2 bod 5  
    **Problém:** **FIXED.** V hlavním exportu ani exportech subagentů jsem nenašel zkrácené příkazy. Zkracování zapisovaného obsahu a výsledků je popsané.  
    **Návrh:** Bez další opravy.

Odložení double opt-in při neposílání novinek přijímám. Další odložené či odmítnuté body neotevírám.

VERDIKT: CONTINUE