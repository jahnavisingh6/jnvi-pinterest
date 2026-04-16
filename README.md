# Jnvi Pinterest

A Pinterest-inspired visual diary built around curated aesthetic photos, mood boards, and soft little memories.

## Current state

The project currently includes:

- a branded public homepage
- a Pinterest-style masonry feed mockup
- curated board sections
- a launch plan sidebar for the next product steps

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Suggested next steps

1. Add Supabase for auth, database, and image storage.
2. Build real `boards`, `pins`, `pin_tags`, and `saved_pins` tables.
3. Replace sample cards with your actual uploaded photos.
4. Add pin detail pages and search.
5. Deploy to Vercel.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add your project URL and anon key.
4. Run the SQL in `supabase/schema.sql`.
5. Create a public storage bucket called `pins`.

## Deploy

The easiest hosting path is Vercel:

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add environment variables when Supabase is connected.
4. Deploy and share the public URL.
