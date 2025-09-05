import type { Connect } from 'vite';
import { join } from 'node:path';
import historyFallback from 'connect-history-api-fallback';
import { pathExistsSync } from 'fs-extra/esm';

interface ViteConfig {
    publicDir: string;
}

interface HistoryParams {
    [key: string]: any;
}

function proxyMiddleware(viteConfig: ViteConfig, params: HistoryParams): Connect.NextHandleFunction {
    return (req: any, res: any, next: any) => {
        const fileName = join(viteConfig.publicDir, req.url);
        if (req.url.length > 1 && req.url.startsWith('/') && pathExistsSync(fileName)) {
            return next();
        }

        const history = historyFallback(params);
        history(req, res, next);
    };
}

export default proxyMiddleware;
