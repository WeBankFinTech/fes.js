/* !
 * fes-components v1.0.0
 * (c) 2017 fanniehuang
 * Released under the MIT License.
 */
import FesRouteMenu from './routeMenu.vue';
import FesSearchPanel from './searchPanel.vue';
import FesListPanel from './listPanel.vue';

const fesComp = {
    FesRouteMenu,
    FesSearchPanel,
    FesListPanel
};

const install = function (Vue) {
    Object.keys(fesComp).forEach((key) => {
        Vue.component(key, fesComp[key]);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    version: '2.0.0'
}; // eslint-disable-line no-undef
