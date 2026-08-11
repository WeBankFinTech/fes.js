interface MangleOptions {
    safari10?: boolean;
}

interface CompressOptions {
    arrows?: boolean;
    collapse_vars?: boolean;
    comparisons?: boolean;
    computed_props?: boolean;
    hoist_funs?: boolean;
    hoist_props?: boolean;
    hoist_vars?: boolean;
    inline?: boolean;
    loops?: boolean;
    negate_iife?: boolean;
    properties?: boolean;
    reduce_funcs?: boolean;
    reduce_vars?: boolean;
    switches?: boolean;
    toplevel?: boolean;
    typeofs?: boolean;
    booleans?: boolean;
    if_return?: boolean;
    sequences?: boolean;
    unused?: boolean;
    conditionals?: boolean;
    dead_code?: boolean;
    evaluate?: boolean;
}

interface CompressionConfig {
    compress?: CompressOptions;
    mangle?: MangleOptions;
}

export interface BuildConfig {
    alias?: Record<string, string>;
    publicPath?: string;
    title?: string;
    inlineLimit?: number;
    define: Record<string, string>;
    autoprefixer?: {
        /** environment for `Browserslist` */
        env?: string;

        /** should Autoprefixer use Visual Cascade, if CSS is uncompressed */
        cascade?: boolean;

        /** should Autoprefixer add prefixes. */
        add?: boolean;

        /** should Autoprefixer [remove outdated] prefixes */
        remove?: boolean;

        /** should Autoprefixer add prefixes for @supports parameters. */
        supports?: boolean;

        /** should Autoprefixer add prefixes for flexbox properties */
        flexbox?: boolean | 'no-2009';

        /** should Autoprefixer add IE 10-11 prefixes for Grid Layout properties */
        grid?: boolean;

        /**
         * list of queries for target browsers.
         * Try to not use it.
         * The best practice is to use `.browserslistrc` config or `browserslist` key in `package.json`
         * to share target browsers with Babel, ESLint and Stylelint
         */
        overrideBrowserslist?: string | string[];

        /** do not raise error on unknown browser version in `Browserslist` config. */
        ignoreUnknownVersions?: boolean;
    };
    targets?: Record<string, string>;
    terserOptions?: CompressionConfig;
    outputPath?: string;
    proxy?: {
        [apiPrefix: string]: {
            target: string;
            changeOrigin?: boolean;
        };
    };
}
