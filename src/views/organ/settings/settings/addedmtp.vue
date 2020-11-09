<template>
 <basic-container>
  
    <el-form
      :model="ruleForm"
      :rules="rules"
      :inline="true"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item disabled label="标准名称" prop="name" style="width:700px;">
        <el-input v-model="ruleForm.name" disabled style="width:500px;"></el-input>
      </el-form-item>
   
    </el-form>
    <!-- 标签页 -->
    <div class="el-contain">
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in nutritionVos" :key="index"   :label="item.name" :id="item.id">
        <div class="tag-list">
          <el-tag :type="i.isActive ? 'success' : 'info'" @click="changeSecond(item.nutritionVos, i)"
            style="margin-right: 20px;" v-for="(i, iIndex) in item.nutritionVos" :key="iIndex">{{i.name}}</el-tag>
        </div>
      </el-tab-pane>
    </el-tabs>
    <table>
      <tr v-if="fathNutritionVos.sexNum==2" class="table-title">
        <td></td>
        <td colspan="3">男性</td>
        <td colspan="3">女性</td>
        <td></td>
        <td></td>
      </tr>
      <tr  v-if="fathNutritionVos.sexNum==2" class="table-title">
        <td class="table-first">人群</td>
        <td>上限</td>
        <td></td>
        <td>下限</td>
        <td>上限</td>
        <td></td>
        <td>下限</td>
       
        <td>上限系数</td>
        <td></td>
        <td>下限系数</td>
      </tr>
       <tr  v-if="fathNutritionVos.sexNum==1" class="table-title">
        <td class="table-first">人群</td>
        <td>上限</td>
        <td></td>
        <td>下限</td>
        <td>上限系数</td>
        <td></td>
        <td>下限系数</td>
      </tr>
      <tr   v-for="(item, index) in tableData" :key="index" >
        <th class="table-first">{{item.name}}{{isNaN(item.name) ? "" : "岁~"}}</th>
        <td v-if="fathNutritionVos.sexNum==2">
          <el-input disabled v-model="item.manMax"></el-input>
        </td>
        <td v-if="fathNutritionVos.sexNum==2">-</td>
        <td v-if="fathNutritionVos.sexNum==2">
          <el-input disabled v-model="item.manMin"></el-input>
        </td>
        <td v-if="fathNutritionVos.sexNum==2">
          <el-input disabled v-model="item.womanMax"></el-input>
        </td>
        <td v-if="fathNutritionVos.sexNum==2">-</td>
        <td v-if="fathNutritionVos.sexNum==2">
          <el-input disabled v-model="item.womanMin"></el-input>
        </td>
         <td v-if="fathNutritionVos.sexNum==1">
          <el-input disabled v-model="item.resultMin"></el-input>
        </td>
        <td v-if="fathNutritionVos.sexNum==1">-</td>
        <td v-if="fathNutritionVos.sexNum==1">
          <el-input disabled v-model="item.resultMax"></el-input>
        </td>
        <td>
          <el-input disabled v-model="item.coefficientMax"></el-input>
        </td>
        <td>-</td>
        <td>
          <el-input disabled v-model="item.coefficientMin"></el-input>
        </td>
      </tr>
    </table>
   </div>

 </basic-container>
</template>

<script>
export default {
  data() {
    return {
      activeName: "", //标签页
      ruleForm: {
        name: "",
      
      },
      rules: {
        name: [{ required: true, message: "请输入标准名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
      newProtein: [], //标签页，
      fathNutritionVos:{},
      nutritionVos: [],
      tableData: [],
    };
  },
  beforeMount() {},
  mounted() {

  },
  created() {
    this.onLoad();

  },
  methods: {
    onLoad() {
      //样式渲染
      this.$axios
        .get(`api/blade-food/nutritionsetting/getnutrSetCoe`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.newProtein = res.data.data;
          this.ruleForm.name=this.newProtein.name;
          
      
          this.nutritionVos = this.newProtein.nutritionVos;
          this.fathNutritionVos=this.nutritionVos[0];
          this.tableData=this.nutritionVos[0].nutritionCoeffientVos;
        });
    },
    back() {
      this.tableData.forEach(
        (_) => (_.resultMin = (Number(_.manMin) + Number(_.womanMin)) / 2)
      );
      console.log(this.tableData);
    },
    handleClick(tab) {
      const { id } = tab.$attrs;
      this.fathNutritionVos=this.nutritionVos.filter((_) => _.id === id)[0];
      let nutritionVos = this.nutritionVos.filter((_) => _.id === id)[0]
        .nutritionVos;
      nutritionVos.forEach((_) => this.$set(_, "isActive", false));
      this.tableData = this.nutritionVos.filter(
        (_) => _.id === id
      )[0].nutritionCoeffientVos;
      console.log(nutritionVos)
      if(this.tableData.length==0){
         this.$set(nutritionVos[0], "isActive", true);
        this.tableData=nutritionVos[0].nutritionCoeffientVos;
      }
    },
    changeSecond(list, item) {
      list.forEach((_) => this.$set(_, "isActive", false));
      this.$set(item, "isActive", true);
      this.tableData = list.filter(
        (_) => _.id === item.id
      )[0].nutritionCoeffientVos;
    },
  },
};
</script>

<style scoped>
.el-contain {
  padding-left: 40px;
  padding-bottom: 40px;
}
.tag-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.tag-list span{
  margin-top: 5px;
}

table tr td {
  text-align: center;
  font-size: 14px;
}
table tr{
  height: 50px;
}
table .table-first {
  width: 85px;
  text-align: left;
  font-weight: normal;
}

table .el-input__inner {
  text-align: center;
}
table .table-title{
  height: 40px;
}
</style>
