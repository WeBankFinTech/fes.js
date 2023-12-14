import process from 'node:process';
import { render } from 'ejs';
import { expand } from 'dotenv-expand';
import dotenv from 'dotenv';
import path, { dirname, join } from 'pathe';
import fse from 'fs-extra';
import { normalizePath } from 'vite';
import { parse } from 'node-html-parser';
import fg from 'fast-glob';
import consola from 'consola';
import { dim } from 'colorette';
import { minify } from 'html-minifier-terser';
import { createFilter } from '@rollup/pluginutils';
import history from './connectHistoryMiddleware';

function lookupFile(dir, formats, pathOnly = false) {
    for (const format of formats) {
        const fullPath = join(dir, format);
        if (fse.pathExistsSync(fullPath) && fse.statSync(fullPath).isFile())
            return pathOnly ? fullPath : fse.readFileSync(fullPath, 'utf-8');
    }
    const parentDir = dirname(dir);
    if (parentDir !== dir)
        return lookupFile(parentDir, formats, pathOnly);
}

function loadEnv(mode, envDir, prefix = '') {
    if (mode === 'local')
        throw new Error(`"local" cannot be used as a mode name because it conflicts with the .local postfix for .env files.`);

    const env = {};
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
                if (key.startsWith(prefix) && env[key] === undefined)
                    env[key] = value;

                else if (key === 'NODE_ENV')
                    process.env.VITE_USER_NODE_ENV = value;
            }
        }
    }
    return env;
}

async function isDirEmpty(dir) {
    return fse.readdir(dir).then(files => files.length === 0);
}

const DEFAULT_TEMPLATE = 'index.html';
const ignoreDirs = ['.', '', '/'];
const bodyInjectRE = /<\/body>/;

function createPlugin(userOptions = {}) {
    const { entry, template = DEFAULT_TEMPLATE, pages = [], verbose = false } = userOptions;
    let viteConfig;
    let env = {};
    return {
        name: 'vite:html',
        order: 'pre',
        configResolved(resolvedConfig) {
            viteConfig = resolvedConfig;
            env = loadEnv(viteConfig.mode, viteConfig.root, '');
        },
        config(conf) {
            const input = createInput(userOptions, conf);
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
        configureServer(server) {
            let _pages = [];
            const rewrites = [];
            if (!isMpa(viteConfig)) {
                const template2 = userOptions.template || DEFAULT_TEMPLATE;
                const filename = DEFAULT_TEMPLATE;
                _pages.push({
                    filename,
                    template: template2,
                });
            }
            else {
                _pages = pages.map(page => ({
                    filename: page.filename || DEFAULT_TEMPLATE,
                    template: page.template || DEFAULT_TEMPLATE,
                }));
            }
            const proxy = viteConfig.server?.proxy ?? {};
            const baseUrl = viteConfig.base ?? '/';
            const keys = Object.keys(proxy);
            let indexPage = null;
            for (const page of _pages) {
                if (page.filename !== 'index.html')
                    rewrites.push(createRewire(page.template, page, baseUrl, keys));

                else
                    indexPage = page;
            }
            if (indexPage)
                rewrites.push(createRewire('', indexPage, baseUrl, keys));

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
            async handler(html, ctx) {
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
            const outputDirs = [];
            if (isMpa(viteConfig) || pages.length) {
                for (const page of pages) {
                    const dir = path.dirname(page.template);
                    if (!ignoreDirs.includes(dir))
                        outputDirs.push(dir);
                }
            }
            else {
                const dir = path.dirname(template);
                if (!ignoreDirs.includes(dir))
                    outputDirs.push(dir);
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
                    if (isEmpty)
                        return fse.remove(item);
                }),
            );
        },
    };
}

