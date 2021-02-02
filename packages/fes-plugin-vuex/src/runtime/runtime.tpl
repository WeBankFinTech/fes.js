import { createStore } from 'vuex'
{{{IMPORT_MODULES}}}
{{{IMPORT_PLUGINS}}}

export function onAppCreated({ app }) {
    app.use(createStore({
        modules: {{{MODULES}}},
        plugins: {{{PLUGINS}}}
    }))
}