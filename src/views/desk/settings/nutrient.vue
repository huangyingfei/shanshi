<template>
  <div class="nutrition">
    <div class>
      <el-button
        icon="el-icon-circle-plus-outline"
        type="primary"
        @click="added(1)"
        style="  margin: 30px;"
        >新增</el-button
      >
    </div>
    <div class="facts">
      <el-table
        :data="retorne"
        border
        v-loading="loadFlag"
        :element-loading-text="page_data.loadTxt"
        style="width: 100%;margin-bottom: 40px;"
        empty-text="没有数据~"
      >
        <!-- <el-table-column prop="date" label="序号" width="160" align="center"></el-table-column> -->
        <el-table-column
          prop="name"
          label="标准名称"
          align="center"
        ></el-table-column>
        <el-table-column prop="isDef" label="是否默认标准" align="center">
          <template slot-scope="props">{{
            props.row.isDef !== 1 ? "是" : "否"
          }}</template>
        </el-table-column>

        <!--操作格-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              style=" margin-left: 20px;"
              @click="Editor(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              style=" margin-left: 20px;"
              @click="DeleteUser(scope.row)"
              >删除</el-button
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
  name: "",
  data() {
    return {
      loadFlag: false, //加载flag
      retorne: [],
      Vector: "",
      m_page: {
        //分頁
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      page_data: {
        loadTxt: "请求列表中"
      }
    };
  },
  beforeMount() {
    this.getobtain();
  },
  methods: {
    added() {
      this.$router.replace("./addedmtp");
    },
    //編輯
    Editor(row) {
      let menu = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/nutritionsetting/getnutrSetCoeById` + menu, {})
        .then(res => {
          // console.log(res);
          this.Vector = res.data.data;
          console.log(this.Vector);
          this.$router.push({
            path: "./addedmtp",
            query: { userid: this.Vector }
          });
        });
    },
    //删除
    DeleteUser(row) {
      this.$confirm("确认删除该标准?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obtain = `?ids=${row.id}`;
          this.$axios
            .post(
              `api/blade-food/nutritionsetting/removeNutAndCoefById` + obtain,
              {}
            )
            .then(res => {
              console.log(res);
              this.$message.success("删除成功");
              this.getobtain();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获取数据
    getobtain() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/nutritionsetting/list?current=${this.m_page.number}&size=${this.m_page.size}`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          // console.log(res);
          this.retorne = res.data.data.records;
          this.loadFlag = false;
          this.m_page.totalElements = res.data.data.total;
        });
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.getobtain();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.getobtain();
    }
  }
};
</script>
<style scoped>
.nutrition {
  width: 100%;
  height: 1200px;
  background-color: #fff;
}
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  margin-top: 20px;
  margin-right: 40px;
}
</style>
