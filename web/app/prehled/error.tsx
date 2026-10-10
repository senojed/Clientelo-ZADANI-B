// Když se přehled nepodaří načíst (chyba serveru), nabídne nové načtení se stejným odkazem.
// Token zůstává v adrese, takže není potřeba znovu vyplňovat formulář.
"use client";

export default function Chyba({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Přehled se nepodařilo načíst</h1>
      <p>Odkaz je pořád platný, formulář nemusíš vyplňovat znovu.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-box bg-accent px-5 py-3 font-medium text-accent-foreground"
      >
        Zkusit načíst znovu
      </button>
    </main>
  );
}
