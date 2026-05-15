import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Krishna Pearls" },
      { name: "description", content: "Your saved pearl jewellery picks at Krishna Pearls." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, remove } = useWishlist();
  const { add } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 pb-24 md:pb-16">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 text-rosegold" />
          <h1 className="font-serif text-3xl md:text-4xl">My Wishlist</h1>
        </div>
        <p className="text-muted-foreground mt-2">{items.length} saved item{items.length !== 1 && "s"}</p>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <Heart className="h-12 w-12 mx-auto text-rosegold/50" />
            <p className="mt-4 text-muted-foreground">Your wishlist is empty.</p>
            <Link to="/collections" className="mt-6 inline-block rounded gradient-rosegold text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm">Browse Collections</Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((p) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="group rounded-xl border bg-card overflow-hidden">
                <div className="relative">
                  <Link to="/product/$id" params={{ id: p.id }}>
                    <img src={p.image} alt={p.name} className="w-full aspect-square object-cover img-dark group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <button onClick={() => remove(p.id)} className="absolute top-2 right-2 rounded-full bg-background/90 p-1.5 hover:bg-rosegold hover:text-primary-foreground transition" aria-label="Remove">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="font-serif text-lg leading-tight">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-medium text-rosegold">{formatINR(p.price)}</span>
                    <button onClick={() => { add(p); toast.success("Added to bag"); }} className="rounded-full bg-charcoal text-primary-foreground p-2 hover:opacity-90" aria-label="Add to bag">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
