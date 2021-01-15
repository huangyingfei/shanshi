<template>
  <div class="comment">
    <basic-container :block="true">
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="commentData"
        @search-change="searchChange"
        :page.sync="page"
        @on-load="onLoad"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { dateFormat } from "@/util/date";

export default {
  data() {
    return {
      commentData: [],
      search: {},
      page: {
        pageSize: 20,
        pagerCount: 5,
      },
      option: {
        index: true,
        menu: false,
        addBtn: false,
        searchMenuSpan: 6,
        indexLabel: "序号",
        size: "medium",
        column: [
          {
            label: "时间",
            prop: "createTime",
            type: "datetime",
            searchSpan: 12,
            searchRange: true,
            search: true,
          },
          {
            label: "菜谱名称",
            prop: "recipeName",
          },
          {
            label: "学生名",
            prop: "stuName",
          },

          {
            label: "学生班级",
            prop: "className",
          },
          {
            label: "评分",
            prop: "recStar",
          },
          {
            label: "评论",
            prop: "remark",
          },
        ],
      },
    };
  },
  methods: {
    searchChange(params, done) {
      console.log(this.search);
      done();

      this.onLoad();
    },
    onLoad(page) {
      this.loading = true;
      console.log(this.search);
      console.log(this.page);
      var params = {
        current: this.page.currentPage,
        size: this.page.pageSize,
      };

      if (this.search.createTime) {
        params.startTimeStr = dateFormat(this.search.createTime[0]);
        params.endTimeStr = dateFormat(this.search.createTime[1]);
      }
      this.axios({
        url: "/api/blade-food/recipecomment/list",
        method: "get",
        params,
      }).then((res) => {
        this.loading = false;
        this.commentData = res.data.data.records;
        this.page.total = res.data.data.total;
      });
    },
  },
};
</script>

<style scoped>
.comment {
  height: 100%;
  position: absolute;
}
</style>