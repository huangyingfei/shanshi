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
      <!-- <el-date-picker
        size="small"
        v-model="wupload.getDate"
        type="date"
        placeholder="选择日期"
        style="width:200px;"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></el-date-picker> -->
      <el-date-picker
        v-model="wupload.getDate"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <!-- <span style="margin-right: 10px;margin-left: 25px;">人群名称:</span>
      <el-select v-model="wupload.block" placeholder="请选择">
        <el-option
          size="mini"
          style="width:250px"
          v-for="item in keydown"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
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
      <span style=" margin-right: 10px;margin-left: 25px;">收藏食谱:</span>
      <el-select
        style="width:200px;"
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
      <span style="margin-left: 25px; margin-right: 10px;">分享食谱:</span>
      <el-select
        style="width:200px;"
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
      <span style="margin-left: 25px; margin-right: 15px;">公示食谱:</span>

      <el-select
        style="width:200px;"
        @change="titlesearch"
        v-model="blicity"
        placeholder="请选择"
      >
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
          prop="recipeDay"
          label="食谱周期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="peopleName"
          label="人群名称"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="avgAge"
          label="平均年龄"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="评分"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="proportion"
          label="男女比例"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="orgName"
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
            <el-button type="text" size="small" @click="protocol(scope.row)"
              >查看</el-button
            >
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
    <el-dialog
      title="查看"
      append-to-body
      width="80%"
      :visible.sync="dateTime"
      :close-on-click-modal="false"
    >
      <toolbar ref="toolb"></toolbar>
    </el-dialog>
  </div>
</template>

<script>
import toolbar from "../PublicLicense/sharing";

export default {
  components: {
    toolbar
  },
  data() {
    return {
      loadFlag: false, //加载flag
      dateTime: false, //弹框
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
          label: "分享到平台"
        }
      ],
      publicity: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "已公示"
        },
        {
          value: "0",
          label: "未公示"
        }
      ],
      blicity: "",

      callback: "",
      modeforms: [], //表格数据
      keydown: [],
      radio: 3,
      timezone: "",
      timezone1: ""
    };
  },
  beforeMount() {
    this.generator();
  },
  methods: {
    //查看
    protocol(row) {
      console.log(row);
      this.dateTime = true;
      let term = row.id;
      this.$nextTick(() => {
        this.$refs.toolb.overview(term);
      });
    },
    //编辑
    seecol(row) {
      this.$router.push({
        path: "./meals",
        query: { userid: row.id }
      });
    },
    //删除删除
    remove(row) {
      this.$confirm("确认删除该食谱？", "提示", {
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
      // console.log(this.wupload.input);
      // if (this.wupload.getDate) {
      //   this.timezone = this.wupload.getDate;
      // } else {
      //   this.timezone = "";
      // }
      console.log(this.wupload.getDate);
      if (this.wupload.getDate) {
        this.timezone = this.wupload.getDate[0];
        console.log(this.timezone);
        this.timezone1 = this.wupload.getDate[1];
        console.log(this.timezone1);
      } else {
        this.timezone = "";
        this.timezone1 = "";
      }
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
      this.timezone1 = "";
      // this.wupload.block = "";
      this.timezone = "";
      this.generator();
    },
    //获取列表
    generator() {
      // &createTime=${this.wupload.getDate}
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/recipe/page?size=${this.m_page.size}&current=${this.m_page.number}&ascs=id&searchType=2&recipeName=${this.wupload.input}&isUse=${this.empty}&isPub=${this.callback}&isBoard=${this.blicity}&createTimeStr=${this.timezone}&createTimeStrEnd=
${this.timezone1}`,
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
.unsaved {
  width: 100%;
  /* height: 700px; */
  height: 100%;
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
  margin-bottom: 50px;
}
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  background-color: #fff;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 60px;
}
</style>
