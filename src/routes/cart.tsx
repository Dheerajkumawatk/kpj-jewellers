import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Krishna Pearls" },
      { name: "description", content: "Review pearl jewellery in your shopping bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();
  const navigate = useNavigate();
  const shipping = total > 1500 ? 0 : 99;
  const grand = total + shipping;

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 pb-24 md:pb-16">
        <h1 className="font-serif text-3xl md:text-4xl">Your Bag</h1>
        <p className="text-muted-foreground mt-1">{items.length} item{items.length !== 1 && "s"}</p>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-rosegold/50" />
            <p className="mt-4 text-muted-foreground">Your bag is empty.</p>
            <Link to="/collections" className="mt-6 inline-block rounded gradient-rosegold text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm">Continue Shopping</Link>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((i) => (
                <motion.div key={i.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 rounded-xl border bg-card p-4">
                  <img src={i.image} alt={i.name} className="w-24 h-24 object-cover rounded img-dark" />
                  <div className="flex-1">
                    <p className="font-serif text-lg">{i.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{i.category} · {i.color}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded">
                        <button className="px-2 py-1" onClick={() => setQty(i.id, i.quantity - 1)}><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-sm">{i.quantity}</span>
                        <button className="px-2 py-1" onClick={() => setQty(i.id, i.quantity + 1)}><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-medium text-rosegold">{formatINR(i.price * i.quantity)}</span>
                    </div>
                    <button onClick={() => remove(i.id)} className="mt-2 text-xs text-muted-foreground hover:text-rosegold flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <aside className="rounded-xl border bg-card p-6 h-fit space-y-4 sticky top-24">
              <h2 className="font-serif text-2xl">Order Summary</h2>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(total)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
              <div className="border-t pt-3 flex justify-between font-serif text-xl"><span>Total</span><span className="text-rosegold">{formatINR(grand)}</span></div>
              <button onClick={() => navigate({ to: "/checkout" })} className="w-full gradient-rosegold text-primary-foreground py-3 rounded uppercase tracking-widest text-sm hover:opacity-90">Proceed to Checkout</button>
              <div className="text-xs text-muted-foreground space-y-2 pt-2">
                <p className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-rosegold" /> Free shipping over ₹1,500</p>
                <p className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-rosegold" /> 100% authentic pearls</p>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
