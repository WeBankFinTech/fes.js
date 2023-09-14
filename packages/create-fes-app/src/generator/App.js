import { Generator } from '@fesjs/utils';

export default class AppGenerator extends Generator {
    constructor({ cwd, args, path, targetDir }) {
        super({
            cwd,
            args,
        });
        this.path = path;
        this.targetDir = targetDir;
    }

    async writing() {
        this.copyDirectory({
            context: {
                version: require('../../package.json').version,
            },
            path: this.path,
            target: this.targetDir,
        });
    }
}
