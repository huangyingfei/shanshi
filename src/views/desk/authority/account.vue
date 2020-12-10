<template>
  <el-row >
    <el-col :span="24">
      <basic-container>
        <avue-crud
          :option="option"
          :search.sync="search"
          :table-loading="loading"
          :data="data"
          ref="crud"
          v-model="form"
          :permission="permissionList"
          @row-del="rowDel"
          @row-update="rowUpdate"
          @row-save="rowSave"
          :before-open="beforeOpen"
          :page.sync="page"
          @search-change="searchChange"
          @search-reset="searchReset"
          @selection-change="selectionChange"
          @current-change="currentChange"
          @size-change="sizeChange"
          @refresh-change="refreshChange"
          @on-load="onLoad"
        >
          <template slot="menuLeft">
            <el-button
              type="danger"
              size="small"
              plain
              icon="el-icon-delete"
              @click="handleDelete"
              >删 除
            </el-button>
            <el-button
              type="info"
              size="small"
              plain
              icon="el-icon-user"
              @click="handleGrant"
              >角色配置
            </el-button>
            <el-button
              size="small"
              plain
              icon="el-icon-refresh"
              @click="handleReset"
              >密码重置
            </el-button>
            <!--<el-button-->
              <!--type="success"-->
              <!--size="small"-->
              <!--plain-->
              <!--v-if="userInfo.role_name.includes('admin')"-->
              <!--icon="el-icon-upload2"-->
              <!--@click="handleImport"-->
              <!--&gt;导入-->
            <!--</el-button>-->
            <!--<el-button-->
              <!--type="warning"-->
              <!--size="small"-->
              <!--plain-->
              <!--v-if="userInfo.role_name.includes('admin')"-->
              <!--icon="el-icon-download"-->
              <!--@click="handleExport"-->
              <!--&gt;导出-->
            <!--</el-button>-->
          </template>

          <template slot-scope="scope" slot="menu">
            <el-button
              type="text"
              icon="el-icon-edit"
              size="small"
              v-if="
                scope.row.roleAlias != 'admin' &&
                scope.row.roleAlias != 'administrator'
              "
              @click.stop="handleUpdate(scope.row, scope.index)"
              >编辑
            </el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              size="small"
              v-if="
                scope.row.roleAlias != 'admin' &&
                scope.row.roleAlias != 'administrator'
              "
              @click.stop="handleDel(scope.row, scope.index)"
              >删除
            </el-button>
          </template>

          <!-- <template slot-scope="{ row }" slot="tenantName">
            <el-tag>{{ row.tenantName }}</el-tag>
          </template> -->
          <template slot-scope="{ row }" slot="roleId">
            <el-tag>{{ row.roleName }}</el-tag>
          </template>
          <!-- <template slot-scope="{ row }" slot="deptName">
            <el-tag>{{ row.deptName }}</el-tag>
          </template> -->
        </avue-crud>
        <el-dialog
          title="用户角色配置"
          append-to-body
          :visible.sync="roleBox"
          width="345px"
        >
          <el-tree
            :data="roleGrantList"
            show-checkbox
            check-strictly
            default-expand-all
            node-key="id"
            ref="treeRole"
            :default-checked-keys="roleTreeObj"
            :props="props"
          >
          </el-tree>

          <span slot="footer" class="dialog-footer">
            <el-button @click="roleBox = false">取 消</el-button>
            <el-button type="primary" @click="submitRole">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="用户数据导入"
          append-to-body
          :visible.sync="excelBox"
          width="555px"
        >
          <avue-form
            :option="excelOption"
            v-model="excelForm"
            :upload-after="uploadAfter"
          >
            <template slot="excelTemplate">
              <el-button type="primary" @click="handleTemplate">
                点击下载<i class="el-icon-download el-icon--right"></i>
              </el-button>
            </template>
          </avue-form>
        </el-dialog>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
