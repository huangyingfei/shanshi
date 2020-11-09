<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div class="box">
          <el-scrollbar>
            <basic-container>
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>

              <el-tree
                :data="treeData"
                :props="treeProps"
                @node-click="nodeClick"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                :highlight-current="true"
                ref="tree"
                draggable="true"
                :allow-drag="allowDrag"
                :allow-drop="allowDrop"
                @node-drop="handleDrop"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                  @dblclick="updateClass(node, data)"
                >
                  <span>
                    <span
                      class="ant-tree-node-content-0"
                      v-if="!data.addBtn && data.classType == 3"
                    ></span>

                    <img
                      src="/img/bg/edu-oa-file.png"
                      width="16px"
                      class="ant-tree-node-content-1"
                      v-if="!data.addBtn && data.classType != 3"
                    />
                    <span v-if="!data.addBtn && data.classType == 0">{{
                      data.label
                    }}</span>
                    <span v-if="!data.addBtn && data.classType == 1">{{
                      data.label
                    }}</span>
                    <span v-if="!data.addBtn && data.classType == 2">{{
                      data.label
                    }}</span>
                    <span v-if="!data.addBtn && data.classType == 3">{{
                      data.label
                    }}</span>
                    <span
                      class="ant-tree-node-content-wrapper-addItem"
                      v-if="data.addBtn"
                      @click="addClass(node, data)"
                      >{{ data.label }}</span
                    >
                  </span>
                  <span class="ant-tree-node-content-btn">
                    <img
                      src="/img/bg/delete.png"
                      @click="removeClass(data.id)"
                      width="15px"
                      class="ant-tree-node-content-1"
                      v-if="
                        !data.addBtn &&
                        data.classType != 0 &&
                        (!data.children || data.children.length == 1)
                      "
                    />
                  </span>
                </span>
              </el-tree>
              <!-- <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"/> -->
            </basic-container>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="19">
        <basic-container>
          <avue-crud
            :option="option"
            :search.sync="search"
            :table-loading="loading"
            :data="data"
            ref="crud"
            v-model="form"
            :permission="permissionList"
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
              <router-link to="/oprate/addStudent">
                <el-button
                  type="el-button el-button--primary el-button--small"
                  size="small"
                  icon="el-icon-plus"
                >
                  添加学生
                </el-button>
              </router-link>
              <el-button
                type="danger"
                size="small"
                plain
                icon="el-icon-delete"
                @click="handleDelete"
                >删 除
              </el-button>
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button
                type="text"
                icon="el-icon-view"
                size="small"
                @click.stop="handleView(scope.row)"
                >查看
              </el-button>
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
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                @click.stop="
                  leaveVisible = true;
                  rowId = scope.row.id;
                "
                >离校
              </el-button>
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                @click.stop="handleUpdate(scope.row, scope.index, 3)"
                >毕业
              </el-button>
            </template>
          </avue-crud>
        </basic-container>
      </el-col>
    </el-row>
    <el-dialog
      :title="离校"
      append-to-body="true"
      :visible.sync="leaveVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="5">离校原因</el-col>
        <el-col :span="19">
          <el-input v-model="leaveReason" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">离校时间</el-col>
        <el-col :span="19">
          <avue-date v-model="leaveDate" placeholder="请选择日期"></avue-date>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(rowId, null, 2)"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :title="tclass.classTitle"
      append-to-body="true"
      :visible.sync="outerVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="5">{{ tclass.classPName }}</el-col>
        <el-col :span="19">
          <el-select v-model="addValue.pidValue" disabled placeholder="请选择">
            <el-option
              v-for="item in pidOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">{{ tclass.className }}</el-col>
        <el-col :span="19">
          <el-input
            v-model="addValue.nameValue"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>

      <el-row v-if="tclass.classType == 3">
        <el-col :span="5">{{ tclass.classAlias }}</el-col>
        <el-col :span="19">
          <el-input
            v-model="addValue.aliasValue"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>
      <!-- <el-row v-if="tclass.classType == 3">
        <el-col :span="5">{{ tclass.classEdu }}</el-col>
        <el-col :span="19">
          <el-input
            v-model="addValue.eduValue"
            placeholder="请输入内容"
            oninput="value=value.replace(/\d{5}/g,'')"
          ></el-input>
        </el-col>
      </el-row> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitClass()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { grant, resetPassword } from "@/api/system/user";

