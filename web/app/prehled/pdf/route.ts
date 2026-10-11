// Stažení PDF přehledu: /prehled/pdf?t=<token>. PDF leží mimo veřejnou složku (web/private) a vydá se jen s platným
// podepsaným tokenem, stejně jako přehled na stránce. Soubor do nasazení přibalí outputFileTracingIncludes v next.config.ts.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { overToken } from "@/lib/token";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("t");
  if (!overToken(token)) return new Response(null, { status: 401 });
  const soubor = await readFile(path.join(process.cwd(), "private", "prehled-etf.pdf"));
  return new Response(new Uint8Array(soubor), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="americka-etf-a-ucits-alternativy.pdf"',
      "Cache-Control": "private, no-store",
    },
  });
}
