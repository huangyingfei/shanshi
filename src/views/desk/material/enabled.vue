<template>
  <div class="toolbar">
    <!-- 搜索 -->
    <div class="custom">
      <span style=" margin-left: 15px; margin-right: 10px;">食材名称:</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width:200px"
      ></el-input>
      <span style="margin: 0 10px;">创建机构:</span>
      <el-input
        v-model="noinst"
        placeholder="请输入内容"
        style="width:200px"
      ></el-input>
      <span style="margin: 0 10px;">提交日期:</span>
      <el-date-picker
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        c
        v-model="value1"
        type="date"
        placeholder="选择日期"
        style="width:200px"
      ></el-date-picker>
      <span style="margin: 0 10px;">提交人:</span>
      <el-input
        v-model="editor"
        placeholder="请输入内容"
        style="width:200px"
      ></el-input>

      <div class="tostring">
        <span style="margin-left: 15px;margin-right: 10px; ">联系电话:</span>
        <el-input
          v-model="phoneId"
          placeholder="请输入内容"
          style="width:200px"
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
          @click="searchType"
          size="medium"
          icon="el-icon-search"
          type="primary"
          style=" margin-left: 20px; "
          >搜索</el-button
        >
        <el-button size="medium" style=" margin-left: 20px; ">清空</el-button>
      </div>
    </div>
    <!-- 审核表格 -->
    <div class="navbar">
      <el-table
        :data="attributes"
        border
        stripe
        style="width: 100%"
        :element-loading-text="page_data.loadTxt"
        v-loading="loadFlag"
        empty-text="没有数据~"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="foodName"
          label="食材名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="foodTypeName"
          label="分类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="创建机构"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createName"
          label="提交人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="联系电话"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          align="center"
        ></el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <p class="stop" v-if="scope.row.status == 0">待审核</p>
            <p v-else-if="scope.row.status == 3">无需审核</p>
            <p v-else-if="scope.row.status == 1">审核通过</p>
            <p v-else-if="scope.row.status == 2">审核不通过</p>
          </template>
        </el-table-column>
        <!--操作格-->
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status != 0"
              type="text"
              icon="el-icon-view"
              size="small"
              @click="seecol(scope.row, 0)"
              >查看</el-button
            >
            <el-button
              v-if="scope.row.status == 0"
              icon="el-icon-user-solid"
              type="text"
              size="small"
              @click="Directory(scope.row, 1)"
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
      title="审核食材"
      :fullscreen="true"
      append-to-body
      :visible.sync="seekeys"
      :close-on-click-modal="false"
    >
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
        <div class="seecr1">
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
        <div class="mationtxt">食材主要信息</div>
        <div class="unsigned">
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
              <el-input v-model="ruleForm.move"></el-input>
            </el-form-item>
            <el-form-item label="食物别名2" style=" width: 350px;  ">
              <el-input v-model="ruleForm.move1"></el-input>
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
              prop="autosave"
              style=" width: 350px;   "
            >
              <el-select
                style="width:185px"
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

            <el-form-item label="食物分类1" style=" width: 350px;  ">
              <el-input
                v-model="ruleForm.foods"
                placeholder="请输入食材"
              ></el-input>
            </el-form-item>

            <el-form-item label="食物分类2" style=" width: 350px;   ">
              <el-input
                v-model="ruleForm.dogfood"
                placeholder="请输入食材"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="食部(%)"
              prop="besaved"
              style=" width: 350px;  "
            >
              <el-input
                v-model="ruleForm.besaved"
                placeholder="请输入食部"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="重量（g）"
              prop="timers"
              style=" width: 350px; "
            >
              <el-input
                v-model="ruleForm.timers"
                placeholder="请输入重量"
              ></el-input>
            </el-form-item>

            <el-form-item label="水分(%)" style=" width: 350px;   ">
              <el-input
                v-model="ruleForm.content"
                placeholder="请输入水分"
              ></el-input>
            </el-form-item>

            <el-form-item label="色系" style="width: 605px;   ">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="1">绿</el-radio>
                <el-radio label="2">红</el-radio>
                <el-radio label="3">黄</el-radio>
                <el-radio label="4">紫</el-radio>
                <el-radio label="5">白</el-radio>
                <el-radio label="6">黑</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="所属季节" style="  width: 350px;  ">
              <el-select
                style="width:185px"
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
            <el-form-item label="所属区域" style=" width: 350px;  ">
              <el-cascader
                style="width:185px"
                v-model="valuepark"
                placeholder="请选择省市区"
                :options="options"
                :props="{ multiple: true, checkStrictly: true }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="功用">
              <el-input
                style=" width: 185px;  "
                type="textarea"
                v-model="ruleForm.desc"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="图片" style=" width:500px ">
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

            <el-switch
              :disabled="true"
              style=" width:200px "
              v-model="ruleForm.delivery"
              active-text="公开"
              inactive-text="不公开"
            >
            </el-switch>
            <!-- <el-form-item label="公开" style=" width:200px ">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item> -->

            <!-- <el-form-item label="常用" style="   ">
              <el-switch v-model="ruleForm.delivery1"></el-switch>
            </el-form-item> -->
            <el-switch
              v-model="ruleForm.delivery1"
              active-text="常用"
              inactive-text="不常用"
            >
            </el-switch>
          </el-form>
        </div>
        <!-- 营养素标题 -->
        <div class="worm1">营养素含量（这里为100克食部食品中的营养素含量）</div>
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
        <!-- <div v-if="this.according == 1" class="worm1">公共库所属分类</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item v-if="this.according == 1" label="公共库分类">
            <el-select
              v-if="this.according == 1"
              v-model="menu"
              placeholder="请选择"
            >
              <el-option
                v-for="item in fication"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
        <div class="worm1" v-if="this.according == 1">拒绝原因</div>
        <el-form
          :model="examine"
          ref="examine"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            v-if="this.according == 1"
            label="拒绝原因"
            style=" width:200px "
            prop="desc1"
          >
            <el-input
              style=" width: 450px;  "
              type="textarea"
              v-model="examine.desc1"
            ></el-input>
          </el-form-item>
        </el-form>
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
          @click="restore(examine)"
          v-if="this.according == 1"
        >
          拒 绝</el-button
        >
        <el-button
          type="primary"
          @click="Disagree('ruleForm')"
          v-if="this.according == 1"
          >同 意</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  data() {
    return {
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
      mailto: [], //营养素含量
      loadFlag: false, //加载flag
      attributes: [], //表格数据
      page_data: {
        loadTxt: "请求列表中"
      },
      m_page: {
        //分頁
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      seekeys: false, //审核弹框
      value1: "", //日期
      input: "",
      input1: "",
      noinst: "",
      phoneId: "",
      editor: "",
      examine: {
        desc1: "" //拒绝理由
      },
      ruleForm: {
        name: "", //食材名
        move: "", //食物别名1
        move1: "", //食物别名2
        buffer: "", //食材真名
        fooddata: "", //食材分类
        foods: "", //食物分类
        dogfood: "", //食物分类2
        besaved: "", //食部
        timers: "", //重量
        content: "", //水分
        region: "",
        resource: "", //色系
        desc: "", //功用
        delivery: false, //公开
        delivery1: false, //常用
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
      active: [], //季节
      valuepark: [], //省市区
      menu: "", //公共分类
      fication: [],
      foodPos: [], //食材分类
      // rules: {
      //   desc1: [
      //     { required: true, message: "请输入拒绝理由", trigger: "change" }
      //   ]
      // },

      options: [], //省市区
      mState: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "2",
          label: "审核通过"
        },
        {
          value: "3",
          label: "审核不通过"
        },
        {
          value: "4",
          label: "无需审核"
        }
      ],
      mState1: "",
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

      value: "", //审核状态
      tableData1: [],
      flour: "", //ID
      according: "0"
    };
  },
  beforeMount() {
    this.auditing();
    this.setDec(); //公共库分类
    this.Protocol(); //营养素含量
    this.queryLite(); //获取分类
    this.Provinces(); //省市区
    this.Takeone();
  },
  methods: {
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      console.log(this.headerObj);
    },
    searchType() {
      this.auditing();
      // console.log(this.value1);
    },
    //获取表格数据
    auditing() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/food/getAuditList?size=${this.m_page.size}&current=${this.m_page.number}&name=${this.input}&orgName=${this.noinst}&mobile=${this.phoneId}&createName=${this.editor}&createtime=${this.value1}`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          // console.log(res);
          this.attributes = res.data.data.records;
          // console.log(this.attributes);
          this.m_page.totalElements = res.data.data.total;
          this.loadFlag = false;
        });
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.auditing();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.auditing();
    },
    //查看
    seecol(row, index) {
      this.according = index;
      // console.log(index);
      // console.log(row);
      this.examine.desc1 = "";
      this.valuepark.length = 0;
      this.active.length = 0;
      this.seekeys = true;
      let design = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/food/detail` + design, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.subquery = res.data.data;
          console.log(this.subquery);
          // this.menu = this.subquery.foodPubType;
          this.flour = this.subquery.id; //ID
          this.agree = this.subquery.status; //审核状态
          this.dsquery.establish = this.subquery.orgName; //创建机构
          this.dsquery.submit = this.subquery.createName; //提交人
          this.dsquery.phone = this.subquery.mobile; //提交电话
          this.dsquery.time = this.subquery.createTime; //提交时间
          this.dsquery.examineto = this.subquery.status; //审核状态
          this.ruleForm.name = this.subquery.foodName; //食材名
          this.ruleForm.move = this.subquery.foodAlias; //食物别名
          this.ruleForm.move1 = this.subquery.foodAlias1; //食物别名2
          this.ruleForm.buffer = this.subquery.foodReal; //食物真名
          this.ruleForm.fooddata = this.subquery.foodType; //食物分类
          this.ruleForm.foods = this.subquery.foodType1; //食物分类1
          this.ruleForm.dogfood = this.subquery.foodType2; //食物分类2
          this.ruleForm.besaved = this.subquery.foodEat; //食部
          this.ruleForm.timers = this.subquery.weight; //重量
          this.ruleForm.content = this.subquery.water; //水分
          this.ruleForm.resource = this.subquery.color + ""; //色系
          this.subquery.season.split(",").forEach(item => {
            //所属季节
            this.active.push(item);
          });
          let bar = [];
          this.subquery.provinces.split(",").forEach((item, i) => {
            bar.push([item, this.subquery.belongRegion.split(",")[i]]);
          });
          this.valuepark = bar;
          let picture = []; //图片
          if (this.subquery.pic) {
            picture[0] = {
              url: this.subquery.pic
            };
          }
          this.productImgs = picture;
          this.ruleForm.desc = this.subquery.function; //功用

          this.productImgs = picture;
          this.ruleForm.delivery = this.subquery.isPub == 0 ? true : false; //公开
          // console.log(this.ruleForm.delivery);
          this.ruleForm.delivery1 = this.subquery.isUse == 0 ? true : false; //常用
          // this.ruleForm.
          let units = this.subquery.nutritions;
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
    },
    //拒绝
    restore(examine) {
      console.log(examine);
      if (examine.desc1 == "") {
        this.$message({
          message: "拒绝理由未填",
          type: "warning"
        });
      } else {
        // alert("enen ");
        let food = [];
        this.mailto.forEach((item, index) => {
          item.children.forEach((item1, indx1) => {
            if (item1.children) {
              item1.children.forEach((item2, index2) => {
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
        this.$axios
          .post(`api/blade-food/food/audit`, {
            id: this.subquery.id,
            refuseReason: this.examine.desc1,
            status: 2, //审核状态
            // foodPubType: this.menu, //公共库所属分类
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
            this.examine.desc1 = "";
            console.log(res);
            this.auditing();
            this.seekeys = false;
            this.$message({
              message: "拒绝成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$message.error("拒绝失败");
          });
      }
    },
    //同意
    Disagree(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let food = [];
          this.mailto.forEach((item, index) => {
            item.children.forEach((item1, indx1) => {
              if (item1.children) {
                item1.children.forEach((item2, index2) => {
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
          this.$axios
            .post(`api/blade-food/food/audit`, {
              id: this.flour, //ID
              status: 1, //审核状态
              // foodPubType: this.menu, //公共库所属分类
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
                message: "审核成功",
                type: "success"
              });
              this.auditing();
              this.seekeys = false;
            })
            .catch(() => {
              this.$message.error("审核失败");
            });
        } else {
          this.$message({
            message: "食材未填全",
            type: "warning"
          });
          return false;
        }
      });
      // console.log(this.ruleForm.fooddata);
    },
    //审核
    Directory(row, index) {
      console.log(index);
      this.according = index;
      this.examine.desc1 = "";
      this.valuepark.length = 0;
      this.active.length = 0;
      this.seekeys = true;
      // console.log(row);
      let design = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/food/detail` + design, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.subquery = res.data.data;
          console.log(this.subquery);
          this.flour = this.subquery.id; //ID
          this.agree = this.subquery.status; //审核状态
          this.dsquery.establish = this.subquery.orgName; //创建机构
          this.dsquery.submit = this.subquery.createName; //提交人
          this.dsquery.phone = this.subquery.mobile; //提交电话
          this.dsquery.time = this.subquery.createTime; //提交时间
          this.dsquery.examineto = this.subquery.status; //审核状态
          this.ruleForm.name = this.subquery.foodName; //食材名
          this.ruleForm.move = this.subquery.foodAlias; //食物别名
          this.ruleForm.move1 = this.subquery.foodAlias1; //食物别名2
          this.ruleForm.buffer = this.subquery.foodReal; //食物真名
          this.ruleForm.fooddata = this.subquery.foodType; //食物分类
          this.ruleForm.foods = this.subquery.foodType1; //食物分类1
          this.ruleForm.dogfood = this.subquery.foodType2; //食物分类2
          this.ruleForm.besaved = this.subquery.foodEat; //食部
          this.ruleForm.timers = this.subquery.weight; //重量
          this.ruleForm.content = this.subquery.water; //水分
          this.ruleForm.resource = this.subquery.color + ""; //色系
          this.subquery.season.split(",").forEach(item => {
            //所属季节
            this.active.push(item);
          });
          let bar = [];
          this.subquery.provinces.split(",").forEach((item, i) => {
            bar.push([item, this.subquery.belongRegion.split(",")[i]]);
          });
          this.valuepark = bar;
          this.ruleForm.desc = this.subquery.function; //功用
          let picture = []; //图片
          if (this.subquery.pic) {
            picture[0] = {
              url: this.subquery.pic
            };
          }
          this.productImgs = picture;
          this.ruleForm.delivery = this.subquery.isPub == 0 ? true : false; //公开
          // console.log(this.ruleForm.delivery);
          this.ruleForm.delivery1 = this.subquery.isUse == 0 ? true : false; //常用
          // this.ruleForm.
          let units = this.subquery.nutritions;
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
    //公共库分类
    setDec() {
      this.$axios
        .get(`api/blade-food/basetype/getList?isPrivate=1&type=1`, {})
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
          this.fication = str;
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
      // return isJPG && isLt2M;
      return isLt2M;
    }
  }
};
</script>

<style scoped>
.toolbar {
  width: 99%;
  height: 100%;
  background-color: #fff;
  margin-left: 0;
  /* height: 600px; */
}
.custom {
  width: 1135px;
  height: 100px;
  /* margin-left: 7px; */
  /* background-color: red; */
  padding-top: 20px;
  font-size: 14px;
}
.tostring {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  /* background-color: red; */
}
.navbar {
  margin-top: 50px;
}
.update1 {
  width: 100%;
  height: 80px;
  /* background-color: red; */
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
  margin-left: 20px;
}
.hash {
  width: 300px;
  height: 30px;
  line-height: 30px;
  color: #419df7;
}
.stored {
  width: 100%;
  /* height: 500px; */
  /* background-color: red; */
  margin-top: 20px;
}
.mationtxt {
  width: 1000px;

  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.unsigned {
  width: 1115px;
  height: 100%;

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
</style>
