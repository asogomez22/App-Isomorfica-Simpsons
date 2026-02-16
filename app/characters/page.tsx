// app/characters/page.tsx
import { getCharacters } from "@/lib/simpsons";
import CharactersClient from "./ui/CharactersClient";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const data = await getCharacters(page); // SSR

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Characters</h1>
          <p className="text-sm text-zinc-400">
            {data.count} personajes · {data.pages} páginas · 20 por página.{" "}
            <a
              href="https://thesimpsonsapi.com/api/characters"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-zinc-200"
            >
              API
            </a>
          </p>
        </div>
      </div>

      <CharactersClient initial={data} page={page} />
    </section>
  );
}
