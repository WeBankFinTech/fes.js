import{_ as p,r as o,o as c,c as l,b as n,d as s,a as e,f as a}from"./app.1fff394b.js";const i={},u=a(`<h1 id="fesjs-plugin-request" tabindex="-1"><a class="header-anchor" href="#fesjs-plugin-request" aria-hidden="true">#</a> @fesjs/plugin-request</h1><p>基于 fetch 封装的 request，内置防止重复请求、请求缓存、错误处理等功能。</p><h2 id="启用方式" tabindex="-1"><a class="header-anchor" href="#启用方式" aria-hidden="true">#</a> 启用方式</h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;@fesjs/fes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;@fesjs/plugin-request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0-beta.0&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行时配置" tabindex="-1"><a class="header-anchor" href="#运行时配置" aria-hidden="true">#</a> 运行时配置</h2>`,6),r={href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineRuntimeConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineRuntimeConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">request</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span> <span class="token comment">// 默认 10s</span>
        <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 默认 post</span>
        <span class="token literal-property property">mergeRequest</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否合并请求</span>
        <span class="token literal-property property">responseType</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 可选 &#39;json&#39; | &#39;text&#39; | &#39;blob&#39; | &#39;arrayBuffer&#39; | &#39;formData&#39;，默认根据 content-type 处理</span>
        <span class="token literal-property property">credentials</span><span class="token operator">:</span> <span class="token string">&#39;include&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 默认 include, &#39;include&#39; | &#39;same-origin&#39; | &#39;omit&#39;</span>
        <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 传给服务器的 header</span>
        <span class="token literal-property property">cacheData</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否缓存</span>
        <span class="token function-variable function">requestInterceptor</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">config</span><span class="token operator">:</span> Config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Config<span class="token punctuation">,</span>
        <span class="token function-variable function">responseInterceptor</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">response</span><span class="token operator">:</span> RequestResponse</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> RequestResponse<span class="token punctuation">,</span>
        <span class="token function">transformData</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 处理响应内容异常</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>code <span class="token operator">===</span> <span class="token string">&#39;10000&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> data<span class="token operator">?.</span>result <span class="token operator">?</span> data<span class="token punctuation">.</span>result <span class="token operator">:</span> data<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> data<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// http 异常，和插件异常</span>
        <span class="token function">errorHandler</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 发送请求时出了点问题</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Error&#39;</span><span class="token punctuation">,</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// 支持其他 fetch 配置</span>
        <span class="token operator">...</span>otherConfigs<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2><h3 id="request" tabindex="-1"><a class="header-anchor" href="#request" aria-hidden="true">#</a> request</h3>`,3),k=n("li",null,[n("p",null,[n("strong",null,"类型"),s("：函数")])],-1),v=n("li",null,[n("p",null,[n("strong",null,"详情"),s("：请求后端接口")])],-1),m=n("p",null,[n("strong",null,"参数"),s("：")],-1),b=n("li",null,"url: 后端接口 url",-1),h=n("li",null,"data: 参数",-1),g={href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included",target:"_blank",rel:"noopener noreferrer"},f=n("li",null,[n("p",null,[n("strong",null,"返回值"),s(": Promise")])],-1),y=a(`<h3 id="userequest" tabindex="-1"><a class="header-anchor" href="#userequest" aria-hidden="true">#</a> useRequest</h3><p>request 的封装，返回响应式 <code>loading</code>、<code>error</code>、 <code>data</code></p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><h3 id="发起一个普通-post-请求" tabindex="-1"><a class="header-anchor" href="#发起一个普通-post-请求" aria-hidden="true">#</a> 发起一个普通 post 请求</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>

<span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// do something</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理异常</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="merge-重复请求" tabindex="-1"><a class="header-anchor" href="#merge-重复请求" aria-hidden="true">#</a> merge 重复请求</h3><p>连续发送多个请求，会被合并成一个请求，不会报 <code>REPEAT</code> 接口错误。</p><p>当发生 <code>REPEAT</code> 请求异常，并且确保自身代码合理的情况下，可以使用该配置。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>

<span class="token function">request</span><span class="token punctuation">(</span>
    <span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">mergeRequest</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 在一个请求没有回来前，重复发送的请求会合并成一个请求</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// do something</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理异常</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="请求缓存" tabindex="-1"><a class="header-anchor" href="#请求缓存" aria-hidden="true">#</a> 请求缓存</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>

<span class="token function">request</span><span class="token punctuation">(</span>
    <span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">cacheData</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">cacheType</span><span class="token operator">:</span> <span class="token string">&#39;ram&#39;</span><span class="token punctuation">,</span> <span class="token comment">// ram: 内存，session: sessionStorage，local：localStorage</span>
            <span class="token literal-property property">cacheTime</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token comment">// 缓存时间：默认3min</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// do something</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理异常</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若 <code>cacheData</code> 传 <code>true</code>，则默认使用 <code>ram</code> 缓存类型，缓存时间 3min。</p><h3 id="请求-abort" tabindex="-1"><a class="header-anchor" href="#请求-abort" aria-hidden="true">#</a> 请求 abort</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> controller <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AbortController</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&#39;/url/abort&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">signal</span><span class="token operator">:</span> controller<span class="token punctuation">.</span>signal<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;process response: &#39;</span> <span class="token operator">+</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// cancel the request</span>
controller<span class="token punctuation">.</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取-response-headers" tabindex="-1"><a class="header-anchor" href="#获取-response-headers" aria-hidden="true">#</a> 获取 response headers</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> rawRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> controller <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AbortController</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">rawRequest</span><span class="token punctuation">(</span><span class="token string">&#39;/url/abort&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">signal</span><span class="token operator">:</span> controller<span class="token punctuation">.</span>signal<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;process headers: &#39;</span> <span class="token operator">+</span> response<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// cancel the request</span>
controller<span class="token punctuation">.</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结合-use-使用" tabindex="-1"><a class="header-anchor" href="#结合-use-使用" aria-hidden="true">#</a> 结合 use 使用</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> loading<span class="token punctuation">,</span> data<span class="token punctuation">,</span> error <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useRequest</span><span class="token punctuation">(</span><span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            loading<span class="token punctuation">,</span>
            data<span class="token punctuation">,</span>
            error<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-x-升级到-4-x" tabindex="-1"><a class="header-anchor" href="#_3-x-升级到-4-x" aria-hidden="true">#</a> 3.x 升级到 4.x</h2><ol><li>缓存参数 cache 改成 cacheData（避免与 fetch 原本的 cache 冲突）</li><li>dataHandler 改成 transformData</li><li>requestInterceptors 改为 requestInterceptor，不在支持数组，只支持函数</li><li>responseInterceptors 改为 responseInterceptor，不在支持数组，只支持函数</li><li>其他 axios 特有的配置不在支持</li></ol>`,20);function _(q,w){const t=o("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[s("入口文件的全局配置，具体请求的配置参数会覆盖全局配置，支持 "),n("a",r,[s("fetch"),e(t)]),s(" 所有的参数。")]),d,n("ul",null,[k,v,n("li",null,[m,n("ul",null,[b,h,n("li",null,[s("options: 配置支持 "),n("a",g,[s("fetch"),e(t)]),s(" 所有的参数，和插件扩展参数。")])])]),f]),y])}const x=p(i,[["render",_],["__file","request.html.vue"]]);export{x as default};