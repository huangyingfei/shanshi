<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select
          v-model="foodPriceFrom.isUse"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="全部" value=""></el-option>
          <el-option label="常用" value="0"></el-option>
          <el-option label="非常用" value="1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="foodPriceFrom.isPrice"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="全部" value=""></el-option>
          <el-option label="已有价格" value="1"></el-option>
          <el-option label="暂无价格" value="0"></el-option>
        </el-select>
      </el-col>
      <el-col label="食物名称" :span="8">
        <!-- <label for="foodName">食物名称</label> -->
        <el-input
          v-model="foodPriceFrom.foodName"
          placeholder="请输入食物名称"
          id="foodName"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="width: 100%" @click="getFoodTable"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button style="width: 100%" @click="clearSearch">清空</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" style="width: 100%" @click="clearPrice"
          >清空价格</el-button
        >
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col label="价格生效日期" :span="6">
        <el-date-picker
          v-model="value"
          type="date"
          placeholder="选择价格生效日期"
          style="width: 100%"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="width: 100%">保存</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" style="width: 100%">清空价格</el-button>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodPriceFrom: {
        foodName: "",
        isUse: "",
        isPrice: "",
      },
    };
  },
  created() {
    this.getFoodTable();
  },
  methods: {
    getFoodTable() {
      this.$emit("getFoodTable", this.foodPriceFrom);
    },
    clearSearch() {
      this.foodPriceFrom = {
        foodName: "",
        isUse: "",
        isPrice: "",
      };
      this.$emit("getFoodTable", this.foodPriceFrom);
    },
    clearPrice() {
      this.$emit("clearPrice");
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  line-height: 40px;
}
</style>
