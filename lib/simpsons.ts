// lib/simpsons.ts
export type Character = {
  id: number;
  name: string;
  age: number | null;
  birthdate: string | null;
  gender: string | null;
  occupation: string | null;
  status: string | null;
  portrait_path: string | null;
  phrases?: string[];
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[];
};

const API_BASE = "https://thesimpsonsapi.com/api";

export async function getCharacters(page: number): Promise<Paginated<Character>> {
  // La API devuelve next/prev/pagination en el JSON. :contentReference[oaicite:2]{index=2}
  const url = page <= 1 ? `${API_BASE}/characters` : `${API_BASE}/characters?page=${page}`;
  const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1h (ISR-ish)
  if (!res.ok) throw new Error(`Failed to fetch characters (${res.status})`);
  return res.json();
}

export async function getCharacterById(id: number): Promise<Character> {
  const res = await fetch(`${API_BASE}/characters/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch character (${res.status})`);
  return res.json();
}

export function portraitUrl(portrait_path: string | null | undefined) {
  if (!portrait_path) return null;

  // La API da "/character/1.webp" y la doc dice que las imágenes se sirven vía CDN.
  // CDN habitual con tamaño:
  const cdn = `https://cdn.thesimpsonsapi.com/500${portrait_path}`;
  // Fallback al host principal:
  const origin = `https://thesimpsonsapi.com${portrait_path}`;

  // Devolvemos primero CDN, y si falla, en el <img> hacemos onError para probar origin.
  return { cdn, origin };
}
