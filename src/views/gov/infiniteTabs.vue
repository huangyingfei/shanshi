<template>
  <el-tabs v-model="activeName">
    <el-table-pane label="食谱综合评分排行榜" name="first"> </el-table-pane>
    <el-table-pane label="" name="second"></el-table-pane>
  </el-tabs>
</template>
<script>
import infiniteScroll from "./infiniteScroll.vue";
import LiRow from "./liRow.vue";
import SchoolLiRow from "./schoolLiRow.vue";

export default {
  components: {
    infiniteScroll,
    LiRow,
    SchoolLiRow,
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>