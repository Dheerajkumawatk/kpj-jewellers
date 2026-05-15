import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = Product & { quantity: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kp-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("kp-cart", JSON.stringify(items));
  }, [items]);

  const add = (p: Product) =>
    setItems((cur) => {
      const existing = cur.find((i) => i.id === p.id);
      if (existing) return cur.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...cur, { ...p, quantity: 1 }];
    });
  const remove = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));
  const setQty = (id: string, q: number) =>
    setItems((cur) => (q <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, quantity: q } : i))));
  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, total, count }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
