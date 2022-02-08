import { createPinia } from 'pinia'
{{{IMPORT_PLUGINS}}};

const pinia = createPinia();

{{#PLUGINS}}
pinia.use({{.}});
{{/PLUGINS}}

const install = function (app) {
    app.use(pinia);
}

export {
    install,
    pinia,
};
