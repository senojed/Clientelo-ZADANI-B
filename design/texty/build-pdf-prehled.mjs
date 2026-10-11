// Složí kompletní text PDF přehledu, který dostane návštěvník e-mailem po odeslání formuláře (lead magnet), a vyrobí
// z něj PDF (podklad pro design) i čistý text (soubor .md ke zkopírování do designového nástroje).
// Fakta čte z data/etf.json. Ukazatel rizika (4 ze 7) a doporučená doba držení (5 let) jsou ověřené v českých KID v data/dukazy.
// Spuštění z kořene repa: node design/texty/build-pdf-prehled.mjs (potřebuje Chrome).
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const koren = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const slozka = join(koren, "design", "texty");
const fonty = pathToFileURL(join(koren, "web", "public", "fonts")).href;
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const data = JSON.parse(readFileSync(join(koren, "data", "etf.json"), "utf8"));
const num = (v) => v.toFixed(2).replace(".", ",");
const pct = (v) => `${num(v)} %`;
const datum = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${d}. ${m}. ${y}`; };
const kc = (v) => `${Math.round(v).toLocaleString("cs-CZ").replace(/\s/g, "\u00a0")}\u00a0Kč`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const zamereni = {
  DIA: "30 velkých amerických firem (index Dow Jones)",
  IVV: "500 velkých amerických firem (index S&P 500)",
  VOO: "500 velkých amerických firem (index S&P 500)",
  VT: "akcie z celého světa (index FTSE Global All Cap)",
};
const overeno = `${datum(data.overeno)} a 10. 10. 2026`;
const CASTKA = 100000;

const souhrn = data.pary.map((p) => `<tr><td><b>${p.us.ticker}</b></td><td>${esc(p.us.nazev)}</td><td>${esc(p.ucits.nazev)}</td><td class="m">${p.ucits.isin}</td><td class="r">${pct(p.us.naklady_pct)}</td><td class="r">${pct(p.ucits.naklady_pct)}</td></tr>`).join("");

const fondy = data.pary.map((p) => {
  const u = p.us, c = p.ucits;
  const nakladyDatum = u.naklady_k_datu ? `, údaj ke dni ${datum(u.naklady_k_datu)}` : "";
  return `<h3>${u.ticker}: ${zamereni[u.ticker]}</h3>
