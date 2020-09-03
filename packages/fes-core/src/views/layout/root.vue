<template>
    <div :class="getRootClass()" class="layout">
        <div v-if="left" class="layout-left">
            <left />
            <span v-if="mode === 'vertical'" @click="toggleMenu" class="layout-left-fold-menu">
                <span v-show="!leftHidden">
                    <Icon type="ios-arrow-back" />
                    <Icon type="ios-arrow-back" />
                </span>
                <span v-show="leftHidden">
                    <Icon type="ios-arrow-forward" />
                    <Icon type="ios-arrow-forward" />
                </span>
            </span>
        </div>
        <div class="layout-right">
            <div v-if="header" class="layout-right-header">
                <fes-header />
            </div>
            <div class="layout-right-body">
                <router-view ref="pageview" />
            </div>
        </div>
    </div>
</template>
<script>
import fesConfig from '../../config';
import left from './left.vue';

export default {
    components: {
        left
    },
    data() {
        return {
            mode: fesConfig.mode,
            theme: fesConfig.theme,
            leftHidden: false,
            header: false,
            left: true,
            animate: false
        };
    },
    methods: {
        getRootClass() {
            const arr = [
                `layout-mode-${this.mode}`,
                `layout-theme-${this.theme}`
            ];
            if (!this.left) {
                arr.push('layout-left-hide');
            }
            if (this.leftHidden) {
                arr.push('layout-left-hidden');
            }
            if (!this.header) {
                arr.push('layout-header-hide');
            }
            if (this.animate) {
                arr.push('layout-animate');
            }
            return arr;
        },
        toggleMenu() {
            this.animate = true;
            setTimeout(() => {
                this.animate = false;
            }, 300);
            this.leftHidden = !this.leftHidden;
        }
    }
};
</script>
