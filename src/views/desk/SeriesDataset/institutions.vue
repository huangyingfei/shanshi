<template>
  <div class="wel">
    <!-- 总量 -->
    <div class="total">
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">
            机构总量 <span>{{ this.newhead.orgCount }}</span>
          </div>
          <div class="food1">
            今日新增 <span>{{ this.newhead.orgAdd }}</span>
          </div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">
            政府总量 <span>{{ this.newhead.goverCount }}</span>
          </div>
          <div class="food1">
            今日新增 <span>{{ this.newhead.goverAdd }}</span>
          </div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">
            食材总量 <span>{{ this.newhead.foodCount }}</span>
          </div>
          <div class="food1">
            今日新增 <span>{{ this.newhead.foodAdd }}</span>
          </div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">
            菜品总量 <span>{{ this.newhead.dishCount }}</span>
          </div>
          <div class="food1">
            今日新增 <span>{{ this.newhead.dishAdd }}</span>
          </div>
        </div>
      </div>
      <div class="mechanism">
        <div class="nism1">
          <div class="ingredients">
            食谱总量 <span>{{ this.newhead.recipeCount }}</span>
          </div>
          <div class="food1">
            今日新增 <span>{{ this.newhead.recipeAdd }}</span>
          </div>
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
          v-model="value1"
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
import { dateFormat } from "@/util/date.js";
export default {
  data() {
    return {
      newhead: {
        dishCount: "", //菜品
        dishAdd: "", //菜品新增
        foodCount: "", //食材
        foodAdd: "", //食材新增
        goverCount: "", //政府
        goverAdd: "", //新增
        orgCount: "", //机构
        orgAdd: "", //机构新增
        recipeCount: "", //食谱
        recipeAdd: "" //新增
        // organ: "", //机构
        // organnewest: "", //机构新增
        // gover: "", //政府
        // governewest: "", //政府新增
        // food: "", //食材
        // foodnewest: "", //食材新增
        // dish: "", //菜品
        // dishnewest: "", //菜品新增
        // recipe: "", //食谱
        // recipenewest: "" //食谱新增
      },
      value1: [],

      formsearch: {
        getDate: "", //时间
        name: "", //机构名称
        number: "" //时间
      },
      strtotime: "", //
      quantity: "", //机构数量统计

      timezone: "",
      timezone1: "", //时间搜索
      Numbers: [], //数量
      setDate: [], //日期
      mappings: {
        school: "", //学校
        hospitals: "", //医院
        catering: "" //餐饮
      }, //机构类型分布图
      schoolis: {
        robinson: "",
        noschool: "",
        highly: "",
        lehigh: ""
      }
    };
  },
  created() {
    // let d = new Date();
    // let year1, month1, day1;
    // [year1, month1, day1] = [d.getFullYear(), d.getMonth(), d.getDate()];
    // let date1 = new Date(year1, month1, day1, 7);
    // // console.log(date1);
    // function checkTime(i) {
    //   if (i < 10) {
    //     i = "0" + i;
    //   }
    //   return i;
    // }
    // var date = new Date(date1);
    // this.date_value =
    //   date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    // console.log(this.date_value);
    // this.value1.push(this.date_value);
    // //前一天设定的日期时间
    // let year2, month2, day2;
    // d.setTime(d.getTime() - 3600 * 1000 * 24 * 7);
    // [year2, month2, day2] = [d.getFullYear(), d.getMonth(), d.getDate()];
    // // var date1 = new Date(date1);
    // let date2 = new Date(year2, month2, day2, 7);
    // var calendar = new Date(date2);
    // this.week =
    //   calendar.getFullYear() +
    //   "-" +
    //   (calendar.getMonth() + 1) +
    //   "-" +
    //   calendar.getDate();
    // console.log(this.week);
    // this.value1.unshift(this.week);
  },
  beforeMount() {
    this.nsmpsearly();
    this.Statistics();
    this.multimap();
  },
  mounted() {
    this.dateRangeDefaultValue();
 
    // setTimeout(() => {
    //   this.extract(); //折线图
    // }, 1000);
    this.$nextTick(function() {
      // this.extract("chartLineBox"); //折线图
      // this.getPie(); //机构类型分布图
    });
    // this.initialWeek();
    // this.fullLength();
  },
  methods: {
     dateRangeDefaultValue() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.value1 = [
        dateFormat(start, "yyyy-MM-dd"),
        dateFormat(end, "yyyy-MM-dd"),
      ];
         this.searchBtn()
    },
    //头部请求
    nsmpsearly() {
      this.$axios.get(`api/blade-food/report/tenantCount`, {}).then(res => {
        // console.log(res);
        this.newhead = res.data.data;

        // console.log(this.newhead);
      });
    },
    //查询
    searchBtn() {
      console.log(this.value1);
      if (this.value1) {
        this.timezone = this.value1[0];
        this.timezone1 = this.value1[1];
      } else {
        this.timezone = "";
        this.timezone1 = "";
      }
      this.Statistics();
    },
    //机构数量统计趋势分析图
    Statistics() {
      let urlParams = `?startTime=${this.timezone}&endTime=${this.timezone1}`;
      this.$axios
        .get(`api/blade-food/report/tenantAnalyse` + urlParams, {})
        .then(res => {
          // console.log(res);
          this.quantity = res.data.data;
          console.log(this.quantity);
          let number = [];
          let validate = []; //日期
          this.quantity.forEach((item, index) => {
            console.log(item);
            number.push(item.orgNum);
            validate.push(item.dateStr);
          });
          this.Numbers = number;
          console.log(number);
          this.setDate = validate;
          console.log(this.setDate);
          this.extract("chartLineBox"); //折线图
        });
      // this.$nextTick(function() {
      //   this.extract("chartLineBox"); //折线图
      // });
    },
    //机构类型分布图
    multimap() {
      this.$axios.get(`api/blade-food/report/typeAnalyse`, {}).then(res => {
        // console.log(res);
        this.maps = res.data.data;

        // force.push(this.maps.hospital, this.maps.restaurant, this.maps.school);
        // console.log(force);
        this.mappings.school = this.maps.school;
        this.mappings.hospitals = this.maps.restaurant;
        this.mappings.catering = this.maps.hospital;
        this.schoolis.robinson = this.maps.yey;
        this.schoolis.noschool = this.maps.xx;
        this.schoolis.highly = this.maps.cz;
        this.schoolis.lehigh = this.maps.gz;
        this.getPie(); //机构类型分布图
        this.gradschools(); //学校类型分布图
      });
    },
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
          data: ["计数"]
        },
        color: ["#2A8FF7"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: this.setDate,

          name: "日期", //X轴 name
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
            name: "计数",
            data: this.Numbers,
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#2A8FF7"
              }
            }
          }
          // {
          //   name: "学生成绩",
          //   data: [48, 25, 50, 80, 70, 11, 30],
          //   type: "line",
          //   lineStyle: {
          //     normal: {
          //       color: "#FA6F53"
          //     }
          //   }
          // }
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
          data: ["学校", "医院", "餐饮"] //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: ["#69A8E8", "#F4D67C", "#F07F77"],
        // 饼图数据
        series: {
          name: "机构类型分布图",
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: [
            //每个模块的名字和值
            { name: "学校", value: this.mappings.school },

            { name: "医院", value: this.mappings.hospitals },
            { name: "餐饮", value: this.mappings.catering }
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
          name: "学校类型分布图",
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: [
            //每个模块的名字和值
            { name: "幼儿园", value: this.schoolis.robinson },
            { name: "小学", value: this.schoolis.noschool },
            { name: "初中", value: this.schoolis.highly },
            { name: "高中", value: this.schoolis.lehigh }
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
