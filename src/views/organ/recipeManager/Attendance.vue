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
            <span style="margin-right: 10px;margin-left: 15px;">提交日期:</span>
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
              <el-table-column prop="date" label="职务"> </el-table-column>
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
          <el-form-item label="姓名" prop="name" style="width: 360px">
            <el-input style="width: 250px" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="position">
            <el-select
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
          <el-form-item label="所在年级/班级" style="width: 360px">
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
          <el-form-item style="width: 360px">
            <span style="font-size: 12px"
              >若为年级组长、保教主任、老师、保育员时需选择 所在年级/班级</span
            >
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
          <el-form-item label="请假开始日期" prop="starting">
            <el-date-picker
              style="width: 250px"
              v-model="ruleForm.starting"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="请假结束日期" prop="software">
            <el-date-picker
              style="width: 250px"
              v-model="ruleForm.software"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="请假结束日期" prop="weekday">
            <el-input
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
              v-model="reason"
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
      titlebar: "",
      formsearch: {
        name: "",
        getDate: "",
        position: ""
      },
      ruleForm: {
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
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      stringClass: [], //所在年级
      loadClass: [], //所在年级
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
      ]
    };
  },
  methods: {
    //添加请假弹框
    addition(index1) {
      console.log(index1);
      this.titlebar = "添加请假记录";
      this.dateTime = true;
    },
    //编辑弹框
    editorTheme() {
      this.titlebar = "编辑请假记录";
      this.dateTime = true;
    },
    //保存
    cameras(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("123123!");
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
</style>
