import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ProductCard } from "@/components/ProductCard";
import { products, colorSwatches } from "@/data/products";

type CatDef = { title: string; tagline: string; categories?: string[]; filter?: (p: typeof products[number]) => boolean };

const catalog: Record<string, CatDef> = {
  "all-products":   { title: "All Products",   tagline: "Every pearl, in one place." },
  "earrings":       { title: "Earrings",       tagline: "Studs, drops & chandeliers.", categories: ["Stud Earrings", "Drop Earrings"] },
  "stud-earrings":  { title: "Stud Earrings",  tagline: "Effortless everyday elegance.", categories: ["Stud Earrings"] },
  "drop-earrings":  { title: "Drop Earrings",  tagline: "Movement, light & lustre.",     categories: ["Drop Earrings"] },
  "necklaces":      { title: "Necklaces",      tagline: "Strands worth heirlooming.",    categories: ["Necklaces"] },
  "bracelets":      { title: "Bracelets",      tagline: "Wrist-worn whispers of pearl.", categories: ["Bracelets"] },
  "bracelet":       { title: "Bracelets",      tagline: "Wrist-worn whispers of pearl.", categories: ["Bracelets"] },
  "rings":          { title: "Rings",          tagline: "Solitaires & quiet statements.",categories: ["Rings"] },
  "bangles":        { title: "Bangles",        tagline: "Coming soon — a new edit." },
  "cufflinks":      { title: "Cufflinks",      tagline: "Refined detail for him." },
  "pearl-set":      { title: "Pearl Sets",     tagline: "Curated coordinating pieces.",  categories: ["Gift Sets"] },
  "gift-sets":      { title: "Gift Sets",      tagline: "Beautifully boxed, ready to give.", categories: ["Gift Sets"] },
  "chains":         { title: "Pearl Chains",   tagline: "Layer-friendly pearl chains." },
  "combo":          { title: "Build Your Own Combo", tagline: "Mix two favourites & save.", filter: (p) => p.bestseller === true },
};

export const Route = createFileRoute("/shop/$slug")({
  beforeLoad: ({ params }) => { if (!catalog[params.slug]) throw notFound(); },
  head: ({ params }) => {
    const c = catalog[params.slug];
    const title = c ? `${c.title} — Krishna Pearls` : "Shop — Krishna Pearls";
    return { meta: [{ title }, { name: "description", content: c?.tagline ?? "Shop Krishna Pearls." }] };
  },
  component: ShopCategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center"><h1 className="font-serif text-3xl">Category not found</h1>
        <Link to="/collections" className="text-rosegold mt-3 inline-block">Back to collections</Link></div>
    </div>
  ),
});

function ShopCategoryPage() {
  const { slug } = Route.useParams();
  const def = catalog[slug];
  const [color, setColor] = useState<string | null>(null);

  const list = useMemo(() => {
    let arr = def.categories ? products.filter(p => def.categories!.includes(p.category)) : (def.filter ? products.filter(def.filter) : products);
    if (color) arr = arr.filter(p => p.color === color);
    return arr;
  }, [def, color]);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <AnnouncementBar />
      <Navbar />

      <section className="bg-ivory border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16 text-center">
          <nav className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-1.5">
            <Link to="/" className="hover:text-rosegold">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/collections" className="hover:text-rosegold">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-rosegold">{def.title}</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-6xl mt-4">{def.title}</motion.h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{def.tagline}</p>
          <div className="w-16 h-px bg-rosegold mx-auto mt-6" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <div className="flex items-center gap-3 flex-wrap mb-8">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Color:</span>
          <button onClick={() => setColor(null)} className={`text-xs uppercase tracking-widest pb-1 border-b ${!color ? "border-rosegold text-rosegold" : "border-transparent"}`}>All</button>
          {colorSwatches.map(c => (
            <button key={c.name} onClick={() => setColor(c.name)} title={c.name}>
              <span className={`block w-6 h-6 rounded-full shadow-soft ${color === c.name ? "ring-2 ring-rosegold ring-offset-2" : ""}`}
                style={{ background: `radial-gradient(circle at 30% 30%, white, ${c.hex} 70%)` }} />
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">Coming Soon</p>
            <p className="text-muted-foreground mt-2">This edit is being curated. Check back shortly.</p>
            <Link to="/collections" className="inline-block mt-6 border border-charcoal px-6 py-3 rounded text-xs uppercase tracking-widest hover:bg-charcoal hover:text-primary-foreground transition">Browse All</Link>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-6">{list.length} products</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </>
        )}
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
