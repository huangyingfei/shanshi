<template>
  <basic-container>
    <div>
      <h4>数据看板</h4>
      <el-row>
        <el-col :span="6">
          <label>区域选择</label>
          <el-cascader
            :options="cascaderOptions"
            clearable
            v-model="region1"
            @change="cascaderChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"> 机构总量 </el-col>
        <el-col :span="6"> 食材总量 </el-col>
        <el-col :span="6"> 菜品总量 </el-col>
        <el-col :span="6"> 食谱总量 </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h4>营养素摄入量分析</h4>
          <div class="input-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              clearable
              v-model="nutrientData.region"
              @change="cascaderChange"
            ></el-cascader>
          </div>
          <div class="input-box">
            <label>周期选择</label>
            <el-radio-group v-model="nutrientData.dateCycle">
              <el-radio :label="3">日</el-radio>
              <el-radio :label="6">周</el-radio>
              <el-radio :label="9">月</el-radio>
            </el-radio-group>
          </div>
          <div id="nutrientLine" style="width: 100%; height: 300px"></div>
        </el-col>
        <el-col :span="12">
          <h4>病假症状排行</h4>
          <div>
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              clearable
              v-model="leaveSymptoms.region"
              @change="cascaderChange"
            ></el-cascader>
          </div>
          <div id="leaveSymptomsBar" style="width: 100%; height: 300px"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h4>过敏食材分布图</h4>
          <div class="input-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              clearable
              v-model="allergyFood.region"
              @change="cascaderChange"
            ></el-cascader>
          </div>
          <div class="input-box">
            <label>机构选择</label>
            <el-select
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option> </el-option>
            </el-select>
          </div>
          <div id="allergyFoodRadar" style="width: 100%; height: 350px"></div>
        </el-col>
        <el-col :span="12">
          <h4>学生每人每日营养素提取（DRIs）</h4>
          <div class="input-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              clearable
              v-model="everyDayNutrient.region"
              @change="cascaderChange"
            ></el-cascader>
          </div>
          <div class="input-box">
            <label>机构选择</label>
            <el-select
              v-model="everyDayNutrient.tenantId"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option> </el-option>
            </el-select>
          </div>
          <div style="margin-top: 12px; width: 100%">
            <label>时间</label>
            <el-date-picker
              v-model="everyDayNutrient.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div
            id="everyDayNutrientPic"
            style="width: 100%; height: 300px"
          ></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h4>学生每人每日进食量分布</h4>
          <div class="input-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              clearable
              v-model="everyDayEat.region"
              @change="cascaderChange"
            ></el-cascader>
          </div>
          <div class="input-box">
            <label>机构选择</label>
            <el-select
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option> </el-option>
            </el-select>
          </div>
          <div style="margin-top: 12px; width: 100%">
            <label>时间</label>
            <el-date-picker
              v-model="everyDayEat.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div id="everyDayEatPic" style="width: 100%; height: 300px"></div>
        </el-col>
        <el-col :span="12">
          <h4>最受欢迎菜品</h4>
          <div class="die-healthyt-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              clearable
              v-model="region1"
              @change="cascaderChange"
            ></el-cascader>
          </div>
          <div class="die-healthyt-box">
            <label>时间</label>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div style="height: 350px">
            <infinite-scroll>
              <template v-slot="scope">
                <li-row :imgurl="scope.liData" />
              </template>
            </infinite-scroll>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 20px">
        <el-col :span="24">
          <h4>食谱健康指数排行榜</h4>
          <div>
            <div class="die-healthyt-box">
              <label>区域选择</label>
              <el-cascader
                :options="cascaderOptions"
                clearable
                v-model="region1"
                @change="cascaderChange"
              ></el-cascader>
            </div>
            <div class="die-healthyt-box">
              <label>机构选择</label>
              <el-select
                v-model="organName"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option> </el-option>
              </el-select>
            </div>
            <div class="die-healthyt-box">
              <label>时间</label>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div
            id="everyDayEatPic"
            style="width: 100%; height: 500px; overflow: hidden"
          >
            <infinite-scroll>
              <template>
                <school-li-row @openDialog="protocol"></school-li-row>
              </template>
            </infinite-scroll>
          </div>
          <v-calendar />
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
        :append-to-body="true"
      >
        <sharing />
      </el-dialog>

      <div style="height: 20px; width: 100%"></div>
    </div>
  </basic-container>
</template>

