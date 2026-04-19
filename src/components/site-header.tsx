import Link from "next/link";

export function SiteHeader() {
  return (
    <nav className="sticky top-3 z-30 mb-6 rounded-[2rem] border border-[#ebe3da] bg-white/92 px-3 py-3 shadow-[0_18px_60px_rgba(58,36,24,0.08)] backdrop-blur md:px-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e60023] text-sm font-bold uppercase tracking-[0.3em] text-white">
              P
            </div>
            <div>
              <p className="text-lg font-semibold text-ink">Jnvi Pinterest</p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted">
                visual diary
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/boards"
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#f4efe9]"
            >
              Boards
            </Link>
            <Link
              href="/upload"
              className="rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c4001d]"
            >
              Create
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/"
            className="rounded-full bg-[#ead2c5] px-4 py-3 text-sm font-semibold text-ink"
          >
            Home
          </Link>
          <Link
            href="/boards"
            className="rounded-full px-4 py-3 text-sm font-semibold text-ink transition hover:bg-[#f4efe9]"
          >
            Boards
          </Link>
          <Link
            href="/search"
            className="rounded-full px-4 py-3 text-sm font-semibold text-ink transition hover:bg-[#f4efe9]"
          >
            Explore
          </Link>
        </div>

        <form action="/search" className="flex min-w-0 flex-1 items-center">
          <label className="flex w-full items-center gap-3 rounded-full bg-[#efefef] px-4 py-3 text-sm text-muted transition focus-within:bg-[#e7e7e7]">
            <span aria-hidden="true" className="text-base text-[#5f5f5f]">
              Search
            </span>
            <input
              type="search"
              name="q"
              placeholder="Search for ideas, moods, colors, coffee shop..."
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-[#6c6c6c]"
            />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/upload"
            className="rounded-full bg-[#e60023] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c4001d]"
          >
            Create
          </Link>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {["For you", "Soft morning", "Street style", "Room inspo", "Travel", "Coffee"].map((label, index) => (
          <Link
            key={label}
            href={index === 0 ? "/" : `/search?q=${encodeURIComponent(label)}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              index === 0
                ? "bg-[#ead2c5] text-ink"
                : "bg-[#f4efe9] text-ink hover:bg-[#ece3d9]"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
