import { i as __toESM } from "./_runtime.mjs";
import { a as SEVERITY_LABELS, f as formatDate, m as hoursUntil, o as STATUS_LABELS, p as formatDateTime, r as PROTOCOLS, s as STATUS_ORDER } from "./_ssr/ssr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { a as visibleProtocolsFor, i as useAuth } from "./_ssr/auth-BQ2oIRqw.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-PJVP9td7.mjs";
import { C as CircleAlert, D as Ban, E as Check, O as ArrowRight, S as CircleCheck, T as ChevronDown, c as Paperclip, l as Mic, m as Layers, s as Send, u as MessageSquare, w as ChevronRight, x as Circle } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/PageHeader-BQUw97ps.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as fetchProtocols } from "./_ssr/protocols-CJhJeolS.mjs";
import { t as TrackBadge } from "./_ssr/TrackBadge-Do8DwuW0.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./_ssr/sheet-B9-Owt3j.mjs";
import { t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "./_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.kanban-CWVA4azQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function KanbanPage() {
	const { user } = useAuth();
	const canSee = visibleProtocolsFor(user);
	const { data = PROTOCOLS } = useQuery({
		queryKey: ["protocols"],
		queryFn: fetchProtocols,
		refetchInterval: 5e3
	});
	const visibleProtocols = (0, import_react.useMemo)(() => data.filter((p) => canSee(p.sector)), [data, user]);
	const [items, setItems] = (0, import_react.useState)(visibleProtocols);
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [dragOver, setDragOver] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setItems((prev) => {
			if (!prev.length) return visibleProtocols;
			const existing = new Set(prev.map((p) => p.id));
			const incoming = visibleProtocols.filter((p) => !existing.has(p.id));
			return incoming.length ? [...incoming, ...prev] : prev;
		});
	}, [visibleProtocols]);
	const grouped = (0, import_react.useMemo)(() => {
		const map = {
			recebido: [],
			em_analise: [],
			aguardando_colaborador: [],
			resolvido: [],
			contestado: [],
			encerrado: []
		};
		for (const p of items) map[p.status].push(p);
		return map;
	}, [items]);
	const openProtocol = items.find((i) => i.id === openId) ?? null;
	const move = (id, to) => {
		setItems((prev) => prev.map((p) => p.id === id ? {
			...p,
			status: to,
			history: [...p.history, {
				at: (/* @__PURE__ */ new Date()).toISOString(),
				actor: user?.name ?? "Sistema",
				action: `Alterou status para ${STATUS_LABELS[to]}`
			}]
		} : p));
		toast.success(`Movido para ${STATUS_LABELS[to]}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Kanban de Protocolos",
				subtitle: "Fluxo dos protocolos administrativos. Arraste os cartões ou use o menu de ações."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 min-h-0 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-3 p-6 min-w-max h-full",
					children: STATUS_ORDER.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDragOver(col);
						},
						onDragLeave: () => setDragOver((d) => d === col ? null : d),
						onDrop: (e) => {
							e.preventDefault();
							const id = e.dataTransfer.getData("text/plain");
							setDragOver(null);
							if (id) move(id, col);
						},
						className: `w-[280px] shrink-0 flex flex-col rounded-lg border ${dragOver === col ? "border-primary bg-accent/50" : "border-border bg-muted/30"} transition-colors`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-3 py-2.5 border-b border-border flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: STATUS_LABELS[col]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground tabular-nums",
								children: grouped[col].length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto p-2 space-y-2",
							children: grouped[col].length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground px-2 py-6 text-center",
								children: "Nenhum protocolo nesta coluna."
							}) : grouped[col].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardItem, {
								p,
								onOpen: () => setOpenId(p.id),
								onMove: (to) => move(p.id, to)
							}, p.id))
						})]
					}, col))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!openProtocol,
				onOpenChange: (o) => !o && setOpenId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "right",
					className: "w-full sm:max-w-xl overflow-y-auto",
					children: openProtocol && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtocolDetail, {
						p: openProtocol,
						onMove: (to) => move(openProtocol.id, to),
						onUpdate: (patch) => setItems((prev) => prev.map((x) => x.id === openProtocol.id ? {
							...x,
							...patch
						} : x)),
						onResolve: () => {
							move(openProtocol.id, "resolvido");
							setItems((prev) => prev.map((x) => x.id === openProtocol.id ? {
								...x,
								history: [...x.history, {
									at: (/* @__PURE__ */ new Date()).toISOString(),
									actor: "Sistema",
									action: "Notificação simulada enviada ao colaborador"
								}]
							} : x));
							toast.success("Notificação simulada enviada ao colaborador.");
						}
					})
				})
			})
		]
	});
}
function CardItem({ p, onOpen, onMove }) {
	const h = hoursUntil(p.deadlineAt);
	const soon = h < 24 && h >= 0 && p.status !== "encerrado";
	const overdue = h < 0 && p.status !== "encerrado";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		draggable: true,
		onDragStart: (e) => e.dataTransfer.setData("text/plain", p.id),
		onClick: onOpen,
		className: `group rounded-md border bg-card p-3 cursor-pointer hover:border-primary/40 transition-colors ${p.contested ? "border-destructive/60" : "border-border"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackBadge, {
						track: p.track,
						size: "xs"
					}), p.contested && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive px-1.5 py-0.5 text-[10px] font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), " Contestado"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => e.stopPropagation(),
						"aria-label": "Ações do protocolo",
						className: "opacity-60 hover:opacity-100 text-muted-foreground text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
							className: "text-xs",
							children: "Mover para"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						STATUS_ORDER.filter((s) => s !== p.status).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onMove(s),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 mr-2" }),
								" ",
								STATUS_LABELS[s]
							]
						}, s))
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm font-semibold tabular-nums",
				children: p.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground line-clamp-2",
				children: p.transcript
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between text-[11px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.sector }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(p.receivedAt) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2 flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: p.severity }),
					p.grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 text-[10px] text-accent-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }),
							" ",
							p.grouped.count,
							" relatos agrupados"
						]
					}),
					(soon || overdue) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${overdue ? "bg-destructive/10 text-destructive" : "bg-alert-orange-soft text-alert-orange"}`,
						children: overdue ? `Vencido há ${Math.abs(Math.round(h))}h` : `${Math.round(h)}h restantes`
					})
				]
			})
		]
	});
}
function SeverityBadge({ severity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium ${severity === "critica" ? "bg-destructive/10 text-destructive" : severity === "alta" ? "bg-alert-orange-soft text-alert-orange" : "bg-muted text-muted-foreground"}`,
		children: SEVERITY_LABELS[severity]
	});
}
function ProtocolDetail({ p, onMove, onUpdate, onResolve }) {
	const [plan, setPlan] = (0, import_react.useState)(p.actionPlan ?? "");
	const [sectorEdit, setSectorEdit] = (0, import_react.useState)(false);
	const [newSector, setNewSector] = (0, import_react.useState)(p.sector);
	const blocked = p.contestationsThisMonth >= 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackBadge, { track: p.track }),
					p.contested && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-[11px] font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), " Contestado — prioridade alta"]
					}),
					p.grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }),
							" ",
							p.grouped.count,
							" relatos"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "tabular-nums",
				children: p.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [
				"Recebido em ",
				formatDateTime(p.receivedAt),
				" · Prazo interno: ",
				formatDateTime(p.deadlineAt)
			] })
		] }),
		p.grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-md border border-border bg-muted/50 p-3 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-foreground font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5" }), " Padrão identificado"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1",
				children: p.grouped.pattern
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Denúncia"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 rounded-md border border-border bg-card p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Categoria: ", p.category] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Gravidade: ", SEVERITY_LABELS[p.severity]] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap",
						children: p.transcript
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: p.attachments.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground",
							children: [a.kind === "audio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-3 w-3" }) : a.kind === "photo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3" }), a.label]
						}, i))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Setor sugerido pela IA"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex items-center gap-2 flex-wrap",
				children: !sectorEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-md border border-border bg-card px-2.5 py-1 text-sm",
					children: p.sector
				}), p.sectorConfirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-track-green",
					children: "Confirmado"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => {
						onUpdate({ sectorConfirmed: true });
						toast.success("Setor confirmado.");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 mr-1" }), " Confirmar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => setSectorEdit(true),
					children: "Alterar"
				})] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "rounded-md border border-input bg-background px-2 py-1 text-sm",
						value: newSector,
						onChange: (e) => setNewSector(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => {
							onUpdate({
								sector: newSector,
								sectorConfirmed: true
							});
							setSectorEdit(false);
							toast.success("Setor atualizado.");
						},
						children: "Salvar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setSectorEdit(false),
						children: "Cancelar"
					})
				] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Plano de ação e conclusão"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-2",
					rows: 4,
					placeholder: "Descreva as medidas tomadas e o desfecho do caso…",
					value: plan,
					onChange: (e) => setPlan(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							onUpdate({ actionPlan: plan });
							toast.success("Plano salvo.");
						},
						children: "Salvar plano"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => toast.message("Anexo de relatório simulado."),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-3.5 w-3.5 mr-1" }), " Anexar relatório"]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5 rounded-md border border-border bg-muted/40 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: "Contestações do denunciante neste mês"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted-foreground",
						children: ["CPF ", p.reporterCpfMask]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `text-sm font-semibold tabular-nums ${blocked ? "text-destructive" : "text-foreground"}`,
					children: [p.contestationsThisMonth, " / 3"]
				})]
			}), blocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-3.5 w-3.5" }), " Limite de contestações atingido — bloqueio por má-fé aplicado."]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Histórico"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-2 space-y-2 border-l border-border pl-4",
				children: p.history.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: h.actor
								}),
								" — ",
								h.action
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: formatDateTime(h.at)
						})
					]
				}, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 flex flex-wrap gap-2 border-t border-border pt-4",
			children: [p.status !== "resolvido" && p.status !== "encerrado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: onResolve,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5 mr-1.5" }), " Marcar como Resolvido"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					children: ["Mover para ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 ml-1" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, { children: STATUS_ORDER.filter((s) => s !== p.status).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onClick: () => onMove(s),
				children: STATUS_LABELS[s]
			}, s)) })] })]
		})
	] });
}
//#endregion
export { KanbanPage as component };
