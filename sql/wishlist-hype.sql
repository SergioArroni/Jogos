-- Run once after community-plays.sql (safe to run again). Proposals to buy can go
-- without a shop link, and say how much the proposer feels like playing them.
alter table public.wishlist_games alter column url set default '';
alter table public.wishlist_games add column if not exists hype text;
alter table public.wishlist_games drop constraint if exists wishlist_games_hype_check;
alter table public.wishlist_games add constraint wishlist_games_hype_check
  check (hype is null or hype in ('culo', 'le-daba', 'y-si-si'));
