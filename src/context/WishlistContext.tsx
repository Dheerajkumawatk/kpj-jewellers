import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

type WishlistCtx = {
  items: Product[];
  toggle: (p: Product) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
};

const Ctx = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kp-wishlist");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("kp-wishlist", JSON.stringify(items));
  }, [items]);

  const toggle = (p: Product) =>
    setItems((cur) => (cur.find((i) => i.id === p.id) ? cur.filter((i) => i.id !== p.id) : [...cur, p]));
  const remove = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));
  const has = (id: string) => !!items.find((i) => i.id === id);

  return <Ctx.Provider value={{ items, toggle, remove, has, count: items.length }}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
}
