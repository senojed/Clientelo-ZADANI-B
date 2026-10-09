## BLOCKING

- Bod 11 vs bod 5: harmonogram říká v neděli „bootstrap Next.js“, ale bod 11 zároveň povoluje technický spike už v sobotu včetně nasazení. To je rozporné vlastnictví technického základu. Oprava: sjednotit, že Next.js projekt, Vercel deploy, formulář, Neon a `/events` vznikají už v sobotu; v neděli se jen naplní ověřenými daty a texty.

- Bod 6 / 7: fallback Formspree/Tally a současně „měření událostí se nesmí ztratit minimálně do logu serverové funkce“. Pokud se přejde na statické HTML nebo externí formulářovou službu, není jasné, kde běží serverová funkce pro eventy. Oprava: definovat minimální neměnnou architekturu pro měření i při fallbacku, např. Vercel serverless `/api/events` zůstává vždy, i když lead jde přes Tally/Formspree.

- Bod 9: plán připouští, že pokud žádná platforma nevyhoví, README to jen řekne otevřeně. To koliduje s jádrem zadání „mohli bychom na ni zítra spustit reklamu“. Oprava: pokud sobotní go/no-go nenajde aspoň jednu realisticky spustitelnou reklamní cestu, musí se změnit positioning nebo kanál, ne pouze přiznat selhání v README.

## IMPORTANT

- Bod 4: „svět“ jako možná kategorie ETF je pravděpodobně problematický pro NYSE/NYSE Arca párování s UCITS alternativou. US-listed world ETF často nebude čistě srovnatelné s UCITS MSCI World/ACWI podle indexu, domicilu a expozice. Oprava: buď svět vyřadit z kandidátů, nebo předem povolit jen „nejbližší alternativa“ s jasným upozorněním, že nejde o stejný index.

- Bod 4 / 5: plán chce „žádné řazení ETF“, ale zároveň výběr 3 až 5 fondů a pořadí řádků na stránce. I pořadí v tabulce může působit jako implicitní doporučení. Oprava: uvést neutrální řazení, např. abecedně podle tickeru nebo podle typu expozice, a vysvětlit v metodice.

- Bod 6: token „bez ukládání stavu“ a zároveň rozsah v tokenu. Není jasné, jak se zabrání použití starého tokenu po aktualizaci PDF/dat nebo jak se řeší změna verze přehledu. Oprava: přidat `version`/`pdf_version` do tokenu a server akceptuje jen aktuální nebo explicitně povolené verze.

- Bod 6: e-mail se „nikam neposílá“, ale text „E-mail použijeme jen ke zpřístupnění přehledu“ je nepřesný, protože přehled se zpřístupní okamžitě v prohlížeči a e-mail slouží hlavně jako lead identifikátor. Oprava: formulace typu „E-mail uložíme jako kontakt a hned ti zobrazíme celý přehled.“

- Bod 7: měření `page_view` bez storage znamená nová relace po reloadu a ztráta vazby. To je přiznané, ale dopad na „celou cestu od přichodu po odeslání“ není kvantifikovaný. Oprava: v README uvést, že měření je přesné jen v rámci jedné nepřerušené návštěvy bez reloadu; případně použít sessionStorage a cookie/GDPR riziko popsat.

- Bod 8: reklamy mají obsahovat cílení, ale plán neřeší věk, citlivé finanční segmenty ani omezení cílení na platformách. Oprava: přidat minimální cílení v souladu s pravidly platformy, včetně vyloučení nezletilých a opatrného zacházení s finančními zájmy.

- Bod 9: compliance zmiňuje ČNB/ZPKT/ESMA, ale není jasný výstup: co přesně musí být ověřeno a podle čeho se rozhodne, že text není investiční doporučení. Oprava: vytvořit konkrétní checklist formulací: zakázaná slova, povolená tvrzení, povinná disclaimer věta, kontrola tabulek a reklam.

- Bod 11: pátek 9. 10. obsahuje „výběr ETF“, zatímco sobota má kandidátní shortlist a ověření dat. To svádí k předčasnému výběru bez zdrojů. Oprava: pátek přejmenovat na „návrh kandidátů“, finální výběr až po ověření.

- Bod 12: „ai-log od prvního dne“ může obsahovat tento plán a revize, ale zadání chce export konverzací s Claude Code. Není jisté, že Codex/plan-consensus log bude akceptovaný jako ekvivalent. Oprava: výslovně oddělit `ai-log/claude-code/`, `ai-log/codex/`, `ai-log/review/` a v README vysvětlit původ každého.

## NITS

- Bod 3: „úplná tabulka všech ETF v přehledu“ je tautologické. Stačí „úplná tabulka ETF v přehledu“.

- Bod 5: „vedlejší odkaz Zobrazit celý přehled na formulář“ může vypadat jako okamžité zobrazení bez e-mailu. Lepší text: „Získat celý přehled“.

- Bod 16: „děkovná stránka“ je nepřesné, protože bod 6 říká bez nové adresy na stejné stránce. Sjednotit na „děkovná část“.

## VERDICT

CHANGES_NEEDED