import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, Hand, Award, Gem } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import banner from "@/assets/banner-dark.jpg";

const steps = [
  { icon: Gem,     t: "Sourcing",  d: "Ethically farmed South Sea & Akoya pearls, hand-selected for lustre and form." },
  { icon: Sparkles,t: "Grading",   d: "Each pearl is graded across seven parameters before it ever touches a strand." },
  { icon: Hand,    t: "Hand-stringing", d: "Knotted on French silk by craftspeople with three generations of practice." },
  { icon: Award,   t: "Certification", d: "Every order ships with a signed authenticity certificate and care booklet." },
];

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({ meta: [
    { title: "Craftsmanship — Krishna Pearls" },
    { name: "description", content: "From shell to strand — the craftsmanship behind every Krishna pearl." },
  ]}),
  component: CraftsmanshipPage,
});

function CraftsmanshipPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background">
      <AnnouncementBar />
      <Navbar />

      <section className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <img src={banner} alt="Craftsmanship" className="absolute inset-0 w-full h-full object-cover img-dark-strong" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-8 flex items-center text-primary-foreground">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-rosegold-soft mb-3">From Shell to Strand</p>
            <h1 className="font-serif text-5xl md:text-7xl">Craftsmanship</h1>
            <p className="mt-4 text-primary-foreground/80">A patient practice — refined over sixty years.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-8">
        {steps.map((s, i) => (
          <motion.div key={s.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="bg-card border rounded-2xl p-8 shadow-soft">
            <div className="w-14 h-14 rounded-full bg-rosegold/10 text-rosegold flex items-center justify-center"><s.icon className="w-6 h-6" /></div>
            <h3 className="font-serif text-2xl mt-4">{s.t}</h3>
            <p className="text-muted-foreground mt-2">{s.d}</p>
          </motion.div>
        ))}
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
