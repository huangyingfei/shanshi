<template>
  <div>
    <h2>食谱库</h2>
  </div>
</template>
<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.post_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isPub!=0"
          @click="changeInfo(scope.row.id,1)"
        >公开
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isPub==0"
          @click="changeInfo(scope.row.id,2)"
        >取消公开
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isRecommend==0"
          @click="changeInfo(scope.row.id,3)"
        >推荐
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isRecommend!=0"
          @click="changeInfo(scope.row.id,4)"
        >取消推荐
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isUse!=0"
          @click="changeInfo(scope.row.id,5)"
        >取消收藏
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isUse==0"
          @click="changeInfo(scope.row.id,6)"
        >收藏
        </el-button>
      </template>

      <template slot-scope="{row}"
                slot="category">
        <el-tag>{{row.categoryName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,changeInfo} from "@/api/food/recipe";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height: 'auto',
          calcHeight: 30,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          menuWidth:500,
          dialogClickModal: false,
          addBtn:false,
          column: [
            {
              label: "食谱名称",
              prop: "recipeName",
              search: true,
              rules: [{
                required: true,
                message: "请输入食谱名称",
                trigger: "blur"
              }]
            },
            {
              label: "食谱周期",
              prop: "recipeDay",
              search: true,
              rules: [{
                required: true,
                message: "请输入食谱周期",
                trigger: "blur"
              }]
            },
            {
              label: "收藏",
              prop: "isUse",
              type: "select",
              search: true,
              dicData: [
                {
                  label: "已收藏",
                  value: 1
                },
                {
                  label: "未收藏",
                  value: 0
                }
              ],
              rules: [
                {
                  required: true,
                  message: "请选择",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "创建机构",
              prop: "orgName",
            },
            {
              label: "创建人",
              prop: "createName",
              span: 24,
              minRows: 6,
            },
            {
              label: "创建时间",
              prop: "createTime",
              width: 180,
              span: 24,
              minRows: 6,
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          /* addBtn: this.vaildData(this.permission.recipe_add, false),
           viewBtn: this.vaildData(this.permission.recipe_view, false),
           delBtn: this.vaildData(this.permission.recipe_delete, false),
           editBtn: this.vaildData(this.permission.recipe_edit, false)*/
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      rowSave(row, done, loading) {
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
      changeInfo(id,type) {
        // debugger;
        var isPub;//是否公开
        var isRecommend;//是否推荐
        var isUse;//是否收藏
        if(type==1){
          isPub=0
        }else if(type==2){
          isPub=1
        }else if(type==3){
          isRecommend=1
        }else if(type==4){//取消推荐
          isRecommend=0
        }else if(type==5){//取消收藏
          isUse=0
        }else if(type==6){
          isUse=1
        }

        this.$confirm("确定执行按钮?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return changeInfo(id,isPub,isRecommend,isUse);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },

      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
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
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
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
        params=
          {
            searchType:0
          }
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
