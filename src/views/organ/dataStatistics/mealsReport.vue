<template>
  <basic-container :block="true">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="食谱报表" name="first">
        <recipes-report> </recipes-report>
      </el-tab-pane>
      <el-tab-pane label="营养统计" name="second">
        <nutrition></nutrition>
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import RecipesReport from "./mealsReport/recipesReport.vue";
import nutrition from "./nutritionValue";
export default {
  components: { RecipesReport, nutrition },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.basic-container {
  height: 100%;
  position: absolute;
}
</style>
