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
      name: "precio",
      title: "Precio (CLP)",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: "volumenMl",
      title: "Volumen (ml)",
      type: "number",
      description: "Ej: 100 (para un frasco de 100ml)",
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: "variantes",
      title: "Otras presentaciones (opcional)",
      description:
        "Si este perfume viene en más de un tamaño con precios distintos (ej: 50ml y 100ml), agrega cada uno aquí. El comprador podrá elegir el tamaño y el precio cambia solo. Si el perfume solo tiene una presentación, deja esto vacío.",
      type: "array",
      of: [
        {
          type: "object",
          name: "variante",
          fields: [
            defineField({
              name: "volumenMl",
              title: "Volumen (ml)",
              type: "number",
              validation: (Rule) => Rule.required().positive().integer(),
            }),
            defineField({
              name: "precio",
              title: "Precio (CLP)",
              type: "number",
              validation: (Rule) => Rule.required().positive().integer(),
            }),
          ],
          preview: {
            select: { ml: "volumenMl", precio: "precio" },
            prepare({ ml, precio }) {
              return { title: `${ml} ml`, subtitle: `$${precio}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "acordes",
      title: "Acordes principales",
      description:
        "Las notas/acordes más representativos, ordenados de más a menos intensos (ej: Amaderado, Avainillado, Aromático...).",
      type: "array",
      of: [
        {
          type: "object",
          name: "acorde",
          fields: [
            defineField({
              name: "nombre",
              title: "Nombre del acorde",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "intensidad",
              title: "Intensidad (0-100)",
              type: "number",
              validation: (Rule) => Rule.required().min(0).max(100),
            }),
          ],
          preview: {
            select: { title: "nombre", subtitle: "intensidad" },
          },
        },
      ],
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
