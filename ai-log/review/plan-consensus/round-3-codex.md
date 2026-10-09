## BLOCKING

- Bod 6 + 7: ukládání leadů a měření do Neonu znamená zpracování osobních údajů a pravděpodobně i přenos k dalšímu zpracovateli, ale plán nemá jasně určený obsah privacy textu, právní základ, dobu uchování, mazání dat ani DPA/subprocesory. „Demo“ to samo neřeší.  
  **Fix:** doplnit minimální privacy specifikaci: správce, účel, právní základ, rozsah dat, doba uchování, zpracovatelé, kontakt, mazání testovacích leadů po hodnocení.

- Bod 7: tvrzení „cookie lišta se nedělá“ je příliš kategorické. `sessionStorage` identifikátor pro analytiku může pořád spadat pod ePrivacy jako ukládání/čtení informací v zařízení, i když nejde o cookie. Bez ověření je to právní riziko.  
  **Fix:** buď měřit jen server-side bez client storage, nebo výslovně ověřit právní režim `sessionStorage` pro analytiku a dát to do README jako riziko/omezení.

## IMPORTANT

- Bod 3: „PDF za e-mailem“ je hlavní lead magnet, ale plán neřeší, jak bude PDF vytvořeno a zda bude vizuálně kvalitní. U kandidáta s DTP backgroundem je to příležitost, ale zároveň riziko času.  
  **Fix:** rozhodnout formát výroby: HTML tisk do PDF / ručně export z design toolu / generované PDF. Přidat deadline a fallback „úplné srovnání jako chráněná HTML stránka“.

- Bod 4: výběr ETF je pořád vágní. „S&P 500, celý trh, dividendy, svět“ může narazit na to, že některé populární fondy nejsou na NYSE/NYSE Arca nebo nemají čistou UCITS alternativu.  
  **Fix:** předem stanovit kandidátní shortlist 8–10 tickerů a vyřazovací pravidla. Jinak hrozí sobotní ztráta času.

- Bod 4: „zdroje správců, ne agregátory“ je správně, ale u burzy/kótování nemusí být factsheet správce nejvhodnější nebo aktuální.  
  **Fix:** pro burzu použít primárně NYSE/NYSE Arca listing stránku nebo oficiální listing dokument, správce jen jako doplněk.

- Bod 5: sekce začíná úvodem bez formuláře a s plovoucím tlačítkem na formulář. Pro mobilní traffic „několik sekund“ může být lead ask příliš pozdě, zvlášť když interakce je až třetí sekce.  
  **Fix:** doplnit nad foldem mikrohodnotu + sekundární CTA „Poslat celý přehled“, bez dominantního formuláře. A/B hypotéza nestačí, aktuální verze má být použitelná zítra.

- Bod 5: kalkulace „rozdíl průběžných nákladů z TER“ může být zavádějící, pokud se neřeší měna, tracking difference, spread, daň, broker fee a dostupnost. Plán říká, že nejde o celkové náklady, ale riziko nepochopení je vysoké.  
  **Fix:** výsledek pojmenovat např. „modelový rozdíl ročního poplatku fondu“, ne „kolik tě stojí“. U reklamy B upravit hák, protože „kolik tě opravdu stojí“ slibuje víc než výpočet dává.

- Bod 6: podepsaný odkaz bez stavu nejde odvolat a při sdílení funguje 24 hodin komukoli. Pro demo přijatelné, ale v plánu chybí explicitní bezpečnostní limit.  
  **Fix:** uvést jako vědomé omezení; token nesmí obsahovat e-mail v čitelné podobě, jen payload typu expirace + scope.

- Bod 6: „externí formulářová služba Formspree/Tally“ jako záloha může být v konfliktu s požadavkem na měření celé cesty a PDF gate.  
  **Fix:** popsat, co přesně záloha zachová: minimálně lead capture; měření/PDF gate může být degradované a musí být přiznané v README.

- Bod 8: reklama A „Zjisti, jestli ho koupíš“ je problematická, protože plán nechce tvrdit dostupnost u konkrétních brokerů. Bez broker-specific ověření návštěvník možná nedostane odpověď.  
  **Fix:** změnit slib na „Zjisti, proč může být dostupnost v EU problém a co ověřit u brokera.“

- Bod 9: compliance checklist neřeší reklamní pravidla platforem. Meta/Google mají vlastní pravidla pro finanční produkty, disclaimer a někdy ověřování inzerenta.  
  **Fix:** přidat kontrolu platform policy pro zvolené reklamy, aspoň jako README omezení.

- Bod 11: harmonogram je stále rizikový: Next.js, Neon, serverless PDF gate, měření, PDF, compliance a README jsou koncentrované do úterý/středy. Při TypeScript/Next.js mezeře je to těsné.  
  **Fix:** posunout technický skeleton a formulář na neděli hned po ověřených 3 dvojicích; PDF může být statický asset mimo public se serverovou ochranou později.

- Bod 12: `ai-log` redakce až ve čtvrtek je pozdě. Pokud export obsahuje citlivé údaje ve více souborech, může to blokovat zveřejnění repa.  
  **Fix:** redigovat průběžně po každém exportu nebo držet neveřejný originál a commitovat jen redigované kopie.

## NITS

- Bod 2: „Registrace jen e-mailem a souhlasem“ není registrace.  
  **Fix:** používat „formulář“ nebo „získání přehledu“.

- Bod 3: „5 ETF“ vs bod 4 „minimum 3“ může vypadat jako nesoulad.  
  **Fix:** formulovat „3–5 ETF podle ověřených dat“ všude konzistentně.

- Bod 11: „založení repozitářů“ množné číslo pro A i B zvyšuje režii.  
  **Fix:** pokud A není aktivní, stačí poznámka/plán A ve stejném soukromém pracovním prostoru.

## VERDICT

CHANGES_NEEDED