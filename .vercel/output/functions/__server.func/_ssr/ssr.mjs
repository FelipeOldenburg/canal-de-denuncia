//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var sectors = [
	["Operações", [
		"operacao",
		"operacoes",
		"producao",
		"linha",
		"turno",
		"celula",
		"fabrica"
	]],
	["Comercial", [
		"comercial",
		"venda",
		"vendedor",
		"meta",
		"cliente"
	]],
	["Logística", [
		"logistica",
		"estoque",
		"entrega",
		"transporte",
		"motorista",
		"carga"
	]],
	["TI", [
		"ti",
		"sistema",
		"suporte",
		"backlog",
		"deploy",
		"codigo",
		"code review"
	]],
	["Financeiro", [
		"financeiro",
		"pagamento",
		"nota",
		"reembolso",
		"caixa"
	]],
	["Marketing", [
		"marketing",
		"campanha",
		"social",
		"criativo"
	]],
	["Jurídico", [
		"juridico",
		"contrato",
		"advogado",
		"legal"
	]]
];
var categories = [
	["Assedio sexual", [
		"assedio sexual",
		"importunacao",
		"toque",
		"cantada",
		"sexual"
	]],
	["Assedio moral", [
		"assedio",
		"humilh",
		"grita",
		"persegu",
		"ameaca velada",
		"constrang"
	]],
	["Discriminacao", [
		"discrimin",
		"racismo",
		"preconceito",
		"origem",
		"genero",
		"religiao"
	]],
	["Violencia ou ameaca", [
		"agressao",
		"bateu",
		"violencia",
		"ameaca",
		"arma",
		"morte"
	]],
	["Fraude ou corrupcao", [
		"fraude",
		"corrupcao",
		"propina",
		"desvio",
		"roubo"
	]],
	["Seguranca do trabalho", [
		"epi",
		"acidente",
		"risco",
		"seguranca",
		"maquina"
	]]
];
function anonymizeReport(text) {
	return text.replace(/\b[\w.%+-]+@[\w.-]+\.[a-z]{2,}\b/gi, "[email ocultado]").replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[cpf ocultado]").replace(/\b(?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?9?\d{4}[-\s]?\d{4}\b/g, "[telefone ocultado]").trim();
}
function classifyReport(text) {
	const normalized = normalize$1(text);
	const category = firstMatch(normalized, categories) ?? "Outra irregularidade";
	const sector = firstMatch(normalized, sectors) ?? "Operações";
	const severity = classifySeverity(normalized);
	return {
		category,
		sector,
		severity,
		reason: `Categoria ${category}; setor ${sector}; gravidade ${severity}.`
	};
}
function classifySeverity(text) {
	if (hasAny(text, [
		"risco imediato",
		"morte",
		"arma",
		"estupro",
		"suicid",
		"agressao fisica"
	])) return "critica";
	if (hasAny(text, [
		"assedio sexual",
		"racismo",
		"discrimin",
		"fraude",
		"corrupcao",
		"ameaca",
		"humilh",
		"persegu"
	])) return "alta";
	if (hasAny(text, [
		"recorrente",
		"repetid",
		"semanas",
		"meses",
		"conflito",
		"epi",
		"seguranca",
		"sobrecarga"
	])) return "media";
	return "baixa";
}
function firstMatch(text, entries) {
	return entries.find(([, words]) => hasAny(text, words))?.[0];
}
function hasAny(text, words) {
	return words.some((word) => text.includes(word));
}
function normalize$1(text) {
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
var STATUS_LABELS = {
	recebido: "Recebido",
	em_analise: "Em Análise",
	aguardando_colaborador: "Aguardando Resposta",
	resolvido: "Resolvido",
	contestado: "Contestado",
	encerrado: "Encerrado Definitivo"
};
var STATUS_ORDER = [
	"recebido",
	"em_analise",
	"aguardando_colaborador",
	"resolvido",
	"contestado",
	"encerrado"
];
var TRACK_LABELS = {
	green: "Verde",
	amber: "Amarela"
};
var SEVERITY_LABELS = {
	baixa: "Baixa",
	media: "Media",
	alta: "Alta",
	critica: "Critica"
};
var USERS = [
	{
		id: "u1",
		name: "Marina Alves",
		email: "marina@empresa.com",
		role: "hr_analyst",
		sector: "Operações"
	},
	{
		id: "u2",
		name: "Rafael Souza",
		email: "rafael@empresa.com",
		role: "compliance"
	},
	{
		id: "u3",
		name: "Helena Prado",
		email: "helena@empresa.com",
		role: "admin"
	},
	{
		id: "u4",
		name: "Carlos Menezes",
		email: "carlos@empresa.com",
		role: "hr_analyst",
		sector: "Comercial"
	}
];
var SECTORS = [
	{
		sector: "Operações",
		headcount: 84,
		reports6m: 14,
		turnover: 22,
		climate: 2.4
	},
	{
		sector: "Comercial",
		headcount: 46,
		reports6m: 6,
		turnover: 15,
		climate: 3.1
	},
	{
		sector: "Logística",
		headcount: 62,
		reports6m: 9,
		turnover: 19,
		climate: 2.8
	},
	{
		sector: "TI",
		headcount: 38,
		reports6m: 2,
		turnover: 8,
		climate: 4.2
	},
	{
		sector: "Financeiro",
		headcount: 22,
		reports6m: 3,
		turnover: 11,
		climate: 3.6
	},
	{
		sector: "Marketing",
		headcount: 18,
		reports6m: 1,
		turnover: 9,
		climate: 3.9
	},
	{
		sector: "Jurídico",
		headcount: 7,
		reports6m: 1,
		turnover: 5,
		climate: 4
	},
	{
		sector: "P&D",
		headcount: 6,
		reports6m: 0,
		turnover: 4,
		climate: 4.1
	}
];
function computeAlertStatus(m) {
	if (m.reports6m >= 8 && m.turnover >= 18 && m.climate <= 2.8) return "orange";
	if (m.reports6m <= 3 && m.turnover <= 12 && m.climate >= 3.5) return "none";
	return "undefined";
}
function explainAlert(m) {
	const st = computeAlertStatus(m);
	if (st === "orange") return `Este setor combina volume alto de denúncias nos últimos 6 meses (${m.reports6m}), turnover elevado (${m.turnover}%) e clima abaixo do limite de confiança no canal (${m.climate.toFixed(1)}/5). O cruzamento desses três indicadores dispara Alerta Laranja.`;
	if (st === "none") return `Indicadores dentro dos parâmetros esperados: ${m.reports6m} denúncias em 6 meses, turnover de ${m.turnover}% e clima ${m.climate.toFixed(1)}/5.`;
	return `Os indicadores não configuram nem alerta nem estado saudável de forma clara. Volume: ${m.reports6m}, turnover: ${m.turnover}%, clima: ${m.climate.toFixed(1)}/5.`;
}
var now = /* @__PURE__ */ new Date();
var iso = (daysOffset, hoursOffset = 0) => {
	const d = new Date(now);
	d.setDate(d.getDate() + daysOffset);
	d.setHours(d.getHours() + hoursOffset);
	return d.toISOString();
};
var DEFAULT_DEADLINES = {
	green: 15,
	amber: 7
};
var protoCounter = 1e3;
var p = (over) => {
	protoCounter += 1;
	const track = over.track ?? "green";
	const severity = over.severity ?? (track === "amber" ? "alta" : "media");
	const receivedAt = over.receivedAt ?? iso(-3);
	const deadlineAt = over.deadlineAt ?? new Date(new Date(receivedAt).getTime() + DEFAULT_DEADLINES[track] * 864e5).toISOString();
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
		attachments: [{
			kind: "text",
			label: "Mensagem WhatsApp"
		}],
		reporterCpfMask: "***.***.***-**",
		contestationsThisMonth: 0,
		history: [{
			at: receivedAt,
			actor: "Sistema",
			action: "Protocolo criado via WhatsApp"
		}],
		...over
	};
};
var PROTOCOLS = [
	p({
		track: "amber",
		status: "em_analise",
		sector: "Operações",
		aiSuggestedSector: "Operações",
		transcript: "Meu supervisor grita comigo na frente da equipe quase todo dia. Ontem me chamou de incompetente na reunião de turno. Já são semanas assim.",
		receivedAt: iso(-2),
		deadlineAt: iso(0, 18),
		grouped: {
			count: 4,
			pattern: "Mesmo supervisor citado em 4 relatos"
		},
		attachments: [{
			kind: "text",
			label: "Mensagem WhatsApp"
		}, {
			kind: "audio",
			label: "Áudio 1min42 (transcrito)"
		}],
		history: [
			{
				at: iso(-2),
				actor: "Sistema",
				action: "Protocolo criado via WhatsApp"
			},
			{
				at: iso(-2, 2),
				actor: "IA Speak",
				action: "Classificado como Trilha Amarela — assédio moral"
			},
			{
				at: iso(-1),
				actor: "Marina Alves",
				action: "Iniciou análise"
			}
		]
	}),
	p({
		track: "green",
		status: "recebido",
		sector: "Comercial",
		aiSuggestedSector: "Comercial",
		transcript: "Escala de plantão de fim de semana vem sendo distribuída de forma desigual há dois meses.",
		receivedAt: iso(-1)
	}),
	p({
		track: "amber",
		status: "contestado",
		sector: "Logística",
		aiSuggestedSector: "Logística",
		sectorConfirmed: true,
		contested: true,
		contestationsThisMonth: 2,
		transcript: "Fui alvo de piadas repetidas sobre minha origem por parte de dois colegas do turno da noite.",
		receivedAt: iso(-10),
		deadlineAt: iso(-2),
		actionPlan: "Conversa individual conduzida, orientação formal registrada.",
		history: [
			{
				at: iso(-10),
				actor: "Sistema",
				action: "Protocolo criado"
			},
			{
				at: iso(-9),
				actor: "Marina Alves",
				action: "Plano de ação registrado"
			},
			{
				at: iso(-3),
				actor: "Marina Alves",
				action: "Marcado como Resolvido"
			},
			{
				at: iso(-2),
				actor: "Colaborador",
				action: "Contestou o encerramento"
			}
		]
	}),
	p({
		track: "green",
		status: "aguardando_colaborador",
		sector: "Operações",
		aiSuggestedSector: "Operações",
		sectorConfirmed: true,
		transcript: "Sobrecarga: estou cobrindo função de dois colegas afastados sem previsão de reposição.",
		receivedAt: iso(-5)
	}),
	p({
		track: "amber",
		status: "em_analise",
		sector: "Operações",
		aiSuggestedSector: "Operações",
		transcript: "Comentários de cunho discriminatório recorrentes por parte de líder de célula.",
		receivedAt: iso(-4),
		grouped: {
			count: 3,
			pattern: "Mesmo líder citado em 3 relatos"
		}
	}),
	p({
		track: "green",
		status: "resolvido",
		sector: "TI",
		aiSuggestedSector: "TI",
		sectorConfirmed: true,
		transcript: "Conflito entre squads sobre priorização de backlog gerou clima ruim em reuniões.",
		receivedAt: iso(-14),
		actionPlan: "Mediação conduzida pelo tech lead, novo processo de priorização acordado."
	}),
	p({
		track: "green",
		status: "encerrado",
		sector: "Financeiro",
		aiSuggestedSector: "Financeiro",
		sectorConfirmed: true,
		transcript: "Desentendimento pontual sobre uso de sala de reunião.",
		receivedAt: iso(-30),
		actionPlan: "Redistribuição de agendas, sem reincidência em 15 dias."
	}),
	p({
		track: "amber",
		status: "recebido",
		sector: "Logística",
		aiSuggestedSector: "Logística",
		transcript: "Coordenador expõe erros de forma humilhante em grupo de WhatsApp da equipe.",
		receivedAt: iso(0, -4),
		deadlineAt: iso(0, 20)
	}),
	p({
		track: "green",
		status: "em_analise",
		sector: "Comercial",
		aiSuggestedSector: "Comercial",
		transcript: "Metas revisadas no meio do trimestre sem comunicação prévia à equipe.",
		receivedAt: iso(-6)
	}),
	p({
		track: "green",
		status: "aguardando_colaborador",
		sector: "Marketing",
		aiSuggestedSector: "Marketing",
		transcript: "Sobrecarga em campanhas simultâneas sem redistribuição.",
		receivedAt: iso(-4)
	}),
	p({
		track: "amber",
		status: "resolvido",
		sector: "Operações",
		aiSuggestedSector: "Operações",
		transcript: "Tratamento diferenciado a colaboradores por afinidade pessoal do gestor.",
		receivedAt: iso(-12),
		actionPlan: "Treinamento obrigatório de liderança inclusiva agendado."
	}),
	p({
		track: "green",
		status: "encerrado",
		sector: "TI",
		aiSuggestedSector: "TI",
		transcript: "Comunicação áspera em code review.",
		receivedAt: iso(-45),
		actionPlan: "Guia de code review revisto, workshop conduzido."
	}),
	p({
		track: "amber",
		status: "em_analise",
		sector: "Comercial",
		aiSuggestedSector: "Operações",
		transcript: "Pressão desmedida por resultados com ameaças veladas de demissão.",
		receivedAt: iso(-3)
	}),
	p({
		track: "green",
		status: "recebido",
		sector: "Logística",
		aiSuggestedSector: "Logística",
		transcript: "Falta de EPI adequado gerando cobrança sobre quem se recusa a operar.",
		receivedAt: iso(-1, -6)
	})
];
var MONTHLY_VOLUME = [
	{
		month: "Jan",
		green: 6,
		amber: 3
	},
	{
		month: "Fev",
		green: 8,
		amber: 4
	},
	{
		month: "Mar",
		green: 5,
		amber: 6
	},
	{
		month: "Abr",
		green: 9,
		amber: 5
	},
	{
		month: "Mai",
		green: 7,
		amber: 8
	},
	{
		month: "Jun",
		green: 10,
		amber: 6
	}
];
var AUDIT = [
	{
		id: "a1",
		at: iso(-15),
		user: "Helena Prado",
		role: "admin",
		action: "Criou usuário",
		target: "carlos@empresa.com"
	},
	{
		id: "a2",
		at: iso(-14),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Visualizou protocolo",
		target: "SPK-1001"
	},
	{
		id: "a3",
		at: iso(-14),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Registrou plano de ação",
		target: "SPK-1003"
	},
	{
		id: "a4",
		at: iso(-13),
		user: "Rafael Souza",
		role: "compliance",
		action: "Exportou relatório CSV",
		target: "Trilha Amarela / Mai"
	},
	{
		id: "a5",
		at: iso(-12),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Marcou como Resolvido",
		target: "SPK-1003"
	},
	{
		id: "a6",
		at: iso(-11),
		user: "Sistema",
		role: "admin",
		action: "Notificação simulada",
		target: "Colaborador SPK-1003"
	},
	{
		id: "a7",
		at: iso(-10),
		user: "Colaborador",
		role: "hr_analyst",
		action: "Contestação registrada",
		target: "SPK-1003"
	},
	{
		id: "a8",
		at: iso(-10),
		user: "Rafael Souza",
		role: "compliance",
		action: "Reatribuiu caso",
		target: "SPK-1003"
	},
	{
		id: "a9",
		at: iso(-9),
		user: "Helena Prado",
		role: "admin",
		action: "Alterou prazo Trilha Verde",
		target: "15 dias"
	},
	{
		id: "a10",
		at: iso(-8),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Confirmou setor sugerido",
		target: "SPK-1002"
	},
	{
		id: "a11",
		at: iso(-7),
		user: "Rafael Souza",
		role: "compliance",
		action: "Visualizou Termômetro",
		target: "Setor Operações"
	},
	{
		id: "a12",
		at: iso(-6),
		user: "Carlos Menezes",
		role: "hr_analyst",
		action: "Iniciou análise",
		target: "SPK-1009"
	},
	{
		id: "a13",
		at: iso(-5),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Anexou relatório",
		target: "SPK-1006"
	},
	{
		id: "a14",
		at: iso(-4),
		user: "Helena Prado",
		role: "admin",
		action: "Alterou limite de amostra",
		target: "10 colaboradores"
	},
	{
		id: "a15",
		at: iso(-3),
		user: "Rafael Souza",
		role: "compliance",
		action: "Exportou relatório PDF",
		target: "Consolidado Jun"
	},
	{
		id: "a16",
		at: iso(-3),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Alterou status",
		target: "SPK-1002 → Em Análise"
	},
	{
		id: "a17",
		at: iso(-2),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Iniciou análise",
		target: "SPK-1002"
	},
	{
		id: "a18",
		at: iso(-2),
		user: "Sistema",
		role: "admin",
		action: "Agrupamento detectado",
		target: "SPK-1002 (4 relatos)"
	},
	{
		id: "a19",
		at: iso(-1),
		user: "Carlos Menezes",
		role: "hr_analyst",
		action: "Visualizou protocolo",
		target: "SPK-1013"
	},
	{
		id: "a20",
		at: iso(-1),
		user: "Rafael Souza",
		role: "compliance",
		action: "Adicionou observação",
		target: "SPK-1008"
	},
	{
		id: "a21",
		at: iso(0, -2),
		user: "Marina Alves",
		role: "hr_analyst",
		action: "Visualizou Kanban",
		target: "Todas as colunas"
	}
];
function hoursUntil(iso) {
	return (new Date(iso).getTime() - Date.now()) / 36e5;
}
function formatDate(iso) {
	return new Date(iso).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});
}
function formatDateTime(iso) {
	return new Date(iso).toLocaleString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
var serverEntryPromise;
var runtime = globalThis;
var receivedProtocols = runtime.__speakProtocols ??= [];
var chatSessions = runtime.__speakChatSessions ??= /* @__PURE__ */ new Map();
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-DZkC90v4.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const apiResponse = await handleApiRequest(request, env);
		if (apiResponse) return apiResponse;
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
async function handleApiRequest(request, env) {
	const url = new URL(request.url);
	if (url.pathname === "/api/protocols" && request.method === "GET") return json({ protocols: [...receivedProtocols, ...PROTOCOLS] });
	if (url.pathname === "/api/whatsapp/test" && request.method === "POST") {
		const payload = await request.json().catch(() => null);
		if (!payload?.message) return json({ error: "message is required" }, 400);
		return json(handleChatMessage(payload.from ?? "tester", payload.message));
	}
	if (url.pathname === "/api/whatsapp/webhook" && request.method === "GET") {
		const mode = url.searchParams.get("hub.mode");
		const token = url.searchParams.get("hub.verify_token");
		const challenge = url.searchParams.get("hub.challenge");
		if (mode === "subscribe" && token === getEnv("WHATSAPP_VERIFY_TOKEN", env, "speak-dev-token")) return new Response(challenge ?? "", {
			status: 200,
			headers: { "content-type": "text/plain" }
		});
		return new Response("Forbidden", { status: 403 });
	}
	if (url.pathname === "/api/whatsapp/webhook" && request.method === "POST") {
		const rawBody = await request.text();
		if (!await isValidMetaSignature(rawBody, request.headers.get("x-hub-signature-256"), env)) return json({ error: "invalid signature" }, 401);
		const payload = JSON.parse(rawBody);
		return json({
			ok: true,
			replies: await Promise.all(extractWhatsAppMessages(payload).map(async (message) => {
				const reply = handleChatMessage(message.from, message.text);
				await sendWhatsAppText(message.from, reply.reply, env);
				return reply;
			}))
		});
	}
}
function handleChatMessage(from, text) {
	const session = chatSessions.get(from) ?? { mode: "menu" };
	const normalized = normalize(text);
	const protocolId = extractProtocolId(text);
	if (protocolId || session.mode === "awaiting_protocol") {
		const protocol = protocolId ? findProtocol(protocolId) : void 0;
		chatSessions.set(from, {
			mode: "menu",
			lastProtocolId: protocol?.id ?? session.lastProtocolId
		});
		return { reply: protocol ? `Protocolo ${protocol.id}: status ${protocol.status}, setor ${protocol.sector}, gravidade ${protocol.severity}.` : "Nao encontrei esse protocolo. Envie no formato CASO-2026-00001." };
	}
	if ((normalized === "1" || normalized.includes("denuncia") || normalized.includes("relato")) && !shouldCreateReport(text)) {
		chatSessions.set(from, {
			mode: "awaiting_report",
			lastProtocolId: session.lastProtocolId
		});
		return { reply: "Descreva o que aconteceu, incluindo setor/local, data aproximada e pessoas envolvidas se desejar. Nao envie seus dados pessoais." };
	}
	if (normalized === "2" || normalized.includes("acompanhar") || normalized.includes("protocolo")) {
		chatSessions.set(from, {
			mode: "awaiting_protocol",
			lastProtocolId: session.lastProtocolId
		});
		return { reply: "Envie o protocolo do caso, por exemplo CASO-2026-00001." };
	}
	if (session.mode === "awaiting_report" || shouldCreateReport(text)) {
		if (text.trim().length < 20) {
			chatSessions.set(from, {
				mode: "awaiting_report",
				lastProtocolId: session.lastProtocolId
			});
			return { reply: "Pode detalhar um pouco mais o ocorrido? Isso ajuda a classificar setor e gravidade." };
		}
		const protocol = createProtocol(text);
		chatSessions.set(from, {
			mode: "menu",
			lastProtocolId: protocol.id
		});
		return {
			reply: `Denuncia registrada com identidade protegida. Protocolo: ${protocol.id}. Setor sugerido: ${protocol.sector}. Gravidade: ${protocol.severity}.`,
			protocol
		};
	}
	chatSessions.set(from, session);
	return { reply: "Ola. Este canal registra denuncias com identidade protegida. Responda 1 para criar denuncia ou 2 para acompanhar protocolo." };
}
function createProtocol(rawText) {
	const transcript = anonymizeReport(rawText);
	const classification = classifyReport(transcript);
	const receivedAt = (/* @__PURE__ */ new Date()).toISOString();
	const track = classification.severity === "alta" || classification.severity === "critica" ? "amber" : "green";
	const deadlineAt = new Date(Date.now() + DEFAULT_DEADLINES[track] * 864e5).toISOString();
	const protocol = {
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
		attachments: [{
			kind: "text",
			label: "Mensagem WhatsApp"
		}],
		reporterCpfMask: "***.***.***-**",
		contestationsThisMonth: 0,
		history: [{
			at: receivedAt,
			actor: "Sistema",
			action: "Protocolo criado via WhatsApp"
		}, {
			at: receivedAt,
			actor: "Triagem automatica",
			action: classification.reason
		}]
	};
	receivedProtocols.unshift(protocol);
	return protocol;
}
function nextProtocolId() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const next = receivedProtocols.filter((p) => p.id.startsWith(`CASO-${year}-`)).length + 1;
	return `CASO-${year}-${String(next).padStart(5, "0")}`;
}
function findProtocol(id) {
	return [...receivedProtocols, ...PROTOCOLS].find((protocol) => protocol.id.toLowerCase() === id.toLowerCase());
}
function extractWhatsAppMessages(payload) {
	const messages = [];
	for (const entry of arrayOf(recordOf(payload).entry)) for (const change of arrayOf(recordOf(entry).changes)) {
		const value = recordOf(recordOf(change).value);
		for (const message of arrayOf(value.messages)) {
			const item = recordOf(message);
			const from = typeof item.from === "string" ? item.from : "";
			const text = readWhatsAppText(item);
			if (from && text) messages.push({
				from,
				text
			});
		}
	}
	return messages;
}
function readWhatsAppText(message) {
	const text = recordOf(message.text).body;
	if (typeof text === "string") return text;
	const button = recordOf(message.button).text;
	if (typeof button === "string") return button;
	const interactive = recordOf(recordOf(message.interactive).button_reply).title;
	return typeof interactive === "string" ? interactive : "";
}
async function sendWhatsAppText(to, body, env) {
	const token = getEnv("WHATSAPP_TOKEN", env);
	const phoneNumberId = getEnv("WHATSAPP_PHONE_NUMBER_ID", env);
	if (!token || !phoneNumberId) return;
	const version = getEnv("WHATSAPP_GRAPH_VERSION", env, "v25.0");
	const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
		method: "POST",
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json"
		},
		body: JSON.stringify({
			messaging_product: "whatsapp",
			to,
			type: "text",
			text: {
				preview_url: false,
				body
			}
		})
	});
	if (!response.ok) console.error(`WhatsApp send failed: ${response.status}`);
}
async function isValidMetaSignature(rawBody, signature, env) {
	const secret = getEnv("WHATSAPP_APP_SECRET", env);
	if (!secret) return true;
	if (!signature?.startsWith("sha256=")) return false;
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
	return timingSafeEqual(signature, `sha256=${[...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("")}`);
}
function timingSafeEqual(a, b) {
	if (a.length !== b.length) return false;
	let mismatch = 0;
	for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return mismatch === 0;
}
function shouldCreateReport(text) {
	return text.trim().split(/\s+/).length >= 8;
}
function extractProtocolId(text) {
	return text.match(/\b(?:CASO-\d{4}-\d{5}|SPK-\d+)\b/i)?.[0];
}
function normalize(text) {
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function getEnv(key, env, fallback = "") {
	if (env && typeof env === "object" && key in env) {
		const value = env[key];
		if (typeof value === "string") return value;
	}
	if (typeof process !== "undefined") return process.env[key] ?? fallback;
	return fallback;
}
function recordOf(value) {
	return value && typeof value === "object" ? value : {};
}
function arrayOf(value) {
	return Array.isArray(value) ? value : [];
}
function json(payload, status = 200) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: { "content-type": "application/json; charset=utf-8" }
	});
}
//#endregion
export { SEVERITY_LABELS as a, TRACK_LABELS as c, explainAlert as d, server_default as default, formatDate as f, renderErrorPage as h, SECTORS as i, USERS as l, hoursUntil as m, MONTHLY_VOLUME as n, STATUS_LABELS as o, formatDateTime as p, PROTOCOLS as r, STATUS_ORDER as s, AUDIT as t, computeAlertStatus as u };
