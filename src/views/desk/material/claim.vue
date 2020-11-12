<template>
  <div class="unsaved">
    <!-- <div>食材不宜同食</div> -->
    <!-- 搜索 -->
    <div class="update">
      名称:
      <el-input v-model="input" placeholder="请输入内容"></el-input>
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
        size="medium"
        icon="el-icon-search"
        type="primary"
        style=" margin-left: 20px; "
        >搜索</el-button
      >
    </div>
    <!-- 添加食材 -->
    <div class="cadddr">
      <el-button size="medium" type="primary" @click="addShard"
        >添加相克食材</el-button
      >

      <!-- <el-button size="medium" type="danger" icon="el-icon-delete" style=" margin-left: 20px; ">删除</el-button> -->
    </div>

    <div class="address">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="食材一"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="stats"
          label="食材二"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="malloc"
          label="不宜同食原因"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="decls"
          label="是否有效"
          width="120"
          align="center"
        ></el-table-column>

        <!--操作格-->
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              style=" margin-left: 20px;"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              style=" margin-left: 20px;"
              @click="DeleteUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加相克食材 -->
    <el-dialog
      title="添加相克食材"
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
        <el-form-item label="名称">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="食材一" prop="region">
          <el-input
            readonly
            v-on:click.native="obtain(1)"
            v-model="ruleForm.adding"
          ></el-input>
        </el-form-item>
        <el-form-item label="食材二" prop="region1">
          <el-input
            readonly
            v-on:click.native="obtain(2)"
            v-model="ruleForm.adding1"
          ></el-input>
        </el-form-item>
        <el-form-item label="不宜同食原因">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="是否有效">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dateTime = false">取 消</el-button>
        <el-button @click="setlist('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 食材 -->
    <el-dialog
      title="个人食材"
      width="40%"
      append-to-body
      :visible.sync="addEffect"
    >
      <div class="block">
        <el-input
          style="width:290px; margin-left: 9px;margin-top: 10px;"
          placeholder="输入关键字进行查询"
          v-model="filterText"
        >
        </el-input>
        <p></p>
        <el-tree
          :data="data"
          v-loading="loadFlag"
          node-key="id"
          :default-expand-all="false"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          ref="tree"
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "unsaved",
  data() {
    const data = [];
    return {
      filterText: "",
      data: JSON.parse(JSON.stringify(data)), //树形结构
      dateTime: false,
      addEffect: false, //个人食材
      ruleForm: {
        name: "",
        adding: "", //食材1
        adding1: "", //食材2
        region: "",
        region1: "",
        desc: "",
        resource: ""
      },
      rules: {
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        region1: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      tableData: [
        {
          date: "1",
          name: "食物相克",
          address: "油桃",
          stats: "西瓜",
          malloc: "容易长红点",
          decls: "是"
        }
      ],
      input: "",
      temps: "",
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "是"
        },
        {
          value: "2",
          label: "否"
        }
      ],
      value: "",
      lower: 1,
      support: "", //食材一ID
      editor: "" //食材二ID
    };
  },
  beforeMount() {
    this.treeDrawing(); //树形渲染数
  },
  computed() {},
  watch: {
    filterText(val) {
      console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;

      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.ruleForm.adding = data.label;
      this.support = data.id;
    },
    //添加相克食物
    addShard() {
      this.dateTime = true;
    },
    //添加相克食物
    obtain(index1) {
      this.dataindex1 = index1;
      // console.log(this.dataindex1);
      // console.log(123123);
      this.addEffect = true;
    },
    setlist(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.$axios.post(`api/blade-food/foodmutual/save`, {
            name: this.ruleForm.name, //名称

            isActive: this.ruleForm.resource //是否有效
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    DeleteUser(row) {
      console.log(row);
    },
    //树形渲染
    treeDrawing() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getFoodByBaseId?isPrivate=${this.lower}`,
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
              label: item.typeName
            };
            trees[index].children = [];
            item.foods.forEach((item1, index1) => {
              trees[index].children[index1] = {
                id: item1.id,
                label: item1.foodName,
                isPub: item1.isPub,
                isUse: item1.isUse
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

<style>
.el-button--success {
  color: #fff;
  background-color: #00aca0;
  border-color: #00aca0;
}
.unsaved {
  width: 98%;
  height: 600px;
  background-color: #fff;
  font-size: 14px;
}
.update {
  width: 100%;
  height: 50px;
  float: left;
  margin-left: 20px;
  /* background-color: #fff; */
  line-height: 50px;
  /* background-color: red; */
}
.update .el-input {
  width: 200px;
  height: 32px;
}
.exact {
  margin-left: 20px;
  margin-right: 10px;
}
.cadddr {
  width: 100%;
  height: 50px;
  margin-left: 20px;
  margin-top: 20px;
  line-height: 50px;
}
.address {
  margin-top: 50px;
}
</style>
