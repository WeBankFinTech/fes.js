import { plugin } from './plugin';
{{#plugins}}
import * as Plugin_{{{ index }}} from '{{{ path }}}';
{{/plugins}}

function handleDefaultExport(pluginExports) {
  // 避免编译警告
  const defaultKey = 'default';
  if (pluginExports[defaultKey]) {
    const {default: defaultExport, ...otherExports} = pluginExports;
    return {
      ...defaultExport,
      ...otherExports
    }
  }
  return pluginExports;
}

{{#plugins}}
  plugin.register({
    apply: handleDefaultExport(Plugin_{{{ index }}}),
    path: '{{{ path }}}',
  });
{{/plugins}}
