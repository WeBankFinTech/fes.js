
import { extname, join } from 'path';
import historyFallback from 'connect-history-api-fallback';

const ASSET_EXTNAMES = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg'];

export default api => (req, res, next) => {
    const proxyConfig = api.config.proxy;
    if (proxyConfig && Object.keys(proxyConfig).some(path => req.path.startsWith(path))) {
        return next();
    }
    if (req.path === '/favicon.ico') {
        return res.sendFile(join(__dirname, 'fes.png'));
    }
    if (ASSET_EXTNAMES.includes(extname(req.path))) {
        return next();
    }
    const history = historyFallback();
    history(req, res, next);
};
