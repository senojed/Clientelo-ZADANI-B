Ne, reklamu bych zítra nespouštěl. Zůstává nepodložené tvrzení o měření bez souhlasu, nepřesné označení nákladů v reklamách a neúplný export práce s AI. Přijatá omezení prvního auditu neopakuji. Kontroloval jsem GitHub `main` na commitu `192d7f6f` a všechny čtyři reklamní obrázky. Kvůli chybám nástrojů jsem nemohl ověřit lokální rozdíly, živý průchod, obsah finálního `web/private/prehled-etf.pdf` ani uložených KID; kontrolu těchto souborů proto nepotvrzuji.

1. **Závažnost:** MAJOR  
   **Kde:** `README.md:101`, `web/lib/track.ts:20`, `web/lib/track.ts:34`, `web/app/zasady/page.tsx`, část „Měření návštěvy“.  
   **Problém:** Závěr „Cookie lišta není potřeba“ je odvozen pouze z absence cookies. Kód přitom vytváří identifikátor relace v paměti, čte `fbclid` a odesílá propojené události. Pravidla ePrivacy zahrnují také dočasnou paměť a sledovací identifikátory v URL. Samotný oprávněný zájem podle GDPR tuto otázku neřeší. Výjimka pro toto konkrétní měření není doložená. [Pokyny EDPB 2/2023, body 37–38 a 49–53](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf).  
   **Návrh:** Odstranit kategorické tvrzení. Nepovinné měření spouštět po souhlasu, případně doložit použitelnou výjimku pro konkrétní implementaci a upravit zásady.

2. **Závažnost:** MAJOR  
   **Kde:** `ads/ad-b-1080x1350.png`, `ads/ad-b-1080x1920.png`, `ads/ad-b.md:7`; obdobné označení v reklamě A.  
   **Problém:** Obrázky uvádějí obecné „Roční náklady“. U alternativy k VT zobrazují 0,07 %, ale `data/overeni.md:112` uvádí ještě transakční náklady 0,02 %. Hodnota 0,07 % odpovídá datům pro správu a provoz, její označení však působí jako celkové roční náklady. Upřesnění přidané po prvním auditu na stránku se do finálních reklam nepřeneslo.  
   **Návrh:** V obrázcích i reklamních textech uvést „Roční náklady na správu a provoz“ a čitelně doplnit „bez transakčních nákladů fondu“.

3. **Závažnost:** MAJOR  
   **Kde:** `ai-log/claude-code/hlavni-session.md:10867`, `ai-log/README.md:5`, `README.md:111`.  
   **Problém:** Hlavní export končí 10. 10. 2026 v 09:51 UTC. Chybějí následná sezení k implementaci designu, opravám mobilu, optimalizaci fontů, výrobě PDF a dokončení reklam. Jejich existenci dokládají pozdější commity, například `48daa60c`, `9ec3d0c3`, `4264dca1` a `27f0aa97`. Souhrn chyb a časový log nenahrazují požadované konverzace.  
   **Návrh:** Doplnit redigované exporty všech pozdějších relevantních sezení a aktualizovat jejich seznam v `ai-log/README.md`.

4. **Závažnost:** MINOR  
   **Kde:** `web/components/Landing.tsx:35`, `web/components/Landing.tsx:134`, `web/db/funnel.sql:11`.  
   **Problém:** Observer kontroluje pouze `isIntersecting`, takže událost odešle i při dotyku okraje sekce s obrazovkou. Nastavení `threshold: 0.3` samo nezaručuje kontrolu třetinové viditelnosti. Navíc se „zobrazení formuláře“ měří na celé sekci začínající vysvětlením, přestože samotný formulář ještě nemusí být vidět. Metrika `formular_videl` proto nadhodnocuje skutečné zobrazení formuláře. [Specifikace Intersection Observer](https://w3c.github.io/IntersectionObserver/#update-intersection-observations-algo).  
   **Návrh:** Kontrolovat také `intersectionRatio >= 0.3` a formulář sledovat samostatným observerem na jeho skutečném prvku.

5. **Závažnost:** MINOR  
   **Kde:** `design/texty/texty-komplet.html:2`, `design/texty/pdf-prehled-text.html:2`; historie commitu `0142a890`.  
   **Problém:** HTML obsahují absolutní cesty začínající `file:///C:/Users/Honza/Nextcloud/Jan/Work/Clientelo/`. Zveřejňují osobní strukturu složek a odkazy na fonty fungují pouze na autorově počítači. Stejné cesty zůstávají v historii smazané složky `design/reklamy-v2/`. To odporuje pravidlu v `PLAN.md:112`.  
   **Návrh:** Generovat relativní odkazy. Před zveřejněním opravit současné soubory a redigovat dotčené historické verze; pouhé smazání nebo `.gitignore` historii nevyčistí.

6. **Závažnost:** MINOR  
   **Kde:** `web/app/api/lead/route.ts:27`, `web/app/api/events/route.ts:20`.  
   **Problém:** Platné JSON tělo `null` projde parsováním a následně způsobí neobslouženou výjimku při přístupu k vlastnostem nebo destrukturování. API tak na neplatný vstup odpoví chybou serveru místo 400. Typ `Record<string, unknown>` neprovádí kontrolu za běhu.  
   **Návrh:** Po parsování ověřit, že tělo je nenulový objekt a není pole. U `/api/lead` doplnit také vlastní limit velikosti těla.

7. **Závažnost:** MINOR  
   **Kde:** `web/lib/ratelimit.ts:14`, `web/lib/ratelimit.ts:32`, `README.md:148`.  
   **Problém:** Otisk IP obsahuje aktuální datum UTC. O půlnoci vznikne nový klíč a předchozí pokusy se přestanou započítávat, přestože spadají do poslední hodiny. Jedna IP tak může kolem půlnoci vytvořit 10 nových leadů během několika minut oproti deklarovaným pěti za hodinu.  
   **Návrh:** Započítat při přechodu dne také předchozí otisk, nebo výslovně dokumentovat reset limitu o půlnoci.

8. **Závažnost:** MINOR  
   **Kde:** `ads/ad-b-1080x1920.png`, `ads/ad-b.md:22`.  
   **Problém:** Dokument tvrdí, že obsah leží mimo horních 250 px. Nadpis obrázku B začíná přibližně kolem 210 px, takže do této rezervy zasahuje. Deklarovaná bezpečná oblast není dodržena.  
   **Návrh:** Posunout nadpis pod 250 px a ověřit skutečné překrytí rozhraním v náhledu každého používaného umístění.

9. **Závažnost:** MINOR  
   **Kde:** `PLAN.md:7`, `PLAN.md:36`, `PLAN.md:51`.  
   **Problém:** Plán tvrdí, že aktuálně platí pouze vyjmenované odchylky, ale stále popisuje dva veřejné řádky a plovoucí tlačítko formuláře. Implementace zveřejňuje všechny čtyři řádky a plovoucí tlačítko nemá.  
   **Návrh:** Doplnit tyto odchylky do aktuálního stavu nebo původní návrh jednoznačně označit jako historický.

VERDIKT: NOT READY