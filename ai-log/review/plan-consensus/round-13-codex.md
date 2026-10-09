## IMPORTANT

- Bod 6, marketingový checkbox + „Lead tak má i obchodní hodnotu“: právně i konverzně rizikové. U junior assignmentu může působit jako zbytečné komplikování GDPR. Fix: checkbox ponechat jen pokud bude jasně oddělený, verzovaný souhlas a možnost neudělení bez dopadu; jinak ho škrtnout a obchodní hodnotu odvozovat z dobrovolně získaného e-mailu pro přehled.

- Bod 6/7, záloha měření „minimálně zapisuje do logu funkce“: logy Vercelu nejsou spolehlivé úložiště pro měření cesty a špatně se z nich dokládá výsledek. Fix: i záložní režim musí zapisovat eventy do trvalého úložiště, ideálně Neon; pokud Neon selže, označit měření jako nesplněné, ne jako log fallback.

- Bod 6, PDF v `private/` přes Next.js tracing: chybí akceptační detail runtime. Ve Vercelu nebude fungovat stejně v Edge runtime a Node serverless. Fix: explicitně použít Node.js runtime pro download endpoint, ověřit `fs` čtení na produkci, nebo rovnou použít Vercel Blob jako primární cestu.

- Bod 4, „KID pro EU retail nenalezen“: metodika je dobrá, ale chybí pravidlo pro různé dokumenty podle jurisdikce/jazyka a pro PRIIPs KID vs UCITS KIID/KID u alternativ. Fix: v datovém modelu rozlišit `us_priips_kid_status` a `ucits_kid_status`; nepoužívat jeden obecný sloupec „KID“, jinak hrozí matoucí tabulka.

- Bod 11, sobotní minimum: „nasazení, formulář, databáze a 3 ověřené dvojice“ je velmi agresivní vzhledem k ověřování dat, compliance a TS/Next gapu. Fix: definovat sobotní minimum jako technický průchod + alespoň 1 ověřená dvojice; 3 dvojice ponechat jako nedělní definitivní bránu. Jinak plán může zbytečně spustit paniku nebo předčasný switch na A.

## NITS

- Bod 5: vedlejší odkaz „Získat celý přehled“ míří na formulář ještě před ukázkou hodnoty. Je to přijatelné jako A/B kandidát, ale v hlavní variantě bych ho formuloval méně agresivně, např. „Co obsahuje celý přehled“.

- Bod 8: reklamy slibují „3 až 5 ETF“, ale pokud budou jen 3, může „5“ působit jako natahování. Fix: ve finálních reklamách použít přesné číslo podle hotových dat.

- Bod 13: „kontrolní seznam compliance je odškrtnutý“ může znít silněji než realita bez právní kontroly. Fix: „interní compliance checklist je vyplněný včetně známých rizik“.

## VERDICT

CHANGES_NEEDED