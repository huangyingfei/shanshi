<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="90%"
      :append-to-body="true"
    >
      <div id="test">
        <form method="post" action="#" id="printJS-form" style="padding: 5px">
          <h1>2020年9月第2周采购单</h1>
          <h2>
            采购单-按天
            <p>9月14日 至 9月20日</p>
          </h2>
          <el-table
            :data="tableData"
            :span-method="dtosSpanMethod"
            class="dtosTable"
            :cell-style="rowStyle"
            :header-cell-style="rowStyle"
          >
            <el-table-column
              :label="item.label"
              align="center"
              v-for="item in headerData"
              :key="item.deliverTimeStr"
            >
              <el-table-column :label="item.deliverTimeStr" align="center">
                <el-table-column label="食物名称" align="center">
                  <template slot-scope="scope">
                    {{ scope.row[item.prop + "FoodName"] }}
                  </template>
                </el-table-column>
                <el-table-column label="数量" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row[item.prop + 'Value'] != '0'">
                      {{ scope.row[item.prop + "Value"] }}
                      {{ scope.row[item.prop + "Unit"] }}
                    </span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </form>
      </div>
      <div class="fixed">
        <el-row type="flex" justify="center">
          <el-col :span="4">
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="exportPrintData">导出Excel</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="doPrint">打印</el-button>
            <!-- <el-button type="primary" @click="doPrint">打印</el-button> -->
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import print from "print-js";
import { exportExcel } from "../../../../api/exportExcel";

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
      headerData: [],
      dialogVisible: false,
      stockTimeStr: "",
    };
  },
  mounted() {},
  methods: {
    openShopTablePrint(stockTimeStr) {
      this.stockTimeStr = stockTimeStr;
      this.dialogVisible = true;
      this.getPrintData(stockTimeStr);
    },
    rowStyle() {
      return {
        border: "1px solid #000000 !important",
      };
    },
    doPrint() {
      // this.$Print({
      //   id: "test",
      // });
      printJS({
        printable: "printJS-form",
        type: "html",
        scanStyles: false,
      });
    },
    getPrintData(stockTimeStr) {
      this.axios({
        url: "/api/blade-food/stock/getStockPrint",
        method: "get",
        params: {
          stockTimeStr: stockTimeStr,
        },
      }).then((res) => {
        this.headerData = res.data.data.headerData;
        this.tableData = res.data.data.tableData;
        console.log(this.tableData);
      });
    },
    exportPrintData() {
      exportExcel(
        this.axios,
        { stockTimeStr: this.stockTimeStr },
        "/api/blade-food/stock/export-stockInfo"
      );
    },
  },
};
</script>

<style scoped>
.fixed {
  margin-top: 20px;
}
.el-table--border {
  border: 1px solid #000000 !important;
}
</style>