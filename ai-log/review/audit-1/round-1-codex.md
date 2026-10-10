**Ne, zítra bych reklamu nespouštěl.** Zásady mají podstatné mezery, veřejný klient dostává data údajně chráněná tokenem a měření může ztrácet nebo nesprávně přiřazovat konverze. Audit vychází z GitHub větve `main`, commit `336ab6b`; lokální soubory ani živá stránka nebyly kvůli chybám přístupu dostupné. Shodu s lokální verzí, provozní průchod a obsah uložených PDF proto nemohu potvrdit.

1. **Závažnost:** BLOCKER  
   **Kde:** `web/app/zasady/page.tsx:13`, `:23`, `:35`  
   **Problém:** Zásady neuvádějí právní základy jednotlivých účelů, oprávněný zájem měření ani právo podat stížnost u ÚOOÚ. Události nazývají „anonymní“, přestože je propojují s kontaktem. Doplnění samotného kontaktního e-mailu tyto nedostatky nevyřeší. Požadavky stanoví [článek 13 GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng).  
   **Návrh:** Oddělit zpřístupnění přehledu, uchování kontaktu, měření a newsletter. U každého stanovit účel a právní základ, doplnit příslušná práva a používat označení „pseudonymní“. Posoudit také nezbytnost ukládání e-mailu, který se k doručení přehledu nepoužívá.

2. **Závažnost:** MAJOR  
   **Kde:** `web/components/Srovnani.tsx:72`, `web/components/Kalkulacka.tsx:77`, `data/overeni.md:53`, `:112`  
   **Problém:** Čísla odpovídají JSONu, ale označení „roční náklady“ zakrývá další náklady uvnitř fondů. Důkazy uvádějí u alternativy DIA dalších 0,01 % transakčních nákladů a u alternativy VT 0,02 %. Kalkulačka pro VT ukazuje 70 Kč a rozdíl 10 Kč při 100 000 Kč, přičemž tyto dodatečné náklady nezmiňuje.  
   **Návrh:** Srovnávanou položku přesně pojmenovat jako správní a provozní náklady. Samostatně uvést odhad transakčních nákladů fondu a výslovně říci, že výsledek není rozdílem všech nákladů.

3. **Závažnost:** MAJOR  
   **Kde:** `web/lib/etf.ts:3`, `:8`, `web/components/Landing.tsx:9`, `web/components/Srovnani.tsx:5`  
   **Problém:** Klientské komponenty importují celý `web/data/etf.json`, včetně ISIN a odkazů na KID. Tato data se tím dostávají do veřejného JavaScriptu. Token chrání endpoint `/api/prehled`, ale ne samotný obsah přehledu, jak tvrdí README.  
   **Návrh:** Vytvořit samostatná veřejná data pouze pro náhled. Úplná data držet v serverovém modulu a poskytovat je výhradně po ověření tokenu.

4. **Závažnost:** MAJOR  
   **Kde:** `web/app/api/lead/route.ts:39`, `:50`, `:54`  
   **Problém:** Uložení leadu a události `lead_created` nejsou atomické. Pokud první zápis uspěje a druhý selže, formulář vrátí chybu. Opakování najde existující lead, ale chybějící konverzi už nedoplní. Kontakt zůstane uložený a měření ho nezapočítá.  
   **Návrh:** Oba zápisy provést v jedné transakci. Konverzní události přidat unikátní vazbu na lead, aby bezpečné opakování nemohlo vytvořit duplicitu.

5. **Závažnost:** MAJOR  
   **Kde:** `web/app/api/events/route.ts:22`, `:26`, `web/db/schema.sql:22`  
   **Problém:** API přijme libovolné UUID jako `lead_id`. Nekontroluje existenci leadu ani jeho příslušnost k `session_id`, přestože PLAN tuto kontrolu požaduje. Události lze přiřadit k nesouvisejícímu nebo neexistujícímu kontaktu.  
   **Návrh:** Ověřovat dvojici lead a relace na serveru, přidat cizí klíč a vazbu po odeslání chránit podepsaným identifikátorem.

6. **Závažnost:** MAJOR  
   **Kde:** `web/lib/validate.ts:65`, `web/app/api/lead/route.ts:14`, `web/app/api/events/route.ts:6`, `README.md:96`  
   **Problém:** Veřejné zapisovací endpointy nemají omezení četnosti. Kontrola `Origin` proti `Host` nebrání automatizovanému klientovi poslat stejné hlavičky; honeypot lze vynechat. Útočník může plnit databázi kontakty a událostmi a vyčerpat bezplatné limity.  
   **Návrh:** Před kampaní doplnit trvalý rate limit a omezení velikosti požadavků. Kontrolu původu popisovat jako ochranu proti cizím webovým stránkám, nikoli proti botům.

7. **Závažnost:** MAJOR  
   **Kde:** `web/db/funnel.sql:17`, `:23`, `:25`, `web/lib/track.ts:41`  
   **Problém:** Čitatel konverze zahrnuje všechny relace s leadem, jmenovatel pouze relace se zachyceným `page_view`. Při ztrátě této události může konverze přesáhnout 100 %. Klient navíc ignoruje návratovou hodnotu `sendBeacon`, takže odmítnuté zařazení události neřeší. SQL také nevyhodnocuje druhou konverzi slíbenou v README, tedy lead s marketingovým souhlasem.  
   **Návrh:** Definovat společnou kohortu návštěv a samostatně hlásit neúplné relace. Ošetřit neúspěšné odeslání události a doplnit metriku skutečně uložených souhlasů.

