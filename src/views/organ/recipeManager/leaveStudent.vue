<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      ref="crud"
      v-model="form"
      :permission="permissionList"
      @row-del="rowDel"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      :page.sync="page"
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <!-- <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"

                   plain
                   @click="handleDelete">删 除 -->
        <!-- </el-button> -->
      </template>

      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          icon="el-icon-view"
          size="small"
          @click.stop="handleReset(scope.row)"
          >恢复
        </el-button>
        <el-button
          type="text"
          icon="el-icon-view"
          size="small"
          @click.stop="handleView(scope.row)"
          >查看
        </el-button>
        <el-button
          type="text"
          icon="el-icon-delete"
          size="small"
          @click.stop="handleDel(scope.row, scope.index)"
          >删除
        </el-button>
      </template>
    </avue-crud>

    <el-dialog
      title="请选择班级"
      class="resetClass"
      append-to-body
      :visible.sync="resetBox"
      width="555px"
    >
      <avue-form
        :option="stuOption"
        v-model="stuForm"
        @submit="recoverStudent"
        @error="error"
      >
      </avue-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getList,
  removeStuId,
  recoverStudent,
  stuTree,
} from "@/api/system/student";
import { mapGetters } from "vuex";
import { nation } from "@/api/tool/data";
import { formateDate } from "@/api/tool/date";
export default {
  data() {
    return {
      stuForm: {},
      stuOption: {
        menuPosition: "right",
        column: [
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
            props: {
              children: "children",
              label: "label",
              value: "id",
            },
            span: 24,
          },
        ],
      },
      resetBox: false,
      resetRowId: "",
      form: {},
      box: false,
      props: {
        label: "title",
        value: "key",
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
        pageSizes: [8, 16, 24, 32, 40, 48],
      },
      option: {
        columnBtn: false,
        refreshBtn: false,
        height: "auto",
        tip: false,
        simplePage: true,
        searchShow: true,
        searchMenuSpan: 6,
        tree: true,
        border: true,
        index: true,
        indexLabel: "序号",
        selection: false,
        viewBtn: false,
        dialogWidth: 900,
        dialogClickModal: false,
        delBtn: false,
        editBtn: false,
        addBtn: false,
        column: [
          {
            label: "学级",
            prop: "educationalCircles",
            search: true,
            display: false,
            minlength: 0,
            maxlength: 4,
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
            display: false,
            minlength: 0,
            maxlength: 5,
            width: 100,
            overHidden: true,
          },
          {
            label: "学号",
            prop: "childNo",
            search: false,
            display: false,
            minlength: 0,
            maxlength: 10,
            width: 100,
            overHidden: true,
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
            search: true,
            display: false,
          },
          {
            label: "出生日期",
            prop: "birthDate",
            display: false,
            width: 100,
            overHidden: true,
          },
          {
            label: "年龄",
            prop: "age",
            display: false,
          },
          {
            label: "民族",
            prop: "nation",
            display: false,
            type: "select",
            dicData: nation,
            width: 100,
            overHidden: true,
          },
          {
            label: "户口所在地",
            prop: "location",
            display: false,
            width: 100,
            overHidden: true,
          },
          {
            label: "档案号",
            prop: "fileNumber",
            display: false,
            width: 100,
            overHidden: true,
          },
          {
            label: "状态",
            prop: "isDelete",
            display: false,
            type: "select",
            search: true,
            dicData: [
              { label: "离校", value: 2 },
              { label: "毕业", value: 3 },
            ],
          },
          {
            label: "入校日期",
            prop: "admissionDate",
            display: false,
            type: "date",
            search: true,
            searchRange: true,
            searchSpan: 8,
            width: 100,
            overHidden: true,
          },
          {
            label: "离校或毕业所在班级",
            prop: "leaveClassName",
            display: false,
            width: 100,
            overHidden: true,
          },
          {
            label: "离毕日期",
            prop: "leaveDate",
            display: false,
            type: "date",
            searchRange: true,
            searchSpan: 8,
            search: true,
            width: 90,
          },

          {
            label: "离校原因",
            prop: "reason",
            display: false,
            width: 320,
            overHidden: true,
          },
        ],
      },
      data: [],
    };
  },
  mounted() {},
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
      //
      if (params.admissionDate) {
        params.admissionDateMin = formateDate(
          params.admissionDate[0],
          "yyyy-MM-dd HH:mm:ss"
        );
        params.admissionDateMax = formateDate(
          params.admissionDate[1],
          "yyyy-MM-dd HH:mm:ss"
        );
        delete params.admissionDate;
      }
      if (params.leaveDate) {
        params.leaveDateMin = formateDate(
          params.leaveDate[0],
          "yyyy-MM-dd HH:mm:ss"
        );
        params.leaveDateMax = formateDate(
          params.leaveDate[1],
          "yyyy-MM-dd HH:mm:ss"
        );
        delete params.leaveDate;
      }
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    // selectionClear() {
    //   this.selectionList = [];
    //   this.$refs.crud.toggleSelection();
    // },
    handleView(row) {
      this.$router.push({
        path: "/oprate/addStudent",
        query: { id: row.id, detailFlag: true },
      });
    },
    handleReset(row) {
      this.resetBox = true;
      this.resetRowId = row.id;
    },
    recoverStudent() {
      let rows = { id: this.resetRowId, classId: this.stuForm.classId };
      recoverStudent(rows).then((res) => {
        if (res.data.success) {
          this.onLoad(this.page);
          this.resetBox = false;
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        } else {
        }
        done();
      });
    },
    handleDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let rows = [];
          rows.push({ id: row.id, isDelete: 1 });
          return removeStuId(rows);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    handleUpdate(row, index) {
      this.$refs.crud.rowEdit(row, index);
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
        this.data = res.data.data.records;
        this.page.total = res.data.data.total;
        this.loading = false;
        //  this.selectionClear();
      });
    },
  },
};
</script>

<style>
.resetClass .el-dialog__body {
  padding: 30px 20px 0px 20px !important;
}
</style>
