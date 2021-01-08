<template>
  <div
    style="
      overflow: auto;
      border: 2px solid red;
      position: relative;
      max-height: 600px;
    "
  >
    <div style="width: auto">
      <el-table :data="oneTableData" border>
        <el-table-column label="日期" width="120px" type="index">
          <template> <span>实际进餐人数</span></template>
        </el-table-column>
        <el-table-column :label="week" v-for="week in weekArray" width="350px">
          <template slot-scope="scope">
            <p>人数</p>
            <div style="display: flex; flex-wrap: wrap">
              <div v-for="mealType in mealTypeArray">
                <label>{{ mealType }}</label>
                <el-input-number :controls="false"></el-input-number>
              </div>
            </div>
            <p>折后就餐人数：{{ scope.row.week1 }}人</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="width: auto">
      <el-table :data="oneTableData" border>
        <el-table-column label="日期" width="120px" type="index">
          <template> <span>实际进餐人数</span></template>
        </el-table-column>
        <el-table-column :label="week" v-for="week in weekArray" width="350px">
          <template slot-scope="scope">
            <p>人数</p>
            <div style="display: flex; flex-wrap: wrap">
              <div v-for="mealType in mealTypeArray">
                <label>{{ mealType }}</label>
                <el-input-number :controls="false"></el-input-number>
              </div>
            </div>
            <p>折后就餐人数：{{ scope.row.week1 }}人</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oneTableData: [{ week1: 12 }],
      mealTypeArray: ["早餐", "早点", "午餐", "午点", "晚餐", "晚点"],
      weekArray: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    };
  },
};
</script>

<style scoped>
.el-input-number {
  width: 50px;
}
label {
  font-size: 14px;
  margin-right: 12px;
}
.el-table {
  overflow: visible !important;
}
.el-table__header-wrapper {
  overflow: visible !important;
}
.el-table__body-wrapper {
  overflow: visible !important;
}
</style>