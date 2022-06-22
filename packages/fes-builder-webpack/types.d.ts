import Config from 'webpack-chain'
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'

interface CopyFileType {
    from: string;
    to: string;
}

declare module "@fesjs/fes" {
    interface PluginBuildConfig {
        analyze?: {
            analyzerMode?: 'server' | 'static' | 'disabled';
            analyzerHost?: string;
            analyzerPort?: number | 'auto';
            openAnalyzer?: boolean;
            generateStatsFile?:  boolean;
            statsFilename?: string;
            logLevel?: 'info' | 'warn' | 'error' | 'silent';
            defaultSizes?: 'stat' | 'parsed' | 'gzip'
        };
        chainWebpack?: (memo: Config, args: {env: string, webpack: typeof webpack}) => void;
        copy?: CopyFileType | CopyFileType[];
        cssLoader?: {
            url?: boolean | ((url: string, resourcePath: string) => boolean);
            import?: boolean | ({ filter: (url: string, media: string, resourcePath: string) => boolean });
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
        devtool?: string;
        exportStatic?: {
            htmlSuffix?: boolean;
            dynamicRoot?: boolean;
        };
        externals?: object | string | Function;
        extraBabelPlugins?: [];
        extraBabelPresets?: [];
        extraPostCSSPlugins?: [];
        html?: HtmlWebpackPlugin.Options;
        lessLoader?: Record<string, any>;
        nodeModulesTransform?: {
            exclude: string[]
        };
        postcssLoader?: Record<string, any>;
        vueLoader?: object;
    }
}
