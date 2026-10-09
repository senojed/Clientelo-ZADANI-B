// Kontrola vstupů z prohlížeče. Koncové body jsou veřejné, takže každému poli
// nastavíme tvar a maximální délku, aby do databáze nešel nesmysl nebo spam.

export const CONSENT_TEXT_VERSION = "2026-10-09-v1";

// Události, které smí poslat prohlížeč. "lead_created" mezi nimi není: tu zapisuje jen server.
export const CLIENT_EVENTS = [
  "page_view",
  "section_view",
  "interaction_used",
  "cta_click",
  "form_start",
  "form_submit_attempt",
  "pdf_requested",
  "pdf_download_clicked",
] as const;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Jednoduchá kontrola tvaru e-mailu. Existenci adresy neověřujeme (měkká brána, viz PLAN.md).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isUuid(v: unknown): v is string {
  return typeof v === "string" && UUID_RE.test(v);
}

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v);
}

export function isClientEvent(v: unknown): v is (typeof CLIENT_EVENTS)[number] {
  return typeof v === "string" && (CLIENT_EVENTS as readonly string[]).includes(v);
}

// Z UTM objektu necháme jen známé klíče a ořízneme délku.
export function cleanUtm(v: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!v || typeof v !== "object") return out;
  for (const key of UTM_KEYS) {
    const val = (v as Record<string, unknown>)[key];
    if (typeof val === "string" && val.length > 0) out[key] = val.slice(0, 100);
  }
  return out;
}

export function cleanVariant(v: unknown): string | null {
  return typeof v === "string" && /^[a-z0-9_-]{1,20}$/i.test(v) ? v : null;
}

// Malý objekt doplňkových údajů u události (např. název sekce). Omezíme velikost.
export function cleanProps(v: unknown): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!v || typeof v !== "object") return out;
  for (const [k, val] of Object.entries(v as Record<string, unknown>).slice(0, 10)) {
    if (!/^[a-z0-9_]{1,40}$/i.test(k)) continue;
    if (typeof val === "string") out[k] = val.slice(0, 100);
    else if (typeof val === "number" && Number.isFinite(val)) out[k] = val;
    else if (typeof val === "boolean") out[k] = val;
  }
  return out;
}

// Požadavek musí přijít z naší vlastní stránky (stejná doména), ne odjinud.
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
