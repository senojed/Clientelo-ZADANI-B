// Zkopíruje ověřená data z kořene repozitáře (../data/etf.json) do aplikace (web/data/etf.json).
// Běží automaticky před buildem (npm "prebuild"). Když zdroj chybí (build mimo repo), nechá stávající kopii.
import { copyFile, access } from "node:fs/promises";

const src = new URL("../../data/etf.json", import.meta.url);
const dst = new URL("../data/etf.json", import.meta.url);
try {
  await access(src);
  await copyFile(src, dst);
  console.log("etf.json synchronizováno");
} catch {
  console.log("zdroj ../data/etf.json nenalezen, používám uloženou kopii");
}
