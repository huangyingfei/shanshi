<template>
  <basic-container  id="addStudent">
    <avue-form  :option="option" v-model="form" @submit="submit" @error="error">
      <template slot="menuForm">
        <el-button icon="el-icon-back"
                   @click="handleBack()">返 回</el-button>
      </template>
    </avue-form>
  </basic-container>
</template>

<script>
import {
  nation,
  location,
  cardType,
  nationality,
  realtive,
  bloodType,
  education,
  disabledLevel,
  helath,
  overseas,
  childRelation,
} from "@/api/tool/data";
import { formateDate } from "@/api/tool/date";

import {
  save,
  detail,
  getById,
  updateStu,
  getChildNo,
} from "@/api/system/student";
export default {
  computed: {
    title() {
      return this.type === 0 ? "编 辑" : "保 存";
    },
  },
  data() {
    return {
      form: {
        title: "父亲档案信息",
        title1: "母亲档案信息",
        title2: "第一监护人信息",
        title3: "第二监护人信息",
        title4: "幼儿其他信息",
      },
      option: {
        detail: false,
        column: [
          {
            label: "姓名",
            prop: "name",
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur",
              },
            ],
            minlength:0,
            maxlength:10,
            span: 8,
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            dicData: [
              {
                label: "男",
                value: 1,
              },
              {
                label: "女",
                value: 2,
              },
            ],
            rules: [
              {
                required: true,
                message: "请输入性别",
                trigger: "blur",
              },
            ],
            span: 8,
          },
          {
            label: "出生日期",
            prop: "birthDate",
            type: "date",
            span: 8,
            rules: [
              {
                required: true,
                message: "请输入出生日期",
                trigger: "blur",
              },
            ],
            change: (v) => {
              if (v.value && typeof v.value == "string") {
                let s = v.value.replace(/-/g, "/");
                var date = new Date(s);
                this.$set(
                  this.form,
                  "age",

                  ((new Date().getTime() - date.getTime()) / 31536000000).toFixed(2)

                );
              }
              if (v.value && v.value != "" && typeof v.value != "string") {
                this.$set(
                  this.form,
                  "age",

                  ((new Date().getTime() - v.value.getTime()) / 31536000000).toFixed(2)
                );
              }
            },
          },
          {
            label: "年龄",
            prop: "age",
            span: 8,
            disabled: true,
          },
          {
            label: "民族",
            prop: "nation",
            type: "select",
            dicData: nation,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "户口所在地",
            prop: "location",
            type: "select",
            dicData: location,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "班级",
            prop: "classId",
            type: "tree",
            dicUrl: "/api/blade-food/class/tree",
            rules: [
              {
                required: true,
                message: "请选择班级",
                trigger: "blur",
              },
            ],
            change: (row) => {
              if (row.value && row.value != "") {
                  this.getById(row);
              }
            },
            props: {
              children: "children",
              label: "label",
              value: "id",
            },
            span: 8,
          },
          {
            label: "学号",
            prop: "childNo",
            type:"number",
            rules: [
              {
                required: true,
                trigger: "blur",
                validator: this.validateChildNo,
              },
            ],
            span: 8,
          },
          {
            label: "档案号",
            prop: "fileNumber",
            span: 8,
            minlength:0,
            maxlength:16
          },

          {
            label: "入园日期",
            prop: "admissionDate",
            type: "date",
            span: 8,
          },
          {
            label: "学级",
            prop: "educationalCircles",
            type: "year",
            rules: [
              {
                required: true,
                message: "请输入学级",
                trigger: "blur",
              },
            ],
            disabled: true,
            span: 8,
          },
          {
            label: "学段",
            prop: "classSection",
            disabled: true,
            span: 8,
          },

          {
            label: "国籍/地区",
            prop: "nationality",
            type: "select",
            span: 8,
            dicData: nationality,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "所在省",
            prop: "province",
            type: "select",
            dicUrl: "/api/blade-system/region/lazy-list",
            props: {
              value: "code",
              label: "name",
            },
            span: 8,
          },
          {
            label: "现住址",
            prop: "address",
            span: 8,
            minlength:0,
            maxlength:255
          },
          {
            label: "户口类型",
            prop: "accountType",
            type: "select",
            dicData: [
              {
                label: "农村户口",
                value: 1,
              },
              {
                label: "城市户口",
                value: 2,
              },
            ],
            props: {
              label: 'label',
              value: 'label'
            },
            span: 8,
          },
          {
            label: "证件类型",
            prop: "cardType",
            type: "select",
            dicData: cardType,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "证件号",
            prop: "cardNo",
            span: 8,
            minlength:0,
            maxlength:18
          },

          {
            label: "户口地址",
            prop: "accountAddress",
            span: 16,
            minlength:0,
            maxlength:255
          },
          {
            label: "过敏",
            prop: "isAllergy",
            type: "radio",
            dicData: [
              { label: "无", value: 0 },
              { label: "有", value: 1 },
            ],
            span: 8,
          },
          {
            label: "疾病史",
            prop: "diseaseHistory",
            span: 16,
            minlength:0,
            maxlength:255
          },
          {
            label: "接种所在省",
            prop: "vaccinationProvince",
            dicUrl: "/api/blade-system/region/lazy-list",
            type: "select",
            props: {
              value: "code",
              label: "name",
            },
            span: 8,
          },
          {
            label: "家庭电话",
            prop: "mobile",
            span: 8,
            minlength:0,
            maxlength:16
          },

          {
            label: "联系电话",
            prop: "tel",
            span: 8,
            minlength:0,
            maxlength:16
          },

          {
            label: "血型",
            prop: "bloodType",
            span: 8,
            type: "select",
            dicData: bloodType,
          },
          {
            prop: "realtive",
            dicData: realtive,
            span: 9,
            type: "radio",
          },
          ///
          {
            label: "离校或毕业前所在班级",
            prop: "leaveClassName",
            span: 8,
          },
          {
            label: "离校或毕业日期",
            prop: "leaveDate",
            type: "date",
            span: 8,
          },
          {
            label: "状态",
            prop: "isDelete",
            span: 8,
            type: "select",
            dicData: [
              {
                label: "在校",
                value: 0,
              },
              {
                label: "离园",
                value: 2,
              },
              {
                label: "毕业",
                value: 3,
              },
            ],
          },
          {
            label: "离校原因",
            prop: "reason",
            span: 8,
            minlength:0,
            maxlength:255
          },

          {
            label: "",
            labelWidth: 15,
            type: "title",
            prop: "title",
            span: 24,
          },
          {
            label: "姓名",
            prop: "fatherName",
            span: 8,
            minlength:0,
            maxlength:10
          },

          {
            label: "手机号",
            prop: "fatherTel",
            span: 8,
            minlength:0,
            maxlength:11
          },
          {
            label: "民族",
            prop: "fatherNation",
            type: "select",
            dicData: nation,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "国籍",
            prop: "fatherNationlity",
            type: "select",
            span: 8,
            dicData: nationality,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证类型",
            prop: "fatherCardType",
            type: "select",
            span: 8,
            dicData: cardType,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证号码",
            prop: "fatherCardNo",
            span: 8,
            minlength:0,
            maxlength:18
          },
          {
            label: "户口所在地",
            prop: "fatherLocation",
            type: "select",
            dicData: location,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "户口类型",
            prop: "fatherAccountType",
            type: "select",
            span: 8,
            dicData: [
              {
                label: "农村户口",
                value: 1,
              },
              {
                label: "城市户口",
                value: 2,
              },
            ],
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "工作单位",
            prop: "fatherWorkunit",
            span: 8,
            minlength:0,
            maxlength:255
          },
          {
            label: "学历",
            prop: "fatherEducation",
            type: "select",
            dicData: education,
            span: 8,
          },
          {
            label: "",
            labelWidth: 15,
            type: "title",
            prop: "title1",
            span: 24,
          },
          {
            label: "姓名",
            prop: "momName",
            span: 8,
            minlength:0,
            maxlength:10
          },

          {
            label: "手机号",
            prop: "momTel",
            span: 8,
            minlength:0,
            maxlength:11
          },
          {
            label: "民族",
            prop: "momNation",
            type: "select",
            dicData: nation,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "国籍",
            prop: "momNationlity",
            type: "select",
            span: 8,
            dicData: nationality,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证类型",
            prop: "momCardType",
            type: "select",
            span: 8,
            dicData: cardType,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证号码",
            prop: "momCardNo",
            span: 8,
            minlength:0,
            maxlength:18
          },
          {
            label: "户口所在地",
            prop: "momLocation",
            type: "select",
            dicData: location,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "户口类型",
            prop: "momAccountType",
            type: "select",
            span: 8,
            dicData: [
              {
                label: "农村户口",
                value: 1,
              },
              {
                label: "城市户口",
                value: 2,
              },
            ],
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "工作单位",
            prop: "momWorkunit",
            span: 8,
            minlength:0,
            maxlength:255
          },
          {
            label: "学历",
            prop: "momEducation",
            type: "select",
            dicData: education,
            span: 8,
          },
          {
            label: "",
            labelWidth: 15,
            type: "title",
            prop: "title2",
            span: 24,
          },
          {
            label: "姓名",
            prop: "oneName",
            span: 8,
            minlength:0,
            maxlength:10
          },
          {
            label: "与孩子关系",
            prop: "oneChildRelation",
            span: 8,
            type: "select",
            dicData: childRelation,
          },
          {
            label: "性别",
            prop: "oneSex",
            span: 8,
            type: "select",
            dicData: [
              {
                label: "男",
                value: 1,
              },
              {
                label: "女",
                value: 2,
              },
            ],
          },
          {
            label: "国籍/地区",
            prop: "oneNationlity",
            type: "select",
            span: 8,

            dicData: nationality,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证类型",
            prop: "oneCardType",
            type: "select",
            span: 8,
            dicData: cardType,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证号码",
            prop: "oneCardNo",
            span: 8,
            minlength:0,
            maxlength:18
          },
          {
            label: "民族",
            prop: "oneNation",
            type: "select",
            dicData: nation,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "出生日期",
            prop: "oneBirthDate",
            type: "date",
            span: 8,

          },
          {
            label: "联系地址",
            prop: "oneAddress",
            span: 8,
            minlength:0,
            maxlength:255
          },
          {
            label: "学历",
            prop: "oneEducation",
            type: "select",
            dicData: education,
            span: 8,
          },
          {
            label: "工作单位",
            prop: "oneWorkunit",
            span: 8,
            minlength:0,
            maxlength:255
          },
          {
            label: "职务",
            prop: "oneJob",
            span: 8,
            minlength:0,
            maxlength:16
          },

          {
            label: "联系电话",
            prop: "oneMobile",
            span: 8,
            minlength:0,
            maxlength:16
          },
          {
            label: "手机号",
            prop: "oneTel",
            span: 8,
            minlength:0,
            maxlength:11
          },
          {
            label: "电子信箱",
            prop: "oneEmail",
            span: 8,
            minlength:0,
            maxlength:35

          },
          {
            label: "法定监护人",
            prop: "oneIsLegal",

            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 },
            ],
            span: 8,
          },
          {
            label: "",
            labelWidth: 15,
            type: "title",
            prop: "title3",
            span: 24,
          },
          {
            label: "姓名",
            prop: "twoName",
            span: 8,
            minlength:0,
            maxlength:10
          },
          {
            label: "与孩子关系",
            prop: "twoChildRelation",
            span: 8,
            type: "select",
            dicData: childRelation,
          },
          {
            label: "性别",
            prop: "twoSex",
            span: 8,
            type: "select",
            dicData: [
              {
                label: "男",
                value: 1,
              },
              {
                label: "女",
                value: 2,
              },
            ],
          },
          {
            label: "国籍/地区",
            prop: "twoNationlity",
            type: "select",
            span: 8,
            dicData: nationality,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证类型",
            prop: "twoCardType",
            type: "select",
            span: 8,
            dicData: cardType,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "身份证号码",
            prop: "twoCardNo",
            span: 8,
            minlength:0,
            maxlength:18
          },
          {
            label: "民族",
            prop: "twoNation",
            type: "select",
            dicData: nation,
            span: 8,
            props: {
              label: 'label',
              value: 'label'
            },
          },
          {
            label: "出生日期",
            prop: "twoBirthDate",
            type: "date",
            span: 8,
          },
          {
            label: "联系地址",
            prop: "twoAddress",
            span: 8,
            minlength:0,
            maxlength:255
          },
          {
            label: "学历",
            prop: "twoEducation",
            type: "select",
            dicData: education,
            span: 8,
          },
          {
            label: "工作单位",
            prop: "twoWorkunit",
            span: 8,
            minlength:0,
            maxlength:255
          },
          {
            label: "职务",
            prop: "twoJob",
            span: 8,
            minlength:0,
            maxlength:16
          },

          {
            label: "联系电话",
            prop: "twoMobile",
            span: 8,
            minlength:0,
            maxlength:16
          },
          {
            label: "手机号",
            prop: "twoTel",
            span: 8,
            minlength:0,
            maxlength:11
          },
          {
            label: "电子信箱",
            prop: "twoEmail",
            span: 8,
            minlength:0,
            maxlength:35
          },
          {
            label: "法定监护人",
            prop: "twoIsLegal",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 },
            ],
            span: 8,
          },
          {
            label: "",
            labelWidth: 15,
            type: "title",
            prop: "title4",
            span: 24,
          },
          {
            label: "户籍管理",
            prop: "domicleControl",
            span: 8,
            minlength:0,
            maxlength:16
          },
          {
            label: "出生地",
            prop: "birthPlace",
            span: 8,
            minlength:0,
            maxlength:16
          },
          {
            label: "籍贯",
            prop: "nativePlace",
            span: 8,
            minlength:0,
            maxlength:16
          },
          {
            label: "港澳台侨胞",
            prop: "overseas",
            type: "select",
            dicData: overseas,
            span: 8,
          },
          {
            label: "保健管理本",
            prop: "helathBook",
            type: "select",
            dicData: [
              {
                label: "有",
                value: 1,
              },
              {
                label: "无",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "健康状况",
            prop: "helath",
            dicData: helath,
            type: "select",
            span: 8,
          },
          {
            label: "残疾儿童",
            prop: "isDisabled",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "残疾类别",
            prop: "disabledLevel",
            dicData: disabledLevel,
            type: "select",
            span: 8,
          },
          {
            label: "独生子女",
            prop: "onlyChild",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "孤儿",
            prop: "isAlone",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "低保家庭",
            prop: "lowIncome",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "接受资助",
            prop: "support",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "留守儿童",
            prop: "staryHome",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "随迁子女",
            prop: "migrantChild",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "寄宿生",
            prop: "resident",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "其他联系人",
            prop: "otherPeople",
            span: 8,
            minlength:0,
            maxlength:16
          },
          {
            label: "其他人电话",
            prop: "otherMobile",
            span: 8,
            minlength:0,
            maxlength:16
          },
          {
            label: "寄宿生",
            prop: "studyMode",
            type: "select",
            dicData: [
              {
                label: "住校",
                value: 1,
              },
              {
                label: "走读",
                value: 0,
              },
            ],
            span: 8,
          },
          {
            label: "备注",
            prop: "remark",
            span: 16,
            minlength:0,
            maxlength:255
          },
        ],
      },
    };
  },
  methods: {
    handleBack(){
      this.$router.push({ path: "/organ/recipeManager/student" });
      this.$router.$avueRouter.closeTag();
    },
    getById(row){
      getById(row.value + "").then((res) => {
        this.$set(this.form, "classSection", res.data.data.pparentName);
        if (!this.$route.query.id) {
          this.$set(this.form, "educationalCircles", res.data.data.startYear);
        }
      });
    },
    validateChildNo(rule, value, callback) {
      if (value === ""||value=="undefined"||!value) {
        callback(new Error("请输入学号"));
        this.$set(this.form,"childNo",undefined)
      } else if (this.form.classId === "") {
        callback(new Error("请先选择班级"));
        this.$set(this.form,"childNo",undefined)
      } else {

        if(value<=999999999999999&&value>0){
          let student = {};
          student["classId"] = this.form.classId;
          student["childNo"] = value;
          student["id"] = this.form.id;
          let flag = true;
          getChildNo(student).then((res) => {
            if (res.data.data) {
              callback();
            } else {
              flag = false;
              this.$set(this.form,"childNo",undefined)
              callback(new Error("学号重复"));
            }
          });
        }else{
          this.$set(this.form,"childNo",undefined)
          callback(new Error("学号需要在15位数以内且是正数"));
        }
      }
    },
    submit(form, done) {
      console.log(this.form);
      if (typeof this.form.educationalCircles != "string") {
        this.form.educationalCircles = this.form.educationalCircles.getFullYear();
      }
      if (this.$route.query.id) {
        updateStu(this.form).then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.$router.push({ path: "/organ/recipeManager/student" });
          }
        });
      } else {
        save(this.form).then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "新增成功!",
            });
            this.$router.push({ path: "/organ/recipeManager/student" });
          }
        });
      }
    },
    fun() {
      // ;

      this.$set(
        this.findObject(this.option.column, "leaveClassName"),
        "display",
        false
      );
      this.$set(
        this.findObject(this.option.column, "reason"),
        "display",
        false
      );
      this.$set(
        this.findObject(this.option.column, "leaveDate"),
        "display",
        false
      );
    },
  },
  mounted() {
    if (this.$route.query.id) {
      if (this.$route.query.detailFlag) {
        this.option.detail = true;
        if (this.$route.query.addView) {
          this.fun();
        }
      } else {
        this.fun();
        this.$set(
          this.findObject(this.option.column, "isDelete"),
          "display",
          false
        );
      }
      detail(this.$route.query.id).then((res) => {
        this.form = res.data.data;
        if (this.form.province) {
          this.$set(this.form, "province", this.form.province + "");
        }
        this.$set(
          this.form,
          "educationalCircles",
          this.form.educationalCircles + ""
        );
        console.log(this.form);
      });
    } else {
      this.fun();
      this.$set(
        this.findObject(this.option.column, "isDelete"),
        "display",
        false
      );
    }
    if(this.$route.query.selectClassId){
      this.$set(this.form,"classId",this.$route.query.selectClassId+"")
    }
  },
};
</script>

<style>
  #addStudent .avue-form__menu{
    position: fixed !important;
    bottom: 0;
    right:0;
    background-color: #FFFFFF;
    margin-bottom: 0px;
    margin-right: 17px;
    width: calc(100% - 270px)
  }
</style>
