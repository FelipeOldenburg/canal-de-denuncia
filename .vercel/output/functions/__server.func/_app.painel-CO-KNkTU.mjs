import { i as __toESM } from "./_runtime.mjs";
import { a as SEVERITY_LABELS, c as TRACK_LABELS, f as formatDate, m as hoursUntil, n as MONTHLY_VOLUME, r as PROTOCOLS } from "./_ssr/ssr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { a as visibleProtocolsFor, i as useAuth } from "./_ssr/auth-BQ2oIRqw.mjs";
import { _ as FileExclamationPoint, b as Clock, g as Inbox, n as TriangleAlert } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-BQUw97ps.mjs";
import { t as fetchProtocols } from "./_ssr/protocols-CJhJeolS.mjs";
import { t as TrackBadge } from "./_ssr/TrackBadge-Do8DwuW0.mjs";
import { t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { a as Bar, c as Legend, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.painel-CO-KNkTU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PainelPage() {
	const { user } = useAuth();
	const canSee = visibleProtocolsFor(user);
	const { data = PROTOCOLS } = useQuery({
		queryKey: ["protocols"],
		queryFn: fetchProtocols,
		refetchInterval: 5e3
	});
	const protocols = (0, import_react.useMemo)(() => data.filter((p) => canSee(p.sector)), [data, user]);
	const open = protocols.filter((p) => p.status !== "encerrado");
	const green = open.filter((p) => p.track === "green");
	const amber = open.filter((p) => p.track === "amber");
	const overdue = open.filter((p) => hoursUntil(p.deadlineAt) < 0);
	const urgent = open.filter((p) => hoursUntil(p.deadlineAt) < 24).sort((a, b) => hoursUntil(a.deadlineAt) - hoursUntil(b.deadlineAt));
	const contested = open.filter((p) => p.contested);
	const avgResp = (arr) => {
		if (!arr.length) return 0;
		const days = arr.map((p) => (Date.now() - new Date(p.receivedAt).getTime()) / 864e5);
		return Math.round(days.reduce((a, b) => a + b, 0) / days.length * 10) / 10;
	};
	const bySector = Object.entries(protocols.reduce((acc, p) => {
		acc[p.sector] = (acc[p.sector] ?? 0) + 1;
		return acc;
	}, {})).map(([sector, count]) => ({
		sector,
		count
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Painel",
			subtitle: "Visão consolidada dos protocolos administrativos das Trilhas Verde e Amarela."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 pb-10 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "h-4 w-4" }),
							label: "Protocolos abertos",
							value: open.length,
							hint: `${green.length} verde · ${amber.length} amarela`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
							label: "Tempo médio · Verde",
							value: `${avgResp(green)}d`,
							hint: "desde o recebimento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
							label: "Tempo médio · Amarela",
							value: `${avgResp(amber)}d`,
							hint: "desde o recebimento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "h-4 w-4" }),
							label: "Vencidos",
							value: overdue.length,
							hint: "fora do prazo interno",
							tone: overdue.length > 0 ? "warn" : "default"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 rounded-lg border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold",
								children: "Volume mensal por trilha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Últimos 6 meses"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: MONTHLY_VOLUME,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										cursor: { fill: "var(--color-muted)" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "green",
										name: `Trilha ${TRACK_LABELS.green}`,
										stackId: "a",
										fill: "var(--color-track-green)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "amber",
										name: `Trilha ${TRACK_LABELS.amber}`,
										stackId: "a",
										fill: "var(--color-track-amber)"
									})
								]
							}) })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Distribuição por setor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: bySector,
								layout: "vertical",
								margin: { left: 12 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										horizontal: false,
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										allowDecimals: false,
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "sector",
										width: 80,
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "var(--color-muted)" },
										contentStyle: tooltipStyle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "count",
										fill: "var(--color-chart-3)",
										radius: [
											0,
											3,
											3,
											0
										]
									})
								]
							}) })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-5 py-4 border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-alert-orange" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold",
								children: "Ações urgentes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Prazo < 24h ou contestação pendente"
							})
						]
					}), urgent.length + contested.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-8 text-sm text-muted-foreground",
						children: "Nenhuma ação urgente no momento. Casos serão listados aqui quando o prazo interno estiver abaixo de 24 horas ou houver contestação aguardando resposta."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: [...contested, ...urgent.filter((u) => !contested.includes(u))].map((p) => {
							const h = hoursUntil(p.deadlineAt);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "px-5 py-3 flex items-center gap-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackBadge, { track: p.track }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium tabular-nums",
										children: p.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground truncate flex-1",
										children: p.transcript
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground shrink-0",
										children: p.sector
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground shrink-0",
										children: SEVERITY_LABELS[p.severity]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-xs shrink-0 ${h < 0 ? "text-destructive font-medium" : "text-alert-orange"}`,
										children: p.contested ? "Contestação" : h < 0 ? `Vencido há ${Math.abs(Math.round(h))}h` : `${Math.round(h)}h restantes`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground shrink-0 hidden md:block",
										children: formatDate(p.receivedAt)
									})
								]
							}, p.id);
						})
					})]
				})
			]
		})]
	});
}
var tooltipStyle = {
	backgroundColor: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 6,
	fontSize: 12
};
function SummaryCard({ icon, label, value, hint, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium uppercase tracking-wide",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-2 text-2xl font-semibold tabular-nums ${tone === "warn" ? "text-alert-orange" : ""}`,
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { PainelPage as component };
