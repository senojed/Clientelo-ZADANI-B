-- Databázové tabulky pro landing page: leady (kontakty z formuláře) a události (měření cesty návštěvníka).
-- Spouští se skriptem scripts/migrate.mjs. "if not exists" = lze spustit opakovaně bez chyby.

create table if not exists leads (
  id bigserial primary key,                                  -- interní ID, nikdy se neposílá do prohlížeče
  public_id uuid not null unique default gen_random_uuid(),  -- veřejné neuhodnutelné ID (lead_id pro klienta)
  email text not null,
  marketing_consent boolean not null default false,          -- nepovinné políčko "novinky o ETF"
  consent_text_version text not null,                        -- verze textu informace o zpracování / souhlasu
  consent_ts timestamptz,                                    -- čas souhlasu s marketingem (jen když byl dán)
  idempotency_key uuid not null unique,                      -- brání dvojímu uložení při dvojkliku
  session_id uuid,
  utm jsonb not null default '{}'::jsonb,
  variant text,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id bigserial primary key,
  event text not null,
  session_id uuid not null,
  lead_public_id uuid,
  utm jsonb not null default '{}'::jsonb,
  variant text,
  props jsonb not null default '{}'::jsonb,
  client_ts timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists events_session_idx on events (session_id);
create index if not exists events_event_idx on events (event);
