<template>
  <basic-container class="scoreindex">
    <avue-crud
      :option="option"
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
      :show-column.sync="showColumn"
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          v-if="permission.role_delete"
          plain
          @click="handleDelete"
          >删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, add, update, remove } from "@/api/system/scoreindex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showColumn: ["name"],
      form: {},
      box: false,
      selectionList: [],
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      option: {
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        tree: true,
        border: true,
        index: true,
        selection: true,
        viewBtn: true,
        dialogWidth: 900,
        dialogClickModal: false,
        column: [
          {
            label: "食谱评分项",
            prop: "name",
            search: true,
            span: 24,
            display: false,
            rules: [
              {
                required: true,
                message: "请输入食谱评分项名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "名称",
            prop: "name1",
            search: false,
            span: 24,
            display: true,
            rules: [
              {
                required: true,
                message: "请输入食谱评分项名称",
                trigger: "blur",
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
        //   addBtn: this.vaildData(this.permission.role_add, false),
        //   viewBtn: this.vaildData(this.permission.role_view, false),
        //   delBtn: this.vaildData(this.permission.role_delete, false),
        //   editBtn: this.vaildData(this.permission.role_edit, false)
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
    rowSave(row, done, loading) {
      row.name = row.name1;
      add(row).then(
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
      row.name = row.name1;
      update(row).then(
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
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        let records = res.data.data.records;
        records.forEach((_) => {
          _.name1 = _.name;
        });
        this.data = records;
        this.page.total = res.data.data.total;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script >

<style  >
.scoreindex .el-form-item__label {
  width: 100px !important;
}

.scoreindex .el-form-item__content {
  margin-left: 100px !important;
}
</style>
