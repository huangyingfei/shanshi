<template>
  <div class="unsaved">
    <!-- <div>食材不宜同食</div> -->
    <!-- 搜索 -->
    <div class="update">
      <!-- 名称:
      <el-input v-model="input" placeholder="请输入内容"></el-input> -->
      <span class="exact">食材名称:</span>

      <el-input v-model="temps" placeholder="请输入内容"></el-input>
      <span style="  margin-left: 20px;  margin-right: 10px;">是否有效:</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        @click="search"
        size="medium"
        icon="el-icon-search"
        type="primary"
        style=" margin-left: 20px; "
        >搜索</el-button
      >
      <el-button @click="notEmpty" size="medium" style=" margin-left: 20px; "
        >清空</el-button
      >
      <el-button size="medium" type="primary" @click="addShard(1)"
        >添加相克食材</el-button
      >
    </div>
    <!-- 添加食材 -->
    <!-- <div class="cadddr">
  
    </div> -->

    <div class="address">
      <el-table
        v-loading="loadFlag1"
        :data="tableData"
        border
        :element-loading-text="page_data.loadTxt"
        :height="tableHeight"
        ref="table"
      >
        <el-table-column label="序号" type="index" width="50" align="center">
        </el-table-column>
        <!-- <el-table-column
          prop="name"
          label="名称"
          width="160"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="foodName"
          label="食材一"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="foodName1"
          label="食材二"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="reason"
          label="不宜同食原因"
          align="center"
        ></el-table-column>
        <el-table-column label="是否有效" align="center">
          <template slot-scope="scope">
            <p class="stop" v-if="scope.row.isActive == 1">是</p>
            <p style="color:#409eff" v-else-if="scope.row.isActive == 0">
              否
            </p>
          </template>
        </el-table-column>

        <!--操作格-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="editorTheme(scope.row, 2)"
              type="text"
              size="small"
              icon="el-icon-edit"
              style=" margin-left: 20px;"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              icon="el-icon-delete"
              style=" margin-left: 20px;"
              @click="DeleteUser(scope.row)"
              >删除</el-button
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
    <!-- 添加相克食材 -->
    <el-dialog
      title="食材"
      width="50%"
      append-to-body
      :visible.sync="dateTime"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item> -->
        <el-form-item label="食材一" prop="adding">
          <el-input
            clearable
            readonly
            v-on:click.native="obtain(1)"
            v-model="ruleForm.adding"
          ></el-input>
        </el-form-item>
        <el-form-item label="食材二" prop="adding1">
          <el-input
            clearable
            readonly
            v-on:click.native="obtain(2)"
            v-model="ruleForm.adding1"
          ></el-input>
        </el-form-item>
        <el-form-item label="不宜同食原因">
          <el-input
            type="textarea"
            maxlength="30"
            show-word-limit
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否有效">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="0">否</el-radio>
          <!-- <el-radio-group v-model="ruleForm.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dateTime = false">取 消</el-button>
        <el-button
          v-if="this.under == 1"
          @click="setlist('ruleForm')"
          type="primary"
          >确 定</el-button
        >
        <el-button @click="hardware('ruleForm')" v-else type="primary"
          >编辑 确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 个人食材公共食材 -->
    <el-dialog
      title="个人食材公共食材"
      width="40%"
      append-to-body
      :visible.sync="addEffect"
    >
      <el-input
        clearable
        @change="treeDrawing"
        style="width: 290px; margin-left: 11px; margin-top: 20px"
        placeholder="输入关键字进行查询"
        v-model="filterText"
      >
      </el-input>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="个人食材库" name="first">
            <div class="block">
              <p></p>
              <div class="rolling">
                <el-tree
                  :data="data"
                  v-loading="loadFlag"
                  node-key="id"
                  :default-expand-all="false"
                  @node-click="handleNodeClick"
                >
                </el-tree>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公共食材库" name="second">
            <div class="block">
              <p></p>
              <div class="rolling">
                <el-tree
                  :data="data"
                  node-key="id"
                  v-loading="loadFlag"
                  :default-expand-all="false"
                  @node-click="handleNodeClick"
                >
                  <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => prepare(data)"
                    >
                      查看
                    </el-button>
                  </span>
                </span> -->
                </el-tree>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEffect = false">取 消</el-button>
        <el-button @click="addEffect = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "unsaved",
  data() {
    const data = [];
    return {
      tableHeight: 50,
      data: JSON.parse(JSON.stringify(data)), //树形结构
      filterText: "",
      activeName: "first",
      loadFlag: false, //加载flag
      loadFlag1: false, //加载flag
      dateTime: false,
      dateTime1: false,
      addEffect: false, //个人公共食材
      ruleForm: {
        name: "", //名称
        adding: "", //食材1
        adding1: "", //食材2
        desc: "",
        resource: ""
      },
      radio: "1", //是否有效
      rules: {
        // name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        adding: [{ required: true, message: "请选择食材", trigger: "change" }],
        adding1: [{ required: true, message: "请选择食材", trigger: "change" }]
      },
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
      tableData: [
        //表格数据
      ],
      input: "",
      temps: "",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      value: "",
      lower: 0,

      dataindex1: undefined,
      sure: "",
      support: "", //食材一ID
      editor: "", //食材二ID
      under: ""
    };
  },
  beforeMount() {
    this.treeDrawing(); //树形渲染数
    this.generator(); //获取表格数据
  },
  computed: {},
  mounted: function() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 180;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 180;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  methods: {
    notEmpty() {
      this.input = "";
      this.temps = "";
      this.value = "";
      this.generator(); //获取表格数据
    },
    search() {
      this.generator();
    },
    //删除
    DeleteUser(row) {
      this.term = row.id;
      this.$confirm("确认删除该相克食材?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`api/blade-food/foodmutual/remove?ids=${this.term}`, {})
            .then(res => {
              // console.log(res);
              this.generator();
              this.$message.success("删除成功");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    editorTheme(row, index1) {
      console.log(row);
      // console.log(index1);
      this.under = index1;
      this.dateTime = true;
      this.ruleForm.name = row.name;
      this.ruleForm.adding = row.foodName;
      this.ruleForm.adding1 = row.foodName1;
      this.ruleForm.desc = row.reason;
      // this.ruleForm.resource = row.isActive == 0 ? "是" : "否";
      this.radio = row.isActive + "";
      // console.log(this.radio);

      this.support = row.foodId; //食材一ID
      this.editor = row.foodId1; //食材二ID
      this.sure = row.id;
      // console.log(this.support);
      // this.ruleForm.name
    },
    //编辑确定
    hardware(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(`api/blade-food/foodmutual/update`, {
              id: this.sure, //ID
              name: this.ruleForm.name, //名称
              foodId: this.support, //食材1
              foodId1: this.editor, //食材2
              reason: this.ruleForm.desc, //不宜同事原因
              // isActive: this.ruleForm.resource == "是" ? 0 : 1 //是否
              isActive: this.radio
            })
            .then(res => {
              console.log(res);
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.generator();
              this.dateTime = false;
            })
            .catch(() => {
              this.$message.error("保存失败");
            });
        } else {
          // console.log("error submit!!");
          this.$message({
            message: "相克食材未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //确定
    setlist(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(`api/blade-food/foodmutual/save`, {
              name: this.ruleForm.name, //名称
              foodId: this.support, //食材1
              foodId1: this.editor, //食材2
              reason: this.ruleForm.desc, //不宜同事原因
              // isActive: this.ruleForm.resource == "是" ? 0 : 1 //是否
              isActive: this.radio
            })
            .then(res => {
              console.log(res);
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.generator();
              this.dateTime = false;
            })
            .catch(() => {
              this.$message.error("保存失败");
            });
        } else {
          // console.log("error submit!!");
          this.$message({
            message: "相克食材未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //添加相克食物
    obtain(index1) {
      this.dataindex1 = index1;
      // console.log(this.dataindex1);
      // console.log(123123);
      this.treeDrawing();
      this.addEffect = true;
    },
    addShard(index1) {
      console.log(index1);
      this.under = index1;
      this.ruleForm.name = "";
      this.ruleForm.adding = "";
      this.ruleForm.adding1 = "";
      this.ruleForm.desc = "";
      this.radio = "1";
      // this.ruleForm.resource = "";
      this.dateTime = true;
    },

    handleClick(tab) {
      // console.log(tab);
      this.lower = tab.index;
      // console.log(this.lower);
      this.treeDrawing();
      // this.Protocol();
      // console.log(event);
    },
    //点击查看详情
    handleNodeClick(data) {
      // console.log(data);
      if (data.view == 0) {
        return;
      } else {
        if (this.dataindex1 == 1) {
          this.ruleForm.adding = data.label;
          this.support = data.id;
        } else {
          this.ruleForm.adding1 = data.label;
          this.editor = data.id;
        }
      }

      // this.flour=data.id;

      // this.$axios.get(`api`)
    },
    //获取表格
    generator() {
      this.loadFlag1 = true;
      this.$axios(
        `api/blade-food/foodmutual/list?size=${this.m_page.size}&current=${this.m_page.number}&name=${this.input}&isActive=${this.value}&foodName=${this.temps}`
      ).then(res => {
        this.loadFlag1 = false;
        this.tableData = res.data.data.records;
        this.m_page.totalElements = res.data.data.total;
      });
    },
    //页码
    m_handlePageChange(currPage) {
      this.m_page.number = currPage;
      this.generator();
    },
    m_handleSizeChange(currSize) {
      this.m_page.size = currSize;
      this.generator();
    },
    //树形渲染
    treeDrawing() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getFoodByBaseId?isPrivate=${this.lower}&foodName=${this.filterText}`,
          {}
        )
        .then(res => {
          // console.log(res);
          this.loadFlag = false;
          this.prtree = res.data.data;
          // console.log(this.prtree);

          let trees = [];
          this.prtree.forEach((item, index) => {
            trees[index] = {
              id: item.id,
              label: item.typeName,
              view: 0
            };
            trees[index].children = [];
            item.foods.forEach((item1, index1) => {
              trees[index].children[index1] = {
                id: item1.id,
                label: item1.foodName,
                isPub: item1.isPub,
                isUse: item1.isUse,
                view: 1
              };
            });
          });
          // console.log(trees);
          this.data = trees;
        });
    }
  }
};
</script>

<style scoped>
/* .el-button--success {
  color: #fff;
  background-color: #00aca0;
  border-color: #00aca0;
} */
.unsaved {
  width: 100%;
  height: 100%;
  /* margin-left: 10px; */
  background-color: #fff;
  font-size: 14px;

  position: relative;
  top: 0px;
  left: 0px;
  bottom: 9px;
}
.update {
  width: 100%;
  height: 50px;
  float: left;
  margin-left: 0px;
  margin-top: 15px;
  /* background-color: #fff; */
  line-height: 50px;
  font-size: 13px;
  /* background-color: red; */
}
.update .el-input {
  width: 200px;
  height: 32px;
}
.exact {
  /* margin-left: 20px; */
  margin-right: 10px;
}
.cadddr {
  width: 100%;
  height: 50px;
  float: left;
  /* margin-left: 20px; */
  /* margin-top: 20px; */
  line-height: 50px;
}
.address {
  /* margin-top: 70px; */
}
.stop {
  color: #ff455b;
}
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  margin-top: 20px;
  margin-right: 40px;
  margin-bottom: 40px;
}
.rolling {
  width: 100%;
  height: 300px;
  overflow-y: auto;
}
</style>
