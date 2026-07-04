// Mock data store for Speak — internal reporting management panel.
// Structured to allow a future "red" (criminal) track with stricter rules.

export type Track = "green" | "amber"; // future: | "red"
export type Role = "hr_analyst" | "compliance" | "admin";
export type Severity = "baixa" | "media" | "alta" | "critica";

export type ProtocolStatus =
  | "recebido"
  | "em_analise"
  | "aguardando_colaborador"
  | "resolvido"
  | "contestado"
  | "encerrado";

export const STATUS_LABELS: Record<ProtocolStatus, string> = {
  recebido: "Recebido",
  em_analise: "Em Análise",
  aguardando_colaborador: "Aguardando Resposta",
  resolvido: "Resolvido",
  contestado: "Contestado",
  encerrado: "Encerrado Definitivo",
};

export const STATUS_ORDER: ProtocolStatus[] = [
  "recebido",
  "em_analise",
  "aguardando_colaborador",
  "resolvido",
  "contestado",
  "encerrado",
];

export const TRACK_LABELS: Record<Track, string> = {
  green: "Verde",
  amber: "Amarela",
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  baixa: "Baixa",
  media: "Media",
  alta: "Alta",
  critica: "Critica",
};

export interface HistoryEvent {
  at: string; // ISO
  actor: string;
  action: string;
}

export interface Attachment {
  kind: "text" | "audio" | "photo";
  label: string;
}

export interface Protocol {
  id: string;
  track: Track;
  status: ProtocolStatus;
  sector: string;
  aiSuggestedSector: string;
  sectorConfirmed: boolean;
  severity: Severity;
  category: string;
  classificationReason?: string;
  receivedAt: string;
  deadlineAt: string;
  transcript: string;
  attachments: Attachment[];
  grouped?: { count: number; pattern: string };
  contested?: boolean;
  reporterCpfMask: string; // masked
  contestationsThisMonth: number;
  actionPlan?: string;
  history: HistoryEvent[];
  assignedTo?: string;
}

export interface SectorMetrics {
  sector: string;
  headcount: number;
  reports6m: number;
  turnover: number; // %
  climate: number; // 1-5
}

export interface AuditEvent {
  id: string;
  at: string;
  user: string;
  role: Role;
  action: string;
  target: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  sector?: string;
}

// -- Users -------------------------------------------------------------------
export const USERS: AppUser[] = [
  { id: "u1", name: "Marina Alves", email: "marina@empresa.com", role: "hr_analyst", sector: "Operações" },
  { id: "u2", name: "Rafael Souza", email: "rafael@empresa.com", role: "compliance" },
  { id: "u3", name: "Helena Prado", email: "helena@empresa.com", role: "admin" },
  { id: "u4", name: "Carlos Menezes", email: "carlos@empresa.com", role: "hr_analyst", sector: "Comercial" },
];

// -- Sectors -----------------------------------------------------------------
export const SECTORS: SectorMetrics[] = [
  { sector: "Operações", headcount: 84, reports6m: 14, turnover: 22, climate: 2.4 },
  { sector: "Comercial", headcount: 46, reports6m: 6, turnover: 15, climate: 3.1 },
  { sector: "Logística", headcount: 62, reports6m: 9, turnover: 19, climate: 2.8 },
  { sector: "TI", headcount: 38, reports6m: 2, turnover: 8, climate: 4.2 },
  { sector: "Financeiro", headcount: 22, reports6m: 3, turnover: 11, climate: 3.6 },
  { sector: "Marketing", headcount: 18, reports6m: 1, turnover: 9, climate: 3.9 },
  { sector: "Jurídico", headcount: 7, reports6m: 1, turnover: 5, climate: 4.0 }, // <10 -> grouped
  { sector: "P&D", headcount: 6, reports6m: 0, turnover: 4, climate: 4.1 }, // <10 -> grouped
];

