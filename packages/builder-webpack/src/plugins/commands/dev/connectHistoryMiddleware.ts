import type { IPluginAPI } from '@fesjs/shared';
import type { WebpackBuildConfig } from '../../../shared';
import { extname } from 'node:path';
import historyFallback from 'connect-history-api-fallback';

const ASSET_EXT_NAMES = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg'];

function proxyMiddleware(api: IPluginAPI<WebpackBuildConfig>) {
    return (req: any, res: any, next: any) => {
        const proxyConfig = api.config.proxy;
        if (proxyConfig) {
            if (Array.isArray(proxyConfig)) {
                if (proxyConfig.some(item => item.context.some((path: string) => path && req.url.startsWith(path)))) {
                    return next();
                }
            }
            else if (Object.keys(proxyConfig).some(path => req.url.startsWith(path))) {
                return next();
            }
        }
        if (ASSET_EXT_NAMES.includes(extname(req.url))) {
            return next();
        }

        const history = historyFallback();
        history(req, res, next);
    };
}

export default proxyMiddleware;
