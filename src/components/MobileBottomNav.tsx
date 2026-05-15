import { Link } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function MobileBottomNav() {
  const { count } = useCart();
  const items = [
    { icon: Home, label: "Home", to: "/" as const },
    { icon: Search, label: "Shop", to: "/collections" as const },
    { icon: ShoppingBag, label: "Bag", to: "/cart" as const, badge: count },
    { icon: Heart, label: "Wishlist", to: "/wishlist" as const },
    { icon: User, label: "Account", to: "/dashboard" as const },
  ];
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t md:hidden">
      <div className="grid grid-cols-5 py-2">
        {items.map((it) => (
          <Link key={it.label} to={it.to} className="flex flex-col items-center gap-0.5 text-charcoal/70 hover:text-rosegold transition relative">
            <it.icon className="w-5 h-5" />
            {"badge" in it && it.badge ? (
              <span className="absolute top-0 right-1/2 translate-x-3 bg-rosegold text-primary-foreground text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{it.badge}</span>
            ) : null}
            <span className="text-[10px]">{it.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
