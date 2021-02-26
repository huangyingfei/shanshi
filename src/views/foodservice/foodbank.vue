<template>
  <div class="dishes">
    <div class="coffee">
      <el-input
        style="width:290px; margin-left: 9px;"
        placeholder="输入关键字进行查询"
        v-model="filterText"
      >
      </el-input>
      <div class="country">
        <div class="country1">
          <el-cascader
            clearable
            placeholder="区域"
            v-model="valuepark1"
            :options="options"
            @change="gProvinces"
          ></el-cascader>
        </div>
        <div class="country2">
          <template>
            <el-select
              @change="disallow()"
              v-model="before1"
              placeholder="请选择"
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
      <!-- 结束 -->
      <div class="monly">
        <div class="block">
          <p></p>
          <el-tree
            :data="data2"
            :props="defaultProps"
            node-key="id"
            v-loading="loadFlag3"
            :default-expand-all="false"
            @node-click="handleNodeClick3"
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
        <!-- 结束 -->
      </div>
    </div>
    <div class="mation">
      <div class="mationtxt">菜品信息</div>
      <div class="mationinput">
        <el-form
          :model="ruleForm1"
          :inline="true"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="菜品名字" style="width: 350px">
            <!-- <el-input style="width: 200px" v-model="ruleForm.name"></el-input> -->
            <span>{{ ruleForm1.name }}</span>
          </el-form-item>
          <el-form-item label="菜品分类" style="width: 350px">
            <el-select
              disabled
              style="width: 200px"
              v-model="ruleForm1.fooddata"
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
          <el-form-item label="所属区域" style="width: 350px">
            <el-cascader
              disabled
              style="width: 200px"
              v-model="valuepark1"
              placeholder="请选择省市区"
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="所属季节" style="width: 350px">
            <el-select disabled v-model="value2" multiple placeholder="请选择">
              <el-option
                style="width: 200px"
                v-for="item in before2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="特点" style="width: 350px">
            <span>{{ ruleForm1.region }}</span>
          </el-form-item>

          <el-form-item label="做法" style="width: 350px">
            <span>{{ ruleForm1.desc }}</span>
          </el-form-item>
          <el-form-item label="图片" style="width: 350px">
            <img
              v-if="this.rectangle != ''"
              style="width:150px;height:150px"
              :src="this.rectangle"
              alt=""
            />
          </el-form-item>
          <el-form-item label="常用" style="">
            <el-switch v-model="ruleForm1.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 菜品所含食材信息 -->
      <div class="mationtxt">菜品所含食材信息</div>
      <div>
        <!-- <el-button @click="addLine">添加行数</el-button>
            <el-button @click="save">保存</el-button> -->
        <el-table
          :data="personal"
          border
          v-loading="loadFlag1"
          show-summary
          style="width: 100%"
          :summary-method="getSummaries"
        >
          <el-table-column
            v-if="show"
            prop="id"
            label="序号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="show"
            prop="frame"
            label="分类ID "
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="食品名称" align="center">
            <template slot-scope="scope">
              <el-input
                style="width: 90px"
                v-model="scope.row.name"
                :disabled="true"
              >
              </el-input>
              <!-- <el-button
                    type="primary"
                    size="small"
                    style="   margin-left: 10px;"
                    @click="columnEvent(scope.row, scope.$index)"
                    plain
                    >选择</el-button
                  > -->
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="食品分类"
            align="center"
          ></el-table-column>
          <el-table-column disabled prop="stats" label="用量(g)" align="center">
            <template slot-scope="scope">
              <el-input
                :disabled="true"
                style="width: 90px"
                @input="hello(scope.row, scope.$index)"
                v-model="scope.row.stats"
                clearable
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="spring"
            label="能量(每百克)"
            align="center"
          ></el-table-column>
          <el-table-column prop="malloc" label="能量(kcal)" align="center">
            <template slot-scope="scope">
              <!-- {{scope.row.malloc}} -->
              <!-- <span v-if="!scope.row.stats">{{ scope.row.malloc }}</span>
              <span v-else>{{
                (scope.row.stats / 100) * scope.row.malloc
              }}</span> -->
              <el-input
                :disabled="true"
                style="width: 90px"
                v-model="scope.row.malloc"
                clearable
              >
              </el-input>
            </template>
          </el-table-column>

          <!--操作格-->
        </el-table>
      </div>
      <!-- 菜品营养素信息 -->
      <div class="mationtxt">菜品营养素信息</div>
      <div class="saveas">
        <el-table
          :data="mailto1"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          v-loading="loadFlag"
          :default-expand-all="true"
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
                :disabled="true"
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
    const data2 = [];
    return {
      filterText: "",
      ruleForm1: {
        name: "", //菜品名字
        fooddata: "", //菜品分类
        region: "", //特点
        desc: "", //做法
        delivery: false, //公开
        delivery1: false //常用
      },
      loadFlag3: false,
      valuepark1: [],
      options: [], //所属区域
      before1: "",
      personal: [
        {
          id: "",
          frame: "", //分类ID
          name: "", //食品名称
          address: "", //食品分类
          stats: "", //用量
          spring: "", //能量
          malloc: "", //能量kcal
          fruits: ""
        }
      ],
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
      before2: [
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
      value2: [],
      really1: "",
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
      waterfall: "2", //全部隐藏 公开
      fallen: "",
      mailto1: [] //营养素含量
    };
  },
  beforeMount() {
    this.Provinces();
    this.professional();
    this.Protocol1(); //营养素含量
  },
  watch: {
    filterText(val) {
      // console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick3(data) {
      // this.editable = index;
      if (data.view == 0) {
        return;
      } else {
        this.auto = data.id;
        this.$axios
          .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
          .then(res => {
            // console.log(res);
            // this.valuepark.length = 0;
            // this.value1.length = 0;
            this.handler = res.data.data;
            console.log(this.handler);
            this.valuepark1.length = 0;
            this.value2.length = 0;
            this.ruleForm1.name = this.handler.dishName; //菜品名字
            this.ruleForm1.fooddata = this.handler.dishTypeName; //菜品分类
            // this.value2.push(this.handler.season); //季节
            this.handler.season.split(",").forEach(item => {
              this.value2.push(item);
            });
            this.ruleForm1.region = this.handler.function; //特点
            this.ruleForm1.desc = this.handler.remark; //做法
            if (this.handler.provinces) {
              let bar = [];
              this.handler.provinces.split(",").forEach((item, i) => {
                //所属区域
                console.log(item);
                bar.push([item, this.handler.belongRegion.split(",")[i]]);
              });
              this.valuepark1 = bar;
            }

            this.rectangle = this.handler.pic;

            this.ruleForm1.delivery1 = this.handler.isUse == 0 ? true : false; //常用
            // this.ruleForm1.delivery = this.handler.isPub == 0 ? false : true; //公开
            // this.toBack = this.handler.dishMxVos;
            // console.log(this.toBack);
            if (this.handler.dishMxVos) {
              let arr = [];
              this.handler.dishMxVos.forEach((item, index) => {
                // console.log(item);
                // this.officeonce[this.csListIndex].id = item.id;
                arr[index] = {
                  id: item.foodId,
                  frame: item.baseTypeId,
                  name: item.name,
                  address: item.baseTypeName,
                  stats: item.value,
                  spring: item.nutritionNlValue,
                  malloc: item.foodCal.toFixed(2)
                  // malloc: item.nutritionNlValue
                };
              });
              this.personal = arr;
              this.histogram();
              // this.addLine();
              // console.log(this.officeonce);
            }
          });
      }
    },
    //全部常用查询
    commonly() {
      console.log(this.really1);
      this.obtains();
    },
    //春夏秋冬查询
    disallow() {
      console.log(this.before1);
      this.obtains();
    },
    //省市区查询
    gProvinces() {
      // console.log(this.valuepark1[1]);
      if (this.valuepark1.length == 1) {
        this.fallen = this.valuepark1[0];
        console.log(this.fallen);
      }
      if (this.valuepark1.length == 2) {
        this.fallen = this.valuepark1[1];
        console.log(this.fallen);
      }
      if (!this.valuepark1.length) {
        this.fallen = "";
      }

      this.professional();
    },
    //公共菜品库
    professional() {
      this.loadFlag3 = true;
      this.$axios

        .get(
          `api/blade-food/basetype/getDishByBaseId?isPrivate=${1}&typeTemp=${
            this.waterfall
          }&season=${this.before1}&isUse=${this.really1}&regionId=${
            this.fallen
          }`
        )
        .then(res => {
          //   console.log(res);
          this.loadFlag3 = false;
          this.obtain = res.data.data;
          let foto = [];
          this.obtain.forEach((item, index) => {
            // console.log(item);
            foto[index] = {
              id: item.id,
              label: item.typeName,
              editors: 1,
              view: 0
            };
            foto[index].children = [];
            item.dishes.forEach((item1, index1) => {
              foto[index].children[index1] = {
                id: item1.id,
                label: item1.dishName,
                isPub: item1.isPub,
                isUse: item1.isUse,
                view: 1,
                delete: 1
              };
            });
          });
          this.data2 = foto;
          console.log(foto);
        });
    },
    Protocol1() {
      this.$axios
        .get(`api/blade-food/nutrition/tree`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);

          this.mailto1 = res.data.data;
        });
    },
    histogram() {
      let next = [];
      this.personal.forEach(item => {
        // console.log(item);
        next.push({
          foodId: item.id,
          val: item.stats
        });
      });
      console.log(next);
      this.$axios
        .post(`api/blade-food/dish/calNutriByFoodIds`, {
          recipeVals: next
        })
        .then(res => {
          // console.log(res);
          this.atomic1 = res.data.data;
          // console.log(this.atomic);
          // let touch=[];
          this.atomic1.forEach(item => {
            // console.log(item);
            for (let item1 of this.mailto1) {
              // console.log(item1);
              for (let arr of item1.children) {
                // console.log(arr);
                if (arr.id == item.nutrientId) {
                  arr.result = item.total;
                }
              }
            }
          });
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
          // console.log(res);
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
.dishes {
  width: 100%;
  height: 100%;
  /* position: relative; */
  /* position: absolute; */
  background-color: #fff;
  /* margin-bottom: 50px; */
}
.monly {
  width: 100%;
  height: 400px;
  /* background-color: red; */
  overflow-y: auto;
  margin-top: 10px;
}
.coffee {
  width: 29%;
  height: 100%;
  background-color: #fff;
  float: left;
  border-right: 1px solid #e0e0e0;
}
.mation {
  width: 70%;

  /* position: relative; */

  /* position: absolute; */
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 20px;
  background-color: #fff;
  float: left;
}
.import {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  margin-left: 10px;
  margin-top: 10px;
  line-height: 50px;
}
.whole {
  width: 100%;
  height: 40px;
  /* background-color: red; */
}
.export {
  width: 77px;
  height: 30px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;
  border-right: 1px solid#e0e0e0;
  font-size: 14px;
  float: left;
}
.export1 {
  width: 77px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.mationinput {
  width: 95%;
  /* height: 700px; */
  /* display: flex; */
  margin-left: 40px;
  margin-bottom: 20px;
}
.export2 {
  width: 77px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  float: left;
}
.country {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  line-height: 50px;
}
.country1 {
  width: 90px;
  float: left;
  margin-left: 10px;
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
.autosave {
  width: 20%;
  height: 50px;
  background-color: #fff;
  float: left;
  /* margin-bottom: 50px; */
  position: fixed;
  bottom: 0px;
  left: 60%;
  /* margin-top: 20px; */
  text-align: center;
  line-height: 50px;
}
/deep/ .hide .el-upload--picture-card {
  display: none;
}
.orgin {
  color: gray;
}
.cannot {
  color: #000;
}
</style>
