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
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
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
      <span style=" margin-right: 10px;">收藏食谱</span>
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
          label="人群名称"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="avgAge"
          label="平均年龄"
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
            <el-button type="text" size="small" @click="seecol(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="create(scope.row)"
              >删除</el-button
            >
            <el-button type="text" size="small" v-if="scope.row.isPub == 1"
              >收藏</el-button
            >
            <el-button type="text" size="small" v-if="scope.row.isPub == 0"
              >不收藏</el-button
            >
            <el-button type="text" size="small">复制</el-button>
            <el-button type="text" size="small">公示</el-button>
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
        size: 20,
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
  methods: {
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
    //获取列表
    generator() {
      // &createTime=${this.wupload.getDate}
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/recipe/page?size=${this.m_page.size}&current=1&ascs=id&searchType=0&recipeName=${this.wupload.input}&isUse=${this.empty}&isPub=${this.callback}&isBoard=${this.blicity}`,
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
</style>
