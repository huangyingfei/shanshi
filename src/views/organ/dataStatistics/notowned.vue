<template>
  <div class="sample">
    <el-row>
      <el-col :span="24"
        ><div class="allergy">
          <span style="margin-right: 10px;margin-left: 15px;">选择部门:</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
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
          <div id="weekRules" style="width: 90%;height: 70vh;"></div></div
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
      value: ""
    };
  },
  mounted() {
    this.fullLength();
    this.initialWeek();
  },
  beforeMount() {},
  methods: {
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
          data: ["销量"]
        },
        backgroundColor: "#fff", //图得背景色
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [30, 20, 36, 40, 50, 60]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    },
    initialWeek() {
      let charts = this.$echarts.init(document.getElementById("weekRules"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
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
