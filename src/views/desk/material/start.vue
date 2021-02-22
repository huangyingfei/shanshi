<template>
  <div>
    <div class="notice">
      <!-- 左边 -->
      <div class="cation">
        <el-input
          clearable
          style="width: 290px; margin-left: 11px; margin-top: 20px"
          placeholder="输入关键字进行查询"
          v-model="filterText"
        >
        </el-input>
        <div class="import">
          <!-- <el-button type="primary" plain size="mini">导入</el-button>
<el-button type="primary" plain size="mini">导出</el-button>
<el-button type="primary" plain size="mini">加分类</el-button> -->
          <el-button
            style="margin-left: 11px"
            @click="addition(0)"
            type="primary"
            size="mini"
            >添加食材</el-button
          >
        </div>
        <div class="whole">
          <div class="export">
            <!-- 全部(326) -->
            <el-button
              size="mini"
              :type="2 == display ? 'primary' : 'default'"
              @click="buttonClick(2)"
              >全部</el-button
            >
          </div>
          <div class="toLine"></div>
          <div class="export1">
            <el-button
              size="mini"
              :type="1 == display ? 'primary' : 'default'"
              @click="buttonClick(1)"
              >隐藏</el-button
            >
          </div>

          <div class="toLine"></div>
          <div class="export2">
            <el-button
              size="mini"
              :type="0 == display ? 'primary' : 'default'"
              @click="buttonClick(0)"
              >公开</el-button
            >
          </div>
        </div>
        <!-- 全国查找 -->
        <div class="country">
          <div class="country1">
            <el-cascader
              placeholder="区域"
              clearable
              v-model="valuepark1"
              :options="options"
              @change="gProvinces"
              :props="{ checkStrictly: true }"
            ></el-cascader>
            <!-- <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in examine"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select> -->
          </div>
          <div class="country2">
            <template>
              <el-select
                @change="disallow()"
                v-model="before1"
                placeholder="季节"
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
          <!-- <el-button type="goon" size="small" @click="stored">查询</el-button> -->
        </div>
        <!-- 结束 -->
        <!-- 树形组件 -->
        <!-- :default-expand-all="false"
    :expand-on-click-node="false" -->
        <div class="monly">
          <div class="block">
            <p></p>
            <el-tree
              :data="data"
              node-key="id"
              v-loading="loadFlag"
              :props="defaultProps"
              :default-expand-all="false"
              :default-expanded-keys="[1]"
              :default-checked-keys="[5]"
              @node-click="handleNodeClick"
              :filter-node-method="filterNode"
              ref="tree"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span :class="[data.isPub == 0 ? 'cannot' : '']">{{
                  node.label
                }}</span>
                <span>
                  <!-- <el-button
                    v-if="data.view == 1"
                    type="text"
                    size="mini"
                    style="color: #00bfaf"
                    @click.stop="() => prepare(data, 2)"
                  >
                    查看
                  </el-button> -->
                  <el-button
                    type="text"
                    v-if="data.isUse == 1"
                    style="color: #00bfaf"
                    size="mini"
                    @click.stop="() => append(data)"
                  >
                    设置常用
                  </el-button>
                  <el-button
                    type="text"
                    v-if="data.isUse == 0"
                    style="color: #00bfaf"
                    size="mini"
                    @click.stop="() => insert(data)"
                  >
                    取消常用
                  </el-button>
                  <el-button
                    v-if="data.isPub == 0"
                    style="color: #00bfaf"
                    type="text"
                    size="mini"
                    @click.stop="() => multi(data)"
                  >
                    不公开
                  </el-button>
                  <el-button
                    v-if="data.isPub == 1"
                    style="color: #00bfaf"
                    type="text"
                    size="mini"
                    @click.stop="() => docs(data)"
                  >
                    公开
                  </el-button>
                  <el-button
                    v-if="data.delete == 1"
                    style="color: #00bfaf"
                    type="text"
                    size="mini"
                    @click.stop="() => remove(node, data)"
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
            <el-form-item label="食材名" prop="name" style="width: 350px">
              <el-input
                maxlength="10"
                show-word-limit
                style="300px"
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item
              maxlength="10"
              show-word-limit
              label="食物别名1"
              style="width: 350px"
            >
              <el-input
                maxlength="10"
                show-word-limit
                style="300px"
                v-model="ruleForm.foodFood"
              ></el-input>
            </el-form-item>
            <el-form-item label="食物别名2" style="width: 350px">
              <el-input
                maxlength="10"
                show-word-limit
                style="300px"
                v-model="ruleForm.ovenFood"
              ></el-input>
            </el-form-item>

            <el-form-item label="食材真名" prop="buffer" style="width: 350px">
              <el-input
                maxlength="10"
                show-word-limit
                style="300px"
                v-model="ruleForm.buffer"
              ></el-input>
            </el-form-item>

            <el-form-item label="食材分类" prop="fooddata" style="width: 350px">
              <el-select
                style="width: 185px"
                v-model="ruleForm.fooddata"
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
              <!-- <el-select
        v-if="this.gavatorta == 2"
        style=" width: 185px; "
        disabled
        v-model="ruleForm.fooddata"
        placeholder="请选择"
      >
        <el-option
          v-for="item in foodPos"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
            </el-form-item>

            <el-form-item label="分类别称1" style="width: 350px">
              <el-input
                maxlength="10"
                show-word-limit
                v-model="ruleForm.foods"
                placeholder="请输入食物分类"
              ></el-input>
            </el-form-item>

            <el-form-item label="分类别称2" style="width: 350px">
              <el-input
                maxlength="10"
                show-word-limit
                v-model="ruleForm.dogfood"
                placeholder="请输入食物分类"
              ></el-input>
            </el-form-item>

            <el-form-item label="食部(%)" prop="besaved" style="width: 350px">
              <el-input
                @change="research"
                type="number"
                v-model="ruleForm.besaved"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="重量（g）" prop="timers" style="width: 350px">
              <el-input
                type="number"
                v-model="ruleForm.timers"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="水分(%)" style="width: 350px">
              <el-input
                @change="ofmoisture"
                type="number"
                placeholder="请输入水分"
                v-model="ruleForm.content"
              ></el-input>
            </el-form-item>

            <el-form-item label="色系" style="width: 700px">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="1">绿</el-radio>
                <el-radio label="2">红</el-radio>
                <el-radio label="3">黄</el-radio>
                <el-radio label="4">紫</el-radio>
                <el-radio label="5">白</el-radio>
                <el-radio label="6">黑</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="所属区域" style="width: 350px">
              <el-cascader
                style="width: 185px"
                v-model="valuepark"
                placeholder="请选择省市区"
                :options="options"
                :props="{ multiple: true, checkStrictly: true }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="所属季节" style="width: 350px">
              <el-select
                style="width: 185px"
                v-model="active"
                multiple
                placeholder="请选择季节"
              >
                <el-option
                  v-for="item in season"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="功用" style="width: 350px">
              <el-input
                maxlength="30"
                show-word-limit
                style="width: 185px"
                type="textarea"
                v-model="ruleForm.desc"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="图片" style="width: 400px">
              <el-upload
                :class="{ hide: hideUploadEdit }"
                accept=".jpeg,.jpg,.gif,.png"
                :headers="headerObj"
                action="api/blade-resource/oss/endpoint/put-file"
                :on-preview="handlePictureCardPreview"
                list-type="picture-card"
                :limit="1"
                :file-list="productImgs"
                :on-change="handleChangePic"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <span style="color: #000;font-weight: bold; font-size: 11px"
                >上传图片不能超过2M 只能是<span style="color:red">JPG PNG</span
                >格式</span
              >
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
              <!-- <el-upload
                class="avatar-uploader"
                action="api/blade-resource/oss/endpoint/put-file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload"
                :headers="headerObj"
                :on-remove="handleRemove"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
            </el-form-item>

            <el-form-item label="公开" style="">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>

            <el-form-item label="常用" style="">
              <el-switch v-model="ruleForm.delivery1"></el-switch>
            </el-form-item>
          </el-form>
          <div class="worm">
            营养素含量（这里为100克食部食品中的营养素含量）
          </div>
          <div class="saveas">
            <el-table
              max-height="400"
              :data="mailto"
              style="width: 100%%; margin-bottom: 20px"
              row-key="id"
              :default-expand-all="true"
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
                    type="number"
                    v-if="scope.row.level != 1 ? true : false"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="footadd">
          <el-button
            type="primary"
            v-if="this.gavatorta == 0"
            @click="totally('ruleForm')"
            >保存并新增</el-button
          >
          <el-button
            v-if="this.gavatorta == 1"
            type="primary"
            @click="saved('ruleForm')"
            >编辑保存</el-button
          >

          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </div>
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
      headerObj: {
        "Blade-Auth": ""
      }, //上传图片请求头
      defaultProps: {
        children: "children",
        label: "label"
      },
      display: "2",
      loadFlag: false, // 加载flag
      mailto: [], //营养素含量
      filterText: "",
      data: JSON.parse(JSON.stringify(data)), //树形结构
      input1: "",
      input: "",
      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      hideUploadEdit: false, // 是否隐藏上传按钮
      imageUrl: "",
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
      valuepark1: [], //
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
          { required: true, message: "请选择食物分类", trigger: "blur" }
        ],
        besaved: [{ required: true, message: "请输入食部", trigger: "blur" }],
        timers: [{ required: true, message: "请输入重量", trigger: "blur" }]
      },
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
      //季节查询
      before: [
        {
          value: "",
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
      before1: "",

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
      value1: [],
      waterfall: "2",
      fallen: "",
      used: "",
      gavatorta: "0",
      energy: []
    };
  },
  computed: {},
  beforeMount() {
    this.Protocol();
    this.Provinces(); //省市区
    this.queryLite(); //获取分类
    this.Addraudit(); //树形结构渲染
    this.Takeone();
  },
  created() {},
  watch: {
    filterText(val) {
      // console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    ofmoisture() {
      if (this.ruleForm.content > 100) {
        // alert("123213");
        this.ruleForm.content = "";
        this.$message.error("水分不能大于100");
      } else {
        // console.log(this.ruleForm.besaved);
        return;
      }
    },
    research() {
      // console.log(123);
      if (this.ruleForm.besaved > 100) {
        // alert("123213");
        this.ruleForm.besaved = "";
        this.$message.error("食部不能大于100");
      } else {
        // console.log(this.ruleForm.besaved);
        return;
      }
    },
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      // console.log(this.headerObj);
    },
    buttonClick(flat) {
      // console.log(index);
      // console.log(flat);
      this.waterfall = flat;
      this.display = flat;
      this.Addraudit();
    },
    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    },
    //省市区查询
    gProvinces() {
      // console.log(this.valuepark1[1]);
      console.log(this.valuepark1.length);
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

      // if (this.valuepark1[1]) {
      //   this.fallen = this.valuepark1[1];
      // } else {
      //   this.fallen = "";
      // }

      this.Addraudit();
      // this.valuepark1.forEach(item => {
      //   console.log(item[1]);
      // });
    },
    commonly() {
      // this.used = this.really1;
      // console.log(this.used);
      this.Addraudit();
    },
    disallow() {
      console.log(this.before1);
      this.Addraudit();
    },
    addition(index) {
      console.log(index);
      this.gavatorta = index;
      this.ruleForm.name = "";
      this.ruleForm.foods = "";
      this.ruleForm.foodFood = "";
      this.ruleForm.ovenFood = "";
      this.ruleForm.buffer = "";
      this.ruleForm.fooddata = "";
      this.ruleForm.dogfood = "";
      this.ruleForm.besaved = "";
      this.ruleForm.timers = "";
      this.ruleForm.content = "";
      this.ruleForm.resource = "";
      this.active = [];
      this.valuepark = [];
      this.productImgs = [];
      this.hideUploadEdit = this.productImgs.length >= 1;
      // this.valuepark.length = 0;
      this.ruleForm.desc = "";
      this.ruleForm.delivery = false;
      this.ruleForm.delivery1 = false;
      // this.mailto=this.energy;
      // console.log(this.energy)
      this.mailto.forEach(item => {
        console.log(item);
        item.children.forEach(item1 => {
          item1.result = "";
        });
      });
    },
    //食材库保存
    totally(formName) {
      console.log(this.mailto);
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
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
              pic: this.dialogImageUrl,
              isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
              isPub: this.ruleForm.delivery == false ? 1 : 0, //是否公开

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
        } else {
          // console.log("error submit!!");
          this.$message({
            message: "食材未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //编辑保存
    saved(formName) {
      // console.log(this.mailto);
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
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
              pic: this.dialogImageUrl,
              isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
              isPub: this.ruleForm.delivery == false ? 1 : 0, //是否公开

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
          // alert("submit!");
        } else {
          this.$message({
            message: "食材未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //查询
    stored() {
      console.log(123);
    },
    // graph() {
    //   this.Addraudit();
    // },
    //树形渲染数
    Addraudit() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getFoodByBaseId?isPrivate=1&typeTemp=${this.waterfall}&season=${this.before1}&isUse=${this.really1}&regionId=${this.fallen}&foodName=${this.filterText}`,
          {}
        )
        .then(res => {
          this.loadFlag = false;
          // console.log(res);
          this.fication = res.data.data;
          // console.log(this.fication);
          let Front = [];
          this.fication.forEach((item, index) => {
            // console.log(item);
            Front[index] = {
              id: item.id,
              label: item.typeName,
              view: 0
            };
            Front[index].children = [];
            item.foods.forEach((item1, index1) => {
              // console.log(item1.isPub);
              Front[index].children[index1] = {
                id: item1.id,
                label: item1.foodName,
                isPub: item1.isPub,
                isUse: item1.isUse,
                view: 1,
                delete: 1
              };
            });
          });
          // console.log(Front);
          this.data = Front;
          // console.log(this.data);
          // console.log(this.data.isPub);
        });
    },
    //点击查看详情
    handleNodeClick(data) {
      // console.log(data);
      if (data.view == 0) {
        return;
      } else {
        this.gavatorta = data.view;
        // console.log(this.gavatorta);
        this.mailto.forEach(item => {
          // console.log(item);
          item.children.forEach(item1 => {
            item1.result = "";
          });
        });
        this.valuepark = [];
        this.active = [];

        this.flour = data.id;

        this.$axios
          .get(`api/blade-food/food/detail?id=${this.flour}`, {})
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

            if (this.inquired.provinces) {
              let bar = [];
              this.inquired.provinces.split(",").forEach((item, i) => {
                if (item == this.inquired.belongRegion.split(",")[i]) {
                  bar.push([item]);
                } else {
                  bar.push([item, this.inquired.belongRegion.split(",")[i]]);
                }
              });
              // this.inquired.provinces.split(",").forEach((item, i) => {
              //   bar.push([item, this.inquired.belongRegion.split(",")[i]]);
              // });
              this.valuepark = bar;
              // console.log(this.valuepark);
            } else {
              this.valuepark = [];
            }

            // console.log(this.valuepark);
            // this.valuepark.push(
            //   this.inquired.provinces.split(','),
            //   this.inquired.belongRegion.split(','),
            // );

            // console.log(this.valuepark);
            // this.active.push(this.inquired.season); //所属季节
            if (this.inquired.season) {
              this.inquired.season.split(",").forEach(item => {
                this.active.push(item);
              });
            } else {
              this.active = [];
            }

            this.ruleForm.desc = this.inquired.function; //功用
            // this.productImgs = this.inquired.pic; //图片
            let picture = [];
            if (this.inquired.pic) {
              picture[0] = {
                url: this.inquired.pic
              };
            }
            this.productImgs = picture;
            this.hideUploadEdit = this.productImgs.length >= 1;

            this.dialogImageUrl = this.inquired.pic;
            console.log(this.productImgs);
            this.ruleForm.delivery = this.inquired.isPub == 1 ? false : true; //公开
            // console.log(this.ruleForm.delivery);
            this.ruleForm.delivery1 = this.inquired.isUse == 1 ? false : true; //常用

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
      }
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
          this.energy = this.mailto;
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

    resetForm() {
      // this.$refs[formName].resetFields(); //重置
      console.log(this.dialogImageUrl);
    },

    //查看
    prepare(data, index) {
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
        .post(`api/blade-food/food/changeIsUse`, {
          id: this.term,
          isUse: 0
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          data.isUse = 0;
          // this.Addraudit();
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
        .post(`api/blade-food/food/changeIsUse`, {
          id: this.term,
          isUse: 1
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          data.isUse = 1;
          // this.Addraudit();
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //设置隐藏
    multi(data) {
      this.term = data.id;
      this.$axios
        .post(`api/blade-food/food/changeIsPublic`, {
          id: this.term,
          isPub: 1
        })
        .then(res => {
          // console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          // this.Addraudit();
          data.isPub = 1;
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //设置公开
    docs(data) {
      this.term = data.id;
      this.$axios
        .post(`api/blade-food/food/changeIsPublic`, {
          id: this.term,
          isPub: 0
        })
        .then(res => {
          // console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          // this.Addraudit();
          data.isPub = 0;
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //删除
    remove(node, data) {
      console.log(data);
      this.saveall = data.id;
      // this.$axios
      //   .post(`api/blade-food/food/remove?ids=${this.saveall}`, {
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.$message({
      //       message: "删除成功",
      //       type: "success"
      //     });
      //     this.Addraudit();
      //   })
      //   .catch(() => {
      //     this.$message.error("删除失败");
      //   });
      this.$confirm("确认删除该食材?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`api/blade-food/food/remove?ids=${this.saveall}`, {})
            .then(res => {
              console.log(res);
              this.$message.success("删除成功");
              this.Addraudit();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //移除图片
    handleRemove(file, productImgs) {
      this.dialogImageUrl = "";
      this.hideUploadEdit = productImgs.length >= 1;
    },
    //预览图片
    handlePictureCardPreview(file) {
      console.log(file.url);

      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      //图片上传超过数量限制
      this.$message.error("上传图片不能超过1张!");
      console.log(files, fileList);
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.dialogImageUrl = res.data.link;
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = res.data.link;
      console.log(this.dialogImageUrl);
    },
    handleChangePic(file, productImgs) {
      // console.log(file);
      // console.log(productImgs);
      this.hideUploadEdit = productImgs.length >= 1;
      console.log(this.hideUploadEdit);
      // if (productImgs.length > 1) {
      //   productImgs.splice(0, 1);

      // }
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";

      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
};
</script>

<style lang="scss" scoped>
// .avue-view {
//   padding: 0 10px !important;
//   width: 100% !important;
//   height: 100% !important;
//   background-color: #fff;
//   -webkit-box-sizing: border-box;
//   box-sizing: border-box;
// }
.avue-view {
  padding: 0 5px !important;
}
.notice {
  /* background-color: #fff; */
  /* margin-bottom: 40px; */
  width: 100%;
  /* height: 100%; */
  position: absolute;
  overflow-y: auto;
  top: 50px;
  left: 10px;
  bottom: 9px;
  right: 10px;
}
.cation {
  /* width: 28.5%; */
  width: 400px;
  /* height: 600px; */
  /* height: 100%; */
  background-color: #fff;

  /* float: left; */
  border-right: 1px solid #e9ecf0;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
.el-input__inner {
  height: 35px !important;
}
.mation {
  /* width: 100%; */
  /* height: 100%; */
  /* height: 600px; */
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  position: absolute;
  left: 401px;
  right: 19px;
  bottom: 0;
  top: 0;
}
.footadd {
  // width: 100%;
  // height: 50px;
  // background-color: red;
  /* float: left; */
  position: relative;
  /* bottom: 0; */
  /* left: 0; */
  > button {
    position: fixed;
    bottom: 10px;
    right: 40%;
    margin: 0 auto;
    z-index: 999;
  }
}
.import {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  /* margin-top: 10px; */
  line-height: 50px;
}
.whole {
  width: 100%;
  height: 40px;

  /* background-color: red; */
}
.export {
  width: 70px;
  height: 30px;
  /* background-color: yellow; */
  text-align: center;
  /* line-height: 30px; */
  /* border-right: 1px solid #e0e0e0; */
  font-size: 14px;
  float: left;
  margin-left: 5px;
}
.toLine {
  width: 2px;
  height: 20px;
  margin-top: 5px;
  border-right: solid #acc0d8 1px;
  float: left;
}
.export1 {
  width: 70px;
  height: 30px;
  text-align: center;
  /* line-height: 20px; */
  /* border-right: 1px solid #e0e0e0; */
  font-size: 14px;
  float: left;
}
.export2 {
  width: 70px;
  height: 30px;
  text-align: center;
  /* line-height: 30px; */
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
  width: 90px;
  float: left;
  margin-left: 10px;
}
.monly {
  width: 100%;
  position: absolute;
  top: 197px;
  bottom: 0;
  /* background-color: red; */
  overflow-y: auto;
  margin-top: 10px;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
}
.mationinput {
  width: 750px;
  /* height: 600px; */
  /* overflow-y: auto; */
  /* height: 700px; */
  /* display: flex; */
  /* margin-left: 40px; */
  /* margin-bottom: 20px; */
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
  width: 100%;
  height: 500px;
  // margin-left: 40px;
  margin-bottom: 50px;
  /* background-color: red; */
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

/* .demo-block .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
} */
// .avatar-uploader .el-upload {
//   border: 1px dashed #d9d9d9 !important;
//   border-radius: 6px !important;
//   cursor: pointer !important;
//   position: relative !important;
//   overflow: hidden !important;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>
