// Vytvoří tabulky v databázi Neon podle db/schema.sql.
// Spuštění (připojení k DB se načte z .env mimo repozitář, nic se nekopíruje):
//   node --env-file=../../.env scripts/migrate.mjs
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Chybí DATABASE_URL (spusť s --env-file=../../.env).");
  process.exit(1);
}

const sql = neon(url);
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

// Neon přes HTTP pošle jeden příkaz na dotaz, proto schéma dělíme podle středníků.
// Komentáře se nejdřív odstraní, aby středník v komentáři nerozbil dělení.
const statements = schema
  .replace(/--.*$/gm, "")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}

const tables = await sql`select table_name from information_schema.tables where table_schema = 'public' order by table_name`;
console.log("Hotovo. Tabulky:", tables.map((t) => t.table_name).join(", "));
