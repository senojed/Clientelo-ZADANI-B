## BLOCKING

- Bod 9 / README akceptační stav: plán připouští, že reklamy budou jen „koncept“, pokud platforma vyžaduje certifikaci. To je v rozporu s hlavním kritériem zadání „mohli bychom na ni zítra spustit reklamu“. Fix: už v plánu určit aspoň jednu konkrétní použitelnou reklamní cestu/platformu nebo jasně přeformulovat rozsah tak, aby výstup nebyl prezentován jako zítra spustitelná kampaň.

- Body 2, 5, 8: stránka slibuje „dostupnost v Česku“, ale plán výslovně neověřuje dostupnost u brokerů. KID je jen silný indikátor, ne dostupnost. Riziko klamavého hlavního slibu. Fix: změnit hlavní slib na „KID, náklady a UCITS alternativa“; slovo „dostupnost“ používat jen s přesnou metodikou a omezením.

## IMPORTANT

- Bod 11: odmítnutí technického spike při známé mezeře v TypeScript/Next.js je stále špatné rozhodnutí. Start implementace až v neděli/pondělí nechává málo času na Vercel, Neon, server functions, event tracking, tokeny, PDF bránu a mobilní ladění. Fix: v sobotu povinně udělat minimální vertikální spike bez doménových dat.

- Bod 6: měkká brána dává PDF i falešnému e-mailu. To je přijatelné jako demo, ale pro lead-gen hodnotu zásadně slabé. Fix: README musí explicitně říct, že kvalita leadů není ověřená; lepší minimum je poslat odkaz e-mailem přes jednoduchou službu, pokud to čas dovolí.

- Bod 7: session_id jen v paměti ztratí vazbu při reloadu, návratu z reklamy, chybě formuláře nebo obnově stránky. Pro „měřit celou cestu“ je to křehké. Fix: buď přiznat jako omezení demo měření, nebo použít sessionStorage s privacy vysvětlením.

- Bod 6 / 7: „bez cookies, bez třetích stran“ je formulováno příliš sebejistě. Vercel/Neon/server logs jsou zpracovatelé a mohou obsahovat IP, user-agent, čas a URL. Fix: v privacy textu jasně uvést technické logy hostingu a jejich rozsah/nejistotu.

- Bod 4: výběr ETF „široce známé“ může vést k neporovnatelným dvojicím typu US total market vs UCITS proxy. Fix: definovat prioritu výběru podle kvality srovnatelnosti, ne podle známosti tickeru.

- Bod 8: očekávaná konverze „vlastní odhad vždy“ bez benchmarku může působit jako vymyšlené číslo. Fix: uvést interval jako hypotézu pro test, ne jako očekávání, pokud nebude zdroj.

- Bod 12: ai-log redakce může být časově náročná a právně citlivá. Fix: průběžně exportovat jen relevantní pracovní konverzace; README má popsat, co nebylo zveřejněno a proč.

## NITS

- Bod 3: „InDesign“ je riziko zbytečného DTP perfekcionismu. PDF může být kvalitní i z HTML; priorita je konverzní stránka.

- Bod 5: plovoucí tlačítko plus CTA v úvodu plus CTA po interakci může být na mobilu rušivé. Ověřit na reálném telefonu, případně ponechat jen sticky spodní CTA.

- Bod 15: dvě repa zvyšují režii. Pokud A není aktivní, stačí poznámky mimo veřejné repo.

## VERDICT

CHANGES_NEEDED