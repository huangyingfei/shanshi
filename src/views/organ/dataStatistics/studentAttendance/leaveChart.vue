<template>
  <div class="leave-chart">
    <el-row :gutter="20">
      <el-col :span="6">
        <label>选择部门</label>
        <el-select style="width: 100%">
          <el-option value=""></el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <label>时间</label>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="leaveType" style="width: 100%; height: 300px"></div>
      </el-col>
      <el-col :span="12">
        <div id="leaveSymptoms" style="width: 100%; height: 300px"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="leaveSymptomsLine" style="width: 100%; height: 300px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leaveType: {
        legendData: ["--", "事假", "病假", "其他"],
        seriesData: [],
      },
      leaveSymptoms: {
        legendData: ["--", "事假", "病假", "其他"],
        seriesData: [],
      },
    };
  },
  mounted() {
    this.leaveTypePic();
    this.leaveSymptomsPic();
    this.leaveSymptomsline();
  },
  methods: {
    leaveTypePic() {
      var chartPie = this.$echarts.init(document.getElementById("leaveType"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "请假类型分布图",
          left: "center",
        },
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["视频广告", "联盟广告", "邮件营销", "直接访问", "搜索引擎"],
        },
        series: [
          {
            type: "pie", // 类型为饼图
            center: ["50%", "50%"],
            radius: "70%",
            selectedMode: "single",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      chartPie.setOption(option);
    },
    leaveSymptomsPic() {
      var chartPie = this.$echarts.init(
        document.getElementById("leaveSymptoms")
      );

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "请假类型分布图",
          left: "center",
        },
        tooltip: {
          //设置tip提示
          trigger: "item",
          formatter: "{b}:{c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["视频广告", "联盟广告", "邮件营销", "直接访问", "搜索引擎"],
        },
        series: [
          {
            type: "pie", // 类型为饼图
            center: ["50%", "50%"],
            radius: "70%",
            selectedMode: "single",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      chartPie.setOption(option);
    },
    leaveSymptomsline() {
      let chartLine = this.$echarts.init(
        document.getElementById("leaveSymptomsLine")
      );

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: ["平均成绩", "学生成绩"],
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
            "2020-7-1",
          ],
          name: "DATE", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#000",
            fontSize: 16,
            padding: [0, 0, 0, 20],
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#000",
            },
          },
        },
        yAxis: {
          //   name: "SALES VOLUME",
          nameTextStyle: {
            color: "#000",
            fontSize: 16,
            padding: [0, 0, 10, 0],
          },
          axisLine: {
            lineStyle: {
              color: "#000",
            },
          },
          type: "value",
        },
        series: [
          {
            name: "平均成绩",
            data: [20, 32, 61, 34, 90, 30, 20],
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#8AE09F",
              },
            },
          },
          {
            name: "学生成绩",
            data: [48, 25, 50, 80, 70, 11, 30],
            type: "line",
            lineStyle: {
              normal: {
                color: "#FA6F53",
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      chartLine.setOption(option);
    },
  },
};
</script>

<style scoped>
.el-col {
  display: flex;
}
label {
  line-height: 40px;
  flex-shrink: 0;
  margin-right: 12px;
  color: #606266;
  font-size: 14px;
}
.leave-chart {
  overflow-y: auto;
  height: calc(100vh - 180px);
}
</style>