# Round 3 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné nové)

### IMPORTANT
- Bod 7: i `sessionStorage` je přístup k úložišti zařízení. Oprava: identifikátor relace jen v paměti stránky (proměnná), nic se neukládá. (Opraveno.)
- Bod 6: chybí datový model. Oprava: tabulky `leads` a `events`, souhlas s časem a verzí textu. (Opraveno.)

### NITS
- Konzistence "3 až 5 ETF" a "NYSE a NYSE Arca" v celém plánu. (Opraveno.)

## On Codex's points
### Agreed + fixed
- Blocking 1 (privacy specifikace): přidána minimální specifikace (správce, účel, právní základ, rozsah, uchování, zpracovatelé, mazání testovacích dat po hodnocení).
- Blocking 2 (sessionStorage a ePrivacy): identifikátor držen jen v paměti stránky; README uvede, že řešení neprošlo právní kontrolou.
- Important: výroba PDF (export z InDesignu, záloha HTML tisk, deadline úterý, záloha stránka za e-mailem), shortlist 8 až 10 tickerů a vyřazovací pravidla, ověření burzy z oficiální listing stránky, vedlejší CTA "Poslat mi celý přehled" v úvodu, přejmenování výsledku kalkulačky, omezení podepsaného tokenu (bez čitelného e-mailu, nejde odvolat), degradace při záloze Formspree/Tally, upravené háky reklam, pravidla platforem pro reklamy, nedělní napojení formuláře na úložiště, průběžná redakce `ai-log` (surové exporty mimo repo).
- Nits: "Registrace" přejmenováno na "Formulář", "3 až 5 ETF" konzistentně.

### Agreed but already addressed
- (žádné)

### Disagreed
- Nit "jen jedno repo místo dvou": repozitáře už jsou založené (soukromé, prázdné), režie je nulová, ponecháno.
- Important "lead ask nad foldem příliš pozdě": přijata jen vedlejší CTA bez dominantního formuláře; dominantní formulář nad foldem by odporoval požadavku, aby byla hodnota zřejmá před formulářem. Poměr se řeší A/B hypotézou.

## Claude VERDICT
`CHANGES_NEEDED` (po opravách zbývají možná už jen drobnosti; čekám na kolo 4).

## Summary for log
Doplněny: privacy specifikace a datový model, identifikátor relace jen v paměti, výroba PDF a záloha, shortlist a vyřazovací pravidla ETF, ověření burzy z listing stránky, vedlejší CTA v úvodu, přejmenování výsledku kalkulačky, upravené reklamní háky, platformní pravidla reklam, průběžná redakce ai-log. Nepřijato: jen jedno repo; dominantní formulář nad foldem.
