// Pořadí řádků na stránce (tabulka, výběr v kalkulačce, přehled). Je záměrně na jednom místě.
// Teď abecedně podle tickeru (neutrální řazení, jako v data/etf.json). Pořadí na stránce lze změnit tady; není hodnocením fondů.
export const PORADI_TICKERU = ["DIA", "IVV", "VOO", "VT"];

// Vrátí kopii pole párů seřazenou podle PORADI_TICKERU (neznámý ticker jde na konec, v původním pořadí).
export function serad<T extends { us: { ticker: string } }>(pary: T[]): T[] {
  const index = (t: string) => {
    const i = PORADI_TICKERU.indexOf(t);
    return i === -1 ? PORADI_TICKERU.length : i;
  };
  return [...pary].sort((a, b) => index(a.us.ticker) - index(b.us.ticker));
}
