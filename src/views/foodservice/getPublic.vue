<template>
  <div class="typeList">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人菜品库" name="first">
        <personl></personl>
      </el-tab-pane>
      <!-- 公共菜品库 -->
      <el-tab-pane label="公共菜品库" name="second">
        <favDishes></favDishes>
      </el-tab-pane>
      <!-- 结束 -->
    </el-tabs>
    <!-- 树形结构 -->
  </div>
</template>

<script>
import personl from "./personal";
import favDishes from "./foodbank";
export default {
  components: {
    personl,
    favDishes
  },
  data() {
    return {
      activeName: "first",
      angelfood: "fourth"
    };
  },
  beforeMount() {},
  watch: {
    // (scope.row.stats / 100) * scope.row.malloc
    filterText(val) {
      // console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    //点击查看详情
    // prepare(data, index) {
    //   console.log(data);
    //   console.log(index);
    //   this.editable = index;
    //   this.auto = data.id;
    //   this.$axios
    //     .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
    //     .then(res => {
    //       // console.log(res);
    //       this.valuepark.length = 0;
    //       this.value1.length = 0;
    //       this.handler = res.data.data;
    //       console.log(this.handler);
    //       if (this.lower == 0) {
    //         this.ruleForm.name = this.handler.dishName; //菜品名字
    //         this.ruleForm.fooddata = this.handler.dishType; //菜品分类
    //         // this.value1.push(this.handler.season); //季节
    //         this.handler.season.split(",").forEach(item => {
    //           this.value1.push(item);
    //         });
    //         this.ruleForm.region = this.handler.function; //特点
    //         this.ruleForm.desc = this.handler.remark; //做法
    //         if (this.handler.provinces) {
    //           let bar = [];
    //           this.handler.provinces.split(",").forEach((item, i) => {
    //             // console.log(item);
    //             bar.push([item, this.handler.belongRegion.split(",")[i]]);
    //           });
    //           this.valuepark = bar;
    //         }
    //         // console.log(this.valuepark);
    //         let picture = [];
    //         if (this.handler.pic) {
    //           picture[0] = {
    //             url: this.handler.pic
    //           };
    //         }
    //         this.productImgs = picture;
    //         this.ruleForm.delivery1 = this.handler.isUse == 1 ? false : true; //常用
    //         this.ruleForm.delivery = this.handler.isPub == 1 ? false : true; //公开
    //         // this.toBack = this.handler.dishMxVos;
    //         // console.log(this.toBack);
    //         if (this.handler.dishMxVos) {
    //           let arr = [];
    //           this.handler.dishMxVos.forEach((item, index) => {
    //             // console.log(item);
    //             // this.officeonce[this.csListIndex].id = item.id;
    //             arr[index] = {
    //               id: item.foodId,
    //               frame: item.baseTypeId,
    //               name: item.name,
    //               address: item.baseTypeName,
    //               stats: item.value,
    //               spring: item.nutritionNlValue,
    //               malloc: item.nutritionNlValue
    //             };
    //           });
    //           this.officeonce = arr;
    //           this.graph();
    //           // this.addLine();
    //         }
    //         // console.log(this.officeonce);
    //       } else {
    //         this.valuepark1.length = 0;
    //         this.value2.length = 0;
    //         this.ruleForm1.name = this.handler.dishName; //菜品名字
    //         this.ruleForm1.fooddata = this.handler.dishType; //菜品分类
    //         // this.value2.push(this.handler.season); //季节
    //         this.handler.season.split(",").forEach(item => {
    //           this.value2.push(item);
    //         });
    //         this.ruleForm1.region = this.handler.function; //特点
    //         this.ruleForm1.desc = this.handler.remark; //做法
    //         if (this.handler.provinces) {
    //           let bar = [];
    //           this.handler.provinces.split(",").forEach((item, i) => {
    //             //所属区域
    //             console.log(item);
    //             bar.push([item, this.handler.belongRegion.split(",")[i]]);
    //           });
    //           this.valuepark1 = bar;
    //         }
    //         this.rectangle = this.handler.pic;
    //         this.ruleForm1.delivery1 = this.handler.isUse == 0 ? true : false; //常用
    //         // this.ruleForm1.delivery = this.handler.isPub == 0 ? false : true; //公开
    //         // this.toBack = this.handler.dishMxVos;
    //         // console.log(this.toBack);
    //         if (this.handler.dishMxVos) {
    //           let arr = [];
    //           this.handler.dishMxVos.forEach((item, index) => {
    //             // console.log(item);
    //             // this.officeonce[this.csListIndex].id = item.id;
    //             arr[index] = {
    //               id: item.foodId,
    //               frame: item.baseTypeId,
    //               name: item.name,
    //               address: item.baseTypeName,
    //               stats: item.value,
    //               spring: item.nutritionNlValue,
    //               malloc: item.nutritionNlValue
    //               // malloc: item.nutritionNlValue
    //             };
    //           });
    //           this.officeonce = arr;
    //           this.graph();
    //           // this.addLine();
    //           // console.log(this.officeonce);
    //         }
    //       }
    //     });
    // },
  }
};
</script>

<style lang="scss" scoped>
.typeList {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-bottom: 30px;
}
</style>
