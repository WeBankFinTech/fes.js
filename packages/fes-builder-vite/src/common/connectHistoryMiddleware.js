import { join } from 'path';
import { pathExistsSync } from 'fs-extra';
import historyFallback from 'connect-history-api-fallback';

const proxyMiddleware = (viteConfig, params) => (req, res, next) => {
    const fileName = join(viteConfig.publicDir, req.url);
    if (req.url.length > 1 && req.url.startsWith('/') && pathExistsSync(fileName)) {
        return next();
    }

    const history = historyFallback(params);
    history(req, res, next);
};

export default proxyMiddleware;
