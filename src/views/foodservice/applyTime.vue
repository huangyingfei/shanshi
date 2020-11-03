<template>
  <div class="dients">
    <!-- <h2>已申请分享平台的食材</h2> -->
    <div class="header">
      <span style=" margin-right: 10px;">菜品名称:</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width:200px;"
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
        style="width:200px;    height: 30px;"
      ></el-input>
      <span style="margin-right: 10px;margin-left: 15px;">提交日期:</span>
      <el-date-picker
        size="small"
        v-model="getDate"
        type="date"
        placeholder="选择日期"
        style="width:200px"
      ></el-date-picker>
      <div>
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          style=" margin-left: 20px; margin-top: 20px; "
          >搜索</el-button
        >
        <el-button
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
          prop="foodName"
          label="食材名称"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="foodTypeName"
          label="分类"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createName"
          label="提交人"
          width="180"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="提交时间"
          width="270"
          align="center"
        ></el-table-column>
        <el-table-column label="审核状态" width="150" align="center">
          <template slot-scope="scope">
            <p class="stop" v-if="scope.row.status == 0">待审核</p>
            <p style="color:#409eff" v-else-if="scope.row.status == 3">
              无需审核
            </p>
            <p style="color:#67c23a" v-else-if="scope.row.status == 1">
              审核通过
            </p>
            <p style="color:#e6a23c" v-else-if="scope.row.status == 2">
              审核不通过
            </p>
          </template>
        </el-table-column>
        <!--操作格-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-view"
              type="primary"
              size="small"
              @click="seecol(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看 -->
    <el-dialog
      title="查看菜品"
      :fullscreen="true"
      append-to-body
      :visible.sync="seekeys"
      :close-on-click-modal="false"
    >
      <div class="rights">
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
            <el-form-item label="菜品分类" prop="fooddata" style="width: 350px">
              <el-select
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
                style="width: 200px"
                v-model="valuepark"
                placeholder="请选择省市区"
                :options="options"
                :props="{ multiple: true, checkStrictly: true }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="所属季节" style="width: 350px">
              <el-select v-model="value1" multiple placeholder="请选择">
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
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
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
            v-loading="loadFlag1"
            show-summary
            style="width: 100%"
            :summary-method="getSummaries"
          >
            <el-table-column prop="id" label="序号" width="100" align="center">
            </el-table-column>
            <el-table-column
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
                  style="width: 90px"
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seekeys: false, //查看弹框
      tmquery: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ], //表格
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

      //季节查询
      value1: [], //所属季节
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
          value: "0",
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
          value: "3",
          label: "待审批"
        },
        {
          value: "4",
          label: "已取消"
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
      ]
    };
  },
  beforeMount() {
    this.auditing(); //获取表格数据
    this.queryLite(); //获取分类
    this.Provinces(); //省市区
    this.Protocol(); //营养素含量
  },

  methods: {
    seecol(row) {
      this.active.length = 0;
      console.log(row);
      this.seekeys = true;
    },
    // 分类
    queryLite() {
      this.$axios
        .get(`api/blade-food/basetype/list?type=1`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.tionDate = res.data.data;
          // console.log(this.tionDate);
          let cation = [];
          // children
          this.tionDate.forEach((item, index) => {
            cation[index] = {
              value: item.id,
              label: item.typeName
            };
          });
          // console.log(cation);
          this.foodPos = cation;
        });
    },
    //获取表格数据
    auditing() {
      // this.$axios
      //   .get(`api/blade-food/food/searchOrgFood?size=${10}&current=${1}`, {})
      //   .then(res => {
      //     // console.log(res);
      //     this.tmquery = res.data.data.records;
      //     console.log(this.tmquery);
      //   });
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
.dients {
  width: 100%;
  height: 1000px;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 100px;
  /* background-color: red; */
  font-size: 13px;
  padding-top: 20px;
}
.rights {
  width: 1200px;
  height: 100%;
  /* background-color: red; */
}
.stop {
  color: #ff455b;
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
</style>
