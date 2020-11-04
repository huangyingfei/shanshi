<template>
  <div class="management">
    <!-- <h2>分享食谱</h2> -->
    <!-- 左边 -->
    <div class="onchange">
      <div class="const">
        <el-button size="small" type="primary">添加子部门</el-button>
        <el-button size="small" type="primary">部门排序</el-button>
      </div>
      <div class="block">
        <p></p>
        <el-tree
          :data="data"
          node-key="id"
          :default-expand-all="false"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                查看
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="consults">
      <div class="header">
        <span style="margin-right: 10px">关键字:</span>
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 200px"
          size="small"
        ></el-input>
        <span style="margin-right: 10px; margin-left: 15px">职务:</span>
        <el-select
          style="width: 100px; height: 30px"
          v-model="callback"
          placeholder="请选择"
        >
          <el-option
            v-for="item in prompt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 100px"
          >
          </el-option>
        </el-select>
        <span style="margin-right: 10px; margin-left: 15px">当前状态:</span>
        <el-select
          style="width: 100px; height: 30px"
          v-model="driver"
          placeholder="请选择"
        >
          <el-option
            v-for="item in mState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 100px"
          >
          </el-option>
        </el-select>
        <span style="margin-right: 10px; margin-left: 15px">工号排序:</span>
        <el-select
          style="width: 100px; height: 30px"
          v-model="working"
          placeholder="请选择"
        >
          <el-option
            v-for="item in number"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 100px"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 添加员工弹框 -->
      <el-dialog
        title="添加员工"
        width="60%"
        append-to-body
        :visible.sync="dateTime"
        :close-on-click-modal="false"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :inline="true"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" style="width:350px">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
           <el-form-item label="性别" style="width:350px">
              <el-radio style="margin-left:30px" v-model="ruleForm.radio" label="1">男</el-radio>
  <el-radio v-model="ruleForm.radio" label="2">女</el-radio>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  @click="dateTime = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹框结束 -->
      <div class="network">
        <el-button
          style="margin-left: 20px"
          icon="el-icon-search"
          size="medium"
          type="primary"
          >搜索</el-button
        >
        <el-button style="margin-left: 20px" icon="el-icon-delete" size="medium"
          >清空</el-button
        >
        <el-button
          style="margin-left: 20px"
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="addition"
          >添加员工</el-button
        >
        <el-button
          icon="el-icon-download"
          style="margin-left: 20px"
          size="medium"
          type="primary"
          >导出</el-button
        >
      </div>
      <!-- 表格数据 -->
      <div class="address">
        <el-table
          v-loading="loadFlag1"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="工号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="foodName"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="foodName1"
            label="性别"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="出生原因"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="手机号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="职务"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="所在班级"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="所在班级"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="入职日期"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="当前状态"
            align="center"
          ></el-table-column>
          <!-- <el-table-column label="是否有效" width="120" align="center">
            <template slot-scope="scope">
              <p class="stop" v-if="scope.row.isActive == 0">是</p>
              <p style="color: #409eff" v-else-if="scope.row.isActive == 1">
                否
              </p>
            </template>
          </el-table-column> -->

          <!--操作格-->
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-button
                @click="editorTheme(scope.row, 2)"
                type="primary"
                size="small"
                icon="el-icon-edit"
                style="margin-left: 20px"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                style="margin-left: 20px"
                @click="DeleteUser(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
              },
              {
                id: 10,
                label: "三级 1-1-2",
              },
            ],
          },
        ],
      },
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      loadFlag: false, //加载flag
      loadFlag1: false, //加载flag
      dateTime: false, //弹框
       ruleForm: {
        name: "", //姓名
          radio: '1',//性别
        adding: "", //食材1
        adding1: "", //食材2
        desc: "",
        resource: ""

      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ],
      prompt: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
      callback: "", //职务搜索
      mState: [
        {
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "在职",
        },
        {
          value: "3",
          label: "离职",
        },
        {
          value: "4",
          label: "停职",
        },
        {
          value: "5",
          label: "退休",
        },
      ],
      driver: "", //当前状态
      number: [
        {
          value: "1",
          label: "升序",
        },
        {
          value: "2",
          label: "降序",
        },
      ],
      working: "",
    };
  },
  methods: {
    //添加员工弹框
    addition() {
      this.dateTime=true;
    },
  },
};
</script>

<style scoped>
.management {
  width: 100%;
  height: 700px;
  background-color: #fff;
  display: flex;
  margin-bottom: 40px;
}
.onchange {
  width: 24%;
  height: 700px;
  /* background-color: red; */
  border-right: 1px solid #e0e0e0;
}
.consults {
  width: 75%;
  height: 700px;
  /* background-color: yellow; */
  margin-left: 10px;
}
.const {
  width: 250px;
  height: 50px;

  margin-top: 15px;
  text-align: center;
  line-height: 50px;
}
.header {
  width: 98%;
  height: 50px;
  line-height: 50px;
  font-size: 13px;
  /* background-color: red; */
  margin-left: 10px;
  margin-top: 10px;
}
.network {
  width: 100%;
  height: 50px;
  /* background-color: yellow; */
  line-height: 50px;
}
</style>
