<template>
  <div class="toolbar">
    <!-- 搜索 -->

    <div class="custom">
      <span style=" margin-right: 10px;">菜品名称:</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width:190px"
      ></el-input>
      <span style="margin: 0 10px;">创建机构:</span>
      <el-input
        v-model="noinst"
        placeholder="请输入内容"
        style="width:190px"
      ></el-input>
      <span style="margin: 0 10px;">提交日期:</span>
      <el-date-picker
        v-model="value1"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

      <!-- <el-date-picker
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        v-model="value1"
        type="date"
        placeholder="选择日期"
        style="width:190px"
      ></el-date-picker> -->

      <div class="tostring">
        <span style="margin-right: 24px;">提交人:</span>
        <el-input
          v-model="editor"
          placeholder="请输入内容"
          style="width:190px"
        ></el-input>
        <span style="margin-right: 10px;margin-left: 10px; ">联系电话:</span>
        <el-input
          v-model="phoneId"
          placeholder="请输入内容"
          style="width:190px"
        ></el-input>
        <span style="margin: 0 10px;">审核状态:</span>
        <el-select v-model="mState1" placeholder="请选择">
          <el-option
            v-for="item in mState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          @click="searchStr"
          size="medium"
          icon="el-icon-search"
          type="primary"
          style=" margin-left: 20px; "
          >搜索</el-button
        >
        <el-button @click="notEmpty" size="medium" style=" margin-left: 20px; "
          >清空</el-button
        >
      </div>
    </div>
    <!-- 审核表格 -->
    <div class="navbar">
      <el-table
        :data="tmquery"
        border
        style="width: 100%;height:100%"
        max-height="400"
        v-loading="loadFlag"
        empty-text="没有数据~"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dishName"
          label="菜品名称"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dishTypeName"
          label="分类"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="创建机构"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createName"
          label="提交人"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="联系电话"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column label="审核状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.status == 0">待审核</el-tag>
            <el-tag v-else-if="scope.row.status == 3">无需审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status == 1"
              >审核通过</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.status == 2"
              >审核不通过</el-tag
            >
          </template>
        </el-table-column>
        <!--操作格-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status !== 0"
              type="text"
              icon="el-icon-view"
              size="small"
              @click="seecol(scope.row, 1)"
              >查看</el-button
            >
            <el-button
              type="text"
              icon="el-icon-user-solid"
              v-if="scope.row.status == 0"
              size="small"
              @click="Directory(scope.row, 2)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagingClass">
        <el-pagination
          :page-sizes="m_page.sizes"
          :page-size="m_page.size"
          :current-page="m_page.number"
          @size-change="m_handleSizeChange"
          @current-change="m_handlePageChange"
          layout="total,sizes,prev, pager, next"
          background
          :total="m_page.totalElements"
        ></el-pagination>
      </div>
    </div>
    <!-- 审核食材 查看 -->
    <el-dialog
      width="90%"
      title="审核菜品"
      append-to-body
      :visible.sync="seekeys"
      :close-on-click-modal="false"
    >
      <div class="tmp_rcheck">
        <div class="update1">
          <div class="seecr">
            <span style="color:#cccccc;">创建机构：</span>
            {{ this.dsquery.establish }}
          </div>
          <div class="seecr1">
            <span style="color:#cccccc;">提交人：</span>
            {{ this.dsquery.submit }}
          </div>
          <div class="seecr1">
            <span style="color:#cccccc;">联系电话：</span>
            {{ this.dsquery.phone }}
          </div>
          <div class="seecr">
            <span style="color:#cccccc;">提交时间：</span>
            {{ this.dsquery.time }}
          </div>
          <div class="hash">
            <span style="color:#cccccc;">审核状态：</span>
            <span class="stop" v-if="this.dsquery.examineto == 0">待审核</span>
            <span v-else-if="this.dsquery.examineto == 3">无需审核</span>
            <span v-else-if="this.dsquery.examineto == 1">审核通过</span>
            <span v-else-if="this.dsquery.examineto == 2">审核不通过</span>
          </div>
        </div>
        <div class="stored">
          <div class="mationtxt">菜品主要信息</div>
          <div class="unsigned">
            <el-form
              :model="ruleForm"
              :rules="rules"
              :inline="true"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="菜品名"
                prop="name"
                style=" width: 350px;   "
              >
                <el-input
                  :disabled="this.nbottoms == 1"
                  show-word-limit
                  maxlength="10"
                  v-model="ruleForm.name"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="菜品分类"
                prop="fooddata"
                style=" width: 350px;   "
              >
                <el-select
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
                </el-select>
              </el-form-item>

              <el-form-item label="所属区域" style=" width: 350px;  ">
                <el-cascader
                  :disabled="this.nbottoms == 1"
                  v-model="valuepark"
                  placeholder="请选择省市区"
                  :options="options"
                  :props="{ multiple: true, checkStrictly: true }"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>

              <el-form-item label="所属季节" style="  width: 350px;  ">
                <el-select
                  :disabled="this.nbottoms == 1"
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

              <el-form-item label="特点" style="width: 350px">
                <el-input
                  :disabled="this.nbottoms == 1"
                  type="textarea"
                  style="width: 200px"
                  maxlength="30"
                  show-word-limit
                  v-model="ruleForm.region"
                ></el-input>
              </el-form-item>
              <el-form-item label="做法" style="width: 350px">
                <el-input
                  :disabled="this.nbottoms == 1"
                  type="textarea"
                  maxlength="30"
                  show-word-limit
                  style="width: 200px"
                  v-model="ruleForm.desc"
                ></el-input>
              </el-form-item>

              <el-form-item label="图片" style="width: 350px">
                <el-upload
                  action="api/blade-resource/oss/endpoint/put-file"
                  list-type="picture-card"
                  :limit="imgLimit"
                  :file-list="productImgs"
                  :on-exceed="handleExceed"
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

              <el-form-item label="公开" style=" width:150px ">
                <el-switch
                  :disabled="true"
                  v-model="ruleForm.delivery"
                ></el-switch>
              </el-form-item>

              <el-form-item label="常用" style="   ">
                <el-switch
                  :disabled="this.nbottoms == 1"
                  v-model="ruleForm.delivery1"
                ></el-switch>
              </el-form-item>
            </el-form>
          </div>
          <!-- 菜品所含食材信息 -->
          <div class="mationtxt">菜品所含食材信息</div>
          <div>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              :disabled="this.nbottoms == 1"
              @click="addLine"
              >添加</el-button
            >
            <el-table
              :data="officeonce"
              border
              v-loading="loadFlag1"
              show-summary
              style="width: 60%"
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
                label="能量(参考值)"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="malloc"
                label="能量(每百克)"
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
                <el-table-column
                  v-if="show"
                  prop="fruits"
                  label="foodEat11"
                  width="120"
                  align="center"
                >
                </el-table-column>
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
          <!-- 树形结构 -->
          <el-dialog
            title="添加菜品"
            append-to-body
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
            </div>
          </el-dialog>
          <!-- 营养素标题 -->
          <div class="worm1">
            营养素含量（这里为100克食部食品中的营养素含量）
          </div>
          <div class="saveas">
            <el-table
              :data="mailto"
              style="width: 60%;margin-bottom: 20px;"
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
          <!-- 公共库所分类 -->
          <div v-if="this.nbottoms == 2" class="worm1">公共库所属分类</div>

          <span style="  margin-left: 20px;  margin-right: 15px;"
            >公共库分类</span
          >
          <el-select
            clearable
            v-if="this.nbottoms == 2"
            v-model="nominated.menu"
            placeholder="请选择"
          >
            <el-option
              v-for="item in source"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <!-- <div v-if="this.nbottoms == 2" class="worm1">拒绝原因</div> -->
          <!-- <el-form
          :model="examine"
          ref="examine"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            v-if="this.nbottoms == 2"
            label="拒绝原因"
            style=" width:200px "
            prop="desc1"
          >
            <el-input
              v-if="this.nbottoms == 2"
              style=" width: 450px;  "
              type="textarea"
              v-model="examine.desc1"
            ></el-input>
          </el-form-item>
        </el-form> -->
          <!-- <div class="worm1">记录</div> -->
          <el-timeline>
            <!-- <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>刚好让你更好机构</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>刚好让你更好机构</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item> -->
          </el-timeline>
        </div>
        <div slot="footer" class="dialog-footer" style=" text-align: center;">
          <el-button @click="seekeys = false">取 消</el-button>
          <el-button
            type="primary"
            @click="restore()"
            v-if="this.nbottoms == 2"
          >
            拒 绝</el-button
          >
          <el-button
            @click="Disagree('ruleForm')"
            type="primary"
            v-if="this.nbottoms == 2"
            >同 意</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="拒绝理由"
      width="30%"
      append-to-body
      :visible.sync="increase"
      :close-on-click-modal="false"
    >
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="examine.desc1"
        maxlength="30"
        show-word-limit
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="increase = false">取 消</el-button>
        <el-button @click="palette" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  data() {
    return {
      increase: false, //拒绝理由弹框
      dateTime: false, //弹出框
      stone: "", //id
      tmquery: [],
      filterText1: "",
      dsquery: {
        establish: "", //创建机构
        submit: "", //提交人
        phone: "", //电话
        time: " ", //时间
        examineto: "" //审核
      },
      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      headerObj: {
        "Blade-Auth": ""
      }, //上传图片请求头
      rectangle: "",
      mailto: [], //营养素含量
      loadFlag: false, //加载flag
      attributes: [], //表格数据
      seekeys: false, //审核弹框
      value1: "", //日期
      noinst: "",
      input: "",
      input1: "",
      editor: "",
      phoneId: "",
      examine: {
        desc1: "" //拒绝理由
      },
      rules: {
        name: [{ required: true, message: "请输入菜品名", trigger: "blur" }],
        fooddata: [
          { required: true, message: "请选择菜品分类", trigger: "change" }
        ]
      },
      ruleForm: {
        name: "", //菜品名字
        restorename: "", //食材名

        fooddata: "", //菜品分类

        region: "", //特点

        desc: "", //做法
        delivery: false, //公开
        delivery1: false, //常用
        type: [],
        temps: ""
      },
      m_page: {
        //分頁
        sizes: [10, 20, 30, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      active: [], //季节
      valuepark: [], //省市区
      nominated: {
        menu: "" //公共分类
      },

      fication: [],
      source: [], //公共分类
      foodPos: [], //食材分类
      // rules: {
      //   region: [
      //     { required: true, message: "请选择公共库分类", trigger: "change" }
      //   ]
      // },
      mState: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核不通过"
        },
        {
          value: "3",
          label: "无需审核"
        }
      ],
      mState1: "",
      options: [], //省市区

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

      options1: [],
      temp: [],
      value: "", //审核状态
      tableData1: [],
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
      nbottoms: "",
      timezone: "", //搜索时间
      timezone1: "",
      classification: "" //分类ID
    };
  },
  watch: {
    filterText1(val) {
      this.$refs.tree.filter(val);
    }
  },
  beforeMount() {
    this.auditing();
    this.setDec(); //公共库分类
    this.Protocol(); //营养素含量
    this.muito(); //获取分类
    this.Provinces(); //省市区
    this.Addraudit(); //树形结构渲染
    this.Takeone();
  },

  methods: {
    filterNode1(value, data1) {
      // console.log(data1);
      if (!value) return true;

      return data1.label.indexOf(value) !== -1;
    },
    notEmpty() {
      this.input = ""; //菜品名称
      this.noinst = ""; //创建机构
      this.value1 = ""; //提交日期
      this.timezone = "";
      this.editor = ""; //提交人
      this.phoneId = ""; //联系电话
      this.mState1 = ""; //审核状态
      this.auditing();
    },
    //初始数据获取token
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      console.log(this.headerObj);
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
    searchStr() {
      // console.log(this.input); //菜品名称
      // console.log(this.noinst); //创建机构
      // console.log(this.value1); //提交日期
      // console.log(this.editor); //提交人
      // console.log(this.phoneId); //联系电话
      // console.log(this.mState1); //审核状态
      console.log(this.value1);
      this.timezone = this.value1[0];
      console.log(this.timezone);
      this.timezone1 = this.value1[1];
      console.log(this.timezone1);
      // if (this.value1) {
      //   this.timezone = this.value1;
      // } else {
      //   this.timezone = "";
      // }
      // this.auditing();
    },
    //获取表格数据
    auditing() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/dish/appPubDish?size=${this.m_page.size}&current=${this.m_page.number}&dishName=${this.input}&orgName=${this.noinst}&createTimeStr=${this.timezone}&mobile=${this.phoneId}&status=${this.mState1}&createName=${this.editor}`
        )
        .then(res => {
          this.loadFlag = false;
          // console.log(res);
          this.tmquery = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
          console.log(this.tmquery);
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
    //查看
    seecol(row, index) {
      console.log(row);
      this.seekeys = true;
      this.active = [];
      this.valuepark = [];
      this.nbottoms = index;
      console.log(row);
      this.stone = row.id;
      this.dsquery.establish = row.orgName;
      this.dsquery.submit = row.createName;
      this.dsquery.phone = row.mobile;
      this.dsquery.time = row.createTime;
      this.dsquery.examineto = row.status;
      this.seekeys = true;
      let design = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/dish/dishDetail` + design, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.handler = res.data.data;
          this.ruleForm.name = this.handler.dishName; //菜品名字
          this.ruleForm.fooddata = this.handler.dishTypeName; //菜品分类
          // console.log(this.handler);
          if (this.handler.season) {
            this.handler.season.split(",").forEach(item => {
              this.active.push(item);
            });
          } else {
            this.active = [];
          }
          if (this.handler.provinces) {
            let bar = [];
            this.handler.provinces.split(",").forEach((item, i) => {
              bar.push([item, this.handler.belongRegion.split(",")[i]]);
            });
            this.valuepark = bar;
          } else {
            this.valuepark = [];
          }

          let picture = []; //图片
          if (this.handler.pic) {
            picture[0] = {
              url: this.handler.pic
            };
          }
          this.productImgs = picture;
          this.ruleForm.region = this.handler.function; //特点
          this.ruleForm.desc = this.handler.remark; //做法
          this.ruleForm.delivery1 = this.handler.isUse == 1 ? false : true; //常用
          this.ruleForm.delivery = this.handler.isPub == 1 ? false : true; //公开
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
                malloc: item.nutritionNlValue
              };
            });
            this.officeonce = arr;
            this.graph();
          }
        });
    },
    //同意
    Disagree(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.nominated.menu != "") {
            // alert("submit!");
            let next = [];
            this.officeonce.forEach(item => {
              console.log(item);
              next.push({
                foodId: item.id,
                value: item.stats,
                baseTypeId: item.frame
              });
            });
            // console.log(next);
            this.$axios
              .post(`api/blade-food/dish/auditDish`, {
                id: this.stone, //ID
                dishName: this.ruleForm.name, //菜品名
                dishType: this.classification, //菜品分类
                belongRegions: this.valuepark, //所属区域
                seasons: this.active, //所属季节
                function: this.ruleForm.region, //特点
                remark: this.ruleForm.desc, //做法
                dishMxVos: next,
                pic: this.dialogImageUrl, //图片
                // isPub: this.ruleForm.delivery == false ? 0 : 1, //公开
                isUse: this.ruleForm.delivery1 == false ? 1 : 0, //常用
                status: "1", //
                result: "0",
                type: "2",
                // refuseReason: "通过了!!!",
                dishPubType: this.menu //公共库分类
              })
              .then(res => {
                // console.log(res);
                this.seekeys = false;
                this.auditing();
                this.$message({
                  message: "审核通过",
                  type: "success"
                });
              })
              .catch(() => {
                this.$message.error("审核失败");
              });
          } else {
            this.$message.error("公共库分类未填");
          }
        } else {
          console.log("123123");
          this.$message.error("菜品信息未填");
          return false;
        }
      });
      // this.ruleForm.delivery1 == false ? 0 : 1,
      //   console.log(this.ruleForm.delivery1);
    },
    //拒绝
    restore() {
      this.increase = true;
      // if (examine.desc1 == "") {
      //   this.$message({
      //     message: "拒绝理由未填",
      //     type: "warning"
      //   });
      // } else {
      //   let next = [];
      //   this.officeonce.forEach(item => {
      //     console.log(item);
      //     next.push({
      //       foodId: item.id,
      //       value: item.stats,
      //       baseTypeId: item.frame
      //     });
      //   });
      //   // console.log(next);
      //   this.$axios
      //     .post(`api/blade-food/dish/auditDish`, {
      //       id: this.stone, //ID
      //       dishName: this.ruleForm.name, //菜品名
      //       dishType: this.classification, //菜品分类
      //       belongRegions: this.valuepark, //所属区域
      //       seasons: this.active, //所属季节
      //       function: this.ruleForm.region, //特点
      //       remark: this.ruleForm.desc, //做法
      //       dishMxVos: next,
      //       pic: this.dialogImageUrl, //图片
      //       // isPub: this.ruleForm.delivery == false ? 0 : 1, //公开
      //       isUse: this.ruleForm.delivery1 == false ? 1 : 0, //常用
      //       status: "2", //
      //       result: "1",
      //       type: "2",
      //       refuseReason: this.examine.desc1,
      //       dishPubType: this.menu //公共库分类
      //     })
      //     .then(res => {
      //       this.seekeys = false;
      //       // console.log(res);
      //       this.auditing();
      //       this.$message({
      //         message: "拒绝",
      //         type: "success"
      //       });
      //     })
      //     .catch(() => {
      //       this.$message.error("拒绝失败");
      //     });
      // }
    },
    palette() {
      if (this.examine.desc1 != "") {
        let next = [];
        this.officeonce.forEach(item => {
          console.log(item);
          next.push({
            foodId: item.id,
            value: item.stats,
            baseTypeId: item.frame
          });
        });
        // console.log(next);
        this.$axios
          .post(`api/blade-food/dish/auditDish`, {
            id: this.stone, //ID
            dishName: this.ruleForm.name, //菜品名
            dishType: this.classification, //菜品分类
            belongRegions: this.valuepark, //所属区域
            seasons: this.active, //所属季节
            function: this.ruleForm.region, //特点
            remark: this.ruleForm.desc, //做法
            dishMxVos: next,
            pic: this.dialogImageUrl, //图片
            // isPub: this.ruleForm.delivery == false ? 0 : 1, //公开
            isUse: this.ruleForm.delivery1 == false ? 1 : 0, //常用
            status: "2", //
            result: "1",
            type: "2",
            refuseReason: this.examine.desc1,
            dishPubType: this.menu //公共库分类
          })
          .then(res => {
            this.seekeys = false;
            this.increase = false;
            // console.log(res);
            this.auditing();
            this.$message({
              message: "拒绝成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$message.error("拒绝失败");
          });
      } else {
        this.$message.error("拒绝理由未填");
      }
    },
    //审核
    Directory(row, index) {
      this.active = [];
      this.valuepark = [];
      this.productImgs = [];
      // console.log(index);
      this.nbottoms = index;
      console.log(row);
      this.stone = row.id;
      this.dsquery.establish = row.orgName;
      this.dsquery.submit = row.createName;
      this.dsquery.phone = row.mobile;
      this.dsquery.time = row.createTime;
      this.dsquery.examineto = row.status;
      this.seekeys = true;
      let design = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/dish/dishDetail` + design, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.handler = res.data.data;
          this.ruleForm.name = this.handler.dishName; //菜品名字
          // this.handler.dishType
          this.classification = this.handler.dishType;
          console.log(this.classification);
          this.ruleForm.fooddata = this.handler.dishTypeName; //菜品分类
          // console.log(this.handler);
          if (this.handler.season) {
            this.handler.season.split(",").forEach(item => {
              this.active.push(item);
            });
          } else {
            this.active = "";
          }
          if (this.handler.provinces) {
            let bar = [];
            this.handler.provinces.split(",").forEach((item, i) => {
              bar.push([item, this.handler.belongRegion.split(",")[i]]);
            });
            this.valuepark = bar;
          } else {
            this.handler.provinces = "";
          }

          this.ruleForm.region = this.handler.function; //特点
          this.ruleForm.desc = this.handler.remark; //做法
          let picture = []; //图片
          if (this.handler.pic) {
            picture[0] = {
              url: this.handler.pic
            };
          }
          this.productImgs = picture;
          this.dialogImageUrl = this.handler.pic;
          this.ruleForm.delivery1 = this.handler.isUse == 1 ? false : true; //常用
          this.ruleForm.delivery = this.handler.isPub == 1 ? false : true; //公开
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
            this.graph();
          }
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
    //公共库分类
    setDec() {
      this.$axios
        .get(`api/blade-food/basetype/getList?isPrivate=1&type=2`, {})
        .then(res => {
          // console.log(res);
          this.myStr = res.data.data;
          let str = [];
          this.myStr.forEach((item, index) => {
            // console.log(item);
            str[index] = {
              value: item.id,
              label: item.typeName
            };
          });
          this.source = str;
          // console.log(this.fication);
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
    //计算
    hello(row, i) {
      // row.malloc = (row.stats / 100) * row.malloc;
      // row.malloc = row.malloc100;
      // row.malloc = (row.malloc / 100) * row.stats;
      // console.log(row.malloc);
      if (row.stats) {
        console.log(this.temp[i]);
        // console.log(row.stats); //输入的用量
        // console.log(row.fruits);
        // row.malloc = ((this.temp[i] / 100) * Number(row.stats)).toFixed(2);
        row.malloc = (
          ((this.temp[i] / 100) * Number(row.stats) * row.fruits) /
          100
        ).toFixed(2);
        // console.log(row.malloc);
      } else {
        row.malloc = this.temp[i];
      }
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
    //点击查看详情
    handleNodeClick(data) {
      console.log(data);
      //   this.getInput = data.label;
      //   console.log(this.getInput);
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
          this.inquired.nutritions.forEach((item, index) => {
            // console.log(item);
            if (item.nutrientId == 101) {
              this.officeonce[this.csListIndex].malloc = item.value;
            }
          });
          //   this.getInput.cs = this.inquired.foodName; //食材名
          this.officeonce[this.csListIndex].id = this.inquired.id;
          this.officeonce[this.csListIndex].frame = this.inquired.foodType;
          this.officeonce[this.csListIndex].name = this.inquired.foodName;
          this.officeonce[
            this.csListIndex
          ].address = this.inquired.foodTypeName;
          this.officeonce[this.csListIndex].fruits = this.inquired.foodEat;
          // this.officeonce[this.csListIndex].name = this.inquired.foodName;
          //   console.log(this.getInput);
          this.temp.length = 0;
          this.officeonce.forEach((item, i) => {
            this.temp[i] = Number(item.malloc);
          });
          console.log(this.temp);
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
    //省市区
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
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.auditing();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.auditing();
    }
  }
};
</script>

<style>
.toolbar {
  width: 99%;
  height: 100%;
  background-color: #fff;
  /* height: 600px; */
  /* margin-left: 10px; */
}
.custom {
  width: 100%;
  height: 100px;
  font-size: 14px;
  padding-top: 15px;
  /* background-color: red; */
}
.tostring {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  /* background-color: red; */
}
.navbar {
  margin-top: 20px;
}
.update1 {
  width: 100%;
  height: 80px;
  /* background-color: red; */
}
.tmp_rcheck {
  width: 100%;
  height: 450px;

  overflow-y: auto;
}
.seecr {
  width: 400px;
  height: 30px;
  line-height: 30px;
  /* background-color: yellow; */
  float: left;
}
.seecr1 {
  width: 300px;
  height: 30px;
  line-height: 30px;
  /* background-color: yellow; */
  float: left;
  /* margin-left: 20px; */
}
.hash {
  width: 300px;
  height: 30px;
  line-height: 30px;
  float: left;
  color: #419df7;
}
.stored {
  width: 100%;
  /* height: 500px; */
  /* background-color: red; */
  margin-top: 20px;
}
.mationtxt {
  width: 95%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.unsigned {
  width: 95%;
  /* height: 700px; */
  /* display: flex; */
  /* margin-left: 40px; */
}
.worm1 {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.stop {
  color: #ff455b;
}
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  margin-top: 20px;
  margin-right: 40px;
  margin-bottom: 60px;
}
.rolling {
  width: 100%;
  height: 300px;
  overflow-y: auto;
}
</style>
