<template>
  <div class="web">
    <el-row>
      <el-col :span="24"
        ><div class="search_all">
          <span style="margin-right: 10px;margin-left: 15px;">选择部门</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span style="margin-right: 10px;margin-left: 15px;">选择时间:</span>
          <el-date-picker
            v-model="strtotime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="students">
          <div id="main" style="width:100% ;height:400px;"></div></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="students1">
          <div id="schoolis" style="width:100% ;height:400px;"></div></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      strtotime: []
    };
  },
  mounted() {
    this.getPie();
    this.gradschools();
  },
  methods: {
    getPie() {
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "学生每人每日营养素提取（DRIs）",
          x: "center" //标题位置
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
          bottom: 0, //控制图例出现的距离  默认左上角
          left: "center", //控制图例的位置
          itemWidth: 16, //图例颜色块的宽度和高度
          itemHeight: 12,
          textStyle: {
            //图例中文字的样式
            color: "#000",
            fontSize: 16
          },
          data: [
            "蛋白质(g)",
            "能量(kcal)",
            "---",
            "脂肪(g)",
            "钙(mg)",
            "维生素A(ug)",
            "其他",
            "铁(mg)",
            "维生素C(mg)",
            "维生素B2(mg)",
            "钠(mg)",
            "维生素B1(mg)",
            "锌(mg)"
          ] //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: [
          "#69A8E8",
          "#82B986",
          "#F4D67C",
          "#F07F77",
          "#6BD6E9",
          "#EF759D",
          "#F2D39E",
          "#C6ABF2",
          "#F6B892",
          "#CB9E9E",
          "#C888D4",
          "#9EC66F",
          "#D288A7"
        ],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: [
            //每个模块的名字和值
            { name: "蛋白质(g)", value: 5 },

            { name: "能量(kcal)", value: 15 },
            { name: "---", value: 5 },
            { name: "脂肪(g)", value: 10 },

            { name: "钙(mg)", value: 10 },
            { name: "维生素A(ug)", value: 10 },
            { name: "其他", value: 5 },

            { name: "铁(mg)", value: 5 },
            { name: "维生素C(mg)", value: 10 },
            { name: "维生素B2(mg)", value: 5 },
            { name: "钠(mg)", value: 5 },

            { name: "维生素B1(mg)", value: 10 },
            { name: "锌(mg)", value: 5 }
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
          text: "学生每人每日进食量分布",
          x: "center" //标题位置
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
          itemWidth: 16, //图例颜色块的宽度和高度
          itemHeight: 12,
          textStyle: {
            //图例中文字的样式
            color: "#000",
            fontSize: 16
          },
          data: [
            "蔬菜(g)",
            "水果(g)",
            "---",
            "盐",
            "大豆(g)",
            "乳制品(g)",
            "食用油(g)",
            "肉类(g)",
            "谷类(g)"
          ] //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: [
          "#69A8E8",
          "#82B986",
          "#F4D67C",
          "#F07F77",
          "#6BD6E9",
          "#EF759D",
          "#F2D39E",
          "#C6ABF2",
          "#F6B892"
        ],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: [
            //每个模块的名字和值
            { name: "蔬菜(g)", value: 15 },
            { name: "水果(g)", value: 10 },
            { name: "---", value: 5 },
            { name: "盐", value: 5 },
            { name: "大豆(g)", value: 25 },
            { name: "乳制品(g)", value: 10 },
            { name: "食用油(g)", value: 10 },
            { name: "肉类(g)", value: 15 },
            { name: "谷类(g)", value: 5 }
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
  }
};
</script>

<style lang="scss" scoped>
.web {
  width: 100%;
  height: 700px;
  background-color: #fff;
  overflow: auto;
  margin-bottom: 50px;
}
.search_all {
  font-size: 14px;
}
.students {
  width: 100%;
  height: 500px;
}
.students1 {
  width: 100%;
  height: 500px;
  margin-bottom: 50px;
}
</style>
