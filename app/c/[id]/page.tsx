// app/c/[id]/page.tsx
import Link from "next/link";
import { getCharacterById, portraitUrl } from "@/lib/simpsons";
import FallbackImage from "@/components/FallbackImage";

export default async function CharacterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  const c = await getCharacterById(id);

  const img = portraitUrl(c.portrait_path);

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div>
        <Link
          href="/characters"
          className="text-sm text-zinc-400 hover:text-zinc-200"
        >
          ← Volver a Characters
        </Link>

        <h1 className="mt-3 text-3xl font-bold">{c.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Tag label={c.status ?? "Unknown"} />
          <Tag label={c.gender ?? "—"} />
          <Tag label={c.occupation ?? "—"} />
        </div>

        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/40 p-5">
          <h2 className="font-semibold">Datos</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Item k="Edad" v={c.age ?? "—"} />
            <Item k="Nacimiento" v={c.birthdate ?? "—"} />
          </dl>
        </div>

        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/40 p-5">
          <h2 className="font-semibold">Frases</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {(c.phrases ?? []).slice(0, 10).map((p, i) => (
              <li
                key={i}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3"
              >
                “{p}”
              </li>
            ))}
            {(!c.phrases || c.phrases.length === 0) && (
              <li className="text-zinc-500">Sin frases registradas.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          {img ? (
            <FallbackImage
              src={img.cdn}
              fallback={img.origin}
              alt={c.name}
              className="h-[520px] w-full object-contain p-6"
            />
          ) : (
            <div className="flex h-[520px] items-center justify-center text-zinc-500">
              Sin imagen
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-3 py-1 text-zinc-300">
      {label}
    </span>
  );
}

function Item({ k, v }: { k: string; v: any }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3">
      <dt className="text-xs text-zinc-500">{k}</dt>
      <dd className="mt-1 font-semibold text-zinc-200">{String(v)}</dd>
    </div>
  );
}
