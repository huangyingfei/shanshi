<template>
  <basic-container>
    <div>
      <div>
        <el-row>
          <el-col :span="24">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="区域选择">
                <el-cascader
                  :options="cascaderOptions"
                  :props="{ label: 'name', value: 'id' }"
                  :show-all-levels="false"
                  clearable
                  v-model="areaId"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="机构选择">
                <el-select
                  v-model="govForm.tenantId"
                  filterable
                  clearable
                  placeholder="请输入关键词"
                  @change="beforeGetGoverRecipeTotal"
                >
                  <el-option
                    v-for="item in tenantIdOptions"
                    :key="item.tenantId"
                    :label="item.tenantName"
                    :value="item.tenantId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <week dateLabel="时间" @weekChange="weekChange" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="govInit">查询</el-button>
              </el-form-item>
            </el-form>
            <!-- <div class="die-healthyt-box">
              <label>区域选择</label>
              <el-cascader
                :options="cascaderOptions"
                :props="{ label: 'name', value: 'id' }"
                :show-all-levels="false"
                clearable
                v-model="areaId"
              ></el-cascader>
            </div>
            <div class="die-healthyt-box">
              <label>机构选择</label>
              <el-select
                v-model="govForm.tenantId"
                filterable
                clearable
                placeholder="请输入关键词"
                @change="beforeGetGoverRecipeTotal"
              >
                <el-option
                  v-for="item in tenantIdOptions"
                  :key="item.tenantId"
                  :label="item.tenantName"
                  :value="item.tenantId"
                >
                </el-option>
              </el-select>
            </div>
            <div class="die-healthyt-box">
              <week dateLabel="时间" @weekChange="weekChange" />
            </div>
            <div class="die-healthyt-box">
              <el-button type="primary" @click="govInit">查询</el-button>
            </div> -->
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="12">
                <h4>数据看板</h4>
                <div>
                  <el-row :gutter="5">
                    <el-col :span="8">
                      <div class="item">
                        <div class="item-icon">
                          <el-avatar> icon </el-avatar>
                        </div>
                        <div class="item-info">
                          <span>{{ zfOrgCount.orgCount }}</span>
                          <div>机构总量</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">
                        <div class="item-icon">
                          <el-avatar> icon </el-avatar>
                        </div>
                        <div class="item-info">
                          <span>{{ zfOrgCount.foodCount }}</span>
                          <div>食材总量</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">
                        <div class="item-icon">
                          <el-avatar> icon </el-avatar>
                        </div>
                        <div class="item-info">
                          <span>{{ zfOrgCount.foodAdd }}</span>
                          <div>使用食材量</div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :span="8">
                      <div class="item">
                        <div class="item-icon">
                          <el-avatar> icon </el-avatar>
                        </div>
                        <div class="item-info">
                          <span>{{ zfOrgCount.recipeCount }}</span>
                          <div>食谱总量</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">
                        <div class="item-icon">
                          <el-avatar> icon </el-avatar>
                        </div>
                        <div class="item-info">
                          <span>{{ zfOrgCount.dishCount }}</span>
                          <div>菜品总量</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">
                        <div class="item-icon">
                          <el-avatar> icon </el-avatar>
                        </div>
                        <div class="item-info">
                          <span>{{ zfOrgCount.dishAdd }}</span>
                          <div>使用菜品量</div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12">
                <h4>食谱综合评分</h4>
                <div
                  id="recipeScorePie"
                  style="width: 100%; height: 300px"
                ></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <h4>学生每人每日营养素提取（DRIs）</h4>
                <div
                  id="everyDayNutrientPic"
                  style="width: 100%; height: 300px"
                ></div>
              </el-col>
              <el-col :span="12">
                <h4>学生每人每日进食量分布</h4>
                <div
                  id="everyDayEatPic"
                  style="width: 100%; height: 300px"
                ></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <h4>过敏食材分布图</h4>
                <div
                  id="allergyFoodRadar"
                  style="width: 100%; height: 300px"
                ></div>
              </el-col>
              <el-col :span="12">
                <h4>学生出勤率</h4>
                <div style="text-align: center">
                  <el-date-picker
                    v-model="govForm.dateStr"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="getStudentAttendancePie"
                  >
                  </el-date-picker>
                </div>

                <div
                  id="studentAttendancePie"
                  style="width: 100%; height: 300px"
                ></div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <h4>病假症状排行</h4>
                <div
                  id="leaveSymptomsBar"
                  style="width: 100%; height: 300px"
                ></div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-tabs v-model="activeName">
              <el-tab-pane label="食谱综合评分排行榜" name="first">
                <!-- <div>
                  <el-switch
                    style="display: block"
                    v-model="recipeFlag"
                    active-color="#13ce66"
                    inactive-color="#409EFF"
                    active-text="升序"
                    inactive-text="降序"
                    @change="beforeGetGoverRecipeTotal"
                  >
                  </el-switch>
                </div> -->
                <div>
                  <el-row style="text-align: center">
                    <el-col :span="16"> </el-col>
                    <el-col :span="8">
                      <el-button
                        type="text"
                        style="padding: 0px"
                        @click="recipeSortClick"
                      >
                        <i
                          class="el-icon-sort-down el-icon--right"
                          :class="{
                            'el-icon-sort-down': isRecipe,
                            'el-icon-sort-up': !isRecipe,
                          }"
                        ></i>
                        排序
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
                <div style="width: 100%; height: 1488px; overflow: hidden">
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
              </el-tab-pane>
              <el-tab-pane label="最受欢迎菜品" name="second">
                <keep-alive>
                  <div>
                    <div>
                      <el-row style="text-align: center">
                        <el-col :span="16"> </el-col>
                        <el-col :span="8">
                          <el-button
                            type="text"
                            style="padding: 0px"
                            @click="dishSortClick"
                          >
                            <i
                              class="el-icon-sort-down el-icon--right"
                              :class="{
                                'el-icon-sort-down': isDish,
                                'el-icon-sort-up': !isDish,
                              }"
                            ></i>
                            排序
                          </el-button>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="height: 1488px; overflow: hidden">
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
                  </div>
                </keep-alive>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-dialog
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose"
          :append-to-body="true"
        >
          <gover-recipe-detail :recipeData="recipeData" />
        </el-dialog>
      </div>
      <div style="height: 20px; display: block"></div>
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
import { dateFormat } from "../../util/date";

