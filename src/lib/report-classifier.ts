import type { Severity } from "./mock-data";

export interface ReportClassification {
  category: string;
  sector: string;
  severity: Severity;
  reason: string;
}

const sectors = [
  ["Operações", ["operacao", "operacoes", "producao", "linha", "turno", "celula", "fabrica"]],
  ["Comercial", ["comercial", "venda", "vendedor", "meta", "cliente"]],
  ["Logística", ["logistica", "estoque", "entrega", "transporte", "motorista", "carga"]],
  ["TI", ["ti", "sistema", "suporte", "backlog", "deploy", "codigo", "code review"]],
  ["Financeiro", ["financeiro", "pagamento", "nota", "reembolso", "caixa"]],
  ["Marketing", ["marketing", "campanha", "social", "criativo"]],
  ["Jurídico", ["juridico", "contrato", "advogado", "legal"]],
] as const;

const categories = [
  ["Assedio sexual", ["assedio sexual", "importunacao", "toque", "cantada", "sexual"]],
  ["Assedio moral", ["assedio", "humilh", "grita", "persegu", "ameaca velada", "constrang"]],
  ["Discriminacao", ["discrimin", "racismo", "preconceito", "origem", "genero", "religiao"]],
  ["Violencia ou ameaca", ["agressao", "bateu", "violencia", "ameaca", "arma", "morte"]],
  ["Fraude ou corrupcao", ["fraude", "corrupcao", "propina", "desvio", "roubo"]],
  ["Seguranca do trabalho", ["epi", "acidente", "risco", "seguranca", "maquina"]],
] as const;

export function anonymizeReport(text: string): string {
  return text
    .replace(/\b[\w.%+-]+@[\w.-]+\.[a-z]{2,}\b/gi, "[email ocultado]")
    .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[cpf ocultado]")
    .replace(/\b(?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?9?\d{4}[-\s]?\d{4}\b/g, "[telefone ocultado]")
    .trim();
}

export function classifyReport(text: string): ReportClassification {
  const normalized = normalize(text);
  const category = firstMatch(normalized, categories) ?? "Outra irregularidade";
  const sector = firstMatch(normalized, sectors) ?? "Operações";
  const severity = classifySeverity(normalized);

  return {
    category,
    sector,
    severity,
    reason: `Categoria ${category}; setor ${sector}; gravidade ${severity}.`,
  };
}

function classifySeverity(text: string): Severity {
  if (hasAny(text, ["risco imediato", "morte", "arma", "estupro", "suicid", "agressao fisica"])) return "critica";
  if (hasAny(text, ["assedio sexual", "racismo", "discrimin", "fraude", "corrupcao", "ameaca", "humilh", "persegu"])) {
    return "alta";
  }
  if (hasAny(text, ["recorrente", "repetid", "semanas", "meses", "conflito", "epi", "seguranca", "sobrecarga"])) {
    return "media";
  }
  return "baixa";
}

function firstMatch<const T extends readonly [string, readonly string[]][]>(
  text: string,
  entries: T,
): T[number][0] | undefined {
  return entries.find(([, words]) => hasAny(text, words))?.[0];
}

function hasAny(text: string, words: readonly string[]) {
  return words.some((word) => text.includes(word));
}

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function demo() {
  const result = classifyReport("Meu supervisor me humilha toda semana no setor de producao.");
  console.assert(result.sector === "Operações");
  console.assert(result.severity === "alta");
}
