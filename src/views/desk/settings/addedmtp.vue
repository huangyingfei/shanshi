<template>
  <div class="Additiona">
    <el-form
      :model="ruleForm"
      :rules="rules"
      :inline="true"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="标准名称"
        prop="name"
        style="width:700px;  margin-top: 10px;"
      >
        <el-input v-model="ruleForm.name" style="width:500px;"></el-input>
      </el-form-item>

      <el-form-item
        label="是否默认标准"
        prop="region"
        style="  margin-top: 10px;"
      >
        <el-select
          :disabled="this.network == 1"
          v-model="ruleForm.region"
          placeholder="请选择"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="Protein">
      <!-- 标签页 -->
      <el-tabs
        v-loading="loadFlag"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="item.name"
          :name="item.name"
          v-for="(item, i) in newProtein.nutritionVos"
          :key="i"
        >
          <el-tabs v-model="activeName2" type="card">
            <div class="accto" v-if="item.sexNum == 2">
              <div class="titles">人群</div>
              <div class="glyph">
                <div class="startup">男性</div>
                <div class="chart">上限</div>
                <div class="Item">下限</div>
              </div>
              <div class="unset">
                <div class="startup">女性</div>
                <div class="chart">上限</div>
                <div class="Item">下限</div>
              </div>
              <div class="rotate">
                <div class="chart">上限系数</div>
                <div class="Item">下限系数</div>
              </div>
            </div>
            <div class="actor" v-if="item.sexNum == 1">
              <div class="effects">人群</div>
              <div class="kendo">
                <div class="chart">上限</div>
                <div class="Item">下限</div>
              </div>
              <div class="directory">
                <div class="chart">上限系数</div>
                <div class="Item">下限系数</div>
              </div>
            </div>
            <el-tab-pane
              :name="button.name"
              :label="button.name"
              v-for="(button, i) in item.nutritionVos"
              :key="i"
            >
              <ul class="constant">
                <li
                  v-for="(nvo, index) in button.nutritionCoeffientVos"
                  :key="index"
                >
                  <div class="nialing">{{ nvo.name }}</div>
                  <div v-if="item.sexNum == 2" style="display: inline-block;">
                    <div class=""></div>
                    <el-input
                      v-model="nvo.manMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.manMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.womanMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.womanMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                  </div>
                  <div v-if="item.sexNum == 1" style="display: inline-block;">
                    <el-input
                      v-model="nvo.resultMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.resultMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>

          <!-- 没有二级菜单 -->
          <ul v-if="item.nutritionVos.length == 0" class="electric">
            <li v-for="(nvo, index) in item.nutritionCoeffientVos" :key="index">
              <div class="nialing">{{ nvo.name }}</div>
              <div v-if="item.sexNum == 2" style="display: inline-block; ">
                <el-input
                  v-model="nvo.manMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.manMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.womanMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.womanMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
              </div>
              <div v-if="item.sexNum == 1" style="display: inline-block;">
                <el-input
                  v-model="nvo.resultMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.resultMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
              </div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="Aconfirm">
      <el-button type="primary" v-if="window" @click="Determines('ruleForm')"
        >保存</el-button
      >
      <el-button type="success" v-else @click="Atom('ruleForm')"
        >編輯保存</el-button
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Additiona",
  data() {
    return {
      loadFlag: false, //加载flag
      radio2: "上海",
      activeName: "", //标签页
      activeName2: "", //标签页
      ruleForm: {
        name: "",
        region: ""
      },
      Nid: "",
      rules: {
        name: [{ required: true, message: "请输入标准名称", trigger: "blur" }],
        region: [{ required: true, message: "请选择标准", trigger: "change" }]
      },
      newProtein: [], //标签页，
      newclicked: [],
      metadata: "",
      borderid: "",
      network: ""
    };
  },
  beforeMount() {},
  mounted() {
    console.log(this.$route.query.userid);
    this.borderid = this.$route.query.userid.id;
    console.log(this.borderid);

    // this.editor=this.$route.query.userid;
    // console.log(this.editor);
    // this.ruleForm.name=this.editor.name;
    // this.ruleForm.region=this.editor.isDef!== 1 ? "是" : "否";
    // this.newProtein.nutritionVos=this.editor.nutritionVos;
    // // this.newProtein.nutritionVos=setTimeout(this.editor.nutritionVos,4000)
    // console.log( this.newProtein.nutritionVos)
  },
  created() {
    // if(this.$route.query.userid) {
    //   this.editor=this.$route.query.userid;
    //   console.log(this.$route)
    //   this.ruleForm.name=this.editor.name;
    //   this.ruleForm.region=this.editor.isDef!== 1 ? "是" : "否";
    //   // this.newProtein.nutritionVos=this.editor.nutritionVos;
    //   this.newProtein = this.editor;
    //   console.log(this.newProtein)
    // } else {
    this.confirm();
    // }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(this.newProtein);
      console.log(tab);
      this.activeName2 = this.newProtein.nutritionVos[
        Number(tab.index)
      ].nutritionVos[0].name;

      // console.log(tab.name);
      // if (this.newProtein.nutritionVos.nutritionVos) {
      //   this.activeName2 = this.newProtein.nutritionVos.nutritionVos[0].name;
      //   console.log(this.activeName2);
      // }
    },

    confirm() {
      this.loadFlag = true;
      if (this.$route.query.userid == undefined) {
        this.window = true; //更新
        this.network = "";
      } else {
        this.window = false;
        this.network = 1;
      }
      //样式渲染
      this.$axios
        .get(`api/blade-food/nutritionage/nutrage`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.loadFlag = false;
          if (this.$route.query.userid) {
            this.ruleForm.name = this.$route.query.userid.name;
            this.ruleForm.region =
              this.$route.query.userid.isDef == 1 ? "是" : "否";
            this.newProtein = this.$route.query.userid;
          } else {
            this.newProtein = res.data.data;
            console.log(this.newProtein);
          }
          this.activeName = this.newProtein.nutritionVos[0].name;
        });
    },
    //編輯保存
    Atom(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newProtein.name = this.ruleForm.name;
          this.newProtein.isDef = this.ruleForm.region;

          this.$axios
            .post(`api/blade-food/nutritionsetting/updateNutAndCoef`, {
              isDef: this.ruleForm.region == "是" ? 1 : 0,
              name: this.ruleForm.name,
              id: this.borderid,
              nutritionVos: this.newProtein.nutritionVos
            })
            .then(res => {
              // console.log(res);
              this.$router.replace("./nutrient");
              this.$message({
                message: "編輯成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$message.error("編輯失败");
            });
        } else {
          this.$message({
            message: "信息未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //提交
    Determines(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(`api/blade-food/nutritionsetting/saveNutAndCoef`, {
              isDef: this.ruleForm.region,
              name: this.ruleForm.name,
              nutritionVos: this.newProtein.nutritionVos
            })
            .then(res => {
              // console.log(res);
              this.$router.replace("./nutrient");
              this.$message({
                message: "保存成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$message.error("保存失败");
            });
        } else {
          this.$message({
            message: "信息未填全",
            type: "warning"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  list-style: none;
}
.Additiona {
  width: 100%;
  /* overflow-y: auto;
  overflow-x: hidden; */
  /* position: absolute;
  left: 10px;
  right: 10px; */
  background-color: #fff;
}
.current {
  width: 100%;
  height: 40px;
  overflow: auto;
  color: #b4bbc5;
  font-size: 14px;
  line-height: 40px;
  /* background-color: red; */
}
.uan-energy {
  width: 140px;
  height: 40px;

  float: left;

  text-align: center;
}
.drink {
  width: 140px;
  height: 40px;
  float: left;
  text-align: center;

  margin-left: 20px;
}
.drink1 {
  width: 140px;
  height: 40px;
  float: left;
  text-align: center;

  margin-left: 20px;
}
.based {
  width: 140px;
  height: 40px;
  float: left;
  text-align: center;

  margin-left: 20px;
}
.based1 {
  width: 140px;
  height: 40px;
  float: left;
  text-align: center;

  margin-left: 20px;
}
.Model {
  width: 140px;
  height: 40px;
  float: left;
  text-align: center;

  margin-left: 20px;
}
.Model1 {
  width: 140px;
  height: 40px;
  float: left;
  text-align: center;
  margin-left: 20px;
}
.rich {
  width: 100%;
  margin-top: 10px;
}
.Source {
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* background-color: yellow; */
}
.year {
  width: 140px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  /* background-color: #fff; */
  font-size: 14px;
  float: left;
}
.energy_input {
  width: 300px;
  height: 40px;
  line-height: 40px;
  /* background-color: red; */
  margin-left: 20px;
  float: left;
}
.Protein {
  width: 100%;
  /* height: 1000px; */
}
.module {
  width: 100%;
  height: 40px;

  color: #b4bbc5;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.setProtein {
  width: 140px;
  height: 40px;
  float: left;

  background-color: #fff;
}
.Aconfirm {
  width: 100%;
  margin-top: 20px;
  position: fixed;
  background-color: #fff;
  bottom: 5px;
  text-align: center;
}
.Protein {
  width: 100%;
  margin-bottom: 80px;
  background-color: #fff;
}
.nstant {
  width: 100%;
  height: 40px;

  /* width: 30px;
  height: 30px;
  background-color: red;
  text-align: center;
  line-height: 30px; */
}
.crowd {
  /* width: 140px;
  height: 40px;
  background-color: red;
  text-align: center;
  line-height: 40px; */
}
.nialing {
  /* color: #b4bbc5; */
  width: 100px;
  height: 40px;
  text-align: center;
  /* float: left; */
  line-height: 40px;
  margin-top: 20px;
  /* background-color: red; */
  display: inline-block;
}
.accto {
  /* width: 1100px; */
  width: 100%;
  height: 90px;
  /* position: relative;
  top: 5px; */
  margin-left: 50px;

  color: #b4bbc5;
  font-size: 14px;
  z-index: 999;
}
.titles {
  width: 80px;
  height: 50px;
  line-height: 50px;
  margin-top: 31px;
  text-align: center;

  float: left;
}
.glyph {
  width: 300px;

  height: 83px;
  line-height: 50px;
  text-align: center;
  margin-left: 30px;
  float: left;
}
.chart {
  width: 100px;
  height: 50px;

  float: left;
  margin-left: 20px;
}
.Item {
  width: 100px;
  height: 50px;

  float: left;
  margin-left: 50px;
}
.unset {
  width: 300px;

  height: 83px;
  line-height: 50px;
  text-align: center;
  margin-left: 20px;
  float: left;
}
.rotate {
  width: 300px;

  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-left: 20px;
  float: left;
  margin-top: 31px;
}
.startup {
  width: 300px;
  height: 31px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 31px;
}
.actor {
  width: 742px;
  height: 50px;
  /* position: relative;
  top: 5px; */

  margin-left: 50px;
  color: #b4bbc5;
  font-size: 14px;
  /* position: relative;
  top: 82px; */
}
.effects {
  width: 80px;
  height: 50px;
  line-height: 50px;

  text-align: center;

  float: left;
}
.kendo {
  width: 300px;
  height: 50px;
  text-align: center;
  line-height: 50px;

  margin-left: 30px;
  float: left;
}
.directory {
  width: 300px;
  height: 50px;
  text-align: center;
  line-height: 50px;

  margin-left: 20px;
  float: left;
}
.electric {
  /* margin-top: 60px; */
  width: 96%;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.constant {
  width: 96%;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
