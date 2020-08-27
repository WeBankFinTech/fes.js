import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import router from './router'
import UiWebank from '../../src'
import '../../src/styles/index.scss'
import App from '../views/App.vue'
import 'highlight.js/styles/github-gist.css'
import panel from '../views/panel.vue'

// ======================全局配置====================
Vue.config.debug = true;
Vue.use(VueI18n);
// ====================== 安装插件===================
// install router
Vue.use(VueRouter);
// install 组件库
Vue.use(UiWebank, {
    locale: 'zh-cn'
});

Vue.component('panel', panel)

new Vue({
    el: '#app',
    extends: App,
    router: router,
    i18n: new VueI18n({
        locale: 'zh-cn'
    })
})
