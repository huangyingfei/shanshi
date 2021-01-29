<template>
  <div>
    <div class="dishes">
      <!-- 左边 -->
      <div class="coffee">
        <el-input
          @change="obtains"
          style="
                width: 250px;
                height: 35px;
                margin-left: 10px;
              "
          placeholder="输入关键字进行查询"
          v-model="filterText"
        ></el-input>
        <div class="import">
          <!-- <el-button type="primary" plain size="mini">导入</el-button>
              <el-button type="primary" plain size="mini">导出</el-button> -->
          <el-button @click="increasevalue(1)" type="primary" size="mini"
            >加分类</el-button
          >
          <el-button @click="padded(0)" type="primary" size="mini"
            >加菜品</el-button
          >
        </div>
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
              @change="gProvinces()"
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
              :props="defaultProps"
              v-loading="loadFlag"
              node-key="id"
              :default-expand-all="false"
              @node-click="handleNodeClick"
              :filter-node-method="filterNode"
              ref="tree"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span :class="[data.isPub == 0 ? 'cannot' : '']">{{
                  node.label
                }}</span>
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
                        type="text"
                        size="mini"
                        v-if="data.view == 1"
                        @click="() => prepare(data, 2)"
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
                  <!-- <el-button
                        v-if="data.isPub == 0"
                        type="text"
                        size="mini"
                        @click.stop="() => multi(data)"
                      >
                        取消公开
                      </el-button> -->
                  <el-button
                    v-else-if="data.isPub == 1"
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
          ref="increasered"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称">
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
          <el-button @click="palette" v-if="this.autosaved == 1" type="primary"
            >确 定</el-button
          >
          <el-button @click="fontName" v-if="this.autosaved == 2" type="primary"
            >编辑确定</el-button
          >
        </div>
      </el-dialog>
      <!--右边 -->
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
              <el-input
                maxlength="10"
                show-word-limit
                style="width: 200px"
                v-model="ruleForm.name"
              ></el-input>
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
                  v-for="item in context"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="特点" style="width: 350px">
              <el-input
                maxlength="30"
                show-word-limit
                type="textarea"
                style="width: 200px"
                v-model="ruleForm.region"
              ></el-input>
            </el-form-item>
            <el-form-item label="做法" style="width: 350px">
              <el-input
                maxlength="30"
                show-word-limit
                type="textarea"
                style="width: 200px"
                v-model="ruleForm.desc"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片" style="width: 350px">
              <el-upload
                :class="{ hide: hideUploadEdit }"
                accept=".jpeg,.jpg,.gif,.png"
                :limit="1"
                action="api/blade-resource/oss/endpoint/put-file"
                list-type="picture-card"
                :file-list="productImgs"
                :on-preview="handlePictureCardPreview"
                :on-change="handleChangePic"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :headers="headerObj"
              >
                <!-- <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" /> -->
                <i class="el-icon-plus"></i>
              </el-upload>
              <span style="color: #000;font-weight: bold; font-size: 11px"
                >上传图片不能超过2M 只能是<span style="color:red">JPG PNG</span
                >格式</span
              >
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <!-- <el-switch
                  v-model="ruleForm.delivery"
                  active-text="分享平台"
                  inactive-text="不分享平台"
                >
                </el-switch> -->
            <el-form-item label="分享平台" style="">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <!-- <el-switch
                  style="margin-left: 20px"
                  v-model="ruleForm.delivery1"
                  active-text="常用"
                  inactive-text="不常用"
                >
                </el-switch> -->
            <el-form-item label="常用" style="">
              <el-switch
                style="margin-left: 20px"
                v-model="ruleForm.delivery1"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>

        <!-- 菜品所含信息 -->
        <!-- 菜品所含食材信息 -->
        <div class="mationtxt">菜品所含食材信息</div>
        <div>
          <el-button style="margin-left: 10px" type="primary" @click="addLine"
            >添加</el-button
          >
          <!-- <el-button @click="save">保存</el-button> -->
          <el-table
            :data="officeonce"
            border
            v-loading="loadFlag1"
            max-height="300"
            show-summary
            style="width: 100%"
            :summary-method="getSummaries"
          >
            <el-table-column
              prop="id"
              label="序号"
              v-if="show"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="frame"
              v-if="show"
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
                  style="margin-left: 10px"
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
            <el-table-column prop="stats" label="用量(g)" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  style="width: 120px"
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
              label="能量(每百克)"
              width="100"
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
                <!-- <el-button
                      type="text"
                      size="small"
                      style="margin-left: 10px"
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
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
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
      <!-- 结束 -->
      <el-dialog
        title="添加食材信息"
        append-to-body
        width="40%"
        :visible.sync="dateTime"
        :close-on-click-modal="false"
      >
        <addition @child-event="perent"></addition>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dateTime = false">取 消</el-button>
          <el-button @click="setlist" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="autosave">
      <el-button
        :disabled="this.edients == 0"
        v-if="this.editable == 1"
        @click="saveItem"
        type="primary"
        >编辑保存</el-button
      >
      <el-button
        v-if="this.editable == 0"
        @click="savefiles('ruleForm')"
        type="primary"
        >保存并新增</el-button
      >
    </div>
  </div>
