import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Krishna Pearls" },
      { name: "description", content: "Sign in to your Krishna Pearls account to manage orders, wishlist and appointments." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");
    signIn(email, password);
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-8 shadow-pearl">
          <h1 className="font-serif text-4xl text-center">Welcome Back</h1>
          <p className="mt-2 text-center text-muted-foreground text-sm">Sign in to continue your pearl journey</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
              <div className="mt-1 flex items-center gap-2 rounded border px-3 h-11">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" placeholder="you@email.com" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Password</span>
              <div className="mt-1 flex items-center gap-2 rounded border px-3 h-11">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" placeholder="••••••••" />
              </div>
            </label>
            <button type="submit" className="w-full gradient-rosegold text-primary-foreground py-3 rounded uppercase tracking-widest text-sm hover:opacity-90 transition">
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="text-rosegold hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
