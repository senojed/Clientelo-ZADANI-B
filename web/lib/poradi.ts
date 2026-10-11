// Pořadí řádků na stránce (tabulka, výběr v kalkulačce, přehled). Je záměrně na jednom místě.
// Data v data/etf.json zůstávají seřazená abecedně podle tickeru; pořadí na stránce určuje autor stránky a není hodnocením fondů.
export const PORADI_TICKERU = ["VOO", "VT", "DIA", "IVV"];

// Vrátí kopii pole párů seřazenou podle PORADI_TICKERU (neznámý ticker jde na konec, v původním pořadí).
export function serad<T extends { us: { ticker: string } }>(pary: T[]): T[] {
  const index = (t: string) => {
    const i = PORADI_TICKERU.indexOf(t);
    return i === -1 ? PORADI_TICKERU.length : i;
  };
  return [...pary].sort((a, b) => index(a.us.ticker) - index(b.us.ticker));
}
