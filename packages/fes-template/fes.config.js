module.exports = {
    // 可选有vertical、horizontal，默认vertical
    mode: 'vertical',
    // 可选有blue、dark，默认blue
    theme: 'blue',
    // 项目名称
    fesName: 'Fes.js 运营平台',
    favicon: 'static/favicon.ico', // 图标
    // 环境变量配置, 默认使用local环境
    env: {
        // 本地开发环境
        local: {
            api: ''
        },
        // 测试环境 --env=sit 触发使用
        develop: {
            api: 'http://test.xxx.com'
        },
        // 生产环境 --env=sit 触发使用
        prod: {
            api: 'http://xxx.com'
        }
    },
    // 配置角色-路由访问权限，使用FesApp.setRole('unLogin')来修改当前用户的角色，控制路由访问权限
    roles: {
        unLogin: ['/home'],
        admin: ['/list', '*']
    },
    // map
    map: {
        level: [['1', '青铜'], ['2', '白银'], ['3', '黄金'], ['4', '铂金']]
    },
    // 左侧菜单配置
    menu: [
        {
            title: '列表页',
            subMenu: [
                {
                    title: '查询列表',
                    path: '/list'
                }
            ]
        },
        {
            title: '表单页',
            subMenu: [
                {
                    title: '基础表单',
                    path: '/form/base'
                },
                {
                    title: '分步表单',
                    path: '/form/step'
                }
            ]
        },
        {
            title: '功能演示',
            path: '/layout',
            subMenu: [
                {
                    title: '$i18n.menu.internationalization',
                    path: '/layout/i18n'
                },
                {
                    title: '静态资源',
                    path: '/layout/static'
                }
            ]
        }
    ],
    i18n: {
        // default zh-cn
        locale: 'zh-cn',
        messages: {
            'zh-cn': {
                menu: {
                    internationalization: '国际化'
                },
                overview: '概述',
                i18n: {
                    internationalization: '国际化，基于',
                    achieve: '实现。',
                    ui: 'UI组件'
                },
                title: 'Fes.js 运营平台'
            },
            en: {
                menu: {
                    internationalization: 'internationalization'
                },
                overview: 'Overview',
                i18n: {
                    internationalization: 'internationalization，base on',
                    achieve: 'to achieve.',
                    ui: 'UI components'
                },
                title: 'Fes.js Admin'
            }
        }
    }
};
