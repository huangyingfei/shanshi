<template>
  <div class="wel">
    <!-- 总量 -->
    <div class="research">
      <div class="chooser" v-if="storage == 2">
        <span style="margin-right: 10px; margin-left: 15px; font-size: 14px"
          >机构选择:</span
        >
        <el-select @change="searchBtn" v-model="activity" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- <el-button
          style="margin-left: 20px"
          icon="el-icon-search"
          size="medium"
          type="primary"
          @click="searchBtn"
          >查询</el-button
        > -->
      </div>
    </div>

    <div class="total">
      <!-- <div class="mechanism">
        <img src="../../../public/img/yuansuo.png" alt />
        <div class="nism1">
          <div class="ingredients">园所</div>

          <div class="food1">{{ this.newhead.ysrs }}</div>
        </div>
      </div> -->
      <div class="mechanism">
        <img src="../../../public/img/schoolboy.png" alt />
        <div class="nism1">
          <div class="ingredients">男生</div>
          <div class="food1">{{ this.newhead.boys }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/girlstudent.png" alt />
        <div class="nism1">
          <div class="ingredients">女生</div>
          <div class="food1">{{ this.newhead.girls }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/sctotal.png" alt />
        <div class="nism1">
          <div class="ingredients">食材</div>
          <div class="food1">{{ this.newhead.food }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/cptotal.png" alt />
        <div class="nism1">
          <div class="ingredients">菜品</div>
          <div class="food1">{{ this.newhead.dish }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/sptotal.png" alt />
        <div class="nism1">
          <div class="ingredients">食谱</div>
          <div class="food1">{{ this.newhead.recipe }}</div>
        </div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="dishes">
      <!-- 菜谱排行榜 -->
      <!--  -->
      <div class="variety" v-if="this.empty == 1" style="width: 55%">
        <h4 class="welcome">本周最受欢迎菜品</h4>
        <div class="pictures">
          <p>暂无数据</p>
        </div>
      </div>
      <div v-else style="width: 55%">
        <h4 class="welcome">本周最受欢迎菜品</h4>
        <!-- <div class="menu1" v-for="(item, i) in double" :key="i">
          <div class="menuimg">
            <el-image style="width: 80px; height: 80px" :src="item.dishPic">
              <div
                slot="error"
                class="image-slot"
                style="width: 80px; height: 80px; text-align: center;  line-height: 80px;"
              >
                <div class="el-image__error">
                  暂无图片
                </div>
              </div>
            </el-image>
          </div>
          <div class="menutext">{{ item.dishName }}</div>
          <div class="menunum">{{ item.dishCount }}</div>
        </div> -->
        <div style="width: 50%; display: inline-block">
          <div style="display: flex; align-items: center; font-weight: bold">
            <div class="ranking"></div>
            <div class="menuimg1">图片</div>
            <div class="menutext">菜品名称</div>
            <div class="menunum">使用次数</div>
          </div>
        </div>
        <div style="width: 50%; display: inline-block">
          <div style="display: flex; align-items: center; font-weight: bold">
            <div class="ranking"></div>
            <div class="menuimg1">图片</div>
            <div class="menutext">菜品名称</div>
            <div class="menunum">使用次数</div>
          </div>
        </div>
        <div class="variety">
          <div
            v-for="(item, i) in double"
            :key="i"
            style="width: 50%; display: inline-block; margin-top: 20px"
          >
            <div style="display: flex; align-items: center">
              <div :style="getColor(i)" class="ranking">{{ i + 1 }}</div>
              <div class="menuimg">
                <el-image style="width: 80px; height: 80px" :src="item.dishPic">
                  <div
                    slot="error"
                    class="image-slot"
                    style="
                      width: 80px;
                      height: 80px;
                      text-align: center;
                      line-height: 80px;
                    "
                  >
                    <div class="el-image__error">暂无图片</div>
                  </div>
                </el-image>
              </div>
              <div class="menutext">{{ item.dishName }}</div>
              <div class="menunum">{{ item.dishCount }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 健康指数排行榜 -->
      <div style="width: 45%">
        <div v-if="this.preRanking == 2">
          <h4 class="welcome1">本周食谱健康指数排行榜</h4>
          <div class="school1" style="font-weight: bold">
            <div class="ranking"></div>
            <div class="schoolimg"></div>
            <div class="schooltxt">园所名称</div>
            <div class="schoolnum">食谱得分</div>
          </div>
          <div class="recipes">
            <div class="school1" v-for="(item1, i) in getHealth" :key="i" lazy>
              <div class="ranking" :style="getColor(i)">{{ item1.list }}</div>
              <div class="schoolimg">
                <el-image
                  style="width: 80px; height: 80px"
                  :src="item1.logoUrl"
                >
                  <div
                    slot="error"
                    class="image-slot"
                    style="
                      width: 80px;
                      height: 80px;
                      text-align: center;
                      line-height: 80px;
                    "
                  >
                    <!-- <i class="el-icon-picture-outline"></i> -->
                    <div class="el-image__error">暂无图片</div>
                  </div>
                </el-image>
              </div>
              <div class="schooltxt">{{ item1.tenantName }}</div>
              <div class="schoolnum">{{ item1.score }}</div>
            </div>
          </div>
        </div>
        <!-- !echarts图标! -->
        <div class="daychart" v-if="this.preRanking == 1">
          <div class="foodinta">
            <div id="leiDaTu" :style="{ width: '100%', height: '400px' }"></div>
          </div>
          <div class="nutrient">
            <div
              id="mynutrient"
              :style="{ width: '100%', height: '400px' }"
            ></div>
          </div>
        </div>
      </div>
      <!-- !!! -->
    </div>

    <!--没有子机构显示当前机构数量统计---雷达图
        有子机构  有机构选择包括全部 当前机构  子机构  不显示雷达图
     -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "wel",
  data() {
    return {
      newhead: {
        ysrs: "", //园所人数
        boys: "", //男生人数
        girls: "", //女生人数
        food: "", //食材总量
        dish: "", //菜品总量
        recipe: "", //食谱总量
      },
      listset: [],
      options: [],
      activity: "",
      double: [],
      getHealth: [],
      today: [], //
      greater: [],
      preRanking: "", //显示隐藏
      storage: "", //下拉框显示隐藏
      activeNames: ["1", "2", "3", "5"],
      logActiveNames: ["17"],
      empty: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },

  beforeMount() {
    this.fromSearch();
  },
  created() {},
  mounted() {
    // this.drawLine();
    // this.extract();
    // this.drawPie();
  },
  methods: {
    getColor(i) {
      var colorArray = ["#f70f0f", "#f37a34", "#f5aa3c", "#C0C4CC"];
      if (i < 3) {
        return `background: ${colorArray[i]}`;
      } else {
        return `background: ${colorArray[3]}`;
      }
    },
    searchBtn() {
      console.log(this.activity);
      // console.log(this.options[0].value);
      // this.fromSearch();

      if (this.activity.indexOf(",") != -1) {
        // console.log("有逗号");
        this.preRanking = 2;
        this.siteheader(); //头部
        this.welcomeUser(); //最受欢迎菜品
        this.HealthBar(); //排行榜
      } else {
        // console.log("没有逗号");
        this.preRanking = 1;
        this.siteheader(); //头部
        this.welcomeUser(); //最受欢迎菜品
        this.HealthBar(); //排行榜
        this.fattyfood(); //每日进食量
        this.allchildren(); //每日营养素提取
      }
    },
    extract() {
      let charts = this.$echarts.init(document.getElementById("mynutrient"));
      var option = {
        title: {
          text: "每人每日营养素提取（DRls）",

          textAlign: "left",
        },
        tooltip: {}, //提示层
        legend: {
          data: ["实际比列", "最小要求比例", "最大要求比例"],
          bottom: 0,
        },
        radar: {
          name: {
            textStyle: {
              color: "#000", //字体颜色
              // backgroundColor: "#999", //背景色
              borderRadius: 3, //圆角
              padding: [3, 5], //padding
            },
          },
          center: ["50%", "50%"],
          radius: "60%",
          startAngle: 270,
          indicator: [
            {
              name: "能量",
            },
            {
              name: "蛋白质",
            },
            {
              name: "钙",
            },
            {
              name: "钠",
            },
            {
              name: "铁",
            },
            {
              name: "锌",
            },
            {
              name: "维生素A",
            },
            {
              name: "维生素B1",
            },
            {
              name: "维生素B2",
            },
            {
              name: "维生素C",
            },
          ],
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: this.greater,
                name: "实际比列",
                areaStyle: {
                  opacity: 0.4,
                },
              },
            ],
            z: 3,
          },
          {
            type: "radar",
            data: [
              {
                value: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
                name: "最小要求比例",
                areaStyle: {
                  opacity: 0.4,
                },
              },
            ],
            z: 2,
          },
          {
            name: "儿童每人每日营养素提取（DRls）",
            type: "radar",
            data: [
              {
                value: [120, 150, 160, 135, 160, 160, 180, 250, 250, 250],
                name: "最大要求比例",
                areaStyle: {
                  opacity: 0.4,
                },
              },
            ],
            z: 1,
          },
        ],
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
      };
      charts.setOption(option);
    },
    drawPie() {
      let charts = this.$echarts.init(document.getElementById("leiDaTu"));
      var option = {
        title: {
          text: "每人每日进食量",

          textAlign: "left",
        },
        tooltip: {}, //提示层
        legend: {
          data: ["实际用量", "推荐最小量", "推荐最大量"],
          left: "center",
          bottom: 0,
        },
        radar: {
          name: {
            textStyle: {
              color: "#000", //字体颜色
              // backgroundColor: "#999", //背景色
              borderRadius: 3, //圆角
              padding: [3, 5], //padding
            },
          },
          center: ["50%", "50%"],
          radius: "60%",
          startAngle: 270,
          indicator: [
            {
              name: "谷类(100-150)",

              // max: 300
            },
            {
              name: "蔬菜(150-300)",
            },
            {
              name: "水果(150-250)",
            },
            {
              name: "乳制品(350-500)",
              // max: 300
            },
            {
              name: "大豆(10-20)",
              // max: 300
            },
            {
              name: "盐(<=3)",
              // max: 300
            },
            {
              name: "食用油(20-50)",
              // max: 350
            },
            {
              name: "畜禽肉类-蛋类-水产品(100-125)",
            },
          ],
        },
        series: [
          {
            name: "儿童每日进食量",
            type: "radar",
            data: [
              {
                value: this.today,
                name: "实际用量",
                areaStyle: {
                  opacity: 0.4,
                },
                z: 3,
              },
              {
                value: [100, 100, 100, 100, 100, 100, 100, 100],
                name: "推荐最小量",
                areaStyle: {
                  opacity: 0.4,
                },
                z: 2,
              },
              {
                value: [300, 300, 300, 300, 300, 300, 300, 300],
                name: "推荐最大量",
                areaStyle: {
                  opacity: 0.4,
                },
                z: 1,
              },
            ],
          },
        ],
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
      };
      charts.setOption(option);
      // console.log(this.double);
    },
    fromSearch() {
      this.$axios
        .get(`api/blade-system/tenant/getChildTenant`, {})
        .then((res) => {
          // console.log(res);
          this.rsearch = res.data.data;
          // console.log(this.rsearch);
          let second = [];
          this.rsearch.forEach((item) => {
            second.push({
              value: item.tenantIds,
              label: item.tenantName,
            });
          });
          this.options = second;
          this.activity = this.options[0].value;
          console.log(this.options.length);
          if (this.options.length > 2) {
            this.preRanking = 2;
            this.storage = 2;
            // console.log(this.preRanking);
          } else {
            this.preRanking = 1;
            this.storage = 1;
            this.fattyfood(); //每日进食量
            this.allchildren(); //每日营养素提取
          }

          this.siteheader(); //头部
          this.welcomeUser(); //最受欢迎菜品
          this.HealthBar(); //排行榜
        });
    },
    //头部
    siteheader() {
      let urlParams = `?tenantId=${this.activity}`;
      this.$axios
        .get(`api/blade-food/food/getTotalByTenant` + urlParams)
        .then((res) => {
          // console.log(res);
          this.newhead = res.data.data;
          // console.log(this.newhead);
        });
    },
    //本周最受欢迎菜品
    welcomeUser() {
      // &tenantId=${this.activity}
      let Dishes = `?size=${500}&current=${1}`;
      this.$axios.get(`api/blade-food/food/dishTotal` + Dishes).then((res) => {
        // console.log(res);
        this.double = res.data.data.records;
        // console.log(this.double);

        if (this.double.length == 0) {
          this.empty = 1;
        } else {
          this.empty = 2;
        }
      });
    },
    //本周食谱健康指数排行榜
    HealthBar() {
      let rankings = `?size=${500}&current=${1}&?tenantId=${this.activity}`;
      this.$axios
        .get(`api/blade-food/food/recipeTotal` + rankings)
        .then((res) => {
          // console.log(res);
          this.getHealth = res.data.data.records;
          // console.log(this.getHealth);
          //     for (var i = 1; i <= this.getHealth.length; i++) {
          //       this.listset = i;
          //
          //     }
          let sorting = [];
          this.getHealth.forEach((item, index) => {
            // console.log(item);
            item.list = index + 1;
          });
          // console.log(this.getHealth);
          // console.log(this.getHealth);
        });
    },
    //儿童每日进食量报表
    fattyfood() {
      let sorted = `?tenantId=${this.activity}`;
      this.$axios
        .get(`api/blade-food/recipe/getChildRecipeCal` + sorted, {})
        .then((res) => {
          // console.log(res);
          this.today = res.data.data;
          this.drawPie();
          // console.log(this.today);
        });
    },
    allchildren() {
      let sorted = `?tenantId=${this.activity}`;
      this.$axios
        .get(`api/blade-food/recipe/getChildNutritionCal` + sorted, {})
        .then((res) => {
          var greater = res.data.data;
          if (greater instanceof Array) {
            greater.splice(2, 2);
            this.greater = greater;
          }
          // console.log(this.greater);
          this.extract();
        });
    },
    handleChange(val) {
      window.console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.wel {
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
  // margin-bottom: 50px;
}
.el-font-size {
  font-size: 14px;
}

.total {
  width: 100%;
  height: 60px;
  background-color: #fff;
  // background-color: red;
  // margin-top: 30px;
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
  height: calc(100vh - 255px);
  /* background-color: yellow; */
  background-color: #fff;
  display: flex;
  margin-top: 5px;
  // margin-bottom: 40px;
  overflow-y: hidden;
}

.pictures {
  width: 200px;
  height: 200px;
  // background-color: red;
  margin: auto;
  margin-top: 150px;
  img {
    width: 200px;
    height: 200px;
  }
  p {
    font-size: 20px;
    font-weight: bold;
    color: #c0c4cc;
  }
}
.variety {
  height: calc(100vh - 350px);
  // margin-bottom: 40px;
  overflow-y: auto;
  overflow-x: hidden;
}
.recipes {
  height: calc(100vh - 350px);
  overflow-y: auto;
  overflow-x: hidden;
  // background-color: #fff;
  // margin-bottom: 40px;
}
.welcome {
  margin-left: 20px;
  // margin-top: 40px;
}
.welcome1 {
  margin-top: 21px;
  margin-left: 20px;
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
.menuimg1 {
  width: 80px;
  background-color: #fff;
  margin-left: 20px;
}
.menuimg img {
  width: 80px;
  height: 80px;
}
.menutext {
  float: left;
  width: 120px;
  margin-left: 20px;
  font-size: 14px;
}
.menunum {
  font-size: 14px;
}
.school {
  width: 100%;
  height: 60px;
}
.school1 {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.ranking {
  width: 25px;
  height: 25px;
  margin-left: 20px;
  text-align: center;
  color: #fff;
}
.ranking1 {
  width: 30px;
  height: 30px;
  background: #f70f0f;
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
  width: 180px;
  margin-left: 20px;
  float: left;
  font-size: 14px;
}
.schoolnum {
  width: 100px;
  text-align: center;
  font-size: 14px;
}
.daychart {
  width: 100%;

  // height: 600px;
  height: calc(100vh - 275px);
  overflow-y: auto;
  background-color: #fff;
  margin-top: 10px;
}
.foodinta {
  width: 100%;
  text-align: center;
  // height: 100%;
  // float: left;
}
.nutrient {
  width: 100%;
  // height: 100%;
  // float: left;
}
.chooser {
  width: 400px;
  height: 50px;
  float: right;
}
.research {
  width: 100%;
  height: 70px;
  line-height: 60px;
  background-color: #fff;
}
// .listed {
//   width: 50px;
//   height: 100%;
//   background-color: red;
//   float: left;
// }
</style>
