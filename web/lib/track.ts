// Měření v prohlížeči bez cookies a bez ukládání do zařízení.
// session_id žije jen v paměti stránky: po obnovení stránky vznikne nový (známé omezení, viz PLAN.md).
"use client";

let sessionId: string | null = null;
let leadId: string | null = null;
let atribuce: { utm: Record<string, string>; variant: string | null } | null = null;

// Náhodné UUID v4. crypto.randomUUID() existuje jen v zabezpečeném kontextu (https nebo localhost);
// jinde (např. vývojový server otevřený z telefonu přes http a IP adresu) by spadl celý web, proto záloha.
export function novyUuid(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export function getSessionId(): string {
  if (!sessionId) sessionId = novyUuid();
  return sessionId;
}

export function setLeadId(id: string) {
  leadId = id;
}

// UTM parametry čteme z adresy, kterou přišel návštěvník z reklamy, a to jen jednou:
// když pak přejde na zásady nebo přehled (adresa už UTM nemá), atribuce k reklamě zůstane.
// Varianta (a/b) = která reklama ho přivedla, podle utm_content ("ad_a" -> "a"); jinak null.
export function getAttribution() {
  if (atribuce) return atribuce;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  // fbclid přidává Meta k odkazu z reklamy; ukládáme ho spolu s UTM (viz lib/validate.ts).
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"]) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  const m = /^ad_([ab])$/.exec(utm.utm_content ?? "");
  atribuce = { utm, variant: m ? m[1] : null };
  return atribuce;
}

// sendBeacon odešle data i ve chvíli, kdy návštěvník odchází ze stránky (např. klik na stažení).
// Když ho prohlížeč odmítne (vrátí false), pošleme událost běžným požadavkem.
export function track(event: string, props: Record<string, string | number | boolean> = {}) {
  const { utm, variant } = getAttribution();
  const payload = JSON.stringify({
    event,
    session_id: getSessionId(),
    lead_id: leadId,
    utm,
    variant,
    props,
    ts: new Date().toISOString(),
  });
  const odeslano = navigator.sendBeacon ? navigator.sendBeacon("/api/events", payload) : false;
  if (!odeslano) {
    fetch("/api/events", { method: "POST", body: payload, keepalive: true }).catch(() => {});
  }
}
