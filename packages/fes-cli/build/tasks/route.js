const render = require('json-templater/string');
const path = require('path');
const endOfLine = require('os').EOL;
const fs = require('fs-extra');
const getRoute = require('../preComplie/route');

function generateRoute(config) {
    const OUTPUT_PATH = path.resolve(config.folders.PROJECT_CACHE_DIR, 'routeConfig.js');
    const IMPORT_TEMPLATE = 'import {{name}} from \'{{path}}\';';

    const MAIN_TEMPLATE = `
{{include}}

export default {{routes}};
`;

    const routes = getRoute(config.folders.PROJECT_PAGE_DIR, config.folders.PROJECT_PAGE_DIR);

    const componentsTemplate = [];
    let template = '';
    if (config.lazyRouter) {
        const componentsObj = {};
        routes.components.forEach((item) => {
            componentsObj[item.name] = item.path;
        });
        // component: () => import( /* webpackChunkName: "home" */ '../views/Home.vue')
        template = render(MAIN_TEMPLATE, {
            include: '',
            routes: JSON.stringify(routes.newRoutes).replace(/"component":"(.+?)"/g, ($0, $1) => `"component": () => import( /* webpackChunkName: "${$1}" */ '${componentsObj[$1]}')`)
        });
    } else {
        routes.components.forEach((item) => {
            componentsTemplate.push(render(IMPORT_TEMPLATE, {
                name: item.name,
                path: item.path
            }));
        });

        template = render(MAIN_TEMPLATE, {
            include: componentsTemplate.join(endOfLine),
            routes: JSON.stringify(routes.newRoutes).replace(/"component":"(.+?)"/g, '"component": $1')
        });
    }

    fs.outputFileSync(OUTPUT_PATH, template);
}

module.exports = generateRoute;
