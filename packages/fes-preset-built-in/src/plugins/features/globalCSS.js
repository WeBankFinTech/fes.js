import { relative, join } from 'path';
import { existsSync } from 'fs';

export default (api) => {
    const {
        paths,
        utils: { winPath },
    } = api;
    const { absSrcPath = '', absTmpPath = '' } = paths;
    const files = ['global.css', 'global.less', 'global.scss', 'global.sass', 'global.styl', 'global.stylus'];
    const globalCSSFile = files
        .map((file) => join(absSrcPath || '', file))
        .filter((file) => existsSync(file))
        .slice(0, 1);

    api.addEntryCodeAhead(() => `${globalCSSFile.map((file) => `require('${winPath(relative(absTmpPath, file))}');`).join('')}`);
};
