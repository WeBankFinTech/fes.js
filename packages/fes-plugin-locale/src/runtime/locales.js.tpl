import { merge } from 'lodash-es'
{{#REPLACE_IMPORTS}}
import {{importName}} from "{{{path}}}";
{{/REPLACE_IMPORTS}}

export default [
{{#REPLACE_LOCALES}}
{
    locale: "{{locale}}",
    message: merge({}, {{importNames}})
},
{{/REPLACE_LOCALES}}
];
