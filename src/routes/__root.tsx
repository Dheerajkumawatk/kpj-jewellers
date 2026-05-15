import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Krishna Pearls — Timeless Pearl Jewellery" },
      { name: "description", content: "Shop certified pearl jewellery — earrings, necklaces, gift sets and more. Free shipping across India, 7-day returns." },
      { property: "og:title", content: "Krishna Pearls — Timeless Pearl Jewellery" },
      { property: "og:description", content: "Shop certified pearl jewellery — earrings, necklaces, gift sets and more. Free shipping across India, 7-day returns." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Krishna Pearls — Timeless Pearl Jewellery" },
      { name: "twitter:description", content: "Shop certified pearl jewellery — earrings, necklaces, gift sets and more. Free shipping across India, 7-day returns." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9fa825ea-c422-4012-a396-724f8a8e28d6/id-preview-7172381f--3c288b0c-2803-4002-9b52-26472fb8fb55.lovable.app-1778661159519.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9fa825ea-c422-4012-a396-724f8a8e28d6/id-preview-7172381f--3c288b0c-2803-4002-9b52-26472fb8fb55.lovable.app-1778661159519.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-rosegold">404</h1>
        <p className="mt-2 text-muted-foreground">Page not found</p>
        <a href="/" className="mt-6 inline-block underline">Go home</a>
      </div>
    </div>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Outlet />
          <Toaster position="top-center" />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
