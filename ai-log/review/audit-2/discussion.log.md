# Audit 2: záznam diskuse (ping-pong)

Kolo 1 (12. 10. 2026, commit 192d7f6): Codex (`round-1-codex.md`, 9 nálezů) a Claude subagent bez kontextu (`round-1-claude.md`, 16 nálezů). Oba verdikt "NOT READY". Třídění: Claude (hlavní sezení), rozhodnutí o produktu a designu Jan. Cx = Codex, Cl = Claude auditor.

## Opraveno (commit 195c158 a 3535c31)

| Nález | Zdroj | Oprava |
|---|---|---|
| Pole e-mailu a výběr fondu mají na mobilu méně než 16 px, iPhone při zaostření stránku přiblíží (MAJOR u konverze) | Cl1 | `font-size: 16px` pro `input[type=email]`, `input[type=text]`, `select` do 767 px; výška polí a výška sekcí se nezměnily (změřeno 375×812) |
| Tvrzení "cookie lišta není potřeba" je odvozeno jen z absence cookies, ePrivacy se může vztahovat i na paměť stránky a identifikátory v URL (MAJOR) | Cx1 | README, zásady, checklist: bez kategorického tvrzení; bod pro právní kontrolu; zásady mluví o "cookies ani úložišti prohlížeče (identifikátor jen v paměti stránky)" |
| Export `ai-log` chybí pozdější sezení a designový chat (MAJOR u Cx, MINOR u Cl) | Cx3, Cl16 | Znovu vyexportováno všech 7 sezení a 13 subagentů; README ai-logu popisuje strukturu |
| Zásady uvádějí Neon jen regionem | Cl13 | Doplněno "Neon, Inc., USA"; bod pro právní kontrolu |
| Hodnoty Lighthouse v README (96, 2,4 s) nejsou doložené | Cl7 | Uložena i druhá a třetí měření (`docs/lighthouse/*-mereni-2.json`, `-3.json`) |
| README: "sekce se vejde celá na 375×812" je nepřesné | Cl8 | "zhruba jedna obrazovka" |
| Limit četnosti 5 leadů za hodinu na IP škodí mobilním sítím se sdílenou IP; limit se o půlnoci UTC vynuluje | Cl10, Cx7 | 20 leadů a 1000 událostí za hodinu; reset o půlnoci UTC popsán v README i v kódu |
| "Lead" = odeslání, stejný e-mail může vzniknout víckrát | Cl11 | README a poznámka s dotazem na unikátní e-maily v `funnel.sql` |
| Žádné bezpečnostní hlavičky | Cl12 | `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors 'none'` (nosniff, žádné vkládání do rámu) |
| Zbytky v repu: IP z osobní sítě v `allowedDevOrigins`, absolutní cesty v `design/texty/*.html`, nepoužité šablonové SVG, zastaralé `web/README.md`, 2,9 MB kopie cizí stránky IVV | Cl15, Cl14, Cx5 | `allowedDevOrigins` z proměnné `DEV_ORIGIN`; `design/texty` smazáno; SVG smazána; web/README opraveno; kopie IVV nahrazena doslovným výňatkem (`data/dukazy/2026-10-09-ivv-us-produktova-stranka.md`) |
| JSON tělo `null` nebo pole způsobí chybu serveru místo 400 | Cx6 | Kontrola typu těla v `/api/lead` a `/api/events` |
| Sledování sekcí: `isIntersecting` bez kontroly poměru viditelnosti | Cx4 | Přidána podmínka `intersectionRatio >= 0.3` |
| PLAN.md popisuje dva veřejné řádky a plovoucí tlačítko | Cx9 | Odchylky doplněny v "Aktuální stav" |
| Věta "Smí se nabízet v ČR" je právní závěr, který důkaz přímo neříká | Cl4 | Nadpis bodu změněn na "Je v seznamu ČNB" (text pod ním říká totéž věcně) |
| Brána "za e-mailem" je po zveřejnění repa jen ukázka (data a PDF jsou v repu veřejně) | Cl14 | Věta v README (Technické řešení) |

## Odmítnuto (s důvodem)

| Nález | Zdroj | Důvod |
|---|---|---|
| Reklama B 9:16: nadpis zasahuje do horních 250 px | Cx8 | Neplatí pro 9:16: v `ad-b-1080x1920.png` je nahoře logo na y ≈ 280 až 335 a nadpis začíná na y ≈ 400 (změřeno z obrázku). Codex zřejmě posuzoval formát 4:5, kde bezpečné zóny neplatí. |
| Slabá návaznost reklamy A na první obrazovku (čísla jsou až pod tlačítkem) | Cl6 | Vědomé rozhodnutí: úvod nese slib společný pro obě reklamy; hypotéza o tabulce hned v úvodu je A/B hypotéza č. 1 v README. |
| Historie gitu obsahuje absolutní cesty ve smazaných souborech | Cx5 | Nepřepisuji historii (změnila by všechny hashe commitů uvedené v záznamech auditů); cesta obsahuje jen uživatelské jméno, které je ve veřejném profilu. Rozhodne Jan. |
| Soukromé IP/limity: omezení událostí podle relace | Cl10 | Zjednodušeno na vyšší limity (viz výše). |

## Čeká na rozhodnutí Jana (jeho design, reklamy a PDF)

1. **PDF `web/private/prehled-etf.pdf` má 7 stran místo 5**, strany 6 a 7 jsou prázdné se zápatím "6 / 5" a "7 / 5" (Cl2). Smazat v InDesignu, znovu exportovat a nahradit soubor.
2. **Reklamy mají jen "Roční náklady"** (Cx2 MAJOR): u VT je v obrázku 0,07 %, ale KID uvádí navíc transakční náklady 0,02 %. Návrh: v obrázcích "Roční náklady na správu a provoz". Reklama B navíc ukazuje jen řádky VOO a VT (nejmenší rozdíl) a neříká, že alternativa je dražší; návrh "alternativy bývají dražší" (Cl5).
3. **Věta "Americká ETF jako VOO většinou nemají KID"** v úvodu a v PDF generalizuje z 4 fondů a starého zdroje (Cl3). Návrh: "U VOO, IVV, DIA ani VT jsme KID na stránce správce nenašli."
4. **Drobná písma** (hlavička tabulky 10 px, náklady 11 px, "Údaje ověřeny" 11 px), Cl9.
