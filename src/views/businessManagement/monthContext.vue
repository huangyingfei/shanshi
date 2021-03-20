<template>
  <div>
    <el-row style="margin-top: 20px;font-size:14px">
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px;margin-left:20px">月度</span>
          <!-- <el-date-picker
            style="width: 170px"
            size="small "
            v-model="value2"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="选择月"
          >
          </el-date-picker> -->
          <el-input
            size="small "
            style="width: 170px"
            v-model="value2"
            placeholder="请输入内容"
          ></el-input></div
      ></el-col>
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px">班级</span>
          <el-cascader
            size="small "
            style="width: 170px"
            clearable
            v-model="classInfo"
            :options="loadClass"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader></div
      ></el-col>
      <el-col :span="6">
        <div>
          <span style="margin-right: 20px">姓名</span>
          <el-input
            size="small "
            style="width: 170px"
            v-model="name"
            placeholder="请输入内容"
          ></el-input></div
      ></el-col>
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px">退费状态</span>
          <el-select
            size="small "
            v-model="state"
            placeholder="请选择"
            style="width:150px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div>
          <el-button
            @click="searchStr"
            size="small"
            icon="el-icon-search"
            type="primary"
            style=" margin-left: 20px;margin-top: 10px;  "
            >搜索</el-button
          >
          <el-button
            @click="notEmpty"
            size="small"
            icon="el-icon-delete"
            type="primary"
            style=" margin-left: 20px; margin-top: 10px; "
            >清空</el-button
          >
          <el-button
            style="margin-left: 20px;margin-top: 10px;"
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="importExcel"
            >导出</el-button
          >
          <el-button
            v-if="this.cancelon == 2"
            style="margin-left: 20px;margin-top: 10px;"
            type="primary"
            size="small"
            @click="refundRow"
            >退费</el-button
          >
          <el-button
            v-if="this.cancelon == 2"
            style="margin-left: 20px;margin-top: 10px;"
            type="primary"
            size="small"
            @click="ratyrefund"
            >取消退费</el-button
          >
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div>
          <el-table
            :data="tableData"
            v-loading="loadFlag"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="50"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="monthy" label="月度" align="center">
            </el-table-column>
            <el-table-column prop="className" label="班级" align="center">
            </el-table-column>
            <el-table-column prop="studentName" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="fate" label="累计天数" align="center">
              <template slot-scope="scope">
                <!-- <span @click="openDetails(scope.row)">
                  {{ scope.row.fate }}
                </span> -->
                <el-tag
                  type="success"
                  @click="openDetails(scope.row)"
                  style="cursor:pointer"
                >
                  {{ scope.row.fate }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column prop="conFate" label="连续天数" align="center">
              <!-- <template slot-scope="scope">
                <span>{{ scope.row.conFate }}</span>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="refundAmount"
              label="退膳金额（元）"
              align="center"
            >
            </el-table-column>

            <el-table-column prop="isRefund" label="是否已退费" align="center">
              <template slot-scope="scope">
                <el-radio-group
                  v-model="scope.row.isRefund"
                  @change="agreeChange(scope.row)"
                >
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="pagingClass">
            <el-pagination
              :page-sizes="m_page.sizes"
              :page-size="m_page.size"
              :current-page="m_page.number"
              @size-change="m_handleSizeChange"
              @current-change="m_handlePageChange"
              layout="total,sizes,prev, pager, next"
              background
              :total="m_page.totalElements"
            ></el-pagination>
          </div></div
      ></el-col>
    </el-row>
    <el-dialog
      width="400px"
      title="日历"
      append-to-body
      :visible.sync="calendars"
      :close-on-click-modal="false"
    >
      <calendar
        :leaveDate="leaveDate"
        :leaveDateInfo="leaveDateInfo"
        :network="network"
        @saveCalendar="saveCalendar"
        @closeCalendar="canceloff"
      ></calendar>
    </el-dialog>
  </div>
</template>

<script>
import calendar from "@/components/vCalendar";
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: {
    calendar
  },
  data() {
    return {
      leaveDate: [],
      leaveDateInfo: [],
      network: "",
      loadFlag: false, //加载flag
      calendars: false,
      value2: "", //月度
      elseclass: [],
      classInfo: [],
      ei_class: "", //班级
      name: "", //姓名
      loadClass: [], //所在年级
      state: "", //退费状态
      sonData: "",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      cancelon: "1",
      tableData: [], //按月
      secondrefund: "",
      multipleSelection: [],
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      monthly: "",
      histories: ""
    };
  },
  beforeMount() {
    this.getStorage(); //按月
    this.getToolkit();
  },
  methods: {
    canceloff(data) {
      this.calendars = data;
    },
    saveCalendar(data) {
      // console.log(data);
      // console.log(this.secondrefund);
      this.secondrefund.returnMealDateList = data;
      console.log(this.secondrefund);
      this.$axios
        .post(`api/blade-food/returnmeallist/updateRMLDate`, this.secondrefund)
        .then(res => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getStorage();
          this.calendars = false;
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
    },
    // agreeChange: function(row, val) {
    //   console.log(row);
    //   console.log(val);
    // },
    openDetails(row) {
      console.log(row);
      this.calendars = true;
      this.network = row.isRefund;
      let param = row.returnMealDateList;
      this.secondrefund = row;
      // console.log(calendar);
      this.leaveDateInfo = param;
      let dateParsed = [];
      param.forEach((item, index) => {
        dateParsed.push(item.lateDate);
      });
      this.leaveDate = dateParsed;
      // console.log(this.leaveDate);
      // this.$nextTick(() => {
      //   this.$refs.calendar.sonFun(param);
      // });
    },
    // 取消退费 退费
    agreeChange(row) {
      console.log(row);
      let force = row.id;
      let editor = row.isRefund;
      console.log(editor);
      if (row.isRefund == 1) {
        // console.log("是是是");
        let addid = `?ids=${force}`;
        this.$axios
          .post(`api/blade-food/returnmeallist/refund` + addid, {})
          .then(res => {
            //   console.log(res);
            this.$message({
              message: "退费成功",
              type: "success"
            });
            this.getStorage();
          })
          .catch(() => {
            this.$message.error("退费失败");
          });
      } else {
        // console.log("否否否");
        let addid = `?ids=${force}`;
        this.$axios
          .post(`api/blade-food/returnmeallist/cancelRefund` + addid, {})
          .then(res => {
            this.$message({
              message: "取消成功",
              type: "success"
            });
            this.getStorage();
          })
          .catch(() => {
            this.$message.error("取消失败");
          });
      }
    },
    notEmpty() {
      this.value2 = "";
      this.classInfo = [];
      this.monthly = "";
      this.name = "";
      this.state = "";
      this.getStorage();
    },
    searchStr() {
      // console.log(this.value2.length);
      // if (this.value2 != null) {
      //   this.monthly = this.value2;
      // } else {
      //   this.monthly = "";
      // }
      if (this.classInfo.length != 0) {
        this.monthly = this.classInfo[2];
      } else {
        this.monthly = "";
      }
      console.log(this.state);
      this.getStorage();
    },
    //获取列表
    getStorage() {
      this.loadFlag = true;
      let urlParams = `?size=${this.m_page.size}&current=${
        this.m_page.number
      }&type=${0}&monthy=${this.value2}&classId=${this.monthly}&studentName=${
        this.name
      }&isRefund=${this.state}`;
      this.$axios
        .get(`api/blade-food/returnmeallist/page` + urlParams, {})
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.tableData = res.data.data.records;
          console.log(this.tableData);
          this.m_page.totalElements = res.data.data.total;
        });
    },
    //退费
    refundRow() {
      console.log(this.multipleSelection);
      let filter = [];
      this.multipleSelection.forEach((item, index) => {
        filter.push(item.id);
      });
      let invoice = filter.toString();

      // console.log(invoice);
      let addid = `?ids=${invoice}`;
      this.$axios
        .post(`api/blade-food/returnmeallist/refund` + addid, {})
        .then(res => {
          //   console.log(res);
          this.$message({
            message: "退费成功",
            type: "success"
          });
          this.getStorage();
        })
        .catch(() => {
          this.$message.error("退费失败");
        });
    },
    //取消退费
    ratyrefund() {
      let filter = [];
      this.multipleSelection.forEach((item, index) => {
        filter.push(item.id);
      });
      let invoice = filter.toString();
      //   console.log(invoice);
      let addid = `?ids=${invoice}`;
      this.$axios
        .post(`api/blade-food/returnmeallist/cancelRefund` + addid, {})
        .then(res => {
          //   console.log(res);
          this.$message({
            message: "取消成功",
            type: "success"
          });
          this.getStorage();
        })
        .catch(() => {
          this.$message.error("取消失败");
        });
    },
    //获取班级
    getToolkit() {
      this.$axios.get(`api/blade-food/class/tree`, {}).then(res => {
        this.bufs = res.data.data;
        // console.log(this.bufs);
        let fwork = [];
        this.bufs.forEach(item => {
          //   console.log(item);
          item.children.forEach((item1, index1) => {
            fwork[index1] = {
              value: item1.id,
              label: item1.label
            };
            fwork[index1].children = [];
            item1.children.forEach((item2, index2) => {
              fwork[index1].children[index2] = {
                value: item2.id,
                label: item2.label
              };
              fwork[index1].children[index2].children = [];
              if (item2.children) {
                item2.children.forEach((item3, index3) => {
                  // console.log(item3),
                  fwork[index1].children[index2].children[index3] = {
                    value: item3.id,
                    label: item3.label
                  };
                });
              }
            });
          });
        });
        this.loadClass = fwork;
      });
    },
    switchText(mes) {
      if (mes == 1) {
        return "是";
      } else {
        return "否";
      }
    },
    // IsLeapMonth(month) {
    //   if (month == 1) {
    //     return this.histories.monthy + "2";
    //   } else {
    //     return "";
    //   }
    // },
    //导入Excel
    importExcel() {
      let urlParams = `?size=${this.m_page.size}&current=${
        this.m_page.number
      }&type=${0}&monthy=${this.value2}&classId=${this.monthly}&studentName=${
        this.name
      }&isRefund=${this.state}`;
      this.$axios
        .get(`api/blade-food/returnmeallist/page` + urlParams, {})
        .then(res => {
          // console.log(res);

          this.histories = res.data.data.records;
          for (let i = 0; i < this.histories.length; i++) {
            this.histories[i].isRefund = this.switchText(
              this.histories[i].isRefund
            );
          }
          this.export2Excel();
        });
    },
    //导入Excel
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/export2Excel");
        const tHeader = [
          "月度",
          "班级",
          "姓名",
          "累计天数",
          "连续天数",
          "退膳金额(元)",
          "是否已退费"
        ]; //导出表头信息
        const filterVal = [
          "monthy",
          "className",
          "studentName",
          "fate",
          "conFate",
          "refundAmount",
          "isRefund"
        ]; // 导出的表头字段名，需要导出表格字段名
        const list = this.histories;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "退膳清单"); // 导出的表格名称
      });
    },
    //格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length != 0) {
        this.cancelon = 2;
      } else {
        this.cancelon = 1;
      }
    },
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.getStorage();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.getStorage();
    }
  }
};
</script>

<style lang="scss" scoped>
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  background-color: #fff;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 60px;
}
</style>
