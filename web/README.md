# web: aplikace landing page

Next.js 16 + TypeScript, nasazeno na Vercel (Root Directory `web`). Hlavní README celého řešení je v kořeni repozitáře.

- `app/page.tsx`: stránka (zatím provizorní technický test)
- `app/api/lead/route.ts`: uložení kontaktu do databáze Neon, idempotence, honeypot, kontrola původu
- `app/api/events/route.ts`: měření cesty bez cookies, jen povolené události
- `db/schema.sql`, `scripts/migrate.mjs`: tabulky `leads` a `events`

Lokálně (připojení k databázi se čte z `.env` mimo repozitář):

```bash
npm install
node --env-file=../../.env scripts/migrate.mjs
npm run build
```
