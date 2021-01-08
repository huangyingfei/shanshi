<template>
  <div class="institutions">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="退膳清单" name="first">
        <el-row>
          <el-col :span="24"
            ><div>
              <el-radio v-model="allrules" label="1">按月</el-radio>
              <el-radio v-model="allrules" label="2">按学期</el-radio>
            </div></el-col
          >
        </el-row>
        <div v-if="this.allrules == 1">
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
                  v-model="value"
                  :options="options"
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
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="24"
              ><div>
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="序号" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="月度" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="班级" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="退费类型" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="累计天数" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="退膳金额（元）"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="name" label="是否退费" align="center">
                  </el-table-column>
                </el-table></div
            ></el-col>
          </el-row>
        </div>
        <!--按学期  -->
        <div v-if="this.allrules == 2">
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
                <el-select
                  size="small"
                  v-model="classifiers"
                  placeholder="请选择"
                >
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
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="序号" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="学期" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="班级" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="退费类型" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="累计天数" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="退膳金额（元）"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="name" label="是否退费" align="center">
                  </el-table-column>
                </el-table></div
            ></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="退膳规则设置" name="second">
        <foodturn></foodturn>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import foodturn from "./rulesFilter";
export default {
  components: {
    foodturn
  },
  name: "myform",
  data() {
    return {
      allrules: "1",
      activeName: "first",
      value2: "",
      name: "",
      value: "",

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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        }
      ],
      state: "全部"
    };
  },
  beforeMount() {
    // this.getRules();
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped>
.institutions {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
