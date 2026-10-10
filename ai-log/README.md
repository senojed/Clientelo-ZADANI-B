# ai-log: záznam práce s AI

| Složka / soubor | Co obsahuje | Původ |
|---|---|---|
| `claude-code/hlavni-session.md` | Hlavní konverzace s Claude Code (plánování, ověřování dat, kód, nasazení) | Převod záznamu Claude Code (JSONL) skriptem `scripts/ai-log-export.py` |
| `claude-code/subagenti/` | Pomocní agenti spuštění z hlavní konverzace: LLM council (5 poradců, 5 recenzentů) a nezávislý audit proti zadání | Totéž, každý agent zvlášť |
| (v hlavní konverzaci) | Dotazy na Codex v aplikaci Codex (druhý názor, review textů): Jan je kopíroval do konverzace s Claude Code, proto jsou v `hlavni-session.md` jako vložený text | Ruční kopírování, samostatný export z Codexu není |
| `review/plan-consensus/` | 18 kol revize plánu Claude a Codex (Codex CLI přes `codex exec`) a závěrečný verdikt | Výstupy skriptu plan-consensus |
| `chyby-ai.md` | Kde se AI mýlila a jak se to zjistilo | Psáno průběžně |
| `casovy-log.md` | Kolik co trvalo | Psáno průběžně |

## Redakce

Zadání chce export příkazem `/export`. Ten v desktopové aplikaci Claude Code nebyl k dispozici a surový export obsahuje osobní údaje, proto je tu náhrada: převod záznamu konverzace (JSONL), který Claude Code ukládá, na Markdown s redakcí. Surové záznamy leží mimo repozitář. Do repa jde jen převedená a redigovaná kopie:

- e-mailové adresy, absolutní cesty k osobním složkám, klíče, hesla a připojovací řetězce jsou nahrazené `[redacted ...]`;
- jména třetích osob (z e-mailové korespondence) nahrazena `[redacted jméno]`; seznam jmen je mimo repozitář;
- čtení a výsledky z osobní wiki a paměti asistenta jsou vynechané celé (`[redacted obsah osobní wiki nebo paměti]`);
- výsledky nástrojů jsou zkrácené na 400 znaků (plné výstupy by měly desítky MB), odpovědi subagentů jsou celé;
- obsah souborů zapisovaných nástroji Write a Edit je zkrácený na 600 znaků (výsledný soubor je v repozitáři a v historii commitů); příkazy, dotazy a prompty jsou celé;
- interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

Prompty, odpovědi, chyby AI, příkazy a časová posloupnost zůstávají beze změny. Časy jsou v UTC (místní čas = UTC + 2 h).
