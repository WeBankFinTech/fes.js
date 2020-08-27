<template>
    <div v-clickoutside="clickoutside" @mouseover="mouseover" @mouseout="mouseout" class="wb-dropdown">
        <div ref="dropdown-slot" @click="click" class="wb-dropdown-slot">
            <slot />
        </div>
        <dropdown-menu :data="data" :open="sonOpen" />
    </div>
</template>

<script>
import dropdownMenu from './dropdownMenu';
import emitter from '../../mixins/emitter';
import { contains } from '../../utils/util';
import clickoutside from '../../directives/clickoutside';

export default {
    name: 'Dropdown',
    directives: {
        clickoutside
    },
    components: {
        dropdownMenu
    },
    mixins: [emitter],
    props: {
        trigger: {
            required: false,
            type: String,
            default: 'hover',
            validator: value => ['click', 'hover'].indexOf(value) !== -1
        },
        data: {
            type: Array,
            default: undefined
        }
    },
    data() {
        return {
            sonOpen: false,
            timer: null
        };
    },
    mounted() {
        this.$on('chooseItem', (item, event) => {
            this.$emit('on-choose', item, event);
            this.close();
        });
    },
    methods: {
        close() {
            this.sonOpen = false;
            this.closing = true;
            setTimeout(() => {
                this.closing = false;
            }, 300);
            this.broadcast('DropdownMenu', 'hideSubmenu', this); // 当点击item时，从根往下广播关闭，修正click时候直接点击docment.body后再打开保持原样的问题
        },
        mouseover(event) {
            if (this.trigger == 'hover' && (!this.closing || contains(this.$refs['dropdown-slot'], event.target))) {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.sonOpen = true;
            }
        },
        mouseout() {
            if (this.trigger == 'hover') {
                this.timer = setTimeout(() => {
                    this.sonOpen = false;
                }, 300);
            }
        },
        click() {
            if (this.trigger == 'click') {
                this.sonOpen = !this.sonOpen;
            }
        },
        clickoutside() {
            if (this.trigger == 'click' && this.sonOpen) {
                this.close();
            }
        }
    }
};
</script>
