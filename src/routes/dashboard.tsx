import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Package, Heart, Calendar, MapPin, LogOut, User } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Krishna Pearls" },
      { name: "description", content: "Your Krishna Pearls account dashboard — view orders, wishlist and appointments." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, signOut } = useAuth();
  const { count: wishCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
  }, [user, navigate]);

  if (!user) return null;

  const tiles = [
    { icon: Package, label: "My Orders", value: "3 orders", to: "/dashboard" as const },
    { icon: Heart, label: "Wishlist", value: `${wishCount} items`, to: "/wishlist" as const },
    { icon: Calendar, label: "Appointments", value: "Book a video call", to: "/book-appointment" as const },
    { icon: MapPin, label: "Addresses", value: "Manage delivery", to: "/dashboard" as const },
  ];

  const orders = [
    { id: "KP-2841", date: "28 Apr 2026", total: "₹4,299", status: "Delivered" },
    { id: "KP-2792", date: "12 Apr 2026", total: "₹2,499", status: "Shipped" },
    { id: "KP-2718", date: "30 Mar 2026", total: "₹6,498", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 pb-24 md:pb-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full gradient-rosegold flex items-center justify-center text-primary-foreground">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Welcome back</p>
              <h1 className="font-serif text-3xl md:text-4xl">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button onClick={() => { signOut(); navigate({ to: "/" }); }} className="flex items-center gap-2 text-sm text-foreground/70 hover:text-rosegold">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((t) => (
            <Link key={t.label} to={t.to} className="rounded-xl border bg-card p-5 hover:shadow-pearl transition">
              <t.icon className="h-6 w-6 text-rosegold" />
              <p className="mt-3 font-serif text-xl">{t.label}</p>
              <p className="text-sm text-muted-foreground">{t.value}</p>
            </Link>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="font-serif text-2xl mb-4">Recent Orders</h2>
          <div className="rounded-xl border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-4 py-4 font-medium">{o.id}</td>
                    <td className="px-4 py-4 text-muted-foreground">{o.date}</td>
                    <td className="px-4 py-4">{o.total}</td>
                    <td className="px-4 py-4"><span className="rounded-full bg-rosegold-soft text-charcoal px-3 py-1 text-xs">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
