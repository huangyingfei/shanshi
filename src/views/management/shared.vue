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
    </div>
    <!-- 查看 -->
    <el-dialog
      title="查看食材"
      :fullscreen="true"
      append-to-body
      :visible.sync="seekeys"
      :close-on-click-modal="false"
    >
      <div class="rights">
        <div class="mationtxt">食材主要信息</div>
        <div class="mationinput">
          <el-form
            :model="ruleFormUsers"
            :rules="rules"
            :inline="true"
            ref="ruleFormUsers"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="食材名" prop="name" style=" width: 350px;   ">
              <span>{{ ruleFormUsers.name }}</span>
            </el-form-item>
            <el-form-item label="食物别名" style=" width: 350px;  ">
              <span>{{ ruleFormUsers.foodFood }}</span>
            </el-form-item>
            <el-form-item label="食物别名2" style=" width: 350px;  ">
              <span>{{ ruleFormUsers.ovenFood }}</span>
            </el-form-item>
            <el-form-item label="食材真名" style=" width: 350px;   ">
              <span>{{ ruleFormUsers.buffer }}</span>
            </el-form-item>

            <el-form-item
              label="食材分类"
              prop="fooddata"
              style=" width: 350px;   "
            >
              <el-select
                disabled
                v-model="ruleFormUsers.fooddata"
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
            <el-form-item label="食物分类1" style=" width: 350px;  ">
              <span>{{ ruleFormUsers.foods }}</span>
            </el-form-item>
            <el-form-item label="食物分类2" style=" width: 350px;   ">
              <span>{{ ruleFormUsers.dogfood }}</span>
            </el-form-item>
            <el-form-item label="食部(%)" style=" width: 350px;  ">
              <span>{{ ruleFormUsers.besaved }}</span>
            </el-form-item>
            <el-form-item label="重量（g）" style=" width: 350px; ">
              <span>{{ ruleFormUsers.timers }}</span>
            </el-form-item>

            <el-form-item label="水分(%)" style=" width: 350px;   ">
              <span>{{ ruleFormUsers.content }}</span>
            </el-form-item>
            <el-form-item label="色系" style="  ">
              <el-radio-group v-model="ruleFormUsers.resource">
                <el-radio disabled label="1">绿</el-radio>
                <el-radio disabled label="2">红</el-radio>
                <el-radio disabled label="3">黄</el-radio>
                <el-radio disabled label="4">紫</el-radio>
                <el-radio disabled label="5">白</el-radio>
                <el-radio disabled label="6">黑</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="所属区域" style="  width: 350px;  ">
              <el-cascader
                v-model="valuepark"
                placeholder="请选择省市区"
                :options="options"
                :props="{ multiple: true, checkStrictly: true }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="所属季节" style=" width: 350px;  ">
              <el-select
                disabled
                v-model="active"
                multiple
                placeholder="请选择季节"
              >
                <el-option
                  v-for="item in before"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功用" style="width:450px">
              <!-- <el-input
              style=" width: 450px;  "
              type="textarea"
              v-model="ruleForm.desc"
              placeholder="请输入"
            ></el-input> -->
              <span>{{ ruleFormUsers.desc }}</span>
            </el-form-item>
            <el-form-item label="图片">
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

            <el-form-item label="常用" style="   ">
              <el-switch v-model="ruleFormUsers.delivery1"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <!-- 营养素标题 -->
        <div class="worm">
          营养素含量（这里为100克食部食品中的营养素含量）
        </div>
        <div class="saveas">
          <el-table
            :data="mailto"
            max-height="400"
            style="width: 70%; margin-bottom: 20px"
            row-key="id"
            :border="false"
            :default-expand-all="false"
            :tree-props="{
              children: 'children',
              hasChildren: 'hasChildren'
            }"
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
                  disabled
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seekeys: false, //查看弹框
      editor: "", //提交人
      input: "",
      value: "",
      getDate: "", //提交日期
      tmquery: [], //表格
      mailto: [], //营养素含量
      active: [], //季节
      valuepark: [], //省市区
      ruleFormUsers: {
        //公共食材库
        region: "",
        name: "", //食材名
        foodFood: "", //食物别名1
        ovenFood: "", //食物别名2
        buffer: "", //食材真名
        fooddata: "", //食材分类
        foods: "", //食物分类1
        dogfood: "", //食物分类2
        besaved: "", //食部分
        timers: "", //重量
        content: "", //水分
        resource: "", //色系
        desc: "", //功用
        delivery: false, //公开
        delivery1: false, //常用
        autosave: "",
        type: [],
        temps: ""
      },
      //季节查询
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
    notEmpty() {
      this.input = ""; //菜品名称
      this.value = ""; //审核状态
      this.editor = ""; //提交人
      this.searchStr = ""; //提交日期
    },
    seecol(row) {
      this.flour = row.id;

      this.active.length = 0;
      console.log(row);
      this.seekeys = true;
      this.ruleFormUsers.name = row.foodName; //食材名
      this.ruleFormUsers.ovenFood = row.foodAlias1; //食物别名2
      this.ruleFormUsers.buffer = row.foodReal; //食材真名
      this.ruleFormUsers.fooddata = row.foodType; //食材分类
      this.ruleFormUsers.foods = row.foodType1; //食物分类1
      this.ruleFormUsers.dogfood = row.foodType2; //食物分类2
      this.ruleFormUsers.besaved = row.foodEat; //食部
      this.ruleFormUsers.timers = row.weight; //重量
      this.ruleFormUsers.content = row.water; //水分
      this.ruleFormUsers.resource = row.color + ""; //色系
      row.season.split(",").forEach(item => {
        //所属季节
        this.active.push(item);
      });
      //所属区域
      let bar = [];
      row.provinces.split(",").forEach((item, i) => {
        bar.push([item, row.belongRegion.split(",")[i]]);
      });
      this.valuepark = bar;
      // row.provinces.split(",").forEach((item, i) => {
      //   this.valuepark.push([item, row.belongRegion.split(",")[i]]);
      // });
      this.ruleFormUsers.desc = row.function; //功用
      this.ruleFormUsers.delivery1 = row.isUse == 1 ? false : true; //常用
      //营养素含量
      // let units = row.nutritionsl;
      this.$axios
        .get(`api/blade-food/food/detail?id=${this.flour}`, {})
        .then(res => {
          this.inquired = res.data.data;
          let units = this.inquired.nutritions;
          units.forEach(item => {
            // console.log(item);
            for (let item1 of this.mailto) {
              // console.log(item1);
              for (let arr of item1.children) {
                // console.log(arr);
                if (arr.id == item.nutrientId) {
                  arr.result = item.value;
                }
                if (arr.children) {
                  for (let add of arr.children) {
                    if (add.id == item.nutrientId) {
                      add.result = item.value;
                    }
                  }
                }
              }
            }
          });
        });
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
      this.$axios
        .get(`api/blade-food/food/searchOrgFood?size=${10}&current=${1}`, {})
        .then(res => {
          // console.log(res);
          this.tmquery = res.data.data.records;
          console.log(this.tmquery);
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
</style>