<script>
import infiniteScroll from "./infiniteScroll.vue";
import LiRow from "./liRow.vue";
import VCalendar from "../../components/vCalendar.vue";
import SchoolLiRow from "./schoolLiRow.vue";
import Sharing from "../PublicLicense/sharing.vue";
export default {
  components: { infiniteScroll, LiRow, VCalendar, SchoolLiRow, Sharing },
  data() {
    return {
      cascaderOptions: [],
      region1: [],
      nutrientData: {
        region: "",
        dateCycle: "",
        legendData: ["平均成绩", "学生成绩"],
        xAxisData: [
          "2020-1-1",
          "2020-2-1",
          "2020-3-1",
          "2020-4-1",
          "2020-5-1",
          "2020-6-1",
          "2020-7-1",
        ],
        seriesData: [
          {
            name: "平均成绩",
            data: [20, 32, 61, 34, 90, 30, 20],
            type: "line", // 类型为折线图
          },
          {
            name: "学生成绩",
            data: [48, 25, 50, 80, 70, 11, 30],
            type: "line",
          },
        ],
      },
      leaveSymptoms: {
        region: "",
      },
      allergyFood: {
        region: "",
      },
      everyDayNutrient: {
        region: "",
        tenantId: "",
        dateRange: [],
      },
      everyDayEat: {
        region: "",
      },
      count: 10,
      loading: false,
      noMore: false,
      dialogVisible: false,
    };
  },
  mounted() {
    this.getProvinces();
    this.nutrientLine();
    this.leaveSymptomsBar();
    this.allergyFoodRadar();
    this.everyDayNutrientPic();
    this.everyDayEatPic();
  },
  methods: {
    protocol(row) {
      this.$nextTick(() => {
        this.dialogVisible = true;
        this.$refs.toolb.overview();
      });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    //获取区域选择内容
    getProvinces() {
      this.$axios
        .get(`api/blade-system/region/selectCityOrProvince`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res);
          this.national = res.data.data;
          // console.log(this.national);
          let arr = [];
          this.national.forEach((item, index) => {
            arr[index] = {
              value: item.id,
              label: item.name,
            };
            arr[index].children = [];
            // console.log(item.children instanceof Array);
            if (item.children) {
              item.children.forEach((item1, index1) => {
                arr[index].children[index1] = {
                  value: item1.id,
                  label: item1.name,
                };
              });
            }
          });

          // this.$set(this.national, arr)
          this.cascaderOptions = arr;
        });
    },
    cascaderChange(val) {
      console.log(val);
      console.log(this.region1);
    },
    //营养素摄入量分析
    nutrientLine() {
      let chartLine = this.$echarts.init(
        document.getElementById("nutrientLine")
      );

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: this.nutrientData.legendData,
        },
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: this.nutrientData.xAxisData,
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
        series: this.nutrientData.seriesData,
      };

      // 使用刚指定的配置项和数据显示图表。
      chartLine.setOption(option);
    },
    //病假症状排行
    leaveSymptomsBar() {
      let chartLine = this.$echarts.init(
        document.getElementById("leaveSymptomsBar")
      );

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["皮疹", "咳嗽", "黄疸", "感冒", "发热", "肠胃不适"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["下城区", "上城区", "西湖区", "拱墅区", "江干区"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "皮疹",
            type: "bar",
            stack: "皮疹",
            barWidth: 30,
            data: [3020, 332, 301, 334, 390],
          },
          {
            name: "咳嗽",
            type: "bar",
            stack: "皮疹",
            data: [320, 332, 301, 334, 390],
          },
          {
            name: "黄疸",
            type: "bar",
            stack: "皮疹",
            data: [320, 332, 301, 334, 390],
          },
          {
            name: "感冒",
            type: "bar",
            stack: "皮疹",
            data: [320, 332, 301, 334, 390],
          },
          {
            name: "发热",
            type: "bar",
            stack: "皮疹",
            data: [320, 332, 301, 334, 390],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      chartLine.setOption(option);
    },
    //过敏食材分布图
    allergyFoodRadar() {
      let chartLine = this.$echarts.init(
        document.getElementById("allergyFoodRadar")
      );

      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        legend: {
          data: ["食材"],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
              // backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          radius: 90,
          indicator: [
            { name: "土豆" },
            { name: "猕猴桃" },
            { name: "芒果" },
            { name: "花蛤" },
          ],
        },
        series: [
          {
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 19000, 28000, 35000],
                name: "食材",
              },
            ],
            lineStyle: {
              color: "rgba(64, 155, 220, 1)",
            },
            areaStyle: {
              color: "rgba(64, 155, 220, 1)",
            },
            itemStyle: {
              color: "rgba(64, 155, 220, 1)",
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      chartLine.setOption(option);
    },
    //学生每人每日营养素提取
    everyDayNutrientPic() {
      var chartPie = this.$echarts.init(
        document.getElementById("everyDayNutrientPic")
      );

      // 指定图表的配置项和数据
      var option = {
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
            center: ["40%", "50%"],
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
    //学生每人每日进食量分布
    everyDayEatPic() {
      var chartPie = this.$echarts.init(
        document.getElementById("everyDayEatPic")
      );

      // 指定图表的配置项和数据
      var option = {
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
            center: ["40%", "50%"],
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
    //获取营养素摄入量分析数据
    getNutrientLine() {
      this.axios({
        url: "",
        method: "",
        params: "",
      }).then((res) => {});
    },
    //获取病假症状排行
    getLeaveSymptomsBar() {
      this.axios({
        url: "",
        method: "",
        params: "",
      }).then((res) => {});
    },
    //获取过敏食材分布图
    getAllergyFoodRadar() {
      this.axios({
        url: "",
        method: "",
        params: "",
      }).then((res) => {});
    },
    //获取学生每人每日营养素提取
    getEveryDayNutrientPic() {
      this.axios({
        url: "/api/blade-food/recipe/getStuNutrition",
        method: "",
        params: "",
      }).then((res) => {});
    },
    //获取学生每人每日进食量分布
    getEveryDayEatPic() {
      this.axios({
        url: "",
        method: "",
        params: "",
      }).then((res) => {});
    },
    //获取学生每人每日营养素提取
    getEveryDayNutrientPic() {
      this.axios({
        url: "",
        method: "",
        params: "",
      }).then((res) => {});
    },
  },
};
</script>

<style scoped>
label {
  color: #606266;
  font-size: 14px;
  margin: 0 12px 0 0;
  line-height: 40px;
}
.input-box {
  display: inline-block;
  width: 50%;
}
.die-healthyt-box {
  display: inline-block;
  margin-right: 20px;
}
</style>