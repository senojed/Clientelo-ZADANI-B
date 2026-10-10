// Plná data o ETF včetně ISIN a odkazů na české KID (obsah za e-mailem).
// Importuje je JEN serverová stránka /prehled po ověření tokenu; klientské komponenty používají lib/etf.ts.
import data from "@/data/etf.json";

export type EtfData = typeof data;

export const etfPlna: EtfData = data;
