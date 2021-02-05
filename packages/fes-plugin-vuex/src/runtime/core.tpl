import { createStore } from 'vuex';
{{{IMPORT_MODULES}}};
{{{IMPORT_PLUGINS}}};

const modules = {{{MODULES}}};
const MUTATION_TYPES = {{{MUTATION_TYPES}}};
const ACTION_TYPES = {{{ACTION_TYPES}}};
const GETTER_TYPES = {{{GETTER_TYPES}}};
const conifg = {{{VUEX_CONFIG}}};


const install = function (app) {
    app.use(createStore({
        modules: modules,
        plugins: {{{PLUGINS}}},
        strict: conifg.strict,
        devtools: conifg.devtools
    }));
}

export {
    install,
    MUTATION_TYPES,
    ACTION_TYPES,
    GETTER_TYPES
};
