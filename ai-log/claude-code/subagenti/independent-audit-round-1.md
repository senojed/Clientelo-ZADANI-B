# Subagent: Independent audit round 1

Automaticky převedeno ze záznamu Claude Code (scripts/ai-log-export.py).
Redakce: e-maily, absolutní cesty, klíče a hesla nahrazeny [redacted ...]; obsah osobní wiki a paměti vynechán;
výsledky nástrojů zkráceny na 400 znaků (odpovědi subagentů celé), obsah zapisovaných souborů na 600 znaků;
příkazy a prompty jsou celé; interní úvahy modelu (thinking) a systémové zprávy aplikace nejsou součástí.

## Uživatel (2026-10-10 08:41 UTC)

Read the file [redacted cesta] and then [redacted cesta] (the assignment). Follow the instructions in prompt-audit.md exactly. The repository to audit is  (treat it as the current directory). You may fetch the live page https://clientelo-zadani-b.vercel.app with WebFetch or curl (read-only GET requests only; do NOT submit the form or POST anything). Do not modify any files in the repository. Ignore the folder ai-log/claude-code (it is a conversation log, not part of the product) except to confirm it exists. Write your full report (in Czech, format per prompt-audit.md) to ai-log\review\audit-1\round-1-claude.md and also return it as your final answer.

**Nástroj Read:**
```
{"file_path": "[redacted cesta]"}
```

> výsledek: 1	You are an independent, strict reviewer. You have NOT seen how this solution was made. Judge only the assignment and the repository.
> 2	
> 3	## Task
> 4	Audit the solution of assignment B (below, in Slovak) in the repository in the current directory (Next.js app in `web/`, data in `data/`, ads in `ads/`, compliance in `compliance/`, AI logs in `ai-log/`, `README.md`, `PLAN.md`). Live page: https://cl … [zkráceno, 3030 znaků]

**Nástroj Read:**
```
{"file_path": "[redacted cesta]"}
```

