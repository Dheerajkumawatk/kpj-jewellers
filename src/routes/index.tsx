import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Truck, Award, RotateCcw, ShieldCheck, MapPin, ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ProductCard } from "@/components/ProductCard";
import { HeroSlider } from "@/components/HeroSlider";
import { products, categories, colorSwatches } from "@/data/products";
import bannerDark from "@/assets/banner-dark.jpg";
import colBest from "@/assets/col-bestseller.jpg";
import colEar from "@/assets/col-earrings.jpg";
import colVal from "@/assets/col-valentine.jpg";
import gSize from "@/assets/guide-size.jpg";
import gCare from "@/assets/guide-care.jpg";
import gReal from "@/assets/guide-real.jpg";
import pStud from "@/assets/p-stud.jpg";
import pBracelet from "@/assets/p-bracelet.jpg";
import pNecklace from "@/assets/p-necklace.jpg";
import pDrop from "@/assets/p-drop.jpg";

const ourCollections = [
  { name: "Best Sellers", image: colBest, tone: "from-rose-950/80" },
  { name: "Pearl Earrings", image: colEar, tone: "from-stone-900/70" },
  { name: "Valentine's Offer", image: colVal, tone: "from-rose-950/80", badge: "Limited" },
];

const pearlGuide = [
  { title: "Pearl Size & Length Guide", desc: "Find the perfect fit for every neckline & wrist.", image: gSize },
  { title: "How to Care", desc: "Keep your pearls lustrous for generations.", image: gCare },
  { title: "Real vs Imitation Basics", desc: "Spot a true pearl with confidence.", image: gReal },
];

const bestValue = [
  { tier: "Under ₹999", image: pStud },
  { tier: "Under ₹2,999", image: pBracelet },
  { tier: "Under ₹4,999", image: pNecklace },
  { tier: "Combo Offer", image: pDrop, badge: "20% OFF" },
];

export const Route = createFileRoute("/")({ component: Index });

function Section({ eyebrow, title, subtitle, children, className = "" }: { eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }} className="text-center mb-12"
      >
        {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-rosegold mb-3">{eyebrow}</p>}
        <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
        <div className="w-16 h-px bg-rosegold mx-auto mt-6" />
      </motion.div>
      {children}
    </section>
  );
}

