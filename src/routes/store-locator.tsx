import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import store from "@/assets/store-krishna.jpg";

const stores = [
  { city: "Hyderabad", flagship: true,  addr: "Plot 12, Banjara Hills, Road No. 2", phone: "+91 98765 43210", hours: "Mon–Sat · 11am – 9pm" },
  { city: "Mumbai",    flagship: false, addr: "Linking Road, Bandra West",          phone: "+91 98765 11122", hours: "Mon–Sun · 11am – 10pm" },
  { city: "Delhi",     flagship: false, addr: "M-Block Market, Greater Kailash",    phone: "+91 98765 99988", hours: "Mon–Sun · 11am – 9pm" },
  { city: "Bengaluru", flagship: false, addr: "100 Ft Road, Indiranagar",           phone: "+91 98765 33344", hours: "Mon–Sun · 11am – 9pm" },
  { city: "Chennai",   flagship: false, addr: "Khader Nawaz Khan Road, Nungambakkam", phone: "+91 98765 55566", hours: "Mon–Sat · 11am – 9pm" },
  { city: "Kolkata",   flagship: false, addr: "Park Street, Near Park Hotel",       phone: "+91 98765 77788", hours: "Mon–Sat · 11am – 9pm" },
];

export const Route = createFileRoute("/store-locator")({
  head: () => ({ meta: [
    { title: "Store Locator — Krishna Pearls" },
    { name: "description", content: "Visit a Krishna Pearls boutique near you across India." },
  ]}),
  component: StoreLocatorPage,
});

function StoreLocatorPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background">
      <AnnouncementBar />
      <Navbar />

      <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <img src={store} alt="Krishna Pearls flagship" className="absolute inset-0 w-full h-full object-cover img-dark-strong" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-primary-foreground px-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rosegold-soft mb-3">Visit Us</p>
            <h1 className="font-serif text-5xl md:text-6xl">Find a Boutique</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map(s => (
          <article key={s.city} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-pearl transition border">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl">{s.city}</h2>
              {s.flagship && <span className="text-[10px] uppercase tracking-widest bg-rosegold text-primary-foreground px-2 py-1 rounded-full">Flagship</span>}
            </div>
            <div className="mt-4 space-y-3 text-sm text-charcoal/80">
              <p className="flex gap-2"><MapPin className="w-4 h-4 text-rosegold mt-0.5" />{s.addr}</p>
              <p className="flex gap-2"><Phone className="w-4 h-4 text-rosegold mt-0.5" />{s.phone}</p>
              <p className="flex gap-2"><Clock className="w-4 h-4 text-rosegold mt-0.5" />{s.hours}</p>
            </div>
            <button className="mt-5 w-full border border-charcoal text-charcoal py-2.5 rounded text-xs uppercase tracking-widest hover:bg-charcoal hover:text-primary-foreground transition">Get Directions</button>
          </article>
        ))}
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
