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

      <el-button
        @click="searchStr"
        size="small"
        icon="el-icon-search"
        type="primary"
        style=" margin-left: 20px; margin-top: 20px; "
        >搜索</el-button
      >
      <el-button
        @click="notEmpty"
        size="small"
        icon="el-icon-delete"
        type="primary"
        style=" margin-left: 20px; margin-top: 20px; "
        >清空</el-button
      >
    </div>
    <div class="prepall">
      <span style=" margin-right: 10px;margin-left: 25px;">收藏食谱</span>
      <el-select
        @change="collection"
        v-model="empty"
        placeholder="请选择收藏食谱"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-left: 25px; margin-right: 15px;">分享食谱</span>
      <el-select
        @change="geospatial"
        v-model="callback"
        placeholder="请选择分享食谱"
      >
        <el-option
          v-for="item in shared"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-left: 25px; margin-right: 15px;">公示食谱</span>
      <el-select @change="titlesearch" v-model="blicity" placeholder="请选择">
        <el-option
          v-for="item in publicity"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="inform">
      <el-table
        :data="modeforms"
        border
        :element-loading-text="page_data.loadTxt"
        v-loading="loadFlag"
        :height="tableHeight"
        ref="table"
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
          width="250"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="recipeDay"
          label="食谱周期"
          align="center"
          width="80"
        ></el-table-column>

        <el-table-column
          prop="avgAge"
          label="平均年龄"
          align="center"
          width="80"
        ></el-table-column>

        <el-table-column
          prop="proportion"
          label="男女比例"
          align="center"
          width="100"
        ></el-table-column>

        <el-table-column
          prop="orgName"
          label="创建人"
          align="center"
          width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="seecol(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
            <el-button
              type="text"
              @click="handleto(scope.row)"
              size="small"
              v-if="scope.row.isUse == 0"
              >收藏</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="costofhand(scope.row)"
              v-if="scope.row.isUse == 1"
              >不收藏</el-button
            >
            <!-- <el-button type="text" size="small">复制</el-button> -->
            <el-button
              @click="getPublicDomain(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.isBoard == 0"
              >公示</el-button
            >
            <el-button
              @click="setPublicDomain(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.isBoard == 1"
              >不公示</el-button
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
      tableHeight: 50,
      loadFlag: false, //加载flag
      page_data: {
        loadTxt: "请求列表中"
      },
      wupload: {
        input: "",
        getDate: "", //选择日期
        block: ""
      },
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },

      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "不收藏"
        },
        {
          value: "1",
          label: "收藏"
        }
      ],
      empty: "",
      shared: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "不分享到平台"
        },
        {
          value: "0",
          label: "分享到平台食谱"
        }
      ],
      publicity: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "已公示食谱"
        },
        {
          value: "0",
          label: "未公示食谱"
        }
      ],
      blicity: "",

      callback: "",
      modeforms: [], //表格数据
      keydown: [],
      radio: 3
    };
  },
  beforeMount() {
    this.generator();
  },
  mounted: function() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 140;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 140;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  methods: {
    //编辑
    seecol(row) {
      this.$router.push({
        path: "./teacher",
        query: { userid: row.id }
      });
    },
    //删除删除
    remove(row) {
      this.$confirm("确认删除该食材?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(`api/blade-food/recipe/remove?ids=${row.id}`, {})
            .then(res => {
              this.$message.success("删除成功");
              this.generator();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //收藏
    handleto(row) {
      console.log(row);
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
    //公示
    getPublicDomain(row) {
      let params = `?id=${row.id}&isBoard=${1}`;
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
    //不公示
    setPublicDomain(row) {
      let params = `?id=${row.id}&isBoard=${0}`;
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
    //搜索
    searchStr() {
      // console.log(this.wupload.input);
      console.log(this.wupload.getDate);
      this.generator();
    },
    //收藏
    collection() {
      console.log(this.empty);
      this.generator();
    },
    //分享到平台
    geospatial() {
      console.log(this.callback);
      this.generator();
    },
    //公示
    titlesearch() {
      console.log(this.blicity);
      this.generator();
    },
    //清空
    notEmpty() {
      this.wupload.input = "";
      this.wupload.getDate = "";
      this.wupload.block = "";
    },
    //获取列表
    generator() {
      // &createTime=${this.wupload.getDate}
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/recipe/selectTeacherPage?size=${this.m_page.size}&current=${this.m_page.number}&ascs=id&searchType=2&recipeName=${this.wupload.input}&isUse=${this.empty}&isPub=${this.callback}&isBoard=${this.blicity}`,
          {}
        )
        .then(res => {
          this.loadFlag = false;
          // console.log(res);
          this.modeforms = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
        });
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
/* .avue-view {
  padding: 0 0px !important;
} */
.unsaved {
  width: 101%;
  /* height: 700px; */
  height: 100%;
  margin-left: -10px;
  background-color: #fff;
}

.header {
  width: 100%;
  height: 55px;
  /* background-color: red; */
  font-size: 13px;
  padding-top: 10px;
}
.prepall {
  font-size: 13px;
  width: 100%;
  height: 50px;
  margin-top: 25px;
}
.inform {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
