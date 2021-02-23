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
    <el-row style="margin-bottom: 40px;">
      <el-col :span="24"
        ><div>
          <div id="weekRules" style="width: 100%;height: 500px;"></div></div
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
      numbers: [], //数量
      notowned: []
    };
  },
  mounted() {
    // this.fullLength();
  },
  beforeMount() {
    this.getToolkit();
    this.searchBtn();
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
          let Front = [];
          this.allergy.forEach((item, index) => {
            Front[index] = {
              name: item.foodName,
              value: item.num
            };
          });
          console.log(Front);
          this.notowned = Front;
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
          data: this.ingredients,
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {},
        series: [
          {
            name: "食材",
            type: "bar",
            data: this.numbers,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            itemStyle: {
              normal: {
                color: "#69A8E8", //设置柱子颜色
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                  textStyle: {
                    color: "#000" //值得颜色
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
    //过敏食材分布图
    initialWeek() {
      let myChart = this.$echarts.init(document.getElementById("weekRules"));
      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "过敏食材分布图",
          x: "left" //标题位置
          // textStyle: { //标题内容的样式
          //   color: '#000',
          //   fontStyle: 'normal',
          //   fontWeight: 100,
          //   fontSize: 16 //主题文字字体大小，默认为18px
          // },
        },
        // stillShowZeroSum: true,
        //鼠标划过时饼状图上显示的数据
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        //图例
        legend: {
          //图例  标注各种颜色代表的模块
          // orient: 'vertical',//图例的显示方式  默认横向显示
          bottom: 10, //控制图例出现的距离  默认左上角
          left: "center", //控制图例的位置
          // itemWidth: 16,//图例颜色块的宽度和高度
          // itemHeight: 12,
          textStyle: {
            //图例中文字的样式
            color: "#000",
            fontSize: 16
          },
          data: this.ingredients //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: ["#69A8E8", "#82B986", "#F4D67C", "#F07F77"],
        // 饼图数据
        series: {
          name: "学校类型分布图",
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: this.notowned,
          //每个模块的名字和值

          itemStyle: {
            normal: {
              label: {
                show: true //饼图上是否出现标注文字 标注各模块代表什么  默认是true
                // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
              },
              labelLine: {
                show: true //官网demo里外部标注上的小细线的显示隐藏    默认显示
              }
            }
          }
        }
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
