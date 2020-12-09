<template>
  <div class="source">
    <el-form
      :model="footer"
      :rules="rules"
      :inline="true"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="标准名称"
        prop="name"
        style="width:700px;margin-top: 20px;"
      >
        <el-input v-model="footer.name" style="width:500px;"></el-input>
      </el-form-item>

      <el-form-item
        label="是否默认标准"
        prop="region"
        style="margin-top: 20px;"
      >
        <el-select v-model="footer.region" placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="names">能量来源要求比例设置（单位为%）</div>
    <div class="sales">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="营养素"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="item.name"
          align="center"
          prop="nutrient"
          width="110"
          v-for="(item, i) in reset"
          :key="i"
        >
          <template slot-scope="scope">
            <!-- <div v-for="(set,i) in trysource" :key="i"> -->
            <el-input v-model="item.threeName" placeholder="请输入"></el-input>
            <!-- </div> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="path">
      <el-button
        type="primary"
        v-if="window"
        size="medium"
        @click="Determines('ruleForm')"
        >确认</el-button
      >
      <el-button type="success" v-else size="medium" @click="edit"
        >编辑保存</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reset: "",
      backup: "",
      tupdate: "",

      tableData: [
        {
          date: "比例"
        }
      ],
      footer: {
        name: "",
        region: ""
      },

      rules: {
        name: [{ required: true, message: "请输入标准名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  created() {
    // console.log(this.$route.query.userid); //编辑传值
    this.buffer = this.$route.query.userid[0];
    // console.log(this.buffer.name);
    this.editID = this.buffer.id;
    console.log(this.editID);
    this.footer.name = this.buffer.name;
    // props.row.isDef!==0?'是':'否'
    this.footer.region = this.buffer.isDef == 1 ? "是" : "否";
    // this.reset=this.buffer.powerNutritions;
    // let arr1 = this.buffer.powerNutritions;
    // arr1.forEach(item => {
    //   console.log(item)

    // })

    // this.buffer.powerNutritions.forEach((item, i) => {
    //   this.reset[i].indexId = item.id;
    // })
  },
  beforeMount() {
    this.proportion();
    // this.handleClick();
  },
  mounted() {},
  methods: {
    //编辑提交
    edit() {
      console.log(this.reset);
      let setup = this.reset;
      let arr = [];
      for (let val of setup) {
        // if (val.threeName != "") {
        // console.log(setup[i], setup[i].id);
        arr.push({
          id: `${val.idxId}`,
          nutritionId: `${val.id}`,
          val: `${val.threeName}`
        });
      }
      console.log(arr);
      this.$axios
        .post(`api/blade-food/powersetting/saveOrUpdatePowNut`, {
          headers: {
            "Content-Type": "application/json"
          },
          id: this.editID,
          name: this.footer.name,
          isDef: this.footer.region == "是" ? 1 : 0,
          powerNutritions: arr
        })
        .then(res => {
          // console.log(res);
          this.$router.replace("./energy");
          this.$message({
            message: "編輯成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("編輯失败");
        });
    },
    //提交
    Determines(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.reset);
          let setup = this.reset;
          let arr = [];
          for (let val of setup) {
            // if (val.threeName != "") {
            // console.log(setup[i], setup[i].id);
            arr.push({ nutritionId: `${val.id}`, val: `${val.threeName}` });
          }
          console.log(arr);
          this.$axios
            .post(`api/blade-food/powersetting/savePowNut`, {
              name: this.footer.name,
              isDef: this.footer.region,
              powerNutritions: arr
            })
            .then(res => {
              // console.log(res);
              this.$router.replace("./energy");
              this.$message({
                message: "保存成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$message.error("保存失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // console.log(this.backup);
      // console.log(this.tupdate);
    },
    //样式渲染
    proportion() {
      if (this.footer.name == "") {
        this.window = true; //更新
      } else {
        this.window = false;
      }
      this.$axios
        .post(`api/blade-food/nutrition/PowNut`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          //   console.log(res);
          this.reset = res.data.data;
          // console.log(this.reset);
          let arr1 = this.buffer.powerNutritions;
          arr1.forEach(item => {
            // console.log(item)
            for (let k of this.reset) {
              if (k.id == item.nutritionId) {
                k.threeName = item.val;
                k.idxId = item.id;
              }
            }
          });
          console.log(this.reset);
        });
    }
  }
};
</script>

<style scoped>
.source {
  width: 100%;
  height: 1200px;
  background-color: #fff;
}
.names {
  width: 98%;
  font-size: 15px;
  padding-left: 30px;
}
.sales {
  width: 98%;
}
.path {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-top: 30px;
}
</style>
