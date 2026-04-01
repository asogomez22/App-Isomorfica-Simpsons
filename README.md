<div align="center">

# 🍩 Personajes Simpsons

**Explora el universo de Springfield**

Una aplicación web isomórfica que combina renderizado en servidor con interactividad en cliente para explorar más de 1.100 personajes de Los Simpsons.

[![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![The Simpsons API](https://img.shields.io/badge/API-The_Simpsons_API-FEDD00)](https://thesimpsonsapi.com/)

</div>

---

## ✨ Características

| Característica              | Descripción                                                     |
| --------------------------- | --------------------------------------------------------------- |
| 🔍 **Búsqueda instantánea** | Filtra por nombre, estado o favoritos sin recargar la página    |
| ⭐ **Favoritos**            | Guarda tus personajes favoritos en `localStorage`               |
| 📄 **Fichas completas**     | Datos, frases célebres, ocupación, edad y más de cada personaje |
| 📖 **Paginación real**      | Navega por más de 1.100 personajes con paginación server-side   |
| 🎨 **Diseño premium**       | UI moderna con glassmorphism, micro-animaciones y dark mode     |
| 🖼️ **Imágenes CDN**         | Carga optimizada con fallback automático                        |

---

## 🏗️ Arquitectura

```
app/
├── layout.tsx              # Layout global (header + footer)
├── page.tsx                # Home — hero, ticker de frases, showcase
├── characters/
│   ├── page.tsx            # Lista SSR con paginación
│   └── ui/
│       └── CharactersClient.tsx  # Filtros y favoritos (cliente)
└── c/[id]/
    └── page.tsx            # Ficha detalle del personaje

components/
├── CharacterCard.tsx       # Tarjeta de personaje reutilizable
├── FallbackImage.tsx       # Imagen con fallback CDN → origin
└── Pagination.tsx          # Paginación con números de página

lib/
└── simpsons.ts             # API client + tipos + helpers
```

---

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/asogomez22/App-Isomorfica-Simpsons.git
cd App-Isomorfica-Simpsons

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build && npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔗 API

Los datos provienen de [**The Simpsons API**](https://thesimpsonsapi.com/):

| Endpoint                     | Descripción                    |
| ---------------------------- | ------------------------------ |
| `GET /api/characters?page=N` | Lista paginada (20 por página) |
| `GET /api/characters/:id`    | Detalle de un personaje        |

Las imágenes se sirven desde CDN (`cdn.thesimpsonsapi.com/500`) con fallback automático al origin.

---

## 🛠️ Stack tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Data fetching**: Server Components (SSR) + Client Hydration
- **Estado local**: `useState` + `localStorage` para favoritos

---

## 👤 Autor

**Alejandro Sopeña Gómez**

[![GitHub](https://img.shields.io/badge/GitHub-asogomez22-181717?logo=github)](https://github.com/asogomez22)

---

