<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>选择部门</label>
        <el-select style="width: 100%">
          <el-option value=""></el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <label>时间</label>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">导出</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table border>
          <el-table-column
            type="index"
            width="50"
            label="序号"
          ></el-table-column>
          <el-table-column prop="date" label="部门/班级"> </el-table-column>
          <el-table-column prop="name" label="事假(天)"> </el-table-column>
          <el-table-column prop="address" label="病假(天)"> </el-table-column>
          <el-table-column prop="address" label="其他病假(天)">
          </el-table-column>
          <el-table-column prop="address" label="合计病假(天)">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
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