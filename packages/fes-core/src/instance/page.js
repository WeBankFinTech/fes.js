import util from '../util';
import storage from '../storage';
import api from '../api';
import map from '../map';
import fesx from '../fesx';
import env from '../env';
import fesConfig from '../config';

const fesDataCache = {};

const certainConfig = function (matchPages, prop, n = 1) {
    const length = matchPages.length;
    if (n > length) {
        return matchPages[0].components.default[prop];
    }
    const matchPage = matchPages[length - n].components.default;
    if (typeof matchPage[prop] === 'boolean') {
        return matchPage[prop];
    }
    return certainConfig(matchPages, prop, n + 1);
};

const Page = {
    install(Vue, App) {
        Vue.mixin({
            data() {
                const data = {
                    FesMap: map,
                    FesFesx: fesx
                };

                // 如果存在页面缓存
                const cacheName = this.$options.FesDataCache;
                if (cacheName && fesDataCache[cacheName] && util.history.current.type !== 'forward') {
                    return fesDataCache[cacheName];
                }
                if (this.$options.FesSyncData) {
                    Object.keys(this.$options.FesSyncData).forEach((p) => {
                        data[p] = null;
                    });
                }
                let fesData;
                if (util.isFunction(this.$options.FesData)) {
                    this.FesFesx = fesx;
                    this.FesMap = map;
                    fesData = this.$options.FesData.call(this);
                } else {
                    // 直接等于，是对象的引用，会导致下次进入页面，FesData的值没变
                    fesData = this.$options.FesData;
                }
                if (fesData) {
                    Object.keys(fesData).forEach((p) => {
                        data[p] = fesData[p];
                    });
                }
                return data;
            },
            created() {
                const defaultHeader = fesConfig.FesHeader === undefined ? false : fesConfig.FesHeader;
                const defaultLeft = fesConfig.FesLeft === undefined ? true : fesConfig.FesLeft;
                // route切换时，重新设置为初始值
                const comp = (this.$route && this.$route.matched) || [];
                if (comp.length > 0) {
                    const matchPage = comp[comp.length - 1].components.default;
                    if (this.$options.__file === matchPage.__file) {
                        const header = certainConfig(comp, 'FesHeader');
                        if (typeof header === 'boolean') {
                            this.$root.header = header;
                        } else {
                            this.$root.header = defaultHeader;
                        }
                        const left = certainConfig(comp, 'FesLeft');
                        if (typeof left === 'boolean') {
                            this.$root.left = left;
                        } else {
                            this.$root.left = defaultLeft;
                        }
                    }
                }

                const syncData = this.$options.FesSyncData;
                if (syncData) {
                    const arr = [];
                    Object.keys(syncData).forEach((p) => {
                        if (util.isArray(syncData[p])) {
                            arr.push([p, syncData[p][0], syncData[p][1]]);
                        } else {
                            console.error(`【FEX】异步参数【${p}】配置错误：值不是数组`, syncData[p]);
                        }
                    });
                    const requests = [];
                    for (let i = 0; i < arr.length; i++) {
                        requests.push(api.fetch(arr[i][1], util.merge({}, this.$route.params, this.$route.query, arr[i][2])));
                    }
                    Promise.all(requests).then((values) => {
                        values.forEach((value, index) => {
                            this[arr[index][0]] = value;
                        });
                    });
                }

                if (this.$options.FesCreated && util.isFunction(this.$options.FesCreated)) {
                    this.$options.FesCreated.call(this);
                }
            },
            mounted() {
                if (this.$options.FesReady && util.isFunction(this.$options.FesReady)) {
                    this.$options.FesReady.call(this);
                }
            },
            beforeDestroy() {
                const cacheName = this.$options.FesDataCache;
                if (cacheName) {
                    fesDataCache[cacheName] = this.$data;
                }
                if (this.$options.FesBeforeDestroy && util.isFunction(this.$options.FesBeforeDestroy)) {
                    this.$options.FesBeforeDestroy.call(this);
                }
            },
            destroyed() {
                if (this.$options.FesDestroy && util.isFunction(this.$options.FesDestroy)) {
                    this.$options.FesDestroy.call(this);
                }
            }
        });

        // 注入自己的对象
        Vue.prototype.FesApp = App;
        Vue.prototype.FesUtil = util;
        Vue.prototype.FesStorage = storage;
        Vue.prototype.FesApi = api;
        Vue.prototype.FesEnv = env;
    }
};

export default Page;
