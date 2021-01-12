import { inject } from "vue";

const modelKey = Symbol("plugin-model");

{{{userImports}}}
{{{extraImports}}}

export const models = { 
{{#extraModels}}
    {{{extraModels}}},
{{/extraModels}}
{{#userModels}}
    {{{userModels}}},
{{/userModels}}
}
const cache = new Map();

export const install = (app)=>{
    const useModel = (name) => {
        const model = models[name];
        if(model === undefined){
            throw new Error("[plugin-model]: useModel, name is undefined.");
        }
        if (typeof model !== "function") {
            throw new Error("[plugin-model]: useModel is not a function.");
        }
        if(!cache.has(name)){
            cache.set(name, model())
        }
        return cache.get(name)
    };
    app.provide(modelKey, useModel);
}

export const useModel = (name) => {
    return inject(modelKey)(name);
};


