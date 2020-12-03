<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="recipeTableData"
          border
          style="width: 100% "
          class="recipeTableWeekData"
        >
          <el-table-column type="index" :index="indexMethod"> </el-table-column>
          <el-table-column prop="week1" label="周一" width="180">
          </el-table-column>
          <el-table-column prop="week2" label="周二" width="180">
          </el-table-column>
          <el-table-column prop="week3" label="周三"> </el-table-column>
          <el-table-column prop="week4" label="周四" width="180">
          </el-table-column>
          <el-table-column prop="week5" label="周五" width="180">
          </el-table-column>
          <el-table-column prop="week6" label="周六"> </el-table-column>
          <el-table-column prop="week7" label="周日"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: toolbar,
  props: {
    transmitData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      recipeTableData: [], //弹窗
      dialogListData: {
        recipeName: "",
        recipeDay: "",
        isUse: "",
        orgName: "",
        createName: "",
        createTime: ""
      }
    };
  },
  beforeMount() {
    this.horizontal();
  },
  methods: {
    indexMethod(index) {
      let _tableLineHead = ["早餐", "早点", "午餐", "午点", "晚餐", "晚点"];
      return _tableLineHead[index];
    },
    overview(term) {
      console.log(term);
    },
    horizontal() {
      console.log(this.transmitData);
      //   this.$axios
      //     .get(`/api/blade-food/recipe/detail?id=${this.term}`, {})
      //     .then(res => {
      //       let recipeCycles = res.data.data.recipeCycles;
      //       let recipeTableData1 = [];
      //       let recipeTableData = {
      //         mealsType1: [],
      //         mealsType2: [],
      //         mealsType3: [],
      //         mealsType4: [],
      //         mealsType5: [],
      //         mealsType6: []
      //       };
      //       for (let i in recipeCycles) {
      //         let mealsTypeNum = recipeCycles[i].mealsType;
      //         switch (mealsTypeNum) {
      //           case 1:
      //             recipeTableData.mealsType1.push(recipeCycles[i]);
      //             break;
      //           case 2:
      //             recipeTableData.mealsType2.push(recipeCycles[i]);
      //             break;
      //           case 3:
      //             recipeTableData.mealsType3.push(recipeCycles[i]);
      //             break;
      //           case 4:
      //             recipeTableData.mealsType4.push(recipeCycles[i]);
      //             break;
      //           case 5:
      //             recipeTableData.mealsType5.push(recipeCycles[i]);
      //             break;
      //           case 6:
      //             recipeTableData.mealsType6.push(recipeCycles[i]);
      //             break;
      //           default:
      //             break;
      //         }
      //       }
      //       for (let key in recipeTableData) {
      //         var weekData = {
      //           week1: "",
      //           week2: "",
      //           week3: "",
      //           week4: "",
      //           week5: "",
      //           week6: "",
      //           week7: ""
      //         };
      //         for (let index = 0; index < recipeTableData[key].length; index++) {
      //           var weekNum = "week" + recipeTableData[key][index].week;
      //           // weekData[weekNum].push(recipeTableData[key][index].recipeConncts[0].dishName)
      //           weekData[weekNum] +=
      //             recipeTableData[key][index].recipeConncts[0].dishName + "\n";
      //         }
      //         console.log(weekData);
      //         recipeTableData1.push(weekData);
      //       }
      //       this.recipeTableData = recipeTableData1;
      //     });
    }
  }
};
</script>
