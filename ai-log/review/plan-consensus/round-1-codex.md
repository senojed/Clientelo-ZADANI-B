## BLOCKING

- Bod 4 + 11: „Kód se nepíše, dokud nejsou ověřená data“ + první kód až Po 12. 10. je rizikové. Kandidát má TypeScript/Next.js gap, zbývají 3 pracovní dny na appku, měření, formulář, PDF gate, Vercel, README, testy. Fix: paralelně v pátek/sobotu založit minimální deployovanou kostru s mock daty a jasným TODO pro výměnu dat.

- Bod 4: rozhodovací brána „pokud nejde najít 5 dvojic, přepnout na zadání A“ je špatná pro deadline. Přepnutí v neděli večer znamená zahodit zadání B po 2 dnech a začít A pozdě. Fix: snížit scope B na 3 kvalitně ověřené páry + vysvětlit výběr, nebo použít ETF + UCITS alternativy s jednoznačně dostupnými zdroji; A nepřepínat tak pozdě.

- Bod 6: „soubor neleží ve veřejné složce“, „serverová funkce vydá jednorázový odkaz“, „úložiště leadů ověřit“ je nevyřešená architektura klíčové konverze. Na Vercelu zdarma není implicitní perzistentní storage. Fix: předem zvolit konkrétní jednoduché řešení: např. Vercel KV/Neon/Supabase free tier, nebo fallback: Formspree/Tally/Google Forms, pokud je přijatelné; popsat limity.

- Bod 7: „měří se anonymně vlastní serverovou funkcí“ bez cookies, bez identifikace člověka, ale současně „celá cesta od přichodu po odeslání formuláře“ a „otevření PDF“. Bez session ID nelze spolehlivě spojit události. Fix: definovat privacy-friendly session id v sessionStorage + event_id/lead_id, nebo přiznat měření agregované, nikoli celé cesty.

## IMPORTANT

- Bod 2/3/5: lead magnet kombinuje „NYSE ETF“ a UCITS alternativy, ale zadání chce porovnání ETF obchodovaných na NYSE. Přílišný důraz na UCITS může působit jako únik ze zadání. Fix: hlavní tabulka musí být NYSE ETF; UCITS dát jako „praktická dostupná alternativa pro EU retail“.

- Bod 3: „PDF přehled 5 ETF“ je slabá hodnota, pokud stránka už ukáže 2 kompletní řádky. Není jasné, proč by návštěvník e-mail dal. Fix: přidat konkrétní unlock: kompletní tabulka, checklist dostupnosti, kalkulačka nákladů podle částky, export, nebo „které alternativy hledat u brokera“.

- Bod 5: první sekce „úvod s e-mailem“ odporuje bodu 3 „o kontakt po ukázce hodnoty“. Fix: první obrazovka má mít slib + mini hodnotu + CTA na interakci; e-mail formulář až po náhledu nebo jako sekundární sticky CTA.

- Bod 5: „Texty a vizuál podle Janova návrhu“ je neurčité a riskuje odklad nejdůležitější části pro lead-gen. Fix: definovat konkrétní positioning, tone of voice, wireframe první obrazovky a mobilní flow už v plánu.

- Bod 7: rozhodnutí bez cookie lišty je jen částečně obhájené. I bez cookies může docházet ke zpracování osobních údajů, zejména IP v server logs a e-mail u konverze. Fix: mít jednoduché zásady ochrany osobních údajů a měřit bez třetích stran; v README nerozporovat „zítra reklama“ tvrzením „právní stav neověřen“.

- Bod 8: reklamní verze jsou jen háky, ne celé reklamy. Zadání chce dvě verze reklamy. Fix: dodat pro každou headline, primary text, description, CTA, vizuál/koncept, cílení, UTM a návaznost na hero.

- Bod 9: compliance seznam je příliš obecný. U investičního obsahu hrozí, že stránka bude působit jako investiční doporučení nebo zavádějící marketing. Fix: ověřit minimum: investiční upozornění, žádné personalizované doporučení, žádné „nejlepší ETF“, jasné „nejde o investiční radu“, data k datu ověření.

- Bod 11: „PageSpeed“ bez konkrétních metrik je slabé. Fix: cílit např. mobile Lighthouse Performance 90+, LCP < 2,5 s, CLS < 0,1, kontrola na reálném mobilu.

- Bod 12: „ai-log export konverzací“ může obsahovat citlivé údaje, interní poznámky nebo osobní informace. Fix: před zveřejněním repa udělat redakční kontrolu logů a v README uvést, pokud bylo něco začerněno.

- Bod 15: repo se přepne na veřejné až ve čtvrtek. Riziko, že ai-log, env příklady, data nebo osobní údaje uniknou. Fix: od začátku počítat s public-safe repo strukturou, `.env.example`, žádné skutečné leady v repu.

## NITS

- Bod 4: TER není vždy správný termín u US ETF; často se uvádí expense ratio. Fix: použít „expense ratio / OCF / TER podle zdroje“ a normalizovat vysvětlením.

- Bod 5: „rozdíl ročních nákladů z TER“ může zavádět, protože neřeší spread, FX, daň, tracking difference. Fix: explicitně pojmenovat jako „modelový rozdíl průběžných nákladů, ne celkové náklady investora“.

- Bod 10: „Vyřešeno“ u otevřených otázek mate. Fix: odstranit vyřešené body nebo přesunout do rozhodnutí.

- Bod 14: příprava zadání A přidává kognitivní zátěž. Fix: jen krátký exit kriterium, žádná práce na A, dokud B není skutečně zablokované.

## VERDICT

CHANGES_NEEDED