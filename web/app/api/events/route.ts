// Příjem událostí měření z prohlížeče (bez cookies). Přijme jen povolené události a krátká pole.
// Prohlížeč posílá přes navigator.sendBeacon, proto tělo čteme jako text a sami ho převedeme z JSON.
import { getSql } from "@/lib/db";
import { cleanProps, cleanUtm, cleanVariant, isClientEvent, isSameOrigin, isUuid } from "@/lib/validate";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return new Response(null, { status: 403 });

  const text = await request.text();
  if (text.length > 4000) return new Response(null, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }

  const { event, session_id } = body;
  if (!isClientEvent(event) || !isUuid(session_id)) return new Response(null, { status: 400 });

  const leadId = isUuid(body.lead_id) ? body.lead_id : null;
  const clientTs = typeof body.ts === "string" && !Number.isNaN(Date.parse(body.ts)) ? body.ts : null;

  const sql = getSql();
  await sql`
    insert into events (event, session_id, lead_public_id, utm, variant, props, client_ts)
    values (${event}, ${session_id}, ${leadId}, ${JSON.stringify(cleanUtm(body.utm))}::jsonb,
            ${cleanVariant(body.variant)}, ${JSON.stringify(cleanProps(body.props))}::jsonb, ${clientTs})`;

  return new Response(null, { status: 204 });
}
