<template>
  <div class="cation">
    <div class="personal">
      <el-input
        style="width:290px; margin-left: 9px;"
        placeholder="输入关键字进行查询"
        v-model="filterText"
        @input="addFilter"
      >
      </el-input>
      <div class="country">
        <div class="country1">
          <el-cascader
            clearable
            v-model="valuepark2"
            :options="options"
            @change="gProvinces"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </div>
        <div class="country2">
          <template>
            <el-select
              @change="disallow()"
              v-model="before1"
              placeholder="请选择1"
            >
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
            <el-select
              @change="commonly()"
              v-model="really1"
              placeholder="请选择"
            >
              <el-option
                v-for="item in really"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
      </div>
      <!-- 树形结构 -->
      <div class="monly">
        <div class="block">
          <p></p>
          <el-tree
            :data="data1"
            node-key="id"
            v-loading="loadFlag1"
            :default-expand-all="false"
            @node-click="handleNodeClick1"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <!-- <el-button
                          type="text"
                          size="mini"
                          v-if="data.view == 1"
                          @click="() => prepare(data)"
                        >
                          查看
                        </el-button> -->
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <!-- 结束 -->
    <!-- 右边 -->
    <div class="rights">
      <div class="mationtxt">食材主要信息</div>
      <div class="mationinput">
        <el-form
          :model="ruleFormUsers"
          :inline="true"
          ref="ruleFormUsers"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="食材名" style=" width: 350px;   ">
            <span>{{ ruleFormUsers.name }}</span>
          </el-form-item>
          <el-form-item label="食物别名" style=" width: 350px;  ">
            <span>{{ ruleFormUsers.foodFood }}</span>
          </el-form-item>
          <el-form-item label="食物别名2" style=" width: 350px;  ">
            <span>{{ ruleFormUsers.ovenFood }}</span>
          </el-form-item>
          <el-form-item label="食材真名" style=" width: 350px;   ">
            <span>{{ ruleFormUsers.buffer }}</span>
          </el-form-item>

          <el-form-item label="食材分类" style=" width: 350px;   ">
            <el-select
              disabled
              v-model="ruleFormUsers.fooddata"
              placeholder="请选择"
            >
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
            <span>{{ ruleFormUsers.foods }}</span>
          </el-form-item>
          <el-form-item label="食物分类2" style=" width: 350px;   ">
            <span>{{ ruleFormUsers.dogfood }}</span>
          </el-form-item>
          <el-form-item label="食部(%)" style=" width: 350px;  ">
            <span>{{ ruleFormUsers.besaved }}</span>
          </el-form-item>
          <el-form-item label="重量（g）" style=" width: 350px; ">
            <span>{{ ruleFormUsers.timers }}</span>
          </el-form-item>

          <el-form-item label="水分(%)" style=" width: 350px;   ">
            <span>{{ ruleFormUsers.content }}</span>
          </el-form-item>
          <el-form-item label="色系" style="  ">
            <el-radio-group v-model="ruleFormUsers.resource">
              <el-radio disabled label="1">绿</el-radio>
              <el-radio disabled label="2">红</el-radio>
              <el-radio disabled label="3">黄</el-radio>
              <el-radio disabled label="4">紫</el-radio>
              <el-radio disabled label="5">白</el-radio>
              <el-radio disabled label="6">黑</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属区域" style="  width: 350px;  ">
            <el-cascader
              disabled
              v-model="valuepark1"
              placeholder="请选择省市区"
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="所属季节" style=" width: 350px;  ">
            <el-select
              disabled
              v-model="active1"
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
          <el-form-item label="功用" style="width:350px">
            <span>{{ ruleFormUsers.desc }}</span>
          </el-form-item>
          <el-form-item label="图片" style="width:350px">
            <img
              v-if="this.rectangle != ''"
              style="width:200px;height:200px"
              :src="this.rectangle"
              alt=""
            />
            <!-- <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog> -->
          </el-form-item>

          <el-form-item label="常用" style="">
            <el-switch v-model="ruleFormUsers.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 营养素标题 -->
      <div class="worm">
        营养素含量（这里为100克食部食品中的营养素含量）
      </div>
      <div class="saveas">
        <el-table
          :data="typeTree"
          max-height="400"
          style="width: 100%; margin-bottom: 20px"
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
                disabled
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
</template>

