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
        <el-col :span="6"
          ><div>
            <span style="margin-right: 10px;">班级:</span>
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
            <el-button
              style="margin-left: 20px"
              icon="el-icon-delete"
              size="medium"
              @click="emptyset"
              >删除</el-button
            >
            <el-button
              style="margin-left: 20px"
              type="primary"
              size="medium"
              @click="emptyset"
              >导入</el-button
            >
            <el-button
              style="margin-left: 20px"
              type="primary"
              size="medium"
              @click="emptyset"
              >导出</el-button
            >
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="24"
          ><div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
              >
              </el-table-column>

              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="date" label="班级"> </el-table-column>
              <el-table-column prop="date" label="请假开始日期">
              </el-table-column>
              <el-table-column prop="date" label="请假结束日期">
              </el-table-column>
              <el-table-column prop="date" label="请假类型"> </el-table-column>
              <el-table-column prop="date" label="请假天数"> </el-table-column>
              <el-table-column prop="date" label="请假原因"> </el-table-column>
              <el-table-column prop="date" label="申请日期"> </el-table-column>
              <el-table-column prop="date" label="创建人"> </el-table-column>
              <el-table-column prop="date" label="创建日期"> </el-table-column>
              <el-table-column prop="date" label="来源"> </el-table-column>
              <el-table-column prop="date" label="状态"> </el-table-column>
              <el-table-column label="操作" align="center">
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
          </div></el-col
        >
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
          <el-form-item label="学生姓名" prop="name" style="width: 360px">
            <!-- <el-input style="width: 250px" v-model="ruleForm.name"></el-input> -->
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="班级" prop="stringClass">
            <el-cascader
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

          <el-form-item label="请假申请日期">
            <el-date-picker
              style="width: 250px"
              v-model="ruleForm.formula"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="请假开始日期"
            prop="starting"
            style="width: 360px"
          >
            <el-date-picker
              @change="started"
              style="width: 150px"
              v-model="ruleForm.starting"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-select
              :disabled="this.ctest"
              style="width: 100px"
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
            style="width: 360px"
          >
            <el-date-picker
              style="width: 150px"
              v-model="ruleForm.software"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-select
              style="width: 100px"
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
          <el-form-item label="请假天数" prop="weekday">
            <el-input
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
          <el-form-item label="病假症状">
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
          <el-form-item label="体温" prop="weekday">
            <el-input
              style="width: 250px"
              v-model="ruleForm.bodypart"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              style="width: 250px"
              type="textarea"
              placeholder="请输入内容"
              v-model="newnotes"
              maxlength="50"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="创建人" style="width: 360px">
            <span>李老师</span>
          </el-form-item>
          <el-form-item label="创建时间" style="width: 360px">
            <span>2020-12-22</span>
          </el-form-item>
          <el-form-item label="附件上传" style="width: 360px">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="ratycancel('ruleForm')">取 消</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        <el-button @click="cameras('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
      gmfmcItems: [], // 名称
      formsearch: {
        name: "",
        getDate: "",
        position: ""
      },
      ctest: true,
      agree:"",//名字ID
      ruleForm: {
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
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        stringClass: [
          { required: true, message: "请选择班级", trigger: "blur" }
        ],
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

        reason: [
          { required: true, message: "请填写请假事由", trigger: "blur" }
        ],
        bodypart: [{ required: true, message: "请填写体温", trigger: "blur" }]
      },
      dateTime: false,
      stringClass: [], //所在年级
      loadClass: [], //所在年级
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
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
      dauphine: "",
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
          value: "1",
          label: "事假"
        },
        {
          value: "2",
          label: "病假"
        }
      ]
    };
  },
  beforeMount() {
    this.getToolkit(); //班级渲染
    // this.getList();
  },
  watch: {},
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
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
        if (queryString != "") {
          let params = `?name=${queryString}`;
          this.$axios
            .get(`api/blade-food/studentleave/stuSearch` + params, {})
            .then(res => {
              //   console.log(res);
              this.students = res.data.data;

              // console.log(this.students);
                this.restaurants=[];
              this.students.forEach((item, index) => {
                console.log(item);
                this.restaurants.push({
                  id: item.id,
                  value: item.stuStr
                });
                console.log(this.restaurants);
              });
              cb(restaurants);
            });
        }
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
      this.agree=item.id;
      console.log(this.agree);
    },

    started() {
      //   console.log(12323);
      //   this.engine = "上午";
      //   console.log(this.engine);
      console.log(123);
      if (this.ruleForm.starting != "") {
        this.ctest = false;
      } else {
        this.ctest = true;
      }
    },
    addition() {
      this.titlebar = "添加请假记录";
      this.dateTime = true;
    },
    //保存
    cameras(formName) {
      console.log(this.ruleForm.name);
      this.$refs[formName].validate(valid => {clearInterval
        if (valid) {
          // alert("123123!");
          this.$axios.post(`api/blade-food/studentleave/save`,{
              studentId:this.agree,//姓名ID
              leaveType:this.forgreater,//请假类型
              applyTime:this.formula,//请假申请日期
              startTime:this.starting,//请假开始时间
              startStr:this.engine,//上午下午
              endTime:this.software,//请假结束时间
              endStr:this.dauphine,//上午下午
              daysOff:this.weekday,//请假天数
              realtive:this.between,//关系
              disease:this.relieve,//
          }).then(res=>{
            console.log(res);
          })
        } else {
          this.$message({
            message: "信息未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //取消
    ratycancel(formName) {
      this.dateTime = false;
      this.$refs[formName].resetFields();
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
</style>
