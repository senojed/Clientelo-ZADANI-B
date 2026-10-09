# Round 11 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné)

### IMPORTANT
- (žádné)

### NITS
- (žádné)

## On Codex's points
### Agreed + fixed
- Blocking 1: pracovní právní základ (zpřístupnění přehledu čl. 6 odst. 1 písm. b) GDPR, měření písm. f)), v README jen jako chybějící právní review; konkrétní znění informace a zásad v sobotu před implementací formuláře.
- Blocking 2: kandidáti na záložní reklamní kanál k ověření v sobotu (Seznam Sklik, LinkedIn) a vzdělávací sdělení bez propagace produktu.
- Important: NYSE Arca vysvětlit v README, burza u každého řádku; známost tickeru jako druhé kritérium výběru; metriky kvality leadů; token bez cesty k souboru (allowlist); klik na stažení přes `sendBeacon` před navigací; konkrétní cílení (ČR, čeština, 18+, široké cílení, pokud zájmy nejdou); sobota odlehčena (data, technický základ, compliance a znění informace), texty a reklamy v neděli; minimální rytmus commitů.
- Nit: podnadpis bez "co koupit místo nich".

### Agreed but already addressed
- Important "kompaktní e-mail box po interakci": plán už má "hned po výsledku nabídka přehledu s e-mailem".
- Nit "Lighthouse 90+ ne MUSÍ": už je tak (MUSÍ je ruční průchod a Lighthouse jako kontrola, cílové skóre v MĚLO BY).

### Disagreed
- Nit "odkaz v úvodu vést na náhled, ne na formulář": v kole 3 Codex sám chtěl vedlejší CTA na přehled v úvodu. Hlavní tlačítko už vede na náhled, vedlejší textový odkaz je pro rozhodnuté návštěvníky. Ponecháno, případně A/B hypotéza.

## Claude VERDICT
`CONSENSUS` z mé strany.

## Summary for log
Doplněn pracovní právní základ a termín pro znění informace, záložní reklamní kanály, vysvětlení NYSE Arca, sekundární kritérium známosti tickeru, metriky kvality leadů, allowlist pro token, sendBeacon, konkrétní cílení, odlehčená sobota, rytmus commitů. Nepřijato: přesměrování vedlejšího odkazu v úvodu (Codex ho dříve sám navrhl).
