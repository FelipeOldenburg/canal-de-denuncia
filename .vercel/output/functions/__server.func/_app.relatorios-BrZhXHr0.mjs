import { i as __toESM } from "./_runtime.mjs";
import { c as TRACK_LABELS, f as formatDate, o as STATUS_LABELS, p as formatDateTime, r as PROTOCOLS, t as AUDIT } from "./_ssr/ssr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { a as visibleProtocolsFor, i as useAuth, n as ROLE_LABELS } from "./_ssr/auth-BQ2oIRqw.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-PJVP9td7.mjs";
import { y as Download } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-BQUw97ps.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as TrackBadge } from "./_ssr/TrackBadge-Do8DwuW0.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "./_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.relatorios-BrZhXHr0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function RelatoriosPage() {
	const { user } = useAuth();
	const canSee = visibleProtocolsFor(user);
	const [period, setPeriod] = (0, import_react.useState)("90");
	const [track, setTrack] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sector, setSector] = (0, import_react.useState)("all");
	const sectors = (0, import_react.useMemo)(() => Array.from(new Set(PROTOCOLS.map((p) => p.sector))), []);
	const filtered = (0, import_react.useMemo)(() => {
		const cutoff = period === "all" ? 0 : Date.now() - Number(period) * 864e5;
		return PROTOCOLS.filter((p) => canSee(p.sector)).filter((p) => period === "all" ? true : new Date(p.receivedAt).getTime() >= cutoff).filter((p) => track === "all" ? true : p.track === track).filter((p) => status === "all" ? true : p.status === status).filter((p) => sector === "all" ? true : p.sector === sector);
	}, [
		period,
		track,
		status,
		sector,
		user
	]);
	const exportCsv = () => {
		const csv = [[
			"ID",
			"Trilha",
			"Status",
			"Setor",
			"Recebido",
			"Prazo",
			"Contestado"
		], ...filtered.map((p) => [
			p.id,
			TRACK_LABELS[p.track],
			STATUS_LABELS[p.status],
			p.sector,
			formatDate(p.receivedAt),
			formatDate(p.deadlineAt),
			p.contested ? "Sim" : "Não"
		])].map((r) => r.map((v) => `"${String(v).replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `speak-relatorio-${Date.now()}.csv`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("CSV exportado.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Relatórios e Auditoria",
			subtitle: "Consulta consolidada de protocolos e histórico de ações."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "relatorios",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "relatorios",
						children: "Relatórios"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "auditoria",
						children: "Trilha de Auditoria"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "relatorios",
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-4 flex flex-wrap gap-3 items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
									label: "Período",
									value: period,
									onChange: (v) => setPeriod(v),
									options: [
										{
											value: "30",
											label: "30 dias"
										},
										{
											value: "90",
											label: "90 dias"
										},
										{
											value: "180",
											label: "6 meses"
										},
										{
											value: "all",
											label: "Tudo"
										}
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
									label: "Trilha",
									value: track,
									onChange: (v) => setTrack(v),
									options: [
										{
											value: "all",
											label: "Todas"
										},
										{
											value: "green",
											label: "Verde"
										},
										{
											value: "amber",
											label: "Amarela"
										}
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
									label: "Status",
									value: status,
									onChange: (v) => setStatus(v),
									options: [{
										value: "all",
										label: "Todos"
									}, ...Object.entries(STATUS_LABELS).map(([value, label]) => ({
										value,
										label
									}))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
									label: "Setor",
									value: sector,
									onChange: setSector,
									options: [{
										value: "all",
										label: "Todos"
									}, ...sectors.map((s) => ({
										value: s,
										label: s
									}))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: exportCsv,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 mr-1.5" }), " CSV"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => toast.message("Exportação PDF simulada."),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 mr-1.5" }), " PDF"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 rounded-lg border border-border bg-card overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Protocolo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Trilha"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Setor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Recebido"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "px-4 py-10 text-center text-sm text-muted-foreground",
										children: "Nenhum protocolo corresponde aos filtros aplicados."
									}) }) : filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3 font-medium tabular-nums",
												children: p.id
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackBadge, {
													track: p.track,
													size: "xs"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3",
												children: p.sector
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3 text-muted-foreground",
												children: STATUS_LABELS[p.status]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-3 text-muted-foreground",
												children: formatDate(p.receivedAt)
											})
										]
									}, p.id))
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "auditoria",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-border bg-card overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Quando"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Usuário"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Papel"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Ação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Alvo"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: AUDIT.slice().sort((a, b) => b.at.localeCompare(a.at)).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground tabular-nums",
											children: formatDateTime(e.at)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: e.user
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground",
											children: ROLE_LABELS[e.role]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: e.action
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground",
											children: e.target
										})
									] }, e.id))
								})]
							})
						})
					})
				]
			})
		})]
	});
}
function Filter({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			className: "rounded-md border border-input bg-background px-2 py-1.5 text-sm min-w-[140px]",
			value,
			onChange: (e) => onChange(e.target.value),
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.value,
				children: o.label
			}, o.value))
		})]
	});
}
//#endregion
export { RelatoriosPage as component };
