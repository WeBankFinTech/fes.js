<template>
    <div>
        <Row class="top-panel">
            <Cell class="logo-swap" span="4">
                <span class="logo">FES</span>
                <span class="desc">一个好用的快速开发框架</span>
            </Cell>
            <Cell offset="14" span="6">
                <Cell span="5">
                    <router-link class="item" :class="selected('/guide')"  to="/guide">
                        指南
                    </router-link>
                </Cell>
                <Cell span="5">
                    <router-link class="item" :class="selected('/component')" to="/component">
                        组件
                    </router-link>
                </Cell>
            </Cell>
        </Row>
        <div class="bottom-panel">
            <router-view></router-view>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    data: function () {
        return {
        }
    },
    methods: {
        selected(path) {
            if (this.$route.path.indexOf(path) != -1) {
                return 'selected'
            }
        }
    }
}
</script>
<style src="../styles/main.scss" lang="scss"></style>
