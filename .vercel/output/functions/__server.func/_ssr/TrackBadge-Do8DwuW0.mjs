import { c as TRACK_LABELS } from "./ssr.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TrackBadge-Do8DwuW0.js
var import_jsx_runtime = require_jsx_runtime();
function TrackBadge({ track, size = "sm" }) {
	const isGreen = track === "green";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 rounded-full font-medium ${isGreen ? "bg-track-green-soft" : "bg-track-amber-soft"} ${isGreen ? "text-track-green" : "text-track-amber"} ${size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${isGreen ? "bg-track-green" : "bg-track-amber"}` }),
			"Trilha ",
			TRACK_LABELS[track]
		]
	});
}
//#endregion
export { TrackBadge as t };
