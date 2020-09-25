<template>
    <div class="card">
        <div class="card-header">
            {{title}}
            <div class="card-header-extra"><slot name="extra"></slot></div>
        </div>
        <div class="card-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/variables";
.card {
  box-sizing: border-box;
  position: relative;
  background: rgb(255, 255, 255);
  border-radius: 2px;
  color: $text-color;
  .card-header {
    min-height: 48px;
    margin-bottom: -1px;
    padding: 0px 24px;
    color: $title-color;
    font-weight: 500;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid rgb(240, 240, 240);
    border-radius: 2px 2px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-header-extra {
      color: $title-color;
      font-weight: normal;
      font-size: 14px;
    }
  }
  .card-body {
    margin: -1px 0px 0px -1px;
    padding: 0px;
  }
}
</style>
