import Link from "next/link";
import { notFound } from "next/navigation";
import { PinCard } from "@/components/pin-card";
import { SiteHeader } from "@/components/site-header";
import { getBoardById, getPinById, getPins } from "@/lib/content";

export default async function PinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pin = await getPinById(id);

  if (!pin) {
    notFound();
  }

  const [board, allPins] = await Promise.all([
    getBoardById(pin.board),
    getPins(),
  ]);

  const relatedPins = allPins
    .filter((entry) => entry.board === pin.board && entry.id !== pin.id)
    .slice(0, 6);

  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 pb-16 pt-4 sm:px-6 lg:px-8">
      <SiteHeader />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.24em] text-muted"
          >
            Back to feed
          </Link>

          <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_420px]">
            <PinCard pin={pin} clickable={false} />

            <div className="rounded-[1.8rem] bg-[#faf6f1] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Pin details
              </p>
              <h1 className="mt-3 font-display text-5xl leading-[0.95] text-ink">
                {pin.title}
              </h1>
              <p className="mt-4 text-base leading-8 text-muted">
                {pin.caption}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {pin.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:bg-[#f2ece6]"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <div className="mt-8 rounded-[1.4rem] bg-white p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">
                  Saved in
                </p>
                {board ? (
                  <>
                    <p className="mt-2 text-2xl font-semibold text-ink">
                      {board.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {board.description}
                    </p>
                    <Link
                      href={`/boards/${board.id}`}
                      className="mt-4 inline-flex text-sm font-semibold text-[#b24833] transition hover:text-[#8f3424]"
                    >
                      Open board
                    </Link>
                  </>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    This pin is not attached to a board yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-[2rem] bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">
            More like this
          </p>
          <div className="masonry-grid mt-5">
            {relatedPins.map((entry) => (
              <PinCard key={entry.id} pin={entry} />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
