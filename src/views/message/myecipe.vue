<template>
  <div class="unsaved">
    <div class="header">
      <span style=" margin-right: 10px;">食谱名称:</span>
      <el-input
        style="width:200px;"
        size="small"
        v-model="wupload.input"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 25px;">选择日期:</span>
      <el-date-picker
        size="small"
        v-model="wupload.getDate"
        type="date"
        placeholder="选择日期"
        style="width:250px"
      ></el-date-picker>
      <span style="margin-right: 10px;margin-left: 25px;">人群名称:</span>
      <el-select v-model="wupload.block" placeholder="请选择">
        <el-option
          size="mini"
          style="width:250px"
          v-for="item in keydown"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
    <div class="prepall">
      <el-radio-group v-model="radio">
        <el-radio :label="3">全部</el-radio>
        <el-radio :label="4">已收藏食谱</el-radio>
        <el-radio :label="5">分享到组织食谱</el-radio>
        <el-radio :label="6">分享到平台食谱</el-radio>
        <el-radio :label="7">已公式食谱</el-radio>
        <el-radio :label="8">未公式食谱</el-radio>
      </el-radio-group>
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
          label="人均名称"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="平均年龄"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="男女比例"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="创建人"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="seecol(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="create(scope.row)"
              >删除</el-button
            >
            <el-button type="text" size="small">收藏</el-button>
            <el-button type="text" size="small">复制</el-button>
            <el-button type="text" size="small">公示</el-button>
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
      wupload: {
        input: "",
        getDate: "", //选择日期
        block: ""
      },
      modeforms: [
        {
          name: "王小虎"
        }
      ], //表格数据
      keydown: [],
      radio: 3
    };
  }
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
.prepall {
  width: 100%;
  height: 50px;
  margin-top: 25px;
}
.inform {
  width: 100%;
  margin-top: 30px;
}
</style>
