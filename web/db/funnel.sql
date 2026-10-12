-- Trychtýř (funnel) celé cesty: kolik relací (návštěv) došlo ke každému kroku, rozděleno podle reklamy (varianta a/b).
-- Spuštění: v SQL editoru Neonu, nebo psql s DATABASE_URL. Relace = jedna návštěva bez obnovení stránky.
-- Kohorta: jen relace se zaznamenaným page_view, aby čitatel i jmenovatel konverze počítaly stejné návštěvy.
-- Relace bez page_view (ztracená událost, přímý příchod na /prehled) se vypíšou zvlášť jako "neuplne".
with relace as (
  select session_id,
         max(variant) as varianta,
         bool_or(event = 'page_view')            as navsteva,
         bool_or(event = 'section_view' and props->>'section' = 'srovnani') as videl_srovnani,
         bool_or(event in ('row_expand', 'interaction_used')) as interakce,
         bool_or(event = 'section_view' and props->>'section' = 'formular') as videl_formular,
         bool_or(event = 'form_start')           as zacal_formular,
         bool_or(event = 'form_submit_attempt')  as odeslal,
         bool_or(event = 'lead_created')         as lead,
         bool_or(event = 'pdf_download_clicked') as pdf
  from events
  group by session_id
),
souhlas as (
  -- Druhá konverze: lead se souhlasem s novinkami (podle uloženého leadu, ne podle události).
  select distinct session_id from leads where marketing_consent
)
select coalesce(r.varianta, '-') as varianta,
       count(*) filter (where r.navsteva)                         as navstevy,
       count(*) filter (where r.navsteva and r.videl_srovnani)    as srovnani,
       count(*) filter (where r.navsteva and r.interakce)         as interakce,
       count(*) filter (where r.navsteva and r.videl_formular)    as formular_videl,
       count(*) filter (where r.navsteva and r.zacal_formular)    as formular_zacal,
       count(*) filter (where r.navsteva and r.odeslal)           as odeslano,
       count(*) filter (where r.navsteva and r.lead)              as leady,
       count(*) filter (where r.navsteva and r.lead and s.session_id is not null) as leady_se_souhlasem,
       count(*) filter (where r.navsteva and r.pdf)               as pdf,
       round(100.0 * count(*) filter (where r.navsteva and r.lead) / nullif(count(*) filter (where r.navsteva), 0), 1)
         as konverze_pct,
       round(100.0 * count(*) filter (where r.navsteva and r.lead and s.session_id is not null)
         / nullif(count(*) filter (where r.navsteva), 0), 1)      as konverze_souhlas_pct,
       count(*) filter (where not r.navsteva)                     as neuplne
from relace r
left join souhlas s on s.session_id = r.session_id
group by 1
order by 1;

-- Poznámka: "lead" = jedno odeslání formuláře (stejný e-mail může po čase vzniknout znovu). Počet unikátních e-mailů:
--   select count(distinct email) from leads;
