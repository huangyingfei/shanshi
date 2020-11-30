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
         <template slot="goverAreasForm">
        <el-row :span="24">
          <el-col :span="24">
             <avue-input-tree leaf-only multiple v-model="goverAreasForm" :props="props2" placeholder="请选择管辖范围" type="tree" :dic="goverAreasDic"></avue-input-tree>
            <!-- <el-tree :data="regionGrantList"
                   show-checkbox
                   node-key="id"
                   ref="treeRegion"
                   :default-checked-keys="regionTreeObj"
                   :props="props">
            </el-tree> -->
          </el-col>
        </el-row>
      </template>
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
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"

          plain
          @click="handleDelete"
          >删 除
        </el-button>
        <!--v-if="permission.role_delete"-->
      </template>
      <template slot-scope="scope" slot="menu">
            <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.status==0"
          @click.stop="handleStop(scope.row, scope.index)"
          >停用
        </el-button>
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
  add,
  remove,
  grantTree,
  tenantDetail,
  tenantEnable
} from "@/api/system/gover";

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
    return {
      form: {},
      region: [], //省市区
      regionDetail: "", //详细地址
      box: false,
      goverAreasDic:[],
      goverAreasForm:[],
      props1: {
        label: "name",
        value: "code",
      },
      props: {
        label: "title",
        value: "key",
      },
       props2: {
        label: "name",
        value: "id",
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
        menuAlign: "center",
        tip: false,
        simplePage: true,
        searchShow: true,
        searchMenuSpan: 6,
        tree: true,
        border: true,
        index: true,
        selection: true,
        viewBtn: true,
        menuWidth: 300,
        dialogWidth: 900,
        dialogClickModal: false,
        column: [
          {
            label: "单位ID",
            prop: "tenantId",
            display: false,
          },
          {
            label: "单位名称",
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
            label: "单位地址",
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
                label: "职位",
                prop: "linkmanJob",
                display: false,
             },
          {
            label: "状态",
            prop: "status",
            search: true,
            type: "select",
            display: false,
            dicData: [
              //1-学校 2-医院 3-餐饮 4-其他
              {
                label: "启用",
                value: 0,
              },
              {
                label: "停用",
                value: 1,
              },
            ],
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
                    message: "请输入用户账号",
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
                label: "单位名称",
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
                label: "政府属性",
                prop: "accountType",
                type: "select",
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
                rules: [
                  {
                    required: true,
                    message: "请输入政府属性",
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
                label: "单位地址",
                prop: "tenantAddress",
                formslot: true,
              },
              {
                label: "机构地址",
                prop: "region",
                display: false,
              },
              {
                label: "备注",
                prop: "remark",
                type:"textarea"
              },
              {
                label: "机构logo",
                prop: "logoUrl",
                type: "upload",
                listType: "picture-img",
                action: '/api/blade-resource/oss/endpoint/put-file',
                tip: '只能上传jpg/png的图片，且不超过500kb',
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
                propsHttp: {
                  res: "data",
                  url: "link",
                },
              },
            ],
          },
          {
            label: "管辖范围",
            prop: "setInfo",
            icon: "el-icon-s-order",
            column: [
              {
                label: "管辖范围",
                prop: "goverAreas",
                formslot: true,
                span:24
              },

            ],
          },

          {
            label: "系统设置",
            prop: "systemInfo",
            icon: "el-icon-s-order",
            column: [

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
       grantTree()
          .then(res => {
            console.log("res",res)
            this.goverAreasDic = res.data.data;
        })
    },
    //新增
    rowSave(row, done, loading) {
      //  console.log(row)
      const goverAreas=[];
      for(var i=0;i<this.goverAreasForm.length;i++){
          goverAreas.push({areaId:this.goverAreasForm[i]})
      }
      var param = {
        account: row.account,
        accountType: row.accountType,
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
        webTitle: row.webTitle,
        webLogo: row.webLogo,
        tenantType: 3,
        goverAreas:goverAreas,
        parentId:0,
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
        const goverAreas=[];
      for(var i=0;i<this.goverAreasForm.length;i++){
          goverAreas.push({areaId:this.goverAreasForm[i]})
      }
      var param = {
        id:row.id,
        tenantId:this.$refs.crud.value.tenantId,
        account: row.account,
        accountType: row.accountType,
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
        webId:row.webId,
        webTitle: row.webTitle,
        webLogo: row.webLogo,
        goverAreas:goverAreas,
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
          tenantDetail(this.form.id).then(res=>{
            let data=res.data.data;
            this.region = [data.proviceCode,data.cityCode,data.areaCode]; //省市区
            this.regionDetail = data.tenantAddress; //详细地址
            this.form = data;
            for(var i=0;i<data.goverAreas.length;i++){
                this.goverAreasForm.push(data.goverAreas[i].areaId)
            }

          })
            // // // debugger
            if(type=="edit"){
               this.findObject(this.option.group, "account").readonly=true;
            }
      }
      done();
    },
    clear() {
      this.region = []; //省市区
      this.regionDetail = ""; //详细地址
      this.goverAreasForm=[];
      this.findObject(this.option.group, "account").readonly=false;
    },
     beforeClose(done) {
       // debugger
        this.clear();
        this.$refs.crud.tableForm = {};
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
    onLoad(page, params = {}) {
      this.loading = true;
      this.query["tenantType"] = 3;
      console.log(this.query);
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        debugger
        this.data = res.data.data;
        this.loading = false;
        this.selectionClear();
      });
    },
    lazyLoad(node, resolve) {
      //  let baseUrl = 'https://cli.avuejs.com/api/area'
      let stop_level = 2;
      let level = node.level;
      // console.log(level);
      let data = node.data || {};
      let code = data.code;
      let list = [];
      // console.log("node", node);
      // console.log("resolve", resolve);
      // console.log("form1", this.form1);
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




