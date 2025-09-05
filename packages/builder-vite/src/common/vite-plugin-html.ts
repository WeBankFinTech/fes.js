import type { ConfigEnv, Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import process from 'node:process';
import { createFilter } from '@rollup/pluginutils';
import { dim } from 'colorette';
import consola from 'consola';
import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import { render } from 'ejs';
import fg from 'fast-glob';
import fse from 'fs-extra';
import { minify } from 'html-minifier-terser';
import { parse } from 'node-html-parser';
import path, { dirname, join } from 'pathe';
import { normalizePath } from 'vite';
import history from './connectHistoryMiddleware';

interface Env {
    [key: string]: string;
}

interface ParsedUrl {
    pathname: string;
    path: string;
}

interface Rewrites {
    from: RegExp;
    to: (params: { parsedUrl: ParsedUrl }) => string;
}

function lookupFile(dir: string, formats: string[], pathOnly = false): string | undefined {
    for (const format of formats) {
        const fullPath = join(dir, format);
        if (fse.pathExistsSync(fullPath) && fse.statSync(fullPath).isFile()) {
            return pathOnly ? fullPath : fse.readFileSync(fullPath, 'utf-8');
        }
    }
    const parentDir = dirname(dir);
    if (parentDir !== dir) {
        return lookupFile(parentDir, formats, pathOnly);
    }
}

function loadEnv(mode: string, envDir: string, prefix = ''): Env {
    if (mode === 'local') {
        throw new Error(`"local" cannot be used as a mode name because it conflicts with the .local postfix for .env files.`);
    }

    const env: Env = {};
    const envFiles = [`.env.${mode}.local`, `.env.${mode}`, `.env.local`, `.env`];
    for (const file of envFiles) {
        const _path = lookupFile(envDir, [file], true);
        if (_path) {
            const parsed = dotenv.parse(fse.readFileSync(_path));
            expand({
                parsed,
                ignoreProcessEnv: true,
            });
            for (const [key, value] of Object.entries(parsed)) {
                if (key.startsWith(prefix) && env[key] === undefined) {
                    env[key] = value;
                }

                else if (key === 'NODE_ENV') {
                    process.env.VITE_USER_NODE_ENV = value;
                }
            }
        }
    }
    return env;
}

async function isDirEmpty(dir: string): Promise<boolean> {
    return fse.readdir(dir).then(files => files.length === 0);
}

const DEFAULT_TEMPLATE = 'index.html';
const ignoreDirs = ['.', '', '/'];
const bodyInjectRE = /<\/body>/;

interface UserOptions {
    entry?: string;
    template?: string;
    pages?: Page[];
    verbose?: boolean;
    injectOptions?: InjectOptions;
    _minify?: boolean;
    [key: string]: any;
}

interface Page {
    filename?: string;
    template?: string;
    entry?: string;
    injectOptions?: InjectOptions;
}

interface InjectOptions {
    data?: Record<string, any>;
    ejsOptions?: any;
    tags?: any[];
}

function createPlugin(userOptions: UserOptions = {}): Plugin {
    const { entry, template = DEFAULT_TEMPLATE, pages = [], verbose = false } = userOptions;
    let viteConfig: ResolvedConfig;
    let env: Env = {};
    return {
        name: 'vite:html',
        enforce: 'pre',
        configResolved(resolvedConfig: ResolvedConfig) {
            viteConfig = resolvedConfig!;
            if (viteConfig.mode && viteConfig.root) {
                env = loadEnv(viteConfig.mode, viteConfig.root, '');
            }
        },
        config(config: any, env: ConfigEnv) {
            const input = createInput(userOptions, env);
            if (input) {
                return {
                    build: {
                        rollupOptions: {
                            input,
                        },
                    },
                };
            }
        },
        configureServer(server: ViteDevServer) {
            const _pages: Page[] = [];
            const rewrites: Rewrites[] = [];
            if (!isMpa(viteConfig)) {
                const template2 = userOptions.template || DEFAULT_TEMPLATE;
                const filename = DEFAULT_TEMPLATE;
                _pages.push({
                    filename,
                    template: template2,
                });
            }
            else {
                _pages.push(...pages.map(page => ({
                    filename: page.filename || DEFAULT_TEMPLATE,
                    template: page.template || DEFAULT_TEMPLATE,
                })));
            }
            const proxy = viteConfig.server?.proxy ?? {};
            const baseUrl = viteConfig.base ?? '/';
            const keys = Object.keys(proxy);
            let indexPage: Page | null = null;
            for (const page of _pages) {
                if (page.filename !== 'index.html') {
                    rewrites.push(createRewire(page.template || '', page, baseUrl, keys));
                }

                else { indexPage = page; }
            }
            if (indexPage) {
                rewrites.push(createRewire('', indexPage, baseUrl, keys));
            }

            server.middlewares.use(
                history(viteConfig, {
                    disableDotRule: undefined,
                    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
                    rewrites,
                }),
            );
        },
        transformIndexHtml: {
            order: 'pre',
            handler: async (html: string, ctx: any) => {
                const url = ctx.filename;
                const base = viteConfig.base;
                const excludeBaseUrl = url.replace(base, '/');
                const htmlName = path.relative(process.cwd(), excludeBaseUrl);
                const page = getPage(userOptions, htmlName, viteConfig);
                const { injectOptions = {} } = page;
                const _html = await renderHtml(html, {
                    injectOptions,
                    viteConfig,
                    env,
                    entry: page.entry || entry,
                    verbose,
                });
                const { tags = [] } = injectOptions;
                return {
                    html: _html,
                    tags,
                };
            },
        },
        async closeBundle() {
            const outputDirs: string[] = [];
            if (isMpa(viteConfig) || pages.length) {
                for (const page of pages) {
                    if (page.template) {
                        const dir = path.dirname(page.template);
                        if (!ignoreDirs.includes(dir)) {
                            outputDirs.push(dir);
                        }
                    }
                }
            }
            else {
                const dir = path.dirname(template);
                if (!ignoreDirs.includes(dir)) {
                    outputDirs.push(dir);
                }
            }
            const cwd = path.resolve(viteConfig.root, viteConfig.build.outDir);
            const htmlFiles = await fg(
                outputDirs.map(dir => `${dir}/*.html`),
                { cwd: path.resolve(cwd), absolute: true },
            );
            await Promise.all(
                htmlFiles.map(file =>
                    fse.move(file, path.resolve(cwd, path.basename(file)), {
                        overwrite: true,
                    }),
                ),
            );
            const htmlDirs = await fg(
                outputDirs.map(dir => dir),
                { cwd: path.resolve(cwd), onlyDirectories: true, absolute: true },
            );
            await Promise.all(
                htmlDirs.map(async (item) => {
                    const isEmpty = await isDirEmpty(item);
                    if (isEmpty) {
                        return fse.remove(item);
                    }
                }),
            );
        },
    };
}

function createInput({ pages = [], template = DEFAULT_TEMPLATE }: UserOptions, viteConfig: any) {
    const input: Record<string, string> = {};
    if (isMpa(viteConfig) || pages?.length) {
        const templates = pages.map(page => page.template);
        templates?.forEach((temp) => {
            if (temp) {
                let dirName = path.dirname(temp);
                const file = path.basename(temp);
                dirName = dirName.replace(/\s+/g, '').replace(/\//g, '-');
                const key = dirName === '.' || dirName === 'public' || !dirName ? file.replace(/\.html/, '') : dirName;
                input[key] = path.resolve(viteConfig?.root || '', temp);
            }
        });
        return input;
    }
    const dir = path.dirname(template || DEFAULT_TEMPLATE);
    if (ignoreDirs.includes(dir)) {
        return undefined;
    }

    const file = path.basename(template || DEFAULT_TEMPLATE);
    const key = file.replace(/\.html/, '');
    return {
        [key]: path.resolve(viteConfig?.root || '', template || DEFAULT_TEMPLATE),
    };
}

async function renderHtml(html: string, config: any): Promise<string> {
    const { injectOptions, viteConfig, env, entry, verbose } = config;
    const { data, ejsOptions } = injectOptions || {};
    const ejsData = {
        ...(viteConfig?.env ?? {}),
        ...(viteConfig?.define ?? {}),
        ...(env || {}),
        ...data,
    };
    let result = await render(html, ejsData, ejsOptions);
    if (entry) {
        result = removeEntryScript(result, verbose);
        result = result.replace(bodyInjectRE, `<script type="module" src="${normalizePath(`${entry}`)}"></script></body>`);
    }
    return result;
}

function getPage(userOptions: UserOptions, name: string, viteConfig: ResolvedConfig | undefined) {
    const { pages = [], entry, template = DEFAULT_TEMPLATE, inject = {} } = userOptions;
    let page;
    if (isMpa(viteConfig) || pages?.length) {
        page = getPageConfig(name, pages, DEFAULT_TEMPLATE);
    }

    else { page = createSpaPage(entry, template, inject); }

    return page;
}

function isMpa(viteConfig: ResolvedConfig | undefined): boolean {
    const input = viteConfig?.build?.rollupOptions?.input ?? undefined;
    return typeof input !== 'string' && Object.keys(input || {}).length > 1;
}

function removeEntryScript(html: string, verbose = false): string {
    if (!html) {
        return html;
    }

    const root = parse(html);
    const scriptNodes = root.querySelectorAll('script[type=module]') || [];
    const removedNode: string[] = [];
    scriptNodes.forEach((item) => {
        removedNode.push(item.toString());
        item.parentNode.removeChild(item);
    });
    if (verbose && removedNode.length) {
        consola.warn(`vite-plugin-html: Since you have already configured entry, ${dim(
            removedNode.toString(),
        )} is deleted. You may also delete it from the index.html.
        `);
    }
    return root.toString();
}

function createSpaPage(entry: string | undefined, template: string, inject: InjectOptions = {}): Page {
    return {
        entry,
        filename: 'index.html',
        template,
        injectOptions: inject,
    };
}

function getPageConfig(htmlName: string, pages: Page[], defaultPage: string) {
    const defaultPageOption = {
        filename: defaultPage,
        template: `./${defaultPage}`,
    };
    const page = pages.filter(page2 => path.resolve(`/${page2.template}`) === path.resolve(`/${htmlName}`))?.[0];
    return page ?? defaultPageOption ?? undefined;
}

function createRewire(reg: string, page: Page, baseUrl: string, proxyUrlKeys: string[]): Rewrites {
    return {
        from: new RegExp(`^/${reg}*`),
        to({ parsedUrl }: { parsedUrl: ParsedUrl }) {
            const pathname = parsedUrl.pathname;
            const excludeBaseUrl = pathname.replace(baseUrl, '/');
            const template = path.resolve(baseUrl, page.template || '');
            if (excludeBaseUrl === '/') {
                return template;
            }

            const isApiUrl = proxyUrlKeys.some(item => pathname.startsWith(path.resolve(baseUrl, item)));
            return isApiUrl ? parsedUrl.path : template;
        },
    };
}

const htmlFilter = createFilter(['**/*.html']);

function getOptions(_minify: boolean) {
    return {
        collapseWhitespace: _minify,
        keepClosingSlash: _minify,
        removeComments: _minify,
        removeRedundantAttributes: _minify,
        removeScriptTypeAttributes: _minify,
        removeStyleLinkTypeAttributes: _minify,
        useShortDoctype: _minify,
        minifyCSS: _minify,
    };
}

async function minifyHtml(html: string, minifyOptions: boolean | any): Promise<string> {
    if (typeof minifyOptions === 'boolean' && !minifyOptions) {
        return html;
    }

    let minifyConfig = minifyOptions;
    if (typeof minifyOptions === 'boolean' && minifyOptions) {
        minifyConfig = getOptions(minifyOptions);
    }

    const res = await minify(html, minifyConfig);
    return res;
}

function createMinifyHtmlPlugin({ _minify = true } = {}): Plugin {
    return {
        name: 'vite:minify-html',
        apply: 'build',
        async generateBundle(_, outBundle) {
            if (_minify) {
                for (const bundle of Object.values(outBundle)) {
                    if (bundle.type === 'asset' && htmlFilter(bundle.fileName) && typeof bundle.source === 'string') {
                        bundle.source = await minifyHtml(bundle.source, _minify);
                    }
                }
            }
        },
    };
}

consola.wrapConsole();

function createHtmlPlugin(userOptions: UserOptions = {}): Plugin[] {
    return [createPlugin(userOptions), createMinifyHtmlPlugin(userOptions)];
}

export { createHtmlPlugin };
export type { InjectOptions, Page, UserOptions };