export function computeAlertStatus(m: SectorMetrics): "orange" | "none" | "undefined" {
  if (m.reports6m >= 8 && m.turnover >= 18 && m.climate <= 2.8) return "orange";
  if (m.reports6m <= 3 && m.turnover <= 12 && m.climate >= 3.5) return "none";
  return "undefined";
}

export function explainAlert(m: SectorMetrics): string {
  const st = computeAlertStatus(m);
  if (st === "orange")
    return `Este setor combina volume alto de denúncias nos últimos 6 meses (${m.reports6m}), turnover elevado (${m.turnover}%) e clima abaixo do limite de confiança no canal (${m.climate.toFixed(1)}/5). O cruzamento desses três indicadores dispara Alerta Laranja.`;
  if (st === "none")
    return `Indicadores dentro dos parâmetros esperados: ${m.reports6m} denúncias em 6 meses, turnover de ${m.turnover}% e clima ${m.climate.toFixed(1)}/5.`;
  return `Os indicadores não configuram nem alerta nem estado saudável de forma clara. Volume: ${m.reports6m}, turnover: ${m.turnover}%, clima: ${m.climate.toFixed(1)}/5.`;
}

// -- Protocols ---------------------------------------------------------------
const now = new Date();
const iso = (daysOffset: number, hoursOffset = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() + daysOffset);
  d.setHours(d.getHours() + hoursOffset);
  return d.toISOString();
};

export const DEFAULT_DEADLINES: Record<Track, number> = { green: 15, amber: 7 };

let protoCounter = 1000;
const p = (over: Partial<Protocol>): Protocol => {
  protoCounter += 1;
  const track = over.track ?? "green";
  const severity = over.severity ?? (track === "amber" ? "alta" : "media");
  const receivedAt = over.receivedAt ?? iso(-3);
  const deadlineAt =
    over.deadlineAt ??
    new Date(new Date(receivedAt).getTime() + DEFAULT_DEADLINES[track] * 86400000).toISOString();
  return {
    id: `SPK-${protoCounter}`,
    track,
    status: "recebido",
    sector: "Operações",
    aiSuggestedSector: "Operações",
    sectorConfirmed: false,
    severity,
    category: "Outra irregularidade",
    receivedAt,
    deadlineAt,
    transcript: "",
    attachments: [{ kind: "text", label: "Mensagem WhatsApp" }],
    reporterCpfMask: "***.***.***-**",
    contestationsThisMonth: 0,
    history: [{ at: receivedAt, actor: "Sistema", action: "Protocolo criado via WhatsApp" }],
    ...over,
  };
};

