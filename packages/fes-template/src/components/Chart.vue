<template>
    <div ref="chart"></div>
</template>
<script>
import { Chart } from '@antv/g2';

export default {
    props: {
        data: {
            type: Array,
            required: true
        },
        options: {
            type: Object,
            required: true
        }
    },
    watch: {
        data() {
            if (this.chart) {
                this.chart.changeData(this.data);
                this.chart.render();
            }
        }
    },
    mounted() {
        const chart = new Chart({
            container: this.$refs.chart,
            autoFit: true,
            height: 300
        });
        this.chart = chart;
        Object.keys(this.options).forEach((p) => {
            const option = this.options[p];
            switch (p) {
                case 'scale':
                    chart.scale(option);
                    break;
                case 'coordinate':
                    chart.coordinate(option);
                    break;
                case 'tooltip':
                    chart.tooltip(option);
                    break;
                case 'axis':
                    Object.keys(option).forEach((pp) => {
                        chart.axis(pp, option[pp]);
                    });
                    break;
                default:
            }
        });

        if (this.options.line) {
            const lineGeometry = chart.line();
            Object.keys(this.options.line).forEach((pp) => {
                lineGeometry[pp](this.options.line[pp]);
            });
        }

        if (this.options.point) {
            const pointGeometry = chart.point();
            Object.keys(this.options.point).forEach((pp) => {
                pointGeometry[pp](this.options.point[pp]);
            });
        }

        if (this.data.length === 0) {
            return;
        }
        chart.data(this.data);
        chart.render();
    },
    beforeDestroy() {
        this.chart && this.chart.destroy();
    }
};
</script>
<style lang="scss" scoped>

</style>
