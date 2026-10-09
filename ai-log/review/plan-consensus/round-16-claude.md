# Round 16 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné)

### IMPORTANT
- (žádné nové; rozhodnutí Jana o přípravách A s kostrou kódu zapsáno do bodu 14)

### NITS
- (žádné)

## On Codex's points
### Agreed + fixed
- Výpočet poplatků: definovaný vzorec (částka × rozdíl TER), předpoklady uvedené na stránce, doba investování v minimu vypuštěna.
- Odeslání a konverze: `form_submit_attempt` (klient) oddělen od `lead_created` (server po uložení, to je konverze); klíč idempotence brání duplicitám.

### Agreed but already addressed
- (žádné)

### Disagreed
- (žádné)

## Claude VERDICT
`CONSENSUS`.

## Summary for log
Codex (nový model gpt-6.1-sol) měl jen 2 IMPORTANT, oba opraveny: vzorec kalkulačky a oddělení pokusu od úspěšné konverze s idempotencí.
