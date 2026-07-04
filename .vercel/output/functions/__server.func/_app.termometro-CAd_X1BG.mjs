import { i as __toESM } from "./_runtime.mjs";
import { d as explainAlert, i as SECTORS, u as computeAlertStatus } from "./_ssr/ssr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useSettings } from "./_ssr/settings-GbmxfcVn.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-BQUw97ps.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./_ssr/sheet-B9-Owt3j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.termometro-CAd_X1BG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var alertMeta = {
	orange: {
		label: "Alerta Laranja",
		cls: "bg-alert-orange-soft text-alert-orange border-alert-orange/40"
	},
	undefined: {
		label: "Indefinido",
		cls: "bg-muted text-muted-foreground border-border"
	},
	none: {
		label: "Sem alerta",
		cls: "bg-track-green-soft text-track-green border-track-green/40"
	}
};
function TermometroPage() {
	const { settings } = useSettings();
	const [openSector, setOpenSector] = (0, import_react.useState)(null);
	const { visible, othersGroup } = (0, import_react.useMemo)(() => {
		const visible = [];
		const others = [];
		for (const s of SECTORS) if (s.headcount >= settings.thermometerMinSample) visible.push(s);
		else others.push(s);
		let othersGroup = null;
		if (others.length) othersGroup = {
			sector: "Outros setores (< amostra mínima)",
			headcount: others.reduce((a, b) => a + b.headcount, 0),
			reports6m: others.reduce((a, b) => a + b.reports6m, 0),
			turnover: Math.round(others.reduce((a, b) => a + b.turnover, 0) / others.length),
			climate: Math.round(others.reduce((a, b) => a + b.climate, 0) / others.length * 10) / 10
		};
		return {
			visible,
			othersGroup
		};
	}, [settings.thermometerMinSample]);
	const rows = othersGroup ? [...visible, othersGroup] : visible;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Termômetro Setorial",
				subtitle: `Setores com menos de ${settings.thermometerMinSample} colaboradores são agrupados para preservar o anonimato.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-border bg-card overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Setor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium text-right",
									children: "Denúncias (6m)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium text-right",
									children: "Turnover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium text-right",
									children: "Clima (1-5)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Status"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: rows.map((s) => {
								const meta = alertMeta[s.sector.startsWith("Outros") ? "undefined" : computeAlertStatus(s)];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/40 cursor-pointer",
									onClick: () => setOpenSector(s),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium",
												children: s.sector
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-muted-foreground",
												children: [s.headcount, " colaboradores"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right tabular-nums",
											children: s.reports6m
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 text-right tabular-nums",
											children: [s.turnover, "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right tabular-nums",
											children: s.climate.toFixed(1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${meta.cls}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), meta.label]
											})
										})
									]
								}, s.sector);
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "O agrupamento evita a reidentificação de denunciantes em setores pequenos e é ajustável em Configurações."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!openSector,
				onOpenChange: (o) => !o && setOpenSector(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "right",
					className: "w-full sm:max-w-md",
					children: openSector && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: openSector.sector }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [openSector.headcount, " colaboradores"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Denúncias 6m",
									value: String(openSector.reports6m)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Turnover",
									value: `${openSector.turnover}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Clima",
									value: openSector.climate.toFixed(1)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Por que este status?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-foreground/90 leading-relaxed",
								children: openSector.sector.startsWith("Outros") ? "Agrupamento por amostra insuficiente. Não é possível calcular um status individual sem risco de reidentificar denunciantes." : explainAlert(openSector)
							})]
						})
					] })
				})
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted-foreground uppercase tracking-wide",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-lg font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { TermometroPage as component };
