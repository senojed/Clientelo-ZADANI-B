# Round 7 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné nové)

### IMPORTANT
- (žádné nové)

### NITS
- Slovo "souhlas" zůstávalo na několika místech (tabulka rozhodnutí, compliance, datový model) i po změně formuláře. Sjednoceno na "informace o zpracování". (Opraveno.)

## On Codex's points
### Agreed + fixed
- Important GDPR: checkbox souhlasu odstraněn, místo něj krátká informace u tlačítka; právní kvalifikace označena jako neověřená.
- Important "bez třetích stran": přesné znění "bez reklamních a analytických třetích stran; technické zpracování přes Vercel a Neon".
- Important interakce jako tření: statický modelový příklad s výchozím výsledkem zůstává při škrtání.
- Important "zítra reklama" vs. koncept: README rozliší "technicky připraveno k reklamě" a "platformně nebo právně spustitelné jen po kontrole".
- Important redakce ai-log: zachovat strukturu příkazů, relativní cesty a časovou posloupnost.
- Nit PageSpeed vs. Lighthouse: sjednoceno na Lighthouse mobile na produkční URL.

### Agreed but already addressed
- Nit "terminologie NYSE ETF": plán používá "NYSE a NYSE Arca" konzistentně; ponecháno.

### Disagreed
- Blocking "záloha má být degradované B, ne A": plán už degraduje B (minimum 3 dvojice místo 5). Zadání A se zvažuje jen tehdy, když nejde ověřit ani 3 dvojice. Jan rozhodl o přípravě A jako záložním plánu.

## Claude VERDICT
`CHANGES_NEEDED` (jen jedno nesouhlasné blokující tvrzení Codexu, které odmítám s důvodem; ostatní opraveno).

## Summary for log
Odstraněn checkbox souhlasu (informace o zpracování místo něj), upřesněno "bez reklamních a analytických třetích stran", statický příklad při škrtání, rozlišení "technicky připraveno" vs. "platformně spustitelné", redakce zachová technický kontext, sjednocen Lighthouse. Nepřijato: záloha jako degradované B místo A (plán už B degraduje na 3 dvojice).
