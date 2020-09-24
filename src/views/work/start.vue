<template>
  <div class="notice">
    <!-- 左边 -->
    <div class="cation">
      <el-input style=" width: 250px;height: 35px;" placeholder="请输入内容" v-model="input" clearable></el-input>
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
                v-for="item in options"
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
                v-for="item in options"
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
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
      </div>
      <!-- 结束 -->
      <div class="monly">
        <div class="block">
          <p></p>
          <el-tree
            :data="data"
            show-checkbox
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
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="食材名" prop="name" style=" width: 350px;  float: left; ">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="食物别名1" style=" width: 350px;  float: left;  ">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="食物别名2" style=" width: 350px; float: left;   ">
            <el-input></el-input>
          </el-form-item>

          <el-form-item label="食材真名" prop="buffer" style=" width: 350px;  float: left; ">
            <el-input v-model="ruleForm.buffer"></el-input>
          </el-form-item>

          <el-form-item label="活动区域" prop="autosave" style=" width: 350px;  float: left; ">
            <el-select v-model="ruleForm.autosave" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="食物分类1" style=" width: 350px;  float: left; ">
            <el-input placeholder="请输入食材"></el-input>
          </el-form-item>

          <el-form-item label="食物分类2" style=" width: 350px;  float: left; ">
            <el-input placeholder="请输入食材"></el-input>
          </el-form-item>

          <el-form-item label="食部(%)" prop="besaved" style=" width: 350px;  float: left; ">
            <el-input v-model="ruleForm.besaved" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="重量（g）" prop="timers" style=" width: 350px;  float: left; ">
            <el-input v-model="ruleForm.timers" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="水分(%)" style=" width: 350px;  float: left; ">
            <el-input placeholder="请输入水分"></el-input>
          </el-form-item>

          <el-form-item label="色系" style="  float: left; ">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="绿"></el-radio>
              <el-radio label="红"></el-radio>
              <el-radio label="黄"></el-radio>
              <el-radio label="紫"></el-radio>
              <el-radio label="白"></el-radio>
              <el-radio label="黑"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-form-item label="所属区域" prop="temps" style=" width: 350px;  float: left; ">
            <el-select v-model="ruleForm.temps" placeholder="请选所属区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="功用" style=" width: 350px;  float: left; ">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入"></el-input>
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

          <el-form-item label="公开" style="  float: left; ">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="常用" style="  float: left; ">
            <el-switch v-model="ruleForm.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 营养素标题 -->
      <div class="worm">营养素含量（这里为100克食部食品中的营养素含量）</div>
      <div class="saveas">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="name" label="营养素" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="单位" sortable width="180" align="center"></el-table-column>
          <!-- <el-table-column prop="address" label="单位"></el-table-column> -->
          <el-table-column prop="address" label="含量">
            <template slot-scope="scope">
              <el-input v-model="input1" type="text" placeholder="请输入内容" v-if="scope.row.dients"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
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
      data: JSON.parse(JSON.stringify(data)), //树形结构
      input1: "",
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
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
      options: [
        {
          value: "选项1",
          label: "春"
        },
        {
          value: "选项2",
          label: "夏"
        },
        {
          value: "选项3",
          label: "秋"
        },
        {
          value: "选项4",
          label: "冬"
        }
      ],
      value1: [],
      tableData: [
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
              dients: true,
              children: [
                {
                  id: "111",
                  date: "2016-05-02",
                  name: "王3虎",
                  level: 3,
                  address: "上海市普陀区金沙江路 1518 弄",
                  dients: true
                },
                {
                  id: "112",
                  level: 3,
                  date: "2016-05-02",
                  name: "王4虎",
                  address: "上海市普陀区金沙江路 1518 弄",
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
  computed: {},
  methods: {
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

<style>
.notice {
  width: 100%;
  height: 1300px;
  /* background-color: #fff; */
  margin-bottom: 40px;
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
  width: 70%;
  height: 100%;
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
  height: 700px;

  margin-left: 40px;
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
</style>
