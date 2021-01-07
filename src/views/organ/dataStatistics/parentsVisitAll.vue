<template>
  <div class="rparents">
    <div class="cursor">
      <span style="margin-right: 10px; margin-left: 15px; font-size: 14px"
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
    <div class="linewidth">
      <div id="chartLineBox" style="width: 90%; height: 70vh"></div>
    </div>

    <div class="rankings">
      <div class="teamran">浏览排行</div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="name" label="机构" align="center">
          </el-table-column>
          <el-table-column prop="name" label="浏览量PV" align="center">
          </el-table-column>
          <el-table-column prop="name" label="浏览人数UV" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formsearch: {
        name: "", //机构名称
        number: "", //时间
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.extract(); //机构类型分布图
    });
  },
  methods: {
    //折线图
    extract() {
      this.chartLine = this.$echarts.init(
        document.getElementById("chartLineBox")
      );

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "最近一周访问量统计",

          // textStyle: { //标题内容的样式
          //   color: '#000',
          //   fontStyle: 'normal',
          //   fontWeight: 100,
          //   fontSize: 16 //主题文字字体大小，默认为18px
          // },
        },
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: ["PV", "UV"],
        },
        color: ["#5AC35C", "#2A8FF7"], //设置区分（每条线是什么颜色，和 legend 一一对应）
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
            name: "PV",
            data: [1500, 1500, 1400, 500, 500, 2000, 600],
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#5AC35C",
              },
            },
          },
          {
            name: "UV",
            data: [3200, 3100, 2500, 1500, 1000, 3500, 1500],
            type: "line",
            lineStyle: {
              normal: {
                color: "#2A8FF7",
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.rparents {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-bottom: 50px;
}
.cursor {
  width: 100%;
  height: 50px;
  padding-top: 20px;
  padding-left: 14px;
  font-size: 14px;
}
.linewidth {
  margin-top: 30px;
  width: 100%;
}
.rankings {
  width: 100%;
  .teamran {
    width: 100%;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    padding-left: 10px;
    margin-bottom: 20px;
  }
}
</style>
