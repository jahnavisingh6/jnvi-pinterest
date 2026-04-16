import Link from "next/link";
import { BoardCard } from "@/components/board-card";
import { PinCard } from "@/components/pin-card";
import { SiteHeader } from "@/components/site-header";
import { getBoards, getPins } from "@/lib/content";

export default async function Home() {
  const [boards, pins] = await Promise.all([getBoards(), getPins()]);

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pb-16 pt-4 sm:px-6 lg:px-8">
      <SiteHeader />

      <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-5 xl:sticky xl:top-40 xl:self-start">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <p className="inline-flex rounded-full bg-[#fbe2e7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9b3244]">
              Make it workable first
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-ink">
              Your first real Pinterest-style homepage.
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted">
              Browse pins, search ideas, open boards, and keep the product usable
              now. We can push the visual polish further after the flows feel
              right.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#feed"
                className="rounded-full bg-[#e60023] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c4001d]"
              >
                Open feed
              </a>
              <Link
                href="/upload"
                className="rounded-full bg-[#efefef] px-5 py-3 text-sm font-semibold text-ink transition hover:bg-[#e4e4e4]"
              >
                Create pin
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              Popular boards
            </p>
            <div className="mt-4 space-y-3">
              {boards.slice(0, 3).map((board) => (
                <Link
                  key={board.id}
                  href={`/boards/${board.id}`}
                  className="flex items-center gap-3 rounded-[1.4rem] bg-[#f7f3ee] p-3 transition hover:bg-[#efe9e2]"
                >
                  <div className={`h-14 w-14 rounded-[1rem] ${board.coverTone}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {board.name}
                    </p>
                    <p className="text-xs text-muted">{board.count} pins</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              Search ideas
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["outfit", "matcha", "sunset", "mirror selfie", "books", "travel"].map((topic) => (
                <Link
                  key={topic}
                  href={`/search?q=${encodeURIComponent(topic)}`}
                  className="rounded-full bg-[#f1ece6] px-3 py-2 text-sm text-ink transition hover:bg-[#e7dfd6]"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-[2.2rem] bg-[linear-gradient(135deg,#fff7f3_0%,#fffefe_46%,#f3f6ef_100%)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                  Home feed
                </p>
                <h2 className="mt-3 font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
                  Find new ideas to try.
                </h2>
                <p className="mt-4 text-base leading-8 text-muted">
                  This is now framed more like a real Pinterest landing
                  experience: fast browse, visible boards, and search-led
                  discovery.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                    Feed
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-ink">
                    {pins.length}
                  </p>
                  <p className="mt-1 text-sm text-muted">visible pins</p>
                </div>
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                    Boards
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-ink">
                    {boards.length}
                  </p>
                  <p className="mt-1 text-sm text-muted">collections</p>
                </div>
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                    Ready next
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink">Uploads</p>
                  <p className="mt-1 text-sm text-muted">wire your own images</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Boards
                </p>
                <h2 className="mt-2 font-display text-4xl text-ink">
                  Browse by collection
                </h2>
              </div>
              <Link
                href="/boards"
                className="text-sm font-semibold text-[#b24833] transition hover:text-[#8f3424]"
              >
                See all boards
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          </section>

          <section
            id="feed"
            className="rounded-[2rem] bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  For you
                </p>
                <h2 className="mt-2 font-display text-4xl text-ink">
                  Pins styled like a real browse feed
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-muted">
                Save buttons, denser card spacing, and a cleaner top navigation
                make this feel much closer to Pinterest while still using your
                current data model.
              </p>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {["All", "Aesthetic", "Study", "Travel", "Coffee", "Night", "Soft chaos"].map((filter, index) => (
                <Link
                  key={filter}
                  href={index === 0 ? "/" : `/search?q=${encodeURIComponent(filter)}`}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    index === 0
                      ? "bg-[#111111] text-white"
                      : "bg-[#f5f2ef] text-ink hover:bg-[#ece7e2]"
                  }`}
                >
                  {filter}
                </Link>
              ))}
            </div>

            <div className="masonry-grid mt-6">
              {pins.map((pin) => (
                <PinCard key={pin.id} pin={pin} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
