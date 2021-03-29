
import { extname, join } from 'path';
import historyFallback from 'connect-history-api-fallback';

const ASSET_EXTNAMES = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg'];

export default () => (req, res, next) => {
    if (req.path === '/favicon.ico') {
        res.sendFile(join(__dirname, 'fes.png'));
    } else if (ASSET_EXTNAMES.includes(extname(req.path))) {
        next();
    } else {
        const history = historyFallback();
        history(req, res, next);
    }
};
