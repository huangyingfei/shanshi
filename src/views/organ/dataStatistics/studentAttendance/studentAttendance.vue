<template>
  <basic-container :block="true">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="请假统计" name="first">
        <leave-statistics></leave-statistics>
      </el-tab-pane>
      <el-tab-pane label="请假分布图" name="second">
        <div v-if="activeName == 'second'">
          <leave-chart />
        </div>
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import LeaveChart from "./leaveChart.vue";
import LeaveStatistics from "./leaveStatistics.vue";
export default {
  components: { LeaveStatistics, LeaveChart, LeaveStatistics },
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
