-- Run after the account sergioadgi38@gmail.com has signed up and confirmed email.
-- This is the only account that can open the administration area.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('ludoteca_admin', true)
where lower(email) = lower('sergioadgi38@gmail.com')
returning id, email, raw_app_meta_data->>'ludoteca_admin' as ludoteca_admin;
