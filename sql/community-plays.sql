-- Run once in the Supabase SQL Editor, after user-features.sql.
-- Adds friend photos, group sharing with linked friends, "X te ha añadido"
-- notices, shared play logs with per-person ratings, and stable row ids so
-- the app only saves what changed. Safe to run more than once.
begin;

-- Profile photos (includes profile-appearance.sql). Signed-in users can see
-- every avatar so friends' photos show up; only the owner can change theirs.
alter table public.profiles add column if not exists avatar_path text;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', false, 2097152, array['image/webp'])
on conflict (id) do update
set public = false, file_size_limit = 2097152, allowed_mime_types = array['image/webp'];

drop policy if exists "Users can view their own avatar" on storage.objects;
drop policy if exists "Signed-in users can view avatars" on storage.objects;
create policy "Signed-in users can view avatars"
  on storage.objects for select to authenticated using (bucket_id = 'avatars');
drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
  on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
  on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Groups can be shared with an account id (linked friend) as well as an email.
alter table public.group_shares add column if not exists member_id uuid references auth.users(id) on delete cascade;
alter table public.group_shares alter column member_email drop not null;
alter table public.group_shares drop constraint if exists group_shares_member_check;
alter table public.group_shares add constraint group_shares_member_check
  check (member_id is not null or member_email is not null);
create unique index if not exists group_shares_member_id_unique_idx
  on public.group_shares(owner_id, group_key, member_id) where member_id is not null;

create or replace function public.has_group_access(group_owner uuid, key text)
returns boolean language sql stable security definer set search_path = public as $$
  select group_owner = auth.uid() or exists (
    select 1 from public.group_shares s
    where s.owner_id = group_owner and s.group_key = key
      and (s.member_id = auth.uid() or lower(s.member_email) = lower(auth.jwt()->>'email'))
  );
$$;

drop policy if exists "Users see their group shares" on public.group_shares;
create policy "Users see their group shares" on public.group_shares
  for select to authenticated using (
    owner_id = auth.uid() or member_id = auth.uid()
    or lower(member_email) = lower(auth.jwt()->>'email')
  );

drop policy if exists "Groups readable by owner or invitee" on public.groups;
drop policy if exists "Groups insertable by owner or invitee" on public.groups;
drop policy if exists "Groups updateable by owner or invitee" on public.groups;
create policy "Groups readable by owner or invitee" on public.groups
  for select to authenticated using (public.has_group_access(user_id, app_id));
create policy "Groups insertable by owner or invitee" on public.groups
  for insert to authenticated with check (public.has_group_access(user_id, app_id));
create policy "Groups updateable by owner or invitee" on public.groups
  for update to authenticated
  using (public.has_group_access(user_id, app_id)) with check (public.has_group_access(user_id, app_id));

-- One row per "owner added friend_id as a friend", so friend_id gets a notice.
create table if not exists public.friend_links (
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  friend_id uuid not null references auth.users(id) on delete cascade,
  dismissed boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (owner_id, friend_id),
  check (owner_id <> friend_id)
);
alter table public.friend_links enable row level security;
drop policy if exists "Friend links visible to both sides" on public.friend_links;
create policy "Friend links visible to both sides" on public.friend_links
  for select to authenticated using (owner_id = auth.uid() or friend_id = auth.uid());
drop policy if exists "Owners create friend links" on public.friend_links;
create policy "Owners create friend links" on public.friend_links
  for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "Owners remove friend links" on public.friend_links;
create policy "Owners remove friend links" on public.friend_links
  for delete to authenticated using (owner_id = auth.uid());
drop policy if exists "Added friends dismiss notices" on public.friend_links;
create policy "Added friends dismiss notices" on public.friend_links
  for update to authenticated using (friend_id = auth.uid()) with check (friend_id = auth.uid());
create index if not exists friend_links_friend_idx on public.friend_links(friend_id);

-- Play log. A play can belong to a group (owned or shared); everyone with
-- access to that group, plus every linked participant, can see it.
create table if not exists public.plays (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  group_owner uuid references auth.users(id) on delete set null,
  group_key text,
  group_name text,
  game_name text not null check (length(btrim(game_name)) between 1 and 120),
  played_on date not null default current_date,
  place text,
  notes text,
  created_at timestamptz not null default now()
);
create table if not exists public.play_players (
  id uuid primary key default gen_random_uuid(),
  play_id uuid not null references public.plays(id) on delete cascade,
  name text not null check (length(btrim(name)) between 1 and 60),
  user_id uuid references auth.users(id) on delete set null,
  points numeric,
  winner boolean not null default false,
  rating smallint check (rating between 1 and 10),
  unique (play_id, user_id)
);
create index if not exists plays_group_idx on public.plays(group_owner, group_key);
create index if not exists play_players_play_idx on public.play_players(play_id);
create index if not exists play_players_user_idx on public.play_players(user_id);

