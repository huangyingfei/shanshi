<template>
  <div class="months">
    <div class="version">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 个人食材库 -->
        <el-tab-pane label="个人食材库" name="first">
          <div class="cation">
            <!-- 左边 -->
            <div class="personal">
              <div class="import">
                <el-button type="primary" plain size="mini">导入</el-button>
                <el-button type="primary" plain size="mini">导出</el-button>
                <el-button type="primary" plain size="mini">加分类</el-button>
                <el-button type="primary" plain size="mini">加食材</el-button>
              </div>
              <div class="whole">
                <div class="export">
                  <!-- 全部(326) -->
                  <el-button type="text">全部</el-button>
                </div>
                <div class="export1">
                  <el-button type="text">分享平台</el-button>
                </div>
              </div>
              <!-- 全国查找 -->
              <div class="country">
                <div class="country1">
                  <template>
                    <el-select v-model="value" placeholder="请选择">
                      <!-- <el-option
                v-for="item in examine"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option> -->
                    </el-select>
                  </template>
                </div>
                <div class="country2">
                  <template>
                    <el-select v-model="before1" placeholder="请选择">
                      <el-option
                        v-for="item in before"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </div>
                <div class="country2">
                  <template>
                    <el-select v-model="really1" placeholder="请选择">
                      <el-option
                        v-for="item in really"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </div>
                <el-button type="primary" size="small" @click="stored"
                  >查询</el-button
                >
              </div>
              <!-- 树形组件 -->
              <div class="monly">
                <div class="block">
                  <p></p>
                  <el-tree
                    :data="data"
                    node-key="id"
                    :default-expand-all="false"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                  >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>{{ node.label }}</span>
                      <span>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => prepare(data)"
                        >
                          查看
                        </el-button>
                        <el-button
                          type="text"
                          v-if="data.isUse"
                          size="mini"
                          @click="() => append(data)"
                        >
                          常用
                        </el-button>
                        <el-button
                          type="text"
                          v-else
                          size="mini"
                          @click="() => insert(data)"
                        >
                          不常用
                        </el-button>
                        <!-- <el-button
                          v-if="!data.isPub"
                          type="text"
                          size="mini"
                          @click="() => multi(data)"
                        >
                          隐藏
                        </el-button>
                        <el-button
                          v-else
                          type="text"
                          size="mini"
                          @click="() => docs(data)"
                        >
                          公开
                        </el-button> -->
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => remove(node, data)"
                        >
                          删除
                        </el-button>
                      </span>
                    </span>
                  </el-tree>
                </div>
              </div>
            </div>
            <!-- 右边 -->
            <div class="rights">
              <div class="mationtxt">食材主要信息</div>
              <div class="mationinput">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  :inline="true"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item
                    label="食材名"
                    prop="name"
                    style=" width: 350px;   "
                  >
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="食物别名1" style=" width: 350px;  ">
                    <el-input v-model="ruleForm.foodFood"></el-input>
                  </el-form-item>
                  <el-form-item label="食物别名2" style=" width: 350px;  ">
                    <el-input v-model="ruleForm.ovenFood"></el-input>
                  </el-form-item>

                  <el-form-item
                    label="食材真名"
                    prop="buffer"
                    style=" width: 350px;   "
                  >
                    <el-input v-model="ruleForm.buffer"></el-input>
                  </el-form-item>

                  <el-form-item
                    label="食材分类"
                    prop="fooddata"
                    style=" width: 350px;   "
                  >
                    <el-select v-model="ruleForm.fooddata" placeholder="请选择">
                      <el-option
                        v-for="item in foodPos"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="食物分类1" style=" width: 350px;  ">
                    <el-input
                      v-model="ruleForm.foods"
                      placeholder="请输入食物分类"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="食物分类2" style=" width: 350px;   ">
                    <el-input
                      v-model="ruleForm.dogfood"
                      placeholder="请输入食物分类"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="食部(%)"
                    prop="besaved"
                    style=" width: 350px;  "
                  >
                    <el-input
                      v-model="ruleForm.besaved"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="重量（g）"
                    prop="timers"
                    style=" width: 350px; "
                  >
                    <el-input
                      v-model="ruleForm.timers"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="水分(%)" style=" width: 350px;   ">
                    <el-input
                      placeholder="请输入水分"
                      v-model="ruleForm.content"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="色系" style="  ">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-radio label="1">绿</el-radio>
                      <el-radio label="2">红</el-radio>
                      <el-radio label="3">黄</el-radio>
                      <el-radio label="4">紫</el-radio>
                      <el-radio label="5">白</el-radio>
                      <el-radio label="6">黑</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="所属区域" style="  width: 350px;  ">
                    <el-cascader
                      v-model="valuepark"
                      placeholder="请选择省市区"
                      :options="options"
                      :props="{ multiple: true, checkStrictly: true }"
                      @change="handleChange"
                    ></el-cascader>
                  </el-form-item>
                  <el-form-item label="所属季节" style=" width: 350px;  ">
                    <el-select
                      v-model="active"
                      multiple
                      placeholder="请选择季节"
                    >
                      <el-option
                        v-for="item in before"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="功用">
                    <el-input
                      style=" width: 450px;  "
                      type="textarea"
                      v-model="ruleForm.desc"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="图片">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                  </el-form-item>

                  <el-switch
                    style=" width: 250px; margin-left: 40px; "
                    v-model="ruleForm.delivery"
                    active-text="分享平台"
                    inactive-text="不分享平台"
                  >
                  </el-switch>

                  <el-switch
                    v-model="ruleForm.delivery1"
                    active-text="常用"
                    inactive-text="不常用"
                  >
                  </el-switch>
                </el-form>
              </div>
              <!-- 营养素标题 -->
              <div class="worm">
                营养素含量（这里为100克食部食品中的营养素含量）
              </div>
              <div class="saveas">
                <el-table
                  :data="mailto"
                  max-height="400"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  :border="false"
                  :default-expand-all="false"
                  :tree-props="{
                    children: 'children',
                    hasChildren: 'hasChildren'
                  }"
                >
                  <el-table-column
                    prop="title"
                    label="营养素"
                    align="center"
                    width="200"
                  ></el-table-column>
                  <el-table-column
                    prop="unit"
                    label="单位"
                    width="180"
                    align="center"
                  ></el-table-column>

                  <el-table-column label="含量" align="center">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.result"
                        type="text"
                        v-if="scope.row.level != 1 ? true : false"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                    <!-- v-if="scope.row.dients" -->
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="base">
            <el-button type="primary" @click="saved('ruleForm')"
              >编辑保存</el-button
            >
            <el-button type="primary" @click="iptables">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-tab-pane>
        <!-- 公共食材库 -->
        <el-tab-pane label="公共食材库" name="second">
          <div class="cation">
            <!-- 左边 -->
            <div class="personal">
              <!-- 全国查找 -->
              <div class="country"></div>
            </div>
            <!-- 右边 -->
            <div class="rights"></div>
          </div>
          <!-- 按钮 -->
          <div class="base"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const data = [];
    return {
      data: JSON.parse(JSON.stringify(data)), //树形结构
      activeName: "first",

      ruleForm: {
        region: "",
        name: "", //食材名
        foodFood: "", //食物别名1
        ovenFood: "", //食物别名2
        buffer: "", //食材真名
        fooddata: "", //食材分类
        foods: "", //食物分类1
        dogfood: "", //食物分类2
        besaved: "", //食部分
        timers: "", //重量
        content: "", //水分
        resource: "", //色系
        desc: "", //功用
        delivery: false, //公开
        delivery1: false, //常用
        autosave: "",
        type: [],
        temps: ""
      },
      mailto: [], //营养素含量
      prtree: [],
      valuepark: [], //省市区
      active: [], //季节
      //全部 常用
      really: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "常用"
        }
      ],
      really1: "0",
      //季节查询
      before: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "春季"
        },
        {
          value: "2",
          label: "夏季"
        },
        {
          value: "3",
          label: "秋季"
        },
        {
          value: "4",
          label: "冬季"
        }
      ],
      before1: "0"
    };
  },
  beforeMount() {
    this.Protocol(); //营养素含量
    this.Provinces(); //省市区
    this.queryLite(); //获取分类
    this.treeDrawing(); //树形渲染数
  },
  methods: {
    // handleClick(tab){

    // }
    //保存
    iptables() {
      // console.log(123123);
      let food = [];
      this.mailto.forEach(item => {
        // console.log(item);
        item.children.forEach(item1 => {
          if (item1.result != null) {
            food.push({
              nutrientId: item1.id,
              value: item1.result
            });
          }
          if (item1.children) {
            item1.children.forEach(item2 => {
              // console.log(item2);
              if (item2.result != null) {
                food.push({
                  nutrientId: item2.id,
                  value: item2.result
                });
              }
            });
          }
        });
      });
      console.log(food);
      this.$axios
        .post(`api/blade-food/food/save`, {
          foodName: this.ruleForm.name, //食材名
          foodAlias: this.ruleForm.foodFood, //食物别名1
          foodAlias1: this.ruleForm.ovenFood, //食物别名2
          foodReal: this.ruleForm.buffer, //食材真名
          foodType: this.ruleForm.fooddata, //食材分类
          foodType1: this.ruleForm.foods, //食物分类1
          foodType2: this.ruleForm.dogfood, //食物分类2
          foodEat: this.ruleForm.besaved, //食部
          weight: this.ruleForm.timers, //重量
          water: this.ruleForm.content, //水分
          color: this.ruleForm.resource, //色系
          seasons: this.active, //季节
          belongRegions: this.valuepark, //所属区域
          function: this.ruleForm.desc, //功用
          isUse: this.ruleForm.delivery1 == false ? 0 : 1, //是否常用
          isPub: this.ruleForm.delivery == false ? 0 : 1, //是否分享平台

          nutritions: food
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
    },
    prepare(data) {
      this.active.length = 0;
      console.log(data);
      this.flour = data.id;
      this.$axios
        .get(`api/blade-food/food/detail?id=${this.flour}`, {})
        .then(res => {
          console.log(res);
          this.inquired = res.data.data;
          console.log(this.inquired);
          this.ruleForm.name = this.inquired.foodName; //食材名
          this.ruleForm.foodFood = this.inquired.foodAlias; //食物别名1
          this.ruleForm.ovenFood = this.inquired.foodAlias1; //食物别名2
          this.ruleForm.buffer = this.inquired.foodReal; //食材真名
          this.ruleForm.fooddata = this.inquired.foodType; //食材分类
          this.ruleForm.foods = this.inquired.foodType1; //食物分类1
          this.ruleForm.dogfood = this.inquired.foodType2; //食物分类2
          this.ruleForm.besaved = this.inquired.foodEat; //食部
          this.ruleForm.timers = this.inquired.weight; //重量
          this.ruleForm.content = this.inquired.water; //水分
          this.ruleForm.resource = this.inquired.color + ""; //色系
          // this.active.push(this.inquired.season); //所属季节
          this.inquired.season.split(",").forEach(item => {
            this.active.push(item);
          });
          //所属区域
          this.inquired.provinces.split(",").forEach((item, i) => {
            this.valuepark.push([
              item,
              this.inquired.belongRegion.split(",")[i]
            ]);
          });
          this.ruleForm.desc = this.inquired.function; //功用
          this.ruleForm.delivery = this.inquired.isPub == 0 ? false : true; //公开
          // console.log(this.ruleForm.delivery);
          this.ruleForm.delivery1 = this.inquired.isUse == 0 ? false : true; //常用
          let units = this.inquired.nutritions;
          units.forEach(item => {
            // console.log(item);
            for (let item1 of this.mailto) {
              for (let arr of item1.children) {
                if (arr.id == item.nutrientId) {
                  arr.result = item.value;
                }
                if (arr.children) {
                  for (let add of arr.children) {
                    if (add.id == item.nutrientId) {
                      add.result = item.value;
                    }
                  }
                }
              }
            }
          });
        });
    },
    //树形渲染
    treeDrawing() {
      this.$axios
        .get(`api/blade-food/basetype/getFoodByBaseId?isPrivate=0`, {})
        .then(res => {
          // console.log(res);
          this.prtree = res.data.data;
          console.log(this.prtree);

          let trees = [];
          this.prtree.forEach((item, index) => {
            trees[index] = {
              id: item.id,
              label: item.typeName
            };
            trees[index].children = [];
            item.foods.forEach((item1, index1) => {
              trees[index].children[index1] = {
                id: item1.id,
                label: item1.foodName,
                isPub: item1.isPub,
                isUse: item1.isUse
              };
            });
          });
          // console.log(trees);
          this.data = trees;
        });
    },
    //营养素含量
    Protocol() {
      this.$axios
        .get(`api/blade-food/nutrition/tree`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.mailto = res.data.data;
        });
    },
    // 分类
    queryLite() {
      this.$axios
        .get(`api/blade-food/basetype/list?type=1`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.tionDate = res.data.data;
          // console.log(this.tionDate);
          let cation = [];
          // children
          this.tionDate.forEach((item, index) => {
            cation[index] = {
              value: item.id,
              label: item.typeName
            };
          });
          // console.log(cation);
          this.foodPos = cation;
        });
    },
    //省市区
    handleChange(value) {
      console.log(value);
    },
    Provinces() {
      // http://api.yytianqi.com/citylist/id/2

      this.$axios
        .get(`api/blade-system/region/selectCityOrProvince`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.national = res.data.data;
          // console.log(this.national);
          let arr = [];
          this.national.forEach((item, index) => {
            arr[index] = {
              value: item.id,
              label: item.name
            };
            arr[index].children = [];
            // console.log(item.children instanceof Array);
            if (item.children) {
              item.children.forEach((item1, index1) => {
                arr[index].children[index1] = {
                  value: item1.id,
                  label: item1.name
                };
              });
            }
          });

          // this.$set(this.national, arr)
          this.options = arr;
        });
    }
  }
};
</script>

