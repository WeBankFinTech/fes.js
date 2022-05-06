import { chokidar, winPath, lodash, getAppPath } from '@fesjs/utils';
import { watchPkg } from './watchPkg';

async function generateWhenFilesChange({ api }) {
    const { paths } = api;

    let watchers = [];

    function unwatch() {
        watchers.forEach((watcher) => {
            watcher.close();
        });
        watchers = [];
    }

    function createWatcher(path) {
        const watcher = chokidar.watch(path, {
            // ignore .dotfiles and _mock.js
            ignored: /(^|[/\\])(_mock.js$|\..)/,
            ignoreInitial: true,
        });
        watcher.on(
            'all',
            lodash.throttle(async () => {
                await api.applyPlugins({
                    key: 'onGenerateFiles',
                    type: api.ApplyPluginsType.event,
                });
            }, 100),
        );
        watchers.push(watcher);
    }

    const watcherPaths = await api.applyPlugins({
        key: 'addTmpGenerateWatcherPaths',
        type: api.ApplyPluginsType.add,
        initialValue: [paths.absPagesPath, getAppPath(paths.absSrcPath)],
    });
    lodash.uniq(watcherPaths.map((p) => winPath(p))).forEach((p) => {
        createWatcher(p);
    });

    return unwatch;
}

export async function startWatch(api) {
    if (process.env.WATCH === 'none') return;

    let unwatchs = [];
    const restartServer = () => {
        for (const unwatch of unwatchs) {
            unwatch();
        }
        unwatchs = [];
        api.restartServer();
    };

    // generate files
    const unwatchGenerateFiles = await generateWhenFilesChange({ api });
    unwatchs.push(unwatchGenerateFiles);

    // watch pkg changes
    const unwatchPkg = watchPkg({
        cwd: api.cwd,
        onChange() {
            console.log();
            api.logger.info('Plugins in package.json changed.');
            restartServer();
        },
    });
    unwatchs.push(unwatchPkg);

    // watch config change
    const unwatchConfig = api.service.configInstance.watch({
        userConfig: api.service.userConfig,
        onChange: async ({ pluginChanged, valueChanged }) => {
            if (pluginChanged.length) {
                console.log();
                api.logger.info(`Plugins of ${pluginChanged.map((p) => p.key).join(', ')} changed.`);
                restartServer();
            }
            if (valueChanged.length) {
                let reload = false;
                let regenerateTmpFiles = false;
                const fns = [];
                const reloadConfigs = [];
                valueChanged.forEach(({ key, pluginId }) => {
                    const { onChange } = api.service.plugins[pluginId].config || {};
                    if (onChange === api.ConfigChangeType.regenerateTmpFiles) {
                        regenerateTmpFiles = true;
                    }
                    if (!onChange || onChange === api.ConfigChangeType.reload) {
                        reload = true;
                        reloadConfigs.push(key);
                    }
                    if (typeof onChange === 'function') {
                        fns.push(onChange);
                    }
                });

                if (reload) {
                    console.log();
                    api.logger.info(`Config ${reloadConfigs.join(', ')} changed.`);
                    restartServer();
                } else {
                    api.service.userConfig = api.service.configInstance.getUserConfig();

                    await api.setConfig();

                    if (regenerateTmpFiles) {
                        await api.applyPlugins({
                            key: 'onGenerateFiles',
                            type: api.ApplyPluginsType.event,
                        });
                    } else {
                        fns.forEach((fn) => fn());
                    }
                }
            }
        },
    });
    unwatchs.push(unwatchConfig);
}
