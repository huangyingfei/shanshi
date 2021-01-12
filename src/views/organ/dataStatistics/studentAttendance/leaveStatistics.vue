<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>选择部门</label>
        <el-cascader
          v-model="classId"
          :options="options"
          :props="{ value: 'id', disabled: 'edisabled' }"
          @change="getStudentWork"
          :show-all-levels="false"
        ></el-cascader>
      </el-col>
      <el-col :span="10">
        <label>时间</label>
        <el-date-picker
          v-model="dateRangeValue"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
          @change="getStudentWork"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">导出</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table border :data="leaveData">
          <el-table-column
            type="index"
            width="50"
            label="序号"
          ></el-table-column>
          <el-table-column prop="className" label="部门/班级">
          </el-table-column>
          <el-table-column prop="sj" label="事假(天)"> </el-table-column>
          <el-table-column prop="bj" label="病假(天)"> </el-table-column>
          <el-table-column prop="other" label="其他病假(天)"> </el-table-column>
          <el-table-column prop="hj" label="合计病假(天)"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from "@/util/date.js";

export default {
  data() {
    return {
      options: [],
      classId: [""],
      dateRangeValue: [],
      leaveData: [],
    };
  },
  mounted() {
    this.getclassTree();
    this.dateRangeDefaultValue();
    this.getStudentWork();
  },
  methods: {
    dateRangeDefaultValue() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.dateRangeValue = [
        dateFormat(start, "yyyy-MM-dd"),
        dateFormat(end, "yyyy-MM-dd"),
      ];
    },
    getclassTree() {
      this.axios({
        url: "/api/blade-food/class/tree",
        method: "get",
      }).then((res) => {
        this.options = res.data.data[0].children;
        console.log(this.options);
      });
    },
    getStudentWork() {
      this.axios({
        url: "/api/blade-food/report/orgStudentWork",
        method: "get",
        params: {
          startTime: this.dateRangeValue[0],
          endTime: this.dateRangeValue[1],
          classId: this.classId.slice(-1)[0],
        },
      }).then((res) => {
        this.leaveData = res.data.data;
      });
    },
  },
};
</script>

<style scoped>
.el-col {
  display: flex;
}
label {
  line-height: 40px;
  flex-shrink: 0;
  margin-right: 12px;
  color: #606266;
  font-size: 14px;
}
</style>