# Časový log (kolik co trvalo)

Přibližné časy podle časových razítek v konverzaci, 9. 10. 2026. Slouží pro README a pro odhad nákladů.

| Čas | Trvání | Činnost |
|---|---|---|
| 13:01 až 13:53 | ~50 min | Výběr zadání: rozbor A/B, druhý názor Codexu, ověření PRIIPs/KID, LLM council (5 poradců, 5 recenzentů) |
| 13:53 až 14:24 | ~30 min | Compliance rešerše, drátěný model stránky, první verze plánu |
| 14:24 až 14:54 | ~30 min | Úpravy plánu podle Jana a Codexu, založení repozitářů |
| 15:02 až 16:08 | ~65 min | Revize plánu Claude + Codex (18 kol plan-consensus) |
| 16:08 až 16:34 | ~25 min | Export konverzace, struktura repa, první commit |
| 16:42 až 17:15 | ~35 min | Ověřování dat: kótování na NYSE, první dvě dvojice (ladění postupu) |
| 17:07 až 17:41 | ~35 min | Technický základ: Next.js, Neon, API, testy, nasazení na Vercel (souběžně s Janovým nastavením účtů) |
| 17:41 až 18:18 | ~35 min | Další dvojice ETF (DIA, VT), propojení GitHub a Vercel |
| 18:18 až 18:35 | ~15 min | Oprava pravidla výběru UCITS po druhé kontrole v nezávislém chatu Claude Code |

Celkem zhruba 5,5 hodiny od přečtení zadání. Velkou část času zabraly revize a kontroly (council, 18 kol plan-consensus, ruční kontrola dat).

## 10. 10. 2026

| Čas | Trvání | Činnost |
|---|---|---|
| 07:56 až 08:10 | ~15 min | Ověření registrace UCITS v ČR: české KID, registr ČNB (CAPTCHA opsal Jan), záměna alternativy k DIA |
| 08:10 až 09:00 | ~50 min | České KID místo anglických (jiná data u Vanguardu, zachytila nezávislá kontrola), data v3, volba "neutrální verze napřed" |
| 09:00 až 09:15 | ~15 min | Neutrální funkční stránka (tabulka, kalkulačka, formulář, přehled za tokenem), nasazení, test na produkci |
| 09:15 až 09:59 | ~45 min | Janova revize vzhledu a textů: celoobrazovkové sekce, tabulka s rozbalováním, nadpis, význam KID, zrušení varianty /b |
| 09:59 až 10:05 | ~10 min | Přestavba stránky podle revize, zdroj k depozitáři (směrnice 2014/91/EU), úprava reklam |
| 10:05 až 10:25 | ~20 min | Compliance checklist, pravidla Meta a Google (go/no-go), Lighthouse na mobilu |
| 10:25 až 10:40 | ~15 min | Redigovaný export ai-log (skript, kontrola úniků), první verze README, dotaz na trychtýř |
| 10:40 až 11:28 | ~50 min | Nezávislý audit 1: Codex + Claude subagent, 4 kola ping-pongu do shody; opravy (data za e-mailem, přehled na vlastní adrese, region, zásady, limit četnosti, výzvy ke kontaktu, reklamy) |
| 11:28 až 11:51 | pauza | Vyčerpaný limit používání |
| 11:51 až 11:55 | ~5 min | Záznam chyb AI a času, nový export ai-log |
| 12:33 až 14:55 | ~2 h 20 min | Návrh vzhledu: čtení zadání a Figmy, úpravy Figmy (rozbalený řádek, odkaz), scroll-snap přechody (nasazeno), světlé mockupy (zahozeno) |
| 14:55 až 15:53 | pauza | Jan dokončoval design mimo Clauda |
| 15:53 až 16:19 | ~25 min | Převod tmavého designu do kódu (tokeny, písma, video, tabulka, kalkulačka, formulář), test v mobilu, Lighthouse |
| 16:19 až 16:57 | ~40 min | Telefon (pád `crypto.randomUUID`, snap), záloha tagem, rozbor LCP (8 experimentů, příčina = webová písma), ořezání písem na české znaky |
| 17:07 až 18:42 | ~1 h 35 min | Kontrola reklam v1, vlastní reklamy v2 (skript), změna pořadí řádků tabulky a návrat, kontrola reklam v3, kompletní texty stránky a PDF přehledu |
| 22:40 až 23:10 | ~30 min | Kontrola PDF přehledu (InDesign), tlačítko Stáhnout PDF s tokenem, reklamy v3 do repa, zápis do wiki |
| 12. 10. 07:07 až 11:15 | ~4 h | Lighthouse po designu, README (doplnění a přepis), licence zdrojů, audit 2 (2 kola, Claude Opus medium a Codex), opravy z auditu, export `ai-log` všech sezení, ping-pong nad README (3 kola do shody), smazání testovacích dat |
