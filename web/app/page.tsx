// Provizorní úvodní stránka pro technický test (spike). Finální landing page nahradí tento obsah.
import SpikeForm from "@/components/SpikeForm";

export const metadata = {
  title: "Technický test",
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <main className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Technický test formuláře a měření</h1>
      <p className="text-sm">Provizorní stránka. Žádná data o ETF, jen ověření, že formulář a měření fungují.</p>
      <SpikeForm />
    </main>
  );
}
