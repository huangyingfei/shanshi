<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <week @weekChange="weekChange" />
      </el-col>
      <el-col :span="8">
        <div class="flex-box">
          <label>备用人数</label>
          <el-input-number
            v-model="spareNum"
            placeholder="请输入备用人数"
            :controls="false"
            @change="spareNumChange"
          ></el-input-number>
        </div>
      </el-col>

      <el-col :span="2">
        <el-button
          type="primary"
          style="width: 100%"
          @click="$emit('shopListSave', spareNum)"
          >保存</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button style="width: 100%" @click="$emit('openShopTablePrint')"
          >打印</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button
          style="width: 100%"
          @click="getShopList('/api/blade-food/stock/resetStock')"
          >重新生成</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import week from "../../../components/week.vue";
export default {
  components: { week },

  data() {
    return {
      weekObj: {},
      spareNum: 5,
    };
  },

  methods: {
    clearSearch() {
      this.foodPriceFrom = {
        foodName: "",
        isUse: "",
        isPrice: "",
      };
    },
    spareNumChange() {
      this.$emit("spareNumChange", this.spareNum);
    },
    weekChange(param) {
      this.weekObj = param;
      this.getShopList("/api/blade-food/stock/detail");
    },
    getShopList(url) {
      if (this.weekObj.startTime) {
        this.$emit(
          "getShop",
          {
            spareNum: this.spareNum,
            ...this.weekObj,
          },
          url
        );
      } else {
        this.$message({
          message: "请选择采购日期",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  line-height: 40px;
  float: left;
}
.flex-box {
  display: flex;
  align-items: center;
}
label {
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  white-space: nowrap;
}
.el-input-number {
  width: 100%;
}
</style>
