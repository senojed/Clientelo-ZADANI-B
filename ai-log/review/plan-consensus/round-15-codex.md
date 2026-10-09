## IMPORTANT

- Bod 6, marketingový checkbox + „lead hodnotu jen pro vyhodnocení zájmu“: plán řeší souhlas s marketingem, ale neříká, jak se technicky oddělí lead bez souhlasu od exportu/CRM použití. Riziko: pozdější nelegální oslovení nebo nejasná evidence souhlasu. Oprava: do datového modelu dát `marketing_consent`, `consent_text_version`, `consent_ts`, a v README výslovně uvést, že bez souhlasu se e-mail nepoužije k žádnému kontaktování.

- Bod 6 a 7, veřejné API `/api/events`: plán chce ověřovat události po odeslání proti `session_id`, ale `session_id` je klientský náhodný identifikátor bez serverové autority. Útočník může posílat libovolné události a spamovat databázi. Není to blokující pro demo, ale je to mezera. Oprava: minimálně validovat payload, allowlist eventů, velikosti polí, UTM délky, origin/referrer; honeypot nestačí pro event endpoint.

- Bod 4, „KID pro EU retail nenalezen“: plán spoléhá hlavně na dokumentové stránky správců. U některých správců mohou být PRIIPs/KID dokumenty oddělené podle domicilu/distributora a špatně indexované. Riziko falešného závěru „nenalezen“. Oprava: do metodiky přidat povinný screenshot nebo archivovaný důkaz prohledané dokumentové stránky a přesnou URL dotazu/filtru; ne jen obecný popis.

- Bod 9, „ČNB, ZPKT, ESMA“: compliance úkol je příliš široký na sobotu/neděli a bez jasného výstupu. Riziko utopení času v právním rešeršování bez dopadu na stránku. Oprava: zúžit na praktický checklist zakázaných tvrzení a povinných disclaimerů; právní režim označit jako neověřený mimo rámec demo práce.

- Bod 11, středa „Lighthouse výkon 90 a víc“ vs bod 16 „MĚLO BY být“: v harmonogramu to působí jako tvrdý cíl, v prioritách jako volitelné. Oprava: sjednotit formulaci: povinný je report a ruční mobilní průchod, skóre je cíl, ne akceptační podmínka.

## NITS

- Bod 2, nadpis „náklady, KID a UCITS alternativa“ je přesný, ale slabý reklamně. Přidat pracovní ostřejší variantu už do plánu, ne až neurčitě později.

- Bod 3, PDF obsahuje „úplná tabulka ETF“, ale stránka před formulářem ukazuje „seznam všech tickerů“. Doporučení: ukázat i počet sloupců/typy údajů, aby hodnota PDF byla konkrétnější.

- Bod 15, dva repozitáře A/B: je to riziko zmatku při odevzdání. Doporučení: v README finálního repa stručně uvést, že druhý repo není součást odevzdání.

## VERDICT
CHANGES_NEEDED