import { r as PROTOCOLS } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protocols-CJhJeolS.js
async function fetchProtocols() {
	const response = await fetch("/api/protocols");
	if (!response.ok) return PROTOCOLS;
	const payload = await response.json();
	return Array.isArray(payload.protocols) ? payload.protocols : PROTOCOLS;
}
//#endregion
export { fetchProtocols as t };
