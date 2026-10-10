// Měření v prohlížeči bez cookies a bez ukládání do zařízení.
// session_id žije jen v paměti stránky: po obnovení stránky vznikne nový (známé omezení, viz PLAN.md).
"use client";

let sessionId: string | null = null;
let leadId: string | null = null;
export function getSessionId(): string {
  if (!sessionId) sessionId = crypto.randomUUID();
  return sessionId;
}

export function setLeadId(id: string) {
  leadId = id;
}

// UTM parametry čteme z adresy, kterou přišel návštěvník z reklamy.
// Varianta (a/b) = která reklama ho přivedla, podle utm_content ("ad_a" -> "a"); jinak null.
export function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  const m = /^ad_([ab])$/.exec(utm.utm_content ?? "");
  return { utm, variant: m ? m[1] : null };
}

// sendBeacon odešle data i ve chvíli, kdy návštěvník odchází ze stránky (např. klik na stažení).
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
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", payload);
  } else {
    fetch("/api/events", { method: "POST", body: payload, keepalive: true });
  }
}
