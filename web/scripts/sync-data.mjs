// Zkopíruje ověřená data z kořene repozitáře (../data/etf.json) do aplikace a vyrobí z nich dvě verze:
// - web/data/etf.json: plná data, importuje je JEN server (api/prehled), do prohlížeče se nedostanou,
// - web/data/etf-verejne.json: veřejná podmnožina pro stránku (bez ISIN a odkazů na KID, ty jsou za e-mailem).
// Běží automaticky před buildem (npm "prebuild"). Když zdroj chybí (build mimo repo), nechá stávající soubory.
import { readFile, writeFile, access } from "node:fs/promises";

const src = new URL("../../data/etf.json", import.meta.url);
const plna = new URL("../data/etf.json", import.meta.url);
const verejna = new URL("../data/etf-verejne.json", import.meta.url);

try {
  await access(src);
} catch {
  console.log("zdroj ../data/etf.json nenalezen, používám uložené kopie");
  process.exit(0);
}

const data = JSON.parse(await readFile(src, "utf8"));
await writeFile(plna, JSON.stringify(data, null, 2) + "\n");

// Veřejně jen to, co stránka ukazuje před formulářem: náklady, data a zdroj u amerických fondů.
const pary = data.pary.map(({ us, ucits }) => ({
  us: {
    ticker: us.ticker,
    burza: us.burza,
    index: us.index,
    naklady_pct: us.naklady_pct,
    kid_overeno: us.kid_overeno,
    zdroj: us.zdroj,
  },
  ucits: {
    nazev: ucits.nazev,
    kratky_nazev: ucits.kratky_nazev,
    index: ucits.index,
    index_poznamka: ucits.index_poznamka ?? null,
    naklady_pct: ucits.naklady_pct,
    replikace: ucits.replikace,
    kid_datum: ucits.kid_datum,
  },
}));
await writeFile(verejna, JSON.stringify({ verze: data.verze, overeno: data.overeno, pary }, null, 2) + "\n");
console.log("etf.json a etf-verejne.json synchronizovány");