function createInput({ pages = [], template = DEFAULT_TEMPLATE }, viteConfig) {
    const input = {};
    if (isMpa(viteConfig) || pages?.length) {
        const templates = pages.map(page => page.template);
        templates.forEach((temp) => {
            let dirName = path.dirname(temp);
            const file = path.basename(temp);
            dirName = dirName.replace(/\s+/g, '').replace(/\//g, '-');
            const key = dirName === '.' || dirName === 'public' || !dirName ? file.replace(/\.html/, '') : dirName;
            input[key] = path.resolve(viteConfig.root, temp);
        });
        return input;
    }
    const dir = path.dirname(template);
    if (ignoreDirs.includes(dir))
        return undefined;

    const file = path.basename(template);
    const key = file.replace(/\.html/, '');
    return {
        [key]: path.resolve(viteConfig.root, template),
    };
}

async function renderHtml(html, config) {
    const { injectOptions, viteConfig, env, entry, verbose } = config;
    const { data, ejsOptions } = injectOptions;
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

function getPage({ pages = [], entry, template = DEFAULT_TEMPLATE, inject = {} }, name, viteConfig) {
    let page;
    if (isMpa(viteConfig) || pages?.length)
        page = getPageConfig(name, pages, DEFAULT_TEMPLATE);

    else
        page = createSpaPage(entry, template, inject);

    return page;
}

function isMpa(viteConfig) {
    const input = viteConfig?.build?.rollupOptions?.input ?? undefined;
    return typeof input !== 'string' && Object.keys(input || {}).length > 1;
}

function removeEntryScript(html, verbose = false) {
    if (!html)
        return html;

    const root = parse(html);
    const scriptNodes = root.querySelectorAll('script[type=module]') || [];
    const removedNode = [];
    scriptNodes.forEach((item) => {
        removedNode.push(item.toString());
        item.parentNode.removeChild(item);
    });
    verbose
    && removedNode.length
    && consola.warn(`vite-plugin-html: Since you have already configured entry, ${dim(
            removedNode.toString(),
        )} is deleted. You may also delete it from the index.html.
        `);
    return root.toString();
}

function createSpaPage(entry, template, inject = {}) {
    return {
        entry,
        filename: 'index.html',
        template,
        injectOptions: inject,
    };
}

function getPageConfig(htmlName, pages, defaultPage) {
    const defaultPageOption = {
        filename: defaultPage,
        template: `./${defaultPage}`,
    };
    const page = pages.filter(page2 => path.resolve(`/${page2.template}`) === path.resolve(`/${htmlName}`))?.[0];
    return page ?? defaultPageOption ?? undefined;
}

function createRewire(reg, page, baseUrl, proxyUrlKeys) {
    return {
        from: new RegExp(`^/${reg}*`),
        to({ parsedUrl }) {
            const pathname = parsedUrl.pathname;
            const excludeBaseUrl = pathname.replace(baseUrl, '/');
            const template = path.resolve(baseUrl, page.template);
            if (excludeBaseUrl === '/')
                return template;

            const isApiUrl = proxyUrlKeys.some(item => pathname.startsWith(path.resolve(baseUrl, item)));
            return isApiUrl ? parsedUrl.path : template;
        },
    };
}

const htmlFilter = createFilter(['**/*.html']);

function getOptions(_minify) {
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

async function minifyHtml(html, minify$1) {
    if (typeof minify$1 === 'boolean' && !minify$1)
        return html;

    let minifyOptions = minify$1;
    if (typeof minify$1 === 'boolean' && minify$1)
        minifyOptions = getOptions(minify$1);

    const res = await minify(html, minifyOptions);
    return res;
}

function createMinifyHtmlPlugin({ _minify = true } = {}) {
    return {
        name: 'vite:minify-html',
        order: 'post',
        async generateBundle(_, outBundle) {
            if (_minify) {
                for (const bundle of Object.values(outBundle)) {
                    if (bundle.type === 'asset' && htmlFilter(bundle.fileName) && typeof bundle.source === 'string')
                        bundle.source = await minifyHtml(bundle.source, _minify);
                }
            }
        },
    };
}

consola.wrapConsole();

function createHtmlPlugin(userOptions = {}) {
    return [createPlugin(userOptions), createMinifyHtmlPlugin(userOptions)];
}

export { createHtmlPlugin };
