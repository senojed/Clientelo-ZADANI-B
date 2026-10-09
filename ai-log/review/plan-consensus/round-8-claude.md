# Round 8 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné nové)

### IMPORTANT
- (žádné nové)

### NITS
- (žádné)

## On Codex's points
### Agreed + fixed
- Blocking 3: účel v privacy specifikaci sjednocen na "zpřístupnění přehledu po odeslání e-mailu".
- Blocking 1 (akceptační stav reklamy): definován jako "spustitelné aspoň na jedné konkrétní platformě po splnění uvedených požadavků; pokud žádná nevyhoví, README to řekne otevřeně".
- Important: minimální interakce je předvyplněný výpočet (statický příklad), ovládání volitelné; omezení událostí (jednou za relaci, throttle); zpevněný token (HMAC, silný klíč, kontrola podpisu a expirace, ne deterministický z e-mailu); ověření KID na oficiální dokumentové stránce konkrétního ISIN, ne obecným hledáním; očekávaná konverze vždy jako konkrétní číselný interval označený jako vlastní odhad.
- Nits: krátký hlavní nadpis a delší podnadpis, definovaný formát exportu.

### Agreed but already addressed
- (žádné)

### Disagreed
- Blocking 2 ("záloha má být degradované B, ne A"): potřetí stejná výtka. Plán už B degraduje (minimum 3 dvojice). Zadání A zvažujeme jen tehdy, když nejde ověřit ani 3 dvojice. Rozhodnutí o A jako záložním plánu patří Janovi.
- Important "technický spike povinný": potřetí stejná výtka. Rozhodnutí patří Janovi, zůstává jako otevřená otázka v bodě 11.

## Claude VERDICT
`CHANGES_NEEDED` (zbývají jen dvě věci k rozhodnutí Jana; ostatní opraveno).

## Summary for log
Sjednocen účel zpracování, definován akceptační stav pro reklamu, minimální interakce, omezení událostí, zpevněný token, přesná metodika KID, číselný odhad konverze, krátký nadpis, formát exportu. Zůstávají dvě věci pro Jana: záloha A vs. degradované B a technický spike v sobotu.
