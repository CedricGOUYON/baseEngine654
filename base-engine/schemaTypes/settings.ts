import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Configuration du Site",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Nom de votre Boutique",
      description: "Ce nom apparaîtra en haut de votre site.",
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      title: "Message d'accueil",
      description:
        "Le texte principal qui souhaite la bienvenue à vos clients.",
    }),
  ],
});
