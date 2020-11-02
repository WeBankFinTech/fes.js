import {
    dirname, join, basename, relative, extname
} from 'path';
import {
    compatESModuleRequire,
    resolve,
    winPath,
    pkgUp,
    lodash
} from '@umijs/utils';

const RE = {
    plugin: /^(@webank\/)?fes-plugin-/
};

export function isPlugin(name) {
    const hasScope = name.charAt(0) === '@';
    const re = RE.plugin;
    if (hasScope) {
        return re.test(name.split('/')[1]) || re.test(name);
    }
    return re.test(name);
}

export function getPlugins(opts) {
    return [
        // dependencies
        ...opts.plugins,
        ...Object.keys(opts.pkg.devDependencies || {})
            .concat(Object.keys(opts.pkg.dependencies || {}))
            .filter(isPlugin.bind(null)),
        ...opts.userConfigPlugins
    ].map(path => resolve.sync(path, {
        basedir: opts.cwd,
        extensions: ['.js', '.ts']
    }));
}

// e.g.
// initial-state -> initialState
// webpack.css-loader -> webpack.cssLoader
function nameToKey(name) {
    return name
        .split('.')
        .map(part => lodash.camelCase(part))
        .join('.');
}

function pkgNameToKey(pkgName) {
    if (pkgName.charAt(0) === '@' && !pkgName.startsWith('@webank/')) {
        pkgName = pkgName.split('/')[1];
    }
    return nameToKey(pkgName.replace(RE.plugin, ''));
}

export function pathToObj({ path, cwd }) {
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
    id = id.replace('@webank/fes-core/lib/plugins', '@@');
    id = id.replace(/\.js$/, '');

    const key = isPkgPlugin
        ? pkgNameToKey(pkg.name)
        : nameToKey(basename(path, extname(path)));

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
        defaultConfig: null
    };
}

export function resolvePlugins(opts) {
    const plugins = getPlugins(opts);
    return plugins.map(path => pathToObj({
        path,
        cwd: opts.cwd
    }));
}


export function isValidPlugin(plugin) {
    return plugin.id && plugin.key && plugin.apply;
}
