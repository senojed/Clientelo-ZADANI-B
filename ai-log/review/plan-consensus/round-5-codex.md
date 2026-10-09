## BLOCKING

- Bod 9 + reklamy: plán počítá s finanční reklamou na ETF, ale nemá rozhodnutí, zda Meta/Google vůbec dovolí spuštění bez ověření/certifikace inzerenta. „Zkontrolovat“ nestačí. Fix: do soboty explicitní go/no-go pro každou platformu; pokud certifikace nutná, reklamy označit jako koncept, ne „zítra spustitelné“.

- Bod 6/7: měření „celé cesty“ přes serverové funkce bez cookies je popsáno, ale není jasné, jak se technicky zachová pořadí událostí a vazba na `lead_id`, když session ID žije jen v paměti a stránka může reloadnout mezi interakcí a formulářem. Fix: definovat konkrétní event payload, lifecycle session ID, kdy se přidá `lead_id`, a fallback při reloadu.

## IMPORTANT

- Bod 6 vs bod 10: úložiště je jednou „primárně Neon“, ale v otevřených otázkách je stále „konkrétní úložiště leadů rozhodnout“. To je nejasné vlastnictví. Fix: buď Neon uzavřít jako rozhodnutí, nebo bod 6 označit jako preferenci do ověření.

- Bod 6: záloha Formspree/Tally mění zpracovatele, region, právní základ a tok PDF brány. Plán říká, že smí degradovat lead/PDF, ale neříká, jak se aktualizují privacy texty a README. Fix: přidat samostatný fallback checklist pro privacy, procesory a UX.

- Bod 11: „žádný aplikační kód do splnění datové brány“ je pořád vysoké riziko vzhledem k mezeře v TypeScript/Next.js a sedmidennímu deadlinu. Fix: minimálně dovolit technický spike bez doménových dat: formulář, DB, deployment, event endpoint, prázdný layout.

- Bod 3/6: PDF za e-mailem bez skutečného odeslání e-mailu je slabší lead magnet. Uživatel může zadat falešný e-mail a stáhnout hned. Je to přijatelné demo jen pokud se to v README přizná jako zásadní limit kvality leadů, ne drobné omezení. Fix: přidat „lead quality risk“ a doporučené produkční řešení.

- Bod 4: „KID pro EU retail nenalezen“ může být pro českého investora pořád zavádějící, pokud existuje KID pro jiné třídy, jiné burzy nebo dokument na stránce distributora. Fix: přesně vymezit, že se ověřuje konkrétní US ETF/ISIN, ne celý index ani značka fondu.

- Bod 8: reklamní háky jsou zatím spíš informační než konverzní. Neříkají dost jasně, proč má člověk kontakt odevzdat hned. Fix: přidat konkrétní výstup do textu reklamy: „PDF checklist + tabulka 3–5 ETF a UCITS alternativ“.

- Bod 16: „MĚLO BY být: ověření pravidel reklamních platforem“ je špatně zařazené. Bez něj nelze tvrdit „mohli bychom zítra spustit reklamu“. Fix: přesunout do MUSÍ.

## NITS

- Bod 5: plovoucí tlačítko i vedlejší CTA v úvodu mohou na mobilu působit agresivně. Fix: jeden jasný primární směr, druhý až po náhledu hodnoty.

- Bod 8: „očekávaná konverze“ bez benchmarku bude slabá. Fix: i když nebude veřejný benchmark, uvést vlastní odhad s předpoklady a citlivostí, ne jen interval.

- Bod 12: „Codex odpovídající export“ je neurčité. Fix: definovat přesný náhradní formát, pokud export není dostupný.

## VERDICT
CHANGES_NEEDED