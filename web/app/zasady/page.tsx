// Zásady zpracování osobních údajů (demo). Členěno podle účelů, u každého právní základ (čl. 13 GDPR).
// Právní kvalifikace neprošla kontrolou právníka, viz README.
import Link from "next/link";

export const metadata = { title: "Zásady zpracování osobních údajů" };

export default function Zasady() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Zásady zpracování osobních údajů</h1>
      <p className="text-sm text-muted">
        Verze textu 2026-10-10-v3. Stránka je ukázka vytvořená pro výběrové řízení; právní posouzení textu nebylo provedeno.
      </p>

      <h2 className="text-lg font-semibold">Kdo údaje zpracovává</h2>
      <p>Správce: Jan Reich, autor této stránky. Kontakt: doplní se před spuštěním kampaně (demo).</p>

      <h2 className="text-lg font-semibold">Jaké údaje, proč a na jakém základě</h2>
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>
          <span className="font-medium">E-mail z formuláře.</span> Přehled je za e-mail: po odeslání ti ho hned otevřeme a
          e-mail uložíme jako záznam, komu jsme přehled poskytli (abychom mohli vyhodnotit zájem o něj, odpovědět na tvé
          dotazy a vyřídit tvá práva). Základ: náš oprávněný zájem (čl. 6 odst. 1 písm. f GDPR); můžeš vznést námitku a
          e-mail smažeme. Bez souhlasu ti na něj neposíláme žádné novinky.
        </li>
        <li>
          <span className="font-medium">Novinky o ETF.</span> Jen když zaškrtneš nepovinné políčko. Základ: tvůj souhlas
          (písm. a). Ukládáme ho s časem a verzí textu a můžeš ho kdykoli odvolat.
        </li>
        <li>
          <span className="font-medium">Měření návštěvy.</span> Pseudonymní události (zobrazení sekce, kliknutí, odeslání
          formuláře) s náhodným identifikátorem, který žije jen do zavření nebo obnovení stránky. Pokud přijdeš z reklamy,
          uložíme i parametry odkazu (zdroj kampaně a identifikátor kliknutí fbclid, který k odkazu přidává Meta); Metě
          ani nikomu dalšímu je neposíláme. Po odeslání formuláře se
          události z té návštěvy propojí s tvým kontaktem. Nepoužíváme cookies, nic neukládáme do tvého zařízení a
          nepoužíváme reklamní pixely ani analytické služby třetích stran. Základ: oprávněný zájem vyhodnotit, jak stránka
          funguje (písm. f); můžeš vznést námitku.
        </li>
        <li>
          <span className="font-medium">Ochrana formuláře proti zneužití.</span> Z IP adresy ukládáme jen otisk (nelze z něj
          IP zjistit), abychom omezili hromadné odesílání formuláře a měřicích událostí; otisky starší než den se mažou
          jednou denně. Základ: oprávněný zájem (písm. f).
        </li>
      </ul>

      <h2 className="text-lg font-semibold">Kdo údaje technicky zpracovává</h2>
      <p>
        Hosting Vercel Inc. (USA); serverové funkce běží v regionu Frankfurt, poskytovatel ale může údaje zpracovat i v USA.
        Předání do USA: Vercel je certifikován v rámci EU-US Data Privacy Framework (rozhodnutí Komise o odpovídající
        ochraně údajů).
        Databáze Neon (region EU, Frankfurt). Technické logy hostingu mohou obsahovat IP adresu, prohlížeč, čas a adresu
        stránky; jejich rozsah a dobu uchování určuje poskytovatel.
      </p>

      <h2 className="text-lg font-semibold">Jak dlouho</h2>
      <p>
        Údaje z této ukázkové stránky budou po skončení výběrového řízení smazány. Souhlas s novinkami platí do odvolání,
        nejdéle do stejného data. Otisky IP starší než den se mažou automaticky jednou denně.
      </p>

      <h2 className="text-lg font-semibold">Tvoje práva</h2>
      <p>
        Můžeš požádat o přístup k údajům, jejich opravu, výmaz, omezení zpracování a přenositelnost, vznést námitku proti
        zpracování na základě oprávněného zájmu a kdykoli odvolat souhlas s novinkami. Máš také právo podat stížnost u Úřadu
        pro ochranu osobních údajů (uoou.gov.cz).
      </p>
      <p>
        <Link href="/" className="underline">
          Zpět na srovnání
        </Link>
      </p>
    </main>
  );
}
