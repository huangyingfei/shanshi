<template>
  <div>
    <form method="post" action="#" id="printJS-form">
      <h1>2020年9月第2周采购单</h1>
      <h2>
        采购单-按天
        <p>9月14日 至 9月20日</p>
      </h2>
      <el-table
        :data="tableData"
        border
        style="width: 98%"
        :span-method="dtosSpanMethod"
        class="dtosTable"
        :header-cell-style="rowStyle"
        :cell-style="rowStyle"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </form>
    <div>
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-button @click="nutritionDialogVisible = false">取消</el-button>
        </el-col>
        <el-col :span="4">
          <el-button @click="exportRrecipeInfo">导出Excel</el-button>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            onclick="printJS({ 
              printable: 'printJS-form', 
              type: 'html', 
              scanStyles: false
            })"
            >打印</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          tag: "家",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
          tag: "公司",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
          tag: "家",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
          tag: "公司",
        },
      ],
    };
  },
  methods: {
    rowStyle() {
      return {
        border: "1px solid black",
        "background-color": "rgb(255, 255, 255)",
      };
    },
    printObj() {},
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  left: 0px;
  padding-top: 10px;
  bottom: 0px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  z-index: 9999;
}
.table-border {
  border: solid 1px;
}
</style>