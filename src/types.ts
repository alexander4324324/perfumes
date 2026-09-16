export type Categoria = "Hombre" | "Mujer" | "Unisex" | "Noche";

export interface Acorde {
  nombre: string;
  intensidad: number;
}

export interface Perfume {
  _id: string;
  slug: string;
  nombre: string;
  marca: string;
  descripcion: string;
  categorias: Categoria[];
  disponible: boolean;
  precio: number;
  volumenMl: number;
  imagen: string;
  acordes?: Acorde[];
}
