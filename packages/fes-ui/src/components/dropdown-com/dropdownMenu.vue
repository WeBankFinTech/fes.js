<template>
    <transition name="slide-to-down">
        <ul ref="list" v-show="open" :class="dropdownMenuClass" class="wb-dropdown-menu">
            <li v-for="(item, index) in currentData" :key="index" :class="getItemClass(item)"
                @mouseover="mouseover(item)" @mouseout="mouseout(item)" @click="choose(item, $event)"
            >
                {{item.content}}
                <template v-if="item.children && item.children.length">
                    <dropdown-menu :data="item.children" :open="item.sonOpen" type="sub" />
                </template>
            </li>
        </ul>
    </transition>
</template>
<script>
import emitter from '../../mixins/emitter';

export default {
    name: 'DropdownMenu',
    mixins: [emitter],
    props: {
        type: {
            required: false,
            type: String,
            default: 'root'
        },
        data: {
            type: Array,
            default: undefined
        },
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentData: this.data,
            timer: null
        };
    },
    computed: {
        dropdownMenuClass() {
            if (this.type === 'sub') {
                return 'wb-dropdown-menu-sub';
            }
        }
    },
    created() {
        this.$on('hideSubmenu', () => {
            this.broadcast('DropdownMenu', 'hideSubmenu', this);
            this.currentData.forEach((item) => {
                if (item.children && item.children.length > 0) {
                    item.sonOpen = false;
                }
            });
        });
    },
    mounted() {
        this.currentData.forEach((item) => {
            if (item.children && item.children.length > 0) {
                this.$set(item, 'sonOpen', false);
            }
        });
    },
    methods: {
        getItemClass(item) {
            const arr = [
                'wb-dropdown-menu-item',
                { 'wb-dropdown-menu-item-disabled': item.disabled },
                { 'wb-dropdown-menu-item-divider': item.divided }
            ];
            if (item.children && item.children.length > 0) {
                arr.push('wb-dropdown-menu-item-swap');
            }
            return arr;
        },
        mouseover(item) {
            if (!item.children || item.children.length == 0) {
                return;
            }
            if (item.timer) {
                clearTimeout(item.timer);
            }
            item.sonOpen = true;
        },
        mouseout(item) {
            if (!item.children || item.children.length == 0) {
                return;
            }
            item.timer = setTimeout(() => {
                item.sonOpen = false;
            }, 300);
        },
        choose(item, event) {
            if (!item.children || item.children.length == 0) {
                this.dispatch('Dropdown', 'chooseItem', [item, event]);
            }
        }
    }
};
</script>
