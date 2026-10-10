// Ověřená data o ETF (kopie data/etf.json z kořene repa) a pomocné funkce pro jejich zobrazení.
// Veřejná část (stránka) ukazuje jen souhrn; plný přehled s ISIN a odkazy na KID se vydává až po odeslání e-mailu.
import data from "@/data/etf.json";

export type EtfData = typeof data;
export type Par = EtfData["pary"][number];

export const etf: EtfData = data;

// Krátký popis zaměření pro člověka, který zkratky indexů nezná.
export const zamereni: Record<string, string> = {
  DIA: "30 velkých amerických firem (index Dow Jones)",
  IVV: "500 největších amerických firem (index S&P 500)",
  VOO: "500 největších amerických firem (index S&P 500)",
  VT: "akcie z celého světa (index FTSE Global All Cap)",
};

// 0.07 -> "0,07 %" (česká desetinná čárka).
export function pct(v: number): string {
  return `${v.toFixed(2).replace(".", ",")} %`;
}

// "2026-09-03" -> "3. 9. 2026"
export function datum(iso: string | null | undefined): string {
  if (!iso) return "neuvedeno";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
}

// Částka v Kč s mezerami po tisících.
export function kc(v: number): string {
  return `${Math.round(v).toLocaleString("cs-CZ")} Kč`;
}

// Roční poplatek fondu z částky: částka × roční náklady (%). Bez kurzů, spreadů, daní a poplatků brokera.
export function rocniPoplatek(castka: number, nakladyPct: number): number {
  return (castka * nakladyPct) / 100;
}
