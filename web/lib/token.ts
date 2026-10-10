// Podepsaný odkaz k přehledu: krátký token, který server vydá po odeslání e-mailu a sám si ho ověří.
// Nic se neukládá do databáze (bez stavu). Token obsahuje jen expiraci, rozsah a verzi přehledu, žádný e-mail.
import { createHmac, timingSafeEqual } from "node:crypto";

export const PREHLED_VERZE = "2026-10-10-v4";
const PLATNOST_MS = 24 * 60 * 60 * 1000;

function tajemstvi(): string {
  const s = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!s || s.length < 32) throw new Error("DOWNLOAD_TOKEN_SECRET chybí nebo je krátký");
  return s;
}

function podpis(data: string): string {
  return createHmac("sha256", tajemstvi()).update(data).digest("base64url");
}

export function vydejToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + PLATNOST_MS, scope: "prehled", v: PREHLED_VERZE }),
  ).toString("base64url");
  return `${payload}.${podpis(payload)}`;
}

// Vrátí true jen pro token s platným podpisem, neprošlou expirací a aktuální verzí přehledu.
export function overToken(token: unknown): boolean {
  if (typeof token !== "string" || token.length > 500) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const ocekavany = Buffer.from(podpis(payload));
  const prijaty = Buffer.from(sig);
  if (ocekavany.length !== prijaty.length || !timingSafeEqual(ocekavany, prijaty)) return false;
  try {
    const d = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return d.scope === "prehled" && d.v === PREHLED_VERZE && typeof d.exp === "number" && d.exp > Date.now();
  } catch {
    return false;
  }
}
