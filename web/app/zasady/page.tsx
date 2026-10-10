// Zásady zpracování osobních údajů (demo). Členěno podle účelů, u každého právní základ (čl. 13 GDPR).
// Právní kvalifikace neprošla kontrolou právníka, viz README.
import Link from "next/link";

export const metadata = { title: "Zásady zpracování osobních údajů" };

export default function Zasady() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Zásady zpracování osobních údajů</h1>
      <p className="text-sm text-muted">
        Verze textu 2026-10-10-v3. Stránka je ukázka vytvořená pro výběrové řízení; právní posouzení textu nebylo provedeno.
      </p>

      <h2 className="text-lg font-medium">Kdo údaje zpracovává</h2>
      <p>Správce: Jan Reich, autor této stránky. Kontakt: doplní se před spuštěním kampaně (demo).</p>

      <h2 className="text-lg font-medium">Jaké údaje, proč a&nbsp;na jakém základě</h2>
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>
          <span className="font-medium">E-mail z&nbsp;formuláře.</span> Přehled je za e-mail: po odeslání ti ho hned otevřeme a&nbsp;e-mail uložíme jako záznam, komu jsme přehled poskytli (abychom mohli vyhodnotit zájem o&nbsp;něj, odpovědět na tvé
          dotazy a&nbsp;vyřídit tvá práva). Základ: náš oprávněný zájem (čl. 6 odst. 1 písm. f GDPR); můžeš vznést námitku a&nbsp;e-mail smažeme. Bez souhlasu ti na něj neposíláme žádné novinky.
        </li>
        <li>
          <span className="font-medium">Novinky o ETF.</span> Jen když zaškrtneš nepovinné políčko. Základ: tvůj souhlas
          (písm. a). Ukládáme ho s&nbsp;časem a&nbsp;verzí textu a&nbsp;můžeš ho kdykoli odvolat.
        </li>
        <li>
          <span className="font-medium">Měření návštěvy.</span> Pseudonymní události (zobrazení sekce, kliknutí, odeslání
          formuláře) s&nbsp;náhodným identifikátorem, který žije jen do zavření nebo obnovení stránky. Pokud přijdeš z&nbsp;reklamy,
          uložíme i&nbsp;parametry odkazu (zdroj kampaně a&nbsp;identifikátor kliknutí fbclid, který k&nbsp;odkazu přidává Meta); Metě
          ani nikomu dalšímu je neposíláme. Po odeslání formuláře se
          události z&nbsp;té návštěvy propojí s&nbsp;tvým kontaktem. Nepoužíváme cookies, nic neukládáme do tvého zařízení a&nbsp;nepoužíváme reklamní pixely ani analytické služby třetích stran. Základ: oprávněný zájem vyhodnotit, jak stránka
          funguje (písm. f); můžeš vznést námitku.
        </li>
        <li>
          <span className="font-medium">Ochrana formuláře proti zneužití.</span> Z&nbsp;IP adresy ukládáme jen otisk (nelze z&nbsp;něj
          IP zjistit), abychom omezili hromadné odesílání formuláře a&nbsp;měřicích událostí; otisky starší než den se mažou
          jednou denně. Základ: oprávněný zájem (písm. f).
        </li>
      </ul>

      <h2 className="text-lg font-medium">Kdo údaje technicky zpracovává</h2>
      <p>
        Hosting Vercel Inc. (USA); serverové funkce běží v&nbsp;regionu Frankfurt, poskytovatel ale může údaje zpracovat i&nbsp;v&nbsp;USA.
        Předání do USA: Vercel je certifikován v&nbsp;rámci EU-US Data Privacy Framework (rozhodnutí Komise o&nbsp;odpovídající
        ochraně údajů).
        Databáze Neon (region EU, Frankfurt). Technické logy hostingu mohou obsahovat IP adresu, prohlížeč, čas a&nbsp;adresu
        stránky; jejich rozsah a&nbsp;dobu uchování určuje poskytovatel.
      </p>

      <h2 className="text-lg font-medium">Jak dlouho</h2>
      <p>
        Údaje z&nbsp;této ukázkové stránky budou po skončení výběrového řízení smazány. Souhlas s&nbsp;novinkami platí do odvolání,
        nejdéle do stejného data. Otisky IP starší než den se mažou automaticky jednou denně.
      </p>

      <h2 className="text-lg font-medium">Tvoje práva</h2>
      <p>
        Můžeš požádat o&nbsp;přístup k&nbsp;údajům, jejich opravu, výmaz, omezení zpracování a&nbsp;přenositelnost, vznést námitku proti
        zpracování na základě oprávněného zájmu a&nbsp;kdykoli odvolat souhlas s&nbsp;novinkami. Máš také právo podat stížnost u&nbsp;Úřadu
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
