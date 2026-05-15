import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-serif text-2xl">Your Bag</h3>
              <button onClick={onClose} aria-label="Close cart"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-rosegold/60" />
                  <p>Your bag is empty</p>
                </div>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex gap-4 pb-4 border-b">
                    <img src={i.image} alt={i.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-serif text-lg leading-tight">{i.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{i.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <button className="px-2 py-1" onClick={() => setQty(i.id, i.quantity - 1)}><Minus className="w-3 h-3" /></button>
                          <span className="px-3 text-sm">{i.quantity}</span>
                          <button className="px-2 py-1" onClick={() => setQty(i.id, i.quantity + 1)}><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="font-medium">{formatINR(i.price * i.quantity)}</span>
                      </div>
                      <button onClick={() => remove(i.id)} className="text-xs text-muted-foreground hover:text-rosegold mt-1">Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-5 space-y-3">
                <div className="flex justify-between font-serif text-xl">
                  <span>Total</span>
                  <span className="text-rosegold">{formatINR(total)}</span>
                </div>
                <button className="w-full gradient-rosegold text-primary-foreground py-3 rounded uppercase tracking-widest text-sm hover:opacity-90 transition">
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
