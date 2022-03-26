import * as chokidar from 'chokidar';
import lodash from 'lodash';
import winPath from './winPath';
import getAppPath from './getAppEntryPath';

export default async ({ api, watch }) => {
    const { paths } = api;

    async function generate() {
        api.logger.debug('generate files');
        await api.applyPlugins({
            key: 'onGenerateFiles',
            type: api.ApplyPluginsType.event,
        });
    }

    let watchers = [];

    await generate();

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
                await generate();
            }, 100),
        );
        watchers.push(watcher);
    }

    if (watch) {
        const watcherPaths = await api.applyPlugins({
            key: 'addTmpGenerateWatcherPaths',
            type: api.ApplyPluginsType.add,
            initialValue: [paths.absPagesPath, getAppPath(paths.absSrcPath)],
        });
        lodash.uniq(watcherPaths.map((p) => winPath(p))).forEach((p) => {
            createWatcher(p);
        });
    }

    return unwatch;
};
