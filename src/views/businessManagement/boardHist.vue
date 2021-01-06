<template>
  <div class="institutions">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="退膳清单" name="first">
        <el-row>
          <el-col :span="24"
            ><div>
              <el-radio v-model="radio" label="1">按月</el-radio>
              <el-radio v-model="radio" label="2">按学期</el-radio>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;font-size:14px">
          <el-col :span="6"
            ><div>
              <span style="margin-right: 20px">月度</span>
              <el-date-picker
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
                v-model="value"
                :options="options"
                @change="handleChange"
              ></el-cascader></div
          ></el-col>
          <el-col :span="6">
            <span style="margin-right: 20px">姓名</span>
            <el-input
              v-model="name"
              placeholder="请输入内容"
              style="width: 215px"
            ></el-input>
            <div></div
          ></el-col>
          <el-col :span="6"
            ><div>
              <span style="margin-right: 20px">退费状态</span>
              <el-select
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
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" align="center">
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
          <el-table-column prop="name" label="退膳金额（元）" align="center">
          </el-table-column>
          <el-table-column prop="name" label="是否退费" align="center">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="退膳规则设置" name="second">2222</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "myform",
  data() {
    return {
      activeName: "first",
      radio: "1",
      value2: "",
      name: "",
      value: "",
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
  beforeMount() {},

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
