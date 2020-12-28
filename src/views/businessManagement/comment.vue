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
        <template slot="search" slot-scope="{ row, size }">
          <label style="line-height: 32px; padding-right: 12px">关键字：</label>
          <el-input
            placeholder="请输入微信名、微信号、手机号"
            :size="size"
            style="width: 220px"
            v-model="search.weChat"
          ></el-input>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { formateDate } from "@/api/tool/date";

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
        column: [
          {
            label: "时间",
            prop: "date",
            type: "datetime",
            searchSpan: 12,
            searchRange: true,
            search: true,
          },
          {
            label: "微信名",
            prop: "name",
          },
          {
            label: "微信号",
            prop: "name",
          },
          {
            label: "手机号",
            prop: "name",
          },
          {
            label: "评分",
            prop: "name",
          },
          {
            label: "评论",
            prop: "name",
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
      if (this.search.data) {
        params.startTimeStr = formateDate(this.search.data[0]);
        params.endTimeStr = formateDate(this.search.data[1]);
      }
      if (this.search.weChat) {
        params.weChat = this.search.weChat;
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