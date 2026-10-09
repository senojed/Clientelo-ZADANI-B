# Round 4 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné nové)

### IMPORTANT
- Plán nemá pořadí škrtání při nedostatku času, přitom zadání výslovně žádá upřednostnit podstatné a uvést, co chybí. Oprava: nová sekce 16 s úrovněmi MUSÍ / MĚLO BY / MŮŽE. (Opraveno.)

### NITS
- (žádné)

## On Codex's points
### Agreed + fixed
- Blocking 1: záloha smí degradovat jen doručení leadu a PDF bránu, měření událostí zůstává (minimálně do logu funkce), jinak je záloha nepřijatelná.
- Blocking 2: metrika `pdf_requested` a `pdf_download_clicked`, otevření souboru se nedá měřit.
- Important: oddělené účely a právní základy (souhlas pro přehled, technické měření dema), akceptační kritérium EU region nebo popsané riziko a DPA/SCC, přesné prohledané zdroje u tvrzení o KID, deploynutý svislý průchod v neděli (nejpozději pondělí dopoledne), háky reklam navázané na obsah přehledu, konkrétní výstup z kontroly platformních pravidel, redakce ponechá prompty, odpovědi a chyby AI.
- Nits: cesty `ads/ad-a.md` a `ads/ad-b.md`, kontrola plovoucího tlačítka na malém displeji.

### Agreed but already addressed
- Nit "sjednotit 3 až 5 ETF": v bodě 3 a 4 jsou minimum a cíl popsané; ponecháno.

### Disagreed
- Important "odeslání odkazu e-mailem jako priorita": Jan rozhodl o jednoduchém řešení (děkovná stránka se stažením), skutečné e-maily jsou jen "může být". Měkká brána je v plánu výslovně přiznaná a půjde do README.

## Claude VERDICT
`CHANGES_NEEDED` (opravy právě proběhly; další kolo ukáže, zda zbývají jen drobnosti).

## Summary for log
Doplněno: měření i při záloze, přejmenované metriky PDF, oddělené právní základy, kritérium EU region, metodika u tvrzení o KID, nedělní svislý průchod, háky reklam navázané na obsah, výstup z kontroly platformních pravidel, pravidla redakce ai-log zachovávají důkaz práce s AI, sekce 16 s prioritami. Nepřijato: odeslání e-mailu jako priorita (rozhodnutí Jana).
