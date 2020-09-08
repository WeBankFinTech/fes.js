import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
// eslint-disable-next-line
import UiWebank from '@webank/fes-ui';
// eslint-disable-next-line
import routerConfig from 'projectRoot/.cache/routeConfig.js';
// eslint-disable-next-line
import commonCompConfig from 'projectRoot/.cache/commonComp.js';
import Page from './page';
import fesComponents from '../views/components';
import root from '../views/layout/root.vue';

import * as filters from '../filter';
// eslint-disable-next-line
import * as directives from '../directive';


import util from '../util';
import _fesx from '../fesx/_fesx';
import storage from '../storage';
import api from '../api';
import map from '../map';
import fesx from '../fesx';
import fesConfig from '../config';
import env from '../env';
import permission from './permission';


if (process.privateFesEnv.env !== 'prod') {
    Vue.config.debug = true;
    Vue.config.devtools = true;
}

const rolesConfig = fesConfig.roles;

class App {
    constructor() {
        this.FesApp = this;
        this.FesApi = api;
        this.FesStorage = storage;
        this.FesMap = map;
        this.FesFesx = fesx;
        this.FesUtil = util;
        this.FesEnv = env;

        // 允许的路由
        // 默认可以访问所有路由，第一次addAllowPage的时候需要删除'*'
        this._roleId = _fesx.get('FesRoleId');
        if (this._roleId) {
            permission.set(rolesConfig[this._roleId] || ['*']);
        } else {
            permission.set(_fesx.get('FesAllowPageList') || ['*']);
        }

        this.router = null;
        this.beforeRouter = null;
        this.afterRouter = null;

        this.i18n = null;
    }

    init(func) {
        window.Vue = Vue;

        // ======================安装插件====================
        Vue.use(VueRouter);
        Vue.use(UiWebank);
        Vue.use(VueI18n);
        Vue.use(fesComponents);
        Vue.use(Page, this);

        // =====================注册全局过滤器================
        Object.keys(filters).forEach((p) => {
            Vue.filter(p, filters[p]);
        });

        // =====================注册全局组件==================
        Object.keys(commonCompConfig).forEach((p) => {
            Vue.component(p, commonCompConfig[p]);
        });

        // =====================注册全局指令==================
        Object.keys(directives).forEach((p) => {
            Vue.directive(p, directives[p]);
        });

        // 设置系统名称
        if (fesConfig.fesName) {
            this.set('FesName', fesConfig.fesName);
        }

        // 设置系统名称
        if (fesConfig.favicon) {
            this.setFavicon(fesConfig.favicon);
        }

        if (util.isFunction(func)) {
            func.call(this);
        }

        this.run();
    }

    run() {
        this.creatRouter();
        this.creatI18n();
        // eslint-disable-next-line
        new Vue({
            el: '#app',
            extends: root,
            router: this.router,
            i18n: this.i18n
        });
    }

    creatI18n() {
        this.i18n = new VueI18n(fesConfig.i18n);
        this.setLocale(fesConfig.i18n.locale);
    }

    creatRouter() {
        this.router = new VueRouter({
            routes: routerConfig,
            scrollBehavior(to, from, savedPosition) {
                if (savedPosition) {
                    return savedPosition;
                }
                return {
                    x: 0,
                    y: 0
                };
            }
        });
        this.handleRouter();
    }

    handleRouter() {
        this.router.beforeEach(async (to, from, next) => {
            util.history.record(to.path);
            let path;
            if (to.matched.length === 1) {
                path = to.matched[0].path;
            } else {
                path = to.path;
            }
            // 只有允许的路由才能进
            const canRoute = await permission.match(path);
            if (canRoute) {
                if (this.beforeRouter && util.isFunction(this.beforeRouter)) {
                    this.beforeRouter(to, from, next);
                } else {
                    next();
                }
            } else {
                window.Toast.error(util.format('fesMessages.noPermission'));
                if (from.path) {
                    next(false);
                } else {
                    next('/');
                }
            }
        });
        this.router.afterEach((route) => {
            // 更新页面的title
            let title;
            fesConfig.menu.forEach((parent) => {
                if (parent.path === route.path) {
                    title = parent.title;
                } else if (parent.subMenu && parent.subMenu.length > 0) {
                    parent.subMenu.forEach((son) => {
                        if (son.path === route.path) {
                            title = son.title;
                        }
                    });
                }
            });
            // 设置切换路由时页面的标题
            let fesName = this.get('FesName');
            if (fesName.slice(0, 6) === '$i18n.') {
                fesName = util.format(fesName.slice(6));
            }
            document.title = title ? `${fesName} | ${title}` : fesName;

            if (this.afterRouter && util.isFunction(this.afterRouter)) {
                this.afterRouter(route);
            }
        });
        this.setDefaultPage();
    }

