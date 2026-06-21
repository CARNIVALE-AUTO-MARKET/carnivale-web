-- ───────────────────────────────────────────────────────────────────────────
-- Storage bucket for listing photos.
-- Public read; sellers may only write within their own user-id folder.
-- ───────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('listing-photos', 'listing-photos', true)
on conflict (id) do nothing;

-- Public read of objects in the bucket.
drop policy if exists "listing photos are public" on storage.objects;
create policy "listing photos are public"
  on storage.objects for select
  using (bucket_id = 'listing-photos');

-- Authenticated users may upload only into a folder named after their user id,
-- e.g.  <auth.uid()>/<filename>.
drop policy if exists "sellers upload own listing photos" on storage.objects;
create policy "sellers upload own listing photos"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'listing-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "sellers manage own listing photos" on storage.objects;
create policy "sellers manage own listing photos"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'listing-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "sellers delete own listing photos" on storage.objects;
create policy "sellers delete own listing photos"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'listing-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
