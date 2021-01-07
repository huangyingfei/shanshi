<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">
          <week @weekChange="weekChange"></week>
        </el-col>
        <el-col :span="2"> </el-col>
        <el-col :span="12">
          <label style="font-size: 14px; color: #606266; margin-right: 12px">
            食谱列表</label
          >
          <el-select v-model="recipeValue" placeholder="请选择">
            <el-option
              v-for="item in recipeOptions"
              :key="item.id"
              :label="item.recipeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <form method="post" action="#" id="printJS-form">
        <p style="text-align: center; font-weight: bold; font-size: 16px">
          华园健康智慧幼儿园带量食谱
        </p>
        <el-row>
          <el-col :span="24" style="text-align: right">
            <span>{{ dateRange }}</span>
          </el-col>
        </el-row>
        <!-- 食谱表格开始 -->
        <el-row>
          <el-col :span="24">
            <el-table
              size="small"
              :data="dtos"
              :span-method="dtosSpanMethod"
              class="dtosTable"
              :header-cell-style="rowStyle"
              :cell-style="rowStyle"
            >
              <el-table-column
                label=""
                prop="mealType"
                align="center"
                min-width="50"
              >
              </el-table-column>
              <el-table-column label="星期一(Mon)" align="center">
                <el-table-column label="食谱" min-width="50">
                  <template slot-scope="scope">
                    <el-row v-for="item in scope.row.monRecipeName" :key="item">
                      <el-col :span="24">{{ item }}&nbsp;</el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="带量/人(克)" min-width="60">
                  <template slot-scope="scope">
                    <el-row
                      v-for="(item, index) in scope.row.monFoodName"
                      :key="item"
                    >
                      <div v-if="scope.row.mealType[0] === '日人均总带量'">
                        <el-col :span="24"
                          >{{ scope.row.monValue[index] }}&nbsp;</el-col
                        >
                      </div>
                      <div v-else>
                        <el-col :span="12" style="text-align: left"
                          >{{ item }}&nbsp;</el-col
                        >
                        <el-col :span="12" style="text-align: right"
                          >&nbsp;{{ scope.row.monValue[index] }}</el-col
                        >
                      </div>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="星期二(Tue)" align="center">
                <el-table-column
                  prop="tuesdayRecipe"
                  label="食谱"
                  min-width="50"
                >
                  <template slot-scope="scope">
                    <el-row v-for="item in scope.row.tueRecipeName" :key="item">
                      <el-col :span="24">{{ item }}&nbsp;</el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="带量/人(克)" min-width="60">
                  <template slot-scope="scope">
                    <el-row
                      v-for="(item, index) in scope.row.tueFoodName"
                      :key="item"
                    >
                      <div v-if="scope.row.mealType[0] === '日人均总带量'">
                        <el-col :span="24"
                          >{{ scope.row.tueValue[index] }}&nbsp;</el-col
                        >
                      </div>
                      <div v-else>
                        <el-col :span="12" style="text-align: left"
                          >{{ item }}&nbsp;</el-col
                        >
                        <el-col :span="12" style="text-align: right"
                          >&nbsp;{{ scope.row.tueValue[index] }}</el-col
                        >
                      </div>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="星期三(Wed)" align="center">
                <el-table-column
                  prop="wednesdayRecipe"
                  label="食谱"
                  min-width="50"
                >
                  <template slot-scope="scope">
                    <el-row v-for="item in scope.row.wedRecipeName" :key="item">
                      <el-col :span="24">{{ item }}&nbsp;</el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="带量/人(克)" min-width="60">
                  <template slot-scope="scope">
                    <el-row
                      v-for="(item, index) in scope.row.wedFoodName"
                      :key="item"
                    >
                      <div v-if="scope.row.mealType[0] === '日人均总带量'">
                        <el-col :span="12">{{
                          scope.row.wedValue[index]
                        }}</el-col>
                      </div>
                      <div v-else>
                        <el-col :span="12" style="text-align: left">{{
                          item
                        }}</el-col>
                        <el-col :span="12" style="text-align: right">{{
                          scope.row.wedValue[index]
                        }}</el-col>
                      </div>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="星期四(Thu)" align="center">
                <el-table-column
                  prop="thursdayRecipe"
                  label="食谱"
                  min-width="50"
                >
                  <template slot-scope="scope">
                    <el-row v-for="item in scope.row.thuRecipeName" :key="item">
                      <el-col :span="24">{{ item }}&nbsp;</el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="带量/人(克)" min-width="60">
                  <template slot-scope="scope">
                    <el-row
                      v-for="(item, index) in scope.row.thuFoodName"
                      :key="item"
                    >
                      <div v-if="scope.row.mealType[0] === '日人均总带量'">
                        <el-col :span="24"
                          >{{ scope.row.thuValue[index] }}&nbsp;</el-col
                        >
                      </div>
                      <div v-else>
                        <el-col :span="12" style="text-align: left"
                          >{{ item }}&nbsp;</el-col
                        >
                        <el-col :span="12" style="text-align: right"
                          >&nbsp;{{ scope.row.thuValue[index] }}</el-col
                        >
                      </div>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="星期五(Fri)" align="center">
                <el-table-column
                  prop="fridayRecipe"
                  label="食谱"
                  min-width="50"
                >
                  <template slot-scope="scope">
                    <el-row v-for="item in scope.row.friRecipeName" :key="item">
                      <el-col :span="24">{{ item }}&nbsp;</el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="带量/人(克)" min-width="60">
                  <template slot-scope="scope">
                    <el-row
                      v-for="(item, index) in scope.row.friFoodName"
                      :key="item"
                    >
                      <div v-if="scope.row.mealType[0] === '日人均总带量'">
                        <el-col :span="12">{{
                          scope.row.friValue[index]
                        }}</el-col>
                      </div>
                      <div v-else>
                        <el-col :span="12" style="text-align: left">{{
                          item
                        }}</el-col>
                        <el-col :span="12" style="text-align: right">{{
                          scope.row.friValue[index]
                        }}</el-col>
                      </div>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="星期六(Sat)"
                align="center"
                v-if="satShow"
              >
                <el-table-column
                  prop="saturdayRecipe"
                  label="食谱"
                  min-width="50"
                >
                  <template slot-scope="scope">
                    <el-row v-for="item in scope.row.satRecipeName" :key="item">
                      <el-col :span="24">{{ item }}&nbsp;</el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="带量/人(克)" min-width="60">
                  <template slot-scope="scope">
                    <el-row
                      v-for="(item, index) in scope.row.satFoodName"
                      :key="item"
                    >
                      <div v-if="scope.row.mealType[0] === '日人均总带量'">
                        <el-col :span="12">{{
                          scope.row.satValue[index]
                        }}</el-col>
                      </div>
                      <div v-else>
                        <el-col :span="12" style="text-align: left">{{
                          item
                        }}</el-col>
                        <el-col :span="12" style="text-align: right">{{
                          scope.row.satValue[index]
                        }}</el-col>
                      </div>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="星期日(Sun)"
                align="center"
                v-if="sunShow"
              >
                <el-table-column
                  prop="sundayRecipe"
                  label="食谱"
                  min-width="50"
                >
                  <template slot-scope="scope">
                    <el-row v-for="item in scope.row.sunRecipeName" :key="item">
                      <el-col :span="24">{{ item }}&nbsp;</el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="带量/人(克)" min-width="60">
                  <template slot-scope="scope">
                    <el-row
                      v-for="(item, index) in scope.row.sunFoodName"
                      :key="item"
                    >
                      <div v-if="scope.row.mealType[0] === '日人均总带量'">
                        <el-col :span="12">{{
                          scope.row.sunValue[index]
                        }}</el-col>
                      </div>
                      <div v-else>
                        <el-col :span="12" style="text-align: left">{{
                          item
                        }}</el-col>
                        <el-col :span="12" style="text-align: right">{{
                          scope.row.sunValue[index]
                        }}</el-col>
                      </div>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 食谱表格结束 -->
      </form>
    </div>
    <div class="fixed">
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-button @click="exportRrecipeInfo">导出Excel</el-button>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            onclick="printJS({ 
              printable: 'printJS-form', 
              type: 'html', 
              scanStyles: false
            })"
            >打印</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
