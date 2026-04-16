import { PinCard } from "@/components/pin-card";
import { SiteHeader } from "@/components/site-header";
import { searchAllPins } from "@/lib/content";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchAllPins(q);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-8">
      <SiteHeader />

      <section className="rounded-[2rem] border border-[#f0dfd2] bg-white/80 p-6 shadow-[0_25px_80px_rgba(160,112,79,0.1)]">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">
          Search your pins
        </p>
        <h1 className="mt-2 font-display text-5xl text-ink">
          Find a vibe, a word, or a memory.
        </h1>

        <form className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Try sunset, coffee, mirror, rain..."
              className="w-full rounded-full border border-[#eadfd2] bg-[#fffaf4] px-5 py-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-[#cf9d80]"
            />
            <button
              type="submit"
              className="rounded-full bg-clay px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#bb744e]"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-6 rounded-[1.4rem] bg-[#f8f1e9] p-4 text-sm text-muted">
          {q ? (
            <span>
              Showing {results.length} result{results.length === 1 ? "" : "s"}{" "}
              for <strong className="text-ink">{q}</strong>.
            </span>
          ) : (
            <span>Type a word and the app searches titles, captions, tags, and board names.</span>
          )}
        </div>

        <div className="masonry-grid mt-8">
          {results.map((pin) => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>
      </section>
    </main>
  );
}
