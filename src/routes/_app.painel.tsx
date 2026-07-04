import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AlertTriangle, Clock, FileWarning, Inbox } from "lucide-react";
import { PageHeader } from "@/components/speak/PageHeader";
import { PROTOCOLS, MONTHLY_VOLUME, hoursUntil, TRACK_LABELS, SEVERITY_LABELS } from "@/lib/mock-data";
import { fetchProtocols } from "@/lib/protocols";
import { useAuth, visibleProtocolsFor } from "@/lib/auth";
import { TrackBadge } from "@/components/speak/TrackBadge";
import { formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/painel")({
  component: PainelPage,
});

function PainelPage() {
  const { user } = useAuth();
  const canSee = visibleProtocolsFor(user);
  const { data = PROTOCOLS } = useQuery({
    queryKey: ["protocols"],
    queryFn: fetchProtocols,
    refetchInterval: 5000,
  });
  const protocols = useMemo(() => data.filter((p) => canSee(p.sector)), [data, user]);

  const open = protocols.filter((p) => p.status !== "encerrado");
  const green = open.filter((p) => p.track === "green");
  const amber = open.filter((p) => p.track === "amber");
  const overdue = open.filter((p) => hoursUntil(p.deadlineAt) < 0);
  const urgent = open
    .filter((p) => hoursUntil(p.deadlineAt) < 24)
    .sort((a, b) => hoursUntil(a.deadlineAt) - hoursUntil(b.deadlineAt));
  const contested = open.filter((p) => p.contested);

  const avgResp = (arr: typeof protocols) => {
    if (!arr.length) return 0;
    const days = arr.map((p) => (Date.now() - new Date(p.receivedAt).getTime()) / 86400000);
    return Math.round((days.reduce((a, b) => a + b, 0) / days.length) * 10) / 10;
  };

  // Sector distribution
  const bySector = Object.entries(
    protocols.reduce<Record<string, number>>((acc, p) => {
      acc[p.sector] = (acc[p.sector] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([sector, count]) => ({ sector, count }));

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Painel"
        subtitle="Visão consolidada dos protocolos administrativos das Trilhas Verde e Amarela."
      />

      <div className="px-6 pb-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            icon={<Inbox className="h-4 w-4" />}
            label="Protocolos abertos"
            value={open.length}
            hint={`${green.length} verde · ${amber.length} amarela`}
          />
          <SummaryCard
            icon={<Clock className="h-4 w-4" />}
            label="Tempo médio · Verde"
            value={`${avgResp(green)}d`}
            hint="desde o recebimento"
          />
          <SummaryCard
            icon={<Clock className="h-4 w-4" />}
            label="Tempo médio · Amarela"
            value={`${avgResp(amber)}d`}
            hint="desde o recebimento"
          />
          <SummaryCard
            icon={<FileWarning className="h-4 w-4" />}
            label="Vencidos"
            value={overdue.length}
            hint="fora do prazo interno"
            tone={overdue.length > 0 ? "warn" : "default"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold">Volume mensal por trilha</h3>
              <div className="text-xs text-muted-foreground">Últimos 6 meses</div>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <BarChart data={MONTHLY_VOLUME}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="green" name={`Trilha ${TRACK_LABELS.green}`} stackId="a" fill="var(--color-track-green)" />
                  <Bar dataKey="amber" name={`Trilha ${TRACK_LABELS.amber}`} stackId="a" fill="var(--color-track-amber)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Distribuição por setor</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <BarChart data={bySector} layout="vertical" margin={{ left: 12 }}>
                  <CartesianGrid horizontal={false} stroke="var(--color-border)" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="sector" width={80} tick={{ fontSize: 11 }} />
                  <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="var(--color-chart-3)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <AlertTriangle className="h-4 w-4 text-alert-orange" />
            <h3 className="text-sm font-semibold">Ações urgentes</h3>
            <span className="text-xs text-muted-foreground">
              Prazo &lt; 24h ou contestação pendente
            </span>
          </div>
          {urgent.length + contested.length === 0 ? (
            <div className="px-5 py-8 text-sm text-muted-foreground">
              Nenhuma ação urgente no momento. Casos serão listados aqui quando o prazo interno estiver abaixo de 24 horas ou houver contestação aguardando resposta.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {[...contested, ...urgent.filter((u) => !contested.includes(u))].map((p) => {
                const h = hoursUntil(p.deadlineAt);
                return (
                  <li key={p.id} className="px-5 py-3 flex items-center gap-4 text-sm">
                    <TrackBadge track={p.track} />
                    <div className="font-medium tabular-nums">{p.id}</div>
                    <div className="text-muted-foreground truncate flex-1">{p.transcript}</div>
                    <div className="text-xs text-muted-foreground shrink-0">{p.sector}</div>
                    <div className="text-xs text-muted-foreground shrink-0">{SEVERITY_LABELS[p.severity]}</div>
                    <div
                      className={`text-xs shrink-0 ${h < 0 ? "text-destructive font-medium" : "text-alert-orange"}`}
                    >
                      {p.contested
                        ? "Contestação"
                        : h < 0
                          ? `Vencido há ${Math.abs(Math.round(h))}h`
                          : `${Math.round(h)}h restantes`}
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0 hidden md:block">
                      {formatDate(p.receivedAt)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 12,
};


function SummaryCard({
  icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: "default" | "warn";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className={`mt-2 text-2xl font-semibold tabular-nums ${tone === "warn" ? "text-alert-orange" : ""}`}>
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
