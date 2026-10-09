## BLOCKING

- Bod 6, formulář/právní účel: plán sbírá e-mail, ale zároveň říká „žádný marketing“ a jen zpřístupnění přehledu. To znamená, že lead je komerčně téměř nepoužitelný pro následný kontakt, což jde proti lead-gen cíli zadání. Oprava: rozhodnout účel leadu. Buď přiznat, že jde jen o demo stažení, nebo přidat jasný samostatný marketingový opt-in / legitimní následný kontakt a popsat právní základ, text u formuláře a dopad na konverzi.

## IMPORTANT

- Bod 6, neveřejný PDF soubor: plán neříká technické uložení neveřejného PDF na Vercelu. „Soubor neleží ve veřejné složce“ nestačí; serverless build nemusí soubor přibalit nebo bezpečně číst. Oprava: určit konkrétně `private/` přibalené přes Next/Vercel tracing, nebo Vercel Blob/private storage; přidat test signed downloadu na produkci.

- Bod 7, měření bez cookies: tvrzení „při ostrém nasazení by byla nutná cookie lišta a souhlas před měřením“ je příliš absolutní. U měření bez ukládání do zařízení je problém primárně GDPR/legitimate interest, ne nutně cookie souhlas. Oprava: formulovat přesněji: právně neověřeno; cookie souhlas hlavně při cookies/localStorage/pixelech nebo reklamních třetích stranách.

- Bod 9, „zítra reklama“: plán připouští, že pokud platformy neprojdou, README to jen přizná. To je slabé proti hlavnímu hodnoticímu kritériu. Oprava: mít povinný minimální kanál, který půjde obhájit jako spustitelný bez certifikace, např. vzdělávací lead magnet na LinkedIn/Sklik se schválenými formulacemi, nebo jasně přepnout positioning.

- Bod 4, výběr UCITS alternativ: „nejbližší alternativa“ může být metodicky sporná a působit jako doporučení, pokud není rigidně definovaná. Oprava: předem definovat algoritmus výběru: stejný index, stejný správce pokud existuje, jinak nejbližší index podle popisu; bez subjektivního „lepší“.

- Bod 11, harmonogram: sobota obsahuje data, compliance, GDPR, technický spike, Vercel, Neon, formulář a znění privacy. To je moc na jeden den vzhledem ke skill gapu v Next/TS. Oprava: vymezit sobotní minimum: deploy + formulář + DB + 3 ověřené dvojice; zbytek přesunout nebo označit jako škrtatelné.

- Bod 16, priority: „dvě reklamy“ jsou MUSÍ, ale bez ověřené platformní spustitelnosti mohou být jen koncept. Oprava: MUSÍ má být „dvě reklamy + u každé status: spustitelné / koncept / blokováno a proč“.

## NITS

- Bod 2: nadpis „Americké ETF: náklady, KID a UCITS alternativa“ je přesný, ale suchý. Pro mobilní reklamu může být málo silný. Oprava: připravit jednu ostřejší variantu bez zavádějícího slibu.

- Bod 3: PDF obsahuje hodně metodiky. Riziko: pro mobilního retail návštěvníka bude působit těžce. Oprava: PDF začít jednoduchou tabulkou a checklist dát až za ni.

- Bod 12: „Codex odpovídající export“ je nejasné. Oprava: definovat konkrétní formát pro Codex log, protože `/export` nemusí existovat stejně jako v Claude Code.

## VERDICT

CHANGES_NEEDED