import {
  getList,
  getUser,
  remove,
  update,
  add,
  grant,
  resetPassword,checkInfo
} from "@/api/system/user";
import { getRoleTree } from "@/api/system/role";
import { mapGetters } from "vuex";
import { getToken } from "@/util/auth";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      search: {},
      roleBox: false,
      excelBox: false,
      initFlag: true,
      selectionList: [],
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      init: {
        roleTree: [],
        deptTree: [],
      },
      props: {
        label: "title",
        value: "key",
      },
      roleGrantList: [],
      roleTreeObj: [],
      // treeDeptId: '',
      // treeData: [],
      // treeOption: {
      //   nodeKey: 'id',
      //   lazy: true,
      //   treeLoad: function (node, resolve) {
      //     const parentId = (node.level === 0) ? 0 : node.data.id;
      //     getDeptLazyTree(parentId).then(res => {
      //       resolve(res.data.data.map(item => {
      //         return {
      //           ...item,
      //           leaf: !item.hasChildren
      //         }
      //       }))
      //     });
      //   },
      //   addBtn: false,
      //   menu: false,
      //   size: 'small',
      //   props: {
      //     labelText: '标题',
      //     label: 'title',
      //     value: 'value',
      //     children: 'children'
      //   }
      // },
      option: {
        height: "auto",
        calcHeight: 80,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        indexLabel:'序号',
        selection: true,
        viewBtn: true,
        columnBtn:false,
        //dialogType: 'drawer',
        dialogClickModal: false,
        delBtn: false,
        editBtn: false,
        dialogHeight:400,
        dialogWidth:900,

        column: [
          {
            label: "登录账号",
            prop: "account",
            search: true,
            display: false,
            minlength:0,
            maxlength:16
          },
          // {
          //   label: "所属租户",
          //   prop: "tenantName",
          //   slot: true,
          //   display: false
          // },
          {
            label: "用户姓名",
            prop: "realName",
            search: true,
            display: false,
            minlength:0,
            maxlength:10
          },

          {
            label: "用户昵称",
            prop: "name",
            display: false,
            search: true,
            minlength:0,
            maxlength:16
          },
          {
            label: "所属角色",
            prop: "roleId",
            slot: true,
            search: true,
            display: false,
            type: "select",
            dicUrl: "/api/blade-system/role/select",
            props: {
              label: "roleName",
              value: "id",
            },
          },
          {
            label: "手机号码",
            prop: "phone",
            display: false,
            search: true,
            minlength:0,
            maxlength:11
          },
          {
            label: "电子邮箱",
            prop: "email",
            display: false,
            minlength:0,
            maxlength:35
          },
          {
            label: "用户性别",
            prop: "sex",
            display: false,
          },
          {
            label: "部门",
            prop: "deptName",
            display: false,
          },
          {
            label: "岗位",
            prop: "postName",
            display: false,
          },
        ],
        group: [
          {
            label: "基础信息",
            prop: "baseInfo",
            icon: "el-icon-user-solid",
            column: [
              {
                label: "登录账号",
                prop: "account",
                rules: [
                  {
                    required: true,
                    validator: this.validateAccount,
                  },
                ],
                minlength:0,
                maxlength:16
              },
              // {
              //   label: "所属租户",
              //   prop: "tenantId",
              //   type: "tree",
              //   dicUrl: "/api/blade-system/tenant/select",
              //   props: {
              //     label: "tenantName",
              //     value: "tenantId",
              //   },
              //   hide: !website.tenantMode,
              //   addDisplay: website.tenantMode,
              //   editDisplay: website.tenantMode,
              //   viewDisplay: website.tenantMode,
              //   rules: [
              //     {
              //       required: true,
              //       message: "请输入所属租户",
              //       trigger: "click",
              //     },
              //   ],
              // },
              {
                label: "密码",
                prop: "password",
                type: "password",
                hide: true,
                editDisplay: false,
                viewDisplay: false,
                rules: [
                  { required: true, validator: validatePass, trigger: "blur" },
                ],
                minlength:0,
                maxlength:16
              },
              {
                label: "确认密码",
                prop: "password2",
                type: "password",
                hide: true,
                editDisplay: false,
                viewDisplay: false,
                rules: [
                  { required: true, validator: validatePass2, trigger: "blur" },
                ],
                minlength:0,
                maxlength:16
              },
              {
                label: "用户姓名",
                prop: "realName",
                rules: [
                  {
                    required: true,
                    message: "请输入用户姓名",
                    trigger: "blur",
                  },
                  {
                    min: 2,
                    max: 10,
                    message: "姓名长度在2到10个字符",
                  },
                ],
              },
              {
                label: "用户昵称",
                prop: "name",
                hide: true,
                rules: [
                  {
                    required: true,
                    message: "请输入用户昵称",
                    trigger: "blur",
                  },
                ],
                minlength:0,
                maxlength:16
              },

              {
                label: "手机号码",
                prop: "phone",
                overHidden: true,
                rules: [
                  {
                    required: true,
                    validator: this.validatePhone,
                  },
                ],
              },
              {
                label: "电子邮箱",
                prop: "email",
                hide: true,
                overHidden: true,
                minlength:0,
                maxlength:35
              },
              {
                label: "用户性别",
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
                  {
                    label: "未知",
                    value: 3,
                  },
                ],
                hide: true,
              },
              {
                label: "用户生日",
                type: "date",
                prop: "birthday",
                format: "yyyy-MM-dd hh:mm:ss",
                valueFormat: "yyyy-MM-dd hh:mm:ss",
                hide: true,
              },
              {
                label: "部门",
                prop: "deptName",
                hide: true,
                minlength:0,
                maxlength:16
              },
              {
                label: "岗位",
                prop: "postName",
                hide: true,
                minlength:0,
                maxlength:16
              },
              {
                label: "备注",
                prop: "remark",
                hide: true,
                type: "textarea",
                minlength:0,
                maxlength:255
              },
              {
                label: "账号状态",
                prop: "statusName",
                hide: true,
                display: false,
              },
            ],
          },
          {
            label: "角色管理",
            prop: "dutyInfo",
            icon: "el-icon-s-custom",
            column: [
              {
                label: "所属角色",
                prop: "roleId",
                multiple: true,
                type: "tree",
                dicUrl: "/api/blade-system/role/select",
                props: {
                  label: "roleName",
                  value: "id",
                },
                rules: [
                  {
                    required: true,
                    message: "请选择所属角色",
                    trigger: "click",
                  },
                ],
              },
            ],
          },
        ],
      },
      data: [],
      excelForm: {},
      excelOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "模板上传",
            prop: "excelFile",
            type: "upload",
            drag: true,
            loadText: "模板上传中，请稍等",
            span: 24,
            propsHttp: {
              res: "data",
            },
            tip: "请上传 .xls,.xlsx 标准格式文件",
            action: "/api/blade-user/import-user",
          },
          {
            label: "数据覆盖",
            prop: "isCovered",
            type: "switch",
            align: "center",
            width: 80,
            dicData: [
              {
                label: "否",
                value: 0,
              },
              {
                label: "是",
                value: 1,
              },
            ],
            value: 0,
            slot: true,
            rules: [
              {
                required: true,
                message: "请选择是否覆盖",
                trigger: "blur",
              },
            ],
          },
          {
            label: "模板下载",
            prop: "excelTemplate",
            formslot: true,
            span: 24,
          },
        ],
      },
    };
  },
  watch: {
    "excelForm.isCovered"() {
      if (this.excelForm.isCovered !== "") {
        const column = this.findObject(this.excelOption.column, "excelFile");
        column.action = `/api/blade-user/import-user?isCovered=${this.excelForm.isCovered}`;
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    permissionList() {
      return {
        // addBtn: this.vaildData(this.permission.user_add, false),
        // viewBtn: this.vaildData(this.permission.user_view, false),
        // delBtn: this.vaildData(this.permission.user_delete, false),
        // editBtn: this.vaildData(this.permission.user_edit, false)
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  mounted() {},
  methods: {
    validateAccount(rule, value, callback){
      if (value === ""||value=="undefined"||!value) {
        callback(new Error("请输入登录账号"));
      }else {
        let user = {};
        user["account"] = this.form.account;
        user["id"] = this.form.id;
        checkInfo(user).then((res) => {
          if (res.data.msg) {
            callback(new Error(res.data.msg));
          } else {
            callback();
          }
        });
      }
    },
    validatePhone(rule, value, callback){
      if (value === ""||value=="undefined"||!value) {
        callback(new Error("请输入手机号"));
      }else {

        if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
          callback(new Error("手机号格式错误"));
        }else{
          let user = {};
          user["phone"] = this.form.phone;
          user["id"] = this.form.id;
          checkInfo(user).then((res) => {
            if (res.data.msg) {
              callback(new Error(res.data.msg));
            } else {
              callback();
            }
          });
        }

      }
    },
    initData() {
      // getRoleTree(tenantId).then((res) => {
      //   const column = this.findObject(this.option.group, "roleId");
      //   column.dicData = res.data.data;
      // });
      // getRoleTree(tenantId).then((res) => {
      //   const column = this.findObject(this.option.group, "roleId");
      //   if (column.dicData.length > 0) {
      //     column.dicData = [];
      //   }
      //   let data = res.data.data;
      //   data.forEach((e) => {
      //     column.dicData.push({
      //       title: e.title,
      //       id: e.id,
      //       value: e.id,
      //     });
      //   });
      //   console.log(this.option.group);
      // });
    },
    submitRole() {
      const roleList = this.$refs.treeRole.getCheckedKeys().join(",");
      grant(this.ids, roleList).then(() => {
        this.roleBox = false;
        this.$message({
          type: "success",
          message: "操作成功!",
        });
        this.onLoad(this.page);
      });
    },
    rowSave(row, done, loading) {
      console.log(row);
      row.roleId = row.roleId.join(",");
      add(row).then(
        () => {
          this.initFlag = false;
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
    handleDel(row) {
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
          this.$refs.crud.toggleSelection();
        });
    },
    handleUpdate(row, index) {
      console.log(this.option.group)
      this.$refs.crud.rowEdit(row, index);
    },
    rowUpdate(row, index, done, loading) {
      row.roleId = row.roleId.join(",");
      update(row).then(
        () => {
          this.initFlag = false;
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
    handleReset() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择账号密码重置为123456?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return resetPassword(this.ids);
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.$refs.crud.toggleSelection();
        });
    },
    handleGrant() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.roleTreeObj = [];
      if (this.selectionList.length === 1) {
        this.roleTreeObj = this.selectionList[0].roleId.split(",");
      }
      getRoleTree().then((res) => {
        this.roleGrantList = res.data.data;
        this.roleBox = true;
      });
    },
    handleImport() {
      this.excelBox = true;
    },
    uploadAfter(res, done, loading, column) {
      window.console.log(column);
      this.excelBox = false;
      this.refreshChange();
      done();
    },
    handleExport() {
      this.$confirm("是否导出用户数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.open(
          `/api/blade-user/export-user?${
            this.website.tokenHeader
          }=${getToken()}&account=${this.search.account}&realName=${
            this.search.realName
          }`
        );
      });
    },
    handleTemplate() {
      window.open(
        `/api/blade-user/export-template?${
          this.website.tokenHeader
        }=${getToken()}`
      );
    },
    beforeOpen(done, type) {
      this.initData();
      if (["edit", "view"].includes(type)) {
        getUser(this.form.id).then((res) => {
          this.form = res.data.data;
          if (this.form.hasOwnProperty("roleId")) {
            this.form.roleId = this.form.roleId.split(",");
          }
        });
      }
      this.initFlag = true;
      done();
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
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style>
.box {
  height: 800px;
}

.el-scrollbar {
  height: 100%;
}

.box .el-scrollbar__wrap {
  overflow: scroll;
}



</style>
