## BLOCKING

- Bod 11, rozhodovací brána na zadání A: Plán stále počítá s přepnutím na jiné zadání, pokud B datově nevyjde. To je vysoké riziko, protože odevzdání pak nemusí odpovídat zadanému úkolu. Suggested fix: záloha má být degradovaná verze B, ne A: např. 3 ověřené ETF, bez PDF designu, statické HTML, menší interakce.

## IMPORTANT

- Bod 6, „souhlas se zpracováním e-mailu pro zpřístupnění přehledu“: GDPR formulace je právně slabá. Pokud je e-mail nutný pro získání přehledu, „souhlas“ nemusí být svobodný a je zbytečný. Suggested fix: použít právní základ „plnění žádosti uživatele / předání slíbeného přehledu“, checkbox nahradit potvrzením seznámení se zásadami; souhlas použít jen pro marketing, který zde není.

- Bod 6 vs bod 7, soukromí: Plán říká „bez třetích stran“, ale zároveň používá Vercel a Neon jako zpracovatele. To je rozporné. Suggested fix: psát přesně „bez reklamních a analytických třetích stran; technické zpracování přes Vercel a Neon“.

- Bod 5 a 16, interakce jako povinné minimum: „Výběr dvou fondů“ může na mobilní reklamní návštěvě zvyšovat tření. Zadání chce konverze, ne nutně kalkulačku. Suggested fix: interakci navrhnout tak, aby výchozí výsledek byl okamžitě vidět a výběr fondů byl volitelný; v prioritách explicitně říct, že při škrtání zůstane statický modelový příklad.

- Bod 9, compliance „zítra reklama“: Plán připouští, že při nutné certifikaci budou reklamy jen koncept. To je v napětí s hlavním hodnoticím kritériem. Suggested fix: README musí jasně rozlišit „technicky připravené k reklamě“ vs „právně/platformně nespustitelné bez certifikace“ a nepoužívat formulaci, že kampaň lze zítra reálně spustit.

- Bod 12, `ai-log`: Redakce absolutních cest a osobních údajů může znehodnotit požadavek na export práce s AI, pokud nebude zachována ověřitelnost. Suggested fix: ponechat strukturu příkazů, relativní cesty v repu a časovou posloupnost; redigovat jen citlivé části, ne technický kontext.

## NITS

- Bod 3: „PDF přehled 3 až 5 amerických ETF“ a zároveň „hlavní tabulka jsou právě NYSE ETF“ je terminologicky nečisté. Suggested fix: konzistentně používat „US-listed ETF obchodované na NYSE/NYSE Arca“.

- Bod 11: „PageSpeed“ a „Lighthouse“ se střídají. Suggested fix: držet jeden název metriky a uvést konkrétní testovací režim: Lighthouse mobile na produkční URL.

## VERDICT

CHANGES_NEEDED