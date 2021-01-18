import { Generator } from '@umijs/utils';

export default class AppGenerator extends Generator {
    constructor({
        cwd, args, path, targetDir
    }) {
        super({
            cwd,
            args
        });
        this.path = path;
        this.targetDir = targetDir;
    }

    async writing() {
        this.copyDirectory({
            context: {
                version: require('../../package').version
            },
            path: this.path,
            target: this.targetDir
        });
    }
}
