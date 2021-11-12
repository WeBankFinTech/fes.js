/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/blob/master/packages/preset-built-in/src/plugins/commands/dev/watchPkg.ts
 */

import { join } from 'path';
import { chokidar, winPath, lodash } from '@fesjs/utils';
import { existsSync, readFileSync } from 'fs';
import { isPluginOrPreset, PluginType } from '@fesjs/compiler';

function getPlugins(opts) {
    return Object.keys({
        ...opts.pkg.dependencies,
        ...opts.pkg.devDependencies
    }).filter(name => (
        isPluginOrPreset(PluginType.plugin, name)
        || isPluginOrPreset(PluginType.preset, name)
    ));
}

function getPluginsFromPkgPath(opts) {
    let pkg = {};
    if (existsSync(opts.pkgPath)) {
        try {
            pkg = JSON.parse(readFileSync(opts.pkgPath, 'utf-8'));
        } catch (e) {
            // ignore
        }
    }
    return getPlugins({ pkg });
}

export function watchPkg(opts) {
    const pkgPath = join(opts.cwd, 'package.json');
    const plugins = getPluginsFromPkgPath({ pkgPath });
    const watcher = chokidar.watch(pkgPath, {
        ignoreInitial: true
    });
    watcher.on('all', () => {
        const newPlugins = getPluginsFromPkgPath({ pkgPath });
        if (!lodash.isEqual(plugins, newPlugins)) {
            // 已经重启了，只处理一次就够了
            opts.onChange();
        }
    });
    return () => {
        watcher.close();
    };
}

export function watchPkgs(opts) {
    const unwatchs = [watchPkg({ cwd: opts.cwd, onChange: opts.onChange })];
    if (winPath(opts.cwd) !== winPath(process.cwd())) {
        unwatchs.push(watchPkg({ cwd: process.cwd(), onChange: opts.onChange }));
    }
    return () => {
        unwatchs.forEach((unwatch) => {
            unwatch();
        });
    };
}
