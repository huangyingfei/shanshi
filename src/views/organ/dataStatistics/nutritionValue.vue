<template>
  <div class="web">
    <el-row>
      <el-col :span="8">
        <week @weekChange="weekChange"></week>
      </el-col>
      <el-col :span="10">
        <span style="margin-right: 10px;margin-left: 15px;">食谱报表:</span>
        <el-select
          v-model="recipeId"
          placeholder="请选择"
          @change="extractvalue"
          style="width: 300px"
        >
          <el-option
            v-for="item in recipeOptions"
            :key="item.id"
            :label="item.recipeName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="students">
          <div id="main" :style="{ width: '100%', height: '500px' }"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="students1">
          <div
            id="schoolis"
            :style="{ width: '100%', height: '500px' }"
          ></div></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import week from "../../../components/week.vue";
export default {
  components: { week },
  data() {
    return {
      WeekInfo: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      strtotime: [],
      recipeOptions: [],
      recipeId: "",
      nutrients: [], //每日营养素
      binge: []
    };
  },
  mounted() {},
  methods: {
    //学生每人每日营养素提取
    extractvalue() {
      let urlParams = `?recipeId=${this.recipeId}`;
      this.$axios
        .get(
          `/api/blade-food/recipe/getChildNutritionByRecipeId` + urlParams,
          {}
        )
        .then(res => {
          //   console.log(res);
          this.nutrients = res.data.data;
          this.getPie();
        });
    },

    //学生每人每日进食量分布
    creating() {
      let urlParams = `?recipeId=${this.recipeId}`;
      this.$axios
        .get(
          `/api/blade-food/recipe/getChildRecipeCalByRecipeId` + urlParams,
          {}
        )
        .then(res => {
          // console.log(res);
          this.binge = res.data.data;
          this.gradschools();
        });
    },
    getNutritionDataList() {},
    weekChange(WeekInfo) {
      this.WeekInfo = WeekInfo;
      this.axios({
        method: "get",
        url: "/api/blade-food/recipe/recipelist",
        params: { startTime: WeekInfo.startTime, endTime: WeekInfo.endTime }
      })
        .then(res => {
          this.recipeOptions = res.data.data;
          if (res.data.data) {
            this.recipeId = res.data.data[0].id;
            // this.getNutritionDataList();
          } else {
            this.recipeId = "";
          }
          this.extractvalue();
          this.creating();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPie() {
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        title: {
          text: "儿童每人每日营养素提取（DRls)",

          textAlign: "left"
        },
        tooltip: {}, //提示层
        legend: {
          data: ["实际比列", "要求比例"],
          bottom: 0
        },
        radar: {
          name: {
            textStyle: {
              color: "#000", //字体颜色
              // backgroundColor: "#999", //背景色
              borderRadius: 3, //圆角
              padding: [3, 5] //padding
            }
          },
          center: ["50%", "50%"],
          radius: "60%",
          startAngle: 270,
          indicator: [
            {
              name: "能量"
            },
            {
              name: "蛋白质"
            },
            {
              name: "脂肪"
            },
            {
              name: "碳水化合物"
            },
            {
              name: "钙"
            },
            {
              name: "钠"
            },
            {
              name: "铁"
            },
            {
              name: "锌"
            },
            {
              name: "维生素A"
            },
            {
              name: "维生素B1"
            },
            {
              name: "维生素B2"
            },
            {
              name: "维生素C"
            }
          ]
        },
        series: [
          {
            name: "儿童每人每日营养素提取（DRls）",
            type: "radar",
            data: [
              {
                value: this.nutrients,
                name: "实际比列",
                areaStyle: {
                  opacity: 0.4
                }
              },
              {
                value: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
                name: "要求比例",
                areaStyle: {
                  opacity: 0.4
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      // console.log(this.double);
    },
    gradschools() {
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("schoolis"));
      var option = {
        title: {
          text: "儿童每人每日进食量",

          textAlign: "left"
        },
        tooltip: {}, //提示层
        legend: {
          data: ["实际用量", "推荐最小量", "推荐最大量"],
          left: "center",
          bottom: 0
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff", //字体颜色
              backgroundColor: "#999", //背景色
              borderRadius: 3, //圆角
              padding: [3, 5] //padding
            }
          },
          center: ["50%", "50%"],
          radius: "60%",
          startAngle: 270,
          indicator: [
            {
              name: "谷类(g)"
            },
            {
              name: "蔬菜(g)"
            },
            {
              name: " 水果(g)"
            },
            {
              name: "乳制品(g)"
            },
            {
              name: " 大豆(g)"
            },
            {
              name: " 食盐(g)"
            },
            {
              name: "食用油(g)"
            },
            {
              name: " 畜禽肉类-蛋类-水产品(g)"
            }
          ]
        },
        series: [
          {
            name: "儿童每人每日进食量",
            type: "radar",
            data: [
              {
                value: this.binge,
                name: "实际用量",
                areaStyle: {
                  opacity: 0.4
                }
              },
              {
                value: [100, 100, 100, 100, 100, 100, 100, 100],
                name: "推荐最小量",
                areaStyle: {
                  opacity: 0.4
                }
              },
              {
                value: [300, 300, 300, 300, 300, 300, 300, 300],
                name: "推荐最大量",
                areaStyle: {
                  opacity: 0.4
                }
              }
              //               {
              //                 value: [80, 80, 80, 80, 80, 80, 80, 80],
              //                 name: "推荐最大量",  areaStyle: {
              //                   opacity: 0.4
              //                 },
              //
              //               }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.web {
  width: 100%;
  height: 669px;
  background-color: #fff;
  overflow: auto;
  margin-bottom: 50px;
}
.search_all {
  width: 100%;
  font-size: 14px;
  float: left;
}
.students {
  width: 100%;
  height: 500px;
}
.students1 {
  width: 100%;
  height: 500px;
  margin-bottom: 100px;
}
</style>
