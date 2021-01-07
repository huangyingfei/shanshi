<template>
  <basic-container>
    <avue-crud
      :option="option"
      :data="upClassData"
      :page.sync="page"
      @on-load="selUpClass"
    >
      <template slot="menuLeft">
        <el-row>
          <el-col span="10">
            <avue-date
              v-model="currentDate"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            ></avue-date>
          </el-col>
          <el-col span="1"> </el-col>
          <el-col span="5"
            ><el-button type="primary" size="small" @click="upClass"
              >开始升班</el-button
            >
          </el-col>
          <el-col span="1"> </el-col>
          <el-col span="5">
            <el-button type="primary" size="small" @click="cancelUpClass"
              >撤销上次升班</el-button
            >
          </el-col>
        </el-row>
      </template>
      <template slot="parentId" slot-scope="scope">
        <avue-select
          v-model="scope.parentId"
          placeholder="请选择内容"
          type="tree"
          :dic="scope.parentData"
        ></avue-select>
      </template>
      <template slot="isGraduation" slot-scope="scope">
        <avue-select
          v-model="scope.row.isGraduation"
          placeholder="请选择内容"
          type="tree"
          :dic="dic"
        ></avue-select>
      </template>
      <template slot="className" slot-scope="scope">
        <avue-input
          v-model="scope.className"
          placeholder="请输入内容"
        ></avue-input>
      </template>
      <template slot="classAlias" slot-scope="scope">
        <avue-input
          v-model="scope.classAlias"
          placeholder="请输入内容"
        ></avue-input>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      dic: [
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ],
      upClassData: [
        {
          oldParentClassName: "xxx",
          oldClassName: "xxx",
          oldClassAlias: "xxx",
          parentData: [{ label: "是", value: 2 }],
          isGradute: "",
          parentId: "1",
          className: "xx",
          classAlias: "xxx",
        },
      ],
      page: {
        pageSize: 20,
        pagerCount: 5,
      },
      option: {
        height: "auto",
        addBtn: false,
        menu: false,
        column: [
          {
            label: "升班前年级",
            prop: "startYear",
          },
          {
            label: "升班前班级名称",
            prop: "oldClassName",
          },
          {
            label: "班级别名",
            prop: "oldClassAlias",
          },

          {
            label: "升班后年级",
            prop: "parentId",
          },
          {
            label: "是否毕业",
            prop: "isGraduation",
            slot: true,
          },
          {
            label: "升班后班级名称",
            prop: "className",
            slot: true,
          },
          {
            label: "升班后班级别名",
            prop: "classAlias",
            slot: true,
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    //升班
    upClass() {
      this.axios({
        url: "/api/blade-food/class/upClass",
        method: "get",
        params: {
          currentDate: this.currentDate,
        },
      }).then((res) => {
        this.$message({
          message: "升班成功",
          type: "sucess",
        });
      });
    },
    //撤销上次升班
    cancelUpClass() {
      this.axios({
        url: "/api/blade-food/class/cancelUpClass",
        method: "get",
      }).then((res) => {
        this.$message({
          message: "撤销上次升班成功",
          type: "sucess",
        });
      });
    },
    //查询升班班级
    selUpClass(page) {
      console.log(page);
      this.axios({
        url: "/api/blade-food/class/list",
        method: "get",
        params: {
          current: page.currentPage,
          size: page.pageSize,
        },
      }).then((res) => {
        this.upClassData = res.data.data.records;
        this.page.total = res.data.data.total;
        //         page: {
        //   pageSize: 20,
        //   pagerCount: 5,
        // },
      });
    },
  },
};
</script>
