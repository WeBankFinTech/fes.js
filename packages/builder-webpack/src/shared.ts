import type HtmlWebpackPlugin from 'html-webpack-plugin';
import type { LoaderOptions, PluginOptions } from 'mini-css-extract-plugin';
import type Config from 'webpack-5-chain';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface CopyFileType {
    from: string;
    to: string;
}

export const OWNER_DIR: string = join(dirname(fileURLToPath(import.meta.url)), '..');

export const esmRequire = createRequire(import.meta.url);

export function esmResolve(specifier: string) {
    const esmRequire = createRequire(import.meta.url);
    return esmRequire.resolve(specifier);
}

export interface WebpackBuildConfig {
    analyze?: {
        analyzerMode?: 'server' | 'static' | 'disabled';
        analyzerHost?: string;
        analyzerPort?: number | 'auto';
        openAnalyzer?: boolean;
        generateStatsFile?: boolean;
        statsFilename?: string;
        logLevel?: 'info' | 'warn' | 'error' | 'silent';
        defaultSizes?: 'stat' | 'parsed' | 'gzip';
    };
    chainWebpack?: (memo: Config, args: any) => void;
    copy?: CopyFileType | CopyFileType[];
    cssLoader?: {
        url?: boolean | ((url: string, resourcePath: string) => boolean);
        import?: boolean | { filter: (url: string, media: string, resourcePath: string) => boolean };
        modules?: boolean | string | object;
        sourceMap?: boolean;
        importLoaders?: number;
        onlyLocals?: boolean;
        esModule?: boolean;
        localsConvention?: 'asIs' | 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly';
    };
    devServer?: {
        port?: number;
        host?: string;
        https?: boolean;
        headers?: object;
        [key: string]: any;
    };
    devtool?: Config.DevTool;
    exportStatic?: {
        htmlSuffix?: boolean;
        dynamicRoot?: boolean;
    };
    externals?: string | ((data: any) => any);
    extraBabelPlugins?: [];
    extraBabelPresets?: [];
    extraPostCSSPlugins?: [];
    html?: HtmlWebpackPlugin.Options;
    lessLoader?: Record<string, any>;
    nodeModulesTransform?: {
        exclude: string[];
    };
    postcssLoader?: Record<string, any>;
    vueLoader?: object;
    extraCSS?: {
        loader?: LoaderOptions;
        plugin?: PluginOptions;
    };
}
