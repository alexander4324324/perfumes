export type Categoria = "Hombre" | "Mujer" | "Unisex" | "Noche";

export interface Perfume {
  _id: string;
  slug: string;
  nombre: string;
  marca: string;
  descripcion: string;
  categorias: Categoria[];
  disponible: boolean;
  imagen: string;
}
