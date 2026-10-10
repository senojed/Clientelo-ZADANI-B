# Zadání pro designový chat

Tohle vlož jako první zprávu do nového chatu Claude Code otevřeného ve složce `ZADANIE B` (a přiloř PNG návrhu, obrázky a případně soubory fontů). Text pod čarou je určený pro Clauda.

---

Pracuješ na hotové landing page (konverzní stránka pro českého drobného investora z mobilní reklamy). Je ve **funkční neutrální verzi**. Tvůj úkol je **jen vzhled**: převést můj návrh (PNG) do kódu. Obsah, data ani měření nemění.

## Kontext
- Repo: tahle složka (`ZADANIE B`), aplikace v `web/` (Next.js 16, TypeScript, Tailwind v4). Živá stránka: https://clientelo-zadani-b.vercel.app (auto-deploy z GitHub větve `main`, Root Directory `web`).
- Hodnotí se hlavně otázka "mohli bychom na ni zítra spustit reklamu?" a postup práce s AI. Stránka musí být optimalizovaná na získání kontaktů a nesmí vypadat jako základní výstup Clauda.
- Cílovka: český drobný investor, mobil, pár sekund. Mobil (375×812) je hlavní, desktop jen nesmí být rozbitý.
- Komunikuj česky, tykej mi, stručně. Komentář na začátek každého souboru: co dělá a k čemu slouží. Komentuj pro začátečníka, bez zbytečných komentářů.

## Kde je co
- `web/app/globals.css`: **barevné a rozměrové tokeny** (`--background`, `--foreground`, `--muted`, `--surface`, `--line`, `--accent`, `--accent-foreground`, `--positive`, `--radius`) mapované v `@theme inline` na Tailwind třídy (`bg-surface`, `text-muted`, `border-line`, `bg-accent`, `rounded-box`). Změna vzhledu = nejdřív tokeny.
- `web/app/layout.tsx`: fonty (teď Geist přes `next/font/google`, podmnožiny `latin` a `latin-ext` kvůli diakritice).
- `web/components/Landing.tsx`: úvod, sekce přes celou obrazovku (`min-h-[100svh]`), patička.
- `web/components/Srovnani.tsx`: tabulka s rozbalovacími řádky. `Kalkulacka.tsx`: výpočet poplatku. `LeadForm.tsx`: formulář. `Prehled.tsx` + `web/app/prehled/page.tsx`: přehled po odeslání. `web/app/zasady/page.tsx`: zásady.
- Obrázky patří do `web/public/` a vkládají se přes `next/image` (rozměry, `priority` jen pro obrázek v první obrazovce).

## Co se NESMÍ měnit bez mého výslovného souhlasu
1. **Texty a čísla** (náklady, data, názvy fondů, věty o KID a UCITS). Pocházejí z ověřených dat v `data/` a prošly auditem. Můžeš měnit typografii, pořadí a rozložení, ne obsah. Chceš-li změnit text, napiš návrh a počkej na souhlas.
2. **Upozornění**: "Marketingové sdělení, ne investiční doporučení", riziko ztráty, měnové riziko, "před investicí si přečti KID", patička s provozovatelem a prohlášením o provizích. Musí zůstat **viditelné** (ne šedě na šedé, ne mikroskopicky, v úvodu i v patičce).
3. **Zdroje**: odkaz "zdroj: stránka správce" v rozbaleném řádku tabulky a datum ověření.
4. **Cesta ke kontaktu**: tlačítko "Získat ISIN a český KID zdarma" v rozbaleném řádku a pod kalkulačkou, formulář (jedno pole e-mail, nepovinné NEzaškrtnuté políčko s novinkami, honeypot `website` skrytý), informace o zpracování s odkazem na zásady. Každý interaktivní prvek musí vést k formuláři.
5. **Měření**: všechna volání `track(...)` (`page_view`, `section_view`, `row_expand`, `interaction_used`, `cta_click`, `source_click`, `form_start`, `form_submit_attempt`, `overview_shown`, `link_copied`, `pdf_download_clicked`) a `useSectionView` musí zůstat napojená na stejné prvky. Pokud prvek přesouváš nebo přejmenováváš, přenes i `track`.
6. **Funkce**: rozbalování řádku (jeden otevřený), výběr fondu v kalkulačce propojený s řádkem, odeslání formuláře, přechod na `/prehled?t=...`, token, API v `web/app/api/`, `lib/` (kromě vzhledu).
7. Žádné cookies, žádné skripty třetích stran (Google Analytics, Meta Pixel, externí CDN fonty), žádný `localStorage`.
8. Data v `web/data/*.json` jsou generovaná (`scripts/sync-data.mjs`), needituj je.

## Technická pravidla
- Čeština s diakritikou musí fungovat ve všech fontech (`latin-ext`). Fonty z Google Fonts přes `next/font` (self-hosted při buildu), nebo moje soubory ve `web/public/fonts` přes `next/font/local`. Licence k webovému použití a zveřejnění ve veřejném repu je moje odpovědnost; u placených fontů se mě zeptej.
- Obrázky optimalizuj (správné rozměry, `next/image`, moderní formát), ať nezpomalí první obrazovku. Cíl na mobilu: výkon 90+, LCP pod 2,5 s, CLS pod 0,1.
- Přístupnost: dostatečný kontrast (WCAG AA), velikost dotykových prvků aspoň 44 px, viditelný focus, `lang="cs"`.
- Cíl, ke kterému míříš: vzhledově odpovídat mému PNG. Porovnávej výsledek s PNG v prohlížeči (mobil 375×812) a opravuj rozdíly.

## Postup
1. Nejdřív si přečti `PLAN.md` (rozhodnutí), `README.md` (sekce Pořadí sekcí a proč), `compliance/checklist.md` a komponenty výše. Neměň nic, dokud nepřečteš soubor, který upravuješ.
2. Navrhni stručný plán úprav (které soubory, co z PNG se jak převede, co v návrhu chybí nebo koliduje s body výše) a **počkej na můj souhlas**.
3. Pracuj po malých krocích, po každém: `npm run lint` a `npm run build` ve složce `web/`, kontrola v prohlížeči (mobil), commit česky s `Co-Authored-By`.
4. Na konci pusti Lighthouse na mobilu (`npx lighthouse@13.5.0 <URL> --form-factor=mobile ...`) a ulož report do `docs/lighthouse/` s datem. Napiš, co se změnilo oproti 10. 10. (výkon 96, přístupnost 99, best practices 100, SEO 100, LCP 2,3 s).
5. Zapiš do `ai-log/casovy-log.md` kolik práce trvala a do `ai-log/chyby-ai.md` jakékoli své omyly (co jsi udělal špatně, jak se to zjistilo, co se změnilo).
6. Nepushuj nic, co rozbije build. Stav `main` se nasazuje na produkci.

## Co mám k dispozici (doplním do zprávy)
- PNG návrhu (šířka …px): přiloženo.
- Obrázky: přiloženy / popis.
- Fonty: názvy / soubory `.woff2`.
- Případné poznámky k animacím a chování (rozbalování řádku, přechody).
