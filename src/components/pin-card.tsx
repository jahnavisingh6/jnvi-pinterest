import type { Pin } from "@/data/mock-data";

export function PinCard({ pin }: { pin: Pin }) {
  return (
    <article className="masonry-item overflow-hidden rounded-[1.8rem] border border-[#f1e4d8] bg-white shadow-[0_16px_40px_rgba(126,84,56,0.08)]">
      {pin.imageUrl ? (
        <div
          className={`${pin.height} bg-cover bg-center p-4`}
          style={{
            backgroundImage: `linear-gradient(rgba(38,25,20,0.08), rgba(38,25,20,0.26)), url(${pin.imageUrl})`,
          }}
        >
          <div className="flex h-full flex-col justify-between rounded-[1.35rem] border border-white/50 bg-white/10 p-4 backdrop-blur-[1px]">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.22em] text-white/80">
              <span>Jnvi capture</span>
              <span>{String(pin.id).padStart(2, "0")}</span>
            </div>
            <div>
              <p className="max-w-[10rem] font-display text-4xl leading-none text-white">
                {pin.title}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${pin.height} bg-gradient-to-b ${pin.tone} p-4`}>
          <div className="flex h-full flex-col justify-between rounded-[1.35rem] border border-white/50 bg-white/18 p-4 backdrop-blur-[1px]">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.22em] text-white/80">
              <span>Jnvi capture</span>
              <span>{String(pin.id).padStart(2, "0")}</span>
            </div>
            <div>
              <p className="max-w-[10rem] font-display text-4xl leading-none text-white">
                {pin.title}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`p-4 ${pin.accent}`}>
        <h3 className="text-lg font-semibold text-ink">{pin.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{pin.caption}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {pin.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
