import Link from "next/link";

export function SiteHeader() {
  return (
    <nav className="sticky top-4 z-20 mb-6 flex items-center justify-between gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_60px_rgba(99,62,34,0.08)] backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clay text-sm font-semibold uppercase tracking-[0.3em] text-white">
          J
        </div>
        <div>
          <p className="font-display text-3xl leading-none text-ink">
            Jnvi Pinterest
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-muted">
            visual diary
          </p>
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 items-center justify-center px-6 md:flex">
        <div className="flex w-full max-w-xl items-center rounded-full border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm text-muted shadow-inner">
          <span className="mr-3 text-base">Search</span>
          <span className="truncate">
            sunset light, coffee shop, city blur, soft morning
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/boards"
          className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#f7efe5]"
        >
          Boards
        </Link>
        <Link
          href="/search"
          className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#f7efe5]"
        >
          Search
        </Link>
        <Link
          href="/upload"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4c342a]"
        >
          Upload
        </Link>
      </div>
    </nav>
  );
}
