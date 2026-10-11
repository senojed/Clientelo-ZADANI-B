# Reklama B: hák "přehled 4 ETF" (v3)

Stav: texty a vizuály hotové (v3, po auditu 1; vizuály vytvořil Jan), podle pravidel Meta k 10. 10. 2026 spustitelné bez certifikace inzerenta (viz `compliance/checklist.md`) **po kontrole vizuálu v náhledu Ads Manageru** (okraje 9:16, čitelnost upozornění).

- **Platforma a formát (předběžně):** Meta (Facebook, Instagram), karusel nebo jeden obrázek 1080×1350, mobil
- **Headline:** 4 americká ETF a jejich evropské alternativy
- **Hlavní text:** S&P 500, Dow Jones a celý svět: srovnali jsme 4 známá americká ETF a jejich UCITS alternativy na stejný index. Roční náklady a kontrolní seznam pro brokera, ověřeno 9. a 10. 10. 2026. Srovnání hned, celý přehled s ISIN zdarma za e-mail. Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty.
- **Popis:** Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty. (upozornění je i v hlavním textu a ve vizuálu, protože Popis se ve všech umístěních nezobrazuje)
- **Tlačítko (CTA):** Další informace
- **Vizuál / koncept:** výřez tabulky (2 řádky čitelně, zbytek naznačený), malé "ověřeno 9. a 10. 10. 2026" a "zdroj u každého řádku". Bez superlativů. Ve vizuálu čitelně: "Marketingové sdělení. Investice nesou riziko ztráty."
- **Cílení:** ČR, čeština, 18+; zájmy finance a investování jen pokud to platforma dovolí, jinak široké cílení
- **UTM:** `?utm_source=meta&utm_medium=paid_social&utm_campaign=etf_prehled&utm_content=ad_b` (cíl: https://clientelo-zadani-b.vercel.app/)
- **Návaznost na první obrazovku:** obě reklamy vedou na stejnou stránku s nadpisem "Evropské alternativy amerických ETF" (štítek "Srovnání"). Měření pozná reklamu podle `utm_content=ad_b` (varianta "b").


## Vizuál

![4:5 feed](ad-b-1080x1350.png)

![9:16 Stories a Reels](ad-b-1080x1920.png)

Upozornění na riziko je přímo v obrázku. U 9:16 leží obsah mimo horních 250 px a dolních 350 px (přibližná rezerva pro rozhraní, ověřit v náhledu). Obrázek nemá falešné tlačítko, klikací je tlačítko Mety ("Další informace"). Čísla v obrázku odpovídají `data/etf.json`.