> výsledek: 1	Dobrý deň, pán Reich,
> 2	
> 3	ďakujem za Vašu prihlášku na pozíciu Junior AI Developer. Rád Vám oznamujem, že postupujete do ďalšieho kola výberového konania. Jeho súčasťou je praktická úloha, ktorá nám ukáže, ako pristupujete k problému a ako pracujete s AI. Pripravil som dve zadania, vyberte si jedno z nich.
> 4	
> 5	Pracovať môžete v Claude Code alebo v podobnom nástroji. Ak nestihnete všetko, upred … [zkráceno, 2651 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && find . -path ./web/node_modules -prune -o -path ./web/.next -prune -o -path ./.git -prune -o -path ./ai-log/claude-code -prune -o -type f -print | head -200; ls ai-log; git log --oneline | head -50", "description": "List repo files and git history"}
```

> výsledek: ./.gitignore
> ./ads/ad-a.md
> ./ads/ad-b.md
> ./ai-log/casovy-log.md
> ./ai-log/chyby-ai.md
> ./ai-log/README.md
> ./ai-log/review/plan-consensus/discussion.log.md
> ./ai-log/review/plan-consensus/final-verdict.md
> ./ai-log/review/plan-consensus/plan.original.md
> ./ai-log/review/plan-consensus/round-1-claude.md
> ./ai-log/review/plan-consensus/round-1-codex.md
> ./ai-log/review/plan-consensus/round-10-claude.md
> ./ai … [zkráceno, 6363 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && cat README.md; echo ======; cat ads/ad-a.md ads/ad-b.md", "description": "Read README and ads"}
```

> výsledek: # Evropské alternativy amerických ETF: konverzní landing page
> 
> Řešení zadání B (Clientelo, Junior AI Developer). Landing page pro českého drobného investora, který přijde z reklamy na mobilu: srovnání 4 amerických ETF z NYSE Arca s jejich UCITS alternativami na stejný index, výpočet rozdílu ročního poplatku a celý přehled zdarma za e-mail.
> 
> - **Stránka:** https://clientelo-zadani-b.vercel.app
> - ** … [zkráceno, 10996 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && cat data/etf.json; echo =====; diff data/etf.json web/data/etf.json && echo SAME", "description": "Read ETF data"}
```

> výsledek: {
>   "_popis": "Ověřená data pro stránku a PDF přehled. Každý údaj má zdroj a datum ověření; podrobnosti a důkazy v data/overeni.md a data/dukazy/. Řazení abecedně podle US tickeru (neutrální, bez doporučení).",
>   "verze": "2026-10-10-v3",
>   "overeno": "2026-10-09",
>   "pary": [
>     {
>       "us": {
>         "ticker": "DIA",
>         "nazev": "State Street SPDR Dow Jones Industrial Average ETF Trust",
>  … [zkráceno, 7092 znaků]

**Nástroj Bash:**
```
{"command": "cd \"web\" && cat -n app/page.tsx app/layout.tsx components/Landing.tsx", "description": "Read page and Landing component"}
```

> výsledek: 1	// Landing page. Obě reklamy vedou sem; liší se jen parametrem utm_content v odkazu (ad_a / ad_b).
>      2	import Landing from "@/components/Landing";
>      3	
>      4	export default function Home() {
>      5	  return <Landing />;
>      6	}
>      7	import type { Metadata } from "next";
>      8	import { Geist, Geist_Mono } from "next/font/google";
>      9	import "./globals.css";
>     10	
>     11	// lat … [zkráceno, 8194 znaků]

**Nástroj Bash:**
```
{"command": "cd \"web\" && cat -n components/Srovnani.tsx components/Kalkulacka.tsx lib/etf.ts", "description": "Read comparison, calculator, etf lib"}
```

> výsledek: 1	// Tabulka srovnání: každý pár (americké ETF + UCITS alternativa) na jednom řádku, jen názvy a roční náklady.
>      2	// Klik na řádek ho rozbalí s dalšími údaji a zároveň vybere fond v kalkulačce. Otevřený je vždy nejvýš jeden řádek.
>      3	"use client";
>      4	
>      5	import { etf, pct, datum, zamereni } from "@/lib/etf";
>      6	import { track } from "@/lib/track";
>      7	
>      8	type Props = { … [zkráceno, 8847 znaků]

**Nástroj Bash:**
```
{"command": "cd \"web\" && cat -n components/LeadForm.tsx components/Prehled.tsx", "description": "Read LeadForm and Prehled"}
```

> výsledek: 1	// Formulář: jen e-mail + nepovinný (nezaškrtnutý) souhlas s novinkami. Po úspěchu předá token k přehledu.
>      2	// Klíč idempotence brání dvojímu uložení při dvojkliku; honeypot (skryté pole) odfiltruje boty.
>      3	"use client";
>      4	
>      5	import Link from "next/link";
>      6	import { useRef, useState } from "react";
>      7	import { getAttribution, getSessionId, setLeadId, track } from "@ … [zkráceno, 10802 znaků]

**Nástroj Bash:**
```
{"command": "cd \"web\" && cat -n app/api/events/route.ts app/api/lead/route.ts app/api/prehled/route.ts", "description": "Read API routes"}
```

**Nástroj Bash:**
```
{"command": "cd \"web\" && cat -n lib/track.ts lib/token.ts lib/validate.ts lib/db.ts db/funnel.sql db/schema.sql", "description": "Read libs and SQL"}
```

> výsledek: 1	// Měření v prohlížeči bez cookies a bez ukládání do zařízení.
>      2	// session_id žije jen v paměti stránky: po obnovení stránky vznikne nový (známé omezení, viz PLAN.md).
>      3	"use client";
>      4	
>      5	let sessionId: string | null = null;
>      6	let leadId: string | null = null;
>      7	export function getSessionId(): string {
>      8	  if (!sessionId) sessionId = crypto.randomUUID();
>      … [zkráceno, 10914 znaků]

> výsledek: 1	// Příjem událostí měření z prohlížeče (bez cookies). Přijme jen povolené události a krátká pole.
>      2	// Prohlížeč posílá přes navigator.sendBeacon, proto tělo čteme jako text a sami ho převedeme z JSON.
>      3	import { getSql } from "@/lib/db";
>      4	import { cleanProps, cleanUtm, cleanVariant, isClientEvent, isSameOrigin, isUuid } from "@/lib/validate";
>      5	
>      6	export async function … [zkráceno, 5031 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && git ls-files | grep -iE \"env|vercel|tsbuildinfo|lighthouse\"; echo ---; cat .gitignore web/.gitignore; echo ---; git status --short | head; echo; cat -n web/app/globals.css; cat -n web/app/zasady/page.tsx", "description": "Check tracked env files, CSS, privacy page"}
```

> výsledek: docs/lighthouse/2026-10-10-mobil.report.html
> docs/lighthouse/2026-10-10-mobil.report.json
> web/.env.example
> web/public/vercel.svg
> ---
> # Co se nemá dostat do veřejného repozitáře: závislosti, build, tajné klíče, lokální nastavení Vercelu.
> node_modules/
> .next/
> out/
> .vercel/
> .env
> .env.*
> !.env.example
> *.log
> .DS_Store
> Thumbs.db
> 
> # Snímky cizích webů jen pro inspiraci, nezveřejňovat
> design/inspirace/
> # S … [zkráceno, 4805 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && cat -n compliance/checklist.md", "description": "Read compliance checklist"}
```

> výsledek: 1	# Compliance checklist a pravidla reklamních platforem
>      2	
>      3	Stav k 10. 10. 2026. Praktický kontrolní seznam pro demo, **ne právní posouzení**. Právní rámec je ověřen jen obecně; před reálnou kampaní je nutná kontrola právníkem.
>      4	
>      5	## 1. Pravidla reklamních platforem (go/no-go)
>      6	
>      7	| Platforma | Co platí pro reklamu na investiční informace s cílením na ČR | Verdik … [zkráceno, 5954 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && wc -c data/overeni.md data/kandidati.md PLAN.md ai-log/*.md design/positioning.md; cat data/overeni.md | head -150", "description": "Read verification notes"}
```

> výsledek: 13734 data/overeni.md
>  2377 data/kandidati.md
> 30447 PLAN.md
>  1869 ai-log/README.md
>  2224 ai-log/casovy-log.md
>  3771 ai-log/chyby-ai.md
>  5488 design/positioning.md
> 59910 total
> # Průběžné ověřování dat (pracovní záznam)
> 
> Záznam toho, co je ověřené ze zdroje, s datem. Sem se zapisuje průběžně, do `data/etf.json` jde až kompletně ověřená dvojice po kontrole Janem. Stav k 9. 10. 2026.
> 
> ## Dvojice 1 … [zkráceno, 13390 znaků]

**Nástroj Bash:**
```
{"command": "cd \"data/dukazy\" && which pdftotext python; for f in 2026-10-10-*.pdf; do echo \"== $f\"; pdftotext -layout \"$f\" - 2>/dev/null | grep -iE \"ISIN|0,07|0,33|0,02|0,01|Datum|vytvořen|platn|Ukazatel souhrnného|riziko [0-9]|třídy [0-9]|1 2 3 4 5 6 7|Index\" | head -25; done", "description": "Extract key numbers from Czech KIDs"}
```

> výsledek: /ucrt64/bin/pdftotext
> /c/Python314/python
> == 2026-10-10-cind-eu-priips-kid-cs.pdf
> iShares Dow Jones Industrial Average UCITS ETF (,,Fond"), USD Accu (,,T�da akci�"), ISIN: IE00B53L4350 je schv�len v Irsku a vytvoen
> Doba trv�n�: Fond nem� pevnou dobu trv�n� nebo splatnosti, ale za urcit�ch okolnost�, jak je pops�no v prospektu fondu, mze b�t
> jednostrann ukoncen na z�klad p�semn�ho upozornn� pod�ln� … [zkráceno, 7068 znaků]

**Nástroj Bash:**
```
{"command": "cd \"data/dukazy\" && for f in 2026-10-10-*.pdf; do echo \"== $f\"; pdftotext -enc UTF-8 -layout \"$f\" [redacted cesta] grep -nE \"%|ISIN|20[0-9]{2}\" [redacted cesta] | grep -iE \"ISIN|správ|provoz|transak|datum|vytvo|platn|aktual|riziko|třída|1 2 3\" | head -15; done", "description": "Extract KID costs and dates as UTF-8"}
```

> výsledek: == 2026-10-10-cind-eu-priips-kid-cs.pdf
> 8:iShares Dow Jones Industrial Average UCITS ETF („Fond“), USD Accu („Třída akcií“), ISIN: IE00B53L4350 je schválen v Irsku a vytvořen
> 176:Poplatky za správu a další 0.33% hodnoty vaší investice za rok. Toto je založeno na kombinaci údajů o odhadovaných  33 USD
> 184:Transakční náklady       0.01% hodnoty vaší investice za rok. Jedná se o odhad nákladů, které  … [zkráceno, 1179 znaků]

**Nástroj Bash:**
```
{"command": "cd [redacted cesta] && for f in *.txt; do echo \"== $f\"; grep -nE \"Datum|datum|platný|aktualiz|Tento dokument|vytvořen|[0-9]{1,2}\\. ?[0-9]{1,2}\\. ?20[0-9]{2}|20[0-9]{2}-[0-9]{2}\" $f | head -6; grep -nE \"0\\.0[0-9] ?%|0\\.33\" $f | head -6; grep -nE \"ukazatel|souhrnn\" -i $f | head -3; done", "description": "Find KID dates and risk indicators"}
```

> výsledek: == 2026-10-10-cind-eu-priips-kid-cs.pdf.txt
> 8:iShares Dow Jones Industrial Average UCITS ETF („Fond“), USD Accu („Třída akcií“), ISIN: IE00B53L4350 je schválen v Irsku a vytvořen
> 12:Více informací získáte na www.blackrock.com nebo telefonicky na čísle +49 89427295800. Tento dokument je datovaný 03 září 2026.
> 18:jednostranně ukončen na základě písemného upozornění podílníkům, pod podmínkou zajištěn … [zkráceno, 3695 znaků]

**Nástroj Bash:**
```
{"command": "cd [redacted cesta] && for f in 2026-10-10-v*.txt; do echo \"== $f\"; sed -n 1,16p $f; sed -n 60,80p $f; done; sed -n 55,75p 2026-10-10-cspx-eu-priips-kid-cs.pdf.txt", "description": "Show Vanguard KID headers and risk section"}
```

> výsledek: == 2026-10-10-vgla-eu-priips-kid-cz.pdf.txt
> Sdělení klíčových informací
> 
> Účel
> 
> V tomto sdělení naleznete klíčové informace o tomto investičním fondu. Nejedná se o propagační materiál. Poskytnutí těchto informací vyžaduje zákon
> s cílem pomoci vám porozumět podstatě, rizikům, nákladům, možným výnosům a ztrátám spojeným s tímto fondem a porovnat jej s jinými fondy.
> 
> Produkt
> 
> Produkt: Vanguard FTSE Gl … [zkráceno, 7846 znaků]

**Nástroj Bash:**
```
{"command": "cd \"data/dukazy\" && grep -niE \"expense ratio|0\\.0[0-9]%|as of\" 2026-10-09-vt-vanguard-produktova-stranka.md 2026-10-09-voo-vanguard-produktova-stranka.md | head -12; grep -oiE \"gross expense ratio[^<]{0,120}\" 2026-10-09-dia-ssga-produktova-stranka.html | head -3; grep -oE \"expense_ratio[^,]{0,60}|Expense Ratio[^<]{0,80}\" 2026-10-09-ivv-us-produktova-stranka.html | head -5; cat 2026-10-10-cnb-registr-ucits.md | head -40", "description": "Check US ETF cost evidence and CNB registry"}
```

> výsledek: 2026-10-09-vt-vanguard-produktova-stranka.md:6:- Expense ratio: "0.06% as of 02/27/2026"
> 2026-10-09-voo-vanguard-produktova-stranka.md:7:- "Expense ratio 0.03% as of 04/28/2026"
> Gross Expense Ratio&#34;,&#34;value&#34;:&#34;0.16%&#34;,&#34;glossary&#34;:&#34;&lt;p>&lt;strong>﻿Gross Expense Ratio&lt;/strong>&lt;/p>
> Gross Expense Ratio
> Gross Expense Ratio
> Expense Ratio:","value":"0.03","description" … [zkráceno, 2097 znaků]

**Nástroj Bash:**
```
{"command": "cd [redacted cesta] && mkdir -p live && cd live && curl -sS -D headers.txt https://clientelo-zadani-b.vercel.app/ -o index.html; cat headers.txt; wc -c index.html; grep -oE 'IE00[A-Z0-9]{8}' index.html | sort -u; grep -oE '/_next/static/[^\"]+\\.js' index.html | sort -u > js.txt; wc -l js.txt", "description": "Fetch live page and headers"}
```

> výsledek: HTTP/1.1 200 OK
> Accept-Ranges: bytes
> Access-Control-Allow-Origin: *
> Age: 0
> Cache-Control: public, max-age=0, must-revalidate
> Content-Disposition: inline
> Content-Type: text/html; charset=utf-8
> Date: Sat, 10 Oct 2026 08:43:31 GMT
> Link: </_next/static/immutable/media/7178b3e590c64307-s.p.0i3h3th1vs4m7.woff2>; rel=preload; as="font"; crossorigin=""; type="font/woff2", </_next/static/immutable/ … [zkráceno, 1153 znaků]

**Nástroj Bash:**
```
{"command": "cd [redacted cesta] && for u in $(cat js.txt); do curl -sS \"https://clientelo-zadani-b.vercel.app$u\" >> all.js; done; wc -c all.js; grep -oE 'IE00[A-Z0-9]{8}|kid_url|fund-docs[^\"]{0,60}' all.js | sort | uniq -c", "description": "Download JS bundles and search for gated data"}
```

> výsledek: 599662 all.js
>       1 IE000VAHT5T0
>       1 IE00B53L4350
>       1 IE00B5BMR087
>       1 IE00BFMXXD54
>       1 fund-docs.vanguard.com/ie000vaht5t0_priipskid_cz.pdf
>       1 fund-docs.vanguard.com/ie000vaht5t0_priipskid_en.pdf
>       1 fund-docs.vanguard.com/ie00bfmxxd54_priipskid_cz.pdf
>       1 fund-docs.vanguard.com/ie00bfmxxd54_priipskid_en.pdf
>       8 kid_url

**Nástroj Bash:**
```
{"command": "cd [redacted cesta] && curl -sS -i \"https://clientelo-zadani-b.vercel.app/api/prehled\" | head -20; echo; curl -sS -o /dev/null -w \"%{http_code}\\n\" \"https://clientelo-zadani-b.vercel.app/api/prehled?t=abc.def\"; curl -sS -o /dev/null -w \"%{http_code}\\n\" \"https://clientelo-zadani-b.vercel.app/api/lead\"; curl -sS https://clientelo-zadani-b.vercel.app/zasady -o zasady.html; grep -o \"Kontakt[^<]*\" zasady.html; python -c \"\nimport re,html\ns=open('index.html',encoding='utf8').read()\nt=re.sub(r'<script.*?</script>','',s,flags=re.S)\nt=re.sub(r'<[^>]+>','\\n',t)\nprint('\\n'.join(l.strip() for l in html.unescape(t).splitlines() if l.strip()))\n\"", "description": "Probe API GET responses and page text"}
```

> výsledek: Exit code 1
> HTTP/1.1 401 Unauthorized
> Age: 0
> Cache-Control: public, max-age=0, must-revalidate
> Content-Type: application/json
> Date: Sat, 10 Oct 2026 08:43:45 GMT
> Server: Vercel
> Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
> X-Matched-Path: /api/prehled
> X-Vercel-Cache: MISS
> X-Vercel-Id: fra1::iad1::7r877-1791621825132-0afab9360260
> Transfer-Encoding: chunked
> 
> {"e … [zkráceno, 2876 znaků]

**Nástroj Bash:**
```
{"command": "cd [redacted cesta] && PYTHONIOENCODING=utf8 python -c \"\nimport re,html\ns=open('index.html',encoding='utf8').read()\nt=re.sub(r'<script.*?</script>','',s,flags=re.S)\nt=re.sub(r'<[^>]+>','\\n',t)\nprint('\\n'.join(l.strip() for l in html.unescape(t).splitlines() if l.strip()))\n\"; cat \"web/next.config.ts\"; ls \"web/\"; cat \"web/package.json\"", "description": "Print live page text and config"}
```

> výsledek: Americké ETF a UCITS alternativy
> Srovnání
> Evropské alternativy amerických ETF
> VOO, IVV, VT a DIA vedle UCITS fondů na stejný index. Náklady hned, celý přehled s ISIN a kontrolním seznamem zdarma.
> Zobrazit srovnání
> Co obsahuje přehled
> Marketingové sdělení, ne investiční doporučení. Investice nesou riziko ztráty. Údaje ověřeny
> 9. 10. 2026
> a 10. 10. 2026.
> Srovnání 4 amerických ETF
> Evropská  … [zkráceno, 3567 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && python -c \"\nimport json\nd=json.load(open('docs/lighthouse/2026-10-10-mobil.report.json',encoding='utf8'))\nprint(d.get('finalUrl') or d.get('finalDisplayedUrl'), d.get('fetchTime'))\nfor k,v in d['categories'].items(): print(k, v['score'])\nfor a in ['largest-contentful-paint','cumulative-layout-shift']: print(a, d['audits'][a]['displayValue'])\n\"; cat ai-log/README.md; cat ai-log/chyby-ai.md | head -60; ls ai-log/claude-code | head", "description": "Check Lighthouse report and ai-log files"}
```

> výsledek: https://clientelo-zadani-b.vercel.app/ 2026-10-10T08:24:51.920Z
> performance 0.96
> accessibility 0.99
> best-practices 1
> seo 1
> agentic-browsing 1
> largest-contentful-paint 2.3�s
> cumulative-layout-shift 0
> # ai-log: záznam práce s AI
> 
> | Složka / soubor | Co obsahuje | Původ |
> |---|---|---|
> | `claude-code/hlavni-session.md` | Hlavní konverzace s Claude Code (plánování, ověřování dat, kód, nasazení … [zkráceno, 5450 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && git remote -v; git log -1 --format=%cd; head -15 scripts/ai-log-export.py; ls -la ai-log/claude-code ai-log/claude-code/subagenti | head; grep -c \"\" ai-log/claude-code/hlavni-session.md; cat ai-log/casovy-log.md | tail -15", "description": "Check remote, export script, time log"}
```

> výsledek: origin	https://github.com/senojed/Clientelo-ZADANI-B.git (fetch)
> origin	https://github.com/senojed/Clientelo-ZADANI-B.git (push)
> Sat Oct 10 10:37:30 2026 +0200
> # Převod surového záznamu konverzace Claude Code (JSONL) na čitelný Markdown pro složku ai-log/.
> # Zároveň rediguje: osobní údaje (e-maily, absolutní cesty k osobním složkám), tajemství (klíče, hesla,
> # připojovací řetězce) a obsah osobní w … [zkráceno, 2448 znaků]

**Nástroj Bash:**
```
{"command": "curl -sS -o /dev/null -w \"%{http_code}\\n\" https://github.com/senojed/Clientelo-ZADANI-B; curl -sS -o /dev/null -w \"%{http_code}\\n\" https://api.github.com/repos/senojed/Clientelo-ZADANI-B; cd \"\" && git status -sb | head -3; grep -n \"utm\\|variant\\|ad_a\\|varianta\" PLAN.md | head -20", "description": "Check GitHub repo visibility and PLAN"}
```

> výsledek: 404
> 404
> ## main...origin/main
> 16:| Nadpis bez absolutního tvrzení | "Nekoupíš" závisí na brokerovi a typu klienta. Nadpis (krátký, pro mobil): "Americké ETF: náklady, KID a UCITS alternativa", podnadpis: "Porovnej americké ETF a zjisti, jaké mají náklady, zda mají KID a jakou UCITS alternativu porovnat." (pracovně). Slovo "dostupnost" jen s metodikou: KID je indikátor, ne ověřená dostupnost u br … [zkráceno, 4114 znaků]

**Nástroj Bash:**
```
{"command": "curl -sSL https://vercel.com/docs/limits/fair-use-guidelines | python -c \"import sys,re,html;t=re.sub(r'<[^>]+>',' ',sys.stdin.read());t=html.unescape(t);[print(m.group(0)) for m in re.finditer(r'.{0,200}non-commercial.{0,200}',t)]\" | head -5; curl -sSL https://vercel.com/docs/functions/configuring-functions/region | python -c \"import sys,re,html;t=re.sub(r'<[^>]+>',' ',sys.stdin.read());t=html.unescape(t);[print(m.group(0)) for m in re.finditer(r'.{0,200}(iad1|Hobby).{0,200}',t)]\" | head -6", "description": "Verify Vercel Hobby commercial use and default region docs"}
```

> výsledek: Hobby teams  are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan. 
> ck\":\"$undefined\"}],null]}]\n88:[\"$\",\"p\",null,{\"className\":\"my-4\",\"children\":[[\"$\",\"span\",null,{\"className\":\"WGWgwq_docsString\",\"children\":\"Hobby teams\"}],\" are restricted to non-commercial personal use only. All commercial usage … [zkráceno, 1351 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && grep -n \"Broker v EU smí\\|OBRAZOVKA =\\|<header\\|Získat celý přehled zdarma\\|depozitář\\|Zdroje: stránky\" web/components/Landing.tsx; grep -n \"USA</span>\\|Klikni na řádek\\|{open &&\" web/components/Srovnani.tsx; grep -n \"type=\\\"email\\\"\\|Nepodařilo\\|zásadami\" web/components/LeadForm.tsx; grep -n \"pdf_requested\\|window.print\\|obvykle\" web/components/Prehled.tsx; grep -n \"window.location.search\" web/lib/track.ts; grep -n \"import data\" web/lib/etf.ts; grep -n \"Zpět\\|region EU\\|Jaké údaje\" web/app/zasady/page.tsx; grep -n \"řazení tabulky\\|region úložiště\" compliance/checklist.md; grep -n \"Popis\\|Stav:\\|ověřeno 9\" ads/ad-a.md ads/ad-b.md; grep -n \"chrání podepsaný\\|spustitelné\\|Cookie lišta\" README.md", "description": "Get precise line numbers for findings"}
```

> výsledek: 16:const OBRAZOVKA = "flex min-h-[100svh] flex-col justify-center py-6";
> 59:      <header className={OBRAZOVKA}>
> 97:          Získat celý přehled zdarma
> 108:                <span className="font-medium">Má KID.</span> Broker v EU smí drobnému investorovi prodat fond jen s tímto
> 117:                majetek fondu opatruje depozitář na oddělených účtech fondu.
> 133:          Zdroje: stránky správců fo … [zkráceno, 3268 znaků]

**Nástroj Bash:**
```
{"command": "cd \"\" && grep -n \"Výzva k přehledu\\|Kdy se ptáme\\|Klíčové zjištění\\|Jak jsem pracoval\" README.md; ls ai-log/review", "description": "Get README line numbers"}
```

> výsledek: 12:## Klíčové zjištění, na kterém stránka stojí
> 27:**Kdy se ptáme:** až po ukázce hodnoty. Tabulka s náklady a kalkulačka jsou veřejné, formulář je až na třetí obrazovce. Formulář má jedno povinné pole (e-mail) a nepovinný, nezaškrtnutý souhlas s novinkami.
> 54:1. **Výzva k přehledu přímo v rozbaleném řádku tabulky** ("Pošli mi ISIN a KID k tomuto fondu") zvýší konverzi oproti formuláři jen na třet … [zkráceno, 600 znaků]

**Nástroj Write:**
```
{"file_path": "ai-log\\review\\audit-1\\round-1-claude.md", "content": "# Nezávislý audit, kolo 1 (Claude)\n\nStav k 10. 10. 2026, repozitář na commitu 336ab6b, živá stránka https://clientelo-zadani-b.vercel.app (jen GET).\n\n## Verdikt\n\nZítra reklamu spustit nelze. Stránka technicky běží, data v `data/etf.json` sedí s českými KID i s uloženými stránkami správců a formulář je minimální. Spuštění ale blokují tři věci. Reklamy jsou podle vlastních souborů pořád \"koncept\", nemají upozornění na riziko a jediné upozornění dávají do p … [zkráceno, 17841 znaků]
```

> výsledek: File created successfully at: ai-log\review\audit-1\round-1-claude.md (file state is current in your context — no need to Read it back)

**Nástroj Edit:**
```
{"replace_all": false, "file_path": "ai-log\\review\\audit-1\\round-1-claude.md", "old_string": "Hodnotu za e-mail posil o něco, co", "new_string": "Hodnotu za e-mail posil něčím, co"}
```

> výsledek: The file ai-log\review\audit-1\round-1-claude.md has been updated successfully. (file state is current in your context — no need to Read it back)

**Nástroj Bash:**
```
{"command": "grep -c \"—\" \"ai-log/review/audit-1/round-1-claude.md\"; cat \"ai-log/review/audit-1/round-1-claude.md\"", "description": "Check for em-dashes and print report"}
```

> výsledek: 0
> # Nezávislý audit, kolo 1 (Claude)
> 
> Stav k 10. 10. 2026, repozitář na commitu 336ab6b, živá stránka https://clientelo-zadani-b.vercel.app (jen GET).
> 
> ## Verdikt
> 
> Zítra reklamu spustit nelze. Stránka technicky běží, data v `data/etf.json` sedí s českými KID i s uloženými stránkami správců a formulář je minimální. Spuštění ale blokují tři věci. Reklamy jsou podle vlastních souborů pořád "koncept", … [zkráceno, 17422 znaků]

## Odpověď subagenta (2026-10-10 08:49 UTC)

Report je uložený v ai-log\review\audit-1\round-1-claude.md (je to jediný soubor, který jsem v repu vytvořil, jinak jsem nic neměnil). Plné znění:

# Nezávislý audit, kolo 1 (Claude)

Stav k 10. 10. 2026, repozitář na commitu 336ab6b, živá stránka https://clientelo-zadani-b.vercel.app (jen GET).

## Verdikt

Zítra reklamu spustit nelze. Stránka technicky běží, data v `data/etf.json` sedí s českými KID i s uloženými stránkami správců a formulář je minimální. Spuštění ale blokují tři věci. Reklamy jsou podle vlastních souborů pořád "koncept", nemají upozornění na riziko a jediné upozornění dávají do pole "Popis", které se na mobilu často nezobrazí. Informace o zpracování osobních údajů jsou neúplné a zavádějící: chybí právní titul a právo stížnosti, a API, které přijímá e-mail, běží v USA (`iad1`), i když zásady mluví o "region EU, Frankfurt". Veřejný repozitář na GitHubu vrací 404. Konverzi navíc zjevně brzdí: první obrazovka nevysvětluje, proč by návštěvník alternativu potřeboval, interaktivní prvky nemají vlastní výzvu ke kontaktu a obsah za e-mailem je celý veřejně v JavaScriptu stránky. Po odeslání si návštěvník neodnese nic trvalého.

## Nálezy

1. **Závažnost:** BLOCKER
   **Kde:** `ads/ad-a.md` ř. 3 a 8, `ads/ad-b.md` ř. 3 a 8, README ř. 72
   **Problém:** Oba soubory reklam samy uvádějí "Stav: koncept k Janově kontrole. Stav spustitelnosti ... se doplní", README ř. 72 ale tvrdí, že reklamy jsou "bez certifikace inzerenta spustitelné". Žádná reklama neobsahuje upozornění na riziko ztráty, i když jmenuje konkrétní fondy a náklady (vlastní checklist podle ESMA přitom žádá rizika "stejně viditelně"). Jediné upozornění, "Marketingové sdělení, ne investiční doporučení", je v poli "Popis" (link description). Na Instagramu se toto pole nezobrazuje a na Facebooku ho mobil často zkrátí (domněnka, ověř v náhledu Ads Manageru). Vizuály chybí (známá věc, nehodnotím).
   **Návrh:** Dej "Marketingové sdělení. Investice nesou riziko ztráty." do hlavního textu a čitelně i do vizuálu, ne do Popisu. Sjednoť stav: buď "spustitelné po dodání vizuálů" v souborech reklam, nebo oprav README. Ověř náhled ve všech umístěních (Feed, Stories, Reels).

2. **Závažnost:** BLOCKER
   **Kde:** `web/app/zasady/page.tsx` ř. 13 až 36, živé odpovědi API
   **Problém:** Zásady neuvádějí právní titul zpracování e-mailu (čl. 13 odst. 1 písm. c GDPR), právo podat stížnost u ÚOOÚ, právo vznést námitku ani předání do třetí země. Ř. 30 píše "Hosting Vercel a databáze Neon (region EU, Frankfurt)", ale funkce běží v USA: živé `/api/prehled` vrací `X-Vercel-Id: fra1::iad1::...` a dokumentace Vercelu uvádí `iad1` (Washington) jako výchozí region nových projektů. `/api/lead` tedy e-mail zpracuje v USA a až potom ho pošle do Frankfurtu. Účel "abychom ti zpřístupnili přehled" e-mail nepotřebuje, protože přehled se ukáže hned a nic se neposílá. Sběr e-mailu bez potřebného účelu je problém minimalizace údajů (čl. 5 odst. 1 písm. c). Kontakt správce je známá zástupná věc, nehodnotím.
   **Návrh:** Nastav region funkcí na `fra1` (Hobby povoluje jeden region, v nastavení projektu nebo `vercel.json`). Doplň právní titul (plnění na žádost subjektu u přehledu, souhlas u novinek), dobu uložení, právo stížnosti u ÚOOÚ a zmínku o Vercel Inc. (USA). Dej e-mailu skutečný účel: pošli na něj odkaz na přehled (viz nález 9).

3. **Závažnost:** BLOCKER (pro odevzdání)
   **Kde:** `git remote -v` = https://github.com/senojed/Clientelo-ZADANI-B
   **Problém:** Zadání chce "odkaz na verejný repozitár na GitHube". Anonymní GET na github.com i na api.github.com vrací 404, repo je tedy soukromé nebo neexistuje (lokální `main` sleduje `origin/main`).
   **Návrh:** Před odesláním repo zveřejni a ověř odkaz v anonymním okně. Předtím ještě jednou projdi redakci `ai-log/`.

4. **Závažnost:** MAJOR
   **Kde:** `web/components/Landing.tsx` ř. 108; srovnej `Prehled.tsx` ř. 104, patičku `Landing.tsx` (text "neznamená, že fond nekoupí žádný broker"), README ř. 14, `compliance/checklist.md` ř. 26
   **Problém:** Stránka tvrdí natvrdo "Broker v EU smí drobnému investorovi prodat fond jen s tímto dokumentem", a to hned vedle "U těchto 4 amerických ETF jsme KID pro EU nenašli". Dohromady to čtenáři říká "v EU nekoupíš", což vlastní checklist (ř. 26) zakazuje. README i přehled přitom píšou opatrně "obvykle" a patička stejné stránky to vyvrací. Stránka si tak sama protiřečí. Výjimky (profesionální klient, prodej už držené pozice) text úplně ignoruje.
   **Návrh:** Sjednoť formulaci na "Bez KID ho broker drobnému investorovi v EU obvykle nenabídne. U těchto 4 ETF jsme KID k 9. 10. 2026 na stránce správce nenašli."

5. **Závažnost:** MAJOR
   **Kde:** úvod a patička `Landing.tsx` ř. 59 až 86 a 128 až 139, `Kalkulacka.tsx`, `Prehled.tsx`
   **Problém:** Pro českého investora chybí hlavní riziko kromě poklesu trhu, totiž měnové. Všechny 4 alternativy jsou třídy v USD a české KID výslovně píšou "Vezměte v úvahu měnové riziko" (např. `2026-10-10-vuaa-eu-priips-kid-cz.pdf`). Na stránce o tom není ani slovo, kalkulačka počítá v Kč a o kurzu mlčí. Chybí také výzva "před investicí si přečti KID a prospekt" a ukazatel rizika (podle českých KID je u S&P 500 třída 4 ze 7). Stránka ukazuje náklady, ale rizika jen jednou obecnou větou, takže riziko není vyvážené s přínosem, jak žádá vlastní checklist ř. 19.
   **Návrh:** K úvodnímu upozornění přidej "Fondy jsou v USD, výnos v Kč ovlivní kurz." Do rozbaleného řádku přidej "riziko 4 ze 7 podle KID" a do patičky "Před investicí si přečti KID a prospekt fondu".

6. **Závažnost:** MAJOR
   **Kde:** `web/components/Srovnani.tsx` ř. 51 až 66, `Kalkulacka.tsx` ř. 75 až 81, README ř. 54
   **Problém:** Zadání: "Každý z nich by mal viesť ku kontaktu." Rozbalený řádek tabulky ani výsledek kalkulačky nemá vlastní výzvu ke kontaktu. Obě sekce sdílí jediné obecné tlačítko "Získat celý přehled zdarma" pod kalkulačkou. README to v A/B hypotéze č. 1 dokonce přiznává ("Výzva k přehledu přímo v rozbaleném řádku ... oproti formuláři jen na třetí obrazovce"). To, co zadání vyžaduje, je tedy odsunuté do testu.
   **Návrh:** Do každého rozbaleného řádku dej tlačítko "Pošli mi ISIN a český KID k [fond]" a pod výsledek kalkulačky přidej výzvu navázanou na vybraný fond. Obě vedou na formulář a měří se přes `cta_click` s `ticker`. A/B hypotézu č. 1 nahraď jinou.

7. **Závažnost:** MAJOR
   **Kde:** `Landing.tsx` ř. 16 (`min-h-[100svh] ... justify-center`) a ř. 59 až 86, živá stránka
   **Problém:** Návštěvník má "pár sekund" a první obrazovka mu nedá důvod pokračovat. Nadpis "Evropské alternativy amerických ETF" a podnadpis s "UCITS fondů" předpokládají, že ví, proč alternativu potřebuje. Vysvětlení (KID, broker) je až ve třetí sekci. Hero má navíc výšku celé obrazovky a obsah je svisle uprostřed, takže tabulka, slibovaná slovy "Náklady hned", na první obrazovce vůbec není. Reklama A slibuje "Znáš VOO nebo IVV? Porovnej náklady", ale první řádek tabulky je DIA, nejhorší pár (0,16 % proti 0,33 %).
   **Návrh:** Do podnadpisu dej problém lidsky, např. "VOO u brokera v EU často nenajdeš, protože nemá KID. Tady je fond na stejný index, který koupit jde." (formulaci uprav podle nálezu 4). Zruš `min-h-[100svh]` u úvodu a ukaž hned pod nadpisem aspoň 2 řádky tabulky (VOO, IVV). Řazení podle reklamy nebo VOO jako první, s poznámkou o řazení.

8. **Závažnost:** MAJOR
   **Kde:** `web/lib/etf.ts` ř. 3 (import celého JSON do klientských komponent), README ř. 102, živé JS soubory
   **Problém:** Obsah "za e-mailem" je veřejný. Ve staženém JS bundlu živé stránky jsou všechny 4 ISIN (IE00B5BMR087, IE00BFMXXD54, IE000VAHT5T0, IE00B53L4350), odkazy na KID (`fund-docs.vanguard.com/..._priipskid_cz.pdf`) a pole `kid_url`. Token v `/api/prehled` tak nic nechrání a tvrzení README "Přehled za e-mailem chrání podepsaný token" neodpovídá skutečnosti. Bez bundlu je přehled stejně slabá odměna: plný název fondu je veřejně v rozbaleném řádku a ISIN z něj najde vyhledávač za pár sekund. Token navíc není svázaný s leadem a `/api/lead` ho vydá komukoli, kdo pošle libovolný e-mail.
   **Návrh:** Klientovi předávej jen veřejnou podmnožinu (tickery, krátké názvy, náklady, data KID), třeba jako `etf-public.json` vygenerovaný v `sync-data.mjs`, a plný JSON importuj jen v API route. Hodnotu za e-mail posil něčím, co z veřejné části nejde odvodit snadno, např. kontrolní seznam s konkrétními kroky nebo rozdíl kurzových nákladů.

9. **Závažnost:** MAJOR
   **Kde:** `Landing.tsx` (token jen v `useState`), `Prehled.tsx` ř. 43 (`window.print()`)
   **Problém:** Po odeslání si návštěvník neodnese nic trvalého. Token platí 24 h, ale existuje jen v paměti komponenty a v URL není, takže obnovením stránky nebo zavřením in-app prohlížeče přehled zmizí. Text chyby pak radí "odešli formulář znovu", což vytvoří druhý lead. Provoz z Meta reklam se otevírá v in-app prohlížeči Facebooku a Instagramu, kde `window.print()` obvykle nic neudělá (domněnka, ověř na Androidu i iOS). Tlačítko "Uložit jako PDF" tak pro většinu provozu nejspíš nefunguje. Plán "PDF = tisk" tedy pro reklamní provoz neobstojí. E-mailing je známá věc, ale tohle jde opravit i bez něj.
   **Návrh:** Po odeslání přesměruj na `/prehled?t=<token>` (stránka, kterou jde uložit, sdílet a znovu otevřít) a ukaž "Zkopírovat odkaz". U tlačítka PDF detekuj in-app prohlížeč a nabídni "otevřít v prohlížeči".

10. **Závažnost:** MAJOR
    **Kde:** `web/lib/track.ts`, README "Měření celé cesty", `compliance/checklist.md` ř. 13
    **Problém:** Bez Meta Pixelu nebo Conversions API Meta konverzi (`lead_created`) nevidí. Kampaň pak jde optimalizovat jen na kliky nebo zobrazení stránky, což při studeném publiku vede na nekvalitní provoz, a README samo píše, že "nejvíc výsledek ovlivní kvalita provozu". Vlastní trychtýř je správný pro analýzu, ale k nákupu reklamy nestačí. `fbclid` se neukládá, takže leady nejde ani dodatečně spárovat s kliky.
    **Návrh:** Ukládej `fbclid` spolu s UTM. Pro start zvol cíl "zobrazení vstupní stránky" a popiš to v README. Pro optimalizaci na leady přidej Conversions API ze `/api/lead` (s právním posouzením předávání údajů Meta) nebo Pixel s lištou souhlasu.

11. **Závažnost:** MAJOR
    **Kde:** `Landing.tsx` ř. 133, `Srovnani.tsx` ř. 71 až 73, `ads/ad-b.md` ř. 10
    **Problém:** Zadání chce "skutočné dáta s uvedením zdroja". Ve veřejné části stránky (tedy u každého čísla, které reklama ukáže) není žádný odkaz na zdroj, jen obecná věta v patičce "Zdroje: stránky správců fondů, NYSE, seznam ČNB ..." bez odkazů. Odkaz na stránku správce a na KID je až za e-mailem. Reklama B přitom do vizuálu slibuje "zdroj u každého údaje".
    **Návrh:** Do rozbaleného řádku přidej odkazy "zdroj (správce)" a "KID (správce)" s datem, nebo aspoň odkaz na stránku správce. Pokud mají KID odkazy zůstat za e-mailem, uber z reklamy B slib "zdroj u každého údaje".

12. **Závažnost:** MAJOR
    **Kde:** celá stránka, patička `Landing.tsx`
    **Problém:** Stránka neříká, kdo ji provozuje, proč ji dělá a zda má na doporučených fondech zájem (provize, affiliate). Jméno je jen v zásadách. Finanční publikum je nedůvěřivé, takže to snižuje konverzi. Stránka navíc k jmenovitým fondům říká "porovnej tenhle místo tamtoho" a dává důvody "Proč evropská alternativa". Právně to může být investiční doporučení podle MAR (čl. 3 odst. 1 bod 35), s povinností zveřejnit střet zájmů, a samotné prohlášení "ne investiční doporučení" na tom nic nemění (domněnka, potřebuje právníka). Identifikaci provozovatele webu může vyžadovat i zákon č. 480/2004 Sb. (domněnka).
    **Návrh:** Do patičky přidej "Kdo za stránkou stojí" (subjekt, IČO, kontakt) a větu o střetu zájmů ("nedostáváme provize od správců uvedených fondů", pokud to platí). Otázku MAR dej na seznam pro právní kontrolu v README.

13. **Závažnost:** MINOR
    **Kde:** `web/app/api/lead/route.ts`, `web/app/api/events/route.ts`, `web/lib/validate.ts` ř. 64 až 74 (`isSameOrigin`)
    **Problém:** Kontrola `Origin` brání jen CSRF z prohlížeče, `curl -H "Origin: ..."` ji obejde. Kdokoli tak může bez limitu zakládat leady s cizími e-maily, včetně `marketing_consent: true`, a posílat podvržené `page_view` s `variant: "a"`, čímž zkreslí A/B srovnání reklam. Souhlas s novinkami nemá double opt-in, takže pozdější newsletter může odejít na cizí adresy. Rate limit je v README jako chybějící, souhlas ne.
    **Návrh:** Přidej jednoduchý rate limit podle IP (např. tabulka v Neonu nebo Vercel Firewall) a u souhlasu potvrzovací e-mail před prvním newsletterem. Události s nepřirozenou frekvencí na `session_id` z trychtýře vyřaď.

14. **Závažnost:** MINOR
    **Kde:** `web/lib/track.ts` ř. 19, `web/app/zasady/page.tsx` ř. 39, `LeadForm.tsx` ř. 92
    **Problém:** Je to chyba v měření. `getAttribution()` čte UTM z aktuální URL při každé události. Když návštěvník klikne u formuláře na "zásadami zpracování" a vrátí se odkazem "Zpět na srovnání" (`href="/"`, klientská navigace, `sessionId` zůstává), URL už UTM nemá. `form_start` i `lead_created` se pak uloží s `variant = null` a lead se v `funnel.sql` připíše skupině "-" místo reklamy. Zrovna nejopatrnější návštěvníci, kteří čtou zásady, tak ztratí atribuci. Navíc se ztratí rozepsaný e-mail.
    **Návrh:** UTM a variantu zachyť jednou při prvním načtení do proměnné modulu (jako `sessionId`). Zásady otevírej v novém panelu (`target="_blank"`) nebo v rozbalovacím bloku.

15. **Závažnost:** MINOR
    **Kde:** `Prehled.tsx` ř. 16, `web/db/funnel.sql`, PLAN.md ř. 63
    **Problém:** `pdf_requested` se odešle při každém zobrazení přehledu, ne při žádosti o PDF. V README je ale uvedená jako samostatný krok cesty a duplikuje `lead_created`. PLAN slibuje throttle událostí a kontrolu `lead_id` proti `session_id`, kód ani jedno nedělá (`/api/events` přijme libovolné UUID jako `lead_id`). Trychtýř nefiltruje boty a nové načtení stránky rozdělí jednu návštěvu na dvě relace. README to zmiňuje, ale chybí odhad dopadu na konverzní poměr.
    **Návrh:** Přejmenuj událost na `overview_shown`. Buď doplň slíbené kontroly, nebo je vyškrtni z PLAN. Do `funnel.sql` přidej filtr relací bez `section_view` (boti a okamžité odchody) jako druhý řádek "kvalitní návštěvy".

16. **Závažnost:** MINOR
    **Kde:** `LeadForm.tsx` ř. 61 a 96, `web/lib/validate.ts` ř. 21, `Srovnani.tsx` ř. 29 až 32
    **Problém:** E-mailové pole nemá `autoComplete="email"` ani `name`, takže automatické vyplnění na mobilu je méně spolehlivé. Prohlížeč přijme `jan@seznam` (bez domény nejvyššího řádu), server ho regexem odmítne a uživatel dostane obecné "Nepodařilo se odeslat. Zkus to prosím znovu.", takže zkouší znovu totéž. Hlavička tabulky "USA | Alternativa v EU | USA | EU" dvakrát opakuje "USA" a neříká, že sloupce jsou roční náklady. To je vidět až v poznámce pod tabulkou.
    **Návrh:** Doplň `autoComplete="email"`, `name="email"` a `inputMode="email"`. Při 400 `invalid_input` zobraz "Zkontroluj e-mail". Hlavičku změň na "USA | Alternativa | Roční náklady USA | EU".

17. **Závažnost:** MINOR
    **Kde:** `compliance/checklist.md` ř. 40 a 45, `ads/ad-b.md` ř. 7 a 10
    **Problém:** Checklist odškrtává věci, které neplatí. "[x] řazení tabulky abecedně (neutrální), uvedeno u tabulky": u tabulky žádná zmínka o řazení není (`Srovnani.tsx` ř. 22 až 26). "[x] region úložiště ... uvedeno v zásadách": zásady uvádějí EU, ale funkce běží v `iad1` (nález 2). Reklama B píše "ověřeno 9. 10. 2026", registrace v ČR a české KID jsou ale ověřené 10. 10. (`data/overeni.md`).
    **Návrh:** Oprav checklist podle skutečnosti. Do tabulky přidej "Řazeno abecedně podle tickeru", nebo změň řazení a odškrtnutí zruš. V reklamě B uveď "ověřeno 9. a 10. 10. 2026".

18. **Závažnost:** MINOR
    **Kde:** `Landing.tsx` ř. 115 až 117
    **Problém:** "Je to fond UCITS. ... majetek fondu opatruje depozitář na oddělených účtech fondu" v kontextu "proč evropská alternativa" naznačuje, že americká ETF tuhle ochranu nemají. Americké fondy podle Investment Company Act mají také custodiana nebo trustee s oddělenými aktivy (DIA je UIT s trusteem). Data v repu nic takového nesrovnávají, takže tvrzení jde nad rámec důkazů.
    **Návrh:** Bod přeformuluj neutrálně ("UCITS je evropský rámec, který dohlíží ČNB a irská centrální banka") nebo ho vypusť, KID je silnější argument.

19. **Závažnost:** MINOR
    **Kde:** README (chybí sekce o nejasnostech zadání), `ai-log/README.md`, `scripts/ai-log-export.py` ř. 12 až 13
    **Problém:** Zadání žádá v README zdůvodnit vlastní rozhodnutí tam, kde zadání nebylo jasné. README nevysvětluje, proč "ETF obchodované na NYSE" znamená NYSE Arca. Neříká ani, proč se ze "srovnání NYSE ETF" stalo srovnání s UCITS alternativami a proč stačí 4 ETF, z nichž dvě (IVV, VOO) mají stejný index i stejné náklady. Zadání chce v `ai-log` "export konverzácií ... (príkaz /export)", repo ale obsahuje vlastní převod JSONL, kde jsou výsledky nástrojů zkrácené na 400 znaků. README hlavního repa tuto odchylku nezdůvodňuje (je jen v `ai-log/README.md`).
    **Návrh:** Do README přidej krátkou sekci "Rozhodnutí tam, kde zadání nebylo jednoznačné" (NYSE Arca, přerámování na alternativy, počet fondů). U ai-log jednou větou vysvětli, proč ne `/export` (redakce osobních údajů), nebo přilož i redigované výstupy `/export`.

20. **Závažnost:** MINOR
    **Kde:** README ř. 102 ("Vercel (Hobby)")
    **Problém:** Pro odevzdání je bezplatný hosting v pořádku, ostrá placená kampaň pro firmu ale na Hobby být nesmí. Dokumentace Vercelu (Fair Use Guidelines) píše, že Hobby je "restricted to non-commercial personal use only".
    **Návrh:** Do README "Co chybí / před spuštěním" doplň přechod na Vercel Pro nebo hosting zadavatele.

---
Jak jsem ověřoval:
- Čísla v `data/etf.json` jsem porovnal s textem českých KID z `data/dukazy/`: 0,07 / 0,07 / 0,07 / 0,33 %, ISIN, data 3. 9., 24. 3. a 20. 8. 2026. US náklady jsem porovnal s uloženými stránkami správců: 0,03 / 0,03 / 0,06 / 0,16 %. Vše sedí. `web/data/etf.json` je shodný s `data/etf.json`.
- Živý web jsem četl jen přes GET: stránka, JS bundly, `/api/prehled` (401 bez tokenu), `/zasady`. Hlavička `X-Vercel-Id` ukazuje, že funkce běží v `iad1`. Formulář jsem neodesílal a nic jsem neposílal přes POST.
- Složka `ai-log/claude-code` existuje (`hlavni-session.md` a `subagenti/`), její obsah jsem nečetl.
- Jako domněnky jsou v reportu označené: zobrazení pole "Popis" v reklamě na Meta, chování `window.print()` v in-app prohlížeči a právní kvalifikace podle MAR a zákona 480/2004.

> výsledek: {"success":true,"message":"Report delivered to your caller."}
