<template>
  <div class="months">
    <div class="version">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 个人食材库 -->
        <el-tab-pane label="个人食材库" name="first">
          <div class="cation">
            <!-- 左边 -->
            <div class="personal">
              <el-input
                style="width:270px; margin-left: 9px;"
                placeholder="输入关键字进行查询"
                v-model="filterText"
              >
              </el-input>
              <div class="import">
                <!-- <el-button type="primary" plain size="mini">导入</el-button>
                <el-button type="primary" plain size="mini">导出</el-button>
                <el-button type="primary" plain size="mini">加分类</el-button> -->
                <el-button @click="addition(1)" type="primary" size="mini"
                  >加食材</el-button
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
                    @click="buttonClick(0)"
                    >分享平台</el-button
                  >
                </div>
              </div>
              <!-- 全国查找 -->
              <div class="country">
                <div class="country1">
                  <el-cascader
                    clearable
                    v-model="valuepark2"
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
              <!-- 树形组件 -->
              <div class="monly">
                <div class="block">
                  <p></p>
                  <el-tree
                    :data="data"
                    v-loading="loadFlag"
                    node-key="id"
                    :default-expand-all="false"
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    ref="tree"
                  >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>{{ node.label }}</span>
                      <span>
                        <!-- <el-button
                          v-if="data.view == 1"
                          type="text"
                          size="mini"
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
                  <el-form-item label="食材名" prop="name" style="width: 350px">
                    <el-input style="300px" v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="食物别名1" style="width: 350px">
                    <el-input
                      style="300px"
                      v-model="ruleForm.foodFood"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="食物别名2" style="width: 350px">
                    <el-input
                      style="300px"
                      v-model="ruleForm.ovenFood"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="食材真名"
                    prop="buffer"
                    style="width: 350px"
                  >
                    <el-input
                      style="300px"
                      v-model="ruleForm.buffer"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="食材分类"
                    prop="fooddata"
                    style="width: 350px"
                  >
                    <el-select
                      style=" width: 185px; "
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

                  <el-form-item label="食物分类1" style="width: 350px">
                    <el-input
                      v-model="ruleForm.foods"
                      placeholder="请输入食物分类"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="食物分类2" style="width: 350px">
                    <el-input
                      v-model="ruleForm.dogfood"
                      placeholder="请输入食物分类"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="食部(%)"
                    prop="besaved"
                    style="width: 350px"
                  >
                    <el-input
                      @change="research"
                      type="number"
                      v-model="ruleForm.besaved"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="重量（g）"
                    prop="timers"
                    style="width: 350px"
                  >
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

                  <el-form-item label="色系" style="width: 700px;   ">
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
                      style=" width: 185px; "
                      v-model="valuepark"
                      placeholder="请选择省市区"
                      :options="options"
                      :props="{ multiple: true, checkStrictly: true }"
                      @change="handleChange"
                    ></el-cascader>
                  </el-form-item>
                  <el-form-item label="所属季节" style="width: 350px">
                    <el-select
                      style=" width: 185px; "
                      v-model="active"
                      multiple
                      placeholder="请选择季节"
                    >
                      <el-option
                        v-for="item in context"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="功用" style="width:350px">
                    <el-input
                      style=" width: 185px;  "
                      type="textarea"
                      v-model="ruleForm.desc"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="图片" style="width:350px">
                    <el-upload
                      :class="{ hide: hideUploadEdit }"
                      accept=".jpeg,.jpg,.gif,.png"
                      :limit="1"
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

                  <el-form-item label="分享平台" style="  ">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                  </el-form-item>

                  <el-form-item label="常用" style="   ">
                    <el-switch v-model="ruleForm.delivery1"></el-switch>
                  </el-form-item>
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
                  style="width: 100%; margin-bottom: 20px"
                  row-key="id"
                  :border="false"
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
                        v-model="scope.row.result"
                        type="number"
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
            <el-button
              :disabled="this.edients == 0"
              v-if="this.gavatorta == 1"
              type="primary"
              @click="saved('ruleForm')"
              >编辑保存</el-button
            >
            <el-button
              v-if="this.gavatorta == 0"
              type="primary"
              @click="iptables('ruleForm')"
              >保存并新增</el-button
            >
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </div>
        </el-tab-pane>
        <!-- 公共食材库 -->
        <el-tab-pane label="公共食材库" name="second">
          <div class="cation">
            <!-- 左边 -->
            <!-- 全国查找 -->

            <div class="personal">
              <!-- <el-input
                style="width:290px; margin-left: 9px;"
                placeholder="输入关键字进行查询"
                v-model="filterText1"
              >
              </el-input> -->
              <div class="country">
                <div class="country1">
                  <el-cascader
                    clearable
                    v-model="valuepark2"
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
                    :filter-node-method="filterNode1"
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
              <!-- 结束 -->
            </div>
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
      filterText: "",
      filterText1: "",
      display: "2",
      checked: true,
      loadFlag: false, //加载flag
      loadFlag1: false, //公共食材加载
      data: JSON.parse(JSON.stringify(data)), //树形结构
      activeName: "first",
      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      hideUploadEdit: false, // 是否隐藏上传按钮
      headerObj: {
        "Blade-Auth": ""
      }, //上传图片请求头
      rectangle: "",
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
      ruleForm: {
        //个人食材库
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
      typeTree: [],
      prtree: [],
      valuepark: [], //省市区
      valuepark1: [], //公共沈世渠
      valuepark2: [], //查询省市区
      options: [],
      active: [],
      active1: [], //公共所属季节
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
      really2: "0",
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
      winter: [],
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
      before2: "",
      lower: 0,
      waterfall: "2",
      fallen: "",
      gavatorta: "0",
      edients: "" //公开
    };
  },
  watch: {
    filterText(val) {
      console.log(val);
      // console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    }
    // filterText1(val) {
    //   this.$refs.tree.filter(val);
    // }
  },
  beforeMount() {
    this.Protocol(); //营养素含量
    this.ToString(); //公共
    this.Provinces(); //省市区
    this.queryLite(); //获取分类
    this.treeDrawing(); //树形渲染数
    this.Takeone();
    this.publicDomain(); //公共食材库
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
    //初始数据获取token
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      console.log(this.headerObj);
    },
    //加食材
    addition(index) {
      console.log(index);
      this.gavatorta = index;
      this.ruleForm.name = "";
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
      this.mailto.forEach(item => {
        // console.log(item)
        item.children.forEach(item1 => {
          item1.result = "";
        });
      });
    },
    resetForm() {
      // console.log(this.ruleForm.delivery1);
      // console.log(this.ruleForm.delivery1 == false ? 1 : 0);
      // console.log(this.ruleForm.delivery);
      // console.log(this.ruleForm.delivery == false ? 1 : 0);
    },
    //全部常用查询
    commonly() {
      this.treeDrawing();
    },
    //春夏秋冬查询
    disallow() {
      this.treeDrawing();
    },
    //省市区查询
    gProvinces() {
      // this.fallen = this.valuepark2[1];
      if (this.valuepark2[1]) {
        this.fallen = this.valuepark2[1];
      } else {
        this.fallen = "";
      }
      this.treeDrawing();
    },
    filterNode(value, data) {
      console.log(data);
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    }, //树形结构搜索
    // filterNode1(value, data1) {
    //   // console.log(data1);
    //   if (!value) return true;

    //   return data1.label.indexOf(value) !== -1;
    // },
    buttonClick(flat) {
      // console.log(index);
      // console.log(flat);
      this.waterfall = flat;
      this.display = flat;
      this.treeDrawing();
    },
    handleClick(tab) {
      // console.log(tab);
      // this.lower = tab.index;
      // console.log(this.lower);
      // this.treeDrawing();
      this.Protocol();
      // console.log(event);
    },
    //编辑保存
    saved() {
      // console.log(this.mailto);
      console.log(this.ruleForm);
      let food = [];
      this.mailto.forEach(item => {
        // console.log(item);
        item.children.forEach(item1 => {
          // console.log(item1);
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
          pic: this.dialogImageUrl,
          isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
          isPub: this.ruleForm.delivery == false ? 1 : 0, //是否公开

          nutritions: food
        })
        .then(res => {
          this.$message({
            message: "编辑成功",
            type: "success"
          });
          this.treeDrawing();
        })
        .catch(() => {
          this.$message.error("编辑失败");
        });
    },
    //保存
    iptables(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
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
              pic: this.dialogImageUrl,
              isUse: this.ruleForm.delivery1 == false ? 1 : 0, //是否常用
              isPub: this.ruleForm.delivery == false ? 1 : 0, //是否分享平台

              nutritions: food
            })
            .then(res => {
              console.log(res);
              this.treeDrawing();
              this.$message({
                message: "保存成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$message.error("保存失败");
            });
        } else {
          // console.log('error submit!!');
          this.$message({
            message: "食材未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //个人食材库
    handleNodeClick(data) {
      console.log(data);
      if (data.view == 0) {
        return;
      } else {
        this.gavatorta = data.view;
        this.edients = data.isPub;
        this.active = [];
        console.log(data);
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
            // this.active.push(this.inquired.season); //所属季节

            if (this.inquired.season) {
              this.inquired.season.split(",").forEach(item => {
                this.active.push(item);
              });
            } else {
              this.active = [];
            }
            //所属区域

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
            this.ruleForm.desc = this.inquired.function; //功用

            let picture = []; //图片
            if (this.inquired.pic) {
              picture[0] = {
                url: this.inquired.pic
              };
            }
            this.productImgs = picture;
            this.hideUploadEdit = this.productImgs.length >= 1;
            this.ruleForm.delivery = this.inquired.isPub == 1 ? false : true; //公开
            // console.log(this.ruleForm.delivery);
            this.ruleForm.delivery1 = this.inquired.isUse == 1 ? false : true; //常用
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
      }
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
              this.inquired.isPub == 0 ? false : true; //公开
            // console.log(this.ruleForm.delivery);
            this.ruleFormUsers.delivery1 =
              this.inquired.isUse == 0 ? false : true; //常用
            let units = this.inquired.nutritions;
            console.log();
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
    //查看
    classification(data) {
      console.log(data);
    },
    // prepare(data, index) {
    //   this.gavatorta = index;
    //   this.active.length = 0;
    //   this.active1.length = 0;
    //   console.log(data);
    //   this.flour = data.id;
    //   this.$axios
    //     .get(`api/blade-food/food/detail?id=${this.flour}`, {})
    //     .then(res => {
    //       // console.log(res);
    //       this.inquired = res.data.data;
    //       console.log(this.inquired);
    //       this.valuepark.length = 0;
    //       this.active.length = 0;
    //       if (this.lower == 0) {
    //         this.ruleForm.name = this.inquired.foodName; //食材名
    //         this.ruleForm.foodFood = this.inquired.foodAlias; //食物别名1
    //         this.ruleForm.ovenFood = this.inquired.foodAlias1; //食物别名2
    //         this.ruleForm.buffer = this.inquired.foodReal; //食材真名
    //         this.ruleForm.fooddata = this.inquired.foodType; //食材分类
    //         this.ruleForm.foods = this.inquired.foodType1; //食物分类1
    //         this.ruleForm.dogfood = this.inquired.foodType2; //食物分类2
    //         this.ruleForm.besaved = this.inquired.foodEat; //食部
    //         this.ruleForm.timers = this.inquired.weight; //重量
    //         this.ruleForm.content = this.inquired.water; //水分
    //         this.ruleForm.resource = this.inquired.color + ""; //色系
    //         // this.active.push(this.inquired.season); //所属季节

    //         this.inquired.season.split(",").forEach(item => {
    //           this.active.push(item);
    //         });
    //         //所属区域

    //         if (this.inquired.provinces) {
    //           let bar = [];
    //           this.inquired.provinces.split(",").forEach((item, i) => {
    //             bar.push([item, this.inquired.belongRegion.split(",")[i]]);
    //           });
    //           this.valuepark = bar;
    //         }
    //         this.ruleForm.desc = this.inquired.function; //功用

    //         let picture = []; //图片
    //         if (this.inquired.pic) {
    //           picture[0] = {
    //             url: this.inquired.pic
    //           };
    //         }
    //         this.productImgs = picture;
    //         this.ruleForm.delivery = this.inquired.isPub == 1 ? false : true; //公开
    //         // console.log(this.ruleForm.delivery);
    //         this.ruleForm.delivery1 = this.inquired.isUse == 1 ? false : true; //常用
    //         let units = this.inquired.nutritions;
    //         units.forEach(item => {
    //           // console.log(item);
    //           for (let item1 of this.mailto) {
    //             for (let arr of item1.children) {
    //               if (arr.id == item.nutrientId) {
    //                 arr.result = item.value;
    //               }
    //               if (arr.children) {
    //                 for (let add of arr.children) {
    //                   if (add.id == item.nutrientId) {
    //                     add.result = item.value;
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         });
    //       } else {
    //         this.ruleFormUsers.name = this.inquired.foodName; //食材名
    //         this.ruleFormUsers.ovenFood = this.inquired.foodAlias1; //食物别名2
    //         this.ruleFormUsers.buffer = this.inquired.foodReal; //食材真名
    //         this.ruleFormUsers.fooddata = this.inquired.foodType; //食材分类
    //         this.ruleFormUsers.foods = this.inquired.foodType1; //食物分类1
    //         this.ruleFormUsers.dogfood = this.inquired.foodType2; //食物分类2
    //         this.ruleFormUsers.besaved = this.inquired.foodEat; //食部
    //         this.ruleFormUsers.timers = this.inquired.weight; //重量
    //         this.ruleFormUsers.content = this.inquired.water; //水分
    //         this.ruleFormUsers.resource = this.inquired.color + ""; //色系
    //         this.inquired.season.split(",").forEach(item => {
    //           this.active1.push(item);
    //         });
    //         //所属区域
    //         let addItem = [];
    //         this.inquired.provinces.split(",").forEach((item, i) => {
    //           addItem.push([item, this.inquired.belongRegion.split(",")[i]]);
    //         });
    //         this.valuepark1 = addItem;
    //         // console.log(this.valuepark1);
    //         this.ruleFormUsers.desc = this.inquired.function; //功用
    //         this.rectangle = this.inquired.pic;
    //         //  console.log(this.dialogImageUrl);
    //         this.ruleFormUsers.delivery =
    //           this.inquired.isPub == 0 ? false : true; //公开
    //         // console.log(this.ruleForm.delivery);
    //         this.ruleFormUsers.delivery1 =
    //           this.inquired.isUse == 0 ? false : true; //常用
    //         let units = this.inquired.nutritions;
    //         units.forEach(item => {
    //           // console.log(item);
    //           for (let item1 of this.typeTree) {
    //             for (let arr of item1.children) {
    //               if (arr.id == item.nutrientId) {
    //                 arr.result = item.value;
    //               }
    //               if (arr.children) {
    //                 for (let add of arr.children) {
    //                   if (add.id == item.nutrientId) {
    //                     add.result = item.value;
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         });
    //       }
    //     });
    // },
    //个人常用
    append(data) {
      console.log(data);
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
          this.treeDrawing();
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
          this.treeDrawing();
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },
    //个人食材删除
    remove(node, data) {
      console.log(data);
      this.saveall = data.id;

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
              this.treeDrawing();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //公共食材渲染
    publicDomain() {
      this.loadFlag1 = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getFoodByBaseId?isPrivate=1&typeTemp=${this.waterfall}&regionId=${this.fallen}&season=${this.before1}&isUse=${this.really1}`,
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
    //树形渲染
    treeDrawing() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getFoodByBaseId?isPrivate=0&typeTemp=${this.waterfall}&regionId=${this.fallen}&season=${this.before1}&isUse=${this.really1}`,
          {}
        )
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
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
          this.data = trees;
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
    handleExceed(files, fileList) {
      //图片上传超过数量限制
      this.$message.error("上传图片不能超过1张!");
      console.log(files, fileList);
    },
    handleChangePic(file, productImgs) {
      this.hideUploadEdit = productImgs.length >= 1;
      // if (productImgs.length > 1) {
      //   productImgs.splice(0, 1);

      // }
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
/* .avue-view {
  padding: 0 5px !important;
} */
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
.monly {
  width: 300px;
  height: 100%;
  margin-top: 10px;
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
  width: 300px;
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
</style>
