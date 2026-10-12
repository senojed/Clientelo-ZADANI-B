// Příjem formuláře: uloží lead do databáze a zapíše serverovou událost "lead_created" (to je konverze).
// Idempotence: stejný idempotency_key (dvojklik, opakování po výpadku) vrátí stejný výsledek a nic nezdvojí.
// Ochrany: kontrola původu (proti cizím webům), honeypot (proti jednoduchým botům), limit četnosti podle IP.
import { getSql } from "@/lib/db";
import {
  CONSENT_TEXT_VERSION,
  cleanUtm,
  cleanVariant,
  isEmail,
  isSameOrigin,
  isUuid,
} from "@/lib/validate";
import { vydejToken } from "@/lib/token";
import { prekrocenLimit } from "@/lib/ratelimit";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Platné JSON může být i "null" nebo pole; potřebujeme objekt.
  if (!body || typeof body !== "object" || Array.isArray(body)) {
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

  // Opakované odeslání stejného pokusu (dvojklik, výpadek): vrátíme existující lead a nepočítáme ho do limitu.
  // Kdyby leadu chyběla konverze, doplní se (nejvýš jedna, unikátní index).
  const existing = await sql`select public_id, session_id, utm, variant from leads where idempotency_key = ${idempotency_key}`;
  let leadId: string;
  if (existing.length > 0) {
    const l = existing[0];
    leadId = l.public_id;
    await sql`
      insert into events (event, session_id, lead_public_id, utm, variant)
      values ('lead_created', ${l.session_id}, ${leadId}, ${JSON.stringify(l.utm)}::jsonb, ${l.variant})
      on conflict (lead_public_id) where event = 'lead_created' do nothing`;
  } else {
    // Omezení četnosti: nejvýš 20 nových odeslání za hodinu z jedné IP (uložen jen otisk IP, viz lib/ratelimit.ts).
    if (await prekrocenLimit(sql, request, "lead")) return Response.json({ error: "too_many" }, { status: 429 });

    // Lead i konverze "lead_created" v jednom příkazu (CTE), takže se uloží buď oba, nebo nic.
    // "on conflict do nothing" pokryje souběžné odeslání stejného klíče: druhý pokus nevloží nic.
    const inserted = await sql`
      with novy as (
        insert into leads (email, marketing_consent, consent_text_version, consent_ts, idempotency_key, session_id, utm, variant)
        values (${email.trim().toLowerCase()}, ${marketingConsent}, ${CONSENT_TEXT_VERSION},
                ${marketingConsent ? new Date().toISOString() : null}, ${idempotency_key}, ${session_id},
                ${JSON.stringify(utm)}::jsonb, ${variant})
        on conflict (idempotency_key) do nothing
        returning public_id
      )
      insert into events (event, session_id, lead_public_id, utm, variant)
      select 'lead_created', ${session_id}, public_id, ${JSON.stringify(utm)}::jsonb, ${variant} from novy
      returning lead_public_id`;
    if (inserted.length > 0) {
      leadId = inserted[0].lead_public_id;
    } else {
      const again = await sql`select public_id from leads where idempotency_key = ${idempotency_key}`;
      leadId = again[0].public_id;
    }
  }

  // Token k přehledu: podepsaný, platí 24 hodin, bez e-mailu uvnitř (viz lib/token.ts).
  return Response.json({ ok: true, lead_id: leadId, token: vydejToken() });
}
