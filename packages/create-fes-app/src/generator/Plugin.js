import { Generator } from '@fesjs/utils';

export default class AppGenerator extends Generator {
    constructor({
        cwd, args, path, targetDir, name
    }) {
        super({
            cwd,
            args
        });
        this.path = path;
        this.targetDir = targetDir;
        this.name = name;
    }

    async writing() {
        this.copyDirectory({
            context: {
                version: require('../../package.json').version,
                name: this.name
            },
            path: this.path,
            target: this.targetDir
        });
    }
}
