<template>
    <wb-menu :width="width" :active-name="activeName" :type="type" :mode="mode" :auto-close="autoClose" :async-select="asyncSelect">
        <template v-if="menu && menu.length > 0">
            <template v-for="(item, index) in menu">
                <wb-sub-menu v-if="item.subMenu && item.subMenu.length > 0" :key="item.title + index" :title="item.title" :icon="item.icon">
                    <wb-menu-item v-for="subItem in item.subMenu" :key="subItem.path" :name="subItem.path" :icon="subItem.icon">
                        {{subItem.title}}
                    </wb-menu-item>
                </wb-sub-menu>
                <wb-menu-item v-else :key="item.path" :name="item.path" :icon="item.icon">
                    {{item.title}}
                </wb-menu-item>
            </template>
        </template>
    </wb-menu>
</template>

<script>
import { oneOf } from '../../utils/util';
import WbMenu from './menu.vue';
import WbMenuItem from './menuItem.vue';
import WbSubMenu from './subMenu.vue';
import Emitter from '../../mixins/emitter';

export default {
    name: 'RouteMenu',
    components: {
        WbMenu,
        WbMenuItem,
        WbSubMenu
    },
    mixins: [Emitter],
    props: {
        mode: {
            validator(value) {
                return oneOf(value, ['horizontal', 'vertical']);
            },
            default: 'vertical' // 垂直模式
        },
        width: {
            type: [String, Number],
            default: undefined
        },
        menu: {
            type: Array,
            default: undefined
        },
        type: {
            validator(value) {
                return oneOf(value, ['light', 'dark']);
            },
            default: 'light'
        },
        autoClose: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activeName: ''
        };
    },
    computed: {
        allPath() {
            const menu = this.menu;
            const allPath = [];
            for (let i = 0; i < menu.length; i++) {
                const item = menu[i];
                if (item.path && (!item.subMenu || item.subMenu.length === 0)) {
                    allPath.push(item.path);
                } else if (item.subMenu && item.subMenu.length > 0) {
                    for (let j = 0; j < item.subMenu.length; j++) {
                        const subItem = item.subMenu[j];
                        if (subItem.path) {
                            allPath.push(subItem.path);
                        }
                    }
                }
            }
            return allPath;
        }
    },
    watch: {
        $route() {
            this.$nextTick(function () {
                const path = this.$route.path.split('?')[0];
                if (this.allPath.indexOf(path) !== -1) {
                    this.activeName = path;
                }
                this.broadcast('Menu', 'fes_allowPage_change');
            });
        },
        menu: {
            handler() {
                this.$nextTick(function () {
                    this.broadcast('Menu', 'fes_allowPage_change');
                });
            },
            deep: true
        }
    },
    mounted() {
        const path = this.$route.path.split('?')[0];
        if (this.allPath.indexOf(path) !== -1) {
            this.activeName = path;
        }
    },
    methods: {
        asyncSelect(name) {
            if (name) {
                return new Promise((resolve, reject) => {
                    this.$router.push(name, resolve, reject);
                });
            }
            return Promise.resolve();
        }
    }
};
</script>
