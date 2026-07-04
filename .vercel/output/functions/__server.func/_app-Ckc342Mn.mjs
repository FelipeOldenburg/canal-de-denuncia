import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useAuth, n as ROLE_LABELS, r as canManageSettings } from "./_ssr/auth-BQ2oIRqw.mjs";
import { t as Button } from "./_ssr/button-PJVP9td7.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as ShieldCheck, f as LogOut, i as SquareKanban, o as Settings, p as LayoutDashboard, r as Thermometer, v as FileChartColumnIncreasing } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-Ckc342Mn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/painel",
		label: "Painel",
		icon: LayoutDashboard
	},
	{
		to: "/kanban",
		label: "Kanban de Protocolos",
		icon: SquareKanban
	},
	{
		to: "/termometro",
		label: "Termômetro Setorial",
		icon: Thermometer
	},
	{
		to: "/relatorios",
		label: "Relatórios e Auditoria",
		icon: FileChartColumnIncreasing
	}
];
function AppShell() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (!user) return null;
	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-5 border-b border-sidebar-border flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sidebar-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold tracking-tight",
							children: "Speak"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-sidebar-foreground/70 truncate",
							children: "Canal Interno · RH & Compliance"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex-1 px-2 py-3 space-y-0.5",
					children: [NAV.map((item) => {
						const active = pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})]
						}, item.to);
					}), canManageSettings(user.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/configuracoes",
						className: `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${pathname.startsWith("/configuracoes") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: "Configurações"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-sidebar-border px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium truncate",
							children: user.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] text-sidebar-foreground/70 truncate",
							children: [ROLE_LABELS[user.role], user.sector ? ` · ${user.sector}` : ""]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						className: "w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
						onClick: handleLogout,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 mr-2" }), " Sair"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 min-w-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})]
	});
}
function AppLayout() {
	const { user, hydrated } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (hydrated && !user) navigate({
			to: "/login",
			replace: true
		});
	}, [
		hydrated,
		user,
		navigate
	]);
	if (!hydrated || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh grid place-items-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: "Verificando sessão…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { AppLayout as component };
