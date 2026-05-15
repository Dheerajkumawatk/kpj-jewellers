import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Truck,
  Award,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
  Phone,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-4xl">Product not found</h1>
        <Link to="/collections" className="mt-4 inline-block text-rosegold underline">
          Back to collections
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-12 text-center">{error.message}</div>
  ),
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.id === id);
  if (!product) throw notFound();

  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const gallery = [product.image, product.image, product.image, product.image];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const similar = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    toast.success(`${product.name} × ${qty} added to bag`);
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-rosegold">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/collections" className="hover:text-rosegold">Collections</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-2 gap-10 pb-12">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative aspect-square overflow-hidden rounded-lg bg-ivory shadow-soft"
          >
            <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover img-dark" />
            <WishlistHeart product={product} />
            {product.bestseller && (
              <span className="absolute top-4 left-4 bg-charcoal text-primary-foreground text-[10px] tracking-widest px-2 py-1 rounded">
                BESTSELLER
              </span>
            )}
          </motion.div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square rounded overflow-hidden border-2 transition ${activeImg === i ? "border-rosegold" : "border-transparent"}`}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest text-rosegold">{product.category}</p>
          <h1 className="font-serif text-3xl md:text-5xl mt-2 leading-tight">{product.name}</h1>
          <p className="text-xs text-muted-foreground mt-2">SKU: KP-{product.id.padStart(4, "0")}</p>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-rosegold font-serif text-3xl">{formatINR(product.price)}</span>
            <span className="text-base text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
            <span className="text-xs bg-rosegold/10 text-rosegold px-2 py-1 rounded">{discount}% OFF</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>

          {/* Build your own combo */}
          <div className="mt-6 rounded-lg bg-ivory border border-border p-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-serif text-base">Build Your Own Combo</p>
              <p className="text-xs text-muted-foreground">Buy 3 or more & get 20% off on pure pearls</p>
            </div>
            <button className="text-xs uppercase tracking-widest text-rosegold whitespace-nowrap">Shop now →</button>
          </div>

          {/* Color */}
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Colour: <span className="text-foreground">{product.color}</span></p>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Quantity</span>
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:text-rosegold">
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-4 text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:text-rosegold">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={handleAdd}
              className="border border-charcoal text-charcoal py-3.5 rounded text-xs uppercase tracking-widest hover:bg-charcoal hover:text-primary-foreground transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>
            <button
              onClick={handleAdd}
              className="gradient-rosegold text-primary-foreground py-3.5 rounded text-xs uppercase tracking-widest hover:opacity-90 transition"
            >
              Buy It Now
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="border border-border py-3 rounded text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-rosegold">
              <Phone className="w-4 h-4" /> +91 99928 19087
            </button>
            <button className="border border-border py-3 rounded text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-rosegold">
              <Video className="w-4 h-4" /> Book Appointment
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            {[
              { icon: Heart, t: "70+ Years of Trust" },
              { icon: RotateCcw, t: "Lifetime Exchange" },
              { icon: Truck, t: "Free Shipping" },
              { icon: ShieldCheck, t: "7-Day Refund Policy" },
            ].map((b) => (
              <div key={b.t} className="flex items-center gap-2 text-muted-foreground">
                <b.icon className="w-4 h-4 text-rosegold" /> {b.t}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-border pt-6">
            <h2 className="font-serif text-xl mb-3">Product Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These elegant {product.name.toLowerCase()} feature naturally lustrous freshwater pearls
              framed within a softly sculpted silver-petal design. Hand-finished and lightweight,
              they're a comfortable choice for everyday grace and special occasions alike.
            </p>

            <div className="mt-6 border border-border rounded">
              <div className="grid grid-cols-2 text-sm">
                <div className="p-3 bg-ivory border-b border-border font-medium">Product Code</div>
                <div className="p-3 border-b border-border text-muted-foreground">KP-{product.id.padStart(4, "0")}</div>
                <div className="p-3 bg-ivory border-b border-border font-medium">Brand</div>
                <div className="p-3 border-b border-border text-muted-foreground">Krishna Pearls</div>
                <div className="p-3 bg-ivory font-medium">Colour</div>
                <div className="p-3 text-muted-foreground">{product.color}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-12 border-t border-border">
          <h2 className="font-serif text-3xl text-center mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}

      {/* Similar */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-12 border-t border-border bg-ivory">
        <h2 className="font-serif text-3xl text-center mb-8">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {similar.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function WishlistHeart({ product }: { product: typeof products[number] }) {
  const { has, toggle } = useWishlist();
  const active = has(product.id);
  return (
    <button
      onClick={() => { toggle(product); toast.success(active ? "Removed from wishlist" : "Added to wishlist"); }}
      className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center transition ${active ? "text-rosegold" : "hover:text-rosegold"}`}
      aria-label="Toggle wishlist"
    >
      <Heart className={`w-4 h-4 ${active ? "fill-current" : ""}`} />
    </button>
  );
}