export const PROTOCOLS: Protocol[] = [
  p({
    track: "amber",
    status: "em_analise",
    sector: "Operações",
    aiSuggestedSector: "Operações",
    transcript:
      "Meu supervisor grita comigo na frente da equipe quase todo dia. Ontem me chamou de incompetente na reunião de turno. Já são semanas assim.",
    receivedAt: iso(-2),
    deadlineAt: iso(0, 18), // <24h
    grouped: { count: 4, pattern: "Mesmo supervisor citado em 4 relatos" },
    attachments: [
      { kind: "text", label: "Mensagem WhatsApp" },
      { kind: "audio", label: "Áudio 1min42 (transcrito)" },
    ],
    history: [
      { at: iso(-2), actor: "Sistema", action: "Protocolo criado via WhatsApp" },
      { at: iso(-2, 2), actor: "IA Speak", action: "Classificado como Trilha Amarela — assédio moral" },
      { at: iso(-1), actor: "Marina Alves", action: "Iniciou análise" },
    ],
  }),
  p({
    track: "green",
    status: "recebido",
    sector: "Comercial",
    aiSuggestedSector: "Comercial",
    transcript: "Escala de plantão de fim de semana vem sendo distribuída de forma desigual há dois meses.",
    receivedAt: iso(-1),
  }),
  p({
    track: "amber",
    status: "contestado",
    sector: "Logística",
    aiSuggestedSector: "Logística",
    sectorConfirmed: true,
    contested: true,
    contestationsThisMonth: 2,
    transcript:
      "Fui alvo de piadas repetidas sobre minha origem por parte de dois colegas do turno da noite.",
    receivedAt: iso(-10),
    deadlineAt: iso(-2),
    actionPlan: "Conversa individual conduzida, orientação formal registrada.",
    history: [
      { at: iso(-10), actor: "Sistema", action: "Protocolo criado" },
      { at: iso(-9), actor: "Marina Alves", action: "Plano de ação registrado" },
      { at: iso(-3), actor: "Marina Alves", action: "Marcado como Resolvido" },
      { at: iso(-2), actor: "Colaborador", action: "Contestou o encerramento" },
    ],
  }),
  p({
    track: "green",
    status: "aguardando_colaborador",
    sector: "Operações",
    aiSuggestedSector: "Operações",
    sectorConfirmed: true,
    transcript: "Sobrecarga: estou cobrindo função de dois colegas afastados sem previsão de reposição.",
    receivedAt: iso(-5),
  }),
  p({
    track: "amber",
    status: "em_analise",
    sector: "Operações",
    aiSuggestedSector: "Operações",
    transcript: "Comentários de cunho discriminatório recorrentes por parte de líder de célula.",
    receivedAt: iso(-4),
    grouped: { count: 3, pattern: "Mesmo líder citado em 3 relatos" },
  }),
  p({
    track: "green",
    status: "resolvido",
    sector: "TI",
    aiSuggestedSector: "TI",
    sectorConfirmed: true,
    transcript: "Conflito entre squads sobre priorização de backlog gerou clima ruim em reuniões.",
    receivedAt: iso(-14),
    actionPlan: "Mediação conduzida pelo tech lead, novo processo de priorização acordado.",
  }),
  p({
    track: "green",
    status: "encerrado",
    sector: "Financeiro",
    aiSuggestedSector: "Financeiro",
    sectorConfirmed: true,
    transcript: "Desentendimento pontual sobre uso de sala de reunião.",
    receivedAt: iso(-30),
    actionPlan: "Redistribuição de agendas, sem reincidência em 15 dias.",
  }),
  p({
    track: "amber",
    status: "recebido",
    sector: "Logística",
    aiSuggestedSector: "Logística",
    transcript: "Coordenador expõe erros de forma humilhante em grupo de WhatsApp da equipe.",
    receivedAt: iso(0, -4),
    deadlineAt: iso(0, 20), // <24h remaining
  }),
  p({
    track: "green",
    status: "em_analise",
    sector: "Comercial",
    aiSuggestedSector: "Comercial",
    transcript: "Metas revisadas no meio do trimestre sem comunicação prévia à equipe.",
    receivedAt: iso(-6),
  }),
  p({
    track: "green",
    status: "aguardando_colaborador",
    sector: "Marketing",
    aiSuggestedSector: "Marketing",
    transcript: "Sobrecarga em campanhas simultâneas sem redistribuição.",
    receivedAt: iso(-4),
  }),
  p({
    track: "amber",
    status: "resolvido",
    sector: "Operações",
    aiSuggestedSector: "Operações",
    transcript: "Tratamento diferenciado a colaboradores por afinidade pessoal do gestor.",
    receivedAt: iso(-12),
    actionPlan: "Treinamento obrigatório de liderança inclusiva agendado.",
  }),
  p({
    track: "green",
    status: "encerrado",
    sector: "TI",
    aiSuggestedSector: "TI",
    transcript: "Comunicação áspera em code review.",
    receivedAt: iso(-45),
    actionPlan: "Guia de code review revisto, workshop conduzido.",
  }),
  p({
    track: "amber",
    status: "em_analise",
    sector: "Comercial",
    aiSuggestedSector: "Operações",
    transcript: "Pressão desmedida por resultados com ameaças veladas de demissão.",
    receivedAt: iso(-3),
  }),
  p({
    track: "green",
    status: "recebido",
    sector: "Logística",
    aiSuggestedSector: "Logística",
    transcript: "Falta de EPI adequado gerando cobrança sobre quem se recusa a operar.",
    receivedAt: iso(-1, -6),
  }),
];

