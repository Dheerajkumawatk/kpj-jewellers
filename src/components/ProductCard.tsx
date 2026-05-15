import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Truck, Award, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-pearl transition-shadow"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image} alt={product.name} loading="lazy"
          className="w-full h-full object-cover img-dark group-hover:scale-110 transition-transform duration-700"
        />
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-charcoal text-primary-foreground text-[10px] tracking-widest px-2 py-1 rounded">
            BESTSELLER
          </span>
        )}
        <span className="absolute top-3 right-3 bg-rosegold text-primary-foreground text-xs font-medium px-2 py-1 rounded">
          -{discount}%
        </span>
      </Link>
      <div className="p-4 space-y-2">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
        <Link to="/product/$id" params={{ id: product.id }} className="block">
          <h3 className="font-serif text-lg leading-tight hover:text-rosegold transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-rosegold font-medium text-lg">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
        </div>
        <div className="flex gap-2 text-[10px] text-muted-foreground pt-1">
          <span className="flex items-center gap-1"><Truck className="w-3 h-3" />Free Ship</span>
          <span className="flex items-center gap-1"><Award className="w-3 h-3" />Certified</span>
          <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" />7-Day</span>
        </div>
        <button
          onClick={() => { add(product); toast.success(`${product.name} added to bag`); }}
          className="w-full mt-3 border border-charcoal text-charcoal py-2.5 rounded text-xs uppercase tracking-widest hover:bg-charcoal hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Bag
        </button>
      </div>
    </motion.div>
  );
}
