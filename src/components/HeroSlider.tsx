import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-pearls.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    eyebrow: "Heirloom Pearl Jewellery",
    title: "Timeless",
    accent: "Pearl",
    titleEnd: "Jewellery",
    subtitle: "Ethically sourced. Hand-strung in India. Crafted to be cherished for generations.",
  },
  {
    image: hero2,
    eyebrow: "The Bridal Edit",
    title: "Adorned in",
    accent: "Grace",
    titleEnd: "",
    subtitle: "Heritage pearls reimagined for the modern bride. Curated for your most precious moments.",
  },
  {
    image: hero3,
    eyebrow: "Festive Collection 2026",
    title: "Radiance",
    accent: "Reborn",
    titleEnd: "",
    subtitle: "Statement pieces hand-crafted with South Sea pearls and rose-gold detailing.",
  },
];

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
              <img
                src={s.image}
                alt={s.eyebrow}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay copy — animates per active slide */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-8 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl pointer-events-auto"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-rosegold mb-4 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> {slides[selected].eyebrow}
              </p>
              <h1 className="font-serif text-5xl md:text-7xl leading-tight text-charcoal">
                {slides[selected].title}<br />
                <span className="text-rosegold italic">{slides[selected].accent}</span>
                {slides[selected].titleEnd && <> {slides[selected].titleEnd}</>}
              </h1>
              <p className="mt-6 text-lg text-charcoal/70 leading-relaxed">
                {slides[selected].subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="gradient-rosegold text-primary-foreground px-8 py-3.5 rounded text-sm uppercase tracking-widest hover:opacity-90 transition shadow-pearl">
                  Shop Now
                </button>
                <button className="border border-charcoal text-charcoal px-8 py-3.5 rounded text-sm uppercase tracking-widest hover:bg-charcoal hover:text-primary-foreground transition">
                  Explore Collections
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/80 backdrop-blur items-center justify-center text-charcoal hover:bg-rosegold hover:text-primary-foreground transition shadow-soft"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/80 backdrop-blur items-center justify-center text-charcoal hover:bg-rosegold hover:text-primary-foreground transition shadow-soft"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              selected === i ? "w-8 bg-rosegold" : "w-4 bg-charcoal/30 hover:bg-charcoal/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
