# web: aplikace landing page

Next.js 16 + TypeScript, nasazeno na Vercel (Root Directory `web`). Hlavní README celého řešení je v kořeni repozitáře.

- `app/page.tsx`, `components/`: landing page (úvod, tabulka `Srovnani`, `Kalkulacka`, `LeadForm`, `Prehled`)
- `app/api/prehled/route.ts`: data přehledu jen s platným podepsaným tokenem (`lib/token.ts`)
- `app/zasady/page.tsx`: zásady zpracování osobních údajů
- `app/api/lead/route.ts`: uložení kontaktu do databáze Neon, idempotence, honeypot, kontrola původu
- `app/api/events/route.ts`: měření cesty bez cookies, jen povolené události
- `db/schema.sql`, `scripts/migrate.mjs`: tabulky `leads` a `events`; `db/funnel.sql`: trychtýř podle varianty reklamy
- `scripts/sync-data.mjs`: před buildem zkopíruje `data/etf.json` z kořene repa

Lokálně (připojení k databázi se čte z `.env` mimo repozitář):

```bash
npm install
node --env-file=../../.env scripts/migrate.mjs
npm run build
```
