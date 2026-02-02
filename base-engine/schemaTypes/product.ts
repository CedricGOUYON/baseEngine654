import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Produit",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Nom du produit",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Prix",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image du produit",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
