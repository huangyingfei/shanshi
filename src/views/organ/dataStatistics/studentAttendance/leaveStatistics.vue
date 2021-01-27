<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>选择班级</label>
        <el-cascader
          v-model="classId"
          :options="options"
          :props="{ value: 'id', disabled: 'edisabled' }"
          :show-all-levels="false"
          clearable
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
        >
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="studentWorkExport">导出</el-button>
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
          <el-table-column prop="hj" label="合计(天)"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from "@/util/date.js";
import { exportExcel } from "../../../../api/exportExcel";

export default {
  watch: {
    classId: {
      handler: function (newVal, oldVal) {
        console.log(newVal);
        console.log(oldVal);
        console.log(this.classId);
        this.leaveForm.classId = "";
        console.log(newVal);
        if (newVal.length != 0) {
          this.leaveForm.classId = newVal.slice(-1)[0];
        }
        this.getStudentWork();
      },
    },
    dateRangeValue: {
      handler: function (newVal, oldVal) {
        this.leaveForm.startTime = "";
        this.leaveForm.endTime = "";
        console.log("clear");
        console.log(newVal);
        if (newVal != null) {
          this.leaveForm.startTime = newVal[0];
          this.leaveForm.endTime = newVal[1];
        }
        this.getStudentWork();
      },
    },
  },
  data() {
    return {
      options: [],
      classId: [""],
      dateRangeValue: [],
      leaveData: [],
      leaveForm: {
        startTime: "",
        endTime: "",
        classId: "",
      },
    };
  },
  mounted() {
    this.getclassTree();
    this.dateRangeDefaultValue();
    // this.getStudentWork();
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
        params: this.leaveForm,
      }).then((res) => {
        this.leaveData = res.data.data;
      });
    },
    studentWorkExport() {
      exportExcel(
        this,
        this.leaveForm,
        "/api/blade-food/report/orgStudentWorkExport",
        "请假统计"
      );
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