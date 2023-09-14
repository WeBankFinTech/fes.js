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
            'index.{js,ts,jsx,tsx,vue}',
            hasSrc && 'src/**/*.{js,ts,jsx,tsx,vue}',
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
            'ts',
            'tsx',
            'json',
            // tell Jest to handle *.vue files
            'vue',
        ],
        transform: {
            '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
                require.resolve('jest-transform-stub'),
            // process *.vue files with vue-jest
            '^.+\\.vue$': require.resolve('@vue/vue3-jest'),
            '^.+\\.jsx?$': require.resolve('../helpers/transformers/javascript'),
            // process *.ts files with ts-jest
            '^.+\\.tsx?$': [
                require.resolve('ts-jest'),
                {
                    // ts-jest configuration goes here
                },
            ],
        },
        transformIgnorePatterns: ['/node_modules/'],
        // support the same @ -> src alias mapping in source code
        moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/src/$1',
        },
        testMatch: [`**/tests/**/*.(${testMatchTypes.join('|')}).[jt]s?(x)`, '**/__tests__/**/*.[jt]s?(x)'],
        // https://github.com/facebook/jest/issues/6766
        testEnvironmentOptions: {
            url: 'http://localhost/',
        },
        watchPlugins: [require.resolve('jest-watch-typeahead/filename'), require.resolve('jest-watch-typeahead/testname')],
        verbose: true,
    };
};
