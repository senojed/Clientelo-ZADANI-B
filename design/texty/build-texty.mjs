// Složí kompletní text stránky, přehledu, zásad a reklam do jednoho PDF (podklad pro design a kontrolu textů).
// Čísla a názvy fondů čte z data/etf.json, texty zásad z web/app/zasady/page.tsx a reklamy z ads/*.md; ostatní věty
// jsou opsané z komponent ve web/components (Landing, Srovnani, Kalkulacka, LeadForm, Prehled). Při změně textu v kódu spusť znovu.
// Spuštění z kořene repa: node design/texty/build-texty.mjs (potřebuje Chrome); výstup: design/texty/texty-komplet.pdf
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const koren = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const slozka = join(koren, "design", "texty");
const fonty = pathToFileURL(join(koren, "web", "public", "fonts")).href;
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const data = JSON.parse(readFileSync(join(koren, "data", "etf.json"), "utf8"));
const pct = (v) => `${v.toFixed(2).replace(".", ",")} %`;
const datum = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${d}. ${m}. ${y}`; };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const zamereni = {
  DIA: "30 velkých amerických firem (index Dow Jones)",
  IVV: "500 velkých amerických firem (index S&P 500)",
  VOO: "500 velkých amerických firem (index S&P 500)",
  VT: "akcie z celého světa (index FTSE Global All Cap)",
};
const overeno = datum(data.overeno);

// --- Zásady: text převedeme z JSX souboru stránky (zůstane vždy shodný s webem).
function zasady() {
  const src = readFileSync(join(koren, "web", "app", "zasady", "page.tsx"), "utf8");
  let t = src.slice(src.indexOf("<main"), src.indexOf("</main>"));
  t = t.replace(/<main[^>]*>/, "").replace(/className="[^"]*"/g, "").replace(/<Link[^>]*>/g, "<a>").replace(/<\/Link>/g, "</a>")
    .replace(/<h1\s*>/g, "<h3>").replace(/<\/h1>/g, "</h3>").replace(/<h2\s*>/g, "<h4>").replace(/<\/h2>/g, "</h4>")
    .replace(/\{"\s*"\}/g, " ").replace(/&nbsp;/g, "\u00a0");
  return t;
}

// --- Reklamy: vybrané řádky z ads/ad-a.md a ad-b.md.
function reklama(soubor) {
  const md = readFileSync(join(koren, "ads", soubor), "utf8").split("\n");
  const nadpis = md[0].replace(/^#\s*/, "");
  const pole = ["Platforma a formát (předběžně)", "Headline", "Hlavní text", "Popis", "Tlačítko (CTA)", "Cílení", "UTM"];
  const radky = md.filter((l) => pole.some((p) => l.startsWith(`- **${p}:**`)))
    .map((l) => l.replace(/^- \*\*(.+?):\*\*\s*/, "<dt>$1</dt><dd>").concat("</dd>").replace(/`/g, ""));
  return `<h4>${esc(nadpis)}</h4><dl>${radky.join("")}</dl>
    <p class="vizual"><b>Text přímo v obrázku:</b> logo "ETF přehled"; ${soubor.includes("-a") ? "nadpis „Znáš VOO nebo IVV?“, karty „Americké ETF VOO, roční náklady 0,03 %“ a „UCITS alternativa Vanguard S&amp;P 500, roční náklady 0,07 %“, popisek „stejný index“" : "nadpis „4 americká ETF a jejich evropské alternativy“, výřez tabulky (VOO, VT; Fond USA, Alternativa v EU, Roční náklady USA / EU), „ověřeno 9. a 10. 10. 2026, zdroj u každého řádku“"}; věta „Celý přehled s ISIN zdarma za e-mail.“; upozornění „Marketingové sdělení. Investice nesou riziko ztráty.“</p>`;
}

