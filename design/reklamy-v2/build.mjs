// Vyrobí 4 reklamní obrázky (A a B, formát 4:5 a 9:16) z HTML šablony a vyexportuje je do PNG přes Chrome bez okna.
// Spuštění: node design/reklamy-v2/build.mjs (z kořene repa). Texty a čísla jsou v objektu OBSAH, ověřená data viz data/etf.json.
// Pravidla: povinné upozornění je přímo v obrázku, obsah u 9:16 leží mimo horních 250 px a dolních 350 px (rozhraní Stories/Reels),
// žádný falešný klikací prvek (tlačítko dělá Meta pod reklamou).
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const koren = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const vystup = join(koren, "design", "reklamy-v2");
const fonty = pathToFileURL(join(koren, "web", "public", "fonts")).href;
const assety = pathToFileURL(join(koren, "design", "sources", "assets")).href;
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

// Čísla načteme z ověřených dat, aby se reklama nemohla rozejít se stránkou.
const data = JSON.parse(readFileSync(join(koren, "data", "etf.json"), "utf8"));
const par = (t) => data.pary.find((p) => p.us.ticker === t);
const pct = (v) => `${v.toFixed(2).replace(".", ",")} %`;
const voo = par("VOO"), ivv = par("IVV");

const NEDELITELNE = (s) => s.replace(/ ([aiksuvzo]) /gi, " $1\u00a0"); // jednopísmenná slova nezůstanou na konci řádku

const OBSAH = {
  upozorneni: "Marketingové sdělení.<br>Investice nesou riziko ztráty.",
  nabidka: "Celý přehled s ISIN zdarma za e-mail",
  zdrojA: "Roční náklady fondu na správu a provoz: USA podle správce, EU podle českého KID. Ověřeno 9. a 10. 10. 2026.",
  zdrojB: "Ověřeno 9. a 10. 10. 2026. Zdroj u každého řádku.",
};

// Svislé rozložení (v px) pro oba formáty. U 9:16 je obsah mezi y = 260 a y = 1570.
const FORMATY = {
  feed: { w: 1080, h: 1350, brand: 64, headA: 170, cardsA: 470, offerA: 940, srcA: 1030, legal: 1180, headB: 160, tableB: 490, offerB: 990, srcB: 1090, bandTop: 1150 },
  stories: { w: 1080, h: 1920, brand: 270, headA: 380, cardsA: 690, offerA: 1190, srcA: 1280, legal: 1420, headB: 380, tableB: 740, offerB: 1240, srcB: 1340, bandTop: 1390 },
};

