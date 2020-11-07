<template>
  <div class="toolbar">
    <!-- 搜索 -->
    <div class="custom">
      <span style=" margin-right: 10px;">项目名称:</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width:200px"
      ></el-input>
      <span style="margin: 0 10px;">创建机构:</span>
      <el-input
        v-model="editor"
        placeholder="请输入内容"
        style="width:200px"
      ></el-input>
      <span style="margin: 0 10px;">提交日期:</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        style="width:200px"
      ></el-date-picker>
      <span style="margin: 0 10px;">提交人:</span>
      <el-input
        v-model="editor"
        placeholder="请输入内容"
        style="width:200px"
      ></el-input>

      <div class="tostring">
        <span style="margin-right: 10px; ">联系电话:</span>
        <el-input
          v-model="editor"
          placeholder="请输入内容"
          style="width:200px"
        ></el-input>
        <span style="margin: 0 10px;">审核状态:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          size="medium"
          icon="el-icon-search"
          type="primary"
          style=" margin-left: 20px; "
          >搜索</el-button
        >
      </div>
    </div>
    <!-- 审核表格 -->
    <div class="navbar">
      <el-table
        :data="attributes"
        border
        style="width: 100%"
        :element-loading-text="page_data.loadTxt"
        v-loading="loadFlag"
        empty-text="没有数据~"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="foodName"
          label="食材名称"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="分类"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createName"
          label="创建机构"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createName"
          label="提交人"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="联系电话"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          width="180"
          align="aduitTime"
        ></el-table-column>
        <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <p class="stop" v-if="scope.row.status == 0">待审核</p>
            <p v-else-if="scope.row.status == 3">无需审核</p>
            <p v-else-if="scope.row.status == 1">审核通过</p>
            <p v-else-if="scope.row.status == 2">审核不通过</p>
          </template>
        </el-table-column>
        <!--操作格-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="seecol(scope.row)"
              >查看</el-button
            >
            <el-button type="danger" size="small" @click="Directory(scope.row)"
              >审核</el-button
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
    <!-- 审核食材 查看 -->
    <el-dialog
      title="审核食材"
      :fullscreen="true"
      append-to-body
      :visible.sync="seekeys"
      :close-on-click-modal="false"
    >
      <div class="update1">
        <div class="seecr">
          <span style="color:#cccccc;">创建机构：</span>
          {{ this.dsquery.establish }}
        </div>
        <div class="seecr1">
          <span style="color:#cccccc;">提交人：</span>
          {{ this.dsquery.submit }}
        </div>
        <div class="seecr1">
          <span style="color:#cccccc;">联系电话：</span>
          {{ this.dsquery.phone }}
        </div>
        <div class="seecr1">
          <span style="color:#cccccc;">提交时间：</span>
          {{ this.dsquery.time }}
        </div>
        <div class="hash">
          <span style="color:#cccccc;">审核状态：</span>
          <span class="stop" v-if="this.dsquery.examineto == 0">待审核</span>
          <span v-else-if="this.dsquery.examineto == 3">无需审核</span>
          <span v-else-if="this.dsquery.examineto == 1">审核通过</span>
          <span v-else-if="this.dsquery.examineto == 2">审核不通过</span>
        </div>
      </div>
      <div class="stored">
        <div class="mationtxt">食材主要信息</div>
        <div class="unsigned">
          <el-form
            :model="ruleForm"
            :inline="true"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="食材名" prop="name" style=" width: 350px;   ">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="食物别名1" style=" width: 350px;  ">
              <el-input v-model="ruleForm.move"></el-input>
            </el-form-item>
            <el-form-item label="食物别名2" style=" width: 350px;  ">
              <el-input v-model="ruleForm.move1"></el-input>
            </el-form-item>

            <el-form-item
              label="食材真名"
              prop="buffer"
              style=" width: 350px;   "
            >
              <el-input v-model="ruleForm.buffer"></el-input>
            </el-form-item>

            <el-form-item
              label="食材分类"
              prop="autosave"
              style=" width: 350px;   "
            >
              <el-select v-model="ruleForm.fooddata" placeholder="请选择">
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
              <el-input
                v-model="ruleForm.foods"
                placeholder="请输入食材"
              ></el-input>
            </el-form-item>

            <el-form-item label="食物分类2" style=" width: 350px;   ">
              <el-input
                v-model="ruleForm.dogfood"
                placeholder="请输入食材"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="食部(%)"
              prop="besaved"
              style=" width: 350px;  "
            >
              <el-input
                v-model="ruleForm.besaved"
                placeholder="请输入食部"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="重量（g）"
              prop="timers"
              style=" width: 350px; "
            >
              <el-input
                v-model="ruleForm.timers"
                placeholder="请输入重量"
              ></el-input>
            </el-form-item>

            <el-form-item label="水分(%)" style=" width: 350px;   ">
              <el-input
                v-model="ruleForm.moisture"
                placeholder="请输入水分"
              ></el-input>
            </el-form-item>

            <el-form-item label="色系" style="  ">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="绿"></el-radio>
                <el-radio label="红"></el-radio>
                <el-radio label="黄"></el-radio>
                <el-radio label="紫"></el-radio>
                <el-radio label="白"></el-radio>
                <el-radio label="黑"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="所属季节" style="  width: 350px;  ">
              <el-select v-model="active" multiple placeholder="请选择季节">
                <el-option
                  v-for="item in season"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属区域" style=" width: 350px;  ">
              <el-cascader
                v-model="valuepark"
                placeholder="请选择省市区"
                :options="options"
                :props="{ multiple: true, checkStrictly: true }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="功用">
              <el-input
                style=" width: 450px;  "
                type="textarea"
                v-model="ruleForm.desc"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="图片" style=" width:500px ">
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

            <el-form-item label="公开" style=" width:200px ">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>

            <el-form-item label="常用" style="   ">
              <el-switch v-model="ruleForm.delivery1"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <!-- 营养素标题 -->
        <div class="worm1">营养素含量（这里为100克食部食品中的营养素含量）</div>
        <div class="saveas">
          <el-table
            :data="mailto"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            :default-expand-all="false"
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
        <!-- 公共库所分类 -->
        <div class="worm1">公共库所属分类</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公共库分类">
            <el-select v-model="menu" placeholder="请选择">
              <el-option
                v-for="item in fication"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="worm1">拒绝原因</div>
        <el-form
          :model="examine"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="拒绝原因" style=" width:200px ">
            <el-input
              style=" width: 450px;  "
              type="textarea"
              v-model="examine.desc1"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="worm1">记录</div>
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>刚好让你更好机构</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>刚好让你更好机构</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div slot="footer" class="dialog-footer" style=" text-align: center;">
        <el-button @click="seekeys = false">取 消</el-button>
        <el-button type="primary" @click="restore"> 拒 绝</el-button>
        <el-button type="primary">同 意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  data() {
    return {
      dsquery: {
        establish: "", //创建机构
        submit: "", //提交人
        phone: "", //电话
        time: " ", //时间
        examineto: "" //审核
      },
      mailto: [], //营养素含量
      loadFlag: false, //加载flag
      attributes: [], //表格数据
      page_data: {
        loadTxt: "请求列表中"
      },
      m_page: {
        //分頁
        sizes: [10, 20, 40, 50, 100], //每页最大显示数
        size: 10,
        totalElements: 0,
        totalPages: 3,
        number: 1
      },
      seekeys: false, //审核弹框
      value1: "", //日期
      input: "",
      input1: "",
      editor: "",
      dialogVisible: false,
      dialogImageUrl: "",
      examine: {
        desc1: "" //拒绝理由
      },
      ruleForm: {
        name: "", //食材名
        move: "", //食物别名1
        move1: "", //食物别名2
        buffer: "", //食材真名
        fooddata: "", //食材分类
        foods: "", //食物分类
        dogfood: "", //食物分类2
        besaved: "", //食部
        timers: "", //重量
        moisture: "", //水分
        region: "",
        resource: "", //色系
        desc: "", //功用
        delivery: false, //公开
        delivery1: false, //常用
        type: [],
        temps: ""
      },
      active: [], //季节
      valuepark: [], //省市区
      menu: [], //公共分类
      fication: [],
      foodPos: [], //食材分类
      rules: {
        // region: [
        //   { required: true, message: "请选择公共库分类", trigger: "change" }
        // ]
      },

      options: [], //省市区

      season: [
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

      options1: [],

      value: "", //审核状态
      tableData1: []
    };
  },
  beforeMount() {
    this.auditing();
    this.setDec(); //公共库分类
    this.Protocol(); //营养素含量
    this.queryLite(); //获取分类
    this.Provinces(); //省市区
  },
  methods: {
    //获取表格数据
    auditing() {
      this.loadFlag = true;
      this.$axios
        .get(`api/blade-food/food/getAuditList?size=${10}&current=${1}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.attributes = res.data.data.records;
          // console.log(this.attributes);
          this.m_page.totalElements = res.data.data.total;
          this.loadFlag = false;
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
    },
    //查看
    seecol(row) {
      console.log(row);
      this.seekeys = true;
    },
    //拒绝
    restore() {
      this.$axios
        .post(`api/blade-food/food/audit`, {
          id: this.subquery.id,
          refuseReason: this.examine.desc1
        })
        .then(res => {
          console.log(res);
        });
    },
    //审核
    Directory(row) {
      this.seekeys = true;
      // console.log(row);
      let design = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/food/detail` + design, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.subquery = res.data.data;
          console.log(this.subquery);
          this.dsquery.establish = this.subquery.createName; //创建机构
          this.dsquery.submit = this.subquery.createName; //提交人
          this.dsquery.phone = this.subquery.mobile; //提交电话
          this.dsquery.time = this.subquery.createTime; //提交时间
          this.dsquery.examineto = this.subquery.status; //审核状态
          this.ruleForm.name = this.subquery.foodName; //食材名
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
    //公共库分类
    setDec() {
      this.$axios
        .get(`api/blade-food/basetype/getList?isPrivate=1&type=1`, {})
        .then(res => {
          // console.log(res);
          this.myStr = res.data.data;
          let str = [];
          this.myStr.forEach((item, index) => {
            console.log(item);
            str[index] = {
              value: item.id,
              label: item.typeName
            };
          });
          this.fication = str;
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
          console.log(this.mailto);
        });
    },
    //省市区
    handleChange(value) {
      console.log(value);
    },
    //省市区
    Provinces() {
      // http://api.yytianqi.com/citylist/id/2

      this.$axios
        .get(`api/blade-system/region/selectCityOrProvince`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
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
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //上传图片
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
.toolbar {
  width: 99%;
  height: 1200px;
  background-color: #fff;
  /* height: 600px; */
}
.custom {
  width: 100%;
  height: 100px;
  /* background-color: red; */
  padding-top: 20px;
}
.tostring {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  /* background-color: red; */
}
.navbar {
  margin-top: 50px;
}
.update1 {
  width: 100%;
  height: 80px;
  /* background-color: red; */
}
.seecr {
  width: 400px;
  height: 30px;
  line-height: 30px;
  /* background-color: yellow; */
  float: left;
}
.seecr1 {
  width: 300px;
  height: 30px;
  line-height: 30px;
  /* background-color: yellow; */
  float: left;
  margin-left: 20px;
}
.hash {
  width: 300px;
  height: 30px;
  line-height: 30px;
  color: #419df7;
}
.stored {
  width: 100%;
  /* height: 500px; */
  /* background-color: red; */
  margin-top: 20px;
}
.mationtxt {
  width: 95%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.unsigned {
  width: 95%;
  /* height: 700px; */
  /* display: flex; */
  /* margin-left: 40px; */
}
.worm1 {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.stop {
  color: #ff455b;
}
</style>
