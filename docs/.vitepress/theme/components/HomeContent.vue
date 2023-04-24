<template>
    <div class="VPFeatures">
        <div class="vp-doc fes-home container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.VPFeatures {
    position: relative;
    padding: 0 24px;
    margin-top: 32px;
}

@media (min-width: 640px) {
    .VPFeatures {
        padding: 0 48px;
    }
}

@media (min-width: 960px) {
    .VPFeatures {
        padding: 0 64px;
    }
}

.container {
    margin: 0 auto;
    max-width: 1152px;
}
</style>

<style>
.fes-home img {
    height: 320px;
}
</style>