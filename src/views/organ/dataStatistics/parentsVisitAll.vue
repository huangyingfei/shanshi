<template>
  <div class="rparents">
    <div class="cursor">
      <!-- <span class="exact">机构:</span>

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
      </el-date-picker> -->
    </div>
    <!-- 浏览量 -->
    <div class="browse">
      <div class="fontify">
        <div class="fontifytxt">浏览量PV</div>
        <div class="fontifynum">{{ this.browse.visitorsuv }}</div>
      </div>
      <div class="fontify">
        <div class="fontifytxt">浏览人数UV</div>
        <div class="fontifynum">{{ this.browse.extrapv }}</div>
      </div>
      <div class="fontify">
        <div class="fontifytxt">总浏览量PV</div>
        <div class="fontifynum">{{ this.browse.ofcleaning }}</div>
      </div>
      <div class="fontify">
        <div class="fontifytxt">总浏览人数UV</div>
        <div class="fontifynum">{{ this.browse.property }}</div>
      </div>
    </div>
    <div class="linewidth">
      <div id="chartLineBox" style="width: 90%;height: 70vh;"></div>
    </div>

    <div class="rankings">
      <div class="teamran">浏览排行</div>
      <div>
        <el-table
          :data="teamranking"
          v-loading="loadFlag"
          border
          :element-loading-text="page_data.loadTxt"
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="tenantName" label="机构" align="center">
          </el-table-column>
          <el-table-column prop="lookCount" label="浏览量PV" align="center">
          </el-table-column>
          <el-table-column prop="peopleCount" label="浏览人数UV" align="center">
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
      loadFlag: false, //加载flag
      page_data: {
        loadTxt: "数据加载中..."
      },
      formsearch: {
        name: "", //机构名称
        number: "" //时间
      },
      browse: {
        extrapv: "", //浏览量PV
        visitorsuv: "", //浏览人数UA
        property: "", //总浏览量
        ofcleaning: "" //总浏览人数
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        }
      ],
      teamranking: [], //浏览排行
      updated: [], //日期
      fontify: [], //浏览量
      instanceof: [], //总人数
      activity: ""
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.extract(); //机构类型分布图
    });
  },
  beforeMount() {
    this.profileuser();
    this.searchBtn();
  },
  methods: {
    searchBtn() {
      // console.log(this.activity);
      this.$axios
        .post(`api/blade-food/report/visitAnalyse`, {
          tenantId: this.activity
        })
        .then(res => {
          // console.log(res);
          this.teamranking = res.data.data.visitLogVOList;
        });
    },
    //访问量统计
    profileuser() {
      this.loadFlag - true;
      this.$axios.get(`api/blade-food/report/orgVisitCount`, {}).then(res => {
        // console.log(res);
        this.loadFlag = false;
        this.offers = res.data.data;
        // console.log(this.offers);
        this.browse.extrapv = this.offers.lookPeople; //浏览量
        this.browse.visitorsuv = this.offers.looks; //浏览人数
        this.browse.property = this.offers.lookPeopleTotal; //总流量
        this.browse.ofcleaning = this.offers.looksTotal; //总人数
        // console.log(this.browse.ofcleaning);
        let recent = []; //日期
        let ring = []; //浏览量
        let offset = []; //总人数
        this.offers.visitLogVOs.forEach((item, index) => {
          recent.push(item.dateStr);
          ring.push(item.lookCount);
          offset.push(item.num);
        });
        this.updated = recent;
        this.fontify = ring;
        this.instanceof = offset;
        // this.teamranking = this.offers.visitLogVOList;
        // console.log(this.teamranking);
        this.extract();
        // console.log(recent);
      });
    },
    //折线图
    extract() {
      this.chartLine = this.$echarts.init(
        document.getElementById("chartLineBox")
      );

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "最近一周访问量统计"

          // textStyle: { //标题内容的样式
          //   color: '#000',
          //   fontStyle: 'normal',
          //   fontWeight: 100,
          //   fontSize: 16 //主题文字字体大小，默认为18px
          // },
        },
        tooltip: {
          //设置tip提示
          trigger: "axis"
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: ["PV", "UV"]
        },
        color: ["#5AC35C", "#2A8FF7"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: this.updated,
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
            name: "PV",
            data: this.fontify,
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#5AC35C"
              }
            }
          },
          {
            name: "UV",
            data: this.instanceof,
            type: "line",
            lineStyle: {
              normal: {
                color: "#2A8FF7"
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    }
  }
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
  height: 20px;
  // padding-top: 20px;
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
.browse {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  // background-color: red;
  .fontify {
    width: 200px;
    height: 80px;

    // background-color: red;
    text-align: center;
    margin-left: 35px;
    margin-right: 50px;
    .fontifytxt {
      font-size: 14px;
    }
    .fontifynum {
      font-size: 20px;
      font-weight: bold;
      padding-top: 10px;
    }
  }
}
</style>
