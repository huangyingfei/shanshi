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
        @click="searchterm"
        size="small"
        icon="el-icon-search"
        type="primary"
        style=" margin-left: 20px; margin-top: 20px; "
        >搜索</el-button
      >
      <el-button
        @click="emptyset"
        size="small"
        icon="el-icon-delete"
        type="primary"
        style=" margin-left: 20px; margin-top: 20px; "
        >清空</el-button
      >
    </div>
    <!-- 查看 -->
    <el-dialog
      title="食材"
      width="50%"
      append-to-body
      :visible.sync="dateTime"
      :close-on-click-modal="false"
    >
      <div>
        <!-- <foods-week :headers="headers" :datas="datas" days="5"> </foods-week> -->
        123213213
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dateTime = false">取 消</el-button>
        <el-button @click="setlist('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <div class="inform">
      <el-table
        :data="modeforms"
        :element-loading-text="page_data.loadTxt"
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
          prop="avgAge"
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
          prop="orgName"
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
            <el-button
              type="text"
              v-if="scope.row.isUse == 0"
              size="small"
              @click="handleto(scope.row)"
              >收藏</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="costofhand(scope.row)"
              v-if="scope.row.isUse == 1"
              >不收藏</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagingClass">
        <el-pagination
          :page-sizes="m_page.sizes"
          :page-size="m_page.size"
          :current-page="m_page.number"
          @size-change="m_handleSizeChange"
          @current-change="m_handlePageChange"
          layout="total,sizes,prev, pager, next"
          background
          :total="m_page.totalElements"
        ></el-pagination>
      </div>
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
      dateTime: false,
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 20,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },

      modeforms: [], //表格数据
      page_data: {
        loadTxt: "请求列表中"
      },
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
  },
  // mounted() {
  //   console.log(this.$route.query.userid);
  // }
  beforeMount() {
    this.generator();
  },
  methods: {
    //不收藏
    costofhand(row) {
      let params = `?id=${row.id}&isUse=${0}`;
      this.$axios
        .get(`api/blade-food/recipe/changeInfo${params}`, {})
        .then(res => {
          // console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.generator();
        });
    },
    //收藏
    handleto(row) {
      let params = `?id=${row.id}&isUse=${1}`;
      this.$axios
        .get(`api/blade-food/recipe/changeInfo${params}`, {})
        .then(res => {
          // console.log(res);
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.generator();
        });
    },
    //获取表格
    generator() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/recipe/openRecipeList?size=${this.m_page.size}&current=${this.m_page.number}`,
          {}
        )
        .then(res => {
          this.loadFlag = false;
          console.log(res);
          this.modeforms = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
        });
    },
    searchterm() {
      this.generator();
      console.log(this.keyword.input); //关键字
    },
    emptyset() {
      this.keyword.input = "";
      this.keyword.getDate = "";
      this.keyword.value = "";
      this.keyword.block = "";
      this.keyword.radio = "";
    },
    seecol() {
      this.dateTime = true;
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.generator();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.generator();
    }
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
  padding-top: 35px;
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
