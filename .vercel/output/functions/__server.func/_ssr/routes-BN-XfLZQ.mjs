import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useAuth } from "./auth-BQ2oIRqw.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BN-XfLZQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function Index() {
	const { user, hydrated } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		navigate({
			to: user ? "/painel" : "/login",
			replace: true
		});
	}, [
		hydrated,
		user,
		navigate
	]);
	return null;
}
//#endregion
export { Index as component };
