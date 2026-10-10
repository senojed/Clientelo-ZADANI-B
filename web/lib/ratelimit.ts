// Jednoduché omezení četnosti odeslání formuláře podle IP adresy, uložené v databázi (funguje i na serverless).
// IP adresu neukládáme: jen její otisk (HMAC s tajným klíčem a dnešním datem), ze kterého se IP zpět zjistit nedá.
// Záznamy starší než den se při každém volání mažou.
import { createHmac } from "node:crypto";
import type { getSql } from "@/lib/db";

const LIMIT = 5; // odeslání za hodinu z jedné IP

function otiskIp(request: Request): string {
  // Vercel posílá skutečnou IP návštěvníka v hlavičce x-forwarded-for (první adresa v seznamu).
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "neznama";
  const den = new Date().toISOString().slice(0, 10);
  return createHmac("sha256", process.env.DOWNLOAD_TOKEN_SECRET ?? "").update(`${den}|${ip}`).digest("base64url");
}

// Vrátí true, když už tahle IP za poslední hodinu odeslala LIMIT formulářů; jinak pokus zaznamená a vrátí false.
export async function prekrocenLimit(sql: ReturnType<typeof getSql>, request: Request): Promise<boolean> {
  const hash = otiskIp(request);
  await sql`delete from rate_limits where created_at < now() - interval '1 day'`;
  const rows = await sql`
    select count(*)::int as n from rate_limits where ip_hash = ${hash} and created_at > now() - interval '1 hour'`;
  if (rows[0].n >= LIMIT) return true;
  await sql`insert into rate_limits (ip_hash) values (${hash})`;
  return false;
}
