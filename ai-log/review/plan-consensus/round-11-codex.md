## BLOCKING

- Bod 6 / 7: Plán ukládá e-mail a pseudonymní události bez ověřené právní kvalifikace a bez jasného minimálního textu privacy notice před odesláním. „Právní kvalifikace neověřena“ nestačí, protože formulář reálně sbírá osobní údaj. Oprava: před implementací definovat konkrétní znění informace u formuláře + zásad, právní základ aspoň pracovně jako čl. 6 odst. 1 písm. b/f GDPR, a v README přiznat nejistotu jen jako právní review gap, ne jako nevyřešený základ.

- Bod 9: „Zítra reklama“ je stále podmíněné a může skončit jako „koncept“. Zadání ale hodnotí, zda by šlo reklamu spustit. Plán nemá pevnou alternativní platformu/kanál, pokud Meta/Google finanční reklamu odmítnou nebo vyžadují certifikaci. Oprava: předem určit fallback reklamní cestu mimo regulované finanční reklamní režimy, např. čistě vzdělávací lead magnet propagovaný na LinkedIn/Reddit/Seznam nebo organický placený post, a popsat její konkrétní podmínky.

## IMPORTANT

- Bod 4: „NYSE a NYSE Arca“ může být správný výklad, ale zadání říká „ETF obchodované na NYSE“. Pokud většina vybraných ETF bude jen NYSE Arca, hodnotitel to může vnímat jako obcházení zadání. Oprava: v README explicitně vysvětlit, že NYSE Arca je primární ETF venue skupiny NYSE, a v datech uvést venue u každého řádku.

- Bod 4 / 5: Výběr ETF podle „srovnatelnosti dvojice“ může vytvořit přehled, který není pro českého retail investora nejzajímavější. Konverzní hodnota závisí na známých tickerech z reklamy. Oprava: kritérium doplnit o pravděpodobnou známost/hledanost tickerů, ale finální řazení nechat neutrální.

- Bod 5: Pořadí sekcí má formulář až po vysvětlení dostupnosti a znovu v závěru. To může na mobilní reklamní návštěvě ztratit konverze. Oprava: po interakci dát okamžitý kompaktní e-mail box; pozdější formulář ponechat jen jako opakování.

- Bod 6: Měkká brána s okamžitým zobrazením přehledu sbírá i falešné e-maily. Je to přiznané, ale není definováno, jak se v README vyhodnotí kvalita leadů. Oprava: přidat metriku „validně vypadající e-mail“, „stažení po odeslání“ a doporučení produkčně přejít na e-mail delivery/double opt-in.

- Bod 6: Token „bez ukládání stavu“ nejde odvolat a funguje komukoli. Pro demo přijatelné, ale chybí omezení rozsahu endpointu, aby token nestahoval libovolný soubor/verzi. Oprava: token nesmí nést cestu k souboru; jen `pdf_version` z allowlistu na serveru.

- Bod 7: Session ID jen v paměti stránky zhorší měření při reloadu, ale také při otevření PDF v nové kartě nebo návratu ze stažení. Plán to částečně přiznává, ale `pdf_download_clicked` může být nespolehlivé. Oprava: měřit klik na tlačítko před navigací a v README jasně říct, že nejde o měření skutečného stažení.

- Bod 8: Reklamy mají cílení „bez citlivých finančních segmentů“, ale není řečeno, jaké cílení se použije. Oprava: uvést konkrétní bezpečné cílení: ČR, 18+, jazyk čeština, zájmy obecně finance/investování jen pokud platforma dovolí, jinak broad + kreativní prefiltrace.

- Bod 11: Harmonogram dává compliance, data, technický spike, texty, wireframe, reklamy a README kostru do jedné soboty. To je rizikově přeplněné vzhledem k deadline a TypeScript/Next.js mezeře. Oprava: v sobotu prioritně technický průchod + data brána; reklamy a texty až po nedělním potvrzení dat.

- Bod 12: „Ai-log od prvního dne“ je správně, ale plán neříká, jak zachovat průběžnou historii commitů při větší práci generované AI. Oprava: přidat minimální commit rytmus: setup, data, UI, formulář, měření, README/logy.

## NITS

- Bod 2: Pracovní podnadpis „co koupit místo nich“ zní jako investiční doporučení. Oprava: „jakou UCITS alternativu porovnat“.

- Bod 5: „Získat celý přehled“ v úvodu může být příliš brzy vůči požadavku ukázat hodnotu před formulářem. Oprava: vést na náhled/interakci, ne přímo na formulář.

- Bod 11: „Lighthouse výkon 90+“ je vhodný cíl, ale ne MUSÍ. Mobilní reálný průchod je důležitější než skóre.

## VERDICT

CHANGES_NEEDED