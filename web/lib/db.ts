// Připojení k databázi Neon (Postgres). Používají ho jen serverové části (api routes),
// do prohlížeče se nikdy nedostane, protože DATABASE_URL obsahuje heslo.
import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL není nastavená");
  return neon(url);
}
