<template>
  <div class="food-warehouse-box">
    <food-warehouse-header @getFoodTable="beforeGetFoodTable" />
    <food-table :foodTable="foodPriceTable" />
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 40, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import FoodTable from "./foodTable.vue";
import foodWarehouseHeader from "./foodWarehouseHeader.vue";
export default {
  props: {
    searchType: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  components: { foodWarehouseHeader, FoodTable },
  data() {
    return {
      foodPriceTable: [],
      currentPage: 1,
      size: 10,
      total: 200,
    };
  },
  methods: {
    beforeGetFoodTable(param) {
      //查询条件处理
      var params = {
        searchType: this.searchType,
      };
      for (const k in param) {
        if (param[k] !== "") {
          params[k] = param[k];
        }
      }
      this.getFoodTable(params);
    },
    getFoodTable(params) {
      this.axios({
        url: "/api/blade-food/foodmanager/list",
        method: "get",
        params,
      }).then((res) => {
        this.foodPriceTable = res.data.data.records;
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  line-height: 40px;
}
.block {
  margin-top: 20px;
  float: right;
}
</style>
