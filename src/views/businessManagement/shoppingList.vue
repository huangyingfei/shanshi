<template>
  <div>
    <basic-container :block="true">
      <shop-header
        @getShop="getShopList"
        @spareNumChange="spareNumChange"
        @shopListSave="shopListSave"
        @openShopTablePrint="openShopTablePrint"
      />
      <shop-table :shopListData="shopListData" ref="shopTable" />

      <shop-table-print
        ref="shopPrint"
        @closeShopPrint="closeShopPrint"
        :dialogVisible="dialogVisible"
      />
    </basic-container>
  </div>
</template>

<script>
import { spareNumChange } from "../../api/businessManagement/shoppingList";

import ShopTable from "./shoppingList/components/shopTable.vue";
import ShopHeader from "./shoppingList/shopHeader.vue";
import ShopTablePrint from "./shoppingList/components/shopTablePrint.vue";

export default {
  components: { ShopHeader, ShopTable, ShopTablePrint },
  data() {
    return {
      shopListData: [],
      shopList: {},
    };
  },
  methods: {
    //打开打印页面弹窗
    openShopTablePrint(weekObj) {
      if (weekObj.stockTimeStr) {
        this.$refs.shopPrint.openShopTablePrint(weekObj.stockTimeStr);
      } else {
        this.$message({
          message: "请选择采购日期",
          type: "warning",
        });
      }
    },
    //获取采购清单数据
    getShopList(params, url) {
      console.log("getShopList");
      this.axios({
        url: url,
        methid: "get",
        params: params,
      })
        .then((res) => {
          this.shopListData = res.data.data.children;
          this.shopList = res.data.data;
          if (url == "/api/blade-food/stock/resetStock") {
            this.$message({
              message: "重新生成成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          this.shopListData = [];
          this.shopList = {};
          console.log(err);
        });
    },
    //备用人数值改变
    spareNumChange(num) {
      spareNumChange(num, this.shopListData);
      this.shopListData.forEach((_el) => {
        this.$refs.shopTable.peopleChange("备用", _el.children, num);
      });
    },
    //采购清单数据保存
    shopListSave(spareNum) {
      this.shopList.children = this.shopListData;
      this.shopList.spareNum = spareNum;
      this.axios({
        url: "/api/blade-food/stock/saveOrUpdate",
        method: "post",
        data: this.shopList,
      }).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.getShopList(
          {
            startTime: this.shopList.startTime,
            endTime: this.shopList.endTime,
            stockTimeStr: this.shopList.stockTimeStr,
            spareNum: this.shopList.spareNum,
          },
          "/api/blade-food/stock/detail"
        );
      });
    },
  },
};
</script>

<style scoped>
.basic-container {
  height: 100%;
  position: absolute;
  width: 99%;
}
</style>