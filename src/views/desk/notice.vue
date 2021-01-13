<template>
  <div class="wel">
    <!-- 总量 -->
    <div class="total">
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">机构总量</div>
          <div class="food1">{{ this.newhead.organ }}</div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">政府总量</div>
          <div class="food1">{{ this.newhead.gover }}</div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">食材总量</div>
          <div class="food1">{{ this.newhead.food }}</div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">菜品总量</div>
          <div class="food1">{{ this.newhead.dish }}</div>
        </div>
      </div>
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">食谱总量</div>
          <div class="food1">{{ this.newhead.recipe }}</div>
        </div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="dishes">
      <!-- 菜谱排行榜 -->
      <div class="variety">
        <h4 class="welcome">本周最受欢迎菜品</h4>
        <div class="menu1" v-for="(item, i) in double" :key="i">
          <div class="menuimg">
            <!-- <img :src="item.dishPic" alt /> -->
            <el-image
              style="width: 80px; height: 80px"
              :src="item.dishPic"
            ></el-image>
          </div>
          <div class="menutext">{{ item.dishName }}</div>
          <div class="menunum">{{ item.dishCount }}</div>
        </div>
      </div>
      <!-- 健康指数排行榜 -->
      <div class="recipes">
        <!-- <div class="chooser">
          <el-select clearable v-model="activity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div> -->
        <h4 class="welcome1">本周食谱健康指数排行榜</h4>
        <div class="school1" v-for="(item1, i) in getHealth" :key="i">
          <!-- <div class="ranking">1</div> -->
          <div class="schoolimg">
            <!-- <img :src="item1.dishPic" alt /> -->
            <el-image
              style="width: 80px; height: 80px"
              :src="item1.dishPic"
            ></el-image>
          </div>
          <div class="schooltxt">{{ item1.tenantName }}</div>
          <div class="schoolnum">{{ item1.score }}</div>
        </div>
      </div>
      <!-- !!! -->
    </div>
    <!-- !echarts图标! -->
    <!-- <div class="daychart">
      <div class="foodinta">
        <div id="leiDaTu" :style="{ width: '500px', height: '500px' }"></div>
      </div>
      <div class="nutrient">
        <div id="mynutrient" :style="{ width: '500px', height: '500px' }"></div>
      </div>
    </div> -->
    <!-- -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "wel",
  data() {
    return {
      newhead: {
        organ: "", //机构
        gover: "", //政府
        food: "", //食材
        dish: "", //菜品
        recipe: "" //食谱
      },
      options: [],
      activity: "",
      double: [],
      getHealth: [],
      today: [], //
      greater: [],
      activeNames: ["1", "2", "3", "5"],
      logActiveNames: ["17"]
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },

  beforeMount() {
    this.siteheader(); //头部
    this.welcomeUser();
    this.HealthBar();
    this.fattyfood();
    this.allchildren();
    this.fromSearch();
  },
  mounted() {
    // this.drawLine();
    // this.extract();
    // this.drawPie();
    // setTimeout(() => {
    //   this.drawPie();
    //   this.extract();
    // }, 1000);
  },
  methods: {
    //     extract() {
    //       let charts = this.$echarts.init(document.getElementById("mynutrient"));
    //       var option = {
    //         title: {
    //           text: "儿童每人每日营养素提取（DRls）",
    //
    //           textAlign: "left"
    //         },
    //         tooltip: {}, //提示层
    //         legend: {
    //           data: ["name1"]
    //         },
    //         radar: {
    //           name: {
    //             textStyle: {
    //               color: "#fff", //字体颜色
    //               backgroundColor: "#999", //背景色
    //               borderRadius: 3, //圆角
    //               padding: [3, 5] //padding
    //             }
    //           },
    //           center: ["50%", "50%"],
    //           radius: "60%",
    //           startAngle: 270,
    //           indicator: [
    //             {
    //               name: "能量",
    //               max: 300
    //             },
    //             {
    //               name: "钠",
    //               max: 300
    //             },
    //             {
    //               name: "铁",
    //               max: 350
    //             },
    //             {
    //               name: "锌",
    //               max: 300
    //             },
    //             {
    //               name: "钙",
    //               max: 300
    //             },
    //             {
    //               name: "维生素C",
    //               max: 300
    //             },
    //             {
    //               name: "维生素B2",
    //               max: 300
    //             },
    //             {
    //               name: "维生素B1",
    //               max: 300
    //             },
    //             {
    //               name: "维生素A",
    //               max: 300
    //             },
    //             {
    //               name: "脂肪",
    //               max: 300
    //             },
    //             {
    //               name: "蛋白质",
    //               max: 300
    //             }
    //           ]
    //         },
    //         series: [
    //           {
    //             name: "儿童每日进食量",
    //             type: "radar",
    //             data: [
    //               {
    //                 value: this.greater,
    //                 name: "儿童每日进食量"
    //               }
    //             ]
    //           }
    //         ]
    //       };
    //       charts.setOption(option);
    //     },
    //     drawPie() {
    //       let charts = this.$echarts.init(document.getElementById("leiDaTu"));
    //       var option = {
    //         title: {
    //           text: "儿童每日进食量",
    //
    //           textAlign: "left"
    //         },
    //         tooltip: {}, //提示层
    //         legend: {
    //           data: ["name1"]
    //         },
    //         radar: {
    //           name: {
    //             textStyle: {
    //               color: "#fff", //字体颜色
    //               backgroundColor: "#999", //背景色
    //               borderRadius: 3, //圆角
    //               padding: [3, 5] //padding
    //             }
    //           },
    //           center: ["50%", "50%"],
    //           radius: "60%",
    //           startAngle: 270,
    //           indicator: [
    //             {
    //               name: "谷类",
    //               max: 300
    //             },
    //             {
    //               name: "盐",
    //               max: 300
    //             },
    //             {
    //               name: "食用油",
    //               max: 350
    //             },
    //             {
    //               name: "乳制品",
    //               max: 300
    //             },
    //             {
    //               name: "大豆",
    //               max: 300
    //             },
    //             {
    //               name: "畜禽肉类",
    //               max: 300
    //             },
    //             {
    //               name: "水果",
    //               max: 300
    //             },
    //             {
    //               name: "蔬菜",
    //               max: 300
    //             }
    //           ]
    //         },
    //         series: [
    //           {
    //             name: "儿童每日进食量",
    //             type: "radar",
    //             data: [
    //               {
    //                 value: this.today,
    //                 name: "儿童每日进食量"
    //               }
    //             ]
    //           }
    //         ]
    //       };
    //       charts.setOption(option);
    //       // console.log(this.double);
    //     },
    fromSearch() {
      this.$axios
        .get(`api/blade-system/tenant/getChildTenant`, {})
        .then(res => {
          // console.log(res);
          this.rsearch = res.data.data;
          // console.log(this.rsearch);
          let second = [];
          this.rsearch.forEach(item => {
            second.push({
              value: item.tenantId,
              label: item.tenantName
            });
          });
          this.options = second;
        });
    },
    //头部
    siteheader() {
      this.$axios.get(`api/blade-food/food/getTotal`).then(res => {
        // console.log(res);
        this.newhead = res.data.data;
        // console.log(this.newhead);
      });
    },
    //本周最受欢迎菜品
    welcomeUser() {
      this.$axios.get(`api/blade-food/food/dishTotal`).then(res => {
        // console.log(res);
        this.double = res.data.data;
        // console.log(this.double);
      });
    },
    //本周食谱健康指数排行榜
    HealthBar() {
      this.$axios.get(`api/blade-food/food/recipeTotal`).then(res => {
        // console.log(res);
        this.getHealth = res.data.data;
        // console.log(this.getHealth);
      });
    },
    fattyfood() {
      this.$axios
        .get(`api/blade-food/recipe/getChildRecipeCal`, {})
        .then(res => {
          // console.log(res);
          this.today = res.data.data;
          // console.log(this.today);
        });
    },
    allchildren() {
      this.$axios
        .get(`api/blade-food/recipe/getChildNutritionCal `, {})
        .then(res => {
          this.greater = res.data.data;
          // console.log(this.greater);
        });
    },
    handleChange(val) {
      window.console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.wel {
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
  margin-bottom: 50px;
}
.el-font-size {
  font-size: 14px;
}

.total {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.mechanism {
  width: 120px;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  line-height: 60px;
  /* justify-content: space-between; */
  /* display: flex; */
}
.mechanism img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 5px;
  float: left;
}
.nism1 {
  width: 60px;
  height: 60px;
  float: left;
  /* background-color: yellow; */
  font-size: 14px;
  margin-left: 10px;
}
.ingredients {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.food1 {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.dishes {
  width: 100%;
  height: 700px;
  /* background-color: yellow; */
  display: flex;
  margin-top: 5px;
  margin-bottom: 40px;
}
.variety {
  width: 50%;
  height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
}
.recipes {
  width: 50%;
  height: 700px;
  background-color: #fff;
  margin-bottom: 40px;
}
.welcome {
  margin-left: 20px;
  margin-top: 40px;
}
.welcome1 {
  margin-top: 10px;
}
.menu {
  width: 100%;
  height: 80px;
  /* background-color: red; */
  /* line-height: 80px; */
}
.menu1 {
  width: 100%;
  height: 80px;
  /* background-color: red; */
  margin-top: 25px;
}
.menuimg {
  width: 80px;
  height: 80px;
  background-color: #fff;
  margin-left: 20px;
  float: left;
}
.menuimg img {
  width: 80px;
  height: 80px;
}
.menutext {
  float: left;
  width: 100px;
  height: 80px;
  line-height: 80px;
  margin-left: 20px;
  font-size: 14px;
}
.menunum {
  float: right;
  width: 100px;
  height: 80px;
  line-height: 80px;
  font-size: 14px;
}
.school {
  width: 100%;
  height: 60px;
}
.school1 {
  width: 100%;
  height: 90px;
  margin-top: 20px;
}
.ranking {
  width: 30px;
  height: 30px;
  background: red;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking1 {
  width: 30px;
  height: 30px;
  background: #f18546;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking2 {
  width: 30px;
  height: 30px;
  background: #f5aa3c;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking3 {
  width: 30px;
  height: 30px;
  background: #00aca0;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking4 {
  width: 30px;
  height: 30px;
  background: #00aca0;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.schoolimg {
  width: 80px;
  height: 80px;
  background-color: #fff;
  float: left;
  margin-left: 30px;
  margin-top: 5px;
}
.schoolimg img {
  width: 50px;
  height: 50px;
}
.schooltxt {
  width: 200px;
  height: 80px;
  line-height: 80px;
  margin-left: 20px;
  float: left;
  font-size: 14px;
}
.schoolnum {
  float: right;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
}
.daychart {
  width: 100%;
  height: 600px;
  background-color: #fff;
  margin-top: 10px;
}
.foodinta {
  width: 50%;
  height: 100%;
  float: left;
}
.nutrient {
  width: 50%;
  height: 100%;
  float: left;
}
.chooser {
  width: 400px;
  height: 50px;
  /* background-color: red; */
  margin-left: 20px;
  margin-top: 10px;
}
</style>
