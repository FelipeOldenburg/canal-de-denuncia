import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PROTOCOLS, AUDIT, STATUS_LABELS, TRACK_LABELS, formatDateTime, formatDate, type Track, type ProtocolStatus } from "@/lib/mock-data";
import { useAuth, visibleProtocolsFor, ROLE_LABELS } from "@/lib/auth";
import { PageHeader } from "@/components/speak/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TrackBadge } from "@/components/speak/TrackBadge";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/relatorios")({
  component: RelatoriosPage,
});

function RelatoriosPage() {
  const { user } = useAuth();
  const canSee = visibleProtocolsFor(user);

  const [period, setPeriod] = useState<"30" | "90" | "180" | "all">("90");
  const [track, setTrack] = useState<"all" | Track>("all");
  const [status, setStatus] = useState<"all" | ProtocolStatus>("all");
  const [sector, setSector] = useState<string>("all");

  const sectors = useMemo(
    () => Array.from(new Set(PROTOCOLS.map((p) => p.sector))),
    [],
  );

  const filtered = useMemo(() => {
    const cutoff = period === "all" ? 0 : Date.now() - Number(period) * 86400000;
    return PROTOCOLS.filter((p) => canSee(p.sector))
      .filter((p) => (period === "all" ? true : new Date(p.receivedAt).getTime() >= cutoff))
      .filter((p) => (track === "all" ? true : p.track === track))
      .filter((p) => (status === "all" ? true : p.status === status))
      .filter((p) => (sector === "all" ? true : p.sector === sector));
  }, [period, track, status, sector, user]);

  const exportCsv = () => {
    const rows = [
      ["ID", "Trilha", "Status", "Setor", "Recebido", "Prazo", "Contestado"],
      ...filtered.map((p) => [p.id, TRACK_LABELS[p.track], STATUS_LABELS[p.status], p.sector, formatDate(p.receivedAt), formatDate(p.deadlineAt), p.contested ? "Sim" : "Não"]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `speak-relatorio-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado.");
  };

  return (
    <div className="flex flex-col">
      <PageHeader title="Relatórios e Auditoria" subtitle="Consulta consolidada de protocolos e histórico de ações." />

      <div className="px-6 py-6">
        <Tabs defaultValue="relatorios">
          <TabsList>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            <TabsTrigger value="auditoria">Trilha de Auditoria</TabsTrigger>
          </TabsList>

          <TabsContent value="relatorios" className="mt-5">
            <div className="rounded-lg border border-border bg-card p-4 flex flex-wrap gap-3 items-end">
              <Filter label="Período" value={period} onChange={(v) => setPeriod(v as typeof period)} options={[
                { value: "30", label: "30 dias" },
                { value: "90", label: "90 dias" },
                { value: "180", label: "6 meses" },
                { value: "all", label: "Tudo" },
              ]} />
              <Filter label="Trilha" value={track} onChange={(v) => setTrack(v as typeof track)} options={[
                { value: "all", label: "Todas" },
                { value: "green", label: "Verde" },
                { value: "amber", label: "Amarela" },
              ]} />
              <Filter label="Status" value={status} onChange={(v) => setStatus(v as typeof status)} options={[
                { value: "all", label: "Todos" },
                ...Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label })),
              ]} />
              <Filter label="Setor" value={sector} onChange={setSector} options={[
                { value: "all", label: "Todos" },
                ...sectors.map((s) => ({ value: s, label: s })),
              ]} />
              <div className="flex-1" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportCsv}><Download className="h-3.5 w-3.5 mr-1.5" /> CSV</Button>
                <Button variant="outline" size="sm" onClick={() => toast.message("Exportação PDF simulada.")}>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> PDF
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
                    <th className="px-4 py-3 font-medium">Protocolo</th>
                    <th className="px-4 py-3 font-medium">Trilha</th>
                    <th className="px-4 py-3 font-medium">Setor</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Recebido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                        Nenhum protocolo corresponde aos filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/40">
                        <td className="px-4 py-3 font-medium tabular-nums">{p.id}</td>
                        <td className="px-4 py-3"><TrackBadge track={p.track} size="xs" /></td>
                        <td className="px-4 py-3">{p.sector}</td>
                        <td className="px-4 py-3 text-muted-foreground">{STATUS_LABELS[p.status]}</td>
                        <td className="px-4 py-3 text-muted-foreground">{formatDate(p.receivedAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="auditoria" className="mt-5">
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
                    <th className="px-4 py-3 font-medium">Quando</th>
                    <th className="px-4 py-3 font-medium">Usuário</th>
                    <th className="px-4 py-3 font-medium">Papel</th>
                    <th className="px-4 py-3 font-medium">Ação</th>
                    <th className="px-4 py-3 font-medium">Alvo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {AUDIT.slice().sort((a,b) => b.at.localeCompare(a.at)).map((e) => (
                    <tr key={e.id}>
                      <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatDateTime(e.at)}</td>
                      <td className="px-4 py-3">{e.user}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ROLE_LABELS[e.role]}</td>
                      <td className="px-4 py-3">{e.action}</td>
                      <td className="px-4 py-3 text-muted-foreground">{e.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <select
        className="rounded-md border border-input bg-background px-2 py-1.5 text-sm min-w-[140px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
