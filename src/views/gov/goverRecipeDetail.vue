<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="recipeTableData"
          border
          style="width: 100%"
          class="recipeTableWeekData"
        >
          <el-table-column prop="mealsType" label="" width="100px">
          </el-table-column>
          <el-table-column prop="week1" label="周一"> </el-table-column>
          <el-table-column prop="week2" label="周二"> </el-table-column>
          <el-table-column prop="week3" label="周三"> </el-table-column>
          <el-table-column prop="week4" label="周四"> </el-table-column>
          <el-table-column prop="week5" label="周五"> </el-table-column>
          <el-table-column
            prop="week6"
            label="周六"
            v-if="recipeDay == 6 || recipeDay == 7"
          >
          </el-table-column>
          <el-table-column prop="week7" label="周日" v-if="recipeDay == 7">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    recipeData: {
      type: Object,
    },
  },
  data() {
    return {
      recipeTableData: [], //弹窗
      recipeDay: 5,
    };
  },
  watch: {
    recipeData: {
      handler: "seeRecipeInfo",
      deep: true,
      immediate: true,
    },
  },

  methods: {
    seeRecipeInfo() {
      if (this.recipeData == null) {
        this.recipeTableData = [];
        return;
      }
      this.recipeDay = this.recipeData.recipeDay;
      let recipeCycles = this.recipeData.recipeCycles;
      let recipeTableData1 = [];
      let recipeTableData = {
        mealsType1: [],
        mealsType2: [],
        mealsType3: [],
        mealsType4: [],
        mealsType5: [],
        mealsType6: [],
      };
      for (let i in recipeCycles) {
        let mealsTypeNum = recipeCycles[i].mealsType;
        switch (mealsTypeNum) {
          case 1:
            recipeTableData.mealsType1.push(recipeCycles[i]);
            break;
          case 2:
            recipeTableData.mealsType2.push(recipeCycles[i]);
            break;
          case 3:
            recipeTableData.mealsType3.push(recipeCycles[i]);
            break;
          case 4:
            recipeTableData.mealsType4.push(recipeCycles[i]);
            break;
          case 5:
            recipeTableData.mealsType5.push(recipeCycles[i]);
            break;
          case 6:
            recipeTableData.mealsType6.push(recipeCycles[i]);
            break;
          default:
            break;
        }
      }
      var mealsTypeObj = {
        mealsType1: "早餐",
        mealsType2: "早点",
        mealsType3: "午餐",
        mealsType4: "午点",
        mealsType5: "晚餐",
        mealsType6: "晚点",
      };
      for (let key in recipeTableData) {
        var weekData = {
          mealsType: mealsTypeObj[key],
          week1: "",
          week2: "",
          week3: "",
          week4: "",
          week5: "",
          week6: "",
          week7: "",
        };

        if (recipeTableData[key].length > 0) {
          for (let index = 0; index < recipeTableData[key].length; index++) {
            var weekNum = "week" + recipeTableData[key][index].week;

            // weekData[weekNum].push(recipeTableData[key][index].recipeConncts[0].dishName)
            weekData[weekNum] +=
              recipeTableData[key][index].recipeConncts[0].dishName + "\n";
          }
          console.log(weekData);
          recipeTableData1.push(weekData);
        }
      }
      this.recipeTableData = recipeTableData1;
      console.log(recipeTableData1);
    },
  },
};
</script>
