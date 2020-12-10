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
          prop="recipeDay"
          label="食谱周期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="提交人"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="提交时间"
          align="center"
        ></el-table-column>

        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.status == 0">待审核</el-tag>
            <el-tag v-else-if="scope.row.status == 3">无需审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status == 1"
              >审核通过</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.status == 2"
              >审核不通过</el-tag
            >
          </template>
        </el-table-column>
        <!--操作格-->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="overview(scope.row)"
              >查看</el-button
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
      <el-dialog
        title="食材"
        append-to-body
        width="80%"
        :visible.sync="dateTime"
        :close-on-click-modal="false"
      >
        <el-row :gutter="20">
          <el-col :span="8">食谱名称：{{ dialogListData.recipeName }}</el-col>
          <el-col :span="8">食谱周期：{{ dialogListData.recipeDay }}</el-col>
          <el-col :span="8"
            >收藏：{{ dialogListData.isUse == 1 ? "已收藏" : "未收藏" }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">创建机构：{{ dialogListData.orgName }}</el-col>
          <el-col :span="8">创建人：{{ dialogListData.createName }}</el-col>
          <el-col :span="8">创建时间：{{ dialogListData.createTime }}</el-col>
        </el-row>
        <toolbar ref="toolbar"></toolbar>
      </el-dialog>
    </div>
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
      transmitData: "123",
      dateTime: false, //弹框
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
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      recipeTableData: [], //弹窗
      dialogListData: {
        recipeName: "",
        recipeDay: "",
        isUse: "",
        orgName: "",
        createName: "",
        createTime: ""
      },

      dirname: [
        //审核状态
        {
          value: "",
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
          value: "0",
          label: "待审核"
        },
        {
          value: "3",
          label: "已取消"
        }
      ],
      timezone: ""
    };
  },
  beforeMount() {
    this.getforms();
  },
  methods: {
    indexMethod(index) {
      let _tableLineHead = ["早餐", "早点", "午餐", "午点", "晚餐", "晚点"];
      return _tableLineHead[index];
    },
    //查看
    overview(row) {
      console.log(row);
      this.dialogListData = row;
      let term = row.id;
      this.dateTime = true;
      this.$nextTick(() => {
        this.$refs.toolbar.overview(term);
      });
    },
    //清空
    notEmpty() {
      this.wupload.input = ""; //食谱名称
      this.wupload.block = ""; //审核状态
      this.wupload.submit = ""; //提交人
      this.wupload.getDate = ""; //选择日期
      this.timezone = "";
      this.getforms();
    },
    //搜索
    searchStr() {
      // this.dateTime = true;
      if (this.wupload.getDate) {
        this.timezone = this.wupload.getDate;
      } else {
        this.timezone = "";
      }
      this.getforms();
    },
    //获取表格数据
    getforms() {
      // &status=${this.wupload.block}
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/recipe/openRecipeList?size=${this.m_page.size}&current=${this.m_page.number}&recipeName=${this.wupload.input}&status=${this.wupload.block}&orgName=${this.wupload.submit}$createTimeStr=${this.timezone}`,
          {}
        )
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.modeforms = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
          console.log(this.modeforms);
        });
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
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  background-color: #fff;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 60px;
}
</style>
