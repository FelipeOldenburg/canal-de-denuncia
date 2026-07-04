import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, canManageSettings, ROLE_LABELS } from "@/lib/auth";
import { useSettings } from "@/lib/settings";
import { USERS, type Role } from "@/lib/mock-data";
import { PageHeader } from "@/components/speak/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info } from "lucide-react";

export const Route = createFileRoute("/_app/configuracoes")({
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { settings, update } = useSettings();
  const [green, setGreen] = useState(settings.deadlineGreenDays);
  const [amber, setAmber] = useState(settings.deadlineAmberDays);
  const [sample, setSample] = useState(settings.thermometerMinSample);

  useEffect(() => {
    if (user && !canManageSettings(user.role)) navigate({ to: "/painel", replace: true });
  }, [user, navigate]);

  useEffect(() => {
    setGreen(settings.deadlineGreenDays);
    setAmber(settings.deadlineAmberDays);
    setSample(settings.thermometerMinSample);
  }, [settings]);

  if (!user || !canManageSettings(user.role)) return null;

  return (
    <div className="flex flex-col">
      <PageHeader title="Configurações" subtitle="Parâmetros administrativos do painel." />
      <div className="px-6 py-6 space-y-6 max-w-3xl">
        <section className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Usuários e papéis</h3>
          <p className="text-xs text-muted-foreground mt-1">Cadastro e permissões dos usuários do painel.</p>
          <div className="mt-4 divide-y divide-border border border-border rounded-md overflow-hidden">
            {USERS.map((u) => (
              <div key={u.id} className="px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-center">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{u.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{u.email}{u.sector ? ` · ${u.sector}` : ""}</div>
                </div>
                <select
                  defaultValue={u.role}
                  onChange={() => toast.success("Papel atualizado (simulado).")}
                  className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                >
                  {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                    <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Prazos internos por trilha</h3>
          <div className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <p>Alterar prazos internos não altera prazos legais aplicáveis.</p>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="green">Trilha Verde (dias)</Label>
              <Input id="green" type="number" min={1} value={green} onChange={(e) => setGreen(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="amber">Trilha Amarela (dias)</Label>
              <Input id="amber" type="number" min={1} value={amber} onChange={(e) => setAmber(Number(e.target.value))} />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Termômetro Setorial</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Amostra mínima de colaboradores para exibir um setor individualmente. Setores abaixo do limite são agrupados em "Outros setores".
          </p>
          <div className="mt-4 max-w-xs space-y-1.5">
            <Label htmlFor="sample">Amostra mínima (colaboradores)</Label>
            <Input id="sample" type="number" min={1} value={sample} onChange={(e) => setSample(Number(e.target.value))} />
          </div>
        </section>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              update({ deadlineGreenDays: green, deadlineAmberDays: amber, thermometerMinSample: sample });
              toast.success("Configurações salvas.");
            }}
          >
            Salvar alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
