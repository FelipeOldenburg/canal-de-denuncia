import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { USERS, type AppUser, type Role } from "./mock-data";

interface AuthState {
  user: AppUser | null;
  hydrated: boolean;
  login: (email: string, _password: string) => Promise<AppUser | null>;
  logout: () => void;
}

const AuthCtx = createContext<AuthState | null>(null);
const STORAGE_KEY = "speak.auth.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const login = async (email: string, _password: string) => {
    const found = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return null;
    setUser(found);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch {}
    return found;
  };

  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return <AuthCtx.Provider value={{ user, hydrated, login, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}


// Permissions
export function canSeeAllSectors(role: Role): boolean {
  return role === "compliance" || role === "admin";
}

export function canManageSettings(role: Role): boolean {
  return role === "admin";
}

export function visibleProtocolsFor(user: AppUser | null) {
  if (!user) return () => false;
  if (canSeeAllSectors(user.role)) return () => true;
  return (sector: string) => sector === user.sector;
}

export const ROLE_LABELS: Record<Role, string> = {
  hr_analyst: "Analista de RH",
  compliance: "Compliance Officer",
  admin: "Administrador",
};
