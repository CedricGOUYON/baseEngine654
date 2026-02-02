import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Configuration",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Titre de la boutique",
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      title: "Texte de bienvenue",
    }),
  ],
});
