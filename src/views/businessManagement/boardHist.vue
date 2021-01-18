<template>
  <div class="institutions">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="退膳清单" name="first">
        <el-row>
          <el-col :span="24"
            ><div>
              <el-radio v-model="allrules" label="0">按月</el-radio>
              <el-radio v-model="allrules" label="1">按学期</el-radio>
            </div></el-col
          >
        </el-row>
        <div v-if="this.allrules == 0">
          <monthCon></monthCon>
          <!-- //按月 -->
        </div>
        <!--按学期  -->
        <div v-if="this.allrules == 1">
          <sections></sections>
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
import monthCon from "./monthContext";
import sections from "./semesters"; //按学期
export default {
  components: {
    foodturn,
    monthCon,
    sections
  },
  name: "myform",
  data() {
    return {
      allrules: "0",
      activeName: "first",

      multipleSelection: []
    };
  },
  beforeMount() {
    // this.getRules();
    // this.getSemester(); //按学期
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
