import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/build-combo")({
  head: () => ({ meta: [
    { title: "Build Your Own Combo — Krishna Pearls" },
    { name: "description", content: "Pick any two pearls and save 15%. Build a combo as unique as you." },
  ]}),
  component: BuildComboPage,
});

function BuildComboPage() {
  const [picked, setPicked] = useState<string[]>([]);
  const { add } = useCart();
  const toggle = (id: string) => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 2 ? [...p, id] : p);
  const items = picked.map(id => products.find(p => p.id === id)!).filter(Boolean);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const discount = Math.round(subtotal * 0.15);
  const total = subtotal - discount;

  const addCombo = () => {
    items.forEach(p => add(p));
    toast.success(`Combo added — you saved ${formatINR(discount)}!`);
    setPicked([]);
  };

  return (
    <div className="min-h-screen pb-32 md:pb-0 bg-background">
      <AnnouncementBar />
      <Navbar />

      <section className="bg-ivory border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rosegold mb-3">Mix & Match</p>
          <h1 className="font-serif text-5xl">Build Your Own Combo</h1>
          <p className="mt-3 text-muted-foreground">Pick any 2 pearls, save 15% instantly.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => {
            const on = picked.includes(p.id);
            return (
              <motion.button key={p.id} whileTap={{ scale: 0.98 }}
                onClick={() => toggle(p.id)}
                className={`relative bg-card rounded-lg overflow-hidden text-left shadow-soft transition ${on ? "ring-2 ring-rosegold" : "hover:shadow-pearl"}`}>
                <div className="relative aspect-square">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover img-dark" />
                  {on && <div className="absolute inset-0 bg-rosegold/30 flex items-center justify-center"><Check className="w-10 h-10 text-primary-foreground" /></div>}
                </div>
                <div className="p-3">
                  <p className="font-serif text-sm">{p.name}</p>
                  <p className="text-rosegold text-sm font-medium">{formatINR(p.price)}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {picked.length > 0 && (
        <div className="fixed bottom-16 md:bottom-0 inset-x-0 bg-charcoal text-primary-foreground z-30 border-t border-rosegold/30">
          <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-rosegold-soft">{picked.length}/2 selected</p>
              {items.length === 2 ? (
                <p className="text-sm"><span className="line-through opacity-60 mr-2">{formatINR(subtotal)}</span><span className="font-medium">{formatINR(total)}</span> <span className="text-rosegold-soft text-xs">(saved {formatINR(discount)})</span></p>
              ) : <p className="text-sm opacity-80">Pick one more to unlock 15% off</p>}
            </div>
            <button disabled={items.length !== 2} onClick={addCombo}
              className="bg-rosegold disabled:opacity-40 px-6 py-3 rounded text-xs uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Add Combo
            </button>
          </div>
        </div>
      )}

      <div className="text-center pb-8">
        <Link to="/collections" className="text-xs uppercase tracking-widest text-rosegold hover:underline">Browse Full Catalog →</Link>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
