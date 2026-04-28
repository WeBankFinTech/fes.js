import type { CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';
import type { PluginOption } from 'vite';
import { load } from 'cheerio';

function createQiankunHelper(qiankunName: string) {
    return `
const createDeffer = (hookName) => {
  const d = new Promise((resolve, reject) => {
    window.proxy && (window.proxy[\`vite\${hookName}\`] = resolve)
  })
  return props => d.then(fn => fn(props));
}
const bootstrap = createDeffer('bootstrap');
const mount = createDeffer('mount');
const unmount = createDeffer('unmount');
const update = createDeffer('update');
;(global => {
  global.qiankunName = '${qiankunName}';
  global['${qiankunName}'] = {
    bootstrap,
    mount,
    unmount,
    update
  };
})(window);
`;
}

function createImportFinallyResolve(qiankunName: string) {
    return `
const qiankunLifeCycle = window.moudleQiankunAppLifeCycles && window.moudleQiankunAppLifeCycles['${qiankunName}'];
if (qiankunLifeCycle) {
  window.proxy.vitemount((props) => qiankunLifeCycle.mount(props));
  window.proxy.viteunmount((props) => qiankunLifeCycle.unmount(props));
  window.proxy.vitebootstrap(() => qiankunLifeCycle.bootstrap());
  window.proxy.viteupdate((props) => qiankunLifeCycle.update(props));
}
`;
}

export interface MicroOption {
    useDevMode?: boolean;
}

function module2DynamicImport($: CheerioAPI, scriptTag: Element | undefined, isProduction: boolean, microOption: MicroOption) {
    if (!scriptTag) {
        return;
    }
    const script$ = $(scriptTag);
    const moduleSrc = script$.attr('src');
    let appendBase = '';
    if (microOption.useDevMode && !isProduction) {
        appendBase = '(window.proxy ? (window.proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + \'..\') : \'\') + ';
    }
    script$.removeAttr('src');
    script$.removeAttr('type');
    script$.html(`import(${appendBase}'${moduleSrc}')`);
    return script$;
}

function qiankunPlugin(qiankunName: string, microOption: MicroOption = {}): PluginOption {
    let isProduction = false;
    let base = '';

    return {
        name: 'qiankun-html-transform',
        configResolved(config) {
            isProduction = config.command === 'build' || config.isProduction;
            base = config.base;
        },
        configureServer(server) {
            return () => {
                server.middlewares.use((req, res, next) => {
                    if (isProduction || !microOption.useDevMode) {
                        next();
                        return;
                    }
                    const end = res.end.bind(res);
                    (res as any).end = (...args: any[]) => {
                        let [htmlStr, ...rest] = args;
                        if (typeof htmlStr === 'string') {
                            const $ = load(htmlStr);
                            module2DynamicImport($, $(`script[src="${base}@vite/client"]`).get(0), isProduction, microOption);
                            htmlStr = $.html();
                        }
                        end(htmlStr, ...rest);
                    };
                    next();
                });
            };
        },
        transformIndexHtml(html: string) {
            const $ = load(html);
            const moduleTags = $('body script[type=module], head script[crossorigin=""]');
            if (!moduleTags || !moduleTags.length) {
                return;
            }

            // Remove modulepreload links — they won't work correctly in qiankun
            $('link[rel="modulepreload"]').remove();

            const len = moduleTags.length;
            moduleTags.each((i, moduleTag) => {
                const script$ = module2DynamicImport($, moduleTag, isProduction, microOption);
                if (len - 1 === i) {
                    script$?.html(`${script$.html()}.finally(() => {${createImportFinallyResolve(qiankunName)}})`);
                }
            });

            $('body').append(`<script>${createQiankunHelper(qiankunName)}</script>`);
            return $.html();
        },
    };
}

export default qiankunPlugin;
