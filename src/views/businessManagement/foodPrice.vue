<template>
  <basic-container :block="true">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人食材库" name="first">
        <food-warehouse />
      </el-tab-pane>
      <el-tab-pane label="公共食材库" name="second">公共食材库 </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import FoodWarehouse from "./foodPrice/foodWarehouse.vue";
export default {
  components: { FoodWarehouse },
  data() {
    return {
      activeName: "first",
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
