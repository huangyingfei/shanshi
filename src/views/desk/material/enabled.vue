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
          type="success"
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
        v-loading="loadFlag"
        empty-text="没有数据~"
      >
        <el-table-column
          prop="date"
          label="序号"
          width="70"
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
        <el-table-column
          prop="status"
          label="审核状态"
          width="100"
          align="center"
        ></el-table-column>
        <!--操作格-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="seecol(scope.row)"
              >查看</el-button
            >
            <el-button type="danger" size="small" @click="Directory(scope.row)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
          刚好让你更好机构
        </div>
        <div class="seecr1">
          <span style="color:#cccccc;">提交人：</span>
          张三
        </div>
        <div class="seecr1">
          <span style="color:#cccccc;">联系电话：</span>
          15717211234
        </div>
        <div class="seecr1">
          <span style="color:#cccccc;">提交时间：</span>
          2020-06-05 09:00:00
        </div>
        <div class="hash">
          <span style="color:#cccccc;">审核状态：</span>
          待审核
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
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="食物别名2" style=" width: 350px;  ">
              <el-input></el-input>
            </el-form-item>

            <el-form-item
              label="食材真名"
              prop="buffer"
              style=" width: 350px;   "
            >
              <el-input v-model="ruleForm.buffer"></el-input>
            </el-form-item>

            <el-form-item
              label="活动区域"
              prop="autosave"
              style=" width: 350px;   "
            >
              <el-select
                v-model="ruleForm.autosave"
                placeholder="请选择活动区域"
              >
                <!-- <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>-->
              </el-select>
            </el-form-item>

            <el-form-item label="食物分类1" style=" width: 350px;  ">
              <el-input placeholder="请输入食材"></el-input>
            </el-form-item>

            <el-form-item label="食物分类2" style=" width: 350px;   ">
              <el-input placeholder="请输入食材"></el-input>
            </el-form-item>

            <el-form-item
              label="食部(%)"
              prop="besaved"
              style=" width: 350px;  "
            >
              <el-input
                v-model="ruleForm.besaved"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="重量（g）"
              prop="timers"
              style=" width: 350px; "
            >
              <el-input
                v-model="ruleForm.timers"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="水分(%)" style=" width: 350px;   ">
              <el-input placeholder="请输入水分"></el-input>
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
              <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动区域" style=" width: 350px;  ">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <!-- <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>-->
              </el-select>
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
            :data="tableData1"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column
              prop="name"
              label="营养素"
              sortable
              width="180"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="单位"
              sortable
              width="180"
              align="center"
            ></el-table-column>

            <el-table-column prop="num" label="含量">
              <template slot-scope="scope">
                <el-input
                  v-model="input1"
                  type="text"
                  placeholder="请输入内容"
                  v-if="scope.row.dients"
                ></el-input>
              </template>
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
          <el-form-item label="公共库分类" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="0"></el-option>
              <el-option label="区域二" value="-1"></el-option>
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
        <el-button type="primary">拒 绝</el-button>
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
      loadFlag: false, //加载flag
      attributes: [], //表格数据
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
        region: "",
        name: "",
        buffer: "",
        autosave: "",
        besaved: "",
        timers: "",
        type: [],
        resource: "",
        temps: "",
        desc: "",
        delivery: false,
        delivery1: false
      },
      rules: {
        region: [
          { required: true, message: "请选择公共库分类", trigger: "change" }
        ]
      },
      tableData: [
        //审核食材
        {
          date: "1",
          name: "油桃",
          proto: "水果",
          address: "刚好让你更好",
          stats: "张三",
          malloc: "15717211234",
          decls: "2020-08-07 00:00:00",
          board: "待审核"
        }
      ],
      options1: [],
      options: [
        //审核状态
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "待审核"
        },
        {
          value: "3",
          label: "审核通过"
        },
        {
          value: "4",
          label: "审核不通过"
        },
        {
          value: "5",
          label: "无需审核"
        }
      ],
      value: "", //审核状态
      tableData1: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王1虎",
          level: 1,
          address: "上海市普陀区金沙江路 1518 弄",
          dients: false,
          children: [
            {
              id: "11",
              date: "2016-05-02",
              name: "王2虎",
              level: 2,
              address: "上海市普陀区金沙江路 1518 弄",
              num: 326,
              dients: true,
              children: [
                {
                  id: "111",
                  date: "2016-05-02",
                  name: "王3虎",
                  level: 3,
                  address: "上海市普陀区金沙江路 1518 弄",
                  num: 78.012,
                  dients: true
                },
                {
                  id: "112",
                  level: 3,
                  date: "2016-05-02",
                  name: "王4虎",
                  address: "上海市普陀区金沙江路 1518 弄",
                  num: 0.129,
                  dients: true
                }
              ]
            },
            {
              id: "12",
              level: 2,
              date: "2016-05-02",
              name: "王5虎",
              address: "上海市普陀区金沙江路 1518 弄",
              dients: true
            }
          ]
        },
        {
          id: "2",
          level: 1,
          date: "2016-05-04",
          name: "王6虎",
          address: "上海市普陀区金沙江路 1517 弄",
          dients: false
        }
      ]
    };
  },
  beforeMount() {
    this.auditing();
  },
  methods: {
    //表格数据
    auditing() {
      this.loadFlag = true;
      this.$axios
        .get(`api/blade-food/food/getAuditList?current=${1}&size=${10}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.attributes = res.data.data.records;
          console.log(this.attributes);
          this.loadFlag = false;
        });
    },
    seecol(row) {
      this.seekeys = true;
    },
    Directory(row) {
      //审核
      // console.log(row);
      let design = `?id=${row.id}`;
      this.$axios
        .get(`api/blade-food/food/audit` + design, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
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
  background-color: #fff;
  /* height: 600px; */
  margin-left: 10px;
}
.custom {
  width: 100%;
  height: 100px;
  /* background-color: red; */
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
</style>
