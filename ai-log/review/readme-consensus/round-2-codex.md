Kontrola vychází z místního `main`, commit `010aab5`. Relativní odkazy existují, čísla Lighthouse odpovídají reportům. Živý průchod ani aktuální pravidla Meta se nepodařilo nezávisle ověřit. GitHub API potvrzuje soukromý repozitář, jak README správně uvádí.

## BLOCKING

Žádné nové nálezy.

## IMPORTANT

- **README:143, „Zdroje obrazu a fontů“:** zmínka „SIL Open Font License“ nestačí pro distribuci fontů. V repozitáři chybějí copyrightové doložky a úplné licence; nejsou ani v licenčních metadatech dodaných WOFF2. [OFL, podmínka 2](https://openfontlicense.org/open-font-license-official-text/), jejich přiložení vyžaduje. **Oprava:** přidat původní copyright a OFL pro každou rodinu a z README na ně odkázat. Do té doby uvést mezi nedodělky: „Před zveřejněním doplnit licenční doložky přibalených fontů.“

## NITS

- **README:144, licence videa:** „zakázané je jen …“ nesprávně zúžuje podmínky. [Shrnutí Pixabay](https://pixabay.com/service/license-summary/) obsahuje také omezení týkající se značek, protiprávního použití a dalších práv. **Nahradit:** „Licence umožňuje bezplatné použití a úpravy bez povinného uvedení autora, za podmínek Pixabay Content License.“ Výčet zákazů vypustit.

- **README:151, „Technické řešení“:** `scripts/sync-data.mjs` při čtení od kořene repozitáře neexistuje. **Opravit na:** `web/scripts/sync-data.mjs`.

- **README:114, „Pokyny agentům“:** odkaz na `ai-log/claude-code/subagenti/` dokládá Claude subagenty, nikoli pokyny Codexu. Úplné auditní instrukce načítané z externích `prompt-audit*.md` navíc export zkracuje. **Oprava:** oddělit odkazy pro Claude a Codex; přiložit úplná auditní zadání nebo formulovat přesněji: „Záznamy Claude auditorů jsou v …, výstupy obou auditorů a rozhodnutí v `ai-log/review/audit-1/` a `audit-2/`.“

## VERDICT

CHANGES_NEEDED