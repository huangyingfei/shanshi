<template>
  <div>
    <div class="dients">
      <!-- <h2>已申请分享平台的食材</h2> -->
      <div class="header">
        <span style=" margin-right: 10px;">菜品名称:</span>
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width:190px;"
          size="small"
        ></el-input>
        <span style="margin-right: 10px;margin-left: 15px;">审核状态:</span>
        <el-select v-model="value" placeholder="请选择">
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
          v-model="editor"
          placeholder="请输入内容"
          style="width:190px;    height: 30px;"
        ></el-input>
        <span style="margin-right: 10px;margin-left: 15px;">提交日期:</span>
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          size="small"
          v-model="getDate"
          type="date"
          placeholder="选择日期"
          style="width:180px"
        ></el-date-picker>
        <div>
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
      </div>
      <!-- 审核表格 -->
      <div class="navbar">
        <el-table
          :data="tmquery"
          border
          style="width: 99%;margin-left:5px"
          max-height="tableHeight"
          :element-loading-text="page_data.loadTxt"
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
            prop="dishName"
            label="菜品名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dishTypeName"
            label="分类"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createName"
            label="提交人"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="createTime"
            label="提交时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="updateTime"
            label="分享时间"
            align="center"
          ></el-table-column>
          <el-table-column label="审核状态" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status == 0">待审核</el-tag>
              <el-tag v-else-if="scope.row.status == 3">无需审核</el-tag>
              <el-tag type="success" v-else-if="scope.row.status == 1"
                >审核通过</el-tag
              >
              <el-tag type="warning" v-else-if="scope.row.status == 2"
                >审核不通过</el-tag
              >
              <!-- <p class="stop" v-if="scope.row.status == 0">待审核</p>
            <p style="color:#409eff" v-else-if="scope.row.status == 3">
              无需审核
            </p>
            <p style="color:#67c23a" v-else-if="scope.row.status == 1">
              审核通过
            </p>
            <p style="color:#e6a23c" v-else-if="scope.row.status == 2">
              审核不通过
            </p> -->
            </template>
          </el-table-column>
          <!--操作格-->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-view"
                size="small"
                @click="seecol(scope.row)"
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
      </div>
      <!-- 查看 -->
      <el-dialog
        style="margin-top: 10px!important;"
        title="查看菜品"
        width="90%"
        append-to-body
        :visible.sync="seekeys"
        :close-on-click-modal="false"
      >
        <div class="rights">
          <div class=""></div>
          <div class="mationtxt">菜品信息</div>
          <div class="mationinput">
            <el-form
              :model="ruleForm"
              :rules="rules"
              :inline="true"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="菜品名字" prop="name" style="width: 350px">
                <!-- <el-input style="width: 200px" v-model="ruleForm.name"></el-input> -->
                <span>{{ ruleForm1.name }}</span>
              </el-form-item>
              <el-form-item
                label="菜品分类"
                prop="fooddata"
                style="width: 350px"
              >
                <el-select
                  :disabled="true"
                  style="width: 200px"
                  v-model="ruleForm1.fooddata"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in foodPos"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属区域" style="width: 350px">
                <el-cascader
                  :disabled="true"
                  style="width: 200px"
                  v-model="valuepark"
                  placeholder="请选择省市区"
                  :options="options"
                  :props="{ multiple: true, checkStrictly: true }"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>

              <el-form-item label="所属季节" style="width: 350px">
                <el-select
                  :disabled="true"
                  v-model="value1"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    style="width: 200px"
                    v-for="item in before"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="特点" style="width: 350px">
                <span>{{ ruleForm1.region }}</span>
              </el-form-item>

              <el-form-item label="做法" style="width: 350px">
                <span>{{ ruleForm1.desc }}</span>
              </el-form-item>
              <el-form-item label="图片" style="width: 350px">
                <img
                  v-if="this.rectangle != ''"
                  style="width:150px;height:150px"
                  :src="this.rectangle"
                  alt=""
                />
                <!-- <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog> -->
              </el-form-item>
              <!-- <el-form-item label="常用" style="">
                <el-switch v-model="ruleForm1.delivery1"></el-switch>
              </el-form-item> -->
              <el-switch
                style="margin-left:45px"
                v-model="ruleForm1.delivery1"
                active-text="常用"
                inactive-text="不常用"
              >
              </el-switch>
            </el-form>
          </div>
          <!-- 菜品所含食材信息 -->
          <div class="mationtxt">菜品所含食材信息</div>
          <div>
            <!-- <el-button @click="addLine">添加行数</el-button>
            <el-button @click="save">保存</el-button> -->
            <el-table
              :data="officeonce"
              border
              show-summary
              v-loading="loadFlag1"
              style="width: 70%"
              :summary-method="getSummaries"
            >
              <el-table-column
                v-if="show"
                prop="id"
                label="序号"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                v-if="show"
                prop="frame"
                label="分类ID "
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column label="食品名称" width="190" align="center">
                <template slot-scope="scope">
                  <el-input
                    style="width: 90px"
                    v-model="scope.row.name"
                    :disabled="true"
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="食品分类"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stats"
                label="用量(g)"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="true"
                    style="width: 90px"
                    @blur="graph"
                    @input="hello(scope.row, scope.$index)"
                    v-model="scope.row.stats"
                    clearable
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="spring"
                label="能量"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="malloc"
                label="能量(kcal)"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- {{scope.row.malloc}} -->
                  <!-- <span v-if="!scope.row.stats">{{ scope.row.malloc }}</span>
              <span v-else>{{
                (scope.row.stats / 100) * scope.row.malloc
              }}</span> -->
                  <el-input
                    :disabled="true"
                    style="width: 90px"
                    v-model="scope.row.malloc"
                    clearable
                  >
                  </el-input>
                </template>
              </el-table-column>

              <!--操作格-->
            </el-table>
          </div>
          <!-- 菜品营养素信息 -->
          <div class="mationtxt">菜品营养素信息</div>
          <div class="saveas">
            <el-table
              :data="mailto"
              max-height="400"
              style="width: 60%; margin-bottom: 20px"
              row-key="id"
              v-loading="loadFlag"
              :default-expand-all="true"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column
                prop="title"
                label="营养素"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                width="180"
                align="center"
              ></el-table-column>

              <el-table-column label="含量" align="center">
                <template slot-scope="scope">
                  <el-input
                    :disabled="true"
                    v-model="scope.row.result"
                    type="text"
                    v-if="scope.row.level != 1 ? true : false"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
                <!-- v-if="scope.row.dients" -->
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class="worm1">记录</div>
          <el-timeline>
            <el-timeline-item
              :timestamp="this.record.aduitTime"
              placement="top"
            >
              <el-card>
                <p style="  font-size: 9px; color: #cccc;">
                  {{ this.record.aduitTime }}
                </p>
                <p>
                  拒绝理由：<span>{{ this.record.refuseReason }}</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline> -->
        </div>
        <div slot="footer" class="dialog-footer">
          <div class="cancellation">
            <el-button @click="seekeys = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 0,
      seekeys: false, //查看弹框
      loadFlag: false, //加载flag
      tmquery: [], //表格
      ruleForm1: {
        name: "", //菜品名字
        fooddata: "", //菜品分类
        region: "", //特点
        desc: "", //做法
        delivery: false, //公开
        delivery1: false //常用
      },
      mailto: [], //营养素含量
      active: [], //季节
      valuepark: [], //省市区

      input: "", //菜品名称
      value: "", //审批状态
      editor: "", //提交人
      getDate: "", //提交日期
      rectangle: "",
      //季节查询
      value1: [], //所属季节
      page_data: {
        loadTxt: "请求列表中"
      },
      m_page: {
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      before: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "春季"
        },
        {
          value: "2",
          label: "夏季"
        },
        {
          value: "3",
          label: "秋季"
        },
        {
          value: "4",
          label: "冬季"
        }
      ],
      dirname: [
        //审核状态
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待审核"
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
          value: "3",
          label: "无需审核"
        }
      ],
      officeonce: [
        //菜品所含信息
        {
          id: "",
          frame: "", //分类ID
          name: "", //食品名称
          address: "", //食品分类
          stats: "", //用量
          spring: "", //能量
          malloc: "" //能量kcal
        }
      ],
      timezone: "", //提交时间
      record: {
        tenant_name: "", //机构
        aduit_name: "", //姓名
        aduitTime: "1231", //时间
        refuseReason: "222", //拒绝理由
        type: "" //状态
      } //记录
    };
  },
  beforeMount() {
    this.auditing(); //获取表格数据
    this.queryLite(); //获取分类
    this.Provinces(); //省市区
    this.Protocol(); //营养素含量
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 50;
      console.log(this.tableHeight);
      //后面的50：根据需求空出的高度，自行调整
    });

    // 后面的50：根据需求空出的高度，自行调整
  },
  methods: {
    notEmpty() {
      this.input = "";
      this.value = "";
      this.editor = "";
      this.getDate = "";
      this.timezone = "";
      this.auditing();
    },
    //失去焦点事件
    graph() {
      // console.log(this.officeonce);
      let next = [];
      this.officeonce.forEach(item => {
        // console.log(item);
        next.push({
          foodId: item.id,
          val: item.stats
        });
      });
      console.log(next);
      this.$axios
        .post(`api/blade-food/dish/calNutriByFoodIds`, {
          recipeVals: next
        })
        .then(res => {
          // console.log(res);
          this.atomic = res.data.data;
          // console.log(this.atomic);
          // let touch=[];
          this.atomic.forEach(item => {
            // console.log(item);
            for (let item1 of this.mailto) {
              // console.log(item1);
              for (let arr of item1.children) {
                // console.log(arr);
                if (arr.id == item.nutrientId) {
                  arr.result = item.total;
                }
              }
            }
          });
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "能量合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (
          (!values.every(value => isNaN(value)) &&
            column.property == "malloc") ||
          column.property == "stats"
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
          this.sumss = sums[index];
          // if (this.mailto[0].children[0].id == "101") {
          //   this.mailto[0].children[0].result = this.sumss;
          // }
          // console.log(this.sumss);
        }
      });
      return sums;
    },
    seecol(row) {
      this.valuepark = [];
      this.officeonce = [];

      this.value1 = [];
      this.seekeys = true;
      console.log(row);
      this.auto = row.id;
      this.$axios
        .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
        .then(res => {
          // console.log(res);
          this.handler = res.data.data;
          this.ruleForm1.name = this.handler.dishName; //菜品名字
          this.ruleForm1.fooddata = this.handler.dishType; //菜品分类
          if (this.handler.season) {
            this.handler.season.split(",").forEach(item => {
              this.value1.push(item);
            });
          } else {
            this.value1 = [];
          }
          this.ruleForm1.region = this.handler.function; //特点
          this.ruleForm1.desc = this.handler.remark; //做法
          this.record = this.handler.dishAudits[1]; //记录
          if (this.handler.provinces) {
            let bar = [];
            this.handler.provinces.split(",").forEach((item, i) => {
              if (item == this.handler.belongRegion.split(",")[i]) {
                bar.push([item]);
              } else {
                bar.push([item, this.handler.belongRegion.split(",")[i]]);
              }
            });
            this.valuepark = bar;
            // console.log(this.valuepark);
          } else {
            this.valuepark = [];
          }

          // console.log(this.valuepark);
          this.rectangle = this.handler.pic;
          this.ruleForm1.delivery1 = this.handler.isUse == 0 ? true : false; //常用
          if (this.handler.dishMxVos) {
            let arr = [];
            this.handler.dishMxVos.forEach((item, index) => {
              arr[index] = {
                id: item.foodId,
                frame: item.baseTypeId,
                name: item.name,
                address: item.baseTypeName,
                stats: item.value,
                spring: item.nutritionNlValue,
                malloc: item.foodCal.toFixed(2)
                // malloc: item.nutritionNlValue
              };
            });
            this.officeonce = arr;
            this.graph();
          }
        });
    },
    // 分类
    queryLite() {
      this.$axios
        .get(`api/blade-food/basetype/getList?type=${2}&isPrivate=${0}`, {})
        .then(res => {
          //   console.log(res);
          this.details = res.data.data;
          let obtain = [];
          this.details.forEach((item, index) => {
            // console.log(item);
            obtain.push({
              value: item.id,
              label: item.typeName
            });
          });
          console.log(obtain);
          this.foodPos = obtain;
        });
    },
    searchStr() {
      // console.log(this.input); //菜品名称
      // console.log(this.noinst); //创建机构
      // console.log(this.value1); //提交日期
      // console.log(this.editor); //提交人
      // console.log(this.phoneId); //联系电话
      // console.log(this.mState1); //审核状态
      if (this.getDate) {
        this.timezone = this.getDate;
      } else {
        this.timezone = "";
      }
      this.auditing();
    },
    //获取表格数据
    auditing() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/dish/appPubDishOrgan?size=${this.m_page.size}&current=${this.m_page.number}&dishName=${this.input}&status=${this.value}&createName=${this.editor}&createTimeStr=${this.getDate}`,
          {}
        )
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.tmquery = res.data.data.records;
          this.m_page.totalElements = res.data.data.total;
          // console.log(this.tmquery);
        });
    },
    //营养素含量
    Protocol() {
      this.$axios
        .get(`api/blade-food/nutrition/tree`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);

          this.mailto = res.data.data;
        });
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.auditing();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.auditing();
    },
    //省市区
    handleChange(value) {
      console.log(value);
    },
    Provinces() {
      // http://api.yytianqi.com/citylist/id/2

      this.$axios
        .get(`api/blade-system/region/selectCityOrProvince`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.national = res.data.data;
          // console.log(this.national);
          let arr = [];
          this.national.forEach((item, index) => {
            arr[index] = {
              value: item.id,
              label: item.name
            };
            arr[index].children = [];
            // console.log(item.children instanceof Array);
            if (item.children) {
              item.children.forEach((item1, index1) => {
                arr[index].children[index1] = {
                  value: item1.id,
                  label: item1.name
                };
              });
            }
          });

          // this.$set(this.national, arr)
          this.options = arr;
        });
    }
  }
};
</script>
<style scoped>
.avue-view {
  padding: 0 0px !important;
}
.dients {
  width: 100%;
  /* height: 1000px; */
  /* height: 100%; */
  /* position: absolute; */
  position: relative;
  top: 0px;
  left: 0px;
  background-color: #fff;
  border-radius: 5px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
.header {
  width: 100%;
  height: 100px;
  /* background-color: red; */
  font-size: 13px;
  padding-top: 20px;
  margin-left: 10px;
}
.rights {
  overflow-x: hidden;
  width: 100%;
  height: 400px;
  overflow-y: auto;
  /* background-color: red; */
}
.stop {
  color: #ff455b;
}
.navbar {
  height: calc(100vh- 40px);
  margin-top: 30px;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  background-color: #fff;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 60px;
}
.dialog-footer {
  /* position: relative; */
}
.cancellation {
  /* position: fixed;
  bottom: 10px;
  text-align: center;
  margin: 0 auto; */
  /* left: 0; */
}
</style>
