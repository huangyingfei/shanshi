<template>
  <div class="months">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 个人食材库 -->
      <el-tab-pane label="个人食材库" name="first">
        <personale></personale>
      </el-tab-pane>
      <!-- 公共食材库 -->
      <el-tab-pane label="公共食材库" name="second">
        <!-- 按钮 -->
        <redients></redients>
        <div class="base"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import redients from "./public";
import personale from "./storehouse";
export default {
  components: {
    redients,
    personale
  },
  data() {
    return {
      activeName: "first"
    };
  },
  watch: {
    // filterText(val) {
    //   console.log(val);
    //   this.$refs.tree.filter(val);
    // }
  },
  beforeMount() {
    // this.Protocol(); //营养素含量
    // this.ToString(); //公共
    // this.Provinces(); //省市区
    // this.queryLite(); //获取分类
    // this.treeDrawing(); //树形渲染数
    // this.Takeone();
  },
  methods: {
    resetForm() {
      // console.log(this.ruleForm.delivery1);
      // console.log(this.ruleForm.delivery1 == false ? 1 : 0);
      // console.log(this.ruleForm.delivery);
      // console.log(this.ruleForm.delivery == false ? 1 : 0);
    },

    handleClick(tab) {
      // console.log(tab);
      // this.lower = tab.index;
      // console.log(this.lower);
      // this.treeDrawing();
      // this.Protocol();
      // console.log(event);
    },

    //查看
    classification(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
/* .avue-view {
  padding: 0 5px !important;
} */
.months {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

</style>
