import type { Plugin } from '../../types';
import { basename, dirname, extname, join, relative } from 'node:path';
import process from 'node:process';
import { chalk, compatESModuleRequire, lodash, resolve, winPath } from '@fesjs/utils';
import { readJSONSync } from 'fs-extra/esm';
import { packageUp } from 'package-up';
import { OWNER_DIR } from '../../shared';
import { PluginType } from '../enums';

interface FilterBuilderOptions {
    pkg: Record<string, any>;
    builder?: string;
}

interface FilterPluginAndPresetOptions {
    pkg: Record<string, any>;
    builder?: string;
}

interface GetPluginsOrPresetsOptions {
    presets?: string[];
    plugins?: string[];
    userConfigPresets?: string[];
    userConfigPlugins?: string[];
    pkg: Record<string, any>;
    cwd: string;
    builder?: string;
}

interface PathToObjOptions {
    path: string;
    type: PluginType;
    cwd: string;
}

interface ResolvePresetsOptions {
    presets?: string[];
    userConfigPresets?: string[];
    builder?: string;
    pkg: Record<string, any>;
    cwd: string;
}

interface ResolvePluginsOptions {
    plugins?: string[];
    userConfigPlugins?: string[];
    builder?: string;
    pkg: Record<string, any>;
    cwd: string;
}

const RE: Record<PluginType, RegExp> = {
    [PluginType.plugin]: /^(@fesjs\/|@webank\/fes-|fes-)plugin-(.+)$/,
    [PluginType.preset]: /^(@fesjs\/|@webank\/fes-|fes-)preset-(.+)$/,
    [PluginType.builder]: /^(@fesjs\/|@webank\/fes-|fes-)builder-(.+)$/,
};

export function isPluginOrPreset(type: PluginType, name: string): boolean {
    const hasScope = name.charAt(0) === '@';
    const re = RE[type];
    if (hasScope) {
        return re.test(name.split('/')[1]) || re.test(name);
    }
    return re.test(name);
}

function filterBuilder(opts: FilterBuilderOptions): string[] {
    const builders = Object.keys(opts.pkg.devDependencies || {})
        .concat(Object.keys(opts.pkg.dependencies || {}))
        .filter(isPluginOrPreset.bind(null, PluginType.builder))
        .filter(builder => builder.includes(opts.builder || ''));
    if (builders.length > 1) {
        // eslint-disable-next-line no-console
        console.log(chalk.yellow(`提示：您使用了多个builder，默认使用第一个${builders[0]}`));
        return [builders[0]];
    }
    return builders;
}

function filterPluginAndPreset(type: PluginType, opts: FilterPluginAndPresetOptions): string[] {
    const base = Object.keys(opts.pkg.devDependencies || {})
        .concat(Object.keys(opts.pkg.dependencies || {}))
        .filter(isPluginOrPreset.bind(null, type));
    if (type === PluginType.preset) {
        return base.concat(filterBuilder(opts));
    }
    if (type === PluginType.plugin) {
        return base.concat(join(OWNER_DIR, './dist/service/plugins/builder.mjs'));
    }
    return base;
}

export function getPluginsOrPresets(type: PluginType, opts: GetPluginsOrPresetsOptions): string[] {
    const upperCaseType = type.toUpperCase();
    return [
        // opts
        ...(opts[type === PluginType.preset ? 'presets' : 'plugins'] || []),
        // env
        ...(process.env[`FES_${upperCaseType}S`] || '').split(',').filter(Boolean),
        ...filterPluginAndPreset(type, opts),
        // user config
        ...(opts[type === PluginType.preset ? 'userConfigPresets' : 'userConfigPlugins'] || []),
    ].map(path =>
        resolve.sync(path, {
            basedir: opts.cwd,
            extensions: ['.js', '.ts'],
        }),
    );
}

// e.g.
// initial-state -> initialState
// webpack.css-loader -> webpack.cssLoader
function nameToKey(name: string): string {
    return name
        .split('.')
        .map(part => lodash.camelCase(part))
        .join('.');
}

function pkgNameToKey(pkgName: string, type: PluginType): string {
    if (pkgName.charAt(0) === '@' && !pkgName.startsWith('@fesjs/')) {
        pkgName = pkgName.split('/')[1];
    }
    return nameToKey(pkgName.replace(RE[type], ''));
}

export async function pathToObj({ path, type, cwd }: PathToObjOptions): Promise<Plugin> {
    let pkg: Record<string, any>;
    let isPkgPlugin = false;
    const pkgJSONPath = await packageUp({ cwd: path });
    if (pkgJSONPath) {
        pkg = readJSONSync(pkgJSONPath);
        isPkgPlugin = winPath(join(dirname(pkgJSONPath), pkg.main || 'index.js')) === winPath(path);
    }

    let id: string;
    if (isPkgPlugin) {
        id = pkg!.name;
    }
    else if (winPath(path).startsWith(winPath(cwd))) {
        id = `./${winPath(relative(cwd, path))}`;
    }
    else if (pkgJSONPath) {
        id = winPath(join(pkg!.name, relative(dirname(pkgJSONPath!), path)));
    }
    else {
        id = winPath(path);
    }
    id = id.replace('@fesjs/preset-built-in/dist/plugins', '@@');
    id = id.replace(/\.js$/, '');

    const key = isPkgPlugin ? pkgNameToKey(pkg!.name, type) : nameToKey(basename(path, extname(path)));

    return {
        id,
        key,
        path: winPath(path),
        async apply() {
            try {
                const ret = await import(path);
                // use the default member for es modules
                return compatESModuleRequire(ret);
            }
            catch (e: any) {
                throw new Error(`Register ${path} failed, since ${e.message}`);
            }
        },
        defaultConfig: null,
    };
}

export async function resolvePresets(opts: ResolvePresetsOptions): Promise<Plugin[]> {
    const type = PluginType.preset;
    const presets = await Promise.all([...getPluginsOrPresets(type, opts)].map(path =>
        pathToObj({
            type,
            path,
            cwd: opts.cwd,
        }),
    ));
    return presets
        .sort((a, b) => {
            if (a.id === '@fesjs/preset-built-in') {
                return -1;
            }
            if (b.id === '@fesjs/preset-built-in') {
                return 1;
            }
            if (/^(?:@fesjs\/|@webank\/fes-|fes-)builder-/.test(a.id)) {
                return -1;
            }
            if (/^(?:@fesjs\/|@webank\/fes-|fes-)builder-/.test(b.id)) {
                return 1;
            }
            return 0;
        });
}

export async function resolvePlugins(opts: ResolvePluginsOptions): Promise<Plugin[]> {
    const type = PluginType.plugin;
    const plugins = await Promise.all([...getPluginsOrPresets(type, opts)].map(path =>
        pathToObj({
            type,
            path,
            cwd: opts.cwd,
        }),
    ));
    return plugins;
}

export function isValidPlugin(plugin: any): plugin is Plugin {
    return plugin && plugin.id && plugin.key && typeof plugin.apply === 'function';
}
