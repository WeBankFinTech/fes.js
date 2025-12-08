import type { IPluginAPI } from '@fesjs/shared';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import webpack from 'webpack';

class VersionEmitPlugin {
    constructor(private cwd: string) {}
    apply(compiler: webpack.Compiler) {
        compiler.hooks.thisCompilation.tap('VersionEmitPlugin', (compilation) => {
            compilation.hooks.processAssets.tap({ name: 'VersionEmitPlugin', stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL }, () => {
                const pkgPath = join(this.cwd, 'package.json');
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
                    builder: 'webpack',
                    nodeEnv: process.env.NODE_ENV,
                };

                const jsonSource = new webpack.sources.RawSource(`${JSON.stringify(info, null, 2)}\n`);
                const txt = `name: ${info.name}\nversion: ${info.version}\nbuildTime: ${info.buildTime}\nbuilder: ${info.builder}\nnodeEnv: ${info.nodeEnv ?? ''}\n`;
                const txtSource = new webpack.sources.RawSource(txt);
                compilation.emitAsset('version.json', jsonSource);
                compilation.emitAsset('version.txt', txtSource);
            });
        });
    }
}

export default (api: IPluginAPI) => {
    api.modifyBundleConfig((memo: any) => {
        memo.plugins = memo.plugins || [];
        memo.plugins.push(new VersionEmitPlugin(api.paths.cwd));
        return memo;
    });
};
