import Image from "next/image";
import Link from "next/link";
import type { Pin } from "@/data/mock-data";

const passthroughImageLoader = ({ src }: { src: string }) => src;

export function PinCard({
  pin,
  clickable = true,
}: {
  pin: Pin;
  clickable?: boolean;
}) {
  const content = (
    <>
      {pin.imageUrl ? (
        <div className="bg-[linear-gradient(180deg,#fcf8f4_0%,#f3eee8_100%)] p-3 sm:p-4">
          <div className="overflow-hidden rounded-[1.35rem] border border-[#efe5db] bg-white">
            <Image
              src={pin.imageUrl}
              alt={pin.title}
              loader={passthroughImageLoader}
              unoptimized
              width={1200}
              height={1600}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="h-auto max-h-[72vh] w-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className={`${pin.height} relative bg-gradient-to-b ${pin.tone} p-3`}>
          <div className="absolute inset-x-3 top-3 flex items-start justify-between opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
            <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5d4c44] backdrop-blur">
              Mood pin
            </span>
            <span className="rounded-full bg-[#dd6f57] px-4 py-2 text-sm font-semibold text-white shadow-lg">
              Save
            </span>
          </div>
          <div className="flex h-full flex-col justify-end rounded-[1.35rem] border border-white/40 bg-gradient-to-t from-white/34 to-white/10 p-4 backdrop-blur-[1px]">
            <div className="max-w-[12rem] rounded-[1.25rem] bg-white/40 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#5d4c44]">
                Pin {String(pin.id).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-3xl leading-none text-ink">
                {pin.title}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`relative p-4 ${pin.accent}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-ink">{pin.title}</h3>
            <p className="mt-1 text-sm text-muted">@jnvi</p>
          </div>
          {clickable ? (
            <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm">
              Open
            </span>
          ) : null}
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
    </>
  );

  const cardClassName =
    "group masonry-item block overflow-hidden rounded-[1.7rem] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]";

  if (clickable) {
    return (
      <Link href={`/pins/${pin.id}`} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}
