import { i as __toESM } from "../_runtime.mjs";
import { l as USERS } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BQ2oIRqw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthCtx = (0, import_react.createContext)(null);
var STORAGE_KEY = "speak.auth.user";
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
			if (raw) setUser(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	const login = async (email, _password) => {
		const found = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
		if (!found) return null;
		setUser(found);
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
		} catch {}
		return found;
	};
	const logout = () => {
		setUser(null);
		try {
			window.localStorage.removeItem(STORAGE_KEY);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCtx.Provider, {
		value: {
			user,
			hydrated,
			login,
			logout
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthCtx);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
function canSeeAllSectors(role) {
	return role === "compliance" || role === "admin";
}
function canManageSettings(role) {
	return role === "admin";
}
function visibleProtocolsFor(user) {
	if (!user) return () => false;
	if (canSeeAllSectors(user.role)) return () => true;
	return (sector) => sector === user.sector;
}
var ROLE_LABELS = {
	hr_analyst: "Analista de RH",
	compliance: "Compliance Officer",
	admin: "Administrador"
};
//#endregion
export { visibleProtocolsFor as a, useAuth as i, ROLE_LABELS as n, canManageSettings as r, AuthProvider as t };
