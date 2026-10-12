# ai-log: záznam práce s AI

| Složka / soubor | Co obsahuje | Původ |
|---|---|---|
| `claude-code/01` až `06` | Hlavní konverzace s Claude Code po sezeních (Claude Code ji kvůli délce několikrát shrnul do nového sezení): 01 výběr zadání, 02 rada a návrh plánu, 03 revize plánu s Codexem, 04 data, stránka a audit 1, 05 a 06 reklamy, PDF, README a audit 2 | Převod záznamu Claude Code (JSONL) skriptem `scripts/ai-log-export.py` |
| `claude-code/07-designovy-chat.md` | Samostatné sezení, ve kterém se tmavý design Jana převáděl do kódu (podle `design/ZADANI-DESIGN.md`) | Totéž |
| `claude-code/subagenti/` | Pomocní agenti spuštění z hlavních sezení: LLM council (5 poradců, 5 recenzentů) a nezávislé audity proti zadání; název souboru začíná zkratkou sezení | Totéž, každý agent zvlášť |
| (v hlavní konverzaci) | Dotazy na Codex v aplikaci Codex (druhý názor, review textů): Jan je kopíroval do konverzace s Claude Code, proto jsou v `hlavni-session.md` jako vložený text | Ruční kopírování, samostatný export z Codexu není |
| `review/plan-consensus/` | 18 kol revize plánu Claude a Codex (Codex CLI přes `codex exec`) a závěrečný verdikt | Výstupy skriptu plan-consensus |
| `chyby-ai.md` | Kde se AI mýlila a jak se to zjistilo | Psáno průběžně |
| `casovy-log.md` | Kolik co trvalo | Psáno průběžně |

## Redakce

Zadání chce export příkazem `/export`. Ten v desktopové aplikaci Claude Code nebyl k dispozici a surový export obsahuje osobní údaje, proto je tu náhrada: převod záznamu konverzace (JSONL), který Claude Code ukládá, na Markdown s redakcí. Surové záznamy leží mimo repozitář. Do repa jde jen převedená a redigovaná kopie:

- e-mailové adresy, absolutní cesty k osobním složkám, klíče, hesla a připojovací řetězce jsou nahrazené `[redacted ...]`;
- adresy z privátních sítí a VPN nahrazeny `[redacted IP]`;
- jména třetích osob (z e-mailové korespondence) nahrazena `[redacted jméno]`; seznam jmen je mimo repozitář;
- čtení a výsledky z osobní wiki a paměti asistenta jsou vynechané celé (`[redacted obsah osobní wiki nebo paměti]`);
- výsledky nástrojů jsou zkrácené na 400 znaků (plné výstupy by měly desítky MB), odpovědi subagentů jsou celé;
- obsah souborů zapisovaných nástroji Write a Edit je zkrácený na 600 znaků (výsledný soubor je v repozitáři a v historii commitů); příkazy, dotazy a prompty jsou celé;
- interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

Prompty, odpovědi, chyby AI, příkazy a časová posloupnost zůstávají beze změny. Časy jsou v UTC (místní čas = UTC + 2 h). Export posledního sezení (06) je stav k datu odevzdání; sezení trvalo i po něm, finální export se obnovuje těsně před zveřejněním.
