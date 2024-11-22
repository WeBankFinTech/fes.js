import { extname } from 'node:path';
import historyFallback from 'connect-history-api-fallback';

const ASSET_EXT_NAMES = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg'];

function proxyMiddleware(api) {
    return (req, res, next) => {
        const proxyConfig = api.config.proxy;
        if (proxyConfig && Object.keys(proxyConfig).some(path => req.url.startsWith(path))) {
            return next();
        }
        if (ASSET_EXT_NAMES.includes(extname(req.url))) {
            return next();
        }

        const history = historyFallback();
        history(req, res, next);
    };
}

export default proxyMiddleware;
