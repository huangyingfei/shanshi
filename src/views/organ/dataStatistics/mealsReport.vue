<template>
  <basic-container :block="true">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="膳食空白表" name="first">膳食空白表</el-tab-pane>
      <el-tab-pane label="食谱报表" name="second">
        <recipes-report> </recipes-report>
      </el-tab-pane>
      <el-tab-pane label="营养计算" name="third">营养计算</el-tab-pane>
      <el-tab-pane label="营养统计" name="fourth">营养统计</el-tab-pane>
      <el-tab-pane label="膳食计划" name="fifth">膳食计划</el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import RecipesReport from "./mealsReport/recipesReport.vue";

export default {
  components: { RecipesReport },
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
.basic-container {
  height: 100%;
  position: absolute;
}
</style>>
