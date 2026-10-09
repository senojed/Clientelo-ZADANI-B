## BLOCKING

- Bod 9 + 13 + 16: Plán připouští, že výstup nebude právně/platformně spustitelný, jen „technicky připravený“. To je v přímém konfliktu s hlavním hodnoticím kritériem „mohli bychom na ni zítra spustit reklamu“.  
  Fix: definovat minimální akceptační stav jako „spustitelné alespoň na jedné konkrétní platformě po splnění známých požadavků“, nebo jasně zvolit kanál, kde certifikace není blokující.

- Bod 4 + 14: Přepnutí na zadání A při selhání dat znamená nedodat zadání B. To není záložní plán pro B, ale změna zadání.  
  Fix: záloha pro B má být degradované B: méně ETF, statický přehled, nebo vzdělávací landing page s ověřenými příklady. Zadání A držet mimo tento plán.

- Bod 6: Privacy text uvádí účel „zaslání přehledu“, ale plán zároveň říká, že e-mail se neposílá a přehled se zpřístupní okamžitě. To je nekonzistentní a právně slabé.  
  Fix: sjednotit všude na „zpřístupnění přehledu po odeslání e-mailu“, nebo skutečně posílat odkaz e-mailem.

## IMPORTANT

- Bod 11: Stále je otevřené rozhodnutí o technickém spike, přestože TS/Next.js je známá mezera a termín je krátký. „Žádný aplikační kód“ v sobotu je rizikové rozhodnutí, ne neutrální volba.  
  Fix: sobotní technický průchod databáze, formuláře, event endpointu a deploye povolit jako povinný, bez doménového UI.

- Bod 5 + 16: Interakce je v MUSÍ, ale zároveň je možné ji škrtat na statický příklad. To rozbíjí prioritu a rozsah.  
  Fix: buď dát interakci do MĚLO BY, nebo definovat minimální interakci jako statický předvyplněný výpočet bez ovládání.

- Bod 7: Měření „dojetí na sekce“ bez cookies a jen s in-memory session_id je proveditelné, ale plán neříká, jak se zabrání zahlcení eventy nebo duplicitám při scrollu.  
  Fix: uvést jednorázové odeslání na sekci, debounce/throttle a idempotenci na klientovi.

- Bod 6: Podepsaný token je bezstavový a neodvolatelný, ale plán neříká, jak se zabrání hádání nebo zneužití tokenu.  
  Fix: uvést HMAC/JWT se silným secret, expirací, scope, bez PII, kontrolou podpisu na serveru a žádným deterministickým tokenem z e-mailu.

- Bod 4: „KID nenalezen“ je metodicky popsané, ale chybí rozhodnutí, jak se bude zacházet s jazykovými/registračními mutacemi dokumentů u správců.  
  Fix: uvést, že se kontroluje oficiální dokumentová stránka konkrétního ISIN a region EU/PRIIPs, ne obecné vyhledávání webem.

- Bod 8: Očekávaná konverze je stále jen rámec. Zadání výslovně chce očekávanou konverzi, ne pouze metodiku.  
  Fix: plán musí říct, že README bude obsahovat konkrétní interval i bez benchmarku, jasně označený jako vlastní odhad.

## NITS

- Bod 2: „Nadpis bez absolutního tvrzení“ je správně, ale navržený nadpis je dlouhý pro mobilní reklamu.  
  Fix: primárně použít kratší variantu, delší nechat jako podnadpis.

- Bod 12: „odpovídající export u Codexu“ je neurčité.  
  Fix: předem definovat formát: markdown, datum, prompt, odpověď, příkazy, výsledek, redakce.

CHANGES_NEEDED