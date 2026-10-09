## IMPORTANT

- Bod 6/7, `lead_id` v klientovi: plán neříká, že `lead_id` musí být neprůhledný a neuhodnutelný. Pokud bude sekvenční ID z DB, půjde odhadovat počet leadů a podvrhovat eventy k cizím leadům. Oprava: používat veřejné `lead_public_id` jako UUID/ULID, DB interní ID nikdy neposílat klientovi; eventy po submitu validovat proti aktuální `session_id`.

- Bod 6, nepovinný marketingový checkbox: text „Lead tak má i obchodní hodnotu pro další kontakt“ je v napětí s tím, že bez souhlasu se e-mail použije jen ke zpřístupnění přehledu. Oprava: rozlišit hodnotu leadu pro vyhodnocení zájmu/demo a skutečné marketingové oslovení jen při explicitním souhlasu.

- Bod 9, „spustitelné aspoň na jedné platformě“: pořád není definováno, co přesně znamená „projde“ u záložních kanálů. Hrozí pozdní zjištění, že finance/investice spadají do omezení i tam. Oprava: do sobotního výstupu dát konkrétní zdroj pravidel, konkrétní zakázané/povolené formulace a stav: bez certifikace lze / nelze spustit.

- Bod 11/16, Lighthouse jako MUSÍ/MĚLO BY: v harmonogramu jsou cílové hodnoty výkonu konkrétní, v prioritách je „dosažení cílových hodnot“ jen MĚLO BY. To je v pořádku, ale README musí jasně rozlišit „měřeno“ vs. „splněno“. Oprava: MUSÍ = výsledek měření a screenshot/report; MĚLO BY = dosažení prahů.

## NITS

- Bod 2, nadpis je věcný, ale slabý pro mobilní reklamu. Připravit ostřejší variantu dřív než až jako A/B hypotézu, jinak první obrazovka může působit jako encyklopedie.

- Bod 4, „svět“ jako nejbližší alternativa: u S&P 500 / US market by to mohlo být zavádějící. V README explicitně uvést, že nejde o ekvivalent, jen praktickou náhradu pro srovnání.

- Bod 12, „odpovídající export“ u Codexu je neurčité. Stačí dopsat minimální konkrétní postup: uložený Markdown/transkript + použité příkazy + výsledek.

## VERDICT
CHANGES_NEEDED