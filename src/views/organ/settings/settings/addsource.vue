<template>
  <basic-container>
    <div class="source">
      <el-form
        :model="footer"
        :rules="rules"
        :inline="true"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="标准名称" prop="name" style="width: 700px">
          <el-input
            v-model="footer.name"
            disabled
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-select v-model="nsValue" placeholder="请选择" style="margin-right: 20px">
          <el-option
            v-for="item in  nsOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="upPId">确 认</el-button>
      </el-form>
      <div class="names">能量来源要求比例设置（单位为%）</div>
      <div class="sales">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column  prop="date"     label="营养素"    align="center"></el-table-column>
            <el-table-column :prop="item.id.toString()" :label="item.name" v-for="(item, index) in reset"    :key="index"></el-table-column>
        </el-table>
      </div>
    </div>
  </basic-container>
</template>

<script>
  import {
    getPowerSettingList,upPId
  } from "@/api/system/organ";
export default {

  data() {
    return {
      reset: [],
      tableData: [
        {
          date:"比例"
        }
      ],
      footer: {
        name: "",
      },
      nsValue:'',
      nsOptions:[],
      rules: {
        name: [{ required: true, message: "请输入标准名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.proportion();
    getPowerSettingList().then((res) => {
      this.nsOptions=res.data.data;
    });
  },
  methods: {
    upPId() {
      if (!this.nsValue) {
        this.$message({
          type: "info",
          message: "不可为空!",
        });
      } else {
        upPId(this.nsValue).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          }
          this.proportion();
        })
      }
    },
    proportion() {
      this.$axios
        .post(`api/blade-food/nutrition/PowNut`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.reset = res.data.data;
        });

      this.$axios
        .get(`api/blade-food/powersetting/getPowNutData`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.footer.name=res.data.data[0].name;
          let temp={ date:"比例"};
          res.data.data[0].powerNutritions.forEach(_=>{
            temp[_.nutritionId]=_.val
          })
          this.tableData=[];
          this.tableData.push(temp);

        });
    },
  },
};
</script>

<style scoped>
.source {
  width: 100%;
}
.names {
  width: 98%;
  font-size: 15px;
  padding-left: 42px;
}
.sales {
  width: 98%;
  padding-top: 15px;
  padding-left: 42px;
}
.path {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-top: 30px;
}
</style>
