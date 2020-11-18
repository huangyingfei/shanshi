<template>
  <div class="unsaved">
    <div class="header">
      <span style=" margin-right: 10px;margin-left: 25px;">食谱名称:</span>
      <el-input
        style="width:200px;"
        size="small"
        v-model="wupload.input"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 15px;">审核状态:</span>
      <el-select v-model="wupload.block" placeholder="请选择">
        <el-option
          size="mini"
          v-for="item in dirname"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-right: 10px;margin-left: 15px;">提交人:</span>
      <el-input
        size="small"
        v-model="wupload.submit"
        placeholder="请输入内容"
        style="width:200px;    height: 30px;"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 25px;">选择日期:</span>
      <el-date-picker
        size="small"
        v-model="wupload.getDate"
        type="date"
        placeholder="选择日期"
        style="width:200px;"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>
    <div class="rounded">
      <el-button
        @click="searchStr"
        size="small"
        icon="el-icon-search"
        type="primary"
        style=" margin-left: 20px;"
        >搜索</el-button
      >
      <el-button
        @click="notEmpty"
        size="small"
        icon="el-icon-delete"
        type="primary"
        style=" margin-left: 20px; "
        >清空</el-button
      >
    </div>

    <div class="bootstrap">
      <el-table
        :data="modeforms"
        border
        :element-loading-text="page_data.loadTxt"
        style="width: 100%"
        v-loading="loadFlag"
        empty-text="没有数据~"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="recipeName"
          label="食谱名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="食谱周期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="peopleName"
          label="提交人"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="avgAge"
          label="提交时间"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="proportion"
          label="审批状态"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <el-button type="text" size="small" @click="seecol(scope.row)"
            >查看</el-button
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadFlag: false, //加载flag
      page_data: {
        loadTxt: "请求列表中"
      },
      modeforms: [], //表格数据
      wupload: {
        input: "", //食谱名称

        block: "", //审批状态
        submit: "", //提交人
        getDate: "" //提交日期
      },
      dirname: [
        //审核状态
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核不通过"
        },
        {
          value: "3",
          label: "待审批"
        },
        {
          value: "4",
          label: "已取消"
        }
      ]
    };
  },
  methods: {
    //清空
    notEmpty() {
      this.wupload.input = ""; //食谱名称
      this.wupload.block = ""; //审核状态
      this.wupload.submit = ""; //提交人
      this.wupload.getDate = ""; //选择日期
    }
  }
};
</script>

<style scoped>
.unsaved {
  width: 100%;
  /* height: 700px; */
  height: 100%;
  background-color: #fff;
}

.header {
  width: 100%;
  height: 45px;
  /* background-color: yellow; */
  font-size: 13px;
  padding-top: 20px;
}
.rounded {
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* background-color: red; */
}
.bootstrap {
  width: 100%;
  height: 100%;
}
</style>
