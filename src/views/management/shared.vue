<template>
  <div class="dients">
    <!-- <h2>已申请分享平台的食材</h2> -->
    <div class="header">
      <span style=" margin-right: 10px;">菜品名称:</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width:200px;"
        size="small"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 15px;">审核状态:</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          size="mini"
          v-for="item in dirname"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-right: 10px;margin-left: 15px;">提交人:</span>
      <el-input
        size="small"
        v-model="editor"
        placeholder="请输入内容"
        style="width:200px;    height: 30px;"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 15px;">提交日期:</span>
      <el-date-picker
        size="small"
        v-model="getDate"
        type="date"
        placeholder="选择日期"
        style="width:200px"
      ></el-date-picker>
      <div>
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          style=" margin-left: 20px; margin-top: 20px; "
          >搜索</el-button
        >
        <el-button
          size="medium"
          icon="el-icon-search"
          type="primary"
          style=" margin-left: 20px; margin-top: 20px; "
          >清空</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editor: "", //提交人
      input: "",
      value: "",
      getDate: "", //提交日期
      dirname: [
        //审核状态
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核不通过"
        },
        {
          value: "3",
          label: "待审批"
        },
        {
          value: "4",
          label: "已取消"
        }
      ]
    };
  }
};
</script>
<style scoped>
.dients {
  width: 100%;
  height: 1000px;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 100px;
  /* background-color: red; */
  font-size: 13px;
  padding-top: 20px;
}
</style>
