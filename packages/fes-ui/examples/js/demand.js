import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import '../../src/styles/index.scss';
import App from '../views/App.vue';
import 'highlight.js/styles/github-gist.css';
import {
    Row,
    Cell,
    Icon,
    WbButton,
    Tabs,
    Tab,
    Carousel,
    WbTable,
    TreeTable,
    Column,
    WbInputDatePicker,
    DatePicker,
    Loading,
    Modal,
    WbSwitch,
    Tree,
    Zoom,
    Steps,
    Step,
    Tooltip,
    Pagination,
    WbInput,
    WbSelect,
    WbOption,
    OptionGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    WbForm,
    FormItem,
    Panel,
    WbMenu,
    WbMenuItem,
    WbSubMenu,
    WbMenuGroup,
    RouteMenu,
    Upload,
    Affix,
    BackTop,
    ProcessCircle,
    Dropdown,
    DropdownMenu,
    Draggable,
    Contextmenu,
    Split,
    SplitItem,
    //
    Message,
    Toast,
    TimePicker
} from '@webank/fes-ui';

// ======================全局配置====================
Vue.config.debug = true;
// ====================== 安装插件===================
// install router
Vue.use(VueRouter);
// Vue.use(UIWebank);
const list = {
    Row,
    Cell,
    Icon,
    WbButton,
    Tabs,
    Tab,
    Carousel,
    WbTable,
    TreeTable,
    Column,
    WbInputDatePicker,
    DatePicker,
    Loading,
    Modal,
    WbSwitch,
    Tree,
    Zoom,
    Steps,
    Step,
    Tooltip,
    Pagination,
    WbInput,
    WbSelect,
    WbOption,
    OptionGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    WbForm,
    FormItem,
    Panel,
    WbMenu,
    WbMenuItem,
    WbSubMenu,
    WbMenuGroup,
    RouteMenu,
    Upload,
    Affix,
    BackTop,
    ProcessCircle,
    Dropdown,
    DropdownMenu,
    Draggable,
    Contextmenu,
    Split,
    SplitItem,
    TimePicker
};
Object.keys(list).forEach((key) => {
    Vue.component(key, list[key]);
});

Vue.prototype.$Message = Message;
Vue.prototype.$Toast = Toast;
Vue.directive('Zoom', Zoom._directive);
Vue.directive('Tooltip', Tooltip._directive);

new Vue({
    el: '#app',
    extends: App,
    router
});