function Index() {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const filtered = useMemo(
    () => products.filter((p) => (activeColor ? p.color === activeColor : true)).slice(0, 8),
    [activeColor]
  );
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 8);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <AnnouncementBar />
      <Navbar />

      <HeroSlider />

      {/* Popular Categories */}
      <Section eyebrow="Browse" title="Popular Categories">
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-6 snap-x">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 w-32 md:w-auto text-center group cursor-pointer snap-start"
            >
              <div className="relative w-28 h-28 md:w-full md:h-32 rounded-full overflow-hidden mx-auto shadow-soft group-hover:shadow-pearl transition">
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <p className="mt-3 text-sm font-serif">{c.name}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Our Collections — large feature banners */}
      <Section eyebrow="Curated" title="Our Collections" subtitle="Stories woven in pearl, designed to mark life's most precious moments." className="">
        <div className="grid md:grid-cols-3 gap-6">
          {ourCollections.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-pearl cursor-pointer"
            >
              <img src={col.image} alt={col.name} loading="lazy" className="w-full h-full object-cover img-dark group-hover:scale-110 transition duration-1000" />
              <div className={`absolute inset-0 bg-gradient-to-t ${col.tone} via-black/20 to-transparent`} />
              {col.badge && (
                <span className="absolute top-4 right-4 text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">{col.badge}</span>
              )}
              <div className="absolute bottom-0 inset-x-0 p-7 text-primary-foreground">
                <h3 className="font-serif text-4xl leading-tight">{col.name}</h3>
                <span className="inline-flex items-center gap-1 mt-3 text-xs uppercase tracking-widest text-rosegold-soft opacity-0 group-hover:opacity-100 transition">
                  Shop Now <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Promo Banner — dark cinematic */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img src={bannerDark} alt="Signature pearl collection" loading="lazy" className="absolute inset-0 w-full h-full object-cover img-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-lg text-primary-foreground"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-rosegold-soft mb-4">Signature Edit</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">Quiet Luxury,<br /><span className="italic text-rosegold-soft">Loud Legacy.</span></h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">Hand-strung pieces that outlast trends. Discover the new Krishna Heritage line.</p>
            <button className="mt-7 bg-cream text-charcoal px-8 py-3.5 rounded text-sm uppercase tracking-widest hover:bg-rosegold hover:text-primary-foreground transition">
              Discover the Edit
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bestsellers */}
      <Section eyebrow="Loved by Many" title="Bestsellers" subtitle="The pieces our customers can't stop talking about.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* Trust */}
      <section className="border-y">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, t: "Free Shipping", s: "Across India" },
            { icon: Award, t: "Certified Pearls", s: "Lab tested" },
            { icon: RotateCcw, t: "7-Day Returns", s: "Easy & free" },
            { icon: ShieldCheck, t: "100% Authentic", s: "Guaranteed" },
          ].map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto  flex items-center justify-center text-rosegold">
                <b.icon className="w-6 h-6" />
              </div>
              <p className="mt-3 font-serif text-lg">{b.t}</p>
              <p className="text-xs text-muted-foreground">{b.s}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gift Finder */}
      <Section eyebrow="Personalised" title="Gift Finder" subtitle="Reveal a curated edit, just for them.">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-card rounded-2xl shadow-pearl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Occasion</label>
              <select className="mt-2 w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-rosegold">
                <option>Wedding</option><option>Anniversary</option><option>Birthday</option><option>Festive</option><option>Just Because</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Budget</label>
              <select className="mt-2 w-full border-b border-charcoal/20 bg-transparent py-2 focus:outline-none focus:border-rosegold">
                <option>Under ₹2,000</option><option>₹2,000 – ₹5,000</option><option>₹5,000 – ₹10,000</option><option>Above ₹10,000</option>
              </select>
            </div>
          </div>
          <button className="mt-8 w-full text-primary-foreground py-3.5 rounded uppercase tracking-widest text-sm hover:opacity-90 transition">
            Reveal Your Curated Gifts
          </button>
        </motion.div>
      </Section>

      {/* Shop by Color */}
      <Section eyebrow="Discover" title="Shop by Color" className="">
        <div className="flex flex-wrap justify-center gap-5 md:gap-7 mb-12">
          <button onClick={() => setActiveColor(null)} className={`text-xs uppercase tracking-widest pb-1 border-b ${!activeColor ? "border-rosegold text-rosegold" : "border-transparent"}`}>All</button>
          {colorSwatches.map((c) => (
            <button key={c.name} onClick={() => setActiveColor(c.name)} className="flex flex-col items-center gap-2 group">
              <div
                className={`w-14 h-14 rounded-full shadow-soft transition-all ${activeColor === c.name ? "ring-2 ring-rosegold ring-offset-4 ring-offset-ivory scale-110" : "group-hover:scale-110"}`}
                style={{ background: `radial-gradient(circle at 30% 30%, white, ${c.hex} 70%)` }}
              />
              <span className="text-xs">{c.name}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* Best Value Gifts */}
      <Section eyebrow="Gifting" title="Best Value Gifts" subtitle="Thoughtful pieces at every budget.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestValue.map((b, i) => (
            <motion.div
              key={b.tier}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-pearl transition"
            >
              <div className="relative aspect-square bg-charcoal/95">
                <img src={b.image} alt={b.tier} loading="lazy" className="w-full h-full object-cover img-dark group-hover:scale-105 transition duration-700" />
                {b.badge && (
                  <span className="absolute top-0 left-0 bg-rosegold text-primary-foreground text-xs font-medium px-4 py-2 rounded-br-2xl">{b.badge}</span>
                )}
              </div>
              <div className="bg-cream py-4 text-center">
                <p className="font-serif text-lg text-charcoal">{b.tier}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Pearl Guide — image cards */}
      <Section eyebrow="Knowledge" title="Pearl Guide" subtitle="Curated reading for every precious occasion." className="">
        <div className="grid md:grid-cols-3 gap-6">
          {pearlGuide.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[16/9] rounded-2xl overflow-hidden shadow-pearl cursor-pointer"
            >
              <img src={g.image} alt={g.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover img-dark group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
              <div className="absolute inset-0 m-3 rounded-xl border border-rosegold-soft/40 pointer-events-none" />
              <div className="relative h-full flex flex-col justify-center p-8 md:p-10 text-primary-foreground max-w-[60%]">
                <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wide leading-tight">{g.title}</h3>
                <div className="w-10 h-px bg-rosegold-soft my-4" />
                <p className="text-sm text-primary-foreground/80">{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stores */}
      <Section eyebrow="Visit Us" title="Our Stores" className="">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { city: "Hyderabad", addr: "Plot 12, Banjara Hills, Road No. 2", phone: "+91 98765 43210" },
            { city: "Mumbai", addr: "Linking Road, Bandra West", phone: "+91 98765 11122" },
            { city: "Delhi", addr: "M-Block Market, Greater Kailash", phone: "+91 98765 99988" },
          ].map((s, i) => (
            <motion.div key={s.city} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-soft">
              <MapPin className="w-5 h-5 text-rosegold mb-3" />
              <h3 className="font-serif text-2xl">{s.city}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.addr}</p>
              <p className="text-sm mt-1">{s.phone}</p>
              <button className="mt-4 text-xs uppercase tracking-widest text-rosegold hover:underline">Get Directions →</button>
            </motion.div>
          ))}
        </div>
      </Section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
