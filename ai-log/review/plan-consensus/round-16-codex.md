## IMPORTANT

- **Bod 5 – výpočet poplatků:** Interakce obsahuje dobu investování, ale výsledek je definován jako roční rozdíl. Chybí vzorec a význam časového vstupu; implementace může nechtěně vydávat víceletý odhad za roční náklad. **Oprava:** Pro minimum odstranit dobu investování a použít `částka × (roční sazba A − roční sazba B)`. Uvést předpoklad konstantní hodnoty investice a vyloučení výnosů, kurzů a dalších nákladů.

- **Body 6–7 – odeslání a konverze:** Není určeno, zda událost odeslání znamená pokus, nebo úspěšné uložení leadu. Chybí také ochrana proti duplicitám při dvojkliku či opakování požadavku po výpadku odpovědi. To může zkreslit hlavní výsledek měření. **Oprava:** Oddělit pokus od úspěchu; úspěšnou konverzi zaznamenat serverově při uložení leadu. Jednomu pokusu přidělit identifikátor, při opakování vrátit stejný výsledek a nezaložit další lead ani konverzi.

## VERDICT
CHANGES_NEEDED