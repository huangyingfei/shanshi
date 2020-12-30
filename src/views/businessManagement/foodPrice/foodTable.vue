<template>
  <div>
    <el-table
      :data="foodTable"
      style="width: 100%"
      border
      :height="tableHeight"
    >
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="foodName" label="食材名称" width="180">
      </el-table-column>
      <el-table-column prop="foodTypeName" label="食材类别" width="180">
      </el-table-column>
      <el-table-column label="配送方式">
        <template slot-scope="scope">
          <el-select v-model="scope.row.transMode" placeholder="请选择">
            <el-option label="按天" value="1"></el-option>
            <el-option label="按周" value="2"></el-option>
            <el-option label="按月" value="3"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template slot-scope="scope">
          <el-select v-model="scope.row.unit" placeholder="请选择">
            <el-option label="Kg" value="全部"></el-option>
            <el-option label="包" value="全部"></el-option>
            <el-option label="斤" value="全部"></el-option>
            <el-option label="桶" value="全部"></el-option>
            <el-option label="瓶" value="全部"></el-option>
            <el-option label="箱" value="全部"></el-option>
            <el-option label="袋" value="全部"></el-option>
            <el-option label="盒" value="全部"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="换算关系">
        <template slot-scope="scope">
          <div>
            <label>1斤=</label>
            <el-input
              v-model="scope.row.convert"
              placeholder="请输入内容"
            ></el-input>
            <label>Kg</label>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <div>
            <el-input
              v-model="scope.row.price"
              placeholder="请输入内容"
            ></el-input>
            <label>元/斤</label>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.supplier"
            placeholder="请输入内容"
          ></el-input>
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

<style>
</style>