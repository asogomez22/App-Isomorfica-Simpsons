"use client";

import { Character, Paginated, portraitUrl } from "@/lib/simpsons";
import CharacterCard from "@/components/CharacterCard";
import Pagination from "@/components/Pagination";
import { useMemo, useEffect, useState } from "react";

type StatusFilter = "all" | "Alive" | "Deceased" | "Unknown";

export default function CharactersClient({
  initial,
  page,
}: {
  initial: Paginated<Character>;
  page: number;
}) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [onlyFav, setOnlyFav] = useState(false);
  const [fav, setFav] = useState<Set<number>>(new Set());

  // favoritos (cliente)
  useEffect(() => {
    const raw = localStorage.getItem("simpsons:fav");
    if (raw) setFav(new Set(JSON.parse(raw)));
  }, []);

  useEffect(() => {
    localStorage.setItem("simpsons:fav", JSON.stringify(Array.from(fav)));
  }, [fav]);

  const items = useMemo(() => {
    return initial.results
      .filter((c) => {
        const matchesQ = c.name.toLowerCase().includes(q.trim().toLowerCase());
        const matchesStatus =
          status === "all" ? true : (c.status ?? "Unknown") === status;
        const matchesFav = onlyFav ? fav.has(c.id) : true;
        return matchesQ && matchesStatus && matchesFav;
      })
      .map((c) => ({
        ...c,
        _img: portraitUrl(c.portrait_path),
        _isFav: fav.has(c.id),
      }));
  }, [initial.results, q, status, onlyFav, fav]);

  function toggleFav(id: number) {
    setFav((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <>
      <div className="mb-5 grid gap-3 rounded-3xl border border-zinc-800 bg-zinc-950/40 p-4 sm:grid-cols-12">
        <div className="sm:col-span-6">
          <label className="text-xs text-zinc-400">Buscar</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ej: Homer, Lisa, Burns..."
            className="mt-1 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="text-xs text-zinc-400">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            className="mt-1 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none focus:border-yellow-400"
          >
            <option value="all">Todos</option>
            <option value="Alive">Alive</option>
            <option value="Deceased">Deceased</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex items-end gap-3">
          <button
            onClick={() => setOnlyFav((v) => !v)}
            className={`w-full rounded-2xl border px-4 py-3 font-semibold ${
              onlyFav
                ? "border-yellow-400 bg-yellow-400 text-zinc-950"
                : "border-zinc-800 hover:bg-zinc-900"
            }`}
          >
            {onlyFav ? "Mostrando favoritos" : "Ver favoritos"}
          </button>
        </div>

        <div className="sm:col-span-12 text-sm text-zinc-400">
          Mostrando <span className="text-zinc-200">{items.length}</span> de{" "}
          <span className="text-zinc-200">{initial.results.length}</span> en
          esta página.
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <CharacterCard
            key={c.id}
            id={c.id}
            name={c.name}
            occupation={c.occupation}
            status={c.status}
            gender={c.gender}
            imageUrl={c._img}
            isFav={c._isFav}
            onToggleFav={() => toggleFav(c.id)}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination current={page} total={initial.pages} />
      </div>
    </>
  );
}
