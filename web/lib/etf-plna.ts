// Plná data o ETF včetně ISIN a odkazů na české KID (obsah za e-mailem).
// Importuje je JEN serverová stránka /prehled po ověření tokenu; klientské komponenty používají lib/etf.ts.
import data from "@/data/etf.json";
import { serad } from "@/lib/poradi";

export type EtfData = typeof data;

// Stejné pořadí jako na stránce (lib/poradi.ts).
export const etfPlna: EtfData = { ...data, pary: serad(data.pary) };
