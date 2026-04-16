import Link from "next/link";
import type { Board } from "@/data/mock-data";

export function BoardCard({ board }: { board: Board }) {
  return (
    <Link
      href={`/boards/${board.id}`}
      className="rounded-[1.8rem] bg-white p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(0,0,0,0.12)]"
    >
      <div className="mb-5 grid grid-cols-2 gap-2">
        <div className={`h-28 rounded-[1.2rem] ${board.coverTone}`} />
        <div className="grid gap-2">
          <div className="h-[3.25rem] rounded-[1rem] bg-[linear-gradient(135deg,#f5d2bc_0%,#fff4eb_100%)]" />
          <div className="h-[3.25rem] rounded-[1rem] bg-[linear-gradient(135deg,#d7e2cf_0%,#f5f8ef_100%)]" />
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
            Jnvi board
          </p>
          <h3 className="mt-1 font-display text-3xl text-ink">{board.name}</h3>
        </div>
        <span className="rounded-full bg-[#f5f2ef] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {board.count} pins
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{board.description}</p>
    </Link>
  );
}
