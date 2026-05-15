import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import banner from "@/assets/banner-dark.jpg";

export const Route = createFileRoute("/pearl-with-gold")({
  head: () => ({ meta: [
    { title: "Pearl with Gold — Krishna Pearls" },
    { name: "description", content: "22kt gold-set pearls — heritage with a modern shimmer." },
  ]}),
  component: PearlGoldPage,
});

const sub = [
  { label: "Necklaces", slug: "necklaces" as const },
  { label: "Earrings",  slug: "earrings"  as const },
  { label: "Bracelets", slug: "bracelets" as const },
  { label: "Rings",     slug: "rings"     as const },
  { label: "Gift Sets", slug: "gift-sets" as const },
];

function PearlGoldPage() {
  const featured = products.filter(p => p.color === "Golden" || p.bestseller).slice(0, 8);
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background">
      <AnnouncementBar />
      <Navbar />

      <section className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <img src={banner} alt="Pearl with gold" className="absolute inset-0 w-full h-full object-cover img-dark-strong" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-8 flex items-center text-primary-foreground">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-rosegold-soft mb-3">22kt Gold Edit</p>
            <h1 className="font-serif text-5xl md:text-7xl">Pearl <em className="italic text-rosegold-soft">with Gold</em></h1>
            <p className="mt-4 text-primary-foreground/80 text-lg">Heritage settings, hallmarked gold, hand-strung pearls.</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 flex flex-wrap gap-3 justify-center">
        {sub.map(s => (
          <Link key={s.slug} to="/shop/$slug" params={{ slug: s.slug }} className="px-5 py-2 rounded-full border border-charcoal/20 text-sm hover:border-rosegold hover:text-rosegold transition">{s.label}</Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
