# Aromé — Catálogo de perfumes

Sitio construido con **Astro + Tailwind CSS**, listo para conectarse a **Sanity.io** como CMS.

## Estado actual

El sitio funciona ahora mismo con **10 perfumes de muestra** (`src/data/perfumes.ts`),
así puedes ver el diseño y la funcionalidad completa sin depender de Sanity todavía.

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:4321

## Conectar Sanity real (cuando tengas el Studio creado)

1. Crea el proyecto de Sanity: `npm create sanity@latest` (en otra carpeta, fuera de este proyecto).
2. Copia el archivo `sanity-schema/perfume.ts` dentro de `schemaTypes/` de tu Studio y regístralo en `schemaTypes/index.ts`.
3. En tu Studio, ve a **Settings > API** y copia el **Project ID**.
4. En este proyecto, copia `.env.example` a `.env` y completa:
   ```
   PUBLIC_SANITY_PROJECT_ID=tu_project_id
   PUBLIC_SANITY_DATASET=production
   PUBLIC_WHATSAPP_NUMBER=56912345678
   ```
5. Reinicia `npm run dev`. El sitio detecta automáticamente que Sanity está configurado
   y deja de usar los datos de muestra (ver `src/lib/sanity.ts`).
6. En Sanity Studio, ve a **CORS origins** (Settings > API) y agrega:
   - `http://localhost:4321` (desarrollo)
   - `https://tu-proyecto.vercel.app` (una vez desplegado)
   - tu dominio final cuando lo tengas

## Cambiar nombre del sitio y WhatsApp

Edita `src/config.ts` (nombre y tagline) y la variable `PUBLIC_WHATSAPP_NUMBER` en `.env`.

## Desplegar en Vercel

1. Sube este proyecto a GitHub (Source Control en VS Code, o `git init && git add . && git commit -m "inicial" && git push`).
2. En vercel.com, "Add New Project" → importa el repo.
3. Framework Preset: **Astro** (se detecta solo).
4. Agrega las mismas variables de entorno del `.env` en Vercel (Settings > Environment Variables).
5. Deploy. Obtendrás una URL tipo `tu-proyecto.vercel.app`.

## Conectar dominio propio

En Vercel: Settings > Domains > agrega el dominio. Vercel te dará los registros
DNS (`A` o `CNAME`) para configurar donde compraron el dominio (NIC Chile, GoDaddy, etc.).

## Estructura del proyecto

```
src/
  components/   → Header, Filters, ProductCard
  data/         → perfumes de muestra
  layouts/      → Layout.astro (fuentes, estilos globales)
  lib/          → cliente de Sanity + query GROQ
  pages/        → index.astro (catálogo), perfume/[slug].astro (ficha)
  config.ts     → nombre del sitio, número de WhatsApp
sanity-schema/
  perfume.ts    → schema para copiar al Sanity Studio
```
