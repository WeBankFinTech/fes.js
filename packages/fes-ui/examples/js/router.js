import VueRouter from 'vue-router'

const routes = [{
    path: '/guide',
    component: require('../views/guide/index')
}, {
    path: '/component',
    component: require('../views/component/index'),
    children: [{
        path: '/',
        component: require('../views/component/index')
    }, {
        path: 'install',
        component: require('../views/component/install')
    }, {
        path: 'log',
        component: require('../views/component/log')
    }, {
        path: 'play',
        component: require('../views/component/play')
    }, {
        path: 'layout',
        component: require('../views/component/layout')
    }, {
        path: 'button',
        component: require('../views/component/button')
    }, {
        path: 'icon',
        component: require('../views/component/icon')
    }, {
        path: 'tab',
        component: require('../views/component/tab')
    }, {
        path: 'table',
        component: require('../views/component/table')
    }, {
        path: 'checkbox',
        component: require('../views/component/checkbox')
    }, {
        path: 'zoom',
        component: require('../views/component/zoom')
    }, {
        path: 'upload',
        component: require('../views/component/upload')
    }, {
        path: 'toast',
        component: require('../views/component/toast')
    }, {
        path: 'tree',
        component: require('../views/component/tree')
    }, {
        path: 'tooltip',
        component: require('../views/component/tooltip')
    }, {
        path: 'step',
        component: require('../views/component/step')
    }, {
        path: 'message',
        component: require('../views/component/message')
    }, {
        path: 'modal',
        component: require('../views/component/modal')
    }, {
        path: 'loading',
        component: require('../views/component/loading')
    }, {
        path: 'switch',
        component: require('../views/component/switch')
    }, {
        path: 'input',
        component: require('../views/component/input')
    }, {
        path: 'select',
        component: require('../views/component/select')
    }, {
        path: 'radio',
        component: require('../views/component/radio')
    }, {
        path: 'datePicker',
        component: require('../views/component/datePicker')
    }, {
        path: 'timePicker',
        component: require('../views/component/timePicker')
    }, {
        path: 'form',
        component: require('../views/component/form')
    }, {
        path: 'carousel',
        component: require('../views/component/carousel')
    }, {
        path: 'panel',
        component: require('../views/component/panel')
    }, {
        path: 'collapse',
        component: require('../views/component/collapse')
    }, {
        path: 'pagination',
        component: require('../views/component/pagination')
    }, {
        path: 'menu',
        component: require('../views/component/menu')
    }, {
        path: 'affix',
        component: require('../views/component/affix')
    }, {
        path: 'backtop',
        component: require('../views/component/backTop')
    }, {
        path: 'processCircle',
        component: require('../views/component/processCircle')
    }, {
        path: 'dropdown',
        component: require('../views/component/dropdown')
    }, {
        path: 'draggable',
        component: require('../views/component/draggable')
    }, {
        path: 'contextmenu',
        component: require('../views/component/contextmenu')
    }, {
        path: 'split',
        component: require('../views/component/split')
    }]
}];

export default new VueRouter({
    routes: routes
});
// export function configRouter(router) {
//     router.map({
//         '/guide': {
//             component: require('../views/guide/index'),
//             subRoutes: {
//                 '/': {
//                     component: require('../views/guide/install')
//                 },
//                 'install': {
//                     component: require('../views/guide/install')
//                 },
//                 'log': {
//                     component: require('../views/guide/log')
//                 },
//                 'play': {
//                     component: require('../views/guide/play')
//                 },
//                 'introduce': {
//                     component: require('../views/guide/introduce')
//                 },
//                 'route': {
//                     component: require('../views/guide/route')
//                 },
//                 'layout': {
//                     component: require('../views/guide/layout')
//                 },
//                 'config': {
//                     component: require('../views/guide/config')
//                 },
//                 'role': {
//                     component: require('../views/guide/role')
//                 },
//                 'fes': {
//                     component: require('../views/guide/fes')
//                 },
//                 'fesApp': {
//                     component: require('../views/guide/fesApp')
//                 },
//                 'fesApi': {
//                     component: require('../views/guide/fesApi')
//                 },
//                 'fesMap': {
//                     component: require('../views/guide/fesMap')
//                 },
//                 'fesFesx': {
//                     component: require('../views/guide/fesFesx')
//                 },
//                 'fesStorage': {
//                     component: require('../views/guide/fesStorage')
//                 },
//                 'fesUtil': {
//                     component: require('../views/guide/fesUtil')
//                 },
//                 'mock': {
//                     component: require('../views/guide/mock')
//                 },
//                 'globalComponents': {
//                     component: require('../views/guide/components')
//                 },
//             }
//         },
//         '/component': {
//             component: require('../views/component/index'),
//             subRoutes: {
//                 '/': {
//                     component: require('../views/component/install')
//                 },
//                 'install': {
//                     component: require('../views/component/install')
//                 },
//                 'log': {
//                     component: require('../views/component/log')
//                 },
//                 'play': {
//                     component: require('../views/component/play')
//                 },
//                 'layout': {
//                     component: require('../views/component/layout')
//                 },
//                 'button': {
//                     component: require('../views/component/button')
//                 },
//                 'icon': {
//                     component: require('../views/component/icon')
//                 },
//                 'table': {
//                     component: require('../views/component/table')
//                 },
//                 'modal': {
//                     component: require('../views/component/modal')
//                 },
//                 'message': {
//                     component: require('../views/component/message')
//                 },
//                 'tree': {
//                     component: require('../views/component/tree')
//                 },
//                 'datePicker': {
//                     component: require('../views/component/datePicker')
//                 },
//                 'loading': {
//                     component: require('../views/component/loading')
//                 },
//                 'switch': {
//                     component: require('../views/component/switch')
//                 },
//                 'upload': {
//                     component: require('../views/component/upload')
//                 },
//                 'zoom': {
//                     component: require('../views/component/zoom')
//                 },
//                 'toast': {
//                     component: require('../views/component/toast')
//                 },
//                 'banner': {
//                     component: require('../views/component/banner')
//                 },
//                 'step': {
//                     component: require('../views/component/step')
//                 },
//                 'tooltip': {
//                     component: require('../views/component/tooltip')
//                 },
//                 'tab': {
//                     component: require('../views/component/tab')
//                 },
//                 'input': {
//                     component: require('../views/component/input')
//                 },
//                 'select': {
//                     component: require('../views/component/select')
//                 },
//                 'radio': {
//                     component: require('../views/component/radio')
//                 },
//                 'checkbox': {
//                     component: require('../views/component/checkbox')
//                 },
//                 'form': {
//                     component: require('../views/component/form')
//                 },
//                 'menu': {
//                     component: require('../views/component/menu')
//                 }
//             }
//         }
//     });

//     router.beforeEach(function (transition) {
//         //transition.to一个代表将要切换到的路径的路由对象。
//         //transition.from一个代表当前路径的路由对象。
//         //transition.next()调用此函数处理切换过程的下一步。
//         //transition.abort([reason])调用此函数来终止或者拒绝此次切换。
//         //transition.redirect(path)取消当前切换并重定向到另一个路由。
//         window.scrollTo(0, 0);
//         transition.next();
//     });

//     router.afterEach(function (transition) {
//         console.log('成功浏览到: ' + transition.to.path)
//     });

//     router.redirect({
//         '*': '/guide'
//     })
// }
