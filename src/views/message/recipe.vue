<template>
  <div class="unsaved">
    <div class="update">
      名称:
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span class="exact">食材名称:</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.unsaved {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
