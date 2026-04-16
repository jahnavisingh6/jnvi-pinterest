import Link from "next/link";
import { BoardCard } from "@/components/board-card";
import { PinCard } from "@/components/pin-card";
import { SiteHeader } from "@/components/site-header";
import { getBoards, getPins } from "@/lib/content";

export default async function Home() {
  const [boards, pins] = await Promise.all([getBoards(), getPins()]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-8">
      <SiteHeader />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[#f0dfd2] bg-paper px-6 py-8 shadow-[0_25px_80px_rgba(160,112,79,0.12)] sm:px-8 sm:py-10">
          <p className="mb-4 inline-flex rounded-full bg-rose px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#875845]">
            Personal-first and public
          </p>
          <h1 className="max-w-2xl font-display text-5xl leading-[0.95] text-ink sm:text-7xl">
            A Pinterest-inspired home for your own beautiful moments.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Start with your photos, your boards, your aesthetic. Let people
            browse the feed, search soft little memories, and save favorite
            moments to boards once you open signups later.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#feed"
              className="rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#bb744e]"
            >
              See the vibe
            </a>
            <Link
              href="/upload"
              className="rounded-full border border-[#e6d7cb] bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#fdf7f2]"
            >
              Start uploading
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#fff6ee] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                V1 focus
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">
                Public feed
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Visitors can open the site and browse your pins immediately.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f4f7ef] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Search
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">
                Tag-based discovery
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Search by title, caption, and tags before adding AI later.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#fff9dd] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Save flow
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">
                Boards first
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Keep the Pinterest feel with curated boards and pin saves.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#f0dfd2] bg-[linear-gradient(180deg,#fff2e7_0%,#fffaf5_100%)] p-5 shadow-[0_25px_80px_rgba(160,112,79,0.12)]">
          <div className="grid h-full gap-4 sm:grid-cols-2">
            <div className="rounded-[1.6rem] bg-white p-4 shadow-[0_20px_40px_rgba(124,79,47,0.08)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted">
                <span>Featured board</span>
                <span>21 pins</span>
              </div>
              <div className="mt-4 h-48 rounded-[1.4rem] bg-[linear-gradient(160deg,#ba7c60_0%,#f1c39f_52%,#fff2df_100%)]" />
              <p className="mt-4 font-display text-3xl text-ink">
                Golden Hour
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                All the moments that feel warm before they disappear.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[1.6rem] bg-[#fffaf1] p-4 shadow-[0_20px_40px_rgba(124,79,47,0.08)]">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Search preview
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  “coffee shop”
                </p>
                <p className="mt-1 text-sm text-muted">
                  12 matching pins from captions and tags
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[#f5f4fb] p-4 shadow-[0_20px_40px_rgba(124,79,47,0.08)]">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Future feature
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  Save to board
                </p>
                <p className="mt-1 text-sm text-muted">
                  Let visitors collect your pins into their own moodboards.
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[#eef5ef] p-4 shadow-[0_20px_40px_rgba(124,79,47,0.08)]">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Hosting
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  Ready for Vercel
                </p>
                <p className="mt-1 text-sm text-muted">
                  Build it here, connect Supabase, and ship a public link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="boards"
        className="mt-8 rounded-[2rem] border border-[#f0dfd2] bg-white/80 p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              Curated boards
            </p>
            <h2 className="font-display text-4xl text-ink">
              Your vibe has structure.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-muted">
            Start with boards built from your own camera roll, then let search
            and saves create the Pinterest feeling around them.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </section>

      <section id="feed" className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[2rem] border border-[#f0dfd2] bg-white/80 p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Public feed
              </p>
              <h2 className="font-display text-4xl text-ink">
                Pins that feel like little memories.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted">
              This first screen can become your live homepage: browse pins,
              click into detail pages, then wire real uploads from Supabase
              storage next.
            </p>
          </div>

          <div className="masonry-grid mt-8">
            {pins.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        </div>

        <aside
          id="launch-plan"
          className="rounded-[2rem] border border-[#f0dfd2] bg-[#fffdf9] p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-muted">
            Build next
          </p>
          <h2 className="mt-2 font-display text-4xl text-ink">Launch plan</h2>

          <div className="mt-6 space-y-4">
            {[
              "Set up Supabase auth, database, and image storage.",
              "Create boards, pins, pin_tags, and saved_pins tables.",
              "Build upload flow so you can add your own real photos.",
              "Add pin detail pages and real search by title, caption, and tags.",
              "Deploy to Vercel and share the public link.",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-[1.3rem] border border-[#f1e4d8] bg-white p-4"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-muted">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-sm leading-6 text-ink">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-[#f5ede5] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              About Python
            </p>
            <p className="mt-2 text-sm leading-6 text-ink">
              You do not need Python for this build. This project is set up with
              Next.js, which uses TypeScript and React on the frontend and can
              handle backend routes too.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
