import { extname } from 'path';
import historyFallback from 'connect-history-api-fallback';

const ASSET_EXT_NAMES = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
const SKIP_PATHS_PREFIX = ['/@'];

const proxyMiddleware = (api) => (req, res, next) => {
    const proxyConfig = api.config.proxy;
    if (proxyConfig && Object.keys(proxyConfig).some((path) => req.url.startsWith(path))) {
        return next();
    }
    if (SKIP_PATHS_PREFIX.find((prefix) => req.url.startsWith(prefix))) {
        return next();
    }
    if (ASSET_EXT_NAMES.includes(extname(req.url))) {
        return next();
    }

    const history = historyFallback();
    history(req, res, next);
};

export default proxyMiddleware;
