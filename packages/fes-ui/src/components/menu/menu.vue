<template>
    <div :style="{ width: menuWidth }" :class="getClass" class="ui-menu">
        <ul>
            <slot />
        </ul>
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter';
import { oneOf } from '../../utils/util';

export default {
    name: 'Menu',
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
        activeName: {
            type: [String, Number],
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
        },
        asyncSelect: Function
    },
    data() {
        return {
            currentActiveName: this.activeName
        };
    },
    computed: {
        getClass() {
            const className = [];
            if (this.mode) {
                className.push(`ui-menu-mode-${this.mode}`);
            }
            if (this.type) {
                className.push(`ui-menu-type-${this.type}`);
            }
            return className;
        },
        menuWidth() {
            if (
                this.width
                && (typeof this.width === 'number'
                || (this.width.indexOf('%') === -1
                && this.width.indexOf('px') === -1))
            ) {
                return `${this.width}px`;
            }
            return this.width;
        }
    },
    watch: {
        activeName(name) {
            this.updateName(name);
        }
    },
    mounted() {
        if (this.currentActiveName) {
            // 向下广播选择节点
            this.broadcast('MenuItem', 'fes_menu_activeName', this.currentActiveName);
            this.broadcast('SubMenu', 'fes_menu_activeName', this.currentActiveName);
        }
        this.$on('fes_menu_item_click', (name) => {
            if (this.asyncSelect && typeof this.asyncSelect === 'function') {
                Promise.resolve(this.asyncSelect(name)).then(() => {
                    this.updateName(name);
                });
            } else {
                this.updateName(name);
                // 选择事件
                this.$emit('select', name);
            }
        });
        this.$on('fes_submenu_click', (args) => {
            if (this.autoClose) {
                this.broadcast('SubMenu', 'fes_submenu_close_other', args);
            }
        });
        this.$on('fes_allowPage_change', () => {
            // 向下广播选择节点
            this.broadcast('MenuItem', 'fes_menu_activeName', this.currentActiveName);
            this.broadcast('SubMenu', 'fes_menu_activeName', this.currentActiveName);
        });
    },
    methods: {
        updateName(name) {
            if (name !== this.currentActiveName) {
                this.currentActiveName = name;
                // 向下广播选择节点
                this.broadcast('MenuItem', 'fes_menu_activeName', this.currentActiveName);
                this.broadcast('SubMenu', 'fes_menu_activeName', this.currentActiveName);
            }
        }
    }
};
</script>
