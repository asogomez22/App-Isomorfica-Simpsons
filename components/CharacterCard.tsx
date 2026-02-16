"use client";
// components/CharacterCard.tsx
import Link from "next/link";

export default function CharacterCard({
  id,
  name,
  occupation,
  status,
  gender,
  imageUrl,
  isFav,
  onToggleFav,
}: {
  id: number;
  name: string;
  occupation?: string | null;
  status?: string | null;
  gender?: string | null;
  imageUrl?: { cdn: string; origin: string } | null;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug">{name}</h3>
          <button
            onClick={onToggleFav}
            className={`rounded-2xl border px-3 py-2 text-sm font-semibold ${
              isFav
                ? "border-yellow-400 bg-yellow-400 text-zinc-950"
                : "border-zinc-800 hover:bg-zinc-900"
            }`}
            aria-label="Toggle favorite"
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>

        <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
          {occupation ?? "—"}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Tag label={status ?? "Unknown"} />
          <Tag label={gender ?? "—"} />
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          {imageUrl ? (
            <img
              src={imageUrl.cdn}
              alt={name}
              className="h-56 w-full object-contain p-3 transition group-hover:scale-[1.02]"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== imageUrl.origin) img.src = imageUrl.origin;
              }}
            />
          ) : (
            <div className="flex h-56 items-center justify-center text-sm text-zinc-500">
              Sin imagen
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link
            href={`/c/${id}`}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-semibold hover:bg-zinc-900"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-3 py-1 text-zinc-300">
      {label}
    </span>
  );
}
