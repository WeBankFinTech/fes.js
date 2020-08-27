<template>
    <ul ref="list" @click.stop="selectedTime" class="picker-item">
        <li
            v-for="(item, index) in times"
            :key="item.value"
            :data-key="item.value"
            :class="{ disabled: item.disabled, active: item.value === value, focus: focus === index }"
            class="picker-item-child"
        >
            {{item.value}}
        </li>
    </ul>
</template>

<script>
import { scrollTo } from '../../utils/util';

export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        focus: {
            type: Number,
            default: -1
        },
        times: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        selectedIndex() {
            if (this.value) {
                return this.times.findIndex(item => item.value === this.value);
            }
            return -1;
        }
    },
    watch: {
        selectedIndex() {
            this.$nextTick(() => {
                this.scrollToSelected(120);
            });
        },
        focus() {
            this.$nextTick(() => {
                this.scrollToView(0);
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.scrollToSelected(0);
        });
    },
    methods: {
        scrollToSelected(duration) {
            // move to selected item
            const select = this.$el;
            const list = this.$refs.list;
            if (!list) {
                return;
            }
            let index = this.selectedIndex;
            if (index < 0) {
                index = 0;
            }
            const to = list.children[index].offsetTop;
            const firstTop = list.children[0].offsetTop;
            scrollTo(select, to - firstTop, duration);
        },
        scrollToView(duration) {
            const select = this.$el;
            const list = this.$refs.list;
            const index = this.focus;
            if (!list || index < 0) {
                return;
            }
            const scrollTop = select.scrollTop;
            const offsetTop = list.children[index].offsetTop;
            const difference = offsetTop - scrollTop;
            if (difference < 0) {
                scrollTo(select, offsetTop, duration);
            } else if (difference > 160) {
                scrollTo(select, scrollTop + (difference - 160), duration);
            }
        },
        selectedTime(e) {
            const key = e.target.getAttribute('data-key');
            const option = this.times.filter(item => item.value === key);
            if (option.length > 0 && option[0].disabled === false) {
                this.$emit('change', option[0]);
            }
        }
    }
};
</script>