import {
  tree,
  add,
  remove,
  update,
  orderClass,
  getList,
  removeStuId,
} from "@/api/system/student";

import { nation } from "@/api/tool/data";
import { formateDate } from "@/api/tool/date";
import { mapGetters } from "vuex";
import website from "@/config/website";
import { getToken } from "@/util/auth";

export default {
  data() {
    return {
      rowId: "",
      leaveReason: "",
      leaveDate: "",
      outerVisible: false,
      leaveVisible: false,
      filterText: "",
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
      classes: [
        { type: 1, pName: "所属校区", title: "新增学段", name: "学段名称" },
        {
          type: 2,
          pName: "所属学段",
          title: "新增年级",
          name: "年级名称",
          alias: "年级别名",
        },
        {
          type: 3,
          pName: "所属年级",
          title: "新增班级",
          name: "班级名称",
          alias: "班级别名",
          edu: "学界",
        },
      ],
      tclass: {
        classType: "",
        classPName: "",
        classTitle: "",
        className: "",
        classAlias: "",
        classEdu: "",
      },
      addValue: {
        id: "",
        pidValue: "",
        nameValue: "",
        aliasValue: "",
        // eduValue: "",
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
      classId: "",
      treeData: [],
      treeProps: {
        children: "children",
        label: "label",
      },

      option: {
        height: "auto",
        calcHeight: 80,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        selection: true,
         menuWidth: 300,
        // viewBtn: true,
        editBtn: false,
        addBtn: false,
        delBtn: false,
        //dialogType: 'drawer',
        dialogClickModal: false,
        column: [
          {
            label: "学级",
            prop: "educationalCircles",
            search: true,
            display: false,
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
            display: false,
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
          },
          {
            label: "户口所在地",
            prop: "location",
            display: false,
          },
          {
            label: "档案号",
            prop: "fileNumber",
            display: false,
          },
          {
            label: "入园日期",
            prop: "admissionDate",
            display: false,
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
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    "form.tenantId"() {
      if (this.form.tenantId !== "" && this.initFlag) {
        this.initData(this.form.tenantId);
      }
    },
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
  mounted() {
    this.initData();
  },
  methods: {
    allowDrag(draggingNode) {
      return draggingNode.data.classType == 3;
    },
    allowDrop(draggingNode, dropNode, type) {
      return type !== "inner";
    },
    updateClass(node, data) {
      if (data.parentId != 0) {
        debugger;
        this.outerVisible = true;
        let classs = this.classes.filter((_) => {
          return _.type == data.classType;
        })[0];
        if (classs.type == 2) {
          this.tclass.classAlias = classs.alias;
        }
        if (classs.type == 3) {
          this.tclass.classAlias = classs.alias;
          this.tclass.classEdu = classs.edu;
        }
        this.tclass.classType = classs.type;
        this.tclass.classPName = classs.pName;
        this.tclass.classTitle = classs.title;
        this.tclass.className = classs.name;

        this.pidOptions = [{ value: data.parentId, label: data.parentName }];
        this.addValue.pidValue = data.parentId;
        this.addValue.nameValue = data.label;
        this.addValue.id = data.id;
        if (classs.type == 1) {
          this.tclass.classTitle = "修改学段";
        }
        if (classs.type == 2) {
          this.tclass.classTitle = "修改年级";
        }
        if (classs.type == 3) {
          this.tclass.classTitle = "修改班级";
          this.addValue.aliasValue = data.classAlias;
          // this.addValue.eduValue = data.educationalCircles;
        }
      }
    },
    orderClass() {},
    removeClass(id) {
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          remove(id).then((res) => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    emptyDialog() {
      this.addValue.pidValue = "";
      this.addValue.nameValue = "";
      this.addValue.aliasValue = "";
      this.addValue.id="";
      // this.addValue.eduValue = "";
      this.leaveReason = "";
      this.leaveDate = "";
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    addClass(node, data) {
      this.outerVisible = true;
      let classs = this.classes.filter((_) => {
        return _.type == data.type;
      })[0];
      if (classs.type == 2) {
        this.tclass.classAlias = classs.alias;
      }
      if (classs.type == 3) {
        this.tclass.classAlias = classs.alias;
        this.tclass.classEdu = classs.edu;
      }
      debugger;
      this.tclass.classType = classs.type;
      this.tclass.classPName = classs.pName;
      this.tclass.classTitle = classs.title;
      this.tclass.className = classs.name;
      console.log(this.tclass);
      this.pidOptions = [{ value: data.pId, label: data.pName }];
      this.addValue.pidValue = data.pId;
      console.log(this.pidOptions);
    },
    cancel() {
      this.outerVisible = false;
      this.leaveVisible = false;
      this.Visible;
      this.emptyDialog();
    },
    submitClass() {
      let row = {};
      debugger;
      if (this.tclass.classType == 1) {
        row = {
          id: this.addValue.id,
          parentId: this.addValue.pidValue,
          className: this.addValue.nameValue,
          classType: this.tclass.classType,
        };
      }
      if (this.tclass.classType == 2) {
        row = {
          id: this.addValue.id,
          parentId: this.addValue.pidValue,
          className: this.addValue.nameValue,
          classType: this.tclass.classType,
        };
      }
      if (this.tclass.classType == 3) {
        row = {
          id: this.addValue.id,
          parentId: this.addValue.pidValue,
          className: this.addValue.nameValue,
          classType: this.tclass.classType,
          classAlias: this.addValue.aliasValue,
          // educationalCircles: this.addValue.eduValue,
        };
      }
      if (this.addValue.id != null && this.addValue.id != "") {
        update(row).then((res) => {
          if (res.data.success) {
            this.outerVisible = false;
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.initData();
            this.emptyDialog();
          }
        });
      } else {
        add(row).then((res) => {
          if (res.data.success) {
            this.outerVisible = false;
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.initData();
            this.emptyDialog();
          }
        });
      }
    },
    nodeClick(data) {
      this.classId = data.id;
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    addTreeItem(data, value, type, pId, pName) {
      let tData = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          tData.push(data[i]);
        }
      }
      tData.push({
        label: value,
        addBtn: true,
        type: type,
        pId: pId,
        pName: pName,
      });
      return tData;
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      let rows = [];
      let rowData = [];
      this.treeData.forEach((_) => {
        if (_.children) {
          _.children.forEach((__) => {
            if (__.children) {
              __.children.forEach((___) => {
                if (___.id == draggingNode.data.parentId) {
                  rows = ___.children;
                }
              });
            }
          });
        }
      });

      if (dropType == "after") {
        rows = rows.filter((_) => {
          return dropNode.data.sort
            ? _.sort <= dropNode.data.sort && _.sort >= draggingNode.data.sort
            : _.sort >= draggingNode.data.sort;
        });
        for (let i = 0; i < rows.length; i++) {
          if (i >= 1) {
            rowData.push({ id: rows[i].id, sort: rows[i - 1].sort });
          }
        }

        rowData.push({ id: rows[0].id, sort: rows[rows.length - 1].sort });
        console.log(rows);
      }
      if (dropType == "before") {
        rows = rows.filter((_) => {
          return (
            _.sort >= dropNode.data.sort && _.sort <= draggingNode.data.sort
          );
        });
        for (let i = 0; i <= rows.length; i++) {
          if (i < rows.length - 1) {
            rowData.push({ id: rows[i].id, sort: rows[i + 1].sort });
          }
        }
        rowData.push({ id: rows[rows.length - 1].id, sort: rows[0].sort });
        
        console.log(rows);
      }

      orderClass(rowData).then(res=>{
        
        if(res.data.success){
            this.$message({
            type: "success",
            message: "排序成功!",
          });
           this.initData();
        }
      });
      
    },
    initData() {
      tree().then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          //学校
          if (res.data.data[i].children) {
            for (let k = 0; k < res.data.data[i].children.length; k++) {
              //学段
              if (res.data.data[i].children[k].children) {
                for (
                  let j = 0;
                  j < res.data.data[i].children[k].children.length;
                  j++
                ) {
                  //年级
                  res.data.data[i].children[k].children[
                    j
                  ].children = this.addTreeItem(
                    res.data.data[i].children[k].children[j].children,
                    "+ 新增班级",
                    3,
                    res.data.data[i].children[k].children[j].id,
                    res.data.data[i].children[k].children[j].label
                  );
                }
              }
              res.data.data[i].children[k].children = this.addTreeItem(
                res.data.data[i].children[k].children,
                "+ 新增年级",
                2,
                res.data.data[i].children[k].id,
                res.data.data[i].children[k].label //1-学段，2-年级，3-班级
              );
            }
          }
          res.data.data[i].children = this.addTreeItem(
            res.data.data[i].children,
            "+ 新增学段",
            1,
            res.data.data[i].id,
            res.data.data[i].label
          );
        }
        this.treeData = res.data.data;
        console.log(this.treeData);
      });
    },

    rowSave(row, done, loading) {
      console.log(row);
      row.deptId = row.deptId.join(",");
      row.roleId = row.roleId.join(",");
      row.postId = row.postId.join(",");
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
    rowUpdate(row, index, done, loading) {
      row.deptId = row.deptId.join(",");
      row.roleId = row.roleId.join(",");
      row.postId = row.postId.join(",");
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
    rowDel(row) {
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
      handleView(row){
      this.$router.push({ path: "/oprate/addStudent",query:{id:row.id,detailFlag:true,addView:true} });
    },
    handleEdit(row) {
      this.$router.push({ path: "/oprate/addStudent", query: { id: row.id } });
    },
    searchReset() {
      this.query = {};
      this.classId = "";
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
    handleUpdate(row, index, type) {
      debugger;
      let rows = [];
      if (type == "2") {
        rows.push({
          id: row,
          isDelete: type,
          leaveDate: formateDate(this.leaveDate, "yyyy-MM-dd"),
          reason: this.leaveReason,
        });
        this.emptyDialog();
        removeStuId(rows).then((res) => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
        this.leaveVisible = false;
      } else {
        rows.push({ id: row.id, isDelete: type });
        this.$confirm("是否确认毕业?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          removeStuId(rows).then((res) => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
        });
      }
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
          let id = this.ids.split(",");
          let row = [];
          for (let i = 0; i < id.length; i++) {
            row.push({ id: id[i], isDelete: 1 });
          }
          return removeStuId(row);
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
      params["isDelete"] = 0;
      getList(page.currentPage, page.pageSize, params, this.classId).then(
        (res) => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        }
      );
    },
  },
};
</script>

<style>
.box {
  height: 800px;
}
.el-tree {
  margin-top: 20px;
}

.el-scrollbar {
  height: 100%;
}

.box .el-scrollbar__wrap {
  overflow: scroll;
}
.ant-tree-node-content-0::before {
  content: "\73ED";
  color: #fff;
  opacity: 0.8;
  background: #00b853;
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;

  -webkit-transform: translateY(-50%) scale(0.5);
  -ms-transform: translateY(-50%) scale(0.5);
  transform: translateY(-50%) scale(0.5);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  z-index: 1;
  position: relative;
  top: 18px;
}
.ant-tree-node-content-0 {
  margin-top: 30px;
  margin-left: -8px;
}
.ant-tree-node-content-1 {
  margin-right: 5px;
}

.ant-tree-node-content-wrapper-addItem {
  color: #92959b;
  border: #dcdfe6 1px solid;
  padding: 4px 10px;
  font-size: 12px;
}
.el-tree-node__content {
  height: 30px;
}
.ant-tree-node-content-btn {
  margin-top: 4px;
}
</style>
