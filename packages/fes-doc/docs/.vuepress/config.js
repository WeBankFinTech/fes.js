module.exports = {
    base: "/fes.js/",
    title: "Fes.js",
    description: "中台应用前端快速解决方案",
    plugins: {
        "@vuepress/pwa": {
            serviceWorker: true,
            updatePopup: {
                "/": {
                    message: "发现新内容可用",
                    buttonText: "刷新"
                }
            }
        }
    },
    themeConfig: {
        repo: "WeBankFinTech/fes.js",
        sidebarDepth: 3,
        lastUpdated: "上次编辑时间",
        nav: [
            { text: "指南", link: "/guide/" },
            { text: "API参考", link: "/api/" },
            { text: "组件", link: "/ui/" }
            // { text: "CLI", link: "/cli/" }
        ],
        sidebar: {
            "/guide/": [
                {
                    title: "基础",
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        "/guide/",
                        "/guide/install.md",
                        "/guide/play",
                        "/guide/directory-structure",
                        "/guide/layout",
                        "/guide/route",
                        "/guide/permisson",
                        "/guide/i18n",
                        "/guide/option"
                    ]
                },
                {
                    title: "插件",
                    collapsable: false,
                    sidebarDepth: 1,
                    children: []
                },
                "/guide/releaseNote",
                "/guide/contact"
                // {
                //     title: "迁移",
                //     collapsable: false,
                //     sidebarDepth: 1,
                //     children: ["migration", "migrationLast"]
                // }
            ],
            "/api/": ["/api/"],
            "/ui/": [
                "/ui/",
                {
                    title: "组件库",
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        "/ui/layout",
                        "/ui/icon",
                        "/ui/button",
                        "/ui/menu",
                        "/ui/dropdown",
                        "/ui/contextmenu",
                        "/ui/collapse",
                        "/ui/tab",
                        "/ui/table",
                        "/ui/pagination",
                        "/ui/panel",
                        "/ui/tree",
                        "/ui/step",
                        "/ui/zoom",
                        "/ui/carousel",
                        "/ui/toast",
                        "/ui/message",
                        "/ui/modal",
                        "/ui/tooltip",
                        "/ui/loading",
                        "/ui/process-circle",
                        "/ui/input",
                        "/ui/select",
                        "/ui/radio",
                        "/ui/checkbox",
                        "/ui/datePicker",
                        "/ui/timePicker",
                        "/ui/switch",
                        "/ui/form",
                        "/ui/upload",
                        // "/ui/affix",
                        "/ui/backTop",
                        "/ui/draggable",
                        "/ui/split"
                    ]
                }
            ]
            // "/cli/": [{}]
        }
    }
};