<h4>Americký fond</h4>
<ul><li>Název: ${esc(u.nazev)}</li><li>Burza: ${u.burza}</li>
<li>Roční náklady: ${pct(u.naklady_pct)} (${u.naklady_typ}${nakladyDatum})</li>
<li>KID pro drobné investory v EU jsme na stránce správce nenašli (ověřeno ${datum(u.kid_overeno)}).</li>
<li>Zdroj: ${esc(u.zdroj)}</li></ul>
<h4>UCITS alternativa na stejný index</h4>
<ul><li>Název: ${esc(c.nazev)}</li><li>ISIN: <b class="m">${c.isin}</b></li>
<li>Index: ${esc(c.index)}${c.index_poznamka ? ` (${esc(c.index_poznamka)})` : ""}</li>
<li>Replikace: ${c.replikace}</li>
<li>Roční náklady: ${pct(c.naklady_pct)} (správa a provoz podle KID, bez transakčních nákladů fondu)</li>
<li>Ukazatel rizika podle KID: třída 4 ze 7 (střední riziko). Doporučená doba držení podle KID: 5 let.</li>
<li>Český KID ze dne ${datum(c.kid_datum)}: ${esc(c.kid_url)}</li>
<li>Registrace v ČR: je v seznamu ČNB fondů nabízených v ČR (stav k 10. 10. 2026).</li></ul>`;
}).join("");

const vypocet = data.pary.map((p) => {
  const us = CASTKA * p.us.naklady_pct / 100, eu = CASTKA * p.ucits.naklady_pct / 100;
  return `<tr><td><b>${p.us.ticker}</b></td><td class="r">${kc(us)}</td><td class="r">${kc(eu)}</td><td class="r">${kc(eu - us)}</td></tr>`;
}).join("");

const zdroje = data.pary.map((p) => `<li>${p.us.ticker}: ${esc(p.us.zdroj)}</li><li>${p.ucits.kratky_nazev}, český KID ze dne ${datum(p.ucits.kid_datum)}: ${esc(p.ucits.kid_url)}</li>`).join("");

const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><title>Americká ETF a jejich UCITS alternativy: text PDF přehledu</title><style>
@font-face{font-family:Inter;font-weight:400 700;src:url("${fonty}/inter-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:Inter;font-weight:400 700;src:url("${fonty}/inter-latin-ext.woff2") format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"IBM Plex Mono";font-weight:400;src:url("${fonty}/plexmono-400-latin.woff2") format("woff2");unicode-range:U+0000-00FF}
@page{size:A4;margin:18mm 16mm}
body{font:10.5pt/1.5 Inter,Arial,sans-serif;color:#111}
h1{font-size:21pt;line-height:1.2;margin:0 0 5pt}h2{font-size:14.5pt;margin:20pt 0 6pt;border-bottom:1.5pt solid #111;padding-bottom:3pt;page-break-after:avoid}
h3{font-size:12pt;margin:14pt 0 3pt;page-break-after:avoid}h4{font-size:10.5pt;margin:7pt 0 2pt;color:#333;page-break-after:avoid}
p{margin:4pt 0}ul,ol{margin:3pt 0 3pt 16pt;padding:0}li{margin:1pt 0}table{border-collapse:collapse;margin:6pt 0;width:100%}
td,th{border:.6pt solid #888;padding:3pt 6pt;text-align:left;vertical-align:top;font-size:9.5pt}.r{text-align:right;white-space:nowrap}.m{font-family:"IBM Plex Mono",monospace}
.pozn{color:#555;font-size:9pt}.box{background:#f3f3f3;padding:6pt 8pt;margin:8pt 0}.pb{page-break-before:always}
</style></head><body>
<p class="pozn">Text PDF přehledu, který návštěvník dostane e-mailem po odeslání formuláře. Stav k 11. 10. 2026. Fakta jsou z data/etf.json a českých KID (data/dukazy); texty vět jsou návrh k odsouhlasení.</p>

<h1>Americká ETF a jejich UCITS alternativy</h1>
<p><b>Přehled 4 fondů a co ověřit u brokera</b></p>
<p>Údaje ověřeny ${overeno}. Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty.</p>

<h2>Co v přehledu najdeš</h2>
<p>Americká ETF jako VOO většinou nemají KID, bez kterého je broker v EU drobnému investorovi obvykle nenabídne. U všech čtyř fondů v tomto přehledu jsme KID pro EU na stránce správce k ${datum(data.pary[0].us.kid_overeno)} nenašli. Ke každému proto ukazujeme UCITS alternativu na stejný index, která má český KID a je v seznamu ČNB fondů nabízených v ČR.</p>
<ul><li>přehled čtyř párů fondů a jejich ročních nákladů,</li><li>ISIN alternativ ke zkopírování do vyhledávání u brokera,</li><li>odkazy na české KID s datem dokumentu,</li><li>modelový výpočet rozdílu ročního poplatku,</li><li>kontrolní seznam: jak si ETF ověřit u svého brokera,</li><li>KID, PRIIPs a UCITS vysvětlené lidsky.</li></ul>
<p>Přehled neříká, který fond koupit. Je to informace pro tvoje vlastní rozhodnutí.</p>

<h2>Přehled čtyř párů</h2>
<table><tr><th>Fond USA</th><th>Název</th><th>UCITS alternativa</th><th>ISIN alternativy</th><th>Roční náklady USA</th><th>Roční náklady EU</th></tr>${souhrn}</table>
<p class="pozn">Roční náklady na správu a provoz fondu: USA podle správce, EU podle českého KID (bez transakčních nákladů fondu). Seřazeno abecedně podle tickeru.</p>

<h2 class="pb">Čtyři fondy podrobně</h2>
${fondy}

<h2 class="pb">Kolik je rozdíl v ročním poplatku fondu</h2>
<p>Modelový příklad pro investovanou částku ${kc(CASTKA)}: roční náklady fondu v Kč podle údajů výše.</p>
<table><tr><th>Fond USA</th><th>Roční poplatek USA fondu</th><th>Roční poplatek UCITS alternativy</th><th>Rozdíl</th></tr>${vypocet}</table>
<p class="pozn">Modelový výpočet jen z ročních nákladů fondu na správu a provoz. Bez transakčních nákladů fondu, kurzů, spreadů, daní a poplatků brokera. Fondy jsou v USD, výsledek v korunách ovlivní i kurz. Evropská alternativa je v tomto výpočtu u všech čtyř fondů dražší; její výhoda je v dostupnosti (český KID, registrace v ČR), ne v ceně.</p>

<h2>Co jsou roční náklady fondu a co v nich není</h2>
<ul><li>U amerických fondů jde o poměr nákladů (expense ratio), který uvádí správce. U UCITS alternativ o "poplatky za správu a další administrativní a provozní náklady" z českého KID.</li>
<li>V číslech nejsou transakční náklady fondu (KID je uvádí zvlášť), poplatky brokera, rozdíl mezi nákupní a prodejní cenou, směna měn ani daně.</li>
<li>Čísla se mohou časem měnit. Aktuální hodnoty jsou vždy v posledním KID a na stránce správce.</li></ul>

<h2 class="pb">Kontrolní seznam: jak si ETF ověřit u brokera</h2>
<ol><li>Vyhledej fond u svého brokera podle ISIN (ne jen podle zkratky, ta se na různých burzách liší).</li>
<li>Ověř, že broker k fondu nabízí KID a že ISIN v KID odpovídá.</li>
<li>Zkontroluj burzu a měnu, ve které fond u brokera koupíš (stejný fond bývá na více burzách a v různých měnách).</li>
<li>Podívej se na poplatky brokera a směnu měny, ty v ročních nákladech fondu nejsou.</li>
<li>Když broker fond nenabízí, ověř si, zda nejde o omezení pro tvůj typ klienta.</li>
<li>Před nákupem si přečti KID: ukazatel rizika, scénáře a doporučenou dobu držení.</li></ol>

<h2>Pojmy lidsky</h2>
<ul><li><b>KID</b>: krátký povinný dokument o riziku, nákladech a scénářích. Bez něj se fond drobným investorům v EU obvykle nenabízí.</li>
<li><b>PRIIPs</b>: evropské nařízení, které KID vyžaduje.</li>
<li><b>UCITS</b>: evropská pravidla pro fondy. UCITS ETF mají KID a mohou být registrované k nabízení v ČR.</li>
<li><b>Ukazatel rizika</b>: KID zařazuje fond do třídy 1 až 7. Všechny čtyři alternativy v přehledu jsou ve třídě 4 ze 7 (střední riziko podle KID). Skutečné riziko se může lišit, hlavně při předčasném prodeji.</li>
<li><b>Fyzická a syntetická replikace</b>: fyzický fond drží akcie z indexu, syntetický sleduje index přes smlouvy (swapy). Všechny čtyři alternativy v přehledu jsou fyzické.</li>
<li><b>Měnové riziko</b>: fondy jsou vedené v USD, výsledek v korunách ovlivní i kurz.</li></ul>

<h2>Zdroje a datum ověření</h2>
<ul>${zdroje}<li>Seznam zahraničních fondů nabízených v ČR: Česká národní banka, jerrs.cnb.cz (stav k 10. 10. 2026)</li><li>Kótování amerických fondů: nyse.com (NYSE Arca), ověřeno 9. 10. 2026</li></ul>
<p>Údaje ověřeny ${overeno}.</p>

<h2>Upozornění</h2>
<div class="box"><p>Marketingové sdělení. Nejde o investiční doporučení ani nabídku. Investice do ETF nesou riziko ztráty, minulá výkonnost není zárukou budoucích výnosů. Fondy jsou vedené v USD, výsledek v korunách ovlivní i kurz. Před investicí si přečti KID a prospekt fondu. "KID nenalezen" znamená, že jsme ho k datu ověření nenašli na stránce správce; neznamená, že fond nekoupí žádný broker.</p>
<p>Kdo za přehledem stojí: Jan Reich, ukázka pro výběrové řízení. Nedostáváme provize od správců uvedených fondů ani od brokerů.</p>
<p>Zásady zpracování osobních údajů: clientelo-zadani-b.vercel.app/zasady. Kontakt správce: doplní se před spuštěním kampaně (demo).</p></div>

<h2>Příloha: text e-mailu, kterým se PDF posílá</h2>
<p><b>Předmět:</b> Tvůj přehled: americká ETF a jejich UCITS alternativy</p>
<p>Ahoj,</p>
<p>v příloze je přehled čtyř amerických ETF a jejich UCITS alternativ na stejný index: roční náklady, ISIN ke zkopírování, odkazy na české KID a kontrolní seznam, jak si fond ověřit u brokera.</p>
<p>Přehled je i online (odkaz platí 24 hodin): [odkaz na přehled]</p>
<p>Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty. Údaje ověřeny ${overeno}.</p>
<p>E-mail jsi dostal/a, protože sis přehled vyžádal/a na clientelo-zadani-b.vercel.app. Zásady zpracování osobních údajů: clientelo-zadani-b.vercel.app/zasady.</p>
</body></html>`;

const htmlSoubor = join(slozka, "pdf-prehled-text.html");
writeFileSync(htmlSoubor, html);
const r = spawnSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000",
  `--print-to-pdf=${join(slozka, "pdf-prehled-text.pdf")}`, pathToFileURL(htmlSoubor).href], { encoding: "utf8" });
console.log(r.status === 0 ? "PDF OK" : r.stderr.slice(0, 300));

// Čistý text pro vložení do designového nástroje.
const md = html.slice(html.indexOf("<body>") + 6, html.indexOf("</body>"))
  .replace(/<h1>/g, "# ").replace(/<h2[^>]*>/g, "\n## ").replace(/<h3>/g, "\n### ").replace(/<h4>/g, "\n#### ")
  .replace(/<\/h[1-4]>/g, "\n").replace(/<li>/g, "- ").replace(/<\/li>/g, "\n").replace(/<\/tr>/g, "\n").replace(/<\/t[dh]>/g, " | ")
  .replace(/<\/p>/g, "\n\n").replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/\u00a0/g, " ").replace(/\n{3,}/g, "\n\n").trim() + "\n";
writeFileSync(join(slozka, "pdf-prehled-text.md"), md);
console.log("MD OK");
