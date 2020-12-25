{{#ICON_NAMES}}
import smile from './icons/{{.}}';
{{/ICON_NAMES}}

export default {
    {{#ICON_NAMES}}
    {{.}}
    {{/ICON_NAMES}}
};