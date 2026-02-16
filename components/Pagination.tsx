// components/Pagination.tsx
import Link from "next/link";

export default function Pagination({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const prev = Math.max(1, current - 1);
  const next = Math.min(total, current + 1);

  // Generate visible page numbers
  const pages: number[] = [];
  const range = 2;
  for (
    let i = Math.max(1, current - range);
    i <= Math.min(total, current + range);
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-zinc-800/60 bg-zinc-900/30 p-4">
      <div className="text-sm text-zinc-500">
        Página <span className="font-semibold text-zinc-200">{current}</span> de{" "}
        <span className="font-semibold text-zinc-200">{total}</span>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Prev */}
        <Link
          aria-disabled={current === 1}
          className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
            current === 1
              ? "pointer-events-none border-zinc-900 text-zinc-700"
              : "border-zinc-800/60 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700"
          }`}
          href={`/characters?page=${prev}`}
        >
          ←
        </Link>

        {/* Page numbers */}
        {pages[0] > 1 && (
          <>
            <Link
              href="/characters?page=1"
              className="rounded-xl border border-zinc-800/60 px-3.5 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800/50"
            >
              1
            </Link>
            {pages[0] > 2 && <span className="px-1 text-zinc-700">…</span>}
          </>
        )}

        {pages.map((p) => (
          <Link
            key={p}
            href={`/characters?page=${p}`}
            className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
              p === current
                ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                : "border-zinc-800/60 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            {p}
          </Link>
        ))}

        {pages[pages.length - 1] < total && (
          <>
            {pages[pages.length - 1] < total - 1 && (
              <span className="px-1 text-zinc-700">…</span>
            )}
            <Link
              href={`/characters?page=${total}`}
              className="rounded-xl border border-zinc-800/60 px-3.5 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800/50"
            >
              {total}
            </Link>
          </>
        )}

        {/* Next */}
        <Link
          aria-disabled={current === total}
          className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
            current === total
              ? "pointer-events-none border-zinc-900 text-zinc-700"
              : "border-zinc-800/60 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700"
          }`}
          href={`/characters?page=${next}`}
        >
          →
        </Link>
      </div>
    </div>
  );
}
