// Copia este archivo dentro de schemaTypes/ en tu proyecto de Sanity Studio
// y regístralo en schemaTypes/index.ts.
import { defineField, defineType } from "sanity";

export default defineType({
  name: "perfume",
  title: "Perfume",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "nombre" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "marca",
      title: "Marca",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción corta",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "categorias",
      title: "Categoría / familia olfativa",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Hombre", value: "Hombre" },
          { title: "Mujer", value: "Mujer" },
          { title: "Unisex", value: "Unisex" },
          { title: "Noche", value: "Noche" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "disponible",
      title: "Disponible",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "imagen",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "marca", media: "imagen" },
  },
});
