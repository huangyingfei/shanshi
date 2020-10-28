<template>
  <div class="notice">
    <!-- 左边 -->
    <div class="cation">
      <!-- <el-input
        style=" width: 250px;height: 35px;"
        placeholder="请输入内容"
        v-model="input"
        clearable
      ></el-input> -->
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
          <el-button type="text">公开</el-button>
        </div>
        <div class="export2">
          <el-button type="text">隐藏</el-button>
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
        <el-button type="primary" size="small" @click="stored">查询</el-button>
      </div>
      <!-- 结束 -->
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
                <el-button type="text" size="mini" @click="() => prepare(data)">
                  查看
                </el-button>
                <el-button
                  type="text"
                  v-if="!data.isUse"
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
                <el-button
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
                </el-button>
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
    <!-- 右边食材信息 -->
    <div class="mation">
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
          <el-form-item label="食材名" prop="name" style=" width: 350px;   ">
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

          <el-form-item label="食部(%)" prop="besaved" style=" width: 350px;  ">
            <el-input
              v-model="ruleForm.besaved"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item label="重量（g）" prop="timers" style=" width: 350px; ">
            <el-input v-model="ruleForm.timers" placeholder="请输入"></el-input>
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
            <el-select v-model="active" multiple placeholder="请选择季节">
              <el-option
                v-for="item in season"
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

          <el-form-item label="公开" style="  ">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="常用" style="   ">
            <el-switch v-model="ruleForm.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 营养素标题 -->
      <div class="worm">营养素含量（这里为100克食部食品中的营养素含量）</div>
      <div class="saveas">
        <el-table
          :data="mailto"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          :default-expand-all="false"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
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
      <div style="   text-align: center;">
        <el-button type="primary" @click="saved('ruleForm')"
          >编辑保存</el-button
        >
        <el-button type="primary" @click="totally('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "notice",
  data() {
    const data = [];
    return {
      display: "0",
      mailto: [], //营养素含量
      data: JSON.parse(JSON.stringify(data)), //树形结构
      input1: "",
      input: "",
      dialogImageUrl: "", //图片
      dialogVisible: false,
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
      valuepark: [], //省市区
      // props: { multiple: true },
      active: [], //季节
      foodPos: [], //食材分类
      //季节
      fication: [],
      season: [
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

      // fooddata: "",
      rules: {
        name: [{ required: true, message: "请输入食材名", trigger: "blur" }],
        buffer: [
          { required: true, message: "请输入食材真名", trigger: "blur" }
        ],
        fooddata: [
          //食材分类
          { required: true, message: "请选择食物分类", trigger: "change" }
        ],
        besaved: [{ required: true, message: "请输入食部", trigger: "blur" }],
        timers: [{ required: true, message: "请输入重量", trigger: "blur" }]
      },
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
      before1: "0",

      examine: [
        {
          value: "选项1",
          label: "全国"
        },
        {
          value: "选项2",
          label: "浙江"
        },
        {
          value: "选项3",
          label: "上海"
        }
      ],
      value: "",
      options: [],
      value1: []
    };
  },
  computed: {},
  beforeMount() {
    this.Protocol();
    this.Provinces(); //省市区
    this.queryLite(); //获取分类
    this.Addraudit(); //树形结构渲染
  },
  created() {},
  methods: {
    //食材库保存
    totally() {
      console.log(this.mailto);
      console.log(this.ruleForm);
      let food = [];
      this.mailto.forEach((item, index) => {
        // console.log(item);
        item.children.forEach((item1, indx1) => {
          // console.log(item1);
          if (item1.children) {
            item1.children.forEach((item2, index2) => {
              // console.log(item2);
              if (item2.result != null) {
                food.push({
                  nutrientId: item2.id,
                  value: item2.result
                });
              }
            });
          }
          if (item1.result != null) {
            food.push({
              nutrientId: item1.id,
              value: item1.result
            });
          }
        });
      });
      console.log(food);
      // console.log(Library);
      // let canal=this.mailto;

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
          isPub: this.ruleForm.delivery == false ? 0 : 1, //是否公开

          nutritions: food
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.Addraudit();
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
      //表单提交
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    //编辑保存
    saved() {
      // console.log(this.mailto);
      console.log(this.ruleForm);
      let food = [];
      this.mailto.forEach((item, index) => {
        // console.log(item);
        item.children.forEach((item1, indx1) => {
          // console.log(item1);
          if (item1.children) {
            item1.children.forEach((item2, index2) => {
              // console.log(item2);
              if (item2.result != null) {
                food.push({
                  nutrientId: item2.id,
                  value: item2.result
                });
              }
            });
          }
          if (item1.result != null) {
            food.push({
              nutrientId: item1.id,
              value: item1.result
            });
          }
        });
      });
      console.log(food);
      // console.log(Library);
      // let canal=this.mailto;

      this.$axios
        .post(`api/blade-food/food/update`, {
          id: this.flour, //ID
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
          isPub: this.ruleForm.delivery == false ? 0 : 1, //是否公开

          nutritions: food
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "编辑成功",
            type: "success"
          });
          this.Addraudit();
        })
        .catch(() => {
          this.$message.error("编辑失败");
        });
    },
    //查询
    stored() {
      console.log(123);
    },
    //树形渲染数
    Addraudit() {
      this.$axios
        .get(`api/blade-food/basetype/getFoodByBaseId?isPrivate=1`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.fication = res.data.data;
          console.log(this.fication);
          let Front = [];
          this.fication.forEach((item, index) => {
            console.log(item);
            Front[index] = {
              id: item.id,
              label: item.typeName
            };
            Front[index].children = [];
            item.foods.forEach((item1, index1) => {
              // console.log(item1.isPub);
              Front[index].children[index1] = {
                id: item1.id,
                label: item1.foodName,
                isPub: item1.isPub,
                isUse: item1.isUse
              };
            });
          });
          // console.log(Front);
          this.data = Front;
          console.log(this.data);
          // console.log(this.data.isPub);
        });
    },
    //点击查看详情
    handleNodeClick(data) {
      console.log(data);
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
          console.log(this.mailto);
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
    },

    resetForm(formName) {
      this.$refs[formName].resetFields(); //重置
    },

    //查看
    prepare(data) {
      console.log(data);
      // this.term = data.id;
      this.flour = data.id;
      // console.log(this.flour);
      this.$axios
        .get(`api/blade-food/food/detail?id=${this.flour}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
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
          // this.valuepark = this.inquired.belongRegionName; //所属区域
          this.valuepark.length = 0;
          this.inquired.provinces.split(",").forEach((item, i) => {
            this.valuepark.push([
              item,
              this.inquired.belongRegion.split(",")[i]
            ]);
          });
          // console.log(this.valuepark);
          // this.valuepark.push(
          //   this.inquired.provinces.split(','),
          //   this.inquired.belongRegion.split(','),
          // );

          console.log(this.valuepark);
          // this.active.push(this.inquired.season); //所属季节
          this.inquired.season.split(",").forEach(item => {
            this.active.push(item);
          });
          this.ruleForm.desc = this.inquired.function; //功用
          this.ruleForm.delivery = this.inquired.isPub == 0 ? false : true; //公开
          // console.log(this.ruleForm.delivery);
          this.ruleForm.delivery1 = this.inquired.isUse == 0 ? false : true; //常用

          let units = this.inquired.nutritions;
          // this.arr = this.mailto;
          // console.log(this.mailto);
          units.forEach(item => {
            // console.log(item);
            for (let item1 of this.mailto) {
              // console.log(item1);
              for (let arr of item1.children) {
                // console.log(arr);
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
      // console.log(this.term);
      // this.$axios
      //   .get(`api/blade-food/basetype/list?id=${this.term}&isPub=1`, {
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.$message({
      //       message: "设置成功",
      //       type: "success"
      //     });
      //     this.Addraudit();
      //   })
      //   .catch(() => {
      //     this.$message.error("设置失败");
      //   });
    },
    //设置常用
    append(data) {
      // console.log(data);
      this.term = data.id;
      this.$axios
        .get(`api/blade-food/basetype/list?id=${this.term}&iisUse=0`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.Addraudit();
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //设置不常用
    insert(data) {
      // console.log(data);
      this.term = data.id;
      this.$axios
        .get(`api/blade-food/basetype/list?id=${this.term}&iisUse=1`, {})
        .then(res => {
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.Addraudit();
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //设置隐藏
    multi(data) {
      this.term = data.id;
      this.$axios
        .get(`api/blade-food/food/changeIsPublic?id=${this.term}&iisUse=1`, {})
        .then(res => {
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.Addraudit();
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //设置公开
    docs(data) {
      this.term = data.id;
      this.$axios
        .get(`api/blade-food/food/changeIsPublic?id=${this.term}&iisUse=0`, {})
        .then(res => {
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.Addraudit();
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //删除
    remove(node, data) {
      console.log(data);
      this.saveall = data.id;
      this.$axios
        .get(`api/blade-food/blade-food/food/remove?ids=${this.saveall}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.Addraudit();
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.notice {
  width: 100%;
  /* height: 1300px; */
  /* background-color: #fff; */
  margin-bottom: 40px;
  overflow: auto;
}
.cation {
  width: 29%;
  height: 1300px;
  background-color: #fff;
  float: left;
  border-right: 1px solid #e0e0e0;
  margin-bottom: 40px;
}
.el-input__inner {
  height: 35px !important;
}
.mation {
  width: 69%;
  height: 1300px;
  background-color: #fff;
  float: left;
  margin-bottom: 40px;
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
  /* background-color: red; */
}
.export {
  width: 100px;
  height: 30px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.export1 {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.export2 {
  width: 100px;
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
.monly {
  width: 100%;
  height: 300px;

  margin-top: 10px;
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
.el-form .demo-ruleForm {
  display: flex !important;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
