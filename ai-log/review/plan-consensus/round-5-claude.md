# Round 5 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné nové)

### IMPORTANT
- Plán už je rozsáhlý na týdenní demo. Hrozí přeinženýrování (privacy, platformy, fallbacky) na úkor hlavního cíle, tedy stránky, která opravdu sbírá kontakty. Sekce 16 (priority MUSÍ / MĚLO BY / MŮŽE) je záchranná síť; od teď přijímat jen to, co mění rozhodnutí, ne další pojistky. (Bez změny plánu, jen směr dalších kol.)

### NITS
- (žádné)

## On Codex's points
### Agreed + fixed
- Blocking 1: explicitní go/no-go pro Meta a Google v sobotu; při nutné certifikaci jsou reklamy v README označeny jako koncept.
- Blocking 2: definovaný payload události, životní cyklus `session_id`, kdy se přidá `lead_id`, chování po obnovení stránky.
- Important: úložiště uzavřeno jako rozhodnutí (Neon), kontrolní seznam při přechodu na zálohu, riziko kvality leadů a doporučené produkční řešení (double opt-in), ověření KID podle ISIN, konkrétní obsah přehledu v textu reklam, kontrola reklamních platforem přesunuta do MUSÍ.
- Nits: odhad konverze s předpoklady a citlivostí, náhradní formát exportu konverzace.

### Agreed but already addressed
- (žádné)

### Disagreed
- Important "technický spike v sobotu": je to rozhodnutí Jana. Do plánu jsem dal jako otevřenou otázku k rozhodnutí, nepřijímám ji sám.
- Nit "jedno primární CTA": vedlejší CTA v úvodu je textový odkaz, ne druhé tlačítko, a hodnota je nad foldem. Ponecháno.

## Claude VERDICT
`CHANGES_NEEDED` (jedna věc čeká na rozhodnutí Jana; ostatní opraveno, další kolo ukáže, zda zbývají jen nits).

## Summary for log
Doplněno: go/no-go pro reklamní platformy, definovaný event payload a životní cyklus session_id, Neon jako uzavřené rozhodnutí, riziko kvality leadů, ověření KID podle ISIN, konkrétní obsah přehledu v reklamách, odhad konverze s citlivostí, náhradní formát exportu. Čeká na Jana: technický spike v sobotu.
