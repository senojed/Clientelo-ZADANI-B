## BLOCKING

- Bod 6 + 7: fallback na Formspree/Tally ruší měření celé cesty a PDF bránu, ale zadání výslovně chce měřit cestu od příchodu po odeslání formuláře. Oprava: fallback smí degradovat jen doručení leadu, ne event tracking; minimálně ukládat události do vlastního endpointu/logu nebo fallback označit jako nepřijatelný pro odevzdání.

- Bod 7: „otevření PDF“ nejde spolehlivě měřit, pokud uživatel dostane přímý podepsaný odkaz na soubor. Změříš maximálně klik / request / download, ne otevření PDF. Oprava: přejmenovat metriku na `pdf_download_clicked` / `pdf_requested`, případně servírovat přes děkovnou stránku a měřit zobrazení stránky.

## IMPORTANT

- Bod 6: bez ověření e-mailu dostane PDF kdokoliv po zadání libovolného tvarově platného e-mailu. To snižuje kvalitu leadů a v lead-gen zadání je to slabé. Oprava: aspoň jasně přiznat „soft lead gate“ v README a zvážit jednoduché odeslání odkazu e-mailem jako prioritu, ne „pokud zbude čas“.

- Bod 6 + 9: GDPR část pořád stojí na „souhlas“, ale měření anonymních/pseudonymních událostí a uložení UTM nemusí být stejné zpracování jako zaslání PDF. Souhlas u formuláře nepokrývá události před formulářem. Oprava: oddělit účely a právní základy: měření dema / oprávněný zájem nebo minimální technické měření; zaslání PDF / souhlas.

- Bod 6: region Neon/Vercel je jen „ověřit a uvést“. Pro veřejný formulář s osobními údaji je to pozdě slabé. Oprava: dát jako akceptační kritérium: EU region nebo výslovně popsané riziko + DPA/SCC status v README.

- Bod 4: „KID pro EU retail nenalezen“ je metodicky opatrné, ale může působit jako slabý důkaz pro hlavní sdělení stránky. Oprava: u každého ETF uvést přesné prohledané zdroje a dotazovací metodu; jinak tvrzení nepoužít jako hlavní prodejní hák.

- Bod 5 + 11: TypeScript/Next.js je známá mezera, ale plán dává první produkční UI až na pondělí. To je stále těsné. Oprava: v neděli musí vzniknout deploynutý svislý průchod: landing → formulář → lead v DB → děkovná stránka. UI může být hrubé.

- Bod 8: reklamní háky jsou zatím slabé a spíš edukativní než konverzní. „Zjisti, co ověřit“ je méně konkrétní než hodnota lead magnetu. Oprava: navázat přímo na výstup: „3–5 amerických ETF: poplatky, KID a UCITS alternativa v jednom přehledu“.

- Bod 9: kontrola pravidel Google/Meta je jen obecná. Finanční produkty často vyžadují omezené formulace, disclaimery nebo verifikaci inzerenta. Oprava: do plánu přidat konkrétní výstup: seznam zakázaných formulací + rozhodnutí, zda by reklama šla reálně podat bez certifikace.

- Bod 12: `ai-log` redakce může zničit důkaz práce s AI, pokud bude příliš agresivní. Oprava: redigovat jen tajemství/osobní údaje, ale ponechat prompty, odpovědi, chyby AI a rozhodnutí; do README dát metodiku redakce.

## NITS

- Bod 3: „PDF přehled 3 až 5 amerických ETF“ a bod 4 „cíl 5“: sjednotit jazyk, aby nebylo jasné minimum až z detailu.

- Bod 5: plovoucí tlačítko na mobilu může překrývat obsah a zhoršit UX. Přidat kontrolu na malém viewportu.

- Bod 8: `ads/ad-a.md` a `ad-b.md` by měly být pod stejnou cestou, např. `ads/ad-a.md` a `ads/ad-b.md`.

## VERDICT
CHANGES_NEEDED