# Round 1 — Claude critique

## Claude's own findings
### BLOCKING
- Bod 4: tvrzení "KID neexistuje" se nedá doložit zdrojem, dokládá se jen absence. Oprava: stránka a PDF píšou "KID pro EU retail nenalezen k datu X" a v plánu je popsaná metoda hledání. (Opraveno.)
- Bod 6: úložiště leadů a PDF brána byly nedořešené. Oprava: PDF brána bez stavu (podepsaný krátkodobý odkaz), úložiště se rozhoduje do soboty večer, jmenovaní kandidáti a záloha. (Opraveno.)

### IMPORTANT
- Bod 6: veřejný formulář bez ochrany (boti zaplní úložiště). Oprava: honeypot a omezení počtu požadavků. (Opraveno.)
- Bod 7: bez identifikátoru relace se nedá sledovat celá cesta. Oprava: náhodné ID v `sessionStorage` + `lead_id`, přiznané jako pseudonymní měření jedné návštěvy. (Opraveno.)
- Bod 5: rozpor mezi "o kontakt po ukázce hodnoty" a "úvod s e-mailem". Oprava: úvod bez formuláře, e-mail po náhledu a výsledku interakce, e-mail v úvodu jako A/B hypotéza. (Opraveno.)
- Bod 12: `ai-log` může obsahovat osobní údaje (e-mail, cesty). Oprava: redakční kontrola před zveřejněním. (Opraveno.)

### NITS
- Terminologie nákladů (expense ratio / TER / OCF), "modelový rozdíl průběžných nákladů". (Opraveno.)

## On Codex's points
### Agreed + fixed
- Blocking 2 (brána pozdě): práh snížen na minimum 3 ověřené dvojice, předběžná brána v sobotu večer.
- Blocking 3 (architektura formuláře a úložiště): viz výše.
- Blocking 4 (měření bez ID): viz výše.
- Important: lead magnet slabý (přidán obsah PDF: úplná tabulka, kontrolní seznam dostupnosti, vysvětlení), úvod vs. moment žádosti, texty a vizuál konkretizovat (positioning, wireframe v sobotu), reklamy jako úplné (pole), compliance konkrétněji, PageSpeed metriky (výkon 90+, LCP pod 2,5 s, CLS pod 0,1), `ai-log` redakce, repo bezpečné pro zveřejnění od začátku.
- Nits: TER terminologie, popisek kalkulačky, přesun "vyřešeno" z otevřených otázek.

### Agreed but already addressed
- Important "NYSE vs. UCITS": plán už říkal, že NYSE ETF jsou podstatná část a UCITS doplněk. Upřesněno, že hlavní tabulka jsou NYSE ETF a UCITS je sloupec.

### Disagreed
- Blocking 1 (kostra s mock daty už v pátek/sobotu): Jan výslovně rozhodl, že se nekóduje před ověřenými daty (a B se může opustit). Přijato jen to, co jde: kostra začíná hned po splnění brány, klidně v sobotu večer, a riziko je v plánu uvedeno jako vědomě přijaté. Mock kostra před bránou by byla zbytečná, pokud se přepne na A.
- Important "právní stav neověřen" podkopává "zítra reklama": část přijata (přeformulováno na "řešení neprošlo právní kontrolou"), ale přiznání mezery zůstává, protože právní kontrola opravdu neproběhla a zadavatel oceňuje poctivost.
- Nit bod 14 (přípravy A přidávají zátěž): Jan rozhodl o přípravě A po dokončení příprav B. Ponecháno, s omezením "jen pokud zbude čas".

## Claude VERDICT
`CHANGES_NEEDED` (původní plán měl blokující mezery; po opravách čeká na kolo 2).

## Summary for log
Plán výrazně upřesněn: konkrétní obsah lead magnetu, bezstavová PDF brána, měření s ID relace, metoda pro tvrzení o KID, spam ochrana, sníženo minimum na 3 dvojice, moment žádosti o e-mail po ukázce hodnoty, kompletní pole reklam, metriky výkonu, redakce `ai-log`. Nepřijato: mock kostra před bránou (rozhodnutí Jana) a vypuštění příprav A.
