<template>
  <basic-container >
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               ref="crud"
               v-model="form"
               :permission="permissionList"
               :before-open="beforeOpen"
               @row-del="rowDel"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               :page.sync="page"
               @on-load="onLoad">
      <template slot="menuLeft">
        <!-- <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"

                   plain
                   @click="handleDelete">删 除 -->
        <!-- </el-button> -->
        <el-button size="small"
                   icon="el-icon-setting"
                   @click="handleRole"
                   v-if="userInfo.role_name.includes('admin')"
                   plain>权限设置
        </el-button>
      </template>

       <template slot-scope="scope" slot="menu">
         <el-button
          type="text"
          icon="el-icon-edit"
          size="small"
          v-if="(scope.row.roleAlias!='admin'&&scope.row.roleAlias!='administrator')"
          @click.stop="handleUpdate(scope.row, scope.index)"
          >编辑
        </el-button>
        <el-button
          type="text"
          icon="el-icon-delete"
          size="small"
           v-if="(scope.row.roleAlias!='admin'&&scope.row.roleAlias!='administrator')"
          @click.stop="handleDel(scope.row, scope.index)"
          >删除
        </el-button>
       </template>
    </avue-crud>
    <el-dialog title="角色权限配置"
               append-to-body
               :visible.sync="box"
               width="345px">
      <el-tabs type="border-card">
        <el-tab-pane label="菜单权限">
          <el-tree :data="menuGrantList"
                   show-checkbox
                   node-key="id"
                   ref="treeMenu"
                   :default-checked-keys="menuTreeObj"
                   :props="props">
          </el-tree>
        </el-tab-pane>
        <!--<el-tab-pane label="数据权限">-->
          <!--<el-tree :data="dataScopeGrantList"-->
                   <!--show-checkbox-->
                   <!--node-key="id"-->
                   <!--ref="treeDataScope"-->
                   <!--:default-checked-keys="dataScopeTreeObj"-->
                   <!--:props="props">-->
          <!--</el-tree>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="接口权限">-->
          <!--<el-tree :data="apiScopeGrantList"-->
                   <!--show-checkbox-->
                   <!--node-key="id"-->
                   <!--ref="treeApiScope"-->
                   <!--:default-checked-keys="apiScopeTreeObj"-->
                   <!--:props="props">-->
          <!--</el-tree>-->
        <!--</el-tab-pane>-->

      </el-tabs>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="box = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {add, getList, getRole, getRoleTree, grant, grantTree, remove, update} from "@/api/system/role";
  import {mapGetters} from "vuex";
  import website from '@/config/website';

  export default {
    data() {
      return {
        form: {},
        box: false,
        props: {
          label: "title",
          value: "key"
        },
        menuGrantList: [],
        dataScopeGrantList: [],
        apiScopeGrantList: [],
        apiGrantList: [],
        menuTreeObj: [],
        dataScopeTreeObj: [],
        apiScopeTreeObj: [],
        selectionList: [],
        query: {},
        loading: true,
        page: {
          pageSize: 8,
          currentPage: 1,
          total: 0,
          pageSizes:[8,16,24,32,40,48]
        },
        option: {
          height: "auto",
          tip: false,
          simplePage: true,
          searchShow: true,
          searchMenuSpan: 6,
          tree: true,
          border: true,
          index: true,
          indexLabel:'序号',
          selection: true,
          viewBtn: true,
          dialogWidth: 900,
          dialogClickModal: false,
          delBtn:false,
          editBtn:false,
          column: [
            //  {label: "类型",
            //   prop: "tenantType",
            //   search: true,
            //   type:"select",
            //   dicData:[{
            //     label:"平台",
            //     value:1
            //   },{
            //     label:"机构",
            //     value:2
            //   },{
            //     label:"政府",
            //     value:3
            //   }],
            //   display:false
            // },
            {
              label: "角色名称",
              prop: "roleName",
              search: true,
              span: 24,
              rules: [
                {
                  required: true,
                  message: "请输入角色名称",
                  trigger: "blur"
                }
              ]
            },
            // {
            //   label: "租户名称",
            //   prop: "tenantId",
            //   type: "tree",
            //   dicUrl: "/api/blade-system/tenant/select",
            //   addDisplay: false,
            //   editDisplay: false,
            //   viewDisplay: website.tenantMode,
            //   span: 24,
            //   props: {
            //     label: "tenantName",
            //     value: "tenantId"
            //   },
            //   hide: !website.tenantMode,
            //   search: website.tenantMode,
            //   rules: [{
            //     required: true,
            //     message: "请输入所属租户",
            //     trigger: "click"
            //   }]
            // },

            {
              label: "角色别名",
              prop: "roleAlias",
              // search: true,
              span: 24,
              rules: [
                {
                  required: true,
                  message: "请输入角色别名",
                  trigger: "blur"
                }
              ]
            },
            // {
            //   label: "上级角色",
            //   prop: "parentId",
            //   dicData: [],
            //   type: "tree",
            //   hide: true,
            //   span: 24,
            //   props: {
            //     label: "title"
            //   },
            //   rules: [
            //     {
            //       required: false,
            //       message: "请选择上级角色",
            //       trigger: "click"
            //     }
            //   ]
            // },
            // {
            //   label: "角色排序",
            //   prop: "sort",
            //   type: "number",
            //   span: 24,
            //   rules: [
            //     {
            //       required: true,
            //       message: "请输入角色排序",
            //       trigger: "blur"
            //     }
            //   ]
            // }
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["userInfo", "permission"]),
      permissionList() {
        return {
          // addBtn: this.vaildData(this.permission.role_add, false),
          // viewBtn: this.vaildData(this.permission.role_view, false),
          // delBtn: this.vaildData(this.permission.role_delete, false),
          // editBtn: this.vaildData(this.permission.role_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);

        });
        return ids.join(",");
      },
      idsArray() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids;
      }
    },
    methods: {
      // initData(){
      //   getRoleTree().then(res => {
      //     const column = this.findObject(this.option.column, "parentId");
      //     column.dicData = res.data.data;
      //   });
      // },
      submit() {
        const menuList = this.$refs.treeMenu.getCheckedKeys();
        // const dataScopeList = this.$refs.treeDataScope.getCheckedKeys();
        // const apiScopeList = this.$refs.treeApiScope.getCheckedKeys();
        grant(this.idsArray, menuList).then(() => {
          this.box = false;
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.onLoad(this.page);
        });
      },
      rowSave(row, done, loading) {
        console.log(row);
        add(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
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
        //this.initData();
        }
        done();
      },
      handleRole() {
        if (this.selectionList.length !== 1) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.menuTreeObj = [];
        this.dataScopeTreeObj = [];
        this.apiScopeTreeObj = [];
        grantTree()
          .then(res => {
            this.menuGrantList = res.data.data.menu;
            this.dataScopeGrantList = res.data.data.dataScope;
            this.apiScopeGrantList = res.data.data.apiScope;
            getRole(this.ids).then(res => {
              this.menuTreeObj = res.data.data.menu;
              this.dataScopeTreeObj = res.data.data.dataScope;
              this.apiScopeTreeObj = res.data.data.apiScope;
              this.box = true;
            });
          });
      },
      // handleDelete() {
      //   if (this.selectionList.length === 0) {
      //     this.$message.warning("请选择至少一条数据");
      //     return;
      //   }
      //   this.$confirm("确定将选择数据删除?", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       return remove(this.ids);
      //     })
      //     .then(() => {
      //       this.onLoad(this.page);
      //       this.$message({
      //         type: "success",
      //         message: "操作成功!"
      //       });
      //       this.$refs.crud.toggleSelection();
      //     });
      // },
      handleDel(row){
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      handleUpdate(row,index){
         this.$refs.crud.rowEdit(row,index)
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
        console.log(page.currentPage,page.pageSize,this.page,page)
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          this.data = res.data.data.records;
          this.page.total = res.data.data.total;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>



