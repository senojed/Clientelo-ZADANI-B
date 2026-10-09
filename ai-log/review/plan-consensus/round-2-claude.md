# Round 2 — Claude critique

## Claude's own findings
### BLOCKING
- (žádné nové)

### IMPORTANT
- Bod 12: nebylo ověřeno, že `/export` vůbec funguje v tomto prostředí (desktopová aplikace). Zadání požaduje `ai-log` s exportem. Oprava: úkol v pátek ověřit `/export`, jinak náhradní způsob uložení konverzace. (Opraveno.)
- Bod 6: databáze na free tarifu se může pozastavit nebo omezit v době hodnocení. Oprava: volba Neon před Supabase (u Supabase se podle dostupného zdroje po týdnu nečinnosti pozastavuje), zkušební průchod formuláře v den odevzdání. (Opraveno.)
- Bod 6: hosting Vercel Hobby je podle dostupných zdrojů jen pro nekomerční použití. Oprava: poznámka do README (demo ano, ostrá kampaň ne). (Opraveno.)

### NITS
- (žádné)

## On Codex's points
### Agreed + fixed
- Blocking 1 (úložiště): tvrdá volba Neon (Postgres z Vercel Marketplace) + záloha Formspree/Tally, limity ověřit při zakládání, test doručení.
- Blocking 2 (cookies kategorické): formulace "demo režim bez třetích stran a bez cookies, s minimem údajů", informace o měření v zásadách ochrany osobních údajů, README upozorní na nutnost právního ověření.
- Blocking 3 (compliance odsunuté): samostatný úkol v sobotu/neděli, výsledek do textů a README.
- Important: NYSE vs. NYSE Arca (vykládám jako obě, burza u každého ETF, Nasdaq ne), PDF paywall (seznam tickerů a vypočítaný příklad viditelné), výchozí scénář interakce, nekonzistence harmonogramu (neděle bootstrap + deploy, pondělí produkční UI), kompenzace za nepsání kódu v sobotu (technický checklist a prázdné nasazení bez aplikačního kódu), platnost odkazu 24 h a tlačítko "Stáhnout nyní", rate limit jen s Upstash jinak poznámka, logika očekávané konverze, pravidla redakce ai-log, žádné absolutní cesty v commitovaných dokumentech.
- Nits: kratší varianta nadpisu, zdůvodnění výběru UCITS dvojice, region úložiště.

### Agreed but already addressed
- (žádné)

### Disagreed
- Important "konverze 2 až 6 %, cíl 4 %": číslo bez zdroje by byl vymyšlený benchmark. Přijato jen určení logiky a intervalu s odůvodněním, číslo z benchmarku jen se zdrojem, jinak označeno jako odhad.
- Important "mock data a kostra před bránou": Codex sám uznal, že rozhodnutí padlo. Kompenzace přijata (checklist, prázdné nasazení).

## Claude VERDICT
`CHANGES_NEEDED` (několik oprav právě proběhlo, čeká na kolo 3, jestli nevyjdou další blokující body).

## Summary for log
Plán má teď konkrétní volbu úložiště (Neon, záloha Formspree/Tally), vyřešené cookies jako demo režim s informací o měření, compliance ověření v sobotu/neděli, upřesněné NYSE vs. NYSE Arca, výchozí scénář interakce, konzistentní harmonogram, platnost odkazu 24 h a pravidla redakce `ai-log`. Nepřijat: konkrétní číselný benchmark konverze bez zdroje.