function html(varianta, f) {
  const A = varianta === "a";
  const hlavicka = A ? "Znáš VOO<br>nebo IVV?" : "4 americká ETF<br>a jejich evropské<br>alternativy";
  const obsah = A
    ? `<div class="cards" style="top:${f.cardsA}px">
         <div class="card"><div class="kind">Americké ETF</div><div class="fund tick">VOO</div>
           <div class="lab">Roční náklady</div><div class="cost">${pct(voo.us.naklady_pct)}</div></div>
         <div class="same">stejný<br>index</div>
         <div class="card"><div class="kind">UCITS alternativa</div><div class="fund">Vanguard<br>S&amp;P 500</div>
           <div class="lab">Roční náklady</div><div class="cost">${pct(voo.ucits.naklady_pct)}</div></div>
       </div>`
    : `<div class="table" style="top:${f.tableB}px">
         <div class="th"><span>Fond USA</span><span>Alternativa v EU</span><span class="r">Roční náklady<br>USA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EU</span></div>
         <div class="tr"><span class="tick2">VOO</span><span>Vanguard S&amp;P 500</span><span class="cp"><i>${pct(voo.us.naklady_pct)}</i><b>${pct(voo.ucits.naklady_pct)}</b></span></div>
         <div class="tr"><span class="tick2">IVV</span><span>iShares Core S&amp;P 500</span><span class="cp"><i>${pct(ivv.us.naklady_pct)}</i><b>${pct(ivv.ucits.naklady_pct)}</b></span></div>
         <div class="more"><span></span><span></span><span></span></div>
         <div class="note">Další 2 fondy v celém přehledu.</div>
       </div>`;
  const top = A ? { head: f.headA, offer: f.offerA, src: f.srcA } : { head: f.headB, offer: f.offerB, src: f.srcB };
  return `<!doctype html><html lang="cs"><head><meta charset="utf-8"><style>
@font-face{font-family:Lora;font-weight:400 500;src:url("${fonty}/lora-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:Lora;font-weight:400 500;src:url("${fonty}/lora-latin-ext.woff2") format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Inter;font-weight:400 600;src:url("${fonty}/inter-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:Inter;font-weight:400 600;src:url("${fonty}/inter-latin-ext.woff2") format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"IBM Plex Mono";font-weight:500;src:url("${fonty}/plexmono-500-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:"IBM Plex Mono";font-weight:400;src:url("${fonty}/plexmono-400-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
*{box-sizing:border-box;margin:0}html,body{width:${f.w}px;height:${f.h}px;background:#081725;overflow:hidden}
body{position:relative;font-family:Inter,sans-serif;color:#F4F0E8}
.pixel{position:absolute;right:0;bottom:0;width:540px;opacity:.34}
.brand{position:absolute;left:72px;top:${f.brand}px;display:flex;gap:18px;align-items:center;font:500 40px/48px Lora,serif}.brand img{width:43px;height:40px}
h1{position:absolute;left:72px;top:${top.head}px;width:936px;font:500 ${A ? 100 : 84}px/${A ? 112 : 98}px Lora,serif;letter-spacing:-1.6px}
.cards{position:absolute;left:72px;width:936px;display:grid;grid-template-columns:380px 176px 380px;align-items:center}
.card{position:relative;height:${f.h === 1350 ? 380 : 420}px;padding:34px 30px;background:#0A1B2A;border:2px solid #527B9B;border-radius:12px}
.kind{font-size:27px;line-height:36px;color:#B5C1CD}.fund{margin-top:22px;font:500 45px/53px Lora,serif}.fund.tick{font:500 80px/92px "IBM Plex Mono",monospace;margin-top:14px}
.lab{position:absolute;left:30px;bottom:112px;font-size:25px;color:#B5C1CD}.cost{position:absolute;left:30px;bottom:30px;font:500 68px/80px "IBM Plex Mono",monospace;color:#DDB65B;white-space:nowrap}
.same{text-align:center;font-size:28px;line-height:37px;color:#B5C1CD}.same:before,.same:after{content:"";display:block;width:70px;height:2px;background:#527B9B;margin:16px auto}
.table{position:absolute;left:72px;width:936px;padding:22px 32px 20px;background:#0A1B2A;border:2px solid #344C5F;border-radius:12px}
.th,.tr{display:grid;grid-template-columns:130px 1fr 280px;align-items:center}.th{height:84px;font-size:23px;line-height:29px;color:#B5C1CD;border-bottom:1px solid #344C5F}.r{text-align:right}
.tr{height:104px;border-bottom:1px solid #293C4B;font-size:31px}.tick2{font:500 48px "IBM Plex Mono",monospace}
.cp{display:flex;justify-content:space-between;font:500 34px "IBM Plex Mono",monospace;white-space:nowrap}.cp i{font-style:normal}.cp b{color:#DDB65B;font-weight:500}
.more{display:grid;grid-template-columns:130px 1fr 280px;gap:0;height:56px;align-items:center;opacity:.35}.more span{height:13px;border-radius:3px;background:#527B9B}.more span:nth-child(1){width:67px}.more span:nth-child(2){width:260px}.more span:nth-child(3){width:200px}
.note{font-size:26px;color:#B5C1CD}
.offer{position:absolute;left:72px;top:${top.offer}px;width:936px;font:400 38px/48px Lora,serif;display:flex;gap:16px;align-items:center}.offer em{font-style:normal;color:#DDB65B;font-family:Inter;font-weight:500}
.src{position:absolute;left:72px;top:${top.src}px;width:900px;font-size:26px;line-height:36px;color:#B5C1CD}
.band{position:absolute;left:0;top:${f.bandTop}px;width:1080px;height:${f.h === 1350 ? f.h - f.bandTop : 180}px;background:#06131E}
.legal{position:absolute;left:72px;top:${f.legal}px;font:500 36px/48px Inter,sans-serif;color:#F4F0E8;z-index:2}
</style></head><body>
<img class="pixel" src="${assety}/pixel-corner-right.svg">
<div class="brand"><img src="${assety}/logo-symbol.svg">ETF přehled</div>
<h1>${hlavicka}</h1>
${obsah}
<div class="offer">${OBSAH.nabidka} <em>→</em></div>
<div class="src">${NEDELITELNE(A ? OBSAH.zdrojA : OBSAH.zdrojB)}</div>
<div class="band"></div>
<div class="legal">${OBSAH.upozorneni}</div>
</body></html>`;
}

mkdirSync(vystup, { recursive: true });
for (const v of ["a", "b"]) {
  for (const [nazev, f] of Object.entries(FORMATY)) {
    const soubor = join(vystup, `reklama-${v}-${nazev}.html`);
    writeFileSync(soubor, html(v, f));
    const png = join(vystup, `Reklama-${v.toUpperCase()}-${f.w}x${f.h}.png`);
    const r = spawnSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      `--window-size=${f.w},${f.h}`, "--virtual-time-budget=4000", `--screenshot=${png}`, pathToFileURL(soubor).href], { encoding: "utf8" });
    console.log(png.split(/[\\/]/).pop(), r.status === 0 ? "OK" : r.stderr.slice(0, 200));
  }
}
