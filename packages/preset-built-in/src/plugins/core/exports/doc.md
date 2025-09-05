# 为了避免在运行时循环依赖

将 exports 拆分成 coreExports 和 pluginExports，第三方插件只能依赖 coreExports，插件之间的运行时依赖，通过 runtime plugin 解耦。