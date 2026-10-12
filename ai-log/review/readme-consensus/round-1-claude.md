# Kolo 1: kritika Claude

## Vlastní nálezy
### IMPORTANT
- README nemá nahoře přímou odpověď na hlavní otázku zadání ("mohli bychom zítra spustit reklamu?"); stav byl jen "probíhají poslední kontroly". Přidána sekce "V kostce".
- Hlas je smíšený (Jan ve třetí osobě i "jsem"): sjednoceno do první osoby autora.
- Sekce AI duplikuje body (Nástroje, Postup, Jak jsem kontroloval) a pokyny agentům jsou obecné, zadání chce "jaké pokyny dostali agenti": sloučeno, pokyny odkazují na konkrétní soubory v repu.
- Konverzní odhad je tabulka bez struktury: rozložen na dva měřené kroky (dojede k formuláři, odešle), čísla sedí s původní tabulkou.
- Audit 2 (2 kola) v README chyběl.
### NITS
- Chyběla mapa repozitáře; přidána krátká tabulka.

## K bodům Codexu
- **Agreed + fixed:** BLOCKING (odpověď nahoře, formulace přizpůsobena), "koupit jde" (nahrazeno), repo je zatím soukromé (uvedeno), délka a opakování (sloučeno, Meta přesunuta do checklistu, licence videa zkrácena), zobecnění o druhé kontrole (nahrazeno doložitelným závěrem), "zobrazení formuláře" a definice konverze v SQL, pořadí návodu ke spuštění (`.env.local`, migrace, dev), nits (superlativ u tickerů, "spustitelné" doplněno o náhled a schválení Metou, odkaz lze zkopírovat a během 24 h znovu otevřít, tón: bez "double check jako při lezení", české výrazy, CAPTCHA).
- **Disagreed:** nic. Poznámka: README má i po úpravách kolem 2 400 slov; u odevzdávaného README, které musí pokrýt povinné části zadání, je to přijatelné díky sekci "V kostce".

## Claude VERDICT
CHANGES_NEEDED (před úpravami; po úpravách čekám na kolo 2)

## Shrnutí pro log
README přepsáno: nahoře odpověď na otázku zadání, stav a soukromé repo, konverze rozložená na dva měřené kroky, sloučená a konkrétnější sekce o práci s AI, přehlednější "Co chybí" (před kampaní vs. omezení dema), návod ke spuštění v pořadí, mapa repa; Meta a CAPI přesunuty do `compliance/checklist.md`.