const radky = data.pary.map((p) => `<tr><td><b>${p.us.ticker}</b></td><td>${esc(p.ucits.kratky_nazev)}</td><td>${pct(p.us.naklady_pct)}</td><td>${pct(p.ucits.naklady_pct)}</td></tr>`).join("");
const rozbalene = data.pary.map((p) => `
  <h5>${p.us.ticker}: ${esc(p.ucits.kratky_nazev)} (rozbalený řádek)</h5>
  <dl><dt>Zaměření</dt><dd>${zamereni[p.us.ticker]}</dd>
  <dt>${p.us.ticker}</dt><dd>kótováno na ${p.us.burza}; KID pro EU retail jsme na stránce správce nenašli k ${datum(p.us.kid_overeno)}; <i>odkaz: zdroj: stránka správce</i></dd>
  <dt>Alternativa</dt><dd>${esc(p.ucits.nazev)}${p.ucits.index_poznamka ? "; " + esc(p.ucits.index_poznamka) : ""}</dd>
  <dt>Zdroj</dt><dd>český KID ze dne ${datum(p.ucits.kid_datum)} (odkaz je v přehledu), seznam ČNB k 10. 10. 2026; replikace ${p.ucits.replikace}</dd></dl>
  <p class="tl">Tlačítko: Získat ISIN a český KID zdarma</p>`).join("");
const prehled = data.pary.map((p) => `
  <h5>${p.us.ticker}: ${zamereni[p.us.ticker]}</h5>
  <p>${esc(p.us.nazev)} · ${p.us.burza} · roční náklady ${pct(p.us.naklady_pct)} · KID pro EU retail jsme na stránce správce nenašli k ${datum(p.us.kid_overeno)} · <i>zdroj (odkaz)</i></p>
  <p><b>${esc(p.ucits.nazev)}</b><br>ISIN ${p.ucits.isin} <i>[Kopírovat]</i><br>Index: ${esc(p.ucits.index)}${p.ucits.index_poznamka ? " (" + esc(p.ucits.index_poznamka) + ")" : ""} · replikace: ${p.ucits.replikace} · roční náklady ${pct(p.ucits.naklady_pct)} (správa a provoz podle KID, bez transakčních nákladů)<br><i>Český KID ze dne ${datum(p.ucits.kid_datum)} (odkaz)</i> · v seznamu ČNB fondů nabízených v ČR (ověřeno 10. 10. 2026)</p>`).join("");

