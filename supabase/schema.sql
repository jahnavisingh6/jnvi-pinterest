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

alter table public.profiles enable row level security;
alter table public.boards enable row level security;
alter table public.pins enable row level security;
alter table public.pin_tags enable row level security;
alter table public.saved_pins enable row level security;

create policy "Profiles are viewable by everyone"
on public.profiles for select
using (true);

create policy "Boards are viewable by everyone"
on public.boards for select
using (true);

create policy "Pins are viewable by everyone"
on public.pins for select
using (true);

create policy "Pin tags are viewable by everyone"
on public.pin_tags for select
using (true);

create policy "Saved pins are viewable by everyone"
on public.saved_pins for select
using (true);
