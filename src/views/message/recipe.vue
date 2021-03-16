<template>
  <div class="unsaved">
    <div class="header">
      <span style=" margin-right: 10px;">食谱名称:</span>
      <el-input
        style="width:200px;"
        size="small"
        v-model="keyword.input"
        placeholder="请输入内容"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 15px;">提交日期:</span>
      <el-date-picker
        v-model="keyword.getDate"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span style=" margin-right: 10px;margin-left:15px;">收藏食谱:</span>
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
      <!-- <span style="margin-right: 10px;margin-left: 15px;">机构类型:</span>
      <el-select v-model="keyword.block" placeholder="请选择">
        <el-option
          size="mini"
          v-for="item in keydown"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
    </div>
    <div class="key_end">
      <span style="margin-left: 0px; margin-right: 10px;">公示食谱:</span>

      <el-select style="width:200px;" v-model="blicity" placeholder="请选择">
        <el-option
          v-for="item in publicity"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
      title="食谱"
      width="80%"
      append-to-body
      :visible.sync="dateTime"
      :close-on-click-modal="false"
    >
      <toolbar ref="toolb"></toolbar>
      <!-- <el-table
        :data="recipeTableData"
        v-loading="loadFlag1"
        element-loading-text="拼命加载中"
        border
        style="width: 100%"
      >
        <el-table-column prop="mealsType" label="" width="100px">
        </el-table-column>
        <el-table-column prop="week1" label="周一"> </el-table-column>
        <el-table-column prop="week2" label="周二"> </el-table-column>
        <el-table-column prop="week3" label="周三"> </el-table-column>
        <el-table-column prop="week4" label="周四"> </el-table-column>
        <el-table-column prop="week5" label="周五"> </el-table-column>
        <el-table-column prop="week6" label="周六"> </el-table-column>
        <el-table-column prop="week7" label="周日"> </el-table-column>
      </el-table> -->
      <!-- <div slot="footer" class="dialog-footer" >
        <el-button @click="dateTime = false">取 消</el-button>
        <el-button @click="dateTime = false" type="primary">确 定</el-button>
      </div> -->
    </el-dialog>
    <div class="inform">
      <el-table
        :data="modeforms"
        :element-loading-text="page_data.loadTxt"
        border
        style="width: 100%"
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
          label="食谱天数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="avgAge"
          label="平均年龄"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="score"
          label="评分"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="mealTypes"
          label="餐别组合"
          align="center"
        ></el-table-column>
        <!-- <el-table-column label="机构类型" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orgType == 1">学校</el-tag>
            <el-tag v-else-if="scope.row.orgType == 2">医院</el-tag>
            <el-tag v-else-if="scope.row.orgType == 3">餐饮</el-tag>
            <el-tag v-else-if="scope.row.orgType == 4">其他</el-tag>
          </template>
        </el-table-column> -->

        <!-- <el-table-column
          prop=""
          label="分享来源"
          align="center"
        ></el-table-column> -->

        <el-table-column
          prop="orgName"
          label="分享机构"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="分享时间"
          align="center"
          width="200"
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
import toolbar from "../PublicLicense/sharing";
export default {
  components: {
    toolbar
  },
  data() {
    return {
      tableHeight: 50,
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
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },

      modeforms: [], //表格数据
      loadFlag: false,
      loadFlag1: false,
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
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "学校"
        },
        {
          value: "2",
          label: "医院"
        },
        {
          value: "3",
          label: "餐饮"
        },
        {
          value: "4",
          label: "其他"
        }
      ],
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
      publicity: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "推荐"
        },
        {
          value: "0",
          label: "不推荐"
        }
      ],
      blicity: "", //是否推荐
      empty: "",
      timezone: "",
      timezone1: "",
      foundStr: [],
      recipeTableData: []
    };
  },
  // mounted() {
  //   console.log(this.$route.query.userid);
  // }
  beforeMount() {
    this.generator();
  },
  mounted: function() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 110;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 110;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
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
      let urlParams = `?size=${this.m_page.size}&current=${this.m_page.number}&recipeName=${this.keyword.input}&createTimeStr=${this.timezone}&createTimeStrEnd=
${this.timezone1}&orgType=${this.keyword.block}&isUse=${this.empty}&isRecommend=${this.blicity}`;

      this.$axios
        .get(`api/blade-food/recipe/shareRecipeList` + urlParams)
        .then(res => {
          this.loadFlag = false;
          console.log(res);
          this.modeforms = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
        });
    },
    //搜索
    searchterm() {
      if (this.keyword.getDate) {
        this.timezone = this.keyword.getDate[0];
        console.log(this.timezone);
        this.timezone1 = this.keyword.getDate[1];
        console.log(this.timezone1);
      } else {
        this.timezone = "";
        this.timezone1 = "";
      }
      this.generator();
      console.log(this.keyword.input); //关键字
    },
    emptyset() {
      this.keyword.input = "";
      this.keyword.getDate = "";
      this.timezone1 = "";
      this.timezone = "";
      this.keyword.value = "";
      this.keyword.block = "";
      this.keyword.radio = "";
      this.empty = "";
      this.generator();
    },
    seecol(row) {
      console.log(row);
      this.dateTime = true;
      let term = row.id;
      this.$nextTick(() => {
        this.$refs.toolb.overview(term);
      });

      //       this.loadFlag1 = true;
      //       this.recipeTableData = [];
      //       this.$axios
      //         .get(`/api/blade-food/recipe/recipeDetail?id=${term}`, {})
      //         .then(res => {
      //           let recipeCycles = res.data.data.recipeCycles;
      //           console.log(recipeCycles);
      //           let recipeTableData1 = [];
      //           let recipeTableData = {
      //             mealsType1: [],
      //             mealsType2: [],
      //             mealsType3: [],
      //             mealsType4: [],
      //             mealsType5: [],
      //             mealsType6: []
      //           };
      //           for (let i in recipeCycles) {
      //             let mealsTypeNum = recipeCycles[i].mealsType;
      //             switch (mealsTypeNum) {
      //               case 1:
      //                 recipeTableData.mealsType1.push(recipeCycles[i]);
      //                 break;
      //               case 2:
      //                 recipeTableData.mealsType2.push(recipeCycles[i]);
      //                 break;
      //               case 3:
      //                 recipeTableData.mealsType3.push(recipeCycles[i]);
      //                 break;
      //               case 4:
      //                 recipeTableData.mealsType4.push(recipeCycles[i]);
      //                 break;
      //               case 5:
      //                 recipeTableData.mealsType5.push(recipeCycles[i]);
      //                 break;
      //               case 6:
      //                 recipeTableData.mealsType6.push(recipeCycles[i]);
      //                 break;
      //               default:
      //                 break;
      //             }
      //           }
      //           var mealsTypeObj = {
      //             mealsType1: "早餐",
      //             mealsType2: "早点",
      //             mealsType3: "午餐",
      //             mealsType4: "午点",
      //             mealsType5: "晚餐",
      //             mealsType6: "晚点"
      //           };
      //           for (let key in recipeTableData) {
      //             var weekData = {
      //               mealsType: mealsTypeObj[key],
      //               week1: "",
      //               week2: "",
      //               week3: "",
      //               week4: "",
      //               week5: "",
      //               week6: "",
      //               week7: ""
      //             };
      //
      //             if (recipeTableData[key].length > 0) {
      //               for (
      //                 let index = 0;
      //                 index < recipeTableData[key].length;
      //                 index++
      //               ) {
      //                 var weekNum = "week" + recipeTableData[key][index].week;
      //
      //                 // weekData[weekNum].push(recipeTableData[key][index].recipeConncts[0].dishName)
      //                 recipeTableData[key][index].recipeConncts.forEach(element => {
      //                   weekData[weekNum] += element.dishName + "\n";
      //                 });
      //               }
      //               console.log(weekData);
      //               recipeTableData1.push(weekData);
      //             }
      //           }
      //           this.recipeTableData = recipeTableData1;
      //           this.loadFlag1 = false;
      //         });
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
  height: 100%;
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
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  background-color: #fff;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 40px;
}
</style>
