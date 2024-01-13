import{_ as s,o as a,c as n,V as e}from"./chunks/framework.b31a4d00.js";const u=JSON.parse('{"title":"@fesjs/plugin-jest","description":"","frontmatter":{},"headers":[],"relativePath":"reference/plugin/plugins/jest.md"}'),l={name:"reference/plugin/plugins/jest.md"},t=e(`<h1 id="fesjs-plugin-jest" tabindex="-1">@fesjs/plugin-jest <a class="header-anchor" href="#fesjs-plugin-jest" aria-label="Permalink to &quot;@fesjs/plugin-jest&quot;">​</a></h1><p>集成 <a href="https://www.jestjs.cn/" target="_blank" rel="noreferrer">Jest</a> 测试框架，目前只支持单元测试和覆盖测试。</p><h2 id="启用方式" tabindex="-1">启用方式 <a class="header-anchor" href="#启用方式" aria-label="Permalink to &quot;启用方式&quot;">​</a></h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">dependencies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">@fesjs/fes</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^3.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">@fesjs/plugin-jest</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^3.0.0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="约定" tabindex="-1">约定 <a class="header-anchor" href="#约定" aria-label="Permalink to &quot;约定&quot;">​</a></h2><ul><li>项目根目录下 <code>tests</code> 和 <code>__tests__</code> 文件夹中的 <code>js</code> 或者 <code>jsx</code> 文件为测试文件。</li><li>需要覆盖测试的文件范围是<code>src/index.{js,jsx,ts,tsx,vue}</code></li></ul><p>例如测试文件 <code>add.js</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">fes-template</span></span>
<span class="line"><span style="color:#babed8;">├── __tests__</span></span>
<span class="line"><span style="color:#babed8;">│   └── add.js</span></span>
<span class="line"><span style="color:#babed8;">└── src</span></span>
<span class="line"><span style="color:#babed8;">    ├── .fes</span></span>
<span class="line"><span style="color:#babed8;">    └── utils</span></span>
<span class="line"><span style="color:#babed8;">        └── sum.js</span></span></code></pre></div><p>内容如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> sum </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/sum</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">test</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">adds 1 + 2 to equal 3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">sum</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBe</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h2><p>在 <code>fes</code> 上注册 <code>test</code> 命令：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">test</span></span></code></pre></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><p>插件实现 Jest 的全部配置，具体请查看 <a href="https://www.jestjs.cn/docs/configuration#reference" target="_blank" rel="noreferrer">文档-configuration</a>。 也可以使用 <code>-h</code> 打印配置帮助信息：</p><h3 id="args-变量" tabindex="-1">args 变量 <a class="header-anchor" href="#args-变量" aria-label="Permalink to &quot;args 变量&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">test</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-h</span></span></code></pre></div><p>打印配置帮助信息:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#babed8;">$ fes test -h</span></span>
<span class="line"><span style="color:#babed8;">Usage: fes test [options]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">run unit tests with jest</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">Options:</span></span>
<span class="line"><span style="color:#babed8;">  --all                         The opposite of \`onlyChanged\`. If \`onlyChanged\`</span></span>
<span class="line"><span style="color:#babed8;">                                is set by default, running jest with \`--all\`</span></span>
<span class="line"><span style="color:#babed8;">                                will force Jest to run all tests instead of</span></span>
<span class="line"><span style="color:#babed8;">                                running only tests related to changed files.</span></span>
<span class="line"><span style="color:#babed8;">  --automock                    Automock all files by default.</span></span>
<span class="line"><span style="color:#babed8;">  -b --bail                     Exit the test suite immediately after \`n\`</span></span>
<span class="line"><span style="color:#babed8;">                                number of failing tests.</span></span>
<span class="line"><span style="color:#babed8;">  --browser                     Respect the &quot;browser&quot; field in package.json</span></span>
<span class="line"><span style="color:#babed8;">                                when resolving modules. Some packages export</span></span>
<span class="line"><span style="color:#babed8;">                                different versions based on whether they are</span></span>
<span class="line"><span style="color:#babed8;">                                operating in node.js or a browser.</span></span>
<span class="line"><span style="color:#babed8;">  --cache                       Whether to use the transform cache. Disable the</span></span>
<span class="line"><span style="color:#babed8;">                                cache using --no-cache.</span></span>
<span class="line"><span style="color:#babed8;">  --cacheDirectory              The directory where Jest should store its</span></span>
<span class="line"><span style="color:#babed8;">                                cached  dependency information.</span></span>
<span class="line"><span style="color:#babed8;">  --changedFilesWithAncestor    Runs tests related to the current changes and</span></span>
<span class="line"><span style="color:#babed8;">                                the changes made in the last commit. Behaves</span></span>
<span class="line"><span style="color:#babed8;">                                similarly to \`--onlyChanged\`.</span></span>
<span class="line"><span style="color:#babed8;">  --changedSince                Runs tests related to the changes since the</span></span>
<span class="line"><span style="color:#babed8;">                                provided branch. If the current branch has</span></span>
<span class="line"><span style="color:#babed8;">                                diverged from the given branch, then only</span></span>
<span class="line"><span style="color:#babed8;">                                changes made locally will be tested. Behaves</span></span>
<span class="line"><span style="color:#babed8;">                                similarly to \`--onlyChanged\`.</span></span>
<span class="line"><span style="color:#babed8;">  --ci                          Whether to run Jest in continuous integration</span></span>
<span class="line"><span style="color:#babed8;">                                (CI) mode. This option is on by default in most</span></span>
<span class="line"><span style="color:#babed8;">                                popular CI environments. It will prevent</span></span>
<span class="line"><span style="color:#babed8;">                                snapshots from being written unless explicitly</span></span>
<span class="line"><span style="color:#babed8;">                                requested.</span></span>
<span class="line"><span style="color:#babed8;">  --clearCache                  Clears the configured Jest cache directory and</span></span>
<span class="line"><span style="color:#babed8;">                                then exits. Default directory can be found by</span></span>
<span class="line"><span style="color:#babed8;">                                calling jest --showConfig</span></span>
<span class="line"><span style="color:#babed8;">  --clearMocks                  Automatically clear mock calls and instances</span></span>
<span class="line"><span style="color:#babed8;">                                between every test. Equivalent to calling</span></span>
<span class="line"><span style="color:#babed8;">                                jest.clearAllMocks() between each test.</span></span>
<span class="line"><span style="color:#babed8;">  --collectCoverage             Alias for --coverage.</span></span>
<span class="line"><span style="color:#babed8;">  --collectCoverageFrom         A glob pattern relative to &lt;rootDir&gt; matching</span></span>
<span class="line"><span style="color:#babed8;">                                the files that coverage info needs to be</span></span>
<span class="line"><span style="color:#babed8;">                                collected from.</span></span>
<span class="line"><span style="color:#babed8;">  --collectCoverageOnlyFrom     Explicit list of paths coverage will be</span></span>
<span class="line"><span style="color:#babed8;">                                restricted to.</span></span>
<span class="line"><span style="color:#babed8;">  --color                       Forces test results output color highlighting</span></span>
<span class="line"><span style="color:#babed8;">                                (even if stdout is not a TTY). Set to false if</span></span>
<span class="line"><span style="color:#babed8;">                                you would like to have no colors.</span></span>
<span class="line"><span style="color:#babed8;">  --colors                      Alias for \`--color\`.</span></span>
<span class="line"><span style="color:#babed8;">  -c --config                   The path to a jest config file specifying how</span></span>
<span class="line"><span style="color:#babed8;">                                to find and execute tests. If no rootDir is set</span></span>
<span class="line"><span style="color:#babed8;">                                in the config, the directory containing the</span></span>
<span class="line"><span style="color:#babed8;">                                config file is assumed to be the rootDir for</span></span>
<span class="line"><span style="color:#babed8;">                                the project.This can also be a JSON encoded</span></span>
<span class="line"><span style="color:#babed8;">                                value which Jest will use as configuration.</span></span>
<span class="line"><span style="color:#babed8;">  --coverage                    Indicates that test coverage information should</span></span>
<span class="line"><span style="color:#babed8;">                                be collected and reported in the output.</span></span>
<span class="line"><span style="color:#babed8;">  --coverageDirectory           The directory where Jest should output its</span></span>
<span class="line"><span style="color:#babed8;">                                coverage files.</span></span>
<span class="line"><span style="color:#babed8;">  --coveragePathIgnorePatterns  An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#babed8;">                                matched against all file paths before executing</span></span>
<span class="line"><span style="color:#babed8;">                                the test. If the file pathmatches any of the</span></span>
<span class="line"><span style="color:#babed8;">                                patterns, coverage information will be skipped.</span></span>
<span class="line"><span style="color:#babed8;">  --coverageProvider            Select between Babel and V8 to collect coverage</span></span>
<span class="line"><span style="color:#babed8;">  --coverageReporters           A list of reporter names that Jest uses when</span></span>
<span class="line"><span style="color:#babed8;">                                writing coverage reports. Any istanbul reporter</span></span>
<span class="line"><span style="color:#babed8;">                                can be used.</span></span>
<span class="line"><span style="color:#babed8;">  --coverageThreshold           A JSON string with which will be used to</span></span>
<span class="line"><span style="color:#babed8;">                                configure minimum threshold enforcement for</span></span>
<span class="line"><span style="color:#babed8;">                                coverage results</span></span>
<span class="line"><span style="color:#babed8;">  --debug                       Print debugging info about your jest config.</span></span>
<span class="line"><span style="color:#babed8;">  --detectLeaks                 **EXPERIMENTAL**: Detect memory leaks in tests.</span></span>
<span class="line"><span style="color:#babed8;">                                After executing a test, it will try to garbage</span></span>
<span class="line"><span style="color:#babed8;">                                collect the global object used, and fail if it</span></span>
<span class="line"><span style="color:#babed8;">                                was leaked</span></span>
<span class="line"><span style="color:#babed8;">  --detectOpenHandles           Print out remaining open handles preventing</span></span>
<span class="line"><span style="color:#babed8;">                                Jest from exiting at the end of a test run.</span></span>
<span class="line"><span style="color:#babed8;">                                Implies \`runInBand\`.</span></span>
<span class="line"><span style="color:#babed8;">  --env                         The test environment used for all tests. This</span></span>
<span class="line"><span style="color:#babed8;">                                can point to any file or node module. Examples:</span></span>
<span class="line"><span style="color:#babed8;">                                \`jsdom\`, \`node\` or \`path/to/my-environment.js\`</span></span>
<span class="line"><span style="color:#babed8;">  --errorOnDeprecated           Make calling deprecated APIs throw helpful</span></span>
<span class="line"><span style="color:#babed8;">                                error messages.</span></span>
<span class="line"><span style="color:#babed8;">  -e --expand                   Use this flag to show full diffs instead of a</span></span>
<span class="line"><span style="color:#babed8;">                                patch.</span></span>
<span class="line"><span style="color:#babed8;">  --filter                      Path to a module exporting a filtering</span></span>
<span class="line"><span style="color:#babed8;">                                function. This method receives a list of tests</span></span>
<span class="line"><span style="color:#babed8;">                                which can be manipulated to exclude tests from</span></span>
<span class="line"><span style="color:#babed8;">                                running. Especially useful when used in</span></span>
<span class="line"><span style="color:#babed8;">                                conjunction with a testing infrastructure to</span></span>
<span class="line"><span style="color:#babed8;">                                filter known broken tests.</span></span>
<span class="line"><span style="color:#babed8;">  --findRelatedTests            Find related tests for a list of source files</span></span>
<span class="line"><span style="color:#babed8;">                                that were passed in as arguments. Useful for</span></span>
<span class="line"><span style="color:#babed8;">                                pre-commit hook integration to run the minimal</span></span>
<span class="line"><span style="color:#babed8;">                                amount of tests necessary.</span></span>
<span class="line"><span style="color:#babed8;">  --forceExit                   Force Jest to exit after all tests have</span></span>
<span class="line"><span style="color:#babed8;">                                completed running. This is useful when</span></span>
<span class="line"><span style="color:#babed8;">                                resources set up by test code cannot be</span></span>
<span class="line"><span style="color:#babed8;">                                adequately cleaned up.</span></span>
<span class="line"><span style="color:#babed8;">  --globalSetup                 The path to a module that runs before All</span></span>
<span class="line"><span style="color:#babed8;">                                Tests.</span></span>
<span class="line"><span style="color:#babed8;">  --globalTeardown              The path to a module that runs after All Tests.</span></span>
<span class="line"><span style="color:#babed8;">  --globals                     A JSON string with map of global variables that</span></span>
<span class="line"><span style="color:#babed8;">                                need to be available in all test environments.</span></span>
<span class="line"><span style="color:#babed8;">  --haste                       A JSON string with map of variables for the</span></span>
<span class="line"><span style="color:#babed8;">                                haste module system</span></span>
<span class="line"><span style="color:#babed8;">  --init                        Generate a basic configuration file</span></span>
<span class="line"><span style="color:#babed8;">  --injectGlobals               Should Jest inject global variables or not</span></span>
<span class="line"><span style="color:#babed8;">  --json                        Prints the test results in JSON. This mode will</span></span>
<span class="line"><span style="color:#babed8;">                                send all other test output and user messages to</span></span>
<span class="line"><span style="color:#babed8;">                                stderr.</span></span>
<span class="line"><span style="color:#babed8;">  --lastCommit                  Run all tests affected by file changes in the</span></span>
<span class="line"><span style="color:#babed8;">                                last commit made. Behaves similarly to</span></span>
<span class="line"><span style="color:#babed8;">                                \`--onlyChanged\`.</span></span>
<span class="line"><span style="color:#babed8;">  --listTests                   Lists all tests Jest will run given the</span></span>
<span class="line"><span style="color:#babed8;">                                arguments and exits. Most useful in a CI system</span></span>
<span class="line"><span style="color:#babed8;">                                together with \`--findRelatedTests\` to determine</span></span>
<span class="line"><span style="color:#babed8;">                                the tests Jest will run based on specific files</span></span>
<span class="line"><span style="color:#babed8;">  --logHeapUsage                Logs the heap usage after every test. Useful to</span></span>
<span class="line"><span style="color:#babed8;">                                debug memory leaks. Use together with</span></span>
<span class="line"><span style="color:#babed8;">                                \`--runInBand\` and \`--expose-gc\` in node.</span></span>
<span class="line"><span style="color:#babed8;">  --mapCoverage                 Maps code coverage reports against original source code when transformers supply source maps.</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  DEPRECATED</span></span>
<span class="line"><span style="color:#babed8;">  --maxConcurrency              Specifies the maximum number of tests that are</span></span>
<span class="line"><span style="color:#babed8;">                                allowed to runconcurrently. This only affects</span></span>
<span class="line"><span style="color:#babed8;">                                tests using \`test.concurrent\`.</span></span>
<span class="line"><span style="color:#babed8;">  -w --maxWorkers               Specifies the maximum number of workers the</span></span>
<span class="line"><span style="color:#babed8;">                                worker-pool will spawn for running tests. This</span></span>
<span class="line"><span style="color:#babed8;">                                defaults to the number of the cores available</span></span>
<span class="line"><span style="color:#babed8;">                                on your machine. (its usually best not to</span></span>
<span class="line"><span style="color:#babed8;">                                override this default)</span></span>
<span class="line"><span style="color:#babed8;">  --moduleDirectories           An array of directory names to be searched</span></span>
<span class="line"><span style="color:#babed8;">                                recursively up from the requiring module&#39;s</span></span>
<span class="line"><span style="color:#babed8;">                                location.</span></span>
<span class="line"><span style="color:#babed8;">  --moduleFileExtensions        An array of file extensions your modules use.</span></span>
<span class="line"><span style="color:#babed8;">                                If you require modules without specifying a</span></span>
<span class="line"><span style="color:#babed8;">                                file extension, these are the extensions Jest</span></span>
<span class="line"><span style="color:#babed8;">                                will look for.</span></span>
<span class="line"><span style="color:#babed8;">  --moduleNameMapper            A JSON string with a map from regular</span></span>
<span class="line"><span style="color:#babed8;">                                expressions to module names or to arrays of</span></span>
<span class="line"><span style="color:#babed8;">                                module names that allow to stub out resources,</span></span>
<span class="line"><span style="color:#babed8;">                                like images or styles with a single module</span></span>
<span class="line"><span style="color:#babed8;">  --modulePathIgnorePatterns    An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#babed8;">                                matched against all module paths before those</span></span>
<span class="line"><span style="color:#babed8;">                                paths are to be considered &quot;visible&quot; to the</span></span>
<span class="line"><span style="color:#babed8;">                                module loader.</span></span>
<span class="line"><span style="color:#babed8;">  --modulePaths                 An alternative API to setting the NODE_PATH env</span></span>
<span class="line"><span style="color:#babed8;">                                variable, modulePaths is an array of absolute</span></span>
<span class="line"><span style="color:#babed8;">                                paths to additional locations to search when</span></span>
<span class="line"><span style="color:#babed8;">                                resolving modules.</span></span>
<span class="line"><span style="color:#babed8;">  --noStackTrace                Disables stack trace in test results output</span></span>
<span class="line"><span style="color:#babed8;">  --notify                      Activates notifications for test results.</span></span>
<span class="line"><span style="color:#babed8;">  --notifyMode                  Specifies when notifications will appear for</span></span>
<span class="line"><span style="color:#babed8;">                                test results.</span></span>
<span class="line"><span style="color:#babed8;">  -o --onlyChanged              Attempts to identify which tests to run based</span></span>
<span class="line"><span style="color:#babed8;">                                on which files have changed in the current</span></span>
<span class="line"><span style="color:#babed8;">                                repository. Only works if you&#39;re running tests</span></span>
<span class="line"><span style="color:#babed8;">                                in a git or hg repository at the moment.</span></span>
<span class="line"><span style="color:#babed8;">  -f --onlyFailures             Run tests that failed in the previous</span></span>
<span class="line"><span style="color:#babed8;">                                execution.</span></span>
<span class="line"><span style="color:#babed8;">  --outputFile                  Write test results to a file when the --json</span></span>
<span class="line"><span style="color:#babed8;">                                option is also specified.</span></span>
<span class="line"><span style="color:#babed8;">  --passWithNoTests             Will not fail if no tests are found (for</span></span>
<span class="line"><span style="color:#babed8;">                                example while using \`--testPathPattern\`.)</span></span>
<span class="line"><span style="color:#babed8;">  --preset                      A preset that is used as a base for Jest&#39;s</span></span>
<span class="line"><span style="color:#babed8;">                                configuration.</span></span>
<span class="line"><span style="color:#babed8;">  --prettierPath                The path to the &quot;prettier&quot; module used for</span></span>
<span class="line"><span style="color:#babed8;">                                inline snapshots.</span></span>
<span class="line"><span style="color:#babed8;">  --projects                    A list of projects that use Jest to run all</span></span>
<span class="line"><span style="color:#babed8;">                                tests of all projects in a single instance of</span></span>
<span class="line"><span style="color:#babed8;">                                Jest.</span></span>
<span class="line"><span style="color:#babed8;">  --reporters                   A list of custom reporters for the test suite.</span></span>
<span class="line"><span style="color:#babed8;">  --resetMocks                  Automatically reset mock state between every</span></span>
<span class="line"><span style="color:#babed8;">                                test. Equivalent to calling</span></span>
<span class="line"><span style="color:#babed8;">                                jest.resetAllMocks() between each test.</span></span>
<span class="line"><span style="color:#babed8;">  --resetModules                If enabled, the module registry for every test</span></span>
<span class="line"><span style="color:#babed8;">                                file will be reset before running each</span></span>
<span class="line"><span style="color:#babed8;">                                individual test.</span></span>
<span class="line"><span style="color:#babed8;">  --resolver                    A JSON string which allows the use of a custom</span></span>
<span class="line"><span style="color:#babed8;">                                resolver.</span></span>
<span class="line"><span style="color:#babed8;">  --restoreMocks                Automatically restore mock state and</span></span>
<span class="line"><span style="color:#babed8;">                                implementation between every test. Equivalent</span></span>
<span class="line"><span style="color:#babed8;">                                to calling jest.restoreAllMocks() between each</span></span>
<span class="line"><span style="color:#babed8;">                                test.</span></span>
<span class="line"><span style="color:#babed8;">  --rootDir                     The root directory that Jest should scan for</span></span>
<span class="line"><span style="color:#babed8;">                                tests and modules within.</span></span>
<span class="line"><span style="color:#babed8;">  --roots                       A list of paths to directories that Jest should</span></span>
<span class="line"><span style="color:#babed8;">                                use to search for files in.</span></span>
<span class="line"><span style="color:#babed8;">  -i --runInBand                Run all tests serially in the current process</span></span>
<span class="line"><span style="color:#babed8;">                                (rather than creating a worker pool of child</span></span>
<span class="line"><span style="color:#babed8;">                                processes that run tests). This is sometimes</span></span>
<span class="line"><span style="color:#babed8;">                                useful for debugging, but such use cases are</span></span>
<span class="line"><span style="color:#babed8;">                                pretty rare.</span></span>
<span class="line"><span style="color:#babed8;">  --runTestsByPath              Used when provided patterns are exact file</span></span>
<span class="line"><span style="color:#babed8;">                                paths. This avoids converting them into a</span></span>
<span class="line"><span style="color:#babed8;">                                regular expression and matching it against</span></span>
<span class="line"><span style="color:#babed8;">                                every single file.</span></span>
<span class="line"><span style="color:#babed8;">  --runner                      Allows to use a custom runner instead of Jest&#39;s</span></span>
<span class="line"><span style="color:#babed8;">                                default test runner.</span></span>
<span class="line"><span style="color:#babed8;">  --selectProjects              Run only the tests of the specified</span></span>
<span class="line"><span style="color:#babed8;">                                projects.Jest uses the attribute \`displayName\`</span></span>
<span class="line"><span style="color:#babed8;">                                in the configuration to identify each project.</span></span>
<span class="line"><span style="color:#babed8;">  --setupFiles                  A list of paths to modules that run some code</span></span>
<span class="line"><span style="color:#babed8;">                                to configure or set up the testing environment</span></span>
<span class="line"><span style="color:#babed8;">                                before each test.</span></span>
<span class="line"><span style="color:#babed8;">  --setupFilesAfterEnv          A list of paths to modules that run some code</span></span>
<span class="line"><span style="color:#babed8;">                                to configure or set up the testing framework</span></span>
<span class="line"><span style="color:#babed8;">                                before each test</span></span>
<span class="line"><span style="color:#babed8;">  --showConfig                  Print your jest config and then exits.</span></span>
<span class="line"><span style="color:#babed8;">  --silent                      Prevent tests from printing messages through</span></span>
<span class="line"><span style="color:#babed8;">                                the console.</span></span>
<span class="line"><span style="color:#babed8;">  --skipFilter                  Disables the filter provided by --filter.</span></span>
<span class="line"><span style="color:#babed8;">                                Useful for CI jobs, or local enforcement when</span></span>
<span class="line"><span style="color:#babed8;">                                fixing tests.</span></span>
<span class="line"><span style="color:#babed8;">  --snapshotSerializers         A list of paths to snapshot serializer modules</span></span>
<span class="line"><span style="color:#babed8;">                                Jest should use for snapshot testing.</span></span>
<span class="line"><span style="color:#babed8;">  --testEnvironment             Alias for --env</span></span>
<span class="line"><span style="color:#babed8;">  --testEnvironmentOptions      Test environment options that will be passed to</span></span>
<span class="line"><span style="color:#babed8;">                                the testEnvironment. The relevant options</span></span>
<span class="line"><span style="color:#babed8;">                                depend on the environment.</span></span>
<span class="line"><span style="color:#babed8;">  --testFailureExitCode         Exit code of \`jest\` command if the test run</span></span>
<span class="line"><span style="color:#babed8;">                                failed</span></span>
<span class="line"><span style="color:#babed8;">  --testLocationInResults       Add \`location\` information to the test results</span></span>
<span class="line"><span style="color:#babed8;">  --testMatch                   The glob patterns Jest uses to detect test</span></span>
<span class="line"><span style="color:#babed8;">                                files.</span></span>
<span class="line"><span style="color:#babed8;">  -t --testNamePattern          Run only tests with a name that matches the</span></span>
<span class="line"><span style="color:#babed8;">                                regex pattern.</span></span>
<span class="line"><span style="color:#babed8;">  --testPathIgnorePatterns      An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#babed8;">                                matched against all test paths before executing</span></span>
<span class="line"><span style="color:#babed8;">                                the test. If the test path matches any of the</span></span>
<span class="line"><span style="color:#babed8;">                                patterns, it will be skipped.</span></span>
<span class="line"><span style="color:#babed8;">  --testPathPattern             A regexp pattern string that is matched against</span></span>
<span class="line"><span style="color:#babed8;">                                all tests paths before executing the test.</span></span>
<span class="line"><span style="color:#babed8;">  --testRegex                   A string or array of string regexp patterns</span></span>
<span class="line"><span style="color:#babed8;">                                that Jest uses to detect test files.</span></span>
<span class="line"><span style="color:#babed8;">  --testResultsProcessor        Allows the use of a custom results processor.</span></span>
<span class="line"><span style="color:#babed8;">                                This processor must be a node module that</span></span>
<span class="line"><span style="color:#babed8;">                                exports a function expecting as the first</span></span>
<span class="line"><span style="color:#babed8;">                                argument the result object.</span></span>
<span class="line"><span style="color:#babed8;">  --testRunner                  Allows to specify a custom test runner. The</span></span>
<span class="line"><span style="color:#babed8;">                                default is  \`jasmine2\`. A path to a custom test</span></span>
<span class="line"><span style="color:#babed8;">                                runner can be provided:</span></span>
<span class="line"><span style="color:#babed8;">                                \`&lt;rootDir&gt;/path/to/testRunner.js\`.</span></span>
<span class="line"><span style="color:#babed8;">  --testSequencer               Allows to specify a custom test sequencer. The</span></span>
<span class="line"><span style="color:#babed8;">                                default is \`@jest/test-sequencer\`. A path to a</span></span>
<span class="line"><span style="color:#babed8;">                                custom test sequencer can be provided:</span></span>
<span class="line"><span style="color:#babed8;">                                \`&lt;rootDir&gt;/path/to/testSequencer.js\`</span></span>
<span class="line"><span style="color:#babed8;">  --testTimeout                 This option sets the default timeouts of test</span></span>
<span class="line"><span style="color:#babed8;">                                cases.</span></span>
<span class="line"><span style="color:#babed8;">  --testURL                     This option sets the URL for the jsdom</span></span>
<span class="line"><span style="color:#babed8;">                                environment.</span></span>
<span class="line"><span style="color:#babed8;">  --timers                      Setting this value to fake allows the use of</span></span>
<span class="line"><span style="color:#babed8;">                                fake timers for functions such as setTimeout.</span></span>
<span class="line"><span style="color:#babed8;">  --transform                   A JSON string which maps from regular</span></span>
<span class="line"><span style="color:#babed8;">                                expressions to paths to transformers.</span></span>
<span class="line"><span style="color:#babed8;">  --transformIgnorePatterns     An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#babed8;">                                matched against all source file paths before</span></span>
<span class="line"><span style="color:#babed8;">                                transformation.</span></span>
<span class="line"><span style="color:#babed8;">  --unmockedModulePathPatterns  An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#babed8;">                                matched against all modules before the module</span></span>
<span class="line"><span style="color:#babed8;">                                loader will automatically return a mock for</span></span>
<span class="line"><span style="color:#babed8;">                                them.</span></span>
<span class="line"><span style="color:#babed8;">  -u --updateSnapshot           Use this flag to re-record snapshots. Can be</span></span>
<span class="line"><span style="color:#babed8;">                                used together with a test suite pattern or with</span></span>
<span class="line"><span style="color:#babed8;">                                \`--testNamePattern\` to re-record snapshot for</span></span>
<span class="line"><span style="color:#babed8;">                                test matching the pattern</span></span>
<span class="line"><span style="color:#babed8;">  --useStderr                   Divert all output to stderr.</span></span>
<span class="line"><span style="color:#babed8;">  --verbose                     Display individual test results with the test</span></span>
<span class="line"><span style="color:#babed8;">                                suite hierarchy.</span></span>
<span class="line"><span style="color:#babed8;">  --watch                       Watch files for changes and rerun tests related</span></span>
<span class="line"><span style="color:#babed8;">                                to changed files. If you want to re-run all</span></span>
<span class="line"><span style="color:#babed8;">                                tests when a file has changed, use the</span></span>
<span class="line"><span style="color:#babed8;">                                \`--watchAll\` option.</span></span>
<span class="line"><span style="color:#babed8;">  --watchAll                    Watch files for changes and rerun all tests. If</span></span>
<span class="line"><span style="color:#babed8;">                                you want to re-run only the tests related to</span></span>
<span class="line"><span style="color:#babed8;">                                the changed files, use the \`--watch\` option.</span></span>
<span class="line"><span style="color:#babed8;">  --watchPathIgnorePatterns     An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#babed8;">                                matched against all paths before trigger test</span></span>
<span class="line"><span style="color:#babed8;">                                re-run in watch mode. If the test path matches</span></span>
<span class="line"><span style="color:#babed8;">                                any of the patterns, it will be skipped.</span></span>
<span class="line"><span style="color:#babed8;">  --watchman                    Whether to use watchman for file crawling.</span></span>
<span class="line"><span style="color:#babed8;">                                Disable using --no-watchman.</span></span>
<span class="line"><span style="color:#babed8;">  -h, --help                    display help for command</span></span></code></pre></div><p>比如覆盖测试：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">fes test --coverage</span></span></code></pre></div><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h3><p>除了插件内置的默认配置之外，插件遵循 <code>Jest</code>的配置文件规范，约定项目根目录下的 <code>jest.config.js</code> 为用户配置文件，约定 <code>packages.json</code> 的 <code>jest</code> 属性内容也是配置。</p><h3 id="优先级" tabindex="-1">优先级 <a class="header-anchor" href="#优先级" aria-label="Permalink to &quot;优先级&quot;">​</a></h3><p><code>args</code> 配置 &gt; <code>package.json</code>中的 <code>jest</code> &gt; <code>jest.config.js</code> &gt; 默认配置</p>`,26),p=[t];function o(c,r,i,b,d,y){return a(),n("div",null,p)}const f=s(l,[["render",o]]);export{u as __pageData,f as default};
