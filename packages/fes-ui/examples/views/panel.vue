<template>
    <Row class="panel">
        <Cell ref="left" class="son-panel" span="12">
            <slot name="template" />
        </Cell>
        <div class="panel-split" />
        <Cell :style="{'height': height, 'overflow': 'hidden'} " class="son-panel" span="12">
            <div ref="code" class="code">
                <slot name="code" />
            </div>
        </Cell>
        <div v-show="status=='down'" class="more">
            <a href="javascript:void 0" @click="down"><Icon type="arrow-down" />下拉展示更多code</a>
        </div>
        <div v-show="status=='up'" class="more">
            <a href="javascript:void 0" @click="up"><Icon type="arrow-up" />上拉收起</a>
        </div>
    </Row>
</template>
<script type="text/ecmascript-6">
export default {
    data: function () {
        return {
            status: 'down',
            height: 0,
            leftHeight: 0,
            codeHeight: 0
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.leftHeight = this.$refs.left.$el.clientHeight;
            this.codeHeight = this.$refs.code.clientHeight;
            this.height = this.leftHeight + 'px';
            if (this.codeHeight < this.leftHeight) {
                this.status = ''
            }
        })
    },
    methods: {
        down() {
            this.height = this.codeHeight + 'px';
            this.status = 'up';
        },
        up() {
            this.height = this.leftHeight + 'px';
            this.status = 'down';
        }
    }
}
</script>
