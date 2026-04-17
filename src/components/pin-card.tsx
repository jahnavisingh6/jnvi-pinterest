import Link from "next/link";
import type { Pin } from "@/data/mock-data";

export function PinCard({ pin }: { pin: Pin }) {
  return (
    <Link
      href={`/pins/${pin.id}`}
      className="group masonry-item block overflow-hidden rounded-[1.7rem] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
    >
      {pin.imageUrl ? (
        <div
          className={`${pin.height} relative bg-cover bg-center p-3`}
          style={{
            backgroundImage: `linear-gradient(rgba(38,25,20,0.08), rgba(38,25,20,0.26)), url(${pin.imageUrl})`,
          }}
        >
          <div className="absolute inset-x-3 top-3 flex items-start justify-between opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
            <span className="rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              Jnvi capture
            </span>
            <span className="rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white shadow-lg">
              Save
            </span>
          </div>
          <div className="flex h-full flex-col justify-end rounded-[1.35rem] border border-white/40 bg-gradient-to-t from-black/35 to-transparent p-4">
            <div className="max-w-[12rem] rounded-[1.25rem] bg-white/14 p-3 backdrop-blur-[2px]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/78">
                Pin {String(pin.id).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-3xl leading-none text-white">
                {pin.title}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${pin.height} relative bg-gradient-to-b ${pin.tone} p-3`}>
          <div className="absolute inset-x-3 top-3 flex items-start justify-between opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
            <span className="rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              Mood pin
            </span>
            <span className="rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white shadow-lg">
              Save
            </span>
          </div>
          <div className="flex h-full flex-col justify-end rounded-[1.35rem] border border-white/40 bg-white/14 p-4 backdrop-blur-[1px]">
            <div className="max-w-[12rem] rounded-[1.25rem] bg-white/18 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/80">
                Pin {String(pin.id).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-3xl leading-none text-white">
                {pin.title}
              </p>
            </div>
          </div>
        </div>
      )}

        <div className={`p-4 ${pin.accent}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-ink">{pin.title}</h3>
              <p className="mt-1 text-sm text-muted">@jnvi</p>
            </div>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm">
              Open
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{pin.caption}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {pin.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        </div>
    </Link>
  );
}
