# Round 15 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné)

### IMPORTANT
- (žádné)

### NITS
- (žádné)

## On Codex's points
### Agreed + fixed
- Pole souhlasu v datovém modelu (`marketing_consent`, `consent_text_version`, `consent_ts`), bez souhlasu žádné kontaktování.
- Validace `/api/events` (allowlist událostí, délky polí a UTM, origin/referrer), podvržené události jako známé omezení dema.
- Důkaz u "KID nenalezen": přesná URL s filtrem a snímek nebo archivní kopie v `data/dukazy/`.
- Compliance zúženo na praktický checklist, podrobná právní rešerše mimo rámec dema.
- Lighthouse: povinný report a ruční průchod, skóre je cíl.
- Nits: konkrétní ostřejší varianta nadpisu, výčet údajů PDF před formulářem, poznámka o druhém repu.

### Agreed but already addressed
- (žádné)

### Disagreed
- (žádné)

## Claude VERDICT
`CONSENSUS`.

## Summary for log
Poslední kolo bez BLOCKING. Doplněna evidence souhlasu, validace event endpointu, důkazy k tvrzení o KID, zúžené compliance, sjednocený Lighthouse, ostřejší varianta nadpisu.
