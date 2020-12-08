<template>
  <basic-container>
    <avue-crud
      :option="option"
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
      @on-load="onLoad"
    >

      <template slot="menuLeft">
        <el-button
          type="el-button el-button--primary el-button--small"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增
        </el-button>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          @click="handleDelete"
          >删 除
        </el-button>
      </template>


      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          icon="el-icon-edit"
          size="small"
          @click.stop="handleEdit(scope.row)"
        >编辑
        </el-button>
        <el-button
          type="text"
          icon="el-icon-edit"
          size="small"
          @click.stop="rowDel(scope.row)"
        >删除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove,
  getTree,
  getStudentClass
} from "@/api/food/studentallergy";
import { mapGetters } from "vuex";

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
        height: "auto",
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        indexLabel:'序号',
        viewBtn: false,
        addBtn:false,
        editBtn:false,
        selection: true,
        delBtn:false,
        dialogClickModal: false,
        column: [
          {
            label: "姓名",
            prop: "studentId",
            multiple: false,
            span: 24,
            type: "tree",
            dicUrl: "/api/blade-food/class/getStudent",
            hide: true,
            dicData: [],
            props: {
              label: "name",
              value: "id"
            },
            rules: [{ required: true, trigger: "blur" }],
            change: ({ value, column }) => {

              if (value != "" && value != null) {
                getStudentClass(value).then(res => {
                  /*                    console.log(res);*/
                  this.form.className = res.data.data.className;
                });
              }
            }
          },
          {
            label: "班级",
            prop: "className",
            span: 24,
            disabled: true,
            search: true
          },
          {
            label: "姓名",
            prop: "peopleName",
            display: false,
            search: true,
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }
            ]
          },
          {
            label: "食材名称",
            prop: "foodNames",
            display: false,
            rules: [
              {
                required: true,
                message: "请输入主键",
                trigger: "blur"
              }
            ]
          },
          {
            label: "过敏食材",
            prop: "foodId",
            hide: true,
            span: 24,
            rules: [
              {
                required: true,
                message: "请选择过敏食材",
                trigger: "blur"
              }
            ]
          },
          {
            label: "过敏症状",
            prop: "symptom",
            type: "textarea",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入过敏症状",
                trigger: "blur"
              }
            ]
          },
          {
            label: "备注",
            prop: "remark",
            span: 24,
            type: "textarea",
            rules: [
              {
                required: false,
                message: "请输入备注",
                trigger: "blur"
              }
            ]
          }
        ]
      },
      data: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        /* addBtn: this.vaildData(this.permission.studentallergy_add, false),
          viewBtn: this.vaildData(this.permission.studentallergy_view, false),
          delBtn: this.vaildData(this.permission.studentallergy_delete, false),
          editBtn: this.vaildData(this.permission.studentallergy_edit, false)*/
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
      add(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        },
        error => {
          loading();
          window.console.log(error);
        }
      );
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        },
        error => {
          loading();
          console.log(error);
        }
      );
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
    handleEdit(scope){
      this.$router.push({name:"修改过敏信息",query:{id:scope.id}});
    },
    handleAdd(){
      this.$router.push({  name: "新增过敏信息"});
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
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
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

<style></style>
