import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-GbmxfcVn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULTS = {
	deadlineGreenDays: 15,
	deadlineAmberDays: 7,
	thermometerMinSample: 10
};
var KEY = "speak.settings";
var Ctx = (0, import_react.createContext)(null);
function SettingsProvider({ children }) {
	const [settings, setSettings] = (0, import_react.useState)(DEFAULTS);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(KEY);
			if (raw) setSettings({
				...DEFAULTS,
				...JSON.parse(raw)
			});
		} catch {}
	}, []);
	const update = (s) => {
		setSettings((prev) => {
			const next = {
				...prev,
				...s
			};
			try {
				window.localStorage.setItem(KEY, JSON.stringify(next));
			} catch {}
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			settings,
			update
		},
		children
	});
}
function useSettings() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
	return ctx;
}
//#endregion
export { useSettings as n, SettingsProvider as t };
