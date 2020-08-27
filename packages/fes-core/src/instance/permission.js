/**
 * 用户路由控制
 */
import util from '../util';

const permission = {
    allowRoutesSync: [], // 兼容老的 API 请勿使用
    allowRoutes: [],
    format(allowRoutes) {
        if (Array.isArray(allowRoutes)) {
            return allowRoutes.map(allow => Promise.resolve(allow));
        }
        return [Promise.resolve(allowRoutes)];
    },
    set(data) {
        this.allowRoutesSync = data;
        this.allowRoutes = this.format(data);
    },
    getSync() {
        return this.allowRoutesSync;
    },
    get() {
        return Promise.all(this.allowRoutes).then(data => data.reduce((merge, cur) => merge.concat(cur), []));
    },
    merge(data) {
        this.allowRoutes = this.allowRoutes.concat(this.format(data));
    },
    async match(path) {
        const mergedAllowRoutes = await this.get();
        return util.canRoute(path, mergedAllowRoutes);
    }
};

export default permission;
