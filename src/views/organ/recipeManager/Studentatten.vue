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
            <span style="margin-right: 10px;margin-left: 15px;">日期:</span>
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
        <el-col :span="7"
          ><div>
            <span style="margin-right: 10px;">班级:</span>

            <el-cascader
              style="width: 250px"
              clearable
              v-model="classInfo"
              :options="loadClass"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader></div
        ></el-col>
      </el-row>
      <el-row style="  padding-top: 10px;">
        <el-col :span="24"
          ><div>
            <el-button
              icon="el-icon-search"
              size="medium"
              type="primary"
              @click="searchBtn"
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
              style="margin-left: 20px"
              type="primary"
              size="medium"
              icon="el-icon-download"
              @click="importExcel"
              >导出</el-button
            >
            <el-button
              style="margin-left: 20px"
              size="medium"
              type="primary"
              icon="el-icon-upload"
              @click="osimport"
              >导入</el-button
            >
          </div></el-col
        >
      </el-row>

      <!-- 添加部门弹框 -->
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
              action="api/blade-food/studentleave/import-info"
              :headers="headerObj"
              accept=".xlsx"
              :on-preview="handlePreview"
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
              :data="tableData"
              v-loading="loadFlag"
              border
              style="width: 100%"
              :element-loading-text="page_data.loadTxt"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
              >
              </el-table-column>

              <el-table-column prop="studentName" label="姓名" align="center">
              </el-table-column>
              <el-table-column
                width="100"
                prop="className"
                label="班级"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="startTimeStr"
                width="160"
                label="请假开始日期"
                align="center"
              >
                <!-- <template slot-scope="scope">
                  <span>{{ scope.row.startTime }}</span>
                  <span>{{ scope.row.startStr }}</span>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="endTimeStr"
                width="160"
                label="请假结束日期"
                align="center"
              >
                <!-- <template slot-scope="scope">
                  <span>{{ scope.row.endTime }}</span>
                  <span>{{ scope.row.endStr }}</span>
                </template> -->
              </el-table-column>
              <el-table-column prop="leaveType" label="请假类型" align="center">
                <!-- <template slot-scope="scope">
                  <p v-if="scope.row.leaveType == 1">事假</p>
                  <p v-else-if="scope.row.leaveType == 2">
                    病假
                  </p>
                </template> -->
              </el-table-column>
              <el-table-column prop="daysOff" label="请假天数" align="center">
              </el-table-column>
              <el-table-column
                width="100"
                prop="reason"
                label="请假原因"
                align="center"
              >
              </el-table-column>
              <el-table-column
                width="150"
                prop="applyTime"
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
              <el-table-column prop="source" label="来源" align="center">
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.status == 0"
                    >未确认</el-tag
                  >
                  <el-tag type="success" v-else-if="scope.row.status == 1"
                    >已生效</el-tag
                  >
                  <el-tag type="warning" v-else-if="scope.row.status == 2"
                    >已拒绝</el-tag
                  >
                </template>
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
                  <el-button
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                    style="margin-left: 20px"
                    v-if="scope.row.status == 0"
                    @click="modify(scope.row)"
                    >确认</el-button
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
          <el-form-item label="学生姓名" prop="state" style="width: 370px">
            <!-- <el-input style="width: 250px" v-model="ruleForm.name"></el-input> -->
            <el-autocomplete
              style="width: 250px"
              v-model="ruleForm.state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <!-- <el-form-item label="班级" prop="stringClass">
            <el-cascader
              style="width: 250px"
              clearable
              v-model="stringClass"
              :options="loadClass"
              :props="{ multiple: true, checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item> -->
          <el-form-item label="请假类型" prop="forgreater">
            <el-select
              @change="forward"
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

          <el-form-item label="请假申请日期" style="width: 370px">
            <el-date-picker
              :disabled="true"
              style="width: 250px"
              format="yyyy 年 MM 月 dd 日HH时 mm分 "
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.formula"
              type="datetime"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="请假开始日期"
            prop="starting"
            style="width: 370px"
          >
            <el-date-picker
              class="date_picker"
              :popper-class="'currentDatePickerClass'"
              @change="started()"
              style="width: 180px"
              format="yyyy 年 MM 月 dd 日"
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
              class="date_picker"
              @change="started()"
              style="width: 180px"
              v-model="ruleForm.software"
              format="yyyy 年 MM 月 dd 日 "
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-select
              @change="started()"
              style="width: 75px"
              v-model="dauphine"
              placeholder="请选择"
            >
              <el-option
                v-for="item in rolling"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请假天数" prop="weekday" style="width:370">
            <el-input
              type="number"
              style="width: 250px"
              v-model="ruleForm.weekday"
            ></el-input>
          </el-form-item>
          <el-form-item label="请假人申请人与学生关系">
            <el-input
              style="width: 250px"
              v-model="ruleForm.between"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="病假症状"
            v-if="this.enforce == '病假'"
            prop="relieve"
          >
            <el-select
              clearable
              style="width: 250px"
              v-model="ruleForm.relieve"
              placeholder="请选择"
            >
              <el-option
                v-for="item in moresick"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="体温(℃)" prop="weekday">
            <el-input
              type="number"
              style="width: 250px"
              v-model="ruleForm.bodypart"
            ></el-input>
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
          >编辑确定</el-button
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
      fileList: [],
      restaurants: [],
      ioimport: false,
      timeout: null,
      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      hideUploadEdit: false, // 是否隐藏上传按钮
      gmfmcItems: [], // 名称
      dialogVisible: false,
      formsearch: {
        name: "",
        getDate: "",
        position: ""
      },
      classInfo: [],
      ctest: true,
      agree: "", //名字ID
      ruleForm: {
        state: "",
        name: "",
        position: "", //班级
        forgreater: "", //请假类型
        formula: "", //请假申请日期
        starting: "", //开始日期
        software: "", //结束
        weekday: "", //请假天数
        between: "", //关系
        relieve: "", //症状
        reason: "", //请假事由
        newnotes: "", //备注
        bodypart: "" //体温
      },
      rules: {
        state: [{ required: true, message: "请输入姓名", trigger: "change" }],
        // stringClass: [
        //   { required: true, message: "请选择班级", trigger: "blur" }
        // ],
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
        relieve: [
          {
            required: true,
            message: "请选择病假症状",
            trigger: "blur"
          }
        ],
        reason: [
          { required: true, message: "请填写请假事由", trigger: "blur" }
        ],
        bodypart: [{ required: true, message: "请填写体温", trigger: "blur" }]
      },
      dateTime: false,
      stringClass: [], //所在年级
      loadClass: [], //所在年级
      tableData: [],
      attendance: [],
      loadFlag: false, //加载flag
      page_data: {
        loadTxt: "数据加载中..."
      },
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
      moresick: [
        {
          value: "感冒",
          label: "感冒"
        },
        {
          value: "咳嗽",
          label: "咳嗽"
        },
        {
          value: "发热",
          label: "发热"
        },
        {
          value: "肠胃不适",
          label: "肠胃不适"
        },
        {
          value: "皮疹",
          label: "皮疹"
        },
        {
          value: "腹泻",
          label: "腹泻"
        },
        {
          value: "黄疸",
          label: "黄疸"
        },
        {
          value: "结膜红肿",
          label: "结膜红肿"
        },
        {
          value: "呕吐",
          label: "呕吐"
        },
        {
          value: "牙疼",
          label: "牙疼"
        },
        {
          value: "外伤",
          label: "外伤"
        },
        {
          value: "咽痛",
          label: "咽痛"
        },
        {
          value: "其他",
          label: "其他"
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
      bonus: "", //编辑ID
      timezone: "",
      timezone1: "",
      under: "",
      builtinclass: "",
      enforce: "",
      symptoms: true
    };
  },
  beforeMount() {
    this.getToolkit(); //班级渲染
    this.getStorage();
    this.Takeone();
    // this.getList();
  },
  watch: {},
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    forward() {
      this.enforce = this.ruleForm.forgreater;
      //     if (this.ruleForm.forgreater == "病假") {
      //       this.symptoms = true;
      //
      //     } else {
      //       this.symptoms = false;
      //     }
      // console.log(this.enforce);
    },
    switchText(mes) {
      if (mes == 1) {
        return "已生效";
      } else {
        return "未确认";
      }
    },
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
    // downloadExcel() {},
    importExcel() {
      // console.log(123);
      let urlParams = `?size=${this.m_page.size}&current=${this.m_page.number}&studentName=${this.formsearch.name}&startTimeStr=${this.timezone}&endTimeStr=${this.timezone1}&classId=${this.builtinclass}`;
      this.$axios
        .get(`api/blade-food/studentleave/page` + urlParams, {})
        .then(res => {
          // console.log(res);
          // this.loadFlag = false;
          this.attendance = res.data.data.records;
          for (let i = 0; i < this.attendance.length; i++) {
            this.attendance[i].status = this.switchText(
              this.attendance[i].status
            );
            // console.log(this.attendance[i].status);
          }
          this.export2Excel();
        });
    },
    //导入Excel
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/export2Excel"); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const tHeader = [
          // "序号",
          "姓名",
          "班级",
          "请假开始日期",
          "请假结束日期",
          "请假类型",
          "请假天数",
          "请假原因",
          "申请日期",
          "创建人",
          "创建日期",
          "来源",
          "状态"
        ]; //导出表头信息
        const filterVal = [
          "studentName",
          "className",
          "startTimeStr",
          "endTimeStr",
          "leaveType",
          "daysOff",
          "reason",
          "applyTime",
          "createBy",
          "createTime",
          "source",
          "status"
        ]; // 导出的表头字段名，需要导出表格字段名
        const list = this.attendance;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "学生出勤管理"); // 导出的表格名称
      });
    },
    //格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // importExcel() {
    //   // /* 从表生成工作簿对象 */
    //   var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"), {
    //     raw: true
    //   });
    //   /* 获取二进制字符串作为输出 */
    //   var wbout = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array"
    //   });
    //   try {
    //     FileSaver.saveAs(
    //       //Blob 对象表示一个不可变、原始数据的类文件对象。
    //       //Blob 表示的不一定是JavaScript原生格式的数据。
    //       //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    //       //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    //       new Blob([wbout], { type: "application/octet-stream" }),
    //       //设置导出文件名称
    //       "学生出勤管理.xlsx"
    //     );
    //   } catch (e) {
    //     if (typeof console !== "undefined") console.log(e, wbout);
    //   }
    //   return wbout;
    // },
    //定义导出Excel表格事件
    exportExcel() {
      this.$axios
        .get(`api/blade-food/studentleave/export-template`, {
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
          downloadElement.download = "学生出勤管理模板.xlsx"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
        });
    },
    handleChange(value) {
      console.log(value);
    },
    loadAll() {
      return [
        // { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        // {
        //   value: "Hot honey 首尔炸鸡（仙霞路）",
        //   address: "上海市长宁区淞虹路661号"
        // }
      ];
    },
    //客户名称搜索
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      let that = this;
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // if (queryString != "") {
        let params = `?name=${queryString}`;
        this.$axios
          .get(`api/blade-food/studentleave/stuSearch` + params, {})
          .then(res => {
            //   console.log(res);
            this.students = res.data.data;

            // console.log(this.students);
            this.restaurants = [];
            this.students.forEach((item, index) => {
              this.restaurants.push({
                id: item.id,
                value: item.stuStr
              });
              // console.log(this.restaurants);
            });
            cb(this.restaurants);
          });
        // }
      }, 500);
    },
    //由于返回的值有延时加载时间，故而这里的时间设置很重要，必须要设置，否则就显示不出来数据
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.ruleForm.name = item.value;
      this.agree = item.id;
      console.log(this.agree);
    },

    started() {
      if (this.ruleForm.starting != "" && this.ruleForm.software != "") {
        if (this.ruleForm.software < this.ruleForm.starting) {
          this.$message({
            message: "结束时间不能小于开始时间",
            type: "warning"
          });
          this.ruleForm.weekday = "";
          this.ruleForm.software = "";
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
    addition(index) {
      this.under = index;
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
      this.notEmpty();
    },
    //清空
    emptyset() {
      this.formsearch.name = "";
      this.formsearch.getDate = "";
      this.timezone = "";
      this.timezone1 = "";
      this.classInfo = [];
      this.builtinclass = "";

      this.getStorage();
    },
    searchBtn() {
      if (this.formsearch.getDate) {
        this.timezone = this.formsearch.getDate[0];
        // console.log(this.timezone);
        this.timezone1 = this.formsearch.getDate[1];
        // console.log(this.timezone1);
      } else {
        this.timezone = "";
        this.timezone1 = "";
      }
      // console.log(this.classInfo.length);
      if (this.classInfo.length != 0) {
        this.builtinclass = this.classInfo[2];
        // console.log(this.builtinclass);
      } else {
        this.builtinclass = "";
      }
      this.getStorage();
    },
    //确认审核
    modify(row) {
      let rowNum = row.id;
      this.$axios
        .post(`api/blade-food/studentleave/update`, {
          id: rowNum,
          status: 1 //status=1表示确认
        })
        .then(res => {
          // console.log(res);
          this.$message({
            message: "确认成功",
            type: "success"
          });
          this.getStorage();
        })
        .catch(() => {
          this.$message.error("确认失败");
        });
    },
    //获取列表
    getStorage() {
      this.loadFlag = true;
      let urlParams = `?size=${this.m_page.size}&current=${this.m_page.number}&studentName=${this.formsearch.name}&startTimeStr=${this.timezone}&endTimeStr=${this.timezone1}&classId=${this.builtinclass}`;
      this.$axios
        .get(`api/blade-food/studentleave/page` + urlParams, {})
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.tableData = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
        });
    },
    notEmpty() {
      this.ruleForm.state = "";
      this.ruleForm.forgreater = "";
      // this.ruleForm.formula = "";
      this.ruleForm.starting = "";
      this.engine = "上午";
      this.ruleForm.software = "";
      this.dauphine = "下午";
      this.ruleForm.weekday = "";
      this.ruleForm.between = "";
      this.ruleForm.relieve = "";
      this.ruleForm.reason = "";
      this.ruleForm.bodypart = "";
      this.ruleForm.newnotes = "";
      this.productImgs = [];
      this.hideUploadEdit = this.productImgs.length >= 1;
    },
    //保存
    cameras(formName) {
      console.log(this.ruleForm.formula);
      console.log(this.ruleForm.name);
      this.$refs[formName].validate(valid => {
        clearInterval;
        if (valid) {
          // alert("123123!");
          this.$axios
            .post(`api/blade-food/studentleave/save`, {
              studentId: this.agree, //姓名ID
              leaveType: this.ruleForm.forgreater, //请假类型
              applyTime: this.ruleForm.formula, //请假申请日期
              startTime: this.ruleForm.starting, //请假开始时间
              startStr: this.engine, //上午下午
              endTime: this.ruleForm.software, //请假结束时间
              endStr: this.dauphine, //上午下午
              daysOff: this.ruleForm.weekday, //请假天数
              realtive: this.ruleForm.between, //关系
              disease: this.ruleForm.relieve, //症状
              reason: this.ruleForm.reason, //事由
              temperature: this.ruleForm.bodypart, //体温
              remark: this.ruleForm.newnotes, //备注
              enclosure: this.dialogImageUrl
            })
            .then(res => {
              // console.log(res);
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.getStorage();
              this.notEmpty();
              this.dateTime = false;
            });
          // .catch(() => {
          //   this.$message.error("保存失败");
          // });
        } else {
          this.$message({
            message: "信息未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //编辑保存
    editorPara(formName) {
      this.$refs[formName].validate(valid => {
        clearInterval;
        if (valid) {
          // alert(123);
          this.$axios
            .post(`api/blade-food/studentleave/update`, {
              id: this.bonus,
              studentId: this.agree, //姓名ID
              leaveType: this.ruleForm.forgreater, //请假类型
              applyTime: this.ruleForm.formula, //请假申请日期
              startTime: this.ruleForm.starting, //请假开始时间
              startStr: this.engine, //上午下午
              endTime: this.ruleForm.software, //请假结束时间
              endStr: this.dauphine, //上午下午
              daysOff: this.ruleForm.weekday, //请假天数
              realtive: this.ruleForm.between, //关系
              disease: this.ruleForm.relieve, //症状
              reason: this.ruleForm.reason, //事由
              temperature: this.ruleForm.bodypart, //体温
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
    //编辑
    editorTheme(row, index) {
      this.under = index;
      this.titlebar = "编辑请假记录";
      this.dateTime = true;
      // console.log(row);
      this.sort = row.id;
      this.$axios
        .get(`api/blade-food/studentleave/detail?id=${this.sort}`, {})
        .then(res => {
          // console.log(res);
          this.dateEnd = res.data.data;
          console.log(this.dateEnd);
          this.bonus = this.dateEnd.id;
          console.log(this.bonus);
          this.agree = this.dateEnd.studentId; //姓名ID
          this.ruleForm.state = this.dateEnd.stuStr;
          this.ruleForm.forgreater = this.dateEnd.leaveType;
          this.ruleForm.formula = this.dateEnd.applyTime; //申请日期
          this.ruleForm.starting = this.dateEnd.startTime; //开始日期
          this.engine = this.dateEnd.startStr; //上下午
          this.ruleForm.software = this.dateEnd.endTime; //结束日期
          this.dauphine = this.dateEnd.endStr; //上下午
          this.ruleForm.weekday = this.dateEnd.daysOff; //天数
          this.ruleForm.between = this.dateEnd.realtive; //关系
          this.ruleForm.relieve = this.dateEnd.disease;
          this.ruleForm.reason = this.dateEnd.reason;
          this.ruleForm.bodypart = this.dateEnd.temperature;
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
    //删除
    DeleteUser(row) {
      this.term = row.id;
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`api/blade-food/studentleave/remove?ids=${this.term}`, {})
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
    //获取班级
    getToolkit() {
      this.$axios.get(`api/blade-food/class/tree`, {}).then(res => {
        this.bufs = res.data.data;
        // console.log(this.bufs);
        let fwork = [];
        this.bufs.forEach(item => {
          //   console.log(item);
          item.children.forEach((item1, index1) => {
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
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 动态给远程下拉框设置样式
.popperClassName {
  display: none !important;
  position: static !important;
}
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