// -- Monthly volume ----------------------------------------------------------
export const MONTHLY_VOLUME = [
  { month: "Jan", green: 6, amber: 3 },
  { month: "Fev", green: 8, amber: 4 },
  { month: "Mar", green: 5, amber: 6 },
  { month: "Abr", green: 9, amber: 5 },
  { month: "Mai", green: 7, amber: 8 },
  { month: "Jun", green: 10, amber: 6 },
];

// -- Audit log ---------------------------------------------------------------
export const AUDIT: AuditEvent[] = [
  { id: "a1", at: iso(-15), user: "Helena Prado", role: "admin", action: "Criou usuário", target: "carlos@empresa.com" },
  { id: "a2", at: iso(-14), user: "Marina Alves", role: "hr_analyst", action: "Visualizou protocolo", target: "SPK-1001" },
  { id: "a3", at: iso(-14), user: "Marina Alves", role: "hr_analyst", action: "Registrou plano de ação", target: "SPK-1003" },
  { id: "a4", at: iso(-13), user: "Rafael Souza", role: "compliance", action: "Exportou relatório CSV", target: "Trilha Amarela / Mai" },
  { id: "a5", at: iso(-12), user: "Marina Alves", role: "hr_analyst", action: "Marcou como Resolvido", target: "SPK-1003" },
  { id: "a6", at: iso(-11), user: "Sistema", role: "admin", action: "Notificação simulada", target: "Colaborador SPK-1003" },
  { id: "a7", at: iso(-10), user: "Colaborador", role: "hr_analyst", action: "Contestação registrada", target: "SPK-1003" },
  { id: "a8", at: iso(-10), user: "Rafael Souza", role: "compliance", action: "Reatribuiu caso", target: "SPK-1003" },
  { id: "a9", at: iso(-9), user: "Helena Prado", role: "admin", action: "Alterou prazo Trilha Verde", target: "15 dias" },
  { id: "a10", at: iso(-8), user: "Marina Alves", role: "hr_analyst", action: "Confirmou setor sugerido", target: "SPK-1002" },
  { id: "a11", at: iso(-7), user: "Rafael Souza", role: "compliance", action: "Visualizou Termômetro", target: "Setor Operações" },
  { id: "a12", at: iso(-6), user: "Carlos Menezes", role: "hr_analyst", action: "Iniciou análise", target: "SPK-1009" },
  { id: "a13", at: iso(-5), user: "Marina Alves", role: "hr_analyst", action: "Anexou relatório", target: "SPK-1006" },
  { id: "a14", at: iso(-4), user: "Helena Prado", role: "admin", action: "Alterou limite de amostra", target: "10 colaboradores" },
  { id: "a15", at: iso(-3), user: "Rafael Souza", role: "compliance", action: "Exportou relatório PDF", target: "Consolidado Jun" },
  { id: "a16", at: iso(-3), user: "Marina Alves", role: "hr_analyst", action: "Alterou status", target: "SPK-1002 → Em Análise" },
  { id: "a17", at: iso(-2), user: "Marina Alves", role: "hr_analyst", action: "Iniciou análise", target: "SPK-1002" },
  { id: "a18", at: iso(-2), user: "Sistema", role: "admin", action: "Agrupamento detectado", target: "SPK-1002 (4 relatos)" },
  { id: "a19", at: iso(-1), user: "Carlos Menezes", role: "hr_analyst", action: "Visualizou protocolo", target: "SPK-1013" },
  { id: "a20", at: iso(-1), user: "Rafael Souza", role: "compliance", action: "Adicionou observação", target: "SPK-1008" },
  { id: "a21", at: iso(0, -2), user: "Marina Alves", role: "hr_analyst", action: "Visualizou Kanban", target: "Todas as colunas" },
];

// -- Helpers -----------------------------------------------------------------
export function hoursUntil(iso: string): number {
  return (new Date(iso).getTime() - Date.now()) / 3600000;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}
