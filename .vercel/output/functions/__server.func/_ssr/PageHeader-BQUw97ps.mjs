import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHeader-BQUw97ps.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, subtitle, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "px-6 pt-6 pb-5 border-b border-border bg-background sticky top-0 z-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight truncate",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: subtitle
				})]
			}), right && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 flex items-center gap-2",
				children: right
			})]
		})
	});
}
//#endregion
export { PageHeader as t };
