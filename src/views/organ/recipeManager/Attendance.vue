<template>
  <div class="teachers">
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="6"
          ><div>
            <span class="exact">姓名:</span>

            <el-input
              style="width:180px; margin-left: 20px;"
              v-model="formsearch.name"
              placeholder="请输入内容"
            ></el-input></div
        ></el-col>
        <el-col :span="10"
          ><div>
            <span style="margin-right: 10px;margin-left: 15px;">请假日期:</span>
            <el-date-picker
              v-model="formsearch.getDate"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker></div
        ></el-col>
        <el-col :span="6"
          ><div>
            <span style="margin-right: 10px;">职务:</span>
            <el-select
              clearable
              style="width: 180px; height: 30px"
              v-model="formsearch.position"
              placeholder="请选择"
            >
              <el-option
                v-for="item in vposition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 100px"
              >
              </el-option>
            </el-select></div
        ></el-col>
      </el-row>
      <el-row style="  padding-top: 10px;">
        <el-col :span="24"
          ><div>
            <el-button
              icon="el-icon-search"
              size="medium"
              type="primary"
              @click="searchType"
              >搜索</el-button
            >
            <el-button
              style="margin-left: 20px"
              icon="el-icon-refresh-right"
              size="medium"
              @click="emptyset"
              >清空</el-button
            >
            <el-button
              style="margin-left: 20px"
              size="medium"
              type="primary"
              icon="el-icon-plus"
              @click="addition(1)"
              >添加请假记录</el-button
            >
            <!-- <el-button
              style="margin-left: 20px"
              icon="el-icon-delete"
              size="medium"
              @click="notEmpty"
              >删除</el-button
            > -->
            <el-button
              icon="el-icon-download"
              @click="importExcel"
              style="margin-left: 20px"
              type="primary"
              size="medium"
              >导出</el-button
            >
            <el-button
              style="margin-left: 20px"
              icon="el-icon-upload"
              @click="osimport"
              type="primary"
              size="medium"
              >导入</el-button
            >
          </div></el-col
        >
      </el-row>
      <el-dialog
        title="导入学生"
        width="30%"
        append-to-body
        :visible.sync="ioimport"
        :close-on-click-modal="false"
      >
        <div>
          <div>
            <span>① 下载导入模板</span>
            <el-button
              style="margin-left: 20px"
              type="primary"
              size="medium"
              @click="exportExcel"
              >下载模板</el-button
            >
          </div>

          <div class="newbie">
            <el-upload
              class="upload-demo"
              action="api/blade-food/teacherleave/import-info"
              :headers="headerObj"
              accept=".xlsx"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :on-error="handleError"
            >
              <span>② 上传导入文件</span>
              <el-button size="medium" type="primary" style="margin-left: 20px"
                >点击上传</el-button
              >
              <!-- <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div> -->
            </el-upload>
          </div>
        </div>
      </el-dialog>
      <el-row>
        <el-col :span="24"
          ><div>
            <el-table
              id="out-table"
              v-loading="loadFlag"
              :element-loading-text="page_data.loadTxt"
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
              >
              </el-table-column>

              <el-table-column prop="teacherName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="post" label="职务" align="center">
              </el-table-column>
              <el-table-column prop="deptName" label="部门" align="center">
              </el-table-column>
              <el-table-column label="请假开始日期" width="150" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.startTime }}</span>
                  <span>{{ scope.row.startStr }}</span>
                </template>
              </el-table-column>
              <el-table-column width="150" label="请假结束日期" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.endTime }}</span>
                  <span>{{ scope.row.endStr }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="leaveType" label="请假类型" align="center">
              </el-table-column>
              <el-table-column prop="daysOff" label="请假天数" align="center">
              </el-table-column>
              <el-table-column
                width="150"
                prop="reason"
                label="请假原因"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="applyTime"
                width="150"
                label="申请日期"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="createBy" label="创建人" align="center">
              </el-table-column>
              <el-table-column
                width="150"
                prop="createTime"
                label="创建日期"
                align="center"
              >
              </el-table-column>

              <el-table-column
                width="150"
                fixed="right"
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="editorTheme(scope.row, 2)"
                    type="text"
                    size="small"
                    icon="el-icon-edit"
                    style="margin-left: 20px"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                    style="margin-left: 20px"
                    @click="DeleteUser(scope.row)"
                    >删除</el-button
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
            </div></div
        ></el-col>
      </el-row>
    </div>
    <el-dialog
      width="60%"
      :title="this.titlebar"
      append-to-body
      :visible.sync="dateTime"
      :close-on-click-modal="false"
    >
      <div class="onlymsgid">
        <el-form
          :model="ruleForm"
          :rules="rules"
          :inline="true"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="state" style="width: 370px">
            <!-- <el-input style="width: 250px" v-model="ruleForm.name"></el-input> -->
            <el-autocomplete
              style="width: 250px"
              v-model="ruleForm.state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="职务" prop="position">
            <el-select
              :disabled="true"
              clearable
              style="width: 250px"
              v-model="ruleForm.position"
              placeholder="请选择"
            >
              <el-option
                v-for="item in vposition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在年级/班级" style="width: 370px">
            <el-cascader
              :disabled="true"
              style="width: 250px"
              clearable
              v-model="stringClass"
              :options="loadClass"
              :props="{ multiple: true, checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="请假类型" prop="forgreater">
            <el-select
              clearable
              style="width: 250px"
              v-model="ruleForm.forgreater"
              placeholder="请选择"
            >
              <el-option
                v-for="item in comfortable"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 370px">
            <span style="font-size: 12px"
              >若为年级组长、保教主任、老师、保育员时需选择 所在年级/班级</span
            >
          </el-form-item>
          <el-form-item label="请假申请日期">
            <el-date-picker
              :disabled="true"
              format="yyyy 年 MM 月 dd 日HH时 mm分 "
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 250px"
              v-model="ruleForm.formula"
              type="datetime"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            style="width: 370px"
            label="请假开始日期"
            prop="starting"
          >
            <el-date-picker
              :popper-class="'currentDatePickerClass'"
              @change="started()"
              style="width: 180px"
              format="yyyy 年 MM 月 dd 日 "
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.starting"
              type="datetime"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-select
              @change="started()"
              style="width: 75px"
              v-model="engine"
              placeholder="请选择"
            >
              <el-option
                v-for="item in minute"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="请假结束日期"
            prop="software"
            style="width: 370px"
          >
            <el-date-picker
              :popper-class="'currentDatePickerClass'"
              @change="started()"
              style="width: 180px"
              format="yyyy 年 MM 月 dd 日 "
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.software"
              type="datetime"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-select
              style="width: 75px"
              v-model="dauphine"
              placeholder="请选择"
            >
              <el-option
                @change="started()"
                v-for="item in rolling"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请假天数" prop="weekday">
            <el-input
              type="number"
              style="width: 250px"
              v-model="ruleForm.weekday"
            ></el-input>
          </el-form-item>
          <el-form-item label="" style="width: 360px"> </el-form-item>
          <el-form-item label="请假事由" prop="reason">
            <el-input
              style="width: 250px"
              type="textarea"
              placeholder="请输入内容"
              v-model="ruleForm.reason"
              maxlength="50"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              style="width: 250px"
              type="textarea"
              placeholder="请输入内容"
              v-model="ruleForm.newnotes"
              maxlength="50"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="创建人" style="width: 360px">
            <span>李老师</span>
          </el-form-item>
          <el-form-item label="创建时间" style="width: 360px">
            <span>2020-12-22</span>
          </el-form-item> -->
          <el-form-item label="附件上传" style="width: 360px">
            <el-upload
              :class="{ hide: hideUploadEdit }"
              accept=".jpeg,.jpg,.gif,.png"
              action="api/blade-resource/oss/endpoint/put-file"
              list-type="picture-card"
              :limit="1"
              :file-list="productImgs"
              :on-exceed="handleExceed"
              :on-change="handleChangePic"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :headers="headerObj"
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
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="ratycancel('ruleForm')">取 消</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        <el-button
          v-if="this.under == 1"
          @click="cameras('ruleForm')"
          type="primary"
          >确 定</el-button
        >
        <el-button v-else @click="editorPara('ruleForm')" type="primary"
          >确定</el-button
        >
        <!-- <el-button @click="started" type="primary">测试计算</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      headerObj: {
        "Blade-Auth": ""
      }, //上传图片请求头
      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      hideUploadEdit: false, // 是否隐藏上传按钮
      gmfmcItems: [], // 名称
      dialogVisible: false,
      fileList: [],
      restaurants: [],
      ioimport: false,
      restaurants: [],

      timeout: null,
      titlebar: "",
      agree: "", //名字ID
      formsearch: {
        name: "",
        getDate: "",
        position: ""
      },
      ruleForm: {
        state: "",
        name: "",
        position: "",
        forgreater: "", //请假类型
        formula: "", //请假申请日期
        starting: "", //开始日期
        software: "", //结束
        weekday: "", //请假天数
        reason: "", //请假事由
        newnotes: "" //备注
      },
      rules: {
        state: [{ required: true, message: "请输入姓名", trigger: "change" }],
        position: [{ required: true, message: "请选择职务", trigger: "blur" }],
        forgreater: [
          { required: true, message: "请选择请假类型", trigger: "blur" }
        ],
        starting: [
          { required: true, message: "请选择请假开始日期", trigger: "blur" }
        ],
        software: [
          { required: true, message: "请选择请假结束日期", trigger: "blur" }
        ],
        weekday: [
          { required: true, message: "请填写请假天数", trigger: "blur" }
        ],
        reason: [{ required: true, message: "请填写请假事由", trigger: "blur" }]
      },
      dateTime: false,
      loadFlag: false, //加载flag
      page_data: {
        loadTxt: "数据加载中..."
      },
      tableData: [],
      stringClass: [], //所在年级
      loadClass: [], //所在年级
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      engine: "上午",
      minute: [
        {
          value: "上午",
          label: "上午"
        },
        {
          value: "下午",
          label: "下午"
        }
      ],
      dauphine: "下午",
      rolling: [
        {
          value: "上午",
          label: "上午"
        },
        {
          value: "下午",
          label: "下午"
        }
      ],
      comfortable: [
        {
          value: "事假",
          label: "事假"
        },
        {
          value: "病假",
          label: "病假"
        }
      ],
      vposition: [
        //职务
        {
          value: "园长",
          label: "园长"
        },
        {
          value: "副园长",
          label: "副园长"
        },
        {
          value: "保健园",
          label: "保健园"
        },
        {
          value: "老师",
          label: "老师"
        },
        {
          value: "保教主任",
          label: "保教主任"
        },
        {
          value: "保育员",
          label: "保育员"
        },
        {
          value: "年级组长",
          label: "年级组长"
        },
        {
          value: "教研组长",
          label: "教研组长"
        },
        {
          value: "后勤主任",
          label: "后勤主任"
        },
        {
          value: "炊事员",
          label: "炊事员"
        },
        {
          value: "保洁",
          label: "保洁"
        },
        {
          value: "保安",
          label: "保安"
        },
        {
          value: "财务",
          label: "财务"
        },
        {
          value: "跟车老师",
          label: "跟车老师"
        },
        {
          value: "办公司人员",
          label: "办公司人员"
        },
        {
          value: "办事员",
          label: "办事员"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      under: "",
      bonus: "", //编辑ID
      timezone: "",
      timezone1: ""
    };
  },
  beforeMount() {
    this.getToolkit(); //班级渲染
    this.getStorage();
    this.Takeone();
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      // console.log(this.headerObj);
    },
    //导入学生弹框
    osimport() {
      this.ioimport = true;
      this.fileList = [];
    },
    //定义导出Excel表格事件
    exportExcel() {
      this.$axios
        .get(`api/blade-food/teacherleave/export-template`, {
          responseType: "blob"
        })
        .then(res => {
          console.log(res);
          var blob = new Blob([res.data], {
            type: "application/octet-stream"
          }); //type这里表示xlsx类型

          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "教职工出勤模板.xlsx"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
        });
    },
    //导入Excel
    importExcel() {
      let urlParams = `?size=${this.m_page.size}&current=${this.m_page.number}&teacherName=${this.formsearch.name}&startTimeStr=${this.timezone}&endTimeStr=${this.timezone1}&post=${this.formsearch.position}`;
      this.$axios
        .get(`api/blade-food/teacherleave/page` + urlParams)
        .then(res => {
          // console.log(res);
          // this.loadFlag = false;
          this.tableData = res.data.data.records;
          // this.m_page.totalElements = res.data.data.total;
        });
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/export2Excel");
        const tHeader = [
          "姓名",
          "职务",
          "部门",
          "请假开始日期",
          "上下午",
          "请假结束日期",
          "上下午",
          "请假类型",
          "请假天数",
          "请假原因",
          "申请日期",
          "创建人",
          "创建日期"
        ]; //导出表头信息
        const filterVal = [
          "teacherName",
          "post",
          "deptName",
          "startTime",
          "startStr",
          "endTime",
          "endStr",
          "leaveType",
          "daysOff",
          "reason",
          "applyTime",
          "createBy",
          "createTime"
        ]; // 导出的表头字段名，需要导出表格字段名
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "教职工出勤管理"); // 导出的表格名称
      });
    },
    //格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    loadAll() {
      return [];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let params = `?name=${queryString}`;
        this.$axios
          .get(`api/blade-food/teacherleave/stuSearch` + params, {})
          .then(res => {
            //   console.log(res);
            this.students = res.data.data;

            // console.log(this.students);
            this.restaurants = [];
            this.students.forEach((item, index) => {
              console.log(item);
              this.restaurants.push({
                id: item.id,
                value: item.stuStr,
                classStr: item.classStr,
                post: item.post
              });
              console.log(this.restaurants);
            });
            cb(this.restaurants);
          });
      }, 500);
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      // console.log(item);
      //  this.ruleForm.name = item.value;
      this.agree = item.id;
      this.ruleForm.position = item.post; //职务
      console.log(this.ruleForm.position);
      if (item.classStr) {
        let elseclass = {
          class: [item.classStr]
        };
        elseclass.class = [...JSON.parse(elseclass.class[0])];
        this.stringClass = elseclass.class;
      } else {
        this.stringClass = [];
      }
    },
    started() {
      if (this.ruleForm.starting != "" && this.ruleForm.software != "") {
        if (this.ruleForm.software < this.ruleForm.starting) {
          this.$message({
            message: "结束时间不能小于开始时间",
            type: "warning"
          });
          this.ruleForm.weekday = "";
          return;
        } else {
          var afterTime = Date.parse(this.ruleForm.starting.replace(/-/g, "/"));
          var before = Date.parse(this.ruleForm.software.replace(/-/g, "/"));
          if (this.engine == "下午") {
            afterTime += 12 * 60 * 60 * 1000;
          }
          if (this.dauphine == "上午") {
            before += 12 * 60 * 60 * 1000;
          } else {
            before += 24 * 60 * 60 * 1000;
          }
          let year = (before - afterTime) / (1000 * 60 * 60 * 24);
          console.log(year);
          this.ruleForm.weekday = year;
        }
      } else {
        return;
      }
    },
    notEmpty() {
      this.agree = ""; //ID
      this.ruleForm.state = "";
      this.ruleForm.position = "";
      this.stringClass = [];
      this.ruleForm.forgreater = "";
      this.engine = "上午";
      // this.ruleForm.formula="";
      this.ruleForm.starting = "";
      this.dauphine = "下午";
      this.ruleForm.software = "";
      this.ruleForm.weekday = "";
      this.ruleForm.reason = "";
      this.ruleForm.newnotes = "";
      this.productImgs = [];
      this.hideUploadEdit = this.productImgs.length >= 1;
    },
    //添加请假弹框
    addition(index) {
      // console.log(index);
      this.under = index;
      this.notEmpty();
      this.titlebar = "添加请假记录";
      this.dateTime = true;
      //默认获取请假申请日期
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      // console.log(this.gettime);
      this.ruleForm.formula = this.gettime;
      // console.log(time);
    },
    //编辑保存
    editorPara(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("123123!");
          this.$axios
            .post(`api/blade-food/teacherleave/update`, {
              id: this.bonus,
              teacherId: this.agree, //姓名ID
              post: this.ruleForm.position, //职务
              classStr: this.stringClass, //班级
              leaveType: this.ruleForm.forgreater, //请假类型
              applyTime: this.ruleForm.formula, //申请时间
              startTime: this.ruleForm.starting, //开始日期
              startStr: this.engine, //上午下午
              endTime: this.ruleForm.software, //请假结束时间
              endStr: this.dauphine, //上午下午
              daysOff: this.ruleForm.weekday, //请假天数
              reason: this.ruleForm.reason, //事由
              remark: this.ruleForm.newnotes, //备注
              enclosure: this.dialogImageUrl
            })
            .then(res => {
              // console.log(res);
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.getStorage();
              this.notEmpty();
              this.dateTime = false;
            })
            .catch(() => {
              this.$message.error("编辑失败");
            });
        } else {
          this.$message({
            message: "信息未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //编辑弹框
    editorTheme(row, index) {
      this.under = index;
      this.titlebar = "编辑请假记录";
      this.dateTime = true;
      this.sort = row.id;
      this.$axios
        .get(`api/blade-food/teacherleave/detail?id=${this.sort}`, {})
        .then(res => {
          this.dateEnd = res.data.data;
          // console.log(this.dateEnd);
          this.bonus = this.dateEnd.id;
          // console.log(this.bonus);
          this.agree = this.dateEnd.studentId; //姓名ID
          this.ruleForm.state = this.dateEnd.stuStr;
          this.ruleForm.position = this.dateEnd.post;
          if (this.dateEnd.classStr) {
            let elseclass = {
              class: [this.dateEnd.classStr]
            };
            elseclass.class = [...JSON.parse(elseclass.class[0])];
            this.stringClass = elseclass.class;
          } else {
            this.stringClass = [];
          }
          this.ruleForm.forgreater = this.dateEnd.leaveType;
          this.ruleForm.formula = this.dateEnd.applyTime;
          this.ruleForm.starting = this.dateEnd.startTime;
          this.engine = this.dateEnd.startStr;
          this.ruleForm.software = this.dateEnd.endTime;
          this.dauphine = this.dateEnd.endStr;
          this.ruleForm.weekday = this.dateEnd.daysOff;
          this.ruleForm.reason = this.dateEnd.reason;
          this.ruleForm.newnotes = this.dateEnd.remark;
          let picture = [];
          if (this.dateEnd.enclosure) {
            picture[0] = {
              url: this.dateEnd.enclosure
            };
          }
          this.productImgs = picture;
          this.hideUploadEdit = this.productImgs.length >= 1;
          this.dialogImageUrl = this.dateEnd.enclosure;
        });
    },
    //清空
    emptyset() {
      this.formsearch.name = "";
      this.formsearch.getDate = "";
      this.timezone = "";
      this.timezone1 = "";
      this.formsearch.position = "";
      this.getStorage();
    },
    searchType() {
      if (this.formsearch.getDate) {
        this.timezone = this.formsearch.getDate[0];
        console.log(this.timezone);
        this.timezone1 = this.formsearch.getDate[1];
        console.log(this.timezone1);
      } else {
        this.timezone = "";
        this.timezone1 = "";
      }
      // console.log(this.formsearch.position);
      this.getStorage();
    },
    //获取列表
    getStorage() {
      this.loadFlag = true;
      let urlParams = `?size=${this.m_page.size}&current=${this.m_page.number}&teacherName=${this.formsearch.name}&startTimeStr=${this.timezone}&endTimeStr=${this.timezone1}&post=${this.formsearch.position}`;
      this.$axios
        .get(`api/blade-food/teacherleave/page` + urlParams)
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.tableData = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
        });
    },
    //保存
    cameras(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("123123!");
          this.$axios
            .post(`api/blade-food/teacherleave/save`, {
              teacherId: this.agree, //姓名ID
              post: this.ruleForm.position, //职务
              classStr: this.stringClass, //班级
              leaveType: this.ruleForm.forgreater, //请假类型
              applyTime: this.ruleForm.formula, //申请时间
              startTime: this.ruleForm.starting, //开始日期
              startStr: this.engine, //上午下午
              endTime: this.ruleForm.software, //请假结束时间
              endStr: this.dauphine, //上午下午
              daysOff: this.ruleForm.weekday, //请假天数
              reason: this.ruleForm.reason, //事由
              remark: this.ruleForm.newnotes, //备注
              enclosure: this.dialogImageUrl //附件
            })
            .then(res => {
              // console.log(res);
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.getStorage();
              this.dateTime = false;
            })
            .catch(() => {
              this.$message.error("保存失败");
            });
        } else {
          this.$message({
            message: "信息未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //删除
    DeleteUser(row) {
      this.term = row.id;
      this.term = row.id;
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`api/blade-food/teacherleave/remove?ids=${this.term}`, {})
            .then(res => {
              // console.log(res);
              this.getStorage();
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
    //取消
    ratycancel(formName) {
      this.dateTime = false;
      this.$refs[formName].resetFields();
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.getStorage();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.getStorage();
    },
    //移除图片
    handleRemove(file, productImgs) {
      // console.log(file, fileList);
      this.dialogImageUrl = "";
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
    beforeUpload(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$message.warning("只能上传后缀是.xlsx的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    // 文件上传成功
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
      this.ioimport = false;
      this.getStorage();
    },
    // 文件上传失败
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    //获取所属班级
    getToolkit() {
      this.$axios.get(`api/blade-food/class/tree`, {}).then(res => {
        // console.log(res);
        this.bufs = res.data.data;
        console.log(this.bufs);
        let fwork = [];
        this.bufs.forEach(item => {
          item.children.forEach((item1, index1) => {
            // console.log(item1);
            fwork[index1] = {
              value: item1.id,
              label: item1.label
            };
            fwork[index1].children = [];
            item1.children.forEach((item2, index2) => {
              fwork[index1].children[index2] = {
                value: item2.id,
                label: item2.label
              };
              fwork[index1].children[index2].children = [];
              if (item2.children) {
                item2.children.forEach((item3, index3) => {
                  // console.log(item3),
                  fwork[index1].children[index2].children[index3] = {
                    value: item3.id,
                    label: item3.label
                  };
                });
              }
            });
          });
        });
        this.loadClass = fwork;
        console.log(this.loadClass);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.teachers {
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 14px;
}
.header {
  width: 100%;
  height: 100%;
  //   margin-top: 10px;
  padding-top: 10px;
}
.onlymsgid {
  overflow-x: hidden;
  overflow-y: auto;
  height: 400px;
}
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  background-color: #fff;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 60px;
}
.newbie {
  height: 100px;
  margin-top: 20px;
}
/deep/ .hide .el-upload--picture-card {
  display: none;
}
</style>