export default {
  components: {
    infiniteScroll,
    LiRow,
    VCalendar,
    SchoolLiRow,
    GoverRecipeDetail,
    Week,
  },
  watch: {
    areaId: function (newval, oldVal) {
      this.govForm.areaId = newval[2];
      this.cascaderChange();
    },
  },

  data() {
    return {
      isDish: true,
      isRecipe: true,
      activeName: "first",
      tenantIdOptions: [],
      areaId: [],
      dishFlag: true, //最受欢迎菜品升降序
      recipeFlag: true, //食谱综合评分升降序
      govForm: {
        areaId: "", //区域ID
        tenantId: "", //租户id
        startTime: "", //必传
        endTime: "", //必传
        dateStr: dateFormat(new Date(), "yyyy-MM-dd"),
      },
      cascaderOptions: [], //省市区
      zfOrgCount: {
        orgCount: 0, //
        foodCount: 0,
        dishCount: 0,
        recipeCount: 0,
        foodAdd: 0,
        dishAdd: 0,
      },
      recipeData: {},
      nutrientData: {
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
        indicatorData: [],
        seriesData: [],
      },
      //学生每人每日营养素提取（DRIs）
      everyDayNutrient: {
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
        seriesData: [],
        orgCodeOptions: [],
      },

      //最受欢迎菜品
      goverDishTotal: {
        finished: false,
        current: 1,
        liData: [],
      },
      //食谱综合评分排行榜
      goverRecipeTotal: {
        finished: false,
        current: 1,
        liData: [],
        orgCodeOptions: [],
      },
      //学生出勤率
      studentAttendance: {
        bj: 0,
        cq: 0,
        sj: 0,
      },
      recipeScore: {
        bhg: 0,
        hg: 0,
        yx: 0,
      },
      dialogVisible: false,
    };
  },
  mounted() {
    this.govInit();
  },
  methods: {
    recipeSortClick() {
      this.isRecipe = !this.isRecipe;
      this.beforeGetGoverRecipeTotal();
    },
    dishSortClick() {
      this.isDish = !this.isDish;
      this.beforeGetGoverDishTotal();
    },
    govInit() {
      this.getProvinces();
      this.getAllergyFoodRadar();
      this.getZfOrgCount();
      this.getEveryDayNutrientPic();
      this.getEveryDayEatPic();
      this.getLeaveSymptomsBar();
      this.beforeGetGoverRecipeTotal();
      this.beforeGetGoverDishTotal();
      this.getRecipeScorePie();
      this.getStudentAttendancePie();
    },
    //查看食谱的菜谱
    protocol(tenantId) {
      this.dialogVisible = true;
      this.axios({
        url: "api/blade-food/recipe/goverRecipeDetail",
        method: "get",
        params: {
          tenantId: tenantId,
          startTime: this.goverRecipeTotal.WeekInfo.startTime,
          endTime: this.goverRecipeTotal.WeekInfo.endTime,
        },
      }).then((res) => {
        this.recipeData = res.data.data;
      });
    },
    //获取区域选择内容
    getProvinces() {
      this.$axios
        .get("api/blade-system/region/getManagerArea", {
          params: {
            flag: 1,
          },
        })
        .then((res) => {
          this.cascaderOptions = res.data.data; //省市区
        });
    },
    //区域选择值改变
    cascaderChange() {
      this.axios({
        url: "api/blade-system/region/getTenantListByCode",
        method: "get",
        params: {
          areaId: this.govForm.areaId,
        },
      }).then((res) => {
        this.tenantIdOptions = res.data.data;
      });
    },
    //获取学生出勤率
    getStudentAttendancePie() {
      this.axios({
        url: "api/blade-food/report/studentWorkCount",
        method: "post",
        data: this.govForm,
      }).then((res) => {
        if (res.data.data != null) {
          this.studentAttendance.bj = res.data.data.bj;
          this.studentAttendance.cq = res.data.data.cq;
          this.studentAttendance.sj = res.data.data.sj;
        }
        this.studentAttendancePie();
      });
    },
    //获取食谱综合评分
    getRecipeScorePie() {
      this.axios({
        url: "api/blade-food/report/recipeScore",
        method: "post",
        data: this.govForm,
      }).then((res) => {
        if (res.data.data != null) {
          this.recipeScore.bhg = res.data.data.bhg;
          this.recipeScore.hg = res.data.data.hg;
          this.recipeScore.yx = res.data.data.yx;
        }
        this.recipeScorePie();
      });
    },
    //学生出勤率
    studentAttendancePie() {
      var chartPie = this.$echarts.init(
        document.getElementById("studentAttendancePie")
      );

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 0,
          left: "center",
          data: ["出勤", "事假", "病假"],
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "40%"],
            selectedMode: "single",
            data: [
              { value: this.studentAttendance.cq, name: "出勤" },
              { value: this.studentAttendance.sj, name: "事假" },
              { value: this.studentAttendance.bj, name: "病假" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      chartPie.setOption(option);
    },
    //食谱综合评分
    recipeScorePie() {
      var chartPie = this.$echarts.init(
        document.getElementById("recipeScorePie")
      );

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 0,
          left: "center",
          data: ["优秀", "合格", "不合格"],
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "40%"],
            selectedMode: "single",
            data: [
              { value: this.recipeScore.yx, name: "优秀" },
              { value: this.recipeScore.hg, name: "合格" },
              { value: this.recipeScore.bhg, name: "不合格" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      chartPie.setOption(option);
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
            data: this.leaveSymptoms.seriesData.dateStr,
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
          left: "center",
          bottom: 10,
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
          radius: "60%",
          center: ["50%", "50%"],
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
          bottom: 0,
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
            },
          },
          radius: "60%",
          center: ["50%", "50%"],
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
          left: "center",
          bottom: 0,
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
            },
          },
          radius: "60%",
          center: ["50%", "50%"],
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
    //已作废
    getNutrientLine() {
      this.axios({
        url: "/api/blade-food/report/nutriCount",
        method: "post",
        data: this.govForm,
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
      this.axios({
        url: "/api/blade-food/report/zfBjTypeCount",
        method: "post",
        data: this.govForm,
      }).then((res) => {
        res.data.data.forEach((el) => {
          for (let k in el) {
            this.leaveSymptoms.seriesData[k].push(el[k]);
          }
        });
        console.log(this.leaveSymptoms.seriesData);
        this.leaveSymptomsBar();
      });
    },
    //获取过敏食材分布图
    getAllergyFoodRadar() {
      this.axios({
        url: "/api/blade-food/report/allergyFoodCount",
        method: "post",
        data: this.govForm,
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
      this.axios({
        url: "/api/blade-food/recipe/getStuNutrition",
        method: "get",
        params: this.govForm,
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
      this.axios({
        url: "/api/blade-food/recipe/getStuRecipeCal",
        method: "get",
        params: this.govForm,
      }).then((res) => {
        this.everyDayEat.seriesData = res.data.data;
        this.everyDayEatPic();
      });
    },
    //获取最受欢迎菜品
    beforeGetGoverDishTotal() {
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
      this.axios({
        url: "/api/blade-food/food/goverDishTotal",
        method: "get",
        params: {
          ...this.govForm,
          current: this.goverDishTotal.current,
          size: 20,
          flag: this.dishFlag,
        },
      })
        .then((res) => {
          res.data.data.records.forEach((element) => {
            this.goverDishTotal.liData.push(element);
          });
          if (res.data.data.records.length < 20) {
            this.goverDishTotal.finished = true;
          }
          this.goverDishTotal.current++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    weekChange(WeekInfo) {
      this.govForm.startTime = WeekInfo.startTime.substr(0, 10);
      this.govForm.endTime = WeekInfo.endTime.substr(0, 10);
    },
    //获取食谱健康排行榜
    beforeGetGoverRecipeTotal() {
      this.goverRecipeTotal.liData = [];
      this.goverRecipeTotal.finished = false;
      this.goverRecipeTotal.current = 1;
      this.getGoverRecipeTotal();
    },
    //获取食谱健康排行榜
    getGoverRecipeTotal() {
      if (this.goverRecipeTotal.finished) {
        return;
      }
      this.axios({
        url: "/api/blade-food/food/goverRecipeTotal",
        method: "get",
        params: {
          ...this.govForm,
          current: this.goverRecipeTotal.current,
          size: 20,
          flag: this.recipeFlag,
        },
      }).then((res) => {
        if (res.data.data.records.length < 20) {
          this.goverRecipeTotal.finished = true;
        }
        this.goverRecipeTotal.current++;
        res.data.data.records.forEach((element) => {
          this.goverRecipeTotal.liData.push(element);
        });
      });
    },
    //获取数据看板
    getZfOrgCount() {
      this.axios({
        url: "/api/blade-food/report/zfOrgCount",
        method: "post",
        data: this.govForm,
      }).then((res) => {
        this.zfOrgCount.orgCount = res.data.data.orgCount;
        this.zfOrgCount.foodCount = res.data.data.foodCount;
        this.zfOrgCount.dishCount = res.data.data.dishCount;
        this.zfOrgCount.recipeCount = res.data.data.recipeCount;
        this.zfOrgCount.foodAdd = res.data.data.foodAdd;
        this.zfOrgCount.dishAdd = res.data.data.dishAdd;
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
.count-inline-block {
  display: inline-block;
  height: 40px;
}
.count-inline-block span {
  font-size: 14px;
  display: block;
  line-height: 20px;
  border-radius: 50%;
}
.count-icon {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  background: #c0c4cc;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border-radius: 50%;
}
h4 {
}
.item {
  height: 130px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
}
.item .item-icon {
  width: 50px;
  height: 130px;
  color: #fff;
  text-align: center;
  line-height: 130px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  display: flex;
}
.item .item-info {
  background-color: #fff;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-direction: column;
  flex-direction: column;
  font-weight: bold;
  font-size: 14px;
  color: #303133;
}
.basic-container {
  width: 100%;
}
.el-icon-ascending {
  width: 32px;
  height: 32px;
  line-height: 1;
  display: inline-block;
  background-image: url("/svg/ascending.svg");
}
</style>