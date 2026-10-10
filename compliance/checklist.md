# Compliance checklist a pravidla reklamních platforem

Stav k 10. 10. 2026 (aktualizováno po auditu 1). Praktický kontrolní seznam pro demo, **ne právní posouzení**. Právní rámec je ověřen jen obecně; před reálnou kampaní je nutná kontrola právníkem.

**Pro právní kontrolu před kampaní:** zda srovnání jmenovitých fondů s důvody "proč alternativa" není investiční doporučení podle nařízení MAR (čl. 3 odst. 1 bod 35) s povinností zveřejnit střet zájmů; identifikace provozovatele webu; právní základ uložení e-mailu; předání údajů do USA (Vercel).

## 1. Pravidla reklamních platforem (go/no-go)

| Platforma | Co platí pro reklamu na investiční informace s cílením na ČR | Verdikt |
|---|---|---|
| **Meta** (Facebook, Instagram) | Speciální kategorie reklam je pro Evropu (včetně ČR) povinná jen u **úvěrů**; "investment services" jsou povinně ve speciální kategorii jen v USA [1]. Ověření inzerenta finančních služeb Meta vyžaduje jen v zemích na seznamu (Austrálie, Hongkong, Indie, Irsko, Izrael, Španělsko, Tchaj-wan, Thajsko, Spojené království, USA); ČR na něm není [2]. Obecně: cílení 18+, soulad s místními zákony, Meta může požadovat doložení oprávnění tam, kde je zákon vyžaduje [3]. | **GO** bez certifikace (k 10. 10. 2026), po kontrole textů podle bodu 2. Riziko: ruční zamítnutí při review. |
| **Google Ads** | Ověření inzerentů finančních služeb (Financial Services Verification) platí od roku 2026 i pro ČR, kategorie "Investment" výslovně [4][5]. Bez ověření se reklamy na finanční služby nebo pro lidi hledající finanční služby v ČR omezí [5]. | **NO-GO bez ověření.** Cesta: ověření přes partnera G2 (kategorie pravděpodobně "regulation exempt" nebo "non-financial services advertiser"; neověřeno). |
| Seznam Sklik, LinkedIn (záloha) | Neověřováno, Meta stačí. | Neřešeno. |

**Vybraná cesta:** Meta, obrázek 4:5 + 9:16, cílení ČR, 18+, bez speciální kategorie. Popis v `ads/`.

README musí rozlišit: "technicky připraveno k reklamě a podle pravidel Meta bez certifikace spustitelné" vs. "právně posouzeno" (to není).

## 2. Texty: co nesmí a co musí

Princip převzatý z pokynů ESMA k marketingovým sdělením fondů [6] (formálně míří na správce a distributory fondů; pro nás jako dobrá praxe): sdělení musí být rozpoznatelné jako marketingové, férové, jasné a nezavádějící, rizika a přínosy stejně viditelně, srozumitelně pro drobné investory.

**Nepoužívat:**
- sliby výnosu, prognózy, "zaručeně", "bez rizika", "jistota";
- "nejlepší ETF", "kup", "doporučujeme", skóre nebo hodnocení vhodnosti, pořadí podle kvality;
- "levnější" o UCITS alternativě (je dražší) a "ušetříš";
- "evropská verze" nebo "stejný fond" (jde o jiný fond na stejný index);
- "v EU nekoupíš" nebo "u brokera nenajdeš" (u konkrétních brokerů neověřeno);
- jména konkrétních brokerů;
- historickou výkonnost (pokud ano, jen s upozorněním, že minulá výkonnost není zárukou).

**Povolená tvrzení (doložená v `data/`):**
- roční náklady fondů podle správce (US) a českého KID (UCITS), s datem ověření;
- "KID pro EU retail jsme k 9. 10. 2026 na stránce správce nenašli" (ne "neexistuje");
- UCITS alternativa je na stejný index, má český KID a je v seznamu ČNB fondů nabízených v ČR k 10. 10. 2026;
- UCITS: depozitář vede majetek fondu na oddělených účtech (směrnice 2014/91/EU, `data/dukazy/2026-10-10-ucits-depozitar.md`).

**Povinné na stránce:**
- [x] "Marketingové sdělení, ne investiční doporučení" a "Investice nesou riziko ztráty" viditelně v úvodu (ne jen v patičce)
- [x] měnové riziko (fondy v USD) a "před investicí si přečti KID a prospekt" (patička, kalkulačka, přehled)
- [x] kdo za stránkou stojí a že nedostáváme provize (patička)
- [x] zdroj u čísel ve veřejné části: odkaz na stránku správce u každého US fondu, datum českého KID u UCITS
- [x] plné upozornění v patičce (riziko ztráty, minulá výkonnost, význam "KID nenalezen")
- [x] datum ověření údajů
- [x] řazení tabulky abecedně podle tickeru (neutrální), uvedeno pod tabulkou
- [x] kalkulačka označená jako modelový výpočet jen z ročního poplatku fondu
- [x] informace o zpracování u formuláře + odkaz na zásady
- [x] souhlas s novinkami nepovinný a nezaškrtnutý
- [ ] kontakt v zásadách (doplní Jan)
- [x] region: databáze Neon Frankfurt, serverové funkce Vercel `fra1` (od 10. 10. po auditu 1, předtím běžely v USA `iad1`); Vercel Inc. je americká firma, uvedeno v zásadách
- [x] zásady: účely, právní základy, doba uložení, práva včetně námitky a stížnosti u ÚOOÚ

## 3. Kontrola k 10. 10. 2026

| Místo | Stav |
|---|---|
| Stránka (úvod, tabulka, kalkulačka, proč, formulář, patička) | Prošlo kontrolou slov z bodu 2. Úvod doplněn o "Marketingové sdělení" a riziko ztráty. |
| Reklama A | "Zdroj a datum u každého údaje" přepsáno; upozornění na riziko v hlavním textu a ve vizuálu (po auditu 1: dřív jen v poli Popis, které se ve všech umístěních nezobrazuje); "zdarma za e-mail". |
| Reklama B | Totéž jako A; datum ověření opraveno na 9. a 10. 10. 2026. |
| Přehled po odeslání | Upozornění v patičce přehledu je; plná kontrola při auditu (kontrolní bod 1). |

## Zdroje (staženo 10. 10. 2026)

1. Meta, About ads for financial products and services: https://www.facebook.com/business/help/567423788405762 (speciální kategorie; Evropa jen úvěry, investiční služby jen USA)
2. Meta, About verification requirements that may impact financial services advertisers: https://www.facebook.com/business/help/719892839342050 (seznam zemí; "If the country ... is not listed ..., there is no verification requirement")
3. Meta, Advertising Standards, Financial and insurance products and services: https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/
4. Google, Introducing New Verification Requirements for Certain Financial Services Advertisers (June 2026): https://support.google.com/adspolicy/answer/17127726 (výňatek z vyhledávání: rolling enforcement od 23. 7. 2026, ČR v seznamu, kategorie Investment); tabulka regulátorů https://support.google.com/adspolicy/answer/12390454 uvádí podle výňatku z vyhledávání pro ČR datum 15. 9. 2026 (stránka se při stažení nevykreslila, neověřeno přímo)
5. Google, Financial Services Verification, Czechia: https://support.google.com/adspolicy/answer/15332527?co=GENIE.CountryCode%3DCZ
6. ESMA34-45-1272, Guidelines on marketing communications under the Regulation on cross-border distribution of funds: `compliance/dukazy/esma34-45-1272-guidelines-marketing-communications.pdf`
