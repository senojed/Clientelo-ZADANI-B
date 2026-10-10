// Zásady zpracování osobních údajů (krátká verze pro demo). Právní kvalifikace neověřena, viz README.
import Link from "next/link";

export const metadata = { title: "Zásady zpracování osobních údajů" };

export default function Zasady() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Zásady zpracování osobních údajů</h1>
      <p className="text-sm text-muted">Verze textu 2026-10-09-v1. Stránka je demo vytvořené pro výběrové řízení.</p>
      <h2 className="text-lg font-semibold">Kdo údaje zpracovává</h2>
      <p>Jan Reich, autor této stránky. Kontakt: [doplní Jan].</p>
      <h2 className="text-lg font-semibold">Jaké údaje a proč</h2>
      <ul className="list-disc pl-5">
        <li>
          E-mail z formuláře: abychom ti zpřístupnili přehled, o který žádáš. E-mail uložíme jako kontakt k tomuto přehledu.
        </li>
        <li>
          Novinky o ETF posíláme jen tehdy, když zaškrtneš nepovinné políčko. Souhlas ukládáme s časem a verzí textu a můžeš
          ho kdykoli odvolat.
        </li>
        <li>
          Měření návštěvy: anonymní události (např. zobrazení sekce, kliknutí na tlačítko) s náhodným identifikátorem, který
          žije jen do zavření nebo obnovení stránky. Nepoužíváme cookies, reklamní pixely ani analytické služby třetích stran.
          Po odeslání formuláře se události navážou na tvůj kontakt.
        </li>
      </ul>
      <h2 className="text-lg font-semibold">Kdo údaje technicky zpracovává</h2>
      <p>
        Hosting Vercel a databáze Neon (region EU, Frankfurt). Technické logy hostingu mohou obsahovat IP adresu, prohlížeč,
        čas a adresu stránky; jejich rozsah a dobu uchování určuje poskytovatel.
      </p>
      <h2 className="text-lg font-semibold">Jak dlouho</h2>
      <p>Údaje z této demo stránky budou po skončení výběrového řízení smazány.</p>
      <h2 className="text-lg font-semibold">Tvoje práva</h2>
      <p>Můžeš požádat o přístup k údajům, jejich opravu nebo výmaz a odvolat souhlas s novinkami.</p>
      <p>
        <Link href="/" className="underline">
          Zpět na srovnání
        </Link>
      </p>
    </main>
  );
}
