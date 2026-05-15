import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import banner from "@/assets/banner-dark.jpg";
import store from "@/assets/store-krishna.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({ meta: [
    { title: "Our Story — Krishna Pearls" },
    { name: "description", content: "Three generations of heirloom pearl craftsmanship — the story behind Krishna Pearls." },
  ]}),
  component: OurStoryPage,
});

function OurStoryPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background">
      <AnnouncementBar />
      <Navbar />

      <section className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <img src={banner} alt="Heritage pearls" className="absolute inset-0 w-full h-full object-cover img-dark-strong" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-8 flex items-center text-primary-foreground">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-rosegold-soft mb-3">Since 1962</p>
            <h1 className="font-serif text-5xl md:text-7xl">Our <em className="italic text-rosegold-soft">Story</em></h1>
            <p className="mt-4 text-primary-foreground/80">Three generations. One enduring belief — that a pearl carries memory.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 py-16 md:py-24 space-y-10 text-charcoal/85 leading-relaxed">
        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xl font-serif italic text-center text-rosegold">
          "A pearl is patient. So are we."
        </motion.p>
        <p>Krishna Pearls began in a small workshop in Hyderabad, where our founder, Smt. Krishna Devi, hand-strung her first strand for her daughter's wedding. What began as a gift became a legacy.</p>
        <p>Today, we work directly with ethical pearl farms across the South Sea and Akoya regions, hand-selecting each pearl for lustre, shape and depth. Every piece is finished by master craftspeople — the same families who have shaped our work for decades.</p>
        <img src={store} alt="Our Hyderabad atelier" className="w-full rounded-xl img-dark" />
        <p>We design for the moments that matter — the first day at school, the slow Sunday lunch, the wedding morning. Heirlooms not just for special days, but for every day.</p>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
