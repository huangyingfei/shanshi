<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <week @weekChange="weekChange"></week>
      </el-col>
      <el-col :span="4" style="display: flex">
        <label>人群选择</label>
        <el-select>
          <el-option></el-option>
        </el-select>
      </el-col>
      <el-col :span="14" style="display: flex">
        <el-button type="primary">保存</el-button>
        <el-button type="primary">重新生成</el-button>
        <el-button icon="el-icon-s-data">膳食称重登记明细表</el-button>
        <el-button icon="el-icon-s-data">膳食称重登记明细表(竖版)</el-button>
      </el-col>
    </el-row>
    <nutrition-table />
  </div>
</template>

<script>
import week from "../../../../components/week.vue";
import NutritionTable from "./nutritionCal/nutritionTable.vue";
export default {
  components: { week, NutritionTable },
  data() {
    return {
      weekInfo: {},
    };
  },
  methods: {
    weekChange(weekInfo) {
      this.weekInfo = weekInfo;
    },
  },
};
</script>

<style scoped>
label {
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  white-space: nowrap;
  line-height: 40px;
}
</style>