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
      <el-form-item label="标准名称" prop="name" style="width:700px;">
        <el-input v-model="ruleForm.name" style="width:500px;"></el-input>
      </el-form-item>

      <el-form-item label="是否默认标准" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        :name="item.name"
        v-for="(item, i) in newProtein.nutritionVos"
        :key="i"
      >
        <div class="Protein">
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane
              :name="button.name"
              :label="button.name"
              v-for="(button, i) in item.nutritionVos"
              :key="i"
            >
              <ul>
                <li
                  v-for="(nvo, index) in button.nutritionCoeffientVos"
                  :key="index"
                >
                  <div class="nialing">{{ nvo.name }}</div>
                  <div v-if="item.sexNum == 2" style="display: inline-block;">
                    <div class=""></div>
                    <el-input
                      v-model="nvo.manMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.manMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.womanMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.womanMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <!-- 男下限+女下限 -->
                    <el-input
                      v-model="nvo.resultMin"
                      placeholder="男下限+女下限"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <!-- 男上限+女上限 -->
                    <el-input
                      v-model="nvo.resultMax"
                      placeholder="男上限+女上限"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                  </div>
                  <div v-if="item.sexNum == 1" style="display: inline-block;">
                    <el-input
                      v-model="nvo.resultMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.resultMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMin"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                    <el-input
                      v-model="nvo.coefficientMax"
                      placeholder="请输入内容"
                      style=" margin-left: 20px; width: 140px;"
                    ></el-input>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
          <div class="accto">
            <div class="titles">人群</div>
            <div></div>
          </div>
          <ul v-if="item.nutritionVos.length == 0">
            <li v-for="(nvo, index) in item.nutritionCoeffientVos" :key="index">
              <div class="nialing">{{ nvo.name }}</div>
              <div v-if="item.sexNum == 2" style="display: inline-block;">
                <el-input
                  v-model="nvo.manMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.manMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.womanMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.womanMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <!-- 男下限+女下限 -->
                <el-input
                  v-model="nvo.resultMin"
                  placeholder="男下限+女下限"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <!-- 男上限+女上限 -->
                <el-input
                  v-model="nvo.resultMax"
                  placeholder="男上限+女上限"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
              </div>
              <div v-if="item.sexNum == 1" style="display: inline-block;">
                <el-input
                  v-model="nvo.resultMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.resultMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMin"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
                <el-input
                  v-model="nvo.coefficientMax"
                  placeholder="请输入内容"
                  style=" margin-left: 20px; width: 140px;"
                ></el-input>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="Aconfirm">
      <el-button type="primary" @click="Submit">确认</el-button>
      <el-button type="success" @click="Atom">編輯保存</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Additiona",
  data() {
    return {
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
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      newProtein: [], //标签页，
      newclicked: [],
      metadata: ""
    };
  },
  beforeMount() {},
  mounted() {
    console.log(this.$route.query.userid);
    this.borderid = this.$route.query.userid.id;
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
    handleClick(tab, event) {},

    confirm() {
      //样式渲染
      this.$axios
        .get(`api/blade-food/nutritionage/nutrage`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (this.$route.query.userid) {
            this.ruleForm.name = this.$route.query.userid.name;
            this.ruleForm.region =
              this.$route.query.userid.isDef !== 1 ? "是" : "否";
            this.newProtein = this.$route.query.userid;
          } else {
            this.newProtein = res.data.data;
            console.log(this.newProtein);
          }
          this.activeName = this.newProtein.nutritionVos[0].name;
        });
    },
    //編輯保存
    Atom() {
      this.newProtein.name = this.ruleForm.name;
      this.newProtein.isDef = this.ruleForm.region;
      console.log(this.newProtein.nutritionVos);
      let list = this.newProtein.nutritionVos;
      for (let i = 0; i < list.length; i++) {
        if (list[i].nutritionCoeffientVos.length == 0) {
          // }
          for (let k = 0; k < list[i].nutritionVos.length; k++) {
            let pulse = list[i].nutritionVos;
            // console.log(pulse);
            for (
              let n = 0;
              n < list[i].nutritionVos[k].nutritionCoeffientVos.length;
              n++
            ) {
              let inner = list[i].nutritionVos[k].nutritionCoeffientVos;
              // console.log(inner);
              list[i].nutritionVos[k].nutritionCoeffientVos[n].resultMin =
                (parseInt(
                  list[i].nutritionVos[k].nutritionCoeffientVos[n].manMin
                ) +
                  parseInt(
                    list[i].nutritionVos[k].nutritionCoeffientVos[n].womanMin
                  )) /
                2;
              list[i].nutritionVos[k].nutritionCoeffientVos[n].resultMax =
                (parseInt(
                  list[i].nutritionVos[k].nutritionCoeffientVos[n].manMax
                ) +
                  parseInt(
                    list[i].nutritionVos[k].nutritionCoeffientVos[n].womanMax
                  )) /
                2;
            }
          }
        } else {
          for (let j = 0; j < list[i].nutritionCoeffientVos.length; j++) {
            list[i].nutritionCoeffientVos[j].resultMin =
              (parseInt(list[i].nutritionCoeffientVos[j].manMin) +
                parseInt(list[i].nutritionCoeffientVos[j].womanMin)) /
              2;
            list[i].nutritionCoeffientVos[j].resultMax =
              (parseInt(list[i].nutritionCoeffientVos[j].manMax) +
                parseInt(list[i].nutritionCoeffientVos[j].womanMax)) /
              2;
            // console.log(list[i].nutritionCoeffientVos[j].resultMin);
            // console.log(list[i].nutritionCoeffientVos[j].resultMax);
            if (
              list[i].nutritionCoeffientVos[j].manMin == null ||
              list[i].nutritionCoeffientVos[j].womanMin == null
            ) {
              list[i].nutritionCoeffientVos[j].resultMin = 0;
            }
            if (
              list[i].nutritionCoeffientVos[j].manMax == null ||
              list[i].nutritionCoeffientVos[j].womanMax == null
            ) {
              list[i].nutritionCoeffientVos[j].resultMax = 0;
            }
          }
        }
      }
      console.log(this.newProtein.nutritionVos);
      this.$axios
        .post(`api/blade-food/nutritionsetting/updateNutAndCoef`, {
          isDef: this.ruleForm.region == "是" ? 0 : 1,
          name: this.ruleForm.name,
          id: this.borderid,
          nutritionVos: this.newProtein.nutritionVos
        })
        .then(res => {
          console.log(res);
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
    Submit() {
      this.newProtein.name = this.ruleForm.name;
      this.newProtein.isDef = this.ruleForm.region;
      console.log(this.newProtein.nutritionVos);
      let list = this.newProtein.nutritionVos;
      for (let i = 0; i < list.length; i++) {
        if (list[i].nutritionCoeffientVos.length == 0) {
          // }
          for (let k = 0; k < list[i].nutritionVos.length; k++) {
            let pulse = list[i].nutritionVos;
            // console.log(pulse);
            for (
              let n = 0;
              n < list[i].nutritionVos[k].nutritionCoeffientVos.length;
              n++
            ) {
              let inner = list[i].nutritionVos[k].nutritionCoeffientVos;
              // console.log(inner);
              list[i].nutritionVos[k].nutritionCoeffientVos[n].resultMin =
                (parseInt(
                  list[i].nutritionVos[k].nutritionCoeffientVos[n].manMin
                ) +
                  parseInt(
                    list[i].nutritionVos[k].nutritionCoeffientVos[n].womanMin
                  )) /
                2;
              list[i].nutritionVos[k].nutritionCoeffientVos[n].resultMax =
                (parseInt(
                  list[i].nutritionVos[k].nutritionCoeffientVos[n].manMax
                ) +
                  parseInt(
                    list[i].nutritionVos[k].nutritionCoeffientVos[n].womanMax
                  )) /
                2;
            }
          }
        } else {
          for (let j = 0; j < list[i].nutritionCoeffientVos.length; j++) {
            list[i].nutritionCoeffientVos[j].resultMin =
              (parseInt(list[i].nutritionCoeffientVos[j].manMin) +
                parseInt(list[i].nutritionCoeffientVos[j].womanMin)) /
              2;
            list[i].nutritionCoeffientVos[j].resultMax =
              (parseInt(list[i].nutritionCoeffientVos[j].manMax) +
                parseInt(list[i].nutritionCoeffientVos[j].womanMax)) /
              2;
            // console.log(list[i].nutritionCoeffientVos[j].resultMin);
            // console.log(list[i].nutritionCoeffientVos[j].resultMax);
            if (
              list[i].nutritionCoeffientVos[j].manMin == null ||
              list[i].nutritionCoeffientVos[j].womanMin == null
            ) {
              list[i].nutritionCoeffientVos[j].resultMin = 0;
            }
            if (
              list[i].nutritionCoeffientVos[j].manMax == null ||
              list[i].nutritionCoeffientVos[j].womanMax == null
            ) {
              list[i].nutritionCoeffientVos[j].resultMax = 0;
            }
          }
        }
      }
      console.log(this.newProtein.nutritionVos);
      this.$axios
        .post(`api/blade-food/nutritionsetting/saveNutAndCoef`, {
          isDef: this.ruleForm.region,
          name: this.ruleForm.name,
          nutritionVos: this.newProtein.nutritionVos
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("保存失败");
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
  background-color: red;
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
  text-align: center;
  margin-bottom: 50px;
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
  color: #b4bbc5;
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
  width: 1100px;
  height: 60px;
  background-color: red;
  margin-left: 50px;
}
.titles {
  width: 80px;
  height: 50px;
  line-height: 50px;
  color: #b4bbc5;
  text-align: center;
  background-color: #fff;
  font-size: 14px;
}
</style>
