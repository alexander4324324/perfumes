import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

// Si aún no hay credenciales de Sanity configuradas en .env, el sitio sigue
// funcionando con los datos de muestra (ver src/data/perfumes.ts).
export const sanityIsConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = sanityIsConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) return "";
  return builder.image(source).auto("format").url();
}

// Trae todos los perfumes desde Sanity, ordenados por nombre.
// Ejecuta esta query una vez tengas el Studio con productos cargados.
export const PERFUMES_QUERY = `*[_type == "perfume"] | order(nombre asc){
  _id,
  "slug": slug.current,
  nombre,
  marca,
  descripcion,
  categorias,
  disponible,
  precio,
  volumenMl,
  variantes,
  acordes,
  "imagen": imagen.asset->url
}`;
