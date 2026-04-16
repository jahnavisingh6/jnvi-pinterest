import { BoardCard } from "@/components/board-card";
import { SiteHeader } from "@/components/site-header";
import { getBoards } from "@/lib/content";

export default async function BoardsPage() {
  const boards = await getBoards();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-8">
      <SiteHeader />

      <section className="rounded-[2rem] border border-[#f0dfd2] bg-white/80 p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">
          Your boards
        </p>
        <h1 className="mt-2 font-display text-5xl text-ink">
          Curated corners of your camera roll.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          This page is ready to become your real board index once Supabase is
          connected. For now, it gives the app true Pinterest-style structure.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </section>
    </main>
  );
}
