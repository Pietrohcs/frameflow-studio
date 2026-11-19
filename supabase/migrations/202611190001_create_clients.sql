create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  observations text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint clients_full_name_not_blank
    check (btrim(full_name) <> '')
);

create or replace function public.set_clients_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace trigger clients_set_updated_at
before update on public.clients
for each row execute function public.set_clients_updated_at();

alter table public.clients enable row level security;

create policy "clients_select_own"
on public.clients
for select
to authenticated
using (user_id = auth.uid());

create policy "clients_insert_own"
on public.clients
for insert
to authenticated
with check (user_id = auth.uid());

create policy "clients_update_own"
on public.clients
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "clients_delete_own"
on public.clients
for delete
to authenticated
using (user_id = auth.uid());

create index if not exists clients_user_id_idx
  on public.clients (user_id);
