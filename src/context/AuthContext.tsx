import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AuthUser = { name: string; email: string; phone?: string };

type AuthCtx = {
  user: AuthUser | null;
  signIn: (email: string, _password: string) => void;
  signUp: (name: string, email: string, _password: string) => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kp-user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    if (user) localStorage.setItem("kp-user", JSON.stringify(user));
    else localStorage.removeItem("kp-user");
  }, [user]);

  const signIn = (email: string) => setUser({ name: email.split("@")[0] || "Guest", email });
  const signUp = (name: string, email: string) => setUser({ name, email });
  const signOut = () => setUser(null);

  return <Ctx.Provider value={{ user, signIn, signUp, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
