<template>
  <div class="Energy">
    <div class="sourceof">
      <el-button
        size="medium"
        icon="el-icon-circle-plus-outline"
        type="primary"
        @click="xsource"
        >新增</el-button
      >
    </div>
    <div class="facts">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%;"
        v-loading="loadFlag"
        :element-loading-text="page_data.loadTxt"
        empty-text="没有数据~"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="标准名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="isDef"
          label="是否默认标准"
          width="180px"
          align="center"
        >
          <template slot-scope="props">{{
            props.row.isDef !== 1 ? "是" : "否"
          }}</template>
        </el-table-column>

        <!--操作格-->
        <el-table-column label="操作" align="center" width="260">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              style=" margin-left: 20px;"
              @click="modify(scope.row)"
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
      <div class="pagingClass">
        <el-pagination
          :page-sizes="m_page.sizes"
          :page-size="m_page.size"
          :current-page="m_page.number"
          @size-change="m_handleSizeChange"
          @current-change="m_handlePageChange"
          :total="m_page.totalElements"
          background
          layout="total,sizes,prev, pager, next"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // tableData: [
      //   {
      //     date: "1",
      //     name: "2012年（卫生部标准）",
      //     address: "是"
      //   }
      // ]
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      currPage: 1,
      page_data: {
        loadTxt: "请求列表中"
      },
      loadFlag: false // 加载flag
    };
  },
  beforeMount() {
    this.subset();
  },
  methods: {
    xsource() {
      this.$router.replace("./addsource");
    },
    //编辑
    modify(row) {
      let design = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/powersetting/getPowNutById` + design, {})
        .then(res => {
          // console.log(res);
          this.fdefun = res.data.data;
          console.log(this.fdefun);
          this.$router.push({
            path: "./addsource",
            query: { userid: this.fdefun }
          });
        });
    },
    //删除
    DeleteUser(row) {
      this.$confirm("确认删除该来源比例?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let addid = `?ids=${row.id}`;
          this.$axios
            .post(`api/blade-food/powersetting/removePowNut` + addid, {})
            .then(res => {
              console.log(res);
              this.$message.success("删除成功");
              this.subset();
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
    subset() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/powersetting/list?current=${this.m_page.number}&size=${this.m_page.size}`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
          console.log(this.m_page.totalElements);
          console.log(this.tableData);
          this.loadFlag = false;
        });
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.subset();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.subset();
    },
    indexMethod(index) {
      return index * 2;
    }
  }
};
</script>

<style scoped>
.Energy {
  width: 100%;
  height: 700px;
  background-color: #fff;
}
.sourceof {
  width: 100%;
}
.pagingClass {
  /* width: 500px; */
  height: 100px;
  /* background-color: red; */
  text-align: right;
  /* margin: 20px 0; */
  margin-top: 20px;
  margin-right: 40px;
  margin-bottom: 40px;
}
</style>
