import { ApplyPluginsType, getRouter, plugin } from '@fesjs/fes';

let config;
function getLoginConfig() {
    if (config) return config;
    config = plugin.applyPlugins({
        key: 'login',
        type: ApplyPluginsType.modify,
        initialValue: {},
    });
    if (!config.loginPath) {
        config.loginPath = '/login';
    }
    return config;
}

// ACCESS

export function request(memo) {
    if (!memo.responseInterceptors) {
        memo.responseInterceptors = [];
    }
    memo.responseInterceptors.push([
        (response) => response,
        (error) => {
            if (error?.response?.status === 401) {
                const router = getRouter();
                const { loginPath } = getLoginConfig();
                router.push({ path: loginPath });
            }
            throw error;
        },
    ]);
    return memo;
}

export function onRouterCreated({ router }) {
    const { hasLogin, loginPath } = getLoginConfig();
    if (hasLogin && loginPath) {
        let isAuthenticated;
        router.beforeEach(async (to, from, next) => {
            if (to.path !== loginPath && !isAuthenticated) {
                isAuthenticated = await hasLogin();
                if (!isAuthenticated) {
                    return next({ path: loginPath });
                }
            }
            next();
        });
    }
}
