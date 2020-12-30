<template>
  <div class="food-warehouse-box">
    <food-warehouse-header
      @getFoodTable="beforeGetFoodTable"
      @clearPrice="clearPrice"
      ref="foodHeader"
    />
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
import { debounce } from "../../../util/debounce";

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
      total: 0,
      selUpdate: false,
    };
  },
  watch: {
    foodPriceTable: {
      handler: function (val, oldVal) {
        console.log(this.selUpdate);
        if (!this.selUpdate) {
          this.saveFoodTable();
        }
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {},
  methods: {
    //清空价格
    clearPrice() {
      console.log("clearPrice");
      this.foodPriceTable.forEach((e) => {
        e.price = null;
      });
    },
    //表格数据保存
    saveFoodTable: debounce(function () {
      this.axios({
        url: "/api/blade-food/foodmanager/saveOrUpdate",
        method: "post",
        data: this.foodPriceTable,
      }).then((res) => {
        console.log(res);
        this.$message({
          message: "保存成功",
          type: "success",
        });
      });
    }, 1000),

    //每页条数值改变
    handleSizeChange(val) {
      console.log("handleSizeChange");
      this.size = val;
      this.currentPage = 1;
      this.$refs.foodHeader.getFoodTable();
    },
    //页数值改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$refs.foodHeader.getFoodTable();
    },
    //查询条件处理
    beforeGetFoodTable(param) {
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
    //表格数据查询
    getFoodTable(params) {
      this.axios({
        url: "/api/blade-food/foodmanager/list",
        method: "get",
        params: { current: this.currentPage, size: this.size, ...params },
      }).then((res) => {
        this.selUpdate = true;
        this.foodPriceTable = res.data.data.records;
        this.total = res.data.data.total;
        console.log(res);
        setTimeout(() => {
          this.selUpdate = false;
        }, 1000);
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
