import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Calendar, Clock, Video, Store, Phone } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const Route = createFileRoute("/book-appointment")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Krishna Pearls" },
      { name: "description", content: "Book a personal video consultation or in-store appointment with our pearl experts." },
    ],
  }),
  component: AppointmentPage,
});

const slots = ["10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

function AppointmentPage() {
  const [mode, setMode] = useState<"video" | "store">("video");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot || !name || !phone) return toast.error("Please fill all fields");
    toast.success(`Appointment confirmed for ${date} at ${slot}`);
    setDate(""); setSlot(""); setName(""); setPhone("");
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 md:px-8 py-12 md:py-20 pb-24 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rosegold">Personal Consultation</p>
          <h1 className="font-serif text-4xl md:text-5xl mt-3">Book an Appointment</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Get expert guidance from our pearl stylists — privately, from anywhere or at our flagship boutique.</p>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <button onClick={() => setMode("video")} className={`rounded-xl border p-6 text-left transition ${mode === "video" ? "border-rosegold shadow-pearl bg-card" : "bg-card/50 hover:bg-card"}`}>
            <Video className="h-7 w-7 text-rosegold" />
            <h3 className="font-serif text-2xl mt-3">Video Call</h3>
            <p className="text-sm text-muted-foreground mt-1">45-min one-on-one styling session over video</p>
          </button>
          <button onClick={() => setMode("store")} className={`rounded-xl border p-6 text-left transition ${mode === "store" ? "border-rosegold shadow-pearl bg-card" : "bg-card/50 hover:bg-card"}`}>
            <Store className="h-7 w-7 text-rosegold" />
            <h3 className="font-serif text-2xl mt-3">Visit Store</h3>
            <p className="text-sm text-muted-foreground mt-1">Hyderabad flagship — by appointment only</p>
          </button>
        </div>

        <form onSubmit={submit} className="mt-8 rounded-2xl border bg-card p-6 md:p-8 space-y-5 shadow-soft">
          <div className="grid md:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Your Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-11 rounded border bg-background px-3 text-sm outline-none" placeholder="Full name" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full h-11 rounded border bg-background px-3 text-sm outline-none" placeholder="+91" />
            </label>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> Preferred Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full h-11 rounded border bg-background px-3 text-sm outline-none" />
          </label>

          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Available Slots</span>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-6 gap-2">
              {slots.map((s) => (
                <button key={s} type="button" onClick={() => setSlot(s)} className={`rounded border px-3 py-2 text-sm transition ${slot === s ? "bg-rosegold text-primary-foreground border-rosegold" : "hover:border-rosegold"}`}>{s}</button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full gradient-rosegold text-primary-foreground py-3 rounded uppercase tracking-widest text-sm hover:opacity-90 transition">
            Confirm Appointment
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" /> Or call us at <span className="text-foreground font-medium">+91 98765 43210</span>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
