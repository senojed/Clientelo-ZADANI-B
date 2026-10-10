# Převod surového záznamu konverzace Claude Code (JSONL) na čitelný Markdown pro složku ai-log/.
# Zároveň rediguje: osobní údaje (e-maily, absolutní cesty k osobním složkám), tajemství (klíče, hesla,
# připojovací řetězce) a obsah osobní wiki. Každá úprava je označená [redacted ...].
#
# Použití (surové záznamy leží mimo repozitář, do repa jde jen výstup):
#   AI_LOG_JMENA="..." python scripts/ai-log-export.py <vstup.jsonl> <výstup.md> "<nadpis>"
import json
import os
import re
import sys

MAX_TOOL_INPUT = 600     # kolik znaků vstupu nástroje ukázat (příkaz, cesta, dotaz)
MAX_TOOL_RESULT = 400    # výsledky nástrojů jen zkráceně, celé by byly desítky MB
CELE = {"Agent", "Task"}  # nástroje, jejichž výsledek (odpověď subagenta) se ukáže celý

# Pořadí je důležité: nejdřív tajemství, pak e-maily, pak cesty.
REDAKCE = [
    (re.compile(r"postgres(?:ql)?://[^\s'\"`]+"), "[redacted připojovací řetězec]"),
    (re.compile(r"\bnpg_[A-Za-z0-9]{8,}"), "[redacted heslo]"),
    (re.compile(r"\b(?:sk|pk|fc|ghp|gho|github_pat|vercel|vck|xox[bap])[-_][A-Za-z0-9_\-]{16,}"), "[redacted klíč]"),
    (re.compile(r"\b(?:DATABASE_URL\w*|DOWNLOAD_TOKEN_SECRET|VERCEL_TOKEN|\w*API_KEY)\s*=\s*\S+"), r"[redacted proměnná]"),
    (re.compile(r"\b[A-Fa-f0-9]{48,}\b"), "[redacted dlouhý hex]"),
    (re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"), "[redacted e-mail]"),
    # Absolutní cesty k projektu nahradíme relativními, ostatní osobní cesty skryjeme.
    (re.compile(r"(?i)[A-Z]:[\\/]+Users[\\/]+[^\\/\s]+[\\/]+Nextcloud[\\/]+Jan[\\/]+Work[\\/]+Clientelo[\\/]+ZADANIE B[\\/]*"), ""),
    (re.compile(r"(?i)/?[a-z]/Users/[^/\s]+/Nextcloud/Jan/Work/Clientelo/ZADANIE B/?"), ""),
    (re.compile(r"(?i)[A-Z]:[\\/]+Users[\\/]+[^\s'\"`)]+"), "[redacted cesta]"),
    (re.compile(r"(?i)/[a-z]/Users/[^\s'\"`)]+"), "[redacted cesta]"),
    (re.compile(r"(?i)~[\\/]\.claude[^\s'\"`)]*"), "[redacted cesta]"),
    # Dočasné složky Claude Code mají v názvu uživatelské jméno (např. "C--Users-<jméno>-...").
    (re.compile(r"(?:\.\./)*(?:AppData/Local/Temp/claude/)?C--Users-[^\s'\"`)]+"), "[redacted cesta]"),
]

# Jména třetích osob (např. z e-mailové korespondence) se předávají mimo repozitář,
# aby skript sám jména nezveřejnil: proměnná prostředí AI_LOG_JMENA="Jméno1,Jméno2".
for jmeno in filter(None, os.environ.get("AI_LOG_JMENA", "").split(",")):
    REDAKCE.append((re.compile(re.escape(jmeno.strip()) + r"\w*"), "[redacted jméno]"))

# Výsledky čtení osobní wiki a paměti se nezveřejňují vůbec.
SOUKROME = re.compile(r"(?i)obsidian-vault|VaultOfSecrets|\.claude[\\/]+(?:projects|CLAUDE\.md)|[\\/]memory[\\/]")


def rediguj(text: str) -> str:
    for vzor, nahrada in REDAKCE:
        text = vzor.sub(nahrada, text)
    return text


def zkrat(text: str, n: int) -> str:
    return text if len(text) <= n else text[:n] + f" … [zkráceno, {len(text)} znaků]"


def text_obsahu(obsah) -> str:
    if isinstance(obsah, str):
        return obsah
    casti = []
    for c in obsah or []:
        if c.get("type") == "text":
            casti.append(c.get("text", ""))
        elif c.get("type") == "image":
            casti.append("[obrázek]")
    return "\n".join(casti)


def main(vstup: str, vystup: str, nadpis: str) -> None:
    radky = [f"# {nadpis}", "", "Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).",
             "Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;",
             f"výsledky nástrojů zkráceny na {MAX_TOOL_RESULT} znaků; interní úvahy modelu (thinking) nejsou součástí.", ""]
    soukrome_volani = set()  # id volání nástrojů, která četla osobní wiki
    nazvy_volani = {}        # id volání -> název nástroje (výsledky subagentů se nezkracují)

    for radek in open(vstup, encoding="utf-8"):
        try:
            d = json.loads(radek)
        except json.JSONDecodeError:
            continue
        typ = d.get("type")
        cas = d.get("timestamp", "")[:16].replace("T", " ")
        zprava = d.get("message") or {}
        obsah = zprava.get("content")

        if typ == "user" and (isinstance(obsah, str) or any(c.get("type") == "text" for c in obsah or [])):
            t = text_obsahu(obsah).strip()
            if t.startswith("<") and ("system-reminder" in t[:40] or "command-" in t[:40]):
                continue
            radky += [f"## Uživatel ({cas} UTC)", "", rediguj(t), ""]
        elif typ == "user" and isinstance(obsah, list):
            for c in obsah:
                if c.get("type") != "tool_result":
                    continue
                if c.get("tool_use_id") in soukrome_volani:
                    radky += ["> výsledek: [redacted obsah osobní wiki nebo paměti]", ""]
                    continue
                vysledek = c.get("content")
                t = text_obsahu(vysledek) if not isinstance(vysledek, str) else vysledek
                radky += ["> výsledek: " + rediguj(zkrat(t.strip(), MAX_TOOL_RESULT)).replace("\n", "\n> "), ""]
        elif typ == "assistant" and isinstance(obsah, list):
            for c in obsah:
                if c.get("type") == "text" and c.get("text", "").strip():
                    radky += [f"## Claude ({cas} UTC)", "", rediguj(c["text"].strip()), ""]
                elif c.get("type") == "tool_use":
                    nazvy_volani[c.get("id")] = c.get("name")
                    if c.get("name") == "SubagentHandback":
                        zprava_sub = str(c.get("input", {}).get("message", ""))
                        radky += [f"## Odpověď subagenta ({cas} UTC)", "", rediguj(zprava_sub.strip()), ""]
                        continue
                    vstup_nastroje = json.dumps(c.get("input", {}), ensure_ascii=False)
                    if SOUKROME.search(vstup_nastroje):
                        soukrome_volani.add(c.get("id"))
                        radky += [f"**Nástroj {c.get('name')}:** [redacted přístup k osobní wiki nebo paměti]", ""]
                        continue
                    # Zadání pro subagenta je prompt, ten se zachová celý.
                    if c.get("name") not in CELE:
                        vstup_nastroje = zkrat(vstup_nastroje, MAX_TOOL_INPUT)
                    radky += [f"**Nástroj {c.get('name')}:**", "```", rediguj(vstup_nastroje), "```", ""]

    with open(vystup, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(radky))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
