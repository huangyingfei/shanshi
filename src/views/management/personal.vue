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
.cation {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
}
.personal {
  width: 350px;
  height: 100%;
  /* background-color: yellow; */
  border-right: 1px solid #e0e0e0;
}
.rights {
  width: 70%;
  height: 100%;
  /* background-color: red; */
  margin-left: 10px;
}
.monly {
  width: 350px;
  height: 100%;
  margin-top: 10px;
}
.import {
  width: 100%;
  height: 30px;
  /* background-color: red; */
  margin-top: 15px;
  /* line-height: 50px; */
  margin-left: 9px;
}
.whole {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  /* background-color: red; */
}
.export {
  width: 77px;
  height: 35px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;

  font-size: 14px;
  float: left;
}
.toLine {
  width: 2px;
  height: 20px;
  margin-top: 5px;
  border-right: solid #acc0d8 1px;
  float: left;
}
.export1 {
  width: 100px;
  height: 35px;
  text-align: center;
  line-height: 30px;
  /* border-right: 1px solid #e0e0e0; */
  font-size: 14px;
  float: left;
}
.country {
  width: 300px;
  height: 50px;
  /* background-color: red; */
  line-height: 50px;
  margin-left: 10px;
}
.country1 {
  width: 90px;
  float: left;
}
.country2 {
  width: 90px;
  float: left;
  margin-left: 10px;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.mationinput {
  width: 760px;
  /* height: 700px; */
  /* display: flex; */
  margin-left: 40px;
  /* margin-bottom: 20px; */
}
.worm {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.saveas {
  width: 95%;
  height: 500px;
  // margin-left: 40px;
  margin-bottom: 50px;
  /* background-color: red; */
}
.base {
  width: 20%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  left: 60%;

  background-color: #fff;
  /* margin-bottom: 50px; */
  /* margin-top: 30px; */
  text-align: center;
  line-height: 50px;
}
.onblur {
  width: 100%;
  height: 100%;

  background-color: #fff;
}
/deep/ .hide .el-upload--picture-card {
  display: none;
}
.cannot {
  color: #000;
}
</style>
