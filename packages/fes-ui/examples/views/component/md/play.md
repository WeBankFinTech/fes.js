```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'components/app.vue';    // 路由挂载
import Routers from './router.js';       // 路由列表
import UiWebank from '@webank/fes-ui';
import '@webank/fes-ui/dist/styles/fes-ui.css';    // 使用 CSS

Vue.use(VueRouter);
Vue.use(UiWebank);

//路由配置
const router = new VueRouter();
router.map(Routers);
router.start(App, '#app');
```