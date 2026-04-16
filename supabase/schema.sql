create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  cover_image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.pins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  board_id uuid references public.boards(id) on delete set null,
  image_url text not null,
  title text not null,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists public.pin_tags (
  id uuid primary key default gen_random_uuid(),
  pin_id uuid references public.pins(id) on delete cascade not null,
  tag text not null
);

create table if not exists public.saved_pins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  pin_id uuid references public.pins(id) on delete cascade not null,
  board_id uuid references public.boards(id) on delete cascade not null,
  created_at timestamptz not null default now()
);

create index if not exists boards_user_id_idx on public.boards(user_id);
create index if not exists pins_user_id_idx on public.pins(user_id);
create index if not exists pins_board_id_idx on public.pins(board_id);
create index if not exists pin_tags_pin_id_idx on public.pin_tags(pin_id);
create index if not exists saved_pins_user_id_idx on public.saved_pins(user_id);
create index if not exists saved_pins_pin_id_idx on public.saved_pins(pin_id);

insert into public.profiles (id, username, full_name)
values (
  '11111111-1111-1111-1111-111111111111',
  'jnvi',
  'Jahnavi Singh'
)
on conflict (id) do nothing;

insert into public.boards (id, user_id, name, description)
values
  (
    '22222222-2222-2222-2222-222222222221',
    '11111111-1111-1111-1111-111111111111',
    'Golden Hour',
    'Soft skies, late sunsets, and warm city light.'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Coffee Corners',
    'Cafes, books, tables by the window, and quiet moments.'
  ),
  (
    '22222222-2222-2222-2222-222222222223',
    '11111111-1111-1111-1111-111111111111',
    'Little Things',
    'Flowers, notes, mirrors, and tiny beautiful details.'
  )
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.boards enable row level security;
alter table public.pins enable row level security;
alter table public.pin_tags enable row level security;
alter table public.saved_pins enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'Profiles are viewable by everyone'
  ) then
    create policy "Profiles are viewable by everyone"
    on public.profiles for select
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'boards' and policyname = 'Boards are viewable by everyone'
  ) then
    create policy "Boards are viewable by everyone"
    on public.boards for select
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'pins' and policyname = 'Pins are viewable by everyone'
  ) then
    create policy "Pins are viewable by everyone"
    on public.pins for select
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'pin_tags' and policyname = 'Pin tags are viewable by everyone'
  ) then
    create policy "Pin tags are viewable by everyone"
    on public.pin_tags for select
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'saved_pins' and policyname = 'Saved pins are viewable by everyone'
  ) then
    create policy "Saved pins are viewable by everyone"
    on public.saved_pins for select
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'pins' and policyname = 'Public upload inserts pins'
  ) then
    create policy "Public upload inserts pins"
    on public.pins for insert
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'pin_tags' and policyname = 'Public upload inserts tags'
  ) then
    create policy "Public upload inserts tags"
    on public.pin_tags for insert
    with check (true);
  end if;
end $$;

insert into storage.buckets (id, name, public)
values ('pins', 'pins', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public can view pin images'
  ) then
    create policy "Public can view pin images"
    on storage.objects for select
    using (bucket_id = 'pins');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public can upload pin images'
  ) then
    create policy "Public can upload pin images"
    on storage.objects for insert
    with check (bucket_id = 'pins');
  end if;
end $$;
