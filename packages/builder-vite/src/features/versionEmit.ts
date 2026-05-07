import type { IPluginAPI } from '@fesjs/shared';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

export default (api: IPluginAPI) => {
    api.modifyBundleConfig((memo: any) => {
        const versionPlugin = {
            name: 'fes-version-emit',
            generateBundle() {
                const pkgPath = join(api.paths.cwd, 'package.json');
                let name = '';
                let version = '';
                if (existsSync(pkgPath)) {
                    try {
                        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) || {};
                        name = pkg.name || '';
                        version = pkg.version || '';
                    }
                    catch {}
                }

                const info = {
                    name,
                    version,
                    buildTime: new Date().toISOString(),
                    builder: 'vite',
                    nodeEnv: process.env.NODE_ENV,
                };

                (this as any).emitFile({ type: 'asset', fileName: 'version.json', source: `${JSON.stringify(info, null, 2)}\n` });
                const txt = `name: ${info.name}\nversion: ${info.version}\nbuildTime: ${info.buildTime}\nbuilder: ${info.builder}\nnodeEnv: ${info.nodeEnv ?? ''}\n`;
                (this as any).emitFile({ type: 'asset', fileName: 'version.txt', source: txt });
            },
        };

        memo.plugins = memo.plugins || [];
        memo.plugins.push(versionPlugin);
        return memo;
    });
};
