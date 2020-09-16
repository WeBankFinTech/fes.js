const path = require('path');
const fs = require('fs');
const log = require('./log');

function generateConfig(command, env) {
    // cli目录
    const CLI_DIR = path.dirname(path.dirname(fs.realpathSync(process.argv[1])));
    // 解决git-bash目录问题
    const PROJECT_DIR = process.env.PWD || process.cwd();
    const FES_DIR = path.resolve(PROJECT_DIR, './node_modules/@webank/fes-core');

    const PROJECT_DIST_DIR = path.resolve(PROJECT_DIR, 'dist');
    const PROJECT_CACHE_DIR = path.resolve(PROJECT_DIR, './.cache');
    const PROJECT_PAGE_DIR = path.resolve(PROJECT_DIR, './src/pages');
    const PROJECT_CPN_DIR = path.resolve(PROJECT_DIR, './src/components');
    const PROJECT_STATIC_DIR = path.join(PROJECT_DIR, './src/static');
    const projectName = path.basename(PROJECT_DIR);

    const fesConfigFile = path.join(PROJECT_DIR, 'fes.config.js');

    const config = {
        command,
        env,
        ports: {
            server: 5000,
            liveReload: 35729
        },
        projectName,
        folders: {
            CLI_DIR,
            FES_DIR,
            PROJECT_DIR,
            PROJECT_STATIC_DIR,
            PROJECT_DIST_DIR,
            PROJECT_CACHE_DIR,
            PROJECT_PAGE_DIR,
            PROJECT_CPN_DIR
        }
    };

    if (fs.existsSync(fesConfigFile)) {
        try {
            // eslint-disable-next-line
            const fesCofig = require(path.join(config.folders.PROJECT_DIR, 'fes.config.js'));
            config.CDN = fesCofig.env[config.env].cdn;
            config.needCDN = !!config.CDN;
            config.compress = fesCofig.compress;
            config.lazyRouter = fesCofig.lazyRouter;
        } catch (e) {
            config.needCDN = false;
        }
    }

    if (!config.needCDN) {
        if (config.command === 'dev' || config.command === 'build') {
            log.warn('项目没有配置cdn，打包之后将不会请求cdn的地址，请开发者注意！！');
        }
    }

    return config;
}


module.exports = generateConfig;
