import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  PROTOCOLS,
  SEVERITY_LABELS,
  STATUS_ORDER,
  STATUS_LABELS,
  hoursUntil,
  formatDate,
  formatDateTime,
  type Protocol,
  type ProtocolStatus,
} from "@/lib/mock-data";
import { fetchProtocols } from "@/lib/protocols";
import { useAuth, visibleProtocolsFor } from "@/lib/auth";
import { PageHeader } from "@/components/speak/PageHeader";
import { TrackBadge } from "@/components/speak/TrackBadge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  ArrowRight,
  Ban,
  CheckCircle2,
  ChevronDown,
  Layers,
  MessageSquare,
  Mic,
  Paperclip,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/kanban")({
  component: KanbanPage,
});

function KanbanPage() {
  const { user } = useAuth();
  const canSee = visibleProtocolsFor(user);
  const { data = PROTOCOLS } = useQuery({
    queryKey: ["protocols"],
    queryFn: fetchProtocols,
    refetchInterval: 5000,
  });
  const visibleProtocols = useMemo(() => data.filter((p) => canSee(p.sector)), [data, user]);
  const [items, setItems] = useState<Protocol[]>(visibleProtocols);
  const [openId, setOpenId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<ProtocolStatus | null>(null);

  useEffect(() => {
    setItems((prev) => {
      if (!prev.length) return visibleProtocols;
      const existing = new Set(prev.map((p) => p.id));
      const incoming = visibleProtocols.filter((p) => !existing.has(p.id));
      return incoming.length ? [...incoming, ...prev] : prev;
    });
  }, [visibleProtocols]);

  const grouped = useMemo(() => {
    const map: Record<ProtocolStatus, Protocol[]> = {
      recebido: [],
      em_analise: [],
      aguardando_colaborador: [],
      resolvido: [],
      contestado: [],
      encerrado: [],
    };
    for (const p of items) map[p.status].push(p);
    return map;
  }, [items]);

  const openProtocol = items.find((i) => i.id === openId) ?? null;

  const move = (id: string, to: ProtocolStatus) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: to,
              history: [
                ...p.history,
                { at: new Date().toISOString(), actor: user?.name ?? "Sistema", action: `Alterou status para ${STATUS_LABELS[to]}` },
              ],
            }
          : p,
      ),
    );
    toast.success(`Movido para ${STATUS_LABELS[to]}`);
  };

  return (
    <div className="flex flex-col h-dvh">
      <PageHeader
        title="Kanban de Protocolos"
        subtitle="Fluxo dos protocolos administrativos. Arraste os cartões ou use o menu de ações."
      />

      <div className="flex-1 min-h-0 overflow-x-auto">
        <div className="flex gap-3 p-6 min-w-max h-full">
          {STATUS_ORDER.map((col) => (
            <div
              key={col}
              onDragOver={(e) => { e.preventDefault(); setDragOver(col); }}
              onDragLeave={() => setDragOver((d) => (d === col ? null : d))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                setDragOver(null);
                if (id) move(id, col);
              }}
              className={`w-[280px] shrink-0 flex flex-col rounded-lg border ${
                dragOver === col ? "border-primary bg-accent/50" : "border-border bg-muted/30"
              } transition-colors`}
            >
              <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {STATUS_LABELS[col]}
                </div>
                <div className="text-xs text-muted-foreground tabular-nums">{grouped[col].length}</div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {grouped[col].length === 0 ? (
                  <div className="text-xs text-muted-foreground px-2 py-6 text-center">
                    Nenhum protocolo nesta coluna.
                  </div>
                ) : (
                  grouped[col].map((p) => (
                    <CardItem key={p.id} p={p} onOpen={() => setOpenId(p.id)} onMove={(to) => move(p.id, to)} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={!!openProtocol} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          {openProtocol && (
            <ProtocolDetail
              p={openProtocol}
              onMove={(to) => move(openProtocol.id, to)}
              onUpdate={(patch) =>
                setItems((prev) => prev.map((x) => (x.id === openProtocol.id ? { ...x, ...patch } : x)))
              }
              onResolve={() => {
                move(openProtocol.id, "resolvido");
                setItems((prev) =>
                  prev.map((x) =>
                    x.id === openProtocol.id
                      ? {
                          ...x,
                          history: [
                            ...x.history,
                            { at: new Date().toISOString(), actor: "Sistema", action: "Notificação simulada enviada ao colaborador" },
                          ],
                        }
                      : x,
                  ),
                );
                toast.success("Notificação simulada enviada ao colaborador.");
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function CardItem({
  p,
  onOpen,
  onMove,
}: {
  p: Protocol;
  onOpen: () => void;
  onMove: (to: ProtocolStatus) => void;
}) {
  const h = hoursUntil(p.deadlineAt);
  const soon = h < 24 && h >= 0 && p.status !== "encerrado";
  const overdue = h < 0 && p.status !== "encerrado";

  return (
    <article
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)}
      onClick={onOpen}
      className={`group rounded-md border bg-card p-3 cursor-pointer hover:border-primary/40 transition-colors ${
        p.contested ? "border-destructive/60" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <TrackBadge track={p.track} size="xs" />
          {p.contested && (
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive px-1.5 py-0.5 text-[10px] font-medium">
              <AlertCircle className="h-3 w-3" /> Contestado
            </span>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              aria-label="Ações do protocolo"
              className="opacity-60 hover:opacity-100 text-muted-foreground text-xs"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuLabel className="text-xs">Mover para</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {STATUS_ORDER.filter((s) => s !== p.status).map((s) => (
              <DropdownMenuItem key={s} onClick={() => onMove(s)}>
                <ArrowRight className="h-3.5 w-3.5 mr-2" /> {STATUS_LABELS[s]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-2 text-sm font-semibold tabular-nums">{p.id}</div>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.transcript}</p>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{p.sector}</span>
        <span>{formatDate(p.receivedAt)}</span>
      </div>

      <div className="mt-2 flex items-center gap-2 flex-wrap">
        <SeverityBadge severity={p.severity} />
        {p.grouped && (
          <span className="inline-flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 text-[10px] text-accent-foreground">
            <Layers className="h-3 w-3" /> {p.grouped.count} relatos agrupados
          </span>
        )}
        {(soon || overdue) && (
          <span
            className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${
              overdue
                ? "bg-destructive/10 text-destructive"
                : "bg-alert-orange-soft text-alert-orange"
            }`}
          >
            {overdue ? `Vencido há ${Math.abs(Math.round(h))}h` : `${Math.round(h)}h restantes`}
          </span>
        )}
      </div>
    </article>
  );
}

function SeverityBadge({ severity }: { severity: Protocol["severity"] }) {
  const cls =
    severity === "critica"
      ? "bg-destructive/10 text-destructive"
      : severity === "alta"
        ? "bg-alert-orange-soft text-alert-orange"
        : "bg-muted text-muted-foreground";

  return (
    <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium ${cls}`}>
      {SEVERITY_LABELS[severity]}
    </span>
  );
}

function ProtocolDetail({
  p,
  onMove,
  onUpdate,
  onResolve,
}: {
  p: Protocol;
  onMove: (to: ProtocolStatus) => void;
  onUpdate: (patch: Partial<Protocol>) => void;
  onResolve: () => void;
}) {
  const [plan, setPlan] = useState(p.actionPlan ?? "");
  const [sectorEdit, setSectorEdit] = useState(false);
  const [newSector, setNewSector] = useState(p.sector);

  const blocked = p.contestationsThisMonth >= 3;

  return (
    <div>
      <SheetHeader>
        <div className="flex items-center gap-2 flex-wrap">
          <TrackBadge track={p.track} />
          {p.contested && (
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-[11px] font-medium">
              <AlertCircle className="h-3 w-3" /> Contestado — prioridade alta
            </span>
          )}
          {p.grouped && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground">
              <Layers className="h-3 w-3" /> {p.grouped.count} relatos
            </span>
          )}
        </div>
        <SheetTitle className="tabular-nums">{p.id}</SheetTitle>
        <SheetDescription>
          Recebido em {formatDateTime(p.receivedAt)} · Prazo interno: {formatDateTime(p.deadlineAt)}
        </SheetDescription>
      </SheetHeader>

      {p.grouped && (
        <div className="mt-4 rounded-md border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Layers className="h-3.5 w-3.5" /> Padrão identificado
          </div>
          <div className="mt-1">{p.grouped.pattern}</div>
        </div>
      )}

      <section className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Denúncia</h4>
        <div className="mt-2 rounded-md border border-border bg-card p-3 text-sm">
          <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>Categoria: {p.category}</span>
            <span>Gravidade: {SEVERITY_LABELS[p.severity]}</span>
          </div>
          <p className="whitespace-pre-wrap">{p.transcript}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.attachments.map((a, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground"
              >
                {a.kind === "audio" ? (
                  <Mic className="h-3 w-3" />
                ) : a.kind === "photo" ? (
                  <Paperclip className="h-3 w-3" />
                ) : (
                  <MessageSquare className="h-3 w-3" />
                )}
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Setor sugerido pela IA</h4>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {!sectorEdit ? (
            <>
              <span className="rounded-md border border-border bg-card px-2.5 py-1 text-sm">{p.sector}</span>
              {p.sectorConfirmed ? (
                <span className="text-[11px] text-track-green">Confirmado</span>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => { onUpdate({ sectorConfirmed: true }); toast.success("Setor confirmado."); }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Confirmar
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setSectorEdit(true)}>
                    Alterar
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <input
                className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                value={newSector}
                onChange={(e) => setNewSector(e.target.value)}
              />
              <Button
                size="sm"
                onClick={() => {
                  onUpdate({ sector: newSector, sectorConfirmed: true });
                  setSectorEdit(false);
                  toast.success("Setor atualizado.");
                }}
              >
                Salvar
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSectorEdit(false)}>Cancelar</Button>
            </>
          )}
        </div>
      </section>

      <section className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Plano de ação e conclusão
        </h4>
        <Textarea
          className="mt-2"
          rows={4}
          placeholder="Descreva as medidas tomadas e o desfecho do caso…"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        />
        <div className="mt-2 flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { onUpdate({ actionPlan: plan }); toast.success("Plano salvo."); }}
          >
            Salvar plano
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.message("Anexo de relatório simulado.")}>
            <Paperclip className="h-3.5 w-3.5 mr-1" /> Anexar relatório
          </Button>
        </div>
      </section>

      <section className="mt-5 rounded-md border border-border bg-muted/40 p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs">
            <div className="font-medium">Contestações do denunciante neste mês</div>
            <div className="text-muted-foreground">CPF {p.reporterCpfMask}</div>
          </div>
          <div
            className={`text-sm font-semibold tabular-nums ${blocked ? "text-destructive" : "text-foreground"}`}
          >
            {p.contestationsThisMonth} / 3
          </div>
        </div>
        {blocked && (
          <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
            <Ban className="h-3.5 w-3.5" /> Limite de contestações atingido — bloqueio por má-fé aplicado.
          </div>
        )}
      </section>

      <section className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Histórico</h4>
        <ol className="mt-2 space-y-2 border-l border-border pl-4">
          {p.history.map((h, i) => (
            <li key={i} className="relative text-xs">
              <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" />
              <div className="text-foreground">
                <span className="font-medium">{h.actor}</span> — {h.action}
              </div>
              <div className="text-muted-foreground">{formatDateTime(h.at)}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
        {p.status !== "resolvido" && p.status !== "encerrado" && (
          <Button onClick={onResolve}>
            <Send className="h-3.5 w-3.5 mr-1.5" /> Marcar como Resolvido
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Mover para <ChevronDown className="h-3.5 w-3.5 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {STATUS_ORDER.filter((s) => s !== p.status).map((s) => (
              <DropdownMenuItem key={s} onClick={() => onMove(s)}>
                {STATUS_LABELS[s]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
}
