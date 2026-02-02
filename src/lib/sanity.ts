import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-02-01",
  stega: {
    enabled: true,
    studioUrl: "http://localhost:3333",
  },
});

const builder = imageUrlBuilder(client);

/**
 * Génère l'URL de l'image à partir de la source Sanity.
 */
// biome-ignore lint/suspicious/noExplicitAny: Sanity image schemas are dynamic
export const urlFor = (source: any) => builder.image(source);
