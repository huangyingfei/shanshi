<template>
  <div class="often">
    <div class="coffee">
      <el-input
        style="width: 250px; height: 35px;margin-left: 20px;margin-top: 10px;"
        placeholder="请输入内容"
        v-model="filterText"
        clearable
      ></el-input>
      <div class="import">
        <!-- <el-button type="primary" plain size="mini">导入</el-button>
        <el-button type="primary" plain size="mini">导出</el-button> -->
        <el-button @click="increasevalue(1)" type="primary" size="mini"
          >加分类</el-button
        >
        <el-button @click="padded(1)" type="primary" size="mini"
          >加菜品</el-button
        >
      </div>
      <!-- <div @click="showImg" class="showSearch">
        <el-button v-if="!showSearch">常用</el-button>
        <el-button type="primary" v-if="showSearch">不常用</el-button>
      </div> -->
      <div class="whole">
        <div class="export">
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
            clearable
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
            :data="data"
            v-loading="loadFlag2"
            :props="defaultProps"
            node-key="id"
            :default-expand-all="false"
            :expand-on-click-node="false"
            @node-click="handleNodeClick1"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  v-if="data.editors == 1"
                  type="text"
                  size="mini"
                  @click="() => prevgame(data, 2)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="data.editors == 1"
                  type="text"
                  size="mini"
                  @click="() => deleteMesh(data)"
                >
                  删除分类
                </el-button>
                <el-button
                  v-if="data.view == 1"
                  type="text"
                  size="mini"
                  @click="() => prepare(data, 2)"
                >
                  查看
                </el-button>

                <el-button
                  type="text"
                  v-if="data.isUse == 0"
                  size="mini"
                  @click="() => append(data)"
                >
                  常用
                </el-button>
                <el-button
                  type="text"
                  v-if="data.isUse == 1"
                  size="mini"
                  @click="() => insert(data)"
                >
                  不常用
                </el-button>
                <el-button
                  v-if="data.isPub == 1"
                  type="text"
                  size="mini"
                  @click="() => multi(data)"
                >
                  隐藏
                </el-button>
                <el-button
                  v-if="data.isPub == 0"
                  type="text"
                  size="mini"
                  @click="() => docs(data)"
                >
                  公开
                </el-button>
                <el-button
                  v-if="data.delete == 1"
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
    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      width="30%"
      append-to-body
      :visible.sync="increase"
      :close-on-click-modal="false"
    >
      <el-form
        :model="increasered"
        :rules="logout"
        ref="increasered"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input style="width: 300px" v-model="increasered.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="increase = false">取 消</el-button>
        <el-button
          @click="palette('formName')"
          v-if="this.autosaved == 1"
          type="primary"
          >确 定</el-button
        >
        <el-button
          @click="fontName('formName')"
          v-if="this.autosaved == 2"
          type="primary"
          >编辑确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 结束 -->
    <div class="mation">
      <div class="mationtxt">菜品信息</div>
      <div class="mationinput">
        <el-form
          :model="ruleForm"
          :rules="rules"
          :inline="true"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="菜品名字" prop="name" style="width: 350px">
            <el-input style="width: 200px" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="菜品分类" prop="fooddata" style="width: 350px">
            <el-select
              style="width: 200px"
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
          </el-form-item>
          <el-form-item label="所属区域" style="width: 350px">
            <el-cascader
              style="width: 200px"
              v-model="valuepark"
              placeholder="请选择省市区"
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="所属季节" style="width: 350px">
            <el-select v-model="value1" multiple placeholder="请选择">
              <el-option
                style="width: 200px"
                v-for="item in crashof"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="特点" style="width: 350px">
            <el-input
              type="textarea"
              style="width: 200px"
              v-model="ruleForm.region"
            ></el-input>
          </el-form-item>
          <el-form-item label="做法" style="width: 350px">
            <el-input
              type="textarea"
              style="width: 200px"
              v-model="ruleForm.desc"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片" style="width: 350px">
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
          <el-form-item label="公开" style="">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="常用" style="">
            <el-switch v-model="ruleForm.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 树形结构 -->
      <el-dialog
        title="添加食品名称"
        append-to-body
        :visible.sync="dateTime"
        :close-on-click-modal="false"
      >
        <div class="monly">
          <div class="block">
            <p></p>
            <el-tree
              :data="data1"
              node-key="id"
              :default-expand-all="false"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dateTime = false">取 消</el-button>
          <el-button @click="setlist" type="primary">确 定</el-button>
          <el-button @click="setlist" type="primary">编辑 确 定</el-button>
        </div>
      </el-dialog>
      <!-- 菜品所含食材信息 -->
      <div class="mationtxt">菜品所含食材信息</div>
      <div>
        <el-button style="margin-left: 10px;" type="primary" @click="addLine"
          >添加行数</el-button
        >
        <el-button @click="save">保存</el-button>
        <el-table
          :data="officeonce"
          border
          v-loading="loadFlag1"
          show-summary
          style="width: 100%"
          :summary-method="getSummaries"
        >
          <el-table-column prop="id" label="序号" width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="frame"
            label="分类ID "
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="食品名称" width="190" align="center">
            <template slot-scope="scope">
              <el-input
                style="width: 90px"
                v-model="scope.row.name"
                :disabled="true"
              >
              </el-input>
              <el-button
                type="primary"
                size="small"
                style="   margin-left: 10px;"
                @click="columnEvent(scope.row, scope.$index)"
                plain
                >选择</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="食品分类"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="stats"
            label="用量(g)"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                style="width: 90px"
                @blur="graph"
                @input="hello(scope.row, scope.$index)"
                v-model="scope.row.stats"
                clearable
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="spring"
            label="能量"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="malloc"
            label="能量(kcal)"
            width="110"
            align="center"
          >
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" style="margin-left: 10px"
                >查看</el-button
              >
              <el-button
                type="text"
                size="small"
                style="margin-left: 10px"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 菜品营养素信息 -->
      <div class="mationtxt">菜品营养素信息</div>
      <div class="saveas">
        <el-table
          :data="mailto"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          v-loading="loadFlag"
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
      <div style="text-align: center;">
        <el-button @click="saveItem" type="primary" v-if="this.editable == 2"
          >编辑保存</el-button
        >
        <el-button
          @click="savefiles('ruleForm')"
          type="primary"
          v-if="this.editable == 1"
          >保存并新增</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "often",

  data() {
    const data = [
      //树形结构
    ];
    return {
      display: "2",
      increasered: {
        name: ""
      },
      sumss: "",
      showSearch: false,
      loadFlag: false, //加载flag
      loadFlag1: false, //加载
      loadFlag2: false,
      dateTime: false, //弹出框
      input: "", //搜索
      mailto: [],
      getInput: {
        cs: "123123",
        cs2: ""
      }, //表格输入框
      examine: [
        //下拉框分类
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
      data: JSON.parse(JSON.stringify(data)), //树形结构
      ruleForm: {
        name: "", //菜品名字
        fooddata: "", //菜品分类
        region: "", //特点
        desc: "", //做法
        delivery: false, //公开
        delivery1: false //常用
      },
      foodPos: [], //菜品分类
      filterText: "",
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        fooddata: [
          { required: true, message: "请选择菜品分类", trigger: "change" }
        ]
      },
      value1: [], //所属季节
      valuepark: [], //省市区
      options: [], //省市联动
      //季节
      crashof: [
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

      dialogImageUrl: "", //上传图片
      dialogVisible: false, //上传图片
      officeonce: [
        //菜品所含信息
        {
          id: "",
          frame: "", //分类ID
          name: "", //食品名称
          address: "", //食品分类
          stats: "", //用量
          spring: "", //能量
          malloc: "" //能量kcal
        }
      ],
      temp: [],
      tableData: [], //营养素含量
      csList: {},
      csListIndex: null,
      defaultProps: {
        children: "children",
        label: "label"
      },
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
      //全部 常用
      really: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "常用"
        }
      ],
      really1: "",
      increase: false,
      logout: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      },
      waterfall: "2",
      autosaved: "",
      modify: "",
      editable: "1",
      fallen: "",
      auto: ""
    };
  },
  computed: {
    // officeonce:function(){
    // }
  },
  watch: {
    // (scope.row.stats / 100) * scope.row.malloc
    filterText(val) {
      console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    }
  },
  beforeMount() {
    this.Protocol(); //营养素含量
    this.Provinces(); //省市区
    this.Addraudit(); //树形结构渲染
    // this.queryLite(); //获取分类
    this.muito(); //分类
    this.obtains(); //获取树形结构
    this.request();
  },
  mounted() {},
  methods: {
    buttonClick(flat) {
      this.waterfall = flat;
      this.display = flat;
      this.obtains();
    },
    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
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
      if (this.valuepark1[1]) {
        this.fallen = this.valuepark1[1];
      } else {
        this.fallen = "";
      }

      this.obtains();
    },
    //菜品获取树形结构
    obtains() {
      this.loadFlag2 = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getDishByBaseId?isPrivate=${1}&typeTemp=${
            this.waterfall
          }&season=${this.before1}&isUse=${this.really1}&regionId=${
            this.fallen
          }`
        )
        // .get(`api/blade-food/basetype/getDishByBaseId?isPrivate=${1}`)
        .then(res => {
          this.loadFlag2 = false;
          //   console.log(res);
          this.obtain = res.data.data;
          let foto = [];
          this.obtain.forEach((item, index) => {
            // console.log(item);
            foto[index] = {
              id: item.id,
              label: item.typeName,
              editors: 1
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
          this.data = foto;
          console.log(foto);
        });
    },
    //菜品所含信息树形渲染数
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
          //   console.log(this.fication);
          let Front = [];
          this.fication.forEach((item, index) => {
            // console.log(item);
            Front[index] = {
              id: item.id,
              label: item.typeName
            };
            Front[index].children = [];
            item.foods.forEach((item1, index1) => {
              Front[index].children[index1] = {
                id: item1.id,
                label: item1.foodName
              };
            });
          });
          // console.log(Front);
          this.data1 = Front;
        });
    },
    //增加菜品
    padded(index) {
      console.log(index);
      this.editable = index;
      this.ruleForm.name = "";
      this.ruleForm.fooddata = "";
      this.ruleForm.region = "";
      this.ruleForm.desc = "";
      this.ruleForm.delivery = false;
      this.ruleForm.delivery1 = false;
      this.value1.length = 0;
      // console.log(this.editable);
      // this.$router.go(0);
    },
    //删除分类
    deleteMesh(data) {
      // let addid = `?id=${data.id}&type=2`;
      this.$confirm("确认删除该菜品分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`api/blade-food/basetype/remove`, {
              id: data.id,
              type: 2
            })
            .then(res => {
              // console.log(res);
              this.obtains();
              this.muito();
              this.$message.success("删除成功");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //增加分类
    palette() {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      this.$axios
        .post(`api/blade-food/basetype/save`, {
          typeName: this.increasered.name,
          type: 2
        })
        .then(res => {
          // console.log(res);
          this.increase = false;
          this.obtains();
          this.muito();
          this.$message({
            message: "新增成功",
            type: "success"
          });
        });
    },
    fontName() {
      this.$axios
        .post(`api/blade-food/basetype/update`, {
          id: this.modify,
          typeName: this.increasered.name
        })
        .then(res => {
          this.increase = false;
          this.obtains();
          this.muito();
          this.$message({
            message: "编辑成功",
            type: "success"
          });
        });
    },
    //增加分类弹框
    increasevalue(index) {
      // console.log(index);
      this.autosaved = index;
      this.increasered.name = "";
      this.increase = true;
    },
    prevgame(data, index) {
      // console.log(index);
      this.autosaved = index;
      // console.log(data);\
      this.modify = data.id;
      this.increasered.name = data.label;
      this.increase = true;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        // if (index === 0) {
        //   sums[index] = '总价';
        //   return;
        // }
        const values = data.map(item => Number(item[column.property]));
        if (
          !values.every(value => isNaN(value)) &&
          column.property == "malloc"
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
          this.sumss = sums[index];
          // if (this.mailto[0].children[0].id == "101") {
          //   this.mailto[0].children[0].result = this.sumss;
          // }
          // console.log(this.sumss);
        }
      });
      return sums;
    },

    showImg() {
      this.showSearch = !this.showSearch;
    },
    hello(row, i) {
      // row.malloc = (row.stats / 100) * row.malloc;
      // row.malloc = row.malloc100;
      // row.malloc = (row.malloc / 100) * row.stats;
      // console.log(row.malloc);
      if (row.stats) {
        console.log(this.temp[i]);
        row.malloc = ((this.temp[i] / 100) * Number(row.stats)).toFixed(2);
        // console.log(row.malloc);
      } else {
        row.malloc = this.temp[i];
      }
    },
    handleNodeClick1(data) {
      console.log(data);
    },

    //点击查看详情
    handleNodeClick(data) {
      console.log(data);
      this.getInput = data.label;
      console.log(this.getInput);
      this.flour = data.id;
      this.$axios
        .get(`api/blade-food/food/detail?id=${this.flour}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          //   console.log(res);
          this.inquired = res.data.data;
          console.log(this.inquired);
          if (this.inquired.nutritions) {
            this.inquired.nutritions.forEach((item, index) => {
              // console.log(item);
              if (item.nutrientId == 101) {
                this.officeonce[this.csListIndex].malloc = item.value;
                this.officeonce[this.csListIndex].spring = item.value;
              }
            });
          }

          //   this.getInput.cs = this.inquired.foodName; //食材名
          this.officeonce[this.csListIndex].id = this.inquired.id;
          this.officeonce[this.csListIndex].frame = this.inquired.foodType;
          this.officeonce[this.csListIndex].name = this.inquired.foodName;
          this.officeonce[
            this.csListIndex
          ].address = this.inquired.foodTypeName;
          // this.officeonce[this.csListIndex].name = this.inquired.foodName;
          //   console.log(this.getInput);
          this.temp.length = 0;
          this.officeonce.forEach((item, i) => {
            this.temp[i] = Number(item.malloc);
          });
          console.log(this.temp);
        });
    },
    //添加行数
    addLine() {
      var newValue = {
        id: "",
        frame: "", //分类ID
        name: "", //食品名称
        address: "", //食品分类
        stats: "", //用量
        spring: "", //能量
        malloc: "" //能量kcal
      };
      //添加新的行数
      this.officeonce.push(newValue);
    },
    handleDelete(index) {
      //删除行数
      this.officeonce.splice(index, 1);
    },
    save() {
      //这部分应该是保存提交你添加的内容
      console.log(JSON.stringify(this.officeonce));
    },
    //失去焦点事件
    graph() {
      // console.log(this.officeonce);
      let next = [];
      this.officeonce.forEach(item => {
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
          this.atomic = res.data.data;
          // console.log(this.atomic);
          // let touch=[];
          this.atomic.forEach(item => {
            // console.log(item);
            for (let item1 of this.mailto) {
              // console.log(item1);
              for (let arr of item1.children) {
                // console.log(arr);
                if (arr.id == item.nutrientId) {
                  arr.result = item.total;
                }
                //   if (arr.children) {
                //     for (let add of arr.children) {
                //       console.log(add);
                //       if (add.id == item.nutrientId) {
                //         add.result = item.value;
                //       }
                //     }
                //   }
              }
            }
          });
        });
    },
    //编辑保存
    editorTab() {
      let next = [];
      this.officeonce.forEach(item => {
        console.log(item);
        next.push({
          foodId: item.id,
          value: item.stats,
          baseTypeId: item.frame
        });
      });
      this.$axios
        .post(`api/blade-food/dish/update`, {
          id: this.auto,
          dishName: this.ruleForm.name, //菜品名字
          dishType: this.ruleForm.fooddata, //菜品分类
          seasons: this.value1, //季节
          function: this.ruleForm.region, //特点
          remark: this.ruleForm.desc, //做法
          belongRegions: this.valuepark, //省市区
          isUse: this.ruleForm.delivery1 == false ? 0 : 1, //是否常用
          isPub: this.ruleForm.delivery == false ? 0 : 1, //是否公开
          dishMxVos: next //菜品所含食材信息
        })
        .then(res => {
          console.log(res);
          this.obtains();
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
    },
    //编辑保存
    saveItem() {
      // this.editorTab();
      // console.log(123123);
      let next = [];
      this.officeonce.forEach((item, index) => {
        // console.log(item);
        next.push({
          foodId: item.id,
          value: item.stats
        });
      });
      console.log(next);

      this.$axios
        .post(`api/blade-food/dish/hasOkFood`, {
          id: this.auto,
          dishName: this.ruleForm.name, //菜品名字
          dishType: this.ruleForm.fooddata, //菜品分类
          seasons: this.value1, //季节
          function: this.ruleForm.region,
          remark: this.ruleForm.desc,
          belongRegions: this.valuepark,
          isUse: this.ruleForm.delivery1 == false ? 0 : 1, //是否常用
          isPub: this.ruleForm.delivery == false ? 0 : 1, //是否公开
          dishMxVos: next
        })
        .then(res => {
          console.log(res);

          this.obtains();
          this.editorTab();
        });
    },
    //保存并新增
    mysave() {
      let next = [];
      this.officeonce.forEach(item => {
        console.log(item);
        next.push({
          foodId: item.id,
          value: item.stats,
          baseTypeId: item.frame
        });
      });
      //   console.log(next);

      this.$axios
        .post(`api/blade-food/dish/save`, {
          dishName: this.ruleForm.name, //菜品名字
          dishType: this.ruleForm.fooddata, //菜品分类
          seasons: this.value1, //季节
          function: this.ruleForm.region, //特点
          remark: this.ruleForm.desc, //做法
          belongRegions: this.valuepark, //省市区
          isUse: this.ruleForm.delivery1 == false ? 0 : 1, //是否常用
          isPub: this.ruleForm.delivery == false ? 0 : 1, //是否公开
          dishMxVos: next //菜品所含食材信息
        })
        .then(res => {
          console.log(res);
          // this.muito();
          this.obtains();
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
    },
    savefiles(formName) {
      // console.log(this.value1);
      // console.log(this.officeonce);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // let next = [];
      // this.officeonce.forEach((item, index) => {
      //   // console.log(item);
      //   next.push({
      //     foodId: item.id,
      //     value: item.stats
      //   });
      // });
      // console.log(next);

      // this.$axios
      //   .post(`api/blade-food/dish/hasOkFood`, {
      //     dishName: this.ruleForm.name, //菜品名字
      //     dishType: this.ruleForm.fooddata, //菜品分类
      //     seasons: this.value1, //季节
      //     function: this.ruleForm.region,
      //     remark: this.ruleForm.desc,
      //     belongRegions: this.valuepark,
      //     isUse: this.ruleForm.delivery1 == false ? 0 : 1, //是否常用
      //     isPub: this.ruleForm.delivery == false ? 0 : 1, //是否公开
      //     dishMxVos: next
      //   })
      //   .then(res => {
      //     console.log(res);

      //     this.mysave();
      //   });
    },
    //表格弹出框
    columnEvent(row, index) {
      this.dateTime = true;
      this.csListIndex = index;
      //   for (let k in row) {
      //     this.csList[k] = row[k];
      //   }
    },
    setlist() {
      this.dateTime = false;
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
    // 分类
    muito() {
      this.$axios
        .get(`api/blade-food/basetype/getList?type=${2}&isPrivate=${1}`, {})
        .then(res => {
          //   console.log(res);
          this.details = res.data.data;
          let obtain = [];
          this.details.forEach((item, index) => {
            // console.log(item);
            obtain.push({
              value: item.id,
              label: item.typeName
            });
          });
          console.log(obtain);
          this.foodPos = obtain;
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
    request() {
      this.loadFlag = true;
      this.$axios
        .post(`api/blade-food/food/getNutritionbyFoodList`, [
          { foodId: 1314805343449788418, value: 20 }
        ])
        .then(res => {
          console.log(res);
          this.loadFlag = false;
        });
    },
    // queryLite() {
    //   this.$axios
    //     .get(`api/blade-food/basetype/list?type=1`, {
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     })
    //     .then(res => {
    //       // console.log(res);
    //       this.tionDate = res.data.data;
    //       // console.log(this.tionDate);
    //       let cation = [];
    //       // children
    //       this.tionDate.forEach((item, index) => {
    //         cation[index] = {
    //           value: item.id,
    //           label: item.typeName
    //         };
    //       });
    //       // console.log(cation);
    //       this.foodPos = cation;
    //     });
    // },
    handleRemove(file, fileList) {
      //上传图片
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //上传图片
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //树形结构
    //查看
    prepare(data, index) {
      // console.log(data);
      this.editable = index;
      this.auto = data.id;
      this.valuepark.length = 0;
      this.value1.length = 0;
      // this.csListIndex = index;
      this.$axios
        .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
        .then(res => {
          // console.log(res);
          this.handler = res.data.data;
          console.log(this.handler);
          this.ruleForm.name = this.handler.dishName; //菜品名字
          this.ruleForm.fooddata = this.handler.dishType; //菜品分类
          // this.value1.push(this.handler.season); //季节
          this.handler.season.split(",").forEach(item => {
            this.value1.push(item);
          });
          this.ruleForm.region = this.handler.function; //特点
          this.ruleForm.desc = this.handler.remark; //做法

          let bar = [];
          this.handler.provinces.split(",").forEach((item, i) => {
            bar.push([item, this.handler.belongRegion.split(",")[i]]);
          });
          this.valuepark = bar;
          // console.log(this.valuepark);
          this.ruleForm.delivery1 = this.handler.isUse == 0 ? false : true; //常用
          this.ruleForm.delivery = this.handler.isPub == 0 ? false : true; //公开
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
                malloc: item.nutritionNlValue
              };
            });
            this.officeonce = arr;

            // this.addLine();
          }

          console.log(this.officeonce);
        });
    },
    //设置常用
    append(data) {
      console.log(data);
      // let infos = data.id;
      this.hack = data.id;
      this.$axios
        .post(`api/blade-food/dish/changeIsUse`, {
          id: this.hack,
          isUse: 0
        })
        .then(res => {
          console.log(res);
        });
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },
    //设置不常用
    insert(data) {
      // console.log(data);
      this.ture = data.id;
      this.$axios
        .post(`api/blade-food/dish/changeIsUse`, {
          id: this.ture,
          isUse: 1
        })
        .then(res => {
          console.log(res);
        });
    },
    //设置隐藏
    multi(data) {
      // console.log(data)
      this.key = data.id;
      this.$axios(`blade-food/dish/changeIsPub`, {
        id: this.key,
        isPub: 1
      }).then(res => {
        console.log(res);
      });
    },
    //设置公开
    docs(data) {
      this.terms = data.id;
      this.$axios(`blade-food/dish/changeIsPub`, {
        id: this.terms,
        isPub: 0
      }).then(res => {
        console.log(res);
      });
    },

    //删除删除
    remove(node, data) {
      console.log(data);
      this.$confirm("确认删除该来源比例?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let addid = `?ids=${data.id}`;
          this.$axios
            .post(`api/blade-food/dish/remove` + addid, {})
            .then(res => {
              console.log(res);
              this.$message.success("删除成功");
              this.obtains();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // this.facet = data.id;
      // let addid = `?ids=${data.id}`;
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
      // this.$axios.post(`api/blade-food/dish/remove` + addid).then(res => {
      //   console.log(res);
      //   this.Addraudit();
      // });
    }
  }
};
</script>

<style scoped>
.often {
  width: 100%;
  height: 100%;
  margin-left: -10px;
}
.coffee {
  width: 29%;
  height: 1300px;
  background-color: #fff;
  float: left;
  border-right: 1px solid #e0e0e0;
  margin-bottom: 40px;
}
.mation {
  width: 70%;
  height: 1300px;
  background-color: #fff;
  float: left;
  margin-bottom: 40px;
}
.import {
  width: 200px;
  height: 50px;
  /* background-color: red; */
  margin-left: 20px;
  margin-top: 10px;
  line-height: 50px;
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
  margin-left: 20px;
}
.country2 {
  width: 90px;
  float: left;
  margin-left: 10px;
}
.whole {
  width: 300px;
  height: 40px;
  margin-left: 13px;
  /* background-color: red; */
}
.export {
  width: 70px;
  height: 30px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;
  /* border-right: 1px solid#e0e0e0; */
  font-size: 14px;
  float: left;
}
.toLine {
  width: 2px;
  height: 20px;
  margin-top: 6px;
  border-right: solid #acc0d8 1px;
  float: left;
}
.export1 {
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  /* border-right: 1px solid #e0e0e0; */
  font-size: 14px;
  float: left;
}
.export2 {
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  float: left;
}
.monly {
  width: 100%;
  height: 300px;

  margin-top: 10px;
}
.custom-tree-node {
  flex: 1;
  display: "2";
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
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
.saveas {
  width: 95%;
  /* height: 500px; */
  margin-left: 40px;
  /* background-color: red; */
}
</style>