create or replace function public.can_view_play(pid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.plays p
    where p.id = pid and (
      p.owner_id = auth.uid()
      or (p.group_key is not null and public.has_group_access(p.group_owner, p.group_key))
      or exists (select 1 from public.play_players pp where pp.play_id = p.id and pp.user_id = auth.uid())
    )
  );
$$;
create or replace function public.is_play_player(pid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.play_players where play_id = pid and user_id = auth.uid());
$$;
create or replace function public.owns_play(pid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.plays where id = pid and owner_id = auth.uid());
$$;

alter table public.plays enable row level security;
alter table public.play_players enable row level security;
drop policy if exists "Plays visible to group and players" on public.plays;
-- Checks the row's own columns so INSERT ... RETURNING sees the new play.
create policy "Plays visible to group and players" on public.plays
  for select to authenticated using (
    owner_id = auth.uid()
    or (group_key is not null and public.has_group_access(group_owner, group_key))
    or public.is_play_player(id)
  );
drop policy if exists "Users log plays" on public.plays;
create policy "Users log plays" on public.plays
  for insert to authenticated with check (
    owner_id = auth.uid() and (group_key is null or public.has_group_access(group_owner, group_key))
  );
drop policy if exists "Owners edit plays" on public.plays;
create policy "Owners edit plays" on public.plays
  for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
drop policy if exists "Owners delete plays" on public.plays;
create policy "Owners delete plays" on public.plays
  for delete to authenticated using (owner_id = auth.uid());
drop policy if exists "Players visible with their play" on public.play_players;
create policy "Players visible with their play" on public.play_players
  for select to authenticated using (public.can_view_play(play_id));
drop policy if exists "Play owners manage players" on public.play_players;
create policy "Play owners manage players" on public.play_players
  for all to authenticated using (public.owns_play(play_id)) with check (public.owns_play(play_id));

-- Each participant rates the game for themselves, without touching other columns.
create or replace function public.rate_play(pid uuid, value smallint)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.play_players set rating = value where play_id = pid and user_id = auth.uid();
  if not found then raise exception 'No participaste en esta partida'; end if;
end;
$$;
revoke all on function public.rate_play(uuid, smallint) from public, anon;
grant execute on function public.rate_play(uuid, smallint) to authenticated;

-- Stable per-row ids (the app's own id) so changes can be saved one by one.
alter table public.games add column if not exists app_id text;
alter table public.places add column if not exists app_id text;
alter table public.friends add column if not exists app_id text;
update public.games set app_id = coalesce(nullif(data->>'id', ''), 'legacy-' || id::text) where app_id is null;
update public.places set app_id = coalesce(nullif(data->>'id', ''), 'legacy-' || id::text) where app_id is null;
update public.friends set app_id = coalesce(nullif(data->>'id', ''), 'legacy-' || id::text) where app_id is null;
delete from public.games a using public.games b where a.user_id = b.user_id and a.app_id = b.app_id and a.id < b.id;
delete from public.places a using public.places b where a.user_id = b.user_id and a.app_id = b.app_id and a.id < b.id;
delete from public.friends a using public.friends b where a.user_id = b.user_id and a.app_id = b.app_id and a.id < b.id;
alter table public.games alter column app_id set default gen_random_uuid()::text;
alter table public.places alter column app_id set default gen_random_uuid()::text;
alter table public.friends alter column app_id set default gen_random_uuid()::text;
alter table public.games alter column app_id set not null;
alter table public.places alter column app_id set not null;
alter table public.friends alter column app_id set not null;
create unique index if not exists games_user_app_id_unique_idx on public.games(user_id, app_id);
create unique index if not exists places_user_app_id_unique_idx on public.places(user_id, app_id);
create unique index if not exists friends_user_app_id_unique_idx on public.friends(user_id, app_id);

grant select, insert, update, delete on public.friend_links, public.plays, public.play_players to authenticated;

commit;
