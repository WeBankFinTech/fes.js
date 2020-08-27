module.exports = {
    base: "/fes.js/",
    title: "Fes.js",
    description: "Curd应用快速解决方案",
    themeConfig: {
        nav: [
            { text: "指南", link: "/guide/" },
            { text: "API参考", link: "/api/" },
            { text: "组件", link: "/ui/" },
            { text: "CLI", link: "/cli/" }
        ],
        sidebar: {
            "/guide/": [
                {
                    title: "基础",
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        "",
                        "install",
                        "play",
                        "directory-structure",
                        "layout",
                        "route",
                        "permisson",
                        "i18n",
                        "option"
                    ]
                },
                {
                    title: "插件",
                    collapsable: false,
                    sidebarDepth: 1,
                    children: []
                },
                // {
                //     title: "迁移",
                //     collapsable: false,
                //     sidebarDepth: 1,
                //     children: ["migration", "migrationLast"]
                // }
            ],
            "/api/": [""],
            "/ui/": [
                "",
                {
                    title: "组件库",
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        "layout",
                        "icon",
                        "button",
                        "menu",
                        "dropdown",
                        "contextmenu",
                        "collapse",
                        "tab",
                        "table",
                        "pagination",
                        "panel",
                        "tree",
                        "step",
                        "zoom",
                        "carousel",
                        "toast",
                        "message",
                        "modal",
                        "tooltip",
                        "loading",
                        "process-circle",
                        "input",
                        "select",
                        "radio",
                        "checkbox",
                        "datePicker",
                        "timePicker",
                        "switch",
                        "form",
                        "upload",
                        // "affix",
                        'backTop',
                        'draggable',
                        "split",
                    ]
                }
            ],
            // "/cli/": [{}]
        },
        lastUpdated: "Last Updated",
        smoothScroll: true
    }
};