<style scoped>
.months {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.cation {
  width: 100%;
  height: 1200px;
  background-color: #fff;
  display: flex;
}
.personal {
  width: 28%;
  height: 1000px;
  /* background-color: yellow; */
  border-right: 1px solid #e0e0e0;
}
.rights {
  width: 70%;
  height: 1200px;
  /* background-color: red; */
  margin-left: 10px;
}
.import {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  margin-top: 10px;
  line-height: 50px;
  margin-left: 20px;
}
.whole {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  /* background-color: red; */
}
.export {
  width: 100px;
  height: 35px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.export1 {
  width: 100px;
  height: 35px;
  text-align: center;
  line-height: 30px;
  /* border-right: 1px solid #e0e0e0; */
  font-size: 14px;
  float: left;
}
.country {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  line-height: 50px;
  margin-left: 10px;
}
.country1 {
  width: 90px;
  float: left;
}
.country2 {
  width: 90px;
  float: left;
  margin-left: 10px;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.mationinput {
  width: 95%;
  /* height: 700px; */
  /* display: flex; */
  margin-left: 40px;
  margin-bottom: 20px;
}
.worm {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.saveas {
  width: 95%;
  height: 500px;
  margin-left: 40px;
  /* background-color: red; */
}
.base {
  width: 100%;
  height: 100px;
  float: left;
  /* background-color: yellow; */
  margin-bottom: 50px;
  margin-top: 20px;
  text-align: center;
  line-height: 100px;
}
.onblur {
  width: 100%;
  height: 100%;

  background-color: #fff;
}
</style>
