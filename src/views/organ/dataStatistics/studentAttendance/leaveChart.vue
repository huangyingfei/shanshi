<template>
  <div class="leave-chart">
    <el-row :gutter="20">
      <el-col :span="6">
        <label>选择部门</label>
        <el-cascader
          v-model="classId"
          :options="options"
          :props="{ value: 'id', disabled: 'edisabled' }"
          @change="getStudentWork"
          :show-all-levels="false"
        ></el-cascader>
      </el-col>
      <el-col :span="10">
        <label>时间</label>
        <el-date-picker
          v-model="dateRangeValue"
          value-format="yyyy-MM-dd"
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
        <div id="leaveType" style="width: 100%; height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="leaveSymptoms" style="width: 100%; height: 400px"></div>
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
import { dateFormat } from "@/util/date.js";
export default {
  data() {
    return {
      leaveType: {
        legendData: ["事假", "病假", "其他"],
        seriesData: [],
      },
      leaveSymptoms: {
        legendData: [
          "感冒",
          "咳嗽",
          "发热",
          "肠胃不适",
          "皮疹",
          "腹泻",
          "黄疸",
          "结膜红肿",
          "呕吐",
          "牙疼",
          "外伤",
          "咽喉",
          "其他",
        ],
        seriesData: [],
      },
      leaveSymptoms2: {
        cwNum: [],
        dateStr: [],
        frNum: [],
        fxNum: [],
        gmNum: [],
        hdNum: [],
        jmhzNum: [],
        ksNum: [],
        otNum: [],
        pzPNum: [],
        qtNum: [],
        wsNum: [],
        yhNum: [],
        ytNum: [],
        regionName: [],
      },
      dateRangeValue: [],
      classId: [""],
      options: [],
    };
  },
  mounted() {
    this.dateRangeDefaultValue();
    this.getclassTree();
    this.getStudentWork();
  },
  methods: {
    //默认时间
    dateRangeDefaultValue() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.dateRangeValue = [
        dateFormat(start, "yyyy-MM-dd"),
        dateFormat(end, "yyyy-MM-dd"),
      ];
    },
    //获取图表数据
    getStudentWork() {
      this.axios({
        url: "/api/blade-food/report/orgStudentWorkDistri",
        method: "get",
        params: {
          startTime: this.dateRangeValue[0],
          endTime: this.dateRangeValue[1],
          classId: this.classId.slice(-1)[0],
        },
      }).then((res) => {
        var result = res.data.data;
        this.leaveType.seriesData = [
          { value: result.sjNum, name: "事假" },
          { value: result.bjNum, name: "病假" },
          { value: result.otherNum, name: "其他" },
        ];
        this.leaveSymptoms.seriesData = [
          { value: result.diseaseDTO.gmNum, name: "感冒" },
          { value: result.diseaseDTO.ksNum, name: "咳嗽" },
          { value: result.diseaseDTO.frNum, name: "发热" },
          { value: result.diseaseDTO.cwNum, name: "肠胃不适" },
          { value: result.diseaseDTO.pzPNum, name: "皮疹" },
          { value: result.diseaseDTO.fxNum, name: "腹泻" },
          { value: result.diseaseDTO.hdNum, name: "黄疸" },
          { value: result.diseaseDTO.jmhzNum, name: "结膜红肿" },
          { value: result.diseaseDTO.otNum, name: "呕吐" },
          { value: result.diseaseDTO.ytNum, name: "牙疼" },
          { value: result.diseaseDTO.wsNum, name: "外伤" },
          { value: result.diseaseDTO.yhNum, name: "咽喉" },
          { value: result.diseaseDTO.qtNum, name: "其他" },
        ];

        result.diseaseTrend.forEach((el) => {
          for (let k in el) {
            console.log(this.leaveSymptoms2);
            console.log(k);
            if (this.leaveSymptoms2[k] == undefined) {
              this.leaveSymptoms2[k] = [];
            }

            this.leaveSymptoms2[k].push(el[k]);
          }
        });
        this.leaveTypePic();
        this.leaveSymptomsPic();
        this.leaveSymptomsline();
      });
    },
    //获取部门级联内容
    getclassTree() {
      this.axios({
        url: "/api/blade-food/class/tree",
        method: "get",
      }).then((res) => {
        this.options = res.data.data[0].children;
        console.log(this.options);
      });
    },
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
          trigger: "item",
          formatter: "{b}:{c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.leaveType.legendData,
        },
        series: [
          {
            type: "pie", // 类型为饼图
            center: ["50%", "50%"],
            radius: "60%",
            selectedMode: "single",
            data: this.leaveType.seriesData,
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
          data: this.leaveSymptoms.legendData,
        },
        series: [
          {
            type: "pie", // 类型为饼图
            center: ["50%", "50%"],
            radius: "60%",
            selectedMode: "single",
            data: this.leaveSymptoms.seriesData,
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
      let seriesData = [];
      let i = 0;
      for (var k in this.leaveSymptoms2) {
        if (k != "dateStr") {
          seriesData.push({
            name: this.leaveSymptoms.legendData[i],
            data: this.leaveSymptoms2[k],
            type: "line", // 类型为折线图
          });
          i++;
        }
      }

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: [
            "感冒",
            "咳嗽",
            "发热",
            "肠胃不适",
            "皮疹",
            "腹泻",
            "黄疸",
            "结膜红肿",
            "呕吐",
            "牙疼",
            "外伤",
            "咽喉",
            "其他",
          ],
        },
        // color: ["#8AE09F", "#FA6F53"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: this.leaveSymptoms2.dateStr,
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
        series: seriesData,
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