</template>

<script>
import addition from "./foodbase";
export default {
  components: {
    addition
  },
  data() {
    const data = [
      //树形结构
    ];
    return {
      display: "2",
      increasered: {
        name: ""
      },
      filterText: "",
      data: JSON.parse(JSON.stringify(data)), //树形结构
      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      hideUploadEdit: false, // 是否隐藏上传按钮
      headerObj: {
        "Blade-Auth": ""
      }, //上传图片请求头
      rectangle: "",
      loadFlag: false, //加载flag
      loadFlag2: false,

      ruleForm: {
        name: "", //菜品名字
        fooddata: "", //菜品分类
        region: "", //特点
        desc: "", //做法
        delivery: false, //公开
        delivery1: false //常用
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        fooddata: [
          { required: true, message: "请选择菜品分类", trigger: "change" }
        ]
      },
      foodPos: [], //菜品分类
      valuepark: [], //所属区域

      options: [], //所属区域
      mailto: [], //营养素含量]
      mailto1: [], //营养素含量
      dateTime: false, //弹出框
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
      //季节查询
      value1: [], //所属季节

      context: [
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
      csListIndex: null,
      temp: [],
      lower: 0,
      increase: false,
      waterfall: "2", //全部隐藏 公开
      fallen: "",
      editable: "0",
      autosaved: "",
      modify: "",
      more: "0",
      auto: "", //ID
      edients: ""
    };
  },
  beforeMount() {
    this.Protocol(); //营养素含量

    this.muito(); //分类
    this.Provinces(); //省市区
    this.Addraudit(); //树形结构渲染
    this.obtains(); //左边树形结构
    this.Takeone(); //获取token
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    },

    perent(data) {
      console.log(data);
      this.inquired = data;
      if (this.inquired != "") {
        this.inquired.nutritions.forEach((item, index) => {
          // console.log(item);
          if (item.nutrientId == 101) {
            this.officeonce[this.csListIndex].malloc = item.value;
            this.officeonce[this.csListIndex].spring = item.value;
          }
        });
        //   this.getInput.cs = this.inquired.foodName; //食材名
        this.officeonce[this.csListIndex].id = this.inquired.id;
        this.officeonce[this.csListIndex].frame = this.inquired.foodType;
        this.officeonce[this.csListIndex].name = this.inquired.foodName;
        this.officeonce[this.csListIndex].address = this.inquired.foodTypeName;
        this.officeonce[this.csListIndex].stats = this.inquired.weight;
        this.officeonce[this.csListIndex].fruits = this.inquired.foodEat;

        // this.officeonce[this.csListIndex].name = this.inquired.foodName;
        //   console.log(this.getInput);
        this.temp.length = 0;
        this.officeonce.forEach((item, i) => {
          this.temp[i] = Number(item.malloc);
        });
        console.log(this.temp);
      }
    },
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      console.log(this.headerObj);
    },
    //增加菜品，情况
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
      this.hideUploadEdit = this.productImgs.length >= 1;
      // console.log(this.editable);
      // this.$router.go(0);
      this.mailto.forEach(item => {
        console.log(item);
        item.children.forEach(item1 => {
          item1.result = "";
        });
      });
    },
    //搜索
    buttonClick(flat) {
      this.waterfall = flat;
      // console.log(this.waterfall);
      this.display = flat;
      this.obtains();
    },
    //增加分类
    palette() {
      if (this.increasered.name == "") {
        this.$message({
          message: "分类名称未填",
          type: "warning"
        });
      } else {
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
      }
    },
    //增加分类弹框
    increasevalue(index) {
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
    fontName() {
      if (this.increasered.name == "") {
        this.$message({
          message: "分类名称未填",
          type: "warning"
        });
      } else {
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
      }
    },
    //删除分类
    deleteMesh(data) {
      // let addid = `?id=${data.id}&type=2`;
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
      // console.log(this.ruleForm.delivery1 == false ? 1 : 0);
      // console.log(this.ruleForm.delivery == false ? 0 : 1);
      if (this.ruleForm.name == "" || this.ruleForm.fooddata == "") {
        this.$message({
          message: "菜品名字或菜品分类未填",
          type: "warning"
        });
      } else {
        // alert(123);
        let next = [];
        this.officeonce.forEach(item => {
          next.push({
            foodId: item.id,
            value: item.stats
          });
        });
        // console.log(next);

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
      }
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
          this.obtains();
          this.Addraudit();
          this.padded();
          this.editable = 0;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
    },
    savefiles() {
      if (this.ruleForm.name == "" || this.ruleForm.fooddata == "") {
        this.$message({
          message: "菜品名字或菜品分类未填",
          type: "warning"
        });
      } else {
        // alert(123);
        let next = [];
        this.officeonce.forEach(item => {
          next.push({
            foodId: item.id,
            value: item.stats
          });
        });
        // console.log(next);

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
      }
    },
    handleNodeClick(data) {
      // console.log(data);
      if (data.view == 0) {
        return;
      } else {
        this.value1 = [];
        this.valuepark = [];
        this.editable = data.view;
        this.auto = data.id;
        this.edients = data.isPub;
        this.$axios
          .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
          .then(res => {
            // console.log(res);
            // this.valuepark.length = 0;
            // this.value1.length = 0;
            this.handler = res.data.data;
            console.log(this.handler);

            this.ruleForm.name = this.handler.dishName; //菜品名字
            this.ruleForm.fooddata = this.handler.dishType; //菜品分类
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
            }

            console.log(this.valuepark);
            let picture = [];
            if (this.handler.pic) {
              picture[0] = {
                url: this.handler.pic
              };
            }
            this.productImgs = picture;
            this.hideUploadEdit = this.productImgs.length >= 1;
            this.ruleForm.delivery1 = this.handler.isUse == 1 ? false : true; //常用
            this.ruleForm.delivery = this.handler.isPub == 1 ? false : true; //公开
            // this.toBack = this.handler.dishMxVos;
            // console.log(this.toBack);
            if (this.handler.dishMxVos) {
              let arr = [];
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
                  malloc: item.foodCal.toFixed(2),
                  fruits: item.foodEat
                };
              });
              this.officeonce = arr;
              this.graph();
              // this.addLine();
            }
            // console.log(this.officeonce);
          });
      }
    },
    foodmatters(tab) {
      // console.log(tab);
      console.log(tab.index);
      this.more = tab.index;
      this.Addraudit();
    },
    handleClick(tab) {
      this.lower = tab.index;
      console.log(this.lower);
      // this.obtains();
      // this.muito();
      // // this.Addraudit();
      // console.log(tab);
    },
    //表格弹出框
    columnEvent(row, index) {
      this.filterText1 = "";
      this.dateTime = true;
      this.csListIndex = index;
      this.Addraudit();
      //   for (let k in row) {
      //     this.csList[k] = row[k];
      //   }
    },
    setlist() {
      this.dateTime = false;
      this.graph();
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "用量/能量合计";
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
          // sums[index] += "";
          // this.sumss = sums[index];
          if (index == 2 || index == 4) {
            sums[index] = sums[index].toFixed(2);
          } else {
            sums[index] += "";
          }
        }
      });
      return sums;
    },
    hello(row, i) {
      // row.malloc = (row.stats / 100) * row.malloc;
      // row.malloc = row.malloc100;
      // row.malloc = (row.malloc / 100) * row.stats;
      // console.log(row.malloc);
      if (row.stats) {
        console.log(this.temp[i]);
        row.malloc = (
          ((this.temp[i] / 100) * Number(row.stats) * row.fruits) /
          100
        ).toFixed(2);
        // console.log(row.malloc);
      } else {
        row.malloc = this.temp[i];
      }
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
    //设置常用
    append(data) {
      // console.log(data);
      this.hack = data.id;
      this.$axios
        .post(`api/blade-food/dish/changeIsUse`, {
          id: this.hack,
          isUse: 0
        })
        .then(res => {
          // this.obtains();
          // console.log(res);
          data.isUse = 0;
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
          // this.obtains();
          // console.log(res);
          data.isUse = 1;
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
          // this.obtains();
          // console.log(res);
          data.isPub = 1;
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
          // this.obtains();
          // console.log(res);
          data.isPub = 0;
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
      // console.log(data);
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

      this.obtains();
    },
    //获取树形结构
    obtains() {
      this.loadFlag = true;
      this.$axios

        .get(
          `api/blade-food/basetype/getDishByBaseId?isPrivate=${0}&typeTemp=${
            this.waterfall
          }&season=${this.before1}&isUse=${this.really1}&regionId=${
            this.fallen
          }&foodName=${this.filterText2}`
        )
        .then(res => {
          //   console.log(res);
          this.loadFlag = false;
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

    //树形渲染数
    Addraudit() {
      this.loadFlag2 = true;
      this.$axios
        .get(`api/blade-food/basetype/getFoodByBaseId?isPrivate=${this.more}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.loadFlag2 = false;
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
        .get(
          `api/blade-food/basetype/getList?type=${2}&isPrivate=${this.lower}`,
          {}
        )
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
    //移除图片
    handleRemove(file, productImgs) {
      // console.log(file, fileList);
      this.hideUploadEdit = productImgs.length >= 1;
    },
    //预览图片
    handlePictureCardPreview(file) {
      console.log(file.url);

      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChangePic(file, productImgs) {
      this.hideUploadEdit = productImgs.length >= 1;
      // if (productImgs.length > 1) {
      //   productImgs.splice(0, 1);

      // }
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
