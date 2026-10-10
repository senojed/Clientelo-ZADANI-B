// Stránka s plným přehledem: /prehled?t=<token>. Server ověří podepsaný token a teprve pak pošle plná data.
// Přehled má vlastní adresu, takže přežije obnovení stránky a jde ho uložit nebo znovu otevřít (24 h).
import Link from "next/link";
import { Suspense } from "react";
import { etfPlna } from "@/lib/etf-plna";
import { overToken } from "@/lib/token";
import Prehled from "@/components/Prehled";

// Odkaz s tokenem nemá být ve vyhledávačích.
export const metadata = { title: "Přehled: americká ETF a UCITS alternativy", robots: { index: false, follow: false } };

async function Obsah({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  if (!overToken(t)) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">Odkaz na přehled vypršel nebo není platný</h1>
        <p>Odkaz platí 24 hodin. Nový získáš zdarma na úvodní stránce.</p>
        <Link href="/#formular" className="rounded-box bg-accent px-5 py-3 text-center font-medium text-accent-foreground">
          Zpět na srovnání
        </Link>
      </div>
    );
  }
  return <Prehled data={etfPlna} />;
}

export default function PrehledStranka({ searchParams }: PageProps<"/prehled">) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <Suspense fallback={<p>Načítám přehled...</p>}>
        <Obsah searchParams={searchParams as Promise<{ t?: string }>} />
      </Suspense>
    </main>
  );
}
