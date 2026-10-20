-- Keep one game per case-insensitive name in each user's collection, then
-- enforce that rule for all future inserts and updates.
begin;

with ranked_games as (
  select
    id,
    row_number() over (
      partition by user_id, lower(btrim(data->>'name'))
      order by id
    ) as duplicate_number
  from public.games
  where nullif(btrim(data->>'name'), '') is not null
)
delete from public.games as game
using ranked_games as ranked
where game.id = ranked.id
  and ranked.duplicate_number > 1;

create unique index if not exists games_user_name_unique_idx
  on public.games (user_id, lower(btrim(data->>'name')))
  where nullif(btrim(data->>'name'), '') is not null;

commit;
