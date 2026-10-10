// Denní úklid: smaže otisky IP starší než den (slib v zásadách). Spouští ho Vercel Cron (web/vercel.json).
// Vercel posílá hlavičku Authorization: Bearer <CRON_SECRET>; bez ní se nic nesmaže.
import { getSql } from "@/lib/db";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response(null, { status: 401 });
  }
  const sql = getSql();
  const smazano = await sql`delete from rate_limits where created_at < now() - interval '1 day' returning 1`;
  return Response.json({ smazano: smazano.length });
}
