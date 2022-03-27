import { dirname, join, basename, relative, extname } from 'path';
import { compatESModuleRequire, resolve, winPath, pkgUp, lodash } from '@fesjs/utils';
import Logger from '../../logger';

import { PluginType } from '../enums';

const logger = new Logger('fes:compiler');

const RE = {
    [PluginType.plugin]: /^(@fesjs\/|@webank\/fes-|fes-)plugin-/,
    [PluginType.preset]: /^(@fesjs\/|@webank\/fes-|fes-)preset-/,
};

export function isPluginOrPreset(type, name) {
    const hasScope = name.charAt(0) === '@';
    const re = RE[type];
    if (hasScope) {
        return re.test(name.split('/')[1]) || re.test(name);
    }
    return re.test(name);
}

function filterPluginAndPreset(type, pkg) {
    return Object.keys(pkg.devDependencies || {})
        .concat(Object.keys(pkg.dependencies || {}))
        .filter(isPluginOrPreset.bind(null, type));
}

function filterBuilder(pkg) {
    const builders = Object.keys(pkg.devDependencies || {})
        .concat(Object.keys(pkg.dependencies || {}))
        .filter((name) => /^@fesjs\/build-/.test(name));

    if (builders.length > 1) {
        logger.warn(`检测到您使用了多个个 builder: ${builders}，当前生效的是 ${builders[0]}, 请保留一个`);
    }

    return builders.slice(0, 1);
}

export function getPluginsOrPresets(type, opts) {
    const upperCaseType = type.toUpperCase();
    return [
        // opts
        ...(opts[type === PluginType.preset ? 'presets' : 'plugins'] || []),
        // env
        ...(process.env[`FES_${upperCaseType}S`] || '').split(',').filter(Boolean),
        ...filterPluginAndPreset(type, opts.pkg),
        // 构建只允许是 presets
        ...(type === PluginType.preset ? filterBuilder(opts.pkg) : []),
        // user config
        ...(opts[type === PluginType.preset ? 'userConfigPresets' : 'userConfigPlugins'] || []),
    ].map((path) =>
        resolve.sync(path, {
            basedir: opts.cwd,
            extensions: ['.js', '.ts'],
        }),
    );
}

// e.g.
// initial-state -> initialState
// webpack.css-loader -> webpack.cssLoader
function nameToKey(name) {
    return name
        .split('.')
        .map((part) => lodash.camelCase(part))
        .join('.');
}

function pkgNameToKey(pkgName, type) {
    if (pkgName.charAt(0) === '@' && !pkgName.startsWith('@fesjs/')) {
        pkgName = pkgName.split('/')[1];
    }
    return nameToKey(pkgName.replace(RE[type], ''));
}

export function pathToObj({ path, type, cwd }) {
    let pkg = null;
    let isPkgPlugin = false;
    const pkgJSONPath = pkgUp.sync({ cwd: path });
    if (pkgJSONPath) {
        // eslint-disable-next-line
        pkg = require(pkgJSONPath);
        isPkgPlugin = winPath(join(dirname(pkgJSONPath), pkg.main || 'index.js')) === winPath(path);
    }

    let id;
    if (isPkgPlugin) {
        id = pkg.name;
    } else if (winPath(path).startsWith(winPath(cwd))) {
        id = `./${winPath(relative(cwd, path))}`;
    } else if (pkgJSONPath) {
        id = winPath(join(pkg.name, relative(dirname(pkgJSONPath), path)));
    } else {
        id = winPath(path);
    }
    id = id.replace('@fesjs/preset-built-in/lib/plugins', '@@');
    id = id.replace(/\.js$/, '');

    const key = isPkgPlugin ? pkgNameToKey(pkg.name, type) : nameToKey(basename(path, extname(path)));

    return {
        id,
        key,
        path: winPath(path),
        apply() {
            // use function to delay require
            try {
                // eslint-disable-next-line
                const ret = require(path);
                // use the default member for es modules
                return compatESModuleRequire(ret);
            } catch (e) {
                throw new Error(`Register ${path} failed, since ${e.message}`);
            }
        },
        defaultConfig: null,
    };
}

export function resolvePresets(opts) {
    const type = PluginType.preset;
    const presets = [...getPluginsOrPresets(type, opts)];
    return presets.map((path) =>
        pathToObj({
            type,
            path,
            cwd: opts.cwd,
        }),
    );
}

export function resolvePlugins(opts) {
    const type = PluginType.plugin;
    const plugins = getPluginsOrPresets(type, opts);
    return plugins.map((path) =>
        pathToObj({
            path,
            type,
            cwd: opts.cwd,
        }),
    );
}

export function isValidPlugin(plugin) {
    return plugin.id && plugin.key && plugin.apply;
}
