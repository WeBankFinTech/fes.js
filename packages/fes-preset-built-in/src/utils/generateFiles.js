import { chokidar, lodash, winPath } from '@fesjs/utils';
import { join } from 'path';

export default async ({ api, watch }) => {
    const { paths } = api;

    async function generate() {
        api.logger.debug('generate files');
        await api.applyPlugins({
            key: 'onGenerateFiles',
            type: api.ApplyPluginsType.event
        });
    }

    const watchers = [];

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
            ignoreInitial: true
        });
        watcher.on(
            'all',
            lodash.throttle(async () => {
                await generate();
            }, 100)
        );
        watchers.push(watcher);
    }

    if (watch) {
        const watcherPaths = await api.applyPlugins({
            key: 'addTmpGenerateWatcherPaths',
            type: api.ApplyPluginsType.add,
            initialValue: [
                paths.absPagesPath,
                // 貌似没用到
                // join(paths.absSrcPath, api.config?.singular ? 'layout' : 'layouts'),
                join(paths.absSrcPath, 'app.js')
            ]
        });
        lodash
            .uniq(watcherPaths.map(p => winPath(p)))
            .forEach((p) => {
                createWatcher(p);
            });
    }

    return unwatch;
};
