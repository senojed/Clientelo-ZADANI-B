// Příjem formuláře: uloží lead do databáze a zapíše serverovou událost "lead_created" (to je konverze).
// Idempotence: stejný idempotency_key (dvojklik, opakování po výpadku) vrátí stejný výsledek a nic nezdvojí.
import { getSql } from "@/lib/db";
import {
  CONSENT_TEXT_VERSION,
  cleanUtm,
  cleanVariant,
  isEmail,
  isSameOrigin,
  isUuid,
} from "@/lib/validate";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: skryté pole, které člověk nevidí. Vyplní ho jen bot, tomu tváříme úspěch a nic neukládáme.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const { email, idempotency_key, session_id } = body;
  if (!isEmail(email) || !isUuid(idempotency_key) || !isUuid(session_id)) {
    return Response.json({ error: "invalid_input" }, { status: 400 });
  }
  const marketingConsent = body.marketing_consent === true;
  const utm = cleanUtm(body.utm);
  const variant = cleanVariant(body.variant);

  const sql = getSql();
  // "on conflict do nothing": když klíč už existuje, nevloží se nic a returning vrátí prázdno.
  const inserted = await sql`
    insert into leads (email, marketing_consent, consent_text_version, consent_ts, idempotency_key, session_id, utm, variant)
    values (${email.trim().toLowerCase()}, ${marketingConsent}, ${CONSENT_TEXT_VERSION},
            ${marketingConsent ? new Date().toISOString() : null}, ${idempotency_key}, ${session_id},
            ${JSON.stringify(utm)}::jsonb, ${variant})
    on conflict (idempotency_key) do nothing
    returning public_id`;

  let leadId: string;
  if (inserted.length > 0) {
    leadId = inserted[0].public_id;
    await sql`
      insert into events (event, session_id, lead_public_id, utm, variant)
      values ('lead_created', ${session_id}, ${leadId}, ${JSON.stringify(utm)}::jsonb, ${variant})`;
  } else {
    const existing = await sql`select public_id from leads where idempotency_key = ${idempotency_key}`;
    leadId = existing[0].public_id;
  }

  return Response.json({ ok: true, lead_id: leadId });
}
