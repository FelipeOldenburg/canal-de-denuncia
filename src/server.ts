import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { anonymizeReport, classifyReport } from "./lib/report-classifier";
import { DEFAULT_DEADLINES, PROTOCOLS, type Protocol, type Track } from "./lib/mock-data";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

type ChatSession = {
  mode: "menu" | "awaiting_report" | "awaiting_protocol";
  lastProtocolId?: string;
};

type IncomingMessage = {
  from: string;
  text: string;
};

const runtime = globalThis as typeof globalThis & {
  __speakProtocols?: Protocol[];
  __speakChatSessions?: Map<string, ChatSession>;
};

// ponytail: in-memory MVP; replace with Postgres/Supabase before real WhatsApp rollout.
const receivedProtocols = (runtime.__speakProtocols ??= []);
const chatSessions = (runtime.__speakChatSessions ??= new Map<string, ChatSession>());

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const apiResponse = await handleApiRequest(request, env);
      if (apiResponse) return apiResponse;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

async function handleApiRequest(request: Request, env: unknown): Promise<Response | undefined> {
  const url = new URL(request.url);

  if (url.pathname === "/api/protocols" && request.method === "GET") {
    return json({ protocols: [...receivedProtocols, ...PROTOCOLS] });
  }

  if (url.pathname === "/api/whatsapp/test" && request.method === "POST") {
    const payload = await request.json().catch(() => null) as { from?: string; message?: string } | null;
    if (!payload?.message) return json({ error: "message is required" }, 400);
    const reply = handleChatMessage(payload.from ?? "tester", payload.message);
    return json(reply);
  }

  if (url.pathname === "/api/whatsapp/webhook" && request.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token === getEnv("WHATSAPP_VERIFY_TOKEN", env, "speak-dev-token")) {
      return new Response(challenge ?? "", { status: 200, headers: { "content-type": "text/plain" } });
    }
    return new Response("Forbidden", { status: 403 });
  }

  if (url.pathname === "/api/whatsapp/webhook" && request.method === "POST") {
    const rawBody = await request.text();
    if (!(await isValidMetaSignature(rawBody, request.headers.get("x-hub-signature-256"), env))) {
      return json({ error: "invalid signature" }, 401);
    }

    const payload = JSON.parse(rawBody) as unknown;
    const replies = await Promise.all(
      extractWhatsAppMessages(payload).map(async (message) => {
        const reply = handleChatMessage(message.from, message.text);
        await sendWhatsAppText(message.from, reply.reply, env);
        return reply;
      }),
    );

    return json({ ok: true, replies });
  }
}

function handleChatMessage(from: string, text: string) {
  const session = chatSessions.get(from) ?? { mode: "menu" as const };
  const normalized = normalize(text);
  const protocolId = extractProtocolId(text);

  if (protocolId || session.mode === "awaiting_protocol") {
    const protocol = protocolId ? findProtocol(protocolId) : undefined;
    chatSessions.set(from, { mode: "menu", lastProtocolId: protocol?.id ?? session.lastProtocolId });
    return {
      reply: protocol
        ? `Protocolo ${protocol.id}: status ${protocol.status}, setor ${protocol.sector}, gravidade ${protocol.severity}.`
        : "Nao encontrei esse protocolo. Envie no formato CASO-2026-00001.",
    };
  }

  if ((normalized === "1" || normalized.includes("denuncia") || normalized.includes("relato")) && !shouldCreateReport(text)) {
    chatSessions.set(from, { mode: "awaiting_report", lastProtocolId: session.lastProtocolId });
    return {
      reply: "Descreva o que aconteceu, incluindo setor/local, data aproximada e pessoas envolvidas se desejar. Nao envie seus dados pessoais.",
    };
  }

  if (normalized === "2" || normalized.includes("acompanhar") || normalized.includes("protocolo")) {
    chatSessions.set(from, { mode: "awaiting_protocol", lastProtocolId: session.lastProtocolId });
    return { reply: "Envie o protocolo do caso, por exemplo CASO-2026-00001." };
  }

  if (session.mode === "awaiting_report" || shouldCreateReport(text)) {
    if (text.trim().length < 20) {
      chatSessions.set(from, { mode: "awaiting_report", lastProtocolId: session.lastProtocolId });
      return { reply: "Pode detalhar um pouco mais o ocorrido? Isso ajuda a classificar setor e gravidade." };
    }
    const protocol = createProtocol(text);
    chatSessions.set(from, { mode: "menu", lastProtocolId: protocol.id });
    return {
      reply: `Denuncia registrada com identidade protegida. Protocolo: ${protocol.id}. Setor sugerido: ${protocol.sector}. Gravidade: ${protocol.severity}.`,
      protocol,
    };
  }

  chatSessions.set(from, session);
  return {
    reply: "Ola. Este canal registra denuncias com identidade protegida. Responda 1 para criar denuncia ou 2 para acompanhar protocolo.",
  };
}

