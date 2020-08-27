<template>
    <div ref="carousel" class="ui-carousel">
        <div :style="getListStyle" class="ui-carousel-list">
            <div v-for="(item, index) in useList" :style="getItemStyle" :key="index" class="ui-carousel-list-item">
                <a :href="item.link">
                    <img :src="item.image">
                </a>
            </div>
        </div>
        <div v-if="useList.length > 1" class="ui-carousel-dot">
            <li v-for="(item, index) in useList" :key="index" :class="{ 'current': current == index }"
                @click="go(index)" class="ui-carousel-dot-item"
            />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Carousel',
    props: {
        interval: { // 自动轮播的时间间隔
            type: Number,
            default: 6000
        },
        data: { // 数据
            type: Array,
            required: true
        }
    },
    data() {
        return {
            baseWidth: 0, // 基准宽度
            current: 0, // 当前在第几个
            timerId: null
        };
    },
    computed: {
        // 列表的宽度
        listWidth() {
            return this.useList.length * this.baseWidth;
        },
        getListStyle() {
            return {
                width: `${this.listWidth}px`,
                transform: `translate(${-1 * this.baseWidth * this.current}px, 0)`
            };
        },
        getItemStyle() {
            return {
                width: `${this.baseWidth}px`
            };
        },
        useList() {
            const data = this.data.slice(0);
            data.forEach((item) => {
                item.link = item.link || 'javascript:void 0';
            });
            return data;
        }
    },
    mounted() {
        this.baseWidth = this.$refs.carousel.offsetWidth;
        this.timerId = this.createTimer();
    },
    destroyed() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    },
    methods: {
        createTimer() {
            return setTimeout(() => {
                if (this.useList && this.useList.length > 0) {
                    // 如果当前处于最后一个，需要自动滚动到第一个，过渡效果需要特殊处理
                    if (this.current == (this.useList.length - 1)) {
                        this.current = 0;
                    } else {
                        this.current += 1;
                    }
                }
                this.timerId = this.createTimer();
            }, this.interval);
        },
        go(num) {
            clearTimeout(this.timerId);
            this.timerId = null;
            this.current = num;
            this.timerId = this.createTimer();
        }
    }
};
</script>
