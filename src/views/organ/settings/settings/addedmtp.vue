<template>
 <basic-container>

<div class="el-fix">
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

      <el-select v-model="nsValue" placeholder="请选择" style="margin-right: 20px">
        <el-option
          v-for="item in  nsOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" @click="upNId">确 认</el-button>
    </el-form>
</div>
    <!-- 标签页 -->
    <div class="el-contain">
      <div class="el-fix2">
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in nutritionVos" :key="index"   :label="item.name" :id="item.id">
        <div class="tag-list">
          <el-tag :type="i.isActive ? 'success' : 'info'" @click="changeSecond(item.nutritionVos, i,item.id)"
            style="margin-right: 20px;" v-for="(i, iIndex) in item.nutritionVos" :key="iIndex">{{i.name}}</el-tag>
        </div>
        <div style="font-size: 10px;color: red">{{item.titleLabel}}</div>
      </el-tab-pane>
    </el-tabs>

    <table style="width: 100%">
      <tr v-if="fathNutritionVos.sexNum==2" class="table-title">
        <td></td>
        <td colspan="3">男性</td>
        <td colspan="3">女性</td>
        <td></td>
        <td></td>
      </tr>
      <tr  v-if="fathNutritionVos.sexNum==2" class="table-title">
        <td class="table-first" style="width: 12%">人群年龄</td>
        <td style="width: 12%">上限</td>
        <td></td>
        <td style="width: 12%">下限</td>
        <td style="width: 12%">上限</td>
        <td></td>
        <td style="width: 12%">下限</td>

        <td style="width: 12%">上限系数</td>
        <td></td>
        <td style="width: 12%"> 下限系数</td>
      </tr>
       <tr  v-if="fathNutritionVos.sexNum==1" class="table-title">
        <td style="width: 15%" class="table-first">人群年龄</td>
        <td style="width: 16%">上限</td>
        <td style="width: 16%">下限</td>
        <td style="width: 16%">上限系数</td>
        <td style="width: 16%">下限系数</td>
         <td ></td>
         <td></td>
      </tr>
    </table>
    </div>
      <div :class="getHeight"></div>
      <table>
        <tr   v-for="(item, index) in tableData" :key="index" >
          <th class="table-first">{{item.name}}</th>
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
  import {
    getNutritionList,upNId
  } from "@/api/system/organ";
export default {
  data() {
    return {
      activeName: "", //标签页
      ruleForm: {
        name: "",

      },
      getHeight:"oneHeight",
      nsValue:'',
      nsOptions:[],
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
    getNutritionList().then((res) => {
      this.nsOptions=res.data.data;
    });
  },
  created() {
    this.onLoad();

  },
  methods: {
    upNId(){
      if(!this.nsValue){
        this.$message({
          type: "info",
          message: "不可为空!",
        });
      }else{
        upNId(this.nsValue).then(res=>{
          if(res.data.success){
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          }
          this.onLoad();
        })
      }


    },
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
      this.nutritionVos.forEach(_=>{
        if(_.id==id&&nutritionVos.length>0){
          _.titleLabel=nutritionVos[0].titleLabel
        }
      })
      debugger
      console.log(nutritionVos)
      if(nutritionVos.length==0){
        this.getHeight="oneHeight"
      }else{
        this.getHeight="twoHeight"
      }
      if(this.tableData.length==0){
         this.$set(nutritionVos[0], "isActive", true);
        this.tableData=nutritionVos[0].nutritionCoeffientVos;
        if(this.tableData.length==4){
          this.getHeight="oneHeight"
        }
        console.log(this.tableData)
      }
    },
    changeSecond(list, item,id) {
      this.nutritionVos.forEach(_=>{
          if(_.id==id){
            _.titleLabel=item.titleLabel
          }
      })
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
  .oneHeight{
    height:150px;
  }
  .twoHeight{
    height:215px;
  }
  .el-fix{
    position: fixed;
    background: #FFFFFF;
    width: calc(100% - 309px);
    z-index: 999;
    margin-top:-16px;
    padding-top: 16px;
  }
  .el-fix2{
    position: fixed;
    width: calc(100% - 349px);
    background: #FFFFFF;
    z-index: 999;
  }
.el-contain {
  margin-top: 50px;
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
  width: 150px;
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
