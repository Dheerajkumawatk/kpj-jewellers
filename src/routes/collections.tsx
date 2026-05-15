import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, colorSwatches } from "@/data/products";

export const Route = createFileRoute("/collections")({ component: CollectionsPage });

function CollectionsPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<"featured" | "low" | "high" | "discount">("featured");

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category ? p.category === category : true) &&
        (color ? p.color === color : true)
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "discount")
      list = [...list].sort(
        (a, b) =>
          (b.originalPrice - b.price) / b.originalPrice -
          (a.originalPrice - a.price) / a.originalPrice
      );
    return list;
  }, [category, color, sort]);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <AnnouncementBar />
      <Navbar />

      {/* Page header */}
      <section className="bg-ivory border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16 text-center">
          <nav className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-1.5">
            <Link to="/" className="hover:text-rosegold">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Collections</span>
            {category && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-rosegold">{category}</span>
              </>
            )}
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl mt-4"
          >
            {category ?? "Our Collections"}
          </motion.h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Curated pearls — handpicked, certified and crafted with love.
          </p>
          <div className="w-16 h-px bg-rosegold mx-auto mt-6" />
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          <div className="flex gap-5 overflow-x-auto snap-x">
            <button
              onClick={() => setCategory(null)}
              className={`flex-shrink-0 text-center group ${!category ? "text-rosegold" : ""}`}
            >
              <div className={`w-20 h-20 rounded-full border ${!category ? "border-rosegold" : "border-border"} flex items-center justify-center font-serif text-sm`}>
                All
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest">All</p>
            </button>
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setCategory(c.name)}
                className="flex-shrink-0 text-center group snap-start"
              >
                <div className={`w-20 h-20 rounded-full overflow-hidden shadow-soft transition ${category === c.name ? "ring-2 ring-rosegold ring-offset-2" : ""}`}>
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover img-dark group-hover:scale-110 transition duration-700" />
                </div>
                <p className="mt-2 text-[11px] uppercase tracking-widest whitespace-nowrap">{c.name}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Sort bar */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-rosegold" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground mr-2">Color:</span>
            <button
              onClick={() => setColor(null)}
              className={`text-xs uppercase tracking-widest pb-1 border-b ${!color ? "border-rosegold text-rosegold" : "border-transparent"}`}
            >
              All
            </button>
            {colorSwatches.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className="flex items-center gap-1.5"
                title={c.name}
              >
                <span
                  className={`w-6 h-6 rounded-full shadow-soft ${color === c.name ? "ring-2 ring-rosegold ring-offset-2" : ""}`}
                  style={{ background: `radial-gradient(circle at 30% 30%, white, ${c.hex} 70%)` }}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border-b border-charcoal/20 bg-transparent py-1 text-sm focus:outline-none focus:border-rosegold"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-6">{filtered.length} products</p>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            No pearls match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
