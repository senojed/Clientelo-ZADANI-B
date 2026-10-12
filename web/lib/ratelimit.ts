// Jednoduché omezení četnosti podle IP adresy, uložené v databázi (funguje i na serverless).
// IP adresu neukládáme: jen její otisk (HMAC s tajným klíčem a dnešním datem), ze kterého se IP zpět zjistit nedá.
// Kontrola a zápis běží v jedné transakci se zámkem na otisk, takže souběžné požadavky limit nepřeskočí.
// Staré otisky maže denní úloha (app/api/uklid/route.ts).
import { createHmac } from "node:crypto";
import type { getSql } from "@/lib/db";

// Kolik požadavků za hodinu z jedné IP: formulář méně, měřicí události víc (jedna návštěva jich pošle desítky). Limity jsou
// vyšší kvůli mobilním sítím, kde jednu IP sdílí mnoho lidí. Otisk obsahuje den (UTC), takže se limit o půlnoci UTC vynuluje.
export const LIMITY = { lead: 20, events: 1000 } as const;

function otiskIp(request: Request): string {
  // Vercel posílá skutečnou IP návštěvníka v hlavičce x-forwarded-for (první adresa v seznamu).
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "neznama";
  const den = new Date().toISOString().slice(0, 10);
  return createHmac("sha256", process.env.DOWNLOAD_TOKEN_SECRET ?? "").update(`${den}|${ip}`).digest("base64url");
}

// Vrátí true, když už IP vyčerpala limit pro daný druh požadavku; jinak pokus zaznamená a vrátí false.
export async function prekrocenLimit(
  sql: ReturnType<typeof getSql>,
  request: Request,
  druh: keyof typeof LIMITY,
): Promise<boolean> {
  const klic = `${druh}:${otiskIp(request)}`;
  const [, zapsano] = await sql.transaction([
    // Zámek na tento otisk do konce transakce: druhý souběžný požadavek počká, až první zapíše.
    sql`select pg_advisory_xact_lock(hashtext(${klic}))`,
    // Zapíše pokus jen tehdy, když je za poslední hodinu pod limitem.
    sql`
      insert into rate_limits (ip_hash)
      select ${klic}
      where (select count(*) from rate_limits where ip_hash = ${klic} and created_at > now() - interval '1 hour')
            < ${LIMITY[druh]}
      returning 1`,
  ]);
  return zapsano.length === 0;
}
