{{#ICON_NAMES}}
import {{.}} from './icons/{{.}}';
{{/ICON_NAMES}}

export default {
    {{#ICON_NAMES}}
    {{.}},
    {{/ICON_NAMES}}
};