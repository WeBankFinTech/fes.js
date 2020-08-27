<template>
    <li :class="subMenuClassNames" @mouseover="toggle" @mouseout="toggle">
        <div @click="click" class="ui-menu-submenu-title">
            <img v-if="icon" :src="icon" @load="loadIcon" class="ui-menu-submenu-icon">
            {{title}}
            <div :class="arrowClassNames">
                <Icon type="ios-arrow-down" size="12" />
            </div>
        </div>
        <ul ref="submenuSwap" v-show="active" class="ui-menu-submenu-ul">
            <slot />
        </ul>
    </li>
</template>
<script>
import Emitter from '../../mixins/emitter';
import Icon from '../icon';

export default {
    name: 'SubMenu',
    components: {
        Icon
    },
    mixins: [Emitter],
    props: {
        title: {
            type: String,
            default: undefined
        },
        icon: {
            required: false,
            type: String,
            default: ''
        },
        expand: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            children: [],
            active: this.expand,
            choosed: false
        };
    },
    computed: {
        arrowClassNames() {
            return {
                'ui-menu-arrow': true,
                'ui-menu-arrow-active': this.active
            };
        },
        subMenuClassNames() {
            return {
                'ui-menu-submenu': true,
                'ui-menu-submenu-actived': this.active,
                'ui-menu-submenu-choosed': this.choosed
            };
        }
    },
    mounted() {
        // 如果是垂直状态，计算下UL的最低宽度
        if (this.$parent.mode == 'horizontal') {
            this.$refs.submenuSwap.style['min-width'] = `${this.$el.clientWidth}px`;
        }

        // 拿到它的子菜单
        this.children = this.getItems(this.$children);

        // 点击了一项菜单
        this.$on('fes_menu_activeName', (name) => {
            if (this.children.indexOf(name) != -1) {
                this.choosed = true;
                // 水平模式下, 选择完子项，150毫秒之后消失下拉框
                if (this.$parent.mode == 'horizontal') {
                    setTimeout(() => {
                        this.active = false;
                    }, 150);
                }
            } else {
                this.choosed = false;
            }
        });

        this.$on('fes_submenu_close_other', (args) => {
            if (args._uid != this._uid) {
                this.active = false;
            }
        });
    },
    methods: {
        loadIcon() {
            // 如果是垂直状态，计算下UL的最低宽度
            if (this.$parent.mode == 'horizontal') {
                this.$refs.submenuSwap.style['min-width'] = `${this.$el.clientWidth}px`;
            }
        },
        toggle(e) {
            // 垂直模式下, 悬浮切换关闭
            if (this.$parent.mode == 'horizontal') {
                if (e.type == 'mouseover') {
                    if (this.toggleTimer) {
                        clearTimeout(this.toggleTimer);
                    }
                    this.active = true;
                }
                if (e.type == 'mouseout') {
                    this.toggleTimer = setTimeout(() => {
                        this.active = false;
                    }, 200);
                }
            }
        },
        click() {
            this.dispatch('Menu', 'fes_submenu_click', this);
            // 垂直模式下, 点击切换关闭
            if (this.$parent.mode == 'vertical') {
                this.active = !this.active;
            }
        },
        getItems(columns) {
            const result = [];
            if (columns) {
                columns.forEach((column) => {
                    if (column.$options.name == 'MenuItem') {
                        result.push(column.name);
                    }
                    if (column.$children && column.$children.length > 0) {
                        result.push.apply(result, this.getItems(column.$children));
                    }
                });
            }
            return result;
        }
    }
};
</script>
