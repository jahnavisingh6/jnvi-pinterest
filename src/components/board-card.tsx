import Link from "next/link";
import type { Board } from "@/data/mock-data";

export function BoardCard({ board }: { board: Board }) {
  return (
    <Link
      href={`/boards/${board.id}`}
      className="rounded-[1.6rem] border border-[#f1e4d8] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(126,84,56,0.1)]"
    >
      <div className={`mb-5 h-36 rounded-[1.3rem] ${board.coverTone}`} />
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-3xl text-ink">{board.name}</h3>
        <span className="rounded-full bg-[#fbf3ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {board.count} pins
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{board.description}</p>
    </Link>
  );
}
