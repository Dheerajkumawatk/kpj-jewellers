import { Link } from "@tanstack/react-router";


import {
  ShoppingBag,
  User,
  Menu,
  Search,
  X,
  ChevronDown,
  Heart,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/logo.png";


type MenuItem = { label: string; to: string; params?: { slug: string } };
type MenuGroup = { label: string; items: MenuItem[] };

const desktopMenu: MenuGroup[] = [
  {
    label: "SHOP",
    items: [
      { label: "All Products",         to: "/collections" },
      { label: "Earrings",             to: "/shop/$slug", params: { slug: "earrings" } },
      { label: "Bracelet",             to: "/shop/$slug", params: { slug: "bracelet" } },
      { label: "Build Your Own Combo", to: "/build-combo" },
      { label: "Necklaces",            to: "/shop/$slug", params: { slug: "necklaces" } },
      { label: "Rings",                to: "/shop/$slug", params: { slug: "rings" } },
      { label: "Bangles",              to: "/shop/$slug", params: { slug: "bangles" } },
      { label: "Cufflinks",            to: "/shop/$slug", params: { slug: "cufflinks" } },
      { label: "Pearl Set",            to: "/shop/$slug", params: { slug: "pearl-set" } },
      { label: "Chains",               to: "/shop/$slug", params: { slug: "chains" } },
    ],
  },
  {
    label: "PEARL WITH GOLD",
    items: [
      { label: "Overview",  to: "/pearl-with-gold" },
      { label: "Necklaces", to: "/shop/$slug", params: { slug: "necklaces" } },
      { label: "Earrings",  to: "/shop/$slug", params: { slug: "earrings" } },
      { label: "Bracelets", to: "/shop/$slug", params: { slug: "bracelets" } },
      { label: "Rings",     to: "/shop/$slug", params: { slug: "rings" } },
      { label: "Gift Sets", to: "/shop/$slug", params: { slug: "gift-sets" } },
    ],
  },
  {
    label: "Build Your Own Combo Save",
    items: [
      { label: "Build a Combo",  to: "/build-combo" },
      { label: "Bestsellers",    to: "/collections" },
      { label: "Gift Sets",      to: "/shop/$slug", params: { slug: "gift-sets" } },
      { label: "Wedding Layers", to: "/shop/$slug", params: { slug: "necklaces" } },
    ],
  },
  {
    label: "THE HOUSE",
    items: [
      { label: "Our Story",        to: "/our-story" },
      { label: "Pearl Guide",      to: "/pearl-guide" },
      { label: "Store Locator",    to: "/store-locator" },
      { label: "Craftsmanship",    to: "/craftsmanship" },
      { label: "Book Appointment", to: "/book-appointment" },
    ],
  },
];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-border/60 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md shadow-soft" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex h-16 items-center justify-between gap-3 md:h-[76px]">
            <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="shrink-0">
  <img
    src={logo}
    alt="Krishna Pearls"
    className="h-16 w-auto md:h-14 object-contain"
  />
</Link>

            <div className="hidden min-w-0 flex-1 items-center md:flex">
              <div className="mx-8 flex h-12 flex-1 items-center rounded-full border border-border bg-background px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search pearls, sets, earrings..."
                  className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm md:gap-5">
              <Link to="/book-appointment" className="hidden h-10 items-center gap-2 rounded-full bg-charcoal px-4 text-primary-foreground transition hover:opacity-90 md:flex">
                <Video className="h-4 w-4" />
                <span className="font-medium">Book Appointment</span>
              </Link>

              <Link to="/login" aria-label="Sign in" className="hidden text-foreground/80 transition-colors hover:text-rosegold md:block">
                <User className="h-5 w-5" />
              </Link>

              <Link to="/wishlist" aria-label="Wishlist" className="hidden text-foreground/80 transition-colors hover:text-rosegold md:block">
                <Heart className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 text-foreground/80 transition-colors hover:text-rosegold"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="hidden font-medium md:inline">{count}</span>
                {count > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rosegold text-[10px] font-medium text-primary-foreground md:hidden">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          <nav className="relative hidden items-center justify-center gap-12 py-3 md:flex">
            {desktopMenu.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(menu.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 text-[0.95rem] tracking-[0.14em] text-foreground/85 transition-colors hover:text-rosegold">
                  <span>{menu.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {activeMenu === menu.label && (
                  <div className="absolute left-1/2 top-full z-50 mt-3 w-[280px] -translate-x-1/2 border border-border bg-card p-5 shadow-pearl">
                    <div className="grid gap-3">
                      {menu.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          params={item.params as never}
                          onClick={() => setActiveMenu(null)}
                          className="text-base text-foreground/80 transition-colors hover:text-rosegold"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-background md:hidden animate-in fade-in">
          <div className="flex items-center justify-between border-b p-4">
            <span className="font-serif text-2xl tracking-[0.08em] text-rosegold">Krishna Pearls</span>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="border-b px-4 py-4">
            <div className="flex h-11 items-center rounded-full border border-border bg-background px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <nav className="flex flex-col gap-5 p-6">
            <Link to="/collections" onClick={() => setOpen(false)} className="text-lg font-serif">Shop</Link>
            <Link to="/collections" onClick={() => setOpen(false)} className="text-lg font-serif">Pearl With Gold</Link>
            <Link to="/collections" onClick={() => setOpen(false)} className="text-lg font-serif">Build Your Own Combo</Link>
            <Link to="/wishlist" onClick={() => setOpen(false)} className="text-lg font-serif">Wishlist</Link>
            <Link to="/dashboard" onClick={() => setOpen(false)} className="text-lg font-serif">My Dashboard</Link>
            <Link to="/login" onClick={() => setOpen(false)} className="text-lg font-serif">Sign in</Link>
            <Link to="/book-appointment" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-charcoal px-4 py-3 text-primary-foreground">
              <Video className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
          </nav>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
