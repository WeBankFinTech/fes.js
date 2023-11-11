import{_ as s,o as n,c as a,V as e}from"./chunks/framework.85b09291.js";const D=JSON.parse('{"title":"@fesjs/plugin-jest","description":"","frontmatter":{},"headers":[],"relativePath":"reference/plugin/plugins/jest.md"}'),l={name:"reference/plugin/plugins/jest.md"},t=e(`<h1 id="fesjs-plugin-jest" tabindex="-1">@fesjs/plugin-jest <a class="header-anchor" href="#fesjs-plugin-jest" aria-label="Permalink to &quot;@fesjs/plugin-jest&quot;">​</a></h1><p>集成 <a href="https://www.jestjs.cn/" target="_blank" rel="noreferrer">Jest</a> 测试框架，目前只支持单元测试和覆盖测试。</p><h2 id="启用方式" tabindex="-1">启用方式 <a class="header-anchor" href="#启用方式" aria-label="Permalink to &quot;启用方式&quot;">​</a></h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">dependencies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">@fesjs/fes</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^3.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">@fesjs/plugin-jest</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^3.0.0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="约定" tabindex="-1">约定 <a class="header-anchor" href="#约定" aria-label="Permalink to &quot;约定&quot;">​</a></h2><ul><li>项目根目录下 <code>tests</code> 和 <code>__tests__</code> 文件夹中的 <code>js</code> 或者 <code>jsx</code> 文件为测试文件。</li><li>需要覆盖测试的文件范围是<code>src/index.{js,jsx,ts,tsx,vue}</code></li></ul><p>例如测试文件 <code>add.js</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">fes-template</span></span>
<span class="line"><span style="color:#A6ACCD;">├── __tests__</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── add.js</span></span>
<span class="line"><span style="color:#A6ACCD;">└── src</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── .fes</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── utils</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── sum.js</span></span></code></pre></div><p>内容如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> sum </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/utils/sum</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">adds 1 + 2 to equal 3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">sum</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBe</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h2><p>在 <code>fes</code> 上注册 <code>test</code> 命令：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">fes</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span></span></code></pre></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><p>插件实现 Jest 的全部配置，具体请查看 <a href="https://www.jestjs.cn/docs/configuration#reference" target="_blank" rel="noreferrer">文档-configuration</a>。 也可以使用 <code>-h</code> 打印配置帮助信息：</p><h3 id="args-变量" tabindex="-1">args 变量 <a class="header-anchor" href="#args-变量" aria-label="Permalink to &quot;args 变量&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">fes</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-h</span></span></code></pre></div><p>打印配置帮助信息:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">$ fes test -h</span></span>
<span class="line"><span style="color:#A6ACCD;">Usage: fes test [options]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">run unit tests with jest</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">  --all                         The opposite of \`onlyChanged\`. If \`onlyChanged\`</span></span>
<span class="line"><span style="color:#A6ACCD;">                                is set by default, running jest with \`--all\`</span></span>
<span class="line"><span style="color:#A6ACCD;">                                will force Jest to run all tests instead of</span></span>
<span class="line"><span style="color:#A6ACCD;">                                running only tests related to changed files.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --automock                    Automock all files by default.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -b --bail                     Exit the test suite immediately after \`n\`</span></span>
<span class="line"><span style="color:#A6ACCD;">                                number of failing tests.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --browser                     Respect the &quot;browser&quot; field in package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">                                when resolving modules. Some packages export</span></span>
<span class="line"><span style="color:#A6ACCD;">                                different versions based on whether they are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                operating in node.js or a browser.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --cache                       Whether to use the transform cache. Disable the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                cache using --no-cache.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --cacheDirectory              The directory where Jest should store its</span></span>
<span class="line"><span style="color:#A6ACCD;">                                cached  dependency information.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --changedFilesWithAncestor    Runs tests related to the current changes and</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the changes made in the last commit. Behaves</span></span>
<span class="line"><span style="color:#A6ACCD;">                                similarly to \`--onlyChanged\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --changedSince                Runs tests related to the changes since the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                provided branch. If the current branch has</span></span>
<span class="line"><span style="color:#A6ACCD;">                                diverged from the given branch, then only</span></span>
<span class="line"><span style="color:#A6ACCD;">                                changes made locally will be tested. Behaves</span></span>
<span class="line"><span style="color:#A6ACCD;">                                similarly to \`--onlyChanged\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --ci                          Whether to run Jest in continuous integration</span></span>
<span class="line"><span style="color:#A6ACCD;">                                (CI) mode. This option is on by default in most</span></span>
<span class="line"><span style="color:#A6ACCD;">                                popular CI environments. It will prevent</span></span>
<span class="line"><span style="color:#A6ACCD;">                                snapshots from being written unless explicitly</span></span>
<span class="line"><span style="color:#A6ACCD;">                                requested.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --clearCache                  Clears the configured Jest cache directory and</span></span>
<span class="line"><span style="color:#A6ACCD;">                                then exits. Default directory can be found by</span></span>
<span class="line"><span style="color:#A6ACCD;">                                calling jest --showConfig</span></span>
<span class="line"><span style="color:#A6ACCD;">  --clearMocks                  Automatically clear mock calls and instances</span></span>
<span class="line"><span style="color:#A6ACCD;">                                between every test. Equivalent to calling</span></span>
<span class="line"><span style="color:#A6ACCD;">                                jest.clearAllMocks() between each test.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --collectCoverage             Alias for --coverage.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --collectCoverageFrom         A glob pattern relative to &lt;rootDir&gt; matching</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the files that coverage info needs to be</span></span>
<span class="line"><span style="color:#A6ACCD;">                                collected from.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --collectCoverageOnlyFrom     Explicit list of paths coverage will be</span></span>
<span class="line"><span style="color:#A6ACCD;">                                restricted to.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --color                       Forces test results output color highlighting</span></span>
<span class="line"><span style="color:#A6ACCD;">                                (even if stdout is not a TTY). Set to false if</span></span>
<span class="line"><span style="color:#A6ACCD;">                                you would like to have no colors.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --colors                      Alias for \`--color\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -c --config                   The path to a jest config file specifying how</span></span>
<span class="line"><span style="color:#A6ACCD;">                                to find and execute tests. If no rootDir is set</span></span>
<span class="line"><span style="color:#A6ACCD;">                                in the config, the directory containing the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                config file is assumed to be the rootDir for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the project.This can also be a JSON encoded</span></span>
<span class="line"><span style="color:#A6ACCD;">                                value which Jest will use as configuration.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --coverage                    Indicates that test coverage information should</span></span>
<span class="line"><span style="color:#A6ACCD;">                                be collected and reported in the output.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --coverageDirectory           The directory where Jest should output its</span></span>
<span class="line"><span style="color:#A6ACCD;">                                coverage files.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --coveragePathIgnorePatterns  An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                matched against all file paths before executing</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the test. If the file pathmatches any of the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                patterns, coverage information will be skipped.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --coverageProvider            Select between Babel and V8 to collect coverage</span></span>
<span class="line"><span style="color:#A6ACCD;">  --coverageReporters           A list of reporter names that Jest uses when</span></span>
<span class="line"><span style="color:#A6ACCD;">                                writing coverage reports. Any istanbul reporter</span></span>
<span class="line"><span style="color:#A6ACCD;">                                can be used.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --coverageThreshold           A JSON string with which will be used to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                configure minimum threshold enforcement for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                coverage results</span></span>
<span class="line"><span style="color:#A6ACCD;">  --debug                       Print debugging info about your jest config.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --detectLeaks                 **EXPERIMENTAL**: Detect memory leaks in tests.</span></span>
<span class="line"><span style="color:#A6ACCD;">                                After executing a test, it will try to garbage</span></span>
<span class="line"><span style="color:#A6ACCD;">                                collect the global object used, and fail if it</span></span>
<span class="line"><span style="color:#A6ACCD;">                                was leaked</span></span>
<span class="line"><span style="color:#A6ACCD;">  --detectOpenHandles           Print out remaining open handles preventing</span></span>
<span class="line"><span style="color:#A6ACCD;">                                Jest from exiting at the end of a test run.</span></span>
<span class="line"><span style="color:#A6ACCD;">                                Implies \`runInBand\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --env                         The test environment used for all tests. This</span></span>
<span class="line"><span style="color:#A6ACCD;">                                can point to any file or node module. Examples:</span></span>
<span class="line"><span style="color:#A6ACCD;">                                \`jsdom\`, \`node\` or \`path/to/my-environment.js\`</span></span>
<span class="line"><span style="color:#A6ACCD;">  --errorOnDeprecated           Make calling deprecated APIs throw helpful</span></span>
<span class="line"><span style="color:#A6ACCD;">                                error messages.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -e --expand                   Use this flag to show full diffs instead of a</span></span>
<span class="line"><span style="color:#A6ACCD;">                                patch.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --filter                      Path to a module exporting a filtering</span></span>
<span class="line"><span style="color:#A6ACCD;">                                function. This method receives a list of tests</span></span>
<span class="line"><span style="color:#A6ACCD;">                                which can be manipulated to exclude tests from</span></span>
<span class="line"><span style="color:#A6ACCD;">                                running. Especially useful when used in</span></span>
<span class="line"><span style="color:#A6ACCD;">                                conjunction with a testing infrastructure to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                filter known broken tests.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --findRelatedTests            Find related tests for a list of source files</span></span>
<span class="line"><span style="color:#A6ACCD;">                                that were passed in as arguments. Useful for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                pre-commit hook integration to run the minimal</span></span>
<span class="line"><span style="color:#A6ACCD;">                                amount of tests necessary.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --forceExit                   Force Jest to exit after all tests have</span></span>
<span class="line"><span style="color:#A6ACCD;">                                completed running. This is useful when</span></span>
<span class="line"><span style="color:#A6ACCD;">                                resources set up by test code cannot be</span></span>
<span class="line"><span style="color:#A6ACCD;">                                adequately cleaned up.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --globalSetup                 The path to a module that runs before All</span></span>
<span class="line"><span style="color:#A6ACCD;">                                Tests.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --globalTeardown              The path to a module that runs after All Tests.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --globals                     A JSON string with map of global variables that</span></span>
<span class="line"><span style="color:#A6ACCD;">                                need to be available in all test environments.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --haste                       A JSON string with map of variables for the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                haste module system</span></span>
<span class="line"><span style="color:#A6ACCD;">  --init                        Generate a basic configuration file</span></span>
<span class="line"><span style="color:#A6ACCD;">  --injectGlobals               Should Jest inject global variables or not</span></span>
<span class="line"><span style="color:#A6ACCD;">  --json                        Prints the test results in JSON. This mode will</span></span>
<span class="line"><span style="color:#A6ACCD;">                                send all other test output and user messages to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                stderr.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --lastCommit                  Run all tests affected by file changes in the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                last commit made. Behaves similarly to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                \`--onlyChanged\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --listTests                   Lists all tests Jest will run given the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                arguments and exits. Most useful in a CI system</span></span>
<span class="line"><span style="color:#A6ACCD;">                                together with \`--findRelatedTests\` to determine</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the tests Jest will run based on specific files</span></span>
<span class="line"><span style="color:#A6ACCD;">  --logHeapUsage                Logs the heap usage after every test. Useful to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                debug memory leaks. Use together with</span></span>
<span class="line"><span style="color:#A6ACCD;">                                \`--runInBand\` and \`--expose-gc\` in node.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --mapCoverage                 Maps code coverage reports against original source code when transformers supply source maps.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  DEPRECATED</span></span>
<span class="line"><span style="color:#A6ACCD;">  --maxConcurrency              Specifies the maximum number of tests that are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                allowed to runconcurrently. This only affects</span></span>
<span class="line"><span style="color:#A6ACCD;">                                tests using \`test.concurrent\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -w --maxWorkers               Specifies the maximum number of workers the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                worker-pool will spawn for running tests. This</span></span>
<span class="line"><span style="color:#A6ACCD;">                                defaults to the number of the cores available</span></span>
<span class="line"><span style="color:#A6ACCD;">                                on your machine. (its usually best not to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                override this default)</span></span>
<span class="line"><span style="color:#A6ACCD;">  --moduleDirectories           An array of directory names to be searched</span></span>
<span class="line"><span style="color:#A6ACCD;">                                recursively up from the requiring module&#39;s</span></span>
<span class="line"><span style="color:#A6ACCD;">                                location.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --moduleFileExtensions        An array of file extensions your modules use.</span></span>
<span class="line"><span style="color:#A6ACCD;">                                If you require modules without specifying a</span></span>
<span class="line"><span style="color:#A6ACCD;">                                file extension, these are the extensions Jest</span></span>
<span class="line"><span style="color:#A6ACCD;">                                will look for.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --moduleNameMapper            A JSON string with a map from regular</span></span>
<span class="line"><span style="color:#A6ACCD;">                                expressions to module names or to arrays of</span></span>
<span class="line"><span style="color:#A6ACCD;">                                module names that allow to stub out resources,</span></span>
<span class="line"><span style="color:#A6ACCD;">                                like images or styles with a single module</span></span>
<span class="line"><span style="color:#A6ACCD;">  --modulePathIgnorePatterns    An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                matched against all module paths before those</span></span>
<span class="line"><span style="color:#A6ACCD;">                                paths are to be considered &quot;visible&quot; to the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                module loader.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --modulePaths                 An alternative API to setting the NODE_PATH env</span></span>
<span class="line"><span style="color:#A6ACCD;">                                variable, modulePaths is an array of absolute</span></span>
<span class="line"><span style="color:#A6ACCD;">                                paths to additional locations to search when</span></span>
<span class="line"><span style="color:#A6ACCD;">                                resolving modules.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --noStackTrace                Disables stack trace in test results output</span></span>
<span class="line"><span style="color:#A6ACCD;">  --notify                      Activates notifications for test results.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --notifyMode                  Specifies when notifications will appear for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                test results.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -o --onlyChanged              Attempts to identify which tests to run based</span></span>
<span class="line"><span style="color:#A6ACCD;">                                on which files have changed in the current</span></span>
<span class="line"><span style="color:#A6ACCD;">                                repository. Only works if you&#39;re running tests</span></span>
<span class="line"><span style="color:#A6ACCD;">                                in a git or hg repository at the moment.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -f --onlyFailures             Run tests that failed in the previous</span></span>
<span class="line"><span style="color:#A6ACCD;">                                execution.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --outputFile                  Write test results to a file when the --json</span></span>
<span class="line"><span style="color:#A6ACCD;">                                option is also specified.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --passWithNoTests             Will not fail if no tests are found (for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                example while using \`--testPathPattern\`.)</span></span>
<span class="line"><span style="color:#A6ACCD;">  --preset                      A preset that is used as a base for Jest&#39;s</span></span>
<span class="line"><span style="color:#A6ACCD;">                                configuration.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --prettierPath                The path to the &quot;prettier&quot; module used for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                inline snapshots.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --projects                    A list of projects that use Jest to run all</span></span>
<span class="line"><span style="color:#A6ACCD;">                                tests of all projects in a single instance of</span></span>
<span class="line"><span style="color:#A6ACCD;">                                Jest.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --reporters                   A list of custom reporters for the test suite.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --resetMocks                  Automatically reset mock state between every</span></span>
<span class="line"><span style="color:#A6ACCD;">                                test. Equivalent to calling</span></span>
<span class="line"><span style="color:#A6ACCD;">                                jest.resetAllMocks() between each test.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --resetModules                If enabled, the module registry for every test</span></span>
<span class="line"><span style="color:#A6ACCD;">                                file will be reset before running each</span></span>
<span class="line"><span style="color:#A6ACCD;">                                individual test.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --resolver                    A JSON string which allows the use of a custom</span></span>
<span class="line"><span style="color:#A6ACCD;">                                resolver.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --restoreMocks                Automatically restore mock state and</span></span>
<span class="line"><span style="color:#A6ACCD;">                                implementation between every test. Equivalent</span></span>
<span class="line"><span style="color:#A6ACCD;">                                to calling jest.restoreAllMocks() between each</span></span>
<span class="line"><span style="color:#A6ACCD;">                                test.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --rootDir                     The root directory that Jest should scan for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                tests and modules within.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --roots                       A list of paths to directories that Jest should</span></span>
<span class="line"><span style="color:#A6ACCD;">                                use to search for files in.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -i --runInBand                Run all tests serially in the current process</span></span>
<span class="line"><span style="color:#A6ACCD;">                                (rather than creating a worker pool of child</span></span>
<span class="line"><span style="color:#A6ACCD;">                                processes that run tests). This is sometimes</span></span>
<span class="line"><span style="color:#A6ACCD;">                                useful for debugging, but such use cases are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                pretty rare.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --runTestsByPath              Used when provided patterns are exact file</span></span>
<span class="line"><span style="color:#A6ACCD;">                                paths. This avoids converting them into a</span></span>
<span class="line"><span style="color:#A6ACCD;">                                regular expression and matching it against</span></span>
<span class="line"><span style="color:#A6ACCD;">                                every single file.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --runner                      Allows to use a custom runner instead of Jest&#39;s</span></span>
<span class="line"><span style="color:#A6ACCD;">                                default test runner.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --selectProjects              Run only the tests of the specified</span></span>
<span class="line"><span style="color:#A6ACCD;">                                projects.Jest uses the attribute \`displayName\`</span></span>
<span class="line"><span style="color:#A6ACCD;">                                in the configuration to identify each project.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --setupFiles                  A list of paths to modules that run some code</span></span>
<span class="line"><span style="color:#A6ACCD;">                                to configure or set up the testing environment</span></span>
<span class="line"><span style="color:#A6ACCD;">                                before each test.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --setupFilesAfterEnv          A list of paths to modules that run some code</span></span>
<span class="line"><span style="color:#A6ACCD;">                                to configure or set up the testing framework</span></span>
<span class="line"><span style="color:#A6ACCD;">                                before each test</span></span>
<span class="line"><span style="color:#A6ACCD;">  --showConfig                  Print your jest config and then exits.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --silent                      Prevent tests from printing messages through</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the console.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --skipFilter                  Disables the filter provided by --filter.</span></span>
<span class="line"><span style="color:#A6ACCD;">                                Useful for CI jobs, or local enforcement when</span></span>
<span class="line"><span style="color:#A6ACCD;">                                fixing tests.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --snapshotSerializers         A list of paths to snapshot serializer modules</span></span>
<span class="line"><span style="color:#A6ACCD;">                                Jest should use for snapshot testing.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testEnvironment             Alias for --env</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testEnvironmentOptions      Test environment options that will be passed to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the testEnvironment. The relevant options</span></span>
<span class="line"><span style="color:#A6ACCD;">                                depend on the environment.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testFailureExitCode         Exit code of \`jest\` command if the test run</span></span>
<span class="line"><span style="color:#A6ACCD;">                                failed</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testLocationInResults       Add \`location\` information to the test results</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testMatch                   The glob patterns Jest uses to detect test</span></span>
<span class="line"><span style="color:#A6ACCD;">                                files.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -t --testNamePattern          Run only tests with a name that matches the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                regex pattern.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testPathIgnorePatterns      An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                matched against all test paths before executing</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the test. If the test path matches any of the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                patterns, it will be skipped.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testPathPattern             A regexp pattern string that is matched against</span></span>
<span class="line"><span style="color:#A6ACCD;">                                all tests paths before executing the test.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testRegex                   A string or array of string regexp patterns</span></span>
<span class="line"><span style="color:#A6ACCD;">                                that Jest uses to detect test files.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testResultsProcessor        Allows the use of a custom results processor.</span></span>
<span class="line"><span style="color:#A6ACCD;">                                This processor must be a node module that</span></span>
<span class="line"><span style="color:#A6ACCD;">                                exports a function expecting as the first</span></span>
<span class="line"><span style="color:#A6ACCD;">                                argument the result object.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testRunner                  Allows to specify a custom test runner. The</span></span>
<span class="line"><span style="color:#A6ACCD;">                                default is  \`jasmine2\`. A path to a custom test</span></span>
<span class="line"><span style="color:#A6ACCD;">                                runner can be provided:</span></span>
<span class="line"><span style="color:#A6ACCD;">                                \`&lt;rootDir&gt;/path/to/testRunner.js\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testSequencer               Allows to specify a custom test sequencer. The</span></span>
<span class="line"><span style="color:#A6ACCD;">                                default is \`@jest/test-sequencer\`. A path to a</span></span>
<span class="line"><span style="color:#A6ACCD;">                                custom test sequencer can be provided:</span></span>
<span class="line"><span style="color:#A6ACCD;">                                \`&lt;rootDir&gt;/path/to/testSequencer.js\`</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testTimeout                 This option sets the default timeouts of test</span></span>
<span class="line"><span style="color:#A6ACCD;">                                cases.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --testURL                     This option sets the URL for the jsdom</span></span>
<span class="line"><span style="color:#A6ACCD;">                                environment.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --timers                      Setting this value to fake allows the use of</span></span>
<span class="line"><span style="color:#A6ACCD;">                                fake timers for functions such as setTimeout.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --transform                   A JSON string which maps from regular</span></span>
<span class="line"><span style="color:#A6ACCD;">                                expressions to paths to transformers.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --transformIgnorePatterns     An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                matched against all source file paths before</span></span>
<span class="line"><span style="color:#A6ACCD;">                                transformation.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --unmockedModulePathPatterns  An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                matched against all modules before the module</span></span>
<span class="line"><span style="color:#A6ACCD;">                                loader will automatically return a mock for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                them.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -u --updateSnapshot           Use this flag to re-record snapshots. Can be</span></span>
<span class="line"><span style="color:#A6ACCD;">                                used together with a test suite pattern or with</span></span>
<span class="line"><span style="color:#A6ACCD;">                                \`--testNamePattern\` to re-record snapshot for</span></span>
<span class="line"><span style="color:#A6ACCD;">                                test matching the pattern</span></span>
<span class="line"><span style="color:#A6ACCD;">  --useStderr                   Divert all output to stderr.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --verbose                     Display individual test results with the test</span></span>
<span class="line"><span style="color:#A6ACCD;">                                suite hierarchy.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --watch                       Watch files for changes and rerun tests related</span></span>
<span class="line"><span style="color:#A6ACCD;">                                to changed files. If you want to re-run all</span></span>
<span class="line"><span style="color:#A6ACCD;">                                tests when a file has changed, use the</span></span>
<span class="line"><span style="color:#A6ACCD;">                                \`--watchAll\` option.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --watchAll                    Watch files for changes and rerun all tests. If</span></span>
<span class="line"><span style="color:#A6ACCD;">                                you want to re-run only the tests related to</span></span>
<span class="line"><span style="color:#A6ACCD;">                                the changed files, use the \`--watch\` option.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --watchPathIgnorePatterns     An array of regexp pattern strings that are</span></span>
<span class="line"><span style="color:#A6ACCD;">                                matched against all paths before trigger test</span></span>
<span class="line"><span style="color:#A6ACCD;">                                re-run in watch mode. If the test path matches</span></span>
<span class="line"><span style="color:#A6ACCD;">                                any of the patterns, it will be skipped.</span></span>
<span class="line"><span style="color:#A6ACCD;">  --watchman                    Whether to use watchman for file crawling.</span></span>
<span class="line"><span style="color:#A6ACCD;">                                Disable using --no-watchman.</span></span>
<span class="line"><span style="color:#A6ACCD;">  -h, --help                    display help for command</span></span></code></pre></div><p>比如覆盖测试：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">fes test --coverage</span></span></code></pre></div><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h3><p>除了插件内置的默认配置之外，插件遵循 <code>Jest</code>的配置文件规范，约定项目根目录下的 <code>jest.config.js</code> 为用户配置文件，约定 <code>packages.json</code> 的 <code>jest</code> 属性内容也是配置。</p><h3 id="优先级" tabindex="-1">优先级 <a class="header-anchor" href="#优先级" aria-label="Permalink to &quot;优先级&quot;">​</a></h3><p><code>args</code> 配置 &gt; <code>package.json</code>中的 <code>jest</code> &gt; <code>jest.config.js</code> &gt; 默认配置</p>`,26),p=[t];function o(c,r,i,A,C,y){return n(),a("div",null,p)}const u=s(l,[["render",o]]);export{D as __pageData,u as default};
