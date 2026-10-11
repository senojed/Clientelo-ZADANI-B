// Veřejná data o ETF pro stránku (web/data/etf-verejne.json, vyrábí scripts/sync-data.mjs) a pomocné funkce.
// Veřejná část nemá ISIN ani odkazy na KID: ty jsou za e-mailem a importuje je jen server (lib/etf-plna.ts).
import data from "@/data/etf-verejne.json";
import { serad } from "@/lib/poradi";

export type EtfVerejne = typeof data;

// Pořadí párů na stránce určuje lib/poradi.ts (ne abeceda z dat).
export const etf: EtfVerejne = { ...data, pary: serad(data.pary) };

// Česká typografie: za jednopísmennou předložkou nebo spojkou (a, i, k, o, s, u, v, z) nesmí řádek skončit.
// Doplní nedělitelnou mezeru; používá se u textů z dat, které se do kódu nepíšou ručně.
export function tvrdaMezera(text: string): string {
  return text.replace(/(^|[\s(;])([aiksuvzoAIKSUVZO])\s+(?=\S)/g, "$1$2 ");
}

// Krátký popis zaměření pro člověka, který zkratky indexů nezná.
export const zamereni: Record<string, string> = {
  DIA: "30 velkých amerických firem (index Dow Jones)",
  IVV: "500 velkých amerických firem (index S&P 500)",
  VOO: "500 velkých amerických firem (index S&P 500)",
  VT: "akcie z celého světa (index FTSE Global All Cap)",
};

// 0.07 -> "0,07 %" (česká desetinná čárka).
export function pct(v: number): string {
  return `${v.toFixed(2).replace(".", ",")} %`;
}

// "2026-09-03" -> "3. 9. 2026"
export function datum(iso: string | null | undefined): string {
  if (!iso) return "neuvedeno";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
}

// Částka v Kč s mezerami po tisících.
export function kc(v: number): string {
  return `${Math.round(v).toLocaleString("cs-CZ")} Kč`;
}

// Roční poplatek fondu z částky: částka × roční náklady (%). Bez kurzů, spreadů, daní a poplatků brokera.
export function rocniPoplatek(castka: number, nakladyPct: number): number {
  return (castka * nakladyPct) / 100;
}
