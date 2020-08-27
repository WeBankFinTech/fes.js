<template>
    <route-menu :menu="authMenu" :width="width" :type="type" :mode="mode" :auto-close="autoClose" />
</template>
<script>
import util from '../../util/index';

export default {
    props: {
        mode: {
            type: String,
            default: 'vertical' // 垂直模式
        },
        width: {
            type: [String, Number],
            default: undefined
        },
        menu: {
            type: Array,
            default() {
                return [];
            }
        },
        type: {
            type: String,
            default: 'light'
        },
        autoClose: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            allowPage: ['*']
        };
    },
    computed: {
        authMenu() {
            return this.filterMenu(this.menu, this.allowPage);
        }
    },
    created() {
        this.allowPage = this.FesApp.getAllowPage();
        util.event.on('fes_allowPage_change', () => {
            this.allowPage = this.FesApp.getAllowPage();
        });
    },
    methods: {
        // 权限配置过滤menu对象
        filterMenu(menu, allowPage) {
            if (allowPage && menu) {
                const menuData = [];
                // 循环menu，可以访问页面才放入新对象中
                for (let i = 0; i < menu.length; i++) {
                    const item = menu[i];
                    if (
                        item.path
                        && (!item.subMenu || item.subMenu.length === 0)
                    ) {
                        if (util.canRoute(item.path, allowPage)) {
                            menuData.push(item);
                        }
                    } else if (item.subMenu && item.subMenu.length > 0) {
                        const subMenu = [];
                        for (let j = 0; j < item.subMenu.length; j++) {
                            const subItem = item.subMenu[j];
                            if (
                                (subItem.path
                                && util.canRoute(subItem.path, allowPage))
                                || !subItem.path
                            ) {
                                subMenu.push(subItem);
                            }
                        }
                        if (subMenu.length > 0) {
                            menuData.push({
                                ...item,
                                subMenu
                            });
                        }
                    } else {
                        menuData.push(item);
                    }
                }
                return menuData;
            }
            return menu;
        }
    }
};
</script>
