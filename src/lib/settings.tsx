import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface Settings {
  deadlineGreenDays: number;
  deadlineAmberDays: number;
  thermometerMinSample: number;
}

const DEFAULTS: Settings = {
  deadlineGreenDays: 15,
  deadlineAmberDays: 7,
  thermometerMinSample: 10,
};

const KEY = "speak.settings";
const Ctx = createContext<{ settings: Settings; update: (s: Partial<Settings>) => void } | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const update = (s: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...s };
      try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return <Ctx.Provider value={{ settings, update }}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
