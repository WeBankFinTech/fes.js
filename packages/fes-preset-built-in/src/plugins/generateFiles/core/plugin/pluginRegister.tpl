import { plugin } from './plugin';
{{#plugins}}
import * as Plugin_{{{ index }}} from '{{{ path }}}';
{{/plugins}}

// 避免编译警告
const defaultKey = 'default';

{{#plugins}}
  plugin.register({
    apply: {...Plugin_{{{ index }}}[defaultKey], ...Plugin_{{{ index }}}},
    path: '{{{ path }}}',
  });
{{/plugins}}
