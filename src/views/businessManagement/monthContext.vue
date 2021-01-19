<template>
  <div>
    <el-row style="margin-top: 20px;font-size:14px">
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px;margin-left:20px">月度</span>
          <el-date-picker
            style="width: 170px"
            size="small "
            v-model="value2"
            type="month"
            placeholder="选择月"
          >
          </el-date-picker></div
      ></el-col>
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px">班级</span>
          <el-cascader
            size="small "
            style="width: 170px"
            v-model="ei_class"
            :options="elseclass"
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
            </el-table-column>
            <el-table-column prop="conFate" label="连续天数" align="center">
              <template slot-scope="scope">
                <span @click="openDetails(scope.row)">{{
                  scope.row.conFate
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="refundAmount"
              label="退膳金额（元）"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="isRefund" label="是否退费" align="center">
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
        </div></el-col
      >
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
        v-on:saveCalendar="saveCalendar"
      ></calendar>
    </el-dialog>
  </div>
</template>

<script>
import calendar from "@/components/vCalendar";

export default {
  components: {
    calendar
  },
  data() {
    return {
      leaveDate: [],
      leaveDateInfo: [],
      loadFlag: false, //加载flag
      calendars: false,
      value2: "", //月度
      elseclass: [],
      ei_class: "", //班级
      name: "", //姓名
      state: "全部", //退费状态
      sonData: "",
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
      }
    };
  },
  beforeMount() {
    this.getStorage(); //按月
  },
  methods: {
    saveCalendar: function(leaveDateInfoCopy) {
      console.log(leaveDateInfoCopy);
      // console.log(this.secondrefund);
      this.secondrefund.returnMealDateList = leaveDateInfoCopy;
      console.log(this.secondrefund);
      this.$axios
        .post(`api/blade-food/returnmeallist/updateRMLDate`, this.secondrefund)
        .then(res => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getStorage();
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
    //获取列表
    getStorage() {
      this.loadFlag = true;
      let urlParams = `?size=${this.m_page.size}&current=${
        this.m_page.number
      }&type=${0}`;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length != 0) {
        this.cancelon = 2;
      } else {
        this.cancelon = 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
