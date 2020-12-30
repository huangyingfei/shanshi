<template>
  <div>
    <el-table
      :data="foodTable"
      style="width: 100%"
      border
      :height="tableHeight"
    >
      <el-table-column type="index" label="序号" width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="foodName"
        label="食材名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="foodTypeName"
        label="食材类别"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column label="配送方式" width="120" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.transMode">
            <el-option label="按天" :value="1"></el-option>
            <el-option label="按周" :value="2"></el-option>
            <el-option label="按月" :value="3"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="120" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.unit">
            <el-option label="Kg" value="Kg"></el-option>
            <el-option label="包" value="包"></el-option>
            <el-option label="斤" value="斤"></el-option>
            <el-option label="桶" value="桶"></el-option>
            <el-option label="瓶" value="瓶"></el-option>
            <el-option label="箱" value="箱"></el-option>
            <el-option label="袋" value="袋"></el-option>
            <el-option label="盒" value="盒"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="换算关系" width="150" align="center">
        <template slot-scope="scope">
          <div class="flex-box">
            <label style="white-space: nowrap">1{{ scope.row.unit }}=</label>
            <el-input-number
              v-model="scope.row.convert"
              :controls="false"
            ></el-input-number>
            <!-- <el-input v-model="scope.row.convert"></el-input> -->
            <label style="white-space: nowrap">Kg</label>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="150" align="center">
        <template slot-scope="scope">
          <div class="flex-box">
            <!-- <el-input v-model="scope.row.price"></el-input> -->
            <el-input-number
              v-model="scope.row.price"
              :controls="false"
            ></el-input-number>
            <label style="white-space: nowrap">元/斤</label>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.supplier"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    foodTable: {
      type: Array,
    },
  },
  data() {
    return {
      tableHeight: 600,
    };
  },
  created() {
    this.getHeight();
    //增加监听事件，窗口变化时得到高度。
    window.addEventListener("resize", this.getHeight, false);
  },
  methods: {
    getHeight() {
      //获取浏览器高度并计算得到表格所用高度。
      var tableHeight = document.documentElement.clientHeight - 300;
      if (tableHeight > 10) {
        this.tableHeight = tableHeight;
      }

      console.log(this.tableHeight);
    },
  },
};
</script>

<style scoped>
.flex-box {
  display: flex;
  align-items: center;
}
.flex-box .el-input-number {
  padding: 0px 5px 0px 5px;
}
</style>