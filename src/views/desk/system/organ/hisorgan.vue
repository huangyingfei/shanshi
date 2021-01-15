<template>
  <basic-container>

    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      ref="crud"
      v-model="form"
      :permission="permissionList"
      :before-open="beforeOpen"
      :before-close="beforeClose"
      @row-del="rowDel"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
    >
      <template slot="tenantAddressForm">
        <el-row :span="24">
          <el-col :span="24">
            <avue-cascader
              lazy
              :lazy-load="lazyLoad"
              :props="props1"
              v-model="region"
              style="width: 324.8px"
            ></avue-cascader>

            <avue-input
              v-model="regionDetail"
              placeholder="详细地址"
              type="textarea"
              span="12"
            ></avue-input>
          </el-col>
        </el-row>
      </template>

      <template slot-scope="scope" slot="menu">

         <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.status==1"
          @click.stop="handleStart(scope.row, scope.index)"
          >启用
        </el-button>
      </template>


    </avue-crud>

  </basic-container>
</template>

<script>
import {
  getList,
  lazyList,
  getNutritionList,
  getPowerSettingList,
  add,
  remove,
  tenantEnable,
  tenantDetail,
  getPage
} from "@/api/system/organ";

import { formateDate,getInervalHour,getDate} from "@/api/tool/date";
import { mapGetters } from "vuex";

