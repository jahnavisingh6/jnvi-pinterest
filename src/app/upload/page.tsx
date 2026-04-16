import { UploadForm } from "@/components/upload-form";
import { SiteHeader } from "@/components/site-header";
import { getBoards } from "@/lib/content";
import { hasSupabaseEnv } from "@/lib/supabase";

export default async function UploadPage() {
  const boards = await getBoards();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-8">
      <SiteHeader />

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-[#f0dfd2] bg-white/80 p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">
            Upload flow
          </p>
          <h1 className="mt-2 font-display text-5xl text-ink">
            Add your own photos here next.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            This now saves real photos to Supabase Storage and inserts the pin
            into your database, as long as your bucket and SQL setup are ready.
          </p>

          <UploadForm
            boards={boards.map((board) => ({ id: board.id, name: board.name }))}
            supabaseReady={hasSupabaseEnv}
          />
        </div>

        <aside className="rounded-[2rem] border border-[#f0dfd2] bg-[#fffdf9] p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">
            Supabase status
          </p>
          <div className="mt-4 rounded-[1.5rem] bg-[#f6eee5] p-5">
            <p className="text-sm font-semibold text-ink">
              {hasSupabaseEnv
                ? "Keys detected. Ready to connect real uploads."
                : "No keys yet. Add them to .env.local next."}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Create the tables and policies from `supabase/schema.sql`. After
              that, uploads from this page can go live.
            </p>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[#f1e4d8] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              Bucket plan
            </p>
            <p className="mt-2 text-sm leading-6 text-ink">
              Create a public storage bucket like `pins` so each uploaded image
              gets a real URL your app can render in the feed.
            </p>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[#f1e4d8] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              Tables
            </p>
            <p className="mt-2 text-sm leading-6 text-ink">
              Use the included SQL schema for `profiles`, `boards`, `pins`,
              `pin_tags`, and `saved_pins`.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
