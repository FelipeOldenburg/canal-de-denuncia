import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { useAuth, ROLE_LABELS } from "@/lib/auth";
import { USERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const u = await login(email, password);
    setLoading(false);
    if (!u) {
      toast.error("E-mail não encontrado. Use uma das contas de demonstração abaixo.");
      return;
    }
    navigate({ to: "/painel", replace: true });
  };

  return (
    <div className="min-h-dvh grid md:grid-cols-2 bg-background">
      <div className="hidden md:flex flex-col justify-between bg-sidebar text-sidebar-foreground p-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-sidebar-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-semibold">Speak</div>
            <div className="text-xs text-sidebar-foreground/70">Canal interno de denúncias</div>
          </div>
        </div>
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight">
            Painel para RH e Compliance apurarem denúncias com rastreabilidade.
          </h1>
          <p className="mt-4 text-sm text-sidebar-foreground/80">
            A entrada do colaborador é feita via WhatsApp. Este ambiente é onde os casos administrativos
            das Trilhas Verde e Amarela são recebidos, analisados e encerrados com auditoria completa.
          </p>
        </div>
        <div className="text-xs text-sidebar-foreground/60">
          Uso restrito a pessoal autorizado · Todas as ações são registradas na trilha de auditoria.
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-lg font-semibold tracking-tight">Entrar</h2>
          <p className="text-sm text-muted-foreground mt-1">Use seu e-mail corporativo.</p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail corporativo</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nome@empresa.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </Button>
          </form>

          <div className="mt-8 rounded-md border border-border bg-muted/50 p-4">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Contas de demonstração
            </div>
            <ul className="mt-2 space-y-1.5">
              {USERS.map((u) => (
                <li key={u.id}>
                  <button
                    type="button"
                    onClick={() => { setEmail(u.email); setPassword("demo"); }}
                    className="w-full text-left text-xs hover:bg-background rounded px-2 py-1.5 transition-colors"
                  >
                    <span className="font-medium text-foreground">{u.email}</span>
                    <span className="text-muted-foreground"> — {ROLE_LABELS[u.role]}{u.sector ? ` · ${u.sector}` : ""}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-[11px] text-muted-foreground">Senha aceita: qualquer valor.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
