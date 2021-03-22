<template>
  <div>
    <el-row style="margin-top: 20px;font-size:14px">
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px;margin-left:20px">学期</span>
          <!-- <el-select size="small" v-model="semester" placeholder="请选择">
            <el-option
              v-for="item in idSemester"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
          <el-input
            size="small "
            style="width: 190px"
            v-model="semester"
            placeholder="请输入内容"
          ></el-input></div
      ></el-col>
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px;">班级</span>
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
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px">姓名</span>
          <el-input
            size="small "
            style="width: 170px"
            v-model="dirname"
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
            :data="create"
            border
            style="width: 100%"
            v-loading="loadFlag"
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
            <el-table-column prop="term" label="学期" align="center">
            </el-table-column>
            <el-table-column prop="className" label="班级" align="center">
            </el-table-column>
            <el-table-column prop="studentName" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="fate" label="累计天数" align="center">
            </el-table-column>
            <!-- <el-table-column prop="conFate" label="连续天数" align="center">
            </el-table-column> -->
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
      loadFlag: false, //加载flag
      classInfo: [],
      loadClass: [], //所在年级
      idSemester: [
        {
          value: "0",
          label: "2020年第一学期"
        }
      ], //学期
      cancelon: "1",
      semester: "", //学期
      lastClass: [],
      classifiers: "", //班级
      dirname: "", //姓名
      secondrefund: "",
      state: "",

      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "是"
        },
        {
          value: "2",
          label: "否"
        }
      ],
      create: [], //按学期
      multipleSelection: [],
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      monthly: "",
      semesters: ""
    };
  },
  beforeMount() {
    this.getSemester(); //获取列表
    this.getToolkit();
  },
  methods: {
    switchText(mes) {
      if (mes == 1) {
        return "是";
      } else {
        return "否";
      }
    },
    //导出Excel
    importExcel() {
      let urlParams = `?size=${this.m_page.size}&current=${
        this.m_page.number
      }&type=${1}`;
      this.$axios
        .get(`api/blade-food/returnmeallist/page` + urlParams, {})
        .then(res => {
          this.semesters = res.data.data.records;
          for (var i = 0; i < this.semesters.length; i++) {
            this.semesters[i].isRefund = this.switchText(
              this.semesters[i].isRefund
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
          "学期",
          "班级",
          "姓名",
          "累计天数",
          "退膳金额(元)",
          "是否退费"
        ]; //导出表头信息
        const filterVal = [
          "term",
          "className",
          "studentName",
          "fate",
          "refundAmount",
          "isRefund"
        ]; // 导出的表头字段名，需要导出表格字段名
        const list = this.semesters;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "退膳清单"); // 导出的表格名称
      });
    },
    //格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    refundRow() {
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
          this.getSemester();
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
          this.getSemester();
        })
        .catch(() => {
          this.$message.error("取消失败");
        });
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
            this.getSemester();
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
            this.getSemester();
          })
          .catch(() => {
            this.$message.error("取消失败");
          });
      }
    },
    notEmpty() {
      this.semester = "";
      this.classInfo = [];
      this.monthly = "";
      this.dirname = "";
      this.state = "";
      this.getSemester();
    },
    searchStr() {
      if (this.classInfo.length != 0) {
        this.monthly = this.classInfo[2];
      } else {
        this.monthly = "";
      }
      this.getSemester();
    },
    //学期
    getSemester() {
      this.loadFlag = true;
      let urlParams = `?size=${this.m_page.size}&current=${
        this.m_page.number
      }&type=${1}&term=${this.semester}&classId=${this.monthly}&studentName=${
        this.dirname
      }&isRefund=${this.state}`;
      this.$axios
        .get(`api/blade-food/returnmeallist/page` + urlParams, {})
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.create = res.data.data.records;
          // console.log(this.create);
          this.m_page.totalElements = res.data.data.total;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length != 0) {
        this.cancelon = 2;
      } else {
        this.cancelon = 1;
      }
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
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.getSemester();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.getSemester();
    }
  }
};
</script>

<style lang="scss" scoped></style>
