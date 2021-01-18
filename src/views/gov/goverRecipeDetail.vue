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
      default: null,
    },
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
        createTime: "",
      },
    };
  },
  beforeMount() {},
  methods: {
    indexMethod(index) {
      let _tableLineHead = ["早餐", "早点", "午餐", "午点", "晚餐", "晚点"];
      return _tableLineHead[index];
    },
  },
};
</script>
