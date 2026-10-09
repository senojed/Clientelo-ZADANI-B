## BLOCKING

- Bod 6 + 7: děkovná stránka a `pdf_download_clicked` nejsou technicky dotažené. Po odeslání formuláře se buď přejde na novou stránku, nebo se drží SPA stav; plán neříká jak se `lead_id` dostane na děkovnou stránku bez uložení v prohlížeči. Bez toho se nemusí změřit cesta až ke stažení. Oprava: explicitně zvolit jeden tok: server po submitu vrátí `lead_id` a signed download token, klient zůstane ve stejné SPA relaci; nebo thank-you URL obsahuje krátkodobý signed token a server podle něj zapíše `pdf_download_clicked`.

## IMPORTANT

- Bod 6: „zaslání přehledu na základě souhlasu“ je právně nepřesné, pokud se přehled nezasílá e-mailem, ale zpřístupní se po formuláři. Souhlas se zpracováním nemusí být správný právní základ; vhodnější může být plnění požadavku uživatele / předsmluvní krok, souhlas zvlášť jen pro další marketing. Oprava: upravit wording na „zpřístupnění přehledu“ a nevyžadovat zbytečný GDPR souhlas jako podmínku, pokud nejde o newsletter.

- Bod 6: formulář má „e-mail, souhlas se zasláním a zpracováním“, ale plán současně říká, že skutečné odesílání e-mailů nebude. To je UX i compliance rozpor. Oprava: CTA a checkbox formulovat podle reality: „Zobrazit celý přehled“ / „Souhlasím se zpracováním e-mailu pro zpřístupnění přehledu“. Pokud se e-mail neposílá, neslibovat zaslání.

- Bod 7: plán tvrdí „anonymní technické měření“, ale po submitu se události spojují s `lead_id` a lead obsahuje e-mail. To už není anonymní měření, minimálně po konverzi je pseudonymní/osobní. Oprava: přepsat privacy text a README: před odesláním pseudonymní relace, po odeslání vazba na lead/e-mail.

- Bod 9: „zítra reklama“ je stále slabé u finanční reklamy. Nestačí ověřit pravidla Meta/Google; chybí rozhodnutí, zda landing page může být považována za investiční doporučení / investiční průzkum / finanční propagaci podle českého/EU rámce. Oprava: přidat konkrétní redakční pravidlo: žádné řazení „nejlepší“, žádné skóre, žádné doporučení vhodnosti, srovnávat jen faktická data a jasně oddělit obecný vzdělávací obsah.

- Bod 4: „KID nenalezen“ u US ETF je metodicky opatrné, ale pro uživatele může být matoucí, pokud hlavní praktický závěr je dostupnost u EU retailu. Oprava: doplnit explicitní interpretaci: „nenalezen KID neznamená nemožnost nákupu u všech brokerů; znamená zvýšené riziko, že běžný EU retail nákup nenabídne“.

- Bod 11: otevřené rozhodnutí o technickém spike je pořád riziko, ne jen preference. Kandidát má deklarovanou mezeru v TypeScript/Next.js a plán začíná implementaci až v neděli. Oprava: technický spike v sobotu povýšit z otevřené otázky na povinný minimální úkol: prázdný deploy, env vars, endpoint submitu, zápis testovací události. Bez doménových dat.

- Bod 16: „MĚLO BY být: kontrola Lighthouse na reálném mobilu“ je špatná priorita. Zadání je mobilní reklama, několik sekund pozornosti; výkon a mobilní použitelnost jsou konverzní základ, ne nice-to-have. Oprava: přesunout minimální mobilní kontrolu a Lighthouse/ruční průchod do MUSÍ; jen perfektní skóre může být MĚLO BY.

## NITS

- Bod 3: datum „úterý 13. 10.“ je chybně; 13. 10. 2026 je úterý ano, ale v harmonogramu je také „Út 13. 10.“. V pořádku, jen držet jednotný formát.

- Bod 8: reklama A je dlouhá a má slabý přímý benefit. Oprava: zkrátit na konkrétní výstup, např. „Americké ETF v Česku: poplatky, KID a UCITS alternativa v jednom přehledu.“

- Bod 12: „u Codexu odpovídající export“ je neurčité. Oprava: pojmenovat minimální akceptovaný formát: Markdown se zadáním, odpověďmi, použitými příkazy a redakcí.

## VERDICT
CHANGES_NEEDED