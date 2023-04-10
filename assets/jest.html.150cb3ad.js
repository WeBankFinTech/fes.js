import{_ as a,r as l,o as r,c as d,b as n,d as e,a as i,f as t}from"./app.102605ed.js";const o={},c=n("h1",{id:"fesjs-plugin-jest",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#fesjs-plugin-jest","aria-hidden":"true"},"#"),e(" @fesjs/plugin-jest")],-1),u={href:"https://www.jestjs.cn/",target:"_blank",rel:"noopener noreferrer"},v=t(`<h2 id="启用方式" tabindex="-1"><a class="header-anchor" href="#启用方式" aria-hidden="true">#</a> 启用方式</h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;@fesjs/fes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;@fesjs/plugin-jest&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="约定" tabindex="-1"><a class="header-anchor" href="#约定" aria-hidden="true">#</a> 约定</h2><ul><li>项目根目录下 <code>tests</code> 和 <code>__tests__</code> 文件夹中的 <code>js</code> 或者 <code>jsx</code> 文件为测试文件。</li><li>需要覆盖测试的文件范围是<code>src/index.{js,jsx,ts,tsx,vue}</code></li></ul><p>例如测试文件 <code>add.js</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fes-template
├── __tests__
│   └── add.js
└── src
    ├── .fes
    └── utils
        └── sum.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内容如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> sum <span class="token keyword">from</span> <span class="token string">&#39;@/utils/sum&#39;</span><span class="token punctuation">;</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;adds 1 + 2 to equal 3&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h2><p>在 <code>fes</code> 上注册 <code>test</code> 命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ fes <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>`,13),m={href:"https://www.jestjs.cn/docs/configuration#reference",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"-h",-1),h=t(`<h3 id="args-变量" tabindex="-1"><a class="header-anchor" href="#args-变量" aria-hidden="true">#</a> args 变量</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ fes <span class="token builtin class-name">test</span> <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印配置帮助信息:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ fes test -h
Usage: fes test [options]

run unit tests with jest

Options:
  --all                         The opposite of \`onlyChanged\`. If \`onlyChanged\`
                                is set by default, running jest with \`--all\`
                                will force Jest to run all tests instead of
                                running only tests related to changed files.
  --automock                    Automock all files by default.
  -b --bail                     Exit the test suite immediately after \`n\`
                                number of failing tests.
  --browser                     Respect the &quot;browser&quot; field in package.json
                                when resolving modules. Some packages export
                                different versions based on whether they are
                                operating in node.js or a browser.
  --cache                       Whether to use the transform cache. Disable the
                                cache using --no-cache.
  --cacheDirectory              The directory where Jest should store its
                                cached  dependency information.
  --changedFilesWithAncestor    Runs tests related to the current changes and
                                the changes made in the last commit. Behaves
                                similarly to \`--onlyChanged\`.
  --changedSince                Runs tests related to the changes since the
                                provided branch. If the current branch has
                                diverged from the given branch, then only
                                changes made locally will be tested. Behaves
                                similarly to \`--onlyChanged\`.
  --ci                          Whether to run Jest in continuous integration
                                (CI) mode. This option is on by default in most
                                popular CI environments. It will prevent
                                snapshots from being written unless explicitly
                                requested.
  --clearCache                  Clears the configured Jest cache directory and
                                then exits. Default directory can be found by
                                calling jest --showConfig
  --clearMocks                  Automatically clear mock calls and instances
                                between every test. Equivalent to calling
                                jest.clearAllMocks() between each test.
  --collectCoverage             Alias for --coverage.
  --collectCoverageFrom         A glob pattern relative to &lt;rootDir&gt; matching
                                the files that coverage info needs to be
                                collected from.
  --collectCoverageOnlyFrom     Explicit list of paths coverage will be
                                restricted to.
  --color                       Forces test results output color highlighting
                                (even if stdout is not a TTY). Set to false if
                                you would like to have no colors.
  --colors                      Alias for \`--color\`.
  -c --config                   The path to a jest config file specifying how
                                to find and execute tests. If no rootDir is set
                                in the config, the directory containing the
                                config file is assumed to be the rootDir for
                                the project.This can also be a JSON encoded
                                value which Jest will use as configuration.
  --coverage                    Indicates that test coverage information should
                                be collected and reported in the output.
  --coverageDirectory           The directory where Jest should output its
                                coverage files.
  --coveragePathIgnorePatterns  An array of regexp pattern strings that are
                                matched against all file paths before executing
                                the test. If the file pathmatches any of the
                                patterns, coverage information will be skipped.
  --coverageProvider            Select between Babel and V8 to collect coverage
  --coverageReporters           A list of reporter names that Jest uses when
                                writing coverage reports. Any istanbul reporter
                                can be used.
  --coverageThreshold           A JSON string with which will be used to
                                configure minimum threshold enforcement for
                                coverage results
  --debug                       Print debugging info about your jest config.
  --detectLeaks                 **EXPERIMENTAL**: Detect memory leaks in tests.
                                After executing a test, it will try to garbage
                                collect the global object used, and fail if it
                                was leaked
  --detectOpenHandles           Print out remaining open handles preventing
                                Jest from exiting at the end of a test run.
                                Implies \`runInBand\`.
  --env                         The test environment used for all tests. This
                                can point to any file or node module. Examples:
                                \`jsdom\`, \`node\` or \`path/to/my-environment.js\`
  --errorOnDeprecated           Make calling deprecated APIs throw helpful
                                error messages.
  -e --expand                   Use this flag to show full diffs instead of a
                                patch.
  --filter                      Path to a module exporting a filtering
                                function. This method receives a list of tests
                                which can be manipulated to exclude tests from
                                running. Especially useful when used in
                                conjunction with a testing infrastructure to
                                filter known broken tests.
  --findRelatedTests            Find related tests for a list of source files
                                that were passed in as arguments. Useful for
                                pre-commit hook integration to run the minimal
                                amount of tests necessary.
  --forceExit                   Force Jest to exit after all tests have
                                completed running. This is useful when
                                resources set up by test code cannot be
                                adequately cleaned up.
  --globalSetup                 The path to a module that runs before All
                                Tests.
  --globalTeardown              The path to a module that runs after All Tests.
  --globals                     A JSON string with map of global variables that
                                need to be available in all test environments.
  --haste                       A JSON string with map of variables for the
                                haste module system
  --init                        Generate a basic configuration file
  --injectGlobals               Should Jest inject global variables or not
  --json                        Prints the test results in JSON. This mode will
                                send all other test output and user messages to
                                stderr.
  --lastCommit                  Run all tests affected by file changes in the
                                last commit made. Behaves similarly to
                                \`--onlyChanged\`.
  --listTests                   Lists all tests Jest will run given the
                                arguments and exits. Most useful in a CI system
                                together with \`--findRelatedTests\` to determine
                                the tests Jest will run based on specific files
  --logHeapUsage                Logs the heap usage after every test. Useful to
                                debug memory leaks. Use together with
                                \`--runInBand\` and \`--expose-gc\` in node.
  --mapCoverage                 Maps code coverage reports against original source code when transformers supply source maps.

  DEPRECATED
  --maxConcurrency              Specifies the maximum number of tests that are
                                allowed to runconcurrently. This only affects
                                tests using \`test.concurrent\`.
  -w --maxWorkers               Specifies the maximum number of workers the
                                worker-pool will spawn for running tests. This
                                defaults to the number of the cores available
                                on your machine. (its usually best not to
                                override this default)
  --moduleDirectories           An array of directory names to be searched
                                recursively up from the requiring module&#39;s
                                location.
  --moduleFileExtensions        An array of file extensions your modules use.
                                If you require modules without specifying a
                                file extension, these are the extensions Jest
                                will look for.
  --moduleNameMapper            A JSON string with a map from regular
                                expressions to module names or to arrays of
                                module names that allow to stub out resources,
                                like images or styles with a single module
  --modulePathIgnorePatterns    An array of regexp pattern strings that are
                                matched against all module paths before those
                                paths are to be considered &quot;visible&quot; to the
                                module loader.
  --modulePaths                 An alternative API to setting the NODE_PATH env
                                variable, modulePaths is an array of absolute
                                paths to additional locations to search when
                                resolving modules.
  --noStackTrace                Disables stack trace in test results output
  --notify                      Activates notifications for test results.
  --notifyMode                  Specifies when notifications will appear for
                                test results.
  -o --onlyChanged              Attempts to identify which tests to run based
                                on which files have changed in the current
                                repository. Only works if you&#39;re running tests
                                in a git or hg repository at the moment.
  -f --onlyFailures             Run tests that failed in the previous
                                execution.
  --outputFile                  Write test results to a file when the --json
                                option is also specified.
  --passWithNoTests             Will not fail if no tests are found (for
                                example while using \`--testPathPattern\`.)
  --preset                      A preset that is used as a base for Jest&#39;s
                                configuration.
  --prettierPath                The path to the &quot;prettier&quot; module used for
                                inline snapshots.
  --projects                    A list of projects that use Jest to run all
                                tests of all projects in a single instance of
                                Jest.
  --reporters                   A list of custom reporters for the test suite.
  --resetMocks                  Automatically reset mock state between every
                                test. Equivalent to calling
                                jest.resetAllMocks() between each test.
  --resetModules                If enabled, the module registry for every test
                                file will be reset before running each
                                individual test.
  --resolver                    A JSON string which allows the use of a custom
                                resolver.
  --restoreMocks                Automatically restore mock state and
                                implementation between every test. Equivalent
                                to calling jest.restoreAllMocks() between each
                                test.
  --rootDir                     The root directory that Jest should scan for
                                tests and modules within.
  --roots                       A list of paths to directories that Jest should
                                use to search for files in.
  -i --runInBand                Run all tests serially in the current process
                                (rather than creating a worker pool of child
                                processes that run tests). This is sometimes
                                useful for debugging, but such use cases are
                                pretty rare.
  --runTestsByPath              Used when provided patterns are exact file
                                paths. This avoids converting them into a
                                regular expression and matching it against
                                every single file.
  --runner                      Allows to use a custom runner instead of Jest&#39;s
                                default test runner.
  --selectProjects              Run only the tests of the specified
                                projects.Jest uses the attribute \`displayName\`
                                in the configuration to identify each project.
  --setupFiles                  A list of paths to modules that run some code
                                to configure or set up the testing environment
                                before each test.
  --setupFilesAfterEnv          A list of paths to modules that run some code
                                to configure or set up the testing framework
                                before each test
  --showConfig                  Print your jest config and then exits.
  --silent                      Prevent tests from printing messages through
                                the console.
  --skipFilter                  Disables the filter provided by --filter.
                                Useful for CI jobs, or local enforcement when
                                fixing tests.
  --snapshotSerializers         A list of paths to snapshot serializer modules
                                Jest should use for snapshot testing.
  --testEnvironment             Alias for --env
  --testEnvironmentOptions      Test environment options that will be passed to
                                the testEnvironment. The relevant options
                                depend on the environment.
  --testFailureExitCode         Exit code of \`jest\` command if the test run
                                failed
  --testLocationInResults       Add \`location\` information to the test results
  --testMatch                   The glob patterns Jest uses to detect test
                                files.
  -t --testNamePattern          Run only tests with a name that matches the
                                regex pattern.
  --testPathIgnorePatterns      An array of regexp pattern strings that are
                                matched against all test paths before executing
                                the test. If the test path matches any of the
                                patterns, it will be skipped.
  --testPathPattern             A regexp pattern string that is matched against
                                all tests paths before executing the test.
  --testRegex                   A string or array of string regexp patterns
                                that Jest uses to detect test files.
  --testResultsProcessor        Allows the use of a custom results processor.
                                This processor must be a node module that
                                exports a function expecting as the first
                                argument the result object.
  --testRunner                  Allows to specify a custom test runner. The
                                default is  \`jasmine2\`. A path to a custom test
                                runner can be provided:
                                \`&lt;rootDir&gt;/path/to/testRunner.js\`.
  --testSequencer               Allows to specify a custom test sequencer. The
                                default is \`@jest/test-sequencer\`. A path to a
                                custom test sequencer can be provided:
                                \`&lt;rootDir&gt;/path/to/testSequencer.js\`
  --testTimeout                 This option sets the default timeouts of test
                                cases.
  --testURL                     This option sets the URL for the jsdom
                                environment.
  --timers                      Setting this value to fake allows the use of
                                fake timers for functions such as setTimeout.
  --transform                   A JSON string which maps from regular
                                expressions to paths to transformers.
  --transformIgnorePatterns     An array of regexp pattern strings that are
                                matched against all source file paths before
                                transformation.
  --unmockedModulePathPatterns  An array of regexp pattern strings that are
                                matched against all modules before the module
                                loader will automatically return a mock for
                                them.
  -u --updateSnapshot           Use this flag to re-record snapshots. Can be
                                used together with a test suite pattern or with
                                \`--testNamePattern\` to re-record snapshot for
                                test matching the pattern
  --useStderr                   Divert all output to stderr.
  --verbose                     Display individual test results with the test
                                suite hierarchy.
  --watch                       Watch files for changes and rerun tests related
                                to changed files. If you want to re-run all
                                tests when a file has changed, use the
                                \`--watchAll\` option.
  --watchAll                    Watch files for changes and rerun all tests. If
                                you want to re-run only the tests related to
                                the changed files, use the \`--watch\` option.
  --watchPathIgnorePatterns     An array of regexp pattern strings that are
                                matched against all paths before trigger test
                                re-run in watch mode. If the test path matches
                                any of the patterns, it will be skipped.
  --watchman                    Whether to use watchman for file crawling.
                                Disable using --no-watchman.
  -h, --help                    display help for command

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如覆盖测试：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fes test --coverage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><p>除了插件内置的默认配置之外，插件遵循 <code>Jest</code>的配置文件规范，约定项目根目录下的 <code>jest.config.js</code> 为用户配置文件，约定 <code>packages.json</code> 的 <code>jest</code> 属性内容也是配置。</p><h3 id="优先级" tabindex="-1"><a class="header-anchor" href="#优先级" aria-hidden="true">#</a> 优先级</h3><p><code>args</code> 配置 &gt; <code>package.json</code>中的 <code>jest</code> &gt; <code>jest.config.js</code> &gt; 默认配置</p>`,10);function p(f,g){const s=l("ExternalLinkIcon");return r(),d("div",null,[c,n("p",null,[e("集成 "),n("a",u,[e("Jest"),i(s)]),e(" 测试框架，目前只支持单元测试和覆盖测试。")]),v,n("p",null,[e("插件实现 Jest 的全部配置，具体请查看 "),n("a",m,[e("文档-configuration"),i(s)]),e("。 也可以使用 "),b,e(" 打印配置帮助信息：")]),h])}const y=a(o,[["render",p],["__file","jest.html.vue"]]);export{y as default};