<script>
export default {
  data() {
    return {
      loadFlag1: false, //公共食材加载
      valuepark2: [], //查询省市区
      options: [],
      ruleFormUsers: {
        //公共食材库
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
      active1: [], //公共所属季节
      before1: "",
      //季节查询
      before: [
        {
          value: "",
          label: "全部季节"
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
      //全部 常用
      really: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "常用"
        }
      ],
      really1: "",
      waterfall: "2",
      fallen: "",
      filterText: "",
      valuepark1: [] //公共省市区
    };
  },
  beforeMount() {
    this.Provinces();
    this.publicDomain();
    this.ToString(); //公共
  },
  watch: {
    //     filterText(val) {
    //
    //       this.$refs.tree.filter(val);
    //     }
  },
  methods: {
    commonly(){
       this.publicDomain();
    },
    disallow(){
      this.publicDomain();
    },
    addFilter() {
      this.publicDomain();
    },
    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    },
    //公共食材库
    handleNodeClick1(data) {
      console.log(data);
      if (data.view == 0) {
        return;
      } else {
        // this.gavatorta = index;
        // this.active =[];
        // this.active1.length = 0;
        console.log(data);
        this.flour = data.id;
        this.$axios
          .get(`api/blade-food/food/detail?id=${this.flour}`, {})
          .then(res => {
            // console.log(res);
            this.inquired = res.data.data;
            console.log(this.inquired);
            this.ruleFormUsers.name = this.inquired.foodName; //食材名
            this.ruleFormUsers.foodFood = this.inquired.foodAlias; //食物别名1
            this.ruleFormUsers.ovenFood = this.inquired.foodAlias1; //食物别名2
            this.ruleFormUsers.buffer = this.inquired.foodReal; //食材真名
            this.ruleFormUsers.fooddata = this.inquired.foodTypeName; //食材分类
            this.ruleFormUsers.foods = this.inquired.foodType1; //食物分类1
            this.ruleFormUsers.dogfood = this.inquired.foodType2; //食物分类2
            this.ruleFormUsers.besaved = this.inquired.foodEat; //食部
            this.ruleFormUsers.timers = this.inquired.weight; //重量
            this.ruleFormUsers.content = this.inquired.water; //水分
            this.ruleFormUsers.resource = this.inquired.color + ""; //色系
            if (this.inquired.season) {
              this.inquired.season.split(",").forEach(item => {
                this.active1.push(item);
              });
            } else {
              this.inquired.season = [];
            }

            //所属区域
            if (this.inquired.provinces) {
              let addItem = [];
              this.inquired.provinces.split(",").forEach((item, i) => {
                if (item == this.inquired.belongRegion.split(",")[i]) {
                  addItem.push([item]);
                } else {
                  addItem.push([
                    item,
                    this.inquired.belongRegion.split(",")[i]
                  ]);
                }
              });
              this.valuepark1 = addItem;
            } else {
              this.inquired.provinces = [];
            }
            // console.log(this.valuepark1);
            this.ruleFormUsers.desc = this.inquired.function; //功用
            this.rectangle = this.inquired.pic;
            //  console.log(this.dialogImageUrl);
            this.ruleFormUsers.delivery =
              this.inquired.isPub == 1 ? false : true; //公开

            this.ruleFormUsers.delivery1 =
              this.inquired.isUse == 1 ? false : true; //常用
            let units = this.inquired.nutritions;
            // console.log();
            units.forEach(item => {
              // console.log(item);
              for (let item1 of this.typeTree) {
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
      }
    },
    //省市区查询
    gProvinces() {
      // this.fallen = this.valuepark2[1];

      // if (this.valuepark2[1]) {
      //   this.fallen = this.valuepark2[1];
      // } else {
      //   this.fallen = "";
      // }
      if (this.valuepark2.length == 1) {
        this.fallen = this.valuepark2[0];
        // console.log(this.fallen);
      }
      if (this.valuepark2.length == 2) {
        this.fallen = this.valuepark2[1];
        // console.log(this.fallen);
      }
      if (!this.valuepark2.length) {
        this.fallen = "";
      }
      this.publicDomain();
    },
    //公共食材渲染
    publicDomain() {
      this.loadFlag1 = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getFoodByBaseId?isPrivate=1&typeTemp=${this.waterfall}&regionId=${this.fallen}&season=${this.before1}&isUse=${this.really1}&foodName=${this.filterText}`,
          {}
        )
        .then(res => {
          // console.log(res);
          this.loadFlag1 = false;
          this.prtree = res.data.data;

          let trees = [];
          this.prtree.forEach((item, index) => {
            trees[index] = {
              id: item.id,
              label: item.typeName,
              view: 0
            };
            trees[index].children = [];
            item.foods.forEach((item1, index1) => {
              trees[index].children[index1] = {
                id: item1.id,
                label: item1.foodName,
                isPub: item1.isPub,
                isUse: item1.isUse,
                view: 1,
                delete: 1
              };
            });
          });
          // console.log(trees);
          this.data1 = trees;
        });
    },
    ToString() {
      this.$axios
        .get(`api/blade-food/nutrition/tree`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);

          this.typeTree = res.data.data;
        });
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

<style lang="scss" scoped>
.months {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.cation {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
}
.personal {
  width: 350px;
  height: 100%;
  /* background-color: yellow; */
  border-right: 1px solid #e0e0e0;
}
.rights {
  width: 70%;
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  /* background-color: red; */
  margin-left: 10px;
}
.monly {
  width: 350px;
  height: 400px;
  overflow-y: auto;
  margin-top: 10px;
  margin-bottom: 60px;
}
.import {
  width: 100%;
  height: 30px;
  /* background-color: red; */
  margin-top: 15px;
  /* line-height: 50px; */
  margin-left: 9px;
}
.whole {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  /* background-color: red; */
}
.export {
  width: 77px;
  height: 35px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;

  font-size: 14px;
  float: left;
}
.toLine {
  width: 2px;
  height: 20px;
  margin-top: 5px;
  border-right: solid #acc0d8 1px;
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
  width: 105px;
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
  width: 760px;
  /* height: 700px; */
  /* display: flex; */
  margin-left: 40px;
  /* margin-bottom: 20px; */
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
  // margin-left: 40px;
  margin-bottom: 50px;
  /* background-color: red; */
}
.base {
  width: 20%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  left: 60%;

  background-color: #fff;
  /* margin-bottom: 50px; */
  /* margin-top: 30px; */
  text-align: center;
  line-height: 50px;
}
.onblur {
  width: 100%;
  height: 100%;

  background-color: #fff;
}
/deep/ .hide .el-upload--picture-card {
  display: none;
}
.cannot {
  color: #000;
}
</style>
