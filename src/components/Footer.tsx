import { Instagram, Facebook, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-serif text-2xl mb-4"><span className="text-rosegold">Krishna</span> Pearls</h3>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Timeless pearl jewellery, ethically sourced and certified. Crafted for the modern Indian woman since 1987.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest mb-4 text-rosegold">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>Earrings</li><li>Necklaces</li><li>Gift Sets</li><li>Bracelets</li><li>Rings</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest mb-4 text-rosegold">Help</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>About Us</li><li>Shipping Policy</li><li>Returns</li><li>Pearl Care</li><li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest mb-4 text-rosegold">Stay in Touch</h4>
          <div className="flex gap-2">
            <input type="email" placeholder="Your email"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-2 text-sm rounded placeholder:text-primary-foreground/40" />
            <button className="bg-rosegold px-3 rounded" aria-label="Subscribe"><Mail className="w-4 h-4" /></button>
          </div>
          <div className="flex gap-4 mt-6">
            <Instagram className="w-5 h-5 hover:text-rosegold cursor-pointer transition" />
            <Facebook className="w-5 h-5 hover:text-rosegold cursor-pointer transition" />
            <Youtube className="w-5 h-5 hover:text-rosegold cursor-pointer transition" />
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Krishna Pearls. All rights reserved.
      </div>
    </footer>
  );
}
