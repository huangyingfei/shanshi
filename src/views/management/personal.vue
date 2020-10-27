<template>
  <div class="months">
    <div class="version">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人食材库" name="first">
          <div class="cation"></div>
        </el-tab-pane>
        <el-tab-pane label="公共食材库" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>

<style scoped>
.months {
  width: 100%;
  height: 700px;
  background-color: #fff;
}
.version {
  /* width: 100%;
  height: 30px;
  background-color: red; */
}
</style>
