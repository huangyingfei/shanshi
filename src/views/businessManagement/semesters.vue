<template>
  <div>
    <el-row style="margin-top: 20px;font-size:14px">
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px;margin-left:20px">学期</span>
          <el-select size="small" v-model="semester" placeholder="请选择">
            <el-option
              v-for="item in idSemester"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div>
          <span style="margin-right: 20px;">班级</span>
          <el-select size="small" v-model="classifiers" placeholder="请选择">
            <el-option
              v-for="item in lastClass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
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
            <el-table-column prop="conFate" label="连续天数" align="center">
            </el-table-column>
            <el-table-column
              prop="refundAmount"
              label="退膳金额（元）"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="isRefund" label="是否退费" align="center">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.isRefund">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadFlag: false, //加载flag
      idSemester: [
        {
          value: "0",
          label: "2020年第一学期"
        }
      ], //学期
      semester: "", //学期
      lastClass: [],
      classifiers: "", //班级
      dirname: "", //姓名
      state: "全部",

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
    this.getSemester(); //获取列表
  },
  methods: {
    //学期
    getSemester() {
      this.loadFlag = true;
      let urlParams = `?size=${this.m_page.size}&current=${
        this.m_page.number
      }&type=${1}`;
      this.$axios
        .get(`api/blade-food/returnmeallist/page` + urlParams, {})
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.create = res.data.data.records;
          console.log(this.create);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
