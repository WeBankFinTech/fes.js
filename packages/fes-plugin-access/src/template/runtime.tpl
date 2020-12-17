import { access, install } from "./core";
import { plugin, ApplyPluginsType } from "@@/core/coreExports";

export function onRouterCreated({ router }) {
    router.beforeEach(async (to, from, next) => {
        let path;
        if (to.matched.length === 1) {
            path = to.matched[0].path;
        } else {
            path = to.path;
        }
        const canRoute = await access.hasAccess(path);
        if (canRoute) {
            next();
        } else {
            const noAccessHandler = plugin.applyPlugins({
                key: "noAccessHandler",
                type: ApplyPluginsType.modify,
                initialValue: null,
            });
            if (noAccessHandler && typeof noAccessHandler === "function") {
                noAccessHandler(router, to, from);
            }
            next(false);
        }
    });
}

export function onAppCreated({ app }) {
    install(app)
}