    async getDefaultPage(update) {
        // 如果router已初始化，通过当前链接来找路由，返回当前链接对应的路由
        if (this.router && !update) {
            const currentPath = this.router.history.getCurrentLocation();
            const isMatchCurrentPath = await permission.match(currentPath);
            if (isMatchCurrentPath) {
                return currentPath;
            }
        }
        // 返回权限列表第一个 > 路由表第一个
        const allAllowedRoute = await permission.get();
        return allAllowedRoute.length > 0 ? allAllowedRoute[0] : routerConfig[0];
    }

    async setDefaultPage() {
        const defaultPage = await this.getDefaultPage(false);
        this.router.push(defaultPage);
    }

    async setRole(roleId, redirect = true, update = true) {
        if (_fesx.get('FesRoleId') !== roleId) {
            if (rolesConfig[roleId] instanceof Array) {
                permission.set(rolesConfig[roleId]);
                this.set('FesRoleId', roleId);
                if (this.router && redirect) {
                    const defaultPage = await this.getDefaultPage(update);
                    this.router.push(defaultPage);
                }
                util.event.trigger('fes_allowPage_change');
            } else {
                console.error(`rolesConfig配置错误，不存在角色${roleId}`);
            }
        }
        return this;
    }

    async setAllowPage(pageList, redirect = true, update = true) {
        if (pageList instanceof Array) {
            permission.set(pageList);
            this.set('FesRoleId', ''); // 通过角色控制权限和通过路由控制权限互斥，只能使用一种
            this.set('FesAllowPageList', pageList);
            if (this.router && redirect) {
                const defaultPage = await this.getDefaultPage(update);
                this.router.push(defaultPage);
            }
            util.event.trigger('fes_allowPage_change');
        }
        return this;
    }

    // 废弃 API
    getAllowPage() {
        // 异步的这里会造成 break;
        return permission.getSync();
    }

    getAllowPageAsync() {
        return permission.get();
    }

    get(prop) {
        return _fesx.get(prop);
    }

    set(prop, value) {
        _fesx.set(prop, value);
        return this;
    }

    // 添加过滤器
    addFilter(name, func) {
        Vue.filter(name, func);
        return this;
    }

    // 添加指令
    addDirective(name, option) {
        Vue.directive(name, option);
        return this;
    }

    // 添加组件
    addComponent(name, c) {
        Vue.component(name, c);
        return this;
    }

    // 第三方插件
    addThrid(name, option) {
        Vue.use(name, option);
        return this;
    }

    setBeforeRouter(beforeRouter) {
        this.beforeRouter = beforeRouter;
        return this;
    }

    setAfterRouter(afterRouter) {
        this.afterRouter = afterRouter;
        return this;
    }

    // 添加favicon
    setFavicon(url) {
        let favicon = document.querySelector('#favicon');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.id = 'favicon';
            favicon.rel = 'shortcut icon';
            favicon.type = 'image/png';
            favicon.href = url;
            document.head.appendChild(favicon);
        } else {
            favicon.href = url;
        }
        return this;
    }

    setLocale(lang) {
        // 修改vue-i18n的语言
        this.i18n.locale = lang;
        // 修改组件库的语言
        UiWebank.i18n.setLocale(lang);
        return this;
    }
}

util.merge(App.prototype, util.event);
// 暂时去掉package.json引入，安全检测不通过
// App.prototype.version = packageConfig.version;
App.prototype.engine = 'Vue';

export default new App();
