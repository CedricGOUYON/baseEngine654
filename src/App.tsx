import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Loader2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

// Configuration Sanity
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-02-01",
});

const builder = imageUrlBuilder(client);
// biome-ignore lint/suspicious/noExplicitAny: Nécessaire pour les schémas d'image Sanity
export const urlFor = (source: any) => builder.image(source);

interface Product {
  _id: string;
  title: string;
  price: number;
  // biome-ignore lint/suspicious/noExplicitAny: Format d'image source Sanity
  image: any;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "product"]')
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          Base Engine
        </h1>
        <button
          type="button"
          className="snipcart-checkout flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
        >
          <ShoppingBag size={20} />
          <span className="snipcart-items-count font-bold">0</span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((p) => (
          <article key={p._id} className="group">
            <div className="overflow-hidden rounded-2xl mb-4 bg-slate-100 aspect-square">
              {p.image && (
                <img
                  src={urlFor(p.image).url()}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
            </div>
            <h2 className="text-xl font-bold uppercase">{p.title}</h2>
            <p className="text-lg font-mono mb-4">{p.price} €</p>
            <button
              type="button"
              className="snipcart-add-item w-full py-3 bg-teal-600 text-white font-bold uppercase tracking-widest hover:bg-teal-700 transition-colors"
              data-item-id={p._id}
              data-item-name={p.title}
              data-item-price={p.price}
              data-item-url="/"
            >
              Ajouter au panier
            </button>
          </article>
        ))}
      </main>
    </div>
  );
}
