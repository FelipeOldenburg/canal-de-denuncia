import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { a as ShieldCheck, d as MessageCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-whatsapp-DArUStqJ.js
var import_jsx_runtime = require_jsx_runtime();
var starterText = "1";
function WhatsAppQrPage() {
	const phone = "".replace(/\D/g, "");
	const whatsappUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(starterText)}` : "";
	const qrUrl = whatsappUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(whatsappUrl)}` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-background px-4 py-8 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md flex-col items-center justify-center gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
				}), "Speak"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "w-full rounded-lg border border-border bg-card p-5 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-semibold",
						children: "Canal de denuncias"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Escaneie o QR Code para iniciar a conversa no WhatsApp."
					}),
					qrUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: qrUrl,
						alt: "QR Code para abrir o canal de denuncias no WhatsApp",
						className: "mx-auto mt-5 h-72 w-72 rounded-md border border-border bg-white p-3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-5 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappUrl,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-4 w-4" }), "Abrir WhatsApp"]
						})
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 rounded-md border border-border bg-muted p-4 text-sm text-muted-foreground",
						children: "Configure VITE_WHATSAPP_PHONE_NUMBER na Vercel para gerar o QR Code."
					})
				]
			})]
		})
	});
}
//#endregion
export { WhatsAppQrPage as component };
