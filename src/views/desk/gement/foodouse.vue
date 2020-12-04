<template>
  <div>
    <div class="notice">
      <div class="coffee">
        <el-input
          style="width: 250px; height: 35px;margin-left: 20px;margin-top: 10px;"
          placeholder="输入关键字进行查询"
          v-model="filterText"
        ></el-input>
        <div class="import">
          <el-button @click="increasevalue(1)" type="primary" size="mini"
            >加分类</el-button
          >
          <el-button @click="padded(0)" type="primary" size="mini"
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
              :props="{ checkStrictly: true }"
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
              node-key="id"
              :default-expand-all="false"
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
                    @click.stop="() => prevgame(data, 2)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-if="data.editors == 1"
                    type="text"
                    size="mini"
                    @click.stop="() => deleteMesh(data)"
                  >
                    删除分类
                  </el-button>
                  <!-- <el-button
                    v-if="data.view == 1"
                    type="text"
                    size="mini"
                    @click.stop="() => prepare(data, 2)"
                  >
                    查看
                  </el-button> -->

                  <el-button
                    type="text"
                    v-if="data.isUse == 1"
                    size="mini"
                    @click.stop="() => append(data)"
                  >
                    设置常用
                  </el-button>
                  <el-button
                    type="text"
                    v-if="data.isUse == 0"
                    size="mini"
                    @click.stop="() => insert(data)"
                  >
                    取消常用
                  </el-button>
                  <el-button
                    v-if="data.isPub == 0"
                    type="text"
                    size="mini"
                    @click.stop="() => multi(data)"
                  >
                    取消公开
                  </el-button>
                  <el-button
                    v-if="data.isPub == 1"
                    type="text"
                    size="mini"
                    @click.stop="() => docs(data)"
                  >
                    设置公开
                  </el-button>
                  <el-button
                    v-if="data.delete == 1"
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

      <!-- 结束 -->
      <div class="mation">
        <div class="mationinput">
          <div class="mationtxt">菜品信息</div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            :inline="true"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="菜品名字" prop="name" style="width: 345px">
              <el-input style="width: 200px" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="菜品分类" prop="fooddata" style="width: 345px">
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
            <el-form-item label="所属区域" style="width: 345px">
              <el-cascader
                style="width: 200px"
                v-model="valuepark"
                placeholder="请选择省市区"
                :options="options"
                :props="{ multiple: true, checkStrictly: true }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="所属季节" style="width:345px">
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

            <el-form-item label="特点" style="width: 345px">
              <el-input
                type="textarea"
                style="width: 200px"
                v-model="ruleForm.region"
              ></el-input>
            </el-form-item>
            <el-form-item label="做法" style="width: 345px">
              <el-input
                type="textarea"
                style="width: 200px"
                v-model="ruleForm.desc"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片" style="width: 345px">
              <el-upload
                action="api/blade-resource/oss/endpoint/put-file"
                list-type="picture-card"
                :file-list="productImgs"
                :on-change="handleChangePic"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :headers="headerObj"
              >
                <!-- <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" /> -->
                <i class="el-icon-plus"></i>
              </el-upload>
              <span style="color:#e0e0e0;  font-size: 11px;"
                >上传图片不能超过2M 只能是JPG PNG格式</span
              >
              <el-dialog append-to-body :visible.sync="dialogVisible">
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
          <!-- 菜品所含食材信息 -->
          <div class="mationtxt">菜品所含食材信息</div>
          <div>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              @click="addLine"
              >添加</el-button
            >
            <!-- <el-button @click="save">保存</el-button> -->
            <el-table
              :data="officeonce"
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
              <el-table-column label="食材名称" width="190" align="center">
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
                label="食材分类"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                width="130"
                prop="stats"
                label="用量(g)"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    style="width: 100px"
                    @blur="graph"
                    @input="hello(scope.row, scope.$index)"
                    v-model="scope.row.stats"
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="spring"
                label="能量(每百克)"
                width="110"
                align="center"
              ></el-table-column>

              <el-table-column
                prop="malloc"
                label="能量(Kcal)"
                width="120"
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
              <el-table-column
                v-if="show"
                prop="fruits"
                label="foodEat11"
                width="120"
                align="center"
              >
              </el-table-column>
              <!--操作格-->
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!-- <el-button type="text" size="small" style="margin-left: 10px"
            >查看</el-button
          > -->
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
              max-height="400"
              style="width: 99%; margin-bottom: 20px"
              row-key="id"
              v-loading="loadFlag"
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
                    :disabled="true"
                    v-model="scope.row.result"
                    type="text"
                    v-if="scope.row.level != 1 ? true : false"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- 添加分类 -->
      <el-dialog
        title="分类"
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
            <el-input
              type="text"
              maxlength="10"
              show-word-limit
              style="width: 280px"
              v-model="increasered.name"
            ></el-input>
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
      <!-- 树形结构 -->
      <el-dialog
        title="添加菜品"
        append-to-body
        width="40%"
        :visible.sync="dateTime"
        :close-on-click-modal="false"
      >
        <el-input placeholder="输入关键字进行过滤" v-model="filterText1">
        </el-input>
        <div class="block">
          <div class="rolling">
            <p></p>
            <el-tree
              :data="data1"
              node-key="id"
              :default-expand-all="false"
              @node-click="handleNodeClick"
              :filter-node-method="filterNode1"
              ref="tree"
            ></el-tree>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dateTime = false">取 消</el-button>
          <el-button @click="setlist" type="primary">确 定</el-button>
          <!-- <el-button @click="setlist" type="primary">编辑 确 定</el-button> -->
        </div>
      </el-dialog>

      <div class="gmsave">
        <el-button @click="saveItem" type="primary" v-if="this.editable == 1"
          >编辑保存</el-button
        >
        <el-button
          @click="savefiles('ruleForm')"
          type="primary"
          v-if="this.editable == 0"
          >保存并新增</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "notice",

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
      filterText1: "",
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

      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      headerObj: {
        "Blade-Auth": ""
      }, //上传图片请求头
      officeonce: [
        //菜品所含信息
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
          value: "0",
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
      editable: "0",
      fallen: "",
      auto: "",
      dptGross: [], //计算百分比
      gross: ""
    };
  },
  computed: {
    // officeonce:function(){
    // }
  },
  watch: {
    // (scope.row.stats / 100) * scope.row.malloc
    filterText(val) {
      // console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    },
    filterText1(val) {
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
    this.Takeone();
  },
  created() {},
  mounted() {},
  methods: {
    //初始数据获取token
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      console.log(this.headerObj);
    },
    buttonClick(flat) {
      this.waterfall = flat;
      this.display = flat;
      this.obtains();
    },
    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    },
    filterNode1(value, data1) {
      // console.log(data1);
      if (!value) return true;

      return data1.label.indexOf(value) !== -1;
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
      // if (this.valuepark1[1]) {
      //   this.fallen = this.valuepark1[1];
      // } else {
      //   this.fallen = "";
      // }
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
              label: item.typeName,
              view: 0
            };
            Front[index].children = [];
            item.foods.forEach((item1, index1) => {
              Front[index].children[index1] = {
                id: item1.id,
                label: item1.foodName,
                view: 1
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
      this.value1 = [];
      this.valuepark = [];
      this.officeonce = [];
      this.productImgs = [];
      this.mailto.forEach(item => {
        console.log(item);
        item.children.forEach(item1 => {
          item1.result = "";
        });
      });
      // console.log(this.editable);
      // this.$router.go(0);
    },
    //删除分类
    deleteMesh(data) {
      // let addid = `?id=${data.id}&type=2`;
      console.log(data);
      if (data.children.length == 0) {
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
      } else {
        this.$message({
          message: "请先清空该分类下的菜品再删除分类",
          type: "warning"
        });
      }
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
      if (this.increasered.name != "") {
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
      } else {
        this.$message({
          message: "分类名称未填",
          type: "warning"
        });
      }
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
        if (index === 0) {
          sums[index] = "能量合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (
          (!values.every(value => isNaN(value)) &&
            column.property == "malloc") ||
          column.property == "stats"
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
        console.log(this.temp[i]); //能量
        // console.log(row.stats); //输入的用量
        // console.log(row.fruits);
        // row.malloc = ((this.temp[i] / 100) * Number(row.stats)).toFixed(2);

        row.malloc = (
          ((this.temp[i] / 100) * Number(row.stats) * row.fruits) /
          100
        ).toFixed(2);
        //  console.log(this.gross);
        // console.log(row.malloc);
        // row.malloc = (Number(this.gross) * Number(this.dptGross)) / 100;
        console.log(row.malloc);
      } else {
        row.malloc = this.temp[i];
      }
    },
    handleNodeClick1(data) {
      // console.log(this.editable);
      // console.log(data);
      if (data.view == 0) {
        return;
      } else {
        this.editable = data.view;
        // console.log(123123)
        //  this.editable = index;
        // console.log(this.editable);
        this.auto = data.id;
        this.valuepark = [];
        this.value1 = [];

        this.$axios
          .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
          .then(res => {
            // console.log(res);
            this.handler = res.data.data;
            console.log(this.handler);
            this.ruleForm.name = this.handler.dishName; //菜品名字
            this.ruleForm.fooddata = this.handler.dishPubType; //菜品分类
            // this.value1.push(this.handler.season); //季节
            if (this.handler.season) {
              this.handler.season.split(",").forEach(item => {
                this.value1.push(item);
              });
            } else {
              this.value1 = [];
            }

            this.ruleForm.region = this.handler.function; //特点
            this.ruleForm.desc = this.handler.remark; //做法

            // let bar = [];
            // this.handler.provinces.split(",").forEach((item, i) => {
            //   bar.push([item, this.handler.belongRegion.split(",")[i]]);
            // });
            // this.valuepark = bar;
            if (this.handler.provinces) {
              let bar = [];
              this.handler.provinces.split(",").forEach((item, i) => {
                if (item == this.handler.belongRegion.split(",")[i]) {
                  bar.push([item]);
                } else {
                  bar.push([item, this.handler.belongRegion.split(",")[i]]);
                }
              });
              this.valuepark = bar;
              // console.log(this.valuepark);
            } else {
              this.valuepark = [];
            }
            let picture = [];
            if (this.handler.pic) {
              picture[0] = {
                url: this.handler.pic
              };
            }
            this.productImgs = picture;
            this.dialogImageUrl = this.handler.pic;
            // console.log(this.valuepark);
            this.ruleForm.delivery1 = this.handler.isUse == 1 ? false : true; //常用
            this.ruleForm.delivery = this.handler.isPub == 1 ? false : true; //公开
            // this.toBack = this.handler.dishMxVos;
            console.log(this.handler.dishMxVos);
            if (this.handler.dishMxVos) {
              let arr = [];
              this.temp.length = 0;
              this.handler.dishMxVos.forEach((item, index) => {
                this.temp[index] = Number(item.nutritionNlValue);
                // console.log(item);
                // this.officeonce[this.csListIndex].id = item.id;
                arr[index] = {
                  id: item.foodId,
                  frame: item.baseTypeId,
                  name: item.name,
                  address: item.baseTypeName,
                  stats: item.value,
                  spring: item.nutritionNlValue,
                  malloc: item.nutritionNlValue,
                  fruits: item.foodEat
                };
              });
              this.officeonce = arr;
              // console.log(this.officeonce);
              // this.addLine();
              this.graph();
            }

            // console.log(this.officeonce);
          });
      }
    },

    //点击查看详情
    handleNodeClick(data) {
      // console.log(data);
      if (data.view == 0) {
        return;
      } else {
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
            // this.dptGross = this.inquired.foodEat;
            console.log(this.dptGross);
            this.officeonce[this.csListIndex].id = this.inquired.id;
            this.officeonce[this.csListIndex].frame = this.inquired.foodType;
            this.officeonce[this.csListIndex].name = this.inquired.foodName;
            // this.officeonce[this.csListIndex].fr = this.inquired.foodEat;
            this.officeonce[
              this.csListIndex
            ].address = this.inquired.foodTypeName;
            this.officeonce[this.csListIndex].fruits = this.inquired.foodEat;
            // this.officeonce[this.csListIndex].name = this.inquired.foodName;
            //   console.log(this.getInput);
            this.temp.length = 0;
            console.log(this.officeonce);
            this.officeonce.forEach((item, i) => {
              this.temp[i] = Number(item.malloc);
            });
            console.log(this.temp);
          });
      }
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
        malloc: "", //能量kcal
        fruits: ""
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
          pic: this.dialogImageUrl, //图片
          isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
          isPub: this.ruleForm.delivery == false ? 1 : 0, //是否公开
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
          isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
          isPub: this.ruleForm.delivery == false ? 1 : 0, //是否公开
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
          pic: this.dialogImageUrl, //图片
          isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
          isPub: this.ruleForm.delivery == false ? 1 : 0, //是否公开
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
          // alert("submit!");
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
              dishName: this.ruleForm.name, //菜品名字
              dishType: this.ruleForm.fooddata, //菜品分类
              seasons: this.value1, //季节
              function: this.ruleForm.region,
              remark: this.ruleForm.desc,
              belongRegions: this.valuepark,
              isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
              isPub: this.ruleForm.delivery == false ? 1 : 0, //是否公开
              dishMxVos: next
            })
            .then(res => {
              console.log(res);

              this.mysave();
            });
        } else {
          this.$message({
            message: "食材未填全",
            type: "warning"
          });
          return false;
        }
      });
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

    //树形结构
    //查看
    prepare(data, index) {
      console.log(data);
      this.editable = index;
      console.log(this.editable);
      // this.auto = data.id;
      // this.valuepark = [];
      // this.value1 = [];
      // // this.csListIndex = index;
      // this.$axios
      //   .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
      //   .then((res) => {
      //     // console.log(res);
      //     this.handler = res.data.data;
      //     console.log(this.handler);
      //     this.ruleForm.name = this.handler.dishName; //菜品名字
      //     this.ruleForm.fooddata = this.handler.dishPubType; //菜品分类
      //     // this.value1.push(this.handler.season); //季节
      //     if (this.handler.season) {
      //       this.handler.season.split(",").forEach((item) => {
      //         this.value1.push(item);
      //       });
      //     } else {
      //       this.value1 = [];
      //     }

      //     this.ruleForm.region = this.handler.function; //特点
      //     this.ruleForm.desc = this.handler.remark; //做法

      //     // let bar = [];
      //     // this.handler.provinces.split(",").forEach((item, i) => {
      //     //   bar.push([item, this.handler.belongRegion.split(",")[i]]);
      //     // });
      //     // this.valuepark = bar;
      //     if (this.handler.provinces) {
      //       let bar = [];
      //       this.handler.provinces.split(",").forEach((item, i) => {
      //         if (item == this.handler.belongRegion.split(",")[i]) {
      //           bar.push([item]);
      //         } else {
      //           bar.push([item, this.handler.belongRegion.split(",")[i]]);
      //         }
      //       });
      //       this.valuepark = bar;
      //       // console.log(this.valuepark);
      //     } else {
      //       this.valuepark = [];
      //     }
      //     let picture = [];
      //     if (this.handler.pic) {
      //       picture[0] = {
      //         url: this.handler.pic,
      //       };
      //     }
      //     this.productImgs = picture;
      //     this.dialogImageUrl = this.handler.pic;
      //     // console.log(this.valuepark);
      //     this.ruleForm.delivery1 = this.handler.isUse == 1 ? false : true; //常用
      //     this.ruleForm.delivery = this.handler.isPub == 1 ? false : true; //公开
      //     // this.toBack = this.handler.dishMxVos;
      //     console.log(this.handler.dishMxVos);
      //     if (this.handler.dishMxVos) {
      //       let arr = [];
      //       this.temp.length = 0;
      //       this.handler.dishMxVos.forEach((item, index) => {
      //         this.temp[index] = Number(item.nutritionNlValue);
      //         // console.log(item);
      //         // this.officeonce[this.csListIndex].id = item.id;
      //         arr[index] = {
      //           id: item.foodId,
      //           frame: item.baseTypeId,
      //           name: item.name,
      //           address: item.baseTypeName,
      //           stats: item.value,
      //           spring: item.nutritionNlValue,
      //           malloc: item.nutritionNlValue,
      //           fruits: item.foodEat,
      //         };
      //       });
      //       this.officeonce = arr;
      //       // console.log(this.officeonce);

      //       // this.addLine();
      //       this.graph();
      //     }

      //     // console.log(this.officeonce);
      //   });
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
          this.obtains();
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
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
          this.obtains();
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //设置隐藏
    multi(data) {
      // console.log(data)
      this.key = data.id;
      this.$axios
        .post(`api/blade-food/dish/changeIsPub`, {
          id: this.key,
          isPub: 1
        })
        .then(res => {
          this.obtains();
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //设置公开
    docs(data) {
      this.terms = data.id;
      this.$axios
        .post(`api/blade-food/dish/changeIsPub`, {
          id: this.terms,
          isPub: 0
        })
        .then(res => {
          this.obtains();
          console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },

    //删除删除
    remove(node, data) {
      console.log(data);
      this.$confirm("确认删除该菜品?", "提示", {
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
    },
    //移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
    handleChangePic(file, productImgs) {
      console.log(file);
      console.log(productImgs);
      if (productImgs.length > 1) {
        productImgs.splice(0, 1);
        // this.productImgs = [productImgs[productImgs.length - 1].raw];
        // console.log(1);
      }
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
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style scoped>
.notice {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  /* background-color: #fff; */
  overflow-y: auto;
  top: 50px;
  left: 10px;
  bottom: 0px;
  right: 0px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
.coffee {
  /* width: 350px; */
  width: 350px;
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
.mation {
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  position: absolute;
  left: 351px;
  right: 19px;
  bottom: 0;
  top: 0;
  /* margin-bottom: 40px; */
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
  /* height: 450px; */
  overflow-y: auto;
  position: absolute;
  /* background-color: red; */
  top: 197px;
  bottom: 10px;
  margin-top: 5px;
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
  /* overflow-y: auto; */
  margin-left: 10px;
  margin-bottom: 20px;
}
.saveas {
  width: 95%;
  /* height: 500px; */
  margin-left: 40px;
  margin-bottom: 50px;
  /* background-color: red; */
}
.gmsave {
  /* float: left; */
  text-align: center;
  width: 100%;
  background-color: #fff;
  /* width: 100%; */
  /* height: 50px;
  line-height: 50px; */
  /* margin-bottom: 40px; */
  /* background-color: #fff; */
  position: fixed;
  /* left: 0; */
  /* right: 30%; */
  bottom: 10px;
  z-index: 999;
}
.rolling {
  width: 100%;
  height: 300px;
  overflow-y: auto;
}
</style>
