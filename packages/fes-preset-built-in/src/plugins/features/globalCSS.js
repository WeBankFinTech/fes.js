import { relative, join } from 'path';
import { existsSync } from 'fs';

export default (api) => {
    api.describe({
        key: 'globalCSS',
        config: {
            schema(joi) {
                return joi.string();
            },
        },
        default: '',
    });
    const { paths, utils } = api;
    const { absSrcPath = '', absTmpPath = '' } = paths;
    const files = ['global.css', 'global.less', 'global.scss', 'global.sass', 'global.styl', 'global.stylus'];
    const globalCSSFile = files
        .map((file) => join(absSrcPath || '', file))
        .filter((file) => existsSync(file))
        .slice(0, 1);

    const isBeforeImports = () => api.config.globalCSS === 'beforeImports';

    if (globalCSSFile.length) {
        api.addEntryImportsAhead({
            stage: 1,
            fn: () => {
                if (isBeforeImports()) {
                    return [{ source: relative(absTmpPath, globalCSSFile[0]) }];
                }
                return [];
            },
        });
        api.addEntryCodeAhead(() => {
            if (!isBeforeImports()) {
                return `import '${utils.winPath(relative(absTmpPath, globalCSSFile[0]))}';`;
            }
            return [];
        });
    }
};
