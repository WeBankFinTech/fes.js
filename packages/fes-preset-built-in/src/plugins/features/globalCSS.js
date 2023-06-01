import { relative, join } from 'path';
import { existsSync } from 'fs';

export default (api) => {
    const { paths } = api;
    const { absSrcPath = '', absTmpPath = '' } = paths;
    const files = ['global.css', 'global.less', 'global.scss', 'global.sass', 'global.styl', 'global.stylus'];
    const globalCSSFile = files
        .map((file) => join(absSrcPath || '', file))
        .filter((file) => existsSync(file))
        .slice(0, 1);

    if (globalCSSFile.length) {
        api.addEntryImportsAhead({
            stage: 1,
            fn: () => [{ source: relative(absTmpPath, globalCSSFile[0]) }],
        });
    }
};
