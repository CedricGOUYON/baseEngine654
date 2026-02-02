import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Tableau de Bord Commerçant",

  projectId: "0ck0brgw",
  dataset: "production",

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: "http://localhost:5173",
      resolve: {
        mainDocuments: [],
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