const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><title>ETF přehled: kompletní text</title><style>
@font-face{font-family:Inter;font-weight:400 700;src:url("${fonty}/inter-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:Inter;font-weight:400 700;src:url("${fonty}/inter-latin-ext.woff2") format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@page{size:A4;margin:18mm 16mm}
body{font:10.5pt/1.5 Inter,Arial,sans-serif;color:#111}
h1{font-size:20pt;margin:0 0 4pt}h2{font-size:15pt;margin:22pt 0 6pt;border-bottom:1.5pt solid #111;padding-bottom:3pt;page-break-after:avoid}
h3{font-size:12.5pt;margin:14pt 0 4pt;page-break-after:avoid}h4{font-size:11pt;margin:12pt 0 3pt;page-break-after:avoid}h5{font-size:10.5pt;margin:9pt 0 2pt;color:#333}
p{margin:3pt 0}ul,ol{margin:3pt 0 3pt 16pt;padding:0}dt{font-weight:600;margin-top:3pt}dd{margin:0 0 0 0}
table{border-collapse:collapse;margin:5pt 0}td,th{border:.6pt solid #888;padding:3pt 8pt;text-align:left}
.tl{font-style:italic;color:#555}.pozn{color:#555;font-size:9pt}.vizual{background:#f3f3f3;padding:5pt 7pt;margin-top:5pt}
section{page-break-inside:auto}
</style></head><body>
<h1>ETF přehled: kompletní text</h1>
<p class="pozn">Stav k 11. 10. 2026. Vše, co návštěvník vidí: stránka, přehled po odeslání formuláře, zásady a reklamy. Kurzívou jsou popisy odkazů a tlačítek. Čísla a názvy fondů z data/etf.json, zásady z kódu stránky.</p>

<h2>1. Stránka (úvodní obrazovka a další části)</h2>
<h3>Úvod (první obrazovka)</h3>
<p><b>ETF přehled</b> (logo)</p>
<p><b>Evropské alternativy amerických ETF</b></p>
<p>Americká ETF jako VOO většinou nemají KID, bez kterého je broker v EU drobnému investorovi obvykle nenabídne.<br>Tady je alternativa na stejný index a náklady obou.</p>
<p>Celý přehled s ISIN zdarma za e-mail.</p>
<p class="tl">Tlačítko: Zobrazit srovnání · Odkaz: Co obsahuje přehled</p>
<p>Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty, fondy jsou v USD (výsledek v korunách ovlivní kurz).<br>Před investicí si přečti KID.</p>
<p>Údaje ověřeny ${overeno} a 10. 10. 2026.</p>

<h3>Srovnání 4 amerických ETF</h3>
<p>Evropská alternativa je dražší. Za to má český KID a je v seznamu ČNB fondů nabízených v ČR. Klikni na řádek pro podrobnosti a zdroj.</p>
<table><tr><th>Fond USA</th><th>Alternativa v EU</th><th colspan="2">Roční náklady USA / EU</th></tr>${radky}</table>
${rozbalene}
<p>Roční náklady na správu a provoz fondu: USA podle správce, EU podle českého KID (bez transakčních nákladů fondu). Seřazeno abecedně podle tickeru.</p>

<h3>Rozdíl ročního poplatku fondu (kalkulačka)</h3>
<p>Výběr fondu: „VOO a Vanguard S&amp;P 500“ atd. (4 možnosti). Investovaná částka (posuvník 10 000 až 1 000 000 Kč, předvyplněno 100 000 Kč). Výsledek: roční poplatek USA fondu, roční poplatek UCITS alternativy a „Rozdíl … Kč ročně“.</p>
<p>Modelový výpočet jen z ročních nákladů fondu na správu a provoz.<br>Bez transakčních nákladů fondu, kurzů, spreadů, daní a poplatků brokera.<br>Fondy jsou v USD, výsledek v korunách ovlivní i kurz. Před investicí si přečti KID.</p>
<p class="tl">Tlačítko: Získat ISIN a český KID zdarma</p>

<h3>Proč evropská alternativa</h3>
<ul><li><b>Má KID.</b> Bez něj broker v EU fond drobnému investorovi obvykle nenabídne. U těchto 4 amerických ETF jsme KID k ${overeno} na stránce správce nenašli.</li>
<li><b>Dá se srovnat.</b> Každý KID má stejnou osnovu: riziko 1 až 7, náklady, scénáře výnosu.</li>
<li><b>Smí se nabízet v ČR.</b> Všechny 4 alternativy jsou v seznamu ČNB fondů nabízených v ČR (k 10. 10. 2026).</li></ul>

<h3>Formulář</h3>
<p><b>Celý přehled zdarma za e-mail</b></p>
<ul><li>ISIN UCITS alternativ ke zkopírování do vyhledávání u brokera</li><li>odkazy na české KID a data dokumentů</li><li>kontrolní seznam: jak si ETF ověřit u svého brokera</li><li>KID, PRIIPs a UCITS vysvětlené lidsky</li></ul>
<p>Pole: E-mail (placeholder: tvuj@email.cz). Políčko (nezaškrtnuté, nepovinné): Chci občas dostat novinky o ETF (nepovinné).</p>
<p class="tl">Tlačítko: Získat přehled zdarma (při odesílání: Odesílám...)</p>
<p>Přehled se otevře hned po odeslání.</p>
<p>Odesláním potvrzuješ, že ses seznámil/a se <i>zásadami zpracování</i> (odkaz). E-mail uložíme jako kontakt k tomuto přehledu.</p>
<p>Chybové hlášky: „Nepodařilo se odeslat. Zkus to prosím znovu.“ · „Zkontroluj prosím e-mailovou adresu.“ · „Příliš mnoho pokusů. Zkus to prosím za chvíli.“</p>

<h3>Patička</h3>
<p>Marketingové sdělení. Nejde o investiční doporučení ani nabídku. Investice do ETF nesou riziko ztráty, minulá výkonnost není zárukou budoucích výnosů. Fondy jsou vedené v USD, výsledek v korunách ovlivní i kurz. Před investicí si přečti KID a prospekt fondu. "KID nenalezen" znamená, že jsme ho k datu ověření nenašli na stránce správce; neznamená, že fond nekoupí žádný broker.</p>
<p>Kdo za stránkou stojí: Jan Reich, ukázka pro výběrové řízení. Nedostáváme provize od správců uvedených fondů ani od brokerů.</p>
<p>Zdroje: stránky správců fondů (odkaz u každého řádku tabulky), NYSE, seznam ČNB, české KID. Údaje ověřeny 9. a 10. 10. 2026.</p>
<p class="tl">Odkaz: Zásady zpracování osobních údajů</p>

<h2>2. Přehled po odeslání formuláře (/prehled)</h2>
<p><b>Hotovo. Tady je celý přehled.</b></p>
<p>Odkaz na tuto stránku platí 24 hodin.</p>
<p class="tl">Tlačítka: Zkopírovat odkaz (po kliknutí: Odkaz zkopírován) · Uložit jako PDF. Ve vestavěném prohlížeči Facebooku a Instagramu navíc: „Jsi ve Facebooku nebo Instagramu: pro uložení PDF otevři stránku v prohlížeči (menu ⋯, Otevřít v prohlížeči).“</p>
${prehled}
<h4>Kontrolní seznam: jak si ETF ověřit u brokera</h4>
<ol><li>Vyhledej fond u svého brokera podle ISIN (ne jen podle zkratky, ta se na různých burzách liší).</li><li>Ověř, že broker k fondu nabízí KID a že ISIN v KID odpovídá.</li><li>Zkontroluj burzu a měnu, ve které fond u brokera koupíš (stejný fond bývá na více burzách a v různých měnách).</li><li>Podívej se na poplatky brokera a směnu měny, ty v ročních nákladech fondu nejsou.</li><li>Když broker fond nenabízí, ověř si, zda nejde o omezení pro tvůj typ klienta.</li><li>Před nákupem si přečti KID: ukazatel rizika, scénáře a doporučenou dobu držení.</li></ol>
<h4>Pojmy lidsky</h4>
<ul><li><b>KID</b>: krátký povinný dokument o riziku, nákladech a scénářích. Bez něj se fond drobným investorům v EU obvykle nenabízí.</li><li><b>PRIIPs</b>: evropské nařízení, které KID vyžaduje.</li><li><b>UCITS</b>: evropská pravidla pro fondy. UCITS ETF mají KID a mohou být registrované k nabízení v ČR.</li><li><b>Fyzická a syntetická replikace</b>: fyzický fond drží akcie z indexu, syntetický sleduje index přes smlouvy (swapy). Všechny 4 alternativy v přehledu jsou fyzické.</li><li><b>Měnové riziko</b>: fondy jsou vedené v USD, výsledek v korunách ovlivní i kurz.</li></ul>
<p>Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty. Údaje ověřeny 9. a 10. 10. 2026, náklady US ETF podle správců, náklady UCITS podle českých KID.</p>
<p>Neplatný nebo prošlý odkaz: „Odkaz na přehled vypršel nebo není platný. Odkaz platí 24 hodin. Nový získáš zdarma na úvodní stránce.“ (tlačítko: Zpět na srovnání). Chyba načtení: „Přehled se nepodařilo načíst. Odkaz je pořád platný, formulář nemusíš vyplňovat znovu.“ (tlačítko: Zkusit načíst znovu).</p>

<h2>3. Zásady zpracování osobních údajů (/zasady)</h2>
${zasady()}

<h2>4. Reklamy</h2>
${reklama("ad-a.md")}
${reklama("ad-b.md")}
</body></html>`;

const htmlSoubor = join(slozka, "texty-komplet.html");
writeFileSync(htmlSoubor, html);
const pdf = join(slozka, "texty-komplet.pdf");
const r = spawnSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000",
  `--print-to-pdf=${pdf}`, pathToFileURL(htmlSoubor).href], { encoding: "utf8" });
console.log(r.status === 0 ? "OK " + pdf : r.stderr.slice(0, 300));
