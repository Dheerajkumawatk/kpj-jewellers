import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ChevronRight, Lock, Truck, CreditCard, Wallet, Building2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatINR } from "@/lib/format";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Krishna Pearls" },
      { name: "description", content: "Secure checkout for your pearl jewellery order." },
    ],
  }),
  component: CheckoutPage,
});

type Step = "address" | "shipping" | "payment";

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("address");

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [shipMethod, setShipMethod] = useState("standard");
  const [pay, setPay] = useState("card");

  useEffect(() => {
    if (items.length === 0) navigate({ to: "/cart" });
  }, [items, navigate]);

  const shipCost = shipMethod === "express" ? 199 : total > 1500 ? 0 : 99;
  const grand = total + shipCost;

  const next = () => {
    if (step === "address") {
      if (!name || !email || !phone || !address || !city || !pin) return toast.error("Please fill all address fields");
      setStep("shipping");
    } else if (step === "shipping") {
      setStep("payment");
    } else {
      toast.success("Order placed! Redirecting…");
      clear();
      setTimeout(() => navigate({ to: "/order-success" }), 600);
    }
  };

  const steps: { id: Step; label: string }[] = [
    { id: "address", label: "Address" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-12 pb-24 md:pb-16">
        <h1 className="font-serif text-3xl md:text-4xl">Checkout</h1>

        {/* Stepper */}
        <div className="mt-6 flex items-center gap-2 text-sm">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2">
              <span className={`flex items-center justify-center h-7 w-7 rounded-full text-xs ${step === s.id ? "bg-rosegold text-primary-foreground" : steps.findIndex((x) => x.id === step) > idx ? "bg-rosegold/30 text-foreground" : "bg-muted text-muted-foreground"}`}>{idx + 1}</span>
              <span className={`uppercase tracking-widest text-xs ${step === s.id ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {idx < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <motion.div key={step} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 rounded-xl border bg-card p-6 md:p-8">
            {step === "address" && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl">Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Full Name" value={name} onChange={setName} />
                  <Field label="Email" value={email} onChange={setEmail} type="email" />
                  <Field label="Phone" value={phone} onChange={setPhone} />
                  <Field label="PIN Code" value={pin} onChange={setPin} />
                </div>
                <Field label="Street Address" value={address} onChange={setAddress} />
                <Field label="City" value={city} onChange={setCity} />
              </div>
            )}

            {step === "shipping" && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl">Shipping Method</h2>
                {[
                  { id: "standard", title: "Standard Delivery", desc: "5-7 business days", cost: total > 1500 ? "Free" : "₹99" },
                  { id: "express", title: "Express Delivery", desc: "2-3 business days", cost: "₹199" },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center justify-between gap-4 rounded-xl border p-4 cursor-pointer transition ${shipMethod === m.id ? "border-rosegold shadow-pearl" : ""}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="ship" checked={shipMethod === m.id} onChange={() => setShipMethod(m.id)} className="accent-[var(--rosegold)]" />
                      <Truck className="h-5 w-5 text-rosegold" />
                      <div>
                        <p className="font-medium">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.desc}</p>
                      </div>
                    </div>
                    <span className="font-medium">{m.cost}</span>
                  </label>
                ))}
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl">Payment Method</h2>
                {[
                  { id: "card", icon: CreditCard, title: "Credit / Debit Card", desc: "Visa, Mastercard, Rupay" },
                  { id: "upi", icon: Wallet, title: "UPI", desc: "GPay, PhonePe, Paytm" },
                  { id: "netbanking", icon: Building2, title: "Net Banking", desc: "All major banks" },
                  { id: "cod", icon: Truck, title: "Cash on Delivery", desc: "Pay when you receive" },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${pay === m.id ? "border-rosegold shadow-pearl" : ""}`}>
                    <input type="radio" name="pay" checked={pay === m.id} onChange={() => setPay(m.id)} className="accent-[var(--rosegold)]" />
                    <m.icon className="h-5 w-5 text-rosegold" />
                    <div>
                      <p className="font-medium">{m.title}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </label>
                ))}
                {pay === "card" && (
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <Field label="Card Number" value="" onChange={() => {}} placeholder="1234 5678 9012 3456" />
                    <Field label="Name on Card" value="" onChange={() => {}} />
                    <Field label="Expiry (MM/YY)" value="" onChange={() => {}} placeholder="12/28" />
                    <Field label="CVV" value="" onChange={() => {}} placeholder="•••" />
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              {step !== "address" ? (
                <button onClick={() => setStep(step === "payment" ? "shipping" : "address")} className="text-sm text-muted-foreground hover:text-rosegold">← Back</button>
              ) : <Link to="/cart" className="text-sm text-muted-foreground hover:text-rosegold">← Back to bag</Link>}
              <button onClick={next} className="rounded gradient-rosegold text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:opacity-90">
                {step === "payment" ? "Place Order" : "Continue"}
              </button>
            </div>
          </motion.div>

          <aside className="rounded-xl border bg-card p-6 h-fit space-y-4 sticky top-24">
            <h2 className="font-serif text-2xl">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 text-sm">
                  <img src={i.image} alt={i.name} className="w-14 h-14 object-cover rounded img-dark" />
                  <div className="flex-1">
                    <p className="leading-tight">{i.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.quantity}</p>
                  </div>
                  <span>{formatINR(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipCost === 0 ? "Free" : formatINR(shipCost)}</span></div>
              <div className="flex justify-between font-serif text-xl pt-2"><span>Total</span><span className="text-rosegold">{formatINR(grand)}</span></div>
            </div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" /> Secure SSL checkout</p>
          </aside>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full h-11 rounded border bg-background px-3 text-sm outline-none focus:border-rosegold" />
    </label>
  );
}
