// Vydá plný přehled (data s ISIN, odkazy na české KID, zdroje) jen držiteli platného tokenu z /api/lead.
import { etf } from "@/lib/etf";
import { overToken } from "@/lib/token";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("t");
  if (!overToken(token)) return Response.json({ error: "neplatny_odkaz" }, { status: 401 });
  return Response.json(etf, { headers: { "Cache-Control": "no-store" } });
}
