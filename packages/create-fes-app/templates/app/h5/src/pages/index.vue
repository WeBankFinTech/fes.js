<script setup lang="ts">
import { defineRouteMeta, useRequest, useRouter } from '@fesjs/fes'
import { onMounted, ref } from 'vue'

defineRouteMeta({
  title: '首页',
})

const fes = ref('fes upgrade to vue3')
const rotate = ref(90)
const router = useRouter()
onMounted(() => {
  console.log(router)
  console.log('mounted1!!')
})
function clickIcon() {
  console.log('click Icon')
}
const { loading, data } = useRequest('api')
</script>

<template>
  <div class="onepiece">
    fes & 拉夫德鲁 <br>
    <fes-icon :spin="true" class="one-icon" type="smile" @click="clickIcon" />
    <div v-if="loading" class="loading">
      loading
    </div>
    <div v-else class="data">
      {{ data }}
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~@/styles/mixins/hairline';
@import '~@/styles/mixins/hover';

div {
    padding: 20px;
    p {
        margin: 20px;
    }
}
.one-icon {
    color: yellow;
    font-size: 24px;
    .hover();
}
.onepiece {
    .hairline('top');
    background: url('../images/male.png');
}
</style>
