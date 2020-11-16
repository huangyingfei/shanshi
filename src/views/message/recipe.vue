<template>
  <div class="unsaved">
    <div class="header">
      <span style=" margin-right: 10px;">关键字:</span>
      <el-input
        style="width:200px;"
        size="small"
        v-model="keyword.input"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 15px;">提交日期:</span>
      <el-date-picker
        size="small"
        v-model="keyword.getDate"
        type="date"
        placeholder="选择日期"
        style="width:200px"
      ></el-date-picker>
      <span style="margin-right: 10px;margin-left: 15px;">所属区域:</span>
      <el-select v-model="keyword.value" placeholder="请选择">
        <el-option
          size="mini"
          v-for="item in dirname"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span style="margin-right: 10px;margin-left: 15px;">机构类型:</span>
      <el-select v-model="keyword.block" placeholder="请选择">
        <el-option
          size="mini"
          v-for="item in keydown"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="key_end">
      <el-radio v-model="keyword.radio" label="1">全部</el-radio>
      <el-radio v-model="keyword.radio" label="2">已收藏食谱</el-radio>
      <el-radio v-model="keyword.radio" label="3">推荐食谱</el-radio>
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        style=" margin-left: 20px; margin-top: 20px; "
        >搜索</el-button
      >
      <el-button
        size="small"
        icon="el-icon-delete"
        type="primary"
        style=" margin-left: 20px; margin-top: 20px; "
        >清空</el-button
      >
    </div>

    <div class="inform">
      <el-table
        :data="modeforms"
        border
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
          prop="name"
          label="食谱名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dishTypeName"
          label="食谱周期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createName"
          label="平均年龄"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="机构类型"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="分享来源"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="创建机构"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-view"
              type="text"
              size="small"
              @click="seecol(scope.row)"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="create(scope.row)"
              >收藏</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: {
        input: "",
        getDate: "",
        value: "", //所属区域
        block: "", //机构类型
        radio: "" //全部 已收藏 推荐
      },
      modeforms: [
        {
          name: "王小虎"
        }
      ], //表格数据
      dirname: [
        //审核状态
        {
          value: "0",
          label: "全国"
        }
      ],
      keydown: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "0",
          label: "学校"
        },
        {
          value: "0",
          label: "医院"
        },
        {
          value: "0",
          label: "餐饮"
        }
      ]
    };
  }
  // mounted() {
  //   console.log(this.$route.query.userid);
  // }
};
</script>

<style scoped>
.unsaved {
  width: 100%;
  height: 700px;
  background-color: #fff;
}

.header {
  width: 100%;
  height: 53px;
  /* background-color: red; */
  font-size: 13px;
  padding-top: 20px;
}
.key_end {
  width: 100%;
  height: 53px;
  font-size: 13px;
}
.inform {
  width: 100%;
  margin-top: 30px;
}
</style>