export default {
  data() {
       const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateStartTime=(rule,value,callback)=>{
         if (value === '') {
          callback(new Error('请输入开始时间'));
        }else  if (this.form.expireTime === '') {
          callback();
        }
        else {
          this.form.days=getInervalHour(this.form.startUseTime,this.form.expireTime)
          callback();
        }
      }
      const validateEndTime=(rule,value,callback)=>{
         if (value === '') {
          callback(new Error('请输入开始时间'));
        } else  if (this.form.startUseTime === '') {
          callback();
        }
         else {
          this.form.days=getInervalHour(this.form.startUseTime,this.form.expireTime)
          callback();
        }
      }


    return {
      form: {},
      region: [], //省市区
      regionDetail: "", //详细地址
      box: false,
      props1: {
        label: "name",
        value: "code",
      },
      props: {
        label: "title",
        value: "key",
      },
      selectionList: [],
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      option: {
        height: "auto",
        align: "center",
        calcHeight: 30,
        menuAlign: "center",
        tip: false,
        simplePage: true,
        searchShow: true,
        searchMenuSpan: 6,
        tree: true,
        columnBtn:false,
        refreshBtn:false,
        border: true,
        index: true,
        indexLabel:'序号',
        selection: false,
        viewBtn: true,
        menuWidth: 200,
        addBtn:false,
        delBtn:false,
        editBtn:false,
        dialogHeight:400,
        dialogWidth:900,
        dialogClickModal: false,
        column: [
          {
            label: "机构ID",
            prop: "tenantId",
            display: false,
          },
          {
            label: "机构名称",
            prop: "tenantName",
            search: true,
            display: false,
          },

          {
            label: "用户账号",
            prop: "account",
            search: true,
            display: false,
          },
          {
            label: "账号类型",
            prop: "accountType",
            search: true,
            type: "select",
            display: false,
            dicData: [
              //1-学校 2-医院 3-餐饮 4-其他
              {
                label: "学校",
                value: 1,
              },
              {
                label: "医院",
                value: 2,
              },
              {
                label: "餐饮",
                value: 3,
              },
              {
                label: "其他",
                value: 4,
              },
            ],
          },
          {
            label: "机构地址",
            prop: "tenantAddress",
            search: true,
            display: false,
          },

          {
            label: "联系人",
            prop: "linkman",
            search: true,
            display: false,
          },
          {
            label: "联系电话",
            prop: "contactNumber",
            search: true,
            display: false,
          },
          {
            label: "营养标准",
            prop: "nutrientName",
            display: false,
          },
          {
            label: "开始使用日期",
            prop: "startTimeStr",
            type: "date",
            display: false,
            width:100
          },
          {
            label: "结束使用日期",
            prop: "endTimeStr",
            type: "date",
            display: false,
            width:100
          },
          {
            label: "状态",
            prop: "status",
            search: true,
            type: "select",
            display: false,
            dicData: [
              // {
              //   label: "已停用",
              //   value: 1,
              // },
               {
                label: "已删除",
                value: 2,
              },
            ],
          },
          {
            label: "距离到期天数/预期天数",
            prop: "endays",
            display: false,
          },
        ],
        group: [
          {
            label: "基本信息",
            prop: "baseInfo",
            icon: "el-icon-user-solid",
            column: [
              {
                label: "用户账号",
                prop: "account",
                rules: [
                  {
                    required: true,
                    message: "请输入机构名称",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "登录密码",
                prop: "password",
                type: 'password',
                editDisplay: false,
                viewDisplay: false,
                rules: [{required: true, validator: validatePass, trigger: 'blur'}]
              },
              {
                label: "确认密码",
                prop: "passwordAgain",
                type: 'password',
                editDisplay: false,
                viewDisplay: false,
                rules: [{required: true, validator: validatePass2, trigger: 'blur'}]
              },
              {
                label: "账号类型",
                prop: "accountSchoolType",
                type: "cascader",
                dicData: [
                  //1-学校 2-医院 3-餐饮 4-其他
                  {
                    label: "学校",
                    value: 1,
                    children: [
                      {
                        label: "幼儿园",
                        value: 1,
                      },
                      {
                        label: "小学",
                        value: 2,
                      },
                      {
                        label: "初中",
                        value: 3,
                      },
                      {
                        label: "高中",
                        value: 4,
                      },
                      {
                        label: "大学",
                        value: 4,
                      },
                      {
                        label: "其他",
                        value: 4,
                      },
                    ],
                  },
                  {
                    label: "医院",
                    value: 2,
                  },
                  {
                    label: "餐饮",
                    value: 3,
                  },
                  {
                    label: "其他",
                    value: 4,
                  },
                ],
              },
              {
                label: "机构名称",
                prop: "tenantName",
                rules: [
                  {
                    required: true,
                    message: "请输入机构名称",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "上级机构",
                prop: "parentId",
                dicData: [],
                type: "tree",
                props: {
                  label: "tenantName",
                  value:"id"
                },
                rules: [
                  {
                    required: false,
                    message: "请选择上级机构",
                    trigger: "click",
                  },
                ],
              },
              {
                label: "机构地址",
                prop: "tenantAddress",
                formslot: true,
                span: 24,
              },
              {
                label: "机构地址",
                prop: "region",
                display: false,
              },
              {
                label: "联系人",
                prop: "linkman",
                rules: [
                  {
                    required: true,
                    message: "请输入联系人姓名",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "联系电话",
                prop: "contactNumber",
                rules: [
                  {
                    required: true,
                    message: "请输入联系人电话",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "职位",
                prop: "linkmanJob",
                rules: [
                  {
                    required: true,
                    message: "请输入联系人职位",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "备注",
                prop: "remark",
              },
              {
                label: "机构logo",
                prop: "logoUrl",
                type: "upload",
                listType: "picture-img",
                action: '/api/blade-resource/oss/endpoint/put-file',
                tip: '只能上传jpg/png的图片，且不超过500kb',
                //  action: '/api/blade-resource/oss/endpoint/put-file',
                propsHttp: {
                  res: "data",
                  url: "link",
                },
              },
              {
                label: "头像",
                prop: "avatar",
                type: "upload",
                listType: "picture-img",
                action: '/api/blade-resource/oss/endpoint/put-file',
                tip: '只能上传jpg/png的图片，且不超过500kb',
                //  action: '/api/blade-resource/oss/endpoint/put-file',
                propsHttp: {
                  res: "data",
                  url: "link",
                },
              },
            ],
          },
          {
            label: "营养标准设置",
            prop: "setInfo",
            icon: "el-icon-s-order",
            column: [
              {
                label: "营养素建议摄入量",
                prop: "nutrientId",
                 dicData: [],
                type: "tree",
                props: {
                  label: "title",
                },
                rules: [
                  {
                    required: true,
                    message: "请选择营养素建议摄入量",
                    trigger: "click",
                  },
                ],
              },
              {
                label: "能量来源要求比例",
                prop: "powerId",
                 dicData: [],
                type: "tree",
                props: {
                  label: "title",
                },
                rules: [
                  {
                    required: true,
                    message: "请选择能量来源要求比例",
                    trigger: "click",
                  },
                ],

              },
            ],
          },
          // {
          //   label: "营养素设置",
          //   prop: "nutrientInfo",
          //   icon: "el-icon-s-custom",
          //   column: [
          //     {
          //       label: "显示3级营养素",
          //       prop: "nutrientDisplay",
          //       type: "switch",
          //     },
          //   ],
          // },
          {
            label: "系统设置",
            prop: "systemInfo",
            icon: "el-icon-s-order",
            column: [
              {
                label: "开始使用日期",
                prop: "startUseTime",
                type: "date",
                rules: [{required: true, validator: validateStartTime, trigger: 'blur'}]
              },
              {
                label: "结束使用日期",
                prop: "expireTime",
                type: "date",
                rules: [{required: true, validator: validateEndTime, trigger: 'blur'}]
              },
              {
                label: "使用时长",
                prop: "days",
                bind: "props.label",
              },
              {
                label: "网站标题",
                prop: "webTitle",
              },
              {
                label: "首页logo",
                prop: "webLogo",
                type: "upload",
                listType: "picture-img",
                action: '/api/blade-resource/oss/endpoint/put-file',
                tip: '只能上传jpg/png的图片，且不超过500kb',
                //  action: '/api/blade-resource/oss/endpoint/put-file',
                propsHttp: {
                  res: "data",
                  url: "link",
                },
              },
            ],
          },
        ],
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    permissionList() {
      return {
        // addBtn: this.vaildData(this.permission.role_add, false),
        // viewBtn: this.vaildData(this.permission.role_view, false),
        // delBtn: this.vaildData(this.permission.role_delete, false),
        // editBtn: this.vaildData(this.permission.role_edit, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
    idsArray() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids;
    },
  },
  methods: {
    initData() {
      var params={};
      this.query["tenantType"] = 2;

      getPage(
        this.page.currentPage,
        this.page.pageSize,
        Object.assign(params, this.query)).then((res) => {
        const column = this.findObject(this.option.group, "parentId");
        column.dicData = res.data.data;
      });
      getNutritionList().then((res) => {
        const column = this.findObject(this.option.group, "nutrientId");
        let data = res.data.data;
        if (column.dicData.length > 0) {
          column.dicData = [];
        }
        data.forEach((e) => {
          column.dicData.push({
            title: e.name,
            id: e.id,
            value: e.id,
          });
        });
      });
      getPowerSettingList().then((res) => {
        const column = this.findObject(this.option.group, "powerId");
        if (column.dicData.length > 0) {
          column.dicData = [];
        }
        let data = res.data.data;
        data.forEach((e) => {
          column.dicData.push({
            title: e.name,
            id: e.id,
            value: e.id,
          });
        });
      });
    },

    handleStop(row){
       this.$confirm("确定将选择数据停用?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          return tenantEnable(row.id,1);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    handleStart(row){
       this.$confirm("确定将选择数据启用?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          return tenantEnable(row.id,0);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    //新增
    rowSave(row, done, loading) {
      var param = {
        account: row.account,
        accountType: row.accountSchoolType[0],
        password: row.password,
        tenantName: row.tenantName,
         proviceCode:this.region.length==0?null:this.region[0],
        cityCode:this.region.length==0?null:this.region[1],
        areaCode: this.region.length==0?null:this.region[2],
        tenantAddress: this.regionDetail,
        linkman: row.linkman,
        contactNumber: row.contactNumber,
        linkmanJob: row.linkmanJob,
        remark: row.remark,
        logoUrl: row.logoUrl,
        avatar: row.avatar,
        nutrientId: row.nutrientId,
        powerId: row.powerId,
        // nutrientDisplay: row.nutrientDisplay == "" ||row.nutrientDisplay? 1 : 0,
        startUseTime: formateDate(row.startUseTime, "yyyy-MM-dd"),
        expireTime: formateDate(row.expireTime, "yyyy-MM-dd"),
        webTitle: row.webTitle,
        webLogo: row.webLogo,
        schoolType:
          row.accountSchoolType.length > 1 ? row.accountSchoolType[1] : null,
        tenantType: 2,
        parentId: row.parentId==""?0:row.parentId,
      };
      console.log(param)
      add(param).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowUpdate(row, index, done, loading) {
        var param = {
        id:row.id,
        account: row.account,
        accountType: row.accountSchoolType[0],
        password: row.password,
        tenantName: row.tenantName,
       proviceCode:this.region.length==0?null:this.region[0],
        cityCode:this.region.length==0?null:this.region[1],
        areaCode: this.region.length==0?null:this.region[2],
        tenantAddress: this.regionDetail,
        linkman: row.linkman,
        contactNumber: row.contactNumber,
        linkmanJob: row.linkmanJob,
        remark: row.remark,
        logoUrl: row.logoUrl,
        avatar: row.avatar,
        nutrientId: row.nutrientId,
        powerId: row.powerId,
        // nutrientDisplay: row.nutrientDisplay == "" ||row.nutrientDisplay? 1 : 0,
        startUseTime: typeof row.startUseTime=="string"?row.startUseTime: formateDate(row.startUseTime, "yyyy-MM-dd HH:mm:ss"),
        expireTime:typeof row.expireTime=="string"?row.expireTime: formateDate(row.expireTime, "yyyy-MM-dd HH:mm:ss"),
        webId:row.webId,
        webTitle: row.webTitle,
        webLogo: row.webLogo,
        schoolType:
          row.accountSchoolType.length > 1 ? row.accountSchoolType[1] : null,
        parentId: row.parentId==""?0:row.parentId,
      };
      add(param).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );

    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },

    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    beforeOpen(done, type) {
      if (["add", "edit"].includes(type)) {
        this.initData();
      }
      if (["edit", "view"].includes(type)) {
          this.initData();
          // console.log(this.form.id)
          tenantDetail(this.form.id).then(res=>{
            let data=res.data.data;
            this.region = [data.proviceCode,data.cityCode,data.areaCode]; //省市区
            this.regionDetail = data.tenantAddress; //详细地址
            console.log("DATA",data)
            if(data.schoolType==null){
              data["accountSchoolType"]=[data.accountType]
            }else{
              data["accountSchoolType"]=[data.accountType,data.schoolType]
            }
            // data["nutrientDisplay"]=data.nutrientDisplay==1?true:false;
            data["startUseTime"]=getDate(data.startUseTime)
            data["expireTime"]=getDate(data.expireTime)
            this.form = data;
          })
            // debugger
            if(type=="edit"){
               this.findObject(this.option.group, "account").readonly=true;
            }
      }
      done();
    },
    clear() {
      this.region = []; //省市区
      this.regionDetail = ""; //详细地址
      this.findObject(this.option.group, "account").readonly=false;
    },
      beforeClose(done) {
        this.clear();
        this.$refs.crud.tableForm = {};
        this.$refs.crud.value.parentId = "";
        this.$refs.crud.value.addDisabled = false;
        this.$refs.crud.option.group.filter(item => {
          if (item.prop === "parentId") {
            item.value = "";
            item.addDisabled = false;
          }
        });
        done();
      },

    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.$refs.crud.toggleSelection();
        });
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      this.query["tenantType"] = 2;
      getPage(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        this.data = res.data.data;
        this.loading = false;
        this.selectionClear();
      });
    },
    lazyLoad(node, resolve) {
      let stop_level = 2;
      let level = node.level;
      let data = node.data || {};
      let code = data.code;
      let list = [];
      let callback = () => {
        resolve(
          (list || []).map((ele) => {
            return Object.assign(ele, {
              leaf: level >= stop_level,
            });
          })
        );
      };
      if (level == 0) {
        lazyList().then((res) => {
          let data = res.data.data;
          data.splice(0, 1);
          data.forEach((e) => {
            list.push({
              name: e.name,
              code: e.code,
            });
          });
          callback();
        });
      }
      if (level == 1) {
        lazyList(code).then((res) => {
          let data = res.data.data;
          data.forEach((e) => {
            list.push({
              name: e.name,
              code: e.code,
            });
          });
          console.log(list);
          callback();
        });
      } else if (level == 2) {
        lazyList(code).then((res) => {
          let data = res.data.data;
          data.forEach((e) => {
            list.push({
              name: e.name,
              code: e.code,
            });
          });
          console.log(list);
          callback();
        });
      }
    },
  },
};
</script>