8. **Závažnost:** MAJOR  
   **Kde:** `web/components/Srovnani.tsx:71`, `web/components/Landing.tsx:132`, `web/components/Prehled.tsx:59`  
   **Problém:** Před formulářem nejsou konkrétní odkazy ke srovnávaným údajům. „USA podle správce, EU podle českého KID“ a obecný seznam institucí v patičce neumožňují čísla ověřit. Konkrétní zdroje se zobrazují až po získání kontaktu.  
   **Návrh:** Do rozbalených řádků přidat odkazy na správce a příslušné dokumenty s datem ověření. Zdroj veřejného tvrzení nezamykat za formulář.

9. **Závažnost:** MAJOR  
   **Kde:** `ads/ad-a.md:7`, `ads/ad-b.md:7`, `web/components/Landing.tsx:63`  
   **Problém:** Reklamy a první obrazovka slibují přehled „zdarma“, ale neříkají, že úplný obsah vyžaduje e-mail. Podmínka se objeví až u formuláře. Návštěvník tak může očekávat okamžitý přístup bez poskytnutí kontaktu.  
   **Návrh:** Už v reklamě a úvodu uvést například „Srovnání hned, úplný přehled zdarma za e-mail“. Zachovat stejný slib v tlačítku a formuláři.

10. **Závažnost:** MAJOR  
    **Kde:** `web/components/Prehled.tsx:15`, `:23`  
    **Problém:** Při selhání načtení přehledu stránka návštěvníka vyzve k obnovení a novému odeslání formuláře. Platný token přitom stále má. Obnovením ztratí relaci a nový formulář vytvoří nový idempotentní klíč, tedy potenciálně další lead pro stejnou adresu.  
    **Návrh:** Nabídnout tlačítko „Zkusit načíst znovu“ používající existující token. Nový kontakt vyžadovat až při skutečně neplatném tokenu.

11. **Závažnost:** MAJOR  
    **Kde:** `ads/ad-a.md:8`, `ads/ad-b.md:8`, `compliance/checklist.md:19`  
    **Problém:** Ani jedna reklama neobsahuje upozornění na riziko ztráty. „Ne investiční doporučení“ tuto informaci nenahrazuje. Vlastní checklist přitom požaduje stejně viditelné přínosy a rizika, ale při kontrole reklam tento rozpor přehlíží.  
    **Návrh:** Krátké rizikové upozornění vložit do hlavního textu nebo přímo do kreativy. Nespoléhat na pole popisu, které se nemusí v každém umístění zobrazit.

12. **Závažnost:** MINOR  
    **Kde:** `web/lib/etf.ts:13`, `:14`  
    **Problém:** Popis S&P 500 jako „500 největších amerických firem“ je nepřesný. Výběr zahrnuje další podmínky a zohledňuje sektorové zastoupení; nejde jednoduše o prvních 500 podle velikosti. To potvrzuje [metodické vysvětlení správce indexu](https://www.spglobal.com/spdji/en/landing/investment-themes/the-500/).  
    **Návrh:** Použít „500 předních amerických společností“ a doplnit zdroj.

13. **Závažnost:** MINOR  
    **Kde:** `data/etf.json:25`, `design/positioning.md`, `web/components/Landing.tsx:63`  
    **Problém:** Stránka bez výhrady opakuje „stejný index“. Vlastní positioning ale u DIA rozlišuje cenový index a UCITS variantu s reinvesticí dividend; `data/overeni.md:51` zmiňuje Net TR. JSON toto rozlišení ztrácí.  
    **Návrh:** Uvést přesnou variantu benchmarku a stručně vysvětlit rozdíl. Obecný slib změnit na „stejné indexové zaměření“, kde nelze doložit shodnou variantu.

14. **Závažnost:** MINOR  
    **Kde:** `ai-log/README.md:19`, `:22`, `scripts/ai-log-export.py:12`, `:113`  
    **Problém:** Dokumentace tvrdí, že příkazy zůstávají beze změny. Exportér ale zkracuje vstupy nástrojů na 600 znaků, nejen výsledky na 400. Například příkaz s `codex exec` v hlavním logu na řádku 1837 je zkrácený. Část práce a pokynů tak není rekonstruovatelná.  
    **Návrh:** Zachovat celé redigované příkazy a relevantní kontrolní výstupy. Popsat přesně všechny ztráty při převodu a výslovně označit náhradní export za `/export`.

15. **Závažnost:** MINOR  
    **Kde:** `README.md:102`, `PLAN.md`, část hosting  
    **Problém:** Vercel Hobby je uveden jako hosting bez rozlišení mezi osobním demem a případným komerčním sběrem leadů. Pro komerční využití tento tarif podle [podmínek Vercelu](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage) určen není. Samotné nekomerční demo tím není zpochybněno.  
    **Návrh:** V README jasně vymezit demo režim a pro ostrou obchodní kampaň uvést vhodný tarif nebo hosting, jehož podmínky komerční použití dovolují.