import { formateDate } from "@/api/tool/date";
import print from "print-js";
import week from "../../../../components/week.vue";

export default {
  components: { week },
  data() {
    return {
      dtos: [], //食谱表格
      WeekInfo: {},
      recipeOptions: [],
      recipeValue: "",
    };
  },
  computed: {
    satShow: function () {
      return this.WeekInfo.weekType === "6" || this.WeekInfo.weekType === "7";
    },
    sunShow: function () {
      return this.WeekInfo.weekType === "7";
    },
    dateRange: function () {
      let dayNum = parseInt(this.WeekInfo.weekType, 10);
      var startDate = formateDate(
        new Date(this.WeekInfo.weekValue),
        "yyyy-MM-dd"
      );
      var endDateMillisec =
        new Date(this.WeekInfo.weekValue).getTime() +
        1000 * 60 * 60 * 24 * dayNum;
      var endDate = new Date(endDateMillisec);
      endDate = formateDate(endDate, "yyyy-MM-dd");
      return startDate + "~" + endDate;
    },
  },
  mounted() {},
  methods: {
    rowStyle() {
      return {
        border: "1px solid black",
      };
    },
    weekChange(WeekInfo) {
      this.WeekInfo = WeekInfo;
      this.axios({
        method: "get",
        url: "/api/blade-food/recipe/recipelist",
        params: { startTime: WeekInfo.startTime, endTime: WeekInfo.endTime },
      }).then((res) => {
        this.recipeOptions = res.data.data;
      });
    },
    //导出带量食谱报表
    exportRrecipeInfo() {},

    getNutritionDataList(data) {
      console.log(data);
      this.axios({
        method: "get",
        url: "/api/blade-food/recipe/recipelist",
        data: data,
      }).then((res) => {
        var dtos = res.data.data.dtos; //食谱表格
        let mealTypeArray = [];
        let mealTypeDataArray = [];
        var FoodWeekArray = [
          "mealType",
          "monRecipeName",
          "satRecipeName",
          "wedRecipeName",
          "thuRecipeName",
          "friRecipeName",
          "tueRecipeName",
          "sunRecipeName",
        ];
        dtos.forEach((element) => {
          let indexMealType = mealTypeArray.indexOf(element.mealType); //在餐点类型数组中是否存在当前值
          if (indexMealType === -1) {
            //不存在
            mealTypeArray.push(element.mealType); //更新数据至餐点类型数组尾部
            let mealTypeDataObj = {};
            for (let key in element) {
              //当前餐点行数据初始化赋值
              var arr = [];
              if (element.hasOwnProperty(key)) {
                arr.push(element[key] == null ? "" : element[key]);
                mealTypeDataObj[key] = arr;
              }
            }
            mealTypeDataArray.push(mealTypeDataObj);
          } else {
            for (let k in element) {
              if (element.hasOwnProperty(k)) {
                var val = element[k] == null ? " " : element[k];
                if (FoodWeekArray.indexOf(k) === -1) {
                  //是否是食谱列的值
                  mealTypeDataArray[indexMealType][k].push(val); //非食谱列的值直接更新
                } else if (FoodWeekArray.indexOf(k) === 0) {
                  //餐点类型列不做处理
                } else {
                  //当前为食谱类型列
                  if (mealTypeDataArray[indexMealType][k].indexOf(val) === -1) {
                    mealTypeDataArray[indexMealType][k].push(val); //不存在当前菜品直接更新
                  } else {
                    mealTypeDataArray[indexMealType][k].push(" "); //已存在往数组存入‘’
                  }
                }
              }
            }
          }
        });
        this.dtos = mealTypeDataArray; //食谱表格
      });
    },
    doPrintHtml() {
      let newstr = document.getElementById("printMe").innerHTML;
      let oldstr = document.body.innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      document.body.innerHTML = oldstr;
    },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  padding-top: 10px;
  bottom: 5px;
  width: 100%;
  background-color: rgb(255, 255, 255);
}
.dtosTable .el-col {
  margin-bottom: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.el-table--border {
  border: 1px solid #000000 !important;
}
</style>
