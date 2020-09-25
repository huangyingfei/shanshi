<template>
  <div class="notice">
    <!-- 左边 -->
    <div class="cation">
      <el-input
        style=" width: 250px;height: 35px;"
        placeholder="请输入内容"
        v-model="input"
        clearable
      ></el-input>
      <div class="import">
        <el-button type="success" plain size="mini">导入</el-button>
        <el-button type="success" plain size="mini">导出</el-button>
        <el-button type="success" plain size="mini">加分类</el-button>
        <el-button type="success" plain size="mini">加食材</el-button>
      </div>
      <div class="whole">
        <div class="export">全部(326)</div>
        <div class="export1">公开(320)</div>
        <div class="export2">隐藏(6)</div>
      </div>
      <!-- 全国查找 -->
      <div class="country">
        <div class="country1">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in examine"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
        <div class="country2">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in examine"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
        <div class="country2">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in examine"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
      </div>
      <!-- 结束 -->
      <!-- 树形组件 -->
      <div class="monly">
        <div class="block">
          <p></p>
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
          ></el-tree>
        </div>
      </div>
    </div>
    <!-- 右边食材信息 -->
    <div class="mation">
      <div class="mationtxt">食材主要信息</div>
      <div class="mationinput">
        <el-form
          :model="ruleForm"
          :rules="rules"
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
            label="食材分类"
            prop="autosave"
            style=" width: 350px;   "
          >
            <el-select v-model="ruleForm.autosave" placeholder="请选择活动区域">
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

          <el-form-item label="食部(%)" prop="besaved" style=" width: 350px;  ">
            <el-input
              v-model="ruleForm.besaved"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item label="重量（g）" prop="timers" style=" width: 350px; ">
            <el-input v-model="ruleForm.timers" placeholder="请输入"></el-input>
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

          <el-form-item label="所属区域" style="  width: 350px;  ">
            <el-select v-model="value1" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
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

          <el-form-item label="公开" style="  ">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="常用" style="   ">
            <el-switch v-model="ruleForm.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 营养素标题 -->
      <div class="worm">营养素含量（这里为100克食部食品中的营养素含量）</div>
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
            sortable
            width="200"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="单位"
            sortable
            width="180"
            align="center"
          ></el-table-column>

          <el-table-column prop="address" label="含量">
            <template slot-scope="scope" >
              <el-input
                v-model="scope.row.value"
                type="text"
                v-if="scope.row.level!=1?true:false "
                placeholder="请输入内容"
              ></el-input>
            </template>
            <!-- v-if="scope.row.dients" -->
          </el-table-column>
        </el-table>
      </div>
      <div style="   text-align: center;">
        <el-button type="primary" @click="totally('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "notice",
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      mailto: [], //营养素含量
      data: JSON.parse(JSON.stringify(data)), //树形结构
      input1: "",
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
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
        name: [
          { required: true, message: "请输入食材名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        buffer: [
          { required: true, message: "请输入食材真名", trigger: "blur" }
        ],
        autosave: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        besaved: [{ required: true, message: "请输入食部", trigger: "blur" }],
        timers: [{ required: true, message: "请输入重量", trigger: "blur" }]
      },
      examine: [
        {
          value: "选项1",
          label: "全国"
        },
        {
          value: "选项2",
          label: "浙江"
        },
        {
          value: "选项3",
          label: "上海"
        }
      ],
      value: "",
      options: [
        // {
        //     value: '1',
        //     label: '春'
        // },
        // {
        //     value: '2',
        //     label: '夏'
        // },
        // {
        //     value: '3',
        //     label: '秋'
        // },
        // {
        //     value: '4',
        //     label: '冬'
        // }
      ],
      value1: [],
    
    };
  },
  computed: {},
  beforeMount() {
    this.Protocol();
    this.queryLite();
    this.Provinces();//省市区
    this.queryLite();
  },
  methods: {
    //食材库保存
    totally() {
      this.$axios
        .post(`api/blade-food/food/save`, {
          foodName: this.ruleForm.name,
          foodAlias: this.footer.region
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
      //表单提交
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    // 分类
    queryLite() {
      // this.$axios
      //   .get(`api/blade-food/basetype/getList`, {

      //   })
      //   .then(res => {
      //     console.log(res);
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
          console.log(res);
          this.mailto = res.data.data;
        });
    },
    //省市区
    Provinces(){
      // http://localhost/blade_system/region/selectCityOrProvince
      this.$axios
        .get(`api/blade_system/region/selectCityOrProvince`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          // this.mailto = res.data.data;
        });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields(); //重置
    },
    prepare(date) {
      console.log(date);
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.prepare(data)}
            >
              隐藏
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              常用
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    }, //树形结构
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.notice {
  width: 100%;
  /* height: 1300px; */
  /* background-color: #fff; */
  margin-bottom: 40px;
  overflow: auto;
}
.cation {
  width: 29%;
  height: 1300px;
  background-color: #fff;
  float: left;
  border-right: 1px solid #5c5c5c;
  margin-bottom: 40px;
}
.el-input__inner {
  height: 35px !important;
}
.mation {
  width: 69%;
  height: 1300px;
  background-color: #fff;
  float: left;
  margin-bottom: 40px;
}
.import {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  margin-top: 10px;
  line-height: 50px;
}
.whole {
  width: 100%;
  height: 40px;
  /* background-color: red; */
}
.export {
  width: 100px;
  height: 30px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #000;
  font-size: 14px;
  float: left;
}
.export1 {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #000;
  font-size: 14px;
  float: left;
}
.export2 {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  float: left;
}
.country {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  line-height: 50px;
}
.country1 {
  width: 90px;
  float: left;
}
.country2 {
  width: 90px;
  float: left;
  margin-left: 10px;
}
.monly {
  width: 100%;
  height: 300px;

  margin-top: 10px;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.mationinput {
  width: 95%;
  /* height: 700px; */
  /* display: flex; */
  margin-left: 40px;
  margin-bottom: 20px;
}
.el-form .demo-ruleForm {
  display: flex !important;
}
.worm {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.saveas {
  width: 95%;
  height: 500px;
  margin-left: 40px;
  /* background-color: red; */
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
