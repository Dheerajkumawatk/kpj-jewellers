import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, Package, Calendar } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Krishna Pearls" },
      { name: "description", content: "Your pearl jewellery order has been placed successfully." },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const orderId = "KP-" + Math.floor(100000 + Math.random() * 899999);
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-16 md:py-24 text-center pb-24 md:pb-24">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.6 }}>
          <CheckCircle2 className="h-20 w-20 text-rosegold mx-auto" />
        </motion.div>
        <h1 className="font-serif text-4xl md:text-5xl mt-6">Thank You!</h1>
        <p className="mt-3 text-muted-foreground">Your order has been placed successfully. A confirmation email is on its way.</p>

        <div className="mt-8 rounded-xl border bg-card p-6 inline-block">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Order Number</p>
          <p className="font-serif text-2xl text-rosegold mt-1">{orderId}</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
          <div className="rounded-xl border bg-card p-5">
            <Package className="h-5 w-5 text-rosegold" />
            <p className="font-serif text-lg mt-2">Estimated Delivery</p>
            <p className="text-sm text-muted-foreground">5-7 business days</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <Calendar className="h-5 w-5 text-rosegold" />
            <p className="font-serif text-lg mt-2">Track Your Order</p>
            <p className="text-sm text-muted-foreground">Updates via SMS &amp; email</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/dashboard" className="rounded gradient-rosegold text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm">View Orders</Link>
          <Link to="/collections" className="rounded border px-6 py-3 uppercase tracking-widest text-sm hover:border-rosegold">Continue Shopping</Link>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