function createProtocol(rawText: string): Protocol {
  const transcript = anonymizeReport(rawText);
  const classification = classifyReport(transcript);
  const receivedAt = new Date().toISOString();
  const track: Track = classification.severity === "alta" || classification.severity === "critica" ? "amber" : "green";
  const deadlineAt = new Date(Date.now() + DEFAULT_DEADLINES[track] * 86400000).toISOString();
  const protocol: Protocol = {
    id: nextProtocolId(),
    track,
    status: "recebido",
    sector: classification.sector,
    aiSuggestedSector: classification.sector,
    sectorConfirmed: false,
    severity: classification.severity,
    category: classification.category,
    classificationReason: classification.reason,
    receivedAt,
    deadlineAt,
    transcript,
    attachments: [{ kind: "text", label: "Mensagem WhatsApp" }],
    reporterCpfMask: "***.***.***-**",
    contestationsThisMonth: 0,
    history: [
      { at: receivedAt, actor: "Sistema", action: "Protocolo criado via WhatsApp" },
      { at: receivedAt, actor: "Triagem automatica", action: classification.reason },
    ],
  };
  receivedProtocols.unshift(protocol);
  return protocol;
}

function nextProtocolId() {
  const year = new Date().getFullYear();
  const next = receivedProtocols.filter((p) => p.id.startsWith(`CASO-${year}-`)).length + 1;
  return `CASO-${year}-${String(next).padStart(5, "0")}`;
}

function findProtocol(id: string) {
  return [...receivedProtocols, ...PROTOCOLS].find((protocol) => protocol.id.toLowerCase() === id.toLowerCase());
}

function extractWhatsAppMessages(payload: unknown): IncomingMessage[] {
  const messages: IncomingMessage[] = [];
  for (const entry of arrayOf(recordOf(payload).entry)) {
    for (const change of arrayOf(recordOf(entry).changes)) {
      const value = recordOf(recordOf(change).value);
      for (const message of arrayOf(value.messages)) {
        const item = recordOf(message);
        const from = typeof item.from === "string" ? item.from : "";
        const text = readWhatsAppText(item);
        if (from && text) messages.push({ from, text });
      }
    }
  }
  return messages;
}

function readWhatsAppText(message: Record<string, unknown>) {
  const text = recordOf(message.text).body;
  if (typeof text === "string") return text;
  const button = recordOf(message.button).text;
  if (typeof button === "string") return button;
  const interactive = recordOf(recordOf(message.interactive).button_reply).title;
  return typeof interactive === "string" ? interactive : "";
}

async function sendWhatsAppText(to: string, body: string, env: unknown) {
  const token = getEnv("WHATSAPP_TOKEN", env);
  const phoneNumberId = getEnv("WHATSAPP_PHONE_NUMBER_ID", env);
  if (!token || !phoneNumberId) return;

  const version = getEnv("WHATSAPP_GRAPH_VERSION", env, "v25.0");
  const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { preview_url: false, body },
    }),
  });
  if (!response.ok) console.error(`WhatsApp send failed: ${response.status}`);
}

async function isValidMetaSignature(rawBody: string, signature: string | null, env: unknown) {
  const secret = getEnv("WHATSAPP_APP_SECRET", env);
  if (!secret) return true;
  if (!signature?.startsWith("sha256=")) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
  const expected = `sha256=${[...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("")}`;
  return timingSafeEqual(signature, expected);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function shouldCreateReport(text: string) {
  return text.trim().split(/\s+/).length >= 8;
}

function extractProtocolId(text: string) {
  return text.match(/\b(?:CASO-\d{4}-\d{5}|SPK-\d+)\b/i)?.[0];
}

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getEnv(key: string, env: unknown, fallback = "") {
  if (env && typeof env === "object" && key in env) {
    const value = (env as Record<string, unknown>)[key];
    if (typeof value === "string") return value;
  }
  if (typeof process !== "undefined") return process.env[key] ?? fallback;
  return fallback;
}

function recordOf(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? value as Record<string, unknown> : {};
}

function arrayOf(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
