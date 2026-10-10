-- Trychtýř (funnel) celé cesty: kolik relací (návštěv) došlo ke každému kroku, rozděleno podle reklamy (varianta a/b).
-- Spuštění: v SQL editoru Neonu, nebo psql s DATABASE_URL. Relace = jedna návštěva bez obnovení stránky.
with kroky as (
  select coalesce(variant, '-') as varianta, session_id,
         bool_or(event = 'page_view')            as navsteva,
         bool_or(event = 'section_view' and props->>'section' = 'srovnani') as videl_srovnani,
         bool_or(event in ('row_expand', 'interaction_used')) as interakce,
         bool_or(event = 'section_view' and props->>'section' = 'formular') as videl_formular,
         bool_or(event = 'form_start')           as zacal_formular,
         bool_or(event = 'form_submit_attempt')  as odeslal,
         bool_or(event = 'lead_created')         as lead,
         bool_or(event = 'pdf_download_clicked') as pdf
  from events
  group by 1, 2
)
select varianta,
       count(*) filter (where navsteva)       as navstevy,
       count(*) filter (where videl_srovnani) as srovnani,
       count(*) filter (where interakce)      as interakce,
       count(*) filter (where videl_formular) as formular_videl,
       count(*) filter (where zacal_formular) as formular_zacal,
       count(*) filter (where odeslal)        as odeslano,
       count(*) filter (where lead)           as leady,
       count(*) filter (where pdf)            as pdf,
       round(100.0 * count(*) filter (where lead) / nullif(count(*) filter (where navsteva), 0), 1) as konverze_pct
from kroky
group by varianta
order by varianta;
