import { existsSync } from 'fs';
import { join } from 'path';

export default (cwd, args) => {
    const testMatchTypes = ['spec', 'test'];
    if (args.e2e) {
        testMatchTypes.push('e2e');
    }
    const hasSrc = existsSync(join(cwd, 'src'));
    return {
        collectCoverageFrom: [
            'index.{js,jsx,vue}',
            hasSrc && 'src/**/*.{js,jsx,vue}',
            '!**/.fes/**',
            '!**/typings/**',
            '!**/types/**',
            '!**/fixtures/**',
            '!**/examples/**',
            '!**/*.d.ts',
        ].filter(Boolean),
        moduleFileExtensions: [
            'js',
            'jsx',
            'json',
            // tell Jest to handle *.vue files
            'vue',
        ],
        transform: {
            // process *.vue files with vue-jest
            '^.+\\.vue$': require.resolve('vue3-jest'),
            '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
                require.resolve('jest-transform-stub'),
            '^.+\\.jsx?$': require.resolve('../helpers/transformers/javascript'),
        },
        transformIgnorePatterns: ['/node_modules/'],
        // support the same @ -> src alias mapping in source code
        moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/src/$1',
        },
        testMatch: [`**/tests/**/*.(${testMatchTypes.join('|')}).[jt]s?(x)`, '**/__tests__/**/*.[jt]s?(x)'],
        // https://github.com/facebook/jest/issues/6766
        testURL: 'http://localhost/',
        watchPlugins: [require.resolve('jest-watch-typeahead/filename'), require.resolve('jest-watch-typeahead/testname')],
        verbose: true,
    };
};
