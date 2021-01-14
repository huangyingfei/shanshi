<template>
  <div class="sample">
    <el-row>
      <el-col :span="24"
        ><div class="allergy">
          <span style="margin-right: 10px;margin-left: 15px;">选择班级:</span>
          <el-cascader
            style="width: 250px"
            clearable
            v-model="classInfo"
            :options="loadClass"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
          <el-button
            style="margin-left: 20px"
            icon="el-icon-search"
            size="medium"
            type="primary"
            @click="searchBtn"
            >查询</el-button
          >
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div>
          <div id="byteLength" style="width: 90%;height: 70vh;"></div></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div>
          <div id="weekRules" style="width: 100%;height: 600px;"></div></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classInfo: [],
      loadClass: [], //所在年级
      value: "",
      builtinclass: "",
      ingredients: [], //食材
      numbers: [] //数量
    };
  },
  mounted() {
    // this.fullLength();
  },
  beforeMount() {
    this.getToolkit();
  },
  methods: {
    searchBtn() {
      console.log(this.classInfo);
      if (this.classInfo.length != 0) {
        this.builtinclass = this.classInfo[2];
        console.log(this.builtinclass);
      } else {
        this.builtinclass = "";
      }
      this.$axios
        .get(
          `api/blade-food/report/orgAllergyCount?classId=${this.builtinclass}`,
          {}
        )
        .then(res => {
          // console.log(res);
          this.allergy = res.data.data.allergyFoodDTOS;
          let graph = []; //食材
          let yoffset = []; //数量
          this.allergy.forEach((item, index) => {
            graph.push(item.foodName);
            yoffset.push(item.num);
          });
          this.ingredients = graph;
          this.numbers = yoffset;
          console.log(this.ingredients);
          console.log(this.numbers);
          this.fullLength();
          this.initialWeek();
        });
    },
    //柱状图
    fullLength() {
      this.chartLine = this.$echarts.init(
        document.getElementById("byteLength")
      );
      var option = {
        title: {
          text: "过敏食材排行榜"
        },
        tooltip: {},
        legend: {
          data: ["食材"]
        },
        barWidth: 50, //柱图 -- 条宽度
        backgroundColor: "#fff", //图得背景色
        xAxis: {
          data: this.ingredients
        },
        yAxis: {},
        series: [
          {
            name: "食材",
            type: "bar",
            data: this.numbers,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            itemStyle: {
              normal: {
                color: "#69A8E8", //设置柱子颜色
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                  textStyle: {
                    color: "#FD6B71" //值得颜色
                  }
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    },
    initialWeek() {
      let myChart = this.$echarts.init(document.getElementById("weekRules"));
      var option = {
        title: {
          text: "食材",

          target: "blank",
          textAlign: "left"
        },
        tooltip: {}, //提示层
        legend: {
          data: ["食材"]
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
              name: "土豆"
            },
            {
              name: "猕猴桃"
            },
            {
              name: "芒果"
            },
            {
              name: "花蛤"
            }
          ]
        },
        series: [
          {
            name: "食材",
            type: "radar",
            data: [
              {
                value: [70, 80, 90, 85, 75],
                name: "食材"
              }
            ],
            lineStyle: {
              color: "rgba(64, 155, 220, 1)"
            },
            areaStyle: {
              color: "rgba(64, 155, 220, 1)"
            },
            itemStyle: {
              color: "rgba(64, 155, 220, 1)"
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    //获取班级
    getToolkit() {
      this.$axios.get(`api/blade-food/class/tree`, {}).then(res => {
        this.bufs = res.data.data;
        // console.log(this.bufs);
        let fwork = [];
        this.bufs.forEach(item => {
          //   console.log(item);
          item.children.forEach((item1, index1) => {
            fwork[index1] = {
              value: item1.id,
              label: item1.label
            };
            fwork[index1].children = [];
            item1.children.forEach((item2, index2) => {
              fwork[index1].children[index2] = {
                value: item2.id,
                label: item2.label
              };
              fwork[index1].children[index2].children = [];
              if (item2.children) {
                item2.children.forEach((item3, index3) => {
                  // console.log(item3),
                  fwork[index1].children[index2].children[index3] = {
                    value: item3.id,
                    label: item3.label
                  };
                });
              }
            });
          });
        });
        this.loadClass = fwork;
        console.log(this.loadClass);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.sample {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.allergy {
  margin-top: 20px;
  font-size: 14px;
}
</style>
