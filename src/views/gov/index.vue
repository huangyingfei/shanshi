<template>
  <basic-container>
    <div>
      <h4>数据看板</h4>
      <el-row>
        <el-col :span="6">
          <label>区域选择</label>
          <el-cascader
            :options="cascaderOptions"
            :props="{ label: 'name', value: 'id' }"
            :show-all-levels="false"
            clearable
            v-model="zfOrgCount.region"
            @change="cascaderChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"> 机构总量: {{ zfOrgCount.orgCount }}</el-col>
        <el-col :span="6"> 食材总量: {{ zfOrgCount.foodCount }}</el-col>
        <el-col :span="6"> 菜品总量: {{ zfOrgCount.dishCount }}</el-col>
        <el-col :span="6"> 食谱总量: {{ zfOrgCount.recipeCount }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h4>营养素摄入量分析</h4>
          <div class="input-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              :props="{ label: 'name', value: 'id' }"
              :show-all-levels="false"
              clearable
              v-model="nutrientData.region"
              @change="getNutrientLine"
            ></el-cascader>
          </div>
          <div id="nutrientLine" style="width: 100%; height: 340px"></div>
        </el-col>
        <el-col :span="12">
          <h4>病假症状排行</h4>
          <div>
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions1"
              :props="{ label: 'name', value: 'id' }"
              :show-all-levels="false"
              clearable
              v-model="leaveSymptoms.region"
              @change="getLeaveSymptomsBar"
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
              :props="{ label: 'name', value: 'id' }"
              :show-all-levels="false"
              clearable
              v-model="allergyFood.region"
              @change="getAllergyFoodRadar"
            ></el-cascader>
          </div>
          <div class="input-box">
            <label>机构选择</label>
            <el-select
              v-model="allergyFood.tenantId"
              filterable
              clearable
              placeholder="请输入关键词"
              @change="getAllergyFoodRadar"
            >
              <el-option
                v-for="item in allergyFood.orgCodeOptions"
                :key="item.tenantId"
                :label="item.tenantName"
                :value="item.tenantId"
              >
              </el-option>
            </el-select>
          </div>
          <div id="allergyFoodRadar" style="width: 100%; height: 450px"></div>
        </el-col>
        <el-col :span="12">
          <h4>学生每人每日营养素提取（DRIs）</h4>
          <div class="input-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              :props="{ label: 'name', value: 'id' }"
              :show-all-levels="false"
              clearable
              v-model="everyDayNutrient.region"
              @change="getEveryDayNutrientPic"
            ></el-cascader>
          </div>
          <div class="input-box">
            <label>机构选择</label>
            <el-select
              v-model="everyDayNutrient.tenantId"
              filterable
              clearable
              placeholder="请输入关键词"
              @change="getEveryDayNutrientPic"
            >
              <el-option
                v-for="item in everyDayNutrient.orgCodeOptions"
                :key="item.tenantId"
                :label="item.tenantName"
                :value="item.tenantId"
              >
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 12px; width: 100%">
            <label>时间</label>
            <el-date-picker
              v-model="everyDayNutrient.dateRange"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getEveryDayNutrientPic"
            >
            </el-date-picker>
          </div>
          <div
            id="everyDayNutrientPic"
            style="width: 100%; height: 400px"
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
              :props="{ label: 'name', value: 'id' }"
              :show-all-levels="false"
              clearable
              v-model="everyDayEat.region"
              @change="getEveryDayEatPic"
            ></el-cascader>
          </div>
          <div class="input-box">
            <label>机构选择</label>
            <el-select
              v-model="everyDayEat.tenantId"
              filterable
              clearable
              placeholder="请输入关键词"
              @change="getEveryDayEatPic"
            >
              <el-option
                v-for="item in everyDayEat.orgCodeOptions"
                :key="item.tenantId"
                :label="item.tenantName"
                :value="item.tenantId"
              >
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 12px; width: 100%">
            <label>时间</label>
            <el-date-picker
              v-model="everyDayEat.dateRange"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getEveryDayEatPic"
            >
            </el-date-picker>
          </div>
          <div id="everyDayEatPic" style="width: 100%; height: 400px"></div>
        </el-col>
        <el-col :span="12">
          <h4>最受欢迎菜品</h4>
          <div class="die-healthyt-box">
            <label>区域选择</label>
            <el-cascader
              :options="cascaderOptions"
              :props="{ label: 'name', value: 'id' }"
              :show-all-levels="false"
              clearable
              v-model="goverDishTotal.region"
              @change="beforeGetGoverDishTotal"
            ></el-cascader>
          </div>
          <div class="die-healthyt-box">
            <week dateLabel="时间" @weekChange="beforeGetGoverDishTotal" />
          </div>
          <div style="height: 350px">
            <infinite-scroll
              @scrollUp="getGoverDishTotal"
              :liArray="goverDishTotal.liData"
              :liType="0"
              :finished="goverDishTotal.finished"
            >
              <template v-slot="scope">
                <li-row
                  :dishPic="scope.liData.dishPic"
                  :dishName="scope.liData.dishName"
                  :dishCount="scope.liData.dishCount"
                />
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
                :props="{ label: 'name', value: 'id' }"
                :show-all-levels="false"
                clearable
                v-model="goverRecipeTotal.region"
                @change="beforeGetGoverRecipeTotal"
              ></el-cascader>
            </div>
            <div class="die-healthyt-box">
              <label>机构选择</label>
              <el-select
                v-model="goverRecipeTotal.tenantId"
                filterable
                clearable
                placeholder="请输入关键词"
                @change="beforeGetGoverRecipeTotal"
              >
                <el-option
                  v-for="item in goverRecipeTotal.orgCodeOptions"
                  :key="item.tenantId"
                  :label="item.tenantName"
                  :value="item.tenantId"
                >
                </el-option>
              </el-select>
            </div>
            <div class="die-healthyt-box">
              <week dateLabel="时间" @weekChange="beforeGetGoverRecipeTotal" />
            </div>
          </div>
          <div
            id="everyDayEatPic"
            style="width: 100%; height: 500px; overflow: hidden"
          >
            <infinite-scroll
              @scrollUp="getGoverRecipeTotal"
              :liType="1"
              :liArray="goverRecipeTotal.liData"
              :finished="goverRecipeTotal.finished"
              v-slot="scope"
            >
              <template>
                <school-li-row
                  @openDialog="protocol"
                  :logoUrl="scope.liData.logoUrl"
                  :tenantName="scope.liData.tenantName"
                  :score="scope.liData.score"
                  :tenantId="scope.liData.tenantId"
                  :index="scope.num"
                ></school-li-row>
              </template>
            </infinite-scroll>
          </div>
          <!-- <v-calendar /> -->
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
        :append-to-body="true"
      >
        <gover-recipe-detail />
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
import GoverRecipeDetail from "./goverRecipeDetail.vue";
import Week from "../../components/week.vue";
export default {
  components: {
    infiniteScroll,
    LiRow,
    VCalendar,
    SchoolLiRow,
    GoverRecipeDetail,
    Week,
  },
  data() {
    return {
      cascaderOptions: [], //病假症状区域值，省市区
      cascaderOptions1: [], //病假症状区域值，省市
      zfOrgCount: {
        region: "",
        orgCount: 0,
        foodCount: 0,
        dishCount: 0,
        recipeCount: 0,
      },

      nutrientData: {
        region: "",
        legendData: [
          "蛋白质",
          "脂肪", //fat
          "钙", //ca
          "钠", //na
          "铁", //fe
          "锌", //zn
          "维生素A", //va
          "维生素B1", //vb1
          "维生素B2", //vb2
          "维生素C", //vc
        ],
        seriesData: {
          ca: [],
          dateStr: [],
          dbz: [],
          fat: [],
          fe: [],
          na: [],
          power: [],
          va: [],
          vb1: [],
          vb2: [],
          vc: [],
          zn: [],
        },
      },
      //病假症状排行数据
      leaveSymptoms: {
        region: "",
        seriesData: {
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
          regionName: [],
          total: [],
          wsNum: [],
          yhNum: [],
          ytNum: [],
        },
      },
      //过敏食材分布图数据
      allergyFood: {
        region: "",
        tenantId: "",
        orgCodeOptions: [],
        indicatorData: [],
        seriesData: [],
      },
      //学生每人每日营养素提取（DRIs）
      everyDayNutrient: {
        region: "",
        tenantId: "",
        tenantId: "",
        dateRange: [],
        orgCodeOptions: [],
        radarIndicator: [
          { name: "能量" },
          { name: "蛋白质" },
          { name: "脂肪" },
          { name: "碳水化合物" },
          { name: "钙" },
          { name: "钠" },
          { name: "铁" },
          { name: "锌" },
          { name: "维生素A" },
          { name: "维生素B1" },
          { name: "维生素B2" },
          { name: "维生素C" },
        ],
        seriesData: [],
      },
      //学生每人每日进食量分布
      everyDayEat: {
        region: "",
        tenantId: "",
        dateRange: [],
        seriesData: [],
        orgCodeOptions: [],
      },
      //最受欢迎菜品
      goverDishTotal: {
        finished: false,
        current: 1,
        region: "",
        WeekInfo: {
          stockTimeStr: "", //周期标题
          startTime: "",
          endTime: "",
        },
        liData: [],
      },
      //食谱健康排行榜
      goverRecipeTotal: {
        finished: false,
        current: 1,
        region: "",
        tenantId: "",
        WeekInfo: {
          stockTimeStr: "", //周期标题
          startTime: "",
          endTime: "",
        },
        liData: [],
        orgCodeOptions: [],
      },
      count: 10,
      loading: false,
      noMore: false,
      dialogVisible: false,
    };
  },
  mounted() {
    this.getProvinces(2);
    this.getProvinces(1);
    this.getAllergyFoodRadar();
    this.getNutrientLine();
    this.getZfOrgCount();
    this.getEveryDayNutrientPic();
    this.getEveryDayEatPic();
    this.getLeaveSymptomsBar();
    // this.getGoverRecipeTotal();
    // this.getGoverDishTotal();
  },
  methods: {
    //查看食谱的菜谱
    protocol(tenantId) {
      this.axios({
        url: "api/blade-food/recipe/goverRecipeDetail",
        method: "get",
        params: {
          tenantId: tenantId,
          startTime: this.goverRecipeTotal.dateRange[0],
          endTime: this.goverRecipeTotal.dateRange[1],
        },
      }).then((res) => {});
    },

    // load() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.count += 2;
    //     this.loading = false;
    //   }, 2000);
    // },
    //获取区域选择内容
    getProvinces(flag) {
      this.$axios
        .get("api/blade-system/region/getManagerArea", {
          params: {
            flag: flag,
          },
        })
        .then((res) => {
          if (flag == 1) {
            this.cascaderOptions = res.data.data; //省市区
          } else {
            this.cascaderOptions1 = res.data.data; //病假症状区域值，省市
          }
        });
    },
    //区域选择值改变
    cascaderChange(e, val) {
      console.log(e);
      console.log(val);
      var areaCode = null;
      if (val instanceof Array) {
        areaCode = val.slice(-1)[0];
      }
      this.axios({
        url: "api/blade-system/region/getTenantListByCode",
        method: "get",
        params: {
          areaCode: areaCode,
        },
      }).then((res) => {
        e.orgCodeOptions = res.data.data;
        console.log(this.goverRecipeTotal.orgCodeOptions);
      });
    },
    //营养素摄入量分析
    nutrientLine() {
      let chartLine = this.$echarts.init(
        document.getElementById("nutrientLine")
      );
      let legendDataVal = [
        "dbz",
        "fat",
        "ca",
        "na",
        "fe",
        "zn",
        "va",
        "vb1",
        "vb2",
        "vc",
      ];
      var seriesData = [];
      for (let i = 0; i < legendDataVal.length; i++) {
        seriesData.push({
          name: this.nutrientData.legendData[i],
          type: "bar",
          stack: "蛋白质",
          barWidth: 30,
          data: this.nutrientData.seriesData[legendDataVal[i]],
        });
      }
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: this.nutrientData.legendData,
        },
        xAxis: {
          //设置x轴
          type: "category",
          data: this.nutrientData.seriesData.dateStr,
        },
        yAxis: {
          type: "value",
        },
        series: seriesData,
      };

      // 使用刚指定的配置项和数据显示图表。
      chartLine.setOption(option);
    },
    //病假症状排行
    leaveSymptomsBar() {
      let chartLine = this.$echarts.init(
        document.getElementById("leaveSymptomsBar")
      );
      var optionData = [
        { gmNum: "感冒" },
        { ksNum: "咳嗽" },
        { frNum: "发热" },
        { cwNum: "肠胃不适" },
        { pzPNum: "皮疹" },
        { fxNum: "腹泻" },
        { hdNum: "黄疸" },
        { jmhzNum: "结膜红肿" },
        { otNum: "呕吐" },
        { ytNum: "牙疼" },
        { wsNum: "外伤" },
        { yhNum: "咽喉" },
        { qtNum: "其他" },
      ];
      var legendData = [];
      var seriesData = [];
      for (let i = 0; i < optionData.length; i++) {
        for (let k in optionData[i]) {
          legendData.push(optionData[i][k]);
          seriesData.push({
            name: optionData[i][k],
            type: "bar",
            stack: "感冒",
            barWidth: 30,
            data: this.leaveSymptoms.seriesData[k],
          });
        }
      }
      console.log(this.leaveSymptoms.seriesData.regionName);
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
          data: legendData,
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
            data: this.leaveSymptoms.seriesData.regionName,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: seriesData,
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
          left: "35%",
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
          radius: "70%",
          center: ["40%", "50%"],
          indicator: this.allergyFood.indicatorData,
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: this.allergyFood.seriesData,
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
        tooltip: {},
        legend: {
          data: ["要求比例", "实际比例"],
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
          radius: "70%",
          indicator: this.everyDayNutrient.radarIndicator,
        },
        series: [
          {
            type: "radar", // 类型为饼图
            data: [
              {
                value: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
                name: "要求比例",
              },
            ],
            areaStyle: {
              opacity: 0.4,
            },
            z: 1,
            // ,
          },
          {
            type: "radar", // 类型为饼图
            data: [
              {
                value: this.everyDayNutrient.seriesData,
                name: "实际比例",
              },
            ],
            areaStyle: {
              opacity: 0.4,
            },
            z: 2,
            // ,
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
        tooltip: {},
        legend: {
          data: ["推荐最大量", "推荐最小量", "实际用量"],
          left: "25%",
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
          radius: "70%",
          center: ["40%", "50%"],
          indicator: [
            { name: "谷类" },
            { name: "蔬菜" },
            { name: "水果" },
            { name: "乳制品" },
            { name: "大豆" },
            { name: "食盐" },
            { name: "食用油" },
            { name: "畜禽肉类-蛋类-水产品" },
          ],
        },
        series: [
          {
            type: "radar", // 类型为雷达图
            data: [
              {
                value: [150, 300, 250, 500, 20, 3, 25, 125],
                name: "推荐最大量",
              },
            ],
            areaStyle: {
              opacity: 0.4,
            },
            z: 1,
            // ,
          },
          {
            type: "radar", // 类型为雷达图
            data: [
              {
                value: [100, 150, 150, 350, 10, 0, 20, 100],
                name: "推荐最小量",
              },
            ],
            areaStyle: {
              opacity: 0.4,
            },
            z: 2,
            // ,
          },
          {
            type: "radar", // 类型为雷达图
            data: [
              {
                value: this.everyDayEat.seriesData,
                name: "实际用量",
              },
            ],
            areaStyle: {
              opacity: 0.4,
            },
            z: 3,
            // ,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      chartPie.setOption(option);
    },
    //获取营养素摄入量分析数据
    getNutrientLine() {
      var areaCode = null;
      if (this.nutrientData.region instanceof Array) {
        areaCode = this.nutrientData.region.slice(-1)[0];
      }
      this.axios({
        url: "/api/blade-food/report/nutriCount",
        method: "post",
        data: { areaCode: areaCode },
      }).then((res) => {
        res.data.data.forEach((el) => {
          for (let k in el) {
            this.nutrientData.seriesData[k].push(el[k]);
          }
        });
        this.nutrientLine();
      });
    },
    //获取病假症状排行
    getLeaveSymptomsBar() {
      var areaCode = "";
      if (this.leaveSymptoms.region instanceof Array) {
        areaCode = this.leaveSymptoms.region.slice(-1)[0];
      }
      this.axios({
        url: "/api/blade-food/report/zfBjTypeCount",
        method: "get",
        params: {
          // areaCode: "1501",
          areaCode: areaCode,
        },
      }).then((res) => {
        res.data.data.forEach((el) => {
          for (let k in el) {
            this.leaveSymptoms.seriesData[k].push(el[k]);
          }
        });
        this.leaveSymptomsBar();
      });
    },
    //获取过敏食材分布图
    getAllergyFoodRadar() {
      var areaCode = null;
      if (this.allergyFood.region instanceof Array) {
        areaCode = this.allergyFood.region.slice(-1)[0];
      }
      this.cascaderChange(this.allergyFood, this.allergyFood.region);
      this.axios({
        url: "/api/blade-food/report/allergyFoodCount",
        method: "post",
        data: {
          areaCode: areaCode, //区域
          orgCode: this.allergyFood.orgCode, //机构
        },
      })
        .then((res) => {
          console.log("getAllergyFoodRadar");
          if (res.data.data.allergyFoodDTOS != null) {
            console.log("getAllergyFoodRadar2");
            res.data.data.allergyFoodDTOS.forEach((el) => {
              this.allergyFood.indicatorData.push({
                name: el.foodName,
              });
              this.allergyFood.seriesData.push(el.num);
            });
            console.log(this.allergyFood.indicatorData);
            console.log(this.allergyFood.seriesData);
          }

          this.allergyFoodRadar();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取学生每人每日营养素提取
    getEveryDayNutrientPic() {
      var areaId = null;
      if (this.everyDayNutrient.region instanceof Array) {
        areaId = this.everyDayNutrient.region.slice(-1)[0];
      }
      this.cascaderChange(this.everyDayNutrient, this.everyDayNutrient.region);
      if (this.everyDayNutrient.dateRange != null) {
        var startTime = this.everyDayNutrient.dateRange[0];
        var endTime = this.everyDayNutrient.dateRange[1];
      }
      this.axios({
        url: "/api/blade-food/recipe/getStuNutrition",
        method: "get",
        params: {
          startTime: startTime,
          endTime: endTime,
          areaId: areaId,
          tenantId: this.everyDayNutrient.tenantId,
        },
      })
        .then((res) => {
          this.everyDayNutrient.seriesData = res.data.data;
          this.everyDayNutrientPic();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取学生每人每日进食量分布
    getEveryDayEatPic() {
      var areaId = null;
      if (this.everyDayEat.region instanceof Array) {
        areaId = this.everyDayEat.region.slice(-1)[0];
      }
      this.cascaderChange(this.everyDayEat, this.everyDayEat.region);
      this.axios({
        url: "/api/blade-food/recipe/getStuRecipeCal",
        method: "get",
        params: {
          startTime: this.everyDayEat.dateRange[0],
          endTime: this.everyDayEat.dateRange[1],
          areaId: areaId,
          tenantId: this.everyDayEat.tenantId,
        },
      }).then((res) => {
        this.everyDayEat.seriesData = res.data.data;
        this.everyDayEatPic();
      });
    },
    beforeGetGoverDishTotal(WeekInfo) {
      if (WeekInfo) {
        this.goverDishTotal.WeekInfo = WeekInfo;
      }
      this.goverDishTotal.liData = [];
      this.goverDishTotal.current = 1;
      this.goverDishTotal.finished = false;
      this.getGoverDishTotal();
      console.log("beforeGetGoverDishTotal");
    },
    //获取最受欢迎菜品
    getGoverDishTotal() {
      console.log("getGoverDishTotal");
      if (this.goverDishTotal.finished) {
        return;
      }
      var areaId = null;
      if (this.goverDishTotal.region instanceof Array) {
        areaId = this.goverDishTotal.region.slice(-1)[0];
      }
      this.axios({
        url: "/api/blade-food/food/goverDishTotal",
        method: "get",
        params: {
          areaId: areaId,
          current: this.goverDishTotal.current,
          size: 10,
          startTime: this.goverDishTotal.WeekInfo.startTime.substr(0, 10),
          endTime: this.goverDishTotal.WeekInfo.endTime.substr(0, 10),
        },
      })
        .then((res) => {
          res.data.data.records.forEach((element) => {
            this.goverDishTotal.liData.push(element);
          });
          if (res.data.data.records.length < 10) {
            this.goverDishTotal.finished = true;
          }
          this.goverDishTotal.current++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beforeGetGoverRecipeTotal(WeekInfo) {
      if (WeekInfo) {
        this.goverRecipeTotal.WeekInfo = WeekInfo;
      }
      this.goverRecipeTotal.liData = [];
      this.goverRecipeTotal.finished = false;
      this.getGoverRecipeTotal();
      this.goverRecipeTotal.current = 1;
    },
    //获取食谱健康排行榜
    getGoverRecipeTotal() {
      if (this.goverRecipeTotal.finished) {
        return;
      }
      var areaId = null;
      if (this.goverRecipeTotal.region instanceof Array) {
        areaId = this.goverRecipeTotal.region.slice(-1)[0];
      }
      var tenantId = this.goverRecipeTotal.tenantId;
      this.cascaderChange(this.goverRecipeTotal, this.goverRecipeTotal.region);
      this.axios({
        url: "/api/blade-food/food/goverRecipeTotal",
        method: "get",
        params: {
          areaId: areaId,
          tenantId: tenantId,
          current: this.goverRecipeTotal.current,
          size: 10,
          startTime: this.goverRecipeTotal.WeekInfo.startTime.substr(0, 10),
          endTime: this.goverRecipeTotal.WeekInfo.endTime.substr(0, 10),
        },
      }).then((res) => {
        if (res.data.data.records.length < 10) {
          this.goverRecipeTotal.finished = true;
        }
        this.goverRecipeTotal.current++;
        res.data.data.records.forEach((element) => {
          this.goverRecipeTotal.liData.push(element);
        });
      });
    },
    getZfOrgCount() {
      var areaCode = "";
      if (this.zfOrgCount.region instanceof Array) {
        areaCode = this.zfOrgCount.region.slice(-1)[0];
      }
      this.axios({
        url: "/api/blade-food/report/zfOrgCount",
        method: "get",
        params: {
          areaCode: areaCode,
        },
      }).then((res) => {
        this.zfOrgCount.orgCount = res.data.data.orgCount;
        this.zfOrgCount.foodCount = res.data.data.foodCoun;
        this.zfOrgCount.dishCount = res.data.data.dishCount;
        this.zfOrgCount.recipeCount = res.data.data.recipeCount;
      });
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