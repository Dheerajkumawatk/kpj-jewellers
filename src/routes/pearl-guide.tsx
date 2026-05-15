import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import gSize from "@/assets/guide-size.jpg";
import gCare from "@/assets/guide-care.jpg";
import gReal from "@/assets/guide-real.jpg";

const guides = [
  { title: "Pearl Size & Length", img: gSize, body: ["Princess (16–18\")— sits at the collarbone, perfect for everyday wear.", "Matinee (20–24\")— elegant for office & evening.", "Opera (28–35\")— layered or doubled for occasion wear.", "Bead size 5–7mm for studs, 7–9mm for daily strands, 9mm+ for statement pieces."] },
  { title: "How to Care for Your Pearls", img: gCare, body: ["Pearls are organic — keep them away from perfume, hairspray and harsh cleaners.", "Wipe with a soft damp cloth after wear; store flat in a soft pouch.", "Re-string knotted strands every 2–3 years to keep silk fresh.", "Wear them often — your skin's natural oils preserve their lustre."] },
  { title: "Real vs Imitation", img: gReal, body: ["Real pearls feel cool to the touch and warm slowly.", "Light tooth-rub test: real pearls feel slightly gritty; imitations feel glassy.", "No two real pearls are identical — look for tiny natural variations.", "Every Krishna Pearl ships with a certificate of authenticity."] },
];

export const Route = createFileRoute("/pearl-guide")({
  head: () => ({ meta: [
    { title: "Pearl Guide — Krishna Pearls" },
    { name: "description", content: "Everything to know about pearls — size, care, and how to spot the real thing." },
  ]}),
  component: PearlGuidePage,
});

function PearlGuidePage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background">
      <AnnouncementBar />
      <Navbar />

      <section className="bg-ivory border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rosegold mb-3">Knowledge</p>
          <h1 className="font-serif text-5xl">Pearl Guide</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Curated reading for every precious occasion.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 md:px-8 py-16 space-y-16">
        {guides.map((g, i) => (
          <section key={g.title} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[&>img]:order-2" : ""}`}>
            <img src={g.img} alt={g.title} className="aspect-[4/3] w-full object-cover rounded-2xl shadow-pearl img-dark" />
            <div>
              <h2 className="font-serif text-3xl">{g.title}</h2>
              <div className="w-12 h-px bg-rosegold my-4" />
              <ul className="space-y-3 text-charcoal/80">
                {g.body.map((b, j) => <li key={j} className="flex gap-3"><span className="text-rosegold">◆</span><span>{b}</span></li>)}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
