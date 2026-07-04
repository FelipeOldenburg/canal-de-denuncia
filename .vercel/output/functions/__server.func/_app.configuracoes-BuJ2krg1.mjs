import { i as __toESM } from "./_runtime.mjs";
import { l as USERS } from "./_ssr/ssr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useAuth, n as ROLE_LABELS, r as canManageSettings } from "./_ssr/auth-BQ2oIRqw.mjs";
import { t as Button } from "./_ssr/button-PJVP9td7.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { h as Info } from "./_libs/lucide-react.mjs";
import { n as useSettings } from "./_ssr/settings-GbmxfcVn.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-BQUw97ps.mjs";
import { n as Label, t as Input } from "./_ssr/label-N2deYTEC.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.configuracoes-BuJ2krg1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConfiguracoesPage() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { settings, update } = useSettings();
	const [green, setGreen] = (0, import_react.useState)(settings.deadlineGreenDays);
	const [amber, setAmber] = (0, import_react.useState)(settings.deadlineAmberDays);
	const [sample, setSample] = (0, import_react.useState)(settings.thermometerMinSample);
	(0, import_react.useEffect)(() => {
		if (user && !canManageSettings(user.role)) navigate({
			to: "/painel",
			replace: true
		});
	}, [user, navigate]);
	(0, import_react.useEffect)(() => {
		setGreen(settings.deadlineGreenDays);
		setAmber(settings.deadlineAmberDays);
		setSample(settings.thermometerMinSample);
	}, [settings]);
	if (!user || !canManageSettings(user.role)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Configurações",
			subtitle: "Parâmetros administrativos do painel."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 py-6 space-y-6 max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Usuários e papéis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Cadastro e permissões dos usuários do painel."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 divide-y divide-border border border-border rounded-md overflow-hidden",
							children: USERS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium truncate",
										children: u.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground truncate",
										children: [u.email, u.sector ? ` · ${u.sector}` : ""]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									defaultValue: u.role,
									onChange: () => toast.success("Papel atualizado (simulado)."),
									className: "rounded-md border border-input bg-background px-2 py-1 text-sm",
									children: Object.keys(ROLE_LABELS).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r,
										children: ROLE_LABELS[r]
									}, r))
								})]
							}, u.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Prazos internos por trilha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-start gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Alterar prazos internos não altera prazos legais aplicáveis." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "green",
									children: "Trilha Verde (dias)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "green",
									type: "number",
									min: 1,
									value: green,
									onChange: (e) => setGreen(Number(e.target.value))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "amber",
									children: "Trilha Amarela (dias)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "amber",
									type: "number",
									min: 1,
									value: amber,
									onChange: (e) => setAmber(Number(e.target.value))
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Termômetro Setorial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Amostra mínima de colaboradores para exibir um setor individualmente. Setores abaixo do limite são agrupados em \"Outros setores\"."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 max-w-xs space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "sample",
								children: "Amostra mínima (colaboradores)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "sample",
								type: "number",
								min: 1,
								value: sample,
								onChange: (e) => setSample(Number(e.target.value))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							update({
								deadlineGreenDays: green,
								deadlineAmberDays: amber,
								thermometerMinSample: sample
							});
							toast.success("Configurações salvas.");
						},
						children: "Salvar alterações"
					})
				})
			]
		})]
	});
}
//#endregion
export { ConfiguracoesPage as component };
