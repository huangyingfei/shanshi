<template>
  <div class="wel">
    <!-- 总量 -->
    <div class="total">
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">机构总量 559</div>
          <div class="food1">今日新增 2</div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">政府总量 559</div>
          <div class="food1">今日新增 2</div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">食材总量 559</div>
          <div class="food1">今日新增 2</div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">菜品总量 559</div>
          <div class="food1">今日新增 2</div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">食谱总量 559</div>
          <div class="food1">今日新增 2</div>
        </div>
      </div>
    </div>
    <!-- ------ -->
    <div class="analysis">
      <div class="Added">机构数量统计趋势分析图</div>
      <div class="strtotime">
        <span style="margin-right: 10px;margin-left: 15px;  font-size: 14px;"
          >选择时间:</span
        >
        <el-date-picker
          v-model="formsearch.getDate"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button
          style="margin-left: 20px"
          icon="el-icon-search"
          size="medium"
          type="primary"
          @click="searchBtn"
          >查询</el-button
        >
      </div>
      <div class="linewidth">
        <div id="chartLineBox" style="width: 90%;height: 70vh;"></div>
      </div>
    </div>
    <!--  -->
    <div class="pieChart">
      <!-- <div class="Added">机构类型分布图</div> -->
      <div class="pieSlices">
        <div class="chart1">
          <div id="main" style="width:100% ;height:300px;"></div>
        </div>
        <div class="chart2">
          <div id="schoolis" style="width:100% ;height:300px;"></div>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- <div class="daccessfile">
      <div class="Added">机构访问统计</div>
      <div class="cursor">
        <span class="exact">机构:</span>

        <el-input
          style="width:180px; margin-left: 20px;"
          v-model="formsearch.name"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin-right: 10px;margin-left: 15px;  font-size: 14px;"
          >时间:</span
        >
        <el-date-picker
          v-model="formsearch.number"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="htaccess">
        <div id="weekRules" style="width: 90%;height: 70vh;"></div>
      </div>
      <div class="htaccess">
        <div id="byteLength" style="width: 90%;height: 70vh;"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      newhead: {
        organ: "", //机构
        gover: "", //政府
        food: "", //食材
        dish: "", //菜品
        recipe: "" //食谱
      },
      formsearch: {
        getDate: "", //时间
        name: "", //机构名称
        number: "" //时间
      }
    };
  },
  mounted() {
    this.extract(); //折线图
    this.$nextTick(function() {
      this.getPie(); //机构类型分布图
      this.gradschools(); //学校类型分布图
    });
    // this.initialWeek();
    // this.fullLength();
  },
  methods: {
    //折线图
    extract() {
      this.chartLine = this.$echarts.init(
        document.getElementById("chartLineBox")
      );

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis"
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: ["平均成绩", "学生成绩"]
        },
        color: ["#8AE09F", "#FA6F53"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: [
            "2020-1-1",
            "2020-2-1",
            "2020-3-1",
            "2020-4-1",
            "2020-5-1",
            "2020-6-1",
            "2020-7-1"
          ],
          name: "DATE", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#000",
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#000"
            }
          }
        },
        yAxis: {
          //   name: "SALES VOLUME",
          nameTextStyle: {
            color: "#000",
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          },
          type: "value"
        },
        series: [
          {
            name: "平均成绩",
            data: [20, 32, 61, 34, 90, 30, 20],
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#8AE09F"
              }
            }
          },
          {
            name: "学生成绩",
            data: [48, 25, 50, 80, 70, 11, 30],
            type: "line",
            lineStyle: {
              normal: {
                color: "#FA6F53"
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    },
    getPie() {
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "机构类型分布图",
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
          data: ["学校", "——", "医院", "餐饮"] //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: ["#69A8E8", "#82B986", "#F4D67C", "#F07F77"],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: [
            //每个模块的名字和值
            { name: "学校", value: 36 },
            { name: "——", value: 27 },
            { name: "医院", value: 27 },
            { name: "餐饮", value: 9 }
          ],
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
    gradschools() {
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("schoolis"));
      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "学校类型分布图",
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
          data: ["幼儿园", "小学", "初中", "高中"] //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: ["#69A8E8", "#82B986", "#F4D67C", "#F07F77"],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: [
            //每个模块的名字和值
            { name: "幼儿园", value: 45 },
            { name: "小学", value: 36 },
            { name: "初中", value: 9 },
            { name: "高中", value: 9 }
          ],
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
    }
    //     initialWeek() {
    //       this.chartLine = this.$echarts.init(document.getElementById("weekRules"));
    //
    //       // 指定图表的配置项和数据
    //       var option = {
    //         tooltip: {
    //           //设置tip提示
    //           trigger: "axis"
    //         },
    //         //标题
    //         title: {
    //           text: "最近一周访问量统计"
    //
    //           // textStyle: { //标题内容的样式
    //           //   color: '#000',
    //           //   fontStyle: 'normal',
    //           //   fontWeight: 100,
    //           //   fontSize: 16 //主题文字字体大小，默认为18px
    //           // },
    //         },
    //         legend: {
    //           //设置区分（哪条线属于什么）
    //           data: ["PV", "UV"]
    //         },
    //         color: ["#8AE09F", "#FA6F53"], //设置区分（每条线是什么颜色，和 legend 一一对应）
    //         xAxis: {
    //           //设置x轴
    //           type: "category",
    //           boundaryGap: false, //坐标轴两边不留白
    //           data: [
    //             "2020-1-1",
    //             "2020-2-1",
    //             "2020-3-1",
    //             "2020-4-1",
    //             "2020-5-1",
    //             "2020-6-1",
    //             "2020-7-1"
    //           ],
    //           name: "DATE", //X轴 name
    //           nameTextStyle: {
    //             //坐标轴名称的文字样式
    //             color: "#000",
    //             fontSize: 16,
    //             padding: [0, 0, 0, 20]
    //           },
    //           axisLine: {
    //             //坐标轴轴线相关设置。
    //             lineStyle: {
    //               color: "#000"
    //             }
    //           }
    //         },
    //         yAxis: {
    //           //   name: "SALES VOLUME",
    //           nameTextStyle: {
    //             color: "#000",
    //             fontSize: 16,
    //             padding: [0, 0, 10, 0]
    //           },
    //           axisLine: {
    //             lineStyle: {
    //               color: "#000"
    //             }
    //           },
    //           type: "value"
    //         },
    //         series: [
    //           {
    //             name: "平均成绩",
    //             data: [1500, 1500, 1400, 500, 500, 2000, 600],
    //             type: "line", // 类型为折线图
    //             lineStyle: {
    //               // 线条样式 => 必须使用normal属性
    //               normal: {
    //                 color: "#5AC35C"
    //               }
    //             }
    //           },
    //           {
    //             name: "学生成绩",
    //             data: [3200, 3100, 2500, 1500, 1000, 3500, 1500],
    //             type: "line",
    //             lineStyle: {
    //               normal: {
    //                 color: "#2A8FF7"
    //               }
    //             }
    //           }
    //         ]
    //       };
    //
    //       // 使用刚指定的配置项和数据显示图表。
    //       this.chartLine.setOption(option);
    //     },
    // fullLength() {
    //   this.chartLine = this.$echarts.init(
    //     document.getElementById("byteLength")
    //   );
    //   var option = {
    //     title: {
    //       text: "自定义柱状图"
    //     },
    //     tooltip: {},
    //     legend: {
    //       data: ["销量"]
    //     },
    //     backgroundColor: "#0f1629", //图得背景色
    //     xAxis: {
    //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: "销量",
    //         type: "bar",
    //         data: [30, 20, 36, 40, 50, 60]
    //       }
    //     ]
    //   };
    //   // 使用刚指定的配置项和数据显示图表。
    //   this.chartLine.setOption(option);
    // }
  }
};
</script>

<style lang="scss" scoped>
.wel {
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  background-color: #fff;
}
.total {
  width: 100%;
  height: 60px;
  //   background-color: #fff;
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
  width: 120px;
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
.analysis {
  width: 100%;
  //   height: 400px;

  margin-top: 20px;
}
.Added {
  width: 100%;
  height: 30px;
  font-size: 18px;
  line-height: 30px;
  font-weight: bold;
  padding-left: 13px;
}
.strtotime {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
  //   background-color: yellow;
}
.linewidth {
  margin-top: 30px;
  width: 100%;
}
.pieChart {
  width: 100%;
  height: 400px;
  background-color: #fff;
}
.pieSlices {
  margin-top: 30px;
  display: flex;
}
.chart1 {
  width: 50%;
  //   height: 400px;

  float: left;
}
.chart2 {
  width: 50%;
  float: left;
}
.daccessfile {
  width: 100%;
  //   height: 500px;
}
.htaccess {
  width: 100%;
}
.cursor {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  padding-left: 14px;
  font-size: 14px;
}
</style>
