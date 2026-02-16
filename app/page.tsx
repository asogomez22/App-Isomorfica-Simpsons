// app/page.tsx
import Link from "next/link";
import { getCharacters, portraitUrl } from "@/lib/simpsons";

export default async function Home() {
  const data = await getCharacters(1);
  const featured = data.results.slice(0, 5);
  const hero = featured[0];
  const heroImg = portraitUrl(hero?.portrait_path);
  const rest = featured.slice(1);

  // Gather phrases from multiple characters for the ticker
  const allPhrases = data.results
    .flatMap((c) => (c.phrases ?? []).map((p) => ({ phrase: p, name: c.name })))
    .slice(0, 20);

  return (
    <div className="space-y-16">
      {/* ═══ HERO ═══ */}
      <section className="noise relative overflow-hidden rounded-4xl border border-zinc-800/80">
        {/* Animated blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-yellow-400/20 blur-[120px] animate-pulse-glow" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[100px] animate-pulse-glow delay-200" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-pink-500/8 blur-[80px] animate-float" />

        <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          {/* Left: Copy */}
          <div className="flex flex-col justify-center">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-1.5 text-sm text-yellow-300/90">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
                </span>
                Más de {data.count} personajes
              </span>
            </div>

            <h1 className="mt-6 animate-slide-up delay-100 text-5xl font-extrabold tracking-tight leading-[1.1] sm:text-7xl">
              <span className="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Personajes
              </span>{" "}
              <span className="bg-linear-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent animate-gradient">
                Simpsons
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400 animate-slide-up delay-200">
              Descubre todos los personajes de Springfield: sus datos, frases
              míticas, ocupaciones y mucho más.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-slide-up delay-300">
              <Link
                href="/characters"
                className="group relative overflow-hidden rounded-2xl bg-yellow-400 px-7 py-4 font-bold text-zinc-950 transition-all duration-300 hover:shadow-[0_0_40px_rgba(250,204,21,0.3)] hover:scale-[1.03]"
              >
                <span className="relative z-10">Explorar personajes</span>
                <div className="absolute inset-0 bg-linear-to-r from-yellow-300 to-amber-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>

            {/* Mini stats */}
            <div className="mt-10 flex gap-6 animate-slide-up delay-400">
              <MiniStat value={`${data.count}`} label="Personajes" />
              <MiniStat value={`${data.pages}`} label="Páginas" />
              <MiniStat value="20" label="Por página" />
            </div>
          </div>

          {/* Right: Hero character card */}
          <div className="flex items-center justify-center animate-slide-in-right delay-200">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-4xl bg-linear-to-br from-yellow-400/20 via-transparent to-blue-500/10 blur-2xl animate-pulse-glow" />

              <div className="glass relative overflow-hidden rounded-4xl border border-zinc-700/50 p-6 sm:p-8">
                <div className="absolute top-4 right-4 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                  ★ Destacado
                </div>

                {heroImg && (
                  <div className="mx-auto mb-6 h-52 w-52 overflow-hidden rounded-2xl border border-zinc-700/40 bg-zinc-900/60 sm:h-64 sm:w-64">
                    <img
                      src={heroImg.cdn}
                      alt={hero.name}
                      className="h-full w-full object-contain p-4 animate-float"
                    />
                  </div>
                )}

                <h2 className="text-center text-2xl font-bold">{hero?.name}</h2>
                <p className="mt-1 text-center text-sm text-zinc-400">
                  {hero?.occupation ?? "Ciudadano de Springfield"}
                </p>

                <div className="mt-4 flex justify-center gap-2">
                  <span className="rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-300">
                    {hero?.status ?? "Unknown"}
                  </span>
                  <span className="rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-300">
                    {hero?.gender ?? "—"}
                  </span>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/c/${hero?.id}`}
                    className="flex w-full items-center justify-center rounded-2xl border border-zinc-700 px-4 py-3 text-sm font-semibold transition hover:bg-zinc-800/60 hover:border-yellow-400/30"
                  >
                    Ver ficha completa →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PHRASE TICKER ═══ */}
      <section className="noise relative overflow-hidden rounded-3xl border border-zinc-800/40 bg-zinc-900/20 py-5">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-linear-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-linear-to-l from-zinc-950 to-transparent" />

        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {allPhrases.concat(allPhrases).map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm">
              <span className="text-yellow-400">✦</span>
              <span className="text-zinc-300">&ldquo;{item.phrase}&rdquo;</span>
              <span className="text-zinc-600">— {item.name}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="grid gap-4 sm:grid-cols-3">
        <FeatureCard
          icon="🔍"
          title="Búsqueda instantánea"
          desc="Encuentra cualquier personaje al instante filtrando por nombre, estado o favoritos."
          gradient="from-yellow-400/10 to-transparent"
        />
        <FeatureCard
          icon="⭐"
          title="Tus favoritos"
          desc="Guarda tus personajes favoritos y accede a ellos cuando quieras."
          gradient="from-blue-400/10 to-transparent"
        />
        <FeatureCard
          icon="📖"
          title="Fichas completas"
          desc="Datos, frases célebres, ocupación, edad y más de cada personaje."
          gradient="from-pink-400/10 to-transparent"
        />
      </section>

      {/* ═══ CHARACTER SHOWCASE ═══ */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Personajes
              <span className="ml-2 text-yellow-400">destacados</span>
            </h2>
            <p className="mt-1 text-zinc-500">La familia Simpson y más</p>
          </div>
          <Link
            href="/characters"
            className="group flex items-center gap-2 rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-semibold transition hover:border-yellow-400/30 hover:bg-zinc-900/60"
          >
            Ver todos
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((c, i) => {
            const img = portraitUrl(c.portrait_path);
            return (
              <Link
                key={c.id}
                href={`/c/${c.id}`}
                className="glow-border group noise relative overflow-hidden rounded-3xl border border-zinc-800/60 bg-linear-to-b from-zinc-900/80 to-zinc-950 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-700"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative p-5">
                  <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50">
                    {img ? (
                      <img
                        src={img.cdn}
                        alt={c.name}
                        className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl text-zinc-700">
                        ?
                      </div>
                    )}
                  </div>

                  <h3 className="text-center font-semibold">{c.name}</h3>
                  <p className="mt-1 text-center text-xs text-zinc-500 truncate">
                    {c.occupation ?? "—"}
                  </p>

                  <div className="mt-3 flex justify-center">
                    <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-0.5 text-[11px] text-zinc-400">
                      {c.status ?? "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Bottom shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-px animate-shimmer" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="noise relative overflow-hidden rounded-4xl border border-zinc-800/60">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-yellow-400/15 blur-[80px] animate-float" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-400/10 blur-[80px] animate-float-reverse" />

        <div className="relative px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para explorar
            <span className="text-yellow-400"> Springfield</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            Descubre datos, frases y detalles de cada personaje del universo de
            Los Simpsons.
          </p>
          <div className="mt-8">
            <Link
              href="/characters"
              className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-zinc-950 transition-all duration-300 hover:shadow-[0_0_50px_rgba(250,204,21,0.35)] hover:scale-[1.03]"
            >
              Explorar ahora
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Sub-components ── */

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xl font-bold text-yellow-400">{value}</span>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  gradient,
}: {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
}) {
  return (
    <div
      className={`glow-border noise relative overflow-hidden rounded-3xl border border-zinc-800/60 bg-linear-to-b ${gradient} p-6 transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="relative">
        <span className="text-3xl">{icon}</span>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
      </div>
    </div>
  );
}
