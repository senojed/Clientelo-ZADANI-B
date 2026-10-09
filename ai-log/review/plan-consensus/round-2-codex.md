## BLOCKING

- Bod 6 + 13: „formulář opravdu doručí lead“ je závislé na úložišti, které není rozhodnuté. Bez konkrétní volby nelze navrhnout datový model, limity, deploy env vars, test ani rollback. Fix: do plánu dát deadline s tvrdou volbou a fallbackem: např. primárně Vercel Postgres/KV, fallback Formspree/Tally, včetně limitů a přesného testu doručení.

- Bod 7: „cookie lišta se nedělá“ je příliš kategorické. `sessionStorage` identifikátor + event tracking + lead_id je pořád online identifikátor / pseudonymní údaj; právní závěr „není třeba souhlas“ není ověřený. Fix: formulovat jako demo režim bez třetích stran, bez cookies, s minimalizací; na stránce přidat krátkou informaci o měření a v README jasně uvést, že pro ostrou reklamu je nutné právní ověření souhlasu/cookie režimu.

- Bod 9 + 10: právní/compliance ověření je odsunuté na otevřenou otázku, ale výsledek má být „zítra spustit reklamu“. U investiční lead-gen stránky je to kritické. Fix: zařadit samostatný úkol do harmonogramu do neděle/pondělí: ověřit minimálně pravidla pro investiční reklamu, disclaimer, zpracování leadů a marketingový souhlas; výsledek promítnout do copy a README.

## IMPORTANT

- Bod 4: „ETF z NYSE“ může být technicky nepřesné. Řada známých US ETF je obchodovaná primárně na NYSE Arca nebo Nasdaq, ne nutně „NYSE“ v užším smyslu. Fix: definovat přesně, zda zadání chápe NYSE jako NYSE/NYSE Arca, nebo vybrat jen opravdu NYSE Arca listované ETF a zdroj burzy uvést u každého.

- Bod 3: PDF obsahuje „úplnou tabulku“, ale stránka ukáže jen dva řádky. Riziko: uživatel nedostane dost hodnoty před formulářem a lead magnet působí jako paywall na základní informaci. Fix: před formulářem ukázat jasný užitek: 2 řádky + kalkulovaný příklad + viditelný seznam všech tickerů obsažených v PDF.

- Bod 5: interakce „výběr dvou fondů“ může být slabá pro mobilní reklamu, pokud vyžaduje přemýšlení. Fix: přidat defaultní scénář bez nutnosti vstupu, např. „Investuji 100 000 Kč na 10 let“ se sliderem jen jako doplněk.

- Bod 5/11: harmonogram je nekonzistentní. V neděli je „kostra Next.js“, v pondělí znovu „kostra Next.js“. Fix: rozdělit: neděle bootstrap + deploy skeleton, pondělí první produkční UI + data render.

- Bod 11: rozhodnutí „žádný kód do dat“ je pochopitelné, ale rizikové vzhledem k TypeScript/Next.js mezeře a termínu. Už bylo rozhodnuto, takže nemá cenu znovu tlačit mock data, ale plán potřebuje kompenzaci. Fix: v sobotu připravit aspoň technický checklist, Vercel účet/projekt, repo strukturu, env názvy a ověřit prázdný deploy bez aplikačního kódu.

- Bod 6: podepsaný krátkodobý odkaz bez stavu neřeší opakované stažení po expiraci. Uživatel po odeslání může zavřít stránku nebo mít pomalý mobil. Fix: buď prodloužit platnost na rozumnou dobu, nebo po odeslání zobrazit jasné „stáhnout nyní“, případně umožnit znovu odeslat e-mail.

- Bod 6: „omezení počtu požadavků“ není specifikované. Na Vercelu bez perzistentního store nemusí být rate limit spolehlivý. Fix: určit implementaci: např. Upstash/Vercel KV rate limit, nebo pouze honeypot + poznámka, že rate limit je demo omezení.

- Bod 8: očekávaná konverze „se zdrojem nebo odhad“ je málo konkrétní. Hodnotitel chce marketingové uvažování. Fix: předem určit interval a logiku, např. cold mobile traffic 2–6 %, target 4 %, s odůvodněním podle friction/value/compliance.

- Bod 12: `ai-log` redakce může poškodit požadavek „export konverzací“. Fix: uvést pravidla redakce: odstranit jen tajemství/osobní údaje, zachovat technické rozhodování, každou úpravu označit `[redacted]`.

- Bod 15: repo se má přepnout na veřejné, ale plán počítá s osobními cestami a ai-logy. Riziko úniku identity/soukromých informací. Fix: před prvním commitem nastavit pravidla: žádné absolutní lokální cesty v dokumentaci/logu, nebo je redigovat už průběžně.

## NITS

- Bod 2: pracovní headline je dlouhý a málo reklamní. Fix: testovat kratší variantu pro mobile hero, např. „Americké ETF: náklady a dostupnost v Česku“.

- Bod 4: „svět“ u US ETF může mást, protože mnoho globálních UCITS alternativ nebude přímá dvojice k US-listed ETF. Fix: u každé dvojice explicitně říct, podle čeho je alternativa zvolená.

- Bod 9: „data uložená rozumně (EU)“ je vágní. Fix: nahradit konkrétním požadavkem: region/EU provider ověřen, nebo riziko uvedeno v README.

## VERDICT

CHANGES_NEEDED