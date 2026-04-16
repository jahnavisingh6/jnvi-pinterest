import Link from "next/link";
import { notFound } from "next/navigation";
import { PinCard } from "@/components/pin-card";
import { SiteHeader } from "@/components/site-header";
import { getBoardById, getPinsByBoard } from "@/lib/content";

export default async function BoardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = await getBoardById(id);

  if (!board) {
    notFound();
  }

  const boardPins = await getPinsByBoard(id);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-8">
      <SiteHeader />

      <section className="rounded-[2rem] border border-[#f0dfd2] bg-white/80 p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]">
        <Link
          href="/boards"
          className="text-xs font-semibold uppercase tracking-[0.24em] text-muted"
        >
          Back to boards
        </Link>
        <h1 className="mt-3 font-display text-5xl text-ink">{board.name}</h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
          {board.description}
        </p>

        <div className="mt-8 masonry-grid">
          {boardPins.map((pin) => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>
      </section>
    </main>
  );
}
