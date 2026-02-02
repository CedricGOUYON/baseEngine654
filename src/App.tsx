import { VisualEditing } from "@sanity/visual-editing/react";
import { Loader2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { client, urlFor } from "./lib/sanity";

interface Product {
  _id: string;
  title: string;
  price: number;
  // biome-ignore lint/suspicious/noExplicitAny: Sanity image schema is dynamic
  image: any;
}

interface Settings {
  siteTitle: string;
  heroSubtitle: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `{
      "products": *[_type == "product"],
      "settings": *[_type == "settings"][0]
    }`;

    client
      .fetch(query)
      .then((data) => {
        setProducts(data.products || []);
        setSettings(data.settings || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="animate-spin text-teal-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <VisualEditing portal={true} />

      <header className="flex justify-between items-center p-6 border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          {settings?.siteTitle || "Base Engine"}
        </h1>
        <button
          type="button"
          className="snipcart-checkout flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
        >
          <ShoppingBag size={20} />
          <span className="snipcart-items-count font-bold">0</span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold mb-2">
            {settings?.siteTitle || "Bienvenue"}
          </h2>
          <p className="text-slate-500 text-lg">
            {settings?.heroSubtitle || "Découvrez nos produits."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                className="snipcart-add-item w-full py-3 bg-teal-600 text-white font-bold uppercase tracking-widest rounded-lg"
                data-item-id={p._id}
                data-item-name={p.title}
                data-item-price={p.price}
                data-item-url="/"
              >
                Ajouter au panier